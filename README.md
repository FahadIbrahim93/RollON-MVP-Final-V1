# RollON-MVP-Final-V1 🛒

**E-commerce storefront: catalog, cart, checkout, and admin dashboard.**  React 19 + TypeScript + Tailwind + Zustand.

- **Live:** https://rollon-delta.vercel.app  
- **Repo:** [FahadIbrahim93/RollON-MVP-Final-V1](https://github.com/FahadIbrahim93/RollON-MVP-Final-V1)  
- **Stack:** React 19 · TypeScript · Tailwind · Zustand · Playwright  


<div align="center">

![RollON](https://img.shields.io/badge/RollON-MVP_Ready-blue?style=for-the-badge)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-%7E5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)


</div>

---

## What it is

RollON is an e-commerce storefront template with a product catalog, shopping cart, checkout flow, and admin dashboard. It is a template for building a store, not a live transactional site — the demo flows (cart, checkout) are not connected to a real payment provider, so no real transactions occur.

- **Complete storefront** — Product catalog, cart, checkout, and order confirmation
- **Config-driven branding** — Customize business identity, colors, and content via a single config file
- **Fully responsive** — Mobile-first design that works on all devices
- **Blazing fast** — Vite build, code splitting, lazy loading
- **Dark theme** — Modern dark UI with Tailwind CSS v4
- **SEO optimized** — Meta tags, Open Graph, structured data, semantic HTML
- **Type-safe** — TypeScript with strict mode
- **Modular architecture** — Reusable components, Zustand state management
- **Secure** — CSP headers, env validation, no hardcoded secrets

---

## Tech highlights

| Area | Implementation |
|---|---|
| **Frontend** | React 19, TypeScript strict mode, Tailwind CSS 4, Vite |
| **State** | Zustand for cart, auth, and UI state |
| **Routing** | React Router with protected admin routes |
|| **Testing** | Vitest unit tests + Playwright E2E tests |
|| **CI/CD** | GitHub Actions, Vercel deploy |
|| **Config-driven** | Centralized config for branding, features, deployment targets |

---


---

## Getting started

```bash
git clone https://github.com/FahadIbrahim93/RollON-MVP-Final-V1.git
cd RollON-MVP-Final-V1/rollon-app
npm install
npm run dev
```

```bash
npm run typecheck          # TypeScript check
npm run lint               # ESLint
npm test                   # Unit tests
npm run test:e2e           # Playwright E2E
npm run ci                 # Full pipeline
```

---

## Architecture

- **Components** — Reusable UI primitives with Tailwind
- **Pages** — Route-based pages for shop, cart, checkout, admin
- **Stores** — Zustand stores for cart, auth, products
- **Config** — Centralized config for branding, features, deployment targets
- **E2E** — Playwright tests for critical user flows

---

## What this repo shows

1. **Storefront template** — Catalog, cart, checkout, and admin in one codebase
2. **Config-driven** — Easy to rebrand and deploy for different clients
3. **Type-safe** — Full TypeScript coverage with strict mode
4. **Demo flows** — Cart and checkout flows are demonstrated end to end; no real payment provider is connected, so no real transactions occur

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for setup and PR guidelines.  
See [AGENTS.md](./AGENTS.md) for AI coding standards and architecture rules.
