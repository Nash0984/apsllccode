import test from 'node:test';
import assert from 'node:assert';
import { evaluateDocument } from './gemini.ts';

test('evaluateDocument', async (t) => {
  const originalFetch = globalThis.fetch;

  t.afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  await t.test('throws specific error message when API returns an error field', async () => {
    globalThis.fetch = async () => ({
      ok: false,
      json: async () => ({ error: 'Specific API error' })
    }) as any;

    await assert.rejects(
      async () => {
        await evaluateDocument({ mimeType: 'text/plain', data: 'test' }, 'policy123');
      },
      (err: any) => {
        assert.strictEqual(err.message, 'Specific API error');
        return true;
      }
    );
  });

  await t.test('throws default error message when API returns no error field', async () => {
    globalThis.fetch = async () => ({
      ok: false,
      json: async () => ({})
    }) as any;

    await assert.rejects(
      async () => {
        await evaluateDocument({ mimeType: 'text/plain', data: 'test' }, 'policy123');
      },
      (err: any) => {
        assert.strictEqual(err.message, 'Evaluation failed');
        return true;
      }
    );
  });

  await t.test('returns data on success', async () => {
    globalThis.fetch = async (url, options) => {
      assert.strictEqual(url, '/api/ai/evaluate');
      assert.strictEqual(options?.method, 'POST');
      assert.deepStrictEqual(JSON.parse(options?.body as string), {
        fileData: { mimeType: 'text/plain', data: 'test' },
        policyId: 'policy123',
        persona: 'worker'
      });
      return {
        ok: true,
        json: async () => ({ success: true })
      } as any;
    };

    const result = await evaluateDocument({ mimeType: 'text/plain', data: 'test' }, 'policy123');
    assert.deepStrictEqual(result, { success: true });
  });
});
