import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ShopProductCard } from '@/components/shop/shop-product-card';

const product = {
  id: 'p1',
  name: 'Ceramic V2',
  slug: 'ceramic-v2',
  description: 'Premium accessory',
  price: 100,
  image: '/a.jpg',
  category: 'grinders',
  categoryId: 'c1',
  rating: 4.8,
  reviewCount: 10,
  inStock: true,
  stock: 5,
};

const productWithBadge = {
  ...product,
  badge: '-20%',
};

const productWithTextBadge = {
  ...product,
  badge: 'NEW',
};

describe('ShopProductCard', () => {
  it('does not render nested anchors', () => {
    const { container } = render(
      <MemoryRouter>
        <ShopProductCard product={product} index={0} onAddToCart={vi.fn()} />
      </MemoryRouter>
    );

    expect(container.querySelectorAll('a a').length).toBe(0);
  });

  it('calls onAddToCart when QUICK ADD button is clicked', async () => {
    const onAddToCart = vi.fn();
    render(
      <MemoryRouter>
        <ShopProductCard product={product} index={0} onAddToCart={onAddToCart} />
      </MemoryRouter>
    );

    const quickAddButton = screen.getByText('QUICK ADD');
    fireEvent.click(quickAddButton);

    expect(onAddToCart).toHaveBeenCalledWith(product);
  });

  it('renders discount badge with percentage', () => {
    render(
      <MemoryRouter>
        <ShopProductCard product={productWithBadge} index={0} onAddToCart={vi.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByText('-20%')).toBeInTheDocument();
  });

  it('renders text badge for non-percentage badges', () => {
    render(
      <MemoryRouter>
        <ShopProductCard product={productWithTextBadge} index={0} onAddToCart={vi.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByText('NEW')).toBeInTheDocument();
  });

  it('does not render badge when product has no badge', () => {
    render(
      <MemoryRouter>
        <ShopProductCard product={product} index={0} onAddToCart={vi.fn()} />
      </MemoryRouter>
    );

    expect(screen.queryByText('-20%')).not.toBeInTheDocument();
    expect(screen.queryByText('NEW')).not.toBeInTheDocument();
  });
});
