# DCABot Development Plan

This plan outlines the roadmap for building DCABot from scratch. We will prioritize a modern, type-safe stack using **React (Vite)** for the frontend and **Convex** for the backend/database to ensure real-time capabilities and seamless scheduling for the AI agent.

## 🛠 Technology Stack
- **Frontend:** React 19, Vite, TypeScript, TailwindCSS v4
- **UI Architecture:** Shadcn/ui (Radix Primitives), Lucide Icons
- **Backend & Database:** Convex (Serverless functions, Real-time DB, Cron Jobs for DCA)
- **State Management:** Convex React Query (built-in)
- **Web3 Integration:** `@onelabs/sui` & `@onelabs/dapp-kit` (OneChain SDK & Wallet Adapter)
- **AI/NLP:** LLM Integration (via Convex Actions) for instruction parsing

---

## 📅 Phase 1: Foundation & Setup
**Goal:** Initialize the project and establish the core design system.
- [x] **1.1 Project Scaffolding:** Initialize Vite + React + TypeScript application.
- [x] **1.2 Clean Architecture:** Set up directory structure (`/components`, `/lib`, `/convex`, `/hooks`).
- [x] **1.3 Design System:** Install TailwindCSS and configure `index.css` with a premium color palette (Dark Mode default).
- [x] **1.4 UI Components:** Install core Shadcn/ui components (Button, Card, Input, Sheet, Dialog).
- [x] **1.5 Basic Routing:** Set up `react-router-dom` or `wouter` with routes for Landing, Dashboard, and Chat.

## 🔐 Phase 2: Web3 Auth & User Data
**Goal:** Allow users to connect wallets and persist their identity.
- [ ] **2.1 Convex Setup:** Initialize Convex project and set up the schema.
- [ ] **2.2 Wallet Connection:** Implement "Connect Wallet" using `@onelabs/dapp-kit`.
- [ ] **2.3 User Authentication:** Create a Convex mutation to authenticate/create users based on Wallet Address.
- [ ] **2.4 User Profile:** Create a schema for storing user preferences and settings.

## 🤖 Phase 3: AI Agent & Chat Interface
**Goal:** Build the natural language interface for the DCA Bot.
- [ ] **3.1 Chat UI:** Build a polished chat interface with "typing" indicators and message history.
- [ ] **3.2 NLP Backend:** Create Convex Actions to proxy requests to an LLM (e.g., OpenAI/Gemini) to parse intents (e.g., "Buy $50 ETH every week").
- [ ] **3.3 Intent Parser:** Implement logic to convert text commands into structured JSON (Token, Amount, Frequency).
- [ ] **3.4 Investment Preview:** Create UI to "confirm" the AI's understood plan before executing.

## ⏱️ Phase 4: DCA Scheduling Engine
**Goal:** The core logic—scheduling and executing recurring trades.
- [ ] **4.1 Schedule Schema:** Define the database schema for `Schedules` (cron expressions, status, token info).
- [ ] **4.2 Scheduler Logic:** Implement Convex Cron Jobs to check for due investments every minute/hour.
- [ ] **4.3 Execution Mock/Simulation:** Create a function to simulated "Buying" tokens (later replaced with real Contract calls).
- [ ] **4.4 Activity Logging:** System to log every action the agent takes (Success, Fail, Insufficient Funds).

## 📊 Phase 5: Dashboard & Analytics
**Goal:** Visualizing performance and active strategies.
- [ ] **5.1 Status Cards:** "Agent Active/Paused", "Total Invested", "Next Buy".
- [ ] **5.2 Active Schedules List:** UI to view, pause, or delete running DCA schedules.
- [ ] **5.3 Portfolio Chart:** Implement a chart (Recharts) showing portfolio growth over time.
- [ ] **5.4 Transaction History:** A detailed table of all past executions.

## ⛓️ Phase 6: Smart Contract Integration (OneChain)
**Goal:** Move execution on-chain.
- [ ] **6.1 Contract Development:** Write and deploy `DCABot.move` (Move language) to OneChain Devnet.
- [ ] **6.2 SDK Setup:** Install `@onelabs/dapp-kit` and configure `OneChainClientProvider` in the app.
- [ ] **6.3 Contract Logic:** Implement `create_schedule` and `execute_trade` functions using Programmable Transaction Blocks (PTBs).
- [ ] **6.4 Integration Testing:** Verify end-to-end flow on OneChain Devnet with OneChain Wallet.

## 🚀 Phase 7: Polish & Launch
**Goal:** Final UX touches and deployment.
- [ ] **7.1 Landing Page:** Build a high-converting public homepage ("Stripe for Web3" aesthetic).
- [ ] **7.2 Notifications:** App-wide toast notifications for agent actions.
- [ ] **7.3 Optimization:** Code splitting, asset optimization, SEO tags.
- [ ] **7.4 Deployment:** Deploy Frontend (Vercel) and Backend (Convex).
