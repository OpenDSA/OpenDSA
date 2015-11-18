// Visualization of the basic principle of Domino Effect 
$(document).ready(function () {
  "use strict";
  var av_name ="recurTraceDmnCON";
  var config = ODSA.UTILS.loadConfig({"av_name": av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object
  var av = new JSAV(av_name);
  
  // Show the Domino Effect recursively  on a figure too
  var rect = av.g.rect(100, 30, 50, 90).css({"fill": "grey"});
  var rect1 = av.g.rect(200, 30, 50, 90).css({"fill": "grey"});
  var rect2 = av.g.rect(300, 30, 50, 90).css({"fill": "grey"});
   
  var dots1 = av.g.circle(400, 75, 2);
  var dots2 = av.g.circle(450, 75, 2);
  var dots3 = av.g.circle(500, 75, 2);
  var dots4 = av.g.circle(550, 75, 2);

  var rect4 = av.g.rect(600, 30, 50, 90).css({"fill": "grey"});
  var rect5 = av.g.rect(700, 30, 50, 90).css({"fill": "grey"});

  
  av.umsg(interpret("av_c1"));
  var  pseudo = av.code(code);
  av.displayInit();
  av.step();
  
  av.umsg(interpret("av_c2"));
  rect.hide();
  var rect6 = av.g.rect(120, 30, 50, 90).css({"fill": "lightgray"});
  rect6.rotate(45);
  pseudo.highlight(2);
   pseudo.highlight(3);
  av.step();
  
  av.umsg(interpret("av_c3"));
  pseudo.unhighlight(2);
  pseudo.unhighlight(3);
  rect1.hide();
  var rect7 = av.g.rect(220, 30, 50, 90).css({"fill": "lightgray"});
  rect7.rotate(45);
  av.step();  
  av.umsg(interpret("av_c4"));
  rect2.hide();
  var rect8 = av.g.rect(320, 30, 50, 90).css({"fill": "lightgray"});
  rect8.rotate(45);
  av.step();

  av.umsg(interpret("av_c5")); 
  
  
  
  av.step();
  pseudo.unhighlight(2);
  pseudo.highlight(5);
  pseudo.highlight(6);
  rect4.hide();
  rect5.hide();
  var rect9 = av.g.rect(620, 30, 50, 90).css({"fill": "lightgray"});
  rect9.rotate(45);
  var rect10 = av.g.rect(720, 30, 50, 90).css({"fill": "lightgray"});
  rect10.rotate(45);

  av.step();

  av.recorded();
});
