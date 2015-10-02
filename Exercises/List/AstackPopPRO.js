/*global JSAV, window */
(function() {
  "use strict";
  var av,             // The JSAV object
      answerArr = [], // The (internal) array that stores the correct answer
      cloneArr = [],  // Copy of (internal) array at start of exercise for reset
      returnVal,      // The correct value that should be returned
      jsavArr,        // The array that the user manipulates (JSAV object)
      returnArr,      // Holds the value to be returned
      topArr,         // JSAV array that holds value for top
      selectedIndex;  // Position that has been selected by user for swap

  // These are things that need to be accessed from the HTML file
  var astackPopPRO = {
    userInput: null,      // Boolean: Tells us if user ever did anything

    // Initialise the exercise
    initJSAV: function(max_size, arr_size) {
      var i;
      astackPopPRO.userInput = false;
      selectedIndex = -1;
      answerArr.length = 0; // Out with the old

      // Give random numbers in range 0..999
      for (i = 0; i < arr_size; i++) {
        answerArr[i] = Math.floor(Math.random() * 1000);
      }
      for (i = 0; i < max_size - arr_size; i++) {
        answerArr.push([""]);
      }
      // Now make a copy
      cloneArr = answerArr.slice(0);

      reset(max_size, arr_size);

      // correct answer
      if (arr_size === 0) {
        returnVal = "";
      } else {
        returnVal = answerArr[arr_size - 1];
      }

      answerArr.splice(arr_size - 1, 0, "");
      answerArr.splice(arr_size, 1);

      // Set up handler for reset button
      $("#reset").click(function() { reset(max_size, arr_size); });
      $("#top").click(function() { settop(); });
    },

    // Check user's answer for correctness
    checkAnswer: function(max_size, arr_size) {
      if (returnArr.value(0) !== returnVal) {
        return false;
      }
      if (arr_size === 0) {
        if (topArr.value(0) !== 0) {
          return false;
        }
      } else if (topArr.value(0) !== (arr_size - 1)) {
        return false;
      }
      var i;
      for (i = 0; i < max_size; i++) {
        if (jsavArr.value(i) !== answerArr[i]) {
          return false;
        }
      }
      return true;
    }
  };

  // reset function definition
  function reset(max_size, arr_size) {
    var leftMargin = 30;
    selectedIndex = -1;

    // Clear the old JSAV canvas.
    if ($("#AstackPopPRO")) { $("#AstackPopPRO").empty(); }

    // Set up the display
    av = new JSAV("AstackPopPRO");
    topArr = av.ds.array([arr_size], {indexed: false, center: false,
                                      left: leftMargin, top: 0});
    jsavArr = av.ds.array(cloneArr, {indexed: true, center: false, top: 50});
    returnArr = av.ds.array([""], {left: 350, top: 50});
    av.label("return", {left: 305, top: 55});
    av.label("top:", {left: 0, top: 2});
    av.displayInit();
    av.recorded();

    // Bind the clickHandler to handle click events on the array
    jsavArr.click(clickHandler);
    returnArr.click(copyHandler);
    astackPopPRO.userInput = false;
  }

  // Handler for set top button
  function settop() {
    if (selectedIndex !== -1) { // Don't do anything if no index selected
      topArr.value(0, selectedIndex);
      jsavArr.css(selectedIndex, {"font-size": "100%"});
      jsavArr.unhighlight(selectedIndex);
      selectedIndex = -1;
    }
  }

  // Click event handler on the array "jsavArr"
  function clickHandler(index) {
    if (selectedIndex === -1) { // nothing currently selected
      // Selecting the current array index
      jsavArr.css(index, {"font-size": "110%"});
      selectedIndex = index;
      jsavArr.highlight(index);
    } else { // Something is already selected
      if (selectedIndex !== index) { // He's swapping
        jsavArr.swap(selectedIndex, index);
        jsavArr.unhighlight(selectedIndex);
        jsavArr.css(selectedIndex, {"font-size": "100%"});
      }
      jsavArr.css(index, {"font-size": "100%"});
      jsavArr.unhighlight(index);
      selectedIndex = -1;  // Reset to nothing selected
    }
    astackPopPRO.userInput = true;
  }

  // Click event handler on the array "returnArr"
  function copyHandler() {
    if (selectedIndex !== -1) {
      av.effects.moveValue(jsavArr, selectedIndex, returnArr, 0);
      jsavArr.css(selectedIndex, {"background-color": "#ddd"});
      jsavArr.css(selectedIndex, {"font-size": "100%"});
      jsavArr.unhighlight(selectedIndex);
      selectedIndex = -1;
      astackPopPRO.userInput = true;
    }
  }

  window.astackPopPRO = window.astackPopPRO || astackPopPRO;
}());
