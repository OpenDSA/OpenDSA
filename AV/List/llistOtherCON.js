/*global ODSA */
// Written by Jun Yang and Cliff Shaffer
// Move curr around the Linked list
$(document).ready(function() {
  "use strict";
  var av_name = "llistOtherCON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object
  var av = new JSAV(av_name);
  var l = av.ds.list({nodegap: 30, center: false, left: 210, top: 45});
  l.addFirst("null").addFirst(10).addFirst(35).addFirst(8).addFirst(23).addFirst("null");
  l.layout();
  av.pointer("head", l.get(0));
  var curr = av.pointer("curr", l.get(3));
  av.pointer("tail", l.get(5));
  var temp = av.pointer("temp", l.get(3));
  temp.hide();
  var nextCurr = av.pointer("curr", l.get(4));
  nextCurr.hide();

  var pseudo_next = av.code($.extend({left: 80, top: 150,
                                      visible: false, lineNumbers: false}, code[0]));
  var pseudo_prev = av.code($.extend({left: 80, top: 100,
                                      visible: false, lineNumbers: false}, code[1]));
  var pseudo_pos = av.code($.extend({left: 80, top: 100,
                                     visible: false, lineNumbers: false}, code[2]));
  var bar1 = l.get(3).addVLine();
  var bar2 = l.get(4).addVLine();
  bar2.hide();

  // Slide 1
  av.umsg(interpret("sc1"));
  av.displayInit();

  // Slide 2
  av.umsg(interpret("sc2"));
  pseudo_next.show();
  pseudo_next.highlight("sig");
  av.step();

  // Slide 3
  av.umsg(interpret("sc3"));
  l.get(4).highlight();
  curr.hide();
  nextCurr.show();
  bar1.hide();
  bar2.show();
  av.step();

  // Slide 4
  av.umsg(interpret("sc4"));
  l.get(4).unhighlight();
  pseudo_next.hide();
  pseudo_prev.show();
  pseudo_prev.setCurrentLine("sig");
  av.step();

  // Slide 5
  av.umsg(interpret("sc5"));
  pseudo_next.hide();
  pseudo_prev.show();
  pseudo_prev.setCurrentLine("while");
  l.get(0).highlight();
  l.get(1).highlight();
  l.get(2).highlight();
  l.get(3).highlight();
  av.step();

  // Slide 6
  av.umsg(interpret("sc6"));
  l.get(0).unhighlight();
  l.get(1).unhighlight();
  l.get(2).unhighlight();
  temp.show();
  av.step();

  // Slide 7
  av.umsg(interpret("sc7"));
  temp.hide();
  curr.show();
  nextCurr.hide();
  bar1.show();
  bar2.hide();
  pseudo_prev.setCurrentLine("curr");
  av.step();

  // Slide 8
  av.umsg(interpret("sc8"));
  l.get(3).unhighlight();
  pseudo_prev.hide();
  pseudo_pos.show();
  pseudo_pos.setCurrentLine("sig");
  av.step();

  // Slide 9
  av.umsg(interpret("sc9"));
  l.get(1).highlight();
  l.get(2).highlight();
  l.get(3).highlight();
  l.get(4).highlight();
  curr.hide();
  bar1.hide();
  bar2.show();
  nextCurr.show();
  pseudo_pos.setCurrentLine("for");
  av.step();

  // Slide 10
  av.umsg(interpret("sc10"));
  l.get(1).unhighlight();
  l.get(2).unhighlight();
  l.get(3).unhighlight();
  l.get(4).unhighlight();
  pseudo_pos.setCurrentLine(0);
  av.recorded();
});
