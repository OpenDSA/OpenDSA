/*global window */
(function() {
  "use strict";
  var av,             // The JSAV object
      initData = [],  // Internal array that stores orginal problem instance
      bh,             // JSAV binary heap object (that user manipulates)
      bhClone,       // Copy of JSAV binary heap object that holds the answer for later
      selectedIndex; // Position that has been selected by user for swap

  var heapsortStepPRO = {
    userInput: null,      // Boolean: Tells us if user ever did anything

    // Initialise JSAV library
    initJSAV: function(size) {
      initData = JSAV.utils.rand.numKeys(10, 100, size);

      reset(size);

      $(".jsavcontainer").on("click", ".jsavarray .jsavindex",
             function() {
                var index = $(this).parent(".jsavarray").find(".jsavindex").index(this);
                clickHandler(index);
              });
      // bind the clickHandler to handle click events on the binheap
      $(".jsavcontainer").on("click", ".jsavbinarytree .jsavbinarynode",
             function() {
                var index = $(this).data("jsav-heap-index") - 1;
                clickHandler(index);
              });

      // Set up handler for decrement button
      $("#decrement").click(function() { decrement(); });

      // Set up handler for reset button
      $("#reset").click(function() { reset(size); });
    },

    // Validate student's answer
    checkAnswer: function(arrSize) {
      for (var i = 0; i < arrSize; i++) {
        if (bh.value(i) !== bhClone.value(i)) { return false; }
      }
      if (bh.heapsize() !== bhClone.heapsize()) { return false; }
      return true;
    }

  };

  // Handle a click event
  function clickHandler(index) {
    if (selectedIndex === -1) { // if first click
      bh.css(index, {"font-size": "130%"});
      selectedIndex = index;
    } else {
      bh.swap(selectedIndex, index, {});
      bh.css(index, {"font-size": "100%"});
      bh.css(selectedIndex, {"font-size": "100%"});
      selectedIndex = -1;
    }
    heapsortStepPRO.userInput = true;
  }

  // decrement function definition
  function decrement() {
    bh.addClass(bh.heapsize() - 1, "unused");
    bh.heapsize(bh.heapsize() - 1);
    heapsortStepPRO.userInput = true;
  }

  // reset function definition
  function reset(hsize) {
    // Clear the old JSAV canvas.
    if ($("#HeapsortStepPRO")) { $("#HeapsortStepPRO").empty(); }

    // Set up the display
    av = new JSAV("HeapsortStepPRO");
    // Compute the answer. This will be stored in bhClone for later
    // comparison with the student's answer.
    bhClone = av.ds.binheap(initData,
                            {visible: false, compare: function(a, b) { return b - a; }});
    bhClone.swap(0, hsize - 1);
    bhClone.heapsize(hsize - 1);
    bhClone.heapify(1);

    bh = av.ds.binheap(initData, {compare: function(a, b) { return b - a; }});
    // bind the clickHandler to handle click events on the array
    av.displayInit();
    av.recorded();

    selectedIndex = -1;
    heapsortStepPRO.userInput = false;
  }

  window.heapsortStepPRO = window.heapsortStepPRO || heapsortStepPRO;
}());
