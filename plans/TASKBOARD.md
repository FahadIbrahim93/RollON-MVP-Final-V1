# ROLLON EXECUTION TASKBOARD

| ID | Task | Dependency | Owner | Status | Acceptance Criteria |
|---|---|---|---|---|---|
| P0-SEC-01 | Remove hardcoded/default auth secrets fallback | None | Security Agent | Completed | Demo auth disabled by default and env-gated only |
| P0-QA-01 | Make lint pass for `rollon-app` | P0-SEC-01 | Execution Agent | In Progress | Code-level lint fixes landed; final run blocked by dependency install in this environment |
| P1-TEST-01 | Expand store/auth test reliability | P0-QA-01 | QA Agent | Completed | Auth tests mock API path and pass |
| P1-TEST-02 | Add shop filtering/pagination unit coverage | P0-QA-01 | QA Agent | Completed | New `shop.test.ts` covers sorting/filter/pagination edge cases |
| P1-PERF-01 | Fix Shop filtering correctness + memo dependencies | P0-QA-01 | Execution Agent | Completed | Category filtering works by slug-to-id mapping and lint warnings resolved |
| P2-DOC-01 | Create handoff protocol docs (taskboard/logbook) | None | Architect Agent | Completed | Planning artifacts present and updated |
| P2-DOC-02 | Add explicit agent execution guideline doc | P2-DOC-01 | Architect Agent | Completed | `plans/AGENT_GUIDELINES.md` present |
| P2-PIPE-01 | Validate build and tests | P0-QA-01 | Execution Agent | In Progress | Final rerun blocked by dependency install in this environment |
| EXT-GH-01 | Close all GitHub issues | External access/auth | Repo Admin | Blocked | Requires authenticated GitHub context in this environment |

## Current Sprint Notes
- Priority remains eliminating production-risk auth fallback and stabilizing static analysis gates.
- External issue closure is blocked due to missing GitHub API/auth integration in the execution environment.
