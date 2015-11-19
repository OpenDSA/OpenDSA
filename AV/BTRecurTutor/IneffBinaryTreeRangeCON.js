/*global ODSA */
"use strict";
$(document).ready(function () {

  var av_name ="IneffBinaryTreeRangeCON";
  var config = ODSA.UTILS.loadConfig({"av_name": av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object
  var av = new JSAV(av_name);

  var  pseudo = av.code($.extend({lineNumbers: false, top: 10, left: 100}, code[0]));


  // Slide 1
  av.umsg(interpret("av_c1"));
  av.displayInit();

  // Slide 2
  av.umsg(interpret("av_c2"));
  av.step();

  // Slide 3
  // Set up the tree
  var btTop = 300;
  var btLeft = 305;
  var bt = av.ds.binarytree({nodegap: 15, top: btTop, left: btLeft});
  bt.root('20');
  var rt = bt.root();
  rt.left('10');
  rt.left().left('5');
  rt.left().right('15');
 
  
  rt.right('40');
  rt.right().left('35');
  rt.right().right('65');

  bt.layout();
  var rt1 = av.pointer("rt", bt.root(), {anchor: "left top", top: -10});
  
  var label1 = av.label("range(rt, 10, 14)", {left: 50, top: 370}); 
  av.umsg(interpret("av_c3"));
  pseudo.highlight(2);
  rt1.target(rt, {anchor: "left top"});
  av.step();
  
  // Slide 4
  av.umsg(interpret("av_c4"));
  pseudo.unhighlight(2);
  pseudo.highlight(5);
  av.step();
  
  // Slide 5
  av.umsg(interpret("av_c5"));
  rt1.target(rt.left(), {anchor: "left top"}); 
  av.step();
  
  // Slide 6
  av.umsg(interpret("av_c6"));
  pseudo.unhighlight(5);
  pseudo.highlight([7, 8]);
  rt1.target(rt.right(), {anchor: "right top"}); 
  av.step();
   
  // Slide 7
  av.umsg(interpret("av_c7"));
  var label3 = av.label("The range function should be written in a way that avoid traversing this side for the given range.", {left: 550, top: 420}); 
  var el1= av.g.ellipse(442, 408, 50 , 50).css({fill: "red", opacity: 0.4});
  av.step();
  
  // Slide 8
  pseudo.unhighlight([7, 8]);
  label3.hide();
  el1.hide();
  av.umsg(interpret("av_c8"));
  label1.hide();
  var label2 = av.label("range(rt, 38, 68)", {left: 50, top: 370}); 
  pseudo.highlight(2);
  rt1.target(rt, {anchor: "left top"});
  av.step();
  
  // Slide 9
  av.umsg(interpret("av_c9"))
  pseudo.unhighlight(2);
  pseudo.highlight(5);
  av.step();
  
  // Slide 10
  av.umsg(interpret("av_c10"));
  rt1.target(rt.left(), {anchor: "left top"}); 
  av.step();
 
  // Slide 11
  av.umsg(interpret("av_c11"));
  pseudo.unhighlight(5);
  pseudo.highlight([7, 8]);
  var el2= av.g.ellipse(342, 408, 50 , 50).css({fill: "red", opacity: 0.4});
  av.step();

  // Slide 12
  av.umsg(interpret("av_c12"));
  
  pseudo.hide();
  var pseudo2 = av.code($.extend({lineNumbers: false, top: 10, left: 100}, code[1]));
  el2.hide();
  label2.hide();
  rt1.hide();
  pseudo2.highlight([7, 9]);
  av.recorded();
});
