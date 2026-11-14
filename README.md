# PatchMart

A small demo storefront built with React, Vite and TypeScript. It has a product
list with search and sorting, product pages, and a cart.

PatchMart is not a real shop. The products are fictional, there are no accounts,
no backend, and checkout is disabled.

## Requirements

- Node.js 20 or newer

## Getting started

```bash
npm ci
npm run dev
```

The app opens at http://localhost:5173.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run lint` | Run ESLint |
| `npm run test` | Run the unit and component tests once (Vitest) |
| `npm run build` | Type-check and build for production into `dist/` |
| `npm run preview` | Serve the production build locally |

## Project layout

```
src/
  data/products.ts     Seed data for the catalogue
  lib/catalog.ts       Search, sorting and price helpers
  lib/cart.ts          Cart operations and totals
  cart/CartContext.tsx Cart state shared across pages
  components/          Product card
  pages/               Products, product detail and cart pages
```

Routes: `/products`, `/product/:id`, `/cart`.

## Contributing

- Work on a branch and open a pull request. Do not push to `main`.
- Every change needs tests. A bug fix should come with a test that fails
  before the fix and passes after it.
- `npm run lint`, `npm run test` and `npm run build` must pass. CI runs all
  three on every pull request.

## Deployment

The app is a static site. `vercel.json` sends every path to `index.html` so
that links such as `/cart` work when opened directly. Other static hosts need
the same single-page fallback rule.

## License

MIT
