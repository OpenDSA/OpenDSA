// Written by Nabanita Maji and Cliff Shaffer, March 2015.
// Heavily revised and updated by Cliff Shaffer, November 2024.
/*global ODSA */

// Title: Reduction of Sorting to Pairing
// Author: Nabanita Maji; Cliff Shaffer
// Institution: Virginia Tech
// Features: Presentation
// Keyword: Reduction
// Natural Language: en
// Programming Language: N/A
/* Description: Slideshow showing a reduction of Sorting to Pairing. This demonstrates that the lower bound for Pairing is the same as the lower bound for Sorting. */

$(document).ready(function() {
  "use strict";
  var input;
  var iparr;
  var pair1;
  var pair2;
  var pair11;
  var pair21;
  var pairs;
  var oparr;
  var paired;
  var line1;
  var yoffset = 20;

  var av_name = "sortToPairCON";
  var jsav = new JSAV(av_name);

  // Slide 1
  jsav.umsg("Sorting an array by reducing it to <b>PAIRING</b>.");
  jsav.displayInit();
  jsav.step();

  // Slide 2
  jsav.umsg("Start with an input instance to <b>SORTING</b> (an array).");
  input = new Array(23,42,17,93,88,12,57,90);
  iparr = jsav.ds.array(input, {left: 290, top: -8 + yoffset, indexed: true});
  for(var i = 0; i < 8; i++)
    iparr.css(i,{"background-color":"AntiqueWhite"});
  jsav.label("<b>Array to be sorted</b>", {left: 350, top: -30 + yoffset});
  jsav.step();

  // Slide 3
  jsav.umsg("Next we need a transformation that converts our instance of <b>SORTING</b> into an instance of <b>PAIRING</b>.");
  var l1= jsav.g.line(414, 38 + yoffset, 414, 83 + yoffset);
  var ttemp = jsav.label("<b>Transformation</b>",{left: 298, top: 45 + yoffset});
  var r1 = jsav.g.rect(150, 84 + yoffset, 525, 45);
  jsav.step();

  // Slide 4
  jsav.umsg("The Input array and Position array is given as an input to <b>PAIRING</b>. The Input array is just the input to <b>SORTING</b>. The Position array contains value <i>k</i> at the <i>k</i><sup>th</sup> position.");
  pair1 = jsav.ds.array([0, 1, 2, 3, 4, 5, 6, 7],  {left: 160, top: 75 + yoffset});
  for(var i = 0; i < 8; i++)
    pair1.css(i, {color: "blue", "background-color": "WhiteSmoke"});
  jsav.label("Position<br>array", {left: 75, top: 70 + yoffset});
  pair2 = jsav.ds.array(input, {left: 420, top: 75 + yoffset});
  for(var i=0;i<8;i++)
    pair2.css(i,{"background-color":"AntiqueWhite"});
  jsav.label("Input <br>array",{left: 685, top: 70 + yoffset});
  ttemp.hide();
  jsav.label("<b>Transformation: Cost $= O(n)$.</b>",{left: 298, top: 45 + yoffset});
  jsav.step();

  // Slide 5
  jsav.umsg("The two arrays are fed to <b>PAIRING</b> as input.");
  jsav.label("<b>PAIRING</b>",{left: 425, top: 120 + yoffset});
  var l2= jsav.g.line(414, 130 + yoffset, 414, 160 + yoffset);
  var r2 = jsav.g.rect(280, 160 + yoffset, 273, 110);
  pair11 = jsav.ds.array([0, 1, 2, 3, 4, 5, 6, 7],
                         {left: 290 , top: 152 + yoffset});
  pair21 = jsav.ds.array(input, {left: 290, top: 212 + yoffset});
  for(var i = 0; i < 8; i++) {
    pair11.css(i, {color: "blue", "background-color": "WhiteSmoke"});
    pair21.css(i, {"background-color": "AntiqueWhite"});
  }
  jsav.step();

  // Slide 6
  jsav.umsg("<b>PAIRING</b> is now solved on the two arrays. It is important to understand that it doesn't matter <b>how</b> this gets done. <b>PAIRING</b> is a complete black box. But somehow it happens.");
  pairs = new Array([23, 2], [42, 3], [17, 1], [93, 7],
                    [88, 5], [12, 0], [57, 4], [90, 6]);

  var pairing = new Array();
  var xoffset = 57;
  for (var i = 0; i < 8; i++) {
    var x2 = i * 30 + 250;
    var x1 = pairs[i][1] * 30 + 250;
    pairing[i] = jsav.g.line([x1 + xoffset, 197 + yoffset,
                              x2 + xoffset, 228 + yoffset]);
  }
  jsav.step();
	 
  // Slide 7
  jsav.umsg("The output of <b>PAIRING</b> is a single array of pairs.");
  var l3 = jsav.g.line(414, 270 + yoffset, 414, 300 + yoffset);
  jsav.label("<b>Pairs generated</b>",{left: 425, top:260 + yoffset});
  paired = jsav.ds.array(pairs, {left: 254, top: 285 + yoffset});
  for(var i = 0; i < 8; i++)
    paired.css(i, {"width": "40px", "min-width": "40px"});
  jsav.step();

 
  // Slide 8
  jsav.umsg("Now we need another transformation that takes the output from <b>PAIRING</b> and generates the (correct!) output for the original <SORTING> problem instance. In each pair, the second number determines the position of the first in Output Array.");
  var l4= jsav.g.line(414, 330 + yoffset, 414, 360 + yoffset);
  l4.show();
  var ttemp2 = jsav.label("<b>Transformation</b>", {left: 298, top: 320 + yoffset});
  var r1 = jsav.g.rect(280, 360 + yoffset, 280, 80);
  r1.show();
  oparr= jsav.ds.array([" "," "," "," "," "," "," "," "],
                       {left: 295, top: 360 + yoffset, indexed: true});
  for(var i = 0; i < 8; i++)
       oparr.css(i, {"background-color": "Snow"});
  jsav.step();

  // Slides 9-16
  var curr;
  for(var i = 0; i < 8; i++) {
    if (i > 0) {
      paired.unhighlight(i-1);
      oparr.unhighlight(curr);
      //oparr.css(curr,{"background-color":"ForestGreen"});
    }
    var str = paired.value(i) + ",";
    var arr = str.split(",");
    curr = arr[1];
    curr = curr * 1;
    oparr.value(curr, arr[0]);
    paired.highlight(i);
    oparr.highlight(curr);
    jsav.umsg("Placing " + arr[0] + " at " + curr + ".");
    jsav.step()
  }

  // Slide 17  
  jsav.umsg("The output array gives the sorted array. The total transformation cost is $O(n)$.");
  paired.unhighlight(i-1);
  oparr.unhighlight(curr);
  ttemp2.hide();
  jsav.label("<b>Transformation: Cost $= O(n)$.</b>", {left: 298, top: 320 + yoffset});
  jsav.step();

  // Slide 18
  jsav.umsg("The total cost of <b>SORTING</b> is $O(n) +$ the cost of <b>PAIRING</b>");
  var l5 = jsav.g.line(560, 400 + yoffset, 580, 400 + yoffset);
  jsav.label("<b>Output</b>", {left: 675, top: 405 + yoffset});
  var op = jsav.ds.array([" "," "," "," "," "," "," "," "],
                         {left: 580, top: 370 + yoffset});
  for(var i = 0; i < 8; i++) {
    op.value(i, oparr.value(i)); 
    op.css(i,{"background-color":"#CCFF99"});
  }
  jsav.step();
  jsav.recorded();
});
