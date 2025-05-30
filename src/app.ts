import dotenv from "dotenv";

import { Commands } from "./commands";

export class App {
  constructor() {
    dotenv.config();
  }

  start() {
    new Commands();
  }
}
