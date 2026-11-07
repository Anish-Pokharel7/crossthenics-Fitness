import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, verifyAdminSession } from "@/lib/auth/adminSession";
import { getPromotions, createPromotion } from "@/lib/db/store";

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!verifyAdminSession(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const promotions = await getPromotions();
  return NextResponse.json(promotions);
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!verifyAdminSession(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body.code || !body.discountValue) {
      return NextResponse.json({ error: "Coupon code and discount value are required" }, { status: 400 });
    }

    const promotion = await createPromotion({
      code: body.code.toUpperCase().trim(),
      description: body.description || "",
      type: body.discountType === "fixed" ? "fixed" : "percentage",
      value: Number(body.discountValue || body.value || 10),
      minOrderAmount: Number(body.minOrderValue || body.minOrderAmount || 0) || undefined,
      usageLimit: Number(body.usageLimit || 100),
      expiresAt: body.expiryDate || body.expiresAt || "2026-12-31T23:59:59Z",
      active: body.isActive !== undefined ? Boolean(body.isActive) : true,
    });

    return NextResponse.json(promotion, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create promotion" },
      { status: 500 }
    );
  }
}

