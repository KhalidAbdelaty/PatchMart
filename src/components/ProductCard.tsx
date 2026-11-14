import { Link } from 'react-router-dom';
import { useCart } from '../cart/CartContext';
import type { Product } from '../data/products';
import { effectivePrice, formatPrice } from '../lib/catalog';

export function Price({ product }: { product: Product }) {
  return (
    <p className="price">
      <span className="price-now">{formatPrice(effectivePrice(product))}</span>
      {product.salePrice !== undefined && (
        <>
          <s className="price-was">{formatPrice(product.price)}</s>
          <span className="badge">Sale</span>
        </>
      )}
    </p>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  return (
    <li className="card" data-testid="product-card">
      <Link to={`/product/${product.id}`} className="card-art" aria-hidden="true" tabIndex={-1}>
        {product.icon}
      </Link>
      <p className="card-category">{product.category}</p>
      <h2 className="card-name">
        <Link to={`/product/${product.id}`}>{product.name}</Link>
      </h2>
      <Price product={product} />
      <button type="button" className="button" onClick={() => add(product)}>
        Add to cart
      </button>
    </li>
  );
}
