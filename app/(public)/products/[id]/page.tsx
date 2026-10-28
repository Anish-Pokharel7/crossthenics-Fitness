"use client";

import { useCart } from "@/lib/cartContext";
import { getProductById, getRelatedProducts } from "@/lib/catalog";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Info,
  Minus,
  Plus,
  RotateCcw,
  Shield,
  ShoppingBag,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useState } from "react";

interface PageProps {
  params: Promise<{ id: string }>;
}

const C = {
  primary: "#F5F5F5",
  secondary: "#C0C0C0",
  muted: "#A3A3A3",
  background: "#1C1C1C",
  surface: "#2A2A2A",
  elevated: "#353535",
  border: "#414141",
  red: "#E10600",
  redHover: "#B80500",
};

const focusStyle =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E10600] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1C1C1C]";

export default function ProductDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { addToCart } = useCart();

  const product = getProductById(resolvedParams.id);
  const relatedProducts = product ? getRelatedProducts(product.id, 4) : [];

  const [selectedSize, setSelectedSize] = useState<string>(
    product?.sizes?.[0] ?? "",
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"specs" | "shipping" | "exchange">(
    "specs",
  );

  const textPrimary = "text-[#F5F5F5]";
  const textSecondary = "text-[#C0C0C0]";
  const textMuted = "text-[#A3A3A3]";

  if (!product) {
    return (
      <main
        className="min-h-screen w-full px-4 pb-24 pt-36 sm:px-6 lg:px-8"
        style={{ backgroundColor: C.background }}
      >
        <div className="mx-auto flex w-full max-w-md items-center justify-center">
          <div className="w-full rounded-3xl border border-[#414141] bg-[#2A2A2A] p-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#E10600]/30 bg-[#E10600]/15 text-[#E10600]">
              <Info size={28} />
            </div>

            <h1 className={`mb-2 text-2xl font-black uppercase ${textPrimary}`}>
              Product Not Found
            </h1>

            <p className={`mb-6 text-sm leading-relaxed ${textSecondary}`}>
              The gear you are looking for may have moved or is currently
              unavailable in our catalog.
            </p>

            <Link
              href="/allproducts"
              className={`inline-flex items-center justify-center gap-2 rounded-xl bg-[#E10600] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#B80500] ${focusStyle}`}
            >
              Browse All Gear <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        size: selectedSize || undefined,
      },
      quantity,
    );
  };

  const handleBuyNow = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        size: selectedSize || undefined,
      },
      quantity,
    );

    router.push("/cart");
  };

  const tabs = [
    { id: "specs", label: "Technical Specifications" },
    { id: "shipping", label: "Domestic Delivery" },
    { id: "exchange", label: "Sizing Policy" },
  ] as const;

  const handleTabKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;

    event.preventDefault();

    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (currentIndex + direction + tabs.length) % tabs.length;
    const nextTab = tabs[nextIndex];

    setActiveTab(nextTab.id);

    requestAnimationFrame(() => {
      document.getElementById(`tab-${nextTab.id}`)?.focus();
    });
  };

  return (
    <main
      className={`min-h-screen w-full px-4 pb-24 pt-32 sm:px-6 lg:px-8 ${textPrimary}`}
      style={{ backgroundColor: C.background }}
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Breadcrumbs */}
        <nav
          className={`mb-8 flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${textMuted}`}
          aria-label="Breadcrumb"
        >
          <Link
            href="/"
            className={`transition-colors hover:text-[#F5F5F5] ${focusStyle}`}
          >
            Home
          </Link>

          <ChevronRight size={12} aria-hidden="true" />

          <Link
            href="/allproducts"
            className={`transition-colors hover:text-[#F5F5F5] ${focusStyle}`}
          >
            Catalog
          </Link>

          <ChevronRight size={12} aria-hidden="true" />

          <span className={`${textSecondary} line-clamp-1`}>
            {product.name}
          </span>
        </nav>

        {/* Main product layout */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Product image */}
          <section
            className="space-y-4 lg:col-span-6"
            aria-label="Product image"
          >
            <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-3xl border border-[#414141] bg-[#242424] p-8 shadow-[0_25px_60px_rgba(0,0,0,0.35)]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-4"
              />

              {product.badge && (
                <div className="absolute left-4 top-4 z-10 rounded-md border border-[#E10600]/50 bg-[#2A2A2A] px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#F5F5F5]">
                  {product.badge}
                </div>
              )}

              <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1.5 rounded-md border border-[#414141] bg-[#2A2A2A] px-2.5 py-1 text-[10px] font-bold text-[#F5F5F5]">
                <CheckCircle2
                  size={12}
                  className="text-emerald-400"
                  aria-hidden="true"
                />
                <span>Verified Cross-Training Spec</span>
              </div>
            </div>

            <div
              className={`flex items-center gap-3 rounded-2xl border border-[#414141] bg-[#2A2A2A] p-4 text-xs leading-relaxed ${textSecondary}`}
            >
              <Shield
                size={18}
                className="shrink-0 text-[#E10600]"
                aria-hidden="true"
              />
              <span>
                Engineered for maximum intra-abdominal bracing and heavy load
                stability. Tested by athletes in Pokhara.
              </span>
            </div>
          </section>

          {/* Product details */}
          <section
            className="space-y-6 lg:col-span-6"
            aria-label="Product details"
          >
            <div>
              <span
                className={`mb-2 block text-xs font-black uppercase tracking-[0.2em] ${textSecondary}`}
              >
                {product.category}
              </span>

              <h1
                className={`text-3xl font-black uppercase leading-tight tracking-tight sm:text-4xl md:text-5xl ${textPrimary}`}
              >
                {product.name}
              </h1>
            </div>

            {/* Price and stock */}
            <div className="flex flex-wrap items-baseline gap-4 border-b border-[#414141] pb-6">
              <span
                className={`text-3xl font-black sm:text-4xl ${textPrimary}`}
              >
                Rs. {product.price.toLocaleString()}
              </span>

              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-400">
                In Stock · Pokhara Dispatch
              </span>
            </div>

            {/* Description */}
            <p
              className={`text-sm font-normal leading-relaxed sm:text-base ${textSecondary}`}
            >
              {product.fullDescription}
            </p>

            {/* Size selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between gap-3 text-xs">
                  <label
                    className={`font-bold uppercase tracking-wider ${textSecondary}`}
                  >
                    Select Specification / Size
                  </label>

                  <span className={textMuted}>{selectedSize}</span>
                </div>

                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                  {product.sizes.map((size) => {
                    const isSelected = selectedSize === size;

                    return (
                      <button
                        key={size}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => setSelectedSize(size)}
                        className={`min-h-11 rounded-xl border px-3 py-2.5 text-center text-xs font-bold transition-colors ${focusStyle} ${
                          isSelected
                            ? "border-[#E10600] bg-[#E10600]/15 text-[#F5F5F5]"
                            : "border-[#414141] bg-[#242424] text-[#C0C0C0] hover:border-[#C0C0C0]/70 hover:text-[#F5F5F5]"
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity and actions */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                <span
                  className={`text-xs font-bold uppercase tracking-wider ${textSecondary}`}
                >
                  Quantity:
                </span>

                <div className="flex items-center rounded-xl border border-[#414141] bg-[#242424]">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className={`rounded-l-xl p-2.5 text-[#C0C0C0] transition-colors hover:text-[#F5F5F5] disabled:cursor-not-allowed disabled:opacity-50 ${focusStyle}`}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>

                  <span className="w-10 text-center text-sm font-bold text-[#F5F5F5]">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className={`rounded-r-xl p-2.5 text-[#C0C0C0] transition-colors hover:text-[#F5F5F5] ${focusStyle}`}
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`flex items-center justify-center gap-2 rounded-2xl border border-[#E10600] bg-[#E10600] px-6 py-4 text-xs font-black uppercase tracking-wider text-white transition-colors hover:bg-[#B80500] ${focusStyle}`}
                >
                  <ShoppingBag size={15} aria-hidden="true" />
                  <span>Add To Bag</span>
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className={`flex items-center justify-center gap-2 rounded-2xl border border-[#414141] bg-[#2A2A2A] px-6 py-4 text-xs font-black uppercase tracking-wider text-[#F5F5F5] transition-colors hover:border-[#C0C0C0]/70 hover:bg-[#353535] ${focusStyle}`}
                >
                  <span>Instant Checkout</span>
                  <ArrowRight size={15} aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Trust strip */}
            <div className="grid grid-cols-3 gap-3 border-t border-[#414141] pt-4 text-center">
              {[
                {
                  Icon: Truck,
                  title: "Nepal Dispatch",
                  subtitle: "2–4 Days Courier",
                },
                {
                  Icon: RotateCcw,
                  title: "7-Day Exchange",
                  subtitle: "Size Guarantee",
                },
                {
                  Icon: Shield,
                  title: "Cash on Delivery",
                  subtitle: "eSewa / Khalti",
                },
              ].map(({ Icon, title, subtitle }) => (
                <div
                  key={title}
                  className="rounded-xl border border-[#414141] bg-[#242424] p-3"
                >
                  <Icon
                    size={18}
                    className="mx-auto mb-1.5 text-[#E10600]"
                    aria-hidden="true"
                  />
                  <span className="block text-[11px] font-bold text-[#F5F5F5]">
                    {title}
                  </span>
                  <span className="text-[10px] text-[#A3A3A3]">{subtitle}</span>
                </div>
              ))}
            </div>

            {/* Information tabs */}
            <div className="pt-4">
              <div
                role="tablist"
                aria-label="Product information"
                onKeyDown={handleTabKeyDown}
                className="flex overflow-x-auto border-b border-[#414141] text-xs font-bold uppercase tracking-wider"
              >
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id;

                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      id={`tab-${tab.id}`}
                      aria-controls="product-info-panel"
                      aria-selected={isActive}
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative min-h-11 shrink-0 px-3 transition-colors sm:px-4 ${focusStyle} ${
                        isActive
                          ? "text-[#F5F5F5]"
                          : "text-[#A3A3A3] hover:text-[#F5F5F5]"
                      }`}
                    >
                      {tab.label}

                      {isActive && (
                        <span
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E10600]"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              <div
                id="product-info-panel"
                role="tabpanel"
                aria-labelledby={`tab-${activeTab}`}
                tabIndex={0}
                className={`pt-4 text-xs ${textPrimary} ${focusStyle}`}
              >
                {activeTab === "specs" && (
                  <div className="space-y-2">
                    {product.specs.map((spec, index) => (
                      <div
                        key={`${spec.label}-${index}`}
                        className="flex justify-between gap-4 border-b border-[#414141] py-1.5"
                      >
                        <span className={textSecondary}>{spec.label}</span>
                        <span className="text-right font-bold text-[#F5F5F5]">
                          {spec.value}
                        </span>
                      </div>
                    ))}

                    {product.highlights && product.highlights.length > 0 && (
                      <div className="pt-3">
                        <span
                          className={`mb-2 block font-bold uppercase tracking-wider ${textSecondary}`}
                        >
                          Key Advantages:
                        </span>

                        <ul
                          className={`list-disc space-y-1.5 pl-4 ${textSecondary}`}
                        >
                          {product.highlights.map((highlight, index) => (
                            <li key={`${highlight}-${index}`}>{highlight}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "shipping" && (
                  <div className={`space-y-2 leading-relaxed ${textSecondary}`}>
                    <p>
                      All equipment dispatches directly from our central
                      fulfillment station in{" "}
                      <strong className="font-bold text-[#F5F5F5]">
                        Pokhara
                      </strong>
                      .
                    </p>

                    <p>
                      •{" "}
                      <strong className="text-[#F5F5F5]">
                        Pokhara Local Delivery:
                      </strong>{" "}
                      24 hours (Free on eligible orders).
                    </p>

                    <p>
                      •{" "}
                      <strong className="text-[#F5F5F5]">
                        Kathmandu Valley:
                      </strong>{" "}
                      24 to 48 hours via express overland courier.
                    </p>

                    <p>
                      •{" "}
                      <strong className="text-[#F5F5F5]">Rest of Nepal:</strong>{" "}
                      2 to 4 business days.
                    </p>

                    <p className={`pt-2 text-[11px] ${textMuted}`}>
                      * Confirm delivery charges and eligibility at checkout.
                    </p>
                  </div>
                )}

                {activeTab === "exchange" && (
                  <div className={`space-y-2 leading-relaxed ${textSecondary}`}>
                    <p>
                      We want your lifting belts and training backpacks to fit
                      precisely.
                    </p>

                    <p>
                      If your belt size does not fit your waist, contact our
                      support team within{" "}
                      <strong className="text-[#F5F5F5]">
                        7 days of receiving your package
                      </strong>{" "}
                      to request a size exchange.
                    </p>

                    <p className={`text-[11px] ${textMuted}`}>
                      Gear must remain in original, unused condition with labels
                      intact. Please confirm the full exchange terms with
                      support.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <section className="mt-24 border-t border-[#414141] pt-12">
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <span
                  className={`mb-1 block text-xs font-black uppercase tracking-[0.2em] ${textSecondary}`}
                >
                  Complete Your Setup
                </span>

                <h2
                  className={`text-2xl font-black uppercase tracking-tight sm:text-3xl ${textPrimary}`}
                >
                  Related Athlete Gear
                </h2>
              </div>

              <Link
                href="/allproducts"
                className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C0C0C0] transition-colors hover:text-[#F5F5F5] ${focusStyle}`}
              >
                View Full Inventory
                <ArrowRight size={13} aria-hidden="true" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((related) => (
                <Link
                  key={related.id}
                  href={`/products/${related.id}`}
                  className={`group flex flex-col justify-between rounded-2xl border border-[#414141] bg-[#2A2A2A] p-4 transition-colors hover:border-[#C0C0C0]/60 hover:bg-[#303030] ${focusStyle}`}
                >
                  <div>
                    <div className="relative mb-3 aspect-square w-full overflow-hidden rounded-xl border border-[#414141] bg-[#242424] p-4">
                      <Image
                        src={related.image}
                        alt={related.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <span
                      className={`mb-0.5 block text-[10px] font-black uppercase tracking-wider ${textMuted}`}
                    >
                      {related.category}
                    </span>

                    <h3
                      className={`line-clamp-2 text-sm font-black uppercase tracking-tight transition-colors group-hover:text-[#C0C0C0] ${textPrimary}`}
                    >
                      {related.name}
                    </h3>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-2 border-t border-[#414141] pt-3">
                    <span className="text-sm font-black text-[#F5F5F5]">
                      Rs. {related.price.toLocaleString()}
                    </span>

                    <span className="flex items-center gap-1 text-[11px] font-bold text-[#F5F5F5] transition-transform group-hover:translate-x-0.5">
                      View <ArrowRight size={12} aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
