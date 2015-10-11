/*global window hashProbeKA PARAMS */
(function() {
  "use strict";
  var av,           // The JSAV object
      solutionArr = [], // The (internal) array that stores the correct answer
      studentArr = [],  // A copy of the (internal) array at the start of the exercise for reset
      jsavArr;        // The array that the user manipulates (JSAV object)

  var hashLinearPPRO = {
    currentKey: null,     // the value that is inserted
    userInput: null,

    // Initialise the exercise
    initJSAV: function(arrSize) {
      var config = ODSA.UTILS.loadConfig();
console.log("PARAMS: " + PARAMS);
// This is what I want to do:
//      var randomData = hashProbeKA.randomizeInputData(PARAMS["probe"], arrSize);
      var randomData = hashProbeKA.randomizeInputData(linearProbing, arrSize);
      // Get the correct solution
      solutionArr = randomData[2];
      studentArr = randomData[0];
      // store the value student needs to insert
      hashLinearPPRO.currentKey = randomData[1];

      reset();
      // Set up handler for reset button
      $("#reset").click(function() { reset(); });
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
    this.value(index, hashLinearPPRO.currentKey);
    hashLinearPPRO.userInput = true;
  }

  // reset function definition
  function reset() {
    // Clear the old JSAV canvas.
    if ($("#HashLinearPPRO")) { $("#HashLinearPPRO").empty(); }

    // Set up the display
    av = new JSAV("HashLinearPPRO");
    jsavArr = av.ds.array(studentArr, {indexed: true, center: false});
    av.displayInit();
    av.recorded();

    // Bind the clickHandler to handle click events on the array
    jsavArr.click(clickHandler);
    hashLinearPPRO.userInput = false;
  }

  function linearProbing(i) {
    return i;
  }

  window.hashLinearPPRO = window.hashLinearPPRO || hashLinearPPRO;
}());
