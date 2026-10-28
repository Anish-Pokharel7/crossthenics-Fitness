import Hero from "@/components/sections/Hero";
import CategorySection from "@/components/sections/CategorySection";
import ProductShowcase from "@/components/sections/ProductShowcase";
import Service from "@/components/sections/Service";
import TrustSection from "@/components/sections/TrustSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-[#E10600]/40 selection:text-[#F5F5F5]">
      <Hero />
      <CategorySection />
      <ProductShowcase />
      <Service />
      <TrustSection />
    </main>
  );
}

