/*global window hashProbeKA */
(function() {
  "use strict";
  var av,               // The JSAV object
      solutionArr = [], // The (internal) array that stores the correct answer
      studentArr = [],  // A copy of the (internal) array at the start of the exercise for reset
      jsavArr,          // The array that the user manipulates (JSAV object)
      permutation;      // The array that holds the permutation

  var hashPseudoRandomPPRO = {
    currentKey: null,     // the value that is inserted
    userInput: null,

    randomizePermutation: function(arrSize) {
      var i, tmp, rand1, rand2;
      permutation = [];
      // initialize permutation
      for (i = 0; i < arrSize; i++) {
        permutation[i] = i;
      }
      // randomly swap values
      for (i = 3 * arrSize; i--;) {
        rand1 = JSAV.utils.rand.numKey(1, arrSize - 1);
        rand2 = JSAV.utils.rand.numKey(1, arrSize - 1);
        tmp = permutation[rand1];
        permutation[rand1] = permutation[rand2];
        permutation[rand2] = tmp;
      }
      return permutation;
    },

    // Initialise the exercise
    initJSAV: function(arrSize) {
      var randomData = hashProbeKA.randomizeInputData(pseudoRandomProbing, arrSize);

      // Get the correct solution
      solutionArr = randomData[2];
      studentArr = randomData[0];
      // store the value student needs to insert
      hashPseudoRandomPPRO.currentKey = randomData[1];

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
    jsavArr.value(index, hashPseudoRandomPPRO.currentKey);
    hashPseudoRandomPPRO.userInput = true;
  }

  // reset function definition
  function reset() {
    // Clear the old JSAV canvas.
    if ($("#HashPseudoRandomPPRO")) { $("#HashPseudoRandomPPRO").empty(); }

    // Set up the display
    av = new JSAV("HashPseudoRandomPPRO");
    jsavArr = av.ds.array(studentArr, {indexed: true, center: false});
    av.displayInit();
    av.recorded();

    jsavArr.click(clickHandler);      // (Re-)Bind the array clickHandler
    hashPseudoRandomPPRO.userInput = false;
  }

  function pseudoRandomProbing(i) {
    return permutation[i];
  }

  window.hashPseudoRandomPPRO = window.hashPseudoRandomPPRO || hashPseudoRandomPPRO;
}());
