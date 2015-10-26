"use strict";
var av,             // The JSAV object
    answerArr = [], // The (internal) array that stores the correct answer
    cloneArr = [],  // Copy of (internal) array at start of exercise for reset
    returnVal,      // The correct value that should be returned
    jsavArr,        // The array that the user manipulates (JSAV object)
    returnArr,      // Holds the value to be returned
    labelReturn,    // Label for returnArr
    topPointer,     // "top" pointer
    pSelected,      // Boolean: Tells if pointer is highlighted
    pointerIndex,   // The index of array that topPointer points to.
    userInput,      // Boolean: Tells us if user ever did anything
    selectedIndex;  // Position that has been selected by user for swap

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

// Click event handler on the array "jsavArr"
function clickHandler(index, e) {
  if (selectedIndex === -1) { // nothing currently selected
    if (pSelected) { // He's re-setting the pointer
      topPointer.target(jsavArr, {targetIndex: index});
      av.step();
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

// Click event handler on the array "returnArr"
function copyHandler(index, e) {
  if (selectedIndex !== -1) {
    av.effects.moveValue(jsavArr, selectedIndex, returnArr, 0);
    jsavArr.css(selectedIndex, { "background-color": "#ddd" });
    jsavArr.css(selectedIndex, {"font-size": "100%"});
    jsavArr.unhighlight(selectedIndex);
    selectedIndex = -1;
    userInput = true;
  }
}


// reset function definition
function f_reset(max_size, arr_size) {
  selectedIndex = -1;
  if ($("#astackPopPRO")) {
    $("#astackPopPRO").empty();
  }
  av = new JSAV("astackPopPRO");
  jsavArr = av.ds.array(cloneArr, {indexed: true, center: false, top : 50});
  returnArr = av.ds.array([""], {left: 350, top : 50});
  labelReturn = av.label("return", {left: 305, top : 55});
  pointerIndex = arr_size;

  if (typeof topPointer !== "undefined") {
    topPointer.element.remove();
    topPointer.arrow.element.remove();
  }
  topPointer = av.pointer("top", jsavArr, {targetIndex : arr_size});
  topPointer.click(pclick);
  pSelected = false;

  av.recorded();
  av.forward();
  // Bind the clickHandler to handle click events on the array
  jsavArr.click(clickHandler);
  returnArr.click(copyHandler);
  userInput = false;
}

// Initialise the exercise
function initJSAV(max_size, arr_size, insertValue) {
  var i, j;
  userInput = false;
  selectedIndex = -1;
  answerArr.length = 0; // Out with the old

  // Give random numbers in range 0..999
  for (i = 0; i < arr_size; i++) {
    answerArr[i] = Math.floor(Math.random() * 1000);
  }
  for (i = 0; i < max_size - arr_size; i++)
  {
    answerArr.push.apply(answerArr, [""]);
  }
  // Now make a copy
  cloneArr = answerArr.slice(0);

  f_reset(max_size, arr_size);

  // correct answer
  if (arr_size === 0) {
    returnVal = "";
  } else {
    returnVal = answerArr[arr_size - 1];
  }

  answerArr.splice(arr_size - 1, 0, "");
  answerArr.splice(arr_size, 1);

  // Set up handler for reset button
  $("#reset").click(function () { f_reset(max_size, arr_size); });
}

// Check user's answer for correctness
function checkAnswer(max_size, arr_size) {
  if (returnArr.value(0) !== returnVal) {
    return false;
  }
  if (arr_size === 0) {
    if (pointerIndex !== 0) {
      return false;
    }
  } else {
    if (pointerIndex !== arr_size - 1) {
      return false;
    }
  }
  var i;
  for (i = 0; i < max_size; i++) {
    if (jsavArr.value(i) !== answerArr[i]) {
      return false;
    }
  }
  return true;
}
