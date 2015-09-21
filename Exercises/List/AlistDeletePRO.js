/*global KhanUtil, JSAV, window */
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

  var alistDeletePRO = {
    userInput: null,       // Boolean: Tells us if user ever did anything

    // Click event handler for return 'box'
    copyHandler: function() {
      if (selected_index !== -1) {
        av.effects.moveValue(jsavArr, selected_index, returnArr, 0);
        jsavArr.unhighlight(selected_index);
        jsavArr.css(selected_index, {"background-color": "#ddd"});
        selected_index = -1;
      }
    },

    // Click event handler on the array
    clickHandler: function(index) {
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
        jsavArr.css(index, {"font-size": "100%"});
        jsavArr.unhighlight(index);
        selected_index = -1;  // Reset to nothing selected
      }
      alistDeletePRO.userInput = true;
    },

    // reset function definition
    reset: function() {
      if (jsavArr) { jsavArr.clear(); }
      // Create or re-initialize the displayed array object
      jsavArr = av.ds.array(cloneArr, {indexed: true, center: false, top: 20, left: 1});
      jsavArr.click(alistDeletePRO.clickHandler); // Bind (or re-bind) click handler
      alistDeletePRO.userInput = false;
      selected_index = -1;
    },

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
      delPosition = deletePos;
      answerArr.length = 0; // Out with the old

      // Create the array. Give random numbers in range 0..999
      for (var i = 0; i < arr_size; i++) {
        answerArr[i] = Math.floor(Math.random() * 1000);
      }
      answerArr.push.apply(answerArr, ["", "", "", ""]); // Add some blanks

      // Now make a copy
      cloneArr = answerArr.slice(0);

      // Define the correct answer.
      delValue = answerArr[delPosition]; // The deleted value
      answerArr.splice(delPosition, 1);  // The resulting array
      answerArr.push("");

      av = new JSAV("AlistDeletePRO");
      av.recorded();
      av.SPEED = 120; // Set the speed of animation.

      av.ds.array([delPosition], {left: 45, top: 90});
      av.label("curr", {left: 10, top: 95});
      returnArr = av.ds.array(["null"], {left: 45, top: 125});
      av.label("return", {left: 1, top: 130});

      returnArr.click(alistDeletePRO.copyHandler); // Bind click handler
      alistDeletePRO.reset(); // Complete intialization

      // Set up handler for reset button
      $("#reset").click(function() { alistDeletePRO.reset(); });
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

  window.alistDeletePRO = window.alistDeletePRO || alistDeletePRO;
}());
