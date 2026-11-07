"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Search,
  Filter,
  Eye,
  CheckCircle2,
  Clock,
  Truck,
  RotateCcw,
  XCircle,
  FileText,
  Printer,
  X,
  CreditCard,
  Phone,
  MapPin,
  Calendar,
} from "lucide-react";
import { toast } from "sonner";
import type { Order, OrderFulfillmentStatus, OrderPaymentStatus } from "@/lib/db/types";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/orders");
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch {
      toast.error("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleUpdateStatus = async (
    orderId: string,
    updates: { fulfillmentStatus?: OrderFulfillmentStatus; paymentStatus?: OrderPaymentStatus; trackingNumber?: string }
  ) => {
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      if (!res.ok) throw new Error("Failed to update order status.");
      const updated = await res.json();

      setOrders((prev) => prev.map((o) => (o.id === orderId ? updated : o)));
      if (selectedOrder?.id === orderId) {
        setSelectedOrder(updated);
      }

      toast.success(`Order #${orderId} status updated.`);
    } catch {
      toast.error("Could not update order status.");
    }
  };

  const filteredOrders = orders.filter((o) => {
    const matchSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.customerPhone.includes(search) ||
      o.shippingAddress.city.toLowerCase().includes(search.toLowerCase());

    const matchStatus = statusFilter === "all" || o.fulfillmentStatus === statusFilter;
    const matchPayment = paymentFilter === "all" || o.paymentMethod === paymentFilter;

    return matchSearch && matchStatus && matchPayment;
  });

  const getStatusBadge = (status: OrderFulfillmentStatus) => {
    switch (status) {
      case "delivered":
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 capitalize">Delivered</span>;
      case "shipped":
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-500 border border-blue-500/20 capitalize">Shipped</span>;
      case "processing":
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20 capitalize">Processing</span>;
      case "confirmed":
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/10 text-purple-500 border border-purple-500/20 capitalize">Confirmed</span>;
      case "pending":
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E10600]/10 text-[#E10600] border border-[#E10600]/25 capitalize">Pending</span>;
      case "cancelled":
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-zinc-500/10 text-zinc-400 border border-zinc-500/20 capitalize">Cancelled</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-zinc-500/10 text-zinc-400 capitalize">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[var(--admin-border)]">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tight text-[var(--admin-text)]">
            Orders &amp; Dispatch
          </h2>
          <p className="text-xs text-[var(--admin-text-muted)] mt-1">
            Track customer requests, payments across Nepal, courier dispatches, and invoices.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[var(--admin-text)] px-3 py-1.5 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card-elevated)]">
            {orders.length} Total Orders
          </span>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="admin-card rounded-2xl p-4">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--admin-text-muted)]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by order ID (#CT-...), customer name, mobile, or city..."
              className="admin-input h-10 w-full rounded-xl pl-10 pr-4 text-xs"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="admin-input h-10 rounded-xl px-3 text-xs w-full md:w-44 font-medium"
          >
            <option value="all">Fulfillment: All</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="admin-input h-10 rounded-xl px-3 text-xs w-full md:w-40 font-medium"
          >
            <option value="all">Payment: All</option>
            <option value="COD">Cash on Delivery (COD)</option>
            <option value="ESEWA">eSewa Direct</option>
            <option value="KHALTI">Khalti Wallet</option>
            <option value="BANK">Bank Transfer</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="admin-card rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[var(--admin-border)] bg-[var(--admin-card-elevated)] text-[var(--admin-text-dim)] text-[10px] font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">Order ID</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Date &amp; Time</th>
                <th className="py-3.5 px-4">Items</th>
                <th className="py-3.5 px-4">Total Amount</th>
                <th className="py-3.5 px-4">Payment</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--admin-border)]">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-[var(--admin-text-muted)]">
                    Loading customer orders...
                  </td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-[var(--admin-text-muted)]">
                    No orders found matching the filter criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((o) => (
                  <tr key={o.id} className="admin-row-hover transition-colors">
                    {/* ID */}
                    <td className="py-3 px-4 font-bold text-[var(--admin-text)]">
                      #{o.id}
                    </td>

                    {/* Customer */}
                    <td className="py-3 px-4">
                      <div className="font-bold text-[var(--admin-text)]">{o.customerName}</div>
                      <div className="text-[11px] text-[var(--admin-text-muted)]">{o.customerPhone}</div>
                      <div className="text-[10px] text-[var(--admin-text-dim)]">{o.shippingAddress.city}</div>
                    </td>

                    {/* Date */}
                    <td className="py-3 px-4 text-[var(--admin-text-muted)]">
                      <div>
                        {new Date(o.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                      <div className="text-[10px] text-[var(--admin-text-dim)]">
                        {new Date(o.createdAt).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </td>

                    {/* Items */}
                    <td className="py-3 px-4 font-medium text-[var(--admin-text)]">
                      {o.items.map((it, i) => (
                        <div key={i} className="truncate max-w-[200px]">
                          {it.quantity}x {it.name || it.productName} {it.size ? `(${it.size})` : ""}
                        </div>
                      ))}
                    </td>

                    {/* Amount */}
                    <td className="py-3 px-4 font-black text-[var(--admin-text)]">
                      Rs. {(o.grandTotal || o.total).toLocaleString()}
                    </td>

                    {/* Payment Method & Status */}
                    <td className="py-3 px-4">
                      <span className="font-bold uppercase text-[10px] block text-[var(--admin-text)]">
                        {o.paymentMethod}
                      </span>
                      <span
                        className={`text-[9px] font-bold uppercase ${
                          o.paymentStatus === "paid" ? "text-emerald-500" : "text-amber-500"
                        }`}
                      >
                        {o.paymentStatus}
                      </span>
                    </td>

                    {/* Fulfillment Status */}
                    <td className="py-3 px-4">
                      {getStatusBadge(o.fulfillmentStatus)}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedOrder(o)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--admin-border)] bg-[var(--admin-card-elevated)] text-[var(--admin-text)] hover:text-[#E10600] font-bold text-xs transition-colors"
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

      {/* ORDER DETAILS MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="admin-card rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-5">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[var(--admin-border)]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#E10600]">
                  Dispatch Details
                </span>
                <h3 className="text-lg font-black text-[var(--admin-text)]">
                  Order #{selectedOrder.id}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsInvoiceOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--admin-border)] text-xs font-bold text-[var(--admin-text)] hover:bg-[var(--admin-row-hover)]"
                >
                  <Printer size={13} />
                  <span>Print Invoice</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="grid h-8 w-8 place-items-center rounded-lg text-[var(--admin-text-muted)] hover:text-[var(--admin-text)]"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Customer & Delivery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card-elevated)] space-y-1.5">
                <p className="font-bold text-[var(--admin-text)] flex items-center gap-1.5">
                  <Phone size={14} className="text-[#E10600]" />
                  <span>Customer Contact</span>
                </p>
                <p className="font-bold text-sm text-[var(--admin-text)]">{selectedOrder.customerName}</p>
                <p className="text-[var(--admin-text-muted)]">Phone: {selectedOrder.customerPhone}</p>
                {selectedOrder.customerEmail && (
                  <p className="text-[var(--admin-text-muted)]">Email: {selectedOrder.customerEmail}</p>
                )}
              </div>

              <div className="p-3.5 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card-elevated)] space-y-1.5">
                <p className="font-bold text-[var(--admin-text)] flex items-center gap-1.5">
                  <MapPin size={14} className="text-[#E10600]" />
                  <span>Delivery Address</span>
                </p>
                <p className="text-[var(--admin-text)] font-semibold">{selectedOrder.shippingAddress.street}</p>
                <p className="text-[var(--admin-text-muted)]">
                  {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.province || selectedOrder.shippingAddress.state || "Nepal"}
                </p>
                {selectedOrder.notes && (
                  <p className="text-[10px] text-[#E10600] italic">Note: {selectedOrder.notes}</p>
                )}
              </div>
            </div>

            {/* Line Items Table */}
            <div>
              <p className="font-bold text-xs uppercase tracking-wider text-[var(--admin-text-dim)] mb-2">
                Ordered Gear
              </p>
              <div className="rounded-xl border border-[var(--admin-border)] overflow-hidden">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[var(--admin-card-elevated)] text-[var(--admin-text-dim)] text-[10px] font-bold uppercase">
                    <tr>
                      <th className="py-2.5 px-3">Item</th>
                      <th className="py-2.5 px-3">Price</th>
                      <th className="py-2.5 px-3">Qty</th>
                      <th className="py-2.5 px-3 text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--admin-border)]">
                    {selectedOrder.items.map((item, idx) => (
                      <tr key={idx} className="admin-row-hover">
                        <td className="py-2.5 px-3 font-semibold text-[var(--admin-text)]">
                          {item.name || item.productName} {item.size ? `(${item.size})` : ""}
                        </td>
                        <td className="py-2.5 px-3 text-[var(--admin-text-muted)]">
                          Rs. {item.price.toLocaleString()}
                        </td>
                        <td className="py-2.5 px-3 font-bold">{item.quantity}</td>
                        <td className="py-2.5 px-3 text-right font-extrabold text-[var(--admin-text)]">
                          Rs. {(item.price * item.quantity).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Total Calculation */}
              <div className="pt-3 space-y-1 text-xs text-right">
                <div className="flex justify-between text-[var(--admin-text-muted)]">
                  <span>Subtotal:</span>
                  <span>Rs. {selectedOrder.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[var(--admin-text-muted)]">
                  <span>Shipping:</span>
                  <span>
                    {(selectedOrder.shippingCost ?? selectedOrder.shippingCharge) === 0
                      ? "Free"
                      : `Rs. ${selectedOrder.shippingCost ?? selectedOrder.shippingCharge}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-[var(--admin-text)] pt-1 border-t border-[var(--admin-border)]">
                  <span>Total Payable:</span>
                  <span className="text-[#E10600]">Rs. {selectedOrder.grandTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Status Modification Controls */}
            <div className="p-4 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card-elevated)] space-y-3 text-xs">
              <p className="font-bold text-[var(--admin-text)]">Update Order &amp; Courier Status</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 font-semibold text-[var(--admin-text-muted)]">
                    Fulfillment Status
                  </label>
                  <select
                    value={selectedOrder.fulfillmentStatus}
                    onChange={(e) =>
                      handleUpdateStatus(selectedOrder.id, {
                        fulfillmentStatus: e.target.value as OrderFulfillmentStatus,
                      })
                    }
                    className="admin-input h-9 w-full rounded-lg px-2.5 font-bold capitalize"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 font-semibold text-[var(--admin-text-muted)]">
                    Payment Status
                  </label>
                  <select
                    value={selectedOrder.paymentStatus}
                    onChange={(e) =>
                      handleUpdateStatus(selectedOrder.id, {
                        paymentStatus: e.target.value as OrderPaymentStatus,
                      })
                    }
                    className="admin-input h-9 w-full rounded-lg px-2.5 font-bold capitalize"
                  >
                    <option value="paid">Paid</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                    <option value="refunded">Refunded</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block mb-1 font-semibold text-[var(--admin-text-muted)]">
                  Tracking Number / Courier Note
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    defaultValue={selectedOrder.trackingNumber || ""}
                    placeholder="e.g. PTH-KTM-88120"
                    id="trackingInput"
                    className="admin-input h-9 flex-1 rounded-lg px-3 font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const input = document.getElementById("trackingInput") as HTMLInputElement;
                      if (input) {
                        handleUpdateStatus(selectedOrder.id, { trackingNumber: input.value });
                      }
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#C0C0C0] text-[#1C1C1C] font-bold text-xs hover:opacity-90"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PRINTABLE INVOICE MODAL */}
      {isInvoiceOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white text-zinc-900 rounded-2xl w-full max-w-xl p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
              <div>
                <h1 className="text-xl font-black uppercase text-[#1C1C1C]">CROSSTHENICS FITNESS</h1>
                <p className="text-xs text-zinc-500">Pokhara, Gandaki Province, Nepal</p>
                <p className="text-xs text-zinc-500">Phone: +977 9804165664</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold uppercase text-[#E10600]">Tax Invoice</span>
                <p className="text-sm font-black">#{selectedOrder.id}</p>
                <p className="text-xs text-zinc-500">
                  {new Date(selectedOrder.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="text-xs space-y-1">
              <p className="font-bold uppercase text-zinc-500 text-[10px]">Billed To:</p>
              <p className="font-bold text-sm text-zinc-900">{selectedOrder.customerName}</p>
              <p className="text-zinc-600">{selectedOrder.customerPhone}</p>
              <p className="text-zinc-600">
                {selectedOrder.shippingAddress.street}, {selectedOrder.shippingAddress.city}
              </p>
            </div>

            <table className="w-full text-xs text-left border-t border-b border-zinc-200 py-2">
              <thead>
                <tr className="text-zinc-400 text-[10px] font-bold uppercase">
                  <th className="py-2">Item Description</th>
                  <th className="py-2 text-center">Qty</th>
                  <th className="py-2 text-right">Rate</th>
                  <th className="py-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {selectedOrder.items.map((it, idx) => (
                  <tr key={idx}>
                    <td className="py-2 font-semibold">
                      {it.name} {it.size ? `(${it.size})` : ""}
                    </td>
                    <td className="py-2 text-center">{it.quantity}</td>
                    <td className="py-2 text-right">Rs. {it.price.toLocaleString()}</td>
                    <td className="py-2 text-right font-bold">
                      Rs. {(it.price * it.quantity).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="space-y-1 text-xs text-right">
              <div className="flex justify-between text-zinc-500">
                <span>Subtotal:</span>
                <span>Rs. {selectedOrder.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-zinc-500">
                <span>Shipping:</span>
                <span>
                  {(selectedOrder.shippingCost ?? selectedOrder.shippingCharge) === 0
                    ? "Free"
                    : `Rs. ${selectedOrder.shippingCost ?? selectedOrder.shippingCharge}`}
                </span>
              </div>
              <div className="flex justify-between font-black text-sm pt-2 border-t border-zinc-200 text-zinc-900">
                <span>Total Payable:</span>
                <span className="text-[#E10600]">Rs. {selectedOrder.grandTotal.toLocaleString()}</span>
              </div>
              <div className="text-[10px] text-zinc-500 pt-1">
                Payment: {selectedOrder.paymentMethod} ({selectedOrder.paymentStatus.toUpperCase()})
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-200">
              <button
                type="button"
                onClick={() => setIsInvoiceOpen(false)}
                className="px-4 py-2 rounded-xl border border-zinc-300 text-xs font-bold text-zinc-600 hover:text-zinc-900"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-[#1C1C1C] text-white text-xs font-bold hover:bg-zinc-800"
              >
                Print / Save PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
