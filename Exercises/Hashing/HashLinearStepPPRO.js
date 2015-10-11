/*global window hashProbeKA */
(function() {
  "use strict";
  var av,               // The JSAV object
      solutionArr = [], // The (internal) array that stores the correct answer
      studentArr = [],  // A copy of the (internal) array at the start of the exercise for reset
      jsavArr;          // The array that the user manipulates (JSAV object)

  var hashLinearStepPPRO = {
    currentKey: null,     // the value that is inserted
    userInput: null,

    // Initialise the exercise
    initJSAV: function(probeStep, arrSize) {
      var randomData = hashProbeKA.randomizeInputData(probe_by_step(probeStep), arrSize);

      // Get the correct solution
      solutionArr = randomData[2];
      studentArr = randomData[0];
      // store the value student needs to insert
      hashLinearStepPPRO.currentKey = randomData[1];

      reset();
      // Set up handler for reset button
      $("#reset").click(function () { reset(); });
    },

    // Check student's answer for correctness: User's array must match answer
    checkAnswer: function(arrSize) {
      var i;
      for (i = 0; i < arrSize; i++) {
        if (jsavArr.value(i) !== solutionArr[i]) {
          return false;
        }
      }
      return true;
    }

  };

  // Click event handler on the array
  function clickHandler(index) {
    jsavArr.value(index, hashLinearStepPPRO.currentKey);
    hashLinearStepPPRO.userInput = true;
  }

  // return a function with c used as the step
  function probe_by_step(c) {
    return function(i) {
      return c * i;
    };
  }

  // reset function definition
  function reset() {
    // Clear the old JSAV canvas.
    if ($("#HashLinearStepPPRO")) { $("#HashLinearStepPPRO").empty(); }

    // Set up the display
    av = new JSAV("HashLinearStepPPRO");
    jsavArr = av.ds.array(studentArr, {indexed: true, center: false});
    av.displayInit();
    av.recorded();

    jsavArr.click(clickHandler);  // (Re-)bind the array clickHandler
    hashLinearStepPPRO.userInput = false;
  }

  window.hashLinearStepPPRO = window.hashLinearStepPPRO || hashLinearStepPPRO;
}());
