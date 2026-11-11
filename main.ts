import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const summaryPath = join(here, 'summary.txt');
const summary = readFileSync(summaryPath, 'utf8');
const characterCount = [...summary].length;

if (summary.trim().length === 0) {
  throw new Error('summary.txt must contain non-whitespace text.');
}
if (characterCount < 1 || characterCount > 2000) {
  throw new Error(`summary.txt must contain between 1 and 2,000 Unicode characters; found ${characterCount}.`);
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, 'entry.txt'), summary, 'utf8');
