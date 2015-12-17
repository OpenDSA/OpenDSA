/*global window */
(function() {
  "use strict";
  var av,             // The JSAV object
      answerArr = [], // The (internal) array that stores the correct answer
      cloneArr = [],  // A copy of the (internal) array at the start of the exercise for reset
      jsavArr,        // The array that the user manipulates (JSAV object)
      selectedIndex; // Position that has been selected by user for swap

  var bubsortPRO = {
    userInput: null, // Boolean: Tells us if user ever did anything

    // Initialise the exercise
    initJSAV: function(arr_size) {
      var i;
      bubsortPRO.userInput = false;
      selectedIndex = -1;

      answerArr.length = 0; // Out with the old
      // Give random numbers in range 0..999
      for (i = 0; i < arr_size; i++) {
        answerArr[i] = Math.floor(Math.random() * 1000);
      }
      cloneArr = answerArr.slice(0);      // Now make a copy

      reset();

      // Compute the correct Answer
      for (i = 0; i < arr_size - 1; i++) {
        if (answerArr[i] > answerArr[i + 1]) {
          swap(answerArr, i, i + 1);
        }
      }

      // Set up handler for reset button
      $("#reset").click(function() { reset(); });
    },

    // Check student's answer for correctness: User's array must match answer
    checkAnswer: function(arr_size) {
      var i;
      for (i = 0; i < arr_size; i++) {
        if (jsavArr.value(i) !== answerArr[i]) {
          return false;
        }
      }
      return true;
    }
  };

  // Click event handler on the array
  function clickHandler(index) {
    if (selectedIndex === -1) { // if nothing currently selected
      jsavArr.css(index, {"font-size": "130%"});
      jsavArr.highlight(index);
      selectedIndex = index;
    } else if (selectedIndex === index) {
      jsavArr.css(index, {"font-size": "100%"});
      jsavArr.unhighlight(index);
      selectedIndex = -1;
    } else {
      jsavArr.unhighlight(selectedIndex);
      jsavArr.swap(selectedIndex, index);
      jsavArr.css(index, {"font-size": "100%"});
      jsavArr.css(selectedIndex, {"font-size": "100%"});
      selectedIndex = -1; // Reset to nothing selected
    }
    bubsortPRO.userInput = true;
  }

  // reset function definition
  function reset() {
    // Clear the old JSAV canvas.
    if ($("#BubsortPRO")) { $("#BubsortPRO").empty(); }

    // Set up the display
    av = new JSAV("BubsortPRO");
    jsavArr = av.ds.array(cloneArr, {indexed: true, center: false});
    av.displayInit();
    av.recorded();

    jsavArr.click(clickHandler); // (Re)-bind click handler
    bubsortPRO.userInput = false;
    selectedIndex = -1; // Reset to nothing selected
  }

  // swap two values in array
  function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  window.bubsortPRO = window.bubsortPRO || bubsortPRO;
}());
