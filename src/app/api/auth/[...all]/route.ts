import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

/**
 * @file route.ts
 * @description BetterAuth Catch-all API Route Handler.
 * Manages all authentication lifecycles: Sign Up, Sign In, Session management.
 */

const handler = toNextJsHandler(auth);

export const GET = handler.GET;
export const POST = handler.POST;