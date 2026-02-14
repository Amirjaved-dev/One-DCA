# DCABot - Complete File Structure & Implementation Guide

**Author:** Manus AI  
**Date:** February 14, 2026  
**Version:** 1.0

---

## Project Directory Structure

```
dcabot/
├── client/                          # Frontend application
│   ├── public/                      # Static assets
│   │   ├── favicon.ico
│   │   ├── logo.svg
│   │   └── robots.txt
│   ├── src/
│   │   ├── _core/                   # Core utilities (don't modify)
│   │   ├── components/              # React components
│   │   │   ├── ui/                  # Shadcn/ui components
│   │   │   │   ├── button.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── dialog.tsx
│   │   │   │   ├── input.tsx
│   │   │   │   ├── table.tsx
│   │   │   │   ├── tabs.tsx
│   │   │   │   ├── badge.tsx
│   │   │   │   ├── select.tsx
│   │   │   │   ├── toast.tsx
│   │   │   │   └── ...
│   │   │   ├── AgentStatusCard.tsx  # Agent status display
│   │   │   ├── ScheduleCard.tsx     # Investment schedule card
│   │   │   ├── ActivityFeed.tsx     # Recent activity list
│   │   │   ├── PortfolioChart.tsx   # Performance chart
│   │   │   ├── TransactionTable.tsx # Transaction history
│   │   │   ├── ChatInterface.tsx    # Natural language chat
│   │   │   ├── ScheduleList.tsx     # List of schedules
│   │   │   ├── TokenBreakdown.tsx   # Token holdings
│   │   │   ├── NotificationBell.tsx # Notification icon
│   │   │   └── ErrorBoundary.tsx    # Error handling
│   │   ├── contexts/                # React contexts
│   │   │   ├── ThemeContext.tsx
│   │   │   └── AgentContext.tsx     # Agent state management
│   │   ├── hooks/                   # Custom hooks
│   │   │   ├── useAuth.ts
│   │   │   ├── useAgent.ts          # Agent operations
│   │   │   ├── useSchedules.ts      # Schedule management
│   │   │   └── usePortfolio.ts      # Portfolio data
│   │   ├── lib/                     # Utilities
│   │   │   ├── trpc.ts              # tRPC client
│   │   │   ├── utils.ts             # Helper functions
│   │   │   └── constants.ts         # Constants
│   │   ├── pages/                   # Page components
│   │   │   ├── Home.tsx             # Landing page
│   │   │   ├── Dashboard.tsx        # Main dashboard
│   │   │   ├── Chat.tsx             # Chat interface
│   │   │   ├── Portfolio.tsx        # Portfolio view
│   │   │   ├── History.tsx          # Transaction history
│   │   │   ├── Settings.tsx         # User settings
│   │   │   └── NotFound.tsx         # 404 page
│   │   ├── App.tsx                  # App root & routing
│   │   ├── main.tsx                 # Entry point
│   │   └── index.css                # Global styles
│   └── index.html                   # HTML template
├── server/                          # Backend application
│   ├── _core/                       # Core utilities (don't modify)
│   │   ├── context.ts
│   │   ├── cookies.ts
│   │   ├── env.ts
│   │   ├── index.ts
│   │   ├── llm.ts
│   │   ├── oauth.ts
│   │   ├── systemRouter.ts
│   │   └── trpc.ts
│   ├── agent/                       # AI agent logic
│   │   ├── nlp.ts                   # Natural language processing
│   │   ├── parser.ts                # Instruction parser
│   │   ├── scheduler.ts             # Schedule generator
│   │   ├── executor.ts              # Purchase executor
│   │   └── monitor.ts               # Agent monitoring
│   ├── routers/                     # tRPC routers
│   │   ├── auth.ts                  # Authentication
│   │   ├── agent.ts                 # Agent operations
│   │   ├── schedule.ts              # Schedule management
│   │   ├── transaction.ts           # Transaction history
│   │   ├── portfolio.ts             # Portfolio analytics
│   │   └── notification.ts          # Notifications
│   ├── services/                    # Business logic
│   │   ├── onedex.ts                # OneDEX integration
│   │   ├── onechain.ts              # OneChain integration
│   │   ├── analytics.ts             # Portfolio analytics
│   │   └── notification.ts          # Notification service
│   ├── jobs/                        # Background jobs
│   │   ├── executionLoop.ts         # Main execution loop
│   │   ├── scheduleMonitor.ts       # Schedule monitoring
│   │   └── cleanup.ts               # Data cleanup
│   ├── db.ts                        # Database queries
│   ├── routers.ts                   # Router aggregation
│   └── auth.logout.test.ts          # Example test
├── drizzle/                         # Database
│   ├── schema.ts                    # Database schema
│   └── migrations/                  # Migration files
├── shared/                          # Shared code
│   ├── const.ts                     # Shared constants
│   └── types.ts                     # Shared types
├── contracts/                       # Smart contracts
│   ├── DCABot.move                  # Main contract
│   ├── Schedule.move                # Schedule management
│   └── tests/                       # Contract tests
├── docs/                            # Documentation
│   ├── API.md                       # API documentation
│   ├── ARCHITECTURE.md              # Architecture docs
│   └── DEPLOYMENT.md                # Deployment guide
├── .env                             # Environment variables
├── .gitignore                       # Git ignore
├── package.json                     # Dependencies
├── tsconfig.json                    # TypeScript config
├── vite.config.ts                   # Vite config
├── tailwind.config.ts               # Tailwind config
└── README.md                        # Project readme
```

