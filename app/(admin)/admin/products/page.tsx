import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Eye } from "lucide-react";
import { unifiedCatalog } from "@/lib/catalog";
import { formatCurrency } from "@/lib/currency";

export default function AdminCatalogPage() {
  return (
    <div className="space-y-5">
      <header className="flex flex-col gap-3 border-b border-border pb-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary">
            Read-only catalog
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
            Store catalog
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            A reference to the static product catalog currently used by the
            storefront. Product changes cannot be saved from this workspace.
          </p>
        </div>
        <span className="inline-flex min-h-10 items-center gap-2 self-start rounded-md border border-border px-3 text-xs font-medium text-muted-foreground sm:self-auto">
          <Eye size={14} aria-hidden="true" />
          {unifiedCatalog.length} catalog entries
        </span>
      </header>

      <section
        aria-label="Storefront catalog products"
        className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3"
      >
        {unifiedCatalog.map((product) => (
          <article
            key={product.id}
            className="overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-sm"
          >
            <Link
              href={`/products/${product.id}`}
              className="group flex min-h-28 items-center gap-4 p-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-primary"
              aria-label={`View ${product.name} in the storefront`}
            >
              <Image
                src={product.image}
                alt=""
                width={88}
                height={88}
                sizes="88px"
                className="h-[88px] w-[88px] shrink-0 rounded-md bg-muted object-contain"
              />
              <span className="min-w-0 flex-1">
                <span className="block text-xs font-medium text-muted-foreground">
                  {product.category}
                </span>
                <span className="mt-1 block line-clamp-2 text-sm font-semibold group-hover:underline">
                  {product.name}
                </span>
                <span className="mt-2 block text-sm font-bold">
                  {formatCurrency(product.price)}
                </span>
              </span>
              <ArrowUpRight
                size={16}
                className="shrink-0 text-muted-foreground"
                aria-hidden="true"
              />
            </Link>
            <div className="flex items-center justify-between border-t border-border px-4 py-2.5 text-xs">
              <span className="text-muted-foreground">
                Storefront availability
              </span>
              <span className="font-semibold">
                {product.inStock ? "Marked available" : "Marked unavailable"}
              </span>
            </div>
          </article>
        ))}
      </section>

      <p className="rounded-lg border border-border bg-muted/40 px-4 py-3 text-xs leading-relaxed text-muted-foreground">
        These entries reflect the storefront&apos;s current static catalog, not
        a database or inventory system. Price and availability edits, stock
        counts, and product publishing require a connected store backend.
      </p>
    </div>
  );
}
