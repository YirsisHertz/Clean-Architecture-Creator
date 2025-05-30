type Languages = "ts" | "js";

export interface FilesGeneratorOptions {
  dry: boolean;
  flat: boolean;
  lang: Languages;
}
