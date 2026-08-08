import { searchProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  const results = query ? searchProducts(query, 60) : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="font-serif-brand text-2xl font-bold text-brand-dark">
        {query ? `Search results for "${query}"` : "Search"}
      </h1>

      <form action="/search" className="mt-4 max-w-lg">
        <input
          type="search"
          name="q"
          defaultValue={query}
          placeholder="Search 2,000+ wines, spirits, beer & more..."
          className="w-full rounded-full border border-border bg-surface px-4 py-2.5 text-sm focus:border-brand focus:outline-none"
        />
      </form>

      {query && (
        <p className="mt-4 text-xs text-gray-400">
          {results.length} result{results.length === 1 ? "" : "s"}
        </p>
      )}

      {query && results.length === 0 && (
        <p className="mt-12 text-center text-gray-500">
          No products matched your search. Try a different term.
        </p>
      )}

      {results.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {results.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
