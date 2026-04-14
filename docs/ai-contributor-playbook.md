# AI Contributor Playbook

This playbook is optimized so any AI coder can execute reliably in RollON without creating regressions.

## Pre-flight Checklist
- Read `AGENTS.md` and `docs/agents-taskboard.md`.
- Confirm current branch, diff cleanliness, and task ownership.
- Identify whether the task touches security-critical, checkout-critical, or admin-critical paths.

## Execution Contract
1. Plan in bullets (scope, risks, tests to add).
2. Implement smallest useful change.
3. Run full quality gates.
4. Update taskboard and issue register.
5. Commit with clear intent (fix/refactor/test/docs/chore).

## Required Commands
```bash
cd rollon-app
npm run lint
npm test -- --run
npm run test:coverage
npm run build
```

## Commit Message Pattern
- `fix(<scope>): <what changed and why>`
- `refactor(<scope>): <modularity/perf/security improvement>`
- `test(<scope>): <added coverage for risk/failure paths>`
- `docs(<scope>): <decision/process/operational updates>`

## PR Body Minimum
- Problem statement
- Scope and non-goals
- Risk analysis
- Test evidence
- Rollback strategy

## Do / Don't
### Do
- Prefer explicit behavior over magic fallback.
- Add tests for failure paths.
- Preserve accessibility semantics.

### Don't
- Add dead/stub UI.
- Silence errors without observability.
- Introduce second source of truth for same data.
