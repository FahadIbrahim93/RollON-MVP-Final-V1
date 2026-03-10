import { products as mockProducts, categories as mockCategories, testimonials as mockTestimonials, orders as mockOrders, customers as mockCustomers, paymentMethods } from '../data/products';

const API_DELAY = 300;

const simulateApiCall = <T>(data: T): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), API_DELAY);
  });
};

export const api = {
  products: {
    getAll: async () => {
      return simulateApiCall(mockProducts);
    },

    getById: async (id: string) => {
      const product = mockProducts.find(p => p.id === id);
      return simulateApiCall(product);
    },

    getBySlug: async (slug: string) => {
      const product = mockProducts.find(p => p.slug === slug);
      return simulateApiCall(product);
    },

    getByCategory: async (categoryId: string) => {
      const filtered = mockProducts.filter(p => p.categoryId === categoryId);
      return simulateApiCall(filtered);
    },

    getFeatured: async () => {
      const featured = mockProducts.filter(p => p.featured);
      return simulateApiCall(featured);
    },

    search: async (query: string) => {
      const lowerQuery = query.toLowerCase();
      const results = mockProducts.filter(p => 
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery) ||
        p.tags?.some(t => t.toLowerCase().includes(lowerQuery))
      );
      return simulateApiCall(results);
    },
  },

  categories: {
    getAll: async () => {
      return simulateApiCall(mockCategories);
    },

    getById: async (id: string) => {
      const category = mockCategories.find(c => c.id === id);
      return simulateApiCall(category);
    },

    getBySlug: async (slug: string) => {
      const category = mockCategories.find(c => c.slug === slug);
      return simulateApiCall(category);
    },
  },

  testimonials: {
    getAll: async () => {
      return simulateApiCall(mockTestimonials);
    },
  },

  orders: {
    getAll: async () => {
      return simulateApiCall(mockOrders);
    },

    getById: async (id: string) => {
      const order = mockOrders.find(o => o.id === id);
      return simulateApiCall(order);
    },

    create: async (order: any) => {
      const newOrder = {
        ...order,
        id: Math.random().toString(36).substr(2, 9),
        orderNumber: `ORD-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return simulateApiCall(newOrder);
    },
  },

  customers: {
    getAll: async () => {
      return simulateApiCall(mockCustomers);
    },

    getById: async (id: string) => {
      const customer = mockCustomers.find(c => c.id === id);
      return simulateApiCall(customer);
    },
  },

  payment: {
    getMethods: async () => {
      return simulateApiCall(paymentMethods);
    },
  },
};
