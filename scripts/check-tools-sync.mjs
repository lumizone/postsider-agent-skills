#!/usr/bin/env node
/**
 * Diffs the PostSider MCP tool manifest (core/tools-manifest.json) against
 * the real tool registrations in apps/mcp/src/index.ts (from
 * lumizone/postsider), so this repo's docs cannot silently go stale.
 *
 * Usage: node scripts/check-tools-sync.mjs <path-to-index.ts>
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const REGISTER_TOOL_RE = /registerTool\(\s*['"]([a-zA-Z0-9_]+)['"]/g;

/**
 * @param {string} indexTsSource
 * @param {Array<{name: string}>} manifest
 * @returns {{missing: string[], extra: string[]}}
 */
export function diffTools(indexTsSource, manifest) {
  const sourceNames = new Set();
  for (const match of indexTsSource.matchAll(REGISTER_TOOL_RE)) {
    sourceNames.add(match[1]);
  }
  const manifestNames = new Set(manifest.map((t) => t.name));

  const missing = [...sourceNames].filter((n) => !manifestNames.has(n)).sort();
  const extra = [...manifestNames].filter((n) => !sourceNames.has(n)).sort();

  return { missing, extra };
}

async function main() {
  const indexPath = process.argv[2];
  if (!indexPath) {
    process.stderr.write('Usage: check-tools-sync.mjs <path-to-index.ts>\n');
    process.exit(2);
  }

  const indexTsSource = readFileSync(indexPath, 'utf8');
  const manifestPath = new URL('../core/tools-manifest.json', import.meta.url);
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));

  const { missing, extra } = diffTools(indexTsSource, manifest);

  if (missing.length === 0 && extra.length === 0) {
    console.log(`OK: manifest matches ${manifest.length} tools in ${indexPath}`);
    process.exit(0);
  }

  if (missing.length > 0) {
    console.error('Tools in source but missing from core/tools-manifest.json:');
    for (const name of missing) console.error(`  - ${name}`);
  }
  if (extra.length > 0) {
    console.error('Tools in core/tools-manifest.json but no longer in source:');
    for (const name of extra) console.error(`  - ${name}`);
  }
  process.exit(1);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
