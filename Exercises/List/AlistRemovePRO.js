/*global KhanUtil, window */
(function() {
  "use strict";
  var av,              // The JSAV object
      answerArr = [],  // The (internal) array that stores the correct answer
      cloneArr = [],   // Copy of (internal) array at start of exercise for reset
      jsavArr,         // The array that the user manipulates (JSAV object)
      returnArr,       // return box
      delPosition,     // deletion location
      delValue,        // deletion value
      selected_index,  // Position that has been selected by user
      aSize;           // Number of values in array

  var alistRemovePRO = {
    userInput: null,       // Boolean: Tells us if user ever did anything

    getSize: function() {
      var range = KhanUtil.randRange(1, 6);
      if (range === 1) { // Lower the odds on size of 1
        range = KhanUtil.randRange(1, 6);
      }
      aSize = range;
      return range;
    },

    getPos: function() {
      var range = KhanUtil.randRange(0, aSize - 1);
      if (range === (aSize - 1)) { // Lower the odds on being at end
        range = KhanUtil.randRange(0, aSize - 1);
      }
      return range;
    },

    // Initialise the exercise
    initJSAV: function(arr_size, deletePos) {
      var i;
      delPosition = deletePos;
      answerArr.length = 0; // Out with the old

      // Create the array. Give random numbers in range 0..999
      for (i = 0; i < arr_size; i++) {
        answerArr[i] = Math.floor(Math.random() * 1000);
      }
      for (i = 0; i < 4; i++) {
        answerArr.push(""); // Put blanks on end
      }

      // Now make a copy
      cloneArr = answerArr.slice(0);

      // Define the correct answer.
      delValue = answerArr[delPosition]; // The deleted value
      answerArr.splice(delPosition, 1);  // The resulting array
      answerArr.push("");

      reset(); // Complete intialization

      // Set up handler for reset button
      $("#reset").click(function() { reset(); });
    },

    // Check user's answer for correctness: User's array must match answer
    checkAnswer: function(arr_size) {
      if (delValue !== returnArr.value(0)) { return false; }
      for (var i = 0; i < arr_size + 4; i++) {
        if (jsavArr.value(i) !== answerArr[i]) {
          return false;
        }
      }
      return true;
    }
  };

  // reset function definition
  function reset() {
    // Clear the old JSAV canvas.
    if ($("#AlistRemovePRO")) { $("#AlistRemovePRO").empty(); }

    // Set up the display
    av = new JSAV("AlistRemovePRO");
    // (Re-)initialize the displayed array object
    jsavArr = av.ds.array(cloneArr, {indexed: true, center: false, top: 20, left: 1});
    av.ds.array([delPosition], {left: 45, top: 90});
    av.label("curr", {left: 10, top: 95});
    returnArr = av.ds.array(["null"], {left: 45, top: 125});
    av.label("return", {left: 1, top: 130});
    av.displayInit();
    av.recorded();

    jsavArr.click(clickHandler);  // (Re-)Bind click handler
    returnArr.click(copyHandler); // (Re-)Bind click handler
    alistRemovePRO.userInput = false;
    selected_index = -1;
  }

  // Click event handler for return 'box'
  function copyHandler() {
    if (selected_index !== -1) {
      av.effects.moveValue(jsavArr, selected_index, returnArr, 0);
      jsavArr.unhighlight(selected_index);
      jsavArr.css(selected_index, {"background-color": "#ddd"});
      selected_index = -1;
    }
  }

  // Click event handler on the array
  function clickHandler(index) {
    if (selected_index === -1) { // if nothing currently selected
      jsavArr.css(index, {"font-size": "110%"});
      selected_index = index;
      jsavArr.highlight(index);
    } else { // an array element is selected
      // Do not swap for the same index.
      if (selected_index !== index) {
        jsavArr.swap(selected_index, index);
        jsavArr.unhighlight(selected_index);
      }
      jsavArr.css(selected_index, {"font-size": "100%"});
      jsavArr.unhighlight(index);
      selected_index = -1;  // Reset to nothing selected
    }
    alistRemovePRO.userInput = true;
  }

  window.alistRemovePRO = window.alistRemovePRO || alistRemovePRO;
}());
