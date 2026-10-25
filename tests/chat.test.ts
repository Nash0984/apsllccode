import test from 'node:test';
import assert from 'node:assert';
import { onRequestPost } from '../functions/api/chat.ts';

test('chat API endpoint', async (t) => {
  await t.test('returns 500 error if GEMINI_API_KEY is missing', async () => {
    const mockContext = {
      env: {},
      request: new Request('http://localhost/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: 'Hello' })
      })
    };

    const response = await onRequestPost(mockContext);

    assert.strictEqual(response.status, 500);
    const data = await response.json();
    assert.strictEqual(data.error, "GEMINI_API_KEY is missing from server environment");
  });
});
