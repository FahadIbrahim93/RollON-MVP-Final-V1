import {
  products as mockProducts,
  categories as mockCategories,
  testimonials as mockTestimonials,
  orders as mockOrders,
  customers as mockCustomers,
  paymentMethods,
} from '../data/products';
import type { Category, Customer, Order, Product, Testimonial } from '@/types';

const API_DELAY = 300;
const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';
const USE_REMOTE = import.meta.env.VITE_USE_REMOTE_API === 'true';

const simulateApiCall = <T>(data: T): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), API_DELAY);
  });
};

const fetchJson = async <T>(path: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
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
    getAll: async () => withFallback<Product[]>(async () => unwrapList(await fetchJson<ListResponse<Product>>('/products')), () => simulateApiCall(mockProducts)),

    getById: async (id: string) =>
      withFallback<Product | undefined>(() => fetchJson(`/products?id=${id}`), async () => mockProducts.find((p) => p.id === id)),

    getBySlug: async (slug: string) =>
      withFallback<Product | undefined>(
        () => fetchJson(`/products?slug=${encodeURIComponent(slug)}`),
        async () => mockProducts.find((p) => p.slug === slug),
      ),

    getByCategory: async (categoryId: string) =>
      withFallback<Product[]>(
        async () => unwrapList(await fetchJson<ListResponse<Product>>(`/products?categoryId=${encodeURIComponent(categoryId)}`)),
        async () => mockProducts.filter((p) => p.categoryId === categoryId),
      ),

    getFeatured: async () =>
      withFallback<Product[]>(async () => unwrapList(await fetchJson<ListResponse<Product>>('/products?featured=true')), async () => mockProducts.filter((p) => p.featured)),

    search: async (query: string) =>
      withFallback<Product[]>(
        async () => unwrapList(await fetchJson<ListResponse<Product>>(`/products?search=${encodeURIComponent(query)}`)),
        async () => {
          const lowerQuery = query.toLowerCase();
          return mockProducts.filter(
            (p) =>
              p.name.toLowerCase().includes(lowerQuery) ||
              p.description.toLowerCase().includes(lowerQuery) ||
              p.tags?.some((t) => t.toLowerCase().includes(lowerQuery)),
          );
        },
      ),
  },

  categories: {
    getAll: async () => withFallback<Category[]>(() => fetchJson('/categories'), () => simulateApiCall(mockCategories)),

    getById: async (id: string) =>
      withFallback<Category | undefined>(async () => {
        const categories = await fetchJson<Category[]>('/categories');
        return categories.find((c) => c.id === id);
      }, async () => mockCategories.find((c) => c.id === id)),

    getBySlug: async (slug: string) =>
      withFallback<Category | undefined>(async () => {
        const categories = await fetchJson<Category[]>('/categories');
        return categories.find((c) => c.slug === slug);
      }, async () => mockCategories.find((c) => c.slug === slug)),
  },

  testimonials: {
    getAll: async () => simulateApiCall<Testimonial[]>(mockTestimonials),
  },

  orders: {
    getAll: async () => withFallback<Order[]>(() => fetchJson('/orders'), () => simulateApiCall(mockOrders)),

    getById: async (id: string) =>
      withFallback<Order | undefined>(() => fetchJson(`/orders?id=${id}`), async () => mockOrders.find((o) => o.id === id)),

    create: async (order: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>) =>
      withFallback<Order>(
        () =>
          fetchJson('/orders', {
            method: 'POST',
            body: JSON.stringify(order),
          }),
        async () => ({
          ...order,
          id: Math.random().toString(36).slice(2, 11),
          orderNumber: `ORD-${Date.now()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }),
      ),
  },

  customers: {
    getAll: async () => withFallback<Customer[]>(() => fetchJson('/customers'), () => simulateApiCall(mockCustomers)),

    getById: async (id: string) =>
      withFallback<Customer | undefined>(async () => {
        const customers = await fetchJson<Customer[]>('/customers');
        return customers.find((c) => c.id === id);
      }, async () => mockCustomers.find((c) => c.id === id)),
  },

  payment: {
    getMethods: async () => simulateApiCall(paymentMethods),
  },
};
