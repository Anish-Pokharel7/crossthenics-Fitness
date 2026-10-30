"use client";

import bagImage from "@/public/web images/bag.jpg";
import beltImage from "@/public/web images/belt1.jpg";
import chalkImage from "@/public/web images/chalk.jpg";
import sideImage from "@/public/web images/side.jpg";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Dumbbell,
  Flame,
  Layers,
  Shield,
  ShieldCheck,
  Truck,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Service() {
  return (
    <section className="relative w-full overflow-hidden bg-section-alt py-24 sm:py-32 border-t border-border-subtle">
      <div className="container-page relative z-10">
        {/* ── SECTION HEADER ────────────────────────────────────────── */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#E10600]/30 bg-[#E10600]/10 px-3.5 py-1 mb-4"
          >
            <span className="text-[10px] font-black uppercase tracking-widest text-text-primary">
              Engineered Standards
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter text-text-primary leading-[0.95] mb-4"
          >
            EVERYTHING YOU NEED TO
          <span className="text-[#E10600]"> DOMINATE</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="text-sm sm:text-base text-text-muted leading-relaxed font-normal max-w-xl"
          >
            Built for competition athletes and calisthenics purists. Zero
            compromises on fabric, hardware, or durability.
          </motion.p>
        </div>

        {/* ── ASYMMETRICAL BENTO GRID ─────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-stretch mb-20">
          {/* ── CARD 1: Premium Equipment (7 Cols) ─ */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="md:col-span-7 rounded-2xl border border-border-subtle bg-surface-raised p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between group shadow-[0_6px_20px_rgba(0,0,0,0.35)] transition-all duration-200 hover:border-[#C0C0C0]/50"
          >
            <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none overflow-hidden">
              <Image
                src={beltImage}
                alt="Premium Equipment"
                fill
                sizes="(max-width: 768px) 50vw, 35vw"
                className="object-cover object-center scale-105 group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#2A2A2A] via-[#2A2A2A]/80 to-transparent" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-elevated border border-border-subtle text-[#E10600]">
                  <Dumbbell size={22} />
                </div>
                <span className="rounded-md border border-[#E10600]/40 bg-page px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-text-secondary">
                  Competition Grade
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-text-primary mb-2 group-hover:text-text-secondary transition-colors duration-200">
                Premium Equipment
              </h3>
              <p className="text-xs sm:text-sm text-text-muted max-w-sm leading-relaxed font-normal">
                Hybrid self-locking belts with stainless steel quick-release
                lever mechanisms and 1000D nylon outer wraps.
              </p>
            </div>

            <div className="relative z-10 mt-6 pt-5 border-t border-border-subtle flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-text-muted flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-[#E10600]" />
                Steel Quick-Release
              </span>
              <Link href="/allproducts">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-text-primary group-hover:text-text-secondary transition-colors">
                  <span>Explore</span>
                  <ArrowRight
                    size={13}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            </div>
          </motion.div>

          {/* ── CARD 2: Tactical & Training Accessories (5 Cols) ─ */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="md:col-span-5 rounded-2xl border border-border-subtle bg-surface-raised p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between group shadow-[0_6px_20px_rgba(0,0,0,0.35)] transition-all duration-200 hover:border-[#C0C0C0]/50"
          >
            <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none overflow-hidden">
              <Image
                src={bagImage}
                alt="Fitness Accessories"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover object-center scale-105 group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#2A2A2A] via-[#2A2A2A]/80 to-transparent" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-elevated border border-border-subtle text-[#E10600]">
                  <Zap size={22} />
                </div>
                <span className="rounded-md border border-border-subtle bg-page px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-text-secondary">
                  Daily & Training
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-text-primary mb-2 group-hover:text-text-secondary transition-colors duration-200">
                Fitness Accessories
              </h3>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-normal">
                45L Ballistic 900D Oxford backpacks, ergonomic side bags, and
                heavy-duty straps for athletes.
              </p>
            </div>

            <div className="relative z-10 mt-6 pt-5 border-t border-border-subtle flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-text-muted flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-[#E10600]" />
                900D Oxford
              </span>
              <Link href="/backpacks">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-text-primary group-hover:text-text-secondary transition-colors">
                  <span>Explore</span>
                  <ArrowRight
                    size={13}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            </div>
          </motion.div>

          {/* ── CARD 3: Grip Fuel (5 Cols) ─ */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="md:col-span-5 rounded-2xl border border-border-subtle bg-surface-raised p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between group shadow-[0_6px_20px_rgba(0,0,0,0.35)] transition-all duration-200 hover:border-[#C0C0C0]/50"
          >
            <div className="absolute right-0 top-0 bottom-0 w-2/3 opacity-20 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none overflow-hidden">
              <Image
                src={chalkImage}
                alt="Grip & Performance"
                fill
                sizes="(max-width: 768px) 50vw, 30vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#2A2A2A] via-[#2A2A2A]/80 to-transparent" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-elevated border border-border-subtle text-[#E10600]">
                  <Flame size={22} />
                </div>
                <span className="rounded-md border border-border-subtle bg-page px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-text-secondary">
                  Max Traction
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-text-primary mb-2 group-hover:text-text-secondary transition-colors duration-200">
                Grip & Performance
              </h3>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-normal">
                Magnesium carbonate chalk blocks for secure bar, ring, and
                competition grip.
              </p>
            </div>

            <div className="relative z-10 mt-6 pt-5 border-t border-border-subtle flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-text-muted flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-[#E10600]" />
                Pure Magnesium
              </span>
              <Link href="/allproducts">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-text-primary group-hover:text-text-secondary transition-colors">
                  <span>Explore</span>
                  <ArrowRight
                    size={13}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            </div>
          </motion.div>

          {/* ── CARD 4: Nationwide Delivery (7 Cols) ─ */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.32 }}
            className="md:col-span-7 rounded-2xl border border-border-subtle bg-surface-raised p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between group shadow-[0_6px_20px_rgba(0,0,0,0.35)] transition-all duration-200 hover:border-[#C0C0C0]/50"
          >
            <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none overflow-hidden">
              <Image
                src={sideImage}
                alt="Nationwide Delivery"
                fill
                sizes="(max-width: 768px) 50vw, 35vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#2A2A2A] via-[#2A2A2A]/80 to-transparent" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-elevated border border-border-subtle text-[#E10600]">
                  <Truck size={22} />
                </div>
                <span className="rounded-md border border-[#E10600]/40 bg-page px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-text-secondary flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#E10600]" />
                  All 7 Provinces
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-text-primary mb-2 group-hover:text-text-secondary transition-colors duration-200">
                Nationwide Delivery
              </h3>
              <p className="text-xs sm:text-sm text-text-muted max-w-md leading-relaxed font-normal">
                Dispatched from our Pokhara facility to your doorstep across
                Nepal with size exchange support.
              </p>
            </div>

            <div className="relative z-10 mt-6 pt-5 border-t border-border-subtle flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-text-muted flex items-center gap-1.5">
                <ShieldCheck size={13} className="text-[#E10600]" />
                Tracked Transit
              </span>
              <Link href="/shipping">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-text-primary group-hover:text-text-secondary transition-colors">
                  <span>Policy</span>
                  <ArrowRight
                    size={13}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* ── EDITORIAL COLLAGE SHOWCASE ───────────── */}
        <div className="rounded-2xl bg-page p-6 sm:p-10 lg:p-12 border border-border-subtle shadow-[0_16px_40px_rgba(0,0,0,0.18)] relative overflow-hidden">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Narrative (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface-raised px-3 py-1 text-[10px] font-black uppercase tracking-widest text-text-secondary mb-4">
                <Layers size={12} />
                <span>Tactical Issue #01</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tighter text-text-primary leading-[0.95] mb-4">
                BALLISTIC 900D <span className="text-[#E10600]">SERIES.</span>
              </h3>

              <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-normal mb-6">
                Engineered for serious athletes, daily training, and multi-day
                competitions. Features water-resistant Oxford 900D fabric,
                separate vented shoe chambers, and heavy-duty MOLLE webbing.
              </p>

              {/* Spec Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full mb-8">
                {[
                  { label: "Water-Resistant 900D Oxford" },
                  { label: "180° Lay-Flat Opening" },
                  { label: "Velcro Patch Zones" },
                  { label: "Reinforced Carry Straps" },
                ].map((spec, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-xs font-medium text-text-primary"
                  >
                    <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#E10600]/20 text-[#E10600] shrink-0">
                      <CheckCircle2 size={11} />
                    </div>
                    <span>{spec.label}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <Link href="/backpacks" className="w-full sm:w-auto">
                  <button className="flex items-center justify-center gap-2 rounded-xl bg-[#E10600] px-6 py-3.5 text-xs font-black uppercase tracking-wider text-white transition-colors duration-200 hover:bg-[#B80500] w-full sm:w-auto shadow-sm">
                    <span>Explore 45L Packs</span>
                    <ArrowRight size={14} />
                  </button>
                </Link>
                <Link href="/allproducts" className="w-full sm:w-auto">
                  <button className="flex items-center justify-center gap-2 rounded-xl border border-border-subtle bg-surface-raised px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-text-primary transition-colors duration-200 hover:border-[#C0C0C0] hover:bg-surface-elevated w-full sm:w-auto">
                    <span>Full Catalog</span>
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Collage (7 Cols) */}
            <div className="lg:col-span-7 relative flex items-center justify-center py-4">
              <div className="relative w-full max-w-[500px]">
                {/* 1. Primary Image Frame */}
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border-subtle bg-surface-raised shadow-lg group">
                  <Image
                    src={bagImage}
                    alt="45L Tactical Military Backpack"
                    fill
                    priority
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 500px"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/90 via-transparent to-black/30" />

                  {/* Top-Right Badge */}
                  <div className="absolute top-3.5 right-3.5 z-10 rounded-lg bg-page/85 px-3 py-1 border border-border-subtle text-[9px] font-black uppercase tracking-wider text-text-primary">
                    <span className="text-[#E10600] mr-1">●</span> 45L Tactical
                    Edition
                  </div>

                  {/* Bottom Caption Tag */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between">
                    <div>
                      <span className="text-[8px] font-black uppercase tracking-[0.2em] text-text-secondary block mb-0.5">
                        Fabric Specification
                      </span>
                      <h4 className="text-xs sm:text-sm font-black uppercase tracking-tight text-text-primary">
                        900D Ballistic Oxford
                      </h4>
                    </div>
                    <span className="rounded-md border border-border-subtle bg-page px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-text-secondary">
                      Rs. 7,500
                    </span>
                  </div>
                </div>

                {/* 2. Smaller Overlapping Image */}
                <Link href="/products/5">
                  <div className="absolute -bottom-4 -left-3 sm:-bottom-6 sm:-left-6 z-20 w-36 sm:w-48 aspect-square overflow-hidden rounded-xl border border-border-subtle bg-surface-raised shadow-xl group cursor-pointer transition-transform duration-200 hover:scale-105">
                    <Image
                      src={sideImage}
                      alt="Ergonomic Side Bag"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="200px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/95 via-transparent to-transparent" />

                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between">
                      <div>
                        <span className="text-[7px] font-black uppercase tracking-wider text-text-secondary block">
                          Compact Carry
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-tight text-text-primary">
                          Ergonomic Side Bag
                        </span>
                      </div>
                      <div className="h-5 w-5 rounded-md bg-[#E10600] flex items-center justify-center text-white">
                        <ArrowRight size={10} />
                      </div>
                    </div>
                  </div>
                </Link>

                {/* 3. Floating Statistics Badge */}
                <div className="absolute -top-4 -right-2 sm:-top-6 sm:-right-4 z-20 rounded-xl bg-surface-raised p-3 sm:p-4 border border-border-subtle shadow-xl max-w-[190px] sm:max-w-[210px]">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-surface-elevated border border-border-subtle text-[#E10600]">
                      <Shield size={12} />
                    </div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-text-secondary">
                      Heavy-Duty
                    </span>
                  </div>

                  <div className="text-lg sm:text-xl font-black text-text-primary">
                    45 Liters
                  </div>
                  <p className="text-[9px] text-text-muted font-normal leading-tight mt-0.5">
                    Dual compartment & footwear section.
                  </p>

                  <div className="mt-2.5 pt-2 border-t border-border-subtle flex items-center justify-between text-[8px] font-bold uppercase tracking-wider text-text-muted">
                    <span>Durability</span>
                    <span className="text-text-primary font-black">Tested</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
