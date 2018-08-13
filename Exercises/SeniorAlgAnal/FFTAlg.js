/*global window */
(function() {
  "use strict";
  var av,               // The JSAV object
      polySize,          // Size of the polynomial
      list1 = [],
      list2 = [],
      zArray = [],
      answer = [],      // Array that holds the correct order for the values
      jsavList1,
      jsavList2,
      jsavZ,
      jsavArray,
      jsavOut,
      jsavLists = [],   // The actual set of lists
      empty = [],       // Dummy for empty data to reset bin array
      blockHeight = 29; // Width/height of an array or list element

  // Variables used to keep track of the index and array of the
  // currently selected element within click handler
  var ValueIndex = -1;

  var fftAlg = {
    userInput: null,      // Boolean: Tells us if user ever did anything

    // function that initialise JSAV library
    initJSAV: function() {
      var i, j;
      // Do all of the one-time initializations
      polySize = 4;
      list1 = JSAV.utils.rand.numKeys(0, 10, Math.ceil(polySize / 2));
      list2 = JSAV.utils.rand.numKeys(0, 10, Math.floor(polySize / 2));
      zArray[0] = "1";
      zArray[1] = "i";
      zArray[2] = "-1";
      zArray[3] = "-i";

      for (i = 0; i < polySize; i++) { empty[i] = ""; }

      reset();
      // Set up handler for reset button
      $("#reset").click(function() { reset(); });

      // Compute the answer
      for (j = 0; j < polySize; j++) {
        var k = Math.floor(j % Math.floor(polySize / 2));
        answer[j] = list1[k] + "+(" + zArray[j] + ")*" + list2[k];
      }
    },

    // Check user's answer for correctness
    checkAnswer: function() {
      var i;
      for (i = 0; i < polySize; i++) {
        if ((jsavOut.value(i)) !== (answer[i])) {
          return false;
        }
      }
      return true;
    }

  };

  // Handle a click event on an array
  // On click of bottom array element, highlight.
  // On click of (free) position in top array, move highlighted element there.
  function clickHandler(arr, index) {
    if (arr === jsavList2) {
      jsavArray = jsavList2;
    } else if (arr === jsavList1) {
      jsavArray = jsavList1;
    } else if (arr === jsavZ) { jsavArray = jsavZ; }

    if (ValueIndex === -1) {
      // Nothing is selected. We must be in the input array
      if (arr !== jsavArray) { return; } // Wasn't in input array
      // Don't let the user select an empty element,
      if (arr.value(index) === "") { return; }
      arr.highlight(index);
      ValueIndex = index;
    } else if (arr !== jsavOut) { // Unhighlighting, or highlighting new element
      if (ValueIndex === index) {
        jsavArray.unhighlight(ValueIndex);
        ValueIndex = -1;
      } else {
        jsavArray.unhighlight(ValueIndex);
        jsavArray.highlight(index);
        ValueIndex = index;
      }
    } else {
      // Move currently selected element from input array to selected bin
      if (jsavArray === jsavList1) {
        jsavOut.value(index, jsavArray.value(ValueIndex));
      } else if (jsavArray === jsavList2) {
        jsavOut.value(index, jsavOut.value(index) + "*" + jsavArray.value(ValueIndex));
      } else if (jsavArray === jsavZ) {
        jsavOut.value(index, jsavOut.value(index) + "+(" + jsavArray.value(ValueIndex) + ")");
      }

      jsavArray.unhighlight(ValueIndex);
      ValueIndex = -1;
    }
    fftAlg.userInput = true;
  }

  // reset function definition
  function reset() {
    var i;
    // Clear the old JSAV canvas.
    if ($("#FFTAlg")) { $("#FFTAlg").empty(); }

    // Set up the display
    av = new JSAV("FFTAlg");
    var space = 20;
    av.label("for (int j = 0; j <= n - 1; j++) {");
    av.label("Complex i = new Complex(0.0, 2 * Math.PI * j / n);", {left: 10, top: space});
    av.label("Complex z = i.exp();", {left: 10, top: space * 2});
    av.label("int k = j % (n / 2);", {left: 10, top: space * 3});
    av.label("newPoly[j] = list1[k].plus(z.times(list2[k]));", {left: 10, top: space * 4});
    av.label("}", {top: space * 5});
    var arrTop = 150;
    jsavList1 = av.ds.array(list1, {left: 70, top: arrTop});
    av.label("List1:", {left: 20, top: arrTop + 5});
    jsavList2 = av.ds.array(list2, {left: 300, top: arrTop});
    av.label("List2:", {left: 250, top: arrTop + 5});
    jsavZ = av.ds.array(zArray, {left: 90, top: arrTop + 60});
    av.label("z values:", {left: 20, top: arrTop + 65});

    jsavList1.click(function(index) { clickHandler(this, index); });
    jsavList2.click(function(index) { clickHandler(this, index); });
    jsavZ.click(function(index) { clickHandler(this, index); });


    jsavOut = av.ds.array(empty, {top: arrTop + 140, left: 103});
    jsavOut.css({"min-width": "100px !important"});
    av.label("newPoly:", {top: arrTop + 145, left: 20});
    jsavOut.click(function(index) { clickHandler(this, index); });
    for (i = 0; i < 10; i++) {
      jsavLists[i] = av.ds.list({top: (12 + i * blockHeight), left: 260, nodegap: 30});
      jsavLists[i].layout({center: false});
    }
    av.displayInit();
    av.recorded();

    fftAlg.userInput = false;
    ValueIndex = -1;
  }

  window.fftAlg = window.fftAlg || fftAlg;
}());
