import test from 'node:test';
import assert from 'node:assert';
import { onRequest } from '../../functions/api/health.ts';

test('Health check API', async (t) => {
  await t.test('returns basic health info when no verbose query param is provided', async () => {
    const mockContext = {
      request: {
        url: 'http://localhost:3000/api/health'
      }
    };

    const response = await onRequest(mockContext as any);
    assert.strictEqual(response.status, 200);

    const data = await response.json();
    assert.strictEqual(data.status, 'ok');
    assert.strictEqual(data.platform, 'Cloudflare Pages');
    assert.ok(data.timestamp);
    assert.strictEqual(data.runtime, undefined);
  });

  await t.test('returns basic health info when verbose query param is false', async () => {
    const mockContext = {
      request: {
        url: 'http://localhost:3000/api/health?verbose=false'
      }
    };

    const response = await onRequest(mockContext as any);
    assert.strictEqual(response.status, 200);

    const data = await response.json();
    assert.strictEqual(data.status, 'ok');
    assert.strictEqual(data.platform, 'Cloudflare Pages');
    assert.ok(data.timestamp);
    assert.strictEqual(data.runtime, undefined);
  });

  await t.test('returns basic health info when verbose query param is something else', async () => {
    const mockContext = {
      request: {
        url: 'http://localhost:3000/api/health?verbose=yes'
      }
    };

    const response = await onRequest(mockContext as any);
    assert.strictEqual(response.status, 200);

    const data = await response.json();
    assert.strictEqual(data.status, 'ok');
    assert.strictEqual(data.platform, 'Cloudflare Pages');
    assert.ok(data.timestamp);
    assert.strictEqual(data.runtime, undefined);
  });

  await t.test('returns extended health info when verbose query param is true', async () => {
    const mockContext = {
      request: {
        url: 'http://localhost:3000/api/health?verbose=true'
      }
    };

    const response = await onRequest(mockContext as any);
    assert.strictEqual(response.status, 200);

    const data = await response.json();
    assert.strictEqual(data.status, 'ok');
    assert.strictEqual(data.platform, 'Cloudflare Pages');
    assert.ok(data.timestamp);
    assert.strictEqual(data.runtime, 'Cloudflare Workers');
  });

  await t.test('response headers include content-type application/json', async () => {
    const mockContext = {
      request: {
        url: 'http://localhost:3000/api/health'
      }
    };

    const response = await onRequest(mockContext as any);
    assert.strictEqual(response.headers.get('content-type'), 'application/json');
  });
});
