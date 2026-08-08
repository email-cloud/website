"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Category } from "@/lib/types";
import { useCart } from "./CartProvider";

export default function Header({ categories }: { categories: Category[] }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { itemCount, openCart } = useCart();
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setMenuOpen(false);
    }
  }

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <div className="bg-brand text-white text-center text-xs py-1.5 px-4">
        21+ Only &middot; ID Required on Pickup &amp; Delivery &middot; Please Drink Responsibly
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 py-3">
          <button
            className="lg:hidden p-2 -ml-2 text-brand"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
            </svg>
          </button>

          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand to-gold text-white font-serif-brand font-bold text-lg">
              CL
            </span>
            <span className="hidden sm:flex flex-col leading-tight">
              <span className="font-serif-brand text-lg font-bold text-brand-dark">
                Convenience Liquors
              </span>
              <span className="text-[11px] text-gray-500 tracking-wide">
                Fine Wine &middot; Spirits &middot; Beer
              </span>
            </span>
          </Link>

          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-xl mx-4"
          >
            <div className="relative w-full">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search 2,000+ wines, spirits, beer & more..."
                className="w-full rounded-full border border-border bg-surface px-4 py-2.5 pr-10 text-sm focus:border-brand focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Search"
                className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full p-2 text-gray-500 hover:text-brand"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </form>

          <div className="ml-auto flex items-center gap-1">
            <Link
              href="/search"
              className="md:hidden p-2 text-brand"
              aria-label="Search"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
              </svg>
            </Link>
            <button
              onClick={openCart}
              className="relative flex items-center gap-2 rounded-full border border-border px-3 py-2 text-sm font-medium text-brand-dark hover:border-brand"
              aria-label="Open cart"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="hidden sm:inline">Cart</span>
              {itemCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[11px] font-bold text-white">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-6 border-t border-border py-2 text-sm">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="whitespace-nowrap font-medium text-gray-700 hover:text-brand"
            >
              {c.name}
            </Link>
          ))}
        </nav>
      </div>

      {menuOpen && (
        <div className="lg:hidden border-t border-border bg-white px-4 py-3">
          <form onSubmit={handleSearch} className="mb-3">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-full border border-border bg-surface px-4 py-2.5 text-sm focus:border-brand focus:outline-none"
            />
          </form>
          <div className="flex flex-col divide-y divide-border">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                onClick={() => setMenuOpen(false)}
                className="py-2.5 text-sm font-medium text-gray-700 hover:text-brand"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
