# CODE STANDARDS
**Project:** RollON App
**Date:** 2026-03-11

## 1. Naming Conventions
- **Components:** `PascalCase` (e.g., `ProductCard.tsx`)
- **Functions/Methods:** `camelCase` (e.g., `calculateTotal()`)
- **Constants:** `UPPER_SNAKE_CASE` (e.g., `MAX_ORDER_ITEMS` -> wait, global constants only)
- **Interfaces/Types:** `PascalCase` (e.g., `CartItem`)
- **Hooks:** Prefix with `use` (e.g., `useAuthStore`)
- **Event Handlers:** Prefix with `handle` (e.g., `handleAddToCart`)

## 2. Component Patterns
- **Directory Structure:** Colocate tests, stories, and internal components if a component gets complex (e.g., `src/components/checkout/`).
- **Exporting:** Use named exports globally. Default exports are only permitted for lazy-loaded pages (e.g., `export default App;`).
- **Styling:** Use Tailwind CSS exclusively. No inline `style={{}}` unless dynamically calculating dimensions. Merge classes using `cn()` from `lib/utils` (tails-merge integration).

## 3. Error Handling Philosophy
- **Component Level:** Use `<ErrorBoundary />` at critical junctures (app root, page routes).
- **Network Level:** Handle network errors using TanStack Query's `onError` callbacks. Flash a toast notification using `sonner` for user-facing errors.
- **Fail Gracefully:** Never crash the app due to a missing optional field (e.g., use optional chaining `item?.price`).

## 4. Testing Requirements (≥80% Coverage)
- **Unit Tests:** All utilities, store reducers (`cartStore.ts`), and complex independent hooks must have a corresponding `.test.ts`. Use Vitest.
- **Component Tests:** Test critical logic paths with React Testing Library (RTL).
- **E2E Tests:** Implement Playwright tests for primary user journeys (Cart -> Checkout -> Success).
- **Coverage Check:** A PR is strictly blocked if coverage on modified lines is below 80%.

## 5. Security Checklist
- **[ ] No Hardcoded Secrets:** No API keys, passwords, or tokens in source. Use `.env`.
- **[ ] Input Validation:** All forms MUST use Zod validation schemas.
- **[ ] Sanitization:** Use safe abstractions. Avoid `dangerouslySetInnerHTML` unless explicitly sanitized by DOMPurify.
- **[ ] Storage Constraints:** Do not store sensitive tokens or PII in `localStorage` without encryption. Rely on `HttpOnly` cookies for auth if available.

## 6. Performance Budgets
- **Lighthouse Scores:** Target 90+ across Performance, Accessibility, Best Practices, SEO.
- **Bundle Size:** Warn if main chunk exceeds 500KB. Route-based code splitting (via `React.lazy`) is mandatory for `/admin` vs `/customer` partitions.
- **Image Optimization:** Enforce `pwa-***.png` static caching. Standardize WebP usage. No rendering full-res image arrays simultaneously.
- **Virtualization:** All lists exceeding 50 elements must employ `virtuoso` or equivalents.
