/**
 * Created by Elmer on 2/12/14.
 */

(function($) {

  // Initialize object that will be added to the window object.
  // This way the ArrayTree object can be made public
  var ODSA = {};

  ODSA.ArrayTree = function(jsav, node_length, height) {
    // Store the JSAV object where all the array nodes will be created from.
    this.jsav = jsav;
    // Store the size of each array node.
    this.node_length = node_length;
    // Store the number of layers or tree height of this array tree.
    this.layers = height;
    // This is a two dimensional array that stores at each index all the array nodes for each layer.
    this.node_layers = [];
    // Default vertical gap between array layers expressed in percentage.
    this.v_gap = .5;
    // Default horizontal gap between each array node in the bottom most layer expressed in percentage.
    this.h_gap = .1;
    // Generate all the array nodes for each array layer.
    generateArrays(this);
  };

  /**
   * Generates all the array node layers of the tree. Inside each of the array node layers
   * there are (L+1)^(L+1) array nodes, where L stands for the length of each array node
   * (the number of elements each array node has).
   * @param tree The tree object to which the array node layers will be added to.
   */
  function generateArrays(tree) {
    // Create array of empty strings for all of the array nodes to inherit as default values.
    var default_contents = [];
    for (var k = 0; k < tree.node_length; k++) {
      default_contents.push("");
    }

    // Create a temporary array to get the width and height of each array node.
    var temp_array = tree.jsav.ds.array(default_contents);
    var array_width = parseInt(temp_array.css("width"));
    var array_height = parseInt(temp_array.css("height"));
    // Delete the temporary array.
    temp_array.clear();

    // Initialize the top offset for each array node layer.
    var top_pos = 0;

    // Add all the empty array layers to the tree.
    for (var i = 0; i < tree.layers; i++) {
      // Create sub array that will hold all the array nodes for this layer.
      var array_node_layer = [];

      // Add all the empty array nodes for the current array node layer.
      for (var j = 0; j < Math.pow((tree.node_length+1), i); j++) {
        // Get the left offset for this array node.
        var left_pos = j * (array_width + (tree.h_gap * array_width));
        // Create new array.
        var array_node = tree.jsav.ds.array(default_contents, {left: left_pos + "px", top: top_pos + "px"});
        // Push the newly created array to the array node layer.
        array_node_layer.push(array_node);
      }
      // Push the newly populated array node layer to the layer array in the tree object.
      tree.node_layers.push(array_node_layer);
      /**
       * Increase the top offset for the next array node layer.
       * The offset is calculated in the following manner.
       * By default all new layers are offset by at least 100% of the height of an array node.
       * To that 100%, the percent in the tree.v_gap variable is added.
       * Before this happens however we add another offset that decreased as we reach the last row.
       * This way, the top row will have more space between the next row and the last row will just
       * have the equivalent to 100% + tree.v_gap.
       * It is done this way to give more space to spread the nodes out at the top, and less space at
       * the bottom where the space is not needed as much.
       */
      var top_percent_inc = (tree.v_gap + (tree.layers - (i + 2))/3);
      top_pos += array_height * (1 + top_percent_inc);
    }
  }

  // Add the ODSA variable to the window object to make everything
  // inside of ODSA public.
  window.ODSA = ODSA;

}(jQuery));