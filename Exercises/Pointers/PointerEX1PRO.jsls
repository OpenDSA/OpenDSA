/*global window, katex */
(function() {
  "use strict";
  var av,               // The JSAV object
      answerIndex = [], // The current order for the user's functions
      cloneArr = [],    // The display functions, in original order
      cloneIndex = [],  // Original order of the indices for the functions
      employee = [],   // The list of functions to choose from
      jsavArr,          // The array that the user manipulates (JSAV object)
      selected_index;   // Position that has been selected by user for swap

  // These are things that need to be accessed from the HTML file
  var growthRatesPRO = {
    userInput: null,      // Boolean: Tells us if user ever did anything

    // Initialise the exercise
    initJSAV: function(arr_size) {
      employee = [
        "[John, 1000]",
        "[Sam, 2000]",
      ];

      // Out with the old
      cloneIndex.length = 0;
      cloneArr.length = 0;

      reset();

      // Set up handler for reset button
      $("#reset").click(function() { reset(); });
    },

    // Check student's answer for correctness: User's array must match answer
    checkAnswer: function(arr_size) {
      var i;
      for (i = 0; i < (arr_size - 1); i++) {
        if (answerIndex[i] > answerIndex[i + 1]) {
          return false;
        }
      }
      return true;
    }
  };

  // Click event handler on the array
  function clickHandler(index) {
    if (selected_index === -1) { // if nothing currently selected
      jsavArr.css(index, {"font-size": "130%"});
      selected_index = index;
    } else {
      jsavArr.css(index, {"font-size": "100%"});
      jsavArr.css(selected_index, {"font-size": "100%"});

      selected_index = -1;  // Reset to nothing selected
    }
    growthRatesPRO.userInput = true;
  }

  // reset function definition
  function reset() {
    // Clear the old JSAV canvas.
    if ($("#GrowtRatesPRO")) { $("#GrowthRatesPRO").empty(); }

    // Set up the display
    av = new JSAV("GrowthRatesPRO");
    av.g.rect(50, 5, 20, 20);
    jsavArr = av.ds.array(cloneArr, {indexed: false, center: true});


    av.displayInit();
    av.recorded();

    // // Bind the clickHandler to handle click events on the array
    // jsavArr.click(clickHandler); // Rebind click handler after reset
    // answerIndex = cloneIndex.slice(0);
    // growthRatesPRO.userInput = false;
    // selected_index = -1;         // Reset to nothing selected
  }

  window.growthRatesPRO = window.growthRatesPRO || growthRatesPRO;
}());
