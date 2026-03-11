# ROLLON AGENT GUIDELINES

## Vision & Goals
- Ship a secure, performant storefront with reliable admin workflows.
- Prefer correctness and measurable validation over speculative refactors.

## Coding Standards
- TypeScript strictness over `any`.
- Use shared schema/types (`src/lib/*`, `src/types/*`) before introducing new contracts.
- All auth fallbacks must be environment-gated and never rely on hardcoded defaults.

## Testing & Verification
- Minimum checks for any feature PR: lint, unit tests, build.
- Add at least one failure-path test for business-critical flows (auth, checkout, cart).
- When frontend behavior changes, capture visual proof and include artifact link.

## Security
- No plaintext secrets in source.
- Explicitly fail when API auth/register flows fail.
- Keep mock auth/demo behavior disabled by default.

## Communication
- Maintain `plans/TASKBOARD.md` statuses honestly (no false "completed").
- Append changes to `plans/LOGBOOK.md` with traceable acceptance checks.
- Use atomic commits scoped to one concern each.
