import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Story | Crossthenics Fitness",
  description:
    "Learn about Crossthenics Fitness and its focus on training equipment for athletes in Nepal.",
};

export default function OurStoryPage() {
  return (
    <main className="min-h-screen bg-page px-4 pb-24 pt-32 text-text-primary sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[90rem]">
        <header className="max-w-4xl border-b border-border-subtle pb-10 sm:pb-14">
          <span className="mb-4 inline-flex rounded-full border border-[#E10600]/25 bg-[#E10600]/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em]">
            Crossthenics Fitness
          </span>
          <h1 className="text-5xl font-black uppercase leading-[0.94] tracking-tight sm:text-7xl">
            Built around <span className="text-[#E10600]">the athlete.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
            Crossthenics brings together training equipment for strength work,
            calisthenics, grip, and the gear athletes carry to the gym.
          </p>
        </header>

        <section className="grid gap-10 py-10 sm:py-14 lg:grid-cols-[0.7fr_1.3fr]">
          <h2 className="text-sm font-black uppercase tracking-[0.18em] text-[#E10600]">
            Performance gear with an athlete&apos;s identity
          </h2>
          <div className="max-w-3xl space-y-5 text-sm leading-relaxed text-text-secondary sm:text-base">
            <p>
              Training asks for consistency. The equipment around it should be
              practical, clear about what it does, and ready to fit into the
              athlete&apos;s routine.
            </p>
            <p>
              Our catalog brings together lifting belts, gym and tactical
              carry, calisthenics accessories, and grip products. We aim to make
              it easier to find the right gear and understand the product
              details before choosing.
            </p>
            <p>
              The experience is built around a simple idea: help athletes
              discover equipment for their training, then make it straightforward
              to put a useful setup together.
            </p>
          </div>
        </section>

        <section className="grid gap-4 border-t border-border-subtle pt-8 sm:grid-cols-2">
          <Link
            href="/gear-finder"
            className="group rounded-xl border border-border-subtle bg-surface-raised p-6 transition-colors hover:border-[#929292]"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.16em] text-text-muted">
              Start with your training
            </span>
            <span className="mt-2 flex items-center justify-between text-xl font-black uppercase">
              Find your gear
              <span className="text-[#E10600] transition-transform group-hover:translate-x-1">
                →
              </span>
            </span>
          </Link>
          <Link
            href="/build-setup"
            className="group rounded-xl border border-border-subtle bg-surface-raised p-6 transition-colors hover:border-[#929292]"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.16em] text-text-muted">
              Combine catalog essentials
            </span>
            <span className="mt-2 flex items-center justify-between text-xl font-black uppercase">
              Build your setup
              <span className="text-[#E10600] transition-transform group-hover:translate-x-1">
                →
              </span>
            </span>
          </Link>
        </section>
      </div>
    </main>
  );
}
