/*global ODSA */
// Written by Sally Hamouda and Cliff Shaffer
$(document).ready(function() {
  "use strict";
  var theArray = [2, 4, 6];
  var av_name = "recurTraceSumCON";
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter, // get the interpreter
      code = config.code;
  var av = new JSAV(av_name);

  // Slide 1
  av.umsg(interpret("sc1"));
  var pseudo = av.code(code);
  var arr = av.ds.array(theArray, {indexed: true});
  var label = av.label("arr", {before: arr, left: 350, top: 145});
  label.show();
  av.displayInit();

  // Slide 2
  av.umsg(interpret("sc2"));
  var arrcopyn3 = av.ds.array(theArray, {left: 40, top:  120, indexed: false});
  var labeln3 = av.label("n=3", {before: arrcopyn3, left: 5, top: 123});
  pseudo.highlight("sig");
  av.step();

  // Slide 3
  av.umsg(interpret("sc3"));
  pseudo.unhighlight("sig");
  pseudo.highlight("bc");
  av.step();

  // Slide 4
  av.umsg(interpret("sc4"));
  pseudo.unhighlight("bc");
  pseudo.highlight("rc");
  av.step();

  // Slide 5
  av.umsg(interpret("sc5"));
  var arrcopyn2 = av.ds.array(theArray, {left: 40, top:  75, indexed: false});
  var labeln2 = av.label("n=2", {before: arrcopyn2, left: 5, top: 78});
  pseudo.unhighlight("rc");
  pseudo.highlight("sig");
  av.step();

  // Slide 6
  av.umsg(interpret("sc6"));
  av.step();

  // Slide 7
  av.umsg(interpret("sc7"));
  var arrcopyn1 = av.ds.array(theArray, {left: 40, top:  30, indexed: false});
  var labeln1 = av.label("n=1", {before: arrcopyn2, left: 5, top: 33});
  pseudo.unhighlight("sig");
  pseudo.highlight("rc");
  av.step();

  // Slide 8
  av.umsg(interpret("sc8"));
  pseudo.unhighlight("rc");
  pseudo.highlight("sig");
  av.step();

  // Slide 9
  av.umsg(interpret("sc9"));
  pseudo.unhighlight("sig");
  pseudo.highlight("rc");
  av.step();

  // Slide 10
  av.umsg(interpret("sc10"));
  pseudo.unhighlight("rc");
  pseudo.highlight("bcac");
  av.step();

  // Slide 11
  av.umsg(interpret("sc11"));
  pseudo.unhighlight("bcac");
  pseudo.highlight("rc");
  arrcopyn1.highlight([0]);
  //arr.highlight([0]);
  av.step();

  // Slide 12
  av.umsg(interpret("sc12"));
  av.step();

  // Slide 13
  av.umsg(interpret("sc13"));
  arrcopyn1.hide();
  labeln1.hide();
  arr.unhighlight([0]);
  arr.addClass([0], "unused");
  arrcopyn2.highlight([1]);
  av.step();

  // Slide 14
  av.umsg(interpret("sc14"));
  arrcopyn2.hide();
  labeln2.hide();
  arr.unhighlight([1]);
  arr.addClass([1], "unused");
  arrcopyn3.highlight([2]);
  av.step();

  // Slide 15
  av.umsg(interpret("sc15"));
  arrcopyn3.hide();
  labeln3.hide();
  arr.addClass([2], "unused");
  av.recorded();
});
