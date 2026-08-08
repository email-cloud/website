"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";
import { formatPrice } from "@/lib/format";
import ProductImage from "./ProductImage";

export default function CartDrawer() {
  const { lines, isOpen, closeCart, setQuantity, removeItem, subtotal } =
    useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={closeCart}
        aria-hidden
      />
      <div className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-lg font-serif-brand font-bold text-brand-dark">
            Your Cart ({lines.reduce((n, l) => n + l.quantity, 0)})
          </h2>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="p-1 text-gray-500 hover:text-brand"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <p className="text-gray-500">Your cart is empty.</p>
            <button
              onClick={closeCart}
              className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {lines.map((line) => (
                <div key={line.id} className="flex gap-3">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-surface">
                    <ProductImage
                      image={line.image}
                      category={line.categorySlug}
                      name={line.name}
                      className="h-full w-full"
                      sizes="64px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/product/${line.slug}`}
                      onClick={closeCart}
                      className="line-clamp-2 text-sm font-medium text-brand-dark hover:underline"
                    >
                      {line.name}
                    </Link>
                    <p className="text-xs text-gray-500">{line.size}</p>
                    <div className="mt-1 flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-border">
                        <button
                          className="px-2.5 py-1 text-sm text-gray-600 hover:text-brand"
                          onClick={() => setQuantity(line.id, line.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          &minus;
                        </button>
                        <span className="min-w-6 text-center text-sm">
                          {line.quantity}
                        </span>
                        <button
                          className="px-2.5 py-1 text-sm text-gray-600 hover:text-brand"
                          onClick={() => setQuantity(line.id, line.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-sm font-semibold text-brand-dark">
                        {formatPrice(line.price * line.quantity)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(line.id)}
                    aria-label="Remove item"
                    className="self-start p-1 text-gray-400 hover:text-brand"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-border px-5 py-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold text-brand-dark">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="text-[11px] text-gray-400">
                Taxes and delivery/pickup fees calculated at checkout.
              </p>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="block w-full rounded-full bg-brand px-5 py-3 text-center text-sm font-semibold text-white hover:bg-brand-dark"
              >
                Proceed to Checkout
              </Link>
              <Link
                href="/cart"
                onClick={closeCart}
                className="block w-full rounded-full border border-border px-5 py-2.5 text-center text-sm font-medium text-brand-dark hover:border-brand"
              >
                View Full Cart
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
