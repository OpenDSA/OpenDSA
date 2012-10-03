"use strict";
var initData, bh,
    jsav = new JSAV("HeapsortProficiency_container"),
    swapIndex;

jsav.recorded();
function init() {
  var nodeNum = 10;
  if (bh) {
    bh.clear();
  }
  initData = JSAV.utils.rand.numKeys(10, 100, nodeNum);
  bh = jsav.ds.binheap(initData, { nodegap: 25, compare: function(a, b) { return b - a; }});
  swapIndex = jsav.variable(-1);
  jsav.displayInit();
  return bh;
}

function fixState(modelArray) {
  var size = modelArray.size();
  swapIndex.value(-1); // only swaps are graded so swapIndex cannot be anything else after correct step
  for (var i = 0; i < size; i++) {
    var val = modelArray.value(i),
        bgColor = modelArray.css(i, "background-color");
    if (bh.css(i, "background-color") !== bgColor) { // fix background color
      bh.css(i, {"background-color": bgColor});
    }
    if (val !== bh.value(i)) { // fix values
      bh.value(i, val);
    }
  }
  bh.heapsize(modelArray.heapsize());
  exercise.gradeableStep();
}
    
function model(modeljsav) {
  var modelbh = modeljsav.ds.binheap(initData, {nodegap: 20, compare: function(a, b) { return b - a;}});
  modelbh.origswap = modelbh.swap; // store original heap grade function
  // set all steps gradeable that include a swap
  modelbh.swap = function(ind1, ind2, opts) {
    this.origswap(ind1, ind2, opts);
    this.jsav.stepOption("grade", true);
  };
  modeljsav._undo = [];
  while (modelbh.heapsize() > 1) {
    if (modelbh.heapsize() === initData.length) {
      modeljsav.umsg("We start by swapping largest and last items in heap.");
      modeljsav.step();
    } else if (modelbh.heapsize() > initData.length - 3) {
      modeljsav.umsg("Again, we swap largest and last items in heap.");
    } else {
      modeljsav.umsg("...swap largest and last items in heap.");
    }
    modelbh.swap(0, modelbh.heapsize() - 1);
    modeljsav.step();
    modelbh.heapsize(modelbh.heapsize() - 1);
    modeljsav.umsg("<br/>..decrement the heap size", {preserve: true});
    modelbh.css(modelbh.heapsize(), {"background-color": "#ddd"});
    modeljsav.stepOption("grade", true);
    modeljsav.step();
    modeljsav.umsg("<br/>..and restore the heap property", {preserve: true});
    modelbh.heapify(1);
    modeljsav.umsg("");
    modeljsav.step();
  }
  return modelbh;
}
    
function clickHandler(index) {
  jsav._redo = []; // clear the forward stack, should add a method for this in lib
  var sIndex = swapIndex.value();
  if (sIndex === -1) { // if first click
    bh.css(index, {"font-size": "145%"});
    swapIndex.value(index);
    jsav.step();
  } else { // second click will swap
    bh.swap(sIndex, index, {});
    bh.css([sIndex, index], {"font-size": "100%"});
    swapIndex.value(-1);
    exercise.gradeableStep();
  }
}

var exercise = jsav.exercise(model, init, { css: "background-color" },
                                { feedback: "continuous",
                                  fixmode: "fix",
                                  fix: fixState });
exercise.reset();
    
$(".jsavcontainer").on("click", ".jsavarray .jsavindex", function() {
  var index = $(this).parent(".jsavarray").find(".jsavindex").index(this);
  clickHandler(index);
});
$(".jsavcontainer").on("click", ".jsavbinarytree .jsavbinarynode", function() {
  var index = $(this).data("jsav-heap-index") - 1;
  clickHandler(index);
});
$("#decrement").click(function() {
  bh.heapsize(bh.heapsize() - 1);
  bh.css(bh.heapsize(), {"background-color": "#ddd"});
  exercise.gradeableStep();
});