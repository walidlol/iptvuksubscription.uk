// ─── JWT Auth Helpers (using jose) ───
// Simple session management: sign a JWT with the phone number,
// verify it on gated routes via middleware.

import { SignJWT, jwtVerify, type JWTPayload } from "jose";

const COOKIE_NAME = "iptv_session";
const SESSION_DURATION_DAYS = 7;

interface SessionPayload extends JWTPayload {
  phone: string;
}

function getSecret(): Uint8Array {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("AUTH_SECRET is not configured");
  }
  return new TextEncoder().encode(secret);
}

/** Create a signed JWT for the given phone number */
export async function createSession(phone: string): Promise<string> {
  const token = await new SignJWT({ phone } satisfies SessionPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_DAYS}d`)
    .sign(getSecret());

  return token;
}

/** Verify a session token and return the payload, or null if invalid */
export async function verifySession(
  token: string
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (typeof payload.phone !== "string") {
      return null;
    }
    return payload as SessionPayload;
  } catch {
    return null;
  }
}

/** Cookie name used by middleware and API routes */
export { COOKIE_NAME };

/** Cookie options for Set-Cookie header */
export function sessionCookieOptions() {
  return {
    name: COOKIE_NAME,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/",
    maxAge: SESSION_DURATION_DAYS * 24 * 60 * 60,
  };
}
