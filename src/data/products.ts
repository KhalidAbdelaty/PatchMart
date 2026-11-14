export type Category = 'Kitchen' | 'Office' | 'Travel' | 'Home';

export interface Product {
  id: string;
  name: string;
  category: Category;
  /** List price in EGP. */
  price: number;
  /** Current price in EGP while the product is on sale. */
  salePrice?: number;
  description: string;
  icon: string;
}

export const products: Product[] = [
  {
    id: 'canvas-tote-bag',
    name: 'Canvas Tote Bag',
    category: 'Travel',
    price: 120,
    description: 'Heavy cotton tote with an inner pocket. Fits a 15-inch laptop.',
    icon: '👜',
  },
  {
    id: 'ceramic-coffee-mug',
    name: 'Ceramic Coffee Mug',
    category: 'Kitchen',
    price: 180,
    description: 'Matte glazed 350 ml mug. Dishwasher safe.',
    icon: '☕',
  },
  {
    id: 'a5-dotted-notebook',
    name: 'A5 Dotted Notebook',
    category: 'Office',
    price: 95,
    description: '120 pages of dotted paper with a lay-flat binding.',
    icon: '📓',
  },
  {
    id: 'steel-water-bottle',
    name: 'Steel Water Bottle',
    category: 'Travel',
    price: 320,
    description: 'Double-wall insulated bottle, 750 ml. Keeps drinks cold for 24 hours.',
    icon: '🧴',
  },
  {
    id: 'desk-lamp',
    name: 'Desk Lamp',
    category: 'Office',
    price: 900,
    salePrice: 399,
    description: 'Dimmable LED lamp with an adjustable arm and warm light mode.',
    icon: '💡',
  },
  {
    id: 'wireless-mouse',
    name: 'Wireless Mouse',
    category: 'Office',
    price: 450,
    description: 'Quiet-click mouse with a USB-C rechargeable battery.',
    icon: '🖱️',
  },
  {
    id: 'bamboo-cutting-board',
    name: 'Bamboo Cutting Board',
    category: 'Kitchen',
    price: 260,
    description: 'Large board with a juice groove and a hanging handle.',
    icon: '🔪',
  },
  {
    id: 'scented-candle',
    name: 'Scented Candle',
    category: 'Home',
    price: 150,
    description: 'Soy wax candle with a cedar and orange scent. Burns for 40 hours.',
    icon: '🕯️',
  },
  {
    id: 'laptop-sleeve',
    name: 'Laptop Sleeve',
    category: 'Travel',
    price: 380,
    description: 'Padded 14-inch sleeve with a zip pocket for cables.',
    icon: '💼',
  },
  {
    id: 'throw-blanket',
    name: 'Throw Blanket',
    category: 'Home',
    price: 780,
    salePrice: 349,
    description: 'Soft woven blanket, 130 × 170 cm.',
    icon: '🧶',
  },
  {
    id: 'pour-over-coffee-set',
    name: 'Pour-Over Coffee Set',
    category: 'Kitchen',
    price: 1200,
    description: 'Glass server, dripper and 40 paper filters.',
    icon: '🫖',
  },
  {
    id: 'cork-coasters',
    name: 'Cork Coasters',
    category: 'Home',
    price: 85,
    description: 'Set of four round coasters made from natural cork.',
    icon: '🟤',
  },
];

export function findProduct(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}
