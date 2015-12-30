/*global use */
"ODSA strict";
// Search slideshow
$(document).ready(function () {
  var av_name = "BSTsearchCON";
  var config = ODSA.UTILS.loadConfig({"av_name": av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object
  var av = new JSAV(av_name);
  var pseudo = av.code(code[0]);

  var bstTop = 45;
  var bt = av.ds.binarytree({top: bstTop, left: 10, visible: true, nodegap: 15});
  bt.root(37);
  var rt = bt.root();
  rt.left(24);
  rt.left().left(7);
  rt.left().left().left(2);
  rt.left().right(32);
  rt.right(42);
  rt.right().left(42);
  rt.right().left().left(40);
  rt.right().right(120);
  bt.layout();

  var rt1 = av.pointer("rt", bt.root(), {anchor: "right top"});

  // Slide 1
  av.umsg(interpret("sc1"));
  pseudo.setCurrentLine("sig");
  av.displayInit();

  // Slide 2
  av.umsg(interpret("sc2"));
  pseudo.setCurrentLine("checknull");
  av.step();

  // Slide 3
  av.umsg(interpret("sc3"));
  pseudo.setCurrentLine("checkgreater");
  av.step();

  // Slide 4
  av.umsg(interpret("sc4"));
  pseudo.setCurrentLine("visitleft");
  av.step();

  // Slide 5
  av.umsg(interpret("sc5"));
  pseudo.setCurrentLine("sig");
  bt.root().addClass("processing");
  rt1.target(bt.root().left(), {anchor: "left top"});
  av.step();

  // Slide 6
  av.umsg(interpret("sc2"));
  pseudo.setCurrentLine("checknull");
  av.step();

  // Slide 7
  av.umsg(interpret("sc16"));
  pseudo.setCurrentLine("checkgreater");
  av.step();

  // Slide 8
  av.umsg(interpret("sc17"));
  pseudo.setCurrentLine("checkequal");
  av.step();

  // Slide 9
  av.umsg(interpret("sc7"));
  pseudo.setCurrentLine("visitright");
  av.step();

  // Slide 10
  av.umsg(interpret("sc9"));
  pseudo.setCurrentLine("sig");
  bt.root().left().addClass("processing");
  rt1.target(bt.root().left().right(), {anchor: "right top"});
  av.step();

  // Slide 11
  av.umsg(interpret("sc2"));
  pseudo.setCurrentLine("checknull");
  av.step();

  // Slide 12
  av.umsg(interpret("sc16"));
  pseudo.setCurrentLine("checkgreater");
  av.step();

  // Slide 13
  av.umsg(interpret("sc11"));
  pseudo.setCurrentLine("checkequal");
  av.step();

  // Slide 14
  av.umsg(interpret("sc12"));
  pseudo.setCurrentLine("found");
  av.step();

  // Slide 15
  av.umsg(interpret("sc13"));
  bt.root().left().removeClass("processing");
  rt1.target(bt.root().left(), {anchor: "left top"});
  pseudo.setCurrentLine("visitright");
  av.step();

  // Slide 16
  av.umsg(interpret("sc14"));
  bt.root().removeClass("processing");
  rt1.target(bt.root(), {anchor: "right top"});
  pseudo.setCurrentLine("visitleft");
  av.step();

  // Slide 17
  av.umsg(interpret("sc15"));
  pseudo.setCurrentLine("end");
  av.recorded();
});
