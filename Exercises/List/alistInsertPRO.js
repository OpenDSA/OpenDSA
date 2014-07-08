"use strict";
var av,           // The JSAV object
  answerArr = [],   // The (internal) array that stores the correct answer
  cloneArr = [],    // Copy of (internal) array at start of exercise for reset
  jsavArr,          // The array that the user manipulates (JSAV object)
  inPosition,       // insertion location
  inValue,          // insertion value
  userInput,        // Boolean: Tells us if user ever did anything
  selected_index;   // Position that has been selected by user for swap

// Click event handler on the array
function clickHandler(index, e) {
  if (selected_index === -1) { // if nothing currently selected
    jsavArr.css(index, {"font-size": "110%"});
    selected_index = index;
    jsavArr.highlight(index);
  } else { // an array element is selected
    // Do not swap for the same index.
    if (selected_index !== index) {
      jsavArr.swap(selected_index, index);
      jsavArr.unhighlight(selected_index);
    }
    jsavArr.css(index, {"font-size": "100%"});
    jsavArr.unhighlight(index);
    selected_index = -1;  // Reset to nothing selected
  }
  userInput = true;
}

// reset function definition
function f_reset() {
  jsavArr.clear();
  // Re-initialize the displayed array object
  jsavArr = av.ds.array(cloneArr, {indexed: true, center: false});
  jsavArr.css({top: 50});
  jsavArr.click(clickHandler); // Rebind click handler after reset
  userInput = false;
  selected_index = -1;
}

// Initialise the exercise
function initJSAV(arr_size, insertPos, insertValue) {
  var i, j;

  userInput = false;
  selected_index = -1;
  inPosition = insertPos;
  inValue = insertValue;
  answerArr.length = 0; // Out with the old

  // Give random numbers in range 0..999
  for (i = 0; i < arr_size; i++) {
    answerArr[i] = Math.floor(Math.random() * 1000);
  }

  answerArr.push.apply(answerArr, ["", "", "", ""]); // Put blanks on end
  // Now make a copy
  cloneArr = answerArr.slice(0);

  av = new JSAV("alistInsertPRO");
  av.recorded();
  av.SPEED = 120; // Set the speed of the animation
  jsavArr = av.ds.array(answerArr, {indexed: true, center: false});
  jsavArr.css({top: 50});
  var arrowCurr = av.g.line(18 + inPosition * 31, 30, 18 + inPosition * 31, 52,
                    { "arrow-end": "classic-wide-long",
                      "opacity": 100, "stroke-width": 2});
  var label = av.label("Curr", { before: jsavArr,
                                 left: 4 + inPosition * 31, top: -5});
	
  // correct answer
  answerArr.splice(inPosition, 0, inValue);
	
  // Bind the clickHandler to handle click events on the array
  jsavArr.click(clickHandler);

  // Set up handler for insert button
  $("#insert").click(function () {
    if (selected_index !== -1) {
      jsavArr.value(selected_index, inValue);
      jsavArr.css(selected_index, { "background-color": "#ddd" });
      jsavArr.css(selected_index, {"font-size": "100%"});
      jsavArr.unhighlight(selected_index);
      selected_index = -1;
      userInput = true;
    }
  });

  // Set up handler for reset button
  $("#reset").click(function () { f_reset(); });
}

// Check user's answer for correctness: User's array must match answer
function checkAnswer(arr_size) {
  var i;
  for (i = 0; i < jsavArr.size(); i++) {
    if (jsavArr.value(i) !== answerArr[i]) {
      return false;
    }
  }
  return true;
}
