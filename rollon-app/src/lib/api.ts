import { testimonials as mockTestimonials } from '../data/products';
import { useDatabaseStore } from '../store/databaseStore';
import type { Category, Customer, Order, Product, Testimonial } from '@/types';

const API_DELAY = 300;
const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';
const USE_REMOTE = import.meta.env.VITE_USE_REMOTE_API === 'true';

function getAuthToken(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const persisted = window.localStorage.getItem('rollon-auth');
    if (!persisted) {
      return null;
    }

    const parsed = JSON.parse(persisted) as { state?: { token?: string | null } };
    return parsed?.state?.token ?? null;
  } catch {
    return null;
  }
}

const simulateApiCall = <T>(data: T): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), API_DELAY);
  });
};

const fetchJson = async <T>(path: string, init?: RequestInit): Promise<T> => {
  const token = getAuthToken();

  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers || {}),
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed (${response.status})`);
  }

  return response.json();
};

type ListResponse<T> = T[] | { items: T[]; total?: number; page?: number; limit?: number };

const unwrapList = <T>(payload: ListResponse<T>): T[] => {
  return Array.isArray(payload) ? payload : payload.items;
};

const getStoreProducts = () => useDatabaseStore.getState().products;
const getStoreCategories = () => useDatabaseStore.getState().categories;
const getStoreOrders = () => useDatabaseStore.getState().orders;
const getStoreCustomers = () => useDatabaseStore.getState().customers;

const withFallback = async <T>(remoteFn: () => Promise<T>, mockFn: () => Promise<T>) => {
  if (!USE_REMOTE) {
    return mockFn();
  }

  try {
    return await remoteFn();
  } catch (error) {
    console.warn('Remote API unavailable, falling back to local dataset.', error);
    return mockFn();
  }
};

export const api = {
  products: {
    getAll: async () => withFallback<Product[]>(async () => unwrapList(await fetchJson<ListResponse<Product>>('/products')), async () => simulateApiCall(getStoreProducts())),

    getById: async (id: string) =>
      withFallback<Product | undefined>(
        async () => {
          const items = unwrapList(await fetchJson<ListResponse<Product>>(`/products?id=${encodeURIComponent(id)}`));
          return items[0];
        },
        async () => getStoreProducts().find((p) => p.id === id),
      ),

    getBySlug: async (slug: string) =>
      withFallback<Product | undefined>(
        async () => {
          const items = unwrapList(await fetchJson<ListResponse<Product>>(`/products?slug=${encodeURIComponent(slug)}`));
          return items[0];
        },
        async () => getStoreProducts().find((p) => p.slug === slug),
      ),

    getByCategory: async (categoryId: string) =>
      withFallback<Product[]>(
        async () => unwrapList(await fetchJson<ListResponse<Product>>(`/products?categoryId=${encodeURIComponent(categoryId)}`)),
        async () => getStoreProducts().filter((p) => p.categoryId === categoryId),
      ),

    getFeatured: async () =>
      withFallback<Product[]>(async () => unwrapList(await fetchJson<ListResponse<Product>>('/products?featured=true')), async () => getStoreProducts().filter((p) => p.featured)),

    search: async (query: string) =>
      withFallback<Product[]>(
        async () => unwrapList(await fetchJson<ListResponse<Product>>(`/products?search=${encodeURIComponent(query)}`)),
        async () => {
          const lowerQuery = query.toLowerCase();
          return getStoreProducts().filter(
            (p) =>
              p.name.toLowerCase().includes(lowerQuery) ||
              p.description.toLowerCase().includes(lowerQuery) ||
              p.tags?.some((t) => t.toLowerCase().includes(lowerQuery)),
          );
        },
      ),

    create: async (product: Product) => {
      useDatabaseStore.getState().addProduct(product);
      return product;
    },

    update: async (id: string, updates: Partial<Product>) => {
      useDatabaseStore.getState().updateProduct(id, updates);
      return { id, ...updates };
    },

    delete: async (id: string) => {
      useDatabaseStore.getState().deleteProduct(id);
      return { success: true };
    },
  },

  categories: {
    getAll: async () => withFallback<Category[]>(() => fetchJson('/categories'), () => simulateApiCall(getStoreCategories())),

    getById: async (id: string) =>
      withFallback<Category | undefined>(async () => {
        const categories = await fetchJson<Category[]>('/categories');
        return categories.find((c) => c.id === id);
      }, async () => getStoreCategories().find((c) => c.id === id)),

    getBySlug: async (slug: string) =>
      withFallback<Category | undefined>(async () => {
        const categories = await fetchJson<Category[]>('/categories');
        return categories.find((c) => c.slug === slug);
      }, async () => getStoreCategories().find((c) => c.slug === slug)),
  },

  testimonials: {
    getAll: async () => simulateApiCall<Testimonial[]>(mockTestimonials),
  },

  orders: {
    getAll: async () => withFallback<Order[]>(() => fetchJson('/orders'), async () => simulateApiCall(getStoreOrders())),

    getById: async (id: string) =>
      withFallback<Order | undefined>(
        async () => {
          const items = unwrapList(await fetchJson<ListResponse<Order>>(`/orders?id=${encodeURIComponent(id)}`));
          return items[0];
        },
        async () => getStoreOrders().find((o) => o.id === id),
      ),

    create: async (order: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>) => {
      const newOrder: Order = {
        ...order,
        id: Math.random().toString(36).slice(2, 11),
        orderNumber: `ORD-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      if (!USE_REMOTE) {
        useDatabaseStore.getState().addOrder(newOrder);
      }

      return withFallback<Order>(
        () =>
          fetchJson('/orders', {
            method: 'POST',
            body: JSON.stringify(order),
          }),
        async () => newOrder,
      );
    },
  },

  customers: {
    getAll: async () => withFallback<Customer[]>(() => fetchJson('/customers'), async () => simulateApiCall(getStoreCustomers())),

    getById: async (id: string) =>
      withFallback<Customer | undefined>(
        async () => {
          const items = unwrapList(await fetchJson<ListResponse<Customer>>(`/customers?id=${encodeURIComponent(id)}`));
          return items[0];
        },
        async () => getStoreCustomers().find((c) => c.id === id),
      ),
  },

  payment: {
    getMethods: async () => simulateApiCall([
      { id: 'cod', name: 'Cash on Delivery', icon: 'Banknote', color: '#10B981' },
      { id: 'bkash', name: 'bKash', icon: 'Smartphone', color: '#E2136E' },
      { id: 'nagad', name: 'Nagad', icon: 'Wallet', color: '#F7931E' },
    ]),
  },
};