---

## Key Files Implementation Guide

### Database Schema (`drizzle/schema.ts`)

```typescript
import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal } from "drizzle-orm/mysql-core";

// Users table (already exists, extend if needed)
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  walletAddress: varchar("walletAddress", { length: 128 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

// Investment schedules
export const schedules = mysqlTable("schedules", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  token: varchar("token", { length: 20 }).notNull(),
  amountUSD: decimal("amountUSD", { precision: 18, scale: 2 }).notNull(),
  frequency: varchar("frequency", { length: 50 }).notNull(),
  cronExpression: varchar("cronExpression", { length: 100 }).notNull(),
  startDate: timestamp("startDate").notNull(),
  endDate: timestamp("endDate"),
  status: mysqlEnum("status", ["active", "paused", "completed", "cancelled"]).default("active").notNull(),
  nextExecution: timestamp("nextExecution").notNull(),
  lastExecution: timestamp("lastExecution"),
  executionCount: int("executionCount").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// Transactions
export const transactions = mysqlTable("transactions", {
  id: int("id").autoincrement().primaryKey(),
  scheduleId: int("scheduleId").notNull().references(() => schedules.id, { onDelete: "cascade" }),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  token: varchar("token", { length: 20 }).notNull(),
  amountUSD: decimal("amountUSD", { precision: 18, scale: 2 }).notNull(),
  tokenAmount: decimal("tokenAmount", { precision: 36, scale: 18 }).notNull(),
  price: decimal("price", { precision: 18, scale: 8 }).notNull(),
  txHash: varchar("txHash", { length: 128 }),
  status: mysqlEnum("status", ["pending", "success", "failed"]).default("pending").notNull(),
  errorMessage: text("errorMessage"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// Agent activity logs
export const agentLogs = mysqlTable("agentLogs", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  action: varchar("action", { length: 100 }).notNull(),
  details: text("details"),
  status: mysqlEnum("status", ["success", "error"]).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// Notifications
export const notifications = mysqlTable("notifications", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  type: varchar("type", { length: 50 }).notNull(),
  title: varchar("title", { length: 200 }).notNull(),
  message: text("message").notNull(),
  read: int("read").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type Schedule = typeof schedules.$inferSelect;
export type Transaction = typeof transactions.$inferSelect;
export type AgentLog = typeof agentLogs.$inferSelect;
export type Notification = typeof notifications.$inferSelect;
```

