/*global window */
(function() {
  "use strict";
  var av, // The JSAV object
      arr_size, // Full array size
      jsavAnswer, // JSAV array that holds answer
      jsavLeft, // JSAV array that holds left data
      jsavRight, // JSAV array that holds right dtaa
      arrdata = [], // The array to be sorted
      arrdata_left = [], // Left side data to merge
      arrdata_right = [], // Right side data to merge
      empty = [], // Dummy for empty data to reset answer array
      left_size, // Size of left array
      isSelected, // Boolean: True iff user has already clicked an array element
      rowHeight = 80, // Space required for each row to be displayed
      rowTop = 30, // Position for top array
      blockWidth = 32, // Width of an array element
      // Variables used to keep track of the index and array of the
      // currently selected element within click handler
      mergeValueIndex = -1,
      mergeValueArr = null;

  var mergesortMergePRO = {
    userInput: null, // Boolean: Tells us if user ever did anything

    initJSAV: function(as) {
      // Do all of the one-time initializations
      arr_size = as;
      empty = new Array(arr_size);
      left_size = Math.floor((arr_size + 1) / 2);
      arrdata = JSAV.utils.rand.numKeys(10, 100, arr_size);
      arrdata_left = arrdata.slice(0, left_size);
      arrdata_left.sort(function(a, b) { return a - b; });
      arrdata_right = arrdata.slice(left_size, arr_size);
      arrdata_right.sort(function(a, b) { return a - b; });
      arrdata.sort(function(a, b) { return a - b; });

      reset();

      // Set up handler for reset button
      $("#reset").click(function() { reset(); });
    },

    checkAnswer: function(asize) {
      var i;
      for (i = 0; i < asize; i++) {
        if (jsavAnswer.value(i) !== arrdata[i]) {
          return false;
        }
      }
      return true;
    }
  };

  function clickHandler(arr, index) {
    if (isSelected === false) {
      // No element is selected, select an element in a bottom array and highlight
      if (arr === jsavAnswer) { // Don't let user select element in answer array
        return;
      }
      if (arr.value(index) === "") { // Don't let the user select an empty element
        return;
      }
      arr.highlight(index);
      isSelected = true;
      mergeValueArr = arr;
      mergeValueIndex = index;
    } else if ((arr === mergeValueArr) && (index === mergeValueIndex)) {
      // Deselect the currently selected element
      arr.unhighlight(index);
      isSelected = false;
    } else { // We must be in top array
      if (arr !== jsavAnswer) {
        return;
      }
      if (arr.value(index) !== "") { // Don't let the user overwrite a merged element
        return;
      }
      arr.value(index, mergeValueArr.value(mergeValueIndex));
      // Clear values the user has already merged
      mergeValueArr.value(mergeValueIndex, "");
      mergeValueArr.unhighlight(mergeValueIndex);
      isSelected = false;
    }
    mergesortMergePRO.userInput = true;
  }

  function reset() {
    // Clear the old JSAV canvas.
    if ($("#MergesortMergePRO")) { $("#MergesortMergePRO").empty(); }

    // Set up the display
    av = new JSAV("MergesortMergePRO");
    jsavAnswer = av.ds.array(empty, {indexed: true, center: false, layout: "array"});
    jsavAnswer.element.css({left: 0, top: rowTop});
    jsavAnswer.click(function(index) { clickHandler(this, index); });
    jsavLeft = av.ds.array(arrdata_left, {indexed: true, center: false, layout: "array"});
    jsavLeft.element.css({left: 0, top: rowTop + rowHeight});
    jsavLeft.click(function(index) { clickHandler(this, index); });
    jsavRight = av.ds.array(arrdata_right, {indexed: true, center: false, layout: "array"});
    jsavRight.element.css({left: blockWidth * (left_size + 1), top: rowTop + rowHeight});
    av.displayInit();
    av.recorded();

    jsavRight.click(function(index) { clickHandler(this, index); });
    mergesortMergePRO.userInput = false;
    isSelected = false;
  }

  window.mergesortMergePRO = window.mergesortMergePRO || mergesortMergePRO;
}());
