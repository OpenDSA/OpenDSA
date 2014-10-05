/*global ODSA */
"use strict";
// Sequential Tree serialization visualization slideshow
$(document).ready(function () {
  var av_name = "SequentialTreeCON";
  var av = new JSAV(av_name);
  var temp1;

  var bt = av.ds.binarytree({visible: true, nodegap: 35});
  bt.root('A');
  var a = bt.root();
  bt.layout();

  var ptr = av.pointer("a", bt.root(), {anchor: "left top", top: -10});
  ptr.target(bt.root());
  av.umsg("We begin with the first node in the string 'A' which will be the root node");
  av.displayInit();

  av.umsg("The next character in the serialized string represents A's left child");

  av.step();

  av.umsg("We insert B as the left child of A");
  a.left('B'); //<--- HERE IS THE LINE IN QUESTION
  av.step();
  
  av.umsg("The next character in the serialized string says B has no left child ('/') ");
  av.step();

  av.umsg("The next token 'D' is the right child of 'B' ");
  av.step();

  av.umsg("The two slashes imply D has no children and is a leaf node");
  av.step();

  av.umsg("We pop back up to the parent of D");
  av.step();

  av.umsg("Since we have already processed both of B's children, we continue popping up to the root.");
  av.step();

  av.umsg("The next character in the string represents A's right child 'C' ");
  av.step();

  av.umsg("'E' must be C's left child");
  av.step(); 

  av.umsg("The next character 'G' represents E's left child");
  av.step();

  av.umsg("Double slashes implies G has no children");
  av.step();

  av.umsg("Pop back up to G's parent ('E') ");
  av.step(); 

  av.umsg("The next character in the serialized string represents E's right child");
  av.step();

  av.umsg("It is a slash, so no right child for E");
  av.step();  

  av.umsg("We pop back up to E's parent ('C') ");
  av.step();  

  av.umsg("F represents C's right child");
  av.step();

  av.umsg("H represents F's left child");
  av.step();

  av.umsg("Double slash implies H is a leaf node with no children. Pop back up to F");
  av.step();

  av.umsg("I must be the right child of F");
  av.step();

  av.umsg("Double slashes implies I is a leaf node with no children");
  av.step();
  av.recorded();

});
