/*global ODSA */
// Written by Sally Hamouda and Cliff Shaffer
// Four versions for writing sum recursively
$(document).ready(function() {
  "use strict";
  var av_name = "recurWriteSumCON";
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object
  var av = new JSAV(av_name);

  // Slide 1
  av.umsg(interpret("sc1"));
  av.displayInit();
  av.step();

  // Slide 2
  av.umsg(interpret("sc2"));
  av.label("First Version", {left: 30, top: 0});
  var pseudo = av.code($.extend({lineNumbers: false, top: 25, left: 30}, code[0]));
  pseudo.highlight(3);
  pseudo.highlight(6);
  av.step();

  // Slide 3
  av.umsg(interpret("sc3"));
  av.label("Second Version", {left: 450, top: 0});
  var pseudo2 = av.code($.extend({lineNumbers: false, top: 25, left: 450}, code[1]));
  pseudo2.highlight(3);
  pseudo2.highlight(6);
  pseudo2.highlight(8);
  av.step();

  // Slide 4
  av.umsg(interpret("sc4"));
  av.label("Third Version", {left: 30, top: 225});
  var pseudo3 = av.code($.extend({lineNumbers: false, top: 250, left: 30}, code[2]));
  pseudo3.highlight(3);
  pseudo3.highlight(5);
  av.step();

  // Slide 5
  av.umsg(interpret("sc5"));
  av.step();

  // Slide 6
  av.umsg(interpret("sc6"));
  av.label("Fourth Version", {left: 450, top: 225});
  var pseudo4 = av.code($.extend({lineNumbers: false, left: 450, top: 250}, code[3]));
  pseudo4.highlight(3);
  pseudo4.highlight(5);
  av.recorded();
});
