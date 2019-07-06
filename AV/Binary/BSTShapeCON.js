// Written by Yujie Chen and Cliff Shaffer, Summer 2019
$(document).ready(function() {
  "use strict";
  var av_name = "BSTShapeCON";

  var av = new JSAV(av_name, {animationMode: "none"});
  // Setup the init location of trees
  var btTop = -5;
  var btLeft = 180;
  var btRight = 530;

  // Left Tree
  var bt = av.ds.binarytree({nodegap: 15, left: btLeft, top: btTop + 70});
  bt.root("37");
  var rt = bt.root();
  rt.left("24");
  rt.left().left("7");
  rt.left().left().left("2");
  rt.left().right("32");
  rt.right("42");
  rt.right().left("42");
  rt.right().left().left("40");
  rt.right().right("120");
  bt.layout();

  // Right Tree
  var bt2 = av.ds.binarytree({nodegap: 10, left: btRight, top: btTop});
  bt2.root("120");
  var rt2 = bt2.root();
  rt2.left("42");
  rt2.left().left("42");
  rt2.left().left().left("7");
  rt2.left().left().left().left("2");
  rt2.left().left().left().right("32");
  rt2.left().left().left().right().left("24");
  rt2.left().left().left().right().right("37");
  rt2.left().left().left().right().right().right("40");
  bt2.layout();

  //Add two labels
  av.label("(a)", {left: btLeft + 120, top: btTop + 300});
  av.label("(b)", {left: btRight + 60, top: btTop + 300});

  av.displayInit();
  av.recorded();
});
