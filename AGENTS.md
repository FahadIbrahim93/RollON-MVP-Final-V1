# RollON Development Guidelines

## Project Overview
- **Repository**: RollON e-commerce storefront + admin dashboard
- **Tech Stack**: React 19, TypeScript, Vite, Tailwind CSS, Framer Motion
- **Framework**: React Router v7 for SPA routing

## Development Workflow

### Local Development
```bash
cd rollon-app
npm ci
npm run dev
```

### Quality Gates (Required before commit)
```bash
npm run lint     # ESLint
npm test -- --run  # Vitest
npm run test:coverage  # Vitest with coverage
npm run build   # TypeScript + Vite
```

## Test Coverage
Run `npm run test:coverage` to generate coverage reports. The project uses `@vitest/coverage-v8` provider.

## Current Status (March 16, 2026)
- **Version**: 1.0.0-beta.1
- **Tests**: 141 passing
- **Lint**: 0 errors
- **Build**: Passing

## Accessibility Requirements

All code changes must comply with WCAG 2.1 AA standards:

### 1. Buttons
- All icon-only buttons MUST have `aria-label`
- Example: `<button aria-label="Open search"><SearchIcon /></button>`

### 2. Links
- All icon-only links MUST have `aria-label` 
- Product links should include product name: `aria-label="View {product.name} details"`

### 3. Color Contrast
- Minimum contrast ratio: 4.5:1 for normal text, 3:1 for large text
- Safe values: `text-white`, `text-white/60`+, `text-white/50`+ (for smaller text)
- Avoid: `text-white/40`, `text-white/20` (except decorative elements)

### 4. Touch Targets
- Minimum size: 24x24px
- Pagination dots must be in a 24px touch target container

### 5. Heading Hierarchy
- Never skip heading levels (e.g., h1 → h3 without h2)
- Use semantic heading structure

## Vercel Deployment

### Configuration
- `vercel.json` in root handles deployment
- Build: `cd rollon-app && npm run build`
- Output: `rollon-app/dist`
- **IMPORTANT**: Always include SPA rewrites for React Router:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Common Vercel Errors
- **404 on refresh/subpage**: Missing rewrites in vercel.json
- **Module not found**: Ensure `npm ci` runs before build

## Code Style

## Agent Code of Conduct & Anti-Hallucination Guardrails
To prevent regressions, broken mock features, and code duplication, ALL AGENTS MUST adhere to these strict rules:

### 1. No "Dummy" UIs
- NEVER implement a UI element that looks functional but does not work (e.g., an input field without an `onSubmit` or `onChange` handler).
- If building out a form or search bar, it MUST be fully wired up (e.g., routing to `/shop?search=query`).
- If you build a button, it MUST have an `onClick` or function as a proper `<Link>`.

### 2. No Ghost Assets (404 Prevention)
- Do NOT reference images or assets in code (e.g., `src/data/products.ts`) that do not exist in the repository (`public/images/`).
- Always check the `public/images` directory before hardcoding image paths.

### 3. Kill Prototype/Mock Crutches Promptly
- Mock data files (`products.ts`) and "fake auth" fallbacks (`VITE_ENABLE_DEMO_AUTH`) are for early prototyping ONLY.
- When shifting to a production mindset, these fallback mechanisms MUST be removed or explicitly disabled. Do not leave "silent failures" that show mock data when the real API drops. 
- DUPLICATE DATA IS BANNED: Never create redundant files like `products_main.ts` when `products.ts` exists. Update the single source of truth.

### 4. Catch-All Routing
- SPAs must always handle unknown routes proactively. Ensure `App.tsx` has a fallback `*` route pointing to a styled `404 Not Found` page.


### Component Structure
```tsx
// Imports
import { useState } from 'react';
import { Link } from 'react-router-dom';

// Types
interface Props {
  title: string;
}

// Component
export function Component({ title }: Props) {
  // Hooks first
  const [state, setState] = useState(false);
  
  // Handlers
  const handleClick = () => {};
  
  // Render
  return (
    <div>
      <button aria-label="Action description">Action</button>
    </div>
  );
}
```

### Accessibility Checklist
- [ ] All buttons have discernible text or aria-label
- [ ] All links have discernible text or aria-label
- [ ] Color contrast meets WCAG AA (run axe-core or lighthouse)
- [ ] Touch targets are minimum 24px
- [ ] Heading levels don't skip

## Branch Protection (Important!)

### Setting Up Branch Protection

1. Go to: https://github.com/FahadIbrahim93/RollON-MVP-Final-V1/settings/branches
2. Click "Add branch protection rule"
3. Set "Branch name pattern" to: `main`
4. Configure these settings:
   - ✅ "Require pull request reviews before merging" (1 approval)
   - ✅ "Require status checks to pass before merging"
   - ✅ "Require branches to be up to date before merging"
   - ✅ "Include administrators"
   - ❌ Uncheck "Allow force pushes"
   - ❌ Uncheck "Allow deletions"

### Why This Matters
- Prevents direct pushes to main
- Ensures all changes go through PR reviews
- Keeps history clean

## Using Skills

This project uses [Superpowers](https://github.com/obra/superpowers) for AI-assisted development.

### Available Skills
- `brainstorming` - Socratic design refinement
- `writing-plans` - Detailed implementation plans
- `test-driven-development` - RED-GREEN-REFACTOR cycle
- `systematic-debugging` - 4-phase root cause process
- `requesting-code-review` - Pre-review checklist

### Using Skills
```bash
skill superpowers/brainstorming
skill superpowers/test-driven-development
```

## File Organization
```
rollon-app/
├── src/
│   ├── components/
│   │   ├── layout/    # Navbar, Footer, ProtectedRoute
│   │   ├── sections/  # Hero, Features, Testimonials
│   │   ├── shop/     # ProductCard
│   │   └── ui/       # shadcn/ui components
│   ├── pages/        # Route components
│   ├── hooks/        # Custom hooks
│   ├── store/        # Zustand stores
│   └── lib/          # Utilities
├── public/           # Static assets
└── dist/             # Build output
```
