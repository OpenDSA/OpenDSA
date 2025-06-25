requirejs.config({
  waitSeconds: 200,
  paths: {
    "jquery": "../../khan-exercises/local-only/jquery",
  },
  packages: [{
    name: "codemirror",
    location: "../../lib/CodeMirror-5.5.0/",
    main: "lib/codemirror"
  }, {
    name: "jsav",
    location: "../../lib",
    main: "JSAV-min"
  }, {
    name: "blockUI",
    location: "../../lib",
    main: "jquery.blockUI"
  }, {
    name: "timeme",
    location: "../../lib",
    main: "timeme"
  }]
});

requirejs([
  "jquery",
  "../../khan-exercises/local-only/katex/katex.js",
  "../../khan-exercises/local-only/underscore.js",
  "../../khan-exercises/local-only/jed.js",
  "../../khan-exercises/local-only/localeplanet/icu." + getLang() + ".js",
  "../../khan-exercises/local-only/moment.js"
], function ($, katex) {
  window.katex = katex;

  // These scripts depend on jQuery or underscore, so we wait to load them
  requirejs([
    "../../khan-exercises/exercises-stub.js",
    "../../khan-exercises/local-only/jquery-migrate-1.1.1.js",
    "../../khan-exercises/local-only/jquery-ui.js",
    "../../khan-exercises/local-only/jquery.qtip.js",
    "../../khan-exercises/local-only/kas.js",
    "../../khan-exercises/local-only/i18n.js"
  ], function () {
    requirejs([
      "../../khan-exercises/history.js",
      "../../khan-exercises/interface.js"
    ], function () {
      requirejs(["../../khan-exercises/khan-exercise.js"], function () {
        requirejs(["../../lib/timeme-min.js"], function () {
          requirejs(["../../lib/odsaKA-min.js"], function () {
            Khan.odsaLoadExercises();
          });
        });
      });
    });
  });
});

function getLang() {
  var match = /[?&]lang=([^&]+)/.exec(window.location.search);
  return match ? match[1] : "en-US";
};
