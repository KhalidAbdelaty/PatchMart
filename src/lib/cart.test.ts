import { describe, expect, it } from 'vitest';
import type { Product } from '../data/products';
import { addItem, cartCount, cartSubtotal, removeItem, setQuantity } from './cart';

const mug: Product = { id: 'mug', name: 'Plain Mug', category: 'Kitchen', price: 200, description: '', icon: '' };
const lamp: Product = { id: 'lamp', name: 'Clip Lamp', category: 'Office', price: 500, salePrice: 350, description: '', icon: '' };

describe('addItem', () => {
  it('adds a new line with quantity 1', () => {
    expect(addItem([], mug)).toEqual([
      { productId: 'mug', name: 'Plain Mug', unitPrice: 200, quantity: 1, lineTotal: 200 },
    ]);
  });

  it('uses the sale price for products on sale', () => {
    expect(addItem([], lamp)[0].unitPrice).toBe(350);
  });

  it('increases the quantity when the product is already in the cart', () => {
    const lines = addItem(addItem([], mug), mug);
    expect(lines).toHaveLength(1);
    expect(lines[0].quantity).toBe(2);
    expect(lines[0].lineTotal).toBe(400);
  });
});

describe('removeItem', () => {
  it('removes only the matching line', () => {
    const lines = addItem(addItem([], mug), lamp);
    expect(removeItem(lines, 'mug').map((line) => line.productId)).toEqual(['lamp']);
  });
});

describe('setQuantity', () => {
  it('updates the quantity of the matching line', () => {
    const lines = setQuantity(addItem([], mug), 'mug', 3);
    expect(lines[0].quantity).toBe(3);
  });

  it('removes the line when the quantity drops to zero', () => {
    expect(setQuantity(addItem([], mug), 'mug', 0)).toEqual([]);
  });
});

describe('cart totals', () => {
  it('counts every unit in the cart', () => {
    const lines = addItem(addItem(addItem([], mug), mug), lamp);
    expect(cartCount(lines)).toBe(3);
  });

  it('adds up the lines for the subtotal', () => {
    const lines = addItem(addItem([], mug), lamp);
    expect(cartSubtotal(lines)).toBe(550);
  });

  it('is zero for an empty cart', () => {
    expect(cartSubtotal([])).toBe(0);
  });
});