### Database Queries (`server/db.ts`)

```typescript
import { eq, and, desc, gte, lte } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { schedules, transactions, agentLogs, notifications } from "../drizzle/schema";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    _db = drizzle(process.env.DATABASE_URL);
  }
  return _db;
}

// Schedule queries
export async function createSchedule(data: {
  userId: number;
  token: string;
  amountUSD: number;
  frequency: string;
  cronExpression: string;
  startDate: Date;
  endDate?: Date;
  nextExecution: Date;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(schedules).values(data);
  return result;
}

export async function getUserSchedules(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.select().from(schedules)
    .where(eq(schedules.userId, userId))
    .orderBy(desc(schedules.createdAt));
}

export async function getDueSchedules() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const now = new Date();
  return await db.select().from(schedules)
    .where(
      and(
        eq(schedules.status, "active"),
        lte(schedules.nextExecution, now)
      )
    );
}

export async function updateSchedule(id: number, data: Partial<typeof schedules.$inferInsert>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.update(schedules)
    .set(data)
    .where(eq(schedules.id, id));
}

// Transaction queries
export async function createTransaction(data: {
  scheduleId: number;
  userId: number;
  token: string;
  amountUSD: number;
  tokenAmount: number;
  price: number;
  txHash?: string;
  status: "pending" | "success" | "failed";
  errorMessage?: string;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.insert(transactions).values(data);
}

export async function getUserTransactions(userId: number, limit = 50, offset = 0) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.select().from(transactions)
    .where(eq(transactions.userId, userId))
    .orderBy(desc(transactions.createdAt))
    .limit(limit)
    .offset(offset);
}

// Agent log queries
export async function createAgentLog(data: {
  userId: number;
  action: string;
  details?: string;
  status: "success" | "error";
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.insert(agentLogs).values(data);
}

export async function getUserAgentLogs(userId: number, limit = 20) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.select().from(agentLogs)
    .where(eq(agentLogs.userId, userId))
    .orderBy(desc(agentLogs.createdAt))
    .limit(limit);
}

// Notification queries
export async function createNotification(data: {
  userId: number;
  type: string;
  title: string;
  message: string;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.insert(notifications).values(data);
}

export async function getUserNotifications(userId: number, unreadOnly = false) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const query = db.select().from(notifications)
    .where(eq(notifications.userId, userId));
  
  if (unreadOnly) {
    query.where(eq(notifications.read, 0));
  }
  
  return await query.orderBy(desc(notifications.createdAt));
}
```

### NLP Parser (`server/agent/parser.ts`)

```typescript
import { invokeLLM } from "../_core/llm";

export interface ParsedInstruction {
  intent: "CREATE_SCHEDULE" | "STOP_SCHEDULE" | "PAUSE_AGENT" | "RESUME_AGENT" | "SHOW_PORTFOLIO" | "SHOW_HISTORY";
  entities: {
    amount?: number;
    currency?: string;
    token?: string;
    frequency?: string;
    dayOfWeek?: string;
    duration?: string;
    startDate?: string;
  };
  confidence: number;
}

export async function parseInstruction(instruction: string): Promise<ParsedInstruction> {
  const prompt = `You are an AI assistant that parses investment instructions.

Parse the following instruction and extract:
- intent: CREATE_SCHEDULE, STOP_SCHEDULE, PAUSE_AGENT, RESUME_AGENT, SHOW_PORTFOLIO, or SHOW_HISTORY
- entities: amount (number), currency (USD), token (symbol), frequency (daily/weekly/monthly), dayOfWeek (monday-sunday), duration (days or date), startDate (date)
- confidence: 0-1 score

Instruction: "${instruction}"

