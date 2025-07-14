// Written by Nabanita Maji and Cliff Shaffer, March 2015.
// Heavily revised and updated by Cliff Shaffer, November 2024.
/*global ODSA */

// Title: Reduction of Pairing to Sorting
// Author: Nabanita Maji; Cliff Shaffer
// Institution: Virginia Tech
// Features: Demonstration
// Keyword: Reduction
// Natural Language: en
// Programming Language: N/A
/* Description: Slideshow showing a reduction of Pairing to Sorting. This demonstrates that the upper bound for Pairing is the same as the upper bound for Sorting. So, a standard 'software engineering' form of code reuse. */

$(document).ready(function() {
  "use strict";
  var input1;
  var input2;
  var sort1;
  var sort2;
  var iparr1;
  var iparr2;
  var sortarr1;
  var sortarr2;
  var oparr;
  var paired;
  var yoffset = 15;
  var av_name = "pairToSortCON";
  var jsav = new JSAV(av_name);

  // Slide 1
  jsav.umsg("This slideshow shows how to solve <b>PAIRING</b> of two arrays by means of a reduction to <b>SORTING</b>. We start with the input to <b>PAIRING</b>: Two arrays of equal size.");
  input1 = new Array(23, 42, 17, 93, 88, 12, 57, 90);
  input2 = new Array(48, 59, 11, 89, 12, 91, 64, 34);
  var r1 = jsav.g.rect(95, 10 + yoffset, 600, 60);
  iparr1 = jsav.ds.array(input1,  {left: 100, top: 8 + yoffset});
  for(var i=0;i<input1.length;i++)
    iparr1.css(i,{"background-color":"AntiqueWhite"});
  iparr2 = jsav.ds.array(input2,  {left: 400, top: 8 + yoffset});
  for(var i=0;i<input2.length;i++)
    iparr2.css(i,{"background-color":"AntiqueWhite"});
  jsav.label("<b>Arrays to be paired</b>",{left: 330, top: -28 + yoffset});
  jsav.displayInit();
  jsav.step();

  // Slide 2
  jsav.umsg("The arrays are fed as input to the SORTING problem. Technically, this is done by means of some <b>transformation</b>. In this case, the transformation is simply to send each of the arrays (separately) as input instances to SORTING.");
  jsav.g.rect(95, 110 + yoffset, 600, 60); // Box around arrays
  iparr1 = jsav.ds.array(input1,  {left: 100, top: 107 + yoffset});
  for(var i=0;i<input1.length;i++)
    iparr1.css(i,{"background-color":"AntiqueWhite"});
  iparr2 = jsav.ds.array(input2,  {left: 400, top: 107 + yoffset});
  for(var i=0;i<input2.length;i++)
    iparr2.css(i,{"background-color":"AntiqueWhite"});
  jsav.g.line(395, 70 + yoffset, 395, 170 + yoffset); // Vertical separator
  jsav.label("<b>Transformations: Identity function (twice). Cost is $O(n)$.</b>",{left: 271, top: 65 + yoffset});
  jsav.step();

  // Slide 3
  jsav.umsg("Sort the two arrays (individually).");
  var l1= jsav.g.line(245, 170 + yoffset, 245, 190 + yoffset);
  var l2= jsav.g.line(545, 170 + yoffset, 545, 190 + yoffset);
  var r2 = jsav.g.rect(195, 190 + yoffset, 100, 40);
  var r3 = jsav.g.rect(495, 190 + yoffset, 100, 40);
  jsav.label("<b>SORTING</b>", {left: 210, top: 185 + yoffset});
  jsav.label("<b>SORTING</b>", {left: 510, top: 185 + yoffset});
  jsav.step();

  // Slide 4
  jsav.umsg("What comes back from SORTING are our two arrays, sorted.");
  var l3= jsav.g.line(245, 230 + yoffset, 245, 240 + yoffset);
  var l4= jsav.g.line(545, 230 + yoffset, 545, 240 + yoffset);
  sort1 = new Array(12,17,23,42,57,88,90,93);
  sort2 = new Array(11,12,34,48,59,64,89,91);
  var r4 = jsav.g.rect(95,240 + yoffset,600,60);
  sortarr1 = jsav.ds.array(sort1, {left: 100, top: 237 + yoffset});
  jsav.label("Sorted array",{left:10,top:240 + yoffset});
  sortarr2 = jsav.ds.array(sort2, {left: 400, top: 237 + yoffset});
  jsav.label("Sorted array",{left:700,top:240 + yoffset});
  jsav.step();

  // Slide 5
  jsav.umsg("The final step is to do another transformation. This takes the two sorted arrays and turns them into a (correct) solution to the PAIRING problem for the input arrays.");
  var r4 = jsav.g.rect(95, 330 + yoffset, 600, 60);
  var l12 = jsav.g.line(395, 300 + yoffset, 395, 330 + yoffset);
  jsav.step();

  // Slide 6
  jsav.umsg("The transformation simply pairs the numbers at the same index of the two sorted arrays.");
  oparr = jsav.ds.array([" "," "," "," "," "," "," "," "],  {left: 209, top: 327 + yoffset});
  jsav.step();

  // Slides 7-14
  for(var i=0;i<8;i++){
    if(i>0){
      sortarr1.unhighlight(i-1);
      sortarr2.unhighlight(i-1);
      oparr.unhighlight(i-1);
    }
    var str="&nbsp" + sortarr1.value(i) + "," + sortarr2.value(i) + "&nbsp";
    oparr.value(i,str);
    sortarr1.highlight(i);
    sortarr2.highlight(i);
    oparr.highlight(i);
    jsav.umsg("Pairing " + sortarr1.value(i) + " with " + sortarr2.value(i) + ".");
    jsav.step()
  }

  // Slide 15
  jsav.umsg("The output array gives the pairing.");
  sortarr1.unhighlight(i-1);
  sortarr2.unhighlight(i-1);
  oparr.unhighlight(i-1);
  jsav.step();

  // Slide 16
  jsav.umsg("The cost of pairing is $O(n) + 2 \\ \\times$ the cost of sorting.");
  var l13 = jsav.g.line(395, 390 + yoffset, 395, 414 + yoffset);
  var oparr2= jsav.ds.array([" "," "," "," "," "," "," "," "],  {left: 209, top: 397 + yoffset});
  for(var i=0;i<8;i++)
    oparr2.value(i,oparr.value(i));
  for(var i=0;i<8;i++)
    oparr2.css(i,{"background-color":"#CCFF99"});
  jsav.label("<b>Paired array</b>", {left: 600, top: 400 + yoffset});
  jsav.step();
  jsav.recorded();
});
