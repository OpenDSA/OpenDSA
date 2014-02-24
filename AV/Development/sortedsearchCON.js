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


(function ($) {
  var theArray = [9,14,29,33,46,51,78,84,97,99];
  var empty = [];
  empty.length = 10;

 // permute(theArray);
  var av = new JSAV("SortedsearchCON1");
  // Create an array object under control of JSAV library
  var arr = av.ds.array(theArray, {indexed: true});

var setBlue = function (index) {
  arr.css(index, {"background-color": "#ddf" });
};

var setPink = function (index) {
  arr.css(index, {"background-color": "#FFB6C1" });
};

var setYellow = function (index) {
  arr.css(index, {"background-color": "#FFFF00" });
};



  arr.toggleArrow(3);
  av.umsg("So here is a sorted array where we need to search for the number 33");
  av.displayInit();
  setYellow(0);
  setYellow(9);

//  arr.toggleArrow(0);
//  arr.toggleArrow(9);
  av.umsg("The left and right bounds are set to positions 0 and 9, respectively");
  av.step();
		
  av.umsg("First step is to subtract the indexes for left and right bouds, divide it by 2 and look at that index");
  setBlue(4);

  av.step();
  av.umsg("Now 46 is bigger then 33 so we keep the left boound and move the right bound to the middle");
  setPink(9);
  setYellow(4);

  av.step();
  av.umsg("The left and right bounds are set to positions 0 and 4, respectively");

  av.step();
  av.umsg("sutrtact left and right bouds, divide it by 2 and look at that index");
  setBlue(2);

  av.step();

  av.umsg("Now 9 is smaller then 29 so we keep the right boounds and move the left bound to the middle");
  av.step();
  setPink(0);
  setYellow(2);

  av.step();
  av.umsg("No more place to go and 3 is what we were looking for");
  setPink(2);
  setPink(4);
  setYellow(3);
  av.recorded();
}(jQuery));
