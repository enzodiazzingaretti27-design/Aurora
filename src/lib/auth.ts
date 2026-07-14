/** Sesión firmada con HMAC-SHA256 usando Web Crypto (compatible con el runtime
 *  Edge del middleware y con los route handlers de Node). El token tiene forma
 *  `payloadBase64Url.firmaBase64Url` y no se puede falsificar sin AUTH_SECRET. */

export const SESSION_COOKIE = "cecilia_session";
export const SESSION_TTL = 60 * 60 * 12; // 12 horas en segundos

const encoder = new TextEncoder();
const decoder = new TextDecoder();

interface SessionPayload {
  u: string; // usuario
  exp: number; // expiración (epoch en segundos)
}

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlToBytes(value: string): Uint8Array<ArrayBuffer> {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(padded + "=".repeat((4 - (padded.length % 4)) % 4));
  const bytes = new Uint8Array(new ArrayBuffer(binary.length));
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function stringToBase64Url(value: string): string {
  return bytesToBase64Url(encoder.encode(value));
}

async function getKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export async function createSessionToken(
  user: string,
  secret: string,
  ttlSeconds: number = SESSION_TTL
): Promise<string> {
  const payload: SessionPayload = {
    u: user,
    exp: Math.floor(Date.now() / 1000) + ttlSeconds,
  };
  const payloadB64 = stringToBase64Url(JSON.stringify(payload));
  const key = await getKey(secret);
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(payloadB64)
  );
  return `${payloadB64}.${bytesToBase64Url(new Uint8Array(signature))}`;
}

export async function verifySessionToken(
  token: string,
  secret: string
): Promise<SessionPayload | null> {
  const [payloadB64, signatureB64] = token.split(".");
  if (!payloadB64 || !signatureB64) return null;

  const key = await getKey(secret);
  let valid = false;
  try {
    valid = await crypto.subtle.verify(
      "HMAC",
      key,
      base64UrlToBytes(signatureB64),
      encoder.encode(payloadB64)
    );
  } catch {
    return null;
  }
  if (!valid) return null;

  try {
    const payload = JSON.parse(
      decoder.decode(base64UrlToBytes(payloadB64))
    ) as SessionPayload;
    if (typeof payload.exp !== "number" || payload.exp < Date.now() / 1000) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}
