import { createHubSpotContact } from "@/lib/hubspot";
import { sendClientConfirmationEmail, sendSalesTeamNotification } from "@/lib/notify-email";
import { sendLeadWhatsAppNotification, sendClientWhatsAppConfirmation } from "@/lib/notify-whatsapp";

export interface LeadInput {
  name: string;
  email: string;
  phone: string;
  business: string;
  service: string;
  message?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}

/**
 * Shared lead processing pipeline.
 * Pushes to HubSpot + sends all notifications (email + WhatsApp) in parallel.
 * Used by: website form, WhatsApp webhook, Facebook Lead Ads webhook.
 */
export async function processLead(lead: LeadInput) {
  const results = await Promise.allSettled([
    createHubSpotContact(lead),
    sendSalesTeamNotification(lead),
    sendLeadWhatsAppNotification(lead),
    // Only send client notifications if we have valid contact info
    lead.email && !lead.email.includes("@placeholder.local")
      ? sendClientConfirmationEmail(lead)
      : Promise.resolve(null),
    lead.phone
      ? sendClientWhatsAppConfirmation(lead)
      : Promise.resolve(null),
  ]);

  const [crmResult, teamEmailResult, whatsappResult, clientEmailResult, clientWhatsappResult] = results;

  if (crmResult.status === "rejected") {
    console.error("CRM push failed:", crmResult.reason);
  }
  if (teamEmailResult.status === "rejected") {
    console.error("Sales team email failed:", teamEmailResult.reason);
  }
  if (whatsappResult.status === "rejected") {
    console.error("WhatsApp team notification failed:", whatsappResult.reason);
  }
  if (clientEmailResult.status === "rejected") {
    console.error("Client email failed:", clientEmailResult.reason);
  }
  if (clientWhatsappResult.status === "rejected") {
    console.error("Client WhatsApp failed:", clientWhatsappResult.reason);
  }

  return {
    crm: crmResult.status === "fulfilled" ? crmResult.value : null,
    teamEmail: teamEmailResult.status === "fulfilled",
    teamWhatsapp: whatsappResult.status === "fulfilled",
    clientEmail: clientEmailResult.status === "fulfilled",
    clientWhatsapp: clientWhatsappResult.status === "fulfilled",
  };
}
