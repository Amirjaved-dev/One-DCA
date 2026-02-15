"use node";
import { action } from "../_generated/server";
import { v } from "convex/values";

// Firecrawl API Base URL
const FIRECRAWL_API_URL = "https://api.firecrawl.dev/v1";

/**
 * Searches the web using Firecrawl.
 */
export const search = action({
    args: {
        query: v.string(),
    },
    handler: async (_ctx, args) => {
        const apiKey = process.env.FIRECRAWL_API_KEY;
        if (!apiKey) {
            throw new Error("FIRECRAWL_API_KEY is not set");
        }

        const response = await fetch(`${FIRECRAWL_API_URL}/search`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                query: args.query,
                limit: 5
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Firecrawl Search Failed: ${errorText}`);
        }

        const data = await response.json();
        return data;
    },
});

/**
 * Scrapes a specific URL using Firecrawl to get clean markdown.
 */
export const scrape = action({
    args: {
        url: v.string(),
    },
    handler: async (_ctx, args) => {
        const apiKey = process.env.FIRECRAWL_API_KEY;
        if (!apiKey) {
            throw new Error("FIRECRAWL_API_KEY is not set");
        }

        const response = await fetch(`${FIRECRAWL_API_URL}/scrape`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                url: args.url,
                formats: ["markdown"]
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Firecrawl Scrape Failed: ${errorText}`);
        }

        const data = await response.json();
        return data;
    },
});
