/*global window */
(function() {
  "use strict";
  var av,               // The JSAV object
      arrSize,          // Full array size
      arrdata = [],     // The array to be sorted; keep for reset
      answer = [],      // Array that holds the correct order for the values
      jsavInput,        // JSAV array of input values
      jsavBins,         // JSAV array that serves as a point for user to click on bins
      jsavLists = [],   // The actual set of lists
      empty = [],       // Dummy for empty data to reset bin array
      blockHeight = 29; // Width/height of an array or list element

  // Variables used to keep track of the index and array of the
  // currently selected element within click handler
  var ValueIndex = -1;

  var openHashPRO = {
    userInput: null,      // Boolean: Tells us if user ever did anything

    // function that initialise JSAV library
    initJSAV: function(asize) {
      var i, j;
      var temp = [];
      // Do all of the one-time initializations
      arrSize = asize;
      arrdata = JSAV.utils.rand.numKeys(0, 999, arrSize);
      for (i = 0; i < 10; i++) { empty[i] = ""; }

      reset();
      // Set up handler for reset button
      $("#reset").click(function() { reset(); });

      // Compute the answer
      for (i = 0; i < 10; i++) {
        temp[i] = [];
      }
      for (i = 0; i < arrSize; i++) {
        var a = arrdata[i] % 10;
        temp[a][temp[a].length] = arrdata[i];
      }
      var curr = 0;
      for (i = 0; i < 10; i++) {
        for (j = 0; j < temp[i].length; j++) {
          answer[curr++] = temp[i][j];
        }
      }
    },

    // Check user's answer for correctness
    checkAnswer: function(aSize) {
      var i, j;
      var curr = 0;
      for (i = 0; i < 10; i++) {
        for (j = 0; j < jsavLists[i].size(); j++) {
          if (jsavLists[i].get(j).value() !== answer[curr++]) {
            return false;
          }
        }
      }
      if (curr !== aSize) { return false; }
      return true;
    }

  };

  // Handle a click event on an array
  // On click of bottom array element, highlight.
  // On click of (free) position in top array, move highlighted element there.
  function clickHandler(arr, index) {
    if (ValueIndex === -1) {
      // Nothing is selected. We must be in the input array
      if (arr !== jsavInput) { return; } // Wasn't in input array
      // Don't let the user select an empty element,
      if (arr.value(index) === "") { return; }
      arr.highlight(index);
      ValueIndex = index;
    } else if (arr !== jsavBins) { // He is unhighlighting, or highlighting new element
      if (ValueIndex === index) {
        jsavInput.unhighlight(ValueIndex);
        ValueIndex = -1;
      } else {
        jsavInput.unhighlight(ValueIndex);
        jsavInput.highlight(index);
        ValueIndex = index;
      }
    } else {
      // Move currently selected element from input array to selected bin
      jsavLists[index].addLast(jsavInput.value(ValueIndex));
      jsavLists[index].layout({center: false});
      jsavInput.unhighlight(ValueIndex);
      jsavInput.value(ValueIndex, "");
      ValueIndex = -1;
    }
    openHashPRO.userInput = true;
  }

  // reset function definition
  function reset() {
    var i;
    // Clear the old JSAV canvas.
    if ($("#OpenHashPRO")) { $("#OpenHashPRO").empty(); }

    // Set up the display
    av = new JSAV("OpenHashPRO");
    jsavInput = av.ds.array(arrdata, {indexed: true, center: false,
                                      layout: "vertical", top: 10});
    jsavInput.click(function(index) { clickHandler(this, index); });
    jsavBins = av.ds.array(empty, {indexed: true, center: false,
                                   layout: "vertical", top: 10, left: 200});
    jsavBins.click(function(index) { clickHandler(this, index); });
    for (i = 0; i < 10; i++) {
      jsavLists[i] = av.ds.list({top: (12 + i * blockHeight), left: 260, nodegap: 30});
      jsavLists[i].layout({center: false});
    }
    av.displayInit();
    av.recorded();

    openHashPRO.userInput = false;
    ValueIndex = -1;
  }

  window.openHashPRO = window.openHashPRO || openHashPRO;
}());
