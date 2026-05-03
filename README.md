# 🛒 RollON — Premium E-Commerce Storefront

> Production-ready e-commerce with cart, variants, and checkout flow. Built for real sales.

[![Live Demo](https://img.shields.io/badge/-Shop%20Now-blue?style=flat&logo=vite)](https://rollon-delta.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Tests](https://img.shields.io/badge/Tests-63%2B%20passing-green)]()
[![Quality: 8.5/10](https://img.shields.io/badge/Quality-8.5%2F10-yellow)]()

---

## Why This Project?

Custom e-commerce without Shopify limitations — exactly what client needed.

- ✅ **Product variants** — size, color, quantity (not just dropdowns)
- ✅ **Cart persistence** — localStorage survives refresh
- ✅ **Responsive-first** — works on mobile, converts everywhere
- ✅ **Admin-ready** — easy to extend for inventory management

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🛒 **Shopping cart** | Add/update/remove, persists across sessions |
| 📦 **Product variants** | Size, color, quantity selection |
| 🔍 **Search & filter** | Find products by category or name |
| 📱 **Mobile-first** | Touch-optimized, PWA-ready |
| 🎨 **Premium aesthetic** | Dark theme, cyberpunk vibes |
| ♿ **WCAG 2.1 AA** | Accessible out of the box |
| ⚡ **Fast load** | Vite + code splitting |

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19 • TypeScript • Vite |
| Styling | Tailwind CSS • Framer Motion |
| State | Zustand |
| Forms | React Hook Form • Zod |
| Routing | React Router v7 |
| Testing | Vitest + RTL (63+ tests) |
| Deploy | Vercel |

---

## 🚀 Quick Start

```bash
# Clone
git clone https://github.com/FahadIbrahim93/RollON-MVP-Final-V1.git
cd RollON-MVP-Final-V1/rollon-app

# Install
npm install

# Run
npm run dev

# Test
npm test -- --run
```

Open http://localhost:5173 to browse.

---

## 📁 Project Structure

```
rollon-app/
├── src/
│   ├── components/
│   │   ├── layout/    # Navbar, Footer, ProtectedRoute
│   │   ├── shop/      # ProductCard, ProductGrid
│   │   └── ui/        # Reusable UI components
│   ├── pages/         # Home, Shop, Cart, Checkout
│   ├── hooks/        # Custom hooks
│   ├── store/        # Zustand stores (cart, user)
│   └── lib/          # Utils, types
└── public/           # Static assets
```

---

## 🏗️ Key Technical Decisions

1. **Zustand for cart** — simpler than Redux, less boilerplate than Context
2. **Zod validation** — type-safe forms at runtime
3. **Component-first** — each product card is self-contained
4. **SPA ready** — vercel.json configured with rewrites

---

## 📊 Quality Metrics

| Gate | Status |
|------|--------|
| Lint | ✅ Pass |
| Tests | ✅ 63+ Passing |
| Build | ✅ Pass |
| Accessibility | ✅ WCAG 2.1 AA |
| Bundle | Optimized |

---

## 📦 Products (Demo)

| Product | Category | Price |
|---------|----------|-------|
| Conical Flask | Smoking | $45 |
| Gravity Bong | Smoking | $120 |
| Rolling Tray | Accessories | $25 |

---

## 📫 Connect

- 🐦 Twitter: [@hopetheory__](https://x.com/hopetheory__)
- 📧 Email: hopetheorybd@gmail.com
- 🌐 Live: [rollon-delta.vercel.app](https://rollon-delta.vercel.app)

---

*Built with 🔥 by [Hope Theory](https://github.com/FahadIbrahim93)*