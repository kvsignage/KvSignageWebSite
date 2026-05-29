/**
 * Runtime environment variable validation.
 * Imported once at startup (via instrumentation.ts) to surface missing config early.
 *
 * Categories:
 *   REQUIRED  — App won't function without these. Logs error.
 *   OPTIONAL  — Feature degrades gracefully. Logs warning.
 *   SILENT    — Feature-flagged, no log if absent.
 */

import { logWarn, logError } from "@/lib/logger";

interface EnvVar {
  key: string;
  level: "required" | "optional" | "silent";
  description: string;
}

const ENV_VARS: EnvVar[] = [
  // Required for core lead processing
  { key: "HUBSPOT_API_KEY", level: "required", description: "HubSpot CRM integration" },
  { key: "RESEND_API_KEY", level: "required", description: "Email notifications" },
  { key: "SALES_TEAM_EMAIL", level: "required", description: "Sales team email recipients" },
  { key: "RESEND_FROM_EMAIL", level: "required", description: "Email sender address" },

  // Optional — features degrade gracefully
  { key: "WHATSAPP_ACCESS_TOKEN", level: "optional", description: "WhatsApp notifications" },
  { key: "WHATSAPP_PHONE_NUMBER_ID", level: "optional", description: "WhatsApp phone number ID" },
  { key: "WHATSAPP_NOTIFY_PHONE", level: "optional", description: "WhatsApp team alerts" },
  { key: "META_CONVERSIONS_API_TOKEN", level: "optional", description: "Meta server-side tracking" },
  { key: "FB_APP_SECRET", level: "optional", description: "Webhook signature verification" },
  { key: "FB_PAGE_ACCESS_TOKEN", level: "optional", description: "Facebook Lead Ads data fetch" },

  // Feature-flagged — silent if not set
  { key: "NEXT_PUBLIC_SITE_URL", level: "silent", description: "Site URL for metadata" },
  { key: "NEXT_PUBLIC_META_PIXEL_ID", level: "silent", description: "Meta Pixel tracking" },
  { key: "NEXT_PUBLIC_GA_ID", level: "silent", description: "Google Analytics tracking" },
  { key: "WHATSAPP_WEBHOOK_VERIFY_TOKEN", level: "silent", description: "WhatsApp webhook verification" },
  { key: "WHATSAPP_FLOW_ID", level: "silent", description: "WhatsApp Flow form" },
  { key: "FB_WEBHOOK_VERIFY_TOKEN", level: "silent", description: "Facebook webhook verification" },
];

export function validateEnv() {
  const missing: { required: string[]; optional: string[] } = { required: [], optional: [] };

  for (const v of ENV_VARS) {
    const value = process.env[v.key];
    if (!value) {
      if (v.level === "required") missing.required.push(`${v.key} (${v.description})`);
      else if (v.level === "optional") missing.optional.push(`${v.key} (${v.description})`);
    }
  }

  if (missing.required.length > 0) {
    logError("Env", "validate", `Missing REQUIRED env vars: ${missing.required.join(", ")}`);
  }
  if (missing.optional.length > 0) {
    logWarn("Env", "validate", `Missing optional env vars (features degraded): ${missing.optional.join(", ")}`);
  }
  if (missing.required.length === 0 && missing.optional.length === 0) {
    // All good — no log needed
  }
}
