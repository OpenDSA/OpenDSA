/*global ODSA */
"use strict";
// Sequential Tree visualization for bit vectors
$(document).ready(function () {
  var av_name = "SequentialTreeBitVectorCON";
  var av = new JSAV(av_name);
  var temp1;
  var arr = av.ds.array(['1','1','0','0','1','1','0','0','1','0','0']);
  arr.highlight(0);
  var bt = av.ds.binarytree({visible: true, nodegap: 35});
  bt.root('1');
  var a = bt.root();
  a.left('1');
  var b = a.left();
  var d = a.left().right('0');
  var c = a.right('1');
  var e = a.right().left('1');
  var g = a.right().left().left('0');
  var f = a.right().right('1');
  var h = a.right().right().left('0');
  var i = a.right().right().right('0');

  b.hide();
  d.hide();
  c.hide({recursive:false});
  e.hide({recursive:false});
  g.hide({recursive:false});
  f.hide({recursive:false});
  h.hide({recursive:false});
  i.hide({recursive:false});

  //Slide 1
  av.umsg("The first character 1 means it is an internal node, and it is the root node");
  bt.layout();
  var ptr = av.pointer("rt", bt.root(), {anchor: "center top", top: -10});
  av.displayInit();

  //Slide 2
  av.umsg("1 is an internal node, and the root's left child");
  arr.highlight(1);
  arr.unhighlight(0);
  av.step();

  //Slide 3
  av.umsg("We insert the internal node as the left child of the root");
  b.show({recursive:false});
  bt.layout();
  ptr.target(b);
  av.step();

  //Slide 4
  av.umsg("The '0' implies the left child is a leaf, and therefore has no children");
  b.left('/').show();
  bt.layout();
  arr.highlight(2);
  arr.unhighlight(1);
  av.step();

  //Slide 5
  av.umsg("The next token '0' means the right child is a leaf as well");
  d.show();
  bt.layout();
  arr.highlight(3);
  arr.unhighlight(2);
  //point to D
  av.step();

  //Slide 6
  av.umsg("Since we have already processed the children, we pop up to the root.");
  //point to A
  ptr.target(a);
  av.step();

  //Slide 7
  av.umsg("The next character in the string represents the root's right child ");
  c.show({recursive:false});
  bt.layout();
  arr.highlight(4);
  arr.unhighlight(3);
  ptr.target(c);
  //point to C
  av.step();

  //Slide 8
  av.umsg("Continue adding children to the internal nodes");
  e.show({recursive:false});
  bt.layout();
  arr.highlight(5);
  arr.unhighlight(4);
  ptr.target(e);
  //point to E
  av.step(); 

  //Slide 9
  av.umsg("Add the leaf node as the next child");
  g.show({recursive:false});
  bt.layout();
  arr.highlight(6);
  arr.unhighlight(5);
  av.step();

  //Slide 10
  av.umsg("Add the next leaf node as the right child");
  e.right('0').show();
  arr.highlight(7);
  arr.unhighlight(6);
  bt.layout();
  av.step();

  //Slide 11
  av.umsg("We pop back up to the node's parent ");
  ptr.target(c);
  //point to C
  av.step();  

  //Slide 12
  av.umsg("Add the next internal node as the right child");
  f.show({recursive:false});
  bt.layout();
  arr.highlight(8);
  arr.unhighlight(7);
  ptr.target(f);
  //point to F
  av.step();

  //Slide 13
  av.umsg("Add a leaf node as the left child");
  h.show({recursive:false});
  bt.layout();
  arr.highlight(9);
  arr.unhighlight(8);
  //point to H
  av.step();


  //Slide 14
  av.umsg("The next character will be the right child");
  i.show({recursive:false});
  bt.layout();
  ptr.target(i);
  arr.highlight(10);
  arr.unhighlight(9);
  //point to I
  av.step();

  //Slide 15
  av.umsg("The last character represents a leaf node, and thus we have processed the entire string")
  av.recorded();

});
