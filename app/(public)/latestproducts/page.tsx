"use client";

import { useCart } from "@/lib/cartContext";
import { useSearch } from "@/lib/searchContext";
import { RotateCcw, ShoppingBag, SlidersHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import latestProducts from "./latestdata/LproductsData";

const LatestProducts = () => {
  const { search } = useSearch();
  const { addToCart } = useCart();
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOrder, setSortOrder] = useState<
    "default" | "lowToHigh" | "highToLow"
  >("default");

  const handleAddToCart = (product: (typeof latestProducts)[0]) => {
    addToCart({
      id: `latest-${product.id}`,
      name: product.name,
      price: product.price,
      image: product.image,
      category: "Latest Drop",
    });
  };

  const filteredProducts = latestProducts
    .filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase());
      const parsedMin = minPrice === "" ? undefined : Number(minPrice);
      const parsedMax = maxPrice === "" ? undefined : Number(maxPrice);

      const matchesMin = parsedMin === undefined || product.price >= parsedMin;
      const matchesMax = parsedMax === undefined || product.price <= parsedMax;

      return matchesSearch && matchesMin && matchesMax;
    })
    .sort((a, b) => {
      if (sortOrder === "lowToHigh") return a.price - b.price;
      if (sortOrder === "highToLow") return b.price - a.price;
      return 0;
    });

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-page pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Page Header */}
        <div className="mb-12 text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E10600]/30 bg-[#E10600]/10 px-3.5 py-1 mb-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-text-primary">
              Fresh Batch Releases
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter text-text-primary leading-none">
                LATEST <span className="text-[#E10600]">DROPS & ARRIVALS</span>
              </h1>
              <p className="mt-3 text-sm sm:text-base text-text-secondary max-w-2xl font-normal">
                Freshly stocked athletic gear, updated belt colorways, and new
                tactical arrivals in Nepal.
              </p>
            </div>
            <div className="shrink-0">
              <span className="inline-flex items-center rounded-xl border border-border-subtle bg-surface-raised px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-text-primary">
                {filteredProducts.length}{" "}
                {filteredProducts.length === 1 ? "Drop" : "Drops"} Available
              </span>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="mb-10 rounded-2xl border border-border-subtle bg-section-alt p-5 shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-text-primary">
              <SlidersHorizontal size={15} className="text-[#E10600]" />
              <span>Filters & Sorting</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:flex items-center gap-3">
              {/* Min Price */}
              <div className="flex items-center rounded-xl border border-border-subtle bg-page px-3.5 py-2 text-xs">
                <span className="text-text-muted mr-2 font-bold">Min:</span>
                <input
                  type="number"
                  min="0"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-20 bg-transparent text-text-primary placeholder:text-text-muted outline-none"
                  placeholder="Rs. 0"
                />
              </div>

              {/* Max Price */}
              <div className="flex items-center rounded-xl border border-border-subtle bg-page px-3.5 py-2 text-xs">
                <span className="text-text-muted mr-2 font-bold">Max:</span>
                <input
                  type="number"
                  min="0"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-20 bg-transparent text-text-primary placeholder:text-text-muted outline-none"
                  placeholder="Rs. 10,000"
                />
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center rounded-xl border border-border-subtle bg-page px-3.5 py-2 text-xs">
                <span className="text-text-muted mr-2 font-bold">Sort:</span>
                <select
                  value={sortOrder}
                  onChange={(e) =>
                    setSortOrder(
                      e.target.value as "default" | "lowToHigh" | "highToLow",
                    )
                  }
                  className="bg-transparent text-text-primary outline-none cursor-pointer"
                >
                  <option
                    value="default"
                    className="bg-section-alt text-text-primary"
                  >
                    Default
                  </option>
                  <option
                    value="lowToHigh"
                    className="bg-section-alt text-text-primary"
                  >
                    Price: Low to High
                  </option>
                  <option
                    value="highToLow"
                    className="bg-section-alt text-text-primary"
                  >
                    Price: High to Low
                  </option>
                </select>
              </div>

              {/* Clear Button */}
              {(minPrice || maxPrice || sortOrder !== "default") && (
                <button
                  onClick={() => {
                    setMinPrice("");
                    setMaxPrice("");
                    setSortOrder("default");
                  }}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-[#E10600]/40 bg-[#E10600]/10 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-text-secondary hover:bg-[#E10600]/20 transition-colors"
                >
                  <RotateCcw size={13} />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full rounded-2xl border border-border-subtle bg-section-alt p-12 text-center">
              <p className="text-base text-text-muted">
                No latest drops match your search or filter range.
              </p>
              <button
                onClick={() => {
                  setMinPrice("");
                  setMaxPrice("");
                  setSortOrder("default");
                }}
                className="mt-4 rounded-xl border border-border-subtle bg-surface-raised px-6 py-3 text-xs font-bold uppercase tracking-wider text-text-primary hover:bg-surface-elevated"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="rounded-2xl border border-border-subtle bg-surface-raised p-4 sm:p-5 flex flex-col justify-between group relative shadow-md transition-all duration-200 hover:border-[#C0C0C0]/50 hover:bg-surface-elevated/40"
              >
                <div>
                  <Link
                    href={`/products/latest-${product.id}`}
                    className="block"
                  >
                    <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-section-alt border border-border-subtle/50 p-4 flex items-center justify-center">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                      <div className="absolute top-2.5 left-2.5 z-10 rounded-md border border-[#E10600]/40 bg-page px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-text-secondary">
                        New Drop
                      </div>
                    </div>
                  </Link>

                  {/* Title & Description */}
                  <div className="mt-4">
                    <Link
                      href={`/products/latest-${product.id}`}
                      className="block"
                    >
                      <h2 className="text-base font-black uppercase tracking-tight text-text-primary transition-colors group-hover:text-text-secondary line-clamp-1">
                        {product.name}
                      </h2>
                    </Link>
                    <p className="mt-1 text-xs text-text-secondary line-clamp-2 leading-relaxed font-normal">
                      {product.description}
                    </p>
                  </div>
                </div>

                {/* Pricing & Add to Cart */}
                <div className="mt-5 pt-3.5 border-t border-border-subtle flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                      Price
                    </span>
                    <p className="text-base sm:text-lg font-black text-text-primary">
                      Rs. {product.price.toLocaleString()}
                    </p>
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex items-center gap-1.5 rounded-lg bg-[#E10600] px-3.5 py-2 text-xs font-black uppercase tracking-wider text-white transition-colors duration-200 hover:bg-[#B80500]"
                    aria-label={`Add ${product.name} to cart`}
                  >
                    <ShoppingBag size={13} />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default LatestProducts;
