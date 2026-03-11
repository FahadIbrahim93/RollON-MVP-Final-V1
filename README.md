# RollON - Premium E-Commerce Storefront

A production-ready, enterprise-grade e-commerce storefront with admin dashboard built with React 19, TypeScript, Vite, and Tailwind CSS.

## 🚀 Live Deployment

**Production URL:** https://rollon-premium-smoking.vercel.app

## 📦 Tech Stack

- **Frontend:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS, Framer Motion
- **State Management:** Zustand
- **Forms:** React Hook Form + Zod
- **Routing:** React Router v7
- **Icons:** Lucide React
- **Testing:** Vitest + React Testing Library

## 🛠️ Local Development

```bash
cd rollon-app
npm ci
npm run dev
```

## ✅ Quality Gates

All PRs must pass these checks before merging:

```bash
cd rollon-app
npm run lint      # ESLint + TypeScript
npm test -- --run # 63+ tests
npm run build     # Production build
npm audit         # Security audit
```

## 🎯 Features

- 🛒 Full shopping cart with Zustand state management
- 🔐 Authentication (JWT simulation)
- 📝 Form validation with Zod
- 🎨 Premium dark theme UI
- ♿ WCAG 2.1 AA Accessible
- 📱 Responsive design
- ⚡ Fast loading with Vite
- 🔒 Security hardened

## 🌐 Deployment

Configured via `vercel.json`:
- Build: `cd rollon-app && npm run build`
- Output: `rollon-app/dist`
- SPA rewrites enabled for React Router

## 🔧 Environment Variables

See `rollon-app/.env.example`:

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend API URL |
| `VITE_SSLCOMMERZ_*` | Payment gateway (Bangladesh) |
| `VITE_BKASH_*` | bKash payment |
| `VITE_ENABLE_DEMO_AUTH` | Set `false` in production |

## 📁 Project Structure

```
rollon-app/
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── layout/    # Navbar, Footer, etc.
│   │   ├── sections/   # Hero, Features, etc.
│   │   ├── shop/      # ProductCard, etc.
│   │   ├── ui/        # shadcn/ui components
│   │   └── checkout/  # Checkout components
│   ├── pages/         # Route pages
│   ├── hooks/         # Custom hooks
│   ├── store/         # Zustand stores
│   └── lib/          # Utilities, schemas
├── public/            # Static assets
└── dist/              # Production build
```

## 🔐 Security

- No sensitive data in commits
- Environment variables for secrets
- Form validation with Zod
- Input sanitization
- 0 npm vulnerabilities

## ♿ Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation support
- Screen reader friendly
- Proper color contrast
- 24px minimum touch targets

---

**License:** Proprietary - All rights reserved
