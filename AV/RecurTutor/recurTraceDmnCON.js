//Visualization of the basic principle of Domino Effect

// Title: Tracing Recursive Code: Domino Effect
// Author: Sally Hamouda; Cliff Shaffer
// Institution: Virginia Tech
// Features: Code Visualization; Demonstration
// Keyword: Recusion
// Natural Language: en
// Programming Language: Java
/* Description: Slideshow demonstrating code tracing, using a domino metaphor. */

$(document).ready(function() {
  "use strict";
  var av_name = "recurTraceDmnCON";
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object
  var av = new JSAV(av_name);
// Show the Domino Effect recursively  on a figure too
  var rect = av.g.rect(100, 30, 50, 90).addClass("dominocolor");
  var rect1 = av.g.rect(200, 30, 50, 90).addClass("dominocolor");
  var rect2 = av.g.rect(300, 30, 50, 90).addClass("dominocolor");
  var label0 = av.label("1", {left: 120, top: -10});
  var label1 = av.label("2", {left: 220, top: -10});
  var label2 = av.label("3", {left: 320, top: -10});
  var label3 = av.label("n-1", {left: 612, top: -10});
  var label4 = av.label("n", {left: 720, top: -10});
  label0.show();
  label1.show();
  label2.show();
  label3.show();
  label4.show();
  var dots1 = av.g.circle(400, 75, 2);
  var dots2 = av.g.circle(450, 75, 2);
  var dots3 = av.g.circle(500, 75, 2);
  var dots4 = av.g.circle(550, 75, 2);
  dots1.show();
  dots2.show();
  dots3.show();
  dots4.show();
  var rect4 = av.g.rect(600, 30, 50, 90).addClass("dominocolor");
  var rect5 = av.g.rect(700, 30, 50, 90).addClass("dominocolor");
  av.umsg(interpret("av_c1"));
  var  pseudo = av.code(code);
  av.displayInit();
  av.step();
  av.umsg(interpret("av_c2"));
  rect.hide();
  var rect6 = av.g.rect(120, 30, 50, 90).addClass("tilteddominocolor");
  rect6.rotate(45);
  pseudo.highlight("bc");
  av.step();
  av.umsg(interpret("av_c3"));
  pseudo.unhighlight("bc");
  rect1.hide();
  var rect7 = av.g.rect(220, 30, 50, 90).addClass("tilteddominocolor");
  pseudo.unhighlight("rcac");
  pseudo.highlight("rcac");
  rect7.rotate(45);
  av.step();
  av.umsg(interpret("av_c4"));
  rect2.hide();
  var rect8 = av.g.rect(320, 30, 50, 90).addClass("tilteddominocolor");
  pseudo.unhighlight("rcac");
  pseudo.highlight("rcac");
  rect8.rotate(45);
  av.step();
  av.umsg(interpret("av_c5"));
  av.step();
  pseudo.highlight("rc");
  pseudo.unhighlight("rc");
  pseudo.highlight("rc");
  rect4.hide();
  rect5.hide();
  var rect9 = av.g.rect(620, 30, 50, 90).addClass("tilteddominocolor");
  pseudo.unhighlight("rc");
  pseudo.highlight("rc");
  rect9.rotate(45);
  var rect10 = av.g.rect(720, 30, 50, 90).addClass("tilteddominocolor");
  pseudo.unhighlight("rc");
  pseudo.highlight("rc");
  rect10.rotate(45);
  av.step();
  rect6.hide();
  rect7.hide();
  rect8.hide();
  rect9.hide();
  rect10.hide();
  rect.show();
  rect1.show();
  rect2.show();
  rect4.show();
  rect5.show();
  av.umsg(interpret("av_c6"));
  pseudo.unhighlight("rc");
  pseudo.highlight("rc");
  pseudo.unhighlight("rcac");
  av.step();
 // av.umsg(interpret("av_c7"));
  pseudo.unhighlight("rc");
  pseudo.highlight("bc");
  rect.hide();
  rect6.show();
  av.step();
  av.umsg(interpret("av_c8"));
  pseudo.unhighlight("bc");
  pseudo.highlight("rc");
  rect1.hide();
  rect2.hide();
  rect4.hide();
  rect5.hide();
  rect7.show();
  rect8.show();
  rect9.show();
  rect10.show();
  av.step();
  av.recorded();
});
