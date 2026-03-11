# RollON MVP Final V1

Canonical repository for the **RollON e-commerce storefront + admin dashboard**.

## Repository Scope & Integrity
- Active application code lives in: `rollon-app/`
- Legacy duplicate source trees have been removed from the repository root to prevent drift and accidental edits outside the production app.
- No `grok`, `creative studio`, or `circuit` app artifacts were found in tracked files during this audit.

## Git History Audit (Local Repository)
A full local git audit was performed for:
- all local branches (`git branch -a`)
- recent commit history (`git log --oneline --decorate --graph --all`)
- merged PR commits visible in git history (`Merge pull request #...` entries)

Current local history shows the repo is focused on RollON work, with prior cleanup and accessibility hardening already merged.

## Local Development
```bash
cd rollon-app
npm ci
npm run dev
```

## Required Quality Gates
```bash
cd rollon-app
npm run lint
npm test -- --run
npm run build
```

## Vercel Deployment
Deployment is configured through `vercel.json` in repo root:
- Build command: `cd rollon-app && npm run build`
- Output directory: `rollon-app/dist`
- SPA rewrites are enabled for React Router route refresh support.

## Accessibility Baseline
This project follows WCAG 2.1 AA requirements:
- icon-only buttons/links must have `aria-label`
- minimum touch target size 24x24px
- minimum text contrast ratio 4.5:1 (normal text)
- semantic heading hierarchy (no skipped heading levels)

## Environment Variables
See `rollon-app/.env.example` for required runtime configuration.

