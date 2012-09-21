"use strict";
/*global alert*/
// Various functions and variables that will be used by all of the
// following sections of the tutorial.

// This sets the default value of the speed setting to "7"
JSAV.ext.SPEED = 300;

// The various arrays to start sweeps with or display
var theArray = [20, 30, 44, 54, 55, 11, 78, 14, 13, 79, 12, 98];
var theArray2 = [13, 30, 12, 54, 55, 11, 78, 14, 20, 79, 44, 98];
var theArray3 = [13, 11, 12, 14, 20, 30, 44, 54, 55, 79, 78, 98];
var theArray4 = [12, 11, 13, 14, 20, 30, 44, 54, 55, 79, 78, 98];
 
var LIGHT = "rgb(215, 215, 215)";  // For "greying out" array elements
var DARK = "black";                // Make array elements dark again

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
function sweep(av, myarr, incr) {
  var j = 0;
  var highlightFunction = function (index) { return index % incr === j; };
  for (j = 0; j < incr; j++) {         // Sort each sublist
    if ((j + incr) === myarr.size()) { // Only one element, don't process
      return;
    }
    // Highlight the sublist
    myarr.highlight(highlightFunction);
    av.step();
    inssort(av, myarr, j, incr);
    myarr.unhighlight(highlightFunction);
  }
}

// Display a slideshow for a sweep of "increment" steps on array "inArr"
function doSweep(container, inArr, increment) {
  var av = new JSAV(container);
  // Create an array object under control of JSAV library
  var arr = av.ds.array(inArr, {indexed: true});
  av.displayInit();
  arr.unhighlight(); // unhighlight seems to have the side effect of
  // making the cell dark.
  sweep(av, arr, increment); // first sweep with increment 8
  av.recorded();
}

// Show the differences between the original array and given array "a"
function showDifference(container, a) {
  var av = new JSAV(container, {"animationMode": "none"});
  var origarr = av.ds.array(theArray, {indexed: true});
  var origlabel = av.label("Original Array", {before: origarr});
  var arr = av.ds.array(a, {indexed: true});
  var arrlabel = av.label("Values in <b style='color:#0b0;'>green</b> have changed from their original positions", {before: arr});
  arr.css(function (index) { return arr.value(index) !== origarr.value(index); },
                           {"color": "#0b0", "font-weight": "bold"});
}

(function ($) {
  var av = new JSAV("shellsort_av1");
  // Create an array object under control of JSAV library
  var arr = av.ds.array(theArray, {indexed: true});

  // set color to LIGHT for the whole array, then highlight indices 0 and 8
  arr.css(function (index)
          { return index % 8 !== 0; }, {"color": LIGHT}).highlight([0, 8]);
  av.displayInit();
  arr.unhighlight([0, 8]).css([0, 8], {"color": LIGHT}).highlight([1, 9]);
  for (var i = 2; i < 4; i++) { // loop through the rest of the array sublists
    av.step();
    arr.unhighlight([i - 1, i + 7])
       .css([i - 1, i + 7], {"color": LIGHT}).highlight([i, i + 8]);
  }
  av.recorded();
}(jQuery));

(function ($) {
  var arr = theArray;
  doSweep("shellsort_av2", arr, 8);
}(jQuery));

(function ($) {
  var arr = theArray2;
  showDifference("shellsort_av3", arr);
}(jQuery));

(function ($) {
  var av = new JSAV("shellsort_av4");
  var arr = av.ds.array(theArray2, {indexed: true});
  arr.css(function (index)
          { return index % 4 !== 0; }, {"color": LIGHT}).highlight([0, 4, 8, 12]);
  av.displayInit();
  arr.unhighlight([0, 4, 8, 12]).css([0, 4, 8, 12], {"color": LIGHT})
     .highlight([1, 5, 9, 13]);
  av.step();
  arr.unhighlight([1, 5, 9, 13]).css([1, 5, 9, 13], {"color": LIGHT})
     .highlight([2, 6, 10, 14]);
  av.step();
  arr.unhighlight([2, 6, 10, 14]).css([2, 6, 10, 14], {"color": LIGHT})
     .highlight([3, 7, 11, 15]);
  av.recorded();
}(jQuery));

(function ($) {
  var arr = theArray2;
  doSweep("shellsort_av5", arr, 4);
}(jQuery));

(function ($) {
  var arr = theArray3;
  showDifference("shellsort_av6", arr);
}(jQuery));

(function ($) {
  var arr = theArray3;
  doSweep("shellsort_av7", arr, 2);
}(jQuery));

(function ($) {
  var arr = theArray4;
  showDifference("shellsort_av8", arr);
}(jQuery));

(function ($) {
  var arr = theArray4;
  doSweep("shellsort_av9", arr, 1);
}(jQuery));
