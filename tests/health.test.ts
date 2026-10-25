import test from 'node:test';
import assert from 'node:assert';
import { onRequest } from '../functions/api/health.ts';

test('health api onRequest', async (t) => {
  await t.test('returns basic health info when no query parameters are provided', async () => {
    const context = {
      request: {
        url: 'http://localhost/api/health',
      }
    };

    const response = await onRequest(context);
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.headers.get('content-type'), 'application/json');

    const data = await response.json();
    assert.strictEqual(data.status, 'ok');
    assert.strictEqual(data.platform, 'Cloudflare Pages');
    assert.ok(data.timestamp);
    assert.strictEqual(data.runtime, undefined);
  });

  await t.test('returns detailed health info when verbose=true', async () => {
    const context = {
      request: {
        url: 'http://localhost/api/health?verbose=true',
      }
    };

    const response = await onRequest(context);
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.headers.get('content-type'), 'application/json');

    const data = await response.json();
    assert.strictEqual(data.status, 'ok');
    assert.strictEqual(data.platform, 'Cloudflare Pages');
    assert.ok(data.timestamp);
    assert.strictEqual(data.runtime, 'Cloudflare Workers');
  });

  await t.test('returns basic health info when verbose=false', async () => {
    const context = {
      request: {
        url: 'http://localhost/api/health?verbose=false',
      }
    };

    const response = await onRequest(context);
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.headers.get('content-type'), 'application/json');

    const data = await response.json();
    assert.strictEqual(data.status, 'ok');
    assert.strictEqual(data.platform, 'Cloudflare Pages');
    assert.ok(data.timestamp);
    assert.strictEqual(data.runtime, undefined);
  });
});
