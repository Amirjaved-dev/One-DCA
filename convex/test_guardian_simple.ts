import { internalAction } from "./_generated/server";
import { internal } from "./_generated/api";

export const runTest = internalAction({
    args: {},
    handler: async (ctx) => {
        console.log("TEST: Triggering Guardian Agent for ETH...");
        await ctx.runAction(internal.agent.guardian.analyzeToken, {
            tokenSymbol: "ETH",
        });
        console.log("TEST: Guardian Agent finished.");
    },
});
