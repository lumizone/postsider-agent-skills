import { test } from 'node:test';
import assert from 'node:assert/strict';
import { diffTools } from './check-tools-sync.mjs';

const manifest = [
  { name: 'postsider_list_channels' },
  { name: 'postsider_create_post' },
];

test('reports no drift when source and manifest match', () => {
  const source = `
    server.registerTool('postsider_list_channels', {}, async () => {});
    server.registerTool('postsider_create_post', {}, async () => {});
  `;
  const result = diffTools(source, manifest);
  assert.deepEqual(result, { missing: [], extra: [] });
});

test('reports a tool present in source but missing from manifest', () => {
  const source = `
    server.registerTool('postsider_list_channels', {}, async () => {});
    server.registerTool('postsider_create_post', {}, async () => {});
    server.registerTool('postsider_delete_post', {}, async () => {});
  `;
  const result = diffTools(source, manifest);
  assert.deepEqual(result, { missing: ['postsider_delete_post'], extra: [] });
});

test('reports a manifest entry no longer in source', () => {
  const source = `
    server.registerTool('postsider_list_channels', {}, async () => {});
  `;
  const result = diffTools(source, manifest);
  assert.deepEqual(result, { missing: [], extra: ['postsider_create_post'] });
});
