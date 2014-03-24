(function ($) {
  "use strict";

  /**
   * This function positions a row of arrays.
   * @param array_nodes The array of nodes to be positioned.
   * @param top The top value for all noes.
   * @param container_width The width of the container that the array nodes are in.
   * @param row_width The desired width that all the nodes will take up.
   * @param left_offset Optional left offset for all nodes.
   */
  function positionRow(array_nodes, top, container_width, row_width, left_offset) {
    var total_width, node_width, offset, left, i;
    node_width = extractNumber(array_nodes[0].css("width"));
    total_width = node_width * array_nodes.length;
    offset = (row_width - total_width) / (array_nodes.length - 1);

    if (typeof(left_offset) === "undefined") {
      left_offset = 0;
    }
    left = (container_width - row_width) / 2 + left_offset;

    for (i = 0; i < array_nodes.length; i += 1) {
      array_nodes[i].css({"left": left + "px", "top": top + "px", "position": "absolute"});
      left +=  node_width + offset;
    }
  }

  /**
   * Draws a lines from one array node to another.
   * @param jsav The JSAV object where the line will be drawn.
   * @param properties The properties of the line.
   * @param arrayFrom The array node where the line is coming from.
   * @param arrayTo The array node where the line is going to.
   * @param edgeIndex The index of the arrayFrom where the line starts.
   * @param length The length of each array node (list size).
   * @returns {*} A JSAV line object.
   */
  function drawEdge(jsav, properties, arrayFrom, arrayTo, edgeIndex, length) {
    var top, left, height, width, step, x1, y1, x2, y2;

    // Get coordinates for the x1 and y1 of the edge.
    height = extractNumber(arrayFrom.css("height"));
    width = extractNumber(arrayFrom.css("width"));
    top = extractNumber(arrayFrom.css("top"));
    left = extractNumber(arrayFrom.css("left"));
    step = width / length;

    x1 = left + (step * edgeIndex);
    y1 = top + height;
    if (edgeIndex === 0) {
      x1 += 2;
      y1 -= 2;
    } else if (edgeIndex === length) {
      x1 -= 2;
      y1 -= 2;
    }

    // Get coordinates for the x2 and y2 of the edge.
    height = extractNumber(arrayTo.css("height"));
    width = extractNumber(arrayTo.css("width"));
    top = extractNumber(arrayTo.css("top"));
    left = extractNumber(arrayTo.css("left"));

    x2 = left  + (width / 2);
    y2 = top + 1;

    // Create line and return object.
    return jsav.g.line(x1, y1, x2, y2, properties);
  }

  /**
   * Turns a string to a float number.
   * @param pixels The string to convert to string. This string has to end in "px".
   * @returns {Number} The float number equivalent of the pixel value.
   */
  function extractNumber(pixels) {
    return parseFloat(pixels.substring(0, pixels.length - 2));
  }

  var ODSA = {};
  ODSA.drawEdge = drawEdge;
  ODSA.positionRow = positionRow;
  Window.ODSA = ODSA;
}(jQuery));

// Create diagram for twoThreeTreeCON.
(function ($) {
  "use strict";

  var jsav = new JSAV("twoThreeTreeCON");

  var arr1, arr2, arr3, arr4, arr5, arr6, arr7, arr8, arr9, arr10, arr11;
  // Create all the arrays that represent the nodes in the 2-3 tree.
  var width = 560;
  arr1 = jsav.ds.array([18, 13]);
  Window.ODSA.positionRow([arr1], 0, width, 70);
  arr2 = jsav.ds.array([12, ""]);
  arr3 = jsav.ds.array([23, 30]);
  arr4 = jsav.ds.array([48, ""]);
  Window.ODSA.positionRow([arr2, arr3, arr4], 80, width, 450);
  arr5 = jsav.ds.array([10, ""]);
  arr6 = jsav.ds.array([15, ""]);
  arr7 = jsav.ds.array([20, 21]);
  arr8 = jsav.ds.array([24, ""]);
  arr9 = jsav.ds.array([31, ""]);
  arr10 = jsav.ds.array([45, 47]);
  arr11 = jsav.ds.array([50, 52]);
  Window.ODSA.positionRow([arr5, arr6, arr7, arr8, arr9, arr10, arr11], 160, width, 560);

  // Create lines that connect all the nodes.
  var properties = {"stroke-width": 1.5};
  var length = 2;
  console.log("Diagram");
  Window.ODSA.drawEdge(jsav, properties, arr1, arr2, 0, length);
  Window.ODSA.drawEdge(jsav, properties, arr1, arr3, 1, length);
  Window.ODSA.drawEdge(jsav, properties, arr1, arr4, 2, length);
  Window.ODSA.drawEdge(jsav, properties, arr2, arr5, 0, length);
  Window.ODSA.drawEdge(jsav, properties, arr2, arr6, 1, length);
  Window.ODSA.drawEdge(jsav, properties, arr3, arr7, 0, length);
  Window.ODSA.drawEdge(jsav, properties, arr3, arr8, 1, length);
  Window.ODSA.drawEdge(jsav, properties, arr3, arr9, 2, length);
  Window.ODSA.drawEdge(jsav, properties, arr4, arr10, 0, length);
  Window.ODSA.drawEdge(jsav, properties, arr4, arr11, 1, length);

  jsav.ds.array(["", ""], {visible: false, left: "0px", top: "0px"});
}(jQuery));

