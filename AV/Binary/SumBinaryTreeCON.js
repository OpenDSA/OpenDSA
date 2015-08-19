/*global ODSA */
"use strict";
$(document).ready(function () {
  var av_name = "SumBinaryTreeCON";
  var interpret = ODSA.UTILS.loadConfig({"av_name": av_name}).interpreter;
  var av = new JSAV(av_name);

  // Set up the tree
  var btTop = 100;
  var btLeft = 305;
  var bt = av.ds.binarytree({nodegap: 15, top: btTop, left: btLeft});
  bt.root("20");
  var rt = bt.root();
  rt.left("5");
  rt.left().right("30");
  rt.left().left("15");
  rt.right("10");
  rt.right().left("40");
  rt.right().right("25");
  bt.layout();
  
  // Slide 1
  av.umsg(interpret("av_c1"));
  var label1 = av.label(interpret("av_l1"), {left: 345, top: 0}); // create a label for the icon
  av.displayInit();
  
  // Slide 2
  av.umsg(interpret("av_c2"));
  av.step();
  
  // Slide 3
  av.umsg(interpret("av_c3"));
  var label2 = av.label(interpret("av_l2"), {left: 145, top: 150}); // create a label for the icon
  var line1 = av.g.line(230, 180, 290, 200,
                        {"stroke-width": "2", "arrow-end": "classic"});
  av.g.ellipse(339, 208, 50, 50).css({fill: "green", opacity: 0.2});
  av.step();
  
  // Slide 4
  av.umsg(interpret("av_c4"));
  var label3 = av.label(interpret("av_l3"), {left: 550, top: 150}); // create a label for the icon
  var line2 = av.g.line(550, 170, 490, 200,
                       {"stroke-width": "2", "arrow-end": "classic"});
  av.g.ellipse(442, 208, 50, 50).css({fill: "purple", opacity: 0.2});
  av.step();
  
  // Slide 5
  label2.hide();
  label3.hide();
  line1.hide();
  line2.hide();
  var label4 = av.label(interpret("av_l4"), {left: 145, top: 150}); // create a label for the icon
  var line3 = av.g.line(230, 180, 370, 100,
                       {"stroke-width": "2", "arrow-end": "classic"});
  av.umsg(interpret("av_c5"));
  av.step();
  
  // Slide 6
  var label5 = av.label(interpret("av_l5"), {left: 550, top: 150}); // create a label for the icon
  var line4 = av.g.line(550, 170, 410, 100,
                       {"stroke-width": "2", "arrow-end": "classic"});
  av.umsg(interpret("av_c6"));
  av.step();
  
  // Slide 7
  label1.hide();
  av.umsg(interpret("av_c7"));
  var label6 = av.label(interpret("av_l6"), {left: 345, top: 0}); // create a label for the icon
  av.step();

  // Slide 8
  av.umsg(interpret("av_c8"));
  av.recorded();
});
