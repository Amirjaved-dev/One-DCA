import { query, mutation, action } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";
import { parseIntent } from "./intentParser";

// --- Queries ---

export const list = query({
    args: { userId: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("messages")
            .withIndex("by_userId", (q) => q.eq("userId", args.userId))
            .order("asc")
            .collect();
    },
});

// --- Internal Mutations ---

export const saveMessage = mutation({
    args: {
        userId: v.string(),
        body: v.string(),
        role: v.string(),
        intent: v.optional(v.any()), // Using any for flexibility with JSON
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("messages", {
            userId: args.userId,
            body: args.body,
            role: args.role,
            intent: args.intent,
            timestamp: Date.now(),
        });
    },
});

// --- Actions ---

export const sendMessage = action({
    args: {
        userId: v.string(),
        body: v.string(),
    },
    handler: async (ctx, args) => {
        // 1. Save User Message
        // @ts-ignore
        await ctx.runMutation(internal.chat.saveMessage, {
            userId: args.userId,
            body: args.body,
            role: "user",
        });

        // 2. Process Intent (Mock LLM)
        const intent = parseIntent(args.body);

        let aiResponse = "I didn't quite catch that. Try saying 'Buy $10 of SUI weekly'.";
        let aiIntent = undefined;

        if (intent) {
            aiResponse = `I can help you set up a DCA to buy $${intent.amount} of ${intent.token} ${intent.frequency}. Does this look correct?`;
            aiIntent = {
                type: "confirm_investment",
                data: intent,
            };
        }

        // 3. Save AI Response
        // @ts-ignore
        await ctx.runMutation(internal.chat.saveMessage, {
            userId: args.userId,
            body: aiResponse,
            role: "assistant",
            intent: aiIntent,
        });
    },
});
