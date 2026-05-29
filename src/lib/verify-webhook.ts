import { logWarn } from "@/lib/logger";

/**
 * Verify Meta webhook signature (X-Hub-Signature-256 header).
 * Used by both Facebook Lead Ads and WhatsApp webhook routes.
 */
export async function verifyWebhookSignature(
  request: Request,
  body: string
): Promise<boolean> {
  const secret = process.env.FB_APP_SECRET;
  if (!secret) {
    logWarn("Webhook", "signature", "FB_APP_SECRET not set — skipping signature verification");
    return true; // Allow if secret not configured (dev mode)
  }
  const signature = request.headers.get("x-hub-signature-256");
  if (!signature) return false;

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(body));
  const expected = `sha256=${Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, "0")).join("")}`;

  // Use timing-safe comparison to prevent timing attacks
  if (signature.length !== expected.length) return false;
  const a = encoder.encode(signature);
  const b = encoder.encode(expected);
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a[i] ^ b[i];
  }
  return mismatch === 0;
}
