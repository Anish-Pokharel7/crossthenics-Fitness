"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
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
import { useTheme } from "next-themes";

import { useAuth } from "@/lib/auth/AuthContext";
import { useCart } from "@/lib/cartContext";
import { useSearch } from "@/lib/searchContext";
import { cn } from "@/lib/utils";
import Logo from "@/public/logo/ct-logo01.png";

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

  // --------------------------------------------------
  // THEME INITIALIZATION
  // --------------------------------------------------

  useEffect(() => {
    setMounted(true);

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

  const toggleTheme = () => {
    const nextTheme = isDark ? "light" : "dark";

    setTheme(nextTheme);
    setIsDark(nextTheme === "dark");
  };

  // --------------------------------------------------
  // NAVBAR SCROLL EFFECT
  // --------------------------------------------------

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

  // --------------------------------------------------
  // MOBILE DRAWER: ESCAPE KEY
  // --------------------------------------------------

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

  // --------------------------------------------------
  // MOBILE DRAWER: BODY SCROLL LOCK
  // --------------------------------------------------

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  // --------------------------------------------------
  // CLOSE DRAWER WHEN ROUTE CHANGES
  // --------------------------------------------------

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // --------------------------------------------------
  // NAVIGATION HELPERS
  // --------------------------------------------------

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  const closeMenu = () => setIsOpen(false);

  const accountHref = isAdmin ? "/admin/dashboard" : "/auth/login";

  // --------------------------------------------------
  // SHARED NAVIGATION STYLES
  // --------------------------------------------------

  const getNavLinkClass = (active: boolean) =>
    cn(
      "relative whitespace-nowrap rounded-lg px-3 py-2",
      "text-[10px] xl:text-[11px] uppercase tracking-[0.10em]",
      "transition-all duration-200",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E10600]",
      active
        ? "font-black text-[#E10600]"
        : "font-bold text-text-muted hover:bg-surface hover:text-text-primary",
    );

  // --------------------------------------------------
  // THEME BUTTON
  // --------------------------------------------------

  const ThemeButton = ({ mobile = false }: { mobile?: boolean }) => (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      title={`Switch to ${isDark ? "light" : "dark"} theme`}
      className={cn(
        "flex shrink-0 items-center justify-center rounded-xl",
        "border border-border-subtle bg-surface text-text-primary",
        "transition-all duration-200 hover:bg-surface-elevated",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E10600]",
        mobile ? "h-10 w-10" : "h-9 w-9",
      )}
    >
      {mounted && isDark ? (
        <Sun size={16} aria-hidden="true" />
      ) : (
        <Moon size={16} aria-hidden="true" />
      )}
    </button>
  );

  // --------------------------------------------------
  // COMPONENT
  // --------------------------------------------------

  return (
    <>
      {/* ==============================================
          MAIN NAVBAR
      ============================================== */}

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
          <div
            className={cn(
              "relative mx-auto w-full rounded-2xl border",
              "border-border-subtle bg-surface-raised/95 backdrop-blur-xl",
              "shadow-[0_8px_30px_rgba(0,0,0,0.25)]",
              "transition-all duration-300",
              scrolled &&
                "bg-surface-raised/98 shadow-[0_12px_35px_rgba(0,0,0,0.30)]",
            )}
          >
            {/* TOP HIGHLIGHT */}

            <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* NAVBAR CONTENT */}

            <div className="flex h-[66px] items-center gap-3 px-3 sm:px-5 lg:px-6">
              {/* LOGO */}

              <Link
                href="/"
                aria-label="Crossthenics Fitness"
                className="group relative z-20 flex shrink-0 items-center"
              >
                <motion.div
                  whileHover={{ scale: 1.035 }}
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
                <div className="flex min-w-0 items-center gap-0.5 rounded-xl p-1">
                  {navLinks.map((link) => {
                    const active = isActive(link.href);

                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        aria-current={active ? "page" : undefined}
                        className={getNavLinkClass(active)}
                      >
                        {link.name}
                      </Link>
                    );
                  })}
                </div>
              </nav>

              {/* DESKTOP ACTIONS */}

              <div className="relative z-20 ml-auto hidden shrink-0 items-center gap-2 lg:flex">
                <ThemeButton />

                {/* SEARCH */}

                <div className="flex h-9 w-[145px] items-center overflow-hidden rounded-xl border border-border-subtle bg-page transition-colors hover:border-[#929292]/60 focus-within:border-[#929292] xl:w-[165px]">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center">
                    <Search size={14} className="text-text-muted" />
                  </div>

                  <input
                    type="text"
                    placeholder="Search gear..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    className="h-full min-w-0 flex-1 border-0 bg-transparent pr-3 text-[11px] font-medium text-text-primary outline-none placeholder:text-text-muted focus:ring-0"
                  />
                </div>

                {/* ACCOUNT */}

                <Link
                  href={accountHref}
                  aria-label="Account"
                  className="group flex h-9 shrink-0 items-center justify-center gap-2 rounded-xl border border-border-subtle bg-page px-3 text-text-primary transition-all hover:border-[#929292]/60 hover:bg-surface-elevated"
                >
                  <UserRound
                    size={14}
                    className="transition-transform group-hover:scale-105"
                  />

                  <span className="text-[10px] font-bold uppercase tracking-[0.10em]">
                    Account
                  </span>
                </Link>

                {/* CART */}

                <Link
                  href="/cart"
                  aria-label="Shopping cart"
                  className="group relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border-subtle bg-page text-text-primary transition-all hover:border-[#929292]/60 hover:bg-surface-elevated"
                >
                  <ShoppingBag
                    size={15}
                    className="transition-transform group-hover:-translate-y-0.5"
                  />

                  {mounted && totalCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#E10600] px-1 text-[9px] font-black text-white">
                      {totalCount}
                    </span>
                  )}
                </Link>

                {/* CONTACT CTA */}

                <Link
                  href="/contact"
                  className="group flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-xl bg-[#E10600] px-4 text-[10px] font-black uppercase tracking-[0.10em] text-white transition-all hover:-translate-y-0.5 hover:bg-[#B80500]"
                >
                  Contact
                  <ArrowRight
                    size={13}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              </div>

              {/* MOBILE / TABLET ACTIONS */}

              <div className="relative z-20 ml-auto flex shrink-0 items-center gap-2 lg:hidden">
                <ThemeButton mobile />

                {/* MOBILE CART */}

                <Link
                  href="/cart"
                  aria-label="Shopping cart"
                  className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-border-subtle bg-page text-text-primary transition-colors hover:bg-surface-elevated"
                >
                  <ShoppingBag size={15} />

                  {mounted && totalCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#E10600] px-1 text-[9px] font-black text-white">
                      {totalCount}
                    </span>
                  )}
                </Link>

                {/* MENU BUTTON */}

                <button
                  type="button"
                  onClick={() => setIsOpen((previous) => !previous)}
                  aria-label={isOpen ? "Close navigation" : "Open navigation"}
                  aria-expanded={isOpen}
                  aria-controls="mobile-navigation-drawer"
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-xl border",
                    "border-border-subtle bg-page text-text-primary",
                    "transition-all duration-200 hover:bg-surface-elevated",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E10600]",
                    isOpen && "border-[#E10600]/50 bg-surface-elevated",
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
                        <X size={18} />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="menu"
                        initial={{ opacity: 0, rotate: 90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: -90 }}
                      >
                        <Menu size={18} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </div>
          </div>
        </motion.header>
      </div>

      {/* ==============================================
          MOBILE RIGHT-SIDE DRAWER
      ============================================== */}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[60] lg:hidden"
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* BACKDROP */}

            <motion.button
              type="button"
              aria-label="Close navigation menu"
              onClick={closeMenu}
              variants={{
                closed: { opacity: 0 },
                open: { opacity: 1 },
              }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 h-full w-full cursor-default bg-black/65 backdrop-blur-sm"
            />

            {/* RIGHT SIDE PANEL */}

            <motion.aside
              id="mobile-navigation-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
              variants={{
                closed: { x: "100%" },
                open: { x: 0 },
              }}
              transition={{
                type: "spring",
                stiffness: 320,
                damping: 32,
                mass: 0.85,
              }}
              className={cn(
                "absolute right-0 top-0 flex h-[100dvh] w-[88%] max-w-[420px] flex-col",
                "border-l border-border-subtle bg-surface-raised",
                "shadow-[-20px_0_60px_rgba(0,0,0,0.30)]",
              )}
            >
              {/* DRAWER HEADER */}

              <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-border-subtle px-5">
                <Link
                  href="/"
                  onClick={closeMenu}
                  aria-label="Crossthenics Fitness home"
                >
                  <Image
                    src={Logo}
                    alt="Crossthenics Fitness"
                    width={140}
                    height={48}
                    priority
                    className="h-[31px] w-auto object-contain"
                  />
                </Link>

                <button
                  type="button"
                  onClick={closeMenu}
                  aria-label="Close navigation"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border-subtle bg-page text-text-primary transition-colors hover:border-[#E10600] hover:text-[#E10600]"
                >
                  <X size={19} />
                </button>
              </div>

              {/* DRAWER CONTENT */}

              <div className="flex-1 overflow-y-auto px-5 py-6">
                {/* MENU LABEL */}

                <div className="mb-4 flex items-center justify-between">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-text-muted">
                    Navigation
                  </p>

                  <span className="h-px w-12 bg-border-subtle" />
                </div>

                {/* SEARCH */}

                <div className="mb-7 flex h-12 items-center rounded-xl border border-border-subtle bg-page px-3 transition-colors focus-within:border-[#E10600]/60">
                  <Search size={16} className="mr-3 shrink-0 text-text-muted" />

                  <input
                    type="text"
                    placeholder="Search gear, backpacks..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    className="h-full w-full min-w-0 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted"
                  />
                </div>

                {/* NAVIGATION LINKS */}

                <nav aria-label="Mobile navigation">
                  <div className="space-y-1.5">
                    {navLinks.map((link, index) => {
                      const active = isActive(link.href);

                      return (
                        <motion.div
                          key={link.href}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: 0.04 + index * 0.045,
                            duration: 0.25,
                          }}
                        >
                          <Link
                            href={link.href}
                            onClick={closeMenu}
                            aria-current={active ? "page" : undefined}
                            className={cn(
                              "group flex items-center justify-between rounded-xl px-4 py-4",
                              "transition-all duration-200",
                              active
                                ? "bg-transparent font-black text-[#E10600]"
                                : "text-text-primary hover:bg-surface",
                            )}
                          >
                            <div className="flex items-center gap-3.5">
                              <span
                                className={cn(
                                  "h-1.5 w-1.5 rounded-full transition-colors",
                                  active
                                    ? "bg-[#E10600]"
                                    : "bg-text-muted/40 group-hover:bg-[#E10600]",
                                )}
                              />

                              <span
                                className={cn(
                                  "text-xs uppercase tracking-[0.12em]",
                                  active
                                    ? "font-black text-[#E10600]"
                                    : "font-bold",
                                )}
                              >
                                {link.name}
                              </span>
                            </div>

                            <ArrowRight
                              size={15}
                              className={cn(
                                "transition-all duration-200",
                                active
                                  ? "text-[#E10600]"
                                  : "text-text-muted/50 group-hover:translate-x-1 group-hover:text-[#E10600]",
                              )}
                            />
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </nav>

                {/* ACCOUNT AND CONTACT */}

                <div className="mt-8 border-t border-border-subtle pt-6">
                  <p className="mb-4 text-[10px] font-black uppercase tracking-[0.18em] text-text-muted">
                    Your account
                  </p>

                  <Link
                    href={accountHref}
                    onClick={closeMenu}
                    className="flex h-12 items-center justify-center gap-2 rounded-xl border border-border-subtle bg-page text-xs font-bold uppercase tracking-[0.10em] text-text-primary transition-colors hover:bg-surface-elevated"
                  >
                    <UserRound size={15} />
                    Account
                  </Link>

                  <Link
                    href="/contact"
                    onClick={closeMenu}
                    className="mt-3 flex h-12 items-center justify-center gap-2 rounded-xl bg-[#E10600] text-xs font-black uppercase tracking-[0.12em] text-white transition-all hover:bg-[#B80500]"
                  >
                    Contact Crossthenics
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>

              {/* DRAWER FOOTER */}

              <div className="shrink-0 border-t border-border-subtle px-5 py-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.12em] text-text-primary">
                      CROSTHENICS FITNESS
                    </p>

                    <p className="mt-1 text-[10px] text-text-muted">
                      Built for strength. Designed for athletes.
                    </p>
                  </div>

                  <span className="h-2 w-2 rounded-full bg-[#E10600]" />
                </div>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
