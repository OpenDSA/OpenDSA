const assert = require('node:assert/strict');
const {closeTestBrowser} = require('./grammar-unit-browser-cleanup.cjs');
const never = () => new Promise(() => {});
function fixture(close, kill) {
  const child = {exitCode: null, signalCode: null};
  const calls = [];
  return {
    calls,
    context: {close: async () => {calls.push('context');}},
    server: {
      process: () => child,
      close: async () => {calls.push('close'); await close(); child.exitCode = 0;},
      kill: async () => {calls.push('kill'); await kill(); child.signalCode = 'SIGKILL';}
    }
  };
}
(async () => {
  let f = fixture(() => new Promise(resolve => setTimeout(resolve, 25)), async () => {});
  assert.equal(await closeTestBrowser(f.context, f.server, {gracefulMs: 200}), 'graceful');
  assert.deepEqual(f.calls, ['context', 'close']);
  f = fixture(async () => {}, async () => {});
  const client = {close: async () => {f.calls.push('disconnect');}, isConnected: () => false};
  assert.equal(await closeTestBrowser(f.context, f.server, {client}), 'graceful');
  assert.deepEqual(f.calls, ['context', 'disconnect', 'close']);
  f = fixture(async () => {}, async () => {});
  await assert.rejects(closeTestBrowser(f.context, f.server, {
    client: {close: async () => {}, isConnected: () => true}
  }), /context\/client cleanup failed/);

  f = fixture(never, async () => {});
  assert.equal(await closeTestBrowser(f.context, f.server, {gracefulMs: 10, forcedMs: 100}), 'forced');
  assert.deepEqual(f.calls, ['context', 'close', 'kill']);
  f = fixture(never, never);
  await assert.rejects(closeTestBrowser(f.context, f.server, {gracefulMs: 10, forcedMs: 10}), /cleanup failed/);
  f = fixture(async () => {}, async () => {});
  f.context.close = async () => {throw new Error('Context failed');};
  await assert.rejects(closeTestBrowser(f.context, f.server), /context\/client cleanup failed/);
  assert.deepEqual(f.calls, ['close']);
  f = fixture(async () => {}, async () => {});
  f.server.close = async () => {};
  await assert.rejects(closeTestBrowser(f.context, f.server), /still running/);
  console.log('PASS slow graceful exit, forced recovery, cleanup failure, context failure and live-process detection');
})().catch(error => {console.error(error); process.exitCode = 1;});
