import test from 'node:test';
import assert from 'node:assert';
import { CORS_OPTIONS } from '../src/config/cors.ts';

test('CORS whitelist logic', async (t) => {
  await t.test('allows requests from localhost:3000', () => {
    let result: boolean | undefined = undefined;
    CORS_OPTIONS.origin('http://localhost:3000', (err, allow) => {
      if (!err) result = allow;
    });
    assert.strictEqual(result, true);
  });

  await t.test('allows requests from production domain', () => {
    let result: boolean | undefined = undefined;
    CORS_OPTIONS.origin('https://applied-policy-systems.pages.dev', (err, allow) => {
      if (!err) result = allow;
    });
    assert.strictEqual(result, true);
  });

  await t.test('allows requests with no origin', () => {
    let result: boolean | undefined = undefined;
    CORS_OPTIONS.origin(undefined, (err, allow) => {
      if (!err) result = allow;
    });
    assert.strictEqual(result, true);
  });

  await t.test('blocks requests from unauthorized origins', () => {
    let error: Error | null = null;
    CORS_OPTIONS.origin('http://malicious.com', (err, allow) => {
      error = err;
    });
    assert.ok(error);
    assert.strictEqual(error.message, 'Not allowed by CORS');
  });

  await t.test('credentials should be true', () => {
    assert.strictEqual(CORS_OPTIONS.credentials, true);
  });
});
