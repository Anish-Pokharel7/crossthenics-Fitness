"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Navbar } from "@/components/layout/navBar";
import Footer from "@/components/layout/Footer";
import CinematicBackground from "@/components/layout/CinematicBackground";
import { SearchProvider } from "@/lib/searchContext";
import { CartProvider } from "@/lib/cartContext";
import { Toaster } from "@/components/ui/sonner";

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAuthRoute = pathname?.startsWith("/auth");

  return (
    <SearchProvider>
      <CartProvider>
        {/* Global cinematic atmosphere — fixed, behind all content */}
        <CinematicBackground />
        <div className="relative z-10 flex min-h-full flex-col">
          {!isAuthRoute && <Navbar />}
          {children}
          {!isAuthRoute && <Footer />}
        </div>
        <Toaster />
      </CartProvider>
    </SearchProvider>
  );
}


