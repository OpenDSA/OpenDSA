"use strict";
var jsav,             // The JSAV object
    answerArr = [],   // The (internal) array that stores the correct answer
    cloneArr = [],    // Copy of (internal) array at start of exercise for reset
    maxSize,          // Size of the JSAV array.
    jsavArr,          // The JSAV array that the user manipulates
    topPointer,       // "top" pointer
    pointerIndex,     // Index of array that the pointer points to
    selected_pointer, // Boolean: Tells if pointer is highlighted
    selected_index,   // Array position that has been selected by user
    inValue,          // insertion value
    userInput;        // Boolean: Tells if user ever did anything

JSAV._types.Pointer.prototype.click = function (fn) {
  var pointer = this;
  this.element.click(function () { fn(pointer); });
};

// pointer click handler
function pclick(pointer) {
  console.log("In pointer click handler");
  if (selected_index !== -1) { // Clear selection on array
    jsavArr.css(selected_index, {"font-size": "100%"});
    jsavArr.unhighlight(selected_index);
    selected_index = -1;
  }
  if (selected_pointer) { // Clicked again, so unhighlight
    topPointer.element.removeClass('highlight');
    selected_pointer = false;
  } else { // Highlight the pointer
    topPointer.element.addClass('highlight');
    selected_pointer = true;
  }
  userInput = true;
}

// Click event handler on the array
function clickHandler(index, e) {
  console.log("In array click handler");
  if (selected_index === -1) { // nothing currently selected
    if (selected_pointer) { // He's re-setting the pointer
      topPointer.target(jsavArr, {targetIndex: index});
      topPointer.element.removeClass('highlight');
      pointerIndex = index;
      selected_pointer = false;
    } else { // He's selecting the current array index
      jsavArr.css(index, {"font-size": "110%"});
      selected_index = index;
      jsavArr.highlight(index);
    }
  } else { // Something is already selected
    if (selected_index !== index) { // He's swapping
      jsavArr.swap(selected_index, index);
      jsavArr.unhighlight(selected_index);
      jsavArr.css(selected_index, {"font-size": "100%"});
    }
    jsavArr.css(index, {"font-size": "100%"});
    jsavArr.unhighlight(index);
    selected_index = -1;  // Reset to nothing selected
  }
  userInput = true;
}

// reset function definition
function f_reset(max_size, curr_size) {
  var leftMargin = 20, topMargin = 50;
  selected_index = -1;
  selected_pointer = false;

  if ($("#jsav")) {
    $("#jsav").empty();
  }
  jsav = new JSAV("astackPushPRO");
  // Sets the speed of animation.
  jsav.SPEED = 120;
  jsavArr = jsav.ds.array(cloneArr, {indexed: true, center: false, left: leftMargin, top : topMargin});
    
  topPointer = jsav.pointer("top", jsavArr, {targetIndex: curr_size});
  topPointer.click(pclick);
  pointerIndex = curr_size;

  //topPointer.click(pclick);
  jsav.recorded();
  jsav.forward();

  // Bind the clickHandler to handle click events on the array
  jsavArr.click(clickHandler);
  userInput = false;
}

// Initialise the exercise
function initJSAV(max_size, curr_size, insertValue) {
  var i, j;

  //global variables
  userInput = false;
  maxSize = max_size;
  selected_index = -1;
  selected_pointer = false;
  inValue = insertValue;
  answerArr.length = 0; // Out with the old

  // Give random numbers in range 0..999
  for (i = 0; i < curr_size; i++) {
    answerArr[i] = Math.floor(Math.random() * 1000);
  }
  for (i = 0; i < max_size - curr_size; i++) {
    answerArr.push.apply(answerArr, [""]);
  }
  // Now make a copy
  cloneArr = answerArr.slice(0);

  f_reset(max_size, curr_size);

  // correct answer
  answerArr.splice(curr_size, 0, inValue);
  answerArr.splice(curr_size + 1, 1);

  // Handler for insert button
  $("#insert").click(function () {
    if (selected_pointer) { // Unhighlight the pointer
      selected_pointer = false;
      topPointer.element.removeClass('highlight');
    }
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
  $("#reset").click(function () { f_reset(max_size, curr_size); });
}

// Check user's answer for correctness: User's array must match answer
function checkAnswer(max_size, curr_size) {
  if (pointerIndex !== curr_size + 1) {
    return false;
  }
  for (var i = 0; i < max_size; i++) {
    if (jsavArr.value(i) !== answerArr[i]) {
      return false;
    }
  }
  return true;
}
