import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, verifyAdminSession } from "@/lib/auth/adminSession";
import { getProducts, getInventoryLogs, adjustProductStock } from "@/lib/db/store";

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!verifyAdminSession(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const products = await getProducts();
  const logs = await getInventoryLogs();

  const totalValue = products.reduce((acc: number, p) => acc + p.stock * p.price, 0);
  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= (p.lowStockThreshold || 10));
  const outOfStock = products.filter((p) => p.stock === 0);

  return NextResponse.json({
    products,
    logs: logs.slice(0, 30),
    summary: {
      totalProducts: products.length,
      totalUnits: products.reduce((acc: number, p) => acc + p.stock, 0),
      totalValue,
      lowStockCount: lowStock.length,
      outOfStockCount: outOfStock.length,
    },
  });
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!verifyAdminSession(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { productId, change, reason, adminUser } = await request.json();

    if (!productId || change === undefined || isNaN(Number(change))) {
      return NextResponse.json({ error: "Product ID and change amount are required" }, { status: 400 });
    }

    const updated = await adjustProductStock(
      productId,
      Number(change),
      reason || "adjustment",
      adminUser || "Admin"
    );

    if (!updated) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to adjust stock" },
      { status: 500 }
    );
  }
}
