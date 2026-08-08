export interface Product {
  id: string;
  slug: string;
  name: string;
  size: string;
  price: number;
  compareAtPrice: number;
  category: string;
  categorySlug: string;
  subcategory: string;
  description: string;
  orderable: boolean;
  inStock: boolean;
  featured: boolean;
  newArrival: boolean;
}

export interface Category {
  name: string;
  slug: string;
  blurb: string;
  subcategories: string[];
  count: number;
}

export interface CartLine {
  id: string;
  slug: string;
  name: string;
  size: string;
  price: number;
  categorySlug: string;
  quantity: number;
}
