"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { formatPrice } from "@/lib/format";
import BottleArt from "@/components/BottleArt";

export default function CartPage() {
  const { lines, setQuantity, removeItem, subtotal } = useCart();

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <h1 className="font-serif-brand text-2xl font-bold text-brand-dark">
          Your cart is empty
        </h1>
        <p className="mt-2 text-gray-500">
          Browse our selection and add something you&apos;ll enjoy.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-dark"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="font-serif-brand text-2xl font-bold text-brand-dark">
        Your Cart
      </h1>

      <div className="mt-6 divide-y divide-border rounded-xl border border-border bg-white">
        {lines.map((line) => (
          <div key={line.id} className="flex gap-4 p-4">
            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-surface">
              <BottleArt category={line.categorySlug} name={line.name} className="h-full w-full" />
            </div>
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <Link
                  href={`/product/${line.slug}`}
                  className="font-medium text-brand-dark hover:underline"
                >
                  {line.name}
                </Link>
                <p className="text-xs text-gray-500">{line.size}</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center rounded-full border border-border">
                  <button
                    className="px-3 py-1.5 text-gray-600 hover:text-brand"
                    onClick={() => setQuantity(line.id, line.quantity - 1)}
                    aria-label="Decrease quantity"
                  >
                    &minus;
                  </button>
                  <span className="min-w-6 text-center text-sm">{line.quantity}</span>
                  <button
                    className="px-3 py-1.5 text-gray-600 hover:text-brand"
                    onClick={() => setQuantity(line.id, line.quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeItem(line.id)}
                  className="text-xs text-gray-400 hover:text-brand"
                >
                  Remove
                </button>
              </div>
            </div>
            <div className="text-right font-semibold text-brand-dark">
              {formatPrice(line.price * line.quantity)}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col items-end gap-2">
        <div className="flex w-full max-w-xs justify-between text-sm sm:w-64">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-semibold text-brand-dark">{formatPrice(subtotal)}</span>
        </div>
        <p className="w-full max-w-xs text-right text-[11px] text-gray-400 sm:w-64">
          Taxes and delivery/pickup fees calculated at checkout.
        </p>
        <Link
          href="/checkout"
          className="mt-2 w-full max-w-xs rounded-full bg-brand px-6 py-3 text-center text-sm font-semibold text-white hover:bg-brand-dark sm:w-64"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
