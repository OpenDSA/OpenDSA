/*global ODSA */
// Heapbuild analysis proof slideshow
// Written by Mohammed Farghally and Cliff Shaffer
// Inspired by Hussein Thompson and Pranay CHaudhuri,
// "An Alternative Visual Analysis of the Build Heap Algorithm",
// ACM Inroads 2, 3(September), 2011.

$(document).ready(function () {
  "use strict";
  var av_name = "heapbuildProofCON";
  var config = ODSA.UTILS.loadConfig({"av_name": av_name}),
      interpret = config.interpreter;       // get the interpreter
  var av = new JSAV(av_name);
  var numNodes = 31;
  var slider1,
      slider2,
      slider3,
      slider4,
      slider5,
      slider6;

  var bhvoffset = -10; // Vertical offset for the tree and its decorations
  var voffset = 200;   // Vertical offset for the explanatory decorations

  var arr = [];
  for (var i = 0; i < numNodes; i++) {
    arr.push("");
  }
  // This really should be a binary tree (we never use the array view),
  // but making it a heap object is easier to set up.
  var bh = av.ds.binheap(arr, {left: 190, top: bhvoffset, nodegap: 15});
  bh.element.hide(); // Because we don't want to see the array
  av.label("depth 4 -------", {top: bhvoffset + 126, left: 85});
  av.label("depth 3 ----------", {top: bhvoffset + 92, left: 85});
  av.label("depth 2 ----------------", {top: bhvoffset + 60, left: 85});
  av.label("depth 1 ----------------------------", {top: bhvoffset + 30, left: 85});
  av.label("depth 0 ----------------------------------------------------", {top: bhvoffset - 2, left: 85});
  slider1 = av.g.rect(190, bhvoffset + 142, 513, 20).addClass("colored");
  slider1.hide();

  // Slide 1
  av.umsg(interpret("sc1"));
  av.displayInit();

  // Slide 2
  slider1.show();
  slider1.css({"opacity": 0.3});
  av.umsg(interpret("sc2"));
  av.step();

  // Slide 3
  slider1.translate(0, -32);
  av.umsg(interpret("sc3"));
  av.g.rect(10, voffset + 50, 200, 20);
  av.label("$2^3$", {top: voffset + 60, left: 100});
  av.step();
	
  // Slide 4
  slider1.translate(0, -32);
  av.umsg(interpret("sc4"));
  av.g.rect(210, voffset + 50, 100, 20);
  av.g.rect(210, voffset + 30, 100, 20);
  av.label("$2^2$",  {top: voffset + 60, left: 250});
  av.step();
	
  // Slide 5
  slider1.translate(0, -32);
  av.umsg(interpret("sc5"));
  av.g.rect(310, 250, 50, 20);
  av.g.rect(310, 230, 50, 20);
  av.g.rect(310, 210, 50, 20);
  av.label("$2$",  {top: voffset + 60, left: 330});
  av.step();
	
  // Slide 6
  slider1.translate(0, -32);
  av.umsg(interpret("sc6"));
  av.g.rect(360, voffset + 50, 25, 20);
  av.g.rect(360, voffset + 30, 25, 20);
  av.g.rect(360, voffset + 10, 25, 20);
  av.g.rect(360, voffset - 10, 25, 20);
  av.label("$1$", {top: voffset + 60, left: 370});
  av.label(" depth = 4 ", {top: voffset + 8, left: 365}).css({"font-size": 12, "text-align": "center"}).addClass("rotated");
  av.step();

  // Slide 7
  av.umsg(interpret("sc7"));
  slider1.hide();
  slider2 = av.g.rect(10, voffset + 49, 375, 20).addClass("colored");
  slider2.css({"opacity": 0.3});
  av.g.rect(430, voffset + 50, 200, 20);
  av.g.rect(630, voffset + 50, 100, 20);
  av.g.rect(730, voffset + 50, 50, 20);
  av.g.rect(780, voffset + 50, 25, 20);
  slider3 = av.g.rect(430, voffset + 50, 375, 20).addClass("colored");
  slider3.css({"opacity": 0.3});
  av.label("$2^3$", {top: voffset + 60, left: 520});
  av.label("$2^2$", {top: voffset + 60, left: 670});
  av.label("$2$",   {top: voffset + 60, left: 750});
  av.label("$1$",   {top: voffset + 60, left: 790});
  av.step();
	
  // Slide 8
  slider2.translate(0, -20);
  av.g.rect(430, voffset + 30, 100, 20);
  av.g.rect(530, voffset + 30, 50, 20);
  av.g.rect(580, voffset + 30, 25, 20);
  slider4 = av.g.rect(430, voffset + 30, 175, 20).addClass("colored");
  slider4.css({"opacity": 0.3});
  slider3.removeClass("colored");
  av.step();
	
  // Slide 9
  slider2.translate(0, -20);
  av.g.rect(630, voffset + 30, 50, 20);
  av.g.rect(680, voffset + 30, 25, 20);
  slider5 = av.g.rect(630, voffset + 30, 75, 20).addClass("colored");
  slider5.css({"opacity": 0.3});
  slider4.removeClass("colored");
  av.step();
	
  // Slide 10
  slider2.translate(0, -20);
  av.g.rect(730, voffset + 30, 25, 20);
  slider6 = av.g.rect(730, voffset + 30, 25, 20).addClass("colored");
  slider6.css({"opacity": 0.3});
  slider5.removeClass("colored");
  av.step();
	
  // Slide 11
  av.g.rect(605, voffset + 30, 25, 20).css({fill: "black"});
  av.g.rect(705, voffset + 30, 25, 20).css({fill: "black"});
  av.g.rect(755, voffset + 30, 25, 20).css({fill: "black"});
  av.g.rect(780, voffset + 30, 25, 20).css({fill: "black"});
  slider6.removeClass("colored");
  av.label("-1",  {top: voffset - 5, left: 610});
  av.label("-1",  {top: voffset - 5, left: 710});
  av.label("-1",  {top: voffset - 5, left: 760});
  av.label("-1",  {top: voffset - 5, left: 785});
  av.step();

  // Slide 12
  av.umsg(interpret("sc12"));
  av.step();

  // Slide 13
  av.umsg(interpret("sc13"));
  av.recorded();
});
