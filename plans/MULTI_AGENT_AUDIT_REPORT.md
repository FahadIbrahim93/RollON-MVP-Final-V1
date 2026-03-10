# MULTI-STAGE AGENT AUDIT & REHABILITATION PLAN
**Project:** rollon-app & target_repo
**Objective:** Achieve verifiable 10/10 production readiness.
**Philosophy:** Zero slop, zero assumptions, zero stubs. ReAct-driven execution.
**Date:** 2026-03-10

---

## STAGE 1: PLAN & RESEARCH (Enhanced Audit + ReAct Planning)

**Agent:** Lead Audit Agent
**Mandate:** Meticulously analyze current state using all available tools. Generate factual audit with /10 ratings. Delegated research where necessary.

### 1.1 Factual Audit Foundation (Leverage Existing Report)
The provided `CODE_AUDIT_REPORT.md` serves as the baseline. Key findings to be validated and expanded:

| Dimension | Existing Score | Verification Status | Notes |
| :--- | :---: | :---: | :--- |
| Code Quality & Structure | 5 | [ ] Validate | Focus on duplicate state management. |
| Readability & Maintainability | 6 | [ ] Validate | Scrutinize verbose UI text, magic numbers. |
| Performance & Scalability | 6 | [ ] Validate | No pagination, virtualization, caching. |
| Security Best Practices | 3 | [ ] Validate | **CRITICAL**: Hardcoded credentials, XSS risk. |
| Test Coverage & Reliability | 2 | [ ] Validate | **CRITICAL**: <5% coverage. |
| Architecture & Modularity | 5 | [ ] Validate | Inconsistent arch, no API layer. |
| Compliance & Standards | 4 | [ ] Validate | No accessibility, SEO, PWA. |
| Team Collaboration | 5 | [ ] Validate | No commit convention, PR templates. |
| Business Alignment | 7 | [ ] Validate | Mock data, no real payments. |
| Dependencies & Tooling | 6 | [ ] Validate | Mixed Tailwind versions, unpinned deps. |

### 1.2 ReAct Research & Delegation
**Agent:** Lead Audit Agent (with sub-agents)

- **Tooling Deep Dive:**
  - Execute `npm audit` for vulnerability scan.
  - Run `npm ls` to check dependency tree and version conflicts.
  - Analyze bundle size: `npm run build -- --mode production` then inspect `assets/`.
  - Lint: `npm run lint`. Format: `npm run format` (if configured).
- **Sub-agent Delegation:**
  - **Security Sub-agent:** Investigate authStore hardcoded credentials. Propose secure auth flow (JWT, bcrypt). Research CSP headers.
  - **Testing Sub-agent:** Research Vitest + Playwright setup for target test coverage (>95%). Propose test structure.
  - **Performance Sub-agent:** Research React Query for data fetching. Implement pagination/virtualization strategy.
  - **Architecture Sub-agent:** Define service layer API. Unify type definitions (CartItem). Propose environment config structure.
  - **UX/UI Sub-agent:** Audit UI text for clarity. Recommend ARIA labels and accessibility improvements.

### 1.3 BEST POSSIBLE PLAN (Prioritized, Time-boxed)

**Phase 1: Security & Stability (Week 1)**
1.  **[Agent: Security Sub-agent]** Remove hardcoded credentials from `target_repo/src/store/authStore.ts`. Implement environment-based secrets. (High Impact, Low Effort)
2.  **[Agent: Lead Audit Agent]** Consolidate state management in `rollon-app`: Remove `CartContext.tsx`, migrate logic to `cartStore.ts`. (High Impact, Medium Effort)
3.  **[Agent: Lead Audit Agent]** Add environment variables for currency, API endpoints. Update hardcoded values. (Medium Impact, Low Effort)
4.  **[Agent: Testing Sub-agent]** Set up Vitest. Add tests for `cartStore`, `authStore`, and core `Checkout` flow. (High Impact, High Effort)

**Phase 2: Architecture & Performance (Week 2-3)**
5.  **[Agent: Architecture Sub-agent]** Create API service layer. Unify `CartItem` types. (Medium Impact, Medium Effort)
6.  **[Agent: Performance Sub-agent]** Implement pagination for product lists. (Medium Impact, Medium Effort)
7.  **[Agent: Performance Sub-agent]** Add React Query for data fetching & caching. Replace direct data imports. (Medium Impact, Medium Effort)
8.  **[Agent: Lead Audit Agent]** Break down large files (`Checkout.tsx`, `AdminDashboard.tsx`). (Low Impact, Medium Effort)

