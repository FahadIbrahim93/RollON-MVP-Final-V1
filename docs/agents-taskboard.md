# AGENTS + TASKBOARD

## Vision
Deliver a reliable, production-safe commerce backend on Vercel + Upstash with deterministic catalog seed management and auditable operations.

## Coding Standards
- Keep frontend catalog as source-of-truth for product definitions.
- Backend validates write payloads before persistence.
- API responses are explicit and predictable (pagination metadata for list routes).
- No secrets committed to repository.

## Taskboard
| ID | Task | Dependency | Owner | Status |
|---|---|---|---|---|
| T1 | Audit previous API/seed implementation gaps | None | Agent | Completed |
| T2 | Align seed dataset with frontend canonical catalog | T1 | Agent | Completed |
| T3 | Harden order write validation and customer aggregation | T1 | Agent | Completed |
| T4 | Add endpoint smoke verification script with HTTP-like traces | T2,T3 | Agent | Completed |
| T5 | Update documentation and research notes | T1-T4 | Agent | Completed |
| T6 | Expand serverless tests to 12+ edge/failure paths | T3,T4 | Agent | Completed |
| T7 | Add production hardening checklist with evidence | T1-T6 | Agent | Completed |
| T8 | Refactor admin analytics to tested domain utility | T7 | Agent | Completed |
| T9 | Harden SEO lifecycle + absolute URL normalization | T8 | Agent | Completed |
| T10 | Expand tests for analytics + SEO DOM side effects | T8,T9 | Agent | Completed |
| T11 | Publish audit/plan closure docs for autonomous sweep | T8-T10 | Agent | Completed |
| T12 | Split admin charting into lazy-loaded panel chunk to reduce route bundle | T8-T11 | Agent | Completed |
| T13 | Restore mobile sidebar logout action and extend analytics edge-case tests | T12 | Agent | Completed |
| T14 | Make admin sidebar active-state route-aware across desktop/mobile nav | T13 | Agent | Completed |
| T15 | Harden admin nav active-state matcher for nested routes + add unit tests | T14 | Agent | Completed |

## Logbook Protocol
- Entry format: `Task ID | UTC time | Summary | Evidence command | Acceptance result`
- Required evidence: at least one executable command output.

## Logbook
- `T1 | 2026-03-11T03:50Z | Reviewed backend shape and identified data consistency/validation gaps | git log --oneline -n 3 | ✅`
- `T2 | 2026-03-11T03:52Z | Synced seed from frontend dataset | node scripts/sync-seed-from-frontend.mjs | ✅`
- `T3 | 2026-03-11T03:53Z | Added order payload validation + cumulative customer upsert behavior | node scripts/smoke-serverless.mjs | ✅`
- `T4 | 2026-03-11T03:53Z | Added script to execute serverless handlers with request/response traces | node scripts/smoke-serverless.mjs | ✅`
- `T5 | 2026-03-11T03:54Z | Updated architecture, research, and handoff docs | rg -n "seed|taskboard|catalog" docs README.md | ✅`

- `T6 | 2026-03-11T16:40Z | Expanded handler test coverage beyond 12 cases | node --test api/__tests__/handlers.test.js | ✅`
- `T7 | 2026-03-11T16:41Z | Added production hardening checklist with deployment guidance | rg -n "hardening|rollback|observability" docs/production-hardening.md | ✅`
- `T8 | 2026-03-11T20:06Z | Extracted analytics computation into reusable utility and integrated dashboard | npm test -- --run | ✅`
- `T9 | 2026-03-11T20:07Z | Hardened SEO runtime behavior (absolute URLs + JSON-LD lifecycle cleanup) | npm test -- --run | ✅`
- `T10 | 2026-03-11T20:08Z | Added expanded tests for analytics edge cases + SEO DOM effects | npm test -- --run | ✅`
- `T11 | 2026-03-11T20:09Z | Published audit and execution plan docs for closure traceability | rg -n "Project Audit|Autonomous Completion Sweep" docs/project_audit.md docs/task.md | ✅`
- `T12 | 2026-03-11T20:48Z | Lazy-loaded chart-heavy admin analytics panels; reduced AdminDashboard entry chunk size | npm run build | ✅`
- `T13 | 2026-03-11T20:56Z | Restored mobile logout control and expanded analytics edge-case tests | npm test -- --run | ✅`
- `T14 | 2026-03-11T21:06Z | Made admin sidebar links route-aware for accurate active highlight | npm run build | ✅`
- `T15 | 2026-03-11T21:20Z | Added tested active-route matcher for nested admin paths to prevent false highlights | npm test -- --run | ✅`
