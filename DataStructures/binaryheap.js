(function ($) {
  "use strict";
  /* global JSAV, jQuery */
  var compareFunction = function (a, b) {
    return a - b;
  };
  var inittree = function (binheap) {
    var size = binheap.size(),
      bt = binheap._tree,
      nodes = [];
    var donode = function (node, pos) {
      if (pos === 1) {
        node.value(binheap.value(pos - 1));
      }
      node.element.attr("data-jsav-heap-index", pos);
      nodes[pos - 1] = node;
      var lpos = pos * 2,
          rpos = lpos + 1;
      if (lpos <= size) {
        if (!node.left()) {
          node.left(binheap.value(lpos - 1));
        } else {
          node.left().value(binheap.value(lpos - 1));
        }
        donode(node.left(), lpos);
      }
      if (rpos <= size) {
        if (!node.right()) {
          node.right(binheap.value(rpos - 1));
        } else {
          node.right().value(binheap.value(rpos - 1));
        }
        donode(node.right(), rpos);
      }
    };
    binheap._treenodes = nodes;
    donode(bt.root(), 1);
  };

  var BinaryHeap = function (jsav, element, options) {
    this.jsav = jsav;
    this.options = $.extend({indexed: true, layout: "array"}, options);
    if (!this.options.template) {
      var tmplName = this.options.layout + (this.options.indexed ? "-indexed":"");
      this.options.template = JSAV._types.ds.AVArray._templates[tmplName];
    }
    this._indices = [];
    if ($.isArray(element)) {
      var arrsize = element.length;
      if ('size' in options) {
        element.length = options.size;
      }
      this.initialize(element);
      this.element.attr("data-jsav-heap-size", arrsize);
    } else {
      if (element) { // assume it's a DOM element
        this.element = $(element);
      } else {
        this.element = $("<ol/>");
        $(this.jsav.container).append(this.element).addClass("jsavbinaryheap");
      }
      var size = 0;
      $.each(this.element.find("li"), function (index) {
        if (this.value(index) !== "") {
          size++;
        }
      });
      this.element.attr("data-jsav-heap-size", size.length);
      
      this.initializeFromElement();
    }
    var oldfx = $.fx.off || false;
    $.fx.off = true;
    
    if (options.stats) {
      this.stats = {"swaps": 0, "leftswaps": 0, "rightswaps": 0,
                    "recursiveswaps": 0, "partlyrecursiveswaps": 0};
    }

    if (options.tree) {
      this._tree = jsav.ds.binarytree(options);
      inittree(this);
      this._tree.layout();
    }
    if (options.heapify) {
      for (var i = Math.floor(this.heapsize() / 2); i > 0; i--) {
        this.heapify(i);
      }
    }
    if (this.options.center) {
      this.element.addClass("jsavcenter");
    }
    $.fx.off = oldfx;
  };
  JSAV.utils.extend(BinaryHeap, JSAV._types.ds.AVArray);
  var bhproto = BinaryHeap.prototype;
  bhproto.arrayswap = bhproto.swap;
  bhproto.arrayclear = bhproto.clear;
  bhproto.arrayvalue = bhproto.value;
  
  bhproto.value = function (index, newValue) {
    if (typeof newValue === "undefined") {
      return this.arrayvalue(index);
    }
    this.arrayvalue(index, newValue);
    if (index >= this.heapsize()) {
      this.element.attr("data-jsav-heap-size", index + 1);
    }
    if (this.options.tree) {
      this._treenodes[index].value(newValue);
    }
    return this;
  };
  
  bhproto.clear = function () {
    this.arrayclear();
    if (this.options.tree) {
      this._tree.clear();
    }
  };

  // create versions of some array functions that will also change
  // the treenodes
  var funcs = ["css", "highlight", "unhighlight", "addClass", "removeClass", "toggleClass"];
  var getDelegateFunction = function (name) {
    // return a "delegate" function bound to the array function with given name
    return function () {
      var node;
      // first call the stored original array function
      var val = this["_array" + name].apply(this, arguments);
      // then the treenode functions, based on the type of the index
      // argument (first argument)
      if (this.options.tree && typeof arguments[0] === "number") {
        node = this._treenodes[arguments[0]];
        node[name].apply(node, [].slice.call(arguments, 1));
      } else if (this.options.tree && $.isArray(arguments[0])) {
        for (var i = arguments[0].length; i--;) {
          node = this._treenodes[arguments[0][i]];
          node[name].apply(node, [].slice.call(arguments, 1));
        }
      }
      // finally return the value of the array function
      return val;
    };
  };
  // go through the function names, store the array functions, and create
  // delegate functions to the heap prototype
  for (var i = funcs.length; i--;) {
    bhproto["_array" + funcs[i]] = bhproto[funcs[i]];
    bhproto[funcs[i]] = getDelegateFunction(funcs[i]);
  }

  bhproto._setsize = JSAV.anim(function (newsize) {
    var oldsize = this.element.attr("data-jsav-heap-size");
    this.element.attr("data-jsav-heap-size", newsize);
    return [oldsize];
  });

  bhproto.heapsize = function (newsize) {
    if (typeof newsize !== "undefined") {
      return this._setsize(newsize);
    } else {
      return parseInt(this.element.attr("data-jsav-heap-size"), 10);
    }
  };

  bhproto.heapify = function (pos, options) {
    var size = this.heapsize(),
      lpos = pos * 2,
      rpos = pos * 2 + 1,
      smallest = pos,
      comp = this.options.compare,
      step = this.options.steps ? this.jsav.step : function () {};
    if (lpos <= size && comp(this.value(lpos - 1), this.value(pos - 1)) < 0) {
      smallest = lpos;
    }
    if (rpos <= size && comp(this.value(rpos - 1), this.value(smallest - 1)) < 0) {
      smallest = rpos;
    }
    if (smallest !== pos) {
      if (this.options.stats) {
        this.stats.swaps++;
        if (smallest === lpos) { this.stats.leftswaps++; }
        else { this.stats.rightswaps++; }
      }
      if (options && options.noAnimation) {
        var tmp = this.value(pos - 1);
        this.value(pos - 1, this.value(smallest - 1));
        this.value(smallest - 1, tmp);
      } else {
        this.swap(smallest - 1, pos - 1);
      }
      step.apply(this.jsav);
      if (this.heapify(smallest, options) && this.options.stats) {
        this.stats.recursiveswaps++;
      } else if (this.options.stats) {
        this.stats.partlyrecursiveswaps++;
      }
      return true;
    } else if (this.options.stats) {
      this.stats.interrupted = true;
    }
    return false;
  };

  bhproto.swap = function (index1, index2, options) {
    this.arrayswap(index1, index2, options);
    if (this.options.tree) {
      // swap the values in the tree
      this.jsav.effects.swapValues(this._treenodes[index1],
                                   this._treenodes[index2]);
    }
  };

  bhproto.moveValue = function (fromStructure, fromIndex, toStructure, toIndex) {
    if ((fromStructure instanceof BinaryHeap) &&
      (toStructure instanceof JSAV._types.ds.AVArray)) {
      // Case: From structure is a Binary Heap and To structure is an Array
      // Set the array index to empty
      this.arrayvalue(fromIndex, "");
      // Move tree node value to array.
      this.jsav.effects.moveValue(this._treenodes[fromIndex], toStructure, toIndex);
    } else if ((toStructure instanceof BinaryHeap) &&
      (fromStructure instanceof JSAV._types.ds.AVArray)) {
      // Case: From structure is an Array and To structure is a Binary Heap
      // Set binary heap array index to From structure value
      this.arrayvalue(toIndex, fromStructure.value(fromIndex));
      // Move From structure value into Binary Heap tree node.
      this.jsav.effects.moveValue(fromStructure, fromIndex, this._treenodes[toIndex]);
    } else if (!(fromStructure instanceof BinaryHeap) && !(toStructure instanceof BinaryHeap)) {
      // Case: Neither structure is of binary heap type.
      this.jsav.effects.moveValue(fromStructure, fromIndex, toStructure, toIndex);
    } else {
      throw "Move value function only supports moving values from a " +
        "Binary Heap to an Array and vice versa. Any other type of data " +
        "structures are not supported yet.";
    }
  };

  bhproto.insert = function (val) {
    var i = this.heapsize() + 1,
      parent = Math.floor(i / 2),
      comp = this.options.compare,
      step = this.options.steps ? this.jsav.step : function () {};
    this.value(i - 1, val);
    if (this.options.steps) { this.jsav.stepOption("grade", true); }
    step.apply(this.jsav);
    while (i > 1 && comp(this.value(parent - 1), val) > 0) {
      if (this.options.stats) {
        this.stats.swaps += 1;
      }
      this.swap(i - 1, parent - 1);
      step.apply(this.jsav);
      i = parent;
      parent = Math.floor(i / 2);
    }
    if (comp(this.value(parent - 1), val) === 0 && this.options.stats) {
      this.stats.collision = true;
    }
    return this;
  };
  
  JSAV.ext.ds.binheap = function (element, options) {
    return new BinaryHeap(this, element, $.extend(true, {'compare': compareFunction, "stats": false,
                                                         'steps': true, 'tree': true,
                                                         'heapify': true, 'center': true}, options));
  };
  JSAV._types.ds.BinaryHeap = BinaryHeap;
}(jQuery));