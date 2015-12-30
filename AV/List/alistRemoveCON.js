/*global ODSA */
// Written by Jun Yang and Cliff Shaffer
// Array-Based list deletion
$(document).ready(function() {
  "use strict";
  var arrValues = [13, 12, 20, 8, 3, "", "", ""];
  var itemsSize = 5;
  var av_name = "alistRemoveCON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object
  var av = new JSAV(av_name);
  var leftMargin = 5,
      nodeWidth = 30,
      theTop = 35,
      arrow1_x = 22 + nodeWidth;

  var arr = av.ds.array(arrValues, {indexed: true, left: leftMargin, top: theTop});
  var pseudo = av.code(code[0]);

  //vertical arrow pointing to current position
  var arrow1 = av.g.line(arrow1_x, theTop - 5, arrow1_x, theTop + 15,
                         {"arrow-end": "classic-wide-long",
                          opacity: 0, "stroke-width": 2});

  //horizontal arrow in step 4
  var arrow2 = av.g.line(arrow1_x + 100, theTop, arrow1_x + 20, theTop,
                         {"arrow-end": "classic-wide-long",
                          opacity: 0, "stroke-width": 2});

  //arrays "it", "curr", and "listSize" for holding data fields
  var arrIt = av.ds.array([""], {indexed: false, left: leftMargin + (nodeWidth + 2) * 3,
                                 top: theTop + 70});
  var labelIt = av.label("it", {before: arrIt, left: 85, top: theTop + 75});
  arrIt.hide();
  labelIt.hide();

  var arrCurr = av.ds.array([1], {indexed: false,
                                  left: leftMargin + (nodeWidth + 2) * 3, top: theTop + 105});
  av.label("curr", {before: arrCurr, left: 68, top: theTop + 110});

  var arrSize = av.ds.array([5], {indexed: false,
                                 left: leftMargin + (nodeWidth + 2) * 3, top: theTop + 140});
  av.label("listSize", {before: arrCurr, left: 46, top: theTop + 145});

  // Slide 1
  av.umsg(interpret("sc1"));
  arr.addClass([5, 6, 7], "unused");
  arr.highlight([1]);
  arrow1.show();
  pseudo.setCurrentLine("sig");
  av.displayInit();

  // Slide 2
  av.umsg(interpret("sc2"));
  arrIt.show();
  arrIt.highlight(0);
  labelIt.show();
  av.effects.copyValue(arr, 1, arrIt, 0);
  arr.value(1, "");
  arr.unhighlight([1]);
  pseudo.setCurrentLine("copy");
  av.step();

  // Slide 3
  // shift elements after current position one position to the left
  av.umsg(interpret("sc3"));
  var i;
  for (i = 2; i < itemsSize; i++) {
    av.effects.copyValue(arr, i, arr, i - 1);
  }
  arr.value(itemsSize - 1, "");
  arrow2.show();
  arr.unhighlight([1]);
  arrIt.unhighlight(0);
  pseudo.setCurrentLine("for");
  pseudo.highlight("forbody");
  arr.highlight([1, 2, 3]);
  av.step();

  // Slide 4
  av.umsg(interpret("sc4"));
  pseudo.setCurrentLine(0);   // Hack until we get multiline set method
  pseudo.unhighlight("forbody");
  pseudo.setCurrentLine("dec");
  arr.unhighlight([1, 2, 3]);
  arr.removeClass([itemsSize - 1], "unused");
  arrow2.hide();
  arrSize.value(0, 4);
  arrSize.highlight(0);
  av.step();

  // Slide 5
  av.umsg(interpret("sc5"));
  arrIt.highlight(0);
  arr.addClass([4], "unused");
  pseudo.setCurrentLine("return");
  arrSize.unhighlight(0);
  av.step();

  // Slide 6
  av.umsg(interpret("sc6"));
  arrIt.unhighlight(0);
  pseudo.setCurrentLine(0);
  av.recorded();
});