Return JSON only.`;

  const response = await invokeLLM({
    messages: [
      { role: "system", content: "You are a helpful assistant that parses investment instructions." },
      { role: "user", content: prompt }
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "parsed_instruction",
        strict: true,
        schema: {
          type: "object",
          properties: {
            intent: {
              type: "string",
              enum: ["CREATE_SCHEDULE", "STOP_SCHEDULE", "PAUSE_AGENT", "RESUME_AGENT", "SHOW_PORTFOLIO", "SHOW_HISTORY"]
            },
            entities: {
              type: "object",
              properties: {
                amount: { type: "number" },
                currency: { type: "string" },
                token: { type: "string" },
                frequency: { type: "string" },
                dayOfWeek: { type: "string" },
                duration: { type: "string" },
                startDate: { type: "string" }
              },
              additionalProperties: false
            },
            confidence: { type: "number" }
          },
          required: ["intent", "entities", "confidence"],
          additionalProperties: false
        }
      }
    }
  });

  const content = response.choices[0]?.message?.content;
  if (!content) throw new Error("No response from LLM");
  
  return JSON.parse(content);
}
```

### Schedule Generator (`server/agent/scheduler.ts`)

```typescript
export interface ScheduleConfig {
  token: string;
  amountUSD: number;
  frequency: string;
  startDate: Date;
  endDate?: Date;
}

export function generateCronExpression(frequency: string, dayOfWeek?: string): string {
  // Format: second minute hour day month dayOfWeek
  
  if (frequency === "daily") {
    return "0 0 12 * * *"; // Every day at 12:00 PM
  }
  
  if (frequency === "weekly") {
    const day = dayOfWeek ? getDayNumber(dayOfWeek) : 1; // Default to Monday
    return `0 0 12 * * ${day}`; // Every week on specified day at 12:00 PM
  }
  
  if (frequency === "monthly") {
    return "0 0 12 1 * *"; // 1st of every month at 12:00 PM
  }
  
  throw new Error(`Unsupported frequency: ${frequency}`);
}

function getDayNumber(day: string): number {
  const days: Record<string, number> = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6
  };
  return days[day.toLowerCase()] ?? 1;
}

export function calculateNextExecution(cronExpression: string, from: Date = new Date()): Date {
  // Use a cron parser library like 'cron-parser' to calculate next execution
  // For simplicity, this is a placeholder
  const parser = require('cron-parser');
  const interval = parser.parseExpression(cronExpression, { currentDate: from });
  return interval.next().toDate();
}
```

### Execution Engine (`server/agent/executor.ts`)

