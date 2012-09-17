// Code to support InsertionInsertElement exercise
// TODO:
// * Try to get rid of so many global variables
// * Don't use JSAV array to compute the answer, since this blinks the display.
// * Make this code validate
"use strict";
var jsav, arr , arr_clone, myGuess, spos, nsel, sel1 ;
  	
// Click event handler on the array
var clickHandler = function(index, e) {
  var sublist;
  sublist = 0;
  if (index <= spos)
    sublist = 1;
  if ( sublist == 1 )	{
    if (nsel === 0) { // if first click
      arr.css(index, {"font-size": "130%"});
      nsel = nsel + 1;
      sel1 = index;
    }
    else {
      arr.swap(sel1,index);
      arr.css(index, {"font-size": "100%"});
      arr.css(sel1, {"font-size": "100%"});
      nsel = 0;
    }
  }
  myGuess = 1;
}

// Initialise JSAV library 
initJSAV = function(a, sort_pos) {
  var i, j;
  myGuess = -1;
  spos = sort_pos;
  nsel = 0;
  jsav = new JSAV("jsav");
  jsav.recorded();
  arr = jsav.ds.array(JSAV.utils.rand.numKeys(0, 999, a),{indexed: true, center: false});
  arr_clone = jsav.ds.array(JSAV.utils.rand.numKeys(0, 999, a));
  arr_clone.hide();
  for (i=0; i<a; i++) {
    arr_clone.value(i,arr.value(i));
  }
  for (i=0; i<sort_pos; i++) {
    for (j=i+1; j<sort_pos;j++) {
      if (arr_clone.value(i) > arr_clone.value(j))
        arr_clone.swap(i,j);
    }
  }
  for (i=0; i<a; i++) {
    arr.value(i,arr_clone.value(i));
  }
  arr.highlight(sort_pos);
  // Compute the correct Answer
  for (i=0; i<= sort_pos; i++) {
    for (j=i+1; j<=sort_pos;j++) {
      if (arr_clone.value(i) > arr_clone.value(j))
        arr_clone.swap(i,j);
    }
  }
  // bind the clickHandler to handle click events on the array
  arr.click(clickHandler);
}

// Check student's answer for correctness
function checkAnswer (a, sort_pos) {
  var i;
  // Return false if user has highlighted any position before start_pos
  for (i=0; i < a; i++) {
    if ( arr.value(i) != arr_clone.value(i)) return (2 === 1);
  }
  // All conditions passed, return true
  return ( 1 === 1);
} 
