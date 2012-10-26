"use strict";
/*global alert*/
// Various functions and variables that will be used by all of the
// following sections of the tutorial.

var LIGHT = "rgb(215, 215, 215)";  // For "greying out" array elements

// Randomly scramble the contents of an array
function permute(A) {
  for (var i = 0; i < A.length; i++) {                // for each i
    var randompos = Math.floor(Math.random() * A.length);
    var temp = A[i];
    A[i] = A[randompos];
    A[randompos] = temp;
  }
}

// Convenience function for setting another type of highlight
// (will be used for showing which records will be compared during sort)
var setBlue = function (arr, index) {
  arr.css(index, {"background-color": "#ddf" });
};

(function ($) {
  var theArray = [76, 6, 57, 88, 85, 42, 83, 73, 48, 60];
  var av = new JSAV("QuicksortCON1");
  // Create an array object under control of JSAV library
  var arr = av.ds.array(theArray, {indexed: true});

  av.umsg("When we start the partition function, pivot value 60 has been moved to the right most position.");
  setBlue(arr, 9);
  av.displayInit();
  arr.unhighlight(9);
  arr.setLeftArrow(0);
  arr.setRightArrow(8);
  av.umsg("The left and right bounds are set to positions 0 and 8, respectively");
  av.step();
  av.umsg("Now move left bound rightward as long as it is at a value less than 60. Since it starts on 72 which is greater than 60, there is no movement of the left bound at this time.");
  av.step();
  av.umsg("Likewise, the right bound starts at a value less than 60, so it does not move.");
  av.step();
  arr.swap(0, 8);
  av.umsg("Swap the values at the bounds.");
  av.step();
  av.umsg("Now move the left bound to the right as long as it is at a value less than the pivot.");
  av.step();
  av.umsg("Step.");
  arr.clearLeftArrow(0);
  arr.setLeftArrow(1);
  av.step();
  av.umsg("Step.");
  arr.clearLeftArrow(1);
  arr.setLeftArrow(2);
  av.step();
  arr.clearLeftArrow(2);
  arr.setLeftArrow(3);
  av.umsg("Now we are at 88, which is greater than or equal to 60.");
  av.step();
  av.umsg("Now we move the right bound to the left until it reaches a value less than 60.");
  av.step();
  av.umsg("Step.");
  arr.clearRightArrow(8);
  arr.setRightArrow(7);
  av.step();
  av.umsg("Step.");
  arr.clearRightArrow(7);
  arr.setRightArrow(6);
  av.step();
  arr.clearRightArrow(6);
  arr.setRightArrow(5);
  av.umsg("Now the right bound is at 42, which is less than 60.");
  av.step();
  av.umsg("Swap.");
  arr.swap(3, 5);
  av.step();
  av.umsg("Once again, move the left bound to the right.");
  av.step();
  arr.clearLeftArrow(3);
  arr.setLeftArrow(4);
  av.umsg("Left bound is at 85, which is bigger than the pivot value.");
  av.step();
  av.umsg("Move the right bound to the left until we reach a value that is smaller than 60.");
  av.step();
  av.umsg("Step.");
  arr.clearRightArrow(5);
  arr.setRightArrow(4);
  av.step();
  arr.clearRightArrow(4);
  arr.setRightArrow(3);
  av.umsg("Note that the right bound has crossed over the left bound. So partition is done.");
  av.step();
  av.umsg("Since the left bound has reached position 4, this is the value returned by the partition function.");
  av.recorded();
}(jQuery));
