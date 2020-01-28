// Written by Euno Cho, Fall 2019
$(document).ready(function() {
  "use strict";
  var av_name = "partDeriv2CON";
  var av = new JSAV(av_name, {animationMode: "none"});

  //building tree
  var tr = av.ds.tree({nodegap: 15});
  var rootA = tr.root("A");
  var firstC = tr.newNode("a");
  var secondC = tr.newNode("A");
  var thirdC = tr.newNode("a");
  rootA.addChild(firstC);
  rootA.addChild(secondC);
  rootA.addChild(thirdC);
  tr.layout();
  av.displayInit();
  av.recorded();
});
