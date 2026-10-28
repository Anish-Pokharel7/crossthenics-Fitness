"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  CreditCard,
  Truck,
  RotateCcw,
  Quote,
} from "lucide-react";

const trustPillars = [
  {
    icon: <Truck size={18} className="text-[#E10600]" />,
    value: "All 7 Provinces",
    title: "Nationwide Delivery",
    description: "Insured domestic courier dispatch from Pokhara directly to your doorstep across Nepal in 2–4 business days.",
    tag: "Tracked Dispatch",
  },
  {
    icon: <CreditCard size={18} className="text-[#E10600]" />,
    value: "Flexible & Secure",
    title: "Payment Methods",
    description: "Cash on Delivery (COD) supported nationwide, plus digital payments via eSewa, Khalti, and direct bank transfer.",
    tag: "COD Available",
  },
  {
    icon: <RotateCcw size={18} className="text-[#E10600]" />,
    value: "7-Day Window",
    title: "Sizing Exchange",
    description: "Ordered the wrong belt size or need a tighter fit? We process direct sizing exchanges within 7 business days.",
    tag: "Fit Guarantee",
  },
  {
    icon: <ShieldCheck size={18} className="text-[#E10600]" />,
    value: "High-Tensile Steel",
    title: "Hardware Craftsmanship",
    description: "Engineered with quick-release steel levers, heavy-duty 900D Oxford, and dual-reinforced nylon webbing.",
    tag: "Durable Build",
  },
];

const testimonials = [
  {
    name: "Suman Shrestha",
    role: "Powerlifter (Kathmandu)",
    gear: "Hybrid Self-Locking Belt",
    quote:
      "The locking lever mechanism is solid. Held up reliably during heavy squats without slipping. Exactly what was missing in Nepal's local gear market.",
  },
  {
    name: "Aayush Gurung",
    role: "Calisthenics Athlete (Pokhara)",
    gear: "Pro Rope Dip Belt & Chalk",
    quote:
      "The dip belt chain distribution is comfortable for weighted pull-ups. The magnesium chalk blocks give solid bar traction without crumbling to dust.",
  },
  {
    name: "Prashant K.C.",
    role: "Coach (Lalitpur)",
    gear: "45L Tactical Backpack",
    quote:
      "The 900D Oxford construction holds up to daily gym use. Fits lifting shoes, belt, bands, and gear with room to spare. Delivery to Lalitpur was fast.",
  },
];

export default function TrustSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#1C1C1C] py-24 sm:py-32 border-t border-[#414141]">
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
              Athlete Protection & Standards
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-text-primary leading-[0.95] mb-4"
          >
            BUILT FOR <span className="text-[#E10600]">PERFORMANCE.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="text-sm sm:text-base text-text-muted leading-relaxed font-normal max-w-xl"
          >
            Engineered fitness gear for lifters and calisthenics athletes across Nepal. Reliable hardware, transparent delivery, and dedicated customer support.
          </motion.p>
        </div>

        {/* ── 4 CONSOLIDATED TRUST PILLARS ──────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16 items-stretch">
          {trustPillars.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="rounded-2xl border border-[#414141] bg-[#2A2A2A] p-6 flex flex-col justify-between group hover:border-[#C0C0C0]/50 transition-all duration-200 relative shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#353535] border border-[#414141] text-[#E10600]">
                    {item.icon}
                  </div>
                  <span className="rounded-md bg-[#1C1C1C] border border-[#414141] px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-text-secondary">
                    {item.tag}
                  </span>
                </div>

                <div className="text-base sm:text-lg font-black text-text-primary mb-1">
                  {item.value}
                </div>

                <h3 className="text-xs font-black uppercase tracking-wider text-text-secondary mb-2">
                  {item.title}
                </h3>

                <p className="text-xs text-text-muted font-normal leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── ATHLETE FIELD NOTES / FEEDBACK ─────────────────────────── */}
        <div>
          <div className="text-center mb-8">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary">
              Athlete Field Reports
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 items-stretch">
            {testimonials.map((test, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 + idx * 0.08 }}
                className="rounded-2xl border border-[#414141] bg-[#2A2A2A] p-6 flex flex-col justify-between shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-text-secondary bg-[#E10600]/10 border border-[#E10600]/25 rounded-md px-2 py-0.5">
                      {test.gear}
                    </span>
                    <Quote size={14} className="text-[#414141]" />
                  </div>

                  <p className="text-xs text-text-primary font-normal leading-relaxed italic mb-5">
                    &ldquo;{test.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-3 border-t border-[#414141] flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-tight text-text-primary">
                      {test.name}
                    </h4>
                    <p className="text-[10px] text-text-muted font-normal">
                      {test.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
