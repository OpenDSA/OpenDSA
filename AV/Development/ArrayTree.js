/**
 * Created by Elmer on 2/12/14.
 */

(function($) {

  // Initialize object that will be added to the window object.
  // This way the ArrayTree object can be made public
  var ODSA = {};

  /**
   * Constructor to create a new ArrayTree object. An array tree is simply a tree that has array
   * instead of nodes, called array nodes. When the constructor is first called it will construct
   * a full B Tree. The array nodes can then be deleted to construct the desired tree.
   *
   * @param jsav The JSAV container where all the elements will be drawn to.
   * @param node_length The length of each array node.
   * @param height The height of the tree.
   * @constructor Creates a new ArrayTree object.
   */
  ODSA.ArrayTree = function(jsav, node_length, height) {
    // Store the JSAV object where all the array nodes will be created from.
    this.jsav = jsav;
    // Store the size of each array node.
    this.node_length = node_length;
    // Store the number of layers or tree height of this array tree.
    this.layers = height;
    // This is a two dimensional array that stores at each index all the array nodes for each layer.
    this.node_layers = [];
    this.edges = [];
    // Default vertical gap between array layers expressed in percentage.
    this.v_gap = 2.0;
    // Default horizontal gap between each array node in the bottom most layer expressed in percentage.
    this.h_gap = 0.1;
    // Generate all the array nodes for each array layer.
    generateArrays(this);
    position_arrays(this);
    add_edges(this);
  };

  /**
   * Generates all the array node layers of the tree. Inside each of the array node layers
   * there are (NODE_LENGTH+1)^(LAYER_INDEX) array nodes, where layer indexes start at 0.
   *
   * @param tree The tree object to which the array node layers will be added to.
   */
  function generateArrays(tree) {
    // Create array of empty strings for all of the array nodes to inherit as default values.
    var default_contents = [];
    for (var k = 0; k < tree.node_length; k++) {
      default_contents.push("");
    }

    // Add all the empty array layers to the tree.
    for (var i = 0; i < tree.layers; i++) {
      // Create sub array that will hold all the array nodes for this layer.
      var array_node_layer = [];

      // Get the number of nodes that this layer has.
      var num_nodes = Math.pow((tree.node_length+1), i);
      // Add all the empty array nodes for the current array node layer.
      for (var j = 0; j < num_nodes; j++) {
        // Create new array.
        var array_node = tree.jsav.ds.array(default_contents, {top: "0", left: "0"});
        // Push the newly created array to the array node layer.
        array_node_layer.push(array_node);
      }
      // Push the newly populated array node layer to the layer array in the tree object.
      tree.node_layers.push(array_node_layer);
    }
  }

  /**
   * This function determines the position of each array node. The position calculations
   * are made as follows:
   *
   * Top offset:
   * The top offset is calculated in the following manner. By default all new layers are offset
   * by at least 100% of the height of an array node. To that 100%, the percent in the tree.v_gap
   * variable is added. Before this happens however we add another offset that decreases as we
   * reach the last row. This way, the top row will have more space between the next row and the
   * last row will just have the equivalent to 100% + tree.v_gap.
   * It is done this way to give more space to spread the nodes out at the top, and less space at
   * the bottom where the space is not needed as much.
   *
   * Left offset:
   * This offset is a little more tricky. The last layer will always have an offset of h_gap expressed
   * in percentage. Therefore if the width of the array node is 100px and h_gap is set to 0.1, then the
   * total left offset for each new array node will be 110px. This of course doesn't apply to the very first
   * node which always has a left offset of zero.
   * For the rest of the layers the left offset is calculated as follows. First the total width of the last
   * layer is calculated. This will provide the total space that needs to be divided among the nodes in the
   * current layer. So once the total width of the bottom layer is obtained it is then divided by the number
   * of nodes in the current layer. This number is then divided by 2 so that the node will be centered in this
   * space. To center the node further, half of the width of the array node is subtracted. This constitutes
   * the first offset applied to the first array node in every layer but the last. Any consecutive nodes
   * will be incrementally offset by the width and percent offset of a node in the last layer and to that
   * we add the initial offset multiplied by 2. This will result in each layer of nodes to be evenly
   * distributed along of its child nodes.
   *
   * @param tree The tree object that contains the array nodes to be positioned.
   */
  function position_arrays(tree) {
    var array_width = parseInt(tree.node_layers[0][0].css("width"));
    var array_height = parseInt(tree.node_layers[0][0].css("height"));

    // Get the total width of the bottom layer
    var bottom_width = get_bottom_layer_width(tree, array_width);

    // Initialize the top offset for each array node layer.
    var top_pos = 0;
    // Get the horizontal pixel increase for each consecutive array node.
    var left_increase = 0;

    // Add all the empty array layers to the tree.
    for (var i = 0; i < tree.layers; i++) {
      // Get the number of nodes for this layer.
      var num_nodes = Math.pow((tree.node_length+1), i);
      // Determine if this is the last layer in the tree.
      var last_layer = i == (tree.layers - 1);
      // Reset the left position offset for each layer.
      var left_pos = 0;
      if (last_layer) {
        /**
         * If this is the last layer, then just set the left increase to the width of
         * the array and add the standard horizontal gap percentage.
         */
        left_increase = Math.round(array_width * (1 + tree.h_gap));
      } else {
        /**
         * If this is not the last layer, then get the total width of the bottom layer
         * and then divide the number of nodes in this layer. Then divide that number by half
         * and subtract half of the width of an array node. This will give the initial offset for
         * the first node.
         */
        var bottom_node_width = array_width * (1 + tree.h_gap);
        left_increase = Math.round(((bottom_width / num_nodes) / 2) - (bottom_node_width / 2));
        left_pos = left_increase;
      }

      // Add all the empty array nodes for the current array node layer.
      for (var j = 0; j < num_nodes; j++) {
        // Get the left offset in pixels.
        if (last_layer && j != 0) {
          left_pos += left_increase;
        }
        else if (!last_layer && j != 0) {
          left_pos += Math.round((array_width * (1 + tree.h_gap)) + (left_increase * 2));
        }
        // Set the top and left offsets for the array node.
        tree.node_layers[i][j].css({"top" : top_pos + "px", "left" : left_pos + "px", "z-index": 100});
      }
      // Get the top offset percent increase.
      var top_percent_inc = (tree.v_gap + (tree.layers - (i + 2))/3);
      // Increase the top offset by the specified percentage.
      top_pos += array_height * (1 + top_percent_inc);
    }
  }

  /**
   * Gets the total width of the bottom layer of an ArrayTree object.
   *
   * @param tree The tree object.
   * @param array_node_width The width of each array node.
   * @returns {number} The total width of the last layer of nodes in the ArrayTree.
   */
  function get_bottom_layer_width(tree, array_node_width) {
    var layer_count = tree.node_layers.length;
    var nodes_count = tree.node_layers[layer_count - 1].length;
    var bottom_width = nodes_count * (array_node_width * (1 + tree.h_gap));
    return Math.round(bottom_width);
  }

  /**
   * Adds edges to all the parent-child nodes in the tree.
   * @param tree The tree where the edges will be drawn on.
   */
  function add_edges(tree) {
    // Get the number of links (children) every parent node can have.
    var links_per_parent = tree.node_length + 1;
    // Ge the number of layers in the tree.
    var layer_count = tree.node_layers.length;
    // Iterate through each layer starting with the last one and ending with the second layer.
    for (var i = layer_count - 1; i > 0; i--) {
      // Get the number of nodes in this layer.
      var node_count = tree.node_layers[i].length;
      // Create a new array that will hold all the edges created to connect the nodes in this
      // layer to their parents in the layer above.
      var edge_layer = [];
      // Iterate through all the nodes in this layer and create a edge to their parent.
      for (var j = 0; j < node_count; j++) {
        // Get the coordinates for the parent node.
        var parent = [i-1, Math.floor(j/links_per_parent)];
        // Get the coordinates for the child node.
        var child = [i, j];
        // Get the child index for this node realtive to the parent node.
        var child_index = j % links_per_parent;
        // Create a new edge.
        var edge = new Edge(tree, parent, child, child_index);
        // Add edge to array.
        edge_layer.push(edge);
      }
      // Add all the edges of this layer to the edges array in the Array Tree object.
      tree.edges.unshift(edge_layer);
    }
  }

  /**
   * Draws a line from the parent node to the child node.
   *
   * @param tree The ArrayTree object where the edges will be drawn.
   * @param parent The parent node coordinates(layer, node).
   * @param child The child node coordinates (layer, node).
   * @param index The index of the parent node where the edge should come from.
   * @returns {*} A JSAV Line object.
   * @constructor Creates a new JSAV Line object.
   */
  var Edge = function(tree, parent, child, index) {
    // Get the lenght of a node.
    var node_length = tree.node_length;
    // Get a pointer to the parent node.
    var parent_node = tree.node_layers[parent[0]][parent[1]];
    // Get all the necessary properties from the parent node.
    var parent_top = parseInt(parent_node.css("top"));
    var parent_left = parseInt(parent_node.css("left"));
    var parent_height = parseInt(parent_node.css("height"));
    var parent_width = parseInt(parent_node.css("width"));
    // Get the width of each individual index in the node.
    var node_step = parent_width / node_length;
    // Set the top and left offset of the edge.
    var y1 = parent_top + parent_height;
    var x1 = parent_left + (index * node_step);
    // Get a pointer to the child node.
    var child_node = tree.node_layers[child[0]][child[1]];
    // Get all the necessary porpoerties from the child node.
    var child_top = parseInt(child_node.css("top"));
    var child_left = parseInt(child_node.css("left"));
    // Set the top and left offset of the edge.
    var y2 = child_top;
    var x2 = child_left + (parent_width / 2);
    var new_edge = tree.jsav.g.line(x1, y1, x2, y2, {"stroke-width": 1.5});
    return new_edge;
  }

  ODSA.ArrayTree.prototype = {
    /**
     * Sets the value of an element in the array node.
     *
     * @param value The new value for the element in the array node.
     * @param layer The layer where the array node is located at.
     * @param node  The index of the node where the value is to be set.
     * @param index The index of the node element where the value is to be set.
     */
    set_value: function (value, layer, node, index) {
      this.node_layers[layer][node].value(index, value);
    },
    /**
     * Removes the specified node from the Array Tree.
     *
     * @param layer The layer where the node to be removed is at.
     * @param node  The index of the node to be removed.
     */
    delete_array_node: function (layer, node) {
      // Hide the array.
      this.node_layers[layer][node].hide();
      // Hide any edge from this node to its parent.
      this.edges[layer-1][node].hide();
    },
    /**
     * Forces the Array Tree to reposition all of the array nodes.
     */
    layout: function() {
//      position_arrays(this);
    }
  };

  /**
   * Add the ODSA variable to the window object to make everything
   * inside of ODSA public.
   */
  window.ODSA = ODSA;

}(jQuery));