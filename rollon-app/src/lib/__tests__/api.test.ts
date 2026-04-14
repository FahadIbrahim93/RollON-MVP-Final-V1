import { beforeEach, describe, expect, it } from 'vitest';
import { api } from '../../lib/api';
import { useDatabaseStore } from '@/store/databaseStore';

beforeEach(() => {
  useDatabaseStore.getState().initializeFromSeed();
});

describe('api', () => {
  describe('products', () => {
    it('should get all products', async () => {
      const products = await api.products.getAll();
      expect(products).toBeDefined();
      expect(Array.isArray(products)).toBe(true);
      expect(products.length).toBeGreaterThan(0);
    });

    it('should get product by id', async () => {
      const product = await api.products.getById('fb-1');
      expect(product).toBeDefined();
      expect(product?.id).toBe('fb-1');
    });

    it('should get product by slug', async () => {
      const product = await api.products.getBySlug('hb109-hot-silicon-bong');
      expect(product).toBeDefined();
      expect(product?.slug).toBe('hb109-hot-silicon-bong');
    });

    it('should return undefined for non-existent product id', async () => {
      const product = await api.products.getById('missing-product-id');
      expect(product).toBeUndefined();
    });

    it('should return undefined for non-existent product slug', async () => {
      const product = await api.products.getBySlug('missing-product-slug');
      expect(product).toBeUndefined();
    });

    it('should get products by category', async () => {
      const products = await api.products.getByCategory('3');
      expect(products).toBeDefined();
      expect(Array.isArray(products)).toBe(true);
      products.forEach((product) => expect(product.categoryId).toBe('3'));
    });

    it('should return empty array for unknown category', async () => {
      const products = await api.products.getByCategory('does-not-exist');
      expect(products).toEqual([]);
    });

    it('should get featured products only', async () => {
      const products = await api.products.getFeatured();
      expect(products).toBeDefined();
      expect(Array.isArray(products)).toBe(true);
      expect(products.length).toBeGreaterThan(0);
      products.forEach((product) => expect(product.featured).toBe(true));
    });

    it('should search products case-insensitively', async () => {
      const products = await api.products.search('GRINDER');
      expect(products.length).toBeGreaterThan(0);
      expect(products.some((product) => product.name.toLowerCase().includes('grinder'))).toBe(true);
    });

    it('should search products using tag matches', async () => {
      const products = await api.products.search('rick and morty');
      expect(products.length).toBeGreaterThan(0);
      expect(products.some((product) => product.tags?.some((tag) => tag.toLowerCase().includes('rick and morty')))).toBe(true);
    });

    it('should return empty search results for unknown terms', async () => {
      const products = await api.products.search('zzzz-no-product-match-zzzz');
      expect(products).toEqual([]);
    });

    it('should create a new product', async () => {
      const newProduct = {
        id: 'test-product-1',
        name: 'Test Product',
        slug: 'test-product',
        description: 'Test description',
        price: 1999,
        originalPrice: 2999,
        image: '/images/test.jpg',
        category: 'Test',
        categoryId: '1',
        tags: ['test'],
        rating: 4.5,
        reviewCount: 10,
        inStock: true,
        stock: 100,
      };

      const created = await api.products.create(newProduct);
      expect(created.id).toBe('test-product-1');

      const products = await api.products.getAll();
      expect(products.some((product) => product.id === 'test-product-1')).toBe(true);
    });

    it('should update an existing product and persist in store', async () => {
      const updates = { name: 'Updated Product Name', price: 2999 };
      const updated = await api.products.update('fb-1', updates);
      expect(updated).toEqual({ id: 'fb-1', ...updates });

      const product = await api.products.getById('fb-1');
      expect(product?.name).toBe('Updated Product Name');
      expect(product?.price).toBe(2999);
    });

    it('should not create a record when updating unknown product id', async () => {
      const result = await api.products.update('missing-id', { name: 'Ignored Update' });
      expect(result).toEqual({ id: 'missing-id', name: 'Ignored Update' });

      const product = await api.products.getById('missing-id');
      expect(product).toBeUndefined();
    });

    it('should delete an existing product', async () => {
      await api.products.create({
        id: 'test-product-delete',
        name: 'Delete Product',
        slug: 'delete-product',
        description: 'Delete description',
        price: 1000,
        originalPrice: 1200,
        image: '/images/delete.jpg',
        category: 'Test',
        categoryId: '1',
        tags: ['delete'],
        rating: 4,
        reviewCount: 1,
        inStock: true,
        stock: 1,
      });

      const result = await api.products.delete('test-product-delete');
      expect(result.success).toBe(true);

      const product = await api.products.getById('test-product-delete');
      expect(product).toBeUndefined();
    });

    it('should return success when deleting unknown product id', async () => {
      const before = (await api.products.getAll()).length;
      const result = await api.products.delete('not-in-store');
      const after = (await api.products.getAll()).length;

      expect(result).toEqual({ success: true });
      expect(after).toBe(before);
    });
  });

  describe('categories', () => {
    it('should get all categories', async () => {
      const categories = await api.categories.getAll();
      expect(categories).toBeDefined();
      expect(Array.isArray(categories)).toBe(true);
      expect(categories.length).toBeGreaterThan(0);
    });

    it('should get category by id', async () => {
      const category = await api.categories.getById('1');
      expect(category).toBeDefined();
      expect(category?.id).toBe('1');
    });

    it('should return undefined for unknown category id', async () => {
      const category = await api.categories.getById('missing-category-id');
      expect(category).toBeUndefined();
    });

    it('should get category by slug', async () => {
      const category = await api.categories.getBySlug('vaporizers');
      expect(category).toBeDefined();
      expect(category?.slug).toBe('vaporizers');
    });

    it('should return undefined for unknown category slug', async () => {
      const category = await api.categories.getBySlug('missing-category-slug');
      expect(category).toBeUndefined();
    });
  });

  describe('testimonials', () => {
    it('should get all testimonials', async () => {
      const testimonials = await api.testimonials.getAll();
      expect(testimonials).toBeDefined();
      expect(Array.isArray(testimonials)).toBe(true);
      expect(testimonials.length).toBeGreaterThan(0);
    });
  });

  describe('orders', () => {
    it('should get all orders', async () => {
      const orders = await api.orders.getAll();
      expect(orders).toBeDefined();
      expect(Array.isArray(orders)).toBe(true);
    });

    it('should get order by id', async () => {
      const order = await api.orders.getById('fb-order-1');
      expect(order).toBeDefined();
      expect(order?.id).toBe('fb-order-1');
    });

    it('should return undefined for unknown order id', async () => {
      const order = await api.orders.getById('missing-order-id');
      expect(order).toBeUndefined();
    });

    it('should create new order and persist in store', async () => {
      const newOrder = await api.orders.create({
        customerId: 'fb-customer-1',
        customerName: 'Test User',
        items: [],
        total: 1000,
        status: 'pending',
        paymentStatus: 'pending',
        paymentMethod: 'cod',
        shippingAddress: {
          name: 'Test',
          address: 'Test',
          city: 'Dhaka',
          phone: '0123456789',
        },
      });

      expect(newOrder.orderNumber).toBeDefined();
      expect(newOrder.id).toBeDefined();

      const persisted = await api.orders.getById(newOrder.id);
      expect(persisted).toBeDefined();
      expect(persisted?.customerId).toBe('fb-customer-1');
    });
  });

  describe('customers', () => {
    it('should get all customers', async () => {
      const customers = await api.customers.getAll();
      expect(customers).toBeDefined();
      expect(Array.isArray(customers)).toBe(true);
      expect(customers.length).toBeGreaterThan(0);
    });

    it('should get customer by id', async () => {
      const customer = await api.customers.getById('fb-customer-1');
      expect(customer).toBeDefined();
      expect(customer?.id).toBe('fb-customer-1');
    });

    it('should return undefined for unknown customer id', async () => {
      const customer = await api.customers.getById('missing-customer-id');
      expect(customer).toBeUndefined();
    });
  });

  describe('payment', () => {
    it('should get payment methods', async () => {
      const methods = await api.payment.getMethods();
      expect(methods).toBeDefined();
      expect(Array.isArray(methods)).toBe(true);
      expect(methods.length).toBeGreaterThan(0);
    });
  });
});
