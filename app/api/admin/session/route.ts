import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE,
  createAdminSession,
  verifyAdminCredentials,
} from "@/lib/auth/adminSession";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const configured = Boolean(
    process.env.ADMIN_EMAIL &&
      process.env.ADMIN_PASSWORD &&
      process.env.ADMIN_SESSION_SECRET &&
      process.env.ADMIN_SESSION_SECRET.length >= 32,
  );

  if (!configured) {
    return NextResponse.json(
      { error: "Admin sign-in is not configured on this deployment." },
      { status: 503 },
    );
  }

  let credentials: unknown;
  try {
    credentials = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (
    !credentials ||
    typeof credentials !== "object" ||
    !("email" in credentials) ||
    !("password" in credentials) ||
    typeof credentials.email !== "string" ||
    typeof credentials.password !== "string" ||
    credentials.email.length > 254 ||
    credentials.password.length > 1024
  ) {
    return NextResponse.json({ error: "Enter a valid email and password." }, { status: 400 });
  }

  if (!verifyAdminCredentials(credentials.email, credentials.password)) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  const session = createAdminSession(credentials.email);
  if (!session) {
    return NextResponse.json(
      { error: "Admin sign-in is not configured on this deployment." },
      { status: 503 },
    );
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: ADMIN_SESSION_MAX_AGE,
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
  return response;
}
