"use client";

import { productData } from "@/app/(public)/allproducts/products/ProductData";
import { useCart } from "@/lib/cartContext";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Heart, Shield, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

const showcaseItems = [
  {
    id: 1,
    name: "Velcro Patch Hybrid Belt",
    category: "Lifting Belts",
    price: 3800,
    badge: "Bestseller",
    description:
      "Self-locking steel lever mechanism with heavy-gauge reinforced nylon.",
    image: productData[0].image,
    spec: "Quick-Lock Steel",
  },
  {
    id: 2,
    name: "45L Tactical Backpack",
    category: "Tactical Carry",
    price: 7500,
    badge: "Bestseller",
    description:
      "Ballistic 900D Oxford with dedicated footwear chamber and molle straps.",
    image: productData[1].image,
    spec: "900D Oxford",
  },
  {
    id: 3,
    name: "Pro Rope Dip Belt",
    category: "Calisthenics",
    price: 3900,
    badge: "Featured",
    description:
      "Dual-reinforced rope and heavy chain construction for weighted calisthenics.",
    image: productData[2].image,
    spec: "Heavy Chain",
  },
  {
    id: 4,
    name: "Power Grip Chalk 100g",
    category: "Grip & Fuel",
    price: 700,
    badge: "Pure Grip",
    description:
      "100% pure magnesium carbonate block for maximum bar and ring friction.",
    image: productData[3].image,
    spec: "Zero Slip",
  },
  {
    id: 5,
    name: "Ergonomic Side Bag",
    category: "Daily Carry",
    price: 1800,
    badge: "Essential",
    description:
      "Compact dual-compartment cross-body bag for keys, wraps, and daily carry.",
    image: productData[4].image,
    spec: "Anti-Tear",
  },
  {
    id: 6,
    name: "Competitive Powerlifting Belt",
    category: "Lifting Belts",
    price: 5500,
    badge: "Heavy Duty",
    description:
      "10mm precision-stitched powerlifting belt with heavy steel buckle.",
    image: productData[10].image,
    spec: "10mm Steel",
  },
];

const categories = [
  "All",
  "Lifting Belts",
  "Tactical Carry",
  "Calisthenics",
  "Grip & Fuel",
];

