import { defineSchema, defineTable } from "convex/server";
import { v, type Infer } from "convex/values";

export const StageValidator = v.union(
  v.literal("development"),
  v.literal("production"),
  v.literal("staging"),
);

export type Stage = Infer<typeof StageValidator>;

export default defineSchema({
  users: defineTable({
    name: v.string(),
    authId: v.string(),
    email: v.string(),
  })
    .index("by_email", ["email"])
    .index("by_authId", ["authId"]),
  projects: defineTable({
    name: v.string(),
    ownerId: v.id("users"),
  })
    .index("by_owner", ["ownerId"])
    .index("by_owner_and_name", ["ownerId", "name"]),
  variables: defineTable({
    projectId: v.id("projects"),
    name: v.string(),
    value: v.string(),
    stage: StageValidator,
    branch: v.optional(v.string()),
  })
    .index("by_project", ["projectId"])
    .index("by_project_and_name", ["projectId", "name"])
    .index("by_stage_project", ["stage", "projectId"])
    .index("by_branch_project", ["branch", "projectId"])
    .index("by_stage_branch_project", ["stage", "branch", "projectId"]),
  devices: defineTable({
    userId: v.id("users"),
    deviceId: v.string(),
    deviceName: v.optional(v.string()), // Optional: hostname or friendly name
    platform: v.string(),
    arch: v.optional(v.string()),
    username: v.string(),
    nodeVersion: v.string(),
    cliVersion: v.string(),
    createdAt: v.number(),
    lastUsedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_deviceId", ["deviceId"])
    .index("by_username", ["username"]),
  cliSessions: defineTable({
    userId: v.id("users"), // Authenticated user
    deviceId: v.string(), // Foreign key to devices.deviceId
    token: v.string(), // Optional CLI token for API calls
    status: v.union(
      v.literal("pending"),
      v.literal("authenticated"),
      v.literal("revoked"),
    ),
    createdAt: v.number(),
    expiresAt: v.number(),
    lastUsedAt: v.number(),
    lastAction: v.optional(v.string()),
    userAgent: v.optional(v.string()),
  })
    .index("by_user", ["userId"])
    .index("by_deviceId", ["deviceId"])
    .index("by_token", ["token"])
    .index("by_status", ["status"]),
});
