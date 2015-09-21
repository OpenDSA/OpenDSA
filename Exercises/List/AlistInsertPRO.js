/*global JSAV, window */
(function() {
  "use strict";
  var av,           // The JSAV object
      answerArr = [],   // The (internal) array that stores the correct answer
      cloneArr = [],    // Copy of (internal) array at start of exercise for reset
      jsavArr,          // The array that the user manipulates (JSAV object)
      inPosition,       // insertion location
      inValue,          // insertion value
      selected_index;   // Position that has been selected by user for swap

  var alistInsertPRO = {
    userInput: null,        // Boolean: Tells us if user ever did anything

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
      alistInsertPRO.userInput = true;
    },

    // Insert button handler
    insert: function() {
      if (selected_index !== -1) { // Do nothing if not selected
        jsavArr.value(selected_index, inValue);
        jsavArr.css(selected_index, {"background-color": "#ddd"});
        jsavArr.css(selected_index, {"font-size": "100%"});
        jsavArr.unhighlight(selected_index);
        selected_index = -1;
        alistInsertPRO.userInput = true;
      }
    },

    // reset function definition
    reset: function() {
      if (jsavArr) { jsavArr.clear(); }
      // (Re-)initialize the displayed array object
      jsavArr = av.ds.array(cloneArr, {indexed: true, center: false, top: 20, left: 5});
      jsavArr.click(alistInsertPRO.clickHandler); // (Re-)bind click handler
      alistInsertPRO.userInput = false;
      selected_index = -1;
    },

    // Initialise the exercise
    initJSAV: function(arr_size, insertPos, insertValue) {
      var i;

      inPosition = insertPos;
      inValue = insertValue;
      answerArr.length = 0; // Out with the old

      // Give random numbers in range 0..999
      for (i = 0; i < arr_size; i++) {
        answerArr[i] = Math.floor(Math.random() * 1000);
      }

      answerArr.push.apply(answerArr, ["", "", "", ""]); // Put blanks on end
      // Now make a copy
      cloneArr = answerArr.slice(0);

      av = new JSAV("AlistInsertPRO");
      av.recorded();
      av.SPEED = 120; // Set the speed of the animation

      av.ds.array([inPosition], {left: 45, top: 85}); // Array for "curr"
      av.label("curr", {left: 10, top: 90});

      // correct answer
      answerArr.splice(inPosition, 0, inValue);

      alistInsertPRO.reset();
      // Set up handler for reset button
      $("#reset").click(function() { alistInsertPRO.reset(); });
      $("#insert").click(function() { alistInsertPRO.insert(); });
    },

    // Check user's answer for correctness: User's array must match answer
    checkAnswer: function() {
      var i;
      for (i = 0; i < jsavArr.size(); i++) {
        if (jsavArr.value(i) !== answerArr[i]) {
          return false;
        }
      }
      return true;
    }
  };

  window.alistInsertPRO = window.alistInsertPRO || alistInsertPRO;
}());
