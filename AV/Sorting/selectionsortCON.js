"use strict";
/*global alert*/
// Various functions and variables that will be used by all of the
// following sections of the tutorial.

// This sets the default value of the speed setting to "7"
JSAV.ext.SPEED = 300;

// The various arrays to start sweeps with or display
var theArray = [20, 10, 15, 54, 55, 11, 78, 14];
var theArray2 = [20, 10, 15, 54, 55, 11, 14, 78];
 
var LIGHT = "rgb(215, 215, 215)";  // For "greying out" array elements

// Convenience function for setting another type of highlight
// (will be used for showing which elements will be compared during sort)
var setBlue = function (arr, index) {
  arr.css(index, {"background-color": "#ddf" });
};

var setGreen = function (arr, index) {
  arr.css(index, {"background-color": "#00FF00" });
};
var setWhite = function (arr, index) {
  arr.css(index, {"background-color": "#fff" });
};

(function ($) {
  var av = new JSAV("SelsortCON1");
  // Create an array object under control of JSAV library
  var arr = av.ds.array(theArray, {indexed: true});
  var j;
  var bigindex = 0;

  av.umsg("Moving from left to right, find the element with the greatest value.");
  av.displayInit();
  av.umsg("For each element moving through the list: the biggest seen so far is shown in green");
  setGreen(arr, 0);
  av.step();
  for (j = 1; j < arr.size(); j++) {
    setBlue(arr, j);
    av.umsg("Compare to biggest seen so far");
    av.step();
    if (arr.value(j) > arr.value(bigindex)) {
      av.umsg("Found something bigger, so switch value of bigindex");
      setWhite(arr, bigindex);
      bigindex = j;
      setGreen(arr, bigindex);
      av.step();
    }
    else {
      setWhite(arr, j);
    }
  }
  av.umsg("Now swap the next biggest element into place");
  av.step();
  arr.swap(bigindex, arr.size() - 1); // swap the two indices
  setWhite(arr, bigindex);
  setGreen(arr, arr.size() - 1);
  av.step();
  av.umsg("Done this pass");
  setWhite(arr, arr.size() - 1);
  arr.css([arr.size() - 1], {"color": LIGHT});
  av.recorded();
}(jQuery));

(function ($) {
  var av = new JSAV("SelsortCON2");
  // Create an array object under control of JSAV library
  var arr = av.ds.array(theArray2, {indexed: true});
  var j;
  var bigindex = 0;

  arr.css([arr.size() - 1], {"color": LIGHT});
  av.umsg("Second pass: moving from left to right, find the element with the second greatest value.");
  av.displayInit();
  av.umsg("For each element moving through the list: the biggest seen so far is shown in green");
  setGreen(arr, 0);
  av.step();
  for (j = 1; j < arr.size() - 1; j++) {
    setBlue(arr, j);
    av.umsg("Compare to biggest seen so far");
    av.step();
    if (arr.value(j) > arr.value(bigindex)) {
      av.umsg("Found something bigger, so switch value of bigindex");
      setWhite(arr, bigindex);
      bigindex = j;
      setGreen(arr, bigindex);
      av.step();
    }
    else {
      setWhite(arr, j);
    }
  }
  av.umsg("Now swap the next biggest element into place");
  av.step();
  arr.swap(bigindex, arr.size() - 2); // swap the two indices
  setWhite(arr, bigindex);
  setGreen(arr, arr.size() - 2);
  av.step();
  av.umsg("Done this pass");
  setWhite(arr, arr.size() - 2);
  arr.css([arr.size() - 2], {"color": LIGHT});
  av.recorded();
}(jQuery));
