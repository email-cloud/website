"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { CartLine, Product } from "@/lib/types";

const STORAGE_KEY = "cl_cart_v1";

interface CartContextValue {
  lines: CartLine[];
  itemCount: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function readStoredLines(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // One-time hydration from localStorage after mount, to keep the
    // server-rendered and initial client-rendered markup identical.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLines(readStoredLines());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  const addItem = useCallback((product: Product, quantity = 1) => {
    if (!product.orderable) return;
    setLines((prev) => {
      const existing = prev.find((l) => l.id === product.id);
      if (existing) {
        return prev.map((l) =>
          l.id === product.id ? { ...l, quantity: l.quantity + quantity } : l
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          slug: product.slug,
          name: product.name,
          size: product.size,
          price: product.price,
          categorySlug: product.categorySlug,
          quantity,
        },
      ];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id: string) => {
    setLines((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const setQuantity = useCallback((id: string, quantity: number) => {
    setLines((prev) => {
      if (quantity <= 0) return prev.filter((l) => l.id !== id);
      return prev.map((l) => (l.id === id ? { ...l, quantity } : l));
    });
  }, []);

  const clearCart = useCallback(() => setLines([]), []);

  const itemCount = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity, 0),
    [lines]
  );
  const subtotal = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity * l.price, 0),
    [lines]
  );

  const value: CartContextValue = {
    lines,
    itemCount,
    subtotal,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    addItem,
    removeItem,
    setQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
