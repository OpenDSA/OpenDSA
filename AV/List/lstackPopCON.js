/*global ODSA */
// Written by Jun Yang and Cliff Shaffer
// LStack pop slideshow
$(document).ready(function() {
  "use strict";
  var av_name = "lstackPopCON";
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object
  var av = new JSAV(av_name);
  var pseudo = av.code(code[0]);

  // Relative offsets
  var leftMargin = 10;
  var topMargin = 35;
  var list = av.ds.list({nodegap: 30, left: leftMargin + 60, top: topMargin});
  list.addFirst(15)
      .addFirst(12)
      .addFirst(8)
      .addFirst(23);

  var firstnode = list.get(0);
  var topPointer = av.pointer("top", firstnode);
  list.layout();

  var arrIt = av.ds.array([""], {left: leftMargin + 110, top: topMargin + 50});
  av.label("it", {left: leftMargin + 90, top: topMargin + 55});

  // Slide 1
  av.umsg(interpret("sc1"));
  pseudo.setCurrentLine("sig");
  av.displayInit();

  // Slide 2
  av.umsg(interpret("sc2"));
  firstnode.highlight();
  pseudo.setCurrentLine("null");
  av.step();

  // Slide 3
  av.umsg(interpret("sc3"));
  av.effects.copyValue(firstnode, arrIt, 0);
  firstnode.unhighlight();
  arrIt.highlight(0);
  pseudo.setCurrentLine("it");
  av.step();

  // Slide 4
  av.umsg(interpret("sc4"));
  arrIt.unhighlight();
  list.get(1).highlight();
  topPointer.target(list.get(1));
  firstnode.addClass("unused");
  list.layout();
  pseudo.setCurrentLine("top");
  av.step();

  // Slide 5
  av.umsg(interpret("sc5"));
  firstnode.hide();
  firstnode.edgeToNext().hide();
  list.layout();
  pseudo.setCurrentLine("size");
  av.step();

  // Slide 6
  av.umsg(interpret("sc6"));
  arrIt.highlight();
  list.get(1).unhighlight();
  pseudo.setCurrentLine("return");
  av.step();
  av.recorded();
});
