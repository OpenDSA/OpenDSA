$(document).ready(function() {
  "use strict";
  var av_name = "derivEx1CON";
  var av = new JSAV(av_name, {animationMode: "none"});
  // Setup the tree
  var bt = av.ds.tree({nodegap: 15});
  bt.root("S");
  var rt = bt.root();
  var lt = bt.newNode("A");
  var lt2 = bt.newNode("A");
  var lt3 = bt.newNode("B");
  var lt4 = bt.newNode("B");
  rt.addChild(lt);
  rt.addChild("c");
  rt.addChild(lt3);
  lt.addChild("a");
  lt.addChild(lt2);
  lt.addChild("a");
  lt2.addChild("λ");
  lt3.addChild(lt4);
  lt3.addChild("b");
  lt3.addChild("b");
  lt4.addChild("λ");
  bt.layout();
  av.displayInit();
  av.recorded();
});

