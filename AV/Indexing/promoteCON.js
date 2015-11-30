/**
 * Creates a slide show that demonstrates how a key can be promoted in a 2-3 tree.
 *
 * Container ID: promoteCON
 */
(function () {
  "use strict";
  var jsav = new JSAV("promoteCON");

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
    "A simple node-splitting insert for a 2-3 tree. We want to insert the key 55 into the tree. ",
    "The key is first compared against the root node. Since 55 is more than the right key of the root node, the right child node if followed.",
    "This node has only one element, and 55 is greater than 48 so the center child is followed next.",
    "A leaf node has being reached. Since the leaf node has no empty spaces it will have to be split.",
    "Next we have to rearrange the keys. First the largest key 55 goes to the new node.",
    "The smallest key 50 goes to the old node. In this case it stays in the same place.",
    "The middle key 52 gets promoted. Because the parent node has space available, the key can just be inserted in the parent node.",
    "The pointers can be updated now.",
    "The insertion is complete"
  ];

  /* 1st Slide *************************************************************/
  jsav.umsg(messages.shift());
  jsav.label("Insert:", {left: "55px", top: "5px"});
  var insert = jsav.ds.array([55], {left: "100px", top: "0px"});
  jsav.displayInit();

  /* 2nd Slide *************************************************************/
  jsav.umsg(messages.shift());
  window.twothreetree.toggleArrayHiglight(arrays[0]);
  arrays[0].highlight(1);
  window.twothreetree.toggleEdgeHiglight(lines[2]);
  jsav.step();

  /* 3rd Slide *************************************************************/
  jsav.umsg(messages.shift());
  window.twothreetree.toggleArrayHiglight(arrays[3]);
  window.twothreetree.toggleArrayHiglight(arrays[0]);
  window.twothreetree.toggleEdgeHiglight(lines[2]);
  arrays[0].unhighlight(1);
  arrays[3].highlight(0);
  window.twothreetree.toggleEdgeHiglight(lines[9]);
  jsav.step();

  /* 4th Slide *************************************************************/
  jsav.umsg(messages.shift());
  window.twothreetree.toggleArrayHiglight(arrays[10]);
  window.twothreetree.toggleArrayHiglight(arrays[3]);
  window.twothreetree.toggleEdgeHiglight(lines[9]);
  arrays[3].unhighlight(0);
  jsav.step();

  /* 5th Slide *************************************************************/
  jsav.umsg(messages.shift());
  arrays.push(jsav.ds.array(["", ""], {visible: false}));
  window.twothreetree.positionRow(arrays.slice(4), 160, width + 80, 639);
  arrays[11].show();
  window.twothreetree.toggleArrayHiglight(arrays[11]);
  jsav.step();

  /* 6th Slide *************************************************************/
  jsav.umsg(messages.shift());
  jsav.effects.moveValue(insert, 0, arrays[11], 0);
  jsav.step();

  /* 7th Slide *************************************************************/
  jsav.umsg(messages.shift());
  jsav.step();

  /* 8th Slide *************************************************************/
  jsav.umsg(messages.shift());
  window.twothreetree.toggleArrayHiglight(arrays[3]);
  window.twothreetree.toggleArrayHiglight(arrays[11]);
  window.twothreetree.toggleArrayHiglight(arrays[10]);
  jsav.effects.moveValue(arrays[10], 1, arrays[3], 1);
  arrays[3].highlight(1);
  jsav.step();

  /* 9th Slide *************************************************************/
  jsav.umsg(messages.shift());
  window.twothreetree.drawEdge(jsav, properties, arrays[3], arrays[11], 2, length);
  arrays[3].unhighlight(1);
  window.twothreetree.toggleArrayHiglight(arrays[3]);
  jsav.step();

  // Mark the slide show as finished.
  jsav.recorded();

}());
