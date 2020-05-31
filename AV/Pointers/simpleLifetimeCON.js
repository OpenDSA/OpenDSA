//variable xPosition controls the horizontal position of the visualization
$(document).ready(function() {
  "use strict";
  var av_name = "simpleLifetimeCON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object
  var av = new JSAV(av_name);
  var pseudo = av.code(code[0]);

  var widthBig = 80;
  var lengthBig = 150;
  var widthSmall = 30;
  var lengthSmall = 80;
  var xPositionBigRectangles = 450;
  var yPositionRectX = 30;
  var yPositionRectY = 0;
  var xPositionSmallRectangles = xPositionBigRectangles + 55;
  var yPositionA = yPositionRectX + (widthBig / 2) + 10;
  var yPositionB = yPositionA + widthSmall;
  var yPositionP = yPositionRectY + (widthBig / 2) + 10;
  var yPositionQ = yPositionP + widthSmall;

  //creating everything in the X rectangle
  var rectY = av.g.rect(xPositionBigRectangles,
                        yPositionRectX + (widthBig / 2), lengthBig, widthBig);
  var rectP = av.g.rect(xPositionSmallRectangles, yPositionA,
                        lengthSmall, widthSmall);
  var rectQ = av.g.rect(xPositionSmallRectangles, yPositionB,
                        lengthSmall, widthSmall);
  var labelY = av.label("Foo", {top: yPositionRectX + (widthBig) - 3,
                                left: xPositionBigRectangles - 30});
  var labelP = av.label("scores", {top: yPositionA - (widthSmall / 2) + 3,
                                   left: xPositionSmallRectangles - 50});
  var labelQ = av.label("a", {top: yPositionB - (widthSmall / 2) + 3,
                              left: xPositionSmallRectangles - 16});
  var label1 = av.label("0.0F", {top: yPositionA - (widthSmall / 2) + 3,
                                 left: xPositionSmallRectangles + (widthSmall / 3) + 14});
  var label2 = av.label("0", {top: yPositionB - (widthSmall / 2) + 3,
                              left: xPositionSmallRectangles + (widthSmall / 3) + 14});

  // Slide 1
  av.umsg("Local variables <tt>a</tt> and <tt>scores</tt> are allocated when function <tt>Foo</tt> starts");
  pseudo.highlight(1)
  pseudo.highlight(2);
  av.displayInit();
  av.step();

  // Slide 2
  pseudo.unhighlight(1)
  pseudo.unhighlight(2);
  av.umsg("Local storage is used by the computation");
  pseudo.setCurrentLine(3);
  label2.hide()
  var label2plus = av.label("1", {top: yPositionB - (widthSmall / 2) + 3,
                                  left: xPositionSmallRectangles + (widthSmall / 3) + 14});
  av.step();

  // Slide 3
  av.umsg("Local variable <tt>i</tt> is added to the locals after its declaration.");
  pseudo.setCurrentLine(4);
  rectY.hide();
  var rectY2 = av.g.rect(xPositionBigRectangles,
                         yPositionRectX + (widthBig / 2) - 40, lengthBig , widthBig + 40); 
  var rectM =av.g.rect(xPositionSmallRectangles, yPositionA - widthSmall, lengthSmall, widthSmall);
  var labelI = av.label("i",  {top: yPositionA - (3* widthSmall / 2) + 3, left: xPositionSmallRectangles - 16});
  var label3 = av.label("0", {top: yPositionA - (3*widthSmall / 2) + 3, left: xPositionSmallRectangles + (widthSmall / 3) + 14});
  av.step();

  // Slide 4
  av.umsg("Locals continue to exist undisturbed when another function is called.");
  pseudo.setCurrentLine(5);
  av.step();

  // Slide 5
  av.umsg("Once the program returns from <tt>Bar</tt>, we reach the end of the <tt>for</tt> loop. Since the lifetime of <tt>i</tt> is finished, <tt>i</tt> is removed from locals");
  pseudo.setCurrentLine(6);
  rectY2.hide();
  rectY.show();
  labelI.hide();
  label3.hide();
  rectM.hide();  
  av.step();

  // Slide 5
  av.umsg("scores now are incremented outside of the loop.");
  pseudo.setCurrentLine(7);
  label1.text("1.0F");
  av.step();

  // Slide 6
  av.umsg("The locals for <tt>Foo</tt> are deallocated when the <tt>Foo</tt> exits");
  pseudo.setCurrentLine(8);
  rectY.hide();
  rectP.hide();
  rectQ.hide();
  labelY.hide();
  labelP.hide();
  label2plus.hide();
  labelQ.hide();
  label1.hide();
  av.recorded();
});
