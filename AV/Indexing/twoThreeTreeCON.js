/**
 * Creates global functions that serve to facilitate the creation and manipulation of 2-3 trees.
 */
(function () {
  "use strict";

  /**
   * Creates a new array tree. The values are hard coded, this method only work for this instance.
   * @param jsav The JSAV that will draw the array nodes.
   * @returns {Array} A list of all the array nodes that were created.
   */
  function getArrayNodes(jsav) {
    var arrays = [];
    arrays.push(jsav.ds.array([18, 31]));
    arrays.push(jsav.ds.array([12, ""]));
    arrays.push(jsav.ds.array([23, 30]));
    arrays.push(jsav.ds.array([48, ""]));
    arrays.push(jsav.ds.array([10, ""]));
    arrays.push(jsav.ds.array([15, ""]));
    arrays.push(jsav.ds.array([20, 21]));
    arrays.push(jsav.ds.array([24, ""]));
    arrays.push(jsav.ds.array([31, ""]));
    arrays.push(jsav.ds.array([45, 47]));
    arrays.push(jsav.ds.array([50, 52]));
    return arrays;
  }

  /**
   * Draws the edges between array nodes. The edges are hard coded, this function only works for this instance.
   * @param jsav The JSAV that will draw the edges.
   * @param array_nodes The array nodes where the edges will be drawn from and to.
   * @param array_node_length The length of each array node.
   * @param edge_properties The properties of each edge.
   * @returns {Array} A list of all the lines that were created.
   */
  function getArrayNodesEdges(jsav, array_nodes, array_node_length, edge_properties) {
    var lines = [];
    lines.push(window.twothreetree.drawEdge(jsav, edge_properties, array_nodes[0], array_nodes[1], 0, array_node_length));
    lines.push(window.twothreetree.drawEdge(jsav, edge_properties, array_nodes[0], array_nodes[2], 1, array_node_length));
    lines.push(window.twothreetree.drawEdge(jsav, edge_properties, array_nodes[0], array_nodes[3], 2, array_node_length));
    lines.push(window.twothreetree.drawEdge(jsav, edge_properties, array_nodes[1], array_nodes[4], 0, array_node_length));
    lines.push(window.twothreetree.drawEdge(jsav, edge_properties, array_nodes[1], array_nodes[5], 1, array_node_length));
    lines.push(window.twothreetree.drawEdge(jsav, edge_properties, array_nodes[2], array_nodes[6], 0, array_node_length));
    lines.push(window.twothreetree.drawEdge(jsav, edge_properties, array_nodes[2], array_nodes[7], 1, array_node_length));
    lines.push(window.twothreetree.drawEdge(jsav, edge_properties, array_nodes[2], array_nodes[8], 2, array_node_length));
    lines.push(window.twothreetree.drawEdge(jsav, edge_properties, array_nodes[3], array_nodes[9], 0, array_node_length));
    lines.push(window.twothreetree.drawEdge(jsav, edge_properties, array_nodes[3], array_nodes[10], 1, array_node_length));
    return lines;
  }

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

  function toggleArrayHighlight(array_node) {
    if (array_node.css(array_highlight_property) === "none") {
      array_node.css(array_highlight_add);
    } else {
      array_node.css(array_highlight_remove);
    }
  }

  function toggleEdgeHighlight(line) {
    if (line.css(edge_highlight_property) === "#000") {
      line.css(edge_highlight_add);
    } else {
      line.css(edge_highlight_remove);
    }
  }

  // Highlight properties for arrays.
  var array_highlight_property = "box-shadow";
  var array_highlight_add = {"box-shadow": "0 0 15px 5px #2B92FF"};
  var array_highlight_remove = {"box-shadow": "none"};

  // Highlight properties for line edges.
  var edge_highlight_property = "stroke";
  var edge_highlight_add = {"stroke": "#2B92FF", "stroke-width": 3.0};
  var edge_highlight_remove = {"stroke": "black", "stroke-width": 1.0};


  var twothreetree = {};
  twothreetree.drawEdge = drawEdge;
  twothreetree.positionRow = positionRow;
  twothreetree.getArrayNodes = getArrayNodes;
  twothreetree.getArrayNodesEdges = getArrayNodesEdges;
  twothreetree.toggleArrayHiglight = toggleArrayHighlight;
  twothreetree.toggleEdgeHiglight = toggleEdgeHighlight;
  window.twothreetree = twothreetree;
}());
