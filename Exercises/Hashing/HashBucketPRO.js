/*global window */
(function() {
  "use strict";
  var av,               // The JSAV object
      inputkey,         // The value that the user is inserting
      arrSize,          // Hash table size
      overflowSize,     // Overflow array size
      initData = [],    // The original problem instance (for reset)
      answer = [],      // The answer array
      answerOver = [],  // Overflow answer array
      jsavInput,        // JSAV array for hash table
      jsavOverflow,     // JSAV array for overflow
      empty = [],       // Dummy for empty data to reset hash table
      empty8 = [];      // Dummy for empty data for overflow

  var hashingBucketPRO = {
    userInput: null,        // Boolean: Tells us if user ever did anything

    // Do the one-time initializations
    initJSAV: function(key, steps) {
      var i;

      hashingBucketPRO.userInput = false;
      inputkey = key;
      arrSize = 10;
      overflowSize = 8;
      for (i = 0; i < arrSize; i++) { empty[i] = ""; }
      for (i = 0; i < overflowSize; i++) { empty8[i] = ""; }
      genInstance(steps);

      reset();

      // Set up handler for reset button
      $("#reset").click(function() { reset(); });
    },

    // Check user's answer for correctness
    checkAnswer: function() {
      var i;
      for (i = 0; i < arrSize; i++) {
        if (jsavInput.value(i) !== answer[i]) {
          return false;
        }
      }
      for (i = 0; i < overflowSize; i++) {
        if (jsavOverflow.value(i) !== answerOver[i]) {
          return false;
        }
      }
      return true;
    }
  };

  // Handle a click event on an array
  // Place the value where user puts it
  function clickHandler(index) {
    this.value(index, inputkey);
    hashingBucketPRO.userInput = true;
  }

  // reset function definition
  function reset() {
    var i;
    var offset = 103;
    var boxHeight = 58;
    var labelOffset = 50;
    // Clear the old JSAV canvas.
    if ($("#HashingBucketPRO")) { $("#HashingBucketPRO").empty(); }

    // Set up the display
    av = new JSAV("HashingBucketPRO");
    av.label("Hash Table", {left: 0, top: 0});
    av.label("<b style='color:#0b0;'>B0</b>", {left: 80, top: labelOffset + 0 * boxHeight});
    av.label("<b style='color:#0b0;'>B1</b>", {left: 80, top: labelOffset + boxHeight});
    av.label("<b style='color:#0b0;'>B2</b>", {left: 80, top: labelOffset + 2 * boxHeight});
    av.label("<b style='color:#0b0;'>B3</b>", {left: 80, top: labelOffset + 3 * boxHeight});
    av.label("<b style='color:#0b0;'>B4</b>", {left: 80, top: labelOffset + 4 * boxHeight});
    for (i = 0; i < 4; i++) {
      av.g.line(20, offset + (i * 58), 70, offset + (i * 58), {"stroke-width": 2});
    }
    // Array initializations
    jsavInput = av.ds.array(initData, {indexed: true, center: false,
                                       layout: "vertical", left: 20, top: 30});
    jsavInput.addClass([0, 1, 4, 5, 8, 9], "greybg");
    jsavInput.click(clickHandler);
    jsavOverflow = av.ds.array(empty8, {indexed: true, center: false,
                                        layout: "vertical", left: 200, top: 30});
    av.label("Overflow", {left: 190, top: 0});
    jsavOverflow.click(clickHandler);

    av.displayInit();
    av.recorded();

    // Re-initialize the arrays
    //    for (i = 0; i < arrSize; i++) {
    //      jsavInput.value(i, initData[i]);
    //    }
    //    for (i = 0; i < overflowSize; i++) {
    //      jsavOverflow.value(i, "");
    //    }
    hashingBucketPRO.userInput = false;
  }

  // Initialize the problem instance (and set the answer arrays)
  // Original bucket hash method
  function genInstance(steps) {
    var i, k;
    for (i = 0; i < overflowSize; i++) {
      answerOver[i] = empty8[i];
    }
    for (i = 0; i < arrSize; i++) {
      answer[i] = empty[i];
    }
    if ((steps === 1) || (steps === 2)) { // Make a collision
      k = JSAV.utils.rand.numKey(0, 1000);
      while ((k % 5) !== (inputkey % 5)) { k = JSAV.utils.rand.numKey(0, 1000); }
      answer[(inputkey % 5) * 2] = k;
    }
    if (steps === 2) { // Put it in the other slot of this bucket
      k = JSAV.utils.rand.numKey(0, 1000);
      while ((k % 5) !== (inputkey % 5)) { k = JSAV.utils.rand.numKey(0, 1000); }
      answer[(inputkey % 5) * 2 + 1] = k;
    }
    for (i = 0; i < (5 - steps); i++) {
      k = JSAV.utils.rand.numKey(0, 1000);
      while ((k % 5) === (inputkey % 5)) { k = JSAV.utils.rand.numKey(0, 1000); }
      answer[(k % 5) * 2] = k;
    }
    initData = answer.slice(0);
    if (steps === 0) {
      answer[(inputkey % 5) * 2] = inputkey;
    } else if (steps === 1) {
      answer[(inputkey % 5) * 2 + 1] = inputkey;
    } else { // steps === 2
      answerOver[0] = inputkey;
    }
  }

  window.hashingBucketPRO = window.hashingBucketPRO || hashingBucketPRO;
}());
