/*global ODSA */
"use strict";
// Written by Mohammed Farghally and Cliff Shaffer
// Linear Recurrences
$(document).ready(function () {
  var av_name = "LinearRecurrencesCON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({"av_name": av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object
  var av;
  var graph;
  var leftAlign = 10;
  var topAlign = 10;
  var nodeGap = 50;
  var nodeHeight = 40;
  var nodeWidth = 40;
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
  // labelSet.push(av.label("<b><u>Amount of Work<b><u>", {"top": topAlign - 10 , "left": leftAlign + 200}));
  // labelSet.push(av.label("----------------------------------", {"top": topAlign + 0.5 * nodeHeight, "left": leftAlign + nodeWidth + labelShift}));
  // labelSet.push(av.label("1", {"top": topAlign + 0.5 * nodeHeight , "left": leftAlign + nodeWidth + labelShift * 20}));
  graph = av.ds.graph({"left": leftAlign, "top": topAlign, layout: "manual", directed: false});
  var n = graph.addNode("n", {"left": leftAlign, "top": topAlign});
  var nMinusOne = graph.addNode("n-1", {"left": leftAlign + nodeWidth + nodeGap, "top": topAlign});
  var oneTwo = graph.addEdge(n, nMinusOne, {"weight": "<b>1 +</b>"});
  n.highlight();
  oneTwo.css({"stroke":"green"});
  nMinusOne.css({"background-color":"lightgreen"});
  graph.layout();

  av.step();

  //Slide 3
  av.umsg(interpret("Slide 3.1"));
  av.umsg(interpret("Slide 3.2"), {"preserve": true});
  // labelSet.push(av.label("----------------------------------", {"top": topAlign + 2 * nodeHeight + nodeGap , "left": leftAlign + nodeWidth + labelShift}));
  // labelSet.push(av.label("1", {"top": topAlign + 2 * nodeHeight + nodeGap , "left": leftAlign + nodeWidth + labelShift * 20}));
  
  var nMinusTwo = graph.addNode("n-2", {"left": leftAlign + 2*nodeGap + 2* nodeWidth, "top": topAlign});
  var twoThree = graph.addEdge(nMinusOne, nMinusTwo, {"weight": "<b>1 +</b>"});
  n.unhighlight();
  nMinusOne.css({"background-color":"white"});
  nMinusOne.highlight();
  oneTwo.css({"stroke":"black"});
  twoThree.css({"stroke":"green"});
  nMinusTwo.css({"background-color":"lightgreen"});;
  
  graph.layout();
  av.step();

  //Slide 4
  av.umsg(interpret("Slide 4.1"));
  av.umsg(interpret("Slide 4.2"), {"preserve": true});
  // labelSet.push(av.label("----------------------------------", {"top": topAlign + 3.5 * nodeHeight + 2 * nodeGap , "left": leftAlign + nodeWidth + labelShift}));
  // labelSet.push(av.label("1", {"top": topAlign + 3.5 * nodeHeight + 2 * nodeGap , "left": leftAlign + nodeWidth + labelShift * 20}));
  
  var nMinusThree = graph.addNode("n-3", {"left": leftAlign + 3*nodeGap + 3* nodeWidth, "top": topAlign});
  var threeFour = graph.addEdge(nMinusTwo, nMinusThree, {"weight": "<b>1 +</b>"});
  nMinusOne.unhighlight();
  nMinusTwo.highlight();
  twoThree.css({"stroke":"black"});
  threeFour.css({"stroke":"green"});
  nMinusThree.css({"background-color":"lightgreen"});

  graph.layout();


  av.step();

  //Slide 5
  av.umsg(interpret("Slide 5.1"));
  av.umsg(interpret("Slide 5.2"), {"preserve": true});
  // labelSet.push(av.label("----------------------------------", {"top": topAlign + 5 * nodeHeight + 3 * nodeGap , "left": leftAlign + nodeWidth + labelShift}));
  // labelSet.push(av.label("1", {"top": topAlign + 5 * nodeHeight + 3 * nodeGap , "left": leftAlign + nodeWidth + labelShift * 20}));
  
  var nMinusFour = graph.addNode("n-4", {"left": leftAlign + 4*nodeGap + 4* nodeWidth, "top": topAlign});
  var fourFive = graph.addEdge(nMinusThree, nMinusFour, {"weight": "<b>1 +</b>"});
  nMinusTwo.unhighlight();
  nMinusTwo.css({"background-color":"white"});
  nMinusThree.highlight();
  threeFour.css({"stroke":"black"});
  fourFive.css({"stroke":"green"});
  nMinusFour.css({"background-color":"lightgreen"});
  graph.layout();
  av.step();

  //Slide 6
  av.umsg(interpret("Slide 6.1"));
  av.umsg(interpret("Slide 6.2"), {"preserve": true});
  // labelSet.push(av.label("----------------------------------", {"top": topAlign + 8.5 * nodeHeight + 4 * nodeGap , "left": leftAlign + nodeWidth + labelShift}));
  // labelSet.push(av.label("1", {"top": topAlign + 8.5 * nodeHeight + 4 * nodeGap , "left": leftAlign + nodeWidth + labelShift * 20}));
  
  var last = graph.addNode("1", {"left": leftAlign + 6 * nodeGap + 6 * nodeWidth, "top": topAlign});
  graph.layout();

  var lastEdge = av.g.line(leftAlign + 4 * nodeGap + 5.25 * nodeWidth, 
    topAlign + nodeHeight + 6, 
    leftAlign + 5 * nodeGap + 5.25 * nodeWidth + 90, 
    topAlign +  nodeHeight + 6);
  lastEdge.addClass("dashed");

  nMinusThree.unhighlight();
  nMinusThree.css({"background-color":"white"});
  fourFive.css({"stroke":"black"});
  
  nMinusFour.css({"background-color":"white"});
  last.css({"background-color":"lightgreen"});
  
  av.step();	

  //Slide 7
  last.css({"background-color":"white"});
  av.umsg(interpret("Slide 7"));
  labelSet.push
  (av.label("|--------------------------------------------------- $\\displaystyle\\sum_{i=1}^{n}1$ ---------------------------------------------------|", {"top": topAlign + 2*nodeHeight , "left": leftAlign + 0.5 * nodeWidth}));
  av.step();

  //Slide 8
  av.umsg(interpret("Slide 8"));
  av.step();
	
  // //Slide 9
  // av.umsg(interpret("Slide 9"));
  // $.each(labelSet, function(index, value){
  // 	value.hide();
  // });
  

  // av.step();
	
  // //Slide 10
  // labelSet = [];
  // av.umsg(interpret("Slide 10.1"));
  // av.umsg(interpret("Slide 10.2"), {"preserve": true});
  // labelSet.push(av.label("<b><u>Amount of Work<b><u>", {"top": topAlign - 10 , "left": leftAlign + 200}));
  // labelSet.push(av.label("----------------------------------", {"top": topAlign + 0.5 * nodeHeight, "left": leftAlign + nodeWidth + labelShift}));
  // labelSet.push(av.label("$n$", {"top": topAlign + 0.5 * nodeHeight , "left": leftAlign + nodeWidth + labelShift * 20}));
  // tree = av.ds.tree({left: leftAlign, top: topAlign, nodegap: nodeGap});
  // root = tree.newNode("$n$");
  // tree.root(root);
  // nMinusOne = tree.newNode("$n-1$");
  // root.addChild(nMinusOne);
  // tree.layout();
  // av.step();  
  // //Slide 11  av.umsg(interpret("Slide 11.1"));
  // av.umsg(interpret("Slide 11.2"), {"preserve": true});
  // labelSet.push(av.label("----------------------------------", {"top": topAlign + 2 * nodeHeight + nodeGap , "left": leftAlign + nodeWidth + labelShift}));
  // labelSet.push(av.label("$n-1$", {"top": topAlign + 2 * nodeHeight + nodeGap , "left": leftAlign + nodeWidth + labelShift * 20}));
  // nMinusTwo = tree.newNode("$n-2$");
  // nMinusOne.addChild(nMinusTwo);
  // tree.layout();
  // av.step();

  // //Slide 12
  // av.umsg(interpret("Slide 12.1"));
  // av.umsg(interpret("Slide 12.2"), {"preserve": true});
  // labelSet.push(av.label("----------------------------------", {"top": topAlign + 3.5 * nodeHeight + 2 * nodeGap , "left": leftAlign + nodeWidth + labelShift}));
  // labelSet.push(av.label("$n-2$", {"top": topAlign + 3.5 * nodeHeight + 2 * nodeGap , "left": leftAlign + nodeWidth + labelShift * 20}));
  // nMinusThree = tree.newNode("$n-3$");
  // nMinusTwo.addChild(nMinusThree);
  // tree.layout();
  // av.step();

  // //Slide 13
  // av.umsg(interpret("Slide 13.1"));
  // av.umsg(interpret("Slide 13.2"), {"preserve": true});
  // labelSet.push(av.label("----------------------------------", {"top": topAlign + 5 * nodeHeight + 3 * nodeGap , "left": leftAlign + nodeWidth + labelShift}));
  // labelSet.push(av.label("$n-3$", {"top": topAlign + 5 * nodeHeight + 3 * nodeGap , "left": leftAlign + nodeWidth + labelShift * 20}));
  // nMinusFour = tree.newNode("$n-4$");
  // nMinusThree.addChild(nMinusFour);
  // tree.layout();
  // av.step();

  // //Slide 14
  // av.umsg(interpret("Slide 14.1"));
  // av.umsg(interpret("Slide 14.2"), {"preserve": true});
  // labelSet.push(av.label("----------------------------------", {"top": topAlign + 8.5 * nodeHeight + 4 * nodeGap , "left": leftAlign + nodeWidth + labelShift}));
  // labelSet.push(av.label("$1$", {"top": topAlign + 8.5 * nodeHeight + 4 * nodeGap , "left": leftAlign + nodeWidth + labelShift * 20}));
  // one = tree.newNode("$1$");
  // nMinusFour.addChild(one);
  // edge = one.edgeToParent();
  // edge.addClass("dashed");
  // tree.layout();
  // av.step();	

  // //Slide 15
  // av.umsg(interpret("Slide 15"));
  // labelSet.push
  // (av.label("|------------------------------ $\\displaystyle\\sum_{i=1}^{n}i$ ------------------------------|", {"top": topAlign + 185 , "left": leftAlign + 190}).addClass("rotated"));
  // av.step();

  // //Slide 16
  // av.umsg(interpret("Slide 16"));
  // av.step();
	
  av.recorded();

});
