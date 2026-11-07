import { NextResponse } from "next/server";
import { getProducts } from "@/lib/db/store";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || undefined;
  const search = searchParams.get("search") || undefined;

  // Only return published products for the public storefront
  const products = await getProducts({
    category,
    search,
    status: "published",
  });

  return NextResponse.json(products);
}

