
(function($) {
  "use strict";
  if (typeof JSAV === "undefined") {
    return;
  }

  /*****************************************************************************
   * Add the array tree constructor to the JSAV data structures.
   ****************************************************************************/
  JSAV.ext.ds.arraytree = function (options) {
    return new ArrayTree(this,
      $.extend(true, {visible: true, autoresize: true}, options));
  };

  /*****************************************************************************
   * Implements the array tree data structure.
   ****************************************************************************/

  /**
   * Constructor for a new array tree object.
   * @param jsav The jsav object for this array tree.
   * @param options The options to be passed along to the array tree.
   * @constructor A new array tree object.
   */
  var ArrayTree = function (jsav, options) {
    this.init(jsav, options);
  };
  JSAV.utils.extend(ArrayTree, JSAV._types.ds.JSAVDataStructure);

  var array_tree_prototype = ArrayTree.prototype;

  /**
   * Initialize a new array tree structure.
   * @param jsav The JSAV object where the array tree will be placed int.
   * @param options The options to be passed along to array tree container.
   */
  array_tree_prototype.init = function(jsav, options) {
    // Set the JSAV object for this array tree.
    this.jsav = jsav;
    // Set the options object for this array tree.
    this.options = options;

    /*
    Create the HTML element where the array tree will reside in. If there is an
    'element' property of options then use that as the HTML element. Otherwise
    create a new 'div' and store the array tree there.
     */
    var element = this.options.element || $('<div></div>');
    element.addClass("jsavarraytree");  // Add jsavarraytree to HTML element.

    // Add all attributes given in the options to the array tree HTML element.
    for (var key in this.options) {
      var val = this.options[key];
      if (this.options.hasOwnProperty(key) && typeof(val) === "string" ||
        typeof(val) === "number" || typeof(val) === "boolean") {
        element.attr("data-" + key, val);
      }
    }

    /*
    If this function had to create a new HTML element to store the array tree
    in then append this element to the JSAV canvas.
     */
    if (!this.options.element) {
      $(this.jsav.canvas).append(element);
    }

    // Store the HTML element as an attribute of this object.
    this.element = element;

    // Set auto resize options
    if (this.options.autoresize) {
      this.element.addClass("jsavautoresize");
    }
    JSAV.utils._helpers.handlePosition(this);
    JSAV.utils._helpers.handleVisibility(this, this.options);
  };

  /**
   * Creates a new array node under this array tree container.
   * @param value The value of the array.
   * @param parent The parent node to the new node.
   * @param edge_index The array index value of where the edge to parent goes
   *                    to. A value of 0 means the bottom left corner and a
   *                    value of parent.size means the bottom right corner.
   * @param options Options to be passed along to the array node.
   * @returns {ArrayTreeNode} The created array node object.
   */
  array_tree_prototype.newNode = function(value, parent, edge_index, options) {
    return new ArrayTreeNode(this, value, parent, edge_index, options);
  };

  /**
   * If an options is specified it sets the width of the array tree container.
   * Otherwise it returns the width of the array tree container.
   * @param new_width The new width of the container.
   * @returns {*} The current width of the container.
   */
  array_tree_prototype.width = function (new_width) {
    if (!new_width) {
      return $(this.element).width();
    } else {
      return $(this.element).width(new_width);
    }
  };

  /**
   * If a option is specified it sets the height of the array tree container.
   * Otherwise it returns the height of the array tree container.
   * @param new_height The new height of the container.
   * @returns {*} The current height of the container.
   */
  array_tree_prototype.height = function (new_height) {
    if (!new_height) {
      return $(this.element).height();
    } else {
      return $(this.element).height(new_height);
    }
  };

  /*****************************************************************************
   * Implements the array node data structure.
   ****************************************************************************/

  /**
   * Constructor for a new array node object.
   * @param container The container for the array node.
   * @param value The value of the array.
   * @param parent The parent node to this node.
   * @param edge_index The index to where the edge to parent goes to.
   * @param options Options to be passed along to the array node.
   * @constructor A new array node object
   */
  var ArrayTreeNode = function(container, value, parent, edge_index, options) {
    this.init(container, value, parent, edge_index, options);
  };

  JSAV.utils.extend(ArrayTreeNode, JSAV._types.ds.Node);

  var array_node_prototype = ArrayTreeNode.prototype;


  /**
   * Initializes a new array node.
   * @param container The container for the array node.
   * @param value The value for the array node.
   * @param parent The parent node for this array node.
   * @param edge_index The index to where the edge to parent goes to.
   * @param options Options to be paseda long to the arraynode.
   */
  array_node_prototype.init = function (container, value, parent, edge_index, options) {
    this.jsav = container.jsav;
    this.container = container;
    this.options = options ? options : {};

    // Create HTML element for the array.
    var element = $("<div></div>");
    element.addClass("jsavarraytreenode");
    // Add the HTML element to the array tree element.
//    $(this.container.element).append(element);
//    this.options.element = $(this.container.element).children().last();
    this.container.element.append(element);
    this.options.element = element;
    this.element = element;

    // Set auto resize property.
    if (this.options.autoResize) {
      this.options.element.addClas("jsavautoresize");
    }

    // Set visibility helper.
//    JSAV.utils._helpers.handleVisibility(this, this.options);

    // Add default position for the array node
    this.options.left = "0";
    this.options.top = "0";

    // Create array node.
    this.array = this.jsav.ds.array(value, this.options);
    this.array.addClass("jsavarraytreenode");

    // Determine if drawing an edge is necessary.
    this.edge = null;
    if (parent) {
      this.edge = window.ARRAY_TREE.drawEdge(this.jsav, parent, this, edge_index)
    }

    // resize container.
    window.ARRAY_TREE.expandContainer(this.container, this);
  };

  /**
   * Getter/setter for the left value of the array.
   * @param new_left New left value of the array.
   * @returns {*} The left value of the array.
   */
  array_node_prototype.left = function(new_left) {
    if (!new_left) {
      return $(this.array.element).position().left;
    } else {
      this.array.left({"left":new_left});
    }
  };

  /**
   * Getter/setter for the top value of the array.
   * @param new_top New top value of the array.
   * @returns {Window} The top value of the array.
   */
  array_node_prototype.top = function(new_top) {
    if (!new_top) {
      return $(this.array.element).position().top;
    } else {
      this.array.css({"top": new_top});
    }
  };

  /**
   * Getter/setter for the width of the array.
   * @param new_width The new width of the array.
   * @returns {*} The width of the array.
   */
  array_node_prototype.width = function(new_width) {
    if (!new_width) {
      return $(this.array.element).width();
    } else {
      $(this.array.element).width(new_width);
    }
  };

  /**
   * Getter/setter for the height of the array.
   * @param new_height The new height of the array.
   * @returns {*} The height of the array.
   */
  array_node_prototype.height = function(new_height) {
    if (!new_height) {
      return $(this.array.element).height();
    } else {
      $(this.array.element).height(new_height);
    }
  };
}(jQuery));

(function ($) {

  function drawEdge(jsav, parent, child, edge_index) {
    var p_x, p_y, c_x, c_y;
    p_x = parent.left();
    p_y = parent.top();

    c_x = child.left();
    c_y = child.top();
    console.log("Parent (" + p_x + ", " + p_y + ") Child (" + c_x + ", " + c_y + ")");
    return null;
  }

  function expandContainer(container, node) {
    var n_w, n_h, n_x, n_y, c_w, c_h;
    n_w = node.width();
    n_h = node.height();
    n_x = node.left();
    n_y = node.top();
    c_w = container.width();
    c_h = container.height();

    if (n_x + n_w >= c_w) {
      container.width(n_x + n_w + 10);
    }

    if (n_y + n_h >= c_h) {
      container.height(n_y + n_h + 10);
    }
    console.log("X: " + n_x + " Y: " + n_y);
    console.log("W: " + n_w + " H: " + n_h);
    console.log("Con W: " + c_w + " H: " + c_h);
  }

  var ARRAY_TREE = {};
  ARRAY_TREE.drawEdge = drawEdge;
  ARRAY_TREE.expandContainer = expandContainer;

  window.ARRAY_TREE = ARRAY_TREE;
}(jQuery));

