import type { Product } from '../data/products';
import { effectivePrice } from './catalog';

export interface CartLine {
  productId: string;
  name: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
}

export function addItem(lines: CartLine[], product: Product): CartLine[] {
  const existing = lines.find((line) => line.productId === product.id);
  if (!existing) {
    const unitPrice = effectivePrice(product);
    return [
      ...lines,
      { productId: product.id, name: product.name, unitPrice, quantity: 1, lineTotal: unitPrice },
    ];
  }
  return lines.map((line) =>
    line.productId === product.id
      ? { ...line, quantity: line.quantity + 1, lineTotal: line.unitPrice * (line.quantity + 1) }
      : line,
  );
}

export function removeItem(lines: CartLine[], productId: string): CartLine[] {
  return lines.filter((line) => line.productId !== productId);
}

export function setQuantity(lines: CartLine[], productId: string, quantity: number): CartLine[] {
  if (quantity <= 0) return removeItem(lines, productId);
  return lines.map((line) => (line.productId === productId ? { ...line, quantity } : line));
}

export function cartCount(lines: CartLine[]): number {
  return lines.reduce((count, line) => count + line.quantity, 0);
}

export function cartSubtotal(lines: CartLine[]): number {
  return lines.reduce((total, line) => total + line.lineTotal, 0);
}
