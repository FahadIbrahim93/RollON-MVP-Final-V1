import { readdir, readFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';

const rootDir = resolve(process.cwd(), 'rollon-app/src');
const disallowed = ['text-white/40', 'text-white/30'];
const ignoredDirs = new Set(['assets', 'dist', 'node_modules']);

async function collectTsxFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!ignoredDirs.has(entry.name)) {
        files.push(...await collectTsxFiles(fullPath));
      }
      continue;
    }

    if (entry.isFile() && fullPath.endsWith('.tsx')) {
      files.push(fullPath);
    }
  }

  return files;
}

const tsxFiles = await collectTsxFiles(rootDir);
const violations = [];

for (const file of tsxFiles) {
  const content = await readFile(file, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    for (const token of disallowed) {
      if (line.includes(token)) {
        violations.push(`${file.replace(process.cwd() + '/', '')}:${index + 1} contains ${token}`);
      }
    }
  });
}

if (violations.length > 0) {
  console.error('Contrast token violations detected:');
  for (const violation of violations) {
    console.error(`- ${violation}`);
  }
  process.exit(1);
}

console.log(`Contrast token check passed across ${tsxFiles.length} TSX files.`);
