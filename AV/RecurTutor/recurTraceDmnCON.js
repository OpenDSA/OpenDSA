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
  
  var label0 = av.label("1", {left: 120, top: -10});
  var label1 = av.label("2", {left: 220, top: -10});
  var label2 = av.label("3", {left: 320, top: -10});
  
  var label3 = av.label("n-1", {left: 612, top: -10});
  var label4 = av.label("n", {left: 720, top: -10});
   
  var dots1 = av.g.circle(400, 75, 2);
  var dots2 = av.g.circle(450, 75, 2);
  var dots3 = av.g.circle(500, 75, 2);
  var dots4 = av.g.circle(550, 75, 2);

  var rect4 = av.g.rect(600, 30, 50, 90).css({"fill": "grey"});
  var rect5 = av.g.rect(700, 30, 50, 90).css({"fill": "grey"});
  
  // Slide 1
  av.umsg(interpret("sc1"));
  av.displayInit();

  // Slide 2
  av.umsg(interpret("sc2"));
  var  pseudo = av.code(code);
  av.step();
  
  // Slide 3
  av.umsg(interpret("sc3"));
  rect.hide();
  var rect6 = av.g.rect(120, 30, 50, 90).css({"fill": "lightgray"});
  pseudo.highlight(3);
  rect6.rotate(45);
  pseudo.highlight(2);
  pseudo.highlight(3);
  av.step();
  
  // Slide 4
  av.umsg(interpret("sc4"));
  pseudo.unhighlight(2);
  pseudo.unhighlight(3);
  rect1.hide();
  var rect7 = av.g.rect(220, 30, 50, 90).css({"fill": "lightgray"});
  pseudo.unhighlight(6);
  pseudo.highlight(6);
  rect7.rotate(45);
  av.step();  
  
  // Slide 5
  av.umsg(interpret("sc5"));
  rect2.hide();
  var rect8 = av.g.rect(320, 30, 50, 90).css({"fill": "lightgray"});
  rect8.rotate(45);
  av.step();

  // Slide 6
  av.umsg(interpret("sc6"));   
  av.step();
  
  // Slide 7
  pseudo.unhighlight(2);
  pseudo.highlight(5);
  rect4.hide();
  rect5.hide();
  var rect9 = av.g.rect(620, 30, 50, 90).css({"fill": "lightgray"});
  rect9.rotate(45);
  var rect10 = av.g.rect(720, 30, 50, 90).css({"fill": "lightgray"});
  rect10.rotate(45);
  av.step();

  // Slide 8
  av.umsg(interpret("sc8"));
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
  pseudo.unhighlight(5);
  pseudo.highlight(5);
  pseudo.unhighlight(6); 
  av.step();

  // Slide 9
  av.umsg(interpret("sc9"));
  pseudo.unhighlight(5);
  pseudo.highlight(3);  
  rect.hide();
  rect6.show();
  av.step();
  
  // Slide 10
  av.umsg(interpret("sc10"));
  pseudo.unhighlight(3);  
  pseudo.highlight(6);
  rect1.hide();
  rect2.hide();
  rect4.hide();
  rect5.hide();
  rect7.show();
  rect8.show();
  rect9.show();  
  rect10.show();
  av.recorded();
});
