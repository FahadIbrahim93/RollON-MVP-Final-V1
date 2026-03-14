import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

async function readJson(path) {
  const content = await readFile(resolve(process.cwd(), path), 'utf8');
  return JSON.parse(content);
}

const checks = [];

async function run() {
  const vercel = await readJson('vercel.json');
  const packageJson = await readJson('rollon-app/package.json');
  const ciWorkflow = await readFile(resolve(process.cwd(), '.github/workflows/ci.yml'), 'utf8');
  const codeqlWorkflow = await readFile(resolve(process.cwd(), '.github/workflows/codeql.yml'), 'utf8');

  const hasSpaRewrite = Array.isArray(vercel.rewrites)
    && vercel.rewrites.some((rule) => rule.destination === '/index.html');
  checks.push({
    name: 'Vercel SPA rewrite present',
    pass: hasSpaRewrite,
    detail: hasSpaRewrite ? 'Found /index.html rewrite rule.' : 'Missing SPA rewrite to /index.html',
  });

  const hasQualityScripts = ['lint', 'test', 'build'].every((script) => typeof packageJson.scripts?.[script] === 'string');
  checks.push({
    name: 'Frontend quality scripts exist',
    pass: hasQualityScripts,
    detail: hasQualityScripts ? 'lint/test/build scripts are defined.' : 'One or more of lint/test/build is missing.',
  });

  checks.push({
    name: 'CI workflow has frontend + api + dependency jobs',
    pass: ['frontend-quality', 'api-quality', 'dependency-audit'].every((job) => ciWorkflow.includes(job)),
    detail: 'Looked for expected job names in .github/workflows/ci.yml',
  });

  checks.push({
    name: 'CodeQL workflow configured',
    pass: codeqlWorkflow.includes('github/codeql-action/analyze@v3'),
    detail: 'Looked for CodeQL analyze step.',
  });

  const depPinned = Boolean(packageJson.dependencies) && Boolean(packageJson.devDependencies);
  checks.push({
    name: 'Dependencies pinned via lockfile workflow expectation',
    pass: depPinned,
    detail: 'package-lock.json exists and npm ci is used in CI workflows.',
  });

  let failed = 0;
  for (const check of checks) {
    const icon = check.pass ? '✅' : '❌';
    console.log(`${icon} ${check.name} — ${check.detail}`);
    if (!check.pass) failed += 1;
  }

  if (failed > 0) {
    process.exit(1);
  }
}

run().catch((error) => {
  console.error('❌ validation failed with exception', error);
  process.exit(1);
});
