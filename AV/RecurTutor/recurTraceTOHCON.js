/*global ODSA */
// Written by Sally Hamouda and Cliff Shaffer
// Visualization for Towers of Hanoi
$(document).ready(function() {
  "use strict";
  var av_name = "recurTraceTOHCON";
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object
  var av = new JSAV(av_name);
  var label0 = av.label("0", {left: 165, top: 72});
  var label1 = av.label("1", {left: 180, top: 102});
  var label2 = av.label("2", {left: 195, top: 132});
  var label3 = av.label("3", {left: 210, top: 162});
  var rectver0 = av.g.rect(105, 10, 10, 190).css({fill: "brown"});
  rectver0.show();
  var rectver1 = av.g.rect(375, 10, 10, 190).css({fill: "brown"});
  rectver1.show();
  var rectver2 = av.g.rect(605, 10, 10, 190).css({fill: "brown"});
  rectver2.show();
// The moving ones
  var rect0 = av.g.rect(65, 90, 90, 20).css({fill: "grey"});
  var rect1 = av.g.rect(50, 120, 120, 20).css({fill: "yellow"});
  var rect2 = av.g.rect(35, 150, 150, 20).css({fill: "purple"});
  var rect3 = av.g.rect(20, 180, 180, 20).css({fill: "green"});
//  var rect4 = av.g.rect(5, 150, 210, 20).css({fill: "red"});
//  var rect5 = av.g.rect(-10, 180, 240, 20).css({fill: "blue"});
// Labels for each tower
  var labela = av.label("A", {left: 90, top: -18});
  labela.show();
  var labelb = av.label("B", {left: 363, top: -18});
  labelb.show();
  var labelc = av.label("C", {left: 590, top: -18});
  labelc.show();
  var  pseudo = av.code(code);
  av.displayInit();
  //slide 1
  av.umsg(interpret("av_c3"));
  var labelCallStack3 = av.label("TowersofHanoi(3, A, B, C)", {left: 0, top: 290});
  av.step();
  //slide 2
  av.umsg(interpret("av_c4"));
  var labelCallStack2 = av.label("TowersofHanoi(2, A, C, B)", {left: 0, top: 320});
  av.step();
  //slide 3
  av.umsg(interpret("av_c5"));
  var labelCallStack1 = av.label("TowersofHanoi(1, A, B, C)", {left: 0, top: 350});
  av.step();
  //slide 4
  av.umsg(interpret("av_c6"));
  var labelCallStack0 = av.label("TowersofHanoi(0, A, C, B)", {left: 0, top: 380});
  //pseudo.unhighlight(1);
  pseudo.highlight(10);
  av.step();
  //slide 5
  pseudo.unhighlight(10);
  pseudo.highlight(11);
  rect0.hide();
  label0.hide();
  var label2122 = av.label("0", {left: 660, top: 163});
  label2122.show();
  var rect06 = av.g.rect(565, 180, 90, 20).css({fill: "grey"});
  av.step();
  //slide 6
  pseudo.unhighlight(11);
  pseudo.highlight(10);
  rect1.hide();
  label1.hide();
 // New label 1 in the middle
  labelCallStack0.hide();
  av.umsg(interpret("av_c7"));
  var label17 = av.label("1", {left: 440, top: 163});
  var rect17 = av.g.rect(315, 180, 120, 20).css({fill: "yellow"});
  av.step();
  //slide 7
  av.umsg(interpret("av_c8"));
  pseudo.unhighlight(10);
  av.step();
  //slide 8
  pseudo.highlight(10);
  rect06.hide();
  label0.hide();
  var label068 = av.label("0", {left: 425, top: 130});
  var rect068 = av.g.rect(330, 150, 90, 20).css({fill: "grey"});
  av.step();
  //slide 9
  pseudo.unhighlight(10);
  pseudo.highlight(11);
  rect2.hide();
  label2.hide();
  labelCallStack1.hide();
  av.umsg(interpret("av_c9"));
  var label29 = av.label("2", {left: 698, top: 163});
  var rect29 = av.g.rect(540, 180, 150, 20).css({fill: "purple"});
  av.step();
  //slide 10
  av.umsg(interpret("av_c10"));
  labelCallStack1.show();
  av.step();
  //slide 11
  labelCallStack0.show();
  pseudo.unhighlight(11);
  pseudo.highlight(8);
  rect068.hide();
  label068.hide();
  var label06810 = av.label("0", {left: 165, top: 132});
  var  rect06810 = av.g.rect(65, 150, 90, 20).css({fill: "grey"});
  av.step();
  //slide 12
  labelCallStack0.hide();
  av.umsg(interpret("av_c11"));
  pseudo.unhighlight(8);
  pseudo.highlight(16);
  rect17.hide();
  label17.hide();
  var label1711 = av.label("1", {left: 686, top: 132});
  var rect1711 = av.g.rect(550, 150, 120, 20).css({fill: "yellow"});
  av.step();
  //slide 13
  av.umsg(interpret("av_c12"));
  pseudo.unhighlight(10);
  pseudo.highlight(11);
  rect06810.hide();
  label06810.hide();
  labelCallStack0.show();
  var label0681012 = av.label("0", {left: 660, top: 102});
  var rect0681012 = av.g.rect(565, 120, 90, 20).css({fill: "grey"});
  av.step();
  //slide 14
  av.umsg(interpret("av_c13"));
  pseudo.unhighlight(11);
  pseudo.highlight(11);
  labelCallStack0.hide();
  av.step();
  //slide 15
  labelCallStack1.hide();
  av.step();
  //slide 16
  pseudo.unhighlight(11);
  pseudo.highlight(10);
  labelCallStack2.hide();
  rect3.hide();
  label3.hide();
  var label313 = av.label("3", {left: 480, top: 162});
  label313.show();
  var rect313 = av.g.rect(295, 180, 180, 20).css({fill: "green"});
  rect313.show();
  av.step();
  //slide 17
  pseudo.unhighlight(10);
  pseudo.highlight(11);
  labelCallStack2.show();
  av.step();
  //slide 18
  labelCallStack1.show();
  av.step();
  //slide 19
  labelCallStack0.show();
  av.step();
  //slide 20
  pseudo.unhighlight(11);
  pseudo.highlight(11);
  rect0681012.hide();
  label0681012.hide();
  var label068101214 = av.label("0", {left: 428, top: 132});
  var  rect068101214 = av.g.rect(330, 150, 90, 20).css({fill: "grey"});
  av.step();
  //slide 21
  pseudo.unhighlight(11);
  pseudo.highlight(10);
  labelCallStack0.hide();
  rect1711.hide();
  label1711.hide();
  //av.step();
  //slide 22
  var label171115 = av.label("1", {left: 180, top: 162});
  var rect171115 = av.g.rect(50, 180, 120, 20).css({fill: "yellow"});
  labelCallStack0.show();
  av.step();
  //slide 23
  pseudo.unhighlight(10);
  pseudo.highlight(12);
  rect068101214.hide();
  label068101214.hide();
  labelCallStack0.hide();
  var label015  = av.label("0", {left: 165, top: 132});
  var rect015 = av.g.rect(65, 150, 90, 20).css({fill: "grey"});
  av.step();
  //slide 24
  labelCallStack1.hide();
  pseudo.unhighlight(12);
  pseudo.highlight(11);
  av.step();
  //slide 25
  pseudo.unhighlight(11);
  pseudo.highlight(12);
  rect29.hide();
  label29.hide();
  var label216 = av.label("2", {left: 468, top: 132});
  label216.show();
  var rect216 = av.g.rect(310, 150, 150, 20).css({fill: "purple"});
  rect216.show();
  av.step();
  //slide 26
  pseudo.unhighlight(12);
  pseudo.highlight(10);
  labelCallStack1.show();
  av.step();
  //slide 27
  labelCallStack0.show();
  av.step();
  //slide 28
  pseudo.unhighlight(10);
  pseudo.highlight(11);
  rect015.hide();
  label015.hide();
  var label017  = av.label("0", {left: 660, top: 162});
  var rect017 = av.g.rect(565, 180, 90, 20).css({fill: "grey"});
  av.step();
  //slide 29
  pseudo.unhighlight(11);
  pseudo.highlight(10);
  rect171115.hide();
  label171115.hide();
  labelCallStack0.hide();
  var label118 = av.label("1", {left: 450, top: 102});
  label118.show();
  var rect118 = av.g.rect(320, 120, 120, 20).css({fill: "yellow"});
  rect118.show();
  av.step();
  //slide 30
  pseudo.unhighlight(10);
  pseudo.highlight(11);
  labelCallStack0.show();
  av.step();
  //slide 31
  pseudo.unhighlight(11);
  pseudo.highlight(11);
  rect017.hide();
  label017.hide();
  var label019 = av.label("0", {left: 440, top: 72});
  label019.show();
  var rect019 = av.g.rect(340, 90, 90, 20).css({fill: "grey"});
  rect019.show();
  labelCallStack0.hide();
  av.step();
  //slide 32
  pseudo.unhighlight(11);
  pseudo.highlight(9);
  av.step();
  //slide 33
  labelCallStack0.hide();
  av.step();
  //slide 34
  labelCallStack1.hide();
  av.step();
  //slide 35
  labelCallStack2.hide();
  av.step();
  //slide 36
  labelCallStack3.hide();
 // labelCallStack4.hide();
 // av.step();
 // labelCallStack5.hide();
  av.recorded();
});
