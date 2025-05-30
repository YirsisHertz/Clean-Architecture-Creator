import fs from "node:fs";
import path from "node:path";

import chalk from "chalk";

export class Modules {
  static async create(name: string) {
    if (!name) {
      console.error(chalk.red("Module name is required."));
      process.exit(1);
    }

    const folders = [
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

    const modulePath = path.join(process.cwd(), "src", name);

    console.log(chalk.cyan(`🛠 Creation your module in progress...`));

    try {
      const res = fs.mkdirSync(modulePath, { recursive: true });

      console.log(res);

      folders.forEach((folder) => {
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
