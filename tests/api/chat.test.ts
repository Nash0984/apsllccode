import test from 'node:test';
import assert from 'node:assert';
import { onRequestPost } from '../../functions/api/chat.ts';

test('chat API endpoint', async (t) => {
  await t.test('returns 500 when GEMINI_API_KEY is missing from env', async () => {
    // 1. Arrange: setup a context missing the GEMINI_API_KEY
    const mockContext = {
      env: {},
      request: new Request('http://localhost/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'Hello' })
      })
    };

    // 2. Act: call the function
    const response = await onRequestPost(mockContext);

    // 3. Assert: Verify the response
    assert.strictEqual(response.status, 500);
    assert.strictEqual(response.headers.get('content-type'), 'application/json');

    const body = await response.json();
    assert.deepStrictEqual(body, { error: "GEMINI_API_KEY is missing from server environment" });
  });
});