```typescript
import { getDueSchedules, updateSchedule, createTransaction, createAgentLog } from "../db";
import { getTokenPrice, executePurchase } from "../services/onedex";

export async function runExecutionLoop() {
  console.log("[Executor] Starting execution loop...");
  
  setInterval(async () => {
    try {
      const dueSchedules = await getDueSchedules();
      
      for (const schedule of dueSchedules) {
        await executeSchedule(schedule);
      }
    } catch (error) {
      console.error("[Executor] Error in execution loop:", error);
    }
  }, 60000); // Run every minute
}

async function executeSchedule(schedule: any) {
  try {
    console.log(`[Executor] Executing schedule ${schedule.id} for user ${schedule.userId}`);
    
    // 1. Get token price
    const price = await getTokenPrice(schedule.token);
    
    // 2. Calculate token amount
    const tokenAmount = Number(schedule.amountUSD) / price;
    
    // 3. Execute purchase
    const txHash = await executePurchase(schedule.userId, schedule.token, tokenAmount);
    
    // 4. Record transaction
    await createTransaction({
      scheduleId: schedule.id,
      userId: schedule.userId,
      token: schedule.token,
      amountUSD: Number(schedule.amountUSD),
      tokenAmount: tokenAmount,
      price: price,
      txHash: txHash,
      status: "success"
    });
    
    // 5. Update schedule
    const nextExecution = calculateNextExecution(schedule.cronExpression);
    await updateSchedule(schedule.id, {
      lastExecution: new Date(),
      nextExecution: nextExecution,
      executionCount: schedule.executionCount + 1
    });
    
    // 6. Log activity
    await createAgentLog({
      userId: schedule.userId,
      action: "PURCHASE_EXECUTED",
      details: `Bought ${tokenAmount} ${schedule.token} for $${schedule.amountUSD}`,
      status: "success"
    });
    
    console.log(`[Executor] Successfully executed schedule ${schedule.id}`);
    
  } catch (error) {
    console.error(`[Executor] Failed to execute schedule ${schedule.id}:`, error);
    
    // Log error
    await createAgentLog({
      userId: schedule.userId,
      action: "PURCHASE_FAILED",
      details: `Failed to buy ${schedule.token}: ${error.message}`,
      status: "error"
    });
    
    // Create failed transaction record
    await createTransaction({
      scheduleId: schedule.id,
      userId: schedule.userId,
      token: schedule.token,
      amountUSD: Number(schedule.amountUSD),
      tokenAmount: 0,
      price: 0,
      status: "failed",
      errorMessage: error.message
    });
  }
}

function calculateNextExecution(cronExpression: string): Date {
  // Use cron-parser to calculate next execution
  const parser = require('cron-parser');
  const interval = parser.parseExpression(cronExpression);
  return interval.next().toDate();
}
```

### OneDEX Integration (`server/services/onedex.ts`)

```typescript
import axios from "axios";

const ONEDEX_API_URL = process.env.ONEDEX_API_URL || "https://api.onedex.io";

export async function getTokenPrice(token: string): Promise<number> {
  // Get current token price from OneDEX
  const response = await axios.get(`${ONEDEX_API_URL}/price/${token}`);
  return response.data.price;
}

export async function executePurchase(
  userId: number,
  token: string,
  amount: number
): Promise<string> {
  // Execute token purchase on OneDEX
  // This is a placeholder - actual implementation depends on OneDEX API
  
  const response = await axios.post(`${ONEDEX_API_URL}/swap`, {
    userId: userId,
    fromToken: "USD",
    toToken: token,
    amount: amount
  });
  
  return response.data.txHash;
}

export async function getTokenBalance(userId: number, token: string): Promise<number> {
  // Get user's token balance
  const response = await axios.get(`${ONEDEX_API_URL}/balance/${userId}/${token}`);
  return response.data.balance;
}
```

### tRPC Routers (`server/routers/agent.ts`)

```typescript
import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { parseInstruction } from "../agent/parser";
import { getUserAgentLogs } from "../db";

export const agentRouter = router({
  parseInstruction: protectedProcedure
    .input(z.object({ instruction: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const parsed = await parseInstruction(input.instruction);
      return parsed;
    }),
  
  getStatus: protectedProcedure
    .query(async ({ ctx }) => {
      // Get agent status for current user
      const schedules = await getUserSchedules(ctx.user.id);
      const activeSchedules = schedules.filter(s => s.status === "active");
      
      return {
        status: activeSchedules.length > 0 ? "active" : "paused",
        activeSchedules: activeSchedules.length
      };
    }),
  
  getActivity: protectedProcedure
    .input(z.object({ limit: z.number().optional() }))
    .query(async ({ input, ctx }) => {
      const logs = await getUserAgentLogs(ctx.user.id, input.limit);
      return logs;
    }),
  
  pause: protectedProcedure
    .mutation(async ({ ctx }) => {
      // Pause all active schedules
      const schedules = await getUserSchedules(ctx.user.id);
      for (const schedule of schedules) {
        if (schedule.status === "active") {
          await updateSchedule(schedule.id, { status: "paused" });
        }
      }
      return { success: true };
    }),
  
  resume: protectedProcedure
    .mutation(async ({ ctx }) => {
      // Resume all paused schedules
      const schedules = await getUserSchedules(ctx.user.id);
      for (const schedule of schedules) {
        if (schedule.status === "paused") {
          await updateSchedule(schedule.id, { status: "active" });
        }
      }
      return { success: true };
    })
});
```

