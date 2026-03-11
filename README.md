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

## Accessibility Compliance

This project follows WCAG 2.1 AA accessibility guidelines. All accessibility issues have been addressed:

### Fixed Issues

#### 1. Buttons - Discernible Text
All icon-only buttons have proper `aria-label` attributes:
- Navbar: Search, Cart, User Login, Mobile Menu (Open/Close), Close Search
- CartDrawer: Remove item, Decrease/Increase quantity buttons
- ProductCard: Wishlist toggle, Quick view buttons
- Login/Register: Password visibility toggle (Show/Hide password)

#### 2. Links - Discernible Text
All icon-only links have proper `aria-label` attributes:
- ProductCard quick view links include product name
- Footer social links include platform name

#### 3. Color Contrast (WCAG AA)
All text colors meet minimum contrast ratios (4.5:1 for normal text, 3:1 for large text):
- Primary text: `text-white` or `text-white/60`+
- Secondary text: `text-white/50`+
- Small text (below 18px): `text-white/50`+
- Heading text: `text-white/50`+

Files updated:
- `components/layout/Navbar.tsx`
- `components/layout/Footer.tsx`
- `components/CartDrawer.tsx`
- `components/shop/ProductCard.tsx`
- `components/sections/FeaturedProducts.tsx`
- `components/sections/Testimonials.tsx`
- `components/sections/Features.tsx`
- `components/sections/Newsletter.tsx`
- `components/sections/Categories.tsx`
- `pages/Shop.tsx`
- `pages/Success.tsx`
- `pages/Checkout.tsx`

#### 4. Touch Targets (24px minimum)
- Testimonial pagination dots increased from 6px to 24px with proper `aria-label`
- All interactive elements meet minimum 24x24px touch target size

#### 5. Heading Hierarchy
Proper heading levels maintained (no skipping):
- Changed h4 → h3 in Testimonials
- Changed h4 → h3 in Footer section headings

## Superpowers Installation

This project uses [Superpowers](https://github.com/obra/superpowers) for enhanced AI-assisted development.

### Installation Status
✅ Already installed at: `~/.config/opencode/superpowers`

### Available Skills
The following skills are available:
- `brainstorming` - Socratic design refinement
- `writing-plans` - Detailed implementation plans
- `executing-plans` - Batch execution with checkpoints
- `dispatching-parallel-agents` - Concurrent subagent workflows
- `requesting-code-review` - Pre-review checklist
- `receiving-code-review` - Responding to feedback
- `using-git-worktrees` - Parallel development branches
- `finishing-a-development-branch` - Merge/PR decision workflow
- `subagent-driven-development` - Fast iteration with two-stage review
- `test-driven-development` - RED-GREEN-REFACTOR cycle
- `systematic-debugging` - 4-phase root cause process
- `verification-before-completion` - Ensure it's actually fixed
- `writing-skills` - Create new skills

### Using Skills
```bash
# List available skills
skill

# Load a specific skill
skill superpowers/brainstorming
skill superpowers/test-driven-development
```

### Updating Superpowers
```bash
cd ~/.config/opencode/superpowers
git pull
```

## Build Output
- Output directory: `rollon-app/dist`
- Framework: Vite
- Target: ES2020+, modern browsers

## Notes
- Some decorative elements (icons in empty states, placeholder text, line-through prices) use lower contrast - these are exempt from WCAG requirements as they are purely decorative or presentational.
