import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Register or update a device
export const register = mutation({
  args: {
    userId: v.id("users"),
    deviceId: v.string(),
    deviceName: v.optional(v.string()),
    platform: v.string(),
    arch: v.string(),
    username: v.string(),
    nodeVersion: v.string(),
    cliVersion: v.string(),
  },
  async handler(ctx, args) {
    const existing = await ctx.db
      .query("devices")
      .withIndex("by_deviceId", (q) => q.eq("deviceId", args.deviceId))
      .first();

    const now = Date.now();

    if (existing) {
      await ctx.db.patch(existing._id, {
        ...args,
        lastUsedAt: now,
      });
      return existing._id;
    }

    const newDeviceId = await ctx.db.insert("devices", {
      ...args,
      createdAt: now,
      lastUsedAt: now,
    });

    return newDeviceId;
  },
});

// Get device info by deviceId
export const get = query({
  args: {
    deviceId: v.string(),
  },
  async handler(ctx, { deviceId }) {
    return await ctx.db
      .query("devices")
      .withIndex("by_deviceId", (q) => q.eq("deviceId", deviceId))
      .first();
  },
});

// List all devices for a user
export const list = query({
  args: {
    userId: v.id("users"),
  },
  async handler(ctx, { userId }) {
    return await ctx.db
      .query("devices")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();
  },
});
