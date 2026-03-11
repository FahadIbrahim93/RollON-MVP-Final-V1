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
npm run build   # TypeScript + Vite
```

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
