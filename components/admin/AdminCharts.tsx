"use client";

import React, { useState } from "react";

// ─────────────────────────────────────────────────────────────
// 1. SALES OVERVIEW DUAL LINE / AREA CHART
// ─────────────────────────────────────────────────────────────

interface SalesDataPoint {
  date: string;
  revenue: number;
  orders: number;
}

interface SalesOverviewChartProps {
  data: SalesDataPoint[];
  height?: number;
}

export function SalesOverviewChart({ data, height = 260 }: SalesOverviewChartProps) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  if (!data || data.length === 0) {
    return (
      <div className="flex h-56 items-center justify-center text-xs text-[var(--admin-text-muted)]">
        No sales data available for this range
      </div>
    );
  }

  const maxRevenue = Math.max(...data.map((d) => d.revenue), 10000);
  const maxOrders = Math.max(...data.map((d) => d.orders), 5);

  const paddingLeft = 52;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 30;

  const width = 640;
  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const pointsRevenue = data.map((d, i) => {
    const x = paddingLeft + (i / (data.length - 1)) * chartWidth;
    const y = paddingTop + chartHeight - (d.revenue / maxRevenue) * chartHeight;
    return { x, y, revenue: d.revenue, orders: d.orders, date: d.date };
  });

  const pointsOrders = data.map((d, i) => {
    const x = paddingLeft + (i / (data.length - 1)) * chartWidth;
    const y = paddingTop + chartHeight - (d.orders / maxOrders) * chartHeight;
    return { x, y };
  });

  // Generate smooth cubic bezier SVG path
  const createSmoothPath = (pts: { x: number; y: number }[]) => {
    if (pts.length === 0) return "";
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i === 0 ? 0 : i - 1];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] || p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return d;
  };

  const revenuePath = createSmoothPath(pointsRevenue);
  const ordersPath = createSmoothPath(pointsOrders);
  const areaPath = `${revenuePath} L ${pointsRevenue[pointsRevenue.length - 1].x} ${
    paddingTop + chartHeight
  } L ${pointsRevenue[0].x} ${paddingTop + chartHeight} Z`;

  // Y-axis ticks
  const yTicks = [0, 0.33, 0.66, 1].map((pct) => ({
    value: Math.round(maxRevenue * pct),
    y: paddingTop + chartHeight - pct * chartHeight,
  }));

  const activePoint = hoverIndex !== null && pointsRevenue[hoverIndex] ? pointsRevenue[hoverIndex] : null;

  return (
    <div className="relative w-full overflow-hidden select-none">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto overflow-visible"
        onMouseLeave={() => setHoverIndex(null)}
      >
        <defs>
          <linearGradient id="revenueAreaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C0C0C0" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#C0C0C0" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Horizontal grid lines & ticks */}
        {yTicks.map((tick, i) => (
          <g key={i}>
            <line
              x1={paddingLeft}
              y1={tick.y}
              x2={width - paddingRight}
              y2={tick.y}
              stroke="currentColor"
              strokeDasharray="4 4"
              className="text-[var(--admin-border-subtle)]"
              strokeWidth="1"
            />
            <text
              x={paddingLeft - 8}
              y={tick.y + 3}
              textAnchor="end"
              className="fill-[var(--admin-text-dim)] text-[9px] font-medium"
            >
              {tick.value >= 1000 ? `Rs.${Math.round(tick.value / 1000)}k` : `Rs.${tick.value}`}
            </text>
          </g>
        ))}

        {/* Shaded Area */}
        <path d={areaPath} fill="url(#revenueAreaGradient)" />

        {/* Revenue Line (Solid) */}
        <path
          d={revenuePath}
          fill="none"
          stroke="#C0C0C0"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Orders Line (Dashed) */}
        <path
          d={ordersPath}
          fill="none"
          stroke="#E10600"
          strokeWidth="1.75"
          strokeDasharray="4 3"
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* Invisible trigger columns for smooth hover */}
        {pointsRevenue.map((pt, i) => {
          const colWidth = chartWidth / data.length;
          return (
            <rect
              key={i}
              x={pt.x - colWidth / 2}
              y={paddingTop}
              width={colWidth}
              height={chartHeight}
              fill="transparent"
              className="cursor-pointer"
              onMouseEnter={() => setHoverIndex(i)}
            />
          );
        })}

        {/* Active hover crosshair & dots */}
        {activePoint && (
          <g>
            <line
              x1={activePoint.x}
              y1={paddingTop}
              x2={activePoint.x}
              y2={paddingTop + chartHeight}
              stroke="#C0C0C0"
              strokeDasharray="3 3"
              strokeWidth="1"
              opacity="0.6"
            />
            {/* Revenue dot */}
            <circle cx={activePoint.x} cy={activePoint.y} r="5" fill="#1C1C1C" stroke="#C0C0C0" strokeWidth="2.5" />
            {/* Orders dot */}
            <circle
              cx={activePoint.x}
              cy={pointsOrders[hoverIndex!].y}
              r="4"
              fill="#1C1C1C"
              stroke="#E10600"
              strokeWidth="2"
            />
          </g>
        )}

        {/* X-axis date labels */}
        {pointsRevenue.map((pt, i) => {
          const interval = Math.ceil(data.length / 5);
          if (i % interval !== 0 && i !== pointsRevenue.length - 1) return null;
          return (
            <text
              key={i}
              x={pt.x}
              y={height - 8}
              textAnchor="middle"
              className="fill-[var(--admin-text-dim)] text-[10px] font-medium"
            >
              {pt.date}
            </text>
          );
        })}
      </svg>

      {/* Floating HTML Tooltip */}
      {activePoint && (
        <div
          className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full rounded-lg border border-[var(--admin-border)] bg-[var(--admin-card-elevated)] px-3 py-2 text-xs shadow-lg transition-transform duration-75"
          style={{
            left: `${(activePoint.x / width) * 100}%`,
            top: `${(activePoint.y / height) * 100}%`,
            marginTop: "-12px",
          }}
        >
          <p className="font-semibold text-[var(--admin-text)] text-[11px] mb-1">{activePoint.date}</p>
          <div className="flex items-center gap-3 text-[11px]">
            <span className="flex items-center gap-1.5 text-[var(--admin-text)]">
              <span className="h-2 w-2 rounded-full bg-[#C0C0C0]" />
              Revenue: <strong className="font-bold">Rs. {activePoint.revenue.toLocaleString()}</strong>
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px] mt-0.5">
            <span className="flex items-center gap-1.5 text-[var(--admin-text-muted)]">
              <span className="h-2 w-2 rounded-full bg-[#E10600]" />
              Orders: <strong className="font-bold text-[var(--admin-text)]">{activePoint.orders}</strong>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 2. REVENUE TREND BAR CHART
// ─────────────────────────────────────────────────────────────

interface RevenueTrendBarProps {
  data: { month: string; revenue: number; orders: number }[];
  height?: number;
}

export function RevenueTrendBarChart({ data, height = 260 }: RevenueTrendBarProps) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  if (!data || data.length === 0) return null;

  const maxVal = Math.max(...data.map((d) => d.revenue), 10000);
  const width = 360;
  const paddingLeft = 40;
  const paddingRight = 16;
  const paddingTop = 20;
  const paddingBottom = 30;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;
  const barWidth = 14;

  const points = data.map((d, i) => {
    const x = paddingLeft + (i / (data.length - 1)) * (chartWidth - barWidth);
    const barH = (d.revenue / maxVal) * chartHeight;
    const y = paddingTop + chartHeight - barH;
    return { ...d, x, y, barH };
  });

  const activeItem = activeIdx !== null ? points[activeIdx] : null;

  return (
    <div className="relative w-full overflow-hidden select-none">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto overflow-visible"
        onMouseLeave={() => setActiveIdx(null)}
      >
        {/* Horizontal grid lines */}
        {[0, 0.5, 1].map((pct, i) => {
          const y = paddingTop + chartHeight - pct * chartHeight;
          const val = Math.round(maxVal * pct);
          return (
            <g key={i}>
              <line
                x1={paddingLeft}
                y1={y}
                x2={width - paddingRight}
                y2={y}
                stroke="currentColor"
                strokeDasharray="4 4"
                className="text-[var(--admin-border-subtle)]"
                strokeWidth="1"
              />
              <text
                x={paddingLeft - 6}
                y={y + 3}
                textAnchor="end"
                className="fill-[var(--admin-text-dim)] text-[9px] font-medium"
              >
                {val >= 1000 ? `Rs.${Math.round(val / 1000)}k` : `Rs.${val}`}
              </text>
            </g>
          );
        })}

        {/* Bars */}
        {points.map((pt, i) => {
          const isSelected = activeIdx === i;
          return (
            <g key={i} onMouseEnter={() => setActiveIdx(i)} className="cursor-pointer">
              <rect
                x={pt.x}
                y={pt.y}
                width={barWidth}
                height={pt.barH}
                rx="4"
                fill={isSelected ? "#E10600" : "#C0C0C0"}
                opacity={isSelected ? 1 : 0.85}
                className="transition-all duration-200"
              />
              <text
                x={pt.x + barWidth / 2}
                y={height - 10}
                textAnchor="middle"
                className="fill-[var(--admin-text-dim)] text-[10px] font-medium"
              >
                {pt.month || (pt as any).label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Hover tooltip */}
      {activeItem && (
        <div
          className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full rounded-lg border border-[var(--admin-border)] bg-[var(--admin-card-elevated)] px-3 py-1.5 text-xs shadow-lg transition-transform duration-75"
          style={{
            left: `${((activeItem.x + barWidth / 2) / width) * 100}%`,
            top: `${(activeItem.y / height) * 100}%`,
            marginTop: "-10px",
          }}
        >
          <p className="font-semibold text-[var(--admin-text)] text-[11px]">{activeItem.month} 2026</p>
          <p className="text-[#E10600] font-bold text-xs">Rs. {activeItem.revenue.toLocaleString()}</p>
          <p className="text-[var(--admin-text-muted)] text-[10px]">{activeItem.orders} orders</p>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 3. ORDER STATUS BREAKDOWN DOUGHNUT CHART
// ─────────────────────────────────────────────────────────────

interface DoughnutSegment {
  status: string;
  label: string;
  count: number;
  percentage: number;
  color: string;
}

export function OrderStatusDoughnutChart({
  segments,
  totalOrders,
}: {
  segments: DoughnutSegment[];
  totalOrders: number;
}) {
  const [hoveredStatus, setHoveredStatus] = useState<string | null>(null);

  const radius = 62;
  const strokeWidth = 18;
  const center = 80;
  const circumference = 2 * Math.PI * radius;

  let currentOffset = 0;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 justify-between">
      {/* SVG Doughnut */}
      <div className="relative shrink-0 w-40 h-40 flex items-center justify-center">
        <svg viewBox="0 0 160 160" className="w-40 h-40 -rotate-90">
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-[var(--admin-border-subtle)]"
          />
          {segments.map((seg) => {
            const strokeDasharray = `${(seg.percentage / 100) * circumference} ${circumference}`;
            const strokeDashoffset = -currentOffset;
            currentOffset += (seg.percentage / 100) * circumference;
            const isHovered = hoveredStatus === seg.status;

            return (
              <circle
                key={seg.status}
                cx={center}
                cy={center}
                r={radius}
                fill="transparent"
                stroke={seg.color}
                strokeWidth={isHovered ? strokeWidth + 3 : strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="cursor-pointer transition-all duration-200"
                onMouseEnter={() => setHoveredStatus(seg.status)}
                onMouseLeave={() => setHoveredStatus(null)}
              />
            );
          })}
        </svg>

        {/* Center count label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          <span className="text-xl font-black text-[var(--admin-text)] tracking-tight">
            {totalOrders.toLocaleString()}
          </span>
          <span className="text-[10px] font-semibold text-[var(--admin-text-muted)] uppercase tracking-wider">
            Total Orders
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex-1 w-full space-y-2.5">
        {segments.map((seg) => (
          <div
            key={seg.status}
            onMouseEnter={() => setHoveredStatus(seg.status)}
            onMouseLeave={() => setHoveredStatus(null)}
            className={`flex items-center justify-between text-xs py-1 px-2 rounded-md transition-colors cursor-pointer ${
              hoveredStatus === seg.status ? "bg-[var(--admin-row-hover)]" : ""
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: seg.color }} />
              <span className="font-medium text-[var(--admin-text)]">{seg.label}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[var(--admin-text)]">{seg.count}</span>
              <span className="text-[10px] text-[var(--admin-text-muted)]">({seg.percentage}%)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 4. CUSTOMER GROWTH CHART
// ─────────────────────────────────────────────────────────────

export function CustomerGrowthChart({
  data,
  height = 140,
}: {
  data: { month?: string; label?: string; customers: number }[];
  height?: number;
}) {
  if (!data || data.length === 0) return null;

  const maxVal = Math.max(...data.map((d) => d.customers), 10);
  const width = 500;
  const paddingLeft = 20;
  const paddingRight = 20;
  const paddingTop = 15;
  const paddingBottom = 25;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const points = data.map((d, i) => {
    const x = paddingLeft + (i / (data.length - 1)) * chartWidth;
    const y = paddingTop + chartHeight - (d.customers / maxVal) * chartHeight;
    return { ...d, x, y };
  });

  let linePath = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p1 = points[i];
    const p2 = points[i + 1];
    const cx = (p1.x + p2.x) / 2;
    linePath += ` C ${cx} ${p1.y}, ${cx} ${p2.y}, ${p2.x} ${p2.y}`;
  }

  const areaPath = `${linePath} L ${points[points.length - 1].x} ${
    paddingTop + chartHeight
  } L ${points[0].x} ${paddingTop + chartHeight} Z`;

  return (
    <div className="relative w-full overflow-hidden select-none">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        <defs>
          <linearGradient id="customerAreaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C0C0C0" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#C0C0C0" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        <path d={areaPath} fill="url(#customerAreaGrad)" />
        <path d={linePath} fill="none" stroke="#C0C0C0" strokeWidth="2" strokeLinecap="round" />

        {points.map((pt, i) => (
          <g key={i}>
            <circle cx={pt.x} cy={pt.y} r="3" fill="#1C1C1C" stroke="#C0C0C0" strokeWidth="1.5" />
            <text
              x={pt.x}
              y={height - 6}
              textAnchor="middle"
              className="fill-[var(--admin-text-dim)] text-[9px] font-medium"
            >
              {pt.month || (pt as any).label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 5. MINI SPARKLINE
// ─────────────────────────────────────────────────────────────

export function MiniSparkline({
  values,
  isPositive = true,
  color,
}: {
  values?: number[];
  isPositive?: boolean;
  color?: string;
}) {
  const pts = values || (isPositive ? [12, 14, 13, 17, 16, 19, 23] : [24, 21, 23, 18, 19, 15, 12]);
  const min = Math.min(...pts);
  const max = Math.max(...pts);
  const range = max - min || 1;

  const w = 70;
  const h = 26;
  const strokeColor = color || (isPositive ? "#10B981" : "#E10600");

  const mapped = pts.map((val, i) => {
    const x = (i / (pts.length - 1)) * w;
    const y = h - ((val - min) / range) * (h - 6) - 3;
    return `${x},${y}`;
  });

  return (
    <svg width={w} height={h} className="shrink-0 overflow-visible">
      <polyline
        fill="none"
        stroke={strokeColor}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={mapped.join(" ")}
      />
    </svg>
  );
}

