import GearFinder from "@/components/sections/GearFinder";
import Hero from "@/components/sections/Hero";
import CategorySection from "@/components/sections/CategorySection";
import ProductShowcase from "@/components/sections/ProductShowcase";
import Service from "@/components/sections/Service";
import TrustSection from "@/components/sections/TrustSection";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-[#E10600]/40 selection:text-[#F5F5F5]">
      <Hero />
      <GearFinder />
      <section className="border-y border-border-subtle bg-section-alt py-12 sm:py-16">
        <div className="container-page flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#E10600]">
              Build around your training
            </p>
            <h2 className="mt-2 text-2xl font-black uppercase tracking-tight text-text-primary sm:text-4xl">
              Put your setup together.
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">
              Select products from the catalog, set quantities, and review your
              subtotal before adding them to your cart.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/build-setup"
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#E10600] px-5 text-xs font-black uppercase tracking-wider text-white transition-colors hover:bg-[#B80500]"
            >
              Build my setup
            </Link>
            <Link
              href="/our-story"
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-border-subtle bg-surface-raised px-5 text-xs font-bold uppercase tracking-wider text-text-primary transition-colors hover:bg-surface-elevated"
            >
              Our story
            </Link>
          </div>
        </div>
      </section>
      <CategorySection />
      <ProductShowcase />
      <Service />
      <TrustSection />
    </main>
  );
}
