export interface DCAIntent {
    type: "create_schedule";
    token: string;
    amount: number;
    frequency: "daily" | "weekly" | "monthly";
    duration?: number;
}

export function parseIntent(text: string): DCAIntent | null {
    const lowerText = text.toLowerCase();

    // Very basic regex parser for "Buy $X of [Token] [Frequency]"
    const amountMatch = lowerText.match(/\$(\d+)/);
    const tokenMatch = lowerText.match(/\b(sui|eth|btc|usdc|test)\b/);
    const frequencyMatch = lowerText.match(/\b(daily|weekly|monthly)\b/);

    if (amountMatch && tokenMatch && frequencyMatch) {
        return {
            type: "create_schedule",
            amount: parseInt(amountMatch[1]),
            token: tokenMatch[1].toUpperCase(),
            frequency: frequencyMatch[1] as "daily" | "weekly" | "monthly",
        };
    }

    return null;
}
