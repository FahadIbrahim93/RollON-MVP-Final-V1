import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { products as initialProducts, categories as initialCategories, orders as initialOrders, customers as initialCustomers } from '../data/products';
import type { Product, Category, Order, Customer, User } from '@/types';

// Simple hash function for password verification (not for security, just for local demo)
const simpleHash = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16);
};

export type AuthUser = User & { passwordHash?: string };

interface DatabaseState {
  products: Product[];
  categories: Category[];
  orders: Order[];
  customers: Customer[];
  users: AuthUser[];
  
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  addOrder: (order: Order) => void;
  updateOrder: (id: string, updates: Partial<Order>) => void;
  
  addCustomer: (customer: Customer) => void;
  updateCustomer: (id: string, updates: Partial<Customer>) => void;
  
  addUser: (user: Omit<AuthUser, 'passwordHash'> & { password: string }) => void;
  verifyPassword: (email: string, password: string) => AuthUser | undefined;
  
  initializeFromSeed: () => void;
}

export const useDatabaseStore = create<DatabaseState>()(
  persist(
    (set, get) => ({
      products: [],
      categories: [],
      orders: [],
      customers: [],
      users: [],

      addProduct: (product) => {
        set((state) => ({
          products: [...state.products, product],
        }));
      },

      updateProduct: (id, updates) => {
        set((state) => ({
          products: state.products.map((p) => (p.id === id ? { ...p, ...updates } : p)),
        }));
      },

      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        }));
      },

      addOrder: (order) => {
        set((state) => ({
          orders: [...state.orders, order],
        }));
      },

      updateOrder: (id, updates) => {
        set((state) => ({
          orders: state.orders.map((o) => (o.id === id ? { ...o, ...updates } : o)),
        }));
      },

      addCustomer: (customer) => {
        set((state) => ({
          customers: [...state.customers, customer],
        }));
      },

      updateCustomer: (id, updates) => {
        set((state) => ({
          customers: state.customers.map((c) => (c.id === id ? { ...c, ...updates } : c)),
        }));
      },

      addUser: (user) => {
        const passwordHash = simpleHash(user.password);
        const { password: _password, ...userWithoutPassword } = user;
        void _password;
        set((state) => ({
          users: [...state.users, { ...userWithoutPassword, passwordHash }],
        }));
      },

      verifyPassword: (email, password) => {
        const passwordHash = simpleHash(password);
        const user = get().users.find(u => u.email === email && u.passwordHash === passwordHash);
        if (user) {
          const { passwordHash: _ph, ...userWithoutHash } = user;
          void _ph;
          return userWithoutHash;
        }
        return undefined;
      },

      initializeFromSeed: () => {
        const state = get();
        // Only initialize if no data exists and not in production
        if (state.products.length === 0 && import.meta.env.DEV) {
          set({
            products: initialProducts,
            categories: initialCategories,
            orders: initialOrders,
            customers: initialCustomers,
            users: [
              {
                id: 'admin-seed',
                name: 'System Admin',
                email: 'admin@rollon.com',
                // Password hash for 'admin123' - not stored in production
                passwordHash: simpleHash('admin123'),
                role: 'admin',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin'
              }
            ],
          });
        }
      },
    }),
    {
      name: 'rollon-database',
      onRehydrateStorage: () => (state) => {
        if (state && import.meta.env.DEV) {
          state.initializeFromSeed();
        }
      },
    }
  )
);
