"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo/ct-logo01.png";
import { ShieldCheck, Truck, RotateCcw, ArrowRight, Mail, Phone, MapPin, CheckCircle2, Camera } from "lucide-react";
import { toast } from "sonner";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setSubscribed(true);
    toast.success("Subscribed to Drop Alerts!", {
      description: `Updates will be sent to ${email}`,
    });
    setEmail("");
  };

  return (
    <footer className="relative overflow-hidden border-t border-[#414141] bg-[#242424] text-text-muted">
      {/* Trust Highlights Bar */}
      <div className="border-b border-[#414141] bg-[#1C1C1C]/40">
        <div className="container-page grid grid-cols-1 gap-6 py-6 sm:py-8 md:grid-cols-3">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#414141] bg-[#2A2A2A] text-[#E10600]">
              <Truck size={20} />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-text-primary">
                All 7 Provinces
              </h4>
              <p className="text-xs text-text-muted">
                Insured domestic courier dispatch from Pokhara
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#414141] bg-[#2A2A2A] text-[#E10600]">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-text-primary">
                High-Tensile Hardware
              </h4>
              <p className="text-xs text-text-muted">
                Quick-lock steel buckles & 900D Oxford
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#414141] bg-[#2A2A2A] text-[#E10600]">
              <RotateCcw size={20} />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-text-primary">
                7-Day Sizing Exchange
              </h4>
              <p className="text-xs text-text-muted">
                Hassle-free size replacement support
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-page relative pt-14 pb-10">
        <div className="grid gap-8 sm:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand & Vision (2 Cols on lg) */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block group">
              <div className="flex items-center gap-3">
                <Image
                  src={logo}
                  alt="Crossthenics Fitness"
                  width={140}
                  height={48}
                  className="h-8 sm:h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                />
              </div>
            </Link>
            <p className="mt-4 text-xs sm:text-sm leading-relaxed text-text-muted max-w-sm">
              Dedicated athletic training equipment designed for strength athletes, calisthenics purists, and lifters across Nepal.
            </p>

            {/* Direct Contact Summary */}
            <div className="mt-5 space-y-2 text-xs text-text-muted">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-[#E10600] shrink-0" />
                <span>Pokhara, Gandaki, Nepal</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-[#E10600] shrink-0" />
                <a href="tel:+9779804165664" className="hover:text-text-primary transition-colors">
                  +977 9804165664
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-[#E10600] shrink-0" />
                <a href="mailto:crossthenicfitness522@gmail.com" className="hover:text-text-primary transition-colors break-all">
                  crossthenicfitness522@gmail.com
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-5 flex items-center gap-2.5">
              <a
                href="https://www.facebook.com/crossthenicsfitness"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#414141] bg-[#1C1C1C] text-text-muted transition-colors duration-200 hover:border-[#C0C0C0] hover:bg-[#353535] hover:text-text-primary"
                aria-label="Facebook"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/crossthenicsfitness"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#414141] bg-[#1C1C1C] text-text-muted transition-colors duration-200 hover:border-[#C0C0C0] hover:bg-[#353535] hover:text-text-primary"
                aria-label="Instagram"
              >
                <Camera size={16} aria-hidden="true" />
              </a>
              <a
                href="https://wa.me/9779804165664"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#414141] bg-[#1C1C1C] text-text-muted transition-colors duration-200 hover:border-[#C0C0C0] hover:bg-[#353535] hover:text-text-primary"
                aria-label="WhatsApp"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 1: Shop */}
          <div>
            <h3 className="mb-3 text-xs font-black uppercase tracking-wider text-text-primary">
              Shop Gear
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/allproducts" className="transition-colors hover:text-text-primary">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/backpacks" className="transition-colors hover:text-text-primary">
                  Tactical 45L Packs
                </Link>
              </li>
              <li>
                <Link href="/latestproducts" className="transition-colors hover:text-text-primary">
                  Latest Drops
                </Link>
              </li>
              <li>
                <Link href="/cart" className="transition-colors hover:text-text-primary">
                  My Gear Bag
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Policies */}
          <div>
            <h3 className="mb-3 text-xs font-black uppercase tracking-wider text-text-primary">
              Policies
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/shipping" className="transition-colors hover:text-text-primary">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href="/refund" className="transition-colors hover:text-text-primary">
                  7-Day Return & Exchange
                </Link>
              </li>
              <li>
                <Link href="/terms" className="transition-colors hover:text-text-primary">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Drop Alerts & Newsletter */}
          <div>
            <h3 className="mb-3 text-xs font-black uppercase tracking-wider text-text-primary">
              Drop Alerts
            </h3>
            <p className="text-xs text-text-muted mb-3 leading-relaxed">
              Receive notifications when new belt batches, dip straps, or tactical colors land.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 rounded-xl bg-[#2A2A2A] border border-[#414141] p-3 text-xs text-text-primary">
                <CheckCircle2 size={15} className="shrink-0 text-[#E10600]" />
                <span>You&apos;re subscribed to drop alerts.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    aria-label="Email address for drop alerts"
                    className="w-full rounded-xl border border-[#414141] bg-[#1C1C1C] px-3 py-2 text-xs text-text-primary placeholder:text-text-muted outline-none focus:border-[#C0C0C0]"
                  />
                  <button
                    type="submit"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#E10600] text-white transition-colors hover:bg-[#B80500]"
                    aria-label="Subscribe to drop alerts"
                  >
                    <ArrowRight size={14} />
                  </button>
                </div>
                <p className="text-[10px] text-text-muted">
                  Direct notifications only. No spam. Unsubscribe anytime.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-[#414141] pt-6 text-xs text-text-muted">
          <p>© {currentYear} Crossthenics Fitness. Pokhara, Nepal. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E10600]" />
              Shipping to All 7 Provinces
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
