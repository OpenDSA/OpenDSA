(function ($) {
  "use strict";
  /*global alert: true, ODSA */
  $(document).ready(function () {
    var initData, bh,
        settings = new JSAV.utils.Settings($(".jsavsettings")),
        jsav = new JSAV($('.avcontainer'), {settings: settings}),
        exercise,
        swapIndex;

    jsav.recorded();
    function init() {
      var nodeNum = 10;
      if (bh) {
        bh.clear();
      }
      initData = JSAV.utils.rand.numKeys(10, 100, nodeNum);

      // Log the initial state of the exercise
      var exInitData = {};
      exInitData.gen_array = initData;
      ODSA.AV.logExerciseInit(exInitData);

      bh = jsav.ds.binheap(initData, { nodegap: 25, compare: function (a, b) { return b - a; }});
      swapIndex = jsav.variable(-1);
      jsav.displayInit();
      return bh;
    }

    function fixState(modelHeap) {
      var size = modelHeap.size();
      swapIndex.value(-1); // only swaps are graded so swapIndex cannot be anything else after correct step
      for (var i = 0; i < size; i++) {
        bh.css(i, {"background-color": modelHeap.css(i, "background-color")});
        bh.value(i, modelHeap.value(i));
      }
      bh.heapsize(modelHeap.heapsize());
    }

    function model(modeljsav) {
      var modelbh = modeljsav.ds.binheap(initData, {nodegap: 20, compare: function (a, b) { return b - a; }});
      modelbh.origswap = modelbh.swap; // store original heap grade function
      // set all steps gradeable that include a swap
      modelbh.swap = function (ind1, ind2, opts) {
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
        modeljsav.umsg("<br/>...decrement the heap size", {preserve: true});
        modelbh.css(modelbh.heapsize(), {"background-color": "#ddd"});
        modeljsav.stepOption("grade", true);
        modeljsav.step();
        modeljsav.umsg("<br/>...and restore the heap property", {preserve: true});
        modelbh.heapify(1);
        modeljsav.umsg("");
        modeljsav.step();
      }
      modelbh.css(0, {"background-color": "#ddd"});
      modeljsav.stepOption("grade", true);
      modeljsav.step();
      return modelbh;
    }

    function clickHandler(index) {
      if (bh.heapsize() === 0 || index >= bh.heapsize()) {
        return;
      }
      jsav._redo = []; // clear the forward stack, should add a method for this in lib
      var sIndex = swapIndex.value();
      if (sIndex === -1) { // if first click
        bh.css(index, {"font-size": "145%"});
        swapIndex.value(index);
        jsav.step();
      } else if (sIndex === index) {
        bh.css(index, {"font-size": "100%"});
        swapIndex.value(-1);
        jsav.step();
      } else { // second click will swap
        bh.css([sIndex, index], {"font-size": "100%"});
        bh.swap(sIndex, index, {});
        swapIndex.value(-1);
        exercise.gradeableStep();
      }
    }

    // Process About button: Pop up a message with an Alert
    function about() {
      alert("Heapsort Proficiency Exercise\nWritten by Ville Karavirta\nCreated as part of the OpenDSA hypertextbook project\nFor more information, see http://algoviz.org/OpenDSA\nSource and development history available at\nhttps://github.com/OpenDSA/OpenDSA\nCompiled with JSAV library version " + JSAV.version());
    }

    exercise = jsav.exercise(model, init,
			     { compare:  { css: "background-color" },
			       controls: $('.jsavexercisecontrols'),
			       fix: fixState });
    exercise.reset();

    $(".jsavcontainer").on("click", ".jsavarray .jsavindex", function () {
      var index = $(this).parent(".jsavarray").find(".jsavindex").index(this);
      clickHandler(index);
    });
    $(".jsavcontainer").on("click", ".jsavbinarytree .jsavbinarynode", function () {
      var index = $(this).data("jsav-heap-index") - 1;
      clickHandler(index);
    });
    $("#decrement").click(function () {
      if (bh.heapsize() === 0) {
        alert("Heapsize is already zero, cannot decrement!");
        return;
      }
      bh.heapsize(bh.heapsize() - 1);
      bh.css(bh.heapsize(), {"background-color": "#ddd"});
      exercise.gradeableStep();
    });
    $("#about").click(about);
  });
}(jQuery));
