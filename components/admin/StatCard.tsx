"use client";

import React from "react";
import { ArrowUpRight, ArrowDownRight, type LucideIcon } from "lucide-react";
import { MiniSparkline } from "./AdminCharts";

interface StatCardProps {
  label: string;
  value: string | number;
  changePercentage: number | null;
  isPositive?: boolean;
  trendText?: string;
  icon: LucideIcon;
  sparklineValues?: number[];
  currencyPrefix?: string;
}

export function StatCard({
  label,
  value,
  changePercentage,
  isPositive = true,
  trendText = "vs last month",
  icon: Icon,
  sparklineValues,
}: StatCardProps) {
  return (
    <div className="admin-card rounded-2xl p-5 transition-all duration-200 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        {/* Metric and Label */}
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-[var(--admin-text-muted)] tracking-wide">
            {label}
          </p>
          <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[var(--admin-text)] tracking-tight">
            {value}
          </h3>

          {/* Trend indicator */}
          <div className="mt-2.5 flex items-center gap-1.5 text-xs">
            {changePercentage === null ? (
              <span className="text-[11px] text-[var(--admin-text-dim)]">
                Not enough data to compare
              </span>
            ) : (
              <>
                <span
                  className={`inline-flex items-center gap-0.5 font-bold ${
                    isPositive ? "text-emerald-500" : "text-[#E10600]"
                  }`}
                >
                  {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {Math.abs(changePercentage)}%
                </span>
                <span className="text-[11px] text-[var(--admin-text-dim)]">
                  {trendText}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Icon & Sparkline */}
        <div className="flex flex-col items-end gap-2.5 shrink-0">
          <div className="grid h-11 w-11 place-items-center rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card-elevated)] text-[var(--admin-text)]">
            <Icon size={20} className="text-[var(--admin-text)]" />
          </div>
          {sparklineValues && (
            <MiniSparkline values={sparklineValues} isPositive={isPositive} />
          )}
        </div>
      </div>
    </div>
  );
}
