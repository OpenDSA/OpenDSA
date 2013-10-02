(function ($) {
  "use strict";
  /*global alert: true, ODSA */
  $(document).ready(function () {
    var initData, bh,
        settings = new JSAV.utils.Settings($(".jsavsettings")),
        jsav = new JSAV($('.avcontainer'), {settings: settings}),
        swapIndex,
        insertPos,
        insertData,
        insertValue,
        nodeNum = 10,
        initNum = 0;

    jsav.recorded();
    function init() {
      if (bh) {
        bh.clear();
        insertPos.element.remove();
        insertValue.element.remove();
      }
      var step = 0;
      $.fx.off = true;
      var test = function(data) {
        var min = 1000,
            mmin = Math.min;
        for (var i = 0; i < nodeNum; i++) {
          min = mmin(data[i], min);
        }
        // make sure we get a collision
        if (data[nodeNum-1] !== min) {
          data[nodeNum-1] = min;
        } else {
          data[nodeNum/2] = min;
        }
        bh = jsav.ds.binheap(data.slice(0, initNum), {size: nodeNum, stats: true, tree: false});
        for (var i = 0; i < nodeNum; i++) {
          bh.insert(data[i]);
        }
        var swaps = bh.stats.swaps;
        bh.clear();
        return !(swaps < nodeNum + 1 || swaps > nodeNum + 3);
      };
      initData = JSAV.utils.rand.numKeys(10, 100, nodeNum, {test: test, tries: 50});

      // Log the initial state of the exercise                                  
      var exInitData = {};
      exInitData.gen_array = initData;
      ODSA.AV.logExerciseInit(exInitData);

      bh = jsav.ds.binheap(initData.slice(0, initNum), {size: nodeNum});
      insertData = initData.slice(initNum, nodeNum);
      swapIndex = jsav.variable(-1);
      insertPos = jsav.variable(0);
      insertValue = jsav.variable("Insert " + insertData[0], {visible: true});
      $.fx.off = false;
      return bh;
    }
    
    function model(modeljsav) {
      var modelbh = modeljsav.ds.binheap(initData.slice(0, initNum), {size: initData.length, nodegap: 20});
      modelbh.origswap = modelbh.swap; // store original heap grade function
      // set all steps gradeable that include a swap
      modelbh.swap = function (ind1, ind2, opts) {
        this.origswap(ind1, ind2, opts);
        this.jsav.stepOption("grade", true);
      };
      modeljsav._undo = [];
      for (var i = initNum; i < initData.length; i++) {
        modeljsav.umsg("Inserting " + initData[i]);
        modeljsav.step();
        modelbh.insert(initData[i]);
      }
      return modelbh;
    }

    // Process About button: Pop up a message with an Alert
    function about() {
      alert("Heap Insert Proficiency Exercise\nWritten by Ville Karavirta\nCreated as part of the OpenDSA hypertextbook project\nFor more information, see http://algoviz.org/OpenDSA\nSource and development history available at\nhttps://github.com/cashaffer/OpenDSA\nCompiled with JSAV library version " + JSAV.version());
    }

   
    function fixState(modelHeap) {
      var size = modelHeap.size();
      swapIndex.value(-1); // only swaps are graded so swapIndex cannot be anything else after correct step                                                    
      for (var i = 0; i < size; i++) {
        bh.css(i, {"background-color": modelHeap.css(i, "background-color")});
        bh.value(i, modelHeap.value(i));
      }
      bh.heapsize(modelHeap.heapsize());
      exercise.gradeableStep();
    }


    var exercise = jsav.exercise(model, init, { css: "background-color" },
        { controls: $('.jsavexercisecontrols'), fix: fixState });
    exercise.reset();
    
    function clickHandler(index) {
      jsav._redo = []; // clear the forward stack, should add a method for this in lib
      if (bh.value(index) === "") {
        var inspos = insertPos.value();
        if (inspos < insertData.length) {
          bh.value(index, insertData[inspos]);
          insertPos.value(inspos + 1);
          if (inspos < insertData.length - 1) {
            insertValue.value("Insert " + insertData[inspos + 1]);
          } else {
            insertValue.value("No more data");
          }
          exercise.gradeableStep();
        }
        return;
      }
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
    
    $(".jsavcontainer").on("click", ".jsavarray .jsavindex", function() {
      var index = $(this).parent(".jsavarray").find(".jsavindex").index(this);
      clickHandler(index);
    });
    
    $(".jsavcontainer").on("click", ".jsavbinarytree .jsavbinarynode", function() {
      var index = $(this).data("jsav-heap-index") - 1;
      clickHandler(index);
    });
    
    $("#about").click(about);
  });
}(jQuery));
