import test from 'node:test';
import assert from 'node:assert';
import { onRequestPost } from '../functions/api/chat.ts';

test('chat API endpoint', async (t) => {
  await t.test('returns 500 if GEMINI_API_KEY is missing from environment', async () => {
    const mockContext = {
      env: {}, // GEMINI_API_KEY is intentionally missing
      request: new Request('http://localhost/api/chat', {
        method: 'POST',
        body: JSON.stringify({ message: 'Hello' }),
      })
    };

    const response = await onRequestPost(mockContext);

    assert.strictEqual(response.status, 500);
    assert.strictEqual(response.headers.get('content-type'), 'application/json');

    const data = await response.json();
    assert.deepStrictEqual(data, { error: "GEMINI_API_KEY is missing from server environment" });
  });
});
