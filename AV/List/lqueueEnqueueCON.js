/*global ODSA */
// Written by Jun Yang and Cliff Shaffer
// List Queue enqueue method.
$(document).ready(function() {
  "use strict";
  var av_name = "lqueueEnqueueCON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object
  var av = new JSAV(av_name);
  var pseudo = av.code(code[0]);

  var leftMargin = 10;
  var topMargin = 40;
  var list = av.ds.list({nodegap: 30, left: leftMargin, top: topMargin});
  list.addFirst(30)
      .addFirst(21)
      .addFirst(3)
      .addFirst("null");
  var newNode = list.newNode("10");
  newNode.css({top: topMargin + 20});
  list.layout();
  newNode.hide();

  av.pointer("front", list.get(0));
  var rearP = av.pointer("rear", list.get(3));

  // Slide 1
  av.umsg(interpret("sc1"));
  pseudo.setCurrentLine("sig");
  av.displayInit();

  // Slide 2
  av.umsg(interpret("sc2"));
  list.layout();
  pseudo.setCurrentLine("setNext");
  newNode.show();
  newNode.highlight();
  var endNode = list.get(3);
  endNode.next(newNode);
  endNode.edgeToNext().hide();
  list.layout({updateTop: false});
  av.step();

  // Slide 3
  av.umsg(interpret("sc3"));
  newNode.unhighlight();
  endNode.edgeToNext().show();
  list.layout({updateTop: false});
  av.step();

  // Slide 4
  av.umsg(interpret("sc4"));
  list.layout();
  rearP.target(list.get(4));
  pseudo.setCurrentLine("rear");
  av.step();

  // Slide 5
  av.umsg(interpret("sc5"));
  pseudo.setCurrentLine("size");
  av.recorded();
});
