# ROLLON APP ROADMAP
**Date:** 2026-03-11

## Phase 1: Foundation (P0 Fixes)
**Focus:** Stability, Security, Build Completion
**Duration:** Week 1

1. **Remove Hardcoded Secrets:** Migrate `demoUsers` out of `authStore.ts` to environment variables. (Assigned: Security Agent)
2. **State Management Migration:** Fully excise `CartContext.tsx` in favor of `cartStore.ts`. (Assigned: Architect Agent)
3. **TS Compilation Fixes:** Align all interfaces (especially `CartItem` and `Order`) globally across `src/types.ts`. (Assigned: Execution Agent)
4. **Environment Setup:** Create comprehensive `.env` strategy for API endpoints, currency, and feature flags. (Assigned: Architect Agent)

## Phase 2: Core Features
**Focus:** Functional Parity, Data Flow, Authentication
**Duration:** Week 2 - 3

5. **API Service Layer:** Replace inline mock data with actual React Query-backed data fetching via `lib/api.ts`. (Assigned: Execution Agent)
6. **Authentication Realization:** Implement JWT-based auth via backend integration for the Admin Dashboard. (Assigned: Security Agent)
7. **Virtualization & Pagination:** Enhance product arrays (e.g., in `Checkout.tsx`, `AdminProducts.tsx`) with paginated loading or infinite scroll to prevent DOM bloat. (Assigned: Execution Agent)

## Phase 3: Polish & Testing
**Focus:** UX Integrity, Error Resilience, Edge Cases
**Duration:** Week 4

8. **Comprehensive Test Suite:** Elevate test coverage from <5% to >80%. Implement Playwright for critical E2E flows (Checkout, Login). (Assigned: QA Agent)
9. **UI Verbosity Cleanup:** Refactor obscure terms in Checkout (e.g., "Neural Code") into user-friendly standard descriptors ("Postal Code"). (Assigned: Execution Agent)
10. **Aesthetic Consistency Check:** Ensure dark mode with neon accents standard is strictly adhered to across all pages. (Assigned: Execution Agent)

## Phase 4: Production Readiness
**Focus:** Compliance, SEO, CI/CD, Deployment
**Duration:** Week 5

11. **Accessibility (a11y):** Apply ARIA labels, semantic HTML, and contrast validations. (Assigned: QA Agent)
12. **Analytics & SEO:** Integrate meta tags, OpenGraph data, and event tracking (e.g., Google Analytics). (Assigned: Security / Architect Agent)
13. **CI/CD Pipeline:** Deploy automated GitHub Action workflows for formatting, linting, TS compilation, and testing. (Assigned: DevOps / Architect Agent)
14. **Final Security Audit:** Rate limiting, CORS, and Headers verification. (Assigned: Security Agent)
