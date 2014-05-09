"use strict";

(function ($) {
  var av = new JSAV("bintreeCONBTEX", {"animationMode": "none"});

  // Draw the rectangles
  var rect_left = 200;
  var mainrect = av.g.rect(rect_left, 15, 200, 200);
  av.g.rect(    rect_left,  15, 100, 100);
  av.g.rect(rect_left+100, 115, 100, 100);
  av.g.rect(rect_left+100,  15,  50, 200);
  av.g.rect(rect_left+100,  15,  50,  50);
  av.g.rect(rect_left+125, 115,  25,  50);
  av.g.rect(rect_left+100, 115,  25,  50);

  // Add points
  av.g.circle(rect_left+60, 80, 5, {fill: 'black'});
  av.label("A", {left: rect_left+57, top: 82, visible: true}).show;
  av.g.circle(rect_left+20, 125, 5, {fill: 'black'});
  av.label("B", {left: rect_left+17, top: 127, visible: true}).show;
  av.g.circle(rect_left+110, 32, 5, {fill: 'black'});
  av.label("C", {left: rect_left+107, top: 35, visible: true}).show;
  av.g.circle(rect_left+107, 92, 5, {fill: 'black'});
  av.label("D", {left: rect_left+105, top: 95, visible: true}).show;
  av.g.circle(rect_left+102, 135, 5, {fill: 'black'});
  av.label("E", {left: rect_left+100, top: 137, visible: true}).show;
  av.g.circle(rect_left+137, 145, 5, {fill: 'black'});
  av.label("F", {left: rect_left+130, top: 147, visible: true}).show;

  // Setup the tree
  var bintreeTop = 275;
  var bt = av.ds.binarytree({nodegap: 10, top: bintreeTop, left: 200});
  bt.root('');
  var rt = bt.root();
  rt.left('');
  rt.left().left('A');
  rt.left().right('B');
  
  rt.right('');
  rt.right().left('');
  rt.right().left().right('');
  rt.right().left().left('');
  rt.right().left().left().left('C');
  rt.right().left().left().right('D');
  rt.right().right('');
  rt.right().right().left('');
  rt.right().right().right('');
  rt.right().right().left().left('');
  rt.right().right().left().right('');
  rt.right().right().left().left().left('E');
  rt.right().right().left().left().right('F');

  bt.layout();
  var alabel = av.label("(a)", {left: 250, top: bintreeTop - 40}).show;
  var blabel = av.label("(b)", {left: 250, top: bintreeTop + 370}).show;

  // Mark tree levels
  //av.g.rect( 460,  30, 200, 200);
  av.label("x", {left: 20, top: bintreeTop + 35}).show;
  av.g.line(40, bintreeTop + 45, 300, bintreeTop + 45);
  av.label("y", {left: 20, top: bintreeTop + 90}).show;
  av.g.line(40, bintreeTop + 100, 210, bintreeTop + 100);
  av.label("x", {left: 20, top: bintreeTop + 150}).show;
  av.g.line(40, bintreeTop + 160, 185, bintreeTop + 160);
  av.label("y", {left: 20, top: bintreeTop + 205}).show;
  av.g.line(40, bintreeTop + 215, 270, bintreeTop + 215);
  av.label("x", {left: 20, top: bintreeTop + 260}).show;
  av.g.line(40, bintreeTop + 270, 245, bintreeTop + 270);
  av.label("y", {left: 20, top: bintreeTop + 320}).show;
  av.g.line(40, bintreeTop + 330, 385, bintreeTop + 330);

}(jQuery));