// End-to-end check of the SPLICE relay in OpenDSA-DevStack:
// LTI launch -> module page (odsaMOD) -> KA exercise iframe -> OpenDSA-LTI.
//
// Launches the KA exercise three times as a student (headless Chrome), answers
// once, and checks that:
//   - every request to the score server is made by the module page, none by
//     the exercise iframe;
//   - the attempt is saved and the score shown in the exercise is updated;
//   - after a reload the saved sub-question comes back.
//
// Usage (after `rake splice_e2e:setup` and `rake splice_e2e:launch` in the
// opendsa-lti container; see README.md):
//   node tools/splice-e2e/lti_e2e.mjs [launch_page_url]
// Needs Node 18+ (built-in fetch/WebSocket; Node 21+ or --experimental-websocket)
// and Chrome (set CHROME_PATH if it is not in the default location).
import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const LAUNCH = process.argv[2] || 'https://opendsa.localhost.devcom.vt.edu/Books/splice-e2e/launch.html';
const EXERCISE = 'MisSumm';
const PORT = 9333;
const CHROME = process.env.CHROME_PATH ||
  ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome', '/usr/bin/chromium']
    .find(p => existsSync(p));
const sleep = ms => new Promise(r => setTimeout(r, ms));

if (!CHROME) { console.error('Chrome not found: set CHROME_PATH'); process.exit(2); }

const chrome = spawn(CHROME, ['--headless=new', '--disable-gpu', `--remote-debugging-port=${PORT}`,
  '--ignore-certificate-errors', `--user-data-dir=${mkdtempSync(join(tmpdir(), 'splice-e2e-'))}`, 'about:blank'],
  { stdio: 'ignore' });

// ---- minimal Chrome DevTools Protocol client ----
let ws, nextId = 1;
const pending = new Map(), listeners = [];
async function connect() {
  for (let i = 0; i < 50; i++) {
    try {
      const targets = await (await fetch(`http://127.0.0.1:${PORT}/json`)).json();
      const page = targets.find(t => t.type === 'page');
      if (page) {
        ws = new WebSocket(page.webSocketDebuggerUrl);
        await new Promise(r => ws.addEventListener('open', r));
        ws.addEventListener('message', e => {
          const msg = JSON.parse(e.data);
          if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
          else listeners.forEach(l => l(msg));
        });
        return;
      }
    } catch (err) { /* Chrome not up yet */ }
    await sleep(200);
  }
  throw new Error('Chrome did not start');
}
const send = (method, params = {}) => new Promise(r => {
  const id = nextId++; pending.set(id, r); ws.send(JSON.stringify({ id, method, params }));
});
async function evaluate(expr) {
  const res = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
  return res.result && res.result.result ? res.result.result.value : undefined;
}

// What the KA exercise iframe shows (same origin as the module page)
const KA_STATUS = `(() => {
  const f = document.getElementById('${EXERCISE}_iframe');
  if (!f || !f.contentDocument) return {ready: false, url: location.href};
  const d = f.contentDocument, w = f.contentWindow;
  const btn = d.getElementById('check-answer-button');
  const p = d.querySelector('#workarea > [id]');
  return {ready: !!(btn && !btn.disabled && p), problem: p ? p.id : null,
          score: (d.getElementById('points-progress') || {}).textContent,
          threshold: (d.getElementById('points-total') || {}).textContent};
})()`;

async function launchAndWait(label) {
  await send('Page.navigate', { url: LAUNCH });
  let s;
  for (let i = 0; i < 120; i++) {
    await sleep(500);
    s = await evaluate(KA_STATUS);
    if (s && s.ready) break;
  }
  console.log(`[${label}] ${JSON.stringify(s)}`);
  return s;
}

const requests = [], pageErrors = [];
let topFrameId = null;
listeners.push(msg => {
  if (msg.method === 'Network.requestWillBeSent') {
    const url = msg.params.request.url;
    if (/odsa_exercise_(attempts|progresses)/.test(url)) {
      requests.push({ method: msg.params.request.method, url: url.replace(/^https?:\/\/[^/]+/, ''),
                      by: msg.params.frameId === topFrameId ? 'module page' : 'IFRAME' });
    }
  } else if (msg.method === 'Runtime.exceptionThrown') {
    const d = msg.params.exceptionDetails;
    pageErrors.push((d.exception && d.exception.description) || d.text);
  }
});

let passed = false;
try {
  await connect();
  await send('Page.enable'); await send('Network.enable'); await send('Runtime.enable');
  topFrameId = (await send('Page.getFrameTree')).result.frameTree.frame.id;

  const first = await launchAndWait('launch 1');
  if (!first || !first.ready) throw new Error('the KA exercise never became ready (is the launch page fresh? rerun rake splice_e2e:launch)');

  // Answer (first choice, or 0) and check it
  await evaluate(`(() => {
    const d = document.getElementById('${EXERCISE}_iframe').contentDocument;
    const input = d.querySelector('#solutionarea input, #answerform input');
    if (input && input.type === 'radio') input.checked = true; else if (input && input.value === '') input.value = '0';
    d.getElementById('check-answer-button').click();
  })()`);
  await sleep(4000);
  const afterAttempt = await evaluate(KA_STATUS);
  console.log(`[after attempt] ${JSON.stringify(afterAttempt)} (score was ${first.score}; it rises only for a correct first try)`);

  const second = await launchAndWait('launch 2');
  const third = await launchAndWait('launch 3 (no answer in between)');

  console.log('\nRequests to the score server:');
  requests.forEach(r => console.log(`  ${r.by.padEnd(11)} ${r.method} ${r.url}`));
  if (pageErrors.length) console.log('\nPage errors:\n  ' + pageErrors.join('\n  '));

  const checks = [
    ['the exercise iframe made no score-server requests', requests.length > 0 && requests.every(r => r.by === 'module page')],
    ['the attempt was relayed to the server', requests.some(r => r.method === 'POST' && r.url === '/odsa_exercise_attempts')],
    ['the exercise shows the score sent back by the server', !!afterAttempt && /^\d+$/.test(afterAttempt.score || '')],
    ['the saved sub-question came back after a reload', !!(second && third && second.problem && second.problem === third.problem)],
    ['no errors on the pages', pageErrors.length === 0],
  ];
  console.log('');
  checks.forEach(([name, ok]) => console.log(`${ok ? 'PASS' : 'FAIL'} ${name}`));
  passed = checks.every(([, ok]) => ok);
  console.log(`\nRESULT: ${passed ? 'PASS' : 'FAIL'}`);
} catch (err) {
  console.log('ERROR: ' + err.message);
} finally {
  chrome.kill();
  process.exit(passed ? 0 : 1);
}
