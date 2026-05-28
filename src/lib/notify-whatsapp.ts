import { log, logError, logWarn } from "@/lib/logger";

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

async function sendWhatsAppTemplate(
  to: string,
  templateName: string,
  languageCode: string,
  bodyParameters: string[]
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
          type: "template",
          template: {
            name: templateName,
            language: { code: languageCode },
            components: [
              {
                type: "body",
                parameters: bodyParameters.map((text) => ({
                  type: "text",
                  text,
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
 * Variables: {{1}} name, {{2}} email, {{3}} phone, {{4}} business, {{5}} service, {{6}} message
 */
export async function sendLeadWhatsAppNotification(lead: LeadData) {
  const notifyPhone = process.env.WHATSAPP_NOTIFY_PHONE;

  if (!notifyPhone) {
    logError("WhatsApp", "teamNotify", "WHATSAPP_NOTIFY_PHONE not configured");
    return null;
  }

  log("WhatsApp", "teamNotify", "Sending team notification", { lead: lead.name });

  return sendWhatsAppTemplate(notifyPhone, TEMPLATES.SALES_NOTIFICATION, "en", [
    lead.name,
    lead.email,
    lead.phone,
    lead.business,
    lead.service,
    lead.message || "No message",
  ]);
}

/**
 * Send confirmation to the client who submitted the enquiry.
 * Template: lead_confirmation
 * Variables: {{1}} name, {{2}} service
 */
export async function sendClientWhatsAppConfirmation(lead: LeadData) {
  // Client phone should be in international format (e.g., 919876543210)
  const clientPhone = lead.phone.replace(/[^0-9]/g, "");

  if (!clientPhone) {
    logWarn("WhatsApp", "clientConfirm", "Client phone number invalid", { raw: lead.phone });
    return null;
  }
  const refId = `KVS-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Date.now().toString(36).toUpperCase()}`;
  return sendWhatsAppTemplate(
    clientPhone,
    TEMPLATES.CLIENT_CONFIRMATION,
    "en",
    [lead.name, lead.service,refId]
  );
}
