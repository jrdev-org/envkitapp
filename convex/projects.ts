import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: { name: v.string(), userId: v.id("users") },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("projects")
      .withIndex("by_owner_and_name", (q) =>
        q.eq("name", args.name).eq("ownerId", args.userId),
      )
      .first();

    if (existing !== null) {
      console.log(`Project exists: ${existing._id}`);

      return existing;
    }

    const newProjectId = await ctx.db.insert("projects", {
      name: args.name,
      ownerId: args.userId,
    });
    return newProjectId;
  },
});

export const list = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const userProjects = await ctx.db
      .query("projects")
      .withIndex("by_owner", (q) => q.eq("ownerId", args.userId))
      .collect();
    return userProjects;
  },
});
