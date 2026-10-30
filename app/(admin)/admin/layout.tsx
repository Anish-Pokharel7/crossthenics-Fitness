"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Settings,
  ShoppingCart,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const adminNavItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Mobile sidebar overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-screen bg-card text-card-foreground border-r border-border transition-all duration-300 lg:translate-x-0",
          sidebarOpen ? "w-64" : "w-20",
          !sidebarOpen && "lg:w-20",
          mobileMenuOpen && "lg:hidden",
        )}
        aria-label="Admin navigation"
      >
        {/* Sidebar header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-border">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <span className="text-lg font-bold">CF</span>
            </div>
            {sidebarOpen && (
              <span className="text-xl font-bold text-foreground">Admin</span>
            )}
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </Button>
        </div>

        {/* Navigation */}
        <nav
          className="flex-1 space-y-1 p-4 overflow-y-auto"
          aria-label="Main navigation"
        >
          {adminNavItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  "focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  !sidebarOpen && "justify-center px-2",
                )}
                title={sidebarOpen ? undefined : item.name}
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                {sidebarOpen && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar footer - Collapse button & Logout */}
        <div className="border-t border-border p-4">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "w-full justify-start gap-3",
              !sidebarOpen && "justify-center px-2",
            )}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {sidebarOpen ? (
              <>
                <ChevronLeft size={20} />
                <span>Collapse</span>
              </>
            ) : (
              <>
                <ChevronRight size={20} />
                <span className="hidden lg:inline">Expand</span>
              </>
            )}
          </Button>

          {sidebarOpen && (
            <div className="mt-4 pt-4 border-t border-border">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={() => {
                  // Handle logout
                }}
              >
                <LogOut size={20} />
                <span>Logout</span>
              </Button>
            </div>
          )}
        </div>
      </aside>

      {/* Main content */}
      <main
        className={cn(
          "min-h-screen transition-all duration-300 lg:ml-64",
          sidebarOpen ? "lg:ml-64" : "lg:ml-20",
        )}
      >
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-card text-card-foreground px-4 lg:px-8">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </Button>

          <div className="flex-1" />

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-medium">Admin Panel</span>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-medium text-sm">
              A
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="p-4 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
