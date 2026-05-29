import { log, logError, logWarn } from "@/lib/logger";
import { FB_GRAPH_API_VERSION } from "@/lib/constants";

interface LeadData {
  name: string;
  email: string;
  phone: string;
  business: string;
  service: string;
  message?: string;
}

// Template names — must match what you create in WhatsApp Manager
const TEMPLATES = {
  SALES_NOTIFICATION: "new_lead_alert",
  CLIENT_CONFIRMATION: "lead_confirmation",
};

interface NamedParam {
  name: string;
  value: string;
}

async function sendWhatsAppTemplate(
  to: string,
  templateName: string,
  languageCode: string,
  bodyParameters: NamedParam[]
) {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!token || !phoneNumberId) {
    logError("WhatsApp", "config", "WhatsApp API credentials not configured");
    return null;
  }

  log("WhatsApp", "sendTemplate", "Sending template", { template: templateName, to });

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
          type: "template",
          template: {
            name: templateName,
            language: { code: languageCode },
            components: [
              {
                type: "body",
                parameters: bodyParameters.map((p) => ({
                  type: "text",
                  parameter_name: p.name,
                  text: p.value,
                })),
              },
            ],
          },
        }),
      }
    );

    if (!res.ok) {
      const err = await res.json();
      logError("WhatsApp", "sendTemplate", `Template "${templateName}" failed`, err, { to, status: res.status });
      return null;
    }

    const result = await res.json();
    log("WhatsApp", "sendTemplate", "Template sent successfully", { template: templateName, to, messageId: result.messages?.[0]?.id });
    return result;
  } catch (error) {
    logError("WhatsApp", "sendTemplate", `Template "${templateName}" error`, error, { to });
    return null;
  }
}

/**
 * Notify your sales team about a new lead.
 * Template: new_lead_alert
 * Variables: {{name}}, {{email}}, {{phone}}, {{b_name}}, {{service_name}}, {{message}}
 */
export async function sendLeadWhatsAppNotification(lead: LeadData) {
  const notifyPhone = process.env.WHATSAPP_NOTIFY_PHONE;

  if (!notifyPhone) {
    logError("WhatsApp", "teamNotify", "WHATSAPP_NOTIFY_PHONE not configured");
    return null;
  }

  log("WhatsApp", "teamNotify", "Sending team notification", { lead: lead.name });

  return sendWhatsAppTemplate(notifyPhone, TEMPLATES.SALES_NOTIFICATION, "en", [
    { name: "name", value: lead.name },
    { name: "email", value: lead.email },
    { name: "phone", value: lead.phone },
    { name: "b_name", value: lead.business },
    { name: "service_name", value: lead.service },
    { name: "message", value: lead.message || "No message" },
  ]);
}

/**
 * Send confirmation to the client who submitted the enquiry.
 * Template: lead_confirmation
 * Variables: {{name}}, {{s_name}}, {{r_id}}
 */
export async function sendClientWhatsAppConfirmation(lead: LeadData) {
  // Client phone should be in international format (e.g., 919876543210)
  let clientPhone = lead.phone.replace(/[^0-9]/g, "");

  // Auto-prefix 91 for 10-digit Indian numbers
  if (clientPhone.length === 10) clientPhone = `91${clientPhone}`;

  if (!clientPhone) {
    logWarn("WhatsApp", "clientConfirm", "Client phone number invalid", { raw: lead.phone });
    return null;
  }
  const refId = `KVS-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Date.now().toString(36).toUpperCase()}`;
  return sendWhatsAppTemplate(
    clientPhone,
    TEMPLATES.CLIENT_CONFIRMATION,
    "en",
    [
      { name: "name", value: lead.name },
      { name: "s_name", value: lead.service },
      { name: "r_id", value: refId },
    ]
  );
}
