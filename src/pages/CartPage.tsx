import { Link } from 'react-router-dom';
import { useCart } from '../cart/CartContext';
import { formatPrice } from '../lib/catalog';

export function CartPage() {
  const { lines, subtotal, changeQuantity, remove } = useCart();

  if (lines.length === 0) {
    return (
      <section>
        <h1>Cart</h1>
        <p className="empty">Your cart is empty.</p>
        <Link to="/products">Browse products</Link>
      </section>
    );
  }

  return (
    <section>
      <h1>Cart</h1>
      <table className="cart">
        <thead>
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Unit price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Total</th>
            <th scope="col">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {lines.map((line) => (
            <tr key={line.productId} data-testid="cart-line">
              <th scope="row">{line.name}</th>
              <td>{formatPrice(line.unitPrice)}</td>
              <td>
                <div className="stepper">
                  <button
                    type="button"
                    aria-label={`Decrease quantity of ${line.name}`}
                    onClick={() => changeQuantity(line.productId, line.quantity - 1)}
                  >
                    −
                  </button>
                  <output aria-label={`Quantity of ${line.name}`}>{line.quantity}</output>
                  <button
                    type="button"
                    aria-label={`Increase quantity of ${line.name}`}
                    onClick={() => changeQuantity(line.productId, line.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </td>
              <td data-testid="line-total">{formatPrice(line.lineTotal)}</td>
              <td>
                <button type="button" className="link" onClick={() => remove(line.productId)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="summary">
        <p className="subtotal">
          Subtotal <strong data-testid="subtotal">{formatPrice(subtotal)}</strong>
        </p>
        <button type="button" className="button" disabled>
          Checkout unavailable
        </button>
        <p className="muted">This is a demo store. Checkout is disabled and no payment is taken.</p>
      </div>
    </section>
  );
}
