"use strict";
  
//===============================================================================================================================
// Visualization of Domino Effect to Count the number of digits in an integer
(function ($) {

  var av_name ="recurTraceDmnCntCON";
  var config = ODSA.UTILS.loadConfig({"av_name": av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object
  var av = new JSAV(av_name);
  var rect = av.g.rect(150, 30, 50, 90).css({"fill": "grey"});

  var dot = av.g.circle(270, 75, 2);
  var dots0 = av.g.circle(320, 75, 2);
  var dots1 = av.g.circle(370, 75, 2);
  var dots2 = av.g.circle(420, 75, 2);
  
 
  var rect3 = av.g.rect(500, 30, 50, 90).css({"fill": "grey"});
  var rect4 = av.g.rect(600, 30, 50, 90).css({"fill": "grey"});
  var rect5 = av.g.rect(700, 30, 50, 90).css({"fill": "grey"});

  av.umsg(interpret("av_c1"));
  var  pseudo = av.code(code);
  av.displayInit();
  av.step();
  av.umsg(interpret("av_c2"));

  rect5.hide();
  var rect10 = av.g.rect(675, 34, 50, 95).css({"fill": "lightgray"});
  rect10.rotate(-55);
  av.label("1's digit",  {"top": "6px", "left": "700px"}).css({'font-size': '15px', "text-align": "center"});
  pseudo.highlight(3);
  av.step();

  av.umsg(interpret("av_c3"));
  pseudo.highlight(5);
  pseudo.unhighlight(3);
  

  rect4.hide();
  var rect11 = av.g.rect(575, 34, 50, 95).css({"fill": "lightgray"});
  rect11.rotate(-55);
  av.label("10's digit",  {"top": "6px", "left": "600px"}).css({'font-size': '15px', "text-align": "center"});

  av.step();
  
  rect3.hide();
  var rect12 = av.g.rect(475, 34, 50, 95).css({"fill": "lightgray"});
  rect12.rotate(-55);
  av.label("100's digit",  {"top": "6px", "left": "500px"}).css({'font-size': '15px', "text-align": "center"});

  av.step();
  
  rect.hide();
  var rect13 = av.g.rect(125, 34, 50, 95).css({"fill": "lightgray"});
  rect13.rotate(-55);
  av.label("10^n's digit",  {"top": "6px", "left": "150px"}).css({'font-size': '15px', "text-align": "center"});
 
  av.recorded();
  
}(jQuery));



//==============================================================================================================================
