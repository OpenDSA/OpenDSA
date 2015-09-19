/*global console, JSAV, window, MathJax */
(function() {
  "use strict";
  var av,           // The JSAV object
      answerArr = [], // The (internal) array that stores the correct answer
      cloneArr = [],  // Copy of the original (internal) array for reset
      functions = [], // The list of functions to choose from
      jsavArr,        // The array that the user manipulates (JSAV object)
      selected_index; // Position that has been selected by user for swap

  var growthRatesPRO = {
    userInput: null,      // Boolean: Tells us if user ever did anything

    // Click event handler on the array
    clickHandler: function(index) {
      if (selected_index === -1) { // if nothing currently selected
        jsavArr.css(index, {"font-size": "130%"});
        selected_index = index;
      } else {
        jsavArr.swap(selected_index, index);
        jsavArr.css(index, {"font-size": "100%"});
        jsavArr.css(selected_index, {"font-size": "100%"});
        selected_index = -1;  // Reset to nothing selected
      }
      growthRatesPRO.userInput = true;
    },

    // reset function definition
    f_reset: function() {
      jsavArr.clear();             // Re-initialize the displayed array object
      jsavArr = av.ds.array(cloneArr, {indexed: false, center: false, left: -5});
      jsavArr.click(growthRatesPRO.clickHandler); // Rebind click handler after reset
      growthRatesPRO.userInput = false;
      selected_index = -1;         // Reset to nothing selected
    },

    // swap two values in array
    swap: function(arr, i, j) {
      var temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    },

    // Initialise the exercise
    initJSAV: function(arr_size) {
      var i, j;
      growthRatesPRO.userInput = false;
      selected_index = -1;
      functions = [
        "$5 \\log \\log n$",
        "$2 \\log n$",
        "$\\log^2 n$",
        "$2 \\log^3 n$",
        "$7 \\sqrt{n}$",
        "$\\sqrt{n} \\log n$",
        "$n \\log \\log n$",
        "$9 n \\log n$",
        "$n \\log^2 n$",
        "$n^{4/3}$",
        "$n^2$",
        "$n^4$",
        "$2^{\\log n}$",
        "$2^{\\sqrt{n}}$",
        "$2^n$",
        "$2^{n^2}$"
      ];
      answerArr.length = 0; // Out with the old

      av = new JSAV("GrowthRatesPRO");
      av.recorded();

      MathJax.Hub.Config({tex2jax: {inlineMath: [["$", "$"], ["\\(", "\\)"]], displayMath: [["$$", "$$"], ["\\[", "\\]"]], processEscapes: true}});

      growthRatesPRO.randomize(arr_size, functions.length);
      jsavArr = av.ds.array([], {indexed: false, center: false, left: -5});
      for (i = 0; i < arr_size; i++) {
        jsavArr.value(i, answerArr[i]);
        console.log(answerArr[i]);
      }
      MathJax.Hub.Queue(["Typeset", MathJax.Hub]);

      // Now make a copy
      cloneArr = answerArr.slice(0);

      // Compute the correct Answer
      for (i = 0; i < arr_size - 1; i++) {
        for (j = 1; j < arr_size - i; j++) {
          if (functions.indexOf(answerArr[j - 1]) > functions.indexOf(answerArr[j])) {
            growthRatesPRO.swap(answerArr, j - 1, j);
          }
        }
      }

      // Bind the clickHandler to handle click events on the array
      jsavArr.click(growthRatesPRO.clickHandler);
      // Set up handler for reset button
      $("#reset").click(function() {
        growthRatesPRO.f_reset();
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
      });
    },

    // Check student's answer for correctness: User's array must match answer
    checkAnswer: function(arr_size) {
      var i;
      for (i = 0; i < arr_size; i++) {
        if (jsavArr.value(i) !== answerArr[i]) {
          return false;
        }
      }
      return true;
    },

    randomize: function(arr_size, numfuncs) {
      var count = 0;
      var randomIndex;
      while (count < arr_size) {
        randomIndex = Math.floor(Math.random() * numfuncs);
        if (answerArr.indexOf(functions[randomIndex]) === -1) {
          answerArr.push(functions[randomIndex]);
          count++;
        }
      }
    }
  };

  window.growthRatesPRO = window.growthRatesPRO || growthRatesPRO;
}());