export default function ProductShowcase() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [favorites, setFavorites] = useState<number[]>([]);
  const { addToCart } = useCart();

  const toggleFavorite = (id: number, name: string) => {
    setFavorites((prev) => {
      const isFav = prev.includes(id);
      if (isFav) {
        toast.info(`Removed from wishlist`, {
          description: name,
        });
        return prev.filter((item) => item !== id);
      } else {
        toast.success(`Saved to wishlist`, {
          description: name,
        });
        return [...prev, id];
      }
    });
  };

  const handleAddToCart = (product: (typeof showcaseItems)[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
  };

  const filteredItems =
    selectedCategory === "All"
      ? showcaseItems
      : showcaseItems.filter((item) => item.category === selectedCategory);

  return (
    <section className="relative w-full overflow-hidden bg-page py-24 sm:py-32 border-t border-border-subtle">
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
              Flagship Collection
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter text-text-primary leading-[0.95] mb-4"
          >
            <span className="text-primary">TRAIN</span> WITH THE BEST
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="text-sm sm:text-base text-text-muted leading-relaxed font-normal max-w-xl"
          >
            Competition-tested lifting belts, ballistic Oxford backpacks, and
            high-friction calisthenics gear engineered in Nepal.
          </motion.p>

          {/* ── CATEGORY FILTER BUTTONS ─────────────────────────────────── */}
          <div className="flex items-center justify-center gap-2 flex-wrap mt-7">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                    isSelected
                      ? "bg-[#E10600] text-white border border-[#E10600]"
                      : "bg-section-alt text-text-muted border border-border-subtle hover:text-text-primary hover:border-[#929292]/50 hover:bg-surface-raised"
                  }`}
                >
                  <span>{cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── PRODUCT CARDS GRID ────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 items-stretch mb-14">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((product, idx) => {
              const isFavorite = favorites.includes(product.id);
              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  className="rounded-2xl border border-border-subtle bg-surface-raised p-4 sm:p-5 flex flex-col justify-between group relative transition-all duration-200 hover:border-[#C0C0C0]/50 hover:bg-surface-elevated/40 shadow-[0_6px_20px_rgba(0,0,0,0.30)]"
                >
                  <div>
                    {/* ── IMAGE CONTAINER ───────────────────────────── */}
                    <Link href={`/products/${product.id}`} className="block">
                      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-section-alt border border-border-subtle/50 p-4 flex items-center justify-center">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-contain p-3 transition-transform duration-500 ease-out group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />

                        {/* Top Badge */}
                        <div className="absolute top-2.5 left-2.5 z-10">
                          {product.badge && (
                            <span className="rounded-md border border-[#E10600]/40 bg-page px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-text-secondary">
                              {product.badge}
                            </span>
                          )}
                        </div>

                        {/* Favorite Button */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleFavorite(product.id, product.name);
                          }}
                          className={`absolute top-2.5 right-2.5 z-10 flex h-8 w-8 items-center justify-center rounded-lg border transition-colors ${
                            isFavorite
                              ? "border-[#E10600] bg-[#E10600]/20 text-[#E10600]"
                              : "border-border-subtle bg-page text-text-muted hover:border-[#C0C0C0] hover:text-text-primary"
                          }`}
                          aria-label={`Save ${product.name} to wishlist`}
                        >
                          <Heart
                            size={14}
                            className={
                              isFavorite ? "fill-[#E10600] text-[#E10600]" : ""
                            }
                          />
                        </button>

                        {/* Bottom Spec Badge */}
                        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 rounded-md border border-border-subtle bg-page px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-text-secondary">
                          <Shield size={10} className="text-[#E10600]" />
                          <span>{product.spec}</span>
                        </div>
                      </div>
                    </Link>

                    {/* ── METADATA & TITLE ──────────────────────────── */}
                    <div className="mt-4">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                          {product.category}
                        </span>
                      </div>

                      <Link href={`/products/${product.id}`} className="block">
                        <h3 className="text-base font-black uppercase tracking-tight text-text-primary transition-colors duration-200 group-hover:text-text-secondary line-clamp-1">
                          {product.name}
                        </h3>
                      </Link>

                      <p className="mt-1 text-xs text-text-muted font-normal line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>
                  </div>

                  {/* ── PRICING & ADD TO CART CTA ───────────────────── */}
                  <div className="mt-5 pt-3.5 border-t border-border-subtle flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-text-muted block">
                        Price
                      </span>
                      <p className="text-base sm:text-lg font-black text-text-primary">
                        Rs. {product.price.toLocaleString()}
                      </p>
                    </div>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex items-center gap-1.5 rounded-lg bg-[#E10600] px-3.5 py-2 text-xs font-black uppercase tracking-wider text-white transition-colors duration-200 hover:bg-[#B80500] shadow-sm"
                      aria-label={`Add ${product.name} to cart`}
                    >
                      <ShoppingBag size={13} />
                      <span>Add</span>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* ── BOTTOM CATALOG LINK BANNER ────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between rounded-2xl bg-section-alt p-6 sm:p-7 border border-border-subtle shadow-[0_8px_24px_rgba(0,0,0,0.15)] gap-4">
          <div>
            <h4 className="text-base sm:text-lg font-black uppercase tracking-tight text-text-primary">
              Looking for our complete inventory?
            </h4>
            <p className="text-xs sm:text-sm text-text-muted">
              Browse all sizes, tactical colors, competition dip chains, and gym
              packs.
            </p>
          </div>

          <Link href="/allproducts" className="shrink-0 w-full sm:w-auto">
            <button className="flex items-center justify-center gap-2 rounded-xl bg-[#E10600] px-6 py-3.5 text-xs font-black uppercase tracking-wider text-white transition-colors duration-200 hover:bg-[#B80500] w-full sm:w-auto shadow-sm">
              <span>View All Products</span>
              <ArrowRight size={14} />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
