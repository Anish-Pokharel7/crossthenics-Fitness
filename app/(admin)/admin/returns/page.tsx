"use client";

import React, { useState, useEffect } from "react";
import {
  RotateCcw,
  CheckCircle2,
  XCircle,
  Clock,
  PackageCheck,
  Phone,
  FileText,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";
import type { ReturnRequest } from "@/lib/db/types";

type ReturnStatus = "pending" | "approved" | "rejected" | "completed";

export default function AdminReturnsPage() {
  const [returns, setReturns] = useState<ReturnRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<"all" | ReturnStatus>("all");
  const [actionModal, setActionModal] = useState<{
    item: ReturnRequest;
    nextStatus: ReturnStatus;
  } | null>(null);
  const [resolutionNote, setResolutionNote] = useState("");
  const [saving, setSaving] = useState(false);

  const loadReturns = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/returns");
      if (res.ok) {
        const data = await res.json();
        setReturns(data);
      } else {
        toast.error("Failed to load return requests.");
      }
    } catch {
      toast.error("Could not reach the server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReturns();
  }, []);

  const handleUpdateStatus = async (
    id: string,
    status: ReturnStatus,
    note: string
  ) => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/returns", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status, resolutionNote: note }),
      });

      if (!res.ok) throw new Error("Failed to update return status.");
      const updated: ReturnRequest = await res.json();

      setReturns((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
      toast.success(`Return #${id} marked as ${status}.`);
      setActionModal(null);
      setResolutionNote("");
    } catch {
      toast.error("Could not update the return request.");
    } finally {
      setSaving(false);
    }
  };

  const counts = {
    pending: returns.filter((r) => r.status === "pending").length,
    approved: returns.filter((r) => r.status === "approved").length,
    completed: returns.filter((r) => r.status === "completed").length,
    rejected: returns.filter((r) => r.status === "rejected").length,
  };

  const filtered =
    statusFilter === "all"
      ? returns
      : returns.filter((r) => r.status === statusFilter);

  const getStatusBadge = (status: ReturnStatus) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20">
            <Clock size={10} /> Pending
          </span>
        );
      case "approved":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <CheckCircle2 size={10} /> Approved
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E10600]/10 text-[#E10600] border border-[#E10600]/20">
            <XCircle size={10} /> Rejected
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            <PackageCheck size={10} /> Completed
          </span>
        );
    }
  };

  const getActionBadge = (action: ReturnRequest["action"]) =>
    action === "exchange" ? (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20 uppercase tracking-wide">
        <RefreshCw size={9} /> Exchange
      </span>
    ) : (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-teal-500/10 text-teal-400 border border-teal-500/20 uppercase tracking-wide">
        <RotateCcw size={9} /> Refund
      </span>
    );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[var(--admin-border)]">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tight text-[var(--admin-text)]">
            Returns &amp; Refunds
          </h2>
          <p className="text-xs text-[var(--admin-text-muted)] mt-1">
            Manage customer exchange and refund requests across all orders.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={loadReturns}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card-elevated)] text-[var(--admin-text-muted)] hover:text-[var(--admin-text)] text-xs font-bold transition-colors"
          >
            <RefreshCw size={13} />
            Refresh
          </button>

          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-500 text-[11px] font-bold">
            <Clock size={11} />
            {counts.pending} Pending
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-400 text-[11px] font-bold">
            <CheckCircle2 size={11} />
            {counts.approved} Approved
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-500 text-[11px] font-bold">
            <PackageCheck size={11} />
            {counts.completed} Completed
          </span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="admin-card rounded-2xl p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-[var(--admin-text-muted)] mr-1">
            Filter:
          </span>
          {(["all", "pending", "approved", "rejected", "completed"] as const).map(
            (s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors capitalize border ${
                  statusFilter === s
                    ? "bg-[#E10600] text-white border-[#E10600]"
                    : "border-[var(--admin-border)] bg-[var(--admin-card-elevated)] text-[var(--admin-text-muted)] hover:text-[var(--admin-text)]"
                }`}
              >
                {s === "all" ? "All Requests" : s}
                {s !== "all" && counts[s] !== undefined && (
                  <span className="ml-1.5 opacity-75">({counts[s]})</span>
                )}
              </button>
            )
          )}
        </div>
      </div>

      {/* Table */}
      <div className="admin-card rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[var(--admin-border)] bg-[var(--admin-card-elevated)] text-[var(--admin-text-dim)] text-[10px] font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">Return ID</th>
                <th className="py-3.5 px-4">Order ID</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Reason</th>
                <th className="py-3.5 px-4">Action</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--admin-border)]">
              {loading ? (
                <tr>
                  <td
                    colSpan={8}
                    className="py-16 text-center text-[var(--admin-text-muted)]"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <RotateCcw
                        size={22}
                        className="animate-spin opacity-40"
                      />
                      <span>Loading return requests…</span>
                    </div>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="py-16 text-center text-[var(--admin-text-muted)]"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <FileText size={22} className="opacity-30" />
                      <span>
                        {statusFilter === "all"
                          ? "No return requests yet."
                          : `No ${statusFilter} requests.`}
                      </span>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((r) => (
                  <tr key={r.id} className="admin-row-hover transition-colors">
                    {/* Return ID */}
                    <td className="py-3 px-4 font-black text-[var(--admin-text)] font-mono">
                      #{r.id}
                    </td>

                    {/* Order ID */}
                    <td className="py-3 px-4 font-bold text-[var(--admin-text-muted)] font-mono">
                      #{r.orderId}
                    </td>

                    {/* Customer */}
                    <td className="py-3 px-4">
                      <div className="font-bold text-[var(--admin-text)]">
                        {r.customerName}
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-[var(--admin-text-muted)] mt-0.5">
                        <Phone size={10} />
                        {r.customerPhone}
                      </div>
                    </td>

                    {/* Reason */}
                    <td className="py-3 px-4 max-w-[180px]">
                      <span
                        className="text-[var(--admin-text)] line-clamp-2"
                        title={r.reason}
                      >
                        {r.reason}
                      </span>
                    </td>

                    {/* Action type */}
                    <td className="py-3 px-4">
                      {getActionBadge(r.action)}
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4">
                      {getStatusBadge(r.status)}
                    </td>

                    {/* Date */}
                    <td className="py-3 px-4 text-[var(--admin-text-muted)]">
                      {new Date(r.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>

                    {/* Action Buttons */}
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-1.5 flex-wrap">
                        {r.status === "pending" && (
                          <>
                            <button
                              type="button"
                              onClick={() =>
                                setActionModal({ item: r, nextStatus: "approved" })
                              }
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-600/10 text-emerald-500 border border-emerald-500/20 hover:bg-emerald-600/20 font-bold text-[11px] transition-colors"
                            >
                              <CheckCircle2 size={12} />
                              Approve
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                setActionModal({ item: r, nextStatus: "rejected" })
                              }
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#E10600]/10 text-[#E10600] border border-[#E10600]/20 hover:bg-[#E10600]/20 font-bold text-[11px] transition-colors"
                            >
                              <XCircle size={12} />
                              Reject
                            </button>
                          </>
                        )}
                        {r.status === "approved" && (
                          <button
                            type="button"
                            onClick={() =>
                              setActionModal({ item: r, nextStatus: "completed" })
                            }
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-600/10 text-blue-400 border border-blue-500/20 hover:bg-blue-600/20 font-bold text-[11px] transition-colors"
                          >
                            <PackageCheck size={12} />
                            Mark Completed
                          </button>
                        )}
                        {(r.status === "completed" || r.status === "rejected") && (
                          <span className="text-[10px] text-[var(--admin-text-dim)] italic px-1">
                            {r.resolutionNote || "—"}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Confirmation Modal */}
      {actionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="admin-card rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-5">
            <div className="pb-3 border-b border-[var(--admin-border)]">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#E10600]">
                Confirm Action
              </span>
              <h3 className="text-base font-black text-[var(--admin-text)] mt-0.5">
                Mark Return #{actionModal.item.id} as{" "}
                <span className="capitalize">{actionModal.nextStatus}</span>
              </h3>
            </div>

            <div className="space-y-1 text-xs text-[var(--admin-text-muted)]">
              <div>
                <span className="font-bold text-[var(--admin-text)]">
                  Customer:
                </span>{" "}
                {actionModal.item.customerName} &mdash;{" "}
                {actionModal.item.customerPhone}
              </div>
              <div>
                <span className="font-bold text-[var(--admin-text)]">
                  Reason:
                </span>{" "}
                {actionModal.item.reason}
              </div>
              <div>
                <span className="font-bold text-[var(--admin-text)]">
                  Requested:
                </span>{" "}
                {actionModal.item.action === "exchange" ? "Exchange" : "Refund"}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[var(--admin-text-muted)] mb-1.5">
                Resolution Note{" "}
                <span className="font-normal opacity-60">(optional)</span>
              </label>
              <textarea
                rows={3}
                value={resolutionNote}
                onChange={(e) => setResolutionNote(e.target.value)}
                placeholder="e.g. Replacement dispatched via Sundar Courier, or refund initiated…"
                className="admin-input w-full rounded-xl px-3 py-2.5 text-xs resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setActionModal(null);
                  setResolutionNote("");
                }}
                className="px-4 py-2 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card-elevated)] text-xs font-bold text-[var(--admin-text-muted)] hover:text-[var(--admin-text)] transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={saving}
                onClick={() =>
                  handleUpdateStatus(
                    actionModal.item.id,
                    actionModal.nextStatus,
                    resolutionNote
                  )
                }
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-colors disabled:opacity-60 ${
                  actionModal.nextStatus === "rejected"
                    ? "bg-[#E10600] text-white hover:bg-[#c00500]"
                    : actionModal.nextStatus === "approved"
                    ? "bg-emerald-600 text-white hover:bg-emerald-700"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {saving
                  ? "Saving…"
                  : `Confirm — ${
                      actionModal.nextStatus.charAt(0).toUpperCase() +
                      actionModal.nextStatus.slice(1)
                    }`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
