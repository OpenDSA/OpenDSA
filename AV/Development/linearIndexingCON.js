"use strict";

(function ($) {
  var av = new JSAV("varindexCON", {"animationMode": "none"});
  
  
  var rect1 = av.g.rect(0, 13, 30, 20).css({"fill": "white"});
  var rect2 = av.g.rect(30, 13, 30, 20).css({"fill": "white"});
  var rect3 = av.g.rect(60, 13, 30, 20).css({"fill": "white"});
  var rect4 = av.g.rect(90, 13, 30, 20).css({"fill": "white"});
  var rect5 = av.g.rect(120, 13, 30, 20).css({"fill": "white"});
  var rect6 = av.g.rect(150, 13, 30, 20).css({"fill": "white"});
  var rect7 = av.g.rect(180, 13, 30, 20).css({"fill": "white"});
  var rect8 = av.g.rect(210, 13, 30, 20).css({"fill": "white"});
  var rect9 = av.g.rect(240, 13, 30, 20).css({"fill": "white"});
  var rect10 = av.g.rect(270, 13, 30, 20).css({"fill": "white"});
  
  //Lower rectangles
  var rect11 = av.g.rect(0, 72, 120, 20).css({"fill": "white"});
  var rect12 = av.g.rect(120, 72, 60, 20).css({"fill": "white"});
  var rect13 = av.g.rect(180, 72, 140, 20).css({"fill": "white"});
  var rect14 = av.g.rect(320, 72, 30, 20).css({"fill": "white"});
  var rect15 = av.g.rect(350, 72, 170, 20).css({"fill": "white"});
  
  //Labels
  var xFragLabel = av.label("Linear Index", {left :  0, top:  -10});
  var inFragLabel = av.label("Database Records", {left :  0, top:  92});
  var fragLabel = av.label("37", {left : 8, top:  12});
  var fragLabel = av.label("42", {left : 68, top:  12});
  var fragLabel = av.label("52", {left : 128, top:  12});
  var fragLabel = av.label("73", {left : 188, top:  12});
  var fragLabel = av.label("98", {left : 248, top:  12});
  

  var fragLabel = av.label("73", {left : 2, top:  72});
  var fragLabel = av.label("52", {left : 122, top:  72});
  var fragLabel = av.label("98", {left : 182, top:  72});
  var fragLabel = av.label("37", {left : 322, top:  72});
  var fragLabel = av.label("42", {left : 352, top:  72});





  
  var xFragArrow = av.g.line(45,  20,  45, 45, {'stroke-width' : 1});
  var yFragArrow = av.g.line(45,  45,  325, 45, {'stroke-width' : 1});
  var zFragArrow = av.g.line(325,  45,  325, 70, {'arrow-end': 'classic-wide-long','stroke-width' : 1});
  
  var x1FragArrow = av.g.line(105,  20,  105, 39, {'stroke-width' : 1});
  var y1FragArrow = av.g.line(105,  39,  355, 39, {'stroke-width' : 1});
  var z1FragArrow = av.g.line(355,  39,  355, 70, {'arrow-end': 'classic-wide-long','stroke-width' : 1});
   
  var x2FragArrow = av.g.line(165,  20,  165, 62, {'stroke-width' : 1});
  var y2FragArrow = av.g.line(165,  62,  127, 62, {'stroke-width' : 1});
  var z2FragArrow = av.g.line(127,  62,  127, 70, {'arrow-end': 'classic-wide-long','stroke-width' : 1});
  
  var x3FragArrow = av.g.line(225,  20,  225, 57, {'stroke-width' : 1});
  var y3FragArrow = av.g.line(225,  57,  7, 57, {'stroke-width' : 1});
  var z3FragArrow = av.g.line(7,  57,  7, 70, {'arrow-end': 'classic-wide-long','stroke-width' : 1});
  
  var x4FragArrow = av.g.line(285,  20,  285, 51, {'stroke-width' : 1});
  var y4FragArrow = av.g.line(285,  51,  184, 51, {'stroke-width' : 1});
  var z4FragArrow = av.g.line(184,  51,  184, 70, {'arrow-end': 'classic-wide-long','stroke-width' : 1});


  

}(jQuery));
  
(function ($) {
  var av2 = new JSAV("linindexCON", {"animationMode": "none"});
  
  var rect1 = av2.g.rect(0, 13, 45, 20).css({"fill": "white"});
  var rect2 = av2.g.rect(45, 13, 45, 20).css({"fill": "white"});
  var rect3 = av2.g.rect(90, 13, 45, 20).css({"fill": "white"});
  var rect4 = av2.g.rect(135, 13, 45, 20).css({"fill": "white"});
  
  var rect5 = av2.g.rect(0, 75, 143, 20).css({"fill": "white"});
  var rect6 = av2.g.rect(143, 75, 143, 20).css({"fill": "white"});
  var rect7 = av2.g.rect(286, 75, 143, 20).css({"fill": "white"});
  var rect8 = av2.g.rect(429, 75, 143, 20).css({"fill": "white"});
  
  var fragLabel = av2.label("1", {left : 16, top:  12});
  var fragLabel = av2.label("2003", {left : 50, top:  12});
  var fragLabel = av2.label("5894", {left : 95, top:  12});
  var fragLabel = av2.label("10528", {left : 137, top:  12});
  
  var fragLabel = av2.label("1", {left : 2, top:  75});
  var fragLabel = av2.label("2001", {left : 108, top:  75});
  var fragLabel = av2.label("2003", {left : 145, top:  75});
  var fragLabel = av2.label("5688", {left : 251, top:  75});
  var fragLabel = av2.label("5894", {left : 288, top:  75});
  var fragLabel = av2.label("9942", {left : 394, top:  75});
  var fragLabel = av2.label("10528", {left : 431, top:  75});
  var fragLabel = av2.label("10984", {left : 530, top:  75});






 




  var fragLabel = av2.label("Second Level Index", {left :  0, top:  33});
  var fragLabel = av2.label("Linear Index: Disk Blocks", {left :  0, top:  95});
  


  
  //var point = av2.pointer(xFrag, rect2);
  //var xFragLabel = av.g.label("37", {left :  110, top:  0});
  //var xFragArrow = av2.g.line(105,  10,  90, 28, {'arrow-end': 'classic-wide-long', 'stroke-width' : 100});
  //var inFragLabel = av2.label("Unused space in allocated block: Internal fragmentation", {left :  20, top:  100});
  //var inFragArrow = av2.g.line(315, 100,  330, 82, {'arrow-end': 'classic-wide-long', 'stroke-width' : 2});
  
}(jQuery));
  