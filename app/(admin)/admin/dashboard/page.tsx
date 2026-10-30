import Image from "next/image";
import Link from "next/link";
import { unifiedCatalog } from "@/lib/catalog";
import { formatCurrency } from "@/lib/currency";
import {
  ArrowUpRight,
  CircleAlert,
  Clock3,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";

const availableProducts = unifiedCatalog.filter((product) => product.inStock);
const unavailableProducts = unifiedCatalog.filter((product) => !product.inStock);

const metrics = [
  {
    label: "Total revenue",
    value: "Unavailable",
    detail: "No persisted order or payment records",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    label: "Total orders",
    value: "Unavailable",
    detail: "Checkout is not connected to an order service",
    href: "/admin/orders",
    icon: Package,
  },
  {
    label: "Pending orders",
    value: "Unavailable",
    detail: "Order status data is not available",
    href: "/admin/orders",
    icon: Clock3,
  },
  {
    label: "Total customers",
    value: "Unavailable",
    detail: "No customer database is configured",
    href: "/admin/users",
    icon: Users,
  },
];

function UnavailablePanel({ message }: { message: string }) {
  return (
    <div className="flex min-h-32 flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/50 px-5 py-6 text-center">
      <CircleAlert className="mb-2 h-5 w-5 text-muted-foreground" aria-hidden="true" />
      <p className="max-w-md text-sm font-medium text-card-foreground">
        {message}
      </p>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <div className="space-y-5">
      <header className="flex flex-col gap-3 border-b border-border pb-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-primary">
            Crossthenics Fitness
          </p>
          <h2 className="mt-1 text-2xl font-black uppercase tracking-tight text-foreground sm:text-3xl">
            Store overview
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            Product catalog and store operations at a glance.
          </p>
        </div>
        <Link
          href="/admin/products"
          className="inline-flex min-h-10 items-center justify-center gap-2 self-start rounded-md bg-primary px-4 text-xs font-bold text-primary-foreground transition-colors hover:bg-[#B80500] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:self-auto"
        >
          Manage catalog <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </header>

      <section
        aria-label="Store performance metrics"
        className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-4"
      >
        {metrics.map(({ label, value, detail, href, icon: Icon }) => (
          <article
            key={label}
            className="rounded-lg border border-border bg-card p-4 text-card-foreground shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                {label}
              </p>
              <Icon
                size={17}
                className="shrink-0 text-primary"
                aria-hidden="true"
              />
            </div>
            <p className="mt-3 text-xl font-black">{value}</p>
            <p className="mt-1 min-h-8 text-xs leading-relaxed text-muted-foreground">
              {detail}
            </p>
            <Link
              href={href}
              className="mt-2 inline-flex min-h-9 items-center gap-1 text-xs font-semibold text-card-foreground underline decoration-border underline-offset-4 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Open {label === "Total customers" ? "customers" : "orders"}
              <ArrowUpRight size={13} aria-hidden="true" />
            </Link>
          </article>
        ))}
      </section>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.85fr)]">
        <section className="rounded-lg border border-border bg-card p-4 text-card-foreground shadow-sm sm:p-5">
          <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-base font-bold">Revenue overview</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Sales trends and earnings report
              </p>
            </div>
            <span className="rounded-md border border-border px-2.5 py-1 text-[10px] font-semibold text-muted-foreground">
              NPR
            </span>
          </div>
          <UnavailablePanel message="Revenue charts will appear when order and payment data are connected." />
        </section>

        <section className="rounded-lg border border-border bg-card p-4 text-card-foreground shadow-sm sm:p-5">
          <div className="mb-4">
            <h3 className="text-base font-bold">Sales performance</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Best sellers and category performance
            </p>
          </div>
          <UnavailablePanel message="Product sales cannot be ranked until real order-item records are available." />
          <Link
            href="/admin/products"
            className="mt-3 inline-flex min-h-9 items-center gap-1 text-xs font-semibold text-card-foreground underline decoration-border underline-offset-4 hover:text-primary"
          >
            Browse products <ArrowUpRight size={13} aria-hidden="true" />
          </Link>
        </section>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(300px,0.9fr)]">
        <section className="rounded-lg border border-border bg-card p-4 text-card-foreground shadow-sm sm:p-5">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h3 className="text-base font-bold">Catalog availability</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Availability flags from the storefront catalog; stock quantities
                are not tracked here.
              </p>
            </div>
            <span className="text-xs font-semibold text-muted-foreground">
              {availableProducts.length} available / {unifiedCatalog.length}{" "}
              products
            </span>
          </div>

          <div className="divide-y divide-border">
            {unifiedCatalog.slice(0, 6).map((product) => (
              <Link
                key={product.id}
                href="/admin/products"
                aria-label={`Open product management for ${product.name}`}
                className="flex min-h-[68px] items-center gap-3 py-2.5 hover:bg-muted/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-primary"
              >
                <Image
                  src={product.image}
                  alt=""
                  width={44}
                  height={44}
                  className="h-11 w-11 shrink-0 rounded-md bg-muted object-cover"
                  sizes="44px"
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold">
                    {product.name}
                  </span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">
                    {product.category} · {formatCurrency(product.price)}
                  </span>
                </span>
                <span
                  className={`shrink-0 rounded px-2 py-1 text-[10px] font-bold ${
                    product.inStock
                      ? "bg-muted text-card-foreground"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  {product.inStock ? "Available" : "Unavailable"}
                </span>
              </Link>
            ))}
          </div>

          {unavailableProducts.length > 0 && (
            <p className="mt-3 rounded-md border border-border bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
              {unavailableProducts.length} catalog product
              {unavailableProducts.length === 1 ? " is" : "s are"} marked
              unavailable. Restock quantities and low-stock alerts are not
              configured.
            </p>
          )}
          <Link
            href="/admin/products"
            className="mt-3 inline-flex min-h-9 items-center gap-1 text-xs font-semibold text-card-foreground underline decoration-border underline-offset-4 hover:text-primary"
          >
            Open product management <ArrowUpRight size={13} aria-hidden="true" />
          </Link>
        </section>

        <div className="grid content-start gap-4">
          <section className="rounded-lg border border-border bg-card p-4 text-card-foreground shadow-sm sm:p-5">
            <div className="mb-4">
              <h3 className="text-base font-bold">Recent orders</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Latest customer purchases
              </p>
            </div>
            <UnavailablePanel message="No persisted order records are available." />
            <Link
              href="/admin/orders"
              className="mt-3 inline-flex min-h-9 items-center gap-1 text-xs font-semibold text-card-foreground underline decoration-border underline-offset-4 hover:text-primary"
            >
              Open order management <ArrowUpRight size={13} aria-hidden="true" />
            </Link>
          </section>

          <section className="rounded-lg border border-border bg-card p-4 text-card-foreground shadow-sm sm:p-5">
            <div className="mb-4">
              <h3 className="text-base font-bold">Customer insights</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Customer growth and lifetime value
              </p>
            </div>
            <UnavailablePanel message="Customer totals, repeat purchases, and spending require a connected customer database." />
            <Link
              href="/admin/users"
              className="mt-3 inline-flex min-h-9 items-center gap-1 text-xs font-semibold text-card-foreground underline decoration-border underline-offset-4 hover:text-primary"
            >
              Open customer management{" "}
              <ArrowUpRight size={13} aria-hidden="true" />
            </Link>
          </section>
        </div>
      </div>

      <p className="text-xs leading-relaxed text-muted-foreground">
        This dashboard uses the storefront catalog as its only live data source.
        Revenue, orders, payment states, customer records, sales rankings, and
        stock quantities are not connected.
      </p>
    </div>
  );
}
