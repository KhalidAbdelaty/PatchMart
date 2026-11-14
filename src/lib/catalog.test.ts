import { describe, expect, it } from 'vitest';
import { products, type Product } from '../data/products';
import { effectivePrice, formatPrice, searchProducts, sortProducts } from './catalog';

const sample: Product[] = [
  { id: 'mug', name: 'Plain Mug', category: 'Kitchen', price: 200, description: '', icon: '' },
  { id: 'lamp', name: 'Clip Lamp', category: 'Office', price: 500, description: '', icon: '' },
  { id: 'bag', name: 'Day Bag', category: 'Travel', price: 50, description: '', icon: '' },
];

const names = (list: Product[]) => list.map((product) => product.name);

describe('effectivePrice', () => {
  it('returns the list price for a regular product', () => {
    expect(effectivePrice(sample[0])).toBe(200);
  });

  it('returns the sale price when the product is on sale', () => {
    expect(effectivePrice({ ...sample[0], salePrice: 150 })).toBe(150);
  });
});

describe('formatPrice', () => {
  it('adds the currency and a thousands separator', () => {
    expect(formatPrice(1200)).toBe('1,200 EGP');
  });
});

describe('searchProducts', () => {
  it('returns every product for an empty query', () => {
    expect(searchProducts(products, '')).toHaveLength(products.length);
    expect(searchProducts(products, '   ')).toHaveLength(products.length);
  });

  it('matches part of a product name', () => {
    expect(names(searchProducts(products, 'mug'))).toEqual(['Ceramic Coffee Mug']);
  });

  it('ignores case and surrounding spaces', () => {
    expect(names(searchProducts(products, '  NOTEBOOK '))).toEqual(['A5 Dotted Notebook']);
  });

  it('returns nothing when no product matches', () => {
    expect(searchProducts(products, 'umbrella')).toEqual([]);
  });
});

describe('sortProducts', () => {
  it('keeps the original order for "featured"', () => {
    expect(names(sortProducts(sample, 'featured'))).toEqual(['Plain Mug', 'Clip Lamp', 'Day Bag']);
  });

  it('sorts by price, low to high', () => {
    expect(names(sortProducts(sample, 'price-asc'))).toEqual(['Day Bag', 'Plain Mug', 'Clip Lamp']);
  });

  it('sorts by price, high to low', () => {
    expect(names(sortProducts(sample, 'price-desc'))).toEqual(['Clip Lamp', 'Plain Mug', 'Day Bag']);
  });

  it('sorts by name', () => {
    expect(names(sortProducts(sample, 'name'))).toEqual(['Clip Lamp', 'Day Bag', 'Plain Mug']);
  });

  it('does not change the list it was given', () => {
    const before = names(sample);
    sortProducts(sample, 'price-asc');
    expect(names(sample)).toEqual(before);
  });
});
