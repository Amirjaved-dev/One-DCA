# Codebase Audit Report

**Date:** 2026-02-15
**Project:** DCABot (DCA Agent on OneChain)

## 1. Executive Summary
The codebase has a solid foundation for the frontend (React/Vite) and backend (Convex). Authentication and database schemas are well-implemented. The AI Agent logic for "reading" and "thinking" (Guardian) is in place.

**Critical Gap:** The "Acting" part—specifically **Smart Contracts (Move language)** and the **Wallet Execution Logic**—is completely missing. The agent can detect opportunities but cannot execute trades.

---

## 2. Implementation Status by Component

### ✅ Implemented (Good to Go)
*   **Project Structure**: Clean separation of `src` (Frontend) and `convex` (Backend).
*   **Authentication**: 
    *   Wallet connection via `@onelabs/dapp-kit`.
    *   Convex Auth flow (`users.ts`) captures wallet address and creates user profiles.
*   **Database Schema**: well-defined tables for `users`, `schedules`, `transactions`, `agentLogs`, `marketSentiment`, `messages`.
*   **AI Agent (Guardian)**: 
    *   `convex/agent/guardian.ts`: Logic to search (Firecrawl), scrape news, and analyze risk (Groq) is implemented.
    *   `convex/crons.ts`: Scheduled to run every 4 hours.
*   **Market Analysis (Sniper)**:
    *   `convex/agent/sniper.ts`: Logic to check prices and detect dips is implemented.
    *   `convex/crons.ts`: Scheduled to run every hour.

### ⚠️ Partially Implemented (Needs Work)
*   **Frontend UI**: 
    *   `Home.tsx`: Very basic placeholder.
    *   `Dashboard.tsx`: Skeleton UI with static data. Needs connection to `schedules` and `transactions` tables.
    *   `Chat.tsx`: Interface exists and connects to backend, but "Confirm" actions are just console logs.
*   **DCA Logic**:
    *   The *scheduling* infrastructure (Crons) exists.
    *   The *trigger* (Sniper) exists.
    *   **Missing**: The actual *execution* (buying the token).

### ❌ Missing (Not Started)
*   **Smart Contracts**: No `.move` files found in the repository. The `development_plan.md` mentioned Phase 6 (Contract Development), which is untouched.
    *   *Requirement*: A Move contract to handle DCA deposits, swaps, and withdrawals.
*   **Transaction Execution**: No logic to construct and sign Programmable Transaction Blocks (PTBs) on the frontend or backend agent.
*   **Analytics**: The "Performance Chart" on the dashboard is a "Coming Soon" placeholder.

---

## 3. Comparison with Development Plan

| Phase | Goal | Status | Notes |
| :--- | :--- | :--- | :--- |
| **Phase 1** | Foundation & Setup | ✅ Done | Vite, Tailwind, Shadcn, Convex set up. |
| **Phase 2** | Web3 Auth & User Data | ✅ Done | Wallet connect & User schema working. |
| **Phase 3** | AI Agent & Chat | ⚠️ Partial | Agent can "think" (Groq) and "see" (Firecrawl), but Chat UI is basic. |
| **Phase 4** | DCA Scheduling Engine | ⚠️ Partial | Crons active, but no execution (buying). |
| **Phase 5** | Dashboard & Analytics | ⚠️ Partial | UI Shell only. No real data visualization. |
| **Phase 6** | **Smart Contracts** | ❌ **Pending** | **Major missing component.** |
| **Phase 7** | Polish & Launch | ❌ Pending | Landing page is basic. |

## 4. Recommendations for Next Steps

1.  **Develop Smart Contracts (Phase 6)**:
    *   Create a `move` directory.
    *   Implement `DCABot.move` module for managing user funds and executing swaps.
2.  **Implement Execution Logic**:
    *   Connect the "Sniper" agent to a function that *proposes* a transaction (or executes it if the key is managed).
    *   *Note*: Since this is a user-custodied wallet app, the "Agent" can likely only *notify* the user or execute if the user has deposited funds into a smart contract that the agent has permission to call.
3.  **Connect Dashboard**:
    *   Fetch real data from `convex/schedules` and `convex/transactions` to populate the Dashboard cards.
