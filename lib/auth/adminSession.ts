import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_SESSION_COOKIE = "crossthenics_admin_session";
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 8;

function getSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  return secret && secret.length >= 32 ? secret : null;
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return (
    leftBuffer.length === rightBuffer.length &&
    timingSafeEqual(leftBuffer, rightBuffer)
  );
}

function sign(payload: string, secret: string) {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

export function verifyAdminCredentials(email: string, password: string) {
  const configuredEmail = process.env.ADMIN_EMAIL;
  const configuredPassword = process.env.ADMIN_PASSWORD;

  if (!configuredEmail || !configuredPassword) return false;

  return (
    safeEqual(email.trim().toLowerCase(), configuredEmail.trim().toLowerCase()) &&
    safeEqual(password, configuredPassword)
  );
}

export function createAdminSession(email: string) {
  const secret = getSessionSecret();
  if (!secret) return null;

  const payload = Buffer.from(
    `${email.trim().toLowerCase()}.${Date.now() + ADMIN_SESSION_MAX_AGE * 1000}`,
  ).toString("base64url");

  return `${payload}.${sign(payload, secret)}`;
}

export function verifyAdminSession(token: string | undefined) {
  const secret = getSessionSecret();
  if (!secret || !token) return false;

  const [payload, signature, extra] = token.split(".");
  if (!payload || !signature || extra !== undefined) return false;
  if (!safeEqual(signature, sign(payload, secret))) return false;

  try {
    const decoded = Buffer.from(payload, "base64url").toString("utf8");
    const separator = decoded.lastIndexOf(".");
    if (separator <= 0) return false;

    const email = decoded.slice(0, separator);
    const expiresAt = Number(decoded.slice(separator + 1));
    const configuredEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();

    return (
      typeof configuredEmail === "string" &&
      safeEqual(email, configuredEmail) &&
      Number.isFinite(expiresAt) &&
      expiresAt > Date.now()
    );
  } catch {
    return false;
  }
}
