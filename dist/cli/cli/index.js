#!/usr/bin/env node
import { Command } from "commander";
import inquirer from "inquirer";
import chalk from "chalk";
import ora from "ora";
import { componentRegistry, getComponentsList, getComponentsByCategory, } from "./registry.js";
import { fetchComponentFiles } from "./fetcher.js";
import { writeComponentFiles } from "./writer.js";
import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs-extra";
const execAsync = promisify(exec);
const program = new Command();
program
    .name("repeat-ui")
    .description("CLI tool to install Repeat UI components")
    .version("1.0.0");
program
    .command("add")
    .description("Add a component to your project")
    .argument("[component]", "Component name to install")
    .option("-v, --variant <variant>", "Component variant (js-css, js-tailwind, ts-css, ts-tailwind)", "ts-tailwind")
    .option("-o, --output <dir>", "Output directory", "./components")
    .option("--overwrite", "Overwrite existing files", false)
    .option("--no-deps", "Skip installing dependencies", false)
    .option("--no-format", "Skip code formatting", false)
    .action(async (componentName, options) => {
    try {
        let selectedComponent = componentName;
        // If no component specified, show selection
        if (!selectedComponent) {
            const categories = [
                ...new Set(Object.values(componentRegistry).map((c) => c.category)),
            ];
            const { category } = await inquirer.prompt([
                {
                    type: "list",
                    name: "category",
                    message: "Select a category:",
                    choices: categories.map((cat) => ({
                        name: cat.charAt(0).toUpperCase() + cat.slice(1),
                        value: cat,
                    })),
                },
            ]);
            const categoryComponents = getComponentsByCategory(category);
            const { component } = await inquirer.prompt([
                {
                    type: "list",
                    name: "component",
                    message: "Select a component to install:",
                    choices: categoryComponents.map((key) => ({
                        name: `${componentRegistry[key].name} (${key})`,
                        value: key,
                    })),
                },
            ]);
            selectedComponent = component;
        }
        const componentInfo = componentRegistry[selectedComponent];
        if (!componentInfo) {
            console.error(chalk.red(`Component "${selectedComponent}" not found.`));
            console.log(chalk.yellow("Available components:"));
            getComponentsList().forEach((key) => {
                console.log(`  - ${key}`);
            });
            process.exit(1);
        }
        // Check if variant is supported
        if (!componentInfo.variants[options.variant]) {
            console.error(chalk.red(`Variant "${options.variant}" not available for this component.`));
            console.log(chalk.yellow("Available variants:"), Object.keys(componentInfo.variants)
                .filter((v) => componentInfo.variants[v])
                .join(", "));
            process.exit(1);
        }
        const spinner = ora("Fetching component files...").start();
        // Fetch component files
        const { files, dependencies } = await fetchComponentFiles(selectedComponent, componentInfo, options.variant);
        if (Object.keys(files).length === 0) {
            spinner.fail(chalk.red("No component files found! Please check if the component exists."));
            process.exit(1);
        }
        spinner.text = "Writing component files...";
        // Write files
        await writeComponentFiles(files, {
            outputDir: options.output,
            componentName: selectedComponent,
            overwrite: options.overwrite,
            format: options.format,
        });
        spinner.succeed(chalk.green(`Component "${selectedComponent}" installed successfully!`));
        // Install dependencies
        if (options.deps && dependencies.length > 0) {
            const installSpinner = ora("Installing dependencies...").start();
            try {
                await execAsync(`npm install ${dependencies.join(" ")}`);
                installSpinner.succeed(chalk.green("Dependencies installed successfully!"));
            }
            catch {
                installSpinner.fail(chalk.red("Failed to install dependencies"));
                console.log(chalk.yellow("Please install manually:"), `npm install ${dependencies.join(" ")}`);
            }
        }
        else if (dependencies.length > 0) {
            console.log(chalk.yellow("Dependencies needed:"), `npm install ${dependencies.join(" ")}`);
        }
        console.log(chalk.blue("\nFiles installed:"));
        Object.keys(files).forEach((fileName) => {
            console.log(`  ✓ ${options.output}/${fileName}`);
        });
    }
    catch (error) {
        console.error(chalk.red("Error:"), error instanceof Error ? error.message : error);
        process.exit(1);
    }
});
program
    .command("list")
    .description("List all available components")
    .option("-c, --category <category>", "Filter by category")
    .action((options) => {
    console.log(chalk.blue.bold("\nAvailable Components:\n"));
    const categories = [
        ...new Set(Object.values(componentRegistry).map((c) => c.category)),
    ];
    categories.forEach((category) => {
        if (!options.category || category === options.category) {
            console.log(chalk.yellow.bold(`${category.toUpperCase()}:`));
            const categoryComponents = getComponentsByCategory(category);
            categoryComponents.forEach((key) => {
                const component = componentRegistry[key];
                console.log(chalk.green(`  ${component.name}`));
                console.log(chalk.gray(`    Key: ${key}`));
                console.log(chalk.gray(`    Description: ${component.description}`));
                console.log(chalk.gray(`    Variants: ${Object.keys(component.variants)
                    .filter((v) => component.variants[v])
                    .join(", ")}`));
            });
            console.log();
        }
    });
});
program
    .command("init")
    .description("Initialize Repeat UI in your project")
    .action(async () => {
    const spinner = ora("Setting up Repeat UI...").start();
    try {
        // Create components directory
        await fs.ensureDir("./components");
        // Create basic config file
        const config = {
            version: "1.0.0",
            outputDir: "./components",
            defaultVariant: "ts-tailwind",
        };
        await fs.writeJSON("./repeat-ui.config.json", config, { spaces: 2 });
        spinner.succeed(chalk.green("Repeat UI initialized successfully!"));
        console.log(chalk.blue("Configuration saved to:"), "./repeat-ui.config.json");
        console.log(chalk.blue("Components will be installed to:"), "./components");
        console.log(chalk.yellow("\nNext steps:"));
        console.log('  1. Run "repeat-ui list" to see available components');
        console.log('  2. Run "repeat-ui add <component-name>" to install a component');
    }
    catch (error) {
        spinner.fail(chalk.red("Failed to initialize Repeat UI"));
        console.error(error);
    }
});
program.parse();
