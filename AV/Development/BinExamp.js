/*global ODSA */
"use strict";
$(document).ready(function () {
  var av = new JSAV("BinExamp", {"animationMode": "none"});
  // Setup the tree
  var btTop = 10;
  var btLeft = 105;
  var bt = av.ds.binarytree({nodegap: 10, top: btTop, left: btLeft});
  bt.root('A');
  var rt = bt.root();
  rt.left('B');
  rt.left().right('D');
  
  rt.right('C');
  rt.right().left('E');
  rt.right().left().left('G');
  rt.right().right('F');
  rt.right().right().left('H');
  rt.right().right().right('I');

  bt.layout();
});
