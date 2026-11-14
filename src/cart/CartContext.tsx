import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { Product } from '../data/products';
import { addItem, cartCount, cartSubtotal, removeItem, setQuantity, type CartLine } from '../lib/cart';

interface CartApi {
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (product: Product) => void;
  remove: (productId: string) => void;
  changeQuantity: (productId: string, quantity: number) => void;
}

const CartContext = createContext<CartApi | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  const api = useMemo<CartApi>(
    () => ({
      lines,
      count: cartCount(lines),
      subtotal: cartSubtotal(lines),
      add: (product) => setLines((current) => addItem(current, product)),
      remove: (productId) => setLines((current) => removeItem(current, productId)),
      changeQuantity: (productId, quantity) =>
        setLines((current) => setQuantity(current, productId, quantity)),
    }),
    [lines],
  );

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart(): CartApi {
  const cart = useContext(CartContext);
  if (!cart) throw new Error('useCart must be used inside <CartProvider>');
  return cart;
}
