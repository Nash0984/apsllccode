import { test } from 'node:test';
import assert from 'node:assert';
import { onRequest } from '../../../functions/api/health.ts';

test('health API verbose mode', async () => {
  const request = new Request('http://localhost/api/health?verbose=true');
  const context = { request };

  const response = await onRequest(context);
  const json = await response.json();

  assert.strictEqual(response.status, 200);
  assert.strictEqual(json.status, 'ok');
  assert.strictEqual(json.platform, 'Cloudflare Pages');
  assert.strictEqual(json.runtime, 'Cloudflare Workers');
  assert.ok(json.timestamp);
});

test('health API regular mode', async () => {
  const request = new Request('http://localhost/api/health');
  const context = { request };

  const response = await onRequest(context);
  const json = await response.json();

  assert.strictEqual(response.status, 200);
  assert.strictEqual(json.status, 'ok');
  assert.strictEqual(json.platform, 'Cloudflare Pages');
  assert.strictEqual(json.runtime, undefined);
  assert.ok(json.timestamp);
});
