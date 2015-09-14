(function() {
  var
    av, // The JSAV object
    userInput, // Boolean: Tells us if user ever did anything
    initData = [], // Internal array that stores orginal problem instance
    bh, // JSAV binary heap object (that user manipulates)
    bh_clone, // Copy of JSAV binary heap object that holds the answer for later
    heap_size, // Size of the heap (and problem instance)
    selected_index, // Position that has been selected by user for swap

    // Handle a click event
    heapsortStepPRO = {


      clickHandler: function(index) {
        if (selected_index === -1) { // if first click
          bh.css(index, {
            "font-size": "130%"
          });
          selected_index = index;
        } else {
          bh.swap(selected_index, index, {});
          bh.css(index, {
            "font-size": "100%"
          });
          bh.css(selected_index, {
            "font-size": "100%"
          });
          selected_index = -1;
        }
        userInput = true;
      },

      // reset function definition
      f_reset: function() {
        userInput = false;
        selected_index = -1;
        if (bh) {
          bh.clear();
        }
        bh = av.ds.binheap(initData, {
          compare: function(a, b) {
            return b - a;
          }
        });
      },

      // Initialise JSAV library
      initJSAV: function(size) {
        av = new JSAV("HeapsortStepPRO");
        av.recorded();
        initData = JSAV.utils.rand.numKeys(10, 100, size);
        heap_size = size;

        heapsortStepPRO.f_reset();

        // Compute the answer. This will be stored in bh_clone for later
        // comparison with the student's answer.
        bh_clone = av.ds.binheap(initData, {
          visible: false,
          compare: function(a, b) {
            return b - a;
          }
        });
        bh_clone.swap(0, size - 1);
        bh_clone.heapsize(size - 1);
        bh_clone.heapify(1);

        // bind the clickHandler to handle click events on the array
        $(".jsavcontainer").on("click", ".jsavarray .jsavindex",
          function() {
            var index = $(this).parent(".jsavarray").find(".jsavindex").index(this);
            heapsortStepPRO.clickHandler(index);
          });
        // bind the clickHandler to handle click events on the binheap
        $(".jsavcontainer").on("click", ".jsavbinarytree .jsavbinarynode",
          function() {
            var index = $(this).data("jsav-heap-index") - 1;
            heapsortStepPRO.clickHandler(index);
          });
        // Set up handler for decrement button
        $("#decrement").click(
          function() {
            bh.addClass(bh.heapsize() - 1, "unused");
            //      bh.css(bh.heapsize() - 1, { "background-color": "#ddd" });
            bh.heapsize(bh.heapsize() - 1);
            userInput = true;
          });
        // Set up handler for reset button
        $("#reset").click(function() {
          heapsortStepPRO.f_reset();
        });
      },

      // Validate student's answer
      checkAnswer: function(arr_size) {
        for (var i = 0; i < arr_size; i++) {
          if (bh.value(i) !== bh_clone.value(i)) {
            return false;
          }
        }
        if (bh.heapsize() !== bh_clone.heapsize()) {
          return false;
        }
        return true;
      }
    };
  window.heapsortStepPRO = window.heapsortStepPRO || heapsortStepPRO;
}())
