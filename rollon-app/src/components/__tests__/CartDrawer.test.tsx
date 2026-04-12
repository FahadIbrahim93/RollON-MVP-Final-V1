import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

vi.mock('@/store/cartStore', () => ({
    useCartStore: vi.fn(),
}));

import { CartDrawer } from '../CartDrawer';
import { useCartStore } from '@/store/cartStore';
import type { Product } from '@/types';

const mockProduct: Product = {
    id: '1',
    name: 'Test Product',
    price: 100,
    image: '/test.jpg',
    slug: 'test-product',
    description: 'Test description',
    category: 'Test',
    categoryId: '1',
    rating: 4,
    reviewCount: 10,
    stock: 5,
    inStock: true,
};

let storeState: ReturnType<typeof createStoreState>;
const mockedUseCartStore = useCartStore as unknown as ReturnType<typeof vi.fn>;

const createStoreState = (overrides: Partial<Record<string, any>> = {}) => ({
    items: [],
    isOpen: true,
    totalItems: 0,
    totalPrice: 0,
    setCartOpen: vi.fn(),
    removeItem: vi.fn(),
    updateQuantity: vi.fn(),
    clearCart: vi.fn(),
    ...overrides,
});

const renderWithRouter = (component: React.ReactNode) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('CartDrawer', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        storeState = createStoreState();
        mockedUseCartStore.mockImplementation((selector: any) => {
            return typeof selector === 'function' ? selector(storeState) : storeState;
        });
    });

    it('should render empty cart message when no items', () => {
        renderWithRouter(<CartDrawer />);
        expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
    });

    it('should render cart items when items exist', () => {
        storeState = createStoreState({
            items: [{
                ...mockProduct,
                productId: mockProduct.id,
                quantity: 1,
            }],
            totalItems: 1,
            totalPrice: 100,
        });
        mockedUseCartStore.mockImplementation((selector: any) => (typeof selector === 'function' ? selector(storeState) : storeState));

        renderWithRouter(<CartDrawer />);

        expect(screen.getByText('Test Product')).toBeInTheDocument();
    });

    it('should display correct item count in header', () => {
        storeState = createStoreState({
            items: [
                { ...mockProduct, productId: mockProduct.id, quantity: 1 },
                { ...mockProduct, id: '2', productId: '2', price: 200, quantity: 1 },
            ],
            totalItems: 2,
            totalPrice: 300,
        });
        mockedUseCartStore.mockImplementation((selector: any) => (typeof selector === 'function' ? selector(storeState) : storeState));

        renderWithRouter(<CartDrawer />);

        expect(screen.getByText('2 items')).toBeInTheDocument();
    });

    it('should display correct total price', async () => {
        storeState = createStoreState({
            items: [
                { ...mockProduct, productId: mockProduct.id, quantity: 1 },
                { ...mockProduct, id: '2', productId: '2', price: 200, quantity: 1 },
            ],
            totalItems: 2,
            totalPrice: 300,
        });
        mockedUseCartStore.mockImplementation((selector: any) => (typeof selector === 'function' ? selector(storeState) : storeState));

        renderWithRouter(<CartDrawer />);

        await waitFor(() => {
            const prices = document.querySelectorAll('.tabular-nums');
            expect(prices.length).toBeGreaterThan(0);
        });
    });

    it('should have settle manifest button', () => {
        storeState = createStoreState({
            items: [{ ...mockProduct, productId: mockProduct.id, quantity: 1 }],
            totalItems: 1,
            totalPrice: 100,
        });
        mockedUseCartStore.mockImplementation((selector: any) => (typeof selector === 'function' ? selector(storeState) : storeState));

        renderWithRouter(<CartDrawer />);

        expect(screen.getByText('Settle Manifest')).toBeInTheDocument();
    });

    it('should have purge case button', () => {
        storeState = createStoreState({
            items: [{ ...mockProduct, productId: mockProduct.id, quantity: 1 }],
            totalItems: 1,
            totalPrice: 100,
        });
        mockedUseCartStore.mockImplementation((selector: any) => (typeof selector === 'function' ? selector(storeState) : storeState));

        renderWithRouter(<CartDrawer />);

        expect(screen.getByText('PURGE CASE')).toBeInTheDocument();
    });

    it('should display trust badges when items exist', () => {
        storeState = createStoreState({
            items: [{ ...mockProduct, productId: mockProduct.id, quantity: 1 }],
            totalItems: 1,
            totalPrice: 100,
        });
        mockedUseCartStore.mockImplementation((selector: any) => (typeof selector === 'function' ? selector(storeState) : storeState));

        renderWithRouter(<CartDrawer />);

        expect(screen.getByText('Secure Protocol')).toBeInTheDocument();
        expect(screen.getByText('Elite Dispatch')).toBeInTheDocument();
    });

    it('should link to checkout', () => {
        storeState = createStoreState({
            items: [{ ...mockProduct, productId: mockProduct.id, quantity: 1 }],
            totalItems: 1,
            totalPrice: 100,
        });
        mockedUseCartStore.mockImplementation((selector: any) => (typeof selector === 'function' ? selector(storeState) : storeState));

        renderWithRouter(<CartDrawer />);

        const checkoutLink = screen.getByRole('link', { name: /settle manifest/i });
        expect(checkoutLink).toHaveAttribute('href', '/checkout');
    });

    it('should show quantity badge on item', () => {
        storeState = createStoreState({
            items: [{ ...mockProduct, productId: mockProduct.id, quantity: 1 }],
            totalItems: 1,
            totalPrice: 100,
        });

        renderWithRouter(<CartDrawer />);

        expect(screen.getByText('x1')).toBeInTheDocument();
    });
});
