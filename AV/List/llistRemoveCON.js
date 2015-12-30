/*global ODSA */
// Written by Jun Yang and Cliff Shaffer
// Linked list deletion
$(document).ready(function() {
  "use strict";
  var av_name = "llistRemoveCON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object
  var av = new JSAV(av_name);
  var pseudo = av.code(code[0]);

  // Relative offsets
  var leftMargin = 250;
  var topMargin = 35;

  var l = av.ds.list({nodegap: 30, center: false,
                      left: leftMargin, top: topMargin});
  l.addFirst("null").addFirst(10).addFirst(35).addFirst(8).addFirst(23).addFirst("null");
  l.layout();
  av.pointer("head", l.get(0));
  av.pointer("curr", l.get(2));
  av.pointer("tail", l.get(5));
  l.get(2).addVLine();

  // Dashline
  var dashline = av.g.polyline([[leftMargin + 186, topMargin + 32],
                                [leftMargin + 125 + 74, topMargin + 32],
                                [leftMargin + 199, topMargin + 3],
                                [leftMargin + 276, topMargin + 3],
                                [leftMargin + 276, topMargin + 32],
                                [leftMargin + 297, topMargin + 32]],
                               {"arrow-end": "classic-wide-long",
                                opacity: 0, "stroke-width": 2,
                                "stroke-dasharray": "-"});

  // Create hidden array for holding the removed value
  var arr = av.ds.array([10], {indexed: false, left: leftMargin + 140,
                               top: topMargin + 50}).hide();

  var labelIt = av.label("it", {left: leftMargin + 125, top: topMargin + 54});
  labelIt.hide();

  // Slide 1
  av.umsg(interpret("sc1"));
  pseudo.setCurrentLine("sig");
  av.displayInit();

  // Slide 2
  av.umsg(interpret("sc2"));
  l.get(2).highlight();
  l.layout({updateLeft: false}); // Do not change left position on update
  av.step();

  // Slide 3
  av.umsg(interpret("sc3"));
  arr.show();
  av.effects.copyValue(l.get(2), arr, 0);
  labelIt.show();
  l.get(2).unhighlight();
  arr.highlight(0);
  pseudo.setCurrentLine("remember");
  av.step();

  // Slide 4
  av.umsg(interpret("sc4"));
  av.effects.copyValue(l.get(3), l.get(2));
  l.get(2).highlight();
  arr.unhighlight(0);
  pseudo.setCurrentLine("setelem");
  av.step();

  // Slide 5
  av.umsg(interpret("sc5"));
  l.get(2).edgeToNext().hide();
  l.get(3).edgeToNext().hide();
  dashline.show();
  l.get(4).highlight();
  pseudo.setCurrentLine("setnext");
  av.step();

  // Slide 6
  av.umsg(interpret("sc6"));
  l.remove(3);
  dashline.hide();
  l.layout();
  l.get(2).edgeToNext().show();
  l.get(2).unhighlight();
  l.get(3).unhighlight();
  pseudo.setCurrentLine("listSize");
  av.step();

  // Slide 7
  av.umsg(interpret("sc7"));
  arr.highlight();
  pseudo.setCurrentLine("return");
  av.recorded();
});
