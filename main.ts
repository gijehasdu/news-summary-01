import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const source = join(dirname(fileURLToPath(import.meta.url)), 'summary.txt');
const text = readFileSync(source, 'utf8');
const characters = [...text].length;
if (!text.trim() || characters < 1 || characters > 2000) {
  throw new Error(`summary.txt must contain non-whitespace text of 1–2,000 Unicode characters (got ${characters})`);
}
const outputDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, 'entry.txt'), text);