### Frontend Components (`client/src/components/AgentStatusCard.tsx`)

```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { Loader2, Pause, Play } from "lucide-react";

export function AgentStatusCard() {
  const { data: status, isLoading } = trpc.agent.getStatus.useQuery();
  const pauseMutation = trpc.agent.pause.useMutation();
  const resumeMutation = trpc.agent.resume.useMutation();
  
  const handlePause = async () => {
    await pauseMutation.mutateAsync();
    // Invalidate queries to refresh UI
  };
  
  const handleResume = async () => {
    await resumeMutation.mutateAsync();
    // Invalidate queries to refresh UI
  };
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Agent Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <Badge variant={status?.status === "active" ? "default" : "secondary"}>
              {status?.status}
            </Badge>
            <p className="text-sm text-muted-foreground mt-2">
              {status?.activeSchedules} active schedules
            </p>
          </div>
          <div className="flex gap-2">
            {status?.status === "active" ? (
              <Button onClick={handlePause} variant="outline">
                <Pause className="mr-2 h-4 w-4" />
                Pause
              </Button>
            ) : (
              <Button onClick={handleResume}>
                <Play className="mr-2 h-4 w-4" />
                Resume
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
```

---

## Implementation Checklist

### Week 1: Foundation
- [ ] Set up project structure
- [ ] Create database schema
- [ ] Run migrations (`pnpm db:push`)
- [ ] Implement authentication
- [ ] Create basic UI layout
- [ ] Build NLP parser
- [ ] Test instruction parsing

### Week 2: Core Features
- [ ] Implement schedule creation
- [ ] Build cron expression generator
- [ ] Create schedule CRUD operations
- [ ] Build execution engine
- [ ] Integrate OneDEX API
- [ ] Test purchase execution
- [ ] Build chat interface

### Week 3: Advanced Features
- [ ] Implement portfolio analytics
- [ ] Build performance charts
- [ ] Create transaction history
- [ ] Add filters and search
- [ ] Build notification system
- [ ] Test end-to-end flows

### Week 4: Polish & Launch
- [ ] Write smart contracts
- [ ] Deploy contracts to testnet
- [ ] Write unit tests
- [ ] Write integration tests
- [ ] Polish UI design
- [ ] Create demo video
- [ ] Submit to hackathon

---

## Testing Commands

```bash
# Run all tests
pnpm test

# Run specific test file
pnpm test server/auth.logout.test.ts

# Run tests in watch mode
pnpm test --watch

# Check TypeScript types
pnpm check

# Format code
pnpm format
```

---

## Development Commands

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Push database schema
pnpm db:push

# Generate database migrations
pnpm db:generate
```

---

## Environment Setup

Create `.env` file in project root:

```bash
# Database
DATABASE_URL=mysql://user:pass@host:port/dbname

# Auth (provided by Manus)
JWT_SECRET=auto-injected
OAUTH_SERVER_URL=auto-injected
VITE_OAUTH_PORTAL_URL=auto-injected

# OneChain
ONECHAIN_RPC_URL=https://rpc.onechain.io
ONEDEX_API_URL=https://api.onedex.io
AGENT_PRIVATE_KEY=your-agent-private-key

# Manus APIs (provided by Manus)
BUILT_IN_FORGE_API_URL=auto-injected
BUILT_IN_FORGE_API_KEY=auto-injected
```

---

## Next Steps

1. Review this file structure
2. Understand the implementation guide
3. Start with Week 1 tasks
4. Build incrementally
5. Test frequently
6. Deploy early
7. Iterate based on feedback

Good luck! 🚀

