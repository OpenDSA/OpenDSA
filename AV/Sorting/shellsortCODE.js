"use strict";
// Shared code for Shellsort

// Convenience function for setting another type of highlight
// (will be used for showing which elements will be compared during sort)
var setBlue = function (arr, index) {
  arr.css(index, {"background-color": "#ddf" });
};

// Insertion sort using increments
function inssort(av, arr, start, incr) {
  var i, j;
  for (i = start + incr; i < arr.size(); i += incr) {
    setBlue(arr, i);
    for (j = i; j >= incr; j -= incr) {
      setBlue(arr, j - incr);
      av.step();
      if (arr.value(j) < arr.value(j - incr)) {
        arr.swap(j, j - incr); // swap the two indices
        av.step();
      }
      else {
        arr.highlight([j - incr, j]);
        break; // Done pushing element, leave for loop
      }
      arr.highlight(j);
    }
    arr.highlight(j);
  }
}

// Partial Shellsort. Sweep with the given increment
function sweep(av, arr, incr) {
  var j = 0;
  var numElem = Math.ceil(arr.size() / incr);
  av.umsg("Start the next increment size: " + incr);
  av.step();
  var highlightFunction = function (index) { return index % incr === j; };
  for (j = 0; j < incr; j++) {         // Sort each sublist
    // Highlight the sublist
    arr.highlight(highlightFunction);
    if (j + (incr * (numElem - 1)) >= arr.size()) {
      numElem = numElem - 1;
    }
    if ((j + incr) === arr.size()) { // Only one element, don't process
      arr.unhighlight(highlightFunction);
      av.umsg("Since the rest of the subarrays for this increment are of length 1, we will skip them");
      av.step();
      return;
    }
    av.umsg("Starting to sort a new subarray with " + numElem + " elements");
    av.step();
    inssort(av, arr, j, incr);
    arr.unhighlight(highlightFunction);
  }
}
