# RollON — Enterprise-Grade E-commerce

A high-performance, accessible, and secure e-commerce storefront and admin ecosystem built for the modern web.

## 🚀 Key Features
- **Modern Tech Stack**: React 19, Vite 7, TypeScript 5.9.
- **Premium User Accounts**: Cinematic Account & Rewards dashboard with points and tier tracking.
- **Robust Auth Flow**: Seamless API integration with resilient local fallback and automatic customer provisioning.
- **Micro-Animations**: Fluid motion design powered by Framer Motion 12.
- **Atomic Architecture**: Optimized components for maximum performance and reusability.
- **Enterprise Security**: Upstash-backed serverless API and zero-trust data handling.
- **WCAG AA Compliance**: 100% accessible navigation, forms, and interactive interfaces.
- **Optimized Performance**: < 250kB main bundle through strategic manual chunking.

## 🛠️ Tech Stack
- **Core**: React 19 (SPA)
- **Styling**: Tailwind CSS 4 (Utility-first)
- **State**: Zustand 5 + React Query 5
- **Icons**: Lucide React
- **Validation**: Zod + React Hook Form
- **Routing**: React Router v7

## 📦 Getting Started
```bash
# Install dependencies
npm ci

# Launch development server
npm run dev

# Production Build
npm run build
```

## ✅ Quality Standards
We maintain a strict "Zero Warning" baseline:
- `npm run lint` — ESLint strict scrutiny (0 errors/0 warnings).
- `npm test -- --run` — 87/87 passing Vitest suite.
- `npm run build` — Verified build stability.

## ♿ Accessibility Compliance
This project adheres to **WCAG 2.1 Level AA** standards:
- Full keyboard navigation support.
- Screen-reader friendly (ARIA labels, roles, and live regions).
- Minimum 24px touch targets for mobile.
- High-contrast typography for legibility.

## 🌍 Deployment
Automated Vercel deployment via `vercel.json`:
- **Build**: `cd rollon-app && npm run build`
- **Output**: `rollon-app/dist`
- **SPA Rules**: Full React Router path resolution enabled.


