/**
 * Creates a slide show that demonstrates a simple insertion to a 2-3 tree.
 *
 * Container ID: simpleInsertCON
 */
(function () {
  "use strict";
  var jsav = new JSAV("simpleInsertCON");

  // Create all the arrays that represent the nodes in the 2-3 tree.
  var arrays = window.twothreetree.getArrayNodes(jsav);
  // Position the array nodes.
  var width = 700;
  window.twothreetree.positionRow(arrays.slice(0, 1), 0, width, 70);
  window.twothreetree.positionRow(arrays.slice(1, 4), 80, width, 450);
  window.twothreetree.positionRow(arrays.slice(4), 160, width, 560);

  // Create lines that connect all the nodes.
  var properties = {"stroke-width": 1.5};
  var length = 2;
  var lines = window.twothreetree.getArrayNodesEdges(jsav, arrays, length, properties);

  var messages = [
    "Simple insert into the 2-3 tree. We want to insert the key 14 into the tree.",
    "The value is first compared against the root node. Since 14 is less than the left value of the root node, the left child node is followed next.",
    "This node has only one element, and 14 is greater than 12 so the center child is followed next.",
    "A leaf node has being reached. Since the leaf node has an empty space the new node can be inserted here. The key 15 has to be shifted to the right to make room for the new key (14).",
    "Now the key 14 can be inserted into the tree.",
    "The insertion is complete."
  ];

  /* 1st Slide *************************************************************/
  jsav.umsg(messages.shift());
  jsav.label("Insert:", {left: "55px", top: "5px"});
  var insert = jsav.ds.array([14], {left: "100px", top: "0px"});
  jsav.displayInit();

  /* 2nd Slide *************************************************************/
  jsav.umsg(messages.shift());
  window.twothreetree.toggleArrayHiglight(arrays[0]);
  arrays[0].highlight(0);
  window.twothreetree.toggleEdgeHiglight(lines[0]);
  jsav.step();

  /* 3rd Slide *************************************************************/
  jsav.umsg(messages.shift());
  window.twothreetree.toggleArrayHiglight(arrays[1]);
  window.twothreetree.toggleArrayHiglight(arrays[0]);
  window.twothreetree.toggleEdgeHiglight(lines[0]);
  arrays[0].unhighlight(0);
  arrays[1].highlight(0);
  window.twothreetree.toggleEdgeHiglight(lines[4]);
  jsav.step();

  /* 4th Slide *************************************************************/
  jsav.umsg(messages.shift());
  window.twothreetree.toggleArrayHiglight(arrays[5]);
  window.twothreetree.toggleArrayHiglight(arrays[1]);
  window.twothreetree.toggleEdgeHiglight(lines[4]);
  arrays[1].unhighlight(0);
  jsav.step();

  /* 5th Slide *************************************************************/
  jsav.umsg(messages.shift());
  arrays[5].swap(0, 1, {arrow: false});
  jsav.step();

  /* 5th Slide *************************************************************/
  jsav.umsg(messages.shift());
  window.twothreetree.toggleArrayHiglight(arrays[5]);
  jsav.effects.moveValue(insert, 0, arrays[5], 0);
  jsav.step();

  jsav.recorded();

}());
