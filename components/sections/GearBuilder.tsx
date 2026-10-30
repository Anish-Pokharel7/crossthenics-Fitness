"use client";

import { useCart } from "@/lib/cartContext";
import {
  getSetupDescription,
  getSetupProducts,
  setupStyles,
  type SetupStyle,
} from "@/lib/gearBuilder";
import { ArrowRight, Check, Minus, Plus, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function GearBuilder() {
  const [style, setStyle] = useState<SetupStyle>("Powerlifting");
  const [selectedIds, setSelectedIds] = useState<string[]>(["10", "4"]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [sizes, setSizes] = useState<Record<string, string>>({});
  const { addToCart } = useCart();

  const products = useMemo(() => getSetupProducts(style), [style]);
  const selectedProducts = products.filter((product) =>
    selectedIds.includes(String(product.id)),
  );
  const subtotal = selectedProducts.reduce(
    (total, product) =>
      total + product.price * (quantities[String(product.id)] ?? 1),
    0,
  );

  const toggleProduct = (id: string) => {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((productId) => productId !== id)
        : [...current, id],
    );
  };

  const changeQuantity = (id: string, delta: number) => {
    setQuantities((current) => ({
      ...current,
      [id]: Math.max(1, (current[id] ?? 1) + delta),
    }));
  };

  const missingSizes = selectedProducts.filter(
    (product) =>
      (product.sizes?.length ?? 0) > 1 && !sizes[String(product.id)],
  );

  const addSetupToCart = () => {
    if (missingSizes.length > 0) return;

    selectedProducts.forEach((product) => {
      addToCart(
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category,
          size:
            sizes[String(product.id)] ??
            (product.sizes?.length === 1 ? product.sizes[0] : undefined),
        },
        quantities[String(product.id)] ?? 1,
      );
    });
  };

  return (
    <main className="min-h-screen bg-page px-4 pb-20 pt-32 text-text-primary sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[90rem]">
        <header className="mb-10 max-w-3xl">
          <span className="mb-3 inline-flex rounded-full border border-[#E10600]/25 bg-[#E10600]/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em]">
            Build your setup
          </span>
          <h1 className="text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-6xl">
            Don&apos;t just buy gear.{" "}
            <span className="text-[#E10600]">Build your setup.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-text-muted sm:text-base">
            Choose a training focus, refine the product list, and add your
            selected items to the existing cart. Prices are standard catalog
            prices; no bundle discount is applied.
          </p>
        </header>

        <section
          aria-labelledby="setup-style-heading"
          className="mb-8 border-b border-border-subtle pb-7"
        >
          <h2
            id="setup-style-heading"
            className="mb-4 text-xs font-black uppercase tracking-[0.16em] text-text-secondary"
          >
            1. Choose your training style
          </h2>
          <div className="flex flex-wrap gap-2">
            {setupStyles.map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={style === option}
                onClick={() => {
                  setStyle(option);
                  setSelectedIds(
                    getSetupProducts(option)
                      .slice(0, option === "Calisthenics" ? 3 : 2)
                      .map((product) => String(product.id)),
                  );
                }}
                className={`min-h-11 rounded-lg border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E10600] ${
                  style === option
                    ? "border-[#E10600] bg-[#E10600] text-white"
                    : "border-border-subtle bg-surface-raised text-text-secondary hover:border-[#929292]"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm text-text-muted">{getSetupDescription(style)}</p>
        </section>

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
          <section aria-labelledby="setup-products-heading">
            <h2
              id="setup-products-heading"
              className="mb-4 text-xs font-black uppercase tracking-[0.16em] text-text-secondary"
            >
              2. Choose your equipment
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => {
                const id = String(product.id);
                const selected = selectedIds.includes(id);
                const quantity = quantities[id] ?? 1;
                const hasMultipleSizes = (product.sizes?.length ?? 0) > 1;

                return (
                  <article
                    key={id}
                    className={`overflow-hidden rounded-xl border bg-surface-raised transition-colors ${
                      selected ? "border-[#E10600]" : "border-border-subtle"
                    }`}
                  >
                    <Link
                      href={`/products/${product.id}`}
                      className="relative block aspect-[4/3] bg-section-alt"
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-contain p-4"
                      />
                    </Link>
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                            {product.category}
                          </p>
                          <Link
                            href={`/products/${product.id}`}
                            className="mt-1 block font-bold text-text-primary hover:text-[#E10600]"
                          >
                            {product.name}
                          </Link>
                        </div>
                        <span className="whitespace-nowrap text-sm font-bold">
                          Rs. {product.price.toLocaleString("en-US")}
                        </span>
                      </div>
                      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-text-muted">
                        {product.description}
                      </p>

                      {hasMultipleSizes && selected && (
                        <label className="mt-4 block text-xs font-semibold text-text-secondary">
                          Size / specification
                          <select
                            value={sizes[id] ?? ""}
                            onChange={(event) =>
                              setSizes((current) => ({
                                ...current,
                                [id]: event.target.value,
                              }))
                            }
                            className="mt-1 min-h-11 w-full rounded-lg border border-border-subtle bg-page px-3 text-sm text-text-primary"
                          >
                            <option value="">Select an option</option>
                            {product.sizes?.map((size) => (
                              <option key={size} value={size}>
                                {size}
                              </option>
                            ))}
                          </select>
                        </label>
                      )}

                      <div className="mt-4 flex items-center justify-between gap-2">
                        {selected ? (
                          <div className="inline-flex items-center rounded-lg border border-border-subtle">
                            <button
                              type="button"
                              aria-label={`Decrease ${product.name} quantity`}
                              onClick={() => changeQuantity(id, -1)}
                              className="grid h-10 w-10 place-items-center text-text-secondary hover:text-text-primary"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="min-w-8 text-center text-sm font-bold">
                              {quantity}
                            </span>
                            <button
                              type="button"
                              aria-label={`Increase ${product.name} quantity`}
                              onClick={() => changeQuantity(id, 1)}
                              className="grid h-10 w-10 place-items-center text-text-secondary hover:text-text-primary"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-text-muted">
                            Add this item to your setup
                          </span>
                        )}
                        <button
                          type="button"
                          aria-pressed={selected}
                          onClick={() => toggleProduct(id)}
                          className={`inline-flex min-h-10 items-center gap-2 rounded-lg px-3 text-xs font-bold uppercase tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E10600] ${
                            selected
                              ? "bg-[#2A2A2A] text-white hover:bg-[#414141]"
                              : "bg-[#E10600] text-white hover:bg-[#B80500]"
                          }`}
                        >
                          {selected ? <Check size={14} /> : <Plus size={14} />}
                          {selected ? "Selected" : "Add"}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <aside className="rounded-xl border border-border-subtle bg-surface-raised p-5 lg:sticky lg:top-28">
            <h2 className="text-lg font-black uppercase tracking-tight">Your setup</h2>
            <p className="mt-1 text-xs text-text-muted">
              Selected items will be added to your cart individually.
            </p>
            {selectedProducts.length ? (
              <ul className="mt-5 divide-y divide-border-subtle">
                {selectedProducts.map((product) => {
                  const quantity = quantities[String(product.id)] ?? 1;
                  return (
                    <li
                      key={product.id}
                      className="flex justify-between gap-3 py-3 text-sm"
                    >
                      <span className="min-w-0">
                        <span className="block font-medium">{product.name}</span>
                        <span className="text-xs text-text-muted">
                          Qty {quantity}
                          {sizes[String(product.id)]
                            ? ` · ${sizes[String(product.id)]}`
                            : ""}
                        </span>
                      </span>
                      <span className="whitespace-nowrap font-semibold">
                        Rs. {(product.price * quantity).toLocaleString("en-US")}
                      </span>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="mt-5 rounded-lg bg-section-alt p-4 text-sm text-text-muted">
                Select one or more products to start your setup.
              </p>
            )}
            <div className="mt-4 flex justify-between border-t border-border-subtle pt-4 text-sm font-bold">
              <span>Subtotal</span>
              <span>Rs. {subtotal.toLocaleString("en-US")}</span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-text-muted">
              Shipping is calculated in the cart. No bundle savings are
              configured for these items.
            </p>
            <button
              type="button"
              onClick={addSetupToCart}
              disabled={!selectedProducts.length || missingSizes.length > 0}
              className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#E10600] px-4 text-xs font-black uppercase tracking-wider text-white transition-colors hover:bg-[#B80500] disabled:cursor-not-allowed disabled:bg-[#929292]"
            >
              <ShoppingBag size={15} />
              Add setup to cart
              <ArrowRight size={14} />
            </button>
            {missingSizes.length > 0 && (
              <p role="status" className="mt-2 text-xs text-text-secondary">
                Select a size for each chosen belt before adding your setup.
              </p>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}