**Phase 3: Compliance & Polish (Week 4)**
9.  **[Agent: UX/UI Sub-agent]** Fix verbose UI text. Implement ARIA labels. (Medium Impact, Low Effort)
10. **[Agent: Architecture Sub-agent]** Implement proper authentication flow (JWT). (High Impact, High Effort)
11. **[Agent: Testing Sub-agent]** Achieve >95% test coverage with E2E tests using Playwright. (High Impact, High Effort)
12. **[Agent: Lead Audit Agent]** Set up CI/CD pipeline with security scanning (GitHub Actions). (Medium Impact, High Effort)

---

## STAGE 2: IMPLEMENT PLAN
**Agent:** Execution Agent
**Mandate:** Execute plan step-by-step using ReAct loops. Write real, functional code only. Commit logical units. Escalate blockers.

- Follow the prioritized list from Stage 1.
- For each task:
  - **Reason:** Confirm task objective and files involved.
  - **Act:** Use tools (`replace_in_file`, `write_to_file`, `execute_command`) to make changes.
  - **Observe:** Verify changes (e.g., `git diff`, `npm run build`, test run).
- Commit changes with clear messages (e.g., `feat(auth): remove hardcoded credentials`).

---

## STAGE 3: KEEP GOING (Autonomous Execution)
**Agent:** Continuation Agent
**Mandate:** Continue autonomously through remaining tasks. Parallelize where possible.

- Monitor progress against the Stage 1 plan.
- Use parallel sub-agents for independent tasks (e.g., one agent on tests, another on API layer).
- Summarize progress and blockers after each logical batch of work.

---

## STAGE 4: CODE QUALITY PASS (Multi-Pass Refactor)
**Agent:** Refinement Agent
**Mandate:** Cross-reference audit ratings. Make code compact, clean, idiomatic. Run automated checks.

- Run linters, formatters, type checkers.
- Address code smells identified in initial audit.
- Show diffs for major refactorings.
- Re-rate affected audit dimensions.

---

## STAGE 5: THOROUGH TESTING (Agent-Driven)
**Agent:** QA Agent
**Mandate:** Expand beyond happy path. Run real integration, boundary, load, security tests.

- Execute all tests. Target >95% coverage.
- Perform manual spot-checks of critical user flows.
- Use tools for security scanning (e.g., `npm audit`, custom scripts).
- Verify error handling and edge cases.

---

## STAGE 6: LARP ASSESSMENT + SELF-REFLECTION (Critical Stage)
**Agent:** Lead Audit Agent
**Mandate:** Critically evaluate code for "real vs. performative."

**Reflection Prompt:** "What assumptions did I make? What evidence proves this works? Are there any stubs, fakes, or silent failures?"
- Report findings honestly.
- **Immediately fix** critical issues (most critical first).
- Re-run tests. Re-rate audit dimensions.

---

## STAGE 7: CLEAN UP SLOP
**Agent:** Housekeeping Agent
**Mandate:** Remove all AI cruft. Keep only value-adding elements.

- Remove unnecessary abstractions, verbose comments, defensive code for impossible cases.
- Use automated slop detectors if available.
- Final lint and format pass.

---

## STAGE 8: PRODUCTION READINESS VALIDATION
**Agent:** Deployment Agent
**Mandate:** Full checklist with **demonstrated evidence**.

- [ ] All tests pass (show command output).
- [ ] Error handling & logging in place (inspect components).
- [ ] Externalized config, no secrets (check `.env.example`).
- [ ] Performance benchmarks met (show Lighthouse/Bundlebot score).
- [ ] Security scan clean (show `npm audit` output).
- [ ] Accessibility compliant (show axe-core report).
- [ ] Pinned dependencies (show `npm ls`).
- [ ] Rollback & monitoring plan documented.

---

## STAGE 9: REVIEW LAST TASK + META-REFLECTION
**Agent:** Lead Audit Agent
**Mandate:** Final verification and critique.

**Verify:**
- Does it actually work? (Test key flows manually).
- Solve the original goal? (Compare against business requirements).
- Any risks? (Document final risks).
- Document assumptions. Create final TODOs.

**Self-Critique:** "What would make this 10/10? What did I miss?"

---

## STAGE 0: FIX ALL REMAINING ISSUES + DEPLOY & EVOLVE
**Agent:** Final Deployment Agent
**Mandate:** List every open issue from previous stages. Prioritize by impact. Fix completely. Re-test after each. Plan for deployment.