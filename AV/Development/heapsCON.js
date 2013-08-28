"use strict";
var unsortArray = [1, 2, 3, 4, 5, 6, 7];
var sortArray = [88, 85, 83, 72, 73, 42, 57, 6, 48, 60, ""];
var sortArray2 = [88, 85, 83, 72, 73, 42, 57, 6, 48, 60];

(function ($) {
  var av = new JSAV("heapinsertCON");
  var bh = av.ds.binheap(sortArray, {compare: function (a, b) { return b - a; },
                                      steps: false, heapify: true});
  av.umsg("Here is the process for inserting a new record into a heap.");
  av.displayInit();
  av.umsg("We put the new value at the end of the array.");
  bh.heapsize(bh.heapsize() + 1);
  bh.value(10, 99);
  bh.css(10, {"background-color": "#ddd"});
  av.step();
  av.umsg("Now we have to start moving the value upward in the heap, as appropriate.");
  av.step();
  bh.swap(10, 4);
  bh.css(4, {"background-color": "#ddd"});
  bh.css(10, {"background-color": "#fff"});
  av.step();
  bh.swap(4, 1);
  bh.css(1, {"background-color": "#ddd"});
  bh.css(4, {"background-color": "#fff"});
  av.step();
  bh.swap(1, 0);
  bh.css(0, {"background-color": "#ddd"});
  bh.css(1, {"background-color": "#fff"});
  av.recorded();
}(jQuery));

(function ($) {
  var av = new JSAV("heapbuildCON");
  var bh = av.ds.binheap(unsortArray, {compare: function (a, b) { return b - a; },
                                       steps: false, heapify: false});
  av.umsg("Let's look at an efficient way to build the heap. We are going to make a max-heap from a set of input values.");
  av.displayInit();
  av.umsg("Working from bottom to top, from right to left, do a siftdown on each internal node.");
  av.step();
  av.umsg("Process the node with value 3.");
  bh.css(2, {"background-color": "#ddd"});
  av.step();
  bh.swap(6, 2);
  bh.css(2, {"background-color": "#fff"});
  bh.css(6, {"background-color": "#ddd"});
  av.step();
  bh.css(6, {"background-color": "#fff"});
  bh.css(1, {"background-color": "#ddd"});
  av.umsg("3 is done. Now let's do the node with value 2.");
  av.step();
  bh.swap(4, 1);
  bh.css(1, {"background-color": "#fff"});
  bh.css(4, {"background-color": "#ddd"});
  av.step();
  av.umsg("2 is done. Now let's do the node with value 1.");
  bh.css(4, {"background-color": "#fff"});
  bh.css(0, {"background-color": "#ddd"});
  av.step();
  bh.swap(2, 0);
  bh.css(0, {"background-color": "#fff"});
  bh.css(2, {"background-color": "#ddd"});
  av.step();
  bh.swap(5, 2);
  bh.css(2, {"background-color": "#fff"});
  bh.css(5, {"background-color": "#ddd"});
  av.step();
  bh.css(5, {"background-color": "#fff"});
  av.umsg("Now we have a max heap.");
  av.recorded();
}(jQuery));

(function ($) {
  var av = new JSAV("heapmaxCON");
  var bh = av.ds.binheap(sortArray2, {compare: function (a, b) { return b - a; },
                                      steps: false, heapify: false});

  av.umsg("Here is the process for removing the maximum value from the max heap. We know that this value is at the root (array position 0), but we also need to update the heap when we remove it.");
  bh.css(0, {"background-color": "#ddd"});
  av.displayInit();
  av.step();
  av.umsg("We know that we want to reduce the array/heap size by one. So we swap the first and last positions.");
  bh.swap(0, 9);
  bh.css(0, {"background-color": "#fff"});
  bh.css(9, {"background-color": "#ddd"});
  av.step();
  av.umsg("Decrement the heap by one, removing that last element.");
  bh.heapsize(bh.heapsize() - 1);
  bh.css(9, {"background-color": "#000"});
  av.step();
  av.umsg("But now, we no longer have a max heap. Push the top element down as appropriate.");
  bh.css(0, {"background-color": "#ddd"});
  av.step();
  av.umsg("Swap the root with its left child.");
  bh.swap(0, 1);
  bh.css(0, {"background-color": "#fff"});
  bh.css(1, {"background-color": "#ddd"});
  av.step();
  av.umsg("Swap with its right child.");
  bh.swap(1, 4);
  bh.css(1, {"background-color": "#fff"});
  bh.css(4, {"background-color": "#ddd"});
  av.step();
  av.umsg("Done.");
  av.recorded();
}(jQuery));


(function ($) {
  var av = new JSAV("heapdeleteCON");
  var bh = av.ds.binheap(sortArray2, {compare: function (a, b) { return b - a; },
                                      steps: false, heapify: false});

  av.umsg("Perhaps we want to delete an arbitrary node from the heap. (Of course, the client that wants to do the deletion has to know the proper index for the thing to be deleted.)");
  bh.css(1, {"background-color": "#ddd"});
  av.displayInit();
  av.umsg("Similar to deleting the max, we swap the target value with the last position in the heap.");
  bh.swap(1, 9);
  bh.css(1, {"background-color": "#fff"});
  bh.css(9, {"background-color": "#ddd"});
  av.step();
  av.umsg("Decrement the heap.");
  bh.css(9, {"background-color": "#000"});
  av.step();
  av.umsg("Now we must update the heap since the value we must moved might be out of place. Depending on circumstances, it might go up, or down. In this example, push this value down.");
  bh.css(1, {"background-color": "#ddd"});
  av.step();
  av.umsg("Swap.");
  bh.swap(1, 4);
  bh.css(1, {"background-color": "#fff"});
  bh.css(4, {"background-color": "#ddd"});
  av.step();
  av.umsg("Done.");
  bh.css(4, {"background-color": "#fff"});
  av.recorded();
}(jQuery));
