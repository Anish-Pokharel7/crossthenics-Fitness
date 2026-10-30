"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Award, Shield, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef } from "react";

import beltimage from "@/public/web images/belt1.jpg";
import landimage from "@/public/web images/crossthenicsfitness-20260608-0001.jpg";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" as const, delay },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.7, delay },
});

export default function Hero() {
  /* ── Mouse-tracking parallax ──────────────────────────────────────── */
  const frameRef = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springX = useSpring(rawX, { stiffness: 55, damping: 18 });
  const springY = useSpring(rawY, { stiffness: 55, damping: 18 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-5, 5]);

  const photoX = useTransform(springX, [-0.5, 0.5], [-10, 10]);
  const photoY = useTransform(springY, [-0.5, 0.5], [-6, 6]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!frameRef.current) return;
      const rect = frameRef.current.getBoundingClientRect();
      rawX.set((e.clientX - rect.left) / rect.width - 0.5);
      rawY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [rawX, rawY],
  );

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return (
    <section className="relative w-full overflow-hidden bg-page pt-32 pb-12 sm:pt-36 sm:pb-16 lg:pt-40 lg:pb-20">
      <div className="container-page relative z-10">
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-8">
          {/* LEFT SIDE — HERO COPY */}
          <div className="relative z-20 flex flex-col items-start lg:pr-8 xl:pr-12">
            {/* Badges */}
            <motion.div {...fadeIn(0.05)} className="mb-6 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-text-primary">
                Premium Fitness Equipment
              </span>

              <span className="hidden items-center gap-1.5 text-primary rounded-full border border-border-subtle bg-surface-raised px-3 py-1 text-[10px] font-bold uppercase tracking-wider sm:inline-flex">
                Dispatched from Pokhara
              </span>
            </motion.div>

            {/* MAIN HEADING */}
            <motion.h1
              {...fadeUp(0.12)}
              className="mb-6 max-w-[760px] font-black uppercase leading-[0.88] tracking-[-0.04em] text-text-primary"
              style={{ fontSize: "clamp(3.2rem, 6.5vw, 6.5rem)" }}
            >
              BUILD YOUR
              <br />
              <span className="text-[#E10600]">STRONGEST</span>
              <br />
              SELF.
            </motion.h1>

            {/* DESCRIPTION */}
            <motion.p
              {...fadeUp(0.20)}
              className="mb-8 max-w-xl text-sm leading-relaxed text-text-muted sm:text-base lg:text-[17px]"
            >
              Nepal&apos;s premier competition-tested gear. Hybrid self-locking
              belts, ballistic 900D Oxford backpacks, and magnesium chalk —
              built for athletes who refuse to settle.
            </motion.p>

            {/* BUTTONS */}
            <motion.div
              {...fadeUp(0.28)}
              className="relative mb-10 flex w-full flex-wrap gap-3 sm:w-auto"
            >
              {/* Primary CTA */}
              <Link href="/allproducts" className="w-full sm:w-auto">
                <button className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#E10600] px-8 py-4 text-xs font-black uppercase tracking-wider text-white transition-all duration-200 hover:bg-[#B80500] hover:-translate-y-0.5 shadow-md sm:w-auto">
                  <span>Explore Products</span>
                  <ArrowRight size={15} />
                </button>
              </Link>

              {/* Secondary CTA */}
              <Link href="/backpacks" className="w-full sm:w-auto">
                <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-border-subtle bg-surface-raised px-7 py-4 text-xs font-bold uppercase tracking-wider text-text-primary transition-all duration-200 hover:border-[#C0C0C0] hover:bg-surface-elevated sm:w-auto">
                  <span>Discover Crossthenics</span>
                </button>
              </Link>
            </motion.div>

            {/* ATHLETIC BRAND PILLARS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.35 }}
              className="grid w-full max-w-xl grid-cols-3 gap-3 border-t border-border-subtle pt-6 sm:gap-6"
            >
              {[
                {
                  value: "7 Provinces",
                  label: "Nationwide Dispatch",
                  icon: <Truck size={14} />,
                },
                {
                  value: "Quick-Lock",
                  label: "Steel Hardware",
                  icon: <Shield size={14} />,
                },
                {
                  value: "7 Days",
                  label: "Size Exchange",
                  icon: <Award size={14} />,
                },
              ].map((stat, i) => (
                <div key={i} className="group">
                  <div className="mb-1 flex items-center gap-1.5 text-[#E10600]">
                    {stat.icon}
                    <span className="text-[9px] font-bold uppercase tracking-wider text-text-muted">
                      {stat.label}
                    </span>
                  </div>
                  <div className="text-base font-black tracking-tight text-text-primary sm:text-lg">
                    {stat.value}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT SIDE — ATHLETIC HERO IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            className="relative z-10 flex items-center justify-center lg:justify-end"
          >
            {/* IMAGE FRAME */}
            <motion.div
              ref={frameRef}
              style={{ rotateX, rotateY, transformPerspective: 900 }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-full max-w-[470px] lg:max-w-[500px]"
            >
              {/* Clean Editorial Card */}
              <div
                className="relative overflow-hidden rounded-[24px] border border-border-subtle bg-surface-raised shadow-[0_20px_50px_rgba(0,0,0,0.50)]"
                style={{ aspectRatio: "4/5" }}
              >
                {/* Parallax image */}
                <motion.div style={{ x: photoX, y: photoY }} className="absolute inset-[-6%]">
                  <Image
                    src={landimage}
                    alt="Crossthenics Premium Fitness Equipment"
                    fill
                    priority
                    className="object-cover object-center scale-[1.05] transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </motion.div>

                {/* Subtle vignette gradient */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(28,28,28,0.85) 0%, rgba(28,28,28,0.10) 45%, transparent 70%)",
                  }}
                />

                {/* Clean Editorial Caption Tag */}
                <div className="absolute top-4 left-4 right-4 z-20">
                  <div className="flex items-center justify-between rounded-xl border border-border-subtle bg-page/90 px-4 py-3 backdrop-blur-md">
                    <div>
                      <span className="block text-[8px] font-black uppercase tracking-[0.2em] text-text-secondary">
                        Athlete Division
                      </span>
                      <span className="text-xs font-black uppercase tracking-tight text-text-primary">
                        Performance-Tested Gear
                      </span>
                    </div>

                    <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                      Pokhara • Nepal
                    </span>
                  </div>
                </div>
              </div>

              {/* FLOATING FLAGSHIP CARD */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="absolute -bottom-4 -right-3 z-30 w-28 sm:w-32"
              >
                <Link href="/allproducts" className="group block">
                  <div className="rounded-2xl border border-border-subtle bg-surface-raised p-2 shadow-xl transition-all duration-200 hover:border-[#C0C0C0] hover:scale-105">
                    <div className="relative aspect-square overflow-hidden rounded-xl bg-page">
                      <Image
                        src={beltimage}
                        alt="Hybrid Self-Locking Belt"
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="128px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/90 via-transparent to-transparent" />
                      <span className="absolute bottom-1.5 left-2 text-[8px] font-black uppercase tracking-wider text-text-secondary">
                        Lifting Belt
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
