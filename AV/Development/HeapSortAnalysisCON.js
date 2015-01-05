/*global ODSA */
"use strict";
// Written by Mohammed Farghally and Cliff Shaffer
// Heap Sort Analysis
$(document).ready(function () {
  var av_name = "HeapSortAnalysisCON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({"av_name": av_name}),
      interpret = config.interpreter;       // get the interpreter
  var av = new JSAV(av_name);
  var arr = [];
  var numNodes = 31;
  var bh;
  
  var swap = function (index1, index2) {
    var treeswap = function (index1, index2) {
      bh.jsav.effects.swap(bh._treenodes[index1].element, bh._treenodes[index2].element, true);
    };
    JSAV.anim(treeswap).call(bh, index1, index2);
  };
  
  // Slide 1
  av.umsg("The first step in heapsort is to heapify the array. This will cost $\\theta(n)$ running time for an array of size $n$.<br> Consider the following structure of a Max Heap");
  for (var i = 0; i < numNodes; i++) {
    arr.push(" ");
  }
  bh = av.ds.binheap(arr, {left: 100, top: 50, nodegap: 15});
  bh.element.hide();
  bh.layout();
  av.displayInit();
  
  // Slide 2
  av.umsg("HeapSort swaps the root node containng the maximum key with the last node in the heap");
  bh.css([0, 30], {"background-color": "yellow"});
  av.step();
  
  // Slide 3
  av.umsg("After swapping, the heap size is reduced by $1$ and the Max-heap property may be violated, accordingly, the array should be re-heapified");
  swap(0, 30);
  bh.css(30, {"background-color": "grey"});
  bh.css(0, {"background-color": "red"});
  av.step();
  
  // Slide 4
  av.umsg("In the worst case, siftdown will push the root node towards the current last position in the heap");
  swap(0, 2);
  bh.css(0, {"background-color": "white"});
  bh.css(2, {"background-color": "red"});
  av.step();
  
  // Slide 5
  swap(2, 6);
  bh.css(2, {"background-color": "white"});
  bh.css(6, {"background-color": "red"});
  av.step();
  
  // Slide 6
  swap(6, 14);
  bh.css(6, {"background-color": "white"});
  bh.css(14, {"background-color": "red"});
  av.step();
  
  // Slide 7
  swap(14, 29);
  bh.css(14, {"background-color": "white"});
  bh.css(29, {"background-color": "green"});
  av.step();
  
  // Slide 8
  av.umsg("This will requires $\\lfloor\\log{i}\\rfloor$ amount of work, where $i$ is the index of the current last position in the heap");
  av.step();
  
  // Slide 9
  av.umsg("Since this process is done till the heap is empty, the total amount of work can be modeled by the following summation");
  av.label("$\\displaystyle\\sum_{i=1}^{n}\\lfloor\\log{i}\\rfloor$",  {"top": "-20px", "left": "10px"}).css({'font-size': '16px', "text-align": "center"});
  bh.css([29, 30], {"background-color": "white"});
  av.step();
  
  // Slide 10
  av.umsg("Since most of the heap nodes are located towards the bottom of the heap, the distance from the root to the current last position in the heap will be in most cases $\\lfloor\\log{n}\\rfloor$, thus this summation is bounded by $n\\log{n}$");
  av.step();
  
  // Slide 11
  av.umsg("Accordingly, the total running time of heapsort is $\\theta(n+n\\log{n}) = \\theta(n\\log{n})$");
  av.step();
  
  // Slide 12
  av.umsg("If all key values were equal, then Heapsort would cost Θ(n) in be best case because every call to removemax would result in calls to siftdown that complete in constant time because the new root value never swaps with its children.");
  av.recorded();
});
