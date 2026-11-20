/*
   Grades DFA and NFA construction exercises by language equivalence.

   The exercise's "solution" .jff is the answer key. The student's machine is
   correct exactly when it accepts the same strings as the key. When it doesn't,
   the grader returns the shortest string the two machines disagree on, so the
   student can be told e.g. "your machine accepts bbbb, but it should reject it".

   Uses existing FiniteAutomaton code (DataStructures/FLA/FA.js):
   loadFAFromJFLAPFile, isDFA, convertNFAtoDFA and minimizeDFA.

   Usage: var result = FAGrader.grade(studentFA, exercise);
          var score = FAGrader.scoreFor(result);
*/
var FAGrader = (function ($) {
  "use strict";

  var keyCache = {};   // answer key path -> {min, error}
  var $scratch = null; // off-screen area for graphs the student never sees

  // Off-screen (not display:none) so JSAV layout code still gets real sizes.
  function scratchArea() {
    if (!$scratch) {
      $scratch = $('<div aria-hidden="true" class="faGraderScratch">')
        .css({position: "absolute", left: "-10000px", top: 0, width: "800px", height: "600px", overflow: "hidden"})
        .appendTo("body");
    }
    return $scratch;
  }

  // A separate JSAV instance, so hidden graphs never touch the exercise's own animation.
  // className lets grade() remove the student's temporary graphs while keeping the cached answer key.
  function newHiddenJsav(className) {
    var $el = $("<div>").addClass(className || "").appendTo(scratchArea());
    var jsav = new JSAV($el);
    jsav.recorded();
    return jsav;
  }

  // Returns a DFA for the same language: the machine itself if it is already a DFA.
  function toDFA(fa, jsav) {
    fa.updateAlphabet();
    if (FiniteAutomaton.isDFA(fa)) {
      return fa;
    }
    var dfa = FiniteAutomaton.convertNFAtoDFA(jsav, fa, {width: 800, height: 600});
    dfa.updateAlphabet();
    return dfa;
  }

  // Loads the answer key once per page and keeps its minimized DFA.
  function loadKey(path) {
    if (keyCache[path]) {
      return keyCache[path];
    }
    var entry;
    if (!path) {
      entry = {error: 'This exercise has no answer key ("solution" is empty in its JSON).'};
    } else {
      // loadFAFromJFLAPFile rewrites URLs on the scoring server by splitting on "/AV",
      // so give it an absolute URL. Relative paths like "../../../machines/..." contain no "/AV".
      var url = new URL(path, window.location.href).href;
      var jsav = newHiddenJsav();
      var fa = jsav.ds.FA({width: 800, height: 600, layout: "manual"});
      // The loader reports a bad file with alert(). Catch that message so a broken answer key
      // shows up as a grading error, not as a confusing popup for the student.
      var loadError = null;
      var originalAlert = window.alert;
      window.alert = function (msg) { loadError = msg; };
      try {
        fa.loadFAFromJFLAPFile(url);
      } catch (e) {
        loadError = e.message;
      } finally {
        window.alert = originalAlert;
      }
      if (loadError || !fa.initial) {
        entry = {error: "Could not load the answer key " + path + (loadError ? ": " + loadError : ".")};
      } else {
        entry = {min: FiniteAutomaton.minimizeDFA(toDFA(fa, jsav))};
      }
    }
    keyCache[path] = entry;
    return entry;
  }

  /*
    Shortest string on which two minimized DFAs (the plain data minimizeDFA returns) disagree,
    or null if they accept the same language. Breadth-first over pairs of states, so the
    first difference found is a shortest one.
    The alphabets may differ: a symbol a machine doesn't use sends it to a dead state.
  */
  function findCounterexample(student, key) {
    var alphabet = _.union(student.alphabet, key.alphabet).sort();
    var step = function (m, state, symbol) {
      if (state === null || m.alphabet.indexOf(symbol) === -1) { return null; }
      return m.trans[state][symbol];
    };
    var accepts = function (m, state) { return state !== null && m.final.has(state); };

    var queue = [{s: student.start, k: key.start, input: ""}];
    var seen = {};
    seen[JSON.stringify([student.start, key.start])] = true;
    while (queue.length > 0) {
      var cur = queue.shift();
      var studentAccepts = accepts(student, cur.s);
      if (studentAccepts !== accepts(key, cur.k)) {
        return {input: cur.input, studentAccepts: studentAccepts};
      }
      for (var i = 0; i < alphabet.length; i++) {
        var next = {s: step(student, cur.s, alphabet[i]), k: step(key, cur.k, alphabet[i]), input: cur.input + alphabet[i]};
        var id = JSON.stringify([next.s, next.k]);
        if (!seen[id]) {
          seen[id] = true;
          queue.push(next);
        }
      }
    }
    return null;
  }

  /*
    Grades the student's machine against the exercise's answer key.
    exercise: the exercise object from its JSON (uses "solution" and "exerciseType").
    Returns {correct, notDFA, counterexample, error}:
      correct:        true when the student's machine accepts exactly the key's language
      notDFA:         true when a DFA exercise was answered with an NFA
      counterexample: {input, studentAccepts} for the shortest string they disagree on, else null
      error:          a message when grading could not run (missing initial state, bad answer key)
  */
  function grade(studentFA, exercise) {
    var result = {correct: false, notDFA: false, counterexample: null, error: null};
    if (!studentFA.initial) {
      result.error = "Your machine needs an initial state.";
      return result;
    }
    studentFA.updateAlphabet();
    if (exercise.exerciseType === "DFA" && !FiniteAutomaton.isDFA(studentFA)) {
      result.notDFA = true;
      return result;
    }
    var key = loadKey(exercise.solution);
    if (key.error) {
      result.error = key.error;
      return result;
    }
    try {
      var studentMin = FiniteAutomaton.minimizeDFA(toDFA(studentFA, newHiddenJsav("faGraderStudent")));
      result.counterexample = findCounterexample(studentMin, key.min);
      result.correct = result.counterexample === null;
    } finally {
      // A converted student graph is only needed for this one check.
      scratchArea().children(".faGraderStudent").remove();
    }
    return result;
  }

  // Right or wrong for now. Partial credit, if it is ever wanted, only needs changing here.
  function scoreFor(result) {
    return result.correct ? 1 : 0;
  }

  return {grade: grade, scoreFor: scoreFor, findCounterexample: findCounterexample};
}(jQuery));
