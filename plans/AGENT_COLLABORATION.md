# MULTI-AGENT COLLABORATION FRAMEWORK
**Project:** RollON App
**Date:** 2026-03-11

## 1. Agent Roles and Responsibilities

| Agent Role | Primary Responsibilities | Directives |
| :--- | :--- | :--- |
| **Lead Architect Agent** | Orchestration, Architecture, High-level Code Review | Ensures all sub-agents adhere to the SSOT Blueprint. Final say on structural PRs. |
| **Security Agent** | Auth implementations, Secret Scanning, Data Validation | Prevents hardcoded credentials. Enforces CSRF, rate-limiting, and sanitized inputs. |
| **Execution Agent** | UI/UX implementation, State logic, API wiring | High-throughput feature creation. Must follow exact design specs (neon dark mode). |
| **QA/Testing Agent** | Unit and E2E Testing, Edge Case Coverage | Achieves >95% coverage on core flows. Gates PRs based on test passes. |

## 2. Task Decomposition (Breakdown Strategy)

Tasks are broken down using the `feature-breakdown-planner` principle:
1. **Epic Definition:** Architect creates top-level Epic (e.g., "Implement JWT Auth").
2. **Component Granularity:** Execution Agent splits Epic into specific files (`authStore.ts`, `Login.tsx`, `ProtectedRoute.tsx`).
3. **Sequential Execution:** Security Agent scaffolds infrastructure -> Execution Agent builds UI -> QA Agent writes tests.

## 3. Communication Protocols

- **Artifact Sharing:** The `UNIFIED_AUDIT_REPORT.md` and `PROJECT_BLUEPRINT.md` are shared baseline context strings loaded at the start of any new agent session.
- **Handoffs:** Agents leave structured TODOs in `.md` checklist files when handing off (e.g., `CHECKPOINT: UI done, needs QA coverage`).
- **File Tagging:** Work-in-progress files carry a `// @agent: wip` comment block to signal exclusive lock.

## 4. Conflict Resolution Procedures

If two agents suggest divergent architectural approaches:
1. **Pause Execution:** Do not write code.
2. **Fallback to Blueprint:** Consult `PROJECT_BLUEPRINT.md` for explicit mandates (e.g., "Use Zustand, not Context").
3. **Architect Override:** If ambiguity persists, the Lead Architect Agent must be invoked for a definitive ruling, documented in `ROADMAP.md`.

## 5. Code Ownership Matrix

| Domain | Primary Owner | Secondary Owner |
| :--- | :--- | :--- |
| `/components/ui/` | Execution Agent | Architect Agent |
| `/store/` | Architect Agent | Execution Agent |
| `/lib/hooks/`, API clients | Execution Agent | Security Agent |
| `/pages/admin/` | Security Agent | Execution Agent |
| Testing & Configs | QA Agent | Architect Agent |

## 6. PR Review Workflows

1. **Self-Reflection Pass:** Execution Agent verifies real outputs vs. stubs.
2. **Automated Checks:** Linters, Formatters, `tsc -b`, and `vitest run` must exit 0.
3. **QA Review:** QA Agent generates coverage report. If coverage < 80% on changed logic, PR is rejected.
4. **Architect Approval:** Lead Architect verifies alignment with blueprint patterns before merge.
