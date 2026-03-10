# PROJECT BLUEPRINT (v1.0)
**Project:** RollON App
**Date:** 2026-03-11

## 1. Architecture Diagram (ASCII)

```text
+-------------------------------------------------+
|                    UI Layer                     |
|  [Pages] <-> [Components] <-> [Context/Store]   |
+-------------------------------------------------+
         |                           |
         v                           v
+------------------+       +----------------------+
|  React Router    |       | Zustand Stores       |
|  (Routing)       |       | (Cart, Auth, etc.)   |
+------------------+       +----------------------+
         |                           |
         v                           v
+------------------+       +----------------------+
|  React Query     |       |   Service Layer      |
|  (Data Cache)    |<----->|   (API Clients)      |
+------------------+       +----------------------+
                                     |
                                     v
                           +----------------------+
                           |   Mock Backend       |
                           |   (products.ts)      |
                           +----------------------+
```

## 2. Tech Stack Decisions with Rationale

| Layer | Technology | Rationale |
| :--- | :--- | :--- |
| **Framework** | React 19 + Vite | Fast compilation, modern hooks, industry standard SPA. |
| **Routing** | React Router v6 | Reliable client-side routing, enables code splitting via `React.lazy`. |
| **State Mgt** | Zustand | Lightweight, un-opinionated, zero-boilerplate alternative to Redux. Supports persistence out of the box (e.g., cart). |
| **Data Fetching**| TanStack Query (React Query) | Handles caching, loading states, and invalidation easily. Migrates smoothly when mock data is replaced with a real API. |
| **Styling** | Tailwind CSS v4 | Rapid prototyping, highly customizable, responsive by default. |
| **Forms** | React Hook Form + Zod | Performant form validation without re-renders. Zod provides strict runtime type safety. |

## 3. File Structure with Roles

```text
src/
├── components/       # Reusable, stateless UI components (e.g., Navbar, Button)
│   ├── ui/           # Primitive UI components (shadcn/ui style)
│   └── checkout/     # Domain-specific components
├── pages/            # Routable top-level components
├── store/            # Global state (Zustand)
├── lib/              # Utility functions, API clients, React Query hooks
│   ├── hooks/        # Custom React Query domains 
│   ├── data.ts       # Mock endpoints
│   └── utils.ts      # Class merging (cn), formatting
├── context/          # (DEPRECATED) Legacy Context API - marking for removal
├── types.ts          # Unified TS Interfaces
├── App.tsx           # Router Definitions
└── main.tsx          # React render root
```

## 4. Dependency Graph

`App` → `Pages` → `Components` → `Store (Zustand) / Hooks (React Query)` → `lib/api` → `data/products`

## 5. API Contract Definitions

All external calls pass through the API Service Layer.

**Product Interface:**
```typescript
interface Product {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    image: string;
    category: string;
    categoryId: string;
    inStock: boolean;
    stock: number;
}
```

**CartItem Interface:**
```typescript
interface CartItem {
    productId: string;
    name: string;
    slug: string;
    price: number;
    quantity: number;
    image: string;
    variant?: string;
}
```

## 6. State Management Strategy

We are universally adopting **Zustand** as the single source of truth for global state, actively deprecating and removing `CartContext` to avoid duplication.
- Local component states use `useState` or `useReducer`.
- Server state (products, orders) uses **React Query** (`useQuery`, `useMutation`).
- Global UI state (cart open status, user session) uses **Zustand**. 
  - Sub-slices: `useCartStore`, `useAuthStore`, `useWishlistStore`.
