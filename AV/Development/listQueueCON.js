"use strict";
// Helper function for creating a pointer
function setPointer(name, obj){
  return obj.jsav.pointer(name, obj,{visible: true, 
                anchor: "left top",
                myAnchor: "right bottom",
                left: 20,
                top: -20});
}

// Explain why sets top at position n-1.
(function ($) {
  var jsav = new JSAV("AQueueFirstNposCON");
  // Relative offsets
  var leftMargin = 300;
  var topMargin = 35; 
  var minusOne = jsav.ds.array(["-1"],{top: topMargin + 70, left: leftMargin + 30});
  minusOne.hide();
  var arr = jsav.ds.array([12,45,5,81,"", "", "", ""],{indexed:true, top: topMargin, left: leftMargin});
  jsav.umsg("Assume that there are <code>n</code> elements in the queue. By analogy to the array-based list implementation, we could require that all elements of the queue be stored in the first <code>n</code> positions of the array.");
  jsav.displayInit();
  var rearPointer = jsav.pointer("rear", arr, {targetIndex : 0});
  var frontPointer = jsav.pointer("front", arr, {targetIndex : 3});
  arr.highlight(3);
  jsav.umsg(" If we choose the rear element of the queue to be in position 0, then dequeue operations require only &theta;(1) time because the front element of the queue (the one being removed) is the last element in the array.");
  jsav.step();
  arr.highlight(0);
  arr.highlight(1);
  arr.highlight(2);
  jsav.umsg("However, enqueue operations will require &theta;(n) time, because the n elements currently in the queue must each be shifted one position in the array.");
  jsav.step();
  arr.unhighlight();
  rearPointer.target(arr, {relativeIndex : 3, targetIndex : 3});
  frontPointer.target(arr, {relativeIndex : 0, targetIndex : 0});
  jsav.umsg("If instead we chose the rear element of the queue to be in position n-1, then an enqueue operation is equivalent to an append operation on a list. This requires only &theta;(1) time.");
  jsav.step();
  jsav.umsg("But now, a dequeue operation requires &theta;(n) time, because all of the elements must be shifted down by one position to retain the property that the remaining $n-1$ queue elements reside in the first n-1 positions of the array.");
  jsav.step();
  jsav.step();
  jsav.recorded();
}(jQuery));

// Explain why sets top at position n-1.
(function ($) {
  var jsav = new JSAV("AQueueDriftposCON");

  // Relative offsets
  var leftMargin = 250;
  var topMargin = 25; 
  jsav.umsg("A far more efficient implementation can be obtained by relaxing the requirement that all elements of the queue must be in the first $n$~positions of the array. We will still require that the queue be stored be in contiguous array positions, but the contents of the queue will be permitted to drift within the array, as illustrated by the following slides ");
  jsav.displayInit();
  var arr = jsav.ds.array([20,5,12,17, "", "", "", "", "", "", "", ""],{left:leftMargin, top:topMargin});
  var rearPointer =  jsav.pointer("rear", arr, {targetIndex : 3});
  var frontPointer =  jsav.pointer("front", arr, {targetIndex : 0});
  jsav.umsg(" The queue after the initial four numbers 20, 5, 12, and 17 have been inserted");
  jsav.step();
  frontPointer.target(arr, {relativeIndex : 1, targetIndex : 1});
  arr.value(0, "");
  arr.highlight(0);
  jsav.umsg("<code>dequeue</code> operation");
  jsav.step();
  frontPointer.target(arr, {relativeIndex : 2, targetIndex : 2});
  arr.value(1, "");
  arr.unhighlight(0);
  arr.highlight(1);
  jsav.umsg("<code>dequeue</code> operation");
  frontPointer.target(arr, {relativeIndex : 2, targetIndex : 2});
  jsav.step();
  arr.value(4, "3");
  arr.unhighlight(1);
  arr.highlight(4);
  jsav.umsg("<code>dequeue</code> operation");
  rearPointer.target(arr, {relativeIndex : 4, targetIndex : 4});
  jsav.umsg("<code>enqueue(3)</code>");
  jsav.step();
  arr.value(5, "30");
  arr.unhighlight(4);
  arr.highlight(5);
  jsav.umsg("<code>dequeue</code> operation");
  rearPointer.target(arr, {relativeIndex : 5, targetIndex : 5});
  jsav.umsg("<code>enqueue(30)</code>");
  jsav.step();
  arr.value(6, "4");
  arr.unhighlight(5);
  arr.highlight(6);
  rearPointer.target(arr, {relativeIndex : 6, targetIndex : 6});
  jsav.umsg("<code>enqueue(4)</code>");
  jsav.step();
  arr.unhighlight(6);
  jsav.umsg("Now, both the enqueue and the dequeue operations can be performed in &theta;(1) time because no other elements in the queue need be moved.");
  jsav.step();
  jsav.recorded();
}(jQuery));
