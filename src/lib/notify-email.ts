import { log, logError } from "@/lib/logger";

interface LeadData {
  name: string;
  email: string;
  phone: string;
  business: string;
  service: string;
  message?: string;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function sendClientConfirmationEmail(lead: LeadData) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

  if (!apiKey) {
    logError("Email", "config", "RESEND_API_KEY not configured");
    return null;
  }

  const firstName = escapeHtml(lead.name.split(" ")[0]);
  log("Email", "sendClient", "Sending client confirmation", { to: lead.email });

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: `KV Signage <${fromEmail}>`,
        to: [lead.email],
        subject: `Thanks ${lead.name.split(" ")[0]}! Your free design is on the way`,
        html: `
          <div style="font-family: -apple-system, sans-serif; max-width: 520px; margin: 0 auto; padding: 40px 24px;">
            <div style="text-align: center; margin-bottom: 32px;">
              <h1 style="color: #D4AF37; font-size: 24px; margin: 0;">KV Signage</h1>
            </div>
            <h2 style="color: #1a1a1a; font-size: 20px; margin-bottom: 16px;">We've received your request!</h2>
            <p style="color: #444; line-height: 1.6;">Hi ${firstName},</p>
            <p style="color: #444; line-height: 1.6;">
              Thank you for choosing KV Signage. Our design team is already working on your
              <strong>${escapeHtml(lead.service)}</strong> mockup for <strong>${escapeHtml(lead.business)}</strong>.
            </p>
            <div style="background: #f8f8f8; border-radius: 8px; padding: 20px; margin: 24px 0;">
              <p style="color: #333; font-weight: 600; margin: 0 0 12px;">What happens next:</p>
              <p style="color: #555; margin: 8px 0;">✅ Our designer will call you within 2 hours</p>
              <p style="color: #555; margin: 8px 0;">✅ You'll receive a free mockup preview</p>
              <p style="color: #555; margin: 8px 0;">✅ No obligation — it's completely free</p>
            </div>
            <p style="color: #444; line-height: 1.6;">
              Need it faster? Call us directly:
              <a href="tel:+918925756408" style="color: #D4AF37; text-decoration: none; font-weight: 600;">+91 89257 56408</a>
            </p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0 16px;" />
            <p style="color: #999; font-size: 12px; text-align: center;">
              KV Signage — Chennai's #1 Signage Partner<br />
              Making businesses shine since 2018
            </p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      logError("Email", "sendClient", "Client confirmation email failed", await res.json(), { to: lead.email, status: res.status });
      return null;
    }

    const result = await res.json();
    log("Email", "sendClient", "Client confirmation email sent", { emailId: result.id, to: lead.email });
    return result;
  } catch (error) {
    logError("Email", "sendClient", "Client email error", error, { to: lead.email });
    return null;
  }
}

export async function sendSalesTeamNotification(lead: LeadData) {
  const apiKey = process.env.RESEND_API_KEY;
  const salesEmail = process.env.SALES_TEAM_EMAIL;
  const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

  if (!apiKey || !salesEmail) {
    logError("Email", "config", "RESEND_API_KEY or SALES_TEAM_EMAIL not configured");
    return null;
  }

  const recipients = salesEmail.split(",").map((e: string) => e.trim());
  log("Email", "sendTeam", "Sending sales team notification", { to: recipients, lead: lead.name });

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: `KV Signage Leads <${fromEmail}>`,
        to: recipients,
        subject: `\uD83D\uDD14 New Lead: ${lead.name} — ${lead.service}`,
        html: `
          <div style="font-family: -apple-system, sans-serif; max-width: 520px; padding: 24px;">
            <h2 style="color: #D4AF37; margin: 0 0 20px;">New Lead Received!</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 10px 0; color: #888; width: 100px;">Name</td>
                <td style="padding: 10px 0; font-weight: 600;">${escapeHtml(lead.name)}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 10px 0; color: #888;">Email</td>
                <td style="padding: 10px 0;"><a href="mailto:${escapeHtml(lead.email)}" style="color: #D4AF37;">${escapeHtml(lead.email)}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 10px 0; color: #888;">Phone</td>
                <td style="padding: 10px 0;"><a href="tel:${escapeHtml(lead.phone)}" style="color: #D4AF37; font-weight: 600;">${escapeHtml(lead.phone)}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 10px 0; color: #888;">Business</td>
                <td style="padding: 10px 0; font-weight: 600;">${escapeHtml(lead.business)}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 10px 0; color: #888;">Service</td>
                <td style="padding: 10px 0; font-weight: 600;">${escapeHtml(lead.service)}</td>
              </tr>
              ${lead.message ? `<tr><td style="padding: 10px 0; color: #888;">Message</td><td style="padding: 10px 0;">${escapeHtml(lead.message)}</td></tr>` : ""}
            </table>
            <div style="margin-top: 24px; padding: 16px; background: #fff8e1; border-radius: 8px; border-left: 4px solid #D4AF37;">
              <p style="margin: 0; color: #333; font-weight: 600;">\u26A1 Respond within 5 minutes for best conversion!</p>
            </div>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      logError("Email", "sendTeam", "Sales team email failed", await res.json(), { status: res.status });
      return null;
    }

    const result = await res.json();
    log("Email", "sendTeam", "Sales team email sent", { emailId: result.id });
    return result;
  } catch (error) {
    logError("Email", "sendTeam", "Sales team email error", error);
    return null;
  }
}
