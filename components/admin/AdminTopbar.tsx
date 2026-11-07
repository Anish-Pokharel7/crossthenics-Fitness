"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Menu,
  Search,
  Bell,
  Sun,
  Moon,
  ExternalLink,
  Settings,
  LogOut,
  Package,
  ShoppingBag,
  Users,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
} from "lucide-react";
import { toast } from "sonner";

interface AdminTopbarProps {
  onOpenMobileSidebar: () => void;
  adminTheme: "charcoal" | "silver";
  onToggleTheme: () => void;
}

export function AdminTopbar({
  onOpenMobileSidebar,
  adminTheme,
  onToggleTheme,
}: AdminTopbarProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const [searchResults, setSearchResults] = useState<{
    products: { id: string | number; name: string; category: string; price: number }[];
    orders: { id: string; customerName: string; grandTotal: number; status: string }[];
    customers: { id: string; name: string; city: string }[];
  }>({ products: [], orders: [], customers: [] });

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Live search query handler
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults({ products: [], orders: [], customers: [] });
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const [prodRes, ordRes] = await Promise.all([
          fetch(`/api/admin/products?search=${encodeURIComponent(searchQuery)}`),
          fetch(`/api/admin/orders?search=${encodeURIComponent(searchQuery)}`),
        ]);

        const products = prodRes.ok ? await prodRes.json() : [];
        const orders = ordRes.ok ? await ordRes.json() : [];

        setSearchResults({
          products: Array.isArray(products) ? products.slice(0, 4) : [],
          orders: Array.isArray(orders) ? orders.slice(0, 4) : [],
          customers: [],
        });
      } catch {
        // Ignore search error
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSignOut = async () => {
    try {
      await fetch("/api/admin/session", { method: "DELETE" });
      toast.success("Signed out successfully.");
      router.replace("/admin-login");
      router.refresh();
    } catch {
      toast.error("Failed to sign out.");
    }
  };

  const notifications = [
    {
      id: "1",
      icon: AlertTriangle,
      color: "text-[#E10600]",
      title: "Low stock alert",
      description: "Competition 10mm Leather Lever Belt is down to 6 units.",
      time: "15m ago",
      href: "/admin/inventory",
    },
    {
      id: "2",
      icon: ShoppingBag,
      color: "text-emerald-500",
      title: "New order received",
      description: "Order #CT-108429 from Biraj Thapa in Pokhara.",
      time: "1h ago",
      href: "/admin/orders",
    },
    {
      id: "3",
      icon: RotateCcw,
      color: "text-blue-500",
      title: "Return / Exchange requested",
      description: "Samir Karki requested size swap for Hybrid Belt.",
      time: "3h ago",
      href: "/admin/returns",
    },
  ];

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-[var(--admin-border)] admin-topbar px-4 sm:px-6">
      {/* Left side: Hamburger + Global Search */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          type="button"
          onClick={onOpenMobileSidebar}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-[var(--admin-border)] bg-[var(--admin-card-elevated)] text-[var(--admin-text-muted)] hover:text-[var(--admin-text)] lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu size={18} />
        </button>

        {/* Global Search Bar (Aurora Reference style) */}
        <div ref={searchContainerRef} className="relative w-full max-w-md">
          <div className="relative flex items-center">
            <Search
              size={16}
              className="pointer-events-none absolute left-3.5 text-[var(--admin-text-muted)]"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSearchOpen(true);
              }}
              onFocus={() => setSearchOpen(true)}
              placeholder="Search for orders, products, customers..."
              className="h-10 w-full rounded-xl border border-[var(--admin-border)] bg-[var(--admin-input-bg)] pl-10 pr-4 text-xs text-[var(--admin-text)] placeholder:text-[var(--admin-text-dim)] focus:border-[#C0C0C0] focus:outline-hidden transition-all shadow-2xs"
            />
          </div>

          {/* Interactive Search Results Dropdown */}
          {searchOpen && searchQuery.trim().length > 0 && (
            <div className="absolute left-0 right-0 top-12 z-50 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card)] p-2 shadow-xl">
              {searchResults.products.length === 0 && searchResults.orders.length === 0 ? (
                <p className="p-3 text-center text-xs text-[var(--admin-text-muted)]">
                  No matching items found for &ldquo;{searchQuery}&rdquo;
                </p>
              ) : (
                <div className="max-h-80 overflow-y-auto space-y-2 text-xs">
                  {searchResults.products.length > 0 && (
                    <div>
                      <span className="px-2 text-[10px] font-bold uppercase tracking-wider text-[var(--admin-text-dim)]">
                        Products
                      </span>
                      {searchResults.products.map((p) => (
                        <Link
                          key={p.id}
                          href="/admin/products"
                          onClick={() => setSearchOpen(false)}
                          className="flex items-center justify-between rounded-lg p-2 hover:bg-[var(--admin-row-hover)] text-[var(--admin-text)] transition-colors"
                        >
                          <span className="flex items-center gap-2">
                            <Package size={14} className="text-[#C0C0C0]" />
                            <span className="font-semibold">{p.name}</span>
                          </span>
                          <span className="font-bold text-[var(--admin-text-muted)]">
                            Rs. {p.price.toLocaleString()}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}

                  {searchResults.orders.length > 0 && (
                    <div className="border-t border-[var(--admin-border)] pt-2">
                      <span className="px-2 text-[10px] font-bold uppercase tracking-wider text-[var(--admin-text-dim)]">
                        Orders
                      </span>
                      {searchResults.orders.map((o) => (
                        <Link
                          key={o.id}
                          href="/admin/orders"
                          onClick={() => setSearchOpen(false)}
                          className="flex items-center justify-between rounded-lg p-2 hover:bg-[var(--admin-row-hover)] text-[var(--admin-text)] transition-colors"
                        >
                          <span className="flex items-center gap-2">
                            <ShoppingBag size={14} className="text-[#E10600]" />
                            <span className="font-semibold">{o.id}</span>
                            <span className="text-[var(--admin-text-muted)]">({o.customerName})</span>
                          </span>
                          <span className="font-bold">Rs. {o.grandTotal.toLocaleString()}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-3">
        {/* THEME TOGGLE (Moonlit Silver <-> Charcoal Black) */}
        <button
          type="button"
          onClick={onToggleTheme}
          title={
            adminTheme === "charcoal"
              ? "Switch to Moonlit Silver theme (Light)"
              : "Switch to Charcoal Black theme (Dark)"
          }
          className="grid h-9 w-9 place-items-center rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card-elevated)] text-[var(--admin-text-muted)] hover:text-[var(--admin-text)] transition-colors"
          aria-label="Toggle admin color theme"
        >
          {adminTheme === "charcoal" ? (
            <Sun size={17} className="text-[#C0C0C0]" />
          ) : (
            <Moon size={17} className="text-[#1C1C1C]" />
          )}
        </button>

        {/* NOTIFICATIONS DROPDOWN */}
        <div ref={notifRef} className="relative">
          <button
            type="button"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative grid h-9 w-9 place-items-center rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card-elevated)] text-[var(--admin-text-muted)] hover:text-[var(--admin-text)] transition-colors"
            aria-label="Open notifications"
          >
            <Bell size={17} />
            <span className="absolute top-1.5 right-1.5 grid h-4 w-4 place-items-center rounded-full bg-[#E10600] text-[9px] font-black text-white">
              3
            </span>
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 top-12 z-50 w-80 rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-card)] p-3 shadow-2xl">
              <div className="flex items-center justify-between pb-2.5 border-b border-[var(--admin-border)] px-1">
                <span className="text-xs font-bold text-[var(--admin-text)]">
                  Notifications (3)
                </span>
                <span className="text-[10px] text-[var(--admin-text-muted)]">
                  All systems normal
                </span>
              </div>
              <div className="divide-y divide-[var(--admin-border)] max-h-72 overflow-y-auto">
                {notifications.map((n) => {
                  const Icon = n.icon;
                  return (
                    <Link
                      key={n.id}
                      href={n.href}
                      onClick={() => setNotificationsOpen(false)}
                      className="flex items-start gap-3 py-2.5 px-1.5 rounded-lg hover:bg-[var(--admin-row-hover)] transition-colors"
                    >
                      <div className={`mt-0.5 shrink-0 ${n.color}`}>
                        <Icon size={16} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-[var(--admin-text)]">{n.title}</p>
                        <p className="text-[11px] text-[var(--admin-text-muted)] line-clamp-2">
                          {n.description}
                        </p>
                        <span className="text-[9px] text-[var(--admin-text-dim)]">{n.time}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* ADMIN PROFILE DROPDOWN */}
        <div ref={profileRef} className="relative">
          <button
            type="button"
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2.5 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card-elevated)] p-1.5 pr-3 hover:bg-[var(--admin-row-hover)] transition-colors"
          >
            <div className="grid h-7 w-7 place-items-center rounded-full bg-[#E10600] text-xs font-black text-white">
              CT
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-bold text-[var(--admin-text)] leading-none">
                Store Administrator
              </p>
              <p className="text-[10px] text-[var(--admin-text-muted)] mt-0.5">
                admin@gmail.com
              </p>
            </div>
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-12 z-50 w-52 rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-card)] p-2 shadow-2xl text-xs">
              <div className="px-3 py-2 border-b border-[var(--admin-border)]">
                <p className="font-bold text-[var(--admin-text)]">Admin Account</p>
                <p className="text-[10px] text-[var(--admin-text-muted)]">Pokhara Fulfillment Hub</p>
              </div>

              <div className="py-1">
                <Link
                  href="/admin/settings"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-[var(--admin-text)] hover:bg-[var(--admin-row-hover)]"
                >
                  <Settings size={14} />
                  <span>Store Settings</span>
                </Link>

                <Link
                  href="/"
                  target="_blank"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-[var(--admin-text)] hover:bg-[var(--admin-row-hover)]"
                >
                  <ExternalLink size={14} />
                  <span>View Storefront</span>
                </Link>
              </div>

              <div className="pt-1 border-t border-[var(--admin-border)]">
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-[#E10600] hover:bg-[#E10600]/10 font-semibold"
                >
                  <LogOut size={14} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

