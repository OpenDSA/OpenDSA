/*global JSAV, document */
// Written by Cliff Shaffer

$(document).ready(function() {
  "use strict";
  var av = new JSAV("backtrackingCON", {animationMode: "none"});

  var backLeft = 20;
  var backTop = 0;

  var tree = av.ds.tree({nodegap: 45, left:backLeft, top: backTop});
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

  av.g.line(18, 90, 53, 125, {"stroke": "red"});
  av.g.line(18, 125, 53, 90, {"stroke": "red"});
  av.g.line(18, 168, 53, 203, {"stroke": "red"});
  av.g.line(18, 203, 53, 168, {"stroke": "red"});
  av.g.line(95, 168, 130, 203, {"stroke": "red"});
  av.g.line(95, 203, 130, 168, {"stroke": "red"});
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

  av.label("2", {left: "105px", top: "40px"});
  av.label("6", {left: "160px", top: "115px"});
  av.label("1", {left: "245px", top: "205px"});
  av.label("10", {left: "250px", top: "180px"});
  av.label("1", {left: "375px", top: "280px"});
  /* av.label("1", {left: "700px", top: "275px"}); */
  av.label("3", {left: "325px", top: "348px"});
  av.label("16", {left: "258px", top: "418px"});
  av.label("18", {left: "335px", top: "264px"}).css({color: "red"});
  
  av.displayInit();
  av.recorded();
});
