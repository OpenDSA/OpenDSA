"use strict";
var av,               // The JSAV object
    answerArr = [],   // The (internal) array that stores the correct answer
    cloneArr = [],    // Copy of (internal) array at start of exercise for reset
    maxSize,          // Size of the JSAV array.
    jsavArr,          // The JSAV array that the user manipulates
    topPointer,       // "top" pointer
    pointerIndex,     // Index of array that the pointer points to
    pSelected,        // Boolean: Tells if pointer is highlighted
    selectedIndex,    // Array position that has been selected by user
    inValue,          // insertion value
    userInput;        // Boolean: Tells if user ever did anything

JSAV._types.Pointer.prototype.click = function (fn) {
  var pointer = this;
  this.element.click(function () { fn(pointer); });
};

// pointer click handler
function pclick(pointer) {
  if (selectedIndex !== -1) { // Clear selection on array
    jsavArr.css(selectedIndex, {"font-size": "100%"});
    jsavArr.unhighlight(selectedIndex);
    selectedIndex = -1;
  }
  if (pSelected) { // Clicked again, so unhighlight
    topPointer.element.removeClass("highlight");
    pSelected = false;
  } else { // Highlight the pointer
    topPointer.element.addClass("highlight");
    pSelected = true;
  }
  userInput = true;
}

// Click event handler on the array
function clickHandler(index, e) {
  if (selectedIndex === -1) { // nothing currently selected
    if (pSelected) { // He's re-setting the pointer
      topPointer.target(jsavArr, {targetIndex: index});
      av.container.trigger("jsav-updaterelative");
      topPointer.element.removeClass("highlight");
      pointerIndex = index;
      pSelected = false;
    } else { // He's selecting the current array index
      jsavArr.css(index, {"font-size": "110%"});
      selectedIndex = index;
      jsavArr.highlight(index);
    }
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
  userInput = true;
}

// reset function definition
function f_reset(max_size, curr_size) {
  var leftMargin = 20, topMargin = 50;
  selectedIndex = -1;
  pSelected = false;

  if ($("#astackPushPRO")) {
    $("#astackPushPRO").empty();
  }
  av = new JSAV("astackPushPRO");
  jsavArr = av.ds.array(cloneArr, {indexed: true, center: false,
                                   left: leftMargin, top : topMargin});
    
  if (typeof topPointer !== "undefined") {
    topPointer.element.remove();
    topPointer.arrow.element.remove();
  }

  topPointer = av.pointer("top", jsavArr, {targetIndex: curr_size});
  topPointer.click(pclick);
  pointerIndex = curr_size;

  av.recorded();
  av.forward();

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
  selectedIndex = -1;
  pSelected = false;
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
    if (pSelected) { // Unhighlight the pointer
      pSelected = false;
      topPointer.element.removeClass("highlight");
    }
    if (selectedIndex !== -1) {
      jsavArr.value(selectedIndex, inValue);
      jsavArr.css(selectedIndex, { "background-color": "#ddd" });
      jsavArr.css(selectedIndex, {"font-size": "100%"});
      jsavArr.unhighlight(selectedIndex);
      selectedIndex = -1;
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
