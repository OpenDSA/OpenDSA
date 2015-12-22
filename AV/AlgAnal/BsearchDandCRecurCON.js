/*global ODSA */
// Written by Mohammed Farghally and Cliff Shaffer
// Linear Recurrences
$(document).ready(function() {
  "use strict";
  var av_name = "BsearchDandCRecurCON";
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
  graph = av.ds.graph({left: leftAlign, top: topAlign, layout: "manual", directed: false});
  var n = graph.addNode("n", {left: leftAlign, top: topAlign});
  var nOverTwo = graph.addNode("n/2", {left: leftAlign + nodeWidth + nodeGap, top: topAlign});
  var oneTwo = graph.addEdge(n, nOverTwo, {weight: "<b>1 +</b>"});
  n.highlight();
  oneTwo.addClass("subProblemEdge");
  nOverTwo.addClass("subProblemNode");
  graph.layout();
  av.step();

  // Slide 3
  av.umsg(interpret("sc3.1"));
  av.umsg(interpret("sc3.2"), {preserve: true});
  var nOverFour = graph.addNode("n/4", {left: leftAlign + 2 * nodeGap + 2 * nodeWidth, top: topAlign});
  var twoThree = graph.addEdge(nOverTwo, nOverFour, {weight: "<b>1 +</b>"});
  n.unhighlight();
  nOverTwo.removeClass("subProblemNode");
  nOverTwo.highlight();
  oneTwo.removeClass("subProblemEdge");
  twoThree.addClass("subProblemEdge");
  nOverFour.addClass("subProblemNode");
  graph.layout();
  av.step();

  // Slide 4
  av.umsg(interpret("sc4.1"));
  av.umsg(interpret("sc4.2"), {preserve: true});
  var nOverEight = graph.addNode("n/8", {left: leftAlign + 3 * nodeGap + 3 * nodeWidth, top: topAlign});
  var threeFour = graph.addEdge(nOverFour, nOverEight, {weight: "<b>1 +</b>"});
  nOverTwo.unhighlight();
  nOverFour.highlight();
  twoThree.removeClass("subProblemEdge");
  threeFour.addClass("subProblemEdge");
  nOverEight.addClass("subProblemNode");
  graph.layout();
  av.step();

  // Slide 5
  av.umsg(interpret("sc5.1"));
  av.umsg(interpret("sc5.2"), {preserve: true});
  var nOverSixteen = graph.addNode("n/16", {left: leftAlign + 4 * nodeGap + 4 * nodeWidth, top: topAlign});
  var fourFive = graph.addEdge(nOverEight, nOverSixteen, {weight: "<b>1 +</b>"});
  nOverFour.unhighlight();
  nOverFour.removeClass("subProblemNode");
  nOverEight.highlight();
  threeFour.removeClass("subProblemEdge");
  fourFive.addClass("subProblemEdge");
  nOverSixteen.addClass("subProblemNode");
  graph.layout();
  av.step();

  // Slide 6
  av.umsg(interpret("sc6.1"));
  av.umsg(interpret("sc6.2"), {preserve: true});
  var last = graph.addNode("1", {left: leftAlign + 6 * nodeGap + 6 * nodeWidth, top: topAlign});
  graph.layout();
  var lastEdge = av.g.line(leftAlign + 4 * nodeGap + 5.25 * nodeWidth + 3,
                           topAlign + nodeHeight - 3,
                           leftAlign + 5 * nodeGap + 5.25 * nodeWidth + 93,
                           topAlign + nodeHeight - 3);
  lastEdge.addClass("dashed");
  nOverEight.unhighlight();
  nOverEight.removeClass("subProblemNode");
  fourFive.removeClass("subProblemEdge");
  nOverSixteen.removeClass("subProblemNode");
  last.addClass("subProblemNode");
  av.step();

  //Slide 7
  av.umsg(interpret("sc7"));
  last.removeClass("subProblemNode");
  labelSet.push(av.label("|-------------------------------------------------- $\\displaystyle\\sum_{i=0}^{\\log{n}}1$ -------------------------------------------------|", {top: topAlign + 1.5 * nodeHeight, left: leftAlign + 0.5 * nodeWidth + 3}));
  av.step();

  //Slide 8
  av.umsg(interpret("sc8"));
  av.step();

  av.recorded();
});
