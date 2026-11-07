import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, verifyAdminSession } from "@/lib/auth/adminSession";
import { getProducts, createProduct } from "@/lib/db/store";

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!verifyAdminSession(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || undefined;
  const search = searchParams.get("search") || undefined;
  const inStockParam = searchParams.get("inStock");
  const inStock = inStockParam === null ? undefined : inStockParam === "true";
  const isPublishedParam = searchParams.get("isPublished");
  const isPublished = isPublishedParam === null ? undefined : isPublishedParam === "true";

  const products = await getProducts({ category, search, inStock, isPublished });
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!verifyAdminSession(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    if (!body.name || typeof body.name !== "string" || !body.price || isNaN(Number(body.price))) {
      return NextResponse.json({ error: "Product name and price are required." }, { status: 400 });
    }

    const price = Number(body.price);
    const stock = Number(body.stock || 0);

    const product = await createProduct({
      name: body.name.trim(),
      slug: body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      price,
      salePrice: body.salePrice ? Number(body.salePrice) : undefined,
      costPrice: body.costPrice ? Number(body.costPrice) : Math.round(price * 0.55),
      category: body.category || "Lifting Belts",
      badge: body.badge || undefined,
      description: body.description || "",
      fullDescription: body.fullDescription || body.description || "",
      sizes: Array.isArray(body.sizes) ? body.sizes : ["Standard"],
      images: body.image ? [body.image] : ["/p-image/liftingbelts.webp"],
      image: body.image || "/p-image/liftingbelts.webp",
      inStock: stock > 0,
      stock,
      lowStockThreshold: Number(body.lowStockThreshold || 5),
      sku: body.sku || `CT-${Math.floor(1000 + Math.random() * 9000)}`,
      published: body.isPublished !== undefined ? Boolean(body.isPublished) : true,
      isPublished: body.isPublished !== undefined ? Boolean(body.isPublished) : true,
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create product" },
      { status: 500 }
    );
  }
}

