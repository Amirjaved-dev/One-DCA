import { internalAction } from "./_generated/server";
import { internal } from "./_generated/api";

export const runTest = internalAction({
    args: {},
    handler: async (ctx) => {
        console.log("TEST: Manually triggering Dip Sniper for ETH...");
        await ctx.runAction(internal.agent.sniper.checkDip, {
            tokenSymbol: "ETH",
            dipThresholdPercent: 10
        });
        console.log("TEST: Sniper finished.");
    },
});
