"use client";

import bagImage from "@/public/web images/bag.jpg";
import beltImage from "@/public/web images/belt1.jpg";
import chalkImage from "@/public/web images/chalk.jpg";
import athleteImage from "@/public/web images/crossthenicsfitness-20260608-0001.jpg";
import { motion } from "framer-motion";
import { ArrowRight, Dumbbell, Flame, Shield, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    id: "equipment",
    name: "Equipment",
    tagline: "Hybrid Belts & Steel Quick-Locks",
    count: "12+ Gear Items",
    badge: "Competition Ready",
    icon: <Dumbbell size={16} />,
    image: beltImage,
    href: "/allproducts",
  },
  {
    id: "accessories",
    name: "Tactical & Bags",
    tagline: "45L Ballistic Oxford & EDC Packs",
    count: "8+ Models",
    badge: "900D Military",
    icon: <Shield size={16} />,
    image: bagImage,
    href: "/backpacks",
  },
  {
    id: "grip",
    name: "Grip & Fuel",
    tagline: "Magnesium Chalk Blocks & Powder",
    count: "Pure Traction",
    badge: "Zero Slip",
    icon: <Flame size={16} />,
    image: chalkImage,
    href: "/allproducts",
  },
  {
    id: "apparel",
    name: "Athlete Wear",
    tagline: "Custom Velcro Patches & Gear",
    count: "Competition",
    badge: "Battle Tested",
    icon: <ShoppingBag size={16} />,
    image: athleteImage,
    href: "/allproducts",
  },
];

export default function CategorySection() {
  return (
    <section className="relative w-full overflow-hidden bg-section-alt section-padding border-t border-border-subtle">
      <div className="container-page relative z-10">
        {/* -- SECTION HEADER ------------------------------------------ */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#E10600]/30 bg-[#E10600]/10 px-3.5 py-1 mb-4"
          >
            <span className="text-[10px] font-black uppercase tracking-widest text-text-primary">
              Browse By Category
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter text-text-primary leading-[0.95] mb-4"
          >
            DISCOVER THE <span className="text-[#E10600]">ARSENAL.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="text-sm sm:text-base text-text-muted leading-relaxed font-normal max-w-xl"
          >
            Precision-crafted for maximum performance. Select a category to explore competition-grade gear.
          </motion.p>
        </div>

        {/* -- 4 CATEGORY CARDS GRID ------------------------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 items-stretch">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="relative overflow-hidden rounded-2xl border border-border-subtle hover:border-[#C0C0C0]/60 shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-all duration-300 group aspect-[3/4] flex flex-col justify-between p-5 sm:p-6 bg-surface-raised"
            >
              {/* Background Image with subtle zoom */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />

                {/* Layered Charcoal Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C] via-[#1C1C1C]/60 to-black/30" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#1C1C1C]/70 via-transparent to-transparent" />
              </div>

              {/* Top Header Badge Pill */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="rounded-lg px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-white bg-[#1C1C1C]/85 border border-[#414141] backdrop-blur-md">
                  {cat.badge}
                </span>

                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1C1C1C]/85 text-[#C0C0C0] border border-[#414141] group-hover:text-white group-hover:border-[#E10600]/40 transition-colors">
                  {cat.icon}
                </div>
              </div>

              {/* Bottom Content Panel */}
              <div className="relative z-10 pt-4">
                <span className="text-[9px] font-black uppercase tracking-widest text-[#C0C0C0] block mb-1">
                  {cat.count}
                </span>

                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white mb-1 group-hover:text-[#C0C0C0] transition-colors duration-200">
                  {cat.name}
                </h3>

                <p className="text-xs text-[#D6D6D6] font-normal leading-relaxed mb-4 line-clamp-2">
                  {cat.tagline}
                </p>

                {/* Action Button */}
                <Link href={cat.href} className="block w-full">
                  <div className="flex items-center justify-between rounded-xl bg-[#1C1C1C] px-3.5 py-2.5 border border-[#414141] group-hover:border-[#E10600] group-hover:bg-[#E10600] transition-all duration-200">
                    <span className="text-xs font-bold uppercase tracking-wider text-white group-hover:text-white">
                      Explore
                    </span>
                    <ArrowRight size={14} className="text-[#C0C0C0] group-hover:text-white transition-transform duration-200 group-hover:translate-x-0.5" />
                  </div>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
