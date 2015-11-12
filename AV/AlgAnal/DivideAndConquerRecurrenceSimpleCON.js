/*global ODSA */
"use strict";
// Written by Mohammed Farghally and Cliff Shaffer
// Linear Recurrences
$(document).ready(function () {
  var av_name = "DivideAndConquerRecurrenceSimpleCON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({"av_name": av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object
  var av;
  var tree;
  var leftAlign = 250;
  var topAlign = 0;
  var nodeGap = 25;
  var nodeHeight = 33;
  var nodeWidth = 45;
  var labelShift = 10;
  var labelSet;
  
  av = new JSAV(av_name);
  labelSet = [];
	
  //Slide 1	
  av.umsg(interpret("Slide 1"));
  av.displayInit();

	//Slide 2
  av.umsg(interpret("Slide 2.1"));
  av.umsg(interpret("Slide 2.2"), {"preserve": true});
  labelSet.push(av.label("<b><u>Amount of Work<b><u>", {"top": topAlign - 10 , "left": leftAlign + 200}));
  labelSet.push(av.label("----------------------------------", {"top": topAlign + 0.5 * nodeHeight, "left": leftAlign + nodeWidth + labelShift}));
  labelSet.push(av.label("1", {"top": topAlign + 0.5 * nodeHeight , "left": leftAlign + nodeWidth + labelShift * 20}));
  tree = av.ds.tree({left: leftAlign, top: topAlign, nodegap: nodeGap});
  var root = tree.newNode("$n$");
  tree.root(root);
  var nMinusOne = tree.newNode("$n/2$");
  root.addChild(nMinusOne);
  tree.layout();
  av.step();

  //Slide 3
  av.umsg(interpret("Slide 3.1"));
  av.umsg(interpret("Slide 3.2"), {"preserve": true});
  labelSet.push(av.label("----------------------------------", {"top": topAlign + 2 * nodeHeight + nodeGap , "left": leftAlign + nodeWidth + labelShift}));
  labelSet.push(av.label("1", {"top": topAlign + 2 * nodeHeight + nodeGap , "left": leftAlign + nodeWidth + labelShift * 20}));
  var nMinusTwo = tree.newNode("$n/4$");
  nMinusOne.addChild(nMinusTwo);
  tree.layout();
  av.step();

  //Slide 4
  av.umsg(interpret("Slide 4.1"));
  av.umsg(interpret("Slide 4.2"), {"preserve": true});
  labelSet.push(av.label("----------------------------------", {"top": topAlign + 3.5 * nodeHeight + 2 * nodeGap , "left": leftAlign + nodeWidth + labelShift}));
  labelSet.push(av.label("1", {"top": topAlign + 3.5 * nodeHeight + 2 * nodeGap , "left": leftAlign + nodeWidth + labelShift * 20}));
  var nMinusThree = tree.newNode("$n/8$");
  nMinusTwo.addChild(nMinusThree);
  tree.layout();
  av.step();

  //Slide 5
  av.umsg(interpret("Slide 5.1"));
  av.umsg(interpret("Slide 5.2"), {"preserve": true});
  labelSet.push(av.label("----------------------------------", {"top": topAlign + 5 * nodeHeight + 3 * nodeGap , "left": leftAlign + nodeWidth + labelShift}));
  labelSet.push(av.label("1", {"top": topAlign + 5 * nodeHeight + 3 * nodeGap , "left": leftAlign + nodeWidth + labelShift * 20}));
  var nMinusFour = tree.newNode("$n/16$");
  nMinusThree.addChild(nMinusFour);
  tree.layout();
  av.step();

  //Slide 6
  av.umsg(interpret("Slide 6.1"));
  av.umsg(interpret("Slide 6.2"), {"preserve": true});
  labelSet.push(av.label("----------------------------------", {"top": topAlign + 8.5 * nodeHeight + 4 * nodeGap , "left": leftAlign + nodeWidth + labelShift}));
  labelSet.push(av.label("1", {"top": topAlign + 8.5 * nodeHeight + 4 * nodeGap , "left": leftAlign + nodeWidth + labelShift * 20}));
  var one = tree.newNode("$1$");
  nMinusFour.addChild(one);
  var edge = one.edgeToParent();
  edge.addClass("dashed");
  tree.layout();
  av.step();	

  //Slide 7
  av.umsg(interpret("Slide 7"));
  labelSet.push
  (av.label("|------------------------------ $\\displaystyle\\sum_{i=0}^{\\log{n}}1$ ------------------------------|", {"top": topAlign + 185 , "left": leftAlign + 190}).addClass("rotated"));
  av.step();

  //Slide 8
  av.umsg(interpret("Slide 8"));
  av.step();
	
  av.recorded();

});