import test from 'node:test';
import assert from 'node:assert';
import { onRequestPost } from '../functions/api/chat.ts';

test('chat endpoint', async (t) => {
  await t.test('returns 500 when GEMINI_API_KEY is missing', async () => {
    const mockContext = {
      env: {},
      request: new Request('http://localhost/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ message: 'Hello' })
      })
    };

    const response = await onRequestPost(mockContext);
    assert.strictEqual(response.status, 500);

    const body = await response.json();
    assert.strictEqual(body.error, 'GEMINI_API_KEY is missing from server environment');
  });
});
