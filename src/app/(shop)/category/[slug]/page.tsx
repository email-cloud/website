import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getCategoryBySlug,
  getProductsByCategory,
  type SortOption,
} from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import SortSelect from "@/components/SortSelect";
import Pagination from "@/components/Pagination";

const PAGE_SIZE = 24;

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ subcategory?: string; sort?: string; page?: string }>;
}) {
  const { slug } = await params;
  const sp = await searchParams;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const sort = (sp.sort as SortOption) || "featured";
  const subcategory = sp.subcategory;
  const page = Math.max(1, Number(sp.page) || 1);

  const allItems = getProductsByCategory(slug, { subcategory, sort });
  const totalPages = Math.max(1, Math.ceil(allItems.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const items = allItems.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  function buildHref(overrides: { subcategory?: string; page?: number }) {
    const params = new URLSearchParams();
    params.set("sort", sort);
    const sc =
      overrides.subcategory !== undefined ? overrides.subcategory : subcategory;
    if (sc) params.set("subcategory", sc);
    const pg = overrides.page ?? 1;
    if (pg > 1) params.set("page", String(pg));
    const qs = params.toString();
    return `/category/${slug}${qs ? `?${qs}` : ""}`;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <nav className="text-xs text-gray-400">
        <Link href="/" className="hover:text-brand">Home</Link>
        <span className="mx-1.5">/</span>
        <span className="text-gray-600">{category.name}</span>
      </nav>

      <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif-brand text-3xl font-bold text-brand-dark">
            {category.name}
          </h1>
          <p className="mt-1 text-sm text-gray-500">{category.blurb}</p>
        </div>
        <SortSelect current={sort} />
      </div>

      {category.subcategories.length > 1 && (
        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            href={buildHref({ subcategory: "" })}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-medium ${
              !subcategory
                ? "border-brand bg-brand text-white"
                : "border-border text-gray-600 hover:border-brand"
            }`}
          >
            All ({category.count})
          </Link>
          {category.subcategories.map((sc) => (
            <Link
              key={sc}
              href={buildHref({ subcategory: sc })}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-medium ${
                subcategory === sc
                  ? "border-brand bg-brand text-white"
                  : "border-border text-gray-600 hover:border-brand"
              }`}
            >
              {sc}
            </Link>
          ))}
        </div>
      )}

      <p className="mt-4 text-xs text-gray-400">
        Showing {items.length ? (currentPage - 1) * PAGE_SIZE + 1 : 0}&ndash;
        {(currentPage - 1) * PAGE_SIZE + items.length} of {allItems.length}
      </p>

      {items.length > 0 ? (
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <p className="mt-12 text-center text-gray-500">
          No products found in this category.
        </p>
      )}

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        buildHref={(p) => buildHref({ page: p })}
      />
    </div>
  );
}
