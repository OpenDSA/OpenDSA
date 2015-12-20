/*global window */
(function() {
  "use strict";
  var av,         // The JSAV object
      answerArr,  // The (internal) array that will store the correct answer
      cloneArr,   // Copy of the (internal) array at the start of exercise for reset
      jsavArr,    // The (visible) JSAV array
      selIndex;   // Position that has been selected by user for swap

  var quicksortPartitPRO = {
    userInput: null,  // Boolean: Tells us if user ever did anything

    // Initialize JSAV library
    initJSAV: function(alength) {
      // Set up the problem
      answerArr = JSAV.utils.rand.numKeys(0, 999, alength);
      var pivotIndex = Math.floor(alength / 2);
      swap(answerArr, pivotIndex, alength - 1);
      var pivot = answerArr[alength - 1];
      // Now, make a copy
      cloneArr = answerArr.slice(0);

      // Make the answer (do partition)
      var left = 0;
      var right = alength - 1;
      while (left <= right) { // Move bounds inward until they meet
        while (answerArr[left] < pivot) { left++; }
        while ((right >= left) && (answerArr[right] >= pivot)) { right--; }
        if (right > left) { swap(answerArr, left, right); } // Swap out-of-place values
      }

      reset(alength);

      $("#reset").click(function() { reset(alength); }); // clickHandler for reset button
    },

    // function that validates student's answer
    checkAnswer: function(alength) {
      var i;
      for (i = 0; i < alength; i++) {
        if (jsavArr.value(i) !== answerArr[i]) {
          return false;
        }
      }
      return true;
    }

  };

  // swap two values in array
  function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  // function to handle a click event on an array
  function clickHandler(index) {
    if (selIndex === -1) { // if nothing currently selected
      jsavArr.css(index, {"font-size": "130%"});
      selIndex = index;
    } else {
      jsavArr.swap(selIndex, index);
      jsavArr.css(index, {"font-size": "100%"});
      jsavArr.css(selIndex, {"font-size": "100%"});
      selIndex = -1;  // Reset to nothing selected
    }
    quicksortPartitPRO.userInput = true;
  }

  // reset function
  function reset(alength) {
    // Clear the old JSAV canvas.
    if ($("#QuicksortPartitPRO")) { $("#QuicksortPartitPRO").empty(); }

    // Set up the display
    av = new JSAV("QuicksortPartitPRO");
    quicksortPartitPRO.userInput = false;
    jsavArr = av.ds.array(cloneArr, {indexed: true, center: false});
    jsavArr.highlight(alength - 1);
    jsavArr.click(clickHandler);   // bind clickHandler for the array
    av.displayInit();
    av.recorded();

    selIndex = -1;
    quicksortPartitPRO.userInput = false;
  }

  window.quicksortPartitPRO = window.quicksortPartitPRO || quicksortPartitPRO;
}());
