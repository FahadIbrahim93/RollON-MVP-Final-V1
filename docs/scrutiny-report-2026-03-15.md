# Codebase Scrutiny Report (March 15, 2026)

## Overview
A comprehensive, detailed scrutiny of the RollON MVP codebase was conducted. The project has an excellent foundation, boasting a clean build, robust automated test suite (86 passing tests), and strong JWT HMAC verification. However, several "hallucinations" and demo fallbacks were discovered that prevent it from achieving a production-ready 10/10 standard.

**Overall Codebase Rating: 7.5 / 10**

## Critical Findings requiring immediate action:

### 1. Functional Hallucinations: Dummy "Search" Component
- **Location:** `src/components/layout/Navbar.tsx`
- **Issue:** The Search overlay has input state explicitly tracked (`searchQuery`), but it is not wrapped in a `<form>` and pressing exactly "Enter" or clicking a "Submit" button does absolutely nothing to initiate navigation.
- **Why it matters:** In an e-commerce platform, a broken search bar is one of the quickest ways to lose trust. It looks like a functioning feature but produces no routing effect.
- **Remediation:** Wire the component to route to `/shop?search={query}` using `useNavigate()`.

### 2. Missing/404 Ghost Assets
- **Location:** `src/data/products.ts` and `src/data/products_main.ts`
- **Issue:** Product data explicitly lists `image` URLs that completely lack corresponding assets in the `public/images/` folder.
- **Affected Items:** `ashtray-titanium.jpg`, `bong-plain-silicon.jpg`, `bong-donut-silicon.jpg`, `grinder-santa.jpg`, `papers-snoop.jpg` and more. 
- **Why it matters:** Results in ugly browser `HTTP 404 Not Found` broken image icons across the interface.
- **Remediation:** Provide the missing base assets or scrub these dummy products from the seed data.

### 3. "Demo Mode" Reliance and Silent Fallbacks
- **Location:** `src/lib/api.ts` & `src/store/authStore.ts`
- **Issue:** The API aggressively masks failures. If `fetch` falls short, `withFallback` gracefully returns offline mock arrays (`products.ts`). `authStore.ts` contains `VITE_ENABLE_DEMO_AUTH` to force-feed fake Admin/User JSON tokens. Furthermore, there are duplicate DB mocks (`products.ts` vs `products_main.ts`).
- **Why it matters:** Real business applications require transparent error handling. If an API is down, we must show a 5xx layout, not pretend it's working using offline mocks. Including "bypass" logic in client production code is an enormous security risk.
- **Remediation:** Consolidate mock databases into a single source. Implement strict staging vs production environment toggling where these bypasses and mock fallbacks are cleanly stripped out of the final build.

### 4. Zero Edge-Case Routing (No 404 Route)
- **Location:** `src/App.tsx`
- **Issue:** Unrecognized URLs simply render blank or fragmented UI. There is no fallback `*` path.
- **Why it matters:** Piss-poor SEO and terrible UX when users make typos in their address bar.
- **Remediation:** Implement a global `<Route path="*" element={<NotFound />} />`.

## Integration Guidelines for Future Agents
Going forward, agents assigned to this codebase are bound by the **Agent Golden Rules for Production** directly written into the `AGENTS.md` file.

**Do not attempt to fix these unilaterally unless assigned to a specific task block (T21 - T25) from the `agents-taskboard.md`.**
