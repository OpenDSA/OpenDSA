/*global ODSA */
"use strict";
// Pre-order traversal slideshow
$(document).ready(function () {
  var av_name = "GenTreePreTravCON";
  //var config = ODSA.UTILS.loadConfig({"av_name": av_name}),
     // interpret = config.interpreter,       // get the interpreter
      //code = config.code;                   // get the code object
  var av = new JSAV(av_name);
  //var pseudo = av.code(code);
  var temp1;

  var gt = av.ds.tree({visible: true, nodegap: 35});
  gt.root('R');
  var rt = gt.root();
  var a = gt.newNode('A');
  var b = gt.newNode('B');
  var c = gt.newNode('C');
  var d = gt.newNode('D');
  var e = gt.newNode('E');
  var f = gt.newNode('F');

  rt.addChild(a);
  rt.addChild(b);
  b.addChild(f);
  a.addChild(c);
  a.addChild(d);
  a.addChild(e);

  gt.layout();

  var rt1 = av.pointer("rt", rt, {anchor: "left top", top: -10});
  // Slide 1
  av.umsg("Preorder traversals start by analyzing the root node");
  av.displayInit();

  // Slide 2
  av.umsg("The left child is examined next, and is treated as the root of a new subtree");
  rt1.target(a);
  av.step();

  // Slide 3
  av.umsg("Continue Examining the left children");
  rt1.target(c, {anchor: "right top"});
  av.step();

  // Slide 4
  av.umsg("Now we arrive at the leaf node C. After processing, must go back to previous rt");
  av.step();

  // Slide 5
  av.umsg("We have already examined node A");
  rt1.target(a);
  av.step();

  // Slide 6
  av.umsg("Visit the next child (to the right) of node A");
  rt1.target(d, {anchor: "left top"});
  av.step();
  
  // Slide 7
  av.umsg("Process the node");
  av.step();

  // Slide 8
  av.umsg("Since this is another leaf, we return to the parent");
  rt1.target(a, {anchor: "left top"});
  av.step();

  // Slide 9
  av.umsg("Continue traversing the subtree with A as the root and process the node");
  rt1.target(e, {anchor: "left top"});
  av.step();

  // Slide 10
  av.umsg("Return to parent");
  rt1.target(a, {anchor: "left top"});
  av.step();

  // Slide 11
  av.umsg("Continue going back up the tree");
  rt1.target(rt)
  av.step();

  // Slied 12
  av.umsg("Visit and process the right child");
  rt1.target(b);
  av.step();

  // Slide 13
  av.umsg("Treat the B node as the new root and start processing this subtree");
  rt1.target(f);
  av.recorded();

});
