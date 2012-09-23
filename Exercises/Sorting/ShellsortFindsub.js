"use strict";
var
  jsav,       // The JSAV object
  jsavArr,    // The array that the user manipulates (JSAV object)
  userInput;  // Boolean: Tells us if user ever did anything

// Click event handler on the array
var clickHandler = function (index, e) {
  if (jsavArr.isHighlight(index)) {	 
    jsavArr.unhighlight(index);
  }
  else {
    jsavArr.highlight(index);
  }
  userInput = true;
}

// Initialise the exercise
var initJSAV = function (a) {
  userInput = false;
  jsav = new JSAV("jsav", {"animationMode": "none"});
  jsavArr = jsav.ds.array(JSAV.utils.rand.numKeys(0, 999, a),{indexed: true, center: false});
  // bind the clickHandler to handle click events on the array
  jsavArr.click(clickHandler);
}

// validate student's answer 
var checkAnswer = function (a, start_pos, inc_size) {
  var i;
  var j=0;
  for (i=0; i<jsavArr.size(); i++) {
    if ((i >= start_pos) && (((i - start_pos) % inc_size) == 0)) {
      if (!jsavArr.isHighlight(i)) { return false; }
    }
    else {
      if (jsavArr.isHighlight(i)) { return false; }
    }
  }
  return true;
}
