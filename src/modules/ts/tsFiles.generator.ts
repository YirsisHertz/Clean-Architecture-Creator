import fs from "node:fs";
import path from "node:path";

import chalk from "chalk";

import type {
  FilesGeneratorOptions,
  FileType
} from "../../interfaces/FilesGenerator.interfaces";

export class TsFilesGenerator {
  private static capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  static dryRunMode(route: string, modulePath: string, type: FileType) {
    console.log(
      chalk.bold.bgYellow(
        `☣ You are using Dry Run Mode so nothing you run will affect your FileSystem, to disable it, make sure to remove the --dry flag.`
      )
    );

    console.log(
      chalk.cyan(`🛠 Dry run mode: Your ${type} ${route} would be created.`)
    );

    console.log(
      chalk.cyan(
        `🛠 Dry run mode: Your ${type} file would be created at: ${path.join(
          modulePath,
          `${route}.${type}.ts`
        )}`
      )
    );
  }

  static createRepository(repository: string, options?: FilesGeneratorOptions) {
    const route = repository.trim().split("/");

    const repositoryName = options?.flat
      ? path.join(process.cwd())
      : path.join(
          process.cwd(),
          "src",
          `${route[0]}`,
          "domain",
          "repositories"
        );

    if (options?.dry) {
      this.dryRunMode(
        `${options.flat ? route[0] : route[1]}`,
        repositoryName,
        "repository"
      );

      process.exit(0);
    }

    const repositoryPath = path.join(
      repositoryName,
      `${options?.flat ? route[0] : route[1]}.repository.ts`
    );

    if (fs.existsSync(repositoryPath)) {
      console.log(
        chalk.red(
          `❌ Repository file already exists at: ${repositoryPath}. Please choose a different name or remove the existing file.`
        )
      );

      process.exit(1);
    }

    const repositoryContent = `export abstract class ${this.capitalizeFirstLetter(
      `${options?.flat ? route[0] : route[1]}`
    )}Repository {\n  abstract firstRule(options: any /*define your params or options*/): void;\n}`;

    fs.writeFileSync(repositoryPath, repositoryContent, { encoding: "utf-8" });

    console.log(
      chalk.green(`✔ Repository file to be created: ${repositoryPath}`)
    );
  }

  static createEntity(entitie: string, options?: FilesGeneratorOptions) {
    const route = entitie.trim().split("/");

    const entityName = options?.flat
      ? path.join(process.cwd())
      : path.join(process.cwd(), "src", `${route[0]}`, "domain", "entities");

    if (options?.dry) {
      this.dryRunMode(
        `${options.flat ? route[0] : route[1]}`,
        entityName,
        "entity"
      );

      process.exit(0);
    }

    const entityPath = path.join(
      entityName,
      `${options?.flat ? route[0] : route[1]}.entity.ts`
    );

    if (fs.existsSync(entityPath)) {
      console.log(
        chalk.red(
          `❌ Entity file already exists at: ${entityPath}. Please choose a different name or remove the existing file.`
        )
      );

      process.exit(1);
    }

    const entityContent = `export interface ${this.capitalizeFirstLetter(
      `${options?.flat ? route[0] : route[1]}`
    )}Entity {\n  // Define your entity properties here\n}`;

    fs.writeFileSync(entityPath, entityContent, { encoding: "utf-8" });

    console.log(chalk.green(`✔ Entity file to be created: ${entityPath}`));
  }
}
