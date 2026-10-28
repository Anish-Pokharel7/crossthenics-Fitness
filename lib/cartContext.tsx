"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { StaticImageData } from "next/image";
import { toast } from "sonner";

export interface CartItem {
  id: number | string;
  name: string;
  price: number;
  image: string | StaticImageData;
  quantity: number;
  category?: string;
  size?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeFromCart: (id: number | string, size?: string) => void;
  updateQuantity: (id: number | string, quantity: number, size?: string) => void;
  clearCart: () => void;
  totalCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "crossthenics_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setTimeout(() => {
          setCart(parsed);
          setIsInitialized(true);
        }, 0);
        return;
      }
    } catch (e) {
      console.warn("Failed to read cart from localStorage:", e);
    }
    setTimeout(() => {
      setIsInitialized(true);
    }, 0);
  }, []);

  // Sync to localStorage on update
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.warn("Failed to write cart to localStorage:", e);
    }
  }, [cart, isInitialized]);

  const addToCart = (product: Omit<CartItem, "quantity">, quantity = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.id === product.id && (item.size || "") === (product.size || "")
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { ...product, quantity }];
    });

    const sizeNote = product.size ? ` (Size: ${product.size})` : "";
    toast.success(`${product.name}${sizeNote} added to cart`, {
      description: `Rs. ${product.price.toLocaleString()} • Quantity: ${quantity}`,
      style: {
        background: "#1A1A1A",
        border: "1px solid rgba(225, 6, 0, 0.4)",
        color: "#FFFFFF",
      },
    });
  };

  const removeFromCart = (id: number | string, size?: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.id === id && (size === undefined || (item.size || "") === (size || "")))
      )
    );
  };

  const updateQuantity = (id: number | string, quantity: number, size?: string) => {
    if (quantity <= 0) {
      removeFromCart(id, size);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && (size === undefined || (item.size || "") === (size || ""))
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
