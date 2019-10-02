// Written by Dana Gurland, Fall 2019
$(document).ready(function() {
  "use strict";
  var av_name = "HeapBldChoiceCON";
  var av = new JSAV(av_name);
  var bt1Top = 5;
  var bt1Left = 150;
  var bt2Left = 500;
  var bt3Top = 170;

  // Slide 1
  av.umsg("Two series of exchanges to build a max heap:");
  av.displayInit();

  // Slide 2
  av.umsg("(a) This heap is built by a series of nine exchanges in the order (4-2), (4-1), (2-1), (5-2), (5-4), (6-3), (6-5), (7-5), (7-6). ");
  var bt1 = av.ds.binarytree({nodegap: 15, left: bt1Left, top: bt1Top});
  bt1.root("1");
  var rt1 = bt1.root();
  rt1.left("2");
  rt1.left().left("4");
  rt1.left().right("5");
  rt1.right("3");
  rt1.right().left("6");
  rt1.right().right("7");
  bt1.layout();
  av.g.line(375, 70, 450, 70, {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  av.label("(a)", {left: 405, top: 70});
  var bt2 = av.ds.binarytree({nodegap: 15, left: bt2Left, top: bt1Top});
  bt2.root("7");
  var rt2 = bt2.root();
  rt2.left("4");
  rt2.left().left("1");
  rt2.left().right("2");
  rt2.right("6");
  rt2.right().left("3");
  rt2.right().right("5");
  bt2.layout();
  av.step();

  // Slide 3
  av.umsg("(b) This heap is built by a series of four exchanges in the order (5-2), (7-3), (7-1), (6-1).");
  var bt3 = av.ds.binarytree({nodegap: 15, left: bt1Left, top: bt3Top});
  bt3.root("1");
  var rt3 = bt3.root();
  rt3.left("2");
  rt3.left().left("4");
  rt3.left().right("5");
  rt3.right("3");
  rt3.right().left("6");
  rt3.right().right("7");
  bt3.layout();
  var bt4 = av.ds.binarytree({nodegap: 15, left: bt2Left, top: bt3Top});
  av.g.line(375, 250, 450, 250, {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  av.label("(b)", {left: 405, top: 250});
  bt4.root("7");
  var rt4 = bt4.root();
  rt4.left("5");
  rt4.left().left("4");
  rt4.left().right("2");
  rt4.right("6");
  rt4.right().left("1");
  rt4.right().right("3");
  bt4.layout();
  av.recorded();
});
