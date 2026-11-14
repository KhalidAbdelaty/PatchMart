import { useMemo, useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/products';
import { SORT_OPTIONS, searchProducts, sortProducts, type SortOrder } from '../lib/catalog';

export function ProductsPage() {
  const [query, setQuery] = useState('');
  const [order, setOrder] = useState<SortOrder>('featured');

  const visible = useMemo(
    () => sortProducts(searchProducts(products, query), order),
    [query, order],
  );

  return (
    <section>
      <h1>Products</h1>
      <div className="toolbar">
        <label className="field">
          <span>Search</span>
          <input
            type="search"
            value={query}
            placeholder="Search by name or category"
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <label className="field">
          <span>Sort by</span>
          <select value={order} onChange={(event) => setOrder(event.target.value as SortOrder)}>
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p className="muted" role="status">
        {visible.length} {visible.length === 1 ? 'product' : 'products'}
      </p>
      {visible.length === 0 ? (
        <p className="empty">No products match “{query.trim()}”.</p>
      ) : (
        <ul className="grid">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      )}
    </section>
  );
}
