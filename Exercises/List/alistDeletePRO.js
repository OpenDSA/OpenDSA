"use strict";
var av,              // The JSAV object
    answerArr = [],  // The (internal) array that stores the correct answer
    cloneArr = [],   // Copy of (internal) array at start of exercise for reset
    jsavArr,         // The array that the user manipulates (JSAV object)
    returnArr,       // Return 'box'
    returnLabel,     // Label 'return'
    delPosition,     // deletion location
    delValue,        // deletion value
    userInput,       // Boolean: Tells us if user ever did anything
    selected_index;  // Position that has been selected by user.

// Click event handler for return 'box'
function copyHandler() {
  if (selected_index !== -1) {
    av.effects.moveValue(jsavArr, selected_index, returnArr, 0);
    jsavArr.unhighlight(selected_index);
    jsavArr.css(selected_index, { "background-color": "#ddd" });
    selected_index = -1;
  }
}

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
function initJSAV(arr_size, deletePos) {
  delPosition = deletePos;
  answerArr.length = 0; // Out with the old

  // Create the array. Give random numbers in range 0..999
  for (var i = 0; i < arr_size; i++) {
    answerArr[i] = Math.floor(Math.random() * 1000);
  }
  answerArr.push.apply(answerArr, ["", "", "", ""]); // Add some blanks

  // Now make a copy
  cloneArr = answerArr.slice(0);

  // Define the correct answer.
  delValue = answerArr[delPosition]; // The deleted value
  answerArr.splice(delPosition, 1);  // The resulting array
  answerArr.push("");

  // Initialize user state
  selected_index = -1;
  userInput = false;

  av = new JSAV("alistDeletePRO");
  av.recorded();
  av.SPEED = 120; // Set the speed of animation.
  jsavArr = av.ds.array(cloneArr, {indexed: true, center: false});
  jsavArr.css({top: 50});
  returnArr = av.ds.array(["null"], {left: delPosition * 31 + 35, top: 120});
  returnLabel = av.label("return", {left: delPosition * 31 - 8, top: 125});
  var arrowCurr = av.g.line(18 + delPosition * 31, 30, 18 + delPosition * 31, 52,
                    { "arrow-end": "classic-wide-long",
                      "opacity": 100, "stroke-width": 2});
  var label = av.label("Curr", { before: jsavArr,
                                 left: 4 + delPosition * 31, top: -5});

  // Bind the clickHandler to handle click events on the array
  jsavArr.click(clickHandler);
  returnArr.click(copyHandler);

  // Set up handler for reset button
  $("#reset").click(function () { f_reset(); });
}

// Check user's answer for correctness: User's array must match answer
function checkAnswer(arr_size) {
  if (delValue !== returnArr.value(0)) { return false; }
  for (var i = 0; i < arr_size + 4; i++) {
    if (jsavArr.value(i) !== answerArr[i]) {
      return false;
    }
  }
  return true;
}
