import fs from 'node:fs';
import vm from 'node:vm';
import ts from '../rollon-app/node_modules/typescript/lib/typescript.js';

const sourcePath = new URL('../rollon-app/src/data/products.ts', import.meta.url);
const source = fs.readFileSync(sourcePath, 'utf8');

const transpiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2020,
  },
}).outputText;

const sandbox = {
  exports: {},
  module: { exports: {} },
  require: () => ({}),
};
vm.createContext(sandbox);
vm.runInContext(transpiled, sandbox);

const { categories, products } = sandbox.exports;

if (!Array.isArray(categories) || !Array.isArray(products)) {
  throw new Error('Could not extract categories/products from frontend dataset.');
}

const outputPath = new URL('../api/_lib/seedData.generated.json', import.meta.url);
fs.writeFileSync(outputPath, JSON.stringify({ categories, products }, null, 2));

console.log(`Seed synced: ${categories.length} categories, ${products.length} products`);
