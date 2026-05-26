interface LeadData {
  name: string;
  email: string;
  phone: string;
  business: string;
  service: string;
  message?: string;
}

export async function sendLeadWhatsAppNotification(lead: LeadData) {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const notifyPhone = process.env.WHATSAPP_NOTIFY_PHONE; // Your number in format: 919876543210

  if (!token || !phoneNumberId || !notifyPhone) {
    console.error("WhatsApp API credentials not configured");
    return null;
  }

  const messageText = [
    `🔔 *New Lead!*`,
    ``,
    `*Name:* ${lead.name}`,
    `*Phone:* ${lead.phone}`,
    `*Business:* ${lead.business}`,
    `*Service:* ${lead.service}`,
    lead.message ? `*Message:* ${lead.message}` : "",
    ``,
    `⚡ Reply within 5 min for best conversion!`,
  ]
    .filter(Boolean)
    .join("\n");

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
          to: notifyPhone,
          type: "text",
          text: { body: messageText },
        }),
      }
    );

    if (!res.ok) {
      console.error("WhatsApp notification failed:", await res.json());
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("WhatsApp notification error:", error);
    return null;
  }
}
