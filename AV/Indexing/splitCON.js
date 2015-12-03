/**
 * Creates a slide show that demonstrates how a node can be split in a 2-3 tree.
 *
 * Container ID: splitCON
 */
(function () {
  "use strict";
  var jsav = new JSAV("splitCON");

  // Create all the arrays that represent the nodes in the 2-3 tree.
  var arrays = window.twothreetree.getArrayNodes(jsav);
  // Position the array nodes.
  var width = 800;
  window.twothreetree.positionRow(arrays.slice(0, 1), 80, width, 70);
  window.twothreetree.positionRow(arrays.slice(1, 4), 160, width, 480);
  window.twothreetree.positionRow(arrays.slice(4), 240, width, 560);

  // Create lines that connect all the nodes.
  var properties = {"stroke-width": 1.5};
  var length = 2;
  var lines = window.twothreetree.getArrayNodesEdges(jsav, arrays, length, properties);

  var messages = [
    "Example of inserting a record that causes the 2-3 tree root to split. We want to insert the key 19 into the tree.",
    "The key is first compared against the root node. Since 19 is more than the left key and less than the right key of the root node, the center child node is followed next.",
    "This node has only two elements, and 19 is less than 23 so the left child is followed next.",
    "A leaf node has being reached. Since the leaf node has no empty spaces it will have to be split.",
    "Next we have to rearrange the keys. First the largest key (21) goes in the new node.",
    "The middle key (20) has to be promoted.",
    "The smallest key (19) goes is the old node",
    "The parent node is full, so the promoted element cannot be inserted. Therefore the parent node has to be split.",
    "Again, the largest key (30) goes in the new node, the smallest key (20) goes is the old node, and the middle key (23) is promoted",
    "The pointers can now be updated",
    "The parent node is full so the promoted element cannot be inserted. Therefore the parent node has to be split. Because the parent node is the root node, a new root has to be created as well.",
    "Again, the largest key (31) goes in the new node, the smallest key (18) stays in the old node, and the middle key (23) is promoted.",
    "The pointers can now be updated.",
    "The insertion is complete."
  ];

  /* 1st Slide *************************************************************/
  jsav.umsg(messages.shift());
  jsav.label("Insert:", {left: "55px", top: "5px"});
  jsav.label("Promote:", {left: "35px", top: "55px"});
  var insert = jsav.ds.array([19], {left: "100px", top: "0px"});
  var promote = jsav.ds.array([""], {left: "100px", top: "50px"});
  jsav.displayInit();

  /* 2nd Slide *************************************************************/
  jsav.umsg(messages.shift());
  window.twothreetree.toggleArrayHiglight(arrays[0]);
  window.twothreetree.toggleEdgeHiglight(lines[1]);
  jsav.step();

  /* 3rd Slide *************************************************************/
  jsav.umsg(messages.shift());
  window.twothreetree.toggleArrayHiglight(arrays[2]);
  window.twothreetree.toggleArrayHiglight(arrays[0]);
  window.twothreetree.toggleEdgeHiglight(lines[1]);
  arrays[2].highlight(0);
  window.twothreetree.toggleEdgeHiglight(lines[5]);
  jsav.step();

  /* 4th Slide *************************************************************/
  jsav.umsg(messages.shift());
  window.twothreetree.toggleArrayHiglight(arrays[6]);
  window.twothreetree.toggleArrayHiglight(arrays[2]);
  window.twothreetree.toggleEdgeHiglight(lines[5]);
  arrays[2].unhighlight(0);
  jsav.step();

  /* 5th Slide *************************************************************/
  jsav.umsg(messages.shift());
  arrays.splice(7, 0, jsav.ds.array(["", ""], {visible: false}));
  window.twothreetree.positionRow(arrays.slice(4), 240, width, 640);
  arrays[7].show();
  for (var i = 3; i < lines.length; i += 1) {
    lines[i].hide();
  }
  lines.splice(3, 1, window.twothreetree.drawEdge(jsav, properties, arrays[1], arrays[4], 0, length));
  lines.splice(4, 1, window.twothreetree.drawEdge(jsav, properties, arrays[1], arrays[5], 1, length));
  lines.splice(5, 1, window.twothreetree.drawEdge(jsav, properties, arrays[2], arrays[6], 0, length));
  lines.splice(6, 1, window.twothreetree.drawEdge(jsav, properties, arrays[2], arrays[8], 1, length));
  lines.splice(7, 1, window.twothreetree.drawEdge(jsav, properties, arrays[2], arrays[9], 2, length));
  lines.splice(8, 1, window.twothreetree.drawEdge(jsav, properties, arrays[3], arrays[10], 0, length));
  lines.splice(9, 1, window.twothreetree.drawEdge(jsav, properties, arrays[3], arrays[11], 1, length));
  window.twothreetree.toggleArrayHiglight(arrays[7]);
  jsav.step();

  /* 6th Slide *************************************************************/
  jsav.umsg(messages.shift());
  jsav.effects.moveValue(arrays[6], 1, arrays[7], 0);
  jsav.step();

  /* 7th Slide *************************************************************/
  jsav.umsg(messages.shift());
  jsav.effects.moveValue(arrays[6], 0, promote, 0);
  jsav.step();

  /* 8th Slide *************************************************************/
  jsav.umsg(messages.shift());
  jsav.effects.moveValue(insert, 0, arrays[6], 0);
  jsav.step();

  /* 9th Slide *************************************************************/
  jsav.umsg(messages.shift());
  window.twothreetree.toggleArrayHiglight(arrays[6]);
  window.twothreetree.toggleArrayHiglight(arrays[7]);
  arrays.splice(3, 0, jsav.ds.array(["", ""], {visible: false}));
  window.twothreetree.positionRow(arrays.slice(1, 5), 160, width, 550);
  arrays[3].show();
  window.twothreetree.toggleArrayHiglight(arrays[2]);
  window.twothreetree.toggleArrayHiglight(arrays[3]);
  for (i = 0; i < lines.length; i += 1) {
    lines[i].hide();
  }
  lines.splice(0, 1, window.twothreetree.drawEdge(jsav, properties, arrays[0], arrays[1], 0, length));
  lines.splice(1, 1, window.twothreetree.drawEdge(jsav, properties, arrays[0], arrays[2], 1, length));
  lines.splice(2, 1, window.twothreetree.drawEdge(jsav, properties, arrays[0], arrays[4], 2, length));
  lines.splice(3, 1, window.twothreetree.drawEdge(jsav, properties, arrays[1], arrays[5], 0, length));
  lines.splice(4, 1, window.twothreetree.drawEdge(jsav, properties, arrays[1], arrays[6], 1, length));
  lines.splice(5, 1, window.twothreetree.drawEdge(jsav, properties, arrays[2], arrays[7], 0, length));
  lines.splice(6, 1, window.twothreetree.drawEdge(jsav, properties, arrays[2], arrays[9], 1, length));
  lines.splice(7, 1, window.twothreetree.drawEdge(jsav, properties, arrays[2], arrays[10], 2, length));
  lines.splice(8, 1, window.twothreetree.drawEdge(jsav, properties, arrays[4], arrays[11], 0, length));
  lines.splice(9, 1, window.twothreetree.drawEdge(jsav, properties, arrays[4], arrays[12], 1, length));
  jsav.step();

  /* 10th Slide *************************************************************/
  jsav.umsg(messages.shift());
  jsav.effects.moveValue(arrays[2], 1, arrays[3], 0);
  jsav.effects.moveValue(promote, 0, arrays[2], 0);
  promote.value(0, 23);
  jsav.step();

  /* 11th Slide *************************************************************/
  jsav.umsg(messages.shift());
  for (i = 3; i < lines.length; i += 1) {
    lines[i].hide();
  }
  lines.splice(3, 1, window.twothreetree.drawEdge(jsav, properties, arrays[1], arrays[5], 0, length));
  lines.splice(4, 1, window.twothreetree.drawEdge(jsav, properties, arrays[1], arrays[6], 1, length));
  lines.splice(5, 1, window.twothreetree.drawEdge(jsav, properties, arrays[2], arrays[7], 0, length));
  lines.splice(6, 1, window.twothreetree.drawEdge(jsav, properties, arrays[2], arrays[8], 1, length));
  lines.splice(7, 1, window.twothreetree.drawEdge(jsav, properties, arrays[3], arrays[9], 0, length));
  lines.splice(8, 1, window.twothreetree.drawEdge(jsav, properties, arrays[3], arrays[10], 1, length));
  lines.splice(9, 1, window.twothreetree.drawEdge(jsav, properties, arrays[4], arrays[11], 0, length));
  lines.push(window.twothreetree.drawEdge(jsav, properties, arrays[4], arrays[12], 1, length));
  jsav.step();

  /* 12th Slide *************************************************************/
  jsav.umsg(messages.shift());
  window.twothreetree.toggleArrayHiglight(arrays[2]);
  window.twothreetree.toggleArrayHiglight(arrays[3]);
  arrays.splice(0, 0, jsav.ds.array(["", ""], {visible: false}));
  arrays.splice(2, 0, jsav.ds.array(["", ""], {visible: false}));
  window.twothreetree.positionRow(arrays.slice(0, 1), 0, width, 80);
  window.twothreetree.positionRow(arrays.slice(1, 3), 80, width, 400);
  arrays[0].show();
  arrays[2].show();
  window.twothreetree.toggleArrayHiglight(arrays[0]);
  window.twothreetree.toggleArrayHiglight(arrays[1]);
  window.twothreetree.toggleArrayHiglight(arrays[2]);
  for (i = 0; i < 3; i += 1) {
    lines[i].hide();
  }
  lines.splice(0, 1, window.twothreetree.drawEdge(jsav, properties, arrays[1], arrays[3], 0, length));
  lines.splice(1, 1, window.twothreetree.drawEdge(jsav, properties, arrays[1], arrays[4], 1, length));
  lines.splice(2, 1, window.twothreetree.drawEdge(jsav, properties, arrays[1], arrays[6], 2, length));
  jsav.step();

  /* 13th Slide *************************************************************/
  jsav.umsg(messages.shift());
//  jsav.effects.moveValue(promote, 0, arrays[2], 0);
  jsav.effects.moveValue(promote, 0, arrays[0], 0);
//  jsav.effects.moveValue(arrays[1], 1, arrays[1], 0);
  jsav.effects.moveValue(arrays[1], 1, arrays[2], 0);
//  arrays[0].value(0, 18);
  jsav.step();

  /* 14th Slide *************************************************************/
  jsav.umsg(messages.shift());
  for (i = 0; i < lines.length; i += 1) {
    lines[i].hide();
  }
  lines = [];
  lines.push(window.twothreetree.drawEdge(jsav, properties, arrays[0], arrays[1], 0, length));
  lines.push(window.twothreetree.drawEdge(jsav, properties, arrays[0], arrays[2], 1, length));
  lines.push(window.twothreetree.drawEdge(jsav, properties, arrays[1], arrays[3], 0, length));
  lines.push(window.twothreetree.drawEdge(jsav, properties, arrays[1], arrays[4], 1, length));
  lines.push(window.twothreetree.drawEdge(jsav, properties, arrays[2], arrays[5], 0, length));
  lines.push(window.twothreetree.drawEdge(jsav, properties, arrays[2], arrays[6], 1, length));
  lines.push(window.twothreetree.drawEdge(jsav, properties, arrays[3], arrays[7], 0, length));
  lines.push(window.twothreetree.drawEdge(jsav, properties, arrays[3], arrays[8], 1, length));
  lines.push(window.twothreetree.drawEdge(jsav, properties, arrays[4], arrays[9], 0, length));
  lines.push(window.twothreetree.drawEdge(jsav, properties, arrays[4], arrays[10], 1, length));
  lines.push(window.twothreetree.drawEdge(jsav, properties, arrays[5], arrays[11], 0, length));
  lines.push(window.twothreetree.drawEdge(jsav, properties, arrays[5], arrays[12], 1, length));
  lines.push(window.twothreetree.drawEdge(jsav, properties, arrays[6], arrays[13], 0, length));
  lines.push(window.twothreetree.drawEdge(jsav, properties, arrays[6], arrays[14], 1, length));
  window.twothreetree.toggleArrayHiglight(arrays[0]);
  window.twothreetree.toggleArrayHiglight(arrays[1]);
  window.twothreetree.toggleArrayHiglight(arrays[2]);
  jsav.step();

  // Mark the slide show as finished.
  jsav.recorded();

}());
