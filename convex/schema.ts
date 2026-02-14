import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    // Users table
    users: defineTable({
        name: v.optional(v.string()),
        email: v.optional(v.string()),
        walletAddress: v.string(), // Unique identifier from wallet
        role: v.string(), // "user" | "admin"
        lastSignedIn: v.number(),
        createdAt: v.number(),
        preferences: v.optional(v.object({
            theme: v.optional(v.string()),
            language: v.optional(v.string()),
            notifications: v.optional(v.boolean()),
            timezone: v.optional(v.string()),
        })),
    }).index("by_walletAddress", ["walletAddress"]),

    // Investment schedules
    schedules: defineTable({
        userId: v.id("users"),
        token: v.string(), // e.g., "SUI"
        amountUSD: v.number(),
        frequency: v.string(), // "daily", "weekly", "monthly"
        cronExpression: v.string(),
        startDate: v.number(),
        endDate: v.optional(v.number()),
        status: v.string(), // "active", "paused", "completed", "cancelled"
        nextExecution: v.number(),
        lastExecution: v.optional(v.number()),
        executionCount: v.number(),
        createdAt: v.number(),
    }).index("by_userId", ["userId"])
        .index("by_status_nextExecution", ["status", "nextExecution"]),

    // Transactions
    transactions: defineTable({
        scheduleId: v.id("schedules"),
        userId: v.id("users"),
        token: v.string(),
        amountUSD: v.number(),
        tokenAmount: v.number(),
        price: v.number(),
        txHash: v.optional(v.string()),
        status: v.string(), // "pending", "success", "failed"
        errorMessage: v.optional(v.string()),
        createdAt: v.number(),
    }).index("by_userId", ["userId"])
        .index("by_scheduleId", ["scheduleId"]),

    // Agent activity logs
    agentLogs: defineTable({
        userId: v.id("users"), // Can be null if system action? No, always tied to user context ideally
        action: v.string(),
        details: v.optional(v.string()),
        status: v.string(), // "success", "error"
        createdAt: v.number(),
    }).index("by_userId", ["userId"]),
});
