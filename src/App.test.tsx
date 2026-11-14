import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { App } from './App';
import { CartProvider } from './cart/CartContext';
import { products } from './data/products';

function renderApp(path = '/products') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <CartProvider>
        <App />
      </CartProvider>
    </MemoryRouter>,
  );
}

describe('products page', () => {
  it('lists every product', () => {
    renderApp();
    expect(screen.getAllByTestId('product-card')).toHaveLength(products.length);
  });

  it('filters the list while typing in the search box', async () => {
    const user = userEvent.setup();
    renderApp();
    await user.type(screen.getByRole('searchbox', { name: 'Search' }), 'mug');
    const cards = screen.getAllByTestId('product-card');
    expect(cards).toHaveLength(1);
    expect(within(cards[0]).getByRole('heading')).toHaveTextContent('Ceramic Coffee Mug');
  });

  it('shows a message when nothing matches', async () => {
    const user = userEvent.setup();
    renderApp();
    await user.type(screen.getByRole('searchbox', { name: 'Search' }), 'umbrella');
    expect(screen.getByText(/No products match/)).toBeInTheDocument();
  });

  it('updates the cart counter when a product is added', async () => {
    const user = userEvent.setup();
    renderApp();
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
    await user.click(screen.getAllByRole('button', { name: 'Add to cart' })[0]);
    expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
  });
});

describe('cart page', () => {
  it('shows an empty state', () => {
    renderApp('/cart');
    expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
  });

  it('lists added products and keeps checkout disabled', async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getAllByRole('button', { name: 'Add to cart' })[1]);
    await user.click(screen.getByRole('link', { name: /Cart/ }));
    expect(screen.getAllByTestId('cart-line')).toHaveLength(1);
    expect(screen.getByRole('rowheader')).toHaveTextContent('Ceramic Coffee Mug');
    expect(screen.getByRole('button', { name: 'Checkout unavailable' })).toBeDisabled();
  });

  it('changes the quantity with the plus and minus buttons', async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getAllByRole('button', { name: 'Add to cart' })[1]);
    await user.click(screen.getByRole('link', { name: /Cart/ }));
    const line = screen.getByTestId('cart-line');
    const quantity = within(line).getByLabelText('Quantity of Ceramic Coffee Mug');
    const unitPrice = within(line).getAllByRole('cell')[0];

    await user.click(within(line).getByRole('button', { name: 'Increase quantity of Ceramic Coffee Mug' }));
    expect(quantity).toHaveTextContent('2');
    expect(screen.getByTestId('cart-count')).toHaveTextContent('2');
    expect(unitPrice).toHaveTextContent('180 EGP');

    await user.click(within(line).getByRole('button', { name: 'Decrease quantity of Ceramic Coffee Mug' }));
    expect(quantity).toHaveTextContent('1');
    expect(unitPrice).toHaveTextContent('180 EGP');
  });

  it('removes a product from the cart', async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getAllByRole('button', { name: 'Add to cart' })[1]);
    await user.click(screen.getByRole('link', { name: /Cart/ }));
    await user.click(screen.getByRole('button', { name: 'Remove' }));
    expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
  });
});
