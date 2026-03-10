import { describe, it, expect, beforeEach } from 'vitest';
import { useCartStore } from '../store/cartStore';

describe('cartStore', () => {
  beforeEach(() => {
    useCartStore.getState().clearCart();
  });

  describe('addItem', () => {
    it('should add a new item to the cart', () => {
      const { addItem } = useCartStore.getState();
      
      addItem({ productId: '1', name: 'Test Product', price: 100, image: 'test.jpg' });
      
      const items = useCartStore.getState().items;
      expect(items).toHaveLength(1);
      expect(items[0].productId).toBe('1');
      expect(items[0].quantity).toBe(1);
    });

    it('should increment quantity for existing item', () => {
      const { addItem } = useCartStore.getState();
      
      addItem({ productId: '1', name: 'Test Product', price: 100, image: 'test.jpg' });
      addItem({ productId: '1', name: 'Test Product', price: 100, image: 'test.jpg' });
      
      const items = useCartStore.getState().items;
      expect(items).toHaveLength(1);
      expect(items[0].quantity).toBe(2);
    });

    it('should calculate totalItems and totalPrice correctly', () => {
      const { addItem } = useCartStore.getState();
      
      addItem({ productId: '1', name: 'Test Product', price: 100, image: 'test.jpg' });
      addItem({ productId: '2', name: 'Test Product 2', price: 200, image: 'test.jpg' });
      
      const { totalItems, totalPrice } = useCartStore.getState();
      expect(totalItems()).toBe(2);
      expect(totalPrice()).toBe(300);
    });
  });

  describe('removeItem', () => {
    it('should remove item from cart', () => {
      const { addItem, removeItem } = useCartStore.getState();
      
      addItem({ productId: '1', name: 'Test Product', price: 100, image: 'test.jpg' });
      removeItem('1');
      
      const items = useCartStore.getState().items;
      expect(items).toHaveLength(0);
    });
  });

  describe('updateQuantity', () => {
    it('should update item quantity', () => {
      const { addItem, updateQuantity } = useCartStore.getState();
      
      addItem({ productId: '1', name: 'Test Product', price: 100, image: 'test.jpg' });
      updateQuantity('1', 5);
      
      const items = useCartStore.getState().items;
      expect(items[0].quantity).toBe(5);
    });

    it('should remove item when quantity is 0', () => {
      const { addItem, updateQuantity } = useCartStore.getState();
      
      addItem({ productId: '1', name: 'Test Product', price: 100, image: 'test.jpg' });
      updateQuantity('1', 0);
      
      const items = useCartStore.getState().items;
      expect(items).toHaveLength(0);
    });
  });

  describe('clearCart', () => {
    it('should clear all items', () => {
      const { addItem, clearCart } = useCartStore.getState();
      
      addItem({ productId: '1', name: 'Test Product', price: 100, image: 'test.jpg' });
      addItem({ productId: '2', name: 'Test Product 2', price: 200, image: 'test.jpg' });
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
