import { NextResponse } from "next/server";
import { processLead } from "@/lib/process-lead";

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
    console.log("Facebook webhook verified");
    return new Response(challenge, { status: 200 });
  }

  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

// Incoming lead ad events
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const entries = (body.entry as Array<Record<string, unknown>>) || [];

  for (const entry of entries) {
    const changes = (entry.changes as Array<Record<string, unknown>>) || [];
    for (const change of changes) {
      if (change.field === "leadgen") {
        const changeValue = change.value as Record<string, unknown>;
        const leadgenId = String(changeValue?.leadgen_id || "");
        const pageId = String(changeValue?.page_id || "");

        if (!leadgenId) continue;

        // Fetch full lead data from Facebook Graph API
        const leadData = await fetchFacebookLead(leadgenId, pageId);
        if (leadData) {
          await processLead(leadData);
        }
      }
    }
  }

  // Always return 200 to acknowledge
  return NextResponse.json({ status: "ok" });
}

/**
 * Fetch lead details from Facebook Graph API using the leadgen ID.
 * Lead Ads only send the ID in the webhook — you must fetch the actual field values.
 */
async function fetchFacebookLead(leadId: string, _pageId: string) {
  const token = process.env.FB_PAGE_ACCESS_TOKEN;

  if (!token) {
    console.error("FB_PAGE_ACCESS_TOKEN not configured");
    return null;
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/v21.0/${leadId}?access_token=${token}`
    );

    if (!res.ok) {
      console.error("Facebook lead fetch failed:", await res.json());
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
    console.error("Facebook lead fetch error:", error);
    return null;
  }
}
