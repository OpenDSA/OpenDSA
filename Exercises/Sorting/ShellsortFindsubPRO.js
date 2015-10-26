/*global window */
(function() {
  "use strict";
  var av,         // The JSAV object
      jsavArr;    // The array that the user manipulates (JSAV object)

  var shellsortFindsubPRO = {
    userInput: null,  // Boolean: Tells us if user ever did anything

    // Initialise the exercise
    initJSAV: function(arr_size) {
      shellsortFindsubPRO.userInput = false;
      av = new JSAV("ShellsortFindsubPRO", {animationMode: "none"});
      jsavArr = av.ds.array(JSAV.utils.rand.numKeys(0, 999, arr_size),
                            {indexed: true, center: false});
      av.displayInit();
      av.recorded();
      // bind the clickHandler to handle click events on the array
      jsavArr.click(clickHandler);
    },

    // validate student's answer
    checkAnswer: function(start_pos, inc_size) {
      var i;
      for (i = 0; i < jsavArr.size(); i++) {
        if ((i >= start_pos) && (((i - start_pos) % inc_size) === 0)) {
          if (!jsavArr.isHighlight(i)) { return false; }
        } else if (jsavArr.isHighlight(i)) {
          return false;
        }
      }
      return true;
    }
  };

  // Click event handler on the array
  function clickHandler(index) {
    if (jsavArr.isHighlight(index)) {
      jsavArr.unhighlight(index);
    } else { jsavArr.highlight(index); }
    shellsortFindsubPRO.userInput = true;
  }

  window.shellsortFindsubPRO = window.shellsortFindsubPRO || shellsortFindsubPRO;
}());
