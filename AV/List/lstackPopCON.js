/*global ODSA */
"use strict";
// Written by Jun Yang and Cliff Shaffer
// LStack pop slideshow
$(document).ready(function () {
  var av_name = "lstackPopCON";
  var config = ODSA.UTILS.loadConfig({'av_name': av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object
  var av = new JSAV(av_name);
  var pseudo = av.code(code);

  // Relative offsets
  var leftMargin = 10;
  var topMargin = 35;
  var list = av.ds.list({"nodegap": 30, left: leftMargin + 60, top: topMargin});
  list.addFirst(15)
      .addFirst(12)
      .addFirst(8)
      .addFirst(23);

  list.get(3).addTail({left: 222});
  var firstnode = list.get(0);
  var topPointer = av.pointer("top", firstnode);
  list.layout();

  var arrIt = av.ds.array([""], {left: leftMargin + 110, top: topMargin + 50});
  var labelIt = av.label("it", {left: leftMargin + 90, top: topMargin + 55});

  // Slide 1
  av.umsg(interpret("av_c1"));
  pseudo.setCurrentLine("sig");
  av.displayInit();

  // Slide 2
  firstnode.highlight();
  av.umsg(interpret("av_c2"));
  pseudo.setCurrentLine(0);
  av.step();

  // Slide 3
  av.effects.copyValue(firstnode, arrIt, 0);
  firstnode.unhighlight();
  arrIt.highlight(0);
  av.umsg(interpret("av_c3"));
  pseudo.setCurrentLine("it");
  av.step();

  // Slide 4
  arrIt.unhighlight();
  list.get(1).highlight();
  av.umsg(interpret("av_c4"));
  topPointer.target(list.get(1));
  firstnode.addClass("unused");
  list.layout();
  pseudo.setCurrentLine("top");
  av.step();

  // Slide 5
  av.umsg(interpret("av_c5"));
  firstnode.hide();
  firstnode.edgeToNext().hide();
  list.layout();
  pseudo.setCurrentLine("size");
  av.step();

  // Slide 6
  arrIt.highlight();
  av.umsg(interpret("av_c6"));
  list.get(1).unhighlight();
  pseudo.setCurrentLine("return");
  av.step();
  av.recorded();
});
