import { app } from "electron";
import Database = require("better-sqlite3");
import { join } from "path";

const userDataBasePath = app.getPath("userData");
const dbPath = join(userDataBasePath, "app.db");

const db = new Database(dbPath);

export { db };

