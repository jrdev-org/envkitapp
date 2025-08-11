import { betterAuth } from "better-auth";
import { env } from "@/env";
import Database from "better-sqlite3";
import { createClient } from "@libsql/client";

// Decide which database to use
const database =
  env.NODE_ENV === "production"
    ? createClient({
        url: env.TURSO_DATABASE_URL,
        authToken: env.TURSO_AUTH_TOKEN,
      })
    : new Database("./sqlite-auth.db");

export const auth = betterAuth({
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
  },
  database,
});
