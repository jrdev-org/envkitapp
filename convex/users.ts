import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: { authId: v.string(), name: v.string(), email: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existing !== null) {
      console.log(`User already exists! ${existing._id}`);
      return existing._id;
    }

    const newUserId = await ctx.db.insert("users", {
      authId: args.authId,
      name: args.name,
      email: args.email,
    });

    return newUserId;
  },
});

export const getByAuthId = query({
  args: { authId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("authId"), args.authId))
      .collect()
      .then((user) => user[0]);

    return user;
  },
});
