#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const inquirer_1 = __importDefault(require("inquirer"));
const chalk_1 = __importDefault(require("chalk"));
const ora_1 = __importDefault(require("ora"));
const registry_js_1 = require("./registry.js");
const fetcher_js_1 = require("./fetcher.js");
const writer_js_1 = require("./writer.js");
const child_process_1 = require("child_process");
const util_1 = require("util");
const fs_extra_1 = __importDefault(require("fs-extra"));
const execAsync = (0, util_1.promisify)(child_process_1.exec);
const program = new commander_1.Command();
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
                ...new Set(Object.values(registry_js_1.componentRegistry).map((c) => c.category)),
            ];
            const { category } = await inquirer_1.default.prompt([
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
            const categoryComponents = (0, registry_js_1.getComponentsByCategory)(category);
            const { component } = await inquirer_1.default.prompt([
                {
                    type: "list",
                    name: "component",
                    message: "Select a component to install:",
                    choices: categoryComponents.map((key) => ({
                        name: `${registry_js_1.componentRegistry[key].name} (${key})`,
                        value: key,
                    })),
                },
            ]);
            selectedComponent = component;
        }
        const componentInfo = registry_js_1.componentRegistry[selectedComponent];
        if (!componentInfo) {
            console.error(chalk_1.default.red(`Component "${selectedComponent}" not found.`));
            console.log(chalk_1.default.yellow("Available components:"));
            (0, registry_js_1.getComponentsList)().forEach((key) => {
                console.log(`  - ${key}`);
            });
            process.exit(1);
        }
        // Check if variant is supported
        if (!componentInfo.variants[options.variant]) {
            console.error(chalk_1.default.red(`Variant "${options.variant}" not available for this component.`));
            console.log(chalk_1.default.yellow("Available variants:"), Object.keys(componentInfo.variants)
                .filter((v) => componentInfo.variants[v])
                .join(", "));
            process.exit(1);
        }
        const spinner = (0, ora_1.default)("Fetching component files...").start();
        // Fetch component files
        const { files, dependencies } = await (0, fetcher_js_1.fetchComponentFiles)(selectedComponent, componentInfo, options.variant);
        if (Object.keys(files).length === 0) {
            spinner.fail(chalk_1.default.red("No component files found! Please check if the component exists."));
            process.exit(1);
        }
        spinner.text = "Writing component files...";
        // Write files
        await (0, writer_js_1.writeComponentFiles)(files, {
            outputDir: options.output,
            componentName: selectedComponent,
            overwrite: options.overwrite,
            format: options.format,
        });
        spinner.succeed(chalk_1.default.green(`Component "${selectedComponent}" installed successfully!`));
        // Install dependencies
        if (options.deps && dependencies.length > 0) {
            const installSpinner = (0, ora_1.default)("Installing dependencies...").start();
            try {
                await execAsync(`npm install ${dependencies.join(" ")}`);
                installSpinner.succeed(chalk_1.default.green("Dependencies installed successfully!"));
            }
            catch {
                installSpinner.fail(chalk_1.default.red("Failed to install dependencies"));
                console.log(chalk_1.default.yellow("Please install manually:"), `npm install ${dependencies.join(" ")}`);
            }
        }
        else if (dependencies.length > 0) {
            console.log(chalk_1.default.yellow("Dependencies needed:"), `npm install ${dependencies.join(" ")}`);
        }
        console.log(chalk_1.default.blue("\nFiles installed:"));
        Object.keys(files).forEach((fileName) => {
            console.log(`  ✓ ${options.output}/${fileName}`);
        });
    }
    catch (error) {
        console.error(chalk_1.default.red("Error:"), error instanceof Error ? error.message : error);
        process.exit(1);
    }
});
program
    .command("list")
    .description("List all available components")
    .option("-c, --category <category>", "Filter by category")
    .action((options) => {
    console.log(chalk_1.default.blue.bold("\nAvailable Components:\n"));
    const categories = [
        ...new Set(Object.values(registry_js_1.componentRegistry).map((c) => c.category)),
    ];
    categories.forEach((category) => {
        if (!options.category || category === options.category) {
            console.log(chalk_1.default.yellow.bold(`${category.toUpperCase()}:`));
            const categoryComponents = (0, registry_js_1.getComponentsByCategory)(category);
            categoryComponents.forEach((key) => {
                const component = registry_js_1.componentRegistry[key];
                console.log(chalk_1.default.green(`  ${component.name}`));
                console.log(chalk_1.default.gray(`    Key: ${key}`));
                console.log(chalk_1.default.gray(`    Description: ${component.description}`));
                console.log(chalk_1.default.gray(`    Variants: ${Object.keys(component.variants)
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
    const spinner = (0, ora_1.default)("Setting up Repeat UI...").start();
    try {
        // Create components directory
        await fs_extra_1.default.ensureDir("./components");
        // Create basic config file
        const config = {
            version: "1.0.0",
            outputDir: "./components",
            defaultVariant: "ts-tailwind",
        };
        await fs_extra_1.default.writeJSON("./repeat-ui.config.json", config, { spaces: 2 });
        spinner.succeed(chalk_1.default.green("Repeat UI initialized successfully!"));
        console.log(chalk_1.default.blue("Configuration saved to:"), "./repeat-ui.config.json");
        console.log(chalk_1.default.blue("Components will be installed to:"), "./components");
        console.log(chalk_1.default.yellow("\nNext steps:"));
        console.log('  1. Run "repeat-ui list" to see available components');
        console.log('  2. Run "repeat-ui add <component-name>" to install a component');
    }
    catch (error) {
        spinner.fail(chalk_1.default.red("Failed to initialize Repeat UI"));
        console.error(error);
    }
});
program.parse();