// Create slide show for simpleInsertCON
(function ($) {
  "use strict";
  var jsav = new JSAV("simpleInsertCON");

//  jsav.ds.array(["", ""], {visible: false, left: "0px", top: "0px"});

  jsav.label("Insert:", {left: "55px", top: "5px"});

  var insert = jsav.ds.array([14], {left: "100px", top: "0px"});

  /* 1st Slide *************************************************************/
  jsav.umsg("Simple insert into the 2-3 tree.");

  // Create all the arrays that represent the nodes in the 2-3 tree.
  var arr1, arr2, arr3, arr4, arr5, arr6, arr7, arr8, arr9, arr10, arr11, arr12;
  var width = 700;
  arr1 = jsav.ds.array([18, 13]);
  Window.ODSA.positionRow([arr1], 0, width, 70);
  arr2 = jsav.ds.array([12, ""]);
  arr3 = jsav.ds.array([23, 30]);
  arr4 = jsav.ds.array([48, ""]);
  Window.ODSA.positionRow([arr2, arr3, arr4], 80, width, 450);
  arr5 = jsav.ds.array([10, ""]);
  arr6 = jsav.ds.array([15, ""]);
  arr7 = jsav.ds.array([20, 21]);
  arr8 = jsav.ds.array([24, ""]);
  arr9 = jsav.ds.array([31, ""]);
  arr10 = jsav.ds.array([45, 47]);
  arr11 = jsav.ds.array([50, 52]);
  Window.ODSA.positionRow([arr5, arr6, arr7, arr8, arr9, arr10, arr11], 160, width, 560);

  // Create lines that connect all the nodes.
  var properties = {"stroke-width": 1.5};
  var length = 2;
  var line1, line5;
  console.log("simple insert");
  line1 = Window.ODSA.drawEdge(jsav, properties, arr1, arr2, 0, length);
  Window.ODSA.drawEdge(jsav, properties, arr1, arr3, 1, length);
  Window.ODSA.drawEdge(jsav, properties, arr1, arr4, 2, length);
  Window.ODSA.drawEdge(jsav, properties, arr2, arr5, 0, length);
  line5 = Window.ODSA.drawEdge(jsav, properties, arr2, arr6, 1, length);
  Window.ODSA.drawEdge(jsav, properties, arr3, arr7, 0, length);
  Window.ODSA.drawEdge(jsav, properties, arr3, arr8, 1, length);
  Window.ODSA.drawEdge(jsav, properties, arr3, arr9, 2, length);
  Window.ODSA.drawEdge(jsav, properties, arr4, arr10, 0, length);
  Window.ODSA.drawEdge(jsav, properties, arr4, arr11, 1, length);

  // set initial display for first slide.
  jsav.displayInit();

  /* 2nd Slide *************************************************************/
  jsav.umsg("The value 14 is inserted into the tree. The value is first compared agains the root node.\n" +
    "Since 14 is less than the left value of the root node it follows the left child node.");
  arr1.highlight(0);
  line1.css({"stroke": "red"});
  jsav.step();

  /* 3rd Slide *************************************************************/
  jsav.umsg("This node has only one element, and 14 is greater than 12 so the center child is followed next.");
  line1.css({"stroke": "black"});
  arr1.unhighlight(0);
  arr2.highlight(0);
  line5.css({"stroke": "red"});
  jsav.step();

  /* 4th Slide *************************************************************/
  jsav.umsg("A leaf node has being reached. Since the leaf node has an empty space the new node can be inserted here. " +
    "The key 15 has to be shifted to the right to make room for the new key (14)");
  line5.css({"stroke": "black"});
  arr2.unhighlight(0);
  arr6.highlight(0);
  jsav.step();

  /* 5th Slide *************************************************************/
  jsav.umsg("The new key 14 was inserted into the tree.");
  arr6.unhighlight(0);
  arr6.swap(0, 1, {arrow: false});
  jsav.effects.moveValue(insert, 0, arr6, 0);
  jsav.step();

  jsav.recorded();

}(jQuery));

