"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { useCart } from "./CartProvider";

export default function AddToCartBox({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product.orderable) {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
        This is an age-restricted tobacco product available for in-store
        purchase only. Valid government-issued ID (21+) required. Federal law
        (PACT Act) restricts online/mail shipment of tobacco products.
      </div>
    );
  }

  function handleAdd() {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <div className="flex items-center rounded-full border border-border">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="px-4 py-3 text-gray-600 hover:text-brand"
          aria-label="Decrease quantity"
        >
          &minus;
        </button>
        <span className="min-w-8 text-center text-sm font-medium">
          {quantity}
        </span>
        <button
          onClick={() => setQuantity((q) => q + 1)}
          className="px-4 py-3 text-gray-600 hover:text-brand"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
      <button
        onClick={handleAdd}
        className="flex-1 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark"
      >
        {added ? "Added ✓" : "Add to Cart"}
      </button>
    </div>
  );
}
