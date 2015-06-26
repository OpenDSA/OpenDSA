/*global ODSA */
"use strict";
// Written by Jun Yang and Cliff Shaffer
// LStack push slideshow
$(document).ready(function () {
  var av_name = "lstackPushCON";
  var config = ODSA.UTILS.loadConfig({'av_name': av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object
  var av = new JSAV(av_name);
  var pseudo = av.code(code);

  // Relative offsets
  var leftMargin = 20;
  var topMargin = 35;
  var list = av.ds.list({"nodegap": 30, left: leftMargin, top: topMargin});
  list.addFirst(15)
      .addFirst(12)
      .addFirst(8)
      .addFirst("");
  list.get(3).addTail({left: 222});
  var newnode = list.get(0);
  newnode.edgeToNext().hide();
  newnode.hide();
  list.layout();
  var topPointer = av.pointer("top", list.get(1));

  // Dummy hidden array for copy effect
  var arr = av.ds.array([10]);
  arr.hide();

  // Slide 1
  av.umsg(interpret("av_c1"));
  pseudo.setCurrentLine("sig");
  av.displayInit();

  // Slide 2
  av.umsg(interpret("av_c2"));
  newnode.show();
  list.layout();
  newnode.highlight();
  pseudo.setCurrentLine("new");
  av.step();

  // Slide 3
  av.umsg(interpret("av_c3"));
  av.effects.copyValue(arr, 0, newnode);
  av.step();

  // Slide 4
  av.umsg(interpret("av_c4"));
  newnode.edgeToNext().show();
  av.step();

  // Slide 5
  av.umsg(interpret("av_c5"));
  topPointer.target(newnode);
  av.step();

  // Slide 6
  newnode.unhighlight();
  av.umsg(interpret("av_c6"));
  pseudo.setCurrentLine("size");
  av.step();
  av.recorded();
});
