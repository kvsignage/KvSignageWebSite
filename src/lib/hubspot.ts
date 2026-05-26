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
  const apiKey = process.env.HUBSPOT_API_KEY;

  if (!apiKey) {
    console.error("HUBSPOT_API_KEY not configured");
    return null;
  }

  const [firstName, ...lastParts] = lead.name.split(" ");
  const lastName = lastParts.join(" ") || "-";

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
        console.log("Contact already exists in HubSpot");
        return { existing: true };
      }
      console.error("HubSpot contact creation failed:", errorData);
      return null;
    }

    const contact = await contactRes.json();

    // Create deal associated with contact
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
          dealstage: "3723161296",
          description: `Service: ${lead.service}\nMessage: ${lead.message || "N/A"}`,
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
      console.error("HubSpot deal creation failed:", await dealRes.json());
    }

    return contact;
  } catch (error) {
    console.error("HubSpot API error:", error);
    return null;
  }
}
