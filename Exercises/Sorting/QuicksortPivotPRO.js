/*global window */
(function() {
  "use strict";
  var arr; // The JSAV array

  var quicksortPivotPRO = {
    selIndex: -1,

    // Initialize the JSAV array
    initJSAV: function(alength) {
      var av = new JSAV("QuicksortPivotPRO");
      arr = av.ds.array(JSAV.utils.rand.numKeys(0, 999, alength),
                          {indexed: true, center: false});
      // bind the clickHandler to handle click events on the array
      av.displayInit();
      av.recorded();
      arr.click(clickHandler);
      quicksortPivotPRO.selIndex = -1;
    },

    // Validates the student's answer
    checkAnswer: function(alength) {
      var pivot = Math.floor((alength - 1) / 2);
      if (arr.isHighlight(pivot)) {
        return true;
      }
      return false;
    }

  };

  // function to handle a click event on an array
  function clickHandler(index) {
    if (arr.isHighlight(index)) {
      arr.unhighlight(index);
      quicksortPivotPRO.selIndex = -1;
    } else {
      // Unhighlight a previous answer, if applicable
      if (quicksortPivotPRO.selIndex !== -1) {
        arr.unhighlight(quicksortPivotPRO.selIndex);
      }
      arr.highlight(index);
      quicksortPivotPRO.selIndex = index;
    }
  }

  window.quicksortPivotPRO = window.quicksortPivotPRO || quicksortPivotPRO;
}());
