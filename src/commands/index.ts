import { program } from "commander";
import { Modules } from "../modules";

export class Commands {
  constructor() {
    this.defineCLI();

    this.version();

    this.createModule();

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
      .option("--test", "Create a test module")
      .option("--boilerplate", "Include boilerplate file")
      .action((module, options) => {
        Modules.create(module, options);

        process.exit(0);
      });
  }
}
