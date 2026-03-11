# RollON App

RollON storefront/admin SPA built with React 19 + TypeScript + Vite.

## Stack
- React 19
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- React Router v7

## Run Locally
```bash
npm ci
npm run dev
```

## Quality Gates
```bash
npm run lint
npm test -- --run
npm run build
```

## Scripts
- `npm run dev` — start Vite dev server
- `npm run lint` — run ESLint
- `npm test -- --run` — run Vitest once
- `npm run build` — type-check and production build
- `npm run preview` — preview production build

## Accessibility Rules (WCAG 2.1 AA)
- Every icon-only button/link must include an `aria-label`.
- Maintain minimum 24x24px touch targets.
- Keep heading order semantic.
- Ensure accessible text contrast.

## Deployment
The parent repository deploys this app through root `vercel.json`:
- Build: `cd rollon-app && npm run build`
- Output: `rollon-app/dist`
- SPA rewrites enabled for React Router routes.

