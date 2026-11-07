"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopbar } from "@/components/admin/AdminTopbar";

type AdminTheme = "charcoal" | "silver";
const ADMIN_THEME_STORAGE_KEY = "crossthenics-admin-theme";
const themeListeners = new Set<() => void>();

function subscribeToAdminTheme(listener: () => void) {
  themeListeners.add(listener);
  return () => themeListeners.delete(listener);
}

function getAdminThemeSnapshot(): AdminTheme {
  return document.documentElement.classList.contains("admin-light") ? "silver" : "charcoal";
}

function getServerAdminThemeSnapshot(): AdminTheme {
  return "charcoal";
}

function notifyAdminThemeChange() {
  themeListeners.forEach((listener) => listener());
}

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [counts, setCounts] = useState<{
    pendingOrders?: number;
    lowStock?: number;
    returnRequests?: number;
  }>({
    pendingOrders: 0,
    lowStock: 0,
    returnRequests: 0,
  });

  const adminTheme = useSyncExternalStore(
    subscribeToAdminTheme,
    getAdminThemeSnapshot,
    getServerAdminThemeSnapshot
  );

  // The parent layout sets the class before hydration; this keeps the toggle in sync.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("admin-theme");

    notifyAdminThemeChange();

    const controller = new AbortController();
    Promise.all([
      fetch("/api/admin/stats?days=30", { signal: controller.signal }),
      fetch("/api/admin/returns", { signal: controller.signal }),
    ])
      .then(async ([statsResponse, returnsResponse]) => {
        if (!statsResponse.ok || !returnsResponse.ok) {
          throw new Error("Unable to load admin navigation counts.");
        }

        const [stats, returns] = await Promise.all([
          statsResponse.json(),
          returnsResponse.json(),
        ]);
        setCounts({
          pendingOrders:
            stats.orderStatusBreakdown?.find(
              (status: { status: string }) => status.status === "pending"
            )?.count ?? 0,
          lowStock: stats.inventoryOverview?.lowStockCount ?? 0,
          returnRequests: Array.isArray(returns)
            ? returns.filter((item: { status: string }) => item.status === "pending").length
            : 0,
        });
      })
      .catch((error: unknown) => {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error(error);
        }
      });

    return () => {
      controller.abort();
      root.classList.remove("admin-theme", "admin-light");
    };
  }, []);

  const handleToggleTheme = () => {
    const nextTheme = adminTheme === "charcoal" ? "silver" : "charcoal";
    document.documentElement.classList.toggle("admin-light", nextTheme === "silver");
    notifyAdminThemeChange();

    try {
      window.localStorage.setItem(ADMIN_THEME_STORAGE_KEY, nextTheme);
    } catch (error) {
      console.error("Could not save admin theme preference.", error);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--admin-bg)] text-[var(--admin-text)] transition-colors duration-200">
      {/* Collapsible Sidebar */}
      <AdminSidebar
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
        counts={counts}
      />

      {/* Main Content Area */}
      <div
        className={`flex flex-col min-h-screen transition-all duration-300 ${
          collapsed ? "lg:pl-[76px]" : "lg:pl-64"
        }`}
      >
        {/* Topbar */}
        <AdminTopbar
          onOpenMobileSidebar={() => setMobileOpen(true)}
          adminTheme={adminTheme}
          onToggleTheme={handleToggleTheme}
        />

        {/* Dynamic page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}
