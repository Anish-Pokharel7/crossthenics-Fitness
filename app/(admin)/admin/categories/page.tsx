"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Edit2, Trash2, Eye, EyeOff, Tags, X, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import type { Category } from "@/lib/db/types";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    image: "/p-image/liftingbelts.webp",
    isVisible: true,
    sortOrder: 1,
  });

  const loadCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/categories");
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch {
      toast.error("Failed to load categories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const openCreateModal = () => {
    setEditingCategory(null);
    setFormData({
      name: "",
      slug: "",
      description: "",
      image: "/p-image/liftingbelts.webp",
      isVisible: true,
      sortOrder: categories.length + 1,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (cat: Category) => {
    setEditingCategory(cat);
    setFormData({
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      image: cat.image,
      isVisible: cat.isVisible ?? cat.visible,
      sortOrder: cat.sortOrder ?? 1,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Category name is required.");
      return;
    }

    try {
      if (editingCategory) {
        const res = await fetch(`/api/admin/categories/${editingCategory.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error("Failed to update category.");
        toast.success(`Updated ${formData.name}`);
      } else {
        const res = await fetch("/api/admin/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error("Failed to create category.");
        toast.success(`Created category ${formData.name}`);
      }

      setIsModalOpen(false);
      loadCategories();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error saving category.");
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete category "${name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete category.");
      setCategories((prev) => prev.filter((c) => c.id !== id));
      toast.success(`Deleted category ${name}`);
    } catch {
      toast.error("Could not delete category.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[var(--admin-border)]">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tight text-[var(--admin-text)]">
            Product Categories
          </h2>
          <p className="text-xs text-[var(--admin-text-muted)] mt-1">
            Organize athletic gear into clean shopping collections across the storefront.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 rounded-xl bg-[#E10600] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#B80500] transition-colors self-start sm:self-auto shadow-sm"
        >
          <Plus size={16} />
          <span>Add Category</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {loading ? (
          [1, 2, 3, 4].map((i) => (
            <div key={i} className="h-64 rounded-2xl admin-card animate-pulse" />
          ))
        ) : categories.length === 0 ? (
          <div className="col-span-full py-12 text-center text-[var(--admin-text-muted)] text-xs">
            No categories found. Create your first category above.
          </div>
        ) : (
          categories.map((c) => (
            <div
              key={c.id}
              className="admin-card rounded-2xl overflow-hidden flex flex-col justify-between group transition-all duration-200 hover:shadow-md"
            >
              <div>
                <div className="relative h-36 w-full bg-[var(--admin-card-elevated)] border-b border-[var(--admin-border)] p-3">
                  <Image
                    src={c.image}
                    alt={c.name}
                    fill
                    sizes="240px"
                    className="object-contain p-2 group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute top-2.5 right-2.5">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold ${
                        (c.isVisible ?? c.visible)
                          ? "bg-emerald-500/15 text-emerald-500 border border-emerald-500/30"
                          : "bg-zinc-500/15 text-zinc-400 border border-zinc-500/30"
                      }`}
                    >
                      {(c.isVisible ?? c.visible) ? <Eye size={10} /> : <EyeOff size={10} />}
                      <span>{(c.isVisible ?? c.visible) ? "Visible" : "Hidden"}</span>
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#E10600]">
                    Rank #{c.sortOrder ?? 1}
                  </span>
                  <h3 className="font-extrabold text-sm text-[var(--admin-text)]">{c.name}</h3>
                  <p className="text-xs text-[var(--admin-text-muted)] line-clamp-2 leading-relaxed">
                    {c.description || "No description provided."}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-2 border-t border-[var(--admin-border)] flex items-center justify-between text-xs">
                <span className="font-bold text-[var(--admin-text-muted)]">
                  {c.productCount} {c.productCount === 1 ? "Product" : "Products"}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => openEditModal(c)}
                    className="grid h-7 w-7 place-items-center rounded-lg text-[var(--admin-text-muted)] hover:text-[var(--admin-text)] hover:bg-[var(--admin-row-hover)]"
                  >
                    <Edit2 size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(c.id, c.name)}
                    className="grid h-7 w-7 place-items-center rounded-lg text-[var(--admin-text-muted)] hover:text-[#E10600] hover:bg-[#E10600]/10"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* CREATE / EDIT CATEGORY MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="admin-card rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--admin-border)]">
              <h3 className="text-sm font-bold text-[var(--admin-text)] uppercase tracking-tight">
                {editingCategory ? `Edit Category` : "Create New Category"}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="grid h-7 w-7 place-items-center rounded-lg text-[var(--admin-text-muted)] hover:text-[var(--admin-text)]"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block mb-1 font-bold text-[var(--admin-text)]">Category Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Calisthenics Hardware"
                  className="admin-input h-10 w-full rounded-xl px-3"
                />
              </div>

              <div>
                <label className="block mb-1 font-bold text-[var(--admin-text)]">Image Asset Path / URL</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/p-image/prorope.webp"
                  className="admin-input h-10 w-full rounded-xl px-3 font-mono"
                />
              </div>

              <div>
                <label className="block mb-1 font-bold text-[var(--admin-text)]">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief narrative for category discovery..."
                  className="admin-input w-full rounded-xl p-3 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-bold text-[var(--admin-text)]">Sort Order (Priority)</label>
                  <input
                    type="number"
                    value={formData.sortOrder}
                    onChange={(e) => setFormData({ ...formData, sortOrder: Number(e.target.value) })}
                    className="admin-input h-10 w-full rounded-xl px-3"
                  />
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="catVisibility"
                    checked={formData.isVisible}
                    onChange={(e) => setFormData({ ...formData, isVisible: e.target.checked })}
                    className="rounded border-[var(--admin-border)]"
                  />
                  <label htmlFor="catVisibility" className="font-bold text-[var(--admin-text)] cursor-pointer">
                    Visible on Storefront
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[var(--admin-border)]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[var(--admin-border)] font-bold text-[var(--admin-text-muted)] hover:text-[var(--admin-text)]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#E10600] text-white font-bold hover:bg-[#B80500]"
                >
                  {editingCategory ? "Save Changes" : "Create Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
