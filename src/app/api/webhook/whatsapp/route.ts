import { NextResponse } from "next/server";
import { log, logError, logWarn } from "@/lib/logger";
import { processLead } from "@/lib/process-lead";
import { verifyWebhookSignature } from "@/lib/verify-webhook";
import { FB_GRAPH_API_VERSION } from "@/lib/constants";

/**
 * WhatsApp Cloud API Webhook
 *
 * GET  — Verification (Meta sends this to confirm your webhook URL)
 * POST — Incoming messages & status updates
 *
 * Flow: User messages → bot replies with Flow CTA → user fills form → lead processed
 */

const FLOW_ID = process.env.WHATSAPP_FLOW_ID || "";

// Rate limit: only send Flow message once per phone per hour
const flowCooldownMap = new Map<string, number>();
const FLOW_COOLDOWN_MS = 60 * 60 * 1000; // 1 hour
let cooldownCheckCount = 0;

function isOnFlowCooldown(phone: string): boolean {
  const now = Date.now();

  // Periodic cleanup every 50 checks to prevent memory growth
  if (++cooldownCheckCount % 50 === 0) {
    for (const [key, timestamp] of flowCooldownMap) {
      if (now - timestamp > FLOW_COOLDOWN_MS) flowCooldownMap.delete(key);
    }
  }

  const lastSent = flowCooldownMap.get(phone);
  if (lastSent && now - lastSent < FLOW_COOLDOWN_MS) {
    return true;
  }

  flowCooldownMap.set(phone, now);
  return false;
}

// Webhook verification
export async function GET(request: Request) {
  const url = new URL(request.url);
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN) {
    log("WAWebhook", "verify", "WhatsApp webhook verified");
    return new Response(challenge, { status: 200 });
  }

  logWarn("WAWebhook", "verify", "Verification failed", { mode });
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

// Incoming messages
export async function POST(request: Request) {
  const start = performance.now();
  const rawBody = await request.text();

  // Verify Meta signature
  if (!(await verifyWebhookSignature(request, rawBody))) {
    logWarn("WAWebhook", "signature", "Invalid webhook signature");
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(rawBody);
  } catch {
    logWarn("WAWebhook", "parse", "Invalid request body");
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const entry = (body.entry as Array<Record<string, unknown>>)?.[0];
  const changes = (entry?.changes as Array<Record<string, unknown>>)?.[0];
  const value = changes?.value as Record<string, unknown> | undefined;

  if (!value) {
    log("WAWebhook", "skip", "No value in webhook payload, ignoring");
    return NextResponse.json({ status: "ignored" });
  }

  // Only process incoming messages (skip status updates like "delivered", "read")
  const messages = value.messages as Array<Record<string, unknown>> | undefined;
  if (messages && messages.length > 0) {
    for (const message of messages) {
      const phone = String(message.from || "");
      const contacts = (value.contacts as Array<Record<string, unknown>>) || [];
      const contactName = String(
        (contacts[0]?.profile as Record<string, unknown>)?.name || "WhatsApp Lead"
      );

      if (!phone) continue;

      log("WAWebhook", "message", "Incoming message", { phone, type: String(message.type), contact: contactName });

      // Flow form submission — user completed the enquiry form
      if (message.type === "interactive" && (message.interactive as Record<string, unknown>)?.type === "nfm_reply") {
        try {
          const interactive = message.interactive as Record<string, unknown>;
          const nfmReply = interactive.nfm_reply as Record<string, unknown>;
          const flowData = JSON.parse(String(nfmReply.response_json));
          log("WAWebhook", "flowForm", "Flow form submitted", { phone, name: flowData.name, service: flowData.service });
          await processLead({
            name: String(flowData.name || contactName).slice(0, 100),
            email: String(flowData.email || `wa_${phone}@placeholder.local`).slice(0, 200),
            phone: phone.slice(0, 20),
            business: String(flowData.business || "Unknown").slice(0, 100),
            service: String(flowData.service || "Enquiry via WhatsApp").slice(0, 100),
            message: String(flowData.message || "").slice(0, 500),
            utm_source: "whatsapp",
            utm_medium: "organic",
          });
        } catch (error) {
          logError("WAWebhook", "flowForm", "Failed to parse Flow response", error, { phone });
        }
      } else {
        // Any other message (text, image, etc.) — reply with the Flow (max once per hour)
        if (!isOnFlowCooldown(phone)) {
          log("WAWebhook", "sendFlow", "Sending Flow CTA", { phone });
          await sendFlowMessage(phone, contactName);
        } else {
          log("WAWebhook", "cooldown", "Skipped Flow CTA (cooldown active)", { phone });
        }
      }
    }
  }

  // Always return 200 to acknowledge — Meta retries on non-200
  const durationMs = Math.round(performance.now() - start);
  log("WAWebhook", "complete", `Webhook processed in ${durationMs}ms`, { durationMs });
  return NextResponse.json({ status: "ok" });
}

/**
 * Send a WhatsApp Flow message to the user.
 * This displays a CTA button that opens the lead enquiry form.
 */
async function sendFlowMessage(to: string, name: string) {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!token || !phoneNumberId || !FLOW_ID) {
    logError("WAWebhook", "flowConfig", "WhatsApp Flow credentials not configured", undefined, { hasToken: !!token, hasPhoneId: !!phoneNumberId, hasFlowId: !!FLOW_ID });
    return null;
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/${FB_GRAPH_API_VERSION}/${phoneNumberId}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to,
          type: "interactive",
          interactive: {
            type: "flow",
            header: {
              type: "text",
              text: "KV Signage",
            },
            body: {
              text: `Hi ${name}! 👋 Welcome to KV Signage — Chennai's trusted signage partner.\n\nPlease fill in your details so we can assist you with the right solution.`,
            },
            footer: {
              text: "We respond within 30 minutes",
            },
            action: {
              name: "flow",
              parameters: {
                flow_message_version: "3",
                flow_id: FLOW_ID,
                flow_cta: "Get Free Quote",
                mode: "published",
                flow_action: "navigate",
                flow_action_payload: {
                  screen: "LEAD_FORM",
                },
              },
            },
          },
        }),
      }
    );

    if (!res.ok) {
      logError("WAWebhook", "sendFlow", "WhatsApp Flow message failed", await res.json(), { to, status: res.status });
      return null;
    }

    const result = await res.json();
    log("WAWebhook", "sendFlow", "Flow message sent", { to, messageId: result.messages?.[0]?.id });
    return result;
  } catch (error) {
    logError("WAWebhook", "sendFlow", "WhatsApp Flow message error", error, { to });
    return null;
  }
}
