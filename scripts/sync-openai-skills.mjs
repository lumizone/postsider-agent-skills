#!/usr/bin/env node
import {
  copyFileSync,
  existsSync,
  lstatSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
} from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const EXPECTED_SKILLS = [
  'postsider-agency-operations',
  'postsider-approval-workflow',
  'postsider-calendar-review',
  'postsider-content-publishing',
  'postsider-performance-reporting',
];

const REQUIRED_FILES = ['SKILL.md', 'agents/openai.yaml'];

function listFiles(root) {
  if (!existsSync(root)) return [];
  const files = [];
  const visit = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      const fullPath = join(dir, entry.name);
      if (entry.isSymbolicLink()) throw new Error(`Symlinks are not allowed: ${fullPath}`);
      if (entry.isDirectory()) visit(fullPath);
      else if (entry.isFile()) files.push(relative(root, fullPath));
      else throw new Error(`Unsupported filesystem entry: ${fullPath}`);
    }
  };
  visit(root);
  return files;
}

export function validateSource(sourceRoot) {
  const actualSkills = readdirSync(sourceRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
  const expected = [...EXPECTED_SKILLS].sort();
  if (JSON.stringify(actualSkills) !== JSON.stringify(expected)) {
    throw new Error(`Expected skills ${expected.join(', ')}, found ${actualSkills.join(', ')}`);
  }

  for (const skill of EXPECTED_SKILLS) {
    for (const requiredFile of REQUIRED_FILES) {
      const path = join(sourceRoot, skill, requiredFile);
      if (!existsSync(path) || !lstatSync(path).isFile()) {
        throw new Error(`Missing required file: ${path}`);
      }
    }
  }
}

export function diffTrees(sourceRoot, destinationRoot) {
  const sourceFiles = listFiles(sourceRoot);
  const destinationFiles = listFiles(destinationRoot);
  const sourceSet = new Set(sourceFiles);
  const destinationSet = new Set(destinationFiles);
  const missing = sourceFiles.filter((file) => !destinationSet.has(file));
  const extra = destinationFiles.filter((file) => !sourceSet.has(file));
  const changed = sourceFiles.filter(
    (file) => destinationSet.has(file)
      && !readFileSync(join(sourceRoot, file)).equals(readFileSync(join(destinationRoot, file)))
  );
  return { missing, extra, changed };
}

export function syncTrees(sourceRoot, destinationRoot) {
  validateSource(sourceRoot);
  rmSync(destinationRoot, { recursive: true, force: true });
  for (const file of listFiles(sourceRoot)) {
    const destination = join(destinationRoot, file);
    mkdirSync(resolve(destination, '..'), { recursive: true });
    copyFileSync(join(sourceRoot, file), destination);
  }
}

async function main() {
  const args = process.argv.slice(2);
  const check = args.includes('--check');
  const sourceArg = args.find((arg) => arg !== '--check');
  if (!sourceArg) {
    process.stderr.write('Usage: sync-openai-skills.mjs <postsider/apps/mcp/skills> [--check]\n');
    process.exit(2);
  }

  const sourceRoot = resolve(sourceArg);
  const destinationRoot = fileURLToPath(new URL('../providers/openai/skills/', import.meta.url));
  validateSource(sourceRoot);

  if (!check) {
    syncTrees(sourceRoot, destinationRoot);
    console.log(`Synced ${EXPECTED_SKILLS.length} OpenAI MCP skills into ${destinationRoot}`);
    return;
  }

  const diff = diffTrees(sourceRoot, destinationRoot);
  if (diff.missing.length || diff.extra.length || diff.changed.length) {
    if (diff.missing.length) console.error(`Missing: ${diff.missing.join(', ')}`);
    if (diff.extra.length) console.error(`Extra: ${diff.extra.join(', ')}`);
    if (diff.changed.length) console.error(`Changed: ${diff.changed.join(', ')}`);
    process.exit(1);
  }
  console.log(`OK: ${EXPECTED_SKILLS.length} OpenAI MCP skills match the canonical PostSider source`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
    process.exit(1);
  });
}
