"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  Search,
  Package,
  AlertTriangle,
  TrendingDown,
  DollarSign,
  X,
  RefreshCw,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { toast } from "sonner";
import type { Product, InventoryLog } from "@/lib/db/types";

interface InventoryData {
  products: Product[];
  logs: InventoryLog[];
  summary: {
    totalProducts: number;
    totalUnits: number;
    totalValue: number;
    lowStockCount: number;
    outOfStockCount: number;
  };
}

type StockFilter = "all" | "low" | "out";

const ADJUST_REASONS = [
  { value: "restock", label: "Restock" },
  { value: "manual_adjustment", label: "Manual Adjustment" },
  { value: "damage", label: "Damaged" },
  { value: "return", label: "Return" },
] as const;

type AdjustReason = (typeof ADJUST_REASONS)[number]["value"];

interface AdjustModal {
  open: boolean;
  product: Product | null;
}

function StockBadge({ stock }: { stock: number }) {
  if (stock === 0) {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E10600]/10 text-[#E10600] border border-[#E10600]/25">
        Out of Stock
      </span>
    );
  }
  if (stock <= 10) {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20">
        Low · {stock}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
      In Stock · {stock}
    </span>
  );
}

function MiniStatCard({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  accent?: "red" | "amber" | "emerald" | "default";
}) {
  const accentColor =
    accent === "red"
      ? "text-[#E10600]"
      : accent === "amber"
      ? "text-amber-500"
      : accent === "emerald"
      ? "text-emerald-500"
      : "text-[var(--admin-text)]";

  return (
    <div className="admin-card rounded-2xl p-4 flex items-center gap-4">
      <div
        className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-[var(--admin-card-elevated)] ${accentColor}`}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--admin-text-dim)] truncate">
          {label}
        </p>
        <p className={`text-xl font-black mt-0.5 ${accentColor}`}>{value}</p>
      </div>
    </div>
  );
}

export default function AdminInventoryPage() {
  const [data, setData] = useState<InventoryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [stockFilter, setStockFilter] = useState<StockFilter>("all");
  const [modal, setModal] = useState<AdjustModal>({ open: false, product: null });
  const [adjustChange, setAdjustChange] = useState<string>("");
  const [adjustReason, setAdjustReason] = useState<AdjustReason>("restock");
  const [adjustNote, setAdjustNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const loadInventory = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/inventory");
      if (res.ok) {
        const json = await res.json();
        setData(json);
      } else {
        toast.error("Failed to load inventory.");
      }
    } catch {
      toast.error("Failed to load inventory.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInventory();
  }, [loadInventory]);

  const openAdjustModal = (product: Product) => {
    setModal({ open: true, product });
    setAdjustChange("");
    setAdjustReason("restock");
    setAdjustNote("");
  };

  const closeModal = () => {
    setModal({ open: false, product: null });
  };

  const handleAdjustSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modal.product) return;
    const changeNum = Number(adjustChange);
    if (isNaN(changeNum) || adjustChange.trim() === "") {
      toast.error("Please enter a valid change amount.");
      return;
    }
    try {
      setSubmitting(true);
      const res = await fetch("/api/admin/inventory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: modal.product.id,
          change: changeNum,
          reason: adjustReason,
          note: adjustNote,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to adjust stock.");
      }
      toast.success(
        `Stock for "${modal.product.name}" adjusted by ${changeNum > 0 ? "+" : ""}${changeNum}.`
      );
      closeModal();
      await loadInventory();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to adjust stock.");
    } finally {
      setSubmitting(false);
    }
  };

  const products = data?.products ?? [];
  const logs = data?.logs ?? [];
  const summary = data?.summary;

  const filteredProducts = products.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch =
      p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q);
    const matchFilter =
      stockFilter === "all"
        ? true
        : stockFilter === "out"
        ? p.stock === 0
        : p.stock > 0 && p.stock <= (p.lowStockThreshold ?? 10);
    return matchSearch && matchFilter;
  });

  const filterTabs: { key: StockFilter; label: string }[] = [
    { key: "all", label: "All Products" },
    { key: "low", label: `Low Stock${summary ? ` (${summary.lowStockCount})` : ""}` },
    { key: "out", label: `Out of Stock${summary ? ` (${summary.outOfStockCount})` : ""}` },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[var(--admin-border)]">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tight text-[var(--admin-text)]">
            Inventory Management
          </h2>
          <p className="text-xs text-[var(--admin-text-muted)] mt-1">
            Monitor stock levels, adjust quantities, and review inventory audit logs.
          </p>
        </div>
        <button
          onClick={loadInventory}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border border-[var(--admin-border)] bg-[var(--admin-card-elevated)] text-[var(--admin-text)] hover:bg-[var(--admin-card)] transition-colors disabled:opacity-50"
        >
          <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MiniStatCard
          icon={<TrendingDown size={18} />}
          label="Low Stock"
          value={loading ? "—" : (summary?.lowStockCount ?? 0)}
          accent="amber"
        />
        <MiniStatCard
          icon={<AlertTriangle size={18} />}
          label="Out of Stock"
          value={loading ? "—" : (summary?.outOfStockCount ?? 0)}
          accent="red"
        />
        <MiniStatCard
          icon={<Package size={18} />}
          label="Total Products"
          value={loading ? "—" : (summary?.totalProducts ?? 0)}
          accent="default"
        />
        <MiniStatCard
          icon={<DollarSign size={18} />}
          label="Total Stock Value"
          value={
            loading
              ? "—"
              : `Rs. ${(summary?.totalValue ?? 0).toLocaleString("en-NP")}`
          }
          accent="emerald"
        />
      </div>

      {/* Filter Bar */}
      <div className="admin-card rounded-2xl p-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--admin-text-muted)]"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by product name or SKU…"
              className="admin-input h-10 w-full rounded-xl pl-10 pr-4 text-xs"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[var(--admin-card-elevated)] border border-[var(--admin-border)]">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setStockFilter(tab.key)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-colors whitespace-nowrap ${
                  stockFilter === tab.key
                    ? "bg-[var(--admin-accent-red)] text-white"
                    : "text-[var(--admin-text-muted)] hover:text-[var(--admin-text)]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Table */}
      <div className="admin-card rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[var(--admin-border)] bg-[var(--admin-card-elevated)] text-[var(--admin-text-dim)] text-[10px] font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">Product</th>
                <th className="py-3.5 px-4">SKU</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Stock</th>
                <th className="py-3.5 px-4">Unit Price</th>
                <th className="py-3.5 px-4">Stock Value</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--admin-border)]">
              {loading ? (
                <tr>
                  <td
                    colSpan={7}
                    className="py-16 text-center text-sm text-[var(--admin-text-muted)]"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <RefreshCw
                        size={20}
                        className="animate-spin text-[var(--admin-text-dim)]"
                      />
                      Loading inventory data…
                    </div>
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="py-16 text-center text-sm text-[var(--admin-text-muted)]"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Package size={28} className="text-[var(--admin-text-dim)]" />
                      <p>No products match your filters.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => {
                  const imgSrc =
                    (product.images && product.images[0]) || product.image || "";
                  const stockValue = product.stock * product.price;
                  return (
                    <tr
                      key={product.id}
                      className="admin-row-hover transition-colors"
                    >
                      {/* Product */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="flex-shrink-0 w-10 h-10 rounded-lg overflow-hidden bg-[var(--admin-card-elevated)] border border-[var(--admin-border)]">
                            {imgSrc ? (
                              <Image
                                src={imgSrc}
                                alt={product.name}
                                width={40}
                                height={40}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Package
                                  size={16}
                                  className="text-[var(--admin-text-dim)]"
                                />
                              </div>
                            )}
                          </div>
                          <span className="font-semibold text-[var(--admin-text)] truncate max-w-[180px]">
                            {product.name}
                          </span>
                        </div>
                      </td>

                      {/* SKU */}
                      <td className="py-3 px-4">
                        <code className="text-[10px] font-mono bg-[var(--admin-card-elevated)] px-2 py-0.5 rounded text-[var(--admin-text-muted)] border border-[var(--admin-border)]">
                          {product.sku || "—"}
                        </code>
                      </td>

                      {/* Category */}
                      <td className="py-3 px-4 text-[var(--admin-text-muted)]">
                        {product.category}
                      </td>

                      {/* Stock Badge */}
                      <td className="py-3 px-4">
                        <StockBadge stock={product.stock} />
                      </td>

                      {/* Price */}
                      <td className="py-3 px-4 font-semibold text-[var(--admin-text)]">
                        Rs. {product.price.toLocaleString("en-NP")}
                      </td>

                      {/* Stock Value */}
                      <td className="py-3 px-4 text-[var(--admin-text-muted)]">
                        Rs. {stockValue.toLocaleString("en-NP")}
                      </td>

                      {/* Action */}
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => openAdjustModal(product)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold bg-[var(--admin-card-elevated)] border border-[var(--admin-border)] text-[var(--admin-text)] hover:border-[var(--admin-accent-red)] hover:text-[var(--admin-accent-red)] transition-colors"
                        >
                          Adjust Stock
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Audit Log */}
      <div className="admin-card rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[var(--admin-border)] flex items-center justify-between">
          <div>
            <h3 className="text-sm font-black uppercase tracking-tight text-[var(--admin-text)]">
              Inventory Audit Log
            </h3>
            <p className="text-[10px] text-[var(--admin-text-muted)] mt-0.5">
              Last 20 stock adjustment events
            </p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[var(--admin-border)] bg-[var(--admin-card-elevated)] text-[var(--admin-text-dim)] text-[10px] font-bold uppercase tracking-wider">
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Change</th>
                <th className="py-3 px-4">New Stock</th>
                <th className="py-3 px-4">Reason</th>
                <th className="py-3 px-4">Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--admin-border)]">
              {loading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-10 text-center text-sm text-[var(--admin-text-muted)]"
                  >
                    Loading logs…
                  </td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-10 text-center text-sm text-[var(--admin-text-muted)]"
                  >
                    No audit log entries yet.
                  </td>
                </tr>
              ) : (
                logs.slice(0, 20).map((log) => (
                  <tr key={log.id} className="admin-row-hover transition-colors">
                    <td className="py-3 px-4 text-[var(--admin-text-muted)] whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleString("en-NP", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </td>
                    <td className="py-3 px-4 font-semibold text-[var(--admin-text)] max-w-[180px] truncate">
                      {log.productName}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1 font-bold ${
                          log.change > 0
                            ? "text-emerald-500"
                            : "text-[#E10600]"
                        }`}
                      >
                        {log.change > 0 ? (
                          <ArrowUp size={11} />
                        ) : (
                          <ArrowDown size={11} />
                        )}
                        {log.change > 0 ? `+${log.change}` : log.change}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[var(--admin-text)]">
                      {log.newStock}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[var(--admin-card-elevated)] border border-[var(--admin-border)] text-[var(--admin-text-muted)] capitalize">
                        {log.reason.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[var(--admin-text-muted)] max-w-[200px] truncate">
                      {log.note || "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Adjust Stock Modal */}
      {modal.open && modal.product && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Dialog */}
          <div className="relative z-10 w-full max-w-md admin-card-elevated rounded-2xl shadow-2xl border border-[var(--admin-border)] overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[var(--admin-border)] flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black uppercase tracking-tight text-[var(--admin-text)]">
                  Adjust Stock
                </h3>
                <p className="text-[11px] text-[var(--admin-text-muted)] mt-0.5 max-w-[280px] truncate">
                  {modal.product.name}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="p-1.5 rounded-lg hover:bg-[var(--admin-card)] transition-colors text-[var(--admin-text-muted)] hover:text-[var(--admin-text)]"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>
            </div>

            {/* Current Stock Info */}
            <div className="px-6 pt-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--admin-card-elevated)] border border-[var(--admin-border)]">
                <span className="text-[11px] font-semibold text-[var(--admin-text-muted)] uppercase tracking-wider">
                  Current Stock
                </span>
                <StockBadge stock={modal.product.stock} />
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleAdjustSubmit} className="px-6 pb-6 pt-4 space-y-4">
              {/* Change Amount */}
              <div>
                <label className="block text-[11px] font-bold text-[var(--admin-text-muted)] uppercase tracking-wider mb-1.5">
                  Change Amount
                  <span className="ml-1 normal-case font-normal text-[10px]">
                    (use negative to reduce)
                  </span>
                </label>
                <input
                  type="number"
                  value={adjustChange}
                  onChange={(e) => setAdjustChange(e.target.value)}
                  placeholder="e.g. +10 or -3"
                  required
                  className="admin-input h-10 w-full rounded-xl px-4 text-sm"
                />
              </div>

              {/* Reason */}
              <div>
                <label className="block text-[11px] font-bold text-[var(--admin-text-muted)] uppercase tracking-wider mb-1.5">
                  Reason
                </label>
                <select
                  value={adjustReason}
                  onChange={(e) =>
                    setAdjustReason(e.target.value as AdjustReason)
                  }
                  className="admin-input h-10 w-full rounded-xl px-3 text-xs font-medium"
                >
                  {ADJUST_REASONS.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Note */}
              <div>
                <label className="block text-[11px] font-bold text-[var(--admin-text-muted)] uppercase tracking-wider mb-1.5">
                  Note{" "}
                  <span className="normal-case font-normal text-[10px]">
                    (optional)
                  </span>
                </label>
                <input
                  type="text"
                  value={adjustNote}
                  onChange={(e) => setAdjustNote(e.target.value)}
                  placeholder="Additional context…"
                  className="admin-input h-10 w-full rounded-xl px-4 text-xs"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 h-10 rounded-xl text-xs font-bold border border-[var(--admin-border)] bg-[var(--admin-card-elevated)] text-[var(--admin-text)] hover:bg-[var(--admin-card)] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 h-10 rounded-xl text-xs font-bold bg-[var(--admin-accent-red)] text-white hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <RefreshCw size={12} className="animate-spin" />
                      Saving…
                    </>
                  ) : (
                    "Confirm Adjustment"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
