import { describe, it, expect, beforeEach } from 'vitest';
import { useCartStore } from '../cartStore';

const mockProduct = {
  id: '1',
  name: 'Test Product',
  price: 100,
  image: 'test.jpg',
  slug: 'test-product',
  description: 'Test description',
  category: 'Test',
  categoryId: '1',
  rating: 4,
  reviewCount: 10,
  stock: 5,
};

describe('cartStore', () => {
  beforeEach(() => {
    useCartStore.getState().clearCart();
  });

  describe('addItem', () => {
    it('should add a new item to the cart', () => {
      const { addItem } = useCartStore.getState();

      addItem(mockProduct as any);

      const items = useCartStore.getState().items;
      expect(items).toHaveLength(1);
      expect(items[0].productId).toBe('1');
      expect(items[0].quantity).toBe(1);
    });

    it('should increment quantity for existing item', () => {
      const { addItem } = useCartStore.getState();

      addItem(mockProduct as any);
      addItem(mockProduct as any);

      const items = useCartStore.getState().items;
      expect(items).toHaveLength(1);
      expect(items[0].quantity).toBe(2);
    });

    it('should update totalItems and totalPrice', () => {
      const { addItem } = useCartStore.getState();

      addItem(mockProduct as any);
      addItem({ ...mockProduct, id: '2', price: 200 } as any);

      const { totalItems, totalPrice } = useCartStore.getState();
      expect(totalItems).toBe(2);
      expect(totalPrice).toBe(300);
    });
  });

  describe('removeItem', () => {
    it('should remove item from cart', () => {
      const { addItem, removeItem } = useCartStore.getState();

      addItem(mockProduct as any);
      removeItem('1');

      const items = useCartStore.getState().items;
      expect(items).toHaveLength(0);
    });
  });

  describe('updateQuantity', () => {
    it('should update item quantity', () => {
      const { addItem, updateQuantity } = useCartStore.getState();

      addItem(mockProduct as any);
      updateQuantity('1', 5);

      const items = useCartStore.getState().items;
      expect(items[0].quantity).toBe(5);
    });

    it('should remove item when quantity is 0', () => {
      const { addItem, updateQuantity } = useCartStore.getState();

      addItem(mockProduct as any);
      updateQuantity('1', 0);

      const items = useCartStore.getState().items;
      expect(items).toHaveLength(0);
    });
  });

  describe('clearCart', () => {
    it('should clear all items', () => {
      const { addItem, clearCart } = useCartStore.getState();

      addItem(mockProduct as any);
      addItem({ ...mockProduct, id: '2' } as any);
      clearCart();

      const items = useCartStore.getState().items;
      expect(items).toHaveLength(0);
    });
  });

  describe('toggleCart', () => {
    it('should toggle cart open state', () => {
      const { toggleCart } = useCartStore.getState();
      const initialState = useCartStore.getState().isOpen;

      toggleCart();
      expect(useCartStore.getState().isOpen).toBe(!initialState);

      toggleCart();
      expect(useCartStore.getState().isOpen).toBe(initialState);
    });
  });
});
