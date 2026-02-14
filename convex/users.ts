import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const login = mutation({
    args: {
        walletAddress: v.string(),
    },
    handler: async (ctx, args) => {
        const existingUser = await ctx.db
            .query("users")
            .withIndex("by_walletAddress", (q) => q.eq("walletAddress", args.walletAddress))
            .first();

        if (existingUser) {
            await ctx.db.patch(existingUser._id, {
                lastSignedIn: Date.now(),
            });
            return existingUser._id;
        }

        const userId = await ctx.db.insert("users", {
            walletAddress: args.walletAddress,
            role: "user",
            name: `User ${args.walletAddress.slice(0, 6)}...`,
            createdAt: Date.now(),
            lastSignedIn: Date.now(),
            preferences: {
                theme: "system",
                notifications: true,
                language: "en",
                timezone: "UTC",
            },
        });

        return userId;
    },
});

export const updatePreferences = mutation({
    args: {
        userId: v.id("users"),
        preferences: v.object({
            theme: v.optional(v.string()),
            language: v.optional(v.string()),
            notifications: v.optional(v.boolean()),
            timezone: v.optional(v.string()),
        }),
    },
    handler: async (ctx, args) => {
        const { userId, preferences } = args;

        // Check if user exists first (optional but good practice)
        const user = await ctx.db.get(userId);
        if (!user) {
            throw new Error("User not found");
        }

        // Merge new preferences with existing ones
        const currentPreferences = user.preferences || {};

        await ctx.db.patch(userId, {
            preferences: { ...currentPreferences, ...preferences },
        });
    },
});

export const getUser = query({
    args: { userId: v.id("users") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.userId);
    },
});

export const getUserByWallet = query({
    args: { walletAddress: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("users")
            .withIndex("by_walletAddress", (q) => q.eq("walletAddress", args.walletAddress))
            .first();
    },
});
