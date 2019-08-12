// Written by Yujie Chen, Summer 2019

/**
 * Creates a diagram that illustrates what a B-tree looks likes.
 *
 * Container ID: BTreeCON
 */
(function () {
  "use strict";

  var jsav = new JSAV("BTreedgmCON");

  // Create all the arrays that represent the nodes in the B-tree.
  var arrays = window.BTree.getArrayNodes(jsav);
  // Position the array nodes.
  var width = 840;
  window.BTree.positionRow(arrays.slice(0, 1), 0, width, 70);
  window.BTree.positionRow(arrays.slice(1, 3), 80, width, 450);
  window.BTree.positionRow(arrays.slice(3), 160, width, 700);

  // Create lines that connect all the nodes.
  var properties = {"stroke-width": 1.5};
  var length = 2;
  window.BTree.getArrayNodesEdges(jsav, arrays, length, properties);
}());
