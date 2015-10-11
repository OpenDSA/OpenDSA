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

  var hashBucket2PRO = {
    userInput: null,        // Boolean: Tells us if user ever did anything

    // Do the one-time initializations
    initJSAV: function(key, steps) {
      var i;

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
    hashBucket2PRO.userInput = true;
  }

  // reset function definition
  function reset() {
    var i;
    var offset = 103;
    var boxHeight = 58;
    var labelOffset = 50;
    // Clear the old JSAV canvas.
    if ($("#HashBucket2PRO")) { $("#HashBucket2PRO").empty(); }

    // Set up the display
    av = new JSAV("HashBucket2PRO");
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

    hashBucket2PRO.userInput = false;
  }

  // Initialize the problem instance (and set the answer arrays)
  // Alternate bucket hash method
  function genInstance(steps) {
    var i, k;
    var slot; // The OTHER slot in the current bucket that does NOT hold inputkey
    if ((inputkey % 2) === 0) {
      slot = (inputkey % arrSize) + 1;
    } else { slot = (inputkey % arrSize) - 1; }
    for (i = 0; i < overflowSize; i++) {
      answerOver[i] = empty8[i];
    }
    for (i = 0; i < arrSize; i++) {
      answer[i] = empty[i];
    }
    if ((steps === 1) || (steps === 2)) { // Make a collision
      k = JSAV.utils.rand.numKey(0, 1000);
      while ((k % arrSize) !== (inputkey % arrSize)) {
        k = JSAV.utils.rand.numKey(0, 1000);
      }
      answer[k % arrSize] = k;
    }
    if (steps === 2) { // Put it in the other slot of this bucket
      k = JSAV.utils.rand.numKey(0, 1000);
      while ((k % arrSize) !== slot) { k = JSAV.utils.rand.numKey(0, 1000); }
      answer[slot] = k;
    }
    var bucket = Math.floor((inputkey % arrSize) / 2);
    for (i = 0; i < 6; i++) { // Randomly put in some more numbers, but
      // not in this bucket
      k = JSAV.utils.rand.numKey(0, 1000);
      if (Math.floor((k % arrSize) / 2) !== bucket) { answer[k % arrSize] = k; }
    }
    initData = answer.slice(0);
    if (steps === 0) {
      answer[inputkey % arrSize] = inputkey;
    } else if (steps === 1) {
      answer[slot] = inputkey;
    } else { answerOver[0] = inputkey; } // steps === 2
  }

  window.hashBucket2PRO = window.hashBucket2PRO || hashBucket2PRO;
}());
