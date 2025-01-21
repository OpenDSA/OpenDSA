/*global JSAV, document */
// Written by Cliff Shaffer

$(document).ready(function() {
  "use strict";
  var av = new JSAV("backtrackingCON", {animationMode: "none"});

  var backLeft = 20;
  var backTop = 0;

  var tree = av.ds.tree({nodegap: 45, left: backLeft, top: backTop});
  tree.root('A');
  var rt = tree.root();
  var nd;
  var curr = rt;
  nd = tree.newNode('A');
  curr.addChild(nd);
  nd = tree.newNode('B');
  curr.addChild(nd);
  curr = nd;
  nd = tree.newNode('A');
  curr.addChild(nd);
  nd = tree.newNode('B');
  curr.addChild(nd);
  nd = tree.newNode('C');
  curr.addChild(nd);
  curr = nd;
  nd = tree.newNode('A');
  curr.addChild(nd);
  nd = tree.newNode('B');
  curr.addChild(nd);
  nd = tree.newNode('C');
  curr.addChild(nd);
  nd = tree.newNode('D');
  curr.addChild(nd);
  var temp = nd;
  nd = tree.newNode('A');
  temp.addChild(nd);
  nd = tree.newNode('B');
  temp.addChild(nd);
  nd = tree.newNode('C');
  temp.addChild(nd);
  nd = tree.newNode('D');
  temp.addChild(nd);
  nd = tree.newNode('E');
  temp.addChild(nd);
  var temp2 = nd;
  nd = tree.newNode('A');
  temp2.addChild(nd);
  nd = tree.newNode('B');
  temp2.addChild(nd);
  nd = tree.newNode('C');
  temp2.addChild(nd);
  nd = tree.newNode('D');
  temp2.addChild(nd);
  nd = tree.newNode('E');
  temp2.addChild(nd);
  nd = temp;
  
  nd = tree.newNode('E');
  curr.addChild(nd);
  curr = nd;
  nd = tree.newNode('E');
  curr.addChild(nd);
  nd.hide();
  
/*  curr = nd;
  nd = tree.newNode('A');
  curr.addChild(nd);
  nd = tree.newNode('B');
  curr.addChild(nd);
  nd = tree.newNode('C');
  curr.addChild(nd);
  nd = tree.newNode('D');
  curr.addChild(nd);
  nd = tree.newNode('E');
  curr.addChild(nd); */
  tree.layout();

  av.g.line(120, 35, 300, 70).addClass("dashed");
  av.g.line(160, 115, 325, 140).addClass("dashed");

  av.g.line(50, 90, 85, 125, {"stroke": "red"});
  av.g.line(50, 125, 85, 90, {"stroke": "red"});
  av.g.line(50, 168, 85, 203, {"stroke": "red"});
  av.g.line(50, 203, 85, 168, {"stroke": "red"});
  av.g.line(127, 168, 162, 203, {"stroke": "red"});
  av.g.line(127, 203, 162, 168, {"stroke": "red"});
  av.g.line(172, 245, 207, 280, {"stroke": "red"});
  av.g.line(172, 280, 207, 245, {"stroke": "red"});
  av.g.line(95, 245, 130, 280, {"stroke": "red"});
  av.g.line(95, 280, 130, 245, {"stroke": "red"});
  av.g.line(18, 245, 53, 280, {"stroke": "red"});
  av.g.line(18, 280, 53, 245, {"stroke": "red"});
  av.g.line(95, 322, 130, 357, {"stroke": "red"});
  av.g.line(95, 357, 130, 322, {"stroke": "red"});
  av.g.line(172, 322, 207, 357, {"stroke": "red"});
  av.g.line(172, 357, 207, 322, {"stroke": "red"});
  av.g.line(249, 322, 284, 357, {"stroke": "red"});
  av.g.line(249, 357, 284, 322, {"stroke": "red"});
  av.g.line(326, 322, 361, 357, {"stroke": "red"});
  av.g.line(326, 357, 361, 322, {"stroke": "red"});
  /* av.g.line(480, 322, 515, 357, {"stroke": "red"});
  av.g.line(480, 357, 515, 322, {"stroke": "red"});
  av.g.line(557, 322, 592, 357, {"stroke": "red"});
  av.g.line(557, 357, 592, 322, {"stroke": "red"});
  av.g.line(634, 322, 669, 357, {"stroke": "red"});
  av.g.line(634, 357, 669, 322, {"stroke": "red"});
  av.g.line(788, 322, 823, 357, {"stroke": "red"});
  av.g.line(788, 357, 823, 322, {"stroke": "red"}); */
  av.g.line(326, 397, 361, 432, {"stroke": "red"});
  av.g.line(326, 432, 361, 397, {"stroke": "red"});
  av.g.line(403, 397, 438, 432, {"stroke": "red"});
  av.g.line(403, 432, 438, 397, {"stroke": "red"});
  av.g.line(480, 397, 515, 432, {"stroke": "red"});4
  av.g.line(480, 432, 515, 397, {"stroke": "red"});
  av.g.line(557, 397, 592, 432, {"stroke": "red"});
  av.g.line(557, 432, 592, 397, {"stroke": "red"});

  av.label("2", {left: "132px", top: "45px"});
  av.label("6", {left: "192px", top: "120px"});
  av.label("1", {left: "252px", top: "200px"});
  av.label("10", {left: "350px", top: "185px"});
  av.label("1", {left: "355px", top: "270px"});
  av.label("3", {left: "325px", top: "348px"});
  av.label("16", {left: "258px", top: "418px"});
  av.label("18", {left: "490px", top: "264px"}).css({color: "red"});
  
  // Copied from SalesCON.js
  var graph = av.ds.graph({left: 515, width: 300, height: 300, layout: "manual", directed: false});
  var a = graph.addNode("A", {left: 80, top: 0});
  var b = graph.addNode("B", {left: 220, top: 0});
  var c = graph.addNode("C", {left: 280, top: 130});
  var d = graph.addNode("D", {left: 150, top: 210});
  var e = graph.addNode("E", {left: 20, top: 130});
  graph.addEdge(a, b, {weight: "2"});
  graph.addEdge(a, c, {weight: "3"});
  graph.addEdge(a, d, {weight: "8"});
  graph.addEdge(a, e, {weight: "3"});
  graph.addEdge(b, c, {weight: "6"});
  graph.addEdge(b, d, {weight: "1"});
  graph.addEdge(b, e, {weight: "2"});
  graph.addEdge(c, e, {weight: "10"});
  graph.addEdge(d, e, {weight: "1"});
  graph.addEdge(c, d, {weight: "1"});
  graph.layout();


  av.displayInit();
  av.recorded();
});
