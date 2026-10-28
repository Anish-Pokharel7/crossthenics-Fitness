"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Truck,
  RotateCcw,
  CheckCircle2,
  CreditCard,
  Building2,
  Phone,
  ArrowLeft,
} from "lucide-react";
import { useCart } from "@/lib/cartContext";
import { toast } from "sonner";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, subtotal, totalCount } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState<null | {
    orderId: string;
    name: string;
    total: number;
    paymentMethod: string;
  }>(null);

  // Checkout form state
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "Pokhara",
    province: "Gandaki",
    paymentMethod: "COD",
    orderNotes: "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const shippingCost = subtotal > 3000 || subtotal === 0 ? 0 : 150;
  const grandTotal = subtotal + shippingCost;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) errors.fullName = "Full name is required";
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^(98|97)\d{8}$/.test(formData.phone.replace(/\s+/g, ""))) {
      errors.phone = "Enter a valid 10-digit mobile number (e.g. 9804165664)";
    }
    if (!formData.address.trim()) errors.address = "Street address or landmark is required";
    if (!formData.city.trim()) errors.city = "City or district is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill in all required shipping fields");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const generatedId = `CT-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderComplete({
        orderId: generatedId,
        name: formData.fullName,
        total: grandTotal,
        paymentMethod: formData.paymentMethod,
      });
      clearCart();
      setIsSubmitting(false);
      setIsCheckingOut(false);
    }, 600);
  };

  // ── ORDER SUCCESS STATE ──────────────────────────────────────────────────
  if (orderComplete) {
    return (
      <div className="min-h-screen w-full pt-32 pb-24 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl w-full rounded-3xl border border-[#414141] bg-[#2A2A2A] p-8 sm:p-12 text-center"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E10600]/15 text-[#E10600] border border-[#E10600]/40 mb-6">
            <CheckCircle2 size={32} />
          </div>

          <span className="text-[11px] font-black uppercase tracking-[0.2em] text-text-secondary block mb-2">
            Order Dispatched To Logistics
          </span>

          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-text-primary mb-3">
            ORDER CONFIRMED
          </h1>

          <p className="text-sm text-text-primary leading-relaxed mb-6 font-normal">
            Thank you, <strong className="text-white">{orderComplete.name}</strong>. Your gear request has been logged. Our dispatch team in Pokhara will verify your dispatch via phone shortly.
          </p>

          <div className="rounded-2xl border border-[#414141] bg-[#242424] p-5 text-left text-xs mb-8 space-y-2.5">
            <div className="flex justify-between items-center pb-2.5 border-b border-[#414141]">
              <span className="text-text-muted">Order Reference</span>
              <span className="font-mono font-bold text-text-primary text-sm">{orderComplete.orderId}</span>
            </div>
            <div className="flex justify-between items-center pb-2.5 border-b border-[#414141]">
              <span className="text-text-muted">Total Payable</span>
              <span className="font-black text-text-primary text-sm">Rs. {orderComplete.total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center pb-2.5 border-b border-[#414141]">
              <span className="text-text-muted">Payment Option</span>
              <span className="font-bold text-text-primary">
                {orderComplete.paymentMethod === "COD" && "Cash on Delivery (COD)"}
                {orderComplete.paymentMethod === "ESEWA" && "eSewa Direct"}
                {orderComplete.paymentMethod === "KHALTI" && "Khalti Wallet"}
                {orderComplete.paymentMethod === "BANK" && "Bank Transfer"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-muted">Estimated Delivery</span>
              <span className="text-text-primary">2–4 Business Days (Insured)</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/allproducts"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#E10600] px-6 py-3.5 text-xs font-black uppercase tracking-wider text-white transition-all hover:bg-[#B80500]"
            >
              <span>Continue Shopping</span>
              <ArrowRight size={14} />
            </Link>
            <a
              href="https://wa.me/9779804165664"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-[#414141] bg-[#2A2A2A] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-text-primary hover:border-[#C0C0C0]/60 transition-colors"
            >
              <Phone size={14} />
              <span>Track via WhatsApp</span>
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  // ── EMPTY CART STATE ─────────────────────────────────────────────────────
  if (cart.length === 0) {
    return (
      <div className="min-h-screen w-full pt-32 pb-24 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full rounded-3xl border border-[#414141] bg-[#2A2A2A] p-8 sm:p-10 text-center"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#353535] text-text-muted border border-[#414141] mb-5">
            <ShoppingBag size={28} />
          </div>

          <h1 className="text-2xl font-black uppercase tracking-tight text-text-primary mb-2">
            YOUR GEAR BAG IS EMPTY
          </h1>

          <p className="text-xs sm:text-sm text-text-muted font-normal leading-relaxed mb-8">
            You haven&apos;t added any equipment to your bag yet. Explore our lifting belts, tactical backpacks, and grip chalk.
          </p>

          <Link
            href="/allproducts"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#E10600] px-6 py-3.5 text-xs font-black uppercase tracking-wider text-white transition-all hover:bg-[#B80500]"
          >
            <span>Explore All Gear</span>
            <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#414141]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E10600]/30 bg-[#E10600]/10 px-3.5 py-1 mb-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-text-primary">
                Equipment Checkout
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-text-primary">
              YOUR SHOPPING <span className="text-[#E10600]">BAG</span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-text-secondary">
              {totalCount} {totalCount === 1 ? "Item" : "Items"} in Bag
            </span>
            <button
              onClick={() => {
                if (confirm("Remove all items from your bag?")) clearCart();
              }}
              className="text-xs text-text-muted hover:text-text-primary transition-colors underline"
            >
              Clear Bag
            </button>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ── LEFT: CART ITEMS LIST (7 cols) ─────────────────────────── */}
          <div className="lg:col-span-7 space-y-4">
            {cart.map((item) => (
              <motion.div
                key={`${item.id}-${item.size || "default"}`}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="rounded-2xl border border-[#414141] bg-[#2A2A2A] p-4 sm:p-5 flex gap-4 sm:gap-5 items-center justify-between"
              >
                {/* Product Image */}
                <div className="relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded-xl bg-[#242424] border border-[#414141]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="96px"
                    className="object-contain p-2"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 pr-2">
                  <h2 className="text-sm sm:text-base font-black uppercase tracking-tight text-text-primary line-clamp-1">
                    {item.name}
                  </h2>
                  <p className="text-xs font-bold text-text-primary mt-0.5">
                    Rs. {item.price.toLocaleString()}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    {item.category && (
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                        {item.category}
                      </span>
                    )}
                    {item.size && (
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-text-secondary bg-[#353535] rounded px-2 py-0.5 border border-[#414141]">
                        Size: {item.size}
                      </span>
                    )}
                  </div>
                </div>

                {/* Quantity Controls & Total */}
                <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3 sm:gap-6">
                  {/* Stepper */}
                  <div className="flex items-center rounded-lg border border-[#414141] bg-[#242424]">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1, item.size)}
                      className="p-1.5 text-text-muted hover:text-text-primary transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={13} />
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-text-primary">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1, item.size)}
                      className="p-1.5 text-text-muted hover:text-text-primary transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus size={13} />
                    </button>
                  </div>

                  {/* Subtotal for Item */}
                  <div className="text-right min-w-[70px]">
                    <span className="text-xs font-black text-text-primary">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id, item.size)}
                    className="p-1.5 text-text-muted hover:text-[#E10600] transition-colors"
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </motion.div>
            ))}

            {/* Back link */}
            <div className="pt-2">
              <Link
                href="/allproducts"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-text-secondary hover:text-text-primary transition-colors"
              >
                <ArrowLeft size={14} />
                <span>Continue Shopping for Gear</span>
              </Link>
            </div>
          </div>

          {/* ── RIGHT: SUMMARY & CHECKOUT (5 cols) ──────────────────────── */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-[#414141] bg-[#2A2A2A] p-6 sm:p-8 sticky top-28">
              <h2 className="text-lg font-black uppercase tracking-tight text-text-primary mb-6">
                ORDER SUMMARY
              </h2>

              <div className="space-y-3.5 text-xs pb-6 border-b border-[#414141]">
                <div className="flex justify-between items-center">
                  <span className="text-text-muted">Bag Subtotal ({totalCount} items)</span>
                  <span className="font-bold text-text-primary">Rs. {subtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-text-muted">Delivery Across Nepal</span>
                  <span className="font-bold text-text-secondary">
                    {shippingCost === 0 ? (
                      <span className="text-emerald-400 uppercase font-black tracking-wider">Free (Orders over Rs. 3,000)</span>
                    ) : (
                      `Rs. ${shippingCost}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-[#414141] text-sm">
                  <span className="font-black uppercase tracking-wider text-text-primary">Estimated Total</span>
                  <span className="font-black text-lg text-text-primary">Rs. {grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-2 gap-3 my-6 text-[11px] text-text-primary">
                <div className="flex items-center gap-2 rounded-xl border border-[#414141] bg-[#242424] p-3">
                  <Truck size={16} className="text-[#E10600] shrink-0" />
                  <span>2–4 Days Dispatch</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-[#414141] bg-[#242424] p-3">
                  <RotateCcw size={16} className="text-[#E10600] shrink-0" />
                  <span>7-Day Sizing Swap</span>
                </div>
              </div>

              {/* Checkout Form Drawer / Toggle */}
              {!isCheckingOut ? (
                <button
                  onClick={() => setIsCheckingOut(true)}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#E10600] py-4 text-xs font-black uppercase tracking-wider text-white transition-all hover:bg-[#B80500]"
                >
                  <span>Proceed to Shipping &amp; Payment</span>
                  <ArrowRight size={15} />
                </button>
              ) : (
                <form onSubmit={handlePlaceOrder} className="space-y-4 pt-2">
                  <h3 className="text-xs font-black uppercase tracking-wider text-text-primary pt-2 border-t border-[#414141]">
                    Shipping Information
                  </h3>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-text-muted mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Biraj Thapa"
                      className="w-full rounded-xl border border-[#414141] bg-[#1C1C1C] px-3.5 py-2.5 text-xs text-text-primary placeholder:text-text-muted outline-none focus:border-[#C0C0C0]"
                    />
                    {formErrors.fullName && (
                      <p className="mt-1 text-[10px] text-red-400">{formErrors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-text-muted mb-1">
                      Phone Number (For Courier Verification) *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="98XXXXXXXX"
                      className="w-full rounded-xl border border-[#414141] bg-[#1C1C1C] px-3.5 py-2.5 text-xs text-text-primary placeholder:text-text-muted outline-none focus:border-[#C0C0C0]"
                    />
                    {formErrors.phone && (
                      <p className="mt-1 text-[10px] text-red-400">{formErrors.phone}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-text-muted mb-1">
                        City / District *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Pokhara / Kathmandu"
                        className="w-full rounded-xl border border-[#414141] bg-[#1C1C1C] px-3.5 py-2.5 text-xs text-text-primary placeholder:text-text-muted outline-none focus:border-[#C0C0C0]"
                      />
                      {formErrors.city && (
                        <p className="mt-1 text-[10px] text-red-400">{formErrors.city}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-text-muted mb-1">
                        Province
                      </label>
                      <select
                        name="province"
                        value={formData.province}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-[#414141] bg-[#1C1C1C] px-3.5 py-2.5 text-xs text-text-primary outline-none focus:border-[#C0C0C0]"
                      >
                        <option value="Gandaki">Gandaki Province</option>
                        <option value="Bagmati">Bagmati Province</option>
                        <option value="Koshi">Koshi Province</option>
                        <option value="Madhesh">Madhesh Province</option>
                        <option value="Lumbini">Lumbini Province</option>
                        <option value="Karnali">Karnali Province</option>
                        <option value="Sudurpashchim">Sudurpashchim Province</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-text-muted mb-1">
                      Street Address / Tole / Landmark *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="e.g. Lakeside Ward 6, Near Central Point"
                      className="w-full rounded-xl border border-[#414141] bg-[#1C1C1C] px-3.5 py-2.5 text-xs text-text-primary placeholder:text-text-muted outline-none focus:border-[#C0C0C0]"
                    />
                    {formErrors.address && (
                      <p className="mt-1 text-[10px] text-red-400">{formErrors.address}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-text-muted mb-1">
                      Payment Method
                    </label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {[
                        { id: "COD", label: "Cash on Delivery", icon: <Truck size={14} /> },
                        { id: "ESEWA", label: "eSewa Direct", icon: <CreditCard size={14} /> },
                        { id: "KHALTI", label: "Khalti Wallet", icon: <CreditCard size={14} /> },
                        { id: "BANK", label: "Bank Transfer", icon: <Building2 size={14} /> },
                      ].map((pm) => (
                        <button
                          key={pm.id}
                          type="button"
                          aria-pressed={formData.paymentMethod === pm.id}
                          onClick={() => setFormData((p) => ({ ...p, paymentMethod: pm.id }))}
                          className={`flex items-center gap-2 rounded-xl border p-2.5 text-left transition-all ${
                            formData.paymentMethod === pm.id
                              ? "border-[#E10600] bg-[#E10600]/15 text-text-primary"
                              : "border-[#414141] bg-[#242424] text-text-muted hover:text-text-primary"
                          }`}
                        >
                          <span className={formData.paymentMethod === pm.id ? "text-[#E10600]" : ""}>
                            {pm.icon}
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider">
                            {pm.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 flex gap-2">
                    <button
                      type="button"
                      onClick={() => setIsCheckingOut(false)}
                      className="w-1/3 rounded-xl border border-[#414141] bg-[#242424] py-3 text-xs font-bold uppercase tracking-wider text-text-muted hover:text-text-primary transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-2/3 flex items-center justify-center gap-2 rounded-xl bg-[#E10600] py-3 text-xs font-black uppercase tracking-wider text-white transition-all hover:bg-[#B80500] disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Processing Order...</span>
                      ) : (
                        <span>Confirm Rs. {grandTotal.toLocaleString()}</span>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
