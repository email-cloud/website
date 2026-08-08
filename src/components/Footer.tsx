import Link from "next/link";
import type { Category } from "@/lib/types";

export default function Footer({ categories }: { categories: Category[] }) {
  return (
    <footer className="mt-16 border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand to-gold text-sm font-serif-brand font-bold text-white">
                CL
              </span>
              <span className="font-serif-brand text-base font-bold text-brand-dark">
                Convenience Liquors
              </span>
            </div>
            <p className="mt-3 text-sm text-gray-500">
              Your neighborhood destination for wine, spirits, beer, and more.
              Locally owned, serving the community since day one.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-brand-dark">Shop</h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-500">
              {categories.slice(0, 6).map((c) => (
                <li key={c.slug}>
                  <Link href={`/category/${c.slug}`} className="hover:text-brand">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-brand-dark">Help</h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-500">
              <li><Link href="/legal/shipping" className="hover:text-brand">Delivery &amp; Pickup</Link></li>
              <li><Link href="/legal/returns" className="hover:text-brand">Returns</Link></li>
              <li><Link href="/search" className="hover:text-brand">Search Products</Link></li>
              <li><Link href="/cart" className="hover:text-brand">Your Cart</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-brand-dark">Legal</h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-500">
              <li><Link href="/legal/terms" className="hover:text-brand">Terms of Use</Link></li>
              <li><Link href="/legal/privacy" className="hover:text-brand">Privacy Policy</Link></li>
              <li><Link href="/legal/responsible" className="hover:text-brand">Responsible Drinking</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-xs text-gray-400 space-y-2">
          <p>
            Must be 21+ to purchase alcohol. Valid government-issued ID
            required upon pickup or delivery. We reserve the right to refuse
            service to anyone who cannot provide valid proof of age.
          </p>
          <p>
            &copy; {new Date().getFullYear()} Convenience Liquors. All rights
            reserved. Please enjoy responsibly.
          </p>
        </div>
      </div>
    </footer>
  );
}
