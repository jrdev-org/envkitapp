import Database from "better-sqlite3";
import { createClient, type Client } from "@libsql/client";
import { env } from "@/env";

let sqliteDb: Database.Database | null = null;
let tursoDb: Client | null = null;

if (env.NODE_ENV === "production") {
  tursoDb = createClient({
    url: env.TURSO_DATABASE_URL,
    authToken: env.TURSO_AUTH_TOKEN,
  });
} else {
  sqliteDb = new Database("./sqlite-auth.db");
}

export { sqliteDb, tursoDb };
