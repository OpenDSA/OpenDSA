
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
    // Set the options for the tree
    // Use a smaller node gap as default
    this.options = $.extend({ nodegap: 20, nodesize: 3 }, options);

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

    // Set the used constructors for this data structure.
    // If the constructors weren't set, we would need to override several
    // functions that we are now inheriting.
    this.constructors = $.extend({
      Tree: ArrayTree,
      Node: ArrayTreeNode,
      Edge: ArrayTreeEdge
    }, this.options.constructors);
    // Create an empty node and set it as the root
    this.rootnode = this.newNode(null, null);
    // Set the role of the node to root.
    // The roles can be used for instance to highlight the root with CSS
    // Or in a binary tree, make the left child nodes blue, and right child nodes red
    // Example: [data-child-role|=root] { box-shadow: 30px 30px 30px #f00; }
    this.rootnode.element.attr("data-child-role", "root");
    // Set the root id to the tree
    // TODO: What is the purpose of the IDs?
    this.element.attr({"data-root": this.rootnode.id(), "id": this.id()});

    // Shows or hides the data structure based on options.visible
    // This is placed after the root node code, since the roots show function
    // will be called if the tree is visible
    JSAV.utils._helpers.handleVisibility(this, this.options);
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


  // events to register as functions on array
  var events = ["click", "dblclick", "mousedown", "mousemove", "mouseup",
                "mouseenter", "mouseleave"];
  // returns a function for the passed eventType that binds a passed
  // function to that eventType for indices in the array
  var eventhandler = function (eventType) {
    return function (data, handler) {
      // store reference to this, needed when executing the handler
      var self = this;
      // bind a jQuery event handler, limit to .jsavindex
      this.element.on(eventType, ".jsavindex", function (e) {
        // get the node of the clicked element
        var $curr = $(this),
            elem = $curr.data("node"); // get the JSAV node object
        while (!elem) {
          $curr = $curr.parent();
          elem = $curr.data("node");
        }
        // get the index of the clicked element
        var index = elem.node_array.element.find(".jsavindex").index(this);
        // log the event
        self.jsav.logEvent({type: "jsav-arraytree-" + eventType, objid: elem.id(), index: index});
        if ($.isFunction(data)) { // if no custom data..
          // ..bind this to the array and call handler
          // with params array index and the event
          data.call(elem, index, e);
        } else if ($.isFunction(handler)) { // if custom data is passed
          // ..bind this to the array and call handler
          var params = $.isArray(data) ? data.slice(0) : [data]; // get a cloned array or data as array
          params.unshift(index); // add index to first parameter
          params.push(e); // jQuery event as the last
          handler.apply(self, params); // apply the function
        }
      });
      return this;
    };
  };
  // create the event binding functions and add to array prototype
  for (var i = events.length; i--;) {
    arrayTreeProto[events[i]] = eventhandler(events[i]);
  }

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

    this.constructors = $.extend({}, container.constructors, this.options.constructors);

    // Make sure the value is correct. Fix if needed.
    value = this._fixvalue(value);

    // Generate element where the Array Tree Node will be placed in.
    this.element = this.options.nodeelement ||
      $("<div><ol></ol></div>");

    // Set classes for Array Tree Node element.
    this.element.addClass("jsavnode jsavtreenode jsavarraytreenode");
    // Set ID.
    this.element.attr({"id": this.id()});
    // Save this node in the DOM (used by the click handler)
    this.element.data("node", this);

    // Get/Set parent ID
    if (parent) {
      this.element.attr("data-parent", parent.id());
    }
    if (this.options.autoResize) {
      this.element.addClass("jsavautoresize");
    }

    // Add the Array Tree Node element to the Array Tree container.
    this.container.element.append(this.element);

    // Create array for the Array Tree Node and added to the node element.
    this.arrayelement = $(this.element).find("ol");
    var array_options = $.extend(
      {element: this.arrayelement}, this.options);
    this.node_array = new this.jsav.ds.array(value, array_options);

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
    Helper function that takes a value (array) as a parameter and returnes
    a truncated/extended version of the array. The size of the returned array
    is the same as nodesize in the arraytrees options.
   */
  arrayTreeNodeProto._fixvalue = function (value) {
    // Set default value if none was provided
    if (!value) {
      value = [];
    }
    // If value is not an array, convert it to an array
    if (!$.isArray(value)) {
      value = [value];
    }
    // Truncate value array if it's too long
    var nodesize = this.container.options.nodesize;
    if (value.length > nodesize) {
      value = value.slice(0, nodesize);
    }
    // Extend value with empty strings if it is too short
    if (value.length < nodesize) {
      value = value.concat(new Array(nodesize - value.length).join(",").split(","));
    }
    // Returen the new value
    return value;
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
      // return a copy of all values in the array
      return this.node_array._values.slice(0);
    } else if ($.isArray(index)) {
      // replace all values in the array with the new array
      var value = this._fixvalue(index);
      for (var i = 0; i < value.length; i ++) {
        this.node_array.value(i, value[i]);
      }
      this.node_array.layout();
    } else {
      // call the array's value method
      var result = this.node_array.value(index, newValue);
      this.node_array.layout();
      return result;
    }

    return this;
  };


  /**
   *  Used by the JSAV grader to check if two subtrees are equal (recursively).
   *  - Works just like equals() for other JSAV trees, except that it is able to
   *    compare array values.
   */
  arrayTreeNodeProto.equals = function (otherNode, options) {
    if (!otherNode || this.value().join() !== otherNode.value().join()) {
      return false;
    }
    if (options && 'css' in options) { // if comparing css properties
      var cssEquals = JSAV.utils._helpers.cssEquals(this, otherNode, options.css);
      if (!cssEquals) { return false; }
    }
    if (options && 'class' in options) { // if comparing class attributes
      var classEquals = JSAV.utils._helpers.classEquals(this, otherNode, options["class"]);
      if (!classEquals) { return false; }
    }
    // compare edge style
    if (this.edgeToParent()) {
      var edgeEquals = this.edgeToParent().equals(otherNode.edgeToParent(),
                                        $.extend({}, options, {dontCheckNodes: true}));
      if (!edgeEquals) { return false; }
    }
    // compare children
    var ch = this.children(),
        och = otherNode.children();
    if (ch.length !== och.length) {
      return false;
    }
    for (var j = 0, l = ch.length; j < l; j++) {
      if (ch[j] && och[j] && !ch[j].equals(och[j], options)) {
        return false;
      }
    }
    return true; // values equal, nothing else to compare
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
        pos = this.end().childnodes.indexOf(this.start()),
        fromPoint = [end.left + pos * eWidth / size, end.top + eHeight];
    var opts = {
      start: end,
      end: start,
      fromPoint: fromPoint
    };
    JSAV._types.ds.Edge.prototype.layout.call(this, opts);
  };

}(jQuery));
