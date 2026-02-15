import { internalAction, internalMutation, internalQuery } from "../_generated/server";
import { internal } from "../_generated/api";
import { v } from "convex/values";

/**
 * The Sniper Logic: Checks if current price is a dip.
 */
export const checkDip = internalAction({
    args: {
        tokenSymbol: v.string(),
        dipThresholdPercent: v.number(), // e.g. 10 for 10% dip
    },
    handler: async (ctx, args) => {
        const { tokenSymbol } = args;
        console.log(`Sniper: Checking ${tokenSymbol} for dips...`);

        // 1. Get Current Price
        // @ts-ignore
        const currentPrice = await ctx.runAction(internal.actions.market.getPrice, {
            tokenSymbol: tokenSymbol
        });

        if (!currentPrice) {
            console.log("Sniper: Could not fetch price.");
            return;
        }

        // 2. Get Average Buy Price (from DB)
        // @ts-ignore
        const averagePrice = await ctx.runQuery(internal.agent.sniper.getAverageBuyPrice, {
            tokenSymbol: tokenSymbol
        });

        if (!averagePrice || averagePrice === 0) {
            console.log("Sniper: No previous buys to compare.");
            return;
        }

        // 3. Compare
        const dipRatio = (averagePrice - currentPrice) / averagePrice;
        const dipPercent = dipRatio * 100;

        console.log(`Sniper: Current $${currentPrice}, Avg $${averagePrice}. Dip: ${dipPercent.toFixed(2)}%`);

        if (dipPercent >= args.dipThresholdPercent) {
            // HIT!
            // @ts-ignore
            await ctx.runMutation(internal.agent.sniper.logDipOpportunity, {
                tokenSymbol,
                currentPrice,
                dipPercent,
            });
        }
    },
});

/**
 * Calculate average buy price (Query).
 */
export const getAverageBuyPrice = internalQuery({
    args: { tokenSymbol: v.string() },
    handler: async (ctx, args) => {
        const transactions = await ctx.db
            .query("transactions")
            .filter((q) => q.eq(q.field("token"), args.tokenSymbol))
            .filter((q) => q.eq(q.field("status"), "success"))
            .collect();

        if (transactions.length === 0) return 0;

        const totalSpent = transactions.reduce((sum, tx) => sum + tx.amountUSD, 0);
        const totalTokens = transactions.reduce((sum, tx) => sum + tx.tokenAmount, 0);

        return totalTokens > 0 ? totalSpent / totalTokens : 0;
    }
});

/**
 * Log the opportunity (Mutation).
 */
export const logDipOpportunity = internalMutation({
    args: {
        tokenSymbol: v.string(),
        currentPrice: v.number(),
        dipPercent: v.number(),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("agentLogs", {
            type: "DIP_DETECTED",
            message: `Sniper detected ${args.dipPercent.toFixed(1)}% dip for ${args.tokenSymbol}! Current: $${args.currentPrice}`,
            data: { ...args },
            createdAt: Date.now(),
        });
    }
});
