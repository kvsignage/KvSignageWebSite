import { NextResponse } from "next/server";
import { log, logError, logWarn } from "@/lib/logger";
import { processLead } from "@/lib/process-lead";

// Simple in-memory rate limiter: max 5 submissions per IP per 10 minutes
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const WINDOW_MS = 10 * 60 * 1000;
let requestCount = 0;

// Deduplication: prevent same lead within 5 minutes
const recentLeads = new Map<string, number>();
const DEDUP_WINDOW_MS = 5 * 60 * 1000;

function cleanupMaps() {
  const now = Date.now();
  for (const [key, val] of rateLimitMap) {
    if (now > val.resetAt) rateLimitMap.delete(key);
  }
  for (const [key, ts] of recentLeads) {
    if (now - ts > DEDUP_WINDOW_MS) recentLeads.delete(key);
  }
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  // Cleanup every 50 requests to prevent memory growth
  if (++requestCount % 50 === 0) cleanupMaps();

  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

function isDuplicate(email: string, phone: string): boolean {
  const key = `${email.toLowerCase()}:${phone.replace(/\D/g, "")}`;
  if (recentLeads.has(key)) return true;
  recentLeads.set(key, Date.now());
  return false;
}

// Email format validation
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) && email.length < 254;
}

// Indian phone validation: 10 digits or +91 prefix
function isValidPhone(phone: string): boolean {
  const normalized = phone.replace(/[\s\-()]/g, "");
  return /^(\+91|0)?[6-9]\d{9}$/.test(normalized);
}

// Allowed origins for CSRF protection
const ALLOWED_ORIGINS = [
  process.env.NEXT_PUBLIC_SITE_URL,
  "http://localhost:3000",
].filter(Boolean);

export async function POST(request: Request) {
  const start = performance.now();

  // Origin validation (CSRF protection)
  // Require at least one of origin or referer to be present and match allowed origins
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");
  const refererOrigin = referer ? new URL(referer).origin : null;
  const requestOrigin = origin || refererOrigin;

  if (!requestOrigin) {
    logWarn("LeadAPI", "csrf", "Blocked request — no origin or referer header");
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  if (ALLOWED_ORIGINS.length > 0 && !ALLOWED_ORIGINS.includes(requestOrigin)) {
    logWarn("LeadAPI", "csrf", "Blocked request from unknown origin", { origin: requestOrigin });
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Rate limiting
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    logWarn("LeadAPI", "rateLimit", "Rate limit exceeded", { ip });
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    logWarn("LeadAPI", "parse", "Invalid request body", { ip });
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  try {

    const { name, email, phone, business, service, message, utm_source, utm_medium, utm_campaign, utm_content, utm_term } = body;

    // Basic server-side validation
    if (!name || !email || !phone || !business || !service) {
      logWarn("LeadAPI", "validation", "Missing required fields", { ip, fields: { name: !!name, email: !!email, phone: !!phone, business: !!business, service: !!service } });
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Email format validation
    if (!isValidEmail(String(email))) {
      logWarn("LeadAPI", "validation", "Invalid email format", { ip, email: String(email).slice(0, 50) });
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Phone format validation
    if (!isValidPhone(String(phone))) {
      logWarn("LeadAPI", "validation", "Invalid phone format", { ip });
      return NextResponse.json(
        { error: "Invalid phone number" },
        { status: 400 }
      );
    }

    // Deduplication check
    if (isDuplicate(String(email), String(phone))) {
      log("LeadAPI", "dedup", "Duplicate submission blocked", { ip });
      return NextResponse.json({ success: true }); // Silent success to not confuse user
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

    log("LeadAPI", "validated", "Input validation passed", { ip, name: sanitized.name, phone: sanitized.phone, service: sanitized.service });

    // Split name for Meta CAPI
    const [firstName, ...lastParts] = sanitized.name.split(" ");
    const lastName = lastParts.join(" ") || undefined;

    log("LeadAPI", "processing", "Starting parallel processing");

    // Delegate to shared lead processing pipeline
    await processLead(sanitized, {
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
    });

    const durationMs = Math.round(performance.now() - start);
    log("LeadAPI", "response", "Lead processed successfully", { durationMs });

    return NextResponse.json({ success: true });
  } catch (error) {
    logError("LeadAPI", "unhandled", "Internal server error", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
