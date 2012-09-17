"use strict";
/*global alert*/
// Various functions and variables that will be used by all of the
// following sections of the tutorial.

// This sets the default value of the speed setting to "7"
JSAV.ext.SPEED = 300;

// The various arrays to start sweeps with or display
var theArray = [20, 10, 15, 54, 55, 11, 78, 14];
var theArray2 =  [10, 20, 15, 54, 55, 11, 78, 14];
var theArray3 =  [10, 15, 20, 54, 55, 11, 78, 14];
 
var LIGHT = "rgb(215, 215, 215)";  // For "greying out" array elements

// Convenience function for setting another type of highlight
// (will be used for showing which records will be compared during sort)
var setBlue = function (arr, index) {
  arr.css(index, {"background-color": "#ddf" });
};

(function ($) {
  var av = new JSAV("InssortCON1");
  // Create an array object under control of JSAV library
  var arr = av.ds.array(theArray, {indexed: true});

  arr.highlight([1]);
  arr.css([2, 3, 4, 5, 6, 7], {"color": LIGHT});
  av.umsg("Insertion Sort starts with the record in position 1");
  av.displayInit();

  av.umsg("Since this is smaller than the value to its left, swap");
  arr.swap(0, 1);
  av.step();

  av.umsg("Now we are done with this record since it cannot move further left");
  arr.unhighlight(0);
  av.recorded();
}(jQuery));

(function ($) {
  var av = new JSAV("InssortCON2");
  // Create an array object under control of JSAV library
  var arr = av.ds.array(theArray2, {indexed: true});

  arr.highlight([2]);
  arr.css([3, 4, 5, 6, 7], {"color": LIGHT});
  av.umsg("Now we are ready to process the record in position 2");
  av.displayInit();

  setBlue(arr, 1);
  av.umsg("We will compare it to the record in position 1");
  av.step();

  arr.swap(1, 2);
  av.umsg("Since the record in position 2 is smaller, swap");
  arr.unhighlight(2);
  av.step();

  setBlue(arr, 0);
  av.umsg("Now compare against the record in position 0");
  av.step();

  av.umsg("Since the record currently in position 1 is not smaller than the one in position 0, we are done with it");
  arr.unhighlight(0);
  arr.unhighlight(1);
  av.recorded();
}(jQuery));

(function ($) {
  var av = new JSAV("InssortCON3");
  // Create an array object under control of JSAV library
  var arr = av.ds.array(theArray3, {indexed: true});

  arr.highlight([3]);
  arr.css([4, 5, 6, 7], {"color": LIGHT});
  av.umsg("Now we are ready to process the record in position 3");
  av.displayInit();

  setBlue(arr, 2);
  av.umsg("We will compare it to the record in position 2");
  av.step();

  av.umsg("Since the record in position 2 is smaller, nothing changes and we are done with the record in position 3");
  arr.unhighlight(2);
  arr.unhighlight(3);
  av.recorded();
}(jQuery));
