# Kilo Task: Install Playwright and Create E2E Tests
**Project: RollON MVP**
**Task: Full implementation - install Playwright and create E2E tests**

## Steps

### 1. Install Playwright
Run:
```bash
cd rollon-app
npm init playwright@latest -- --yes --lang=TypeScript
npx playwright install chromium
```

### 2. Create E2E Test File
Create file: e2e/basic-flow.spec.ts

```typescript
import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await expect(page).toHaveTitle(/Roll/i);
});

test('shop page loads', async ({ page }) => {
  await page.goto('http://localhost:5173/shop');
  await expect(page.locator('h1')).toContainText(/collection/i);
});

test('product can be added to cart', async ({ page }) => {
  await page.goto('http://localhost:5173/shop');
  await page.locator('button:has-text("QUICK ADD")').first().click();
  // Should see cart count increase
});
```

### 3. Add Playwright Script to package.json
Add: "e2e": "playwright test"

## Execute all steps and verify tests pass.

## CRITICAL: You have edit permission. Create the files and run the commands.