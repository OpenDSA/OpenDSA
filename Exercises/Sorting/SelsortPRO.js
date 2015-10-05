/*global window */
(function() {
  "use strict";
  var av,             // The JSAV object
      answerArr = [], // The (internal) array that stores the correct answer
      cloneArr = [],  // A copy of the (internal) array at the start of the exercise for reset
      jsavArr,        // The array that the user manipulates (JSAV object)
      selectedIndex;  // Position that has been selected by user for swap

  var selsortPRO = {
    userInput: null,  // Boolean: Tells us if user ever did anything

    initJSAV: function(arrSize, sortPos) {
      var i, j, bigindex;
      answerArr.length = 0; // Out with the old
      // Give random numbers in range 0..999
      for (i = 0; i < arrSize; i++) {
        answerArr[i] = Math.floor(Math.random() * 1000);
      }

      // Do a partial selection sort to set things up
      for (i = arrSize - 1; i > sortPos; i--) {
        bigindex = 0;
        for (j = 1; j <= i; j++) {
          if (answerArr[j] > answerArr[bigindex]) {
            bigindex = j;
          }
        }
        swap(answerArr, bigindex, i);
      }
      // Now make a copy
      cloneArr = answerArr.slice(0);

      reset(sortPos);

      // Compute the correct Answer
      bigindex = 0;
      for (j = 1; j <= sortPos; j++) {
        if (answerArr[j] > answerArr[bigindex]) {
          bigindex = j;
        }
      }
      swap(answerArr, bigindex, sortPos);

      // Set up handler for reset button
      $("#reset").click(function() { reset(sortPos); });
    },

    // Check student's answer for correctness: User's array must match answer
    checkAnswer: function(arrSize) {
      var i;
      for (i = 0; i < arrSize; i++) {
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
      jsavArr.css(selectedIndex, {"font-size": "100%"});
      selectedIndex = -1;  // Reset to nothing selected
    }
    selsortPRO.userInput = true;
  }

  // reset function definition
  function reset(sortPos) {
    // Clear the old JSAV canvas.
    if ($("#SelsortPRO")) { $("#SelsortPRO").empty(); }

    // Set up the display
    av = new JSAV("SelsortPRO");
    jsavArr = av.ds.array(cloneArr, {indexed: true, center: false});
    jsavArr.highlight(sortPos);
    av.displayInit();
    av.recorded();

    jsavArr.click(clickHandler); // (Re-)bind click handler
    selsortPRO.userInput = false;
    selectedIndex = -1;
  }

  // swap two values in array
  function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  window.selsortPRO = window.selsortPRO || selsortPRO;
}());
