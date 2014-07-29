(function ($) {
  "use strict";
  /*global alert: true, ODSA */
  $(document).ready(function () {
    var initData, bh,
        settings = new JSAV.utils.Settings($(".jsavsettings")),
        jsav = new JSAV($('.avcontainer'), {settings: settings}),
        exercise,
	inputarray,
        outputarray,
	clickHandler,
        swapIndex;

      var initinput;
      var initoutput = ["", "", "", "", ""];
      initinput = JSAV.utils.rand.numKeys(10, 100, 5);


    jsav.recorded();
    function init() {

    // initialize click handler
      if (typeof clickHandler === "undefined") {
      	clickHandler = new ClickHandler(jsav, exercise, {
      	selectedClass: "selected"
        //effect: "swap"
      });
      }
      clickHandler.reset();
      var nodeNum = 10;
      if (bh) {
        bh.clear();
      }
      initData = JSAV.utils.rand.numKeys(10, 100, nodeNum);
      var inputlabel = jsav.label("Input:", {left: 650, top: 250});
      var outputlabel = jsav.label("Output:", {left: 10, top: 250});
      // create array
      if (inputarray) {
        clickHandler.remove(inputarray);
        inputarray.clear();
      }
      inputarray = jsav.ds.array(initinput, {indexed: false, left: 650, top: 290});
      clickHandler.addArray(inputarray);

      // create array
      if (outputarray) {
        clickHandler.remove(outputarray);
        outputarray.clear();
      }
      outputarray = jsav.ds.array(initoutput, {indexed: false, left: 10, top: 290});
      clickHandler.addArray(outputarray);

      // Log the initial state of the exercise
      var exInitData = {};
      exInitData.gen_array = initData;
      ODSA.AV.logExerciseInit(exInitData);
      // create array
      if (bh) {
        clickHandler.remove(bh);
        bh.clear();
      }
      bh = jsav.ds.binheap(initData, { nodegap: 25, compare: function (a, b) { return a - b; }});
      clickHandler.addTree(bh._tree, {effect: "swap"
// was just trying some things so ignore this
 /*,
        onDrop: function () {
           // grade using the clickHandler only if the evaluator won't run
           // if the evaluator does run, it will mark the steps as gradeable
           // clickHandler won't grade if the returned value is false
	   // swapping from the tree to an array or within the tree
	   //if(clickHandler.getSelected().node != null)
	   
           	//alert("VALUE: "+this.value()+" Swapped: "+clickHandler.getSelected().node.value()+
 		//" Swag: "+clickHandler.getDsIndex(bh._tree));
           // swap within tree
	   if(clickHandler.getDsIndex(clickHandler.getSelected().struct) == 2)
	   {
                alert("Index1: "+this+" Index2: "+clickHandler.getDsIndex(clickHandler.getSelected().struct));
	   }
	   // swap from array
	   else
	   {
		
	   }
		//bh.swap(this, clickHandler.getSelected().index);
           return true;
      }
	*/});
      clickHandler.addArray(bh, {effect: "swap"});
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
      var modelbh = modeljsav.ds.binheap(initData, {nodegap: 20, compare: function (a, b) { return a - b; }});
      modelbh.origswap = modelbh.swap; // store original heap grade function
      // set all steps gradeable that include a swap
      modelbh.swap = function (ind1, ind2, opts) {
        this.origswap(ind1, ind2, opts);
        this.jsav.stepOption("grade", true);
      };

      var modelinputlabel = modeljsav.label("Input:", {left: 650, top: 230});
      var modeloutputlabel = modeljsav.label("Output:", {left: 10, top: 230});
      var modelinputarray = modeljsav.ds.array(initinput, {indexed: false, left: 650, top: 270}); 
      var modeloutputarray = modeljsav.ds.array(initoutput, {indexed: false, left: 10, top: 270});
      modeljsav.displayInit();
      var currentoutput = 0;
      var currentinput = 0;

      modeljsav._undo = [];
      while (modelinputarray.value(4) !== "") {
        modeljsav.umsg("We start by sending the root to the output.");
        modeljsav.step();

        modeljsav.effects.moveValue(modelbh, 0, modeloutputarray, currentoutput);
        currentoutput++;
        modeljsav.stepOption("grade", true);
        modeljsav.step();
        // swap with last value
        if(modeloutputarray.value(currentoutput - 1) > modelinputarray.value(currentinput))
	{
        	modeljsav.umsg("<br/>...The heap now takes an input", {preserve: true});
        	modeljsav.effects.moveValue(modelinputarray, currentinput, modelbh, 0);
        	currentinput++;
		modeljsav.stepOption("grade", true);
		modeljsav.step();

		modeljsav.umsg("The value is too small for this run and is swapped with the end of the array");
  		modelbh.swap(0, modelbh.heapsize() - 1);
		modeljsav.stepOption("grade", true);
		modeljsav.step();

       		modeljsav.umsg("<br/>...decrement the heap size", {preserve: true});
		modelbh._treenodes[modelbh.heapsize() - 1].edgeToParent().hide();
        	modelbh.css(modelbh.heapsize() - 1, {"background-color": "#ddd"});
                modelbh.heapsize(modelbh.heapsize() - 1);
                modeljsav.stepOption("grade", true);
		modeljsav.step();
        	modeljsav.umsg("<br/>...and restore the heap property", {preserve: true});
        	modelbh.heapify(1);
	}
        // normal insert
	else
	{
        modeljsav.umsg("<br/>...The heap now takes an input", {preserve: true});
        modeljsav.effects.moveValue(modelinputarray, currentinput, modelbh, 0);
        currentinput++;
        modeljsav.stepOption("grade", true);
        modeljsav.step();
        modeljsav.umsg("<br/>...and restore the heap property", {preserve: true});
        modelbh.heapify(1);
	}
      }
      return modelbh;
    }

    function handleClick(index) {
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
      alert("Replacement Selection Proficiency Exercise\nWritten by Josh Horn\nCreated as part of the OpenDSA hypertextbook project\nFor more information, see http://algoviz.org/OpenDSA\nSource and development history available at\nhttps://github.com/OpenDSA/OpenDSA\nCompiled with JSAV library version " + JSAV.version());
    }

    exercise = jsav.exercise(model, init,
                             { compare:  { css: "background-color" },
                               controls: $('.jsavexercisecontrols'), });
                               //fix: fixState });
    exercise.reset();

    //$(".jsavcontainer").on("click", ".jsavbinarytree .jsavbinarynode", function () {
    //  var index = $(this).data("jsav-heap-index") - 1;
    //  handleClick(index);
    //});
    $("#decrement").click(function () {
      if (bh.heapsize() === 0) {
        alert("Heapsize is already zero, cannot decrement!");
        return;
      }
      bh._treenodes[bh.heapsize() - 1].edgeToParent().hide();
      bh.heapsize(bh.heapsize() - 1);
      bh.css(bh.heapsize(), {"background-color": "#ddd"});
      exercise.gradeableStep();
    });
    $("#about").click(about);
  });
}(jQuery));
