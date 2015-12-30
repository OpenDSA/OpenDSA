/*global ODSA */
// Written by Sally Hamouda and Cliff Shaffer
// Recursive multiplication visualization with Sally's point of view
$(document).ready(function() {
  "use strict";
  var av_name = "recurIntroDetailsCON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object
  var av = new JSAV(av_name);
  var pseudo = av.code(code[0]);

  // create a label for the icon
  var label = av.label("x*y?", {left: 0, top: 170});

  // Slide 1
  av.umsg(interpret("sc1"));
  pseudo.highlight("sig");
  av.displayInit();

  // Slide 2
  av.umsg(interpret("sc2"));
  pseudo.highlight("bc");
  pseudo.unhighlight("sig");
  av.step();

  // Slide 3
  av.umsg(interpret("sc3"));
  pseudo.unhighlight("bc");
  pseudo.highlight("rc");
  av.step();

  // Slide 4
  av.umsg(interpret("sc4"));
  pseudo.unhighlight("rc");
  av.step();

  // Slide 5
  av.umsg(interpret("sc5"));
  var Pointer1 = av.g.line(80, 210, 130, 210,
                   {"arrow-end": "classic-wide-long", opacity: 0, stroke: "black", "stroke-width": 5});
  Pointer1.show();
  var label2 = av.label("(x-1)*y?", {left: 0, top: 170}); // create a label for the icon
  label2.css({left: "+=117px", top: "+=0px"}); // move the icon
  av.step();

  // Slide 6
  av.umsg(interpret("sc6"));
  var Pointer2 = av.g.line(200, 210, 250, 210,
                   {"arrow-end": "classic-wide-long", opacity: 0, stroke: "black", "stroke-width": 5});
  Pointer2.show();
  var label3 = av.label("(x-2)*y?", {left: 0, top: 170}); // create a label for the icon
  label3.css({left: "+=237px", top: "+=0px"}); // move the icon
  av.step();

  // Slide 7
  av.umsg(interpret("sc7"));
  pseudo.highlight("bccond");
  var Pointer3 = av.g.line(320, 210, 370, 210,
                   {"arrow-end": "classic-wide-long", opacity: 0, stroke: "black", "stroke-width": 5});
  Pointer3.show();
  var dots1 = av.g.circle(390, 210, 2);
  var dots2 = av.g.circle(430, 210, 2);
  var dots3 = av.g.circle(470, 210, 2);
  var Pointer4 = av.g.line(490, 210, 540, 210,
                   {"arrow-end": "classic-wide-long", opacity: 0, stroke: "black", "stroke-width": 5});
  Pointer4.show();
  var label4 = av.label("1*y?", {left: 0, top: 170}); // create a label for the icon
  label4.css({left: "+=550px", top: "+=0px"}); // move the icon
  av.step();

  // Slide 8
  av.umsg(interpret("sc8"));
  pseudo.unhighlight("bccond");
  pseudo.highlight("bcac");
  // All the way back
  label.hide();
  label2.hide();
  label3.hide();
  label4.hide();
  Pointer1.hide();
  Pointer2.hide();
  Pointer3.hide();
  Pointer4.hide();
  dots1.hide();
  dots2.hide();
  dots3.hide();
  label4 = av.label("y", {left: 0, top: 170}); // create a label for the icon
  label4.css({left: "+=550px", top: "+=0px"}); // move the icon
  Pointer4 = av.g.line(540, 210, 490, 210,
               {"arrow-end": "classic-wide-long", opacity: 0, stroke: "black", "stroke-width": 5});
  Pointer4.show();
  av.step();

  // Slide 9
  av.umsg(interpret("sc9"));
  pseudo.unhighlight("bcac");
  pseudo.highlight("rc");
  dots3 = av.g.circle(470, 210, 2);
  dots2 = av.g.circle(430, 210, 2);
  dots1 = av.g.circle(390, 210, 2);
  Pointer3 = av.g.line(370, 210, 320, 210,
               {"arrow-end": "classic-wide-long", opacity: 0, stroke: "black", "stroke-width": 5});
  Pointer3.show();
  label3 = av.label("(x-2)*y", {left: 0, top: 170}); // create a label for the icon
  label3.css({left: "+=237px", top: "+=0px"}); // move the icon
  av.step();

  // Slide 10
  av.umsg(interpret("sc10"));
  Pointer2 = av.g.line(250, 210, 200, 210,
               {"arrow-end": "classic-wide-long", opacity: 0, stroke: "black", "stroke-width": 5});
  Pointer2.show();
  label2 = av.label("(x-1)*y", {left: 0, top: 170}); // create a label for the icon
  label2.css({left: "+=117px", top: "+=0px"}); // move the icon
  av.step();

  // Slide 11
  av.umsg(interpret("sc11"));
  Pointer1 = av.g.line(130, 210, 80, 210,
               {"arrow-end": "classic-wide-long", opacity: 0, stroke: "black", "stroke-width": 5});
  Pointer1.show();
  label = av.label("x*y", {left: 0, top: 170}); // create a label for the icon
  av.recorded();
});
