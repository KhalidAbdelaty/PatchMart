import { Link, useParams } from 'react-router-dom';
import { useCart } from '../cart/CartContext';
import { Price } from '../components/ProductCard';
import { findProduct } from '../data/products';

export function ProductPage() {
  const { id = '' } = useParams();
  const { add } = useCart();
  const product = findProduct(id);

  if (!product) {
    return (
      <section>
        <h1>Product not found</h1>
        <Link to="/products">Back to products</Link>
      </section>
    );
  }

  return (
    <section className="detail">
      <div className="card-art detail-art" aria-hidden="true">
        {product.icon}
      </div>
      <div>
        <p className="card-category">{product.category}</p>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <Price product={product} />
        <button type="button" className="button" onClick={() => add(product)}>
          Add to cart
        </button>
        <p>
          <Link to="/products">Back to products</Link>
        </p>
      </div>
    </section>
  );
}
