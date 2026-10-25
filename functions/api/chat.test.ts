import { test } from 'node:test';
import assert from 'node:assert';
// @ts-ignore
import { onRequestPost } from './chat.ts';

test('onRequestPost returns 400 when request.json() throws', async () => {
  const context = {
    env: { GEMINI_API_KEY: 'test-api-key' },
    request: {
      json: async () => {
        throw new Error('Invalid JSON');
      }
    }
  };

  // @ts-ignore
  const response = await onRequestPost(context);
  const body = await response.json();

  assert.strictEqual(response.status, 400);
  assert.strictEqual(body.error, 'Invalid JSON');
  assert.strictEqual(response.headers.get('content-type'), 'application/json');
});

test('onRequestPost returns 500 when GEMINI_API_KEY is missing', async () => {
  const context = {
    env: {},
    request: {}
  };

  // @ts-ignore
  const response = await onRequestPost(context);
  const body = await response.json();

  assert.strictEqual(response.status, 500);
  assert.strictEqual(body.error, 'GEMINI_API_KEY is not set');
});

test('onRequestPost returns 200 and reflects body on success', async () => {
  const testBody = { message: 'hello' };
  const context = {
    env: { GEMINI_API_KEY: 'test-api-key' },
    request: {
      json: async () => testBody
    }
  };

  // @ts-ignore
  const response = await onRequestPost(context);
  const body = await response.json();

  assert.strictEqual(response.status, 200);
  assert.strictEqual(body.message, 'Cloudflare Pages Gemini endpoint ready');
  assert.deepStrictEqual(body.received, testBody);
});
