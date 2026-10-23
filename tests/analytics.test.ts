import test from 'node:test';
import assert from 'node:assert';
import { trackInteraction } from '../src/services/analytics.ts';

test('trackInteraction', async (t) => {
  let originalConsoleLog: any;
  let loggedArgs: any[] = [];

  t.beforeEach(() => {
    originalConsoleLog = console.log;
    console.log = (...args) => {
      loggedArgs = args;
    };
  });

  t.afterEach(() => {
    console.log = originalConsoleLog;
    loggedArgs = [];
  });

  await t.test('logs interaction without data', () => {
    trackInteraction('TestComponent', 'TEST_ACTION');

    assert.strictEqual(loggedArgs.length, 2);
    assert.ok(loggedArgs[0].includes('[ANALYTICS]'));
    assert.ok(loggedArgs[0].includes('| Component: TestComponent | Action: TEST_ACTION'));
    assert.strictEqual(loggedArgs[1], '');
  });

  await t.test('logs interaction with data', () => {
    const testData = { id: 123, name: 'test' };
    trackInteraction('TestComponent', 'TEST_ACTION', testData);

    assert.strictEqual(loggedArgs.length, 2);
    assert.ok(loggedArgs[0].includes('[ANALYTICS]'));
    assert.ok(loggedArgs[0].includes('| Component: TestComponent | Action: TEST_ACTION'));
    assert.deepStrictEqual(loggedArgs[1], testData);
  });
});
