import { unifiedCatalog } from "@/lib/catalog";
import {
  ArrowUpRight,
  CircleAlert,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";
import Link from "next/link";

const availableProducts = unifiedCatalog.filter((product) => product.inStock);

const unavailableMetrics = [
  {
    label: "Revenue",
    detail: "No persisted order or payment records",
    icon: ShoppingCart,
  },
  {
    label: "Orders",
    detail: "Checkout is not connected to an order service",
    icon: ShoppingCart,
  },
  {
    label: "Customers",
    detail: "No customer database is configured",
    icon: Users,
  },
];

const quickLinks = [
  {
    label: "Products",
    description: "Open the current product management screen",
    href: "/admin/products",
    icon: Package,
  },
  {
    label: "Orders",
    description: "Open the current order management screen",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    label: "Customers",
    description: "Open the current customer management screen",
    href: "/admin/users",
    icon: Users,
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-7">
      <header className="flex flex-col gap-4 border-b border-[#414141] pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#E10600]">
            Crossthenics Fitness
          </p>
          <h2 className="mt-2 text-3xl font-black uppercase tracking-tight text-[#2A2A2A] sm:text-4xl">
            Store overview
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#414141]">
            Product catalog status and available store-management tools.
            Sales analytics will appear once orders are persisted by a
            connected backend.
          </p>
        </div>
        <Link
          href="/admin/products"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#E10600] px-4 text-xs font-black uppercase tracking-wider text-white transition-colors hover:bg-[#B80500]"
        >
          Review catalog <ArrowUpRight size={15} />
        </Link>
      </header>

      <section aria-label="Store metrics" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-xl border border-[#414141] bg-[#2A2A2A] p-5 text-white">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wider text-[#C0C0C0]">
              Catalog products
            </p>
            <Package size={18} className="text-[#E10600]" />
          </div>
          <p className="mt-4 text-3xl font-black text-white">
            {unifiedCatalog.length}
          </p>
          <p className="mt-1 text-xs text-[#C0C0C0]">
            {availableProducts.length} marked available in the catalog source
          </p>
        </article>
        {unavailableMetrics.map(({ label, detail, icon: Icon }) => (
          <article
            key={label}
            className="rounded-xl border border-[#414141] bg-[#2A2A2A] p-5 text-white"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-wider text-[#C0C0C0]">
                {label}
              </p>
              <Icon size={18} className="text-[#C0C0C0]" />
            </div>
            <p className="mt-4 text-xl font-black text-[#C0C0C0]">
              Unavailable
            </p>
            <p className="mt-1 text-xs leading-relaxed text-[#C0C0C0]">{detail}</p>
          </article>
        ))}
      </section>

      <div className="grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
        <section className="rounded-xl border border-[#414141] bg-[#2A2A2A] p-5 text-white sm:p-6">
          <div className="flex items-start gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#414141] text-[#C0C0C0]">
              <CircleAlert size={18} />
            </span>
            <div>
              <h3 className="text-lg font-black uppercase tracking-tight text-white">
                Analytics are not connected
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#C0C0C0]">
                The current checkout does not write orders to a server-side
                database. Revenue, customer counts, order status, product sales,
                and inventory quantities cannot be calculated reliably, so this
                dashboard intentionally does not display sample charts or
                fabricated activity.
              </p>
            </div>
          </div>
          <div className="mt-6 grid gap-3 border-t border-[#414141] pt-5 sm:grid-cols-2">
            <div>
              <p className="text-[10px] font-black uppercase tracking-wider text-[#C0C0C0]">
                Available data source
              </p>
              <p className="mt-1 text-sm font-semibold text-white">
                Unified product catalog
              </p>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-wider text-[#C0C0C0]">
                Missing for live analytics
              </p>
              <p className="mt-1 text-sm font-semibold text-white">
                Orders, payment status, customer records, stock ledger
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-[#414141] bg-[#2A2A2A] p-5 text-white sm:p-6">
          <h3 className="text-lg font-black uppercase tracking-tight text-white">
            Store management
          </h3>
          <p className="mt-1 text-sm text-[#C0C0C0]">
            Existing admin screens are available, but still use demo-only data.
          </p>
          <ul className="mt-4 divide-y divide-[#414141]">
            {quickLinks.map(({ label, description, href, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="group flex min-h-16 items-center gap-3 py-3"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#414141] text-[#C0C0C0]">
                    <Icon size={17} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-bold text-white group-hover:text-[#E10600]">
                      {label}
                    </span>
                    <span className="mt-0.5 block text-xs text-[#C0C0C0]">
                      {description}
                    </span>
                  </span>
                  <ArrowUpRight
                    size={15}
                    className="shrink-0 text-[#C0C0C0] group-hover:text-[#E10600]"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <p className="text-xs leading-relaxed text-[#414141]">
        Catalog figures above are read from the same local catalog source used
        by the storefront. Availability is not connected to a live inventory
        system.
      </p>
    </div>
  );
}
