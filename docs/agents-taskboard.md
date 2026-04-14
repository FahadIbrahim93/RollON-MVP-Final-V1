# RollON AI Engineering Operating System (v2)

**Purpose:** This is the canonical execution system for all AI coders working in this repository.  
**Non-negotiable target:** 10/10 across quality, reliability, security, accessibility, and delivery discipline.

---

## 1) North-Star Quality Bar (Definition of 10/10)

A task is **not done** unless all are true:

1. Lint passes (`npm run lint`) with zero errors.
2. Tests pass (`npm test -- --run`) with no flaky behavior.
3. Coverage passes (`npm run test:coverage`) and risk-critical modules are explicitly tested.
4. Build passes (`npm run build`) with no warnings that imply runtime risk.
5. Accessibility checks applied (WCAG 2.1 AA semantics + contrast + touch target rules).
6. Security checks applied (no secret leaks, safe error behavior, input validation on boundaries).
7. Docs/taskboard/issues updated with evidence commands and timestamps.

---

## 2) Mandatory Delivery Workflow (for every change)

### Stage A — Discover (Evidence-first)
- Inspect scope before coding: affected routes, stores, APIs, tests, and docs.
- Record assumptions and unknowns in the taskboard.
- If data is missing, explicitly mark as blocked (never hallucinate).

### Stage B — Design (Smallest safe change)
- Write a minimal plan with acceptance criteria.
- Identify failure modes and rollback path.
- Define required test additions before implementation.

### Stage C — Implement (No fake behavior)
- Build only real, functional paths.
- No dummy controls, no placeholder handlers, no silent failure fallbacks.
- Keep changes small and atomic.

### Stage D — Verify (Hard gates)
Run in this order:
1. `npm run lint`
2. `npm test -- --run`
3. `npm run test:coverage`
4. `npm run build`

If any step fails, task remains **In Progress**.

### Stage E — Closeout (Traceability)
- Update issue state, root cause, and resolution.
- Log evidence command(s), result, and timestamp.
- Add follow-up tasks if debt remains.

---

## 3) Multi-Agent Role Model (when parallelism helps)

| Role | Responsibility | Output |
|---|---|---|
| Architect Agent | Defines constraints, module boundaries, and acceptance criteria | Plan + risks |
| Implementation Agent | Executes minimal, functional code changes | Diff + rationale |
| QA Agent | Expands test matrix (happy, edge, failure paths) | Test updates + pass/fail evidence |
| Security Agent | Reviews input validation, auth, data exposure, dependencies | Security findings |
| Performance Agent | Evaluates bundle/runtime impact and budgets | Perf report + thresholds |
| Release Agent | Ensures docs, changelog, rollback notes are complete | Release checklist |

**Rule:** One agent owns final merge accountability and cannot skip failed gates.

---

## 4) Taskboard (Single Source of Truth)

| ID | Priority | Task | Owner | Status | Exit Criteria |
|---|---|---|---|---|---|
| SYS-01 | P0 | Enforce deterministic test scope (exclude non-app tests) | QA Agent | Done | Vitest runs only app tests |
| SYS-02 | P0 | Remove/guard silent remote→mock fallback on critical paths | Architect + Impl | Planned | Explicit degraded-mode policy |
| SYS-03 | P0 | Raise risk-critical coverage (`api.ts`, auth/order flows) to ≥95% branch on critical paths | QA Agent | Planned | Added branch/failure tests + report |
| SYS-04 | P1 | Add CI a11y budget checks (axe/Lighthouse) with fail thresholds | QA Agent | Planned | CI fails on regressions |
| SYS-05 | P1 | Add deterministic security scan stack (npm audit + OSV/Dependabot) | Security Agent | Planned | Machine-readable reports archived |
| SYS-06 | P1 | Add bundle budget enforcement per route/chunk | Performance Agent | Planned | CI budget gate active |
| SYS-07 | P1 | Split API transport/domain orchestration concerns | Architect + Impl | Planned | Adapter/service separation complete |
| SYS-08 | P2 | Author rollback + incident response runbook with drill evidence | Release Agent | Planned | Drill logs + rollback steps validated |
| SYS-09 | P2 | Standardize commit/PR template for AI contributors | Release Agent | Planned | Template adopted in repo |

---

## 5) Issue Register (Active)

### P0 (Must fix before claiming production excellence)
1. **IR-001: Silent API fallback hides real outages**  
   - Risk: inconsistent user trust and masked backend failures.  
   - Owner: Architect Agent.  
   - Mitigation: endpoint-level fallback matrix + explicit UX degraded state.

2. **IR-002: Critical-path branch coverage too low**  
   - Risk: regressions in auth/order/network failures.  
   - Owner: QA Agent.  
   - Mitigation: targeted branch/failure tests in `api.ts` and store actions.

### P1 (Operational hardening)
3. **IR-003: Security scan reliability depends on environment/network policy**  
   - Risk: false confidence when advisory endpoint unavailable.  
   - Owner: Security Agent.  
   - Mitigation: redundant scanners and CI artifact retention.

4. **IR-004: Performance budgets not enforced as merge blocker**  
   - Risk: chunk bloat over time.  
   - Owner: Performance Agent.  
   - Mitigation: route/chunk budget config + CI fail-fast.

---

## 6) Execution Logbook Format (mandatory)

Use one line per task update:

`<TASK_ID> | <UTC timestamp> | <action summary> | <evidence command> | <result>`

Example:

`SYS-03 | 2026-04-14T03:10Z | Added failure-path tests for createOrder auth+network errors | npm test -- --run src/lib/__tests__/api.test.ts | ✅`

---

## 7) Collaboration Rules for AI Coders

1. Never mark a task “Done” without command evidence.
2. Never claim “production-ready” while P0 issues are open.
3. Never introduce duplicate source-of-truth files.
4. Never bypass accessibility/security checks for speed.
5. Always leave the system more deterministic than you found it.

---

## 8) Current Status Summary

- System baseline is now structured for multi-agent execution and traceable closure.
- `SYS-01` is complete.
- Remaining work to reach true 10/10 is concentrated in fallback policy, critical-path testing depth, and operational gate automation.
