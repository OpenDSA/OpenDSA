/*global ODSA */
// Written by Sally Hamouda and Cliff Shaffer
// Recursive multiplication with delegation
$(document).ready(function() {
  "use strict";
  var av_name = "recurIntroDelegateCON";
  var interpret = ODSA.UTILS.loadConfig({"av_name": av_name}).interpreter;
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object
  var av = new JSAV(av_name);
  var pseudo = av.code(code);

  // create a label for the icon
  var label = av.label("x*y?", {left: 150, top: 170});

  // Slide 1
  av.umsg(interpret("av_c1"));
  pseudo.highlight(1);
  av.displayInit();

  // Slide 2
  av.umsg(interpret("av_c2"));
  av.step();

  // Slide 3
  av.umsg(interpret("av_c3"));
  pseudo.highlight([2, 3]);
  pseudo.unhighlight(1);
  av.step();

  // Slide 4
  av.umsg(interpret("av_c4"));
  pseudo.unhighlight([2, 3]);
  pseudo.highlight(5);
  av.step();

  // Slide 5
  av.umsg(interpret("av_c5"));
  var Pointer1 = av.g.line(230, 210, 280, 210,
                           {"arrow-end": "classic-wide-long", opacity: 0,
                            stroke: "black", "stroke-width": 5});
  Pointer1.show();
  var label2 = av.label("(x-1)*y?", {left: 0, top: 170}); // create a label for the icon
  label2.css({left: "+=270px", top: "+=0px"}); // move the icon
  av.step();

  // Slide 6
  av.umsg(interpret("av_c6"));
  label.hide();
  label2.hide();
  Pointer1.hide();
  label2 = av.label("(x-1)*y", {left: 0, top: 170}); // create a label for the icon
  label2.css({left: "+=280px", top: "+=0px"}); // move the icon
  av.step();

  // Slide 7
  av.umsg(interpret("av_c7"));
  Pointer1 = av.g.line(280, 210, 230, 210,
                       {"arrow-end": "classic-wide-long", opacity: 0,
                        stroke: "black", "stroke-width": 5});
  Pointer1.show();
  label = av.label("x*y", {left: 150, top: 170}); // create a label for the icon
  av.recorded();
});
