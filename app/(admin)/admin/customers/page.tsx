"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Users,
  Search,
  Eye,
  Phone,
  Mail,
  MapPin,
  Calendar,
  ShoppingBag,
  X,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";
import type { Customer } from "@/lib/db/types";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatNPR(amount: number): string {
  return `Rs. ${amount.toLocaleString("en-IN")}`;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// ─── Status Badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: "active" | "inactive" }) {
  if (status === "active") {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block" />
        Active
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-zinc-500/10 text-zinc-400 border border-zinc-500/20">
      <span className="h-1.5 w-1.5 rounded-full bg-zinc-500 inline-block" />
      Inactive
    </span>
  );
}

// ─── Skeleton Row ──────────────────────────────────────────────────────────────
function SkeletonRow() {
  return (
    <tr className="border-b border-[var(--admin-border)] animate-pulse">
      {[180, 160, 100, 70, 110, 100, 80].map((w, i) => (
        <td key={i} className="py-3.5 px-4">
          <div
            className="h-3.5 rounded bg-[var(--admin-card-elevated)]"
            style={{ width: w }}
          />
          {i === 0 && (
            <div className="h-2.5 rounded bg-[var(--admin-card-elevated)] mt-1.5 w-32" />
          )}
        </td>
      ))}
    </tr>
  );
}

