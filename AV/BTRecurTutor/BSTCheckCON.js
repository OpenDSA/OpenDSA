// Written by Yujie Chen, Summer 2019
$(document).ready(function() {
  "use strict";
  var av_name = "BSTCheckCON";

  var av = new JSAV(av_name, {animationMode: "none"});
  // Setup the init location of tree
  var btTop = 0;
  var btLeft = 180 + 150;
  var cirOpt = {fill: "white"};

  var bt = av.ds.binarytree({nodegap: 15, left: btLeft, top: btTop});
  bt.root("20");
  var rt = bt.root();
  rt.right("50");
  rt.right().left("40");
  rt.right().right("75");
  rt.right().left().left(""); // the covered leaf node

  //adding the leaf node "20 to 40"
  av.label("20 to 40", {visible: true, left: 325, top: 147});
  av.g.ellipse(350, 173, 35, 16, cirOpt);

  bt.layout();
  av.displayInit();
  av.recorded();
});

