import { internalAction } from "./_generated/server";
import { internal } from "./_generated/api";

export const runTest = internalAction({
    args: {},
    handler: async (ctx) => {
        console.log("TEST: Testing Groq Key...");
        // @ts-ignore
        const result = await ctx.runAction(internal.actions.groq.chat, {
            messages: [
                { role: "user", content: "Hello, are you working?" }
            ]
        });
        console.log("TEST: Groq said:", result);
    },
});
