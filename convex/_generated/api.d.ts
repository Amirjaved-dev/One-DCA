/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as actions_firecrawl from "../actions/firecrawl.js";
import type * as actions_groq from "../actions/groq.js";
import type * as actions_market from "../actions/market.js";
import type * as agent_api from "../agent/api.js";
import type * as agent_guardian from "../agent/guardian.js";
import type * as agent_sniper from "../agent/sniper.js";
import type * as chat from "../chat.js";
import type * as crons from "../crons.js";
import type * as intentParser from "../intentParser.js";
import type * as schema_constants from "../schema/constants.js";
import type * as test_groq_simple from "../test_groq_simple.js";
import type * as test_guardian_simple from "../test_guardian_simple.js";
import type * as test_sniper from "../test_sniper.js";
import type * as users from "../users.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  "actions/firecrawl": typeof actions_firecrawl;
  "actions/groq": typeof actions_groq;
  "actions/market": typeof actions_market;
  "agent/api": typeof agent_api;
  "agent/guardian": typeof agent_guardian;
  "agent/sniper": typeof agent_sniper;
  chat: typeof chat;
  crons: typeof crons;
  intentParser: typeof intentParser;
  "schema/constants": typeof schema_constants;
  test_groq_simple: typeof test_groq_simple;
  test_guardian_simple: typeof test_guardian_simple;
  test_sniper: typeof test_sniper;
  users: typeof users;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
