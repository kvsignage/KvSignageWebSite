import { NextResponse } from "next/server";
import { log, logError, logWarn } from "@/lib/logger";
import { processLead } from "@/lib/process-lead";
import { verifyWebhookSignature } from "@/lib/verify-webhook";
import { FB_GRAPH_API_VERSION } from "@/lib/constants";

/**
 * Facebook Lead Ads Webhook
 *
 * GET  — Verification (Meta sends this to confirm your webhook URL)
 * POST — New lead notifications from Lead Ad forms
 */

// Webhook verification
export async function GET(request: Request) {
  const url = new URL(request.url);
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === process.env.FB_WEBHOOK_VERIFY_TOKEN) {
    log("FBWebhook", "verify", "Facebook webhook verified");
    return new Response(challenge, { status: 200 });
  }

  logWarn("FBWebhook", "verify", "Verification failed", { mode, tokenMatch: token === process.env.FB_WEBHOOK_VERIFY_TOKEN });
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

// Incoming lead ad events
export async function POST(request: Request) {
  const start = performance.now();
  const rawBody = await request.text();

  // Verify Meta signature
  if (!(await verifyWebhookSignature(request, rawBody))) {
    logWarn("FBWebhook", "signature", "Invalid webhook signature");
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(rawBody);
  } catch {
    logWarn("FBWebhook", "parse", "Invalid request body");
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const entries = (body.entry as Array<Record<string, unknown>>) || [];
  log("FBWebhook", "received", "Webhook event received", { entries: entries.length });

  for (const entry of entries) {
    const changes = (entry.changes as Array<Record<string, unknown>>) || [];
    for (const change of changes) {
      if (change.field === "leadgen") {
        const changeValue = change.value as Record<string, unknown>;
        const leadgenId = String(changeValue?.leadgen_id || "");
        const pageId = String(changeValue?.page_id || "");

        if (!leadgenId) continue;

        log("FBWebhook", "leadgen", "Processing leadgen event", { leadgenId, pageId });

        // Fetch full lead data from Facebook Graph API
        const leadData = await fetchFacebookLead(leadgenId, pageId);
        if (leadData) {
          log("FBWebhook", "processLead", "Calling processLead", { leadgenId, name: leadData.name });
          await processLead(leadData);
        } else {
          logError("FBWebhook", "fetchLead", "Failed to fetch lead data", undefined, { leadgenId });
        }
      }
    }
  }

  // Always return 200 to acknowledge
  const durationMs = Math.round(performance.now() - start);
  log("FBWebhook", "complete", `Webhook processed in ${durationMs}ms`, { durationMs, entries: entries.length });
  return NextResponse.json({ status: "ok" });
}

/**
 * Fetch lead details from Facebook Graph API using the leadgen ID.
 * Lead Ads only send the ID in the webhook — you must fetch the actual field values.
 */
async function fetchFacebookLead(leadId: string, _pageId: string) {
  const token = process.env.FB_PAGE_ACCESS_TOKEN;

  if (!token) {
    logError("FBWebhook", "config", "FB_PAGE_ACCESS_TOKEN not configured");
    return null;
  }

  log("FBWebhook", "fetchLead", "Fetching lead from Graph API", { leadId });

  try {
    const res = await fetch(
      `https://graph.facebook.com/${FB_GRAPH_API_VERSION}/${leadId}?access_token=${token}`
    );

    if (!res.ok) {
      logError("FBWebhook", "fetchLead", "Facebook lead fetch failed", await res.json(), { leadId, status: res.status });
      return null;
    }

    const data = await res.json();
    const fields: Record<string, string> = {};

    // Lead Ads return field_data array: [{name: "email", values: ["x@y.com"]}, ...]
    for (const field of data.field_data || []) {
      fields[field.name] = field.values?.[0] || "";
    }

    // Map Facebook Lead Ad fields to our lead format
    // Common field names: full_name, first_name, last_name, email, phone_number, company_name, city
    const name =
      fields.full_name ||
      `${fields.first_name || ""} ${fields.last_name || ""}`.trim() ||
      "Facebook Lead";

    log("FBWebhook", "fetchLead", "Lead data mapped", { leadId, name, fieldsFound: Object.keys(fields) });

    return {
      name: name.slice(0, 100),
      email: (fields.email || `fb_lead_${leadId}@placeholder.local`).slice(0, 200),
      phone: (fields.phone_number?.replace(/[^0-9]/g, "") || "").slice(0, 20),
      business: (fields.company_name || "Unknown (Facebook Lead Ad)").slice(0, 100),
      service: (fields.service || "Enquiry via Facebook").slice(0, 100),
      message: (fields.message || fields.comments || "").slice(0, 500),
      utm_source: "facebook",
      utm_medium: "paid",
      utm_campaign: "lead_ads",
    };
  } catch (error) {
    logError("FBWebhook", "fetchLead", "Facebook lead fetch error", error, { leadId });
    return null;
  }
}
