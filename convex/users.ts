import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: { authId: v.string(), name: v.string(), email: v.string() },
  handler: async (ctx, args) => {
    const authId = args.authId.trim();
    const email = args.email.trim().toLowerCase();
    const name = args.name.trim();

    // 1) Prefer lookup by authId.
    const existingByAuth = await ctx.db
      .query("users")
      .withIndex("by_authId", (q) => q.eq("authId", authId))
      .first();
    if (existingByAuth !== null) {
      return existingByAuth._id;
    }

    // 2) De-dupe by normalized email.
    const existingByEmail = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", email))
      .first();
    if (existingByEmail !== null) {
      // Optionally patch missing authId if your schema permits:
      // await ctx.db.patch(existingByEmail._id, { authId });
      return existingByEmail._id;
    }

    const newUserId = await ctx.db.insert("users", {
      authId,
      name,
      email,
    });
    return newUserId;
  },
});

export const getByAuthId = query({
  args: { authId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_authId", (q) => q.eq("authId", args.authId))
      .first();
    return user;
  },
});
