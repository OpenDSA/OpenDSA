/*global ODSA */
// Written by Mohammed Farghally and Cliff Shaffer
// Linear Recurrences
$(document).ready(function() {
  "use strict";
  var av_name = "LinearRecurrencesCON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter;       // get the interpreter
  var av;
  var graph;
  var leftAlign = 10;
  var topAlign = 0;
  var nodeGap = 50;
  var nodeHeight = 40;
  var nodeWidth = 40;
  var labelSet;

  av = new JSAV(av_name);
  labelSet = [];

  // Slide 1
  av.umsg(interpret("sc1"));
  av.displayInit();

  // Slide 2
  av.umsg(interpret("sc2.1"));
  av.umsg(interpret("sc2.2"), {preserve: true});
  graph = av.ds.graph({left: leftAlign, top: topAlign, width: 550, layout: "manual", directed: false});
  var n = graph.addNode("n", {left: leftAlign, top: topAlign});
  var nMinusOne = graph.addNode("n-1", {left: leftAlign + nodeWidth + nodeGap, top: topAlign});
  var oneTwo = graph.addEdge(n, nMinusOne, {weight: "<b>1 +</b>"});
  n.highlight();
  oneTwo.addClass("subProblemEdge");
  nMinusOne.addClass("subProblemNode");
  graph.layout();
  av.step();

  // Slide 3
  av.umsg(interpret("sc3.1"));
  av.umsg(interpret("sc3.2"), {preserve: true});
  var nMinusTwo = graph.addNode("n-2", {left: leftAlign + 2 * nodeGap + 2 * nodeWidth, top: topAlign});
  var twoThree = graph.addEdge(nMinusOne, nMinusTwo, {weight: "<b>1 +</b>"});
  n.unhighlight();
  nMinusOne.removeClass("subProblemNode");
  nMinusOne.highlight();
  oneTwo.removeClass("subProblemEdge");
  twoThree.addClass("subProblemEdge");
  nMinusTwo.addClass("subProblemNode");
  graph.layout();
  av.step();

  // Slide 4
  av.umsg(interpret("sc4.1"));
  av.umsg(interpret("sc4.2"), {preserve: true});
  var nMinusThree = graph.addNode("n-3", {left: leftAlign + 3 * nodeGap + 3 * nodeWidth, top: topAlign});
  var threeFour = graph.addEdge(nMinusTwo, nMinusThree, {weight: "<b>1 +</b>"});
  nMinusOne.unhighlight();
  nMinusTwo.highlight();
  twoThree.css({stroke: "black"});
  threeFour.css({stroke: "green"});
  nMinusThree.addClass("subProblemNode");
  graph.layout();
  av.step();

  // Slide 5
  av.umsg(interpret("sc5.1"));
  av.umsg(interpret("sc5.2"), {preserve: true});
  var nMinusFour = graph.addNode("n-4", {left: leftAlign + 4 * nodeGap + 4 * nodeWidth, top: topAlign});
  var fourFive = graph.addEdge(nMinusThree, nMinusFour, {weight: "<b>1 +</b>"});
  nMinusTwo.unhighlight();
  nMinusTwo.removeClass("subProblemNode");
  nMinusThree.highlight();
  threeFour.removeClass("subProblemEdge");
  fourFive.addClass("subProblemEdge");
  nMinusFour.addClass("subProblemNode");
  graph.layout();
  av.step();

  // Slide 6
  av.umsg(interpret("sc6.1"));
  av.umsg(interpret("sc6.2"), {preserve: true});
  var last = graph.addNode("1", {left: leftAlign + 6 * nodeGap + 6 * nodeWidth, top: topAlign});
  graph.layout();
  var lastEdge = av.g.line(leftAlign + 4 * nodeGap + 5 * nodeWidth + 14,
                           topAlign + nodeHeight - 4,
                           leftAlign + 5 * nodeGap + 5 * nodeWidth + 104,
                           topAlign +  nodeHeight - 4);
  lastEdge.addClass("dashed");
  nMinusThree.unhighlight();
  nMinusThree.removeClass("subProblemNode");
  fourFive.removeClass("subProblemEdge");
  nMinusFour.removeClass("subProblemNode");
  last.addClass("subProblemNode");
  av.step();

  // Slide 7
  last.removeClass("subProblemNode");
  av.umsg(interpret("sc7"));
  labelSet.push(av.label("|--------------------------------------------------- $\\displaystyle\\sum_{i=1}^{n}1$ ---------------------------------------------------|",
                         {top: topAlign + 1.5 * nodeHeight, left: leftAlign + 0.5 * nodeWidth}));
  av.step();

  // Slide 8
  av.umsg(interpret("sc8"));
  av.recorded();
});
