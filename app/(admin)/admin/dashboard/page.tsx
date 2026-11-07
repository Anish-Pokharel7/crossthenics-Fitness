"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Wallet,
  ShoppingBag,
  Users,
  Activity,
  ArrowUpRight,
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  Package,
  Layers,
  Search,
  ExternalLink,
  Globe,
  Share2,
  Mail,
  Compass,
} from "lucide-react";
import { StatCard } from "@/components/admin/StatCard";
import {
  SalesOverviewChart,
  RevenueTrendBarChart,
  OrderStatusDoughnutChart,
  CustomerGrowthChart,
} from "@/components/admin/AdminCharts";
import type { DashboardStats, Order } from "@/lib/db/types";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [salesPeriod, setSalesPeriod] = useState<number>(30);

  useEffect(() => {
    async function loadStats() {
      try {
        setLoading(true);
        const res = await fetch(`/api/admin/stats?days=${salesPeriod}`);
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (err) {
        console.error("Failed to load dashboard stats", err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, [salesPeriod]);

  if (loading && !stats) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 rounded-2xl admin-card bg-[var(--admin-card-elevated)]" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-6 h-80 rounded-2xl admin-card bg-[var(--admin-card-elevated)]" />
          <div className="lg:col-span-3 h-80 rounded-2xl admin-card bg-[var(--admin-card-elevated)]" />
          <div className="lg:col-span-3 h-80 rounded-2xl admin-card bg-[var(--admin-card-elevated)]" />
        </div>
      </div>
    );
  }

  const {
    metrics,
    salesOverview,
    revenueTrend,
    topSellingProducts,
    recentOrders,
    orderStatusBreakdown,
    inventoryOverview,
    customerInsights,
    trafficSources,
  } = stats!;

  const getStatusBadgeStyle = (status: Order["fulfillmentStatus"]) => {
    switch (status) {
      case "delivered":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "shipped":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "processing":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "confirmed":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      case "pending":
        return "bg-[#E10600]/10 text-[#E10600] border-[#E10600]/25";
      case "cancelled":
        return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
      default:
        return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
    }
  };

  return (
    <div className="space-y-6">
      {/* ─────────────────────────────────────────────────────────────
          1. TOP SUMMARY STATISTIC CARDS (4 cards matching Aurora reference)
          ───────────────────────────────────────────────────────────── */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <StatCard
          label="Total Revenue"
          value={metrics.totalRevenue.formatted}
          changePercentage={metrics.totalRevenue.changePercentage}
          isPositive={metrics.totalRevenue.isPositive}
          trendText="vs last month"
          icon={Wallet}
          sparklineValues={[45, 52, 49, 62, 68, 74, 84]}
        />
        <StatCard
          label="Total Orders"
          value={metrics.totalOrders.formatted}
          changePercentage={metrics.totalOrders.changePercentage}
          isPositive={metrics.totalOrders.isPositive}
          trendText="vs last month"
          icon={ShoppingBag}
          sparklineValues={[18, 22, 21, 28, 30, 36, 42]}
        />
        <StatCard
          label="Total Customers"
          value={metrics.totalCustomers.formatted}
          changePercentage={metrics.totalCustomers.changePercentage}
          isPositive={metrics.totalCustomers.isPositive}
          trendText="vs last month"
          icon={Users}
          sparklineValues={[60, 65, 72, 78, 85, 95, 110]}
        />
        <StatCard
          label="Conversion Rate"
          value={metrics.conversionRate.formatted}
          changePercentage={metrics.conversionRate.changePercentage}
          isPositive={metrics.conversionRate.isPositive}
          trendText="vs last month"
          icon={Activity}
          sparklineValues={[2.8, 2.9, 3.1, 3.0, 3.2, 3.4, 3.65]}
        />
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. MIDDLE SECTION: SALES OVERVIEW + REVENUE TREND + TOP PRODUCTS
          ───────────────────────────────────────────────────────────── */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Large Line Chart: Sales Overview (6 cols) */}
        <div className="lg:col-span-6 admin-card rounded-2xl p-5 flex flex-col justify-between">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="text-sm font-bold text-[var(--admin-text)]">Sales Overview</h3>
              <div className="flex items-center gap-4 mt-1 text-xs">
                <span className="flex items-center gap-1.5 text-[var(--admin-text-muted)]">
                  <span className="h-2 w-4 rounded-sm bg-[#C0C0C0]" /> Revenue
                </span>
                <span className="flex items-center gap-1.5 text-[var(--admin-text-muted)]">
                  <span className="h-0.5 w-4 border-t-2 border-dashed border-[#E10600]" /> Orders
                </span>
              </div>
            </div>

            {/* Date filter dropdown */}
            <select
              value={salesPeriod}
              onChange={(e) => setSalesPeriod(Number(e.target.value))}
              className="admin-input h-8 rounded-lg px-2.5 text-xs font-semibold cursor-pointer"
            >
              <option value={7}>Last 7 Days</option>
              <option value={30}>Last 30 Days</option>
              <option value={90}>Last 90 Days</option>
            </select>
          </div>

          <div className="flex-1 flex items-center">
            <SalesOverviewChart data={salesOverview.data} height={240} />
          </div>
        </div>

        {/* Bar Chart: Revenue Trend (3 cols) */}
        <div className="lg:col-span-3 admin-card rounded-2xl p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="text-sm font-bold text-[var(--admin-text)]">Revenue Trend</h3>
              <p className="text-[11px] text-[var(--admin-text-muted)] mt-0.5">Monthly performance</p>
            </div>
            <span className="admin-border border rounded-md px-2 py-0.5 text-[10px] font-semibold text-[var(--admin-text-dim)]">
              6 Mos
            </span>
          </div>

          <div className="flex-1 flex items-center">
            <RevenueTrendBarChart data={revenueTrend.data} height={240} />
          </div>
        </div>

        {/* Top-Selling Products (3 cols) */}
        <div className="lg:col-span-3 admin-card rounded-2xl p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2 mb-4 pb-2 border-b border-[var(--admin-border)]">
            <h3 className="text-sm font-bold text-[var(--admin-text)]">Top-Selling Products</h3>
            <Link
              href="/admin/products"
              className="text-xs font-semibold text-[#E10600] hover:underline flex items-center gap-0.5"
            >
              <span>View all</span>
              <ChevronRight size={12} />
            </Link>
          </div>

          <div className="space-y-3.5 flex-1">
            {topSellingProducts.map((p) => (
              <div key={p.id} className="flex items-center justify-between gap-3 group">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-[var(--admin-border)] bg-[var(--admin-card-elevated)] p-1">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="40px"
                      className="object-contain p-0.5 group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold text-[var(--admin-text)] group-hover:text-[#E10600] transition-colors">
                      {p.name}
                    </p>
                    <p className="text-[11px] font-semibold text-[var(--admin-text-muted)]">
                      {p.priceFormatted}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="block text-xs font-extrabold text-[var(--admin-text)]">
                    {p.unitsSold}
                  </span>
                  <span className="block text-[10px] text-[var(--admin-text-dim)]">sold</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. RECENT ORDERS + ORDER BREAKDOWN + INVENTORY OVERVIEW
          ───────────────────────────────────────────────────────────── */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Recent Orders Table (6 cols) */}
        <div className="lg:col-span-6 admin-card rounded-2xl p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2 mb-4 pb-2 border-b border-[var(--admin-border)]">
            <div>
              <h3 className="text-sm font-bold text-[var(--admin-text)]">Recent Orders</h3>
              <p className="text-[11px] text-[var(--admin-text-muted)] mt-0.5">Latest dispatch activity</p>
            </div>
            <Link
              href="/admin/orders"
              className="text-xs font-semibold text-[#E10600] hover:underline flex items-center gap-0.5"
            >
              <span>View all</span>
              <ChevronRight size={12} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[var(--admin-border)] text-[var(--admin-text-dim)] text-[10px] font-bold uppercase tracking-wider">
                  <th className="pb-2.5">Order ID</th>
                  <th className="pb-2.5">Customer</th>
                  <th className="pb-2.5">Date</th>
                  <th className="pb-2.5">Amount</th>
                  <th className="pb-2.5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--admin-border)]">
                {recentOrders.map((o) => (
                  <tr key={o.id} className="admin-row-hover transition-colors">
                    <td className="py-2.5 font-bold text-[var(--admin-text)]">
                      <Link href="/admin/orders" className="hover:text-[#E10600] hover:underline">
                        #{o.id}
                      </Link>
                    </td>
                    <td className="py-2.5 font-medium text-[var(--admin-text)]">
                      <div>{o.customerName}</div>
                      <div className="text-[10px] text-[var(--admin-text-dim)]">{o.shippingAddress.city}</div>
                    </td>
                    <td className="py-2.5 text-[var(--admin-text-muted)] text-[11px]">
                      {new Date(o.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </td>
                    <td className="py-2.5 font-bold text-[var(--admin-text)]">
                      Rs. {o.grandTotal.toLocaleString()}
                    </td>
                    <td className="py-2.5 text-right">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold capitalize border ${getStatusBadgeStyle(
                          o.fulfillmentStatus
                        )}`}
                      >
                        {o.fulfillmentStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Status Breakdown Doughnut (3 cols) */}
        <div className="lg:col-span-3 admin-card rounded-2xl p-5 flex flex-col justify-between">
          <div className="mb-4 pb-2 border-b border-[var(--admin-border)]">
            <h3 className="text-sm font-bold text-[var(--admin-text)]">Order Status Breakdown</h3>
            <p className="text-[11px] text-[var(--admin-text-muted)] mt-0.5">Fulfillment pipeline</p>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <OrderStatusDoughnutChart
              segments={orderStatusBreakdown}
              totalOrders={metrics.totalOrders.value}
            />
          </div>
        </div>

        {/* Inventory Overview (3 cols) */}
        <div className="lg:col-span-3 admin-card rounded-2xl p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2 mb-4 pb-2 border-b border-[var(--admin-border)]">
            <div>
              <h3 className="text-sm font-bold text-[var(--admin-text)]">Inventory Overview</h3>
              <p className="text-[11px] text-[var(--admin-text-muted)] mt-0.5">Warehouse stock health</p>
            </div>
            <Link
              href="/admin/inventory"
              className="text-xs font-semibold text-[#E10600] hover:underline flex items-center gap-0.5"
            >
              <span>View all</span>
              <ChevronRight size={12} />
            </Link>
          </div>

          <div className="space-y-3 flex-1 justify-center flex flex-col">
            <Link
              href="/admin/inventory?filter=low"
              className="flex items-center justify-between p-2.5 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card-elevated)] hover:bg-[var(--admin-row-hover)] transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="grid h-7 w-7 place-items-center rounded-lg bg-amber-500/10 text-amber-500">
                  <AlertTriangle size={15} />
                </div>
                <span className="text-xs font-semibold text-[var(--admin-text)]">Low Stock Items</span>
              </div>
              <div className="flex items-center gap-1 font-bold text-xs text-amber-500">
                <span>{inventoryOverview.lowStockCount}</span>
                <ChevronRight size={14} />
              </div>
            </Link>

            <Link
              href="/admin/inventory?filter=out"
              className="flex items-center justify-between p-2.5 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card-elevated)] hover:bg-[var(--admin-row-hover)] transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="grid h-7 w-7 place-items-center rounded-lg bg-[#E10600]/10 text-[#E10600]">
                  <Package size={15} />
                </div>
                <span className="text-xs font-semibold text-[var(--admin-text)]">Out of Stock Items</span>
              </div>
              <div className="flex items-center gap-1 font-bold text-xs text-[#E10600]">
                <span>{inventoryOverview.outOfStockCount}</span>
                <ChevronRight size={14} />
              </div>
            </Link>

            <div className="flex items-center justify-between p-2.5 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card-elevated)]">
              <div className="flex items-center gap-2.5">
                <div className="grid h-7 w-7 place-items-center rounded-lg bg-[var(--admin-border)] text-[var(--admin-text-muted)]">
                  <Layers size={15} />
                </div>
                <span className="text-xs font-semibold text-[var(--admin-text)]">Total Products</span>
              </div>
              <span className="font-extrabold text-xs text-[var(--admin-text)]">
                {inventoryOverview.totalProducts}
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card-elevated)]">
              <span className="text-xs font-semibold text-[var(--admin-text-muted)]">Total Stock Value</span>
              <span className="font-extrabold text-xs text-[var(--admin-text)]">
                {inventoryOverview.totalStockValueFormatted}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. CUSTOMER INSIGHTS + TRAFFIC SOURCES (Aurora bottom section)
          ───────────────────────────────────────────────────────────── */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Customer Insights (7 cols) */}
        <div className="lg:col-span-7 admin-card rounded-2xl p-5 flex flex-col justify-between">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-2 border-b border-[var(--admin-border)]">
            <div>
              <h3 className="text-sm font-bold text-[var(--admin-text)]">Customer Insights</h3>
              <p className="text-[11px] text-[var(--admin-text-muted)] mt-0.5">Cohort retention &amp; frequency</p>
            </div>
            <span className="admin-border border rounded-md px-2.5 py-1 text-xs font-semibold text-[var(--admin-text-muted)]">
              Active Athletes
            </span>
          </div>

          {/* Metric Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-b border-[var(--admin-border)] mb-4">
            <div>
              <p className="text-[10px] uppercase font-bold text-[var(--admin-text-dim)]">Total Athletes</p>
              <p className="text-lg font-black text-[var(--admin-text)] mt-0.5">{customerInsights.totalCustomers}</p>
              <span className="text-[10px] text-emerald-500 font-bold">↑ 12.5%</span>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-[var(--admin-text-dim)]">New This Month</p>
              <p className="text-lg font-black text-[var(--admin-text)] mt-0.5">{customerInsights.newCustomersThisMonth}</p>
              <span className="text-[10px] text-emerald-500 font-bold">↑ 15.8%</span>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-[var(--admin-text-dim)]">Avg. Order Value</p>
              <p className="text-lg font-black text-[var(--admin-text)] mt-0.5">{customerInsights.averageOrderValueFormatted}</p>
              <span className="text-[10px] text-emerald-500 font-bold">↑ 9.3%</span>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-[var(--admin-text-dim)]">Repeat Rate</p>
              <p className="text-lg font-black text-[var(--admin-text)] mt-0.5">{customerInsights.repeatPurchaseRate}%</p>
              <span className="text-[10px] text-emerald-500 font-bold">↑ 6.1%</span>
            </div>
          </div>

          {/* Customer growth curve */}
          <div>
            <div className="flex items-center justify-between text-xs text-[var(--admin-text-muted)] mb-2">
              <span className="font-semibold text-[11px]">Monthly Athlete Acquisition</span>
              <span className="text-[10px]">2026 Growth Trend</span>
            </div>
            <CustomerGrowthChart data={customerInsights.customerGrowth} height={120} />
          </div>
        </div>

        {/* Traffic Sources (5 cols) */}
        <div className="lg:col-span-5 admin-card rounded-2xl p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2 mb-4 pb-2 border-b border-[var(--admin-border)]">
            <div>
              <h3 className="text-sm font-bold text-[var(--admin-text)]">Traffic Source</h3>
              <p className="text-[11px] text-[var(--admin-text-muted)] mt-0.5">Acquisition channels</p>
            </div>
            <Link
              href="/admin/analytics"
              className="text-xs font-semibold text-[#E10600] hover:underline flex items-center gap-0.5"
            >
              <span>View full report</span>
              <ChevronRight size={12} />
            </Link>
          </div>

          <div className="space-y-3.5 flex-1 justify-center flex flex-col">
            {trafficSources.map((item) => (
              <div key={item.source} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[var(--admin-text)]">{item.source}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[var(--admin-text)]">{item.visitors.toLocaleString()}</span>
                    <span className="text-[10px] text-[var(--admin-text-muted)]">({item.percentage}%)</span>
                  </div>
                </div>
                {/* Horizontal progress bar matching Aurora reference */}
                <div className="h-2 w-full rounded-full bg-[var(--admin-border-subtle)] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${item.percentage}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
