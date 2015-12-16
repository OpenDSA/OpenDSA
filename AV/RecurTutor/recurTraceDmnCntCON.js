// Visualization of Domino Effect to Count the number of digits in an integer
$(document).ready(function() {
  "use strict";
  var av_name = "recurTraceDmnCntCON";
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object
  var av = new JSAV(av_name);
  var rect = av.g.rect(150, 30, 50, 90).addClass("dominocolor");
  var dot =   av.g.circle(270, 75, 2);
  var dots0 = av.g.circle(320, 75, 2);
  var dots1 = av.g.circle(370, 75, 2);
  var dots2 = av.g.circle(420, 75, 2);
  dot.show();
  dots0.show();
  dots1.show();
  dots2.show();
  var rect3 = av.g.rect(500, 30, 50, 90).addClass("dominocolor");
  var rect4 = av.g.rect(600, 30, 50, 90).addClass("dominocolor");
  var rect5 = av.g.rect(700, 30, 50, 90).addClass("dominocolor");
  av.umsg(interpret("av_c1"));
  var  pseudo = av.code(code);
  av.displayInit();
  av.step();
  av.umsg(interpret("av_c2"));
  av.step();
  av.umsg(interpret("av_c3"));
  rect5.hide();
  var rect10 = av.g.rect(675, 34, 50, 95).addClass("tilteddominocolor");
  rect10.rotate(-55);
  av.label("1's digit",  {top: "6px", left: "700px"}).addClass("digitstyle");
  pseudo.highlight("bcac");
  av.step();
  av.umsg(interpret("av_c4"));
  pseudo.highlight("rc");
  pseudo.unhighlight("bcac");
  av.step();
  av.umsg(interpret("av_c5"));
  rect4.hide();
  var rect11 = av.g.rect(575, 34, 50, 95).addClass("tilteddominocolor");
  rect11.rotate(-55);
  av.label("10's digit",  {top: "6px", left: "600px"}).addClass("digitstyle");
  av.step();
  rect3.hide();
  var rect12 = av.g.rect(475, 34, 50, 95).addClass("tilteddominocolor");
  rect12.rotate(-55);
  av.label("100's digit",  {top: "6px", left: "500px"}).addClass("digitstyle");
  av.step();
  rect.hide();
  var rect13 = av.g.rect(125, 34, 50, 95).addClass("tilteddominocolor");
  rect13.rotate(-55);
  av.label("10^n's digit",  {top: "6px", left: "150px"}).addClass("digitstyle");
  av.recorded();
});
