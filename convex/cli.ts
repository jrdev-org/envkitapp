// convex/cli.ts - Updated with proper auth flow
import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { nanoid } from "nanoid";

// Initialize CLI session (called when CLI starts auth process)
export const initSession = mutation({
  args: {
    deviceId: v.string(),
    userAgent: v.optional(v.string()),
  },
  async handler(ctx, args) {
    // Clean up any existing pending sessions for this device
    console.log("Creating session");

    const existingSessions = await ctx.db
      .query("cliSessions")
      .withIndex("by_deviceId", (q) => q.eq("deviceId", args.deviceId))
      .filter((q) => q.eq(q.field("status"), "pending"))
      .collect();

    for (const session of existingSessions) {
      await ctx.db.patch(session._id, { status: "revoked" });
    }

    // Create new session
    const token = nanoid(32); // This will be the auth token once authenticated
    const sessionId = await ctx.db.insert("cliSessions", {
      deviceId: args.deviceId,
      userId: undefined as any, // Will be set when user authenticates in browser
      token,
      status: "pending",
      createdAt: Date.now(),
      expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes for auth completion
      lastUsedAt: Date.now(),
      lastAction: "init",
      userAgent: args.userAgent,
    });

    return { sessionId, deviceId: args.deviceId };
  },
});

// Complete authentication (called from your web app after user signs in)
export const completeAuth = mutation({
  args: {
    deviceId: v.string(),
    userId: v.id("users"),
    sessionId: v.optional(v.id("cliSessions")), // Optional if you want to find by deviceId
  },
  async handler(ctx, args) {
    let session;

    if (args.sessionId) {
      session = await ctx.db.get(args.sessionId);
    } else {
      // Find pending session by deviceId
      session = await ctx.db
        .query("cliSessions")
        .withIndex("by_deviceId", (q) => q.eq("deviceId", args.deviceId))
        .filter((q) => q.eq(q.field("status"), "pending"))
        .first();
    }

    if (!session) {
      throw new Error("No pending session found for this device");
    }

    if (session.expiresAt < Date.now()) {
      await ctx.db.patch(session._id, { status: "revoked" });
      throw new Error("Session expired");
    }

    // Generate new long-lived token for CLI usage
    const cliToken = nanoid(32);

    await ctx.db.patch(session._id, {
      userId: args.userId,
      token: cliToken,
      status: "authenticated",
      lastUsedAt: Date.now(),
      expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    return {
      success: true,
      token: cliToken,
      userId: args.userId,
      sessionId: session._id,
      expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000,
    };
  },
});

// Check session status (polled by CLI)
export const getSessionStatus = query({
  args: {
    sessionId: v.id("cliSessions"),
  },
  async handler(ctx, { sessionId }) {
    const session = await ctx.db.get(sessionId);

    if (!session) {
      return { status: "not_found" };
    }

    if (session.expiresAt < Date.now()) {
      return { status: "expired" };
    }

    if (session.status === "authenticated") {
      return {
        status: "completed",
        token: session.token,
        userId: session.userId,
        expiresAt: session.expiresAt,
      };
    }

    return { status: "pending" };
  },
});

// Alternative: Get session status by deviceId (if you prefer this approach)
export const getSessionByDevice = query({
  args: {
    deviceId: v.string(),
  },
  async handler(ctx, { deviceId }) {
    const session = await ctx.db
      .query("cliSessions")
      .withIndex("by_deviceId", (q) => q.eq("deviceId", deviceId))
      .filter((q) => q.neq(q.field("status"), "revoked"))
      .first();

    if (!session) {
      return { status: "not_found" };
    }

    if (session.expiresAt < Date.now()) {
      return { status: "expired" };
    }

    if (session.status === "authenticated") {
      return {
        sessionId: session._id,
        status: "completed",
        token: session.token,
        userId: session.userId,
        expiresAt: session.expiresAt,
      };
    }

    return { status: "pending" };
  },
});

// Validate CLI token for authenticated requests
export const validateToken = mutation({
  args: {
    token: v.string(),
  },
  async handler(ctx, { token }) {
    const session = await ctx.db
      .query("cliSessions")
      .withIndex("by_token", (q) => q.eq("token", token))
      .first();

    if (!session || session.status !== "authenticated") {
      return { valid: false };
    }

    if (session.expiresAt < Date.now()) {
      await ctx.db.patch(session._id, { status: "revoked" });
      return { valid: false, reason: "expired" };
    }

    // Update last used
    await ctx.db.patch(session._id, {
      lastUsedAt: Date.now(),
    });

    return {
      valid: true,
      userId: session.userId,
      deviceId: session.deviceId,
      sessionId: session._id,
    };
  },
});

// Revoke session (logout)
export const revokeSession = mutation({
  args: {
    sessionId: v.id("cliSessions"),
  },
  async handler(ctx, { sessionId }) {
    const session = await ctx.db.get(sessionId);
    if (!session) {
      throw new Error("Session not found");
    }

    await ctx.db.patch(session._id, {
      status: "revoked",
      lastUsedAt: Date.now(),
    });

    return { success: true };
  },
});

// Register device after authentication
export const registerDevice = mutation({
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
      // Update existing device
      await ctx.db.patch(existing._id, {
        ...args,
        lastUsedAt: now,
      });
      return { deviceId: existing._id, updated: true };
    }

    // Create new device
    const newDeviceId = await ctx.db.insert("devices", {
      ...args,
      createdAt: now,
      lastUsedAt: now,
    });

    return { deviceId: newDeviceId, updated: false };
  },
});

// List user's authenticated devices
export const listUserDevices = query({
  args: {
    userId: v.id("users"),
  },
  async handler(ctx, { userId }) {
    const devices = await ctx.db
      .query("devices")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    // Get active sessions for each device
    const devicesWithSessions = await Promise.all(
      devices.map(async (device) => {
        const activeSession = await ctx.db
          .query("cliSessions")
          .withIndex("by_deviceId", (q) => q.eq("deviceId", device.deviceId))
          .filter((q) => q.eq(q.field("status"), "authenticated"))
          .first();

        return {
          ...device,
          hasActiveSession: !!activeSession,
          lastSessionActivity: activeSession?.lastUsedAt,
        };
      }),
    );

    return devicesWithSessions;
  },
});
