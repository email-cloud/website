import productsData from "@/data/products.json";
import categoriesData from "@/data/categories.json";
import type { Product, Category } from "./types";

const ALL_PRODUCTS = productsData as Product[];
const ALL_CATEGORIES = categoriesData as Category[];

export function getAllProducts(): Product[] {
  return ALL_PRODUCTS;
}

export function getCategories(): Category[] {
  return ALL_CATEGORIES;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return ALL_CATEGORIES.find((c) => c.slug === slug);
}

export function getProductBySlug(slug: string): Product | undefined {
  return ALL_PRODUCTS.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 6): Product[] {
  return ALL_PRODUCTS.filter(
    (p) => p.subcategory === product.subcategory && p.id !== product.id
  ).slice(0, limit);
}

export type SortOption = "featured" | "price-asc" | "price-desc" | "name-asc";

export function getProductsByCategory(
  categorySlug: string,
  opts: { subcategory?: string; sort?: SortOption; query?: string } = {}
): Product[] {
  let items = ALL_PRODUCTS.filter((p) => p.categorySlug === categorySlug);
  if (opts.subcategory) {
    items = items.filter((p) => p.subcategory === opts.subcategory);
  }
  if (opts.query) {
    const q = opts.query.toLowerCase();
    items = items.filter((p) => p.name.toLowerCase().includes(q));
  }
  return sortProducts(items, opts.sort);
}

export function sortProducts(items: Product[], sort?: SortOption): Product[] {
  const sorted = [...items];
  switch (sort) {
    case "price-asc":
      sorted.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      sorted.sort((a, b) => b.price - a.price);
      break;
    case "name-asc":
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      sorted.sort((a, b) => Number(b.featured) - Number(a.featured));
  }
  return sorted;
}

export function searchProducts(query: string, limit = 40): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return ALL_PRODUCTS.filter((p) => p.name.toLowerCase().includes(q)).slice(
    0,
    limit
  );
}

function roundRobinByCategory(items: Product[], limit: number): Product[] {
  const byCategory = new Map<string, Product[]>();
  for (const item of items) {
    const list = byCategory.get(item.categorySlug) ?? [];
    list.push(item);
    byCategory.set(item.categorySlug, list);
  }
  const buckets = [...byCategory.values()];
  const result: Product[] = [];
  let i = 0;
  while (result.length < limit && buckets.some((b) => i < b.length)) {
    for (const bucket of buckets) {
      if (i < bucket.length) result.push(bucket[i]);
      if (result.length >= limit) break;
    }
    i++;
  }
  return result;
}

export function getFeaturedProducts(limit = 12): Product[] {
  const items = ALL_PRODUCTS.filter((p) => p.featured && p.orderable);
  return roundRobinByCategory(items, limit);
}

export function getNewArrivals(limit = 12): Product[] {
  const items = ALL_PRODUCTS.filter((p) => p.newArrival && p.orderable);
  return roundRobinByCategory(items, limit);
}

export function getProductsByIds(ids: string[]): Product[] {
  const set = new Set(ids);
  return ALL_PRODUCTS.filter((p) => set.has(p.id));
}
