import type { Product } from '../data/products';

export type SortOrder = 'featured' | 'price-asc' | 'price-desc' | 'name';

export const SORT_OPTIONS: { value: SortOrder; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to high' },
  { value: 'price-desc', label: 'Price: High to low' },
  { value: 'name', label: 'Name: A to Z' },
];

/** The price a customer pays right now. */
export function effectivePrice(product: Product): number {
  return product.salePrice ?? product.price;
}

export function formatPrice(amount: number): string {
  return `${amount.toLocaleString('en-US')} EGP`;
}

/** Filters products by name or category. An empty query returns everything. */
export function searchProducts(products: Product[], query: string): Product[] {
  const term = query.trim().toLowerCase();
  if (!term) return products;
  return products.filter(
    (product) => product.name.toLowerCase().includes(term) || product.category.includes(term),
  );
}

export function sortProducts(products: Product[], order: SortOrder): Product[] {
  const sorted = [...products];
  switch (order) {
    case 'price-asc':
      return sorted.sort((a, b) => effectivePrice(a) - effectivePrice(b));
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return sorted;
  }
}