// Create slide show for promoteCON
(function ($) {
  "use strict";
  var jsav = new JSAV("promoteCON");

  /* 1st Slide *************************************************************/
  jsav.umsg("A simple node-splitting insert for a 2-3 tree.");

  jsav.label("Insert:", {left: "55px", top: "5px"});

  var insert = jsav.ds.array([55], {left: "100px", top: "0px"});

  // Create all the arrays that represent the nodes in the 2-3 tree.
  var arr1, arr2, arr3, arr4, arr5, arr6, arr7, arr8, arr9, arr10, arr11, arr12;
  var width = 700;
  arr1 = jsav.ds.array([18, 13]);
  Window.ODSA.positionRow([arr1], 0, width, 70);
  arr2 = jsav.ds.array([12, ""]);
  arr3 = jsav.ds.array([23, 30]);
  arr4 = jsav.ds.array([48, ""]);
  Window.ODSA.positionRow([arr2, arr3, arr4], 80, width, 480);
  arr5 = jsav.ds.array([10, ""]);
  arr6 = jsav.ds.array([15, ""]);
  arr7 = jsav.ds.array([20, 21]);
  arr8 = jsav.ds.array([24, ""]);
  arr9 = jsav.ds.array([31, ""]);
  arr10 = jsav.ds.array([45, 47]);
  arr11 = jsav.ds.array([50, 52]);
  Window.ODSA.positionRow([arr5, arr6, arr7, arr8, arr9, arr10, arr11], 160, width, 560);

  // Create lines that connect all the nodes.
  var properties = {"stroke-width": 1.5};
  var length = 2;
  var line3, line10;
  console.log("promote");
  Window.ODSA.drawEdge(jsav, properties, arr1, arr2, 0, length);
  Window.ODSA.drawEdge(jsav, properties, arr1, arr3, 1, length);
  line3 = Window.ODSA.drawEdge(jsav, properties, arr1, arr4, 2, length);
  Window.ODSA.drawEdge(jsav, properties, arr2, arr5, 0, length);
  Window.ODSA.drawEdge(jsav, properties, arr2, arr6, 1, length);
  Window.ODSA.drawEdge(jsav, properties, arr3, arr7, 0, length);
  Window.ODSA.drawEdge(jsav, properties, arr3, arr8, 1, length);
  Window.ODSA.drawEdge(jsav, properties, arr3, arr9, 2, length);
  Window.ODSA.drawEdge(jsav, properties, arr4, arr10, 0, length);
  line10 = Window.ODSA.drawEdge(jsav, properties, arr4, arr11, 1, length);

  // set initial display for first slide.
  jsav.displayInit();

  /* 2nd Slide *************************************************************/
  jsav.umsg("The value 55 is inserted into the tree. The value is first compared against the root node.\n" +
    "Since 55 is more than the right key of the root node it follows the right child node.");
  arr1.highlight(1);
  line3.css({"stroke": "red"});
  jsav.step();

  /* 3rd Slide *************************************************************/
  jsav.umsg("This node has only one element, and 55 is greater than 48 so the center child is followed next.");
  line3.css({"stroke": "black"});
  arr1.unhighlight(1);
  arr4.highlight(0);
  line10.css({"stroke": "red"});
  jsav.step();

  /* 4th Slide *************************************************************/
  jsav.umsg("A leaf node has being reached. Since the leaf node has no empty spaces it will have to be split.");
  line10.css({"stroke": "black"});
  arr4.unhighlight(0);
  arr11.highlight(0);
  arr11.highlight(1);
  jsav.step();

  /* 5th Slide *************************************************************/
  jsav.umsg("Now the values are split. The largest key (55) goes to the new node, the smallest key (50) goes to the " +
    "old node, and the middle key (52) gets promoted.");
  arr12 = jsav.ds.array(["", ""], {visible: false});
  Window.ODSA.positionRow([arr5, arr6, arr7, arr8, arr9, arr10, arr11, arr12], 160, width + 80, 639);
  arr12.show();
  arr12.unhighlight(0);
  arr12.unhighlight(1);
  arr11.unhighlight(0);
  arr11.unhighlight(1);
  jsav.step();

  /* 6th Slide *************************************************************/
  jsav.umsg("The pointers can be updated now.");
  jsav.effects.moveValue(arr11, 1, arr4, 1);
  jsav.effects.moveValue(insert, 0, arr12, 0);
  arr4.highlight(1);
  jsav.step();

  /* 7th Slide *************************************************************/
  jsav.umsg("The key 55 was inserted to the tree.");
  arr4.unhighlight(1);
  Window.ODSA.drawEdge(jsav, properties, arr4, arr12, 2, length);
  jsav.step();

  // Mark the slide show as finished.
  jsav.recorded();

}(jQuery));

