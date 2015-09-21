/*global JSAV, window */
(function() {
  "use strict";
  var av,               // The JSAV object
      answerArr = [],   // The (internal) array that stores the correct answer
      cloneArr = [],    // Copy of (internal) array at start of exercise for reset
      jsavArr,          // JSAV array that the user manipulates
      topArr,           // JSAV array that holds value for top
      selectedIndex,    // Array position that has been selected by user
      inValue;          // insertion value

  var astackPushPRO = {
    userInput: null,        // Boolean: Tells if user ever did anything

    // Click event handler on the array
    clickHandler: function(index) {
      if (selectedIndex === -1) { // nothing currently selected
        // Selecting the current array index
        jsavArr.css(index, {"font-size": "110%"});
        selectedIndex = index;
        jsavArr.highlight(index);
      } else { // Something is already selected
        if (selectedIndex !== index) { // He's swapping
          jsavArr.swap(selectedIndex, index);
          jsavArr.unhighlight(selectedIndex);
          jsavArr.css(selectedIndex, {"font-size": "100%"});
        }
        jsavArr.css(index, {"font-size": "100%"});
        jsavArr.unhighlight(index);
        selectedIndex = -1;  // Reset to nothing selected
      }
      astackPushPRO.userInput = true;
    },

    // reset function definition
    reset: function(max_size, curr_size) {
      var leftMargin = 30, topMargin = 40;
      selectedIndex = -1;

      if ($("#AstackPushPRO")) {
        $("#AstackPushPRO").empty();
      }
      av = new JSAV("AstackPushPRO");

      if (topArr) { topArr.clear(); }
      topArr = av.ds.array([curr_size], {indexed: false, center: false, left: leftMargin, top: 0});

      if (jsavArr) { jsavArr.clear(); }
      jsavArr = av.ds.array(cloneArr, {indexed: true, center: false,
                                       left: leftMargin, top: topMargin});
      jsavArr.click(astackPushPRO.clickHandler);

      av.recorded();
      av.forward();

      astackPushPRO.userInput = false;
    },

    // Initialise the exercise
    initJSAV: function(max_size, curr_size, insertValue) {
      var i;

      //global variables
      selectedIndex = -1;
      inValue = insertValue;
      answerArr.length = 0; // Out with the old

      // Give random numbers in range 0..999
      for (i = 0; i < curr_size; i++) {
        answerArr[i] = Math.floor(Math.random() * 1000);
      }
      for (i = 0; i < max_size - curr_size; i++) {
        answerArr.push([""]);
      }
      // Now make a copy
      cloneArr = answerArr.slice(0);

      astackPushPRO.reset(max_size, curr_size);
      av.label("top:", {left: 0, top: 2});

      // correct answer
      answerArr.splice(curr_size, 0, inValue);
      answerArr.splice(curr_size + 1, 1);

      // Set up handler for reset button
      $("#reset").click(function() { astackPushPRO.reset(max_size, curr_size); });
      $("#insert").click(function() { astackPushPRO.insert(); });
      $("#top").click(function() { astackPushPRO.settop(); });
    },

    // Handler for set top button
    settop: function() {
      if (selectedIndex !== -1) { // Don't do anything if no index selected
        topArr.value(0, selectedIndex);
      }
    },

    // Handler for insert button
    insert: function() {
      if (selectedIndex !== -1) {
        jsavArr.value(selectedIndex, inValue);
        jsavArr.css(selectedIndex, {"background-color": "#ddd"});
        jsavArr.css(selectedIndex, {"font-size": "100%"});
        jsavArr.unhighlight(selectedIndex);
        selectedIndex = -1;
        astackPushPRO.userInput = true;
      }
    },

    // Check user's answer for correctness: User's array must match answer
    checkAnswer: function(max_size, curr_size) {
      if (topArr.value(0) !== (curr_size + 1)) {
        return false;
      }
      for (var i = 0; i < max_size; i++) {
        if (jsavArr.value(i) !== answerArr[i]) {
          return false;
        }
      }
      return true;
    }
  };

  window.astackPushPRO = window.astackPushPRO || astackPushPRO;
}());
