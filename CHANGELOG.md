# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Config-driven template system (`rollon-app/src/lib/config.ts`)
- SEO meta tag management hook (`rollon-app/src/lib/seo.tsx`)
- Environment variable validation at startup
- Content Security Policy headers in Vercel deployment
- `sitemap.xml` for search engine discovery
- Service worker (`sw.js`) with offline caching
- Unit tests for utils, cart store, wishlist store, checkout schema, database store, auth store, shop helpers, and the API client (106 tests, ~87% coverage)
- Playwright E2E suite: 17 tests covering storeflow, search, cart, checkout, 404, and accessibility
- **Reference API server** (`server/`) — zero-dependency Node implementation of `docs/API.md` (products, orders, auth with PBKDF2, customers, payment methods) with 23 integration tests
- **Accessibility audit** — automated axe-core WCAG 2.1 AA scan across 6 key pages; 5 real violations fixed (icon-button labels, sort select name, product link names, contrast)
- `docs/API.md` — backend API contract for products, orders, customers, and auth
- GitHub issue templates (bug report, feature request, question)
- E2E + reference-API jobs in CI workflow
- `VITE_USE_REMOTE_API` documented in `.env.example`; `dev:remote`/`test:e2e:remote` scripts
- README badges for CI status, test count, and coverage
- Dependency audit: Vite upgraded to patched 7.3.x, react-router-dom to 7.18.2, @axe-core/playwright added

### Changed
- Removed admin dashboard routes and components
- Fixed API client remote-path bug: `getBySlug`/`getById`/orders/customers now unwrap bare-array responses (previously returned arrays, crashing product detail in remote mode)
- Defensive guard on ProductDetail SEO description
- Removed mock data files (orders, customers)
- Cleaned up project structure for template reuse
- Fixed broken `Authorization` headers in API client and auth store
- Gated local fake-auth fallback to development only
- Removed non-functional social login and dummy UI elements
- Contact and newsletter forms now deliver via WhatsApp
- Made `SITE_URL` configurable via `VITE_SITE_URL` (defaults to live demo URL)
- Fixed ghost image references and missing `--primary-rgb` CSS variable
- Wired product wishlist/share buttons and order print/share to real handlers
- Documented known advisory status in `SECURITY.md`

### Removed
- `marjahans-app/` — unrelated project
- `api/` — serverless functions
- `scripts/` — dev utilities
- Dead `ProductCategory` and `Address` types
- Fabricated marketing stats from About/Account pages

## [1.0.0-beta.1] — 2026-03-16

### Added
- Complete e-commerce storefront with product catalog
- Shopping cart with persistent Zustand state
- Checkout flow with Zod validation
- Dark theme with Tailwind CSS v4
- Responsive design for all screen sizes
- Framer Motion animations and transitions
- React Query for data fetching
- Playwright E2E tests
- Vitest unit tests with coverage
- GitHub Actions CI/CD pipeline
- CodeQL security scanning
- PWA support with web manifest

### Features
- Product filtering and search
- Category-based navigation
- Order confirmation flow
- User authentication (demo mode)
- Newsletter signup
- Testimonials section
- Contact form

### Tech Stack
- React 19 + TypeScript
- Vite 7 build tool
- Tailwind CSS v4
- Zustand 5 state management
- React Router v7
- Radix UI primitives
- Framer Motion 12