/*global window KhanUtil */
// Used by collision resolution proficiency exercises
(function() {
  "use strict";
  var av = null,        // The JSAV object
      arrSize,
      solutionArr = [], // The (internal) array that stores the correct answer
      studentArr = [],  // A copy of the (internal) array at the start of the exercise for reset
      jsavArr;          // The array that the user manipulates (JSAV object)

  var probeCommon = {
    currentKey: null,   // the value that is inserted
    userInput: null,
    probeStep: null,    // For linear probing by steps, the step size
    permutation: null,  // The array that holds the permutation for pseudo-random probing

    // For double hashing
    getH1: function(K) {
      return K % arrSize;
    },

    // For double hashing
    getH2: function(K) {
      return 1 + (K % (arrSize - 1));
    },

    // Initialise the exercise
    initJSAV: function(jname, aSize) {
      arrSize = aSize;
      var probeFunc;
      switch (jname) {
      case "HashLinearPPRO":
        probeFunc = linearProbing;
        break;
      case "HashLinearStepPPRO":
        probeCommon.probeStep = KhanUtil.randRange(2, 4);
        probeFunc = probe_by_step(probeCommon.probeStep);
        break;
      case "HashPseudoRandomPPRO":
        randomizePermutation(arrSize);
        probeFunc = pseudoRandomProbing;
        break;
      case "HashQuadraticPPRO":
        probeFunc = quadraticProbing;
        break;
      case "HashDoublePPRO":
        probeFunc = doubleProbing;
        break;
      default: // Should never get here
        return "";
      }
      var randomData = randomizeInputData(probeFunc);
      // Get the correct solution
      solutionArr = randomData[2];
      studentArr = randomData[0];
      // store the value student needs to insert
      probeCommon.currentKey = randomData[1];

      reset(jname);
      // Set up handler for reset button
      $("#reset").click(function() { reset(jname); });
    },

    // Check student's answer for correctness: User's array must match answer
    checkAnswer: function() {
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
    jsavArr.value(index, probeCommon.currentKey);
    probeCommon.userInput = true;
  }

  function linearProbing(i) {
    return i;
  }

  // reset function definition
  function reset(jname) {
    // Clear the old JSAV canvas.
    if (av !== null) { $("#" + jname).empty(); }

    // Set up the display
    av = new JSAV(jname);
    jsavArr = av.ds.array(studentArr, {indexed: true, center: false});
    av.displayInit();
    av.recorded();

    jsavArr.click(clickHandler);  // (Re-)bind the array clickHandler
    probeCommon.userInput = false;
  }

  // randomize input hash table
  function randomizeInputData(probeFunction) {
    var i,
        // how many indices are tried before success
        tries = JSAV.utils.rand.sample([0, 1, 1, 1, 1, 2, 2, 2, 2, 3], 1)[0],
        arr = [], // store the hashtable in this array
        // randomize the input value for student
        input = JSAV.utils.rand.numKey(100, 999),
        // correct position where the student needs to insert the input value
        inputCorrectPosition = (input + probeFunction(tries, input)) % arrSize,
        val,
        pos,
        count,
        solutionArray,
        reservedIndices = [inputCorrectPosition]; // for tracking which indices are in use

    arr.length = arrSize; // set the size of the array

    // randomize keys to the indices tested by the hash function; as many as we like the student
    // to think about (see tries above)
    for (i = 0; i < tries; i++) {
      pos = (input + probeFunction(i, input)) % arrSize;
      val = JSAV.utils.rand.numKey(120, 900);
      val = val - (val % arrSize) + pos;
      arr[pos] = val;
      reservedIndices.push(pos); // make sure we don't overwrite this index
    }

    // add a random number of other data into the hashtable
    for (i = 0, count = JSAV.utils.rand.numKey(3, Math.ceil(arrSize / 2)); i < count; i++) {
      val = JSAV.utils.rand.numKey(100, 999);
      // make sure we don't put anything especially to the correct position
      if (reservedIndices.indexOf(val % arrSize) === -1) {
        arr[val % arrSize] = val;
        reservedIndices.push(val % arrSize);
      } else {
        i--;
      }
    }
    // replace undefined values with empty strings because jsavArr.value(..) returns
    // empty strings and this makes comparison easier
    arr = $.map(arr, function(item) { return item || ""; });

    // create a duplicate for the solution and add the input to the array
    solutionArray = arr.slice(0);
    solutionArray[inputCorrectPosition] = input;

    // return an array (TODO: this is a bit hacky solution...)
    return [arr, input, solutionArray];
  }

  // return a function with c used as the step
  function probe_by_step(c) {
    return function(i) {
      return c * i;
    };
  }

  function pseudoRandomProbing(i) {
    return probeCommon.permutation[i];
  }

  function quadraticProbing(i) {
    return i * i;
  }

  function doubleProbing(i, K) {
    return (i * (1 + (K % (arrSize - 1)))) % arrSize;
  }

  function randomizePermutation() {
    var i, tmp, rand1, rand2;
    probeCommon.permutation = [];
    // initialize permutation
    for (i = 0; i < arrSize; i++) {
      probeCommon.permutation[i] = i;
    }
    // randomly swap values
    for (i = 3 * arrSize - 1; i >= 0; i--) {
      rand1 = JSAV.utils.rand.numKey(1, arrSize - 1);
      rand2 = JSAV.utils.rand.numKey(1, arrSize - 1);
      tmp = probeCommon.permutation[rand1];
      probeCommon.permutation[rand1] = probeCommon.permutation[rand2];
      probeCommon.permutation[rand2] = tmp;
    }
  }

  window.probeCommon = window.probeCommon || probeCommon;
})();
