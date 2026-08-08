"use client";

import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { useCart } from "./CartProvider";
import BottleArt from "./BottleArt";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const discountPct = Math.round(
    ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100
  );

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-border bg-white transition hover:shadow-lg">
      <Link
        href={`/product/${product.slug}`}
        className="relative block aspect-square overflow-hidden bg-surface"
      >
        <BottleArt
          category={product.categorySlug}
          name={product.name}
          className="h-full w-full transition duration-300 group-hover:scale-105"
        />
        {discountPct > 0 && (
          <span className="absolute left-2 top-2 rounded-full bg-gold px-2 py-1 text-[11px] font-bold text-white">
            -{discountPct}%
          </span>
        )}
        {!product.orderable && (
          <span className="absolute right-2 top-2 rounded-full bg-gray-800/80 px-2 py-1 text-[10px] font-semibold text-white">
            In-Store Only
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-3">
        <span className="text-[11px] uppercase tracking-wide text-gray-400">
          {product.subcategory}
        </span>
        <Link href={`/product/${product.slug}`}>
          <h3 className="mt-0.5 line-clamp-2 min-h-[2.5rem] text-sm font-medium text-brand-dark hover:underline">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-gray-500">{product.size}</p>

        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-base font-bold text-brand-dark">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice > product.price && (
            <span className="text-xs text-gray-400 line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>

        <div className="mt-auto pt-3">
          {product.orderable ? (
            <button
              onClick={() => addItem(product)}
              className="w-full rounded-full bg-brand px-3 py-2 text-xs font-semibold text-white transition hover:bg-brand-dark"
            >
              Add to Cart
            </button>
          ) : (
            <button
              disabled
              className="w-full cursor-not-allowed rounded-full bg-gray-100 px-3 py-2 text-xs font-semibold text-gray-400"
              title="Age-restricted tobacco item — in-store purchase only"
            >
              In-Store Only
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
