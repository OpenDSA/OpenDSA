/*global ODSA */
// Written by Cliff Shaffer
// Building a 2-3+ Tree

// Title: Building a 2-3+ Tree Slideshow
// Author: Cliff Shaffer; Liling Yuan
// Institution: Virginia Tech
// Features: Algorithm Visualization
// Keyword: Tree-Based Indexing; 2-3 Tree
// Natural Language: en
// Programming Language: N/A
/* Description: Slideshow showing a series of insertions into a 2-3+ tree. */

$(document).ready(function() {
  "use strict";
  var av_name = "TTPbuildCON";
  var av = new JSAV(av_name);

  av.umsg("Example 2-3+ Tree Visualization: Insert");

  var t = BPTree.newTree(av, 2, true);
  av.displayInit();
  t.add(52, "B");
  t.add(46, "X");
  t.add(33, "D");
  t.add(22, "J");
  t.add(71, "M");
  t.add(65, "S");
  av.recorded();
});
