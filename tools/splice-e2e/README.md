# SPLICE relay end-to-end test (local, no Canvas)

Checks the whole path a KA exercise now uses, on your own machine:

```
KA exercise iframe --SPLICE--> module page (odsaMOD) --HTTP--> OpenDSA-LTI --> database
```

A student is launched into a small test book exactly as Canvas would launch
them (a signed LTI 1.0 launch), then a headless Chrome answers a question and
reloads. The test passes when:

- every request to the score server comes from the module page, none from the
  exercise iframe;
- the attempt reaches the server and the exercise shows the score sent back;
- after a reload, the saved sub-question comes back;
- no errors occur on the pages.

Grade passback to a real Canvas course is not covered; test that on staging.

## Requirements

- [OpenDSA-DevStack](https://github.com/OpenDSA/OpenDSA-DevStack) with the `lti`
  profile, using branches that include this change in both `opendsa` and
  `opendsa-lti`
- Node 18+ (Node 21+ recommended; on 18-20 run node with `--experimental-websocket`)
- Google Chrome (set `CHROME_PATH` if it is not in the default location)

## Steps

From the OpenDSA-DevStack directory:

```bash
docker compose --profile lti up                      # leave running; wait for "puma startup"

# in another shell
docker compose exec opendsa-lti rake db:populate     # sample users and courses (resets the dev database)
docker compose exec opendsa-lti rake db:migrate      # if your database predates this change
docker compose exec opendsa-lti rake splice_e2e:setup    # imports and compiles the test book (a few minutes)
docker compose exec opendsa-lti rake splice_e2e:launch   # writes Books/splice-e2e/launch.html

cd opendsa
node tools/splice-e2e/lti_e2e.mjs
```

The last line printed is `RESULT: PASS` or `RESULT: FAIL` (exit code 0 or 1).

The launch page is valid for 24 hours; rerun `rake splice_e2e:launch` to make a
new one. To watch it yourself instead, open
`https://opendsa.localhost.devcom.vt.edu/Books/splice-e2e/launch.html` in a
browser with DevTools open (Network tab).

`rake splice_e2e:launch[example-3@railstutorial.org]` launches a different seeded
student (`example-2` to `example-51`), for a clean progress record.

## Files

- `SpliceRelayTest.json`: the test book (KA `MisSumm` in
  `AlgAnal/AnalMisunderstanding`, plus `SimpleDemo/Tour`)
- `lti_e2e.mjs`: the headless Chrome driver
- The rake tasks live in OpenDSA-LTI: `lib/tasks/splice_e2e.rake` (development only)
