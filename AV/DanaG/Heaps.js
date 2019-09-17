$(document).ready(function() {
  "use strict";
  var av = new JSAV("HeapsAV", {animationMode: "none"});

  var btTop = -5;
  var btLeft = 305;
  var bt = av.ds.binarytree({nodegap: 15, left: btLeft, top: btTop});
  bt.root("R");
  var rt = bt.root();
  rt.left("H1");
  rt.right("H2");

  bt.layout();
  av.displayInit();
  av.recorded();
});