import { log, logError, logWarn } from "@/lib/logger";

interface MetaEventData {
  event_name: string;
  user_data: {
    em?: string; // hashed email
    ph?: string; // hashed phone
    fn?: string; // hashed first name
    ln?: string; // hashed last name
    ct?: string; // hashed city
    st?: string; // hashed state
    country?: string; // hashed country
  };
  custom_data?: Record<string, unknown>;
  event_source_url?: string;
  action_source: "website";
}

async function hashSHA256(value: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(value.trim().toLowerCase());
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function sendMetaConversionEvent({
  eventName,
  email,
  phone,
  firstName,
  lastName,
  customData,
}: {
  eventName: string;
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  customData?: Record<string, unknown>;
}) {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const accessToken = process.env.META_CONVERSIONS_API_TOKEN;

  if (!pixelId || !accessToken) {
    logWarn("MetaCAPI", "config", "Meta Conversions API not configured (missing PIXEL_ID or API_TOKEN)");
    return null;
  }

  const start = performance.now();
  log("MetaCAPI", "send", "Preparing conversion event", { event: eventName });

  const userData: MetaEventData["user_data"] = {};

  if (email) userData.em = await hashSHA256(email);
  if (phone) {
    // Normalize Indian phone: remove spaces, add country code if missing
    const normalized = phone.replace(/[\s-]/g, "").replace(/^\+?91/, "91");
    userData.ph = await hashSHA256(normalized.startsWith("91") ? normalized : `91${normalized}`);
  }
  if (firstName) userData.fn = await hashSHA256(firstName);
  if (lastName) userData.ln = await hashSHA256(lastName);
  userData.ct = await hashSHA256("chennai");
  userData.st = await hashSHA256("tamil nadu");
  userData.country = await hashSHA256("in");

  const eventData: MetaEventData = {
    event_name: eventName,
    user_data: userData,
    custom_data: customData,
    action_source: "website",
  };

  try {
    const res = await fetch(
      `https://graph.facebook.com/v21.0/${pixelId}/events`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          data: [
            {
              ...eventData,
              event_time: Math.floor(Date.now() / 1000),
            },
          ],
        }),
      }
    );

    if (!res.ok) {
      const error = await res.json();
      logError("MetaCAPI", "send", "Event send failed", error, { event: eventName, status: res.status });
      return null;
    }

    const result = await res.json();
    const durationMs = Math.round(performance.now() - start);
    log("MetaCAPI", "send", "Event sent successfully", { event: eventName, durationMs });
    return result;
  } catch (error) {
    logError("MetaCAPI", "send", "Request failed", error, { event: eventName });
    return null;
  }
}
