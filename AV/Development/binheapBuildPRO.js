(function ($) {
  "use strict";
  /*global alert: true, ODSA */
  $(document).ready(function () {
    var initData, bh,
        settings = new JSAV.utils.Settings($(".jsavsettings")),
        jsav = new JSAV($('.avcontainer'), {settings: settings}),
        swapIndex;

    jsav.recorded();
    function init() {
      var nodeNum = 10;
      if (bh) {
        bh.clear();
      }
     $.fx.off = true;
     var test = function(data) {
        bh = jsav.ds.binheap(data, {size: nodeNum, stats: true, tree: false});
        var stats = bh.stats;
        bh.clear();
        return (stats.swaps > 3 && stats.recursiveswaps > 0 && stats.leftswaps > 0
                && stats.rightswaps > 0 && stats.partlyrecursiveswaps > 0);
      };
      initData = JSAV.utils.rand.numKeys(10, 100, nodeNum, {test: test, tries: 50});

      // Log the initial state of the exercise                                  
      var exInitData = {};
      exInitData.gen_array = initData;
      ODSA.AV.logExerciseInit(exInitData);

      bh = jsav.ds.binheap(initData, {heapify: false});
      swapIndex = jsav.variable(-1);
      jsav._undo = [];
      $.fx.off = false;
      return bh;
    }
    
    function model(modeljsav) {
      var modelbh = modeljsav.ds.binheap(initData, {heapify: false, nodegap: 20});
      modelbh.origswap = modelbh.swap; // store original heap grade function
      // set all steps gradeable that include a swap
      modelbh.swap = function (ind1, ind2, opts) {
        this.origswap(ind1, ind2, opts);
        this.jsav.stepOption("grade", true);
      };
      modeljsav._undo = [];
      for (var i = Math.floor(modelbh.size() / 2); i > 0; i--) {
        modeljsav.umsg("Calling Min-Heapify(A, " + i + ")");
        modeljsav.step();
        modeljsav.umsg("");
        modelbh.heapify(i);
      }
      return modelbh;
    }

      // Process About button: Pop up a message with an Alert
    function about() {
      alert("Heap Build Proficiency Exercise\nWritten by Ville Karavirta\nCreated as part of the OpenDSA hypertextbook project\nFor more information, see http://algoviz.org/OpenDSA\nSource and development history available at\nhttps://github.com/cashaffer/OpenDSA\nCompiled with JSAV library version " + JSAV.version());
    }

   
    function fixState(modelHeap) {
      var size = modelHeap.size();
      swapIndex.value(-1); // only swaps are graded so swapIndex cannot be anything else after correct step                                                    
      for (var i = 0; i < size; i++) {
        if (bh.value(i) !== modelHeap.value(i)) {
          bh.value(i, modelHeap.value(i));
        }
      }
      bh.unhighlight(true); // unhighlight all
      bh.heapsize(modelHeap.heapsize());
    }

    var exercise = jsav.exercise(model, init, { },
        { controls: $('.jsavexercisecontrols'), fix: fixState });
    exercise.reset();
    
    function clickHandler(index) {
      jsav._redo = []; // clear the forward stack, should add a method for this in lib
      var sIndex = swapIndex.value();
      if (sIndex === -1) { // if first click
        bh.highlight(index);
        swapIndex.value(index);
        jsav.step();
      } else if (sIndex === index) { // 2nd click on same index -> unselect
        bh.unhighlight(index);
        swapIndex.value(-1);
        jsav.step();
      } else { // second click will swap
        bh.swap(sIndex, index, {});
        bh.unhighlight([sIndex, index]);
        swapIndex.value(-1);
        exercise.gradeableStep();
      }
    }
    
    $(".jsavcontainer").on("click", ".jsavindex", function() {
      var index = $(this).parent(".jsavarray").find(".jsavindex").index(this);
      clickHandler(index);
    }).on("click", ".jsavbinarynode", function() {
      var index = $(this).data("jsav-heap-index") - 1;
      clickHandler(index);
    });
    
    $("#about").click(about);
  });
}(jQuery));
