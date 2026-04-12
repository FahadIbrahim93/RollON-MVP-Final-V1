# RollON Release Checklist

## Pre-Release Quality Gates

- [ ] `npm run lint` passes (0 errors)
- [ ] `npm test -- --run` passes (all tests)
- [ ] `npm run build` passes
- [ ] `npm run test:coverage` meets threshold (75%)
- [ ] Playwright E2E tests pass (`npx playwright test`)
- [ ] No console errors in browser

## Visual Checkpoints

- [ ] Homepage loads correctly
- [ ] Shop page loads with products
- [ ] Product detail page works
- [ ] Add to cart works
- [ ] Cart drawer opens
- [ ] Checkout flow works (test order)
- [ ] Login/Register work
- [ ] Admin dashboard accessible

## Accessibility

- [ ] Lighthouse A11Y ≥ 90
- [ ] No contrast violations
- [ ] All interactive elements keyboard accessible

## Performance

- [ ] Lighthouse Performance ≥ 90
- [ ] Bundle size acceptable (< 500KB gzipped)
- [ ] Admin chunk lazy loads

## Security

- [ ] No secrets in code
- [ ] Auth working (demo OK for MVP)
- [ ] No XSS vulnerabilities

## Deployment

- [ ] Vercel preview deploys
- [ ] All routes work (/, /shop, /cart, etc.)
- [ ] SPA redirects working (vercel.json)

## Post-Deploy

- [ ] Monitor Sentry for errors
- [ ] Check analytics
- [ ] Test checkout flow end-to-end

## Rollback Plan

If issues:
```bash
git revert HEAD
git push --force
```
Watch Vercel deployment rollback.

---
Last Updated: 2026-04-12