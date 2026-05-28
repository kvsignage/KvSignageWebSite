import { createHubSpotContact } from "@/lib/hubspot";
import { log, logError } from "@/lib/logger";
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
  const start = performance.now();
  const leadId = `${lead.name}|${lead.phone}`;
  log("ProcessLead", "start", "Processing lead", { leadId, service: lead.service, source: lead.utm_source });

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

  const status = (r: PromiseSettledResult<unknown>) => r.status === "fulfilled" ? "ok" : "failed";

  if (crmResult.status === "rejected") {
    logError("ProcessLead", "crm", "CRM push failed", crmResult.reason, { leadId });
  } else {
    log("ProcessLead", "crm", crmResult.value ? "CRM push succeeded" : "CRM push returned null", { leadId });
  }
  if (teamEmailResult.status === "rejected") {
    logError("ProcessLead", "teamEmail", "Sales team email failed", teamEmailResult.reason, { leadId });
  } else {
    log("ProcessLead", "teamEmail", "Sales team email sent", { leadId });
  }
  if (whatsappResult.status === "rejected") {
    logError("ProcessLead", "teamWhatsApp", "WhatsApp team notification failed", whatsappResult.reason, { leadId });
  } else {
    log("ProcessLead", "teamWhatsApp", "WhatsApp team notification sent", { leadId });
  }
  if (clientEmailResult.status === "rejected") {
    logError("ProcessLead", "clientEmail", "Client email failed", clientEmailResult.reason, { leadId });
  } else {
    log("ProcessLead", "clientEmail", lead.email?.includes("@placeholder.local") ? "Skipped (placeholder email)" : "Client email sent", { leadId });
  }
  if (clientWhatsappResult.status === "rejected") {
    logError("ProcessLead", "clientWhatsApp", "Client WhatsApp failed", clientWhatsappResult.reason, { leadId });
  } else {
    log("ProcessLead", "clientWhatsApp", lead.phone ? "Client WhatsApp sent" : "Skipped (no phone)", { leadId });
  }

  const durationMs = Math.round(performance.now() - start);
  log("ProcessLead", "complete", `Lead processing finished in ${durationMs}ms`, {
    leadId,
    crm: status(crmResult),
    teamEmail: status(teamEmailResult),
    teamWhatsApp: status(whatsappResult),
    clientEmail: status(clientEmailResult),
    clientWhatsApp: status(clientWhatsappResult),
    durationMs,
  });

  return {
    crm: crmResult.status === "fulfilled" ? crmResult.value : null,
    teamEmail: teamEmailResult.status === "fulfilled",
    teamWhatsapp: whatsappResult.status === "fulfilled",
    clientEmail: clientEmailResult.status === "fulfilled",
    clientWhatsapp: clientWhatsappResult.status === "fulfilled",
  };
}
