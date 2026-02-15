"use node";
import { action } from "../_generated/server";
import { v } from "convex/values";

/**
 * Fetch current price from CoinGecko.
 */
export const getPrice = action({
    args: {
        tokenSymbol: v.string(), // e.g. "ethereum", "sui"
    },
    handler: async (ctx, args) => {
        // Map standard symbols to CoinGecko IDs if needed
        const symbolMap: Record<string, string> = {
            "ETH": "ethereum",
            "SUI": "sui",
            "SOL": "solana",
            "BTC": "bitcoin"
        };

        const coinId = symbolMap[args.tokenSymbol.toUpperCase()] || args.tokenSymbol.toLowerCase();

        let response;
        for (let i = 0; i < 3; i++) {
            response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`, {
                headers: { "User-Agent": "DCABot/1.0", "Accept": "application/json" }
            });
            if (response.status === 429) {
                console.log(`CoinGecko 429, retrying... (${i + 1}/3)`);
                await new Promise(resolve => setTimeout(resolve, 2000 * (i + 1))); // Wait 2s, 4s...
                continue;
            }
            break;
        }

        if (!response || !response.ok) {
            const errorText = response ? await response.text() : "No response";
            console.error(`CoinGecko Error (${response?.status || "Unknown"}):`, errorText);
            throw new Error(`Failed to fetch price for ${coinId}: ${errorText}`);
        }

        const data = await response.json();
        return data[coinId]?.usd;
    },
});
