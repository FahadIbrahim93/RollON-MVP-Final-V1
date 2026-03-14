import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const files = [
  'rollon-app/src/components/layout/Navbar.tsx',
  'rollon-app/src/pages/Checkout.tsx',
  'rollon-app/src/components/shop/shop-product-card.tsx',
  'rollon-app/src/components/ui/label.tsx',
];

const disallowed = ['text-white/40', 'text-white/30'];

const violations = [];

for (const file of files) {
  const fullPath = resolve(process.cwd(), file);
  const content = await readFile(fullPath, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    for (const token of disallowed) {
      if (line.includes(token)) {
        violations.push(`${file}:${index + 1} contains ${token}`);
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

console.log('Contrast token check passed for guarded UI files.');
