$(document).ready(function() {
  "use strict";
  var av = new JSAV("UnaryTreeExampleCON", {animationMode: "none"});
  // Setup the tree
  var btTop = -5;
  var btLeft = 305;
  var bt = av.ds.binarytree({nodegap: 30, left: btLeft, top: btTop});
  bt.root(" ");
  var rt = bt.root();
  rt.right(" ");
  rt.right().right(" ");
  rt.right().edgeToRight().addClass("dashed");
  rt.right().right().right(" ");
  var myLabel = av.label("Any number of internal nodes",{left:"410px",top:"95px"});

  bt.layout();
  av.displayInit();
  av.recorded();
});
