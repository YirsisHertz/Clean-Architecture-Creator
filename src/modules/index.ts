import fs from "node:fs";
import path from "node:path";

import chalk from "chalk";

import type { ModuleOptions } from "../interfaces/Modules.interfaces";

export class Modules {
  private static folders = [
    "adapters",
    "enums",
    "interfaces",
    "domain",
    "domain/entities",
    "domain/repositories",
    "datasources",
    "datasources/models",
    "datasources/static",
    "use-cases",
    "presentation"
  ];

  static dryRunMode(name: string, options?: ModuleOptions) {
    if (!name) {
      console.error(chalk.red("Module name is required."));
      process.exit(1);
    }

    const modulePath = options?.flat
      ? path.join(process.cwd())
      : path.join(process.cwd(), "src", name);

    if (options?.test) {
      this.folders.push("__tests__");
    }

    console.log(
      chalk.bold.bgYellow(
        `☣ You are using Dry Run Mode so nothing you run will affect your FileSystem, to disable it, make sure to remove the --dry flag.`
      )
    );
    console.log(chalk.cyan(`🛠 Dry run mode: Module ${name} would be created.`));

    this.folders.forEach((folder) => {
      const folderPath = path.join(modulePath, folder);
      console.log(chalk.green(` ✔ Folder to be created: ${folderPath}`));
    });
  }

  static create(name: string, options?: ModuleOptions) {
    if (!name) {
      console.error(chalk.red("Module name is required."));
      process.exit(1);
    }

    if (options?.dry) {
      this.dryRunMode(name, options);
      process.exit(0);
    }

    const modulePath = options?.flat
      ? path.join(process.cwd())
      : path.join(process.cwd(), "src", name);

    if (options?.test) {
      this.folders.push("__tests__");
    }

    console.log(chalk.cyan(`🛠 Creation your module in progress...`));

    try {
      fs.mkdirSync(modulePath, { recursive: true });

      this.folders.forEach((folder) => {
        const folderPath = path.join(modulePath, folder);

        fs.mkdirSync(folderPath);
        fs.writeFileSync(path.join(folderPath, ".gitkeep"), "");

        console.log(chalk.green(` ✔ Created folder: ${folder}`));
      });

      console.log(chalk.bold.bgGreen(`Module ${name} created successfully!`));
    } catch (error: any) {
      console.error(
        chalk.red(`Error creating module: ${name} ${error.message}`)
      );
      process.exit(1);
    }
  }
}
