import { ActionCtx, internalAction, internalMutation, MutationCtx } from "../_generated/server";
import { v } from "convex/values";
import { internal } from "../_generated/api";

/**
 * Save the agent's analysis to long-term memory.
 */
export const saveSentiment = internalMutation({
    args: {
        tokenSymbol: v.string(),
        riskScore: v.number(),
        summary: v.string(),
        sourceUrls: v.array(v.string()),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("marketSentiment", {
            tokenSymbol: args.tokenSymbol,
            riskScore: args.riskScore,
            summary: args.summary,
            sourceUrls: args.sourceUrls,
            analyzedAt: Date.now(),
        });

        // Log this action
        await ctx.db.insert("agentLogs", {
            type: "RISK_ASSESSMENT",
            message: `Analyzed ${args.tokenSymbol} risk: ${args.riskScore}/10`,
            data: { summary: args.summary },
            createdAt: Date.now(),
        });
    },
});

/**
 * The Brain: Analyzes a token for risks.
 * 1. Search (Firecrawl) 2. Read (Firecrawl) 3. Think (Groq) 4. Remember (Convex)
 */
export const analyzeToken = internalAction({
    args: {
        tokenSymbol: v.string(),
    },
    handler: async (ctx, args) => {
        const { tokenSymbol } = args;

        console.log(`Guardian: Starting analysis for ${tokenSymbol}...`);

        // 1. Search for news
        // @ts-ignore
        const searchResult: any = await ctx.runAction(internal.actions.firecrawl.search, {
            query: `latest news risks regulatory issues ${tokenSymbol} crypto token`,
        });

        if (!searchResult?.data || searchResult.data.length === 0) {
            console.log("Guardian: No news found.");
            return;
        }

        // 2. Scrape the top result
        const topUrl = searchResult.data[0].url;
        console.log(`Guardian: Reading ${topUrl}...`);

        let articleContent = "";
        try {
            // @ts-ignore
            const scrapeResult: any = await ctx.runAction(internal.actions.firecrawl.scrape, {
                url: topUrl,
            });
            articleContent = scrapeResult?.data?.markdown || "";
        } catch (e) {
            console.error("Guardian: Scrape failed", e);
            return;
        }

        if (!articleContent || articleContent.length < 100) {
            console.log("Guardian: Article content too short.");
            return;
        }

        // 3. Analyze with Groq (Kimi)
        console.log("Guardian: Thinking...");
        const truncatedContent = articleContent.slice(0, 10000);

        const prompt = `
    Analyze the following news article about ${tokenSymbol}.
    Determine a Risk Score from 1 (Safe) to 10 (Critical Danger/Rug Pull/SEC Lawsuit).
    Summarize the key risks in one sentence.
    
    Article Content:
    ${truncatedContent}
    `;

        const schemaDescription = `
    {
        "riskScore": number,
        "summary": "string"
    }
    `;

        // @ts-ignore
        const analysis: any = await ctx.runAction(internal.actions.groq.analyzeJSON, {
            prompt,
            jsonSchema: schemaDescription
        });

        console.log(`Guardian: Risk Score ${analysis.riskScore}. Summary: ${analysis.summary}`);

        // 4. Save to Memory
        // @ts-ignore
        await ctx.runMutation(internal.agent.guardian.saveSentiment, {
            tokenSymbol,
            riskScore: analysis.riskScore || 5,
            summary: analysis.summary || "No clear risk identified.",
            sourceUrls: [topUrl]
        });
    },
});
