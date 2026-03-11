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

## Logbook Protocol
- Entry format: `Task ID | UTC time | Summary | Evidence command | Acceptance result`
- Required evidence: at least one executable command output.

## Logbook
- `T1 | 2026-03-11T03:50Z | Reviewed backend shape and identified data consistency/validation gaps | git log --oneline -n 3 | ✅`
- `T2 | 2026-03-11T03:52Z | Synced seed from frontend dataset | node scripts/sync-seed-from-frontend.mjs | ✅`
- `T3 | 2026-03-11T03:53Z | Added order payload validation + cumulative customer upsert behavior | node scripts/smoke-serverless.mjs | ✅`
- `T4 | 2026-03-11T03:53Z | Added script to execute serverless handlers with request/response traces | node scripts/smoke-serverless.mjs | ✅`
- `T5 | 2026-03-11T03:54Z | Updated architecture, research, and handoff docs | rg -n "seed|taskboard|catalog" docs README.md | ✅`
