"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  LayoutDashboard,
  Menu,
  Package,
  Search,
  Settings,
  ShoppingCart,
  Users,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import Logo from "@/public/logo/ct-logo01.png";

const navigationGroups = [
  {
    label: "Overview",
    items: [{ label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard }],
  },
  {
    label: "Store management",
    items: [
      { label: "Products", href: "/admin/products", icon: Package },
      { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
      { label: "Customers", href: "/admin/users", icon: Users },
    ],
  },
  {
    label: "System",
    items: [{ label: "Settings", href: "/admin/settings", icon: Settings }],
  },
];

const pageTitles: Record<string, string> = {
  "/admin/dashboard": "Store overview",
  "/admin/products": "Products",
  "/admin/orders": "Orders",
  "/admin/users": "Customers",
  "/admin/settings": "Settings",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navigationSearch, setNavigationSearch] = useState("");
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("admin-theme");
    return () => document.documentElement.classList.remove("admin-theme");
  }, []);

  const filteredGroups = useMemo(() => {
    const query = navigationSearch.trim().toLowerCase();
    if (!query) return navigationGroups;

    return navigationGroups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) =>
          item.label.toLowerCase().includes(query),
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [navigationSearch]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      const response = await fetch("/api/admin/session", { method: "DELETE" });
      if (!response.ok) throw new Error("Could not sign out.");
      router.replace("/admin-login");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not sign out.",
      );
    } finally {
      setIsSigningOut(false);
    }
  };

  const currentTitle =
    Object.entries(pageTitles).find(
      ([href]) => pathname === href || pathname.startsWith(`${href}/`),
    )?.[1] ?? "Admin";

  return (
    <div className="min-h-screen bg-[#C0C0C0] text-[#202020]">
      {mobileMenuOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 cursor-default bg-black/50 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close admin navigation"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[min(84vw,280px)] flex-col border-r border-[#414141] bg-[#2A2A2A] text-white transition-transform duration-200 lg:w-64 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } ${!sidebarExpanded ? "lg:w-[76px]" : ""}`}
        aria-label="Admin navigation"
      >
        <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-white/10 px-4">
          <Link
            href="/admin/dashboard"
            className="min-w-0"
            aria-label="Crossthenics admin dashboard"
          >
            <Image
              src={Logo}
              alt="Crossthenics Fitness"
              width={160}
              height={56}
              priority
              className={`h-9 w-auto object-contain ${
                !sidebarExpanded ? "lg:hidden" : ""
              }`}
            />
            <span
              className={`hidden text-xs font-black uppercase tracking-[0.16em] ${
                !sidebarExpanded ? "lg:block" : ""
              }`}
            >
              CT<span className="text-[#E10600]"> / Admin</span>
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="grid h-10 w-10 place-items-center rounded-lg text-white/70 hover:bg-white/10 hover:text-white lg:hidden"
            aria-label="Close admin menu"
          >
            <X size={18} />
          </button>
        </div>

        <div className="border-b border-white/10 px-3 py-3">
          <label className="flex h-10 items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 focus-within:border-white/30">
            <Search size={15} className="shrink-0 text-[#C0C0C0]" />
            <input
              value={navigationSearch}
              onChange={(event) => setNavigationSearch(event.target.value)}
              placeholder="Find a section"
              aria-label="Filter admin navigation"
              className="min-w-0 flex-1 bg-transparent text-xs text-white outline-none placeholder:text-white/45"
            />
          </label>
        </div>

        <nav className="min-h-0 flex-1 space-y-6 overflow-y-auto px-3 py-5">
          {filteredGroups.map((group) => (
            <div key={group.label}>
              {sidebarExpanded && (
                <h2 className="mb-2 px-3 text-[9px] font-black uppercase tracking-[0.18em] text-[#C0C0C0]/70">
                  {group.label}
                </h2>
              )}
              <ul className="space-y-1">
                {group.items.map(({ label, href, icon: Icon }) => {
                  const active =
                    pathname === href || pathname.startsWith(`${href}/`);
                  return (
                    <li key={href}>
                      <Link
                        href={href}
                        aria-current={active ? "page" : undefined}
                        title={!sidebarExpanded ? label : undefined}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`relative flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C0C0C0] ${
                          active
                            ? "bg-white/10 font-semibold text-white before:absolute before:inset-y-2 before:left-0 before:w-0.5 before:bg-[#E10600]"
                            : "text-white/70 hover:bg-white/5 hover:text-white"
                        } ${!sidebarExpanded ? "lg:justify-center lg:px-0" : ""}`}
                      >
                        <Icon size={17} className="shrink-0" aria-hidden="true" />
                        <span className={!sidebarExpanded ? "lg:hidden" : ""}>
                          {label}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
          {filteredGroups.length === 0 && (
            <p className="px-3 py-2 text-xs text-white/60">
              No matching sections.
            </p>
          )}
        </nav>

        <div className="space-y-2 border-t border-white/10 p-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex min-h-11 items-center gap-3 rounded-lg px-3 text-xs font-semibold text-white/70 transition-colors hover:bg-white/5 hover:text-white ${
              !sidebarExpanded ? "lg:justify-center lg:px-0" : ""
            }`}
          >
            <ExternalLink size={16} aria-hidden="true" />
            <span className={!sidebarExpanded ? "lg:hidden" : ""}>
              View storefront
            </span>
          </a>
          <button
            type="button"
            onClick={() => setSidebarExpanded((expanded) => !expanded)}
            className="hidden min-h-10 w-full items-center gap-3 rounded-lg px-3 text-xs font-semibold text-white/65 transition-colors hover:bg-white/5 hover:text-white lg:flex"
            aria-label={sidebarExpanded ? "Collapse sidebar" : "Expand sidebar"}
          >
            {sidebarExpanded ? (
              <ChevronLeft size={17} />
            ) : (
              <ChevronRight size={17} />
            )}
            <span className={!sidebarExpanded ? "lg:hidden" : ""}>
              {sidebarExpanded ? "Collapse" : "Expand"}
            </span>
          </button>
          <button
            type="button"
            disabled={isSigningOut}
            onClick={handleSignOut}
            className={`flex min-h-11 w-full items-center gap-3 rounded-lg px-3 text-xs font-bold text-white/75 transition-colors hover:bg-white/5 hover:text-white disabled:opacity-50 ${
              !sidebarExpanded ? "lg:justify-center lg:px-0" : ""
            }`}
          >
            <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#E10600] text-[9px] font-black">
              A
            </span>
            <span className={!sidebarExpanded ? "lg:hidden" : ""}>
              {isSigningOut ? "Signing out..." : "Sign out"}
            </span>
          </button>
        </div>
      </aside>

      <div
        className={`min-h-screen transition-[margin] duration-200 ${
          sidebarExpanded ? "lg:ml-64" : "lg:ml-[76px]"
        }`}
      >
        <header className="sticky top-0 z-30 flex h-[72px] items-center gap-3 border-b border-[#414141] bg-[#2A2A2A] px-4 text-white sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-white/20 text-white hover:bg-white/10 lg:hidden"
            aria-label="Open admin navigation"
            aria-expanded={mobileMenuOpen}
          >
            <Menu size={18} />
          </button>
          <div className="min-w-0 flex-1">
            <p className="hidden text-[9px] font-bold uppercase tracking-[0.16em] text-[#C0C0C0] sm:block">
              Store management <span className="px-1 text-[#E10600]">/</span>{" "}
              {currentTitle}
            </p>
            <h1 className="truncate text-base font-bold text-white sm:mt-0.5 sm:text-lg">
              {currentTitle}
            </h1>
          </div>
          <div className="hidden items-center gap-2 rounded-full border border-white/20 px-3 py-1.5 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E10600]" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C0C0C0]">
              Admin workspace
            </span>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">
          <div className="mb-6 flex items-start gap-3 rounded-lg border border-[#414141] bg-[#2A2A2A] px-4 py-3 text-xs leading-relaxed text-[#C0C0C0]">
            <BarChart3 size={16} className="mt-0.5 shrink-0" />
            <p>
              <strong className="text-white">Data connection unavailable.</strong>{" "}
              Products, Orders, Customers, and Settings use local/demo data;
              edits do not update the public store. Any amounts shown in NPR
              are display examples only: the demo values have not been converted
              or verified as business records.
            </p>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
