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
});
