"use strict";

(function ($) {
  var av = new JSAV("bintreeCONBTEX", {"animationMode": "none"});

  // Draw the rectangles
  var rect_left = 200;
  var mainrect = av.g.rect(rect_left, 30, 400, 400);
  av.g.rect(    rect_left,  30, 200, 200);
  av.g.rect(rect_left+200, 230, 200, 200);
  av.g.rect(rect_left+200, 130, 100, 200);
  av.g.rect(rect_left+300, 230, 100, 200);
  av.g.rect(rect_left+300,  30, 100, 200);
  av.g.rect(rect_left+200, 230,  50, 100);

  // Add points
  av.g.circle(rect_left+120, 160, 5, {fill: 'black'});
  av.label("A", {left: rect_left+115, top: 165, visible: true}).show;
  av.g.circle(rect_left+40, 250, 5, {fill: 'black'});
  av.label("B", {left: rect_left+35, top: 255, visible: true}).show;
  av.g.circle(rect_left+220, 65, 5, {fill: 'black'});
  av.label("C", {left: rect_left+215, top: 70, visible: true}).show;
  av.g.circle(rect_left+215, 185, 5, {fill: 'black'});
  av.label("D", {left: rect_left+210, top: 190, visible: true}).show;
  av.g.circle(rect_left+205, 270, 5, {fill: 'black'});
  av.label("E", {left: rect_left+200, top: 275, visible: true}).show;
  av.g.circle(rect_left+265, 290, 5, {fill: 'black'});
  av.label("F", {left: rect_left+260, top: 295, visible: true}).show;

  // Setup the tree
  var bt = av.ds.bintree({top: 450, left: 200});
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
  var alabel = av.label("(a)", {left: 250, top: 450}).show;
  var blabel = av.label("(b)", {left: 250, top: 985}).show;

  // Mark tree levels
  //av.g.rect( 460,  30, 200, 200);
  av.label("x", {left: 20, top: 510}).show;
  av.g.line(40, 520, 340, 520);
  av.label("y", {left: 20, top: 600}).show;
  av.g.line(40, 610, 210, 610);
  av.label("x", {left: 20, top: 690}).show;
  av.g.line(40, 700, 170, 700);
  av.label("y", {left: 20, top: 770}).show;
  av.g.line(40, 780, 300, 780);
  av.label("x", {left: 20, top: 865}).show;
  av.g.line(40, 875, 250, 875);
  av.label("y", {left: 20, top: 950}).show;
  av.g.line(40, 960, 460, 960);

}(jQuery));