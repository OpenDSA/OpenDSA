"use strict";
/*global alert*/
// Various functions and variables that will be used by all of the
// following sections of the tutorial.

// This sets the default value of the speed setting to "7"
JSAV.ext.SPEED = 300;

// The various arrays to start sweeps with or display
var theArray = [20, 10, 15, 54, 55, 11, 78, 14];
var theArray2 =  [10, 20, 11, 15, 54, 55, 14, 78];
 
var LIGHT = "rgb(215, 215, 215)";  // For "greying out" array elements

// Convenience function for setting another type of highlight
// (will be used for showing which elements will be compared during sort)
var setBlue = function (arr, index) {
  arr.css(index, {"background-color": "#ddf" });
};

(function ($) {
  var av = new JSAV("container1");
  // Create an array object under control of JSAV library
  var arr = av.ds.array(theArray, {indexed: true});
  var j;

  av.umsg("Moving from right to left, compare adjacent elements and swap if the left one is bigger than the right one.");
  av.displayInit();
  setBlue(arr, arr.size()-1);
  for (j = arr.size() - 1; j > 0; j--) {
    setBlue(arr, j - 1);
    av.umsg("Compare elements");
    av.step();
    if (arr.value(j - 1) > arr.value(j)) {
      av.umsg("Swap");
      arr.swap(j - 1, j);
      av.step();
    }
    arr.unhighlight(j);
  }

  arr.unhighlight(0);
  av.umsg("Done this pass");
  av.recorded();
}(jQuery));

(function ($) {
  var av = new JSAV("container2");
  // Create an array object under control of JSAV library
  var arr = av.ds.array(theArray2, {indexed: true});
  var j;

  av.umsg("Moving from right to left, compare adjacent elements and swap if the left one is bigger than the right one.");
  arr.css([0], {"color": LIGHT});
  av.displayInit();
  setBlue(arr, arr.size()-1);
  for (j = arr.size() - 1; j > 1; j--) {
    setBlue(arr, j - 1);
    av.umsg("Compare elements");
    av.step();
    if (arr.value(j - 1) > arr.value(j)) {
      av.umsg("Swap");
      arr.swap(j - 1, j);
      av.step();
    }
    arr.unhighlight(j);
  }
  arr.unhighlight(1);
  arr.css([1], {"color": LIGHT});
  av.umsg("Done this pass");
  av.recorded();

}(jQuery));
