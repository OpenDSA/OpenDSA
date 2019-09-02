$(document).ready(function() {
  "use strict";
  var av_name = "partialDerivEx1CON";
  var av = new JSAV(av_name, { animationMode: "none" });
  // Setup the tree
  var bt = av.ds.tree({ nodegap: 15 });
  bt.root("S");
  var rt = bt.root();
  var lt = bt.newNode("A");
  rt.addChild(lt);
  rt.addChild("c");
  rt.addChild("B");
  lt.addChild("a");
  lt.addChild("A");
  lt.addChild("a");
  bt.layout();
  av.displayInit();
  av.recorded();
});
