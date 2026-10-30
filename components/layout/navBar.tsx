"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  LayoutDashboard,
  Menu,
  Moon,
  Search,
  ShoppingBag,
  Sun,
  UserRound,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { useAuth } from "@/lib/auth/AuthContext";
import { useCart } from "@/lib/cartContext";
import { useSearch } from "@/lib/searchContext";
import { cn } from "@/lib/utils";
import Logo from "@/public/logo/ct-logo01.png";
import { useTheme } from "next-themes";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Our Story", href: "/our-story" },
  { name: "Build Setup", href: "/build-setup" },
  { name: "Products", href: "/allproducts" },
  { name: "Backpacks", href: "/backpacks" },
  { name: "Latest Drops", href: "/latestproducts" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const { setTheme } = useTheme();
  const pathname = usePathname();

  const { search, setSearch } = useSearch();
  const { isAdmin } = useAuth();
  const { totalCount } = useCart();

  // Prevent theme-dependent hydration mismatches.
  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      setMounted(true);
    });

    return () => cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    const syncTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    syncTheme();
    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Navbar scroll behavior.
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu using Escape.
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Close mobile menu when navigating.
  useEffect(() => {
    const timeoutId = window.setTimeout(() => setIsOpen(false), 0);
    return () => window.clearTimeout(timeoutId);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  const toggleTheme = () => {
    const nextTheme = document.documentElement.classList.contains("dark")
      ? "light"
      : "dark";
    setTheme(nextTheme);
    setIsDark(nextTheme === "dark");
  };

  // Shared navigation typography.
  const getNavLinkClass = (active: boolean) =>
    cn(
      "relative whitespace-nowrap rounded-lg px-3 py-2",
      "text-[10px] xl:text-[11px] uppercase tracking-[0.10em]",
      "transition-colors duration-200",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E10600]",
      active
        ? "font-black text-[#E10600]"
        : "font-bold text-text-muted hover:text-[#E10600]",
    );

  return (
    <div className="container-page pointer-events-none fixed inset-x-0 top-0 z-50 pt-3 sm:pt-4">
      <motion.header
        initial={{ y: -25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.45,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="pointer-events-auto relative w-full"
      >
        {/* NAVBAR CONTAINER */}
        <div
          className={cn(
            "relative mx-auto min-h-[66px] overflow-visible rounded-2xl border transition-all duration-300",
            "border-border-subtle bg-surface-raised/95 backdrop-blur-md",
            "shadow-[0_8px_24px_rgba(0,0,0,0.40)]",
            scrolled &&
              "bg-surface-raised/98 border-border-subtle shadow-[0_12px_32px_rgba(0,0,0,0.25)]",
          )}
        >
          {/* Subtle top highlight */}
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* NAVBAR CONTENT */}
          <div className="flex h-[66px] items-center gap-2 px-3 sm:px-5 lg:px-6">
            {/* LOGO */}
            <Link
              href="/"
              aria-label="Crossthenics Fitness"
              className="group relative z-20 flex shrink-0 items-center"
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src={Logo}
                  alt="Crossthenics Fitness"
                  width={140}
                  height={48}
                  priority
                  className="h-[30px] w-auto object-contain sm:h-[33px]"
                />
              </motion.div>
            </Link>

            {/* DESKTOP NAVIGATION */}
            <nav
              aria-label="Main navigation"
              className="hidden min-w-0 flex-1 items-center justify-center lg:flex"
            >
              <div className="flex min-w-0 max-w-full items-center gap-1 rounded-xl p-1">
                {navLinks.map((link) => {
                  const active = isActive(link.href);

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={getNavLinkClass(active)}
                    >
                      <span className="relative z-10">{link.name}</span>
                    </Link>
                  );
                })}
              </div>
            </nav>

            {/* DESKTOP ACTIONS */}
            <div className="relative z-20 hidden shrink-0 items-center gap-1.5 md:flex xl:gap-2">
              {/* THEME TOGGLE */}
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
                title={`Switch to ${isDark ? "light" : "dark"} theme`}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border-subtle bg-surface text-text-primary transition-colors hover:bg-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E10600]"
              >
                {mounted && isDark ? (
                  <Sun size={16} aria-hidden="true" />
                ) : (
                  <Moon size={16} aria-hidden="true" />
                )}
              </button>

              {/* SEARCH */}
              <div className="flex h-9 w-9 shrink-0 items-center overflow-hidden rounded-xl border border-border-subtle bg-page transition-all duration-200 hover:border-[#929292]/60 focus-within:border-[#929292] focus-within:ring-0 focus-within:outline-none xl:w-[145px] 2xl:w-[165px]">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center">
                  <Search
                    size={14}
                    strokeWidth={2}
                    className="text-text-muted"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Search gear..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="hidden min-w-0 flex-1 border-0 bg-transparent pr-3 text-[11px] font-medium text-text-primary outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0 focus-visible:outline-none placeholder:text-text-muted xl:block"
                />
              </div>

              {/* ACCOUNT */}
              <Link
                href="/auth/login"
                aria-label="Account"
                className="group flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border-subtle bg-page text-text-primary transition-all duration-200 hover:border-[#929292]/60 hover:bg-surface-elevated xl:h-9 xl:w-auto xl:px-3.5"
              >
                <UserRound
                  size={14}
                  strokeWidth={2}
                  className="transition-transform duration-200 group-hover:scale-105"
                />

                <span className="ml-2 hidden text-[10px] font-bold uppercase tracking-[0.10em] xl:inline">
                  Account
                </span>
              </Link>

              {/* CART */}
              <Link
                href="/cart"
                aria-label="Shopping cart"
                className="group relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border-subtle bg-page text-text-primary transition-all duration-200 hover:border-[#929292]/60 hover:bg-surface-elevated"
              >
                <ShoppingBag
                  size={15}
                  strokeWidth={2}
                  className="transition-transform duration-200 group-hover:-translate-y-0.5"
                />

                {mounted && totalCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#E10600] px-1 text-[9px] font-black text-white">
                    {totalCount}
                  </span>
                )}
              </Link>

              {/* CONTACT CTA */}
              <Link
                href="/contact"
                aria-label="Contact"
                className="group flex h-9 shrink-0 items-center justify-center rounded-xl bg-[#E10600] px-3.5 text-[10px] font-black uppercase tracking-[0.10em] text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#B80500] xl:gap-1.5 xl:px-4"
              >
                <span>Contact</span>

                <ArrowRight
                  size={13}
                  strokeWidth={2.2}
                  className="hidden transition-transform duration-200 group-hover:translate-x-0.5 sm:inline"
                />
              </Link>
            </div>

            {/* MOBILE ACTIONS */}
            <div className="relative z-30 ml-auto flex items-center gap-2 md:hidden">
              {/* MOBILE THEME TOGGLE */}
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
                title={`Switch to ${isDark ? "light" : "dark"} theme`}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border-subtle bg-surface text-text-primary transition-colors hover:bg-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E10600]"
              >
                {mounted && isDark ? (
                  <Sun size={16} aria-hidden="true" />
                ) : (
                  <Moon size={16} aria-hidden="true" />
                )}
              </button>

              {/* MOBILE CART */}
              <Link
                href="/cart"
                aria-label="Shopping cart"
                className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-border-subtle bg-page text-text-primary transition-colors hover:bg-surface-elevated"
              >
                <ShoppingBag size={15} strokeWidth={2} />

                {mounted && totalCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#E10600] px-1 text-[9px] font-black text-white">
                    {totalCount}
                  </span>
                )}
              </Link>

              {/* MOBILE MENU BUTTON */}
              <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-label={isOpen ? "Close navigation" : "Open navigation"}
                aria-expanded={isOpen}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-xl border",
                  "border-border-subtle bg-page text-text-primary",
                  "transition-all duration-200 hover:bg-surface-elevated",
                  isOpen && "bg-surface-elevated border-[#929292]/50",
                )}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isOpen ? (
                    <motion.span
                      key="close"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                    >
                      <X size={17} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="menu"
                      initial={{ opacity: 0, rotate: 90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: -90 }}
                    >
                      <Menu size={17} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>

          {/* MOBILE DROPDOWN */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.99 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-40 mx-2 mb-2 overflow-hidden rounded-xl border border-border-subtle bg-surface-raised p-3 shadow-[0_20px_50px_rgba(0,0,0,0.25)] md:hidden"
              >
                {/* MOBILE SEARCH */}
                <div className="mb-3 flex items-center rounded-xl border border-border-subtle bg-page px-3">
                  <Search
                    size={14}
                    strokeWidth={2}
                    className="mr-2.5 shrink-0 text-text-muted"
                  />

                  <input
                    type="text"
                    placeholder="Search gear, backpacks..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-10 w-full min-w-0 bg-transparent text-xs font-medium text-text-primary outline-none placeholder:text-text-muted"
                  />
                </div>

                {/* MOBILE LINKS */}
                <nav aria-label="Mobile navigation">
                  <div className="space-y-1">
                    {navLinks.map((link) => {
                      const active = isActive(link.href);

                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "group flex items-center justify-between rounded-xl border border-transparent px-3.5 py-3 transition-colors duration-200",
                            active
                              ? "font-black text-[#E10600]"
                              : "font-bold text-text-muted hover:text-[#E10600]",
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={cn(
                                "h-1.5 w-1.5 rounded-full transition-colors",
                                active
                                  ? "bg-[#E10600]"
                                  : "bg-[#777777] group-hover:bg-[#E10600]",
                              )}
                            />

                            <span className="text-xs uppercase tracking-[0.10em]">
                              {link.name}
                            </span>
                          </div>

                          <ArrowRight
                            size={13}
                            className={cn(
                              "transition-all duration-200",
                              active
                                ? "text-[#E10600]"
                                : "text-text-muted/50 group-hover:translate-x-0.5 group-hover:text-[#E10600]",
                            )}
                          />
                        </Link>
                      );
                    })}
                  </div>
                </nav>

                {/* MOBILE BUTTONS */}
                <div className="mt-3 grid grid-cols-2 gap-2 border-t border-border-subtle pt-3">
                  <Link
                    href="/auth/login"
                    onClick={() => setIsOpen(false)}
                    className="flex h-10 items-center justify-center gap-2 rounded-xl border border-border-subtle bg-page text-[10px] font-bold uppercase tracking-[0.10em] text-text-primary transition-colors hover:bg-surface-elevated"
                  >
                    <UserRound size={13} />
                    Account
                  </Link>

                  <Link
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    className="flex h-10 items-center justify-center gap-2 rounded-xl bg-[#E10600] text-[10px] font-black uppercase tracking-[0.10em] text-white transition-colors hover:bg-[#B80500]"
                  >
                    Contact
                  </Link>

                  {mounted && isAdmin && (
                    <Link
                      href="/admin/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="col-span-2 flex h-10 items-center justify-center gap-2 rounded-xl border border-border-subtle bg-page text-[10px] font-bold uppercase tracking-[0.10em] text-text-primary transition-colors hover:bg-surface-elevated"
                    >
                      <LayoutDashboard size={13} />
                      Admin Dashboard
                    </Link>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
    </div>
  );
}

export default Navbar;
