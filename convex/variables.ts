import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { StageValidator } from "./schema";

export const get = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    const variables = await ctx.db
      .query("variables")
      .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
      .collect();

    return variables;
  },
});

export const getVarsandProject = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    const project = await ctx.db.get(args.projectId);
    if (project == null) {
      throw new Error("project doesn't exist");
    }
    const variables = await ctx.db
      .query("variables")
      .withIndex("by_project", (q) => q.eq("projectId", project._id))
      .collect();

    return { variables, project };
  },
});

export const create = mutation({
  args: {
    projectId: v.id("projects"),
    name: v.string(),
    value: v.string(),
    stage: StageValidator,
  },
  handler: async (ctx, args) => {
    const project = await ctx.db.get(args.projectId);
    if (project == null) {
      throw new Error("project doesn't exist");
    }

    const existing = await ctx.db
      .query("variables")
      .withIndex("by_project_and_name", (q) =>
        q.eq("projectId", project._id).eq("name", args.name),
      )
      .first();

    if (existing !== null) {
      throw new Error(
        `Variable: ${args.name} exists in project: ${project.name}`,
      );
    }
    const newVarId = await ctx.db.insert("variables", {
      ...args,
      projectId: project._id,
    });
    return newVarId;
  },
});
