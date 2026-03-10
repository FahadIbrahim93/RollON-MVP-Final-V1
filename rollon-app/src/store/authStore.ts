import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  checkAuth: () => Promise<void>;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

// --- JWT Simulation Utilities ---
const encodeMockJWT = (user: User) => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({ ...user, exp: Date.now() + 86400000 })); // 1 day
  const signature = 'mock_signature_' + Math.random().toString(36).substr(2, 9);
  return `${header}.${payload}.${signature}`;
};

const decodeMockJWT = (token: string): User | null => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = JSON.parse(atob(parts[1]));
    if (payload.exp && payload.exp < Date.now()) return null;
    return {
      id: String(payload.id),
      name: String(payload.name),
      email: String(payload.email),
      role: payload.role as 'user' | 'admin',
      avatar: payload.avatar ? String(payload.avatar) : undefined,
    };
  } catch (e) {
    return null;
  }
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });

          if (!response.ok) {
            throw new Error('Login failed');
          }

          const data = await response.json();
          set({
            user: data.user,
            token: data.token,
            isAuthenticated: true,
            isLoading: false
          });
          return true;
        } catch (error) {
          set({ isLoading: false });

          const demoAdminEmail = import.meta.env.VITE_DEMO_ADMIN_EMAIL || 'admin@rollon.com';
          const demoAdminPassword = import.meta.env.VITE_DEMO_ADMIN_PASSWORD || 'admin123';
          const demoUserEmail = import.meta.env.VITE_DEMO_USER_EMAIL || 'customer@example.com';
          const demoUserPassword = import.meta.env.VITE_DEMO_USER_PASSWORD || 'password123';

          if (email === demoAdminEmail && password === demoAdminPassword) {
            const user: User = { id: '1', name: 'Admin User', email: demoAdminEmail, role: 'admin' };
            const token = encodeMockJWT(user);
            set({ user, token, isAuthenticated: true, isLoading: false });
            return true;
          }

          if (email === demoUserEmail && password === demoUserPassword) {
            const user: User = { id: '2', name: 'Test Customer', email: demoUserEmail, role: 'user' };
            const token = encodeMockJWT(user);
            set({ user, token, isAuthenticated: true, isLoading: false });
            return true;
          }

          return false;
        }
      },

      register: async (name: string, email: string, password: string) => {
        set({ isLoading: true });
        try {
          const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
          });

          if (!response.ok) {
            throw new Error('Registration failed');
          }

          const data = await response.json();
          set({
            user: data.user,
            token: data.token,
            isAuthenticated: true,
            isLoading: false
          });
          return true;
        } catch (error) {
          set({ isLoading: false });

          const newUser: User = {
            id: Math.random().toString(36).substr(2, 9),
            name,
            email,
            role: 'user'
          };
          const token = encodeMockJWT(newUser);
          set({ user: newUser, token, isAuthenticated: true, isLoading: false });
          return true;
        }
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },

      updateProfile: (data) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        }));
      },

      checkAuth: async () => {
        const token = get().token;
        if (!token) return;

        try {
          const response = await fetch(`${API_URL}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (response.ok) {
            const user = await response.json();
            set({ user, isAuthenticated: true });
          } else {
            get().logout();
          }
        } catch {
          if (token.includes('.')) {
            const user = decodeMockJWT(token);
            if (user) {
              set({ user, isAuthenticated: true });
              return;
            }
          }
          get().logout();
        }
      },
    }),
    {
      name: 'rollon-auth',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated
      }),
    }
  )
);
