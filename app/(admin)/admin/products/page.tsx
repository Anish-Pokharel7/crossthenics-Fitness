"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plus,
  Search,
  SlidersHorizontal,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Package,
  CheckCircle2,
  AlertTriangle,
  X,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/lib/db/types";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [publishFilter, setPublishFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState<"default" | "lowToHigh" | "highToLow">("default");

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | number | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    category: "Lifting Belts",
    price: 3800,
    salePrice: "",
    costPrice: 2000,
    stock: 20,
    lowStockThreshold: 5,
    sku: "",
    badge: "",
    description: "",
    sizes: "Small, Medium, Large",
    image: "/p-image/liftingbelts.webp",
    isPublished: true,
  });

  const categories = ["Lifting Belts", "Tactical Carry", "Calisthenics", "Grip & Accessories"];

  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/products");
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch {
      toast.error("Failed to load catalog products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const openCreateModal = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      category: "Lifting Belts",
      price: 3500,
      salePrice: "",
      costPrice: 1900,
      stock: 25,
      lowStockThreshold: 5,
      sku: `CT-NEW-${Math.floor(100 + Math.random() * 900)}`,
      badge: "New Drop",
      description: "Engineered specifically for high-intensity athletic conditioning in Nepal.",
      sizes: "Small, Medium, Large",
      image: "/p-image/liftingbelts.webp",
      isPublished: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      category: p.category,
      price: p.price,
      salePrice: p.salePrice ? String(p.salePrice) : "",
      costPrice: p.costPrice || Math.round(p.price * 0.55),
      stock: p.stock,
      lowStockThreshold: p.lowStockThreshold || 5,
      sku: p.sku,
      badge: p.badge || "",
      description: p.description,
      sizes: p.sizes ? p.sizes.join(", ") : "Standard",
      image: p.image || p.images?.[0] || "",
      isPublished: p.isPublished ?? p.published,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price) {
      toast.error("Product name and price are required.");
      return;
    }

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        salePrice: formData.salePrice ? Number(formData.salePrice) : undefined,
        costPrice: Number(formData.costPrice || 0),
        stock: Number(formData.stock || 0),
        lowStockThreshold: Number(formData.lowStockThreshold || 5),
        sizes: formData.sizes.split(",").map((s) => s.trim()).filter(Boolean),
      };

      if (editingProduct) {
        // Update product
        const res = await fetch(`/api/admin/products/${editingProduct.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to update product.");
        toast.success(`Updated ${formData.name}`);
      } else {
        // Create product
        const res = await fetch("/api/admin/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to create product.");
        toast.success(`Created product ${formData.name}`);
      }

      setIsModalOpen(false);
      loadProducts();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error saving product.");
    }
  };

  const handleTogglePublish = async (p: Product) => {
    try {
      const nextState = !(p.isPublished ?? p.published);
      const res = await fetch(`/api/admin/products/${p.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: nextState, isPublished: nextState }),
      });
      if (!res.ok) throw new Error("Failed to toggle publish status.");
      setProducts((prev) =>
        prev.map((item) =>
          item.id === p.id ? { ...item, published: nextState, isPublished: nextState } : item
        )
      );
      toast.success(`${p.name} is now ${nextState ? "Live on Storefront" : "Draft (Hidden)"}`);
    } catch {
      toast.error("Could not update publish state.");
    }
  };

  const handleDelete = async (id: string | number) => {
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Could not delete product.");
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setDeleteConfirmId(null);
      toast.success("Product deleted successfully.");
    } catch {
      toast.error("Failed to delete product.");
    }
  };

  // Filtered and sorted products
  const filteredProducts = products
    .filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.sku.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase());

      const matchCat = categoryFilter === "all" || p.category.toLowerCase() === categoryFilter.toLowerCase();

      const matchStock =
        stockFilter === "all" ||
        (stockFilter === "in_stock" && p.stock > (p.lowStockThreshold || 10)) ||
        (stockFilter === "low_stock" && p.stock > 0 && p.stock <= (p.lowStockThreshold || 10)) ||
        (stockFilter === "out_of_stock" && p.stock === 0);

      const matchPublish =
        publishFilter === "all" ||
        (publishFilter === "published" && (p.isPublished ?? p.published)) ||
        (publishFilter === "draft" && !(p.isPublished ?? p.published));

      return matchSearch && matchCat && matchStock && matchPublish;
    })
    .sort((a, b) => {
      if (sortOrder === "lowToHigh") return a.price - b.price;
      if (sortOrder === "highToLow") return b.price - a.price;
      return 0;
    });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[var(--admin-border)]">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tight text-[var(--admin-text)]">
            Product Catalog
          </h2>
          <p className="text-xs text-[var(--admin-text-muted)] mt-1">
            Manage your store items, inventory counts, pricing, and live storefront availability.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#E10600] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#B80500] transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Add Product</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="admin-card rounded-2xl p-4 space-y-3">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search box */}
          <div className="relative flex-1 w-full">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--admin-text-muted)]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by product name, SKU, or category..."
              className="admin-input h-10 w-full rounded-xl pl-10 pr-4 text-xs"
            />
          </div>

          {/* Category filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="admin-input h-10 rounded-xl px-3 text-xs w-full md:w-44 font-medium"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          {/* Stock filter */}
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            className="admin-input h-10 rounded-xl px-3 text-xs w-full md:w-36 font-medium"
          >
            <option value="all">Stock: All</option>
            <option value="in_stock">In Stock</option>
            <option value="low_stock">Low Stock (≤5)</option>
            <option value="out_of_stock">Out of Stock</option>
          </select>

          {/* Publish status */}
          <select
            value={publishFilter}
            onChange={(e) => setPublishFilter(e.target.value)}
            className="admin-input h-10 rounded-xl px-3 text-xs w-full md:w-36 font-medium"
          >
            <option value="all">Status: All</option>
            <option value="published">Published</option>
            <option value="draft">Draft (Hidden)</option>
          </select>

          {/* Price sorting */}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "default" | "lowToHigh" | "highToLow")}
            className="admin-input h-10 rounded-xl px-3 text-xs w-full md:w-36 font-medium"
          >
            <option value="default">Sort: Default</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Product Table / Cards */}
      <div className="admin-card rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[var(--admin-border)] bg-[var(--admin-card-elevated)] text-[var(--admin-text-dim)] text-[10px] font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">Product</th>
                <th className="py-3.5 px-4">SKU</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Stock</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--admin-border)]">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[var(--admin-text-muted)]">
                    Loading store products...
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[var(--admin-text-muted)]">
                    No products matched your search or filters.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => {
                  const isLow = p.stock > 0 && p.stock <= (p.lowStockThreshold || 10);
                  const isOut = p.stock === 0;

                  return (
                    <tr key={p.id} className="admin-row-hover transition-colors">
                      {/* Name & Thumb */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-[var(--admin-border)] bg-[var(--admin-card-elevated)] p-1">
                            <Image
                              src={p.image || p.images?.[0] || "/p-image/liftingbelts.webp"}
                              alt={p.name}
                              fill
                              sizes="48px"
                              className="object-contain p-1"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-[var(--admin-text)] truncate">{p.name}</p>
                            {p.badge && (
                              <span className="inline-block px-1.5 py-0.2 rounded text-[9px] font-bold uppercase bg-[#E10600]/10 text-[#E10600] border border-[#E10600]/30 mt-0.5">
                                {p.badge}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* SKU */}
                      <td className="py-3 px-4 font-mono text-[var(--admin-text-muted)]">
                        {p.sku}
                      </td>

                      {/* Category */}
                      <td className="py-3 px-4 font-semibold text-[var(--admin-text)]">
                        {p.category}
                      </td>

                      {/* Price */}
                      <td className="py-3 px-4 font-extrabold text-[var(--admin-text)]">
                        Rs. {p.price.toLocaleString()}
                      </td>

                      {/* Stock Level */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`inline-block h-2 w-2 rounded-full ${
                              isOut ? "bg-[#E10600]" : isLow ? "bg-amber-500" : "bg-emerald-500"
                            }`}
                          />
                          <span className="font-bold">{p.stock} units</span>
                          {isLow && (
                            <span className="text-[10px] text-amber-500 font-bold">(Low)</span>
                          )}
                          {isOut && (
                            <span className="text-[10px] text-[#E10600] font-bold">(Out)</span>
                          )}
                        </div>
                      </td>

                      {/* Published Toggle */}
                      <td className="py-3 px-4">
                        <button
                          type="button"
                          onClick={() => handleTogglePublish(p)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold transition-colors ${
                            (p.isPublished ?? p.published)
                              ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/30"
                              : "bg-zinc-500/10 text-zinc-400 border border-zinc-500/30"
                          }`}
                        >
                          {(p.isPublished ?? p.published) ? <Eye size={12} /> : <EyeOff size={12} />}
                          <span>{(p.isPublished ?? p.published) ? "Live" : "Draft"}</span>
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={`/products/${p.id}`}
                            target="_blank"
                            title="View on storefront"
                            className="grid h-8 w-8 place-items-center rounded-lg text-[var(--admin-text-muted)] hover:text-[var(--admin-text)] hover:bg-[var(--admin-card-elevated)] transition-colors"
                          >
                            <ExternalLink size={14} />
                          </Link>

                          <button
                            type="button"
                            onClick={() => openEditModal(p)}
                            title="Edit product"
                            className="grid h-8 w-8 place-items-center rounded-lg text-[var(--admin-text-muted)] hover:text-[var(--admin-text)] hover:bg-[var(--admin-card-elevated)] transition-colors"
                          >
                            <Edit2 size={14} />
                          </button>

                          <button
                            type="button"
                            onClick={() => setDeleteConfirmId(p.id)}
                            title="Delete product"
                            className="grid h-8 w-8 place-items-center rounded-lg text-[var(--admin-text-muted)] hover:text-[#E10600] hover:bg-[#E10600]/10 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE / EDIT PRODUCT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="admin-card rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--admin-border)]">
              <h3 className="text-base font-bold text-[var(--admin-text)] uppercase tracking-tight">
                {editingProduct ? `Edit ${editingProduct.name}` : "Add New Gear / Product"}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="grid h-7 w-7 place-items-center rounded-lg text-[var(--admin-text-muted)] hover:text-[var(--admin-text)]"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-bold text-[var(--admin-text)]">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Leather Lever Belt 10mm"
                    className="admin-input h-10 w-full rounded-xl px-3"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-bold text-[var(--admin-text)]">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="admin-input h-10 w-full rounded-xl px-3"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block mb-1 font-bold text-[var(--admin-text)]">Selling Price (NPR) *</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    placeholder="3800"
                    className="admin-input h-10 w-full rounded-xl px-3"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-bold text-[var(--admin-text)]">Cost Price (NPR)</label>
                  <input
                    type="number"
                    value={formData.costPrice}
                    onChange={(e) => setFormData({ ...formData, costPrice: Number(e.target.value) })}
                    placeholder="2000"
                    className="admin-input h-10 w-full rounded-xl px-3"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-bold text-[var(--admin-text)]">SKU / Code *</label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    placeholder="CT-BLT-01"
                    className="admin-input h-10 w-full rounded-xl px-3 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block mb-1 font-bold text-[var(--admin-text)]">Initial Stock</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                    className="admin-input h-10 w-full rounded-xl px-3"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-bold text-[var(--admin-text)]">Low Stock Threshold</label>
                  <input
                    type="number"
                    value={formData.lowStockThreshold}
                    onChange={(e) => setFormData({ ...formData, lowStockThreshold: Number(e.target.value) })}
                    className="admin-input h-10 w-full rounded-xl px-3"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-bold text-[var(--admin-text)]">Badge / Highlight</label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="Bestseller / New"
                    className="admin-input h-10 w-full rounded-xl px-3"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 font-bold text-[var(--admin-text)]">Sizes (Comma separated)</label>
                <input
                  type="text"
                  value={formData.sizes}
                  onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                  placeholder="Small (28-32), Medium (32-36), Large (36-40)"
                  className="admin-input h-10 w-full rounded-xl px-3"
                />
              </div>

              <div>
                <label className="block mb-1 font-bold text-[var(--admin-text)]">Image Asset Path / URL</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/p-image/liftingbelts.webp"
                  className="admin-input h-10 w-full rounded-xl px-3 font-mono"
                />
              </div>

              <div>
                <label className="block mb-1 font-bold text-[var(--admin-text)]">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="admin-input w-full rounded-xl p-3 resize-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="publishToggle"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  className="rounded border-[var(--admin-border)]"
                />
                <label htmlFor="publishToggle" className="font-bold text-[var(--admin-text)] cursor-pointer">
                  Publish immediately (Visible on live storefront)
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--admin-border)]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[var(--admin-border)] font-bold text-[var(--admin-text-muted)] hover:text-[var(--admin-text)]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#E10600] text-white font-bold hover:bg-[#B80500] transition-colors"
                >
                  {editingProduct ? "Save Changes" : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION DIALOG */}
      {deleteConfirmId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="admin-card rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-[var(--admin-text)]">Confirm Deletion</h3>
            <p className="text-xs text-[var(--admin-text-muted)] leading-relaxed">
              Are you sure you want to delete this product? It will be permanently removed from both the admin database and the storefront catalog.
            </p>
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[var(--admin-border)]">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl border border-[var(--admin-border)] text-xs font-bold text-[var(--admin-text-muted)] hover:text-[var(--admin-text)]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 rounded-xl bg-[#E10600] text-xs text-white font-bold hover:bg-[#B80500]"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
