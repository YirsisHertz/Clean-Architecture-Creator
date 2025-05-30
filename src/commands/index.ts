import chalk from "chalk";
import { program } from "commander";
import { Modules } from "../modules";
import { TsFilesGenerator } from "../modules/ts/tsFiles.generator";

export class Commands {
  constructor() {
    this.defineCLI();

    this.version();

    this.createModule();
    this.createRepository();
    this.createEntity();
    this.createAdapter();
    this.createModel();
    this.createUseCase();
    this.createEnum();
    this.createInterface();

    program.parse();
  }

  private defineCLI() {
    program
      .name("cac")
      .description(
        "Clean Architecture Create is a CLI tool to create clean architecture projects"
      );
  }

  private version() {
    program.option("-v, --version", "output the version number", () => {
      console.log(process.env.VERSION);
      process.exit(0);
    });
  }

  private createModule() {
    program
      .command("module")
      .alias("m")
      .argument("<module>", "Module name")
      .description("Create a new module")
      .option("--flat", "Create a flat module structure")
      .option("--test", "Create a test module")
      // .option("--boilerplate", "Include boilerplate file")
      .option("--dry", "Dry run mode, only show what would be created")
      .action((module, options) => {
        Modules.create(module, options);

        process.exit(0);
      });
  }

  private createRepository() {
    program
      .command("repository")
      .alias("r")
      .argument("<repository>", "Repository name")
      .description(
        "Create a new repository, using the format <module>/<repository>"
      )
      .option(
        "--lang <lang>",
        "Language of the repository | Compatibles [ts, js]",
        "ts"
      )
      .option("--flat", "Create a flat repository structure")
      .option("--dry", "Dry run mode, only show what would be created")
      .action((repository, options) => {
        const lang = options.lang;

        const compatibleLangs = ["ts", "js"];

        if (!compatibleLangs.includes(lang)) {
          console.log(
            chalk.red(
              `Language ${lang} is not supported. Compatible languages are: ${compatibleLangs.join(
                ", "
              )}`
            )
          );
          process.exit(1);
        }

        if (lang === "js") {
          console.log(
            chalk.red(
              "JavaScript not supported Abstract Class in the lang, use TypeScript please."
            )
          );
          process.exit(1);
        }

        if (lang === "ts") {
          TsFilesGenerator.createRepository(repository, options);
        }

        process.exit(0);
      });
  }

  private createEntity() {}
  private createAdapter() {}
  private createModel() {}
  private createUseCase() {}
  private createEnum() {}
  private createInterface() {}
}
