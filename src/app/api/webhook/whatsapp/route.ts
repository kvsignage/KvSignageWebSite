import { NextResponse } from "next/server";
import { processLead } from "@/lib/process-lead";

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

function isOnFlowCooldown(phone: string): boolean {
  const now = Date.now();
  const lastSent = flowCooldownMap.get(phone);

  // Clean up old entries periodically
  if (flowCooldownMap.size > 5000) {
    for (const [key, timestamp] of flowCooldownMap) {
      if (now - timestamp > FLOW_COOLDOWN_MS) flowCooldownMap.delete(key);
    }
  }

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
    console.log("WhatsApp webhook verified");
    return new Response(challenge, { status: 200 });
  }

  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

// Incoming messages
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const entry = (body.entry as Array<Record<string, unknown>>)?.[0];
  const changes = (entry?.changes as Array<Record<string, unknown>>)?.[0];
  const value = changes?.value as Record<string, unknown> | undefined;

  if (!value) {
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

      // Flow form submission — user completed the enquiry form
      if (message.type === "interactive" && (message.interactive as Record<string, unknown>)?.type === "nfm_reply") {
        try {
          const interactive = message.interactive as Record<string, unknown>;
          const nfmReply = interactive.nfm_reply as Record<string, unknown>;
          const flowData = JSON.parse(String(nfmReply.response_json));
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
          console.error("Failed to parse Flow response:", error);
        }
      } else {
        // Any other message (text, image, etc.) — reply with the Flow (max once per hour)
        if (!isOnFlowCooldown(phone)) {
          await sendFlowMessage(phone, contactName);
        }
      }
    }
  }

  // Always return 200 to acknowledge — Meta retries on non-200
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
    console.error("WhatsApp Flow credentials not configured");
    return null;
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`,
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
      console.error("WhatsApp Flow message failed:", await res.json());
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("WhatsApp Flow message error:", error);
    return null;
  }
}
