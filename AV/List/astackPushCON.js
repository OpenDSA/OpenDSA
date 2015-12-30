/*global ODSA */
// Written by Jun Yang and Cliff Shaffer
// Astack push method
$(document).ready(function() {
  "use strict";
  var av_name = "astackPushCON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object
  var av = new JSAV(av_name);
  var pseudo = av.code(code[0]);
  var topMargin = 0;
  var leftMargin = 30;

  var arr = av.ds.array([12, 45, 5, 81, "", "", "", ""],
                        {indexed: true, top: topMargin, left: 20});
  arr.addClass([4, 5, 6, 7], "unused");
  var topArr = av.ds.array([4], {left: leftMargin + 50, top: topMargin + 60});
  av.label("top", {left: leftMargin + 20, top: topMargin + 60});

  // The purpose of this "array" is only to hold a value,
  // it will always remain hidden.
  // In slide 3, we will get the effect of moving a value into the array,
  // which comes out of this dummy array.
  var arrCopy = av.ds.array([10]);
  arrCopy.hide();

  // Slide 1
  av.umsg(interpret("sc1"));
  pseudo.setCurrentLine("sig");
  av.displayInit();

  // Slide 2
  av.umsg(interpret("sc2"));
  arr.highlight(4);
  pseudo.setCurrentLine("full");
  av.step();

  // Slide 3
  av.umsg(interpret("sc3"));
  pseudo.setCurrentLine("copy");
  av.effects.copyValue(arrCopy, 0, arr, 4);
  arr.removeClass(4, "unused");
  av.step();

  // Slide 4
  av.umsg(interpret("sc4"));
  topArr.value(0, 5);
  topArr.highlight(0);
  arr.unhighlight(4);
  arr.highlight(5);
  av.recorded();
});
