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

### Changed
- Removed admin dashboard routes and components
- Removed mock data files (orders, customers)
- Cleaned up project structure for template reuse

### Removed
- `marjahans-app/` — unrelated project
- `api/` — serverless functions
- `scripts/` — dev utilities
- Test files from `store/__tests__/`

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