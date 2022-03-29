/*global ODSA */
$(document).ready(function() {
  "use strict";
  var av_name = "insertionsortCON";
  var interpret = ODSA.UTILS.loadConfig({av_name: av_name}).interpreter;

  var theArray1 = ["", "", "", ""];
  var theArray2 = ["", "", "", ""];
  var theArray3 = ["", "", "", ""];
  
  var av = new JSAV(av_name);
 
  //vertical array min.width=80 in insertionsortCON.css

  var arrayWidth=80;
  var arrayLeft=120;
  var arrayGap=100;

  //PointerArrow X1,Y1 and X2,Y2 coordinates with respect to the above arrayVariables (i.e: arrayLeft, arrayWidth & arrayGap)

  var pointerArrowX1=30;
  var pointerArrowY1=60;
  var pointerArrowX2=arrayLeft;
  var pointerArrowY2=150;

  //definning each Array with its pointerArrow

  //definition array1 and its pointerArrow
  var arr  = av.ds.array(theArray1, {layout: "vertical", top: 100, left: arrayLeft});
  var pointerArrow = av.g.line(pointerArrowX1, pointerArrowY1, pointerArrowX2, pointerArrowY2, {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
  pointerArrow.hide();
  arrayLeft+=arrayWidth+arrayGap;
  pointerArrowX2=arrayLeft;

  //definition array2 and its pointerArrow
  var arr2 = av.ds.array(theArray2, {layout: "vertical", top: 100, left: arrayLeft});
  var pointerArrow2 = av.g.line(pointerArrowX1, pointerArrowY1, pointerArrowX2, pointerArrowY2, {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
  pointerArrow2.hide();
  arrayLeft+=arrayWidth+arrayGap;
  pointerArrowX2=arrayLeft;

  //definition array3 and its pointerArrow
  var arr3 = av.ds.array(theArray2, {layout: "vertical", top: 100, left: arrayLeft});
  var pointerArrow3 = av.g.line(pointerArrowX1, pointerArrowY1, pointerArrowX2, pointerArrowY2, {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
  pointerArrow3.hide();


  var rectXpos = 0;
  var rectYpos= 10;
  var rectWidth = 620;
  var rectHieght = 50;

  var rect = av.g.rect(rectXpos, rectYpos, rectWidth, rectHieght);
  rect.hide();
  
  // Slide 1
  av.umsg(interpret("sc1").bold().big());
  arr.value();
  arr2.value();
  arr3.value();
  av.displayInit(1);

  // Slide 2
  av.umsg(interpret("sc1").bold().big());
  arr.value(0,"Employee");
  arr.highlight(0);
  arr.css([0], {"font-weight": "bold", "color": "black"});
  av.step();

  // Slide 3
  av.umsg(interpret("sc1").bold().big());
  arr.value(1, "E-ID");
  arr.unhighlight(0).highlight(1);
  av.step();

  // Slide 4
  av.umsg(interpret("sc1").bold().big());
  arr.value(2, "E-name");
  arr.unhighlight(1).highlight(2);
  arr.css([2], {"color": "black"});
  av.step();

  // Slide 5
  av.umsg(interpret("sc1").bold().big());
  arr.value(3, "E-salary");
  arr.unhighlight(2).highlight(3);
  arr.css([3], {"color": "black"});
  av.step();


  // Slide 6
  av.umsg(interpret("sc1").bold().big());
  arr2.value(0,"Project");
  arr2.css([0], {"font-weight": "bold", "color": "black"});
  arr2.highlight(0);
  arr.unhighlight(3);
  av.step();

  // Slide 7
  av.umsg(interpret("sc1").bold().big());
  arr2.value(1, "P-ID");
  arr2.unhighlight(0).highlight(1);
  av.step();

  // Slide 8
  av.umsg(interpret("sc1").bold().big());
  arr2.value(2, "P-name");
  arr2.unhighlight(1).highlight(2);
  av.step();

  // Slide 9
  av.umsg(interpret("sc1").bold().big());
  arr2.value(3, "P-location");
  arr2.unhighlight(2).highlight(3);
  av.step();

  // Slide 10
  av.umsg(interpret("sc1").bold().big());
  arr3.value(0,"Equipment");
  arr3.css([0], {"font-weight": "bold", "color": "black"});
  arr3.highlight(0);
  arr2.unhighlight(3);
  av.step();

  // Slide 11
  av.umsg(interpret("sc1").bold().big());
  arr3.value(1, "EQ-ID");
  arr3.unhighlight(0).highlight(1);
  av.step();

  // Slide 12
  av.umsg(interpret("sc1").bold().big());
  arr3.value(2, "EQ-name");
  arr3.unhighlight(1).highlight(2);
  av.step();

  // Slide 13
  av.umsg(interpret("sc1").bold().big());
  arr3.value(3, "EQ-cost");
  arr3.unhighlight(2).highlight(3);
  av.step();

  // Slide 14
  av.umsg(interpret("sc2").bold().big());
  arr3.unhighlight(3);
  arr.css([1], {"text-decoration": "underline"});
  rect.show();
  var pk = av.label('<tt>No two employees having same ID, \n  E-ID uniquely identify \n each employee</tt>', {top: rectXpos, left: rectYpos});
  pointerArrow.show();
  av.step();

  // Slide 15
   av.umsg(interpret("sc2").bold().big());
   arr2.css([1], {"text-decoration": "underline", "color": "black"});
   rect.show();
   pk.value('<tt>No two projects having same ID, \n P-ID uniquely identify \n each project</tt>', {top: rectXpos, left: rectYpos});
   pk.css({"text-decoration": "bold", "color": "black"});
   pointerArrow.hide();
   pointerArrow2.show();
   av.step();

  // Slide 16
  av.umsg(interpret("sc2").bold().big());
  arr3.css([1], {"text-decoration": "underline", "color": "black"});
  rect.show();
  pk.value('<tt>No two equipments having same ID, \n EQ-ID uniquely identify \n each equipment</tt>', {top: rectXpos, left: rectYpos})
  pointerArrow2.hide();
  pointerArrow3.show();
  av.recorded();

});
