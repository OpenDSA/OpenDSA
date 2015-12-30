/*global ODSA, setPointer */
// Written by Jun Yang and Cliff Shaffer
// Dlist prev method
$(document).ready(function() {
  "use strict";
  var av_name = "dlistPrevCON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object
  var av = new JSAV(av_name);
  var pseudo = av.code(code[0]);

  // Relative offsets
  var leftMargin = 190;
  var topMargin = 35;

  // JSAV list
  var l = av.ds.dlist({nodegap: 30, center: false, left: leftMargin, top: topMargin});
  l.addFirst("null").addFirst(10).addFirst(35).addFirst(8).addFirst(23).addFirst("null");
  l.layout();
  var Vline = l.get(3).addVLine();
  var Vline1 = l.get(2).addVLine();
  Vline1.hide();
  setPointer("head", l.get(0));
  var curr = setPointer("curr", l.get(3));
  setPointer("tail", l.get(5));
  av.umsg(interpret("sc1"));
  pseudo.setCurrentLine("sig");
  av.displayInit();

  // Step 2
  av.umsg(interpret("sc2"));
  l.get(3).highlight();
  av.step();

  // Step 3
  av.umsg(interpret("sc3"));
  l.get(3).unhighlight();
  l.get(2).highlight();
  pseudo.setCurrentLine("headcheck");
  av.step();

  // Step 4
  av.umsg(interpret("sc4"));
  curr.target(l.get(2));
  Vline.hide();
  Vline1.show();
  pseudo.setCurrentLine("curr");
  av.step();

  // Step 5
  av.umsg(interpret("sc5"));
  pseudo.setCurrentLine(0);
  av.recorded();
});
