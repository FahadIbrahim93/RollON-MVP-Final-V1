import { access, readdir, stat } from 'node:fs/promises';
import { constants } from 'node:fs';
import { resolve } from 'node:path';

async function resolveAssetsDir() {
  const candidates = [
    resolve(process.cwd(), 'rollon-app/dist/assets'),
    resolve(process.cwd(), 'dist/assets'),
  ];

  for (const candidate of candidates) {
    try {
      await access(candidate, constants.R_OK);
      return candidate;
    } catch {
      // continue
    }
  }

  throw new Error('Could not locate dist/assets directory (expected rollon-app/dist/assets or dist/assets).');
}

const assetsDir = await resolveAssetsDir();

const budgets = [
  { matcher: /^AdminAnalyticsPanels-.*\.js$/, maxBytes: 410 * 1024, label: 'Admin analytics chunk' },
  { matcher: /^index-.*\.js$/, maxBytes: 260 * 1024, label: 'Main app chunk' },
];

const files = await readdir(assetsDir);
let failures = 0;

for (const budget of budgets) {
  const file = files.find((name) => budget.matcher.test(name));
  if (!file) {
    console.error(`❌ ${budget.label}: matching file not found`);
    failures += 1;
    continue;
  }

  const fileStat = await stat(resolve(assetsDir, file));
  const sizeKb = (fileStat.size / 1024).toFixed(2);
  const maxKb = (budget.maxBytes / 1024).toFixed(2);

  if (fileStat.size > budget.maxBytes) {
    console.error(`❌ ${budget.label}: ${file} is ${sizeKb}KB (budget ${maxKb}KB)`);
    failures += 1;
  } else {
    console.log(`✅ ${budget.label}: ${file} is ${sizeKb}KB (budget ${maxKb}KB)`);
  }
}

if (failures > 0) {
  process.exit(1);
}
