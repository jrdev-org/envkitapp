import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    authId: v.string(),
    email: v.string(),
  }).index("by_email", ["email"]),
  projects: defineTable({
    name: v.string(),
    ownerId: v.id("users"),
  })
    .index("by_owner", ["ownerId"])
    .index("by_owner_and_name", ["name", "ownerId"]),
});
