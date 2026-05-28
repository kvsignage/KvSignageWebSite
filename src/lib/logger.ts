/**
 * Structured logging helpers for API routes and lib functions.
 *
 * Format: [ISO_TIMESTAMP] LEVEL [Scope] action: message {meta_json}
 *
 * Usage:
 *   import { log, logError, logWarn } from "@/lib/logger";
 *   log("HubSpot", "createContact", "Contact created", { contactId: "123" });
 */

function formatMeta(meta?: Record<string, unknown>): string {
  if (!meta) return "";
  return ` ${JSON.stringify(meta)}`;
}

export function log(scope: string, action: string, message: string, meta?: Record<string, unknown>) {
  console.log(`[${new Date().toISOString()}] INFO [${scope}] ${action}: ${message}${formatMeta(meta)}`);
}

export function logError(scope: string, action: string, message: string, error?: unknown, meta?: Record<string, unknown>) {
  console.error(`[${new Date().toISOString()}] ERROR [${scope}] ${action}: ${message}${formatMeta(meta)}`, error ?? "");
}

export function logWarn(scope: string, action: string, message: string, meta?: Record<string, unknown>) {
  console.warn(`[${new Date().toISOString()}] WARN [${scope}] ${action}: ${message}${formatMeta(meta)}`);
}
