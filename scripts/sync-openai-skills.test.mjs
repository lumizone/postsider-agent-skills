import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { diffTrees, EXPECTED_SKILLS, syncTrees, validateSource } from './sync-openai-skills.mjs';

function makeSource(root) {
  for (const skill of EXPECTED_SKILLS) {
    mkdirSync(join(root, skill, 'agents'), { recursive: true });
    writeFileSync(join(root, skill, 'SKILL.md'), `---\nname: ${skill}\n---\n`);
    writeFileSync(join(root, skill, 'agents/openai.yaml'), `display_name: ${skill}\n`);
  }
}

test('copies and verifies all canonical skill files', () => {
  const root = mkdtempSync(join(tmpdir(), 'postsider-skills-'));
  const source = join(root, 'source');
  const destination = join(root, 'destination');
  mkdirSync(source);
  makeSource(source);

  syncTrees(source, destination);
  assert.deepEqual(diffTrees(source, destination), { missing: [], extra: [], changed: [] });
});

test('reports missing, extra, and changed files', () => {
  const root = mkdtempSync(join(tmpdir(), 'postsider-skills-'));
  const source = join(root, 'source');
  const destination = join(root, 'destination');
  mkdirSync(source);
  makeSource(source);
  syncTrees(source, destination);

  writeFileSync(join(destination, EXPECTED_SKILLS[0], 'SKILL.md'), 'changed');
  writeFileSync(join(destination, 'extra.txt'), 'extra');
  const missingPath = join(source, EXPECTED_SKILLS[1], 'reference.md');
  writeFileSync(missingPath, 'missing');

  assert.deepEqual(diffTrees(source, destination), {
    missing: [`${EXPECTED_SKILLS[1]}/reference.md`],
    extra: ['extra.txt'],
    changed: [`${EXPECTED_SKILLS[0]}/SKILL.md`],
  });
});

test('rejects an incomplete source catalog', () => {
  const root = mkdtempSync(join(tmpdir(), 'postsider-skills-'));
  assert.throws(() => validateSource(root), /Expected skills/);
});
