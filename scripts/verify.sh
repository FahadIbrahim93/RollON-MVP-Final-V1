#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

pushd "$ROOT_DIR/rollon-app" >/dev/null
npm run lint
npm test -- --run
npm run build
popd >/dev/null

node --test "$ROOT_DIR/api/__tests__/handlers.test.js"

echo "Verification completed successfully."
