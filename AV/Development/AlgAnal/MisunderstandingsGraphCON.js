/*global ODSA */
"use strict";
// Written by Mohammed Farghally and Cliff Shaffer
// Common Misunderstandings example graph
$(document).ready(function () {
  var av_name = "MisunderstandingsGraphCON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({"av_name": av_name}),
      interpret = config.interpreter;       // get the interpreter
  var av = new JSAV(av_name);
  
  // Slide 1
  av.umsg("");

  av.recorded();
});
