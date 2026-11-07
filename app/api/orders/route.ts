import { NextResponse } from "next/server";
import { createOrder } from "@/lib/db/store";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.customerName || !body.customerPhone || !body.shippingAddress || !Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json({ error: "Missing required order information." }, { status: 400 });
    }

    const order = await createOrder({
      customerName: body.customerName.trim(),
      customerEmail: body.customerEmail?.trim() || "",
      customerPhone: body.customerPhone.trim(),
      shippingAddress: {
        fullName: body.customerName.trim(),
        phone: body.customerPhone.trim(),
        street: body.shippingAddress.street || "",
        city: body.shippingAddress.city || "Pokhara",
        province: body.shippingAddress.province || "Gandaki",
        postalCode: body.shippingAddress.postalCode || "",
      },
      items: body.items,
      subtotal: Number(body.subtotal || 0),
      shippingCost: Number(body.shippingCost || 0),
      grandTotal: Number(body.grandTotal || 0),
      paymentMethod: body.paymentMethod || "COD",
      paymentStatus: body.paymentMethod === "COD" ? "pending" : "paid",
      fulfillmentStatus: "pending",
      notes: body.notes || "",
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to place order." },
      { status: 500 }
    );
  }
}
