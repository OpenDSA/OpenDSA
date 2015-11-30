/**
 * Creates a diagram that illustrates what a 2-3 tree looks likes.
 *
 * Container ID: twoThreeTreeCON
 */
(function () {
  "use strict";

  var jsav = new JSAV("twoThreedgmCON");

  // Create all the arrays that represent the nodes in the 2-3 tree.
  var arrays = window.twothreetree.getArrayNodes(jsav);
  // Position the array nodes.
  var width = 560;
  window.twothreetree.positionRow(arrays.slice(0, 1), 0, width, 70);
  window.twothreetree.positionRow(arrays.slice(1, 4), 80, width, 450);
  window.twothreetree.positionRow(arrays.slice(4), 160, width, 560);

  // Create lines that connect all the nodes.
  var properties = {"stroke-width": 1.5};
  var length = 2;
  window.twothreetree.getArrayNodesEdges(jsav, arrays, length, properties);
}());
