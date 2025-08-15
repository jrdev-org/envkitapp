import { betterAuth } from "better-auth";
import { env } from "@/env";
import { sqliteDb, tursoDb } from "./db";

// Decide which database to use
const database = env.NODE_ENV === "production" ? tursoDb : sqliteDb;

export const auth = betterAuth({
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
  },
  database,
});
