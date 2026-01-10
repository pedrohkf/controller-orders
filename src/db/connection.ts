import { app } from "electron";
import Database from "better-sqlite3";
import { join } from "path";

const userDataBasePath = app.getPath("userData");
const dbPath = join(userDataBasePath, "app.db");

const db = new Database(dbPath);

db.exec("PRAGMA foreign_keys = ON;");

export { db };

