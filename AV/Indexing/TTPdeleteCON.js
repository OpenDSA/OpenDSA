/*global ODSA */
// Written by Cliff Shaffer
// Search in a 2-3+ Tree

// Title: Deletion from a 2-3+ Tree
// Author: Cliff Shaffer; Liling Yuan
// Institution: Virginia Tech
// Features: Algorithm Visualization
// Keyword: Tree-based Index; Indexing; 2-3+ Tree
// Natural Language: en
// Programming Language: N/A
/* Description: Slideshow showing a series of delete operations in a 2-3+ tree. */

$(document).ready(function() {
  "use strict";
  var av_name = "TTPdeleteCON";
  var av = new JSAV(av_name);

  av.umsg("Example 2-3+ Tree Visualization: Delete");

  var t = BPTree.newTree(av, 2, false);
  t.addWithoutGraphic(89, "M");
  t.addWithoutGraphic(71, "W");
  t.addWithoutGraphic(70, "F");
  t.addWithoutGraphic(65, "S");
  t.addWithoutGraphic(52, "T");
  t.addWithoutGraphic(51, "B");
  t.addWithoutGraphic(47, "L");
  t.addWithoutGraphic(46, "H");
  t.addWithoutGraphic(33, "O");
  t.addWithoutGraphic(22, "X");
  t.addWithoutGraphic(15, "J");
  t.printTree();
  av.displayInit();
  t.detail = true;
  t.delete(51);
  t.delete(70);
  t.delete(65);
  t.delete(71);
  t.delete(89);
  av.recorded();
});
