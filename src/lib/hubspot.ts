import { log, logError } from "@/lib/logger";

interface LeadData {
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

export async function createHubSpotContact(lead: LeadData) {
  const start = performance.now();
  const apiKey = process.env.HUBSPOT_API_KEY;

  if (!apiKey) {
    logError("HubSpot", "config", "HUBSPOT_API_KEY not configured");
    return null;
  }

  const [firstName, ...lastParts] = lead.name.split(" ");
  const lastName = lastParts.join(" ") || "-";

  log("HubSpot", "createContact", "Creating contact", { email: lead.email });

  try {
    // Create contact
    const contactRes = await fetch(
      "https://api.hubapi.com/crm/v3/objects/contacts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          properties: {
            email: lead.email,
            firstname: firstName,
            lastname: lastName,
            phone: lead.phone,
            company: lead.business,
            lifecyclestage: "lead",
            hs_lead_status: "NEW",
            message: [lead.service, lead.message].filter(Boolean).join(" — "),
            ...(lead.utm_source && { utm_source: lead.utm_source }),
            ...(lead.utm_medium && { utm_medium: lead.utm_medium }),
            ...(lead.utm_campaign && { utm_campaign: lead.utm_campaign }),
            ...(lead.utm_content && { utm_content: lead.utm_content }),
            ...(lead.utm_term && { utm_term: lead.utm_term }),
          },
        }),
      }
    );

    if (!contactRes.ok) {
      const errorData = await contactRes.json();
      // If contact already exists, that's fine
      if (errorData.category === "CONFLICT") {
        log("HubSpot", "createContact", "Contact already exists", { email: lead.email });
        return { existing: true };
      }
      logError("HubSpot", "createContact", "Contact creation failed", errorData, { email: lead.email, status: contactRes.status });
      return null;
    }

    const contact = await contactRes.json();
    log("HubSpot", "createContact", "Contact created", { contactId: contact.id, email: lead.email });

    // Create deal associated with contact
    log("HubSpot", "createDeal", "Creating deal", { contactId: contact.id, dealName: `${lead.business} - ${lead.service}` });
    const dealRes = await fetch("https://api.hubapi.com/crm/v3/objects/deals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        properties: {
          dealname: `${lead.business} - ${lead.service}`,
          pipeline: "default",
          dealstage: "appointmentscheduled",
          description: [
            `Service: ${lead.service}`,
            `Business: ${lead.business}`,
            `Phone: ${lead.phone}`,
            `Email: ${lead.email}`,
            lead.message ? `Message: ${lead.message}` : null,
            lead.utm_source ? `Source: ${lead.utm_source}` : null,
            lead.utm_medium ? `Medium: ${lead.utm_medium}` : null,
            lead.utm_campaign ? `Campaign: ${lead.utm_campaign}` : null,
            lead.utm_content ? `Content: ${lead.utm_content}` : null,
            lead.utm_term ? `Term: ${lead.utm_term}` : null,
          ].filter(Boolean).join("\n"),
        },
        associations: [
          {
            to: { id: contact.id },
            types: [
              {
                associationCategory: "HUBSPOT_DEFINED",
                associationTypeId: 3,
              },
            ],
          },
        ],
      }),
    });

    if (!dealRes.ok) {
      logError("HubSpot", "createDeal", "Deal creation failed", await dealRes.json(), { contactId: contact.id, status: dealRes.status });
    } else {
      const deal = await dealRes.json();
      log("HubSpot", "createDeal", "Deal created", { dealId: deal.id, contactId: contact.id });
    }

    const durationMs = Math.round(performance.now() - start);
    log("HubSpot", "complete", `HubSpot operations finished in ${durationMs}ms`, { durationMs, contactId: contact.id });

    return contact;
  } catch (error) {
    logError("HubSpot", "api", "HubSpot API error", error);
    return null;
  }
}
