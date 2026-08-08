import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductBySlug, getRelatedProducts } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import BottleArt from "@/components/BottleArt";
import AddToCartBox from "@/components/AddToCartBox";
import ProductCard from "@/components/ProductCard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} (${product.size}) | Convenience Liquors`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product, 5);
  const discountPct = Math.round(
    ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <nav className="text-xs text-gray-400">
        <Link href="/" className="hover:text-brand">Home</Link>
        <span className="mx-1.5">/</span>
        <Link href={`/category/${product.categorySlug}`} className="hover:text-brand">
          {product.category}
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-gray-600">{product.name}</span>
      </nav>

      <div className="mt-4 grid gap-10 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-surface">
          <BottleArt
            category={product.categorySlug}
            name={product.name}
            className="h-full w-full"
          />
          {discountPct > 0 && (
            <span className="absolute left-3 top-3 rounded-full bg-gold px-3 py-1 text-xs font-bold text-white">
              Save {discountPct}%
            </span>
          )}
        </div>

        <div>
          <span className="text-xs font-semibold uppercase tracking-wide text-brand">
            {product.subcategory}
          </span>
          <h1 className="mt-1 font-serif-brand text-2xl font-bold text-brand-dark sm:text-3xl">
            {product.name}
          </h1>
          <p className="mt-1 text-sm text-gray-500">{product.size}</p>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-brand-dark">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice > product.price && (
              <span className="text-lg text-gray-400 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-gray-400">
            Everyday price &mdash; already 10% below list.
          </p>

          <p className="mt-6 leading-relaxed text-gray-600">
            {product.description}
          </p>

          <div className="mt-8">
            <AddToCartBox product={product} />
          </div>

          <div className="mt-8 space-y-2 rounded-xl border border-border bg-surface p-4 text-xs text-gray-500">
            <p>&#10003; Must be 21+ to purchase. ID checked at pickup/delivery.</p>
            <p>&#10003; Local pickup available, typically ready within an hour.</p>
            <p>&#10003; Delivery available within our local service area only.</p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-serif-brand text-xl font-bold text-brand-dark">
            You Might Also Like
          </h2>
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
