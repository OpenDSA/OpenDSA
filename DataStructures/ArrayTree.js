
(function ($) {
  "use strict";
  if (typeof JSAV === "undefined") {
    return;
  }

  /*****************************************************************************
   * Add the Array Tree constructor to the public facing JSAV interface.
   ****************************************************************************/
  JSAV.ext.ds.arraytree = function (options) {
    /**
     * Add attributes to options:
     * - Set visibility by default to true.
     * - Set autoresize by default to true.
     *
     * NOTE: These properties will be overridden if the provided 'options'
     * redefine them.
     */
    var ex_options = $.extend(true, {visible: true, autoresize: true}, options);
    // Create new Array Tree object.
    return new ArrayTree(this, ex_options);
  };

  /*****************************************************************************
   * Implement Array Tree data structure.
   ****************************************************************************/

  var ArrayTree = function (jsav, options) {
    this.init(jsav, options);
  };
  JSAV.utils.extend(ArrayTree, JSAV._types.ds.Tree);

  // Get Array Tree prototype
  var arrayTreeProto = ArrayTree.prototype;

  /**
   * Initialize the Array Tree. Creates an empty root node.
   * @param jsav      The JSAV object for this Array Tree.
   * @param options   Options to be passed to the Array Tree structure.
   */
  arrayTreeProto.init = function (jsav, options) {
    this._layoutDone = false; // Set layout as done.
    this.jsav = jsav; // Set the JSAV object for this tree.
    this.options = options; // Set the options for the tree

    /**
     * Generate the element where this tree is going to be placed. The element
     * can either come from the options, which means that it already exists.
     * Otherwise it will be generated now by creating an empty div.
     */
    var el = this.options.element || $("<div />");
    el.addClass("jsavtree jsavcommontree jsavarraytree");
    // Add all options to the tree element.
    for (var key in this.options) {
      // Get the value for the key.
      var val = this.options[key];
      /**
       * Check if the value is valid:
       * - The options object has this key
       * - The value is a string
       * - The value is a number
       * - The value is a boolean
       */
      if (this.options.hasOwnProperty(key) && typeof(val) === "string" ||
        typeof(val) === "number" || typeof(val) === "boolean") {
        // Add the property to the element as a data attribute.
        el.attr("data-" + key, val);
      }
    }

    /**
     * Add the this tree's element to the DOM only if the element was not
     * specified in the options (because that means it already exists).
     */
    if (!this.options.element) {
      $(this.jsav.canvas).append(el);
    }
    // Set the element for this tree.
    this.element = el;
    // Add auto-resize class if options has property.
    if (this.options.autoresize) {
      this.element.addClass("jsavautoresize");
    }

    // Handles top, left, right, bottom options and positions the given element accordingly
    JSAV.utils._helpers.handlePosition(this);
    // Create an empty node and set it as the root
    this.rootnode = this.newNode(null, null);
    // TODO: Why does the child role need to be declared as root?
    this.rootnode.element.attr("data-child-role", "root");
    // TODO: What is the purpose of the IDs?
    this.element.attr({"data-root": this.rootnode.id(), "id": this.id()});

    // Shows or hides the data structure based on options.visible
    // This is placed after the root node code, since the roots show function
    // will be called if the tree is visible
    JSAV.utils._helpers.handleVisibility(this, this.options);
  };
  
  /**
    Creates a new Array Tree Node and sets it as the root node. If the newRoot
    parameter is not specified then, the current root node is returned.
    */
  arrayTreeProto.root = function (newRoot, options) {
    var opts = $.extend({hide: true}, options);
    if (typeof newRoot === "undefined") {
      return this.rootnode;
    } else if (newRoot instanceof ArrayTreeNode) {
      var oldroot = this.rootnode;
      this._setrootnode(newRoot, options);
      this.rootnode.edgeToParent(null);
      if (opts.hide && oldroot) { oldroot.hide(); }
    } else {
      if (this.rootnode) {
        this.rootnode.value(newRoot, options);
      } else {
        this._setrootnode(this.newNode(newRoot, null, options), options);
      }
    }
    return this.rootnode;
  };



  /**
   * Creates a new node in the Array Tree.
   * @param value     The value of Array Tree Node. Array of values.
   * @param parent    The Array Tree Node parent of the new Array Tree Node.
   * @param options   Options to be passed to the Array Tree Node.
   * @returns {ArrayTreeNode} The newly create Array Tree Node object.
   */
  arrayTreeProto.newNode = function (value, parent, options) {
    return new ArrayTreeNode(this, value, parent, options);
  };

  arrayTreeProto.moveValue = function (fromNode, fromIndex, toNode, toIndex) {
    // Test if fromNode is of type Array Tree Node
    if (fromNode instanceof ArrayTreeNode) {
      fromNode = fromNode.node_array;
    }
    // Test if toNode is of type Array Tree Node
    if (toNode instanceof ArrayTreeNode) {
      toNode = toNode.node_array;
    }
    this.jsav.effects.moveValue(fromNode, fromIndex, toNode, toIndex);
  };

  /*****************************************************************************
   * Implement Array Tree Node for the Array Tree data structure.
   ****************************************************************************/

  var ArrayTreeNode = function (container, value, parent, options) {
    this.init(container, value, parent, options);
  };
  JSAV.utils.extend(ArrayTreeNode, JSAV._types.ds.TreeNode);

  // Get Array Tree Node prototype.
  var arrayTreeNodeProto = ArrayTreeNode.prototype;

  /**
   * Initializes a new Array Tree Node.
   * @param container The container where this Array Tree Node will be placed
   * @param value     An array of values for the Array Tree Node.
   * @param parent    The Array Tree Node parent for this Node.
   * @param options   Options to be passed to the Array Tree Node.
   */
  arrayTreeNodeProto.init = function (container, value, parent, options) {
    // Set global variables for array tree node.
    this.jsav = container.jsav;
    this.container = container;
    this.parentnode = parent;

    // Merge options from parent to the provided ones.
    var parent_options = parent ? parent.options: {};
    this.options = $.extend(true, {visible: true}, parent_options, options);

    if (value === null) { // Set default value if none was provided.
      value = [""];
    }

    // Generate element where the Array Tree Node will be placed in.
    this.element = this.options.nodeelement ||
      $("<div><ol></ol></div>");

    // Create array for the Array Tree Node and added to the node element.
    this.arrayelement = $(this.element).find("ol");
    var array_options = $.extend(
      {element: this.arrayelement}, this.options);
    this.node_array = new this.jsav.ds.array(value, array_options);

    // Set classes for Array Tree Node element.
    this.element.addClass("jsavnode jsavtreenode jsavarraytreenode");
    // Set ID.
    this.element.attr({"id": this.id()});

    // Get/Set parent ID
    if (parent) {
      this.element.attr("data-parent", parent.id());
    }
    if (this.options.autoResize) {
      this.element.addClass("jsavautoresize");
    }

    // Add the Array Tree Node element to the Array Tree container.
    this.container.element.append(this.element);
    this.node_array.layout();

    // Shows or hides the data structure based on options.visible
    // This is placed after the root node code, since the roots show function
    // will be called if the tree is visible
    JSAV.utils._helpers.handleVisibility(this, this.options);

    // Draw edge from this Array Tree Node to parent Node.
    if (parent) {
      // Draw edge from the parent Array Tree Node to this node.
      this._edgetoparent = new ArrayTreeEdge(this.jsav, this, parent);
      // Draw edge label if necessary.
      if (this.options.edgeLabel) {
        this._edgetoparent.label(this.options.edgeLabel);
      }
    }

    // Initialized Array Tree Node children array.
    this.childnodes = [];
  };
  
  /**
    Child helper function that had to be reimplemented because it has a
    reference to the ArrayTreeNode object.
    */
  var setchildhelper = function (self, pos, node, options) {
    var oldval = self.childnodes[pos],
      opts = $.extend({hide: true}, options);
    if (oldval) {
      if (opts.hide) { oldval.hide(); }
      oldval.parent(null);
    }
    if (node) {
      var newchildnodes = self.childnodes.slice(0);
      newchildnodes[pos] = node;
      if (node.parent() && node.parent() !== self) {
        node.remove({hide: false});
      }
      node.parent(self);
      self._setchildnodes(newchildnodes, opts);
    } else {
      self._setchildnodes($.map(self.childnodes, function (item, index) {
        if (index !== pos) { return item; }
        else { return null; }
      }), opts);
    }
    return self;
  };

  // Create a new array tree node, or gets the child at position 'pos'.
  arrayTreeNodeProto.child = function (pos, node, options) {
    // If no node value was given return existing node.
    if (typeof node === "undefined") {
      return this.childnodes[pos];
    } else {
      if (node !== null && !(node instanceof ArrayTreeNode)) {
        node = this.container.newNode(node, this, options);
      }
      return setchildhelper(this, pos, node, options);
    }
  };

  /**
   *  Gets or sets the values of the array tree node.
   *  - If index is an array, all the values in index are set in their appropriate
   *  index.
   *  - If index is a number, the newValue is set at the specified index.
   *  - If no parameter is passed the values of the array tree node are returned.
   */
  arrayTreeNodeProto.value = function (index, newValue) {
    if (typeof(index) === "undefined") {
      // return all values in the array
      return this.node_array._values;
    } else if ($.isArray(index)) {
      // replace all values in the array with the new array
      // TODO: What if the new array (index) is smaller than node_array???
      // Looks like when the new array (index) is smaller the remaining elements
      // are left untouched. Whereas if it is bigger, the array grows. Does it
      // make sense to leave it as it is?
      for (var i = 0; i < index.length; i ++) {
        this.node_array.value(i, index[i]);
      }
      this.node_array.layout();
      // ...
    } else {
      // call the array's value method
      var result = this.node_array.value(index, newValue);
      this.node_array.layout();
      return result;
    }

    return this;
  };

  // ---------------------------------------------------------------------------
  // Add interface for array methods
  // ---------------------------------------------------------------------------
  
  arrayTreeNodeProto.isHighlight = function (index, options) {
    this.node_array.isHighlight(index, options);
  };

  arrayTreeNodeProto.highlight = function (indices, options) {
    this.node_array.highlight(indices, options);
  };

  arrayTreeNodeProto.unhighlight = function (indices, options) {
    this.node_array.unhighlight(indices, options);
  };

  arrayTreeNodeProto.css = function (indices, cssprop, options) {
    this.node_array.css(indices, cssprop, options);
  };

  arrayTreeNodeProto.index = function (index) {
    this.node_array.index(index);
  };

  arrayTreeNodeProto.swap = function (index1, index2, options) {
    this.node_array.swap(index1, index2, options);
  };

  // arrayTreeNodeProto. = function() {
  //   this.node_array.();
  // };

  /*****************************************************************************
   * Implement Array Tree Node for the Array Tree data structure.
   ****************************************************************************/

  var ArrayTreeEdge = function (jsav, start, end, options) {
    JSAV._types.ds.Edge.call(this, jsav, start, end, options);
  };
  JSAV.utils.extend(ArrayTreeEdge, JSAV._types.ds.Edge);

  // Get Array Tree Edge prototype
  var edgeProto = ArrayTreeEdge.prototype;

  edgeProto.layout = function (options) {
    var sElem = this.start().element,
        eElem = this.end().element,
        start = (options && options.start) ? options.start : this.start().position(),
        end = (options && options.end) ? options.end : this.end().position(),
        eWidth = eElem.outerWidth(),
        eHeight = eElem.outerHeight(),
        size = this.end().node_array.size(),
        pos = this.end().childnodes.indexOf(this.start());
    window.console.log("size", size, "pos", pos);
    var fromPoint = [end.left + pos * eWidth / size, end.top + eHeight];
    var opts = {
      start: end,
      end: start,
      fromPoint: fromPoint
    };
    JSAV._types.ds.Edge.prototype.layout.call(this, opts);
  };

}(jQuery));
