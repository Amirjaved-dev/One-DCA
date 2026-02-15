import { query } from "../_generated/server";
import { v } from "convex/values";

/**
 * Get the latest sentiment analysis for a token.
 */
export const getLatestSentiment = query({
    args: { tokenSymbol: v.string() },
    handler: async (ctx, args) => {
        // Check if the table exists first to avoid errors during initial setup
        // But Convex handles this gracefully usually.
        const sentiment = await ctx.db
            .query("marketSentiment")
            .withIndex("by_token", (q) => q.eq("tokenSymbol", args.tokenSymbol))
            .order("desc") // Get the newest one
            .first();

        return sentiment;
    },
});

/**
 * Get recent agent activity logs.
 */
export const getRecentLogs = query({
    args: {},
    handler: async (ctx) => {
        const logs = await ctx.db
            .query("agentLogs")
            .order("desc")
            .take(10); // Last 10 actions

        return logs;
    },
});
