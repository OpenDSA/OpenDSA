/*global ODSA */
"use strict";
// Pre-order traversal slideshow
$(document).ready(function () {
  var av_name = "GenTreePreTravCON";
  var config = ODSA.UTILS.loadConfig({"av_name": av_name}),
  interpret = config.interpreter,       // get the interpreter
  code = config.code;                   // get the code object
  var av = new JSAV(av_name);
  var pseudo = av.code(code);
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
  pseudo.setCurrentLine("processNode");
  av.umsg("Preorder traversals start by processing the root node.");
  av.displayInit();

  rt.addClass("processedNode");
  pseudo.setCurrentLine("checkLeaf");
  av.step();
  pseudo.setCurrentLine("leftChild");
  av.step();
  pseudo.setCurrentLine("checkNull");
  av.step();
  av.umsg("Next we visit the left most child");
  pseudo.setCurrentLine("processChild");
  av.step();

  av.umsg("This node is processed next, and is treated as the root of a new subtree.");
  pseudo.setCurrentLine("processNode");
  rt1.target(a);
  av.step();

  a.addClass("processedNode");
  pseudo.setCurrentLine("checkLeaf");
  av.step();
  pseudo.setCurrentLine("leftChild");
  av.step();
  pseudo.setCurrentLine("checkNull");
  av.step();
  av.umsg("Next we visit the left most child");
  pseudo.setCurrentLine("processChild");
  av.step();
  av.umsg("This node is processed next, and is treated as the root of a new subtree.");
  pseudo.setCurrentLine("processNode");
  rt1.target(c);
  av.step();
  c.addClass("processedNode");
  pseudo.setCurrentLine("checkLeaf");
  av.umsg("Since this is a leaf, we pop back to the parent");
  av.step();
  pseudo.setCurrentLine("checkLeaf");
  rt1.target(a);
  av.step();

  av.umsg("Continue Examining the left children.");
  pseudo.setCurrentLine("getNextSibling");
  av.step();
  pseudo.setCurrentLine("checkNull");
  av.step();
  pseudo.setCurrentLine("processChild");
  av.step();  
  rt1.target(d);
  pseudo.setCurrentLine("processNode");
  av.step();
  d.addClass("processedNode");
  pseudo.setCurrentLine("checkLeaf");
  av.step();
  av.umsg("Since this is a leaf, we pop back to the parent");
  rt1.target(a);
  pseudo.setCurrentLine("getNextSibling"); 
  av.step();
  pseudo.setCurrentLine("checkNull");
  av.step();
  pseudo.setCurrentLine("processChild");
  av.step();

  // Slide 6
  av.umsg("Visit the next child of node A.");
  rt1.target(e, {anchor: "right top"});
  pseudo.setCurrentLine("processNode");
  av.step();
  e.addClass("processedNode");
  pseudo.setCurrentLine("checkLeaf");
  av.step();
  
  av.umsg("Since this is a leaf, we pop back to the parent");
  rt1.target(a);
  pseudo.setCurrentLine("getNextSibling"); 
  av.step();
  pseudo.setCurrentLine("checkNull");
  av.step();
  av.umsg("We have no children left to be processed.");
  av.step();
  pseudo.setCurrentLine("getNextSibling"); 
  av.umsg("We pop back up to the parent node."); 
  rt1.target(rt);
  av.step();
  pseudo.setCurrentLine("checkNull");
  av.step();
  pseudo.setCurrentLine("processChild");
  av.step();
  rt1.target(b);
  pseudo.setCurrentLine("processNode");
  av.step();
  b.addClass("processedNode");
  pseudo.setCurrentLine("checkLeaf");
  av.step();
  av.umsg("Continue Examining the left children.");
  pseudo.setCurrentLine("leftChild");
  av.step();
  pseudo.setCurrentLine("checkNull"); 
  av.step();
  pseudo.setCurrentLine("processChild");
  av.step();  
  rt1.target(f);
  pseudo.setCurrentLine("processNode");
  av.step();
  f.addClass("processedNode");
  pseudo.setCurrentLine("checkLeaf");
  av.step();
  av.umsg("We have no children left to be processed.");
  av.step();
  pseudo.setCurrentLine("getNextSibling"); 
  av.umsg("We pop back up to the parent node."); 
  rt1.target(b);
  av.step();
  pseudo.setCurrentLine("checkNull");
  av.step();
  av.umsg("We have no children left to be processed.");
  av.step(); 
  rt1.target(rt);
  pseudo.setCurrentLine("end");
  av.recorded();

});
