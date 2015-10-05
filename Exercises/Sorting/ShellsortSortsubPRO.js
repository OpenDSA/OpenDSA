/*global window */
(function() {
  "use strict";
  var av,             // The JSAV object
      jsavArr,        // The array that the user manipulates (JSAV object)
      selectedIndex,  // Position that has been selected by user for swap
      answerArr = [], // The (internal) array that stores the correct answer
      cloneArr = [];  // A copy of the (internal) array at the start of the exercise for reset

  var shellsortSortsubPRO = {
    userInput: null,  // Boolean: Tells us if user ever did anything

    // Initialise the exercise
    initJSAV: function(arr_size, incSize, startPos) {
      var i, j;

      answerArr.length = 0; // Out with the old
      // Give random numbers in range 0..999
      for (i = 0; i < arr_size; i++) {
        answerArr[i] = Math.floor(Math.random() * 1000);
      }
      // Now make a copy
      cloneArr = answerArr.slice(0);

      reset(incSize, startPos);

      // compute the correct answer
      for (i = startPos + incSize; i < arr_size; i += incSize) {
        for (j = i; j >= incSize; j -= incSize) {
          if (answerArr[j] < answerArr[j - incSize]) {
            swap(answerArr, j, j - incSize);
          }
        }
      }

      // Set up handler for reset button
      $("#reset").click(function() { reset(incSize, startPos); });
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
      selectedIndex = index;
    } else {
      jsavArr.swap(selectedIndex, index);
      jsavArr.css(index, {"font-size": "100%"});
      jsavArr.css(selectedIndex, {"font-size": "100%"});
      selectedIndex = -1;  // Reset to nothing selected
    }
    shellsortSortsubPRO.userInput = true;
  }

  // reset function definition
  function reset(incSize, startPos) {
    var i;

    // Clear the old JSAV canvas.
    if ($("#ShellsortSortsubPRO")) { $("#ShellsortSortsubPRO").empty(); }

    // Set up the display
    av = new JSAV("ShellsortSortsubPRO");
    jsavArr = av.ds.array(cloneArr, {indexed: true, center: false});
    for (i = startPos; i < jsavArr.size(); i = i + incSize) {
      jsavArr.highlight(i);
    }
    av.displayInit();
    av.recorded();

    jsavArr.click(clickHandler); // (Re-)bind click handler after reset
    selectedIndex = -1;
    shellsortSortsubPRO.userInput = false;
  }

  // swap two values in array
  function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  window.shellsortSortsubPRO = window.shellsortSortsubPRO || shellsortSortsubPRO;
}());
