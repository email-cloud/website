import Link from "next/link";
import {
  getCategories,
  getFeaturedProducts,
  getNewArrivals,
} from "@/lib/products";
import CategoryTile from "@/components/CategoryTile";
import ProductCard from "@/components/ProductCard";

export default function HomePage() {
  const categories = getCategories();
  const featured = getFeaturedProducts(10);
  const newArrivals = getNewArrivals(10);

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-[#3d0a1f] via-brand-dark to-[#6b3410] text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 30%, #ffffff 0%, transparent 2%), radial-gradient(circle at 85% 20%, #ffffff 0%, transparent 2%), radial-gradient(circle at 60% 80%, #ffffff 0%, transparent 2%)",
          }}
        />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold-light">
            Everyday Low Prices &middot; 2,200+ Products
          </p>
          <h1 className="mt-3 max-w-2xl font-serif-brand text-4xl font-bold leading-tight sm:text-5xl">
            Your Neighborhood Wine, Spirits &amp; Beer Shop
          </h1>
          <p className="mt-4 max-w-xl text-white/80">
            Shop our full inventory online with local pickup and delivery.
            Curated wine, top-shelf spirits, craft beer, and more &mdash; all
            at prices below the big box stores.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/category/wine"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-dark hover:bg-white/90"
            >
              Shop Wine
            </Link>
            <Link
              href="/category/whiskey-bourbon"
              className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Shop Spirits
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-6 text-center sm:grid-cols-4 sm:px-6 lg:px-8">
          {[
            { label: "Local Delivery", sub: "Order online, delivered fast" },
            { label: "Curbside Pickup", sub: "Ready in under an hour" },
            { label: "ID Verified 21+", sub: "Checked at pickup & delivery" },
            { label: "Everyday Low Prices", sub: "10% below list, every day" },
          ].map((f) => (
            <div key={f.label} className="px-2">
              <p className="text-sm font-semibold text-brand-dark">{f.label}</p>
              <p className="text-xs text-gray-500">{f.sub}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="font-serif-brand text-2xl font-bold text-brand-dark">
          Shop by Category
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {categories.map((c) => (
            <CategoryTile key={c.slug} category={c} />
          ))}
        </div>
      </section>

      <section className="bg-surface py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h2 className="font-serif-brand text-2xl font-bold text-brand-dark">
              Featured Deals
            </h2>
            <Link href="/search?q=" className="text-sm font-medium text-brand hover:underline">
              View All
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="font-serif-brand text-2xl font-bold text-brand-dark">
          New Arrivals
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {newArrivals.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