// ─── Customer Profile Drawer ────────────────────────────────────────────────
function CustomerDrawer({
  customer,
  onClose,
}: {
  customer: Customer;
  onClose: () => void;
}) {
  const avgOrderValue =
    customer.ordersCount > 0
      ? Math.round(customer.totalSpent / customer.ordersCount)
      : 0;

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <aside
        role="dialog"
        aria-label={`Customer profile: ${customer.name}`}
        aria-modal="true"
        className="fixed right-0 top-0 z-50 h-full w-full max-w-sm shadow-2xl flex flex-col"
        style={{ background: "var(--admin-card)" }}
      >
        {/* Drawer Header */}
        <div
          className="flex items-center justify-between px-5 py-4 border-b"
          style={{ borderColor: "var(--admin-border)" }}
        >
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#E10600]">
              Customer Profile
            </span>
            <h2
              className="text-base font-black mt-0.5"
              style={{ color: "var(--admin-text)" }}
            >
              {customer.name}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close customer profile"
            className="grid h-8 w-8 place-items-center rounded-lg transition-colors hover:bg-[var(--admin-card-elevated)]"
            style={{ color: "var(--admin-text-muted)" }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
          {/* Contact Info */}
          <div
            className="rounded-xl border p-4 space-y-3 text-xs"
            style={{
              borderColor: "var(--admin-border)",
              background: "var(--admin-card-elevated)",
            }}
          >
            <p
              className="font-bold uppercase tracking-wider text-[10px]"
              style={{ color: "var(--admin-text-dim)" }}
            >
              Contact Details
            </p>
            <div
              className="flex items-center gap-2.5"
              style={{ color: "var(--admin-text-muted)" }}
            >
              <Mail size={14} className="text-[#E10600] shrink-0" />
              <span className="break-all">{customer.email || "—"}</span>
            </div>
            <div
              className="flex items-center gap-2.5"
              style={{ color: "var(--admin-text-muted)" }}
            >
              <Phone size={14} className="text-[#E10600] shrink-0" />
              <span>{customer.phone || "—"}</span>
            </div>
            <div
              className="flex items-center gap-2.5"
              style={{ color: "var(--admin-text-muted)" }}
            >
              <MapPin size={14} className="text-[#E10600] shrink-0" />
              <span>{customer.city || "—"}</span>
            </div>
            <div
              className="flex items-center gap-2.5"
              style={{ color: "var(--admin-text-muted)" }}
            >
              <Calendar size={14} className="text-[#E10600] shrink-0" />
              <span>Joined {formatDate(customer.joinedDate)}</span>
            </div>
          </div>

          {/* Stats cards */}
          <div>
            <p
              className="font-bold uppercase tracking-wider text-[10px] mb-3"
              style={{ color: "var(--admin-text-dim)" }}
            >
              Purchase Summary
            </p>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                {
                  icon: ShoppingBag,
                  label: "Orders",
                  value: customer.ordersCount,
                  fmt: false,
                },
                {
                  icon: TrendingUp,
                  label: "Total Spent",
                  value: customer.totalSpent,
                  fmt: true,
                },
                {
                  icon: TrendingUp,
                  label: "Avg Order",
                  value: avgOrderValue,
                  fmt: true,
                },
              ].map(({ icon: Icon, label, value, fmt }) => (
                <div
                  key={label}
                  className="rounded-xl border p-3 text-center space-y-1"
                  style={{
                    borderColor: "var(--admin-border)",
                    background: "var(--admin-card-elevated)",
                  }}
                >
                  <div
                    className="grid h-7 w-7 mx-auto place-items-center rounded-lg"
                    style={{
                      background: "rgba(225, 6, 0, 0.08)",
                      color: "#E10600",
                    }}
                  >
                    <Icon size={14} />
                  </div>
                  <p
                    className="text-xs font-black"
                    style={{ color: "var(--admin-text)" }}
                  >
                    {fmt ? formatNPR(value as number) : value}
                  </p>
                  <p
                    className="text-[10px]"
                    style={{ color: "var(--admin-text-dim)" }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Orders mini-table */}
          <div>
            <p
              className="font-bold uppercase tracking-wider text-[10px] mb-3"
              style={{ color: "var(--admin-text-dim)" }}
            >
              Order History
            </p>
            <div
              className="rounded-xl border overflow-hidden"
              style={{ borderColor: "var(--admin-border)" }}
            >
              <table className="w-full text-left text-xs">
                <thead>
                  <tr
                    className="border-b text-[10px] font-bold uppercase"
                    style={{
                      borderColor: "var(--admin-border)",
                      background: "var(--admin-card-elevated)",
                      color: "var(--admin-text-dim)",
                    }}
                  >
                    <th className="py-2.5 px-3">Summary</th>
                    <th className="py-2.5 px-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      className="py-3 px-3"
                      style={{ color: "var(--admin-text-muted)" }}
                    >
                      <p
                        className="font-bold"
                        style={{ color: "var(--admin-text)" }}
                      >
                        {customer.ordersCount}{" "}
                        {customer.ordersCount === 1 ? "order" : "orders"} placed
                      </p>
                      <p className="text-[11px] mt-0.5">
                        Last order:{" "}
                        {customer.lastOrderDate
                          ? formatDate(customer.lastOrderDate)
                          : "No orders yet"}
                      </p>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <StatusBadge status={customer.status} />
                    </td>
                  </tr>
                  <tr
                    className="border-t"
                    style={{ borderColor: "var(--admin-border)" }}
                  >
                    <td
                      className="py-3 px-3"
                      style={{ color: "var(--admin-text-muted)" }}
                    >
                      <p
                        className="font-bold"
                        style={{ color: "var(--admin-text)" }}
                      >
                        Lifetime value
                      </p>
                      <p className="text-[11px] mt-0.5">Total amount spent</p>
                    </td>
                    <td
                      className="py-3 px-3 text-right font-black"
                      style={{ color: "var(--admin-text)" }}
                    >
                      {formatNPR(customer.totalSpent)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="px-5 py-4 border-t"
          style={{ borderColor: "var(--admin-border)" }}
        >
          <button
            type="button"
            onClick={onClose}
            className="w-full h-9 rounded-xl text-xs font-bold border transition-colors"
            style={{
              borderColor: "var(--admin-border)",
              color: "var(--admin-text)",
              background: "var(--admin-card-elevated)",
            }}
          >
            Close Profile
          </button>
        </div>
      </aside>
    </>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounce search input
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setSearch(val);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        setDebouncedSearch(val);
      }, 300);
    },
    []
  );

  const loadCustomers = useCallback(async (query?: string) => {
    try {
      setLoading(true);
      const url = query
        ? `/api/admin/customers?search=${encodeURIComponent(query)}`
        : "/api/admin/customers";
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch customers");
      const data = await res.json();
      setCustomers(data);
    } catch {
      toast.error("Failed to load customers. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCustomers(debouncedSearch || undefined);
  }, [debouncedSearch, loadCustomers]);

  // Client-side filter as fallback for non-server search
  const filtered = debouncedSearch
    ? customers.filter((c) => {
        const q = debouncedSearch.toLowerCase();
        return (
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.phone.includes(q) ||
          c.city.toLowerCase().includes(q)
        );
      })
    : customers;

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b"
        style={{ borderColor: "var(--admin-border)" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="grid h-10 w-10 place-items-center rounded-xl"
            style={{ background: "rgba(225, 6, 0, 0.08)", color: "#E10600" }}
          >
            <Users size={20} />
          </div>
          <div>
            <h2
              className="text-2xl font-black uppercase tracking-tight"
              style={{ color: "var(--admin-text)" }}
            >
              Customers
            </h2>
            <p className="text-xs mt-0.5" style={{ color: "var(--admin-text-muted)" }}>
              Manage athlete accounts, view purchase history and lifetime value.
            </p>
          </div>
        </div>

        <span
          className="text-xs font-bold px-3 py-1.5 rounded-xl border self-start sm:self-auto"
          style={{
            color: "var(--admin-text)",
            borderColor: "var(--admin-border)",
            background: "var(--admin-card-elevated)",
          }}
        >
          {loading ? "Loading…" : `${customers.length} Total Customers`}
        </span>
      </div>

      {/* ── Search Bar ── */}
      <div className="admin-card rounded-2xl p-4">
        <div className="relative max-w-xl">
          <Search
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2"
            style={{ color: "var(--admin-text-muted)" }}
          />
          <input
            type="search"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search by name, email, phone, or city…"
            aria-label="Search customers"
            className="admin-input h-10 w-full rounded-xl pl-10 pr-4 text-xs"
          />
        </div>
        {debouncedSearch && !loading && (
          <p
            className="text-[11px] mt-2 ml-1"
            style={{ color: "var(--admin-text-muted)" }}
          >
            {filtered.length}{" "}
            {filtered.length === 1 ? "result" : "results"} for &ldquo;
            {debouncedSearch}&rdquo;
          </p>
        )}
      </div>

      {/* ── Table ── */}
      <div className="admin-card rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs" aria-label="Customers table">
            <thead>
              <tr
                className="border-b text-[10px] font-bold uppercase tracking-wider"
                style={{
                  borderColor: "var(--admin-border)",
                  background: "var(--admin-card-elevated)",
                  color: "var(--admin-text-dim)",
                }}
              >
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Contact</th>
                <th className="py-3.5 px-4">City</th>
                <th className="py-3.5 px-4">Orders</th>
                <th className="py-3.5 px-4">Lifetime Value</th>
                <th className="py-3.5 px-4">Last Order</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody
              className="divide-y"
              style={{ borderColor: "var(--admin-border)" }}
            >
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div
                        className="grid h-14 w-14 place-items-center rounded-2xl"
                        style={{
                          background: "var(--admin-card-elevated)",
                          color: "var(--admin-text-dim)",
                        }}
                      >
                        <Users size={24} />
                      </div>
                      <div>
                        <p
                          className="font-bold text-sm"
                          style={{ color: "var(--admin-text)" }}
                        >
                          No customers found
                        </p>
                        <p
                          className="text-xs mt-0.5"
                          style={{ color: "var(--admin-text-muted)" }}
                        >
                          {debouncedSearch
                            ? "Try a different search term."
                            : "Customers will appear here once orders are placed."}
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((c) => (
                  <tr
                    key={c.id}
                    className="admin-row-hover transition-colors cursor-pointer"
                    onClick={() => setSelectedCustomer(c)}
                    tabIndex={0}
                    role="button"
                    aria-label={`View profile for ${c.name}`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedCustomer(c);
                      }
                    }}
                  >
                    {/* Customer */}
                    <td className="py-3.5 px-4">
                      <div
                        className="font-bold text-xs"
                        style={{ color: "var(--admin-text)" }}
                      >
                        {c.name}
                      </div>
                      <div
                        className="text-[10px] mt-0.5"
                        style={{ color: "var(--admin-text-dim)" }}
                      >
                        ID: {c.id}
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="py-3.5 px-4">
                      <div
                        className="flex items-center gap-1.5 text-[11px]"
                        style={{ color: "var(--admin-text-muted)" }}
                      >
                        <Mail size={11} className="shrink-0" />
                        <span className="truncate max-w-[140px]">{c.email}</span>
                      </div>
                      <div
                        className="flex items-center gap-1.5 text-[11px] mt-0.5"
                        style={{ color: "var(--admin-text-muted)" }}
                      >
                        <Phone size={11} className="shrink-0" />
                        <span>{c.phone}</span>
                      </div>
                    </td>

                    {/* City */}
                    <td className="py-3.5 px-4">
                      <div
                        className="flex items-center gap-1.5 text-xs font-medium"
                        style={{ color: "var(--admin-text)" }}
                      >
                        <MapPin size={12} className="text-[#E10600] shrink-0" />
                        {c.city}
                      </div>
                    </td>

                    {/* Orders */}
                    <td className="py-3.5 px-4">
                      <span
                        className="font-black text-sm"
                        style={{ color: "var(--admin-text)" }}
                      >
                        {c.ordersCount}
                      </span>
                    </td>

                    {/* Lifetime Value */}
                    <td className="py-3.5 px-4">
                      <span
                        className="font-black text-xs"
                        style={{ color: "var(--admin-text)" }}
                      >
                        {formatNPR(c.totalSpent)}
                      </span>
                    </td>

                    {/* Last Order */}
                    <td
                      className="py-3.5 px-4 text-xs"
                      style={{ color: "var(--admin-text-muted)" }}
                    >
                      {c.lastOrderDate ? formatDate(c.lastOrderDate) : "—"}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <StatusBadge status={c.status} />
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCustomer(c);
                        }}
                        aria-label={`View ${c.name}'s profile`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition-colors hover:text-[#E10600]"
                        style={{
                          borderColor: "var(--admin-border)",
                          background: "var(--admin-card-elevated)",
                          color: "var(--admin-text)",
                        }}
                      >
                        <Eye size={13} />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Customer Profile Drawer ── */}
      {selectedCustomer && (
        <CustomerDrawer
          customer={selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
        />
      )}
    </div>
  );
}
