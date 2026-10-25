#!/usr/bin/env node

import { Command } from "commander";
import inquirer from "inquirer";
import chalk from "chalk";
import ora from "ora";
import { execSync } from "child_process";
import { readFileSync } from "fs";
import { relative } from "path";
import { addComponent, detectPackageManager, getJson, DEFAULT_REGISTRY, FLAVORS } from "./registry.js";

const pkg = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8"));
const program = new Command();

program
  .name("repeat-ui")
  .description("Add Repeat UI components to your project")
  .version(pkg.version)
  .option("--registry <url>", "Registry URL or local folder", DEFAULT_REGISTRY);

async function getIndex() {
  const index = await getJson(program.opts().registry, "index.json");
  if (!index) throw new Error("Could not load the component list from the registry.");
  return index;
}

async function pickComponent() {
  const index = await getIndex();
  const { category } = await inquirer.prompt([
    {
      type: "list",
      name: "category",
      message: "Select a category:",
      choices: [...new Set(index.map((c) => c.category))],
    },
  ]);
  const { component } = await inquirer.prompt([
    {
      type: "list",
      name: "component",
      message: "Select a component to install:",
      choices: index
        .filter((c) => c.category === category)
        .map((c) => ({ name: `${c.title} (${c.name})`, value: c.name })),
    },
  ]);
  return component;
}

program
  .command("add")
  .description("Add a component to your project")
  .argument("[component]", "Component name, for example button-simple")
  .option("-v, --variant <variant>", `Component variant (${FLAVORS.join(", ")})`, "ts-tailwind")
  .option("-o, --output <dir>", "Folder for components", "components")
  .option("--overwrite", "Overwrite existing files")
  .option("--no-deps", "Do not install the packages the component needs")
  .action(async (componentName, options) => {
    const spinner = ora();
    try {
      const name = componentName || (await pickComponent());
      spinner.start(`Adding ${name}...`);
      const { files, missing, hasPackageJson } = await addComponent(name, {
        ...options,
        registry: program.opts().registry,
      });
      spinner.succeed(chalk.green(`Added ${name}`));
      files.forEach((f) => console.log(`  ${chalk.green("+")} ${relative(process.cwd(), f)}`));

      if (missing.length === 0) return;
      const [pm, verb] = detectPackageManager(process.cwd());
      const command = `${pm} ${verb} ${missing.join(" ")}`;
      if (!options.deps || !hasPackageJson) {
        console.log(chalk.yellow("\nThis component needs:"), command);
        return;
      }
      console.log(chalk.blue(`\nInstalling ${missing.join(", ")}...`));
      // Runs through a shell so npm.cmd works on Windows; addComponent only lets plain package names through.
      execSync(command, { stdio: "inherit" });
    } catch (error) {
      spinner.stop();
      console.error(chalk.red("Error:"), error.message);
      process.exit(1);
    }
  });

program
  .command("list")
  .description("List all available components")
  .option("-c, --category <category>", "Only show one category")
  .action(async (options) => {
    try {
      const index = await getIndex();
      for (const category of new Set(index.map((c) => c.category))) {
        if (options.category && category !== options.category) continue;
        console.log(chalk.yellow.bold(`\n${category.toUpperCase()}`));
        index
          .filter((c) => c.category === category)
          .forEach((c) => console.log(`  ${chalk.green(c.name.padEnd(34))} ${chalk.gray(c.description)}`));
      }
      console.log(chalk.gray(`\nVariants: ${FLAVORS.join(", ")}`));
    } catch (error) {
      console.error(chalk.red("Error:"), error.message);
      process.exit(1);
    }
  });

program.parse();
