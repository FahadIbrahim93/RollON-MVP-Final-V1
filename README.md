# RollON MVP Final V1

Canonical repository for the **RollON e-commerce storefront + admin dashboard**.

## Source of Truth
- Application code lives in: `rollon-app/`
- Legacy/foreign project artifacts were removed from this branch to keep scope strictly RollON.

## Local Development
```bash
cd rollon-app
npm ci
npm run dev
```

## Quality Gates
```bash
cd rollon-app
npm run lint
npm test -- --run
npm run build
```

## Vercel Deployment
This repository is configured to deploy `rollon-app` from the root project via `vercel.json`.

Required env vars (see `rollon-app/.env.example`):
- `VITE_API_URL`
- `VITE_ENABLE_DEMO_AUTH` (recommended `false` in production)
- optional analytics/payment vars
