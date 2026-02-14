# DCABot - AI-Powered DCA Investment Platform
## Comprehensive Documentation for OneHack 3.0 Hackathon

**Author:** Manus AI  
**Date:** February 14, 2026  
**Version:** 1.0  
**Project:** DCABot - Autonomous Dollar-Cost Averaging Agent for OneChain

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Project Overview](#project-overview)
3. [System Architecture](#system-architecture)
4. [Technical Stack](#technical-stack)
5. [Core Features](#core-features)
6. [User Flow](#user-flow)
7. [AI Agent Architecture](#ai-agent-architecture)
8. [Smart Contract Design](#smart-contract-design)
9. [Database Schema](#database-schema)
10. [API Specifications](#api-specifications)
11. [Frontend Components](#frontend-components)
12. [Security Considerations](#security-considerations)
13. [30-Day Build Plan](#30-day-build-plan)
14. [Testing Strategy](#testing-strategy)
15. [Deployment Guide](#deployment-guide)

---

## Executive Summary

DCABot is an autonomous AI-powered investment platform built on OneChain that enables users to execute dollar-cost averaging strategies through natural language instructions. The platform features an intelligent agent that interprets user commands, creates investment schedules, and executes token purchases automatically without further user intervention.

### Key Innovation

Unlike traditional DCA platforms that require manual configuration of investment parameters, DCABot uses natural language processing to understand user intent and autonomously manages the entire investment lifecycle. Users simply tell the AI what they want, and the agent handles everything from scheduling to execution to portfolio management.

### Target Problem

Dollar-cost averaging is a proven investment strategy, but it requires discipline and consistent execution. Most people fail at DCA because they forget to invest regularly, get distracted, or make emotional decisions. DCABot solves this by removing the human element entirely—the AI agent works 24/7 without emotion, distraction, or fatigue.

---

## Project Overview

### What is DCABot?

DCABot is a DeFi platform where an AI agent manages investment strategies on behalf of users. The agent operates autonomously, executing scheduled token purchases on OneDEX according to user-defined parameters.

### Core Concept

The platform is built around three core principles:

1. **Natural Language Interface:** Users communicate with the AI agent using plain English commands like "Invest $100 in BTC every Monday" or "Buy ETH worth $50 daily for the next month."

2. **Autonomous Execution:** Once the user provides instructions, the AI agent creates an investment schedule and executes purchases automatically without requiring further user action.

3. **Transparent Monitoring:** Users can view all AI agent activities, investment history, and portfolio performance through a comprehensive dashboard.

### Value Proposition

DCABot provides several key benefits:

- **Time Savings:** Users spend seconds giving instructions instead of hours managing investments manually.
- **Consistency:** The AI agent never forgets to execute scheduled purchases, ensuring perfect DCA discipline.
- **Emotion-Free Investing:** The agent makes decisions based on schedule and logic, not fear or greed.
- **Accessibility:** Natural language interface makes DCA investing accessible to non-technical users.
- **Transparency:** Complete visibility into all agent actions and investment performance.

---

## System Architecture

### High-Level Architecture

DCABot consists of five major components that work together to provide autonomous investment management:

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend Layer                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Chat Interface│  │  Dashboard   │  │   Portfolio  │      │
│  │  (Natural     │  │  (Agent      │  │  (Analytics) │      │
│  │   Language)   │  │   Status)    │  │              │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            ↓ tRPC
┌─────────────────────────────────────────────────────────────┐
│                       Backend Layer                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ NLP Engine   │  │  Scheduler   │  │  Executor    │      │
│  │ (Intent      │  │  (Cron Jobs) │  │  (Purchase   │      │
│  │  Parser)     │  │              │  │   Logic)     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                      Data Layer                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Database   │  │  Smart       │  │   OneDEX     │      │
│  │  (MySQL/     │  │  Contracts   │  │   API        │      │
│  │   TiDB)      │  │  (Move)      │  │              │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

**Frontend Layer**
- Chat interface for natural language input
- Dashboard displaying AI agent status and activities
- Portfolio analytics showing investment performance
- Real-time updates of agent actions

**Backend Layer**
- NLP engine for parsing user instructions
- Scheduler for managing investment timing
- Executor for performing token purchases
- API layer for frontend communication

**Data Layer**
- Database for storing user data, schedules, and history
- Smart contracts for on-chain execution
- OneDEX integration for token swaps

---

## Technical Stack

### Frontend Technologies

| Technology | Version | Purpose |
|---|---|---|
| React | 19.2.1 | UI framework |
| TypeScript | 5.9.3 | Type safety |
| Tailwind CSS | 4.1.14 | Styling |
| tRPC | 11.6.0 | Type-safe API |
| Wouter | 3.3.5 | Routing |
| Shadcn/ui | Latest | Component library |
| Recharts | 2.15.2 | Data visualization |

### Backend Technologies

| Technology | Version | Purpose |
|---|---|---|
| Node.js | 22.13.0 | Runtime |
| Express | 4.21.2 | Web server |
| tRPC | 11.6.0 | API layer |
| Drizzle ORM | 0.44.5 | Database ORM |
| MySQL/TiDB | Latest | Database |
| Node-cron | TBD | Job scheduling |

### Blockchain Technologies

| Technology | Purpose |
|---|---|
| Move Language | Smart contract development |
| OneChain SDK | Blockchain interaction |
| OneDEX API | Token swaps |
| OneWallet | User authentication |

### AI/ML Technologies

| Technology | Purpose |
|---|---|
| Manus LLM API | Natural language processing |
| Intent Parser | Command interpretation |
| Schedule Generator | Investment timing logic |

---

## Core Features

### Feature 1: Natural Language Interface

Users interact with the AI agent through a chat interface using plain English commands. The system supports various instruction formats:

**Supported Command Patterns:**
- "Invest [amount] in [token] every [frequency]"
- "Buy [token] worth [amount] [frequency] for [duration]"
- "DCA [amount] into [token] [frequency] starting [date]"
- "Stop investing in [token]"
- "Pause all investments"
- "Show my portfolio"

**Example Commands:**
- "Invest $100 in BTC every Monday"
- "Buy ETH worth $50 daily for the next month"
- "DCA $200 into USDC weekly starting next week"
- "Stop investing in BTC"
- "Pause all investments until March"

### Feature 2: AI Agent Intelligence

The AI agent is the core of the platform, responsible for interpreting user instructions and managing investments autonomously.

**Agent Capabilities:**
- Parse natural language instructions into structured investment schedules
- Validate user instructions (sufficient balance, valid tokens, reasonable amounts)
- Create cron-based schedules for automated execution
- Execute token purchases at scheduled times
- Monitor execution success/failure and retry logic
- Provide status updates and notifications
- Handle edge cases (insufficient balance, token unavailable, network issues)

**Agent States:**
- **Active:** Agent is running and executing scheduled purchases
- **Paused:** Agent is temporarily stopped but schedules are preserved
- **Stopped:** Agent is permanently stopped and schedules are cleared
- **Working:** Agent is currently executing a purchase
- **Error:** Agent encountered an error and requires attention

### Feature 3: Autonomous Execution Engine

The execution engine runs continuously in the background, monitoring schedules and executing purchases without user intervention.

**Execution Flow:**
1. Scheduler checks for due investments every minute
2. Executor fetches token price from OneDEX
3. Executor calculates token amount based on USD value
4. Executor executes swap transaction on OneDEX
5. Executor records transaction in database
6. Executor sends notification to user
7. Executor updates portfolio analytics

**Retry Logic:**
- If purchase fails due to network issues, retry up to 3 times with exponential backoff
- If purchase fails due to insufficient balance, pause schedule and notify user
- If purchase fails due to token unavailability, skip and notify user

### Feature 4: Portfolio Dashboard

The dashboard provides comprehensive visibility into AI agent activities and investment performance.

**Dashboard Components:**
- **Agent Status Card:** Shows current agent state (active/paused/working)
- **Active Schedules:** Lists all active investment schedules with next execution time
- **Recent Activity:** Shows last 10 agent actions with timestamps
- **Portfolio Overview:** Displays total invested, current value, and ROI
- **Token Breakdown:** Shows investment distribution across tokens
- **Performance Chart:** Visualizes portfolio value over time

### Feature 5: Investment Analytics

The analytics system tracks investment performance and provides insights.

**Key Metrics:**
- **Total Invested:** Sum of all purchases in USD
- **Current Value:** Current portfolio value in USD
- **ROI:** Return on investment percentage
- **Average Buy Price:** Average price paid per token
- **Total Tokens:** Total quantity of each token owned
- **Purchase Count:** Number of purchases executed
- **Success Rate:** Percentage of successful purchases

**Analytics Features:**
- Historical performance chart (7 days, 30 days, all time)
- Token-level analytics (per-token ROI, average price, quantity)
- Purchase history table with filters
- Export data to CSV

### Feature 6: Smart Contract Integration

Smart contracts on OneChain handle the on-chain execution of token purchases.

**Contract Functions:**
- `createSchedule()`: Creates a new investment schedule on-chain
- `executePurchase()`: Executes a token purchase via OneDEX
- `pauseSchedule()`: Pauses an active schedule
- `resumeSchedule()`: Resumes a paused schedule
- `cancelSchedule()`: Permanently cancels a schedule
- `getScheduleStatus()`: Retrieves schedule status

**Security Features:**
- Only authorized agent can execute purchases
- User must approve token spending limits
- All transactions are logged on-chain for transparency
- Emergency pause function for security incidents

### Feature 7: Notification System

The notification system keeps users informed of AI agent actions.

**Notification Types:**
- **Purchase Executed:** "Agent bought 0.05 BTC for $100"
- **Purchase Failed:** "Agent failed to buy BTC: Insufficient balance"
- **Schedule Created:** "New schedule created: $100 in BTC every Monday"
- **Schedule Paused:** "Investment schedule paused by user"
- **Balance Low:** "Balance too low to execute next purchase"
- **Agent Error:** "Agent encountered an error and requires attention"

**Notification Channels:**
- In-app notifications (bell icon)
- Email notifications (optional)
- Browser push notifications (optional)

### Feature 8: Wallet Connection

Users connect their OneWallet to authenticate and authorize the AI agent to manage investments.

**Wallet Integration:**
- OneWallet OAuth for authentication
- User must approve spending limits for each token
- Agent operates within approved limits
- User can revoke agent access at any time

### Feature 9: Pause/Resume/Stop Controls

Users have full control over the AI agent's operations.

**Control Actions:**
- **Pause:** Temporarily stops all scheduled purchases but preserves schedules
- **Resume:** Restarts paused schedules from where they left off
- **Stop:** Permanently cancels all schedules and stops the agent
- **Emergency Stop:** Immediately halts all operations (for security)

### Feature 10: Investment History

Complete transaction history with detailed records of all agent actions.

**History Features:**
- Searchable and filterable transaction list
- Detailed view of each purchase (token, amount, price, timestamp, status)
- Export to CSV for tax reporting
- Filter by token, date range, status
- Pagination for large datasets

---

## User Flow

### Onboarding Flow

1. User visits DCABot landing page
2. User clicks "Connect Wallet"
3. User authenticates with OneWallet OAuth
4. User is redirected to dashboard
5. User sees welcome message and tutorial overlay
6. User clicks "Create First Investment"

### Creating Investment Schedule

1. User opens chat interface
2. User types natural language instruction (e.g., "Invest $100 in BTC every Monday")
3. AI agent parses instruction and displays confirmation
4. User reviews schedule details (token, amount, frequency, start date)
5. User approves token spending limit
6. User confirms schedule creation
7. Agent creates schedule and starts monitoring
8. User sees schedule in dashboard

### Monitoring Investments

1. User opens dashboard
2. User sees agent status (active/paused/working)
3. User sees list of active schedules with next execution time
4. User sees recent activity feed
5. User clicks on portfolio tab
6. User sees investment analytics and performance chart
7. User clicks on history tab
8. User sees complete transaction history

### Pausing/Resuming Agent

1. User clicks "Pause Agent" button in dashboard
2. System displays confirmation dialog
3. User confirms pause action
4. Agent pauses all schedules
5. User sees "Paused" status in dashboard
6. User clicks "Resume Agent" button
7. Agent resumes all schedules
8. User sees "Active" status in dashboard

---

## AI Agent Architecture

### Natural Language Processing Engine

The NLP engine is responsible for parsing user instructions and extracting structured data.

**Input Processing Pipeline:**

```
User Input → Preprocessing → Intent Classification → Entity Extraction → Validation → Schedule Creation
```

**Preprocessing:**
- Convert to lowercase
- Remove special characters
- Tokenize into words
- Identify numbers and dates

**Intent Classification:**
The system identifies the user's intent from their instruction:
- `CREATE_SCHEDULE`: User wants to create a new investment schedule
- `STOP_SCHEDULE`: User wants to stop an existing schedule
- `PAUSE_AGENT`: User wants to pause the agent
- `RESUME_AGENT`: User wants to resume the agent
- `SHOW_PORTFOLIO`: User wants to see portfolio
- `SHOW_HISTORY`: User wants to see transaction history

**Entity Extraction:**
The system extracts key entities from the instruction:
- **Amount:** Dollar value to invest (e.g., $100, 100 USD, one hundred dollars)
- **Token:** Token symbol to buy (e.g., BTC, ETH, USDC)
- **Frequency:** How often to invest (e.g., daily, weekly, monthly, every Monday)
- **Duration:** How long to continue (e.g., for 30 days, until March, forever)
- **Start Date:** When to start (e.g., today, tomorrow, next Monday, March 1st)

**Validation:**
The system validates extracted entities:
- Amount must be positive and within user's balance
- Token must be available on OneDEX
- Frequency must be valid (daily, weekly, monthly, or specific day)
- Duration must be valid (number of days, specific date, or indefinite)
- Start date must be in the future or today

**Example Parsing:**

Input: "Invest $100 in BTC every Monday"

Parsed Output:
```json
{
  "intent": "CREATE_SCHEDULE",
  "entities": {
    "amount": 100,
    "currency": "USD",
    "token": "BTC",
    "frequency": "weekly",
    "dayOfWeek": "monday",
    "duration": "indefinite",
    "startDate": "next_monday"
  }
}
```

### Schedule Generator

The schedule generator converts parsed instructions into cron-based schedules.

**Cron Expression Generation:**

| Frequency | Cron Expression | Description |
|---|---|---|
| Daily | `0 0 12 * * *` | Every day at 12:00 PM |
| Weekly (Monday) | `0 0 12 * * 1` | Every Monday at 12:00 PM |
| Weekly (Friday) | `0 0 12 * * 5` | Every Friday at 12:00 PM |
| Monthly (1st) | `0 0 12 1 * *` | 1st of every month at 12:00 PM |
| Every 3 days | `0 0 12 */3 * *` | Every 3 days at 12:00 PM |

**Schedule Object Structure:**
```typescript
interface Schedule {
  id: string;
  userId: number;
  token: string;
  amountUSD: number;
  frequency: string;
  cronExpression: string;
  startDate: Date;
  endDate: Date | null;
  status: 'active' | 'paused' | 'completed' | 'cancelled';
  nextExecution: Date;
  lastExecution: Date | null;
  executionCount: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### Execution Engine

The execution engine monitors schedules and executes purchases at the appropriate times.

**Execution Loop:**

```typescript
// Pseudo-code for execution loop
setInterval(async () => {
  // 1. Fetch all active schedules with nextExecution <= now
  const dueSchedules = await getDueSchedules();
  
  // 2. For each due schedule
  for (const schedule of dueSchedules) {
    try {
      // 3. Check user balance
      if (await hasInsufficientBalance(schedule)) {
        await pauseSchedule(schedule.id, 'insufficient_balance');
        await notifyUser(schedule.userId, 'balance_low');
        continue;
      }
      
      // 4. Fetch token price from OneDEX
      const price = await getTokenPrice(schedule.token);
      
      // 5. Calculate token amount
      const tokenAmount = schedule.amountUSD / price;
      
      // 6. Execute purchase on OneDEX
      const tx = await executePurchase(schedule.userId, schedule.token, tokenAmount);
      
      // 7. Record transaction in database
      await recordTransaction({
        scheduleId: schedule.id,
        userId: schedule.userId,
        token: schedule.token,
        amountUSD: schedule.amountUSD,
        tokenAmount: tokenAmount,
        price: price,
        txHash: tx.hash,
        status: 'success',
        timestamp: new Date()
      });
      
      // 8. Update schedule nextExecution
      await updateScheduleNextExecution(schedule.id);
      
      // 9. Notify user
      await notifyUser(schedule.userId, 'purchase_success', {
        token: schedule.token,
        amount: tokenAmount,
        usd: schedule.amountUSD
      });
      
    } catch (error) {
      // 10. Handle errors
      await handleExecutionError(schedule, error);
    }
  }
}, 60000); // Run every minute
```

**Error Handling:**

The execution engine implements robust error handling:

1. **Network Errors:** Retry up to 3 times with exponential backoff (1s, 2s, 4s)
2. **Insufficient Balance:** Pause schedule and notify user
3. **Token Unavailable:** Skip execution and notify user
4. **Smart Contract Error:** Log error and notify user
5. **Unknown Error:** Log error, pause schedule, and alert admin

---

## Smart Contract Design

### Contract Overview

DCABot uses Move smart contracts on OneChain to handle on-chain execution of token purchases.

### Contract Structure

```move
module DCABot {
    use std::signer;
    use aptos_framework::coin;
    use aptos_framework::timestamp;
    
    // Schedule resource stored in user's account
    struct Schedule has key {
        id: u64,
        token: address,
        amount_usd: u64,
        frequency: u64, // in seconds
        start_time: u64,
        end_time: u64,
        status: u8, // 0=active, 1=paused, 2=completed, 3=cancelled
        next_execution: u64,
        last_execution: u64,
        execution_count: u64
    }
    
    // Create a new investment schedule
    public entry fun create_schedule(
        user: &signer,
        token: address,
        amount_usd: u64,
        frequency: u64,
        start_time: u64,
        end_time: u64
    ) {
        // Implementation
    }
    
    // Execute a scheduled purchase
    public entry fun execute_purchase(
        agent: &signer,
        user_address: address,
        schedule_id: u64
    ) {
        // Implementation
    }
    
    // Pause a schedule
    public entry fun pause_schedule(
        user: &signer,
        schedule_id: u64
    ) {
        // Implementation
    }
    
    // Resume a schedule
    public entry fun resume_schedule(
        user: &signer,
        schedule_id: u64
    ) {
        // Implementation
    }
    
    // Cancel a schedule
    public entry fun cancel_schedule(
        user: &signer,
        schedule_id: u64
    ) {
        // Implementation
    }
}
```

### Contract Functions

**create_schedule()**
- Creates a new investment schedule on-chain
- Validates parameters (amount > 0, frequency > 0, start_time >= now)
- Stores schedule in user's account
- Emits ScheduleCreated event

**execute_purchase()**
- Executes a token purchase via OneDEX
- Checks schedule status (must be active)
- Checks execution time (must be >= next_execution)
- Swaps USD for tokens using OneDEX
- Updates schedule next_execution
- Emits PurchaseExecuted event

**pause_schedule()**
- Pauses an active schedule
- Only callable by schedule owner
- Changes status to paused
- Emits SchedulePaused event

**resume_schedule()**
- Resumes a paused schedule
- Only callable by schedule owner
- Changes status to active
- Recalculates next_execution
- Emits ScheduleResumed event

**cancel_schedule()**
- Permanently cancels a schedule
- Only callable by schedule owner
- Changes status to cancelled
- Emits ScheduleCancelled event

### Security Considerations

**Access Control:**
- Only schedule owner can pause/resume/cancel their schedules
- Only authorized agent can execute purchases
- Agent address is stored in contract and can only be changed by admin

**Spending Limits:**
- User must approve token spending limits before agent can execute purchases
- Agent cannot spend more than approved limit
- User can revoke approval at any time

**Emergency Controls:**
- Contract has emergency pause function
- Admin can pause all operations in case of security incident
- Paused contracts can only be unpaused by admin

---

## Database Schema

### Tables

**users**
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  open_id VARCHAR(64) NOT NULL UNIQUE,
  name TEXT,
  email VARCHAR(320),
  login_method VARCHAR(64),
  role ENUM('user', 'admin') DEFAULT 'user' NOT NULL,
  wallet_address VARCHAR(128),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
  last_signed_in TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);
```

**schedules**
```sql
CREATE TABLE schedules (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  token VARCHAR(20) NOT NULL,
  amount_usd DECIMAL(18, 2) NOT NULL,
  frequency VARCHAR(50) NOT NULL,
  cron_expression VARCHAR(100) NOT NULL,
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NULL,
  status ENUM('active', 'paused', 'completed', 'cancelled') DEFAULT 'active' NOT NULL,
  next_execution TIMESTAMP NOT NULL,
  last_execution TIMESTAMP NULL,
  execution_count INT DEFAULT 0 NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_status_next_execution (status, next_execution)
);
```

**transactions**
```sql
CREATE TABLE transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  schedule_id INT NOT NULL,
  user_id INT NOT NULL,
  token VARCHAR(20) NOT NULL,
  amount_usd DECIMAL(18, 2) NOT NULL,
  token_amount DECIMAL(36, 18) NOT NULL,
  price DECIMAL(18, 8) NOT NULL,
  tx_hash VARCHAR(128),
  status ENUM('pending', 'success', 'failed') DEFAULT 'pending' NOT NULL,
  error_message TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  FOREIGN KEY (schedule_id) REFERENCES schedules(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_schedule_id (schedule_id),
  INDEX idx_status (status),
  INDEX idx_created_at (created_at)
);
```

**agent_logs**
```sql
CREATE TABLE agent_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  action VARCHAR(100) NOT NULL,
  details TEXT,
  status ENUM('success', 'error') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_created_at (created_at)
);
```

**notifications**
```sql
CREATE TABLE notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id_read (user_id, read),
  INDEX idx_created_at (created_at)
);
```

### Relationships

```
users (1) ──< (many) schedules
users (1) ──< (many) transactions
users (1) ──< (many) agent_logs
users (1) ──< (many) notifications
schedules (1) ──< (many) transactions
```

---

## API Specifications

### tRPC Router Structure

```typescript
export const appRouter = router({
  auth: authRouter,
  agent: agentRouter,
  schedule: scheduleRouter,
  transaction: transactionRouter,
  portfolio: portfolioRouter,
  notification: notificationRouter,
});
```

### Auth Router

**auth.me**
- Type: Query
- Auth: Public
- Returns: Current user or null
- Purpose: Get current authenticated user

**auth.logout**
- Type: Mutation
- Auth: Public
- Returns: Success status
- Purpose: Log out current user

### Agent Router

**agent.parseInstruction**
- Type: Mutation
- Auth: Protected
- Input: `{ instruction: string }`
- Returns: `{ intent, entities, schedule }`
- Purpose: Parse natural language instruction

**agent.getStatus**
- Type: Query
- Auth: Protected
- Returns: `{ status: 'active' | 'paused' | 'working', activeSchedules: number }`
- Purpose: Get current agent status

**agent.pause**
- Type: Mutation
- Auth: Protected
- Returns: Success status
- Purpose: Pause all agent operations

**agent.resume**
- Type: Mutation
- Auth: Protected
- Returns: Success status
- Purpose: Resume all agent operations

**agent.getActivity**
- Type: Query
- Auth: Protected
- Input: `{ limit?: number }`
- Returns: Array of recent agent actions
- Purpose: Get recent agent activity log

### Schedule Router

**schedule.create**
- Type: Mutation
- Auth: Protected
- Input: `{ token, amountUSD, frequency, startDate, endDate? }`
- Returns: Created schedule object
- Purpose: Create new investment schedule

**schedule.list**
- Type: Query
- Auth: Protected
- Returns: Array of user's schedules
- Purpose: Get all schedules for current user

**schedule.get**
- Type: Query
- Auth: Protected
- Input: `{ id: number }`
- Returns: Schedule object
- Purpose: Get specific schedule by ID

**schedule.pause**
- Type: Mutation
- Auth: Protected
- Input: `{ id: number }`
- Returns: Updated schedule
- Purpose: Pause specific schedule

**schedule.resume**
- Type: Mutation
- Auth: Protected
- Input: `{ id: number }`
- Returns: Updated schedule
- Purpose: Resume specific schedule

**schedule.cancel**
- Type: Mutation
- Auth: Protected
- Input: `{ id: number }`
- Returns: Success status
- Purpose: Cancel specific schedule

### Transaction Router

**transaction.list**
- Type: Query
- Auth: Protected
- Input: `{ limit?, offset?, token?, status? }`
- Returns: Paginated array of transactions
- Purpose: Get transaction history

**transaction.get**
- Type: Query
- Auth: Protected
- Input: `{ id: number }`
- Returns: Transaction object
- Purpose: Get specific transaction by ID

**transaction.export**
- Type: Query
- Auth: Protected
- Input: `{ format: 'csv' | 'json' }`
- Returns: File download URL
- Purpose: Export transaction history

### Portfolio Router

**portfolio.getOverview**
- Type: Query
- Auth: Protected
- Returns: `{ totalInvested, currentValue, roi, tokens }`
- Purpose: Get portfolio overview

**portfolio.getTokenBreakdown**
- Type: Query
- Auth: Protected
- Returns: Array of token holdings with analytics
- Purpose: Get per-token portfolio breakdown

**portfolio.getPerformanceChart**
- Type: Query
- Auth: Protected
- Input: `{ period: '7d' | '30d' | 'all' }`
- Returns: Array of data points for chart
- Purpose: Get historical performance data

### Notification Router

**notification.list**
- Type: Query
- Auth: Protected
- Input: `{ limit?, unreadOnly? }`
- Returns: Array of notifications
- Purpose: Get user notifications

**notification.markRead**
- Type: Mutation
- Auth: Protected
- Input: `{ id: number }`
- Returns: Success status
- Purpose: Mark notification as read

**notification.markAllRead**
- Type: Mutation
- Auth: Protected
- Returns: Success status
- Purpose: Mark all notifications as read

---

## Frontend Components

### Page Components

**Home.tsx**
- Landing page with hero section
- Features overview
- Call-to-action buttons
- Login/signup

**Dashboard.tsx**
- Agent status card
- Active schedules list
- Recent activity feed
- Quick actions (pause/resume)

**Chat.tsx**
- Natural language input field
- Conversation history
- AI agent responses
- Schedule confirmation dialogs

**Portfolio.tsx**
- Portfolio overview cards
- Token breakdown table
- Performance chart
- Analytics metrics

**History.tsx**
- Transaction history table
- Filters (token, date, status)
- Search functionality
- Export button

**Settings.tsx**
- User profile
- Wallet management
- Notification preferences
- Agent permissions

### UI Components

**AgentStatusCard**
- Displays current agent status
- Shows active schedules count
- Pause/resume buttons
- Visual status indicator

**ScheduleCard**
- Displays schedule details
- Shows next execution time
- Pause/resume/cancel buttons
- Progress indicator

**ActivityFeed**
- Lists recent agent actions
- Timestamps and descriptions
- Status indicators
- Expandable details

**PortfolioChart**
- Line chart of portfolio value
- Time period selector
- Tooltip with data points
- Responsive design

**TransactionTable**
- Sortable columns
- Filterable rows
- Pagination
- Export functionality

**ChatInterface**
- Message input field
- Message history
- AI agent avatar
- Typing indicators

---

## Security Considerations

### Authentication & Authorization

**User Authentication:**
- OneWallet OAuth for secure authentication
- JWT tokens for session management
- Secure cookie storage with httpOnly flag
- CSRF protection on all mutations

**Authorization:**
- Users can only access their own data
- Agent can only execute purchases for authorized users
- Admin role for platform management
- Role-based access control (RBAC)

### Smart Contract Security

**Access Control:**
- Only schedule owner can modify their schedules
- Only authorized agent can execute purchases
- Admin emergency pause function
- Multi-signature for critical operations

**Spending Limits:**
- User must approve token spending limits
- Agent cannot exceed approved limits
- User can revoke approval at any time
- Automatic limit checks before execution

**Audit Trail:**
- All transactions logged on-chain
- Immutable record of agent actions
- Event emissions for transparency
- Verifiable execution history

### Data Security

**Database Security:**
- Encrypted connections (SSL/TLS)
- Parameterized queries to prevent SQL injection
- Input validation on all user inputs
- Rate limiting on API endpoints

**API Security:**
- tRPC type safety prevents many common vulnerabilities
- Input validation with Zod schemas
- Rate limiting on expensive operations
- Error messages don't leak sensitive information

**Wallet Security:**
- Private keys never stored on server
- Agent operates with limited permissions
- User can revoke agent access anytime
- Emergency stop function for security incidents

### Operational Security

**Monitoring:**
- Real-time monitoring of agent operations
- Alerting for failed transactions
- Logging of all agent actions
- Performance metrics tracking

**Backup & Recovery:**
- Regular database backups
- Disaster recovery plan
- Schedule recovery mechanism
- Transaction replay capability

**Incident Response:**
- Emergency pause function
- Admin notification system
- User notification for security events
- Post-incident analysis process

---

## 30-Day Build Plan

### Week 1: Foundation (Days 1-7)

**Day 1-2: Project Setup & Database**
- Initialize project structure
- Set up database schema
- Create migrations
- Set up development environment

**Day 3-4: Authentication & Basic UI**
- Implement OneWallet OAuth
- Create landing page
- Build dashboard layout
- Set up routing

**Day 5-7: NLP Engine**
- Build instruction parser
- Implement intent classification
- Create entity extraction
- Test with sample instructions

### Week 2: Core Features (Days 8-14)

**Day 8-9: Schedule Management**
- Create schedule creation logic
- Build cron expression generator
- Implement schedule CRUD operations
- Create schedule UI components

**Day 10-11: Execution Engine**
- Build execution loop
- Implement OneDEX integration
- Create transaction recording
- Add retry logic

**Day 12-14: Chat Interface**
- Build chat UI
- Integrate NLP engine
- Create confirmation dialogs
- Add conversation history

### Week 3: Advanced Features (Days 15-21)

**Day 15-16: Portfolio Analytics**
- Build portfolio calculation logic
- Create analytics queries
- Build performance chart
- Create portfolio dashboard

**Day 17-18: Transaction History**
- Build transaction list UI
- Implement filters and search
- Add pagination
- Create export functionality

**Day 19-21: Notifications**
- Build notification system
- Implement notification triggers
- Create notification UI
- Add email notifications (optional)

### Week 4: Polish & Launch (Days 22-30)

**Day 22-23: Smart Contracts**
- Write Move contracts
- Test contracts on testnet
- Deploy contracts
- Integrate with backend

**Day 24-25: Testing**
- Write unit tests
- Write integration tests
- Test end-to-end flows
- Fix bugs

**Day 26-27: UI Polish**
- Improve visual design
- Add animations
- Optimize performance
- Mobile responsiveness

**Day 28-29: Documentation & Demo**
- Write user documentation
- Create demo video
- Prepare pitch deck
- Test demo flow

**Day 30: Final Submission**
- Final testing
- Deploy to production
- Submit to hackathon
- Celebrate! 🎉

---

## Testing Strategy

### Unit Tests

**Backend Tests:**
- NLP parser tests (instruction parsing)
- Schedule generator tests (cron expressions)
- Execution engine tests (purchase logic)
- Database query tests

**Frontend Tests:**
- Component rendering tests
- User interaction tests
- Form validation tests
- State management tests

### Integration Tests

**API Tests:**
- tRPC endpoint tests
- Authentication flow tests
- Authorization tests
- Error handling tests

**Database Tests:**
- CRUD operation tests
- Transaction tests
- Relationship tests
- Migration tests

### End-to-End Tests

**User Flows:**
- Complete onboarding flow
- Create investment schedule
- Execute purchase
- View portfolio
- Pause/resume agent

**Edge Cases:**
- Insufficient balance
- Token unavailable
- Network errors
- Invalid instructions

### Smart Contract Tests

**Contract Tests:**
- Function execution tests
- Access control tests
- Event emission tests
- Edge case tests

---

## Deployment Guide

### Prerequisites

- OneChain account
- OneDEX API access
- Database (MySQL/TiDB)
- Node.js 22+
- Domain name (optional)

### Environment Variables

```bash
# Database
DATABASE_URL=mysql://user:pass@host:port/dbname

# Auth
JWT_SECRET=your-secret-key
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://login.manus.im

# OneChain
ONECHAIN_RPC_URL=https://rpc.onechain.io
ONEDEX_API_URL=https://api.onedex.io
AGENT_PRIVATE_KEY=your-agent-private-key

# Manus APIs
BUILT_IN_FORGE_API_URL=https://api.manus.im
BUILT_IN_FORGE_API_KEY=your-api-key
```

### Deployment Steps

**1. Database Setup**
```bash
pnpm db:push
```

**2. Build Application**
```bash
pnpm build
```

**3. Deploy Smart Contracts**
```bash
# Deploy contracts to OneChain
move deploy --network mainnet
```

**4. Start Server**
```bash
pnpm start
```

**5. Configure Domain (Optional)**
- Point domain to server IP
- Set up SSL certificate
- Configure reverse proxy

### Monitoring

**Health Checks:**
- Database connectivity
- OneChain RPC connectivity
- OneDEX API availability
- Agent execution status

**Metrics:**
- Request latency
- Error rates
- Transaction success rate
- Active users

**Alerts:**
- Failed transactions
- Database errors
- API errors
- High error rates

---

## Conclusion

DCABot represents a significant innovation in DeFi investment platforms by combining autonomous AI agents with dollar-cost averaging strategies. The platform removes the friction and discipline required for successful DCA investing, making it accessible to everyone.

The 30-day build plan is aggressive but achievable for a hackathon MVP. The core features (NLP, scheduling, execution) can be implemented in the first two weeks, with the remaining time dedicated to polish, testing, and smart contract integration.

The key to success is focusing on the core user experience: users should be able to give natural language instructions and see their investments execute automatically without further intervention. Everything else is secondary to this core value proposition.

Good luck with the hackathon! 🚀

