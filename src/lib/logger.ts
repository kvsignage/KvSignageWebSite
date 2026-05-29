/**
 * Structured logging helpers for API routes and lib functions.
 *
 * Format: [ISO_TIMESTAMP] LEVEL [Scope] action: message {meta_json}
 *
 * Usage:
 *   import { log, logError, logWarn } from "@/lib/logger";
 *   log("HubSpot", "createContact", "Contact created", { contactId: "123" });
 */

const PII_KEYS = new Set(["email", "phone", "name"]);

function maskValue(key: string, value: unknown): unknown {
  if (!PII_KEYS.has(key) || typeof value !== "string") return value;
  if (key === "email") {
    const [local, domain] = value.split("@");
    if (!domain) return "***";
    return `${local.slice(0, 2)}***@${domain}`;
  }
  if (key === "phone") return value.slice(0, 4) + "***" + value.slice(-2);
  // name: keep first word only
  return value.split(" ")[0] + " ***";
}

function sanitizeMeta(meta?: Record<string, unknown>): Record<string, unknown> | undefined {
  if (!meta) return meta;
  const sanitized: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(meta)) {
    sanitized[key] = maskValue(key, value);
  }
  return sanitized;
}

function formatMeta(meta?: Record<string, unknown>): string {
  if (!meta) return "";
  return ` ${JSON.stringify(sanitizeMeta(meta))}`;
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
