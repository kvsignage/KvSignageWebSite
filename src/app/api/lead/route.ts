import { NextResponse } from "next/server";
import { createHubSpotContact } from "@/lib/hubspot";
import { sendClientConfirmationEmail, sendSalesTeamNotification } from "@/lib/notify-email";
import { sendLeadWhatsAppNotification } from "@/lib/notify-whatsapp";
import { sendMetaConversionEvent } from "@/lib/meta-capi";

// Simple in-memory rate limiter: max 5 submissions per IP per 10 minutes
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const WINDOW_MS = 10 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    // Clean up expired entries periodically
    if (rateLimitMap.size > 1000) {
      for (const [key, val] of rateLimitMap) {
        if (now > val.resetAt) rateLimitMap.delete(key);
      }
    }
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

// Email format validation
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Allowed origins for CSRF protection
const ALLOWED_ORIGINS = [
  process.env.NEXT_PUBLIC_SITE_URL,
  "http://localhost:3000",
].filter(Boolean);

export async function POST(request: Request) {
  // Origin validation (CSRF protection)
  const origin = request.headers.get("origin");
  if (origin && ALLOWED_ORIGINS.length > 0 && !ALLOWED_ORIGINS.includes(origin)) {
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403 }
    );
  }

  // Rate limiting
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  try {

    const { name, email, phone, business, service, message, utm_source, utm_medium, utm_campaign, utm_content, utm_term } = body;

    // Basic server-side validation
    if (!name || !email || !phone || !business || !service) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Email format validation
    if (!isValidEmail(String(email))) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitized = {
      name: String(name).slice(0, 100),
      email: String(email).slice(0, 200),
      phone: String(phone).slice(0, 20),
      business: String(business).slice(0, 100),
      service: String(service).slice(0, 100),
      message: message ? String(message).slice(0, 500) : undefined,
      utm_source: utm_source ? String(utm_source).slice(0, 100) : undefined,
      utm_medium: utm_medium ? String(utm_medium).slice(0, 100) : undefined,
      utm_campaign: utm_campaign ? String(utm_campaign).slice(0, 200) : undefined,
      utm_content: utm_content ? String(utm_content).slice(0, 200) : undefined,
      utm_term: utm_term ? String(utm_term).slice(0, 200) : undefined,
    };

    // Split name for Meta CAPI
    const [firstName, ...lastParts] = sanitized.name.split(" ");
    const lastName = lastParts.join(" ") || undefined;

    // Push to HubSpot + send notifications + Meta CAPI (all in parallel)
    const [crmResult, clientEmailResult, teamEmailResult, whatsappResult, metaResult] = await Promise.allSettled([
      createHubSpotContact(sanitized),
      sendClientConfirmationEmail(sanitized),
      sendSalesTeamNotification(sanitized),
      sendLeadWhatsAppNotification(sanitized),
      sendMetaConversionEvent({
        eventName: "Lead",
        email: sanitized.email,
        phone: sanitized.phone,
        firstName,
        lastName,
        customData: {
          content_name: sanitized.service,
          content_category: "signage",
          lead_source: sanitized.utm_source || "organic",
          campaign: sanitized.utm_campaign,
        },
      }),
    ]);

    if (crmResult.status === "rejected" || (crmResult.status === "fulfilled" && !crmResult.value)) {
      console.error("CRM push failed");
    }
    if (clientEmailResult.status === "rejected") {
      console.error("Client email failed");
    }
    if (teamEmailResult.status === "rejected") {
      console.error("Sales team email failed");
    }
    if (whatsappResult.status === "rejected") {
      console.error("WhatsApp notification failed");
    }
    if (metaResult.status === "rejected") {
      console.error("Meta CAPI failed");
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