// Create slide show for splitCON
(function ($) {
  "use strict";
  var jsav = new JSAV("splitCON"), i;

  /* 1st Slide *************************************************************/
  jsav.umsg("Example of inserting a record that causes the 2-3 tree root to split.");

  jsav.label("Insert:", {left: "55px", top: "5px"});
  jsav.label("Promote:", {left: "35px", top: "55px"});

  var insert = jsav.ds.array([19], {left: "100px", top: "0px"});
  var promote = jsav.ds.array([""], {left: "100px", top: "50px"});

  // Create all the arrays that represent the nodes in the 2-3 tree.
  var arrays = [];
  var width = 800;
  arrays.push(jsav.ds.array([18, 13]));
  Window.ODSA.positionRow(arrays.slice(0, 1), 80, width, 70);
  arrays.push(jsav.ds.array([12, ""]));
  arrays.push(jsav.ds.array([23, 30]));
  arrays.push(jsav.ds.array([48, ""]));
  Window.ODSA.positionRow(arrays.slice(1), 160, width, 480);
  arrays.push(jsav.ds.array([48, ""]));
  arrays.push(jsav.ds.array([10, ""]));
  arrays.push(jsav.ds.array([20, 21]));
  arrays.push(jsav.ds.array([24, ""]));
  arrays.push(jsav.ds.array([31, ""]));
  arrays.push(jsav.ds.array([45, 47]));
  arrays.push(jsav.ds.array([50, 52]));
  Window.ODSA.positionRow(arrays.slice(4), 240, width, 560);


  // Create lines that connect all the nodes.
  var properties = {"stroke-width": 1.5};
  var length = 2;
  var lines = [];
  console.log("split");
  lines.push(Window.ODSA.drawEdge(jsav, properties, arrays[0], arrays[1], 0, length));
  lines.push(Window.ODSA.drawEdge(jsav, properties, arrays[0], arrays[2], 1, length));
  lines.push(Window.ODSA.drawEdge(jsav, properties, arrays[0], arrays[3], 2, length));
  lines.push(Window.ODSA.drawEdge(jsav, properties, arrays[1], arrays[4], 0, length));
  lines.push(Window.ODSA.drawEdge(jsav, properties, arrays[1], arrays[5], 1, length));
  lines.push(Window.ODSA.drawEdge(jsav, properties, arrays[2], arrays[6], 0, length));
  lines.push(Window.ODSA.drawEdge(jsav, properties, arrays[2], arrays[7], 1, length));
  lines.push(Window.ODSA.drawEdge(jsav, properties, arrays[2], arrays[8], 2, length));
  lines.push(Window.ODSA.drawEdge(jsav, properties, arrays[3], arrays[9], 0, length));
  lines.push(Window.ODSA.drawEdge(jsav, properties, arrays[3], arrays[10], 1, length));

  // set initial display for first slide.
  jsav.displayInit();

  /* 2nd Slide *************************************************************/
  jsav.umsg("The value 19 is inserted into the tree. The value is first compared against the root node.\n" +
    "Since 19 is more than the left value and less than the right value of the root node it follows the " +
    "center child node.");
  arrays[0].highlight(1);
  arrays[0].highlight(0);
  lines[1].css({"stroke": "red"});
  jsav.step();

  /* 3rd Slide *************************************************************/
  jsav.umsg("This node has only two elements, and 19 is less than 23 so the left child is inspected next.");
  lines[2].css({"stroke": "black"});
  lines[1].css({"stroke": "black"});
  arrays[0].unhighlight(1);
  arrays[0].unhighlight(0);
  arrays[2].highlight(0);
  lines[5].css({"stroke": "red"});
  jsav.step();

  /* 4th Slide *************************************************************/
  jsav.umsg("A leaf node has being reached. Since the leaf node has no empty spaces it will have to be split.");
  lines[5].css({"stroke": "black"});
  arrays[2].unhighlight(0);
  arrays[6].highlight(0);
  arrays[6].highlight(1);
  jsav.step();

  /* 5th Slide *************************************************************/
  jsav.umsg("The largest key (21) goes in the new node, the smallest key (19) goes is the old node, and " +
    "the middle key (20) has to be promoted. ");
  arrays.splice(7, 0, jsav.ds.array(["", ""], {visible: false}));
  Window.ODSA.positionRow(arrays.slice(4), 240, width, 640);
  arrays[7].show();
  for (i = 3; i < lines.length; i += 1) {
    lines[i].hide();
  }
  lines.splice(3, 1, Window.ODSA.drawEdge(jsav, properties, arrays[1], arrays[4], 0, length));
  lines.splice(4, 1, Window.ODSA.drawEdge(jsav, properties, arrays[1], arrays[5], 1, length));
  lines.splice(5, 1, Window.ODSA.drawEdge(jsav, properties, arrays[2], arrays[6], 0, length));
  lines.splice(6, 1, Window.ODSA.drawEdge(jsav, properties, arrays[2], arrays[8], 1, length));
  lines.splice(7, 1, Window.ODSA.drawEdge(jsav, properties, arrays[2], arrays[9], 2, length));
  lines.splice(8, 1, Window.ODSA.drawEdge(jsav, properties, arrays[3], arrays[10], 0, length));
  lines.splice(9, 1, Window.ODSA.drawEdge(jsav, properties, arrays[3], arrays[11], 1, length));
  arrays[6].unhighlight(0);
  arrays[6].unhighlight(1);
  jsav.step();

  /* 6th Slide *************************************************************/
  jsav.umsg("The parent node is full, so the promoted element cannot be inserted. Therefore the parent" +
    " node has to be split.");
  jsav.effects.moveValue(arrays[6], 1, arrays[7], 0);
  jsav.effects.moveValue(arrays[6], 0, promote, 0);
  jsav.effects.moveValue(insert, 0, arrays[6], 0);
  jsav.step();

  /* 7th Slide *************************************************************/
  jsav.umsg("Again, the largest key (30) goes in the new node, the smallest key (20) goes is the old node, and " +
    "the middle key (23) is promoted");
  arrays.splice(3, 0, jsav.ds.array(["", ""], {visible: false}));
  Window.ODSA.positionRow(arrays.slice(1, 5), 160, width, 550);
  arrays[3].show();
  for (i = 0; i < lines.length; i += 1) {
    lines[i].hide();
  }
  lines.splice(0, 1, Window.ODSA.drawEdge(jsav, properties, arrays[0], arrays[1], 0, length));
  lines.splice(1, 1, Window.ODSA.drawEdge(jsav, properties, arrays[0], arrays[2], 1, length));
  lines.splice(2, 1, Window.ODSA.drawEdge(jsav, properties, arrays[0], arrays[4], 2, length));

  lines.splice(3, 1, Window.ODSA.drawEdge(jsav, properties, arrays[1], arrays[5], 0, length));
  lines.splice(4, 1, Window.ODSA.drawEdge(jsav, properties, arrays[1], arrays[6], 1, length));
  lines.splice(5, 1, Window.ODSA.drawEdge(jsav, properties, arrays[2], arrays[7], 0, length));
  lines.splice(6, 1, Window.ODSA.drawEdge(jsav, properties, arrays[2], arrays[9], 1, length));
  lines.splice(7, 1, Window.ODSA.drawEdge(jsav, properties, arrays[2], arrays[10], 2, length));
  lines.splice(8, 1, Window.ODSA.drawEdge(jsav, properties, arrays[4], arrays[11], 0, length));
  lines.splice(9, 1, Window.ODSA.drawEdge(jsav, properties, arrays[4], arrays[12], 1, length));
  jsav.step();

  /* 8th Slide *************************************************************/
  jsav.umsg("The pointers can now be updated");
  jsav.effects.moveValue(arrays[2], 1, arrays[3], 0);
  jsav.effects.moveValue(promote, 0, arrays[2], 0);
  promote.value(0, 23);
  jsav.step();

  /* 9th Slide *************************************************************/
  jsav.umsg("The parent node is full so the promoted element cannot be inserted. " +
    "Therefore the parent node has to be split. Because the parent node is the root node, a new root has to be " +
    "created as well.");
  for (i = 3; i < lines.length; i += 1) {
    lines[i].hide();
  }
  lines.splice(3, 1, Window.ODSA.drawEdge(jsav, properties, arrays[1], arrays[5], 0, length));
  lines.splice(4, 1, Window.ODSA.drawEdge(jsav, properties, arrays[1], arrays[6], 1, length));
  lines.splice(5, 1, Window.ODSA.drawEdge(jsav, properties, arrays[2], arrays[7], 0, length));
  lines.splice(6, 1, Window.ODSA.drawEdge(jsav, properties, arrays[2], arrays[8], 1, length));
  lines.splice(7, 1, Window.ODSA.drawEdge(jsav, properties, arrays[3], arrays[9], 0, length));
  lines.splice(8, 1, Window.ODSA.drawEdge(jsav, properties, arrays[3], arrays[10], 1, length));
  lines.splice(9, 1, Window.ODSA.drawEdge(jsav, properties, arrays[4], arrays[11], 0, length));
  lines.push(Window.ODSA.drawEdge(jsav, properties, arrays[4], arrays[12], 1, length));
  jsav.step();

  /* 10th Slide *************************************************************/
  jsav.umsg("Again, the largest key (23) goes in the new node, the smallest key (13) goes is the old node, and " +
    "the middle key (18) is promoted.");
  arrays.splice(0, 0, jsav.ds.array(["", ""], {visible: false}));
  arrays.splice(2, 0, jsav.ds.array(["", ""], {visible: false}));
  Window.ODSA.positionRow(arrays.slice(0, 1), 0, width, 80);
  Window.ODSA.positionRow(arrays.slice(1, 3), 80, width, 400);
  arrays[0].show();
  arrays[2].show();
  for (i = 0; i < 3; i += 1) {
    lines[i].hide();
  }
  lines.splice(0, 1, Window.ODSA.drawEdge(jsav, properties, arrays[1], arrays[3], 0, length));
  lines.splice(1, 1, Window.ODSA.drawEdge(jsav, properties, arrays[1], arrays[4], 1, length));
  lines.splice(2, 1, Window.ODSA.drawEdge(jsav, properties, arrays[1], arrays[6], 2, length));
  jsav.step();

  /* 8th Slide *************************************************************/
  jsav.umsg("The pointers can now be updated.");
  jsav.effects.moveValue(promote, 0, arrays[2], 0);
  jsav.effects.moveValue(arrays[1], 1, arrays[1], 0);
  arrays[0].value(0, 18);
  jsav.step();

  /* 11th Slide *************************************************************/
  jsav.umsg("The key 19 has now being inserted into the tree.");
  for (i = 0; i < lines.length; i += 1) {
    lines[i].hide();
  }
  lines = [];
  lines.push(Window.ODSA.drawEdge(jsav, properties, arrays[0], arrays[1], 0, length));
  lines.push(Window.ODSA.drawEdge(jsav, properties, arrays[0], arrays[2], 1, length));
  lines.push(Window.ODSA.drawEdge(jsav, properties, arrays[1], arrays[3], 0, length));
  lines.push(Window.ODSA.drawEdge(jsav, properties, arrays[1], arrays[4], 1, length));
  lines.push(Window.ODSA.drawEdge(jsav, properties, arrays[2], arrays[5], 0, length));
  lines.push(Window.ODSA.drawEdge(jsav, properties, arrays[2], arrays[6], 1, length));
  lines.push(Window.ODSA.drawEdge(jsav, properties, arrays[3], arrays[7], 0, length));
  lines.push(Window.ODSA.drawEdge(jsav, properties, arrays[3], arrays[8], 1, length));
  lines.push(Window.ODSA.drawEdge(jsav, properties, arrays[4], arrays[9], 0, length));
  lines.push(Window.ODSA.drawEdge(jsav, properties, arrays[4], arrays[10], 1, length));
  lines.push(Window.ODSA.drawEdge(jsav, properties, arrays[5], arrays[11], 0, length));
  lines.push(Window.ODSA.drawEdge(jsav, properties, arrays[5], arrays[12], 1, length));
  lines.push(Window.ODSA.drawEdge(jsav, properties, arrays[6], arrays[13], 0, length));
  lines.push(Window.ODSA.drawEdge(jsav, properties, arrays[6], arrays[14], 1, length));
  jsav.step();

  // Mark the slide show as finished.
  jsav.recorded();

}(jQuery));
