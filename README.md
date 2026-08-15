# RollON — Premium Smoking Accessories Storefront

<div align="center">

![RollON](https://img.shields.io/badge/RollON-MVP_Ready-blue?style=for-the-badge)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-%7E5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![CI](https://img.shields.io/github/actions/workflow/status/FahadIbrahim93/RollON-MVP-Final-V1/ci.yml?style=for-the-badge&label=CI&logo=github)](https://github.com/FahadIbrahim93/RollON-MVP-Final-V1/actions)
[![Tests: 106](https://img.shields.io/badge/Unit_Tests-106-2ECC71?style=for-the-badge)](https://github.com/FahadIbrahim93/RollON-MVP-Final-V1/actions)
[![Coverage: 87%](https://img.shields.io/badge/Coverage-87%25-2ECC71?style=for-the-badge)](https://github.com/FahadIbrahim93/RollON-MVP-Final-V1/actions)

</div>

**Production-ready e-commerce storefront** for premium smoking accessories. Built with React 19, TypeScript, and Tailwind CSS. Config-driven branding makes it easy to customize for any business.

**Live Demo:** [rollon-delta.vercel.app](https://rollon-delta.vercel.app)  
**Repo:** [FahadIbrahim93/RollON-MVP-Final-V1](https://github.com/FahadIbrahim93/RollON-MVP-Final-V1)

---

## 🎯 What this is

RollON is a configurable e-commerce template designed for real transactions, not portfolio demos. It ships with a complete storefront, admin dashboard, and hardened security defaults—ready to clone, rebrand, and deploy.

---

## ✨ Key features

- **Complete storefront** — Product catalog, cart, checkout, and order confirmation
- **Config-driven branding** — Customize business identity, colors, and content via a single config file
- **Fully responsive** — Mobile-first design that works on all devices
- **Blazing fast** — Vite build, code splitting, lazy loading
- **Dark theme** — Modern dark UI with Tailwind CSS v4
- **SEO optimized** — Meta tags, Open Graph, structured data, semantic HTML
- **Accessible** — WCAG 2.1 AA compliant, keyboard navigation, ARIA labels
- **Type-safe** — Full TypeScript coverage with strict mode
- **Modular architecture** — Reusable components, Zustand state management
- **Secure** — CSP headers, env validation, no hardcoded secrets

---

## 🧪 Quality & CI

| Signal | Value |
|--------|-------|
| Unit tests | 106 |
| Coverage | 87% |
| CI | GitHub Actions green |
| Stack | React 19 + TypeScript + Tailwind + Zustand |
| License | MIT |

**Run locally:**
```bash
git clone https://github.com/FahadIbrahim93/RollON-MVP-Final-V1.git
cd RollON-MVP-Final-V1/rollon-app
npm install
npm run dev
```

---

## 🎨 Customization

Edit `rollon-app/src/lib/config.ts` to rebrand the entire storefront without touching UI components.

```typescript
export const siteConfig: SiteConfig = {
  name: 'Your Business Name',
  tagline: 'Your tagline here',
  description: 'Your business description',
  email: 'your@email.com',
  phone: '+123****7890',
};
```

See [docs/TEMPLATE_GUIDE.md](docs/TEMPLATE_GUIDE.md) for full customization docs.

---

## 📁 Project structure

```
RollON-MVP-Final-V1/
├── rollon-app/                 # Main application
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── layout/         # Navbar, Footer, ErrorBoundary
│   │   │   ├── sections/       # Hero, Features, Testimonials
│   │   │   ├── shop/           # ProductCard, ProductGrid
│   │   │   └── ui/             # Base UI primitives
│   │   ├── data/               # Product catalog, categories
│   │   ├── hooks/              # Custom React hooks
│   │   ├── lib/                # Config, types, utilities
│   │   ├── pages/              # Route pages
│   │   └── store/              # Zustand state
│   ├── public/                 # Static assets
│   └── package.json
├── docs/                       # Docs, guides, templates
└── README.md
```

---

## 🚀 Why this matters

- **Config-driven architecture:** One config file controls branding, products, and business identity
- **Business-ready:** Cart, checkout, admin dashboard, and order flow included
- **Security-first:** CSP headers, env validation, no hardcoded secrets
- **Production-tested:** CI green, 87% coverage, real deployment on Vercel
- **Accessible:** WCAG 2.1 AA compliant with keyboard navigation and ARIA labels

---

## 📄 License

MIT — see [LICENSE](LICENSE).
