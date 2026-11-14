import { Link, NavLink, Navigate, Route, Routes } from 'react-router-dom';
import { useCart } from './cart/CartContext';
import { CartPage } from './pages/CartPage';
import { ProductPage } from './pages/ProductPage';
import { ProductsPage } from './pages/ProductsPage';

export function App() {
  const { count } = useCart();
  return (
    <>
      <p className="notice">Demo store. Products are fictional and nothing here can be purchased.</p>
      <header className="header">
        <Link to="/products" className="brand">
          PatchMart
        </Link>
        <nav aria-label="Main">
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/cart">
            Cart <span className="count" data-testid="cart-count">{count}</span>
          </NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route
            path="*"
            element={
              <section>
                <h1>Page not found</h1>
                <Link to="/products">Back to products</Link>
              </section>
            }
          />
        </Routes>
      </main>
    </>
  );
}
