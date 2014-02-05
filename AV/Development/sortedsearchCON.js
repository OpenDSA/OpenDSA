"use strict";

// Randomly scramble the contents of an array
function permute(A) {
  for (var i = 0; i < A.length; i++) {                // for each i
    var randompos = Math.floor(Math.random() * A.length);
    var temp = A[i];
    A[i] = A[randompos];
    A[randompos] = temp;
  }
}

var setBlue = function (arr, index) {
  arr.css(index, {"background-color": "#ddf" });
};

(function ($) {
  var theArray = [];
  var empty = [];
  empty.length = 10;
  for (var i = 0; i < 10; i++) {
    theArray[i] = i;
  }
 // permute(theArray);
  var av = new JSAV("SortedsearchCON1");
  // Create an array object under control of JSAV library
  var arr = av.ds.array(theArray, {indexed: true});


  arr.toggleArrow(3);
  av.umsg("So here is a sorted array where we need to search for the number 3");
  av.displayInit();
  arr.toggleArrow(0);
  arr.toggleArrow(9);
  av.umsg("The left and right bounds are set to positions 0 and 8, respectively");
  av.step();
  av.umsg("First step is to subtract the indexes for let and right bouds, divide it by 2 and look at that index");
  arr.toggleArrow(4);

  av.step();
  arr.toggleArrow(9);
  av.umsg("Now 4 is bigger then 3 so we keep the left boound and move the right bound to the middle");

  av.step();
  av.umsg("The left and right bounds are set to positions 0 and 4, respectively");

  av.step();
  av.umsg("sutrtact left and right bouds, divide it by 2 and look at that index");
  arr.toggleArrow(2);

  av.step();
  arr.toggleArrow(0);
  av.umsg("Now 2 is smaller then 3 so we keep the right boound and move the left bound to the middle");


  av.step();
  arr.toggleArrow(2);
  arr.toggleArrow(4);
  av.umsg("No more place to go and 3 is what we were looking for");

  av.recorded();
}(jQuery));
