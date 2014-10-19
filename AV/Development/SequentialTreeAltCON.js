/*global ODSA */
"use strict";
// Sequential Tree alternative serialization visualization slideshow
$(document).ready(function () {
  var av_name = "SequentialTreeAltCON";
  var av = new JSAV(av_name);
  var temp1;
  var arr = av.ds.array(['A\'','B\'','/','D','C\'','E\'','G','/','F\'','H','I']);
  arr.highlight(0);
  var bt = av.ds.binarytree({visible: true, nodegap: 35});
  bt.root('A');
  var a = bt.root();
  a.left('B');
  var b = a.left();
  var d = a.left().right('D');
  var c = a.right('C');
  var e = a.right().left('E');
  var g = a.right().left().left('G');
  var f = a.right().right('F');
  var h = a.right().right().left('H');
  var i = a.right().right().right('I');

  b.hide();
  d.hide();
  c.hide({recursive:false});
  e.hide({recursive:false});
  g.hide({recursive:false});
  f.hide({recursive:false});
  h.hide({recursive:false});
  i.hide({recursive:false});
  av.umsg("The first character A' means A is an internal node, and is the root node");
    bt.layout();

  var ptr = av.pointer("rt", bt.root(), {anchor: "center top", top: -10});

  av.displayInit();



  //Slide 1

  //Slide 2
  av.umsg("B' is an internal node, and A's left child");
  arr.highlight(1);
  av.step();

  //Slide 3
  av.umsg("We insert B as the left child of A");
  b.show({recursive:false});
  bt.layout();
  ptr.target(b);
  av.step();

  //Slide 4
  av.umsg("The '/' implies the left child is null (B does not have a left child)");
  b.left('/').show();
  bt.layout();
  arr.highlight(2);
  av.step();

  //Slide 5
  av.umsg("The next token 'D' is the right child of 'B' ");
  d.show();
  bt.layout();
  ptr.target(d);
  arr.highlight(3);
  //point to D
  av.step();

  //Slide 6
  av.umsg("Since D was a leaf node, we know to pop back up to the parent of D");
  //point to B
  ptr.target(b);
  av.step();

  //Slide 8
  av.umsg("Since we have already processed both of B's children, we continue popping up to the root.");
  //point to A
  ptr.target(a);
  av.step();

  //Slide 9
  av.umsg("The next character in the string represents A's right child C' ");
  c.show({recursive:false});
  bt.layout();
  arr.highlight(4);
  ptr.target(c);
  //point to C
  av.step();

  //Slide 10
  av.umsg("'E' must be C's left child");
  e.show({recursive:false});
  bt.layout();
  arr.highlight(5);
  ptr.target(e);
  //point to E
  av.step(); 

  //Slide 11
  av.umsg("The next character 'G' represents E's left child");
  g.show({recursive:false});
  bt.layout();
  arr.highlight(6);
  ptr.target(g);
  //point to G
  av.step();

  //Slide 11
  av.umsg("G is a leaf node so we pop back to E");
  ptr.target(e);
  //point to E
  av.step(); 

  //Slide 12
  av.umsg("The next character in the serialized string ('/') represents E's right child (null)");
  e.right('/').show();
  arr.highlight(7);
  bt.layout();
  av.step();

  //Slide 13
  av.umsg("We pop back up to E's parent ('C') ");
  ptr.target(c);
  //point to C
  av.step();  

  //Slide 14
  av.umsg("F represents C's right child");
  f.show({recursive:false});
  bt.layout();
  arr.highlight(8);
  ptr.target(f);
  //point to F
  av.step();

  //Slide 15
  av.umsg("H represents F's left child");
  h.show({recursive:false});
  bt.layout();
  arr.highlight(9);
  ptr.target(h);
  //point to H
  av.step();

  //Slide 19
  av.umsg("H is a leaf node, so pop back up to F");
  ptr.target(f);
  av.step();

  //Slide 20
  av.umsg("I must be the right child of F");
  i.show({recursive:false});
  bt.layout();
  ptr.target(i);
  arr.highlight(10);
  //point to I
  av.step();

  av.umsg("I is a leaf node, and we have processed the entire string")
  av.recorded();

});
