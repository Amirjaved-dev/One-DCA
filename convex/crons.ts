import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

// Schedule the Guardian Agent to run every 4 hours
crons.interval(
    "guardian-market-analysis",
    { hours: 4 }, // Every 4 hours
    internal.agent.guardian.analyzeToken,
    { tokenSymbol: "ETH" } // Defaulting to ETH for now, could act on all active tokens later
);

// Run the "Dip Sniper" every hour to check for buying opportunities
crons.interval(
    "dip-sniper-check",
    { minutes: 60 },
    internal.agent.sniper.checkDip,
    { tokenSymbol: "ETH", dipThresholdPercent: 10 }
);

export default crons;
