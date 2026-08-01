import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useDatabaseStore } from '../../store/databaseStore';

/**
 * Tests for the remote-API path of the API client.
 * Uses vi.stubEnv + vi.resetModules so api.ts re-imports with
 * VITE_USE_REMOTE_API=true, then mocks fetch to return bare-array list
 * responses (the documented contract) and verifies getById/getBySlug unwrap
 * them into single items.
 */

const mockProduct = {
  id: 'p1',
  name: 'Test Grinder',
  slug: 'test-grinder',
  price: 1500,
  image: '/images/products/grinder-classic.jpg',
  category: 'Grinders',
  categoryId: 'c2',
  description: 'A test product',
  rating: 4.5,
  reviewCount: 10,
  featured: true,
  inStock: true,
  stock: 20,
  tags: ['grinder'],
};

async function loadRemoteApi() {
  vi.stubEnv('VITE_USE_REMOTE_API', 'true');
  vi.stubEnv('VITE_API_BASE_URL', 'http://api.test');
  vi.resetModules();
  return (await import('../api')).api;
}

async function loadLocalApi() {
  // VITE_USE_REMOTE_API unset → USE_REMOTE=false → local write path.
  vi.unstubAllEnvs();
  vi.resetModules();
  return (await import('../api')).api;
}

describe('api client — remote path', () => {
  beforeEach(() => {
    localStorage.clear();
    useDatabaseStore.setState({ products: [], categories: [], orders: [], customers: [], users: [] });
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.resetModules();
  });

  it('getBySlug unwraps a bare-array response into a single product', async () => {
    const api = await loadRemoteApi();
    vi.stubGlobal('fetch', vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => [mockProduct], // bare array, per docs/API.md
    })));

    const product = await api.products.getBySlug('test-grinder');
    expect(product).toEqual(mockProduct);
    expect(Array.isArray(product)).toBe(false);
  });

  it('getById unwraps a bare-array response into a single product', async () => {
    const api = await loadRemoteApi();
    vi.stubGlobal('fetch', vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => [mockProduct],
    })));

    const product = await api.products.getById('p1');
    expect(product).toEqual(mockProduct);
    expect(Array.isArray(product)).toBe(false);
  });

  it('getBySlug returns undefined for an empty result', async () => {
    const api = await loadRemoteApi();
    vi.stubGlobal('fetch', vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => [],
    })));

    const product = await api.products.getBySlug('missing');
    expect(product).toBeUndefined();
  });

  it('getAll returns the list as-is', async () => {
    const api = await loadRemoteApi();
    vi.stubGlobal('fetch', vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => [mockProduct],
    })));

    const products = await api.products.getAll();
    expect(products).toHaveLength(1);
    expect(products[0].id).toBe('p1');
  });

  it('falls back to local store when the remote call fails', async () => {
    const api = await loadRemoteApi();
    // Re-import the store AFTER resetModules so it's the same fresh instance api.ts uses.
    const { useDatabaseStore: freshStore } = await import('../../store/databaseStore');
    vi.stubGlobal('fetch', vi.fn(async () => {
      throw new Error('Network error');
    }));
    freshStore.setState({ products: [mockProduct] });

    const product = await api.products.getBySlug('test-grinder');
    expect(product).toEqual(mockProduct);
  });

  it('orders.getById unwraps a bare-array response', async () => {
    const api = await loadRemoteApi();
    const mockOrder = {
      id: 'o1',
      orderNumber: 'ORD-123',
      customerId: 'u1',
      customerName: 'Test User',
      total: 1500,
      status: 'pending',
      paymentStatus: 'pending',
      paymentMethod: 'cod',
      createdAt: new Date().toISOString(),
      items: [],
      shippingAddress: { name: 'T', address: 'A', city: 'C', phone: '1' },
    };
    vi.stubGlobal('fetch', vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => [mockOrder],
    })));

    const order = await api.orders.getById('o1');
    expect(order).toEqual(mockOrder);
    expect(Array.isArray(order)).toBe(false);
  });

  it('products.getByCategory returns filtered list from remote', async () => {
    const api = await loadRemoteApi();
    const catProduct = { ...mockProduct, categoryId: 'c2' };
    vi.stubGlobal('fetch', vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => [catProduct],
    })));

    const products = await api.products.getByCategory('c2');
    expect(products).toHaveLength(1);
    expect(products[0].categoryId).toBe('c2');
  });

  it('products.getFeatured returns featured from remote', async () => {
    const api = await loadRemoteApi();
    vi.stubGlobal('fetch', vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => [{ ...mockProduct, featured: true }],
    })));

    const products = await api.products.getFeatured();
    expect(products).toHaveLength(1);
    expect(products[0].featured).toBe(true);
  });

  it('products.search passes the query through to remote', async () => {
    const api = await loadRemoteApi();
    vi.stubGlobal('fetch', vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => [mockProduct],
    })));

    const products = await api.products.search('grinder');
    expect(products).toHaveLength(1);
    const fetchMock = vi.mocked(fetch);
    expect(String(fetchMock.mock.calls[0][0])).toContain('search=grinder');
  });

  it('categories.getAll returns categories from remote', async () => {
    const api = await loadRemoteApi();
    vi.stubGlobal('fetch', vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => [{ id: 'c1', name: 'Vaporizers', slug: 'vaporizers', description: '', productCount: 1 }],
    })));

    const categories = await api.categories.getAll();
    expect(categories).toHaveLength(1);
    expect(categories[0].slug).toBe('vaporizers');
  });

  it('testimonials.getAll returns seeded testimonials', async () => {
    const api = await loadRemoteApi();
    const testimonials = await api.testimonials.getAll();
    expect(Array.isArray(testimonials)).toBe(true);
  });

  it('payment.getMethods returns the static methods', async () => {
    const api = await loadRemoteApi();
    const methods = await api.payment.getMethods();
    const ids = methods.map((m) => m.id);
    expect(ids).toEqual(['cod', 'bkash', 'nagad']);
  });

  it('handles paginated envelope list responses', async () => {
    const api = await loadRemoteApi();
    vi.stubGlobal('fetch', vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => ({ items: [mockProduct], total: 1, page: 1, limit: 12 }),
    })));

    const products = await api.products.getAll();
    expect(products).toHaveLength(1);
    expect(products[0].id).toBe('p1');
  });

  it('products.create adds to the local store and returns the product', async () => {
    const api = await loadLocalApi();
    const { useDatabaseStore: freshStore } = await import('../../store/databaseStore');
    freshStore.setState({ products: [] });

    const created = await api.products.create(mockProduct);
    expect(created.id).toBe('p1');
    expect(freshStore.getState().products).toHaveLength(1);
  });

  it('products.update patches the local store', async () => {
    const api = await loadLocalApi();
    const { useDatabaseStore: freshStore } = await import('../../store/databaseStore');
    freshStore.setState({ products: [{ ...mockProduct }] });

    const updated = await api.products.update('p1', { price: 2000 });
    expect(updated.price).toBe(2000);
    expect(freshStore.getState().products[0].price).toBe(2000);
  });

  it('products.delete removes from the local store', async () => {
    const api = await loadLocalApi();
    const { useDatabaseStore: freshStore } = await import('../../store/databaseStore');
    freshStore.setState({ products: [{ ...mockProduct }] });

    const result = await api.products.delete('p1');
    expect(result.success).toBe(true);
    expect(freshStore.getState().products).toHaveLength(0);
  });

  it('orders.create generates metadata and stores locally in local mode', async () => {
    const api = await loadLocalApi();
    const { useDatabaseStore: freshStore } = await import('../../store/databaseStore');
    freshStore.setState({ orders: [] });

    const order = await api.orders.create({
      customerId: 'u1',
      customerName: 'Test User',
      total: 1500,
      status: 'pending',
      paymentStatus: 'pending',
      paymentMethod: 'cod',
      items: [{ productId: 'p1', name: 'Test Grinder', quantity: 1, price: 1500, image: '/images/x.jpg' }],
      shippingAddress: { name: 'T', address: 'A', city: 'C', phone: '1' },
    });
    expect(order.id).toBeTruthy();
    expect(order.orderNumber).toMatch(/^ORD-/);
    expect(freshStore.getState().orders).toHaveLength(1);
  });

  it('customers.getAll returns customers from remote', async () => {
    const api = await loadRemoteApi();
    vi.stubGlobal('fetch', vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => [{ id: 'u1', name: 'T', email: 't@e.com', phone: '1', totalSpent: 0, orders: 0, createdAt: new Date().toISOString() }],
    })));

    const customers = await api.customers.getAll();
    expect(customers).toHaveLength(1);
    expect(customers[0].email).toBe('t@e.com');
  });

  it('categories.getById finds the category in the remote list', async () => {
    const api = await loadRemoteApi();
    vi.stubGlobal('fetch', vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => [
        { id: 'c1', name: 'Vaporizers', slug: 'vaporizers', description: '', productCount: 1 },
        { id: 'c2', name: 'Grinders', slug: 'grinders', description: '', productCount: 1 },
      ],
    })));

    const category = await api.categories.getById('c2');
    expect(category?.slug).toBe('grinders');
  });

  it('categories.getBySlug finds the category in the remote list', async () => {
    const api = await loadRemoteApi();
    vi.stubGlobal('fetch', vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => [{ id: 'c1', name: 'Vaporizers', slug: 'vaporizers', description: '', productCount: 1 }],
    })));

    const category = await api.categories.getBySlug('vaporizers');
    expect(category?.id).toBe('c1');
  });

  it('customers.getById finds the customer in the remote list', async () => {
    const api = await loadRemoteApi();
    vi.stubGlobal('fetch', vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => [{ id: 'u1', name: 'T', email: 't@e.com', phone: '1', totalSpent: 0, orders: 0, createdAt: new Date().toISOString() }],
    })));

    const customer = await api.customers.getById('u1');
    expect(customer?.email).toBe('t@e.com');
  });

  it('orders.getAll returns orders from remote', async () => {
    const api = await loadRemoteApi();
    vi.stubGlobal('fetch', vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => [],
    })));

    const orders = await api.orders.getAll();
    expect(Array.isArray(orders)).toBe(true);
  });
});
