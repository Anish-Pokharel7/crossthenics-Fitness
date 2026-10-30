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
  Moon,
  Package,
  Search,
  Settings,
  ShoppingCart,
  Sun,
  Users,
  X,
} from "lucide-react";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { toast } from "sonner";
import Logo from "@/public/logo/ct-logo01.png";
import { unifiedCatalog } from "@/lib/catalog";

type AdminTheme = "charcoal" | "silver";
const ADMIN_THEME_STORAGE_KEY = "crossthenics-admin-theme";
const themeListeners = new Set<() => void>();

function subscribeToAdminTheme(listener: () => void) {
  themeListeners.add(listener);
  return () => themeListeners.delete(listener);
}

function getAdminThemeSnapshot(): AdminTheme {
  return document.documentElement.classList.contains("admin-light")
    ? "silver"
    : "charcoal";
}

function getServerAdminThemeSnapshot(): AdminTheme {
  return "charcoal";
}

function notifyAdminThemeChange() {
  themeListeners.forEach((listener) => listener());
}

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
  const sidebarRef = useRef<HTMLElement>(null);
  const mobileMenuTriggerRef = useRef<HTMLButtonElement>(null);
  const wasMobileMenuOpen = useRef(false);
  const [navigationSearch, setNavigationSearch] = useState("");
  const [isSigningOut, setIsSigningOut] = useState(false);
  const adminTheme = useSyncExternalStore(
    subscribeToAdminTheme,
    getAdminThemeSnapshot,
    getServerAdminThemeSnapshot,
  );
  const [globalSearch, setGlobalSearch] = useState("");
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("admin-theme");
    let savedTheme: AdminTheme = "charcoal";
    try {
      savedTheme =
        window.localStorage.getItem(ADMIN_THEME_STORAGE_KEY) === "silver"
          ? "silver"
          : "charcoal";
    } catch {
      savedTheme = "charcoal";
    }
    root.classList.toggle("admin-light", savedTheme === "silver");
    return () => {
      root.classList.remove("admin-theme", "admin-light");
    };
  }, []);

  const changeAdminTheme = () => {
    const nextTheme = adminTheme === "charcoal" ? "silver" : "charcoal";
    document.documentElement.classList.toggle(
      "admin-light",
      nextTheme === "silver",
    );
    notifyAdminThemeChange();
    try {
      window.localStorage.setItem(ADMIN_THEME_STORAGE_KEY, nextTheme);
    } catch {
      toast.error("Theme changed for this visit but could not be saved.");
    }
  };

  const matchingProducts = useMemo(() => {
    const query = globalSearch.trim().toLowerCase();
    if (!query) return [];
    return unifiedCatalog
      .filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query),
      )
      .slice(0, 5);
  }, [globalSearch]);

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
    if (!mobileMenuOpen) {
      if (wasMobileMenuOpen.current) mobileMenuTriggerRef.current?.focus();
      wasMobileMenuOpen.current = false;
      return;
    }

    wasMobileMenuOpen.current = true;
    const sidebar = sidebarRef.current;
    const getFocusableElements = () =>
      sidebar?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
    getFocusableElements()?.[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        return;
      }

      if (event.key !== "Tab") return;
      const focusableElements = getFocusableElements();
      if (!focusableElements?.length) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
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
    <div className="min-h-screen bg-background text-foreground">
      {mobileMenuOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 cursor-default bg-black/50 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close admin navigation"
        />
      )}

      <aside
        ref={sidebarRef}
        role={mobileMenuOpen ? "dialog" : undefined}
        aria-modal={mobileMenuOpen ? true : undefined}
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

        <div
          className={`border-b border-white/10 px-3 py-3 ${
            !sidebarExpanded ? "lg:hidden" : ""
          }`}
        >
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
                        aria-label={!sidebarExpanded ? label : undefined}
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
            aria-label={!sidebarExpanded ? "View storefront" : undefined}
            title={!sidebarExpanded ? "View storefront" : undefined}
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
            aria-label={!sidebarExpanded ? "Sign out" : undefined}
            title={!sidebarExpanded ? "Sign out" : undefined}
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
        <header className="sticky top-0 z-30 flex h-[68px] items-center gap-3 border-b border-[#414141] bg-[#2A2A2A] px-4 text-white sm:px-6 lg:px-8">
          <button
            ref={mobileMenuTriggerRef}
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
          <div
            className={`relative w-full md:max-w-xs ${
              mobileSearchOpen
                ? "absolute inset-x-2 top-[calc(100%+8px)] z-40 w-auto rounded-lg bg-[#2A2A2A] p-2 md:static md:w-full md:bg-transparent md:p-0"
                : "hidden md:block"
            }`}
          >
            <Search
              size={15}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#C0C0C0]"
              aria-hidden="true"
            />
            <input
              type="search"
              value={globalSearch}
              onChange={(event) => setGlobalSearch(event.target.value)}
              placeholder="Search store catalog"
              aria-label="Search store catalog"
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  setGlobalSearch("");
                  setMobileSearchOpen(false);
                }
              }}
              className="h-10 w-full rounded-lg border border-white/15 bg-white/5 pl-9 pr-3 text-xs text-white outline-none placeholder:text-white/50 focus:border-[#C0C0C0] focus:ring-2 focus:ring-[#C0C0C0]/30"
            />
            {globalSearch.trim() && (
              <div className="absolute right-0 top-full z-40 mt-2 w-full overflow-hidden rounded-lg border border-[#414141] bg-[#2A2A2A] py-1 text-white shadow-xl">
                {matchingProducts.length ? (
                  matchingProducts.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.id}`}
                      onClick={() => setGlobalSearch("")}
                      className="block border-b border-white/10 px-3 py-2.5 last:border-0 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#C0C0C0]"
                    >
                      <span className="block truncate text-xs font-semibold">
                        {product.name}
                      </span>
                      <span className="mt-0.5 block text-[10px] text-[#C0C0C0]">
                        {product.category} · View product
                      </span>
                    </Link>
                  ))
                ) : (
                  <p className="px-3 py-3 text-xs text-[#C0C0C0]">
                    No matching products in the store catalog.
                  </p>
                )}
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => setMobileSearchOpen((open) => !open)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-white/20 text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C0C0C0] md:hidden"
            aria-label={
              mobileSearchOpen ? "Close catalog search" : "Open catalog search"
            }
            aria-expanded={mobileSearchOpen}
          >
            {mobileSearchOpen ? (
              <X size={17} aria-hidden="true" />
            ) : (
              <Search size={17} aria-hidden="true" />
            )}
          </button>
          <button
            type="button"
            onClick={changeAdminTheme}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-white/20 text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C0C0C0]"
            aria-label={
              adminTheme === "charcoal"
                ? "Switch to Moonlit Silver theme"
                : "Switch to Charcoal Black theme"
            }
            title={
              adminTheme === "charcoal"
                ? "Switch to Moonlit Silver theme"
                : "Switch to Charcoal Black theme"
            }
          >
            {adminTheme === "charcoal" ? (
              <Moon size={17} aria-hidden="true" />
            ) : (
              <Sun size={17} aria-hidden="true" />
            )}
          </button>
          <div className="hidden items-center gap-2 sm:flex">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#E10600] text-xs font-bold text-white">
              A
            </span>
            <span className="hidden min-w-0 lg:block">
              <span className="block text-xs font-semibold text-white">
                Admin account
              </span>
              <span className="block text-[10px] text-[#C0C0C0]">
                Store administrator
              </span>
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
