type Languages = "ts" | "js";
export type FileType = "entity" | "repository";

export interface FilesGeneratorOptions {
  dry: boolean;
  flat: boolean;
  lang: Languages;
}
