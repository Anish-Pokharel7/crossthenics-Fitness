"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Tags,
  Users,
  BarChart3,
  Boxes,
  Percent,
  Star,
  RotateCcw,
  Truck,
  Settings,
  LogOut,
  ExternalLink,
  ChevronLeft,
  X,
} from "lucide-react";
import Logo from "@/public/logo/ct-logo01.png";
import BeltThumb from "@/public/p-image/liftingbelts.webp";
import { toast } from "sonner";

interface AdminSidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  counts?: {
    pendingOrders?: number;
    lowStock?: number;
    returnRequests?: number;
  };
}

export function AdminSidebar({
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile,
  counts = {},
}: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    {
      label: "Orders",
      href: "/admin/orders",
      icon: ShoppingBag,
      badge: counts.pendingOrders || undefined,
    },
    { label: "Products", href: "/admin/products", icon: Package },
    { label: "Categories", href: "/admin/categories", icon: Tags },
    { label: "Customers", href: "/admin/customers", icon: Users },
    { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    {
      label: "Inventory",
      href: "/admin/inventory",
      icon: Boxes,
      badge: counts.lowStock ? "Alert" : undefined,
      badgeVariant: "warning" as const,
    },
    { label: "Promotions", href: "/admin/promotions", icon: Percent },
    { label: "Reviews", href: "/admin/reviews", icon: Star },
    {
      label: "Returns & Refunds",
      href: "/admin/returns",
      icon: RotateCcw,
      badge: counts.returnRequests || undefined,
    },
    { label: "Shipping & Delivery", href: "/admin/shipping", icon: Truck },
    { label: "Settings", href: "/admin/settings", icon: Settings },
  ];

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

  const isActive = (href: string) => {
    if (href === "/admin/dashboard") return pathname === "/admin/dashboard" || pathname === "/admin";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Main Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col admin-sidebar transition-all duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } ${collapsed ? "lg:w-[76px]" : "lg:w-64"} w-72`}
      >
        {/* Brand Header */}
        <div className="flex h-16 shrink-0 items-center justify-between px-5 border-b border-[var(--admin-border)]">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-2.5 overflow-hidden"
            onClick={onCloseMobile}
          >
            <Image
              src={Logo}
              alt="Crossthenics"
              width={140}
              height={44}
              priority
              className={`h-8 w-auto object-contain ${collapsed ? "lg:hidden" : ""}`}
            />
            {collapsed && (
              <span className="hidden lg:grid h-9 w-9 place-items-center rounded-xl bg-[#E10600] font-black text-white text-sm">
                CT
              </span>
            )}
          </Link>

          {/* Close on Mobile */}
          <button
            type="button"
            onClick={onCloseMobile}
            className="grid h-8 w-8 place-items-center rounded-lg text-[var(--admin-text-muted)] hover:text-[var(--admin-text)] lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>

          {/* Desktop collapse chevron */}
          <button
            type="button"
            onClick={onToggleCollapse}
            className="hidden lg:grid h-7 w-7 place-items-center rounded-md border border-[var(--admin-border)] bg-[var(--admin-card-elevated)] text-[var(--admin-text-muted)] hover:text-[var(--admin-text)] transition-colors"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronLeft
              size={14}
              className={`transition-transform duration-200 ${collapsed ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMobile}
                title={collapsed ? item.label : undefined}
                className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                  active
                    ? "bg-[#C0C0C0] text-[#1C1C1C] shadow-sm font-bold"
                    : "text-[var(--admin-text-muted)] hover:text-[var(--admin-text)] hover:bg-[var(--admin-row-hover)]"
                }`}
              >
                <Icon
                  size={18}
                  className={`shrink-0 transition-transform duration-150 group-hover:scale-105 ${
                    active ? "text-[#1C1C1C]" : "text-[var(--admin-text-muted)] group-hover:text-[var(--admin-text)]"
                  }`}
                />

                {!collapsed && (
                  <span className="truncate flex-1">{item.label}</span>
                )}

                {!collapsed && item.badge !== undefined && (
                  <span
                    className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      item.badgeVariant === "warning"
                        ? "bg-[#E10600]/15 text-[#E10600] border border-[#E10600]/30"
                        : active
                        ? "bg-[#1C1C1C] text-[#FFFFFF]"
                        : "bg-[var(--admin-border)] text-[var(--admin-text)]"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Banner Card (matches the reference image card) */}
        {!collapsed && (
          <div className="px-3 pb-3 hidden lg:block">
            <div className="relative overflow-hidden rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-card-elevated)] p-3.5 shadow-sm">
              <div className="relative h-24 w-full rounded-xl overflow-hidden bg-black/10 mb-2.5">
                <Image
                  src={BeltThumb}
                  alt="New Drop 2026"
                  fill
                  className="object-contain p-2"
                />
              </div>
              <p className="text-[11px] font-black uppercase tracking-wider text-[var(--admin-text)]">
                Competition Series 2026
              </p>
              <p className="mt-0.5 text-[10px] text-[var(--admin-text-muted)] line-clamp-1">
                Dispatched directly from Pokhara
              </p>
              <Link
                href="/"
                target="_blank"
                className="mt-2.5 flex items-center justify-center gap-1.5 w-full rounded-lg bg-[var(--admin-text)] text-[var(--admin-bg)] py-1.5 text-[11px] font-bold hover:opacity-90 transition-opacity"
              >
                <span>Storefront</span>
                <ExternalLink size={12} />
              </Link>
            </div>
          </div>
        )}

        {/* Admin User Footer Profile */}
        <div className="border-t border-[var(--admin-border)] p-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#E10600] text-white text-xs font-black">
                CT
              </div>
              {!collapsed && (
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-bold text-[var(--admin-text)]">
                    Store Manager
                  </p>
                  <p className="truncate text-[10px] text-[var(--admin-text-muted)]">
                    admin@gmail.com
                  </p>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleSignOut}
              title="Sign Out"
              className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-[var(--admin-text-muted)] hover:text-[#E10600] hover:bg-[var(--admin-row-hover)] transition-colors"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

