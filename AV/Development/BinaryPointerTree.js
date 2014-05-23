(function ($) {
  "use strict";

  // constant for the width of the pointer area
  var POINTER_AREA_WIDTH = 14;

  // shortcut to JSAV Edge
  var Edge = JSAV._types.ds.Edge;

  var FakeEdge = function (jsav, start, end, options) {
    this.jsav = jsav;
    this.startnode = start;
    this.endnode = end;
    this.options = options;
    this.container = start.container;
    // fake g object
    this.g = {rObj: {node: {setAttribute: function () {}}, remove: function () {}}};
  };
  JSAV.utils.extend(FakeEdge, Edge);

  var fakeproto = FakeEdge.prototype;
  fakeproto.show = function () {};
  fakeproto.hide = function () {};
  fakeproto.layout = function (options) {
    var pos = this.end().left() === this.start() ? 0 : 1;
    if (this.end().pointers[pos]) {
      if (options) {
        var s = options.start;
        var e = options.end;
        options.start = e;
        options.end = s;
      }
      this.end().pointers[pos].layout(options);
    }
  };

  /**
   *
   *  BINARY POINTER TREE
   *
   */
  var BinaryPointerTree = function (jsav, options) {
    this.init(jsav, options);
    this.element.addClass("jsavbinarypointertree");
  };
  JSAV.utils.extend(BinaryPointerTree, JSAV._types.ds.BinaryTree);

  var bptproto = BinaryPointerTree.prototype;

  bptproto.newNode = function (value, parent, options) {
    return new BinaryPointerTreeNode(this, value, parent, options);
  };


  /**
   *
   *  BINARY POINTER TREE NODE
   *
   */
  var BinaryPointerTreeNode = function (container, value, parent, options) {
    this.init(container, value, parent, options);
  };
  JSAV.utils.extend(BinaryPointerTreeNode, JSAV._types.ds.BinaryTreeNode);

  var bptnodeproto = BinaryPointerTreeNode.prototype;


  bptnodeproto.init = function (container, value, parent, options) {
    this.jsav = container.jsav;
    this.container = container;
    this.parentnode = parent;
    this.pointers = [];
    this.options = $.extend(true, {visible: true}, parent ? parent.options : {}, options);
    var el = this.options.nodeelement || $("<div><span class='jsavpointerarea left'></span><span class='jsavvalue'>" + this._valstring(value) + "</span><span class='jsavpointerarea right'></span></div>"),
      valtype = typeof(value);
    if (valtype === "object") { valtype = "string"; }
    this.element = el;
    el.addClass("jsavnode jsavtreenode jsavbinarypointertreenode")
        .attr({"data-value": value, "id": this.id(), "data-value-type": valtype })
        .data("node", this);
    if (parent) {
      el.attr("data-parent", parent.id());
    }
    if (this.options.autoResize) {
      el.addClass("jsavautoresize");
    }
    this.container.element.append(el);


    JSAV.utils._helpers.handleVisibility(this, this.options);
    if (parent) {
      this._edgetoparent = new FakeEdge(this.jsav, this, parent);
      if (typeof options.pos !== "undefined") {
        var pos = options.pos;
        if (!parent.pointers[pos]) {
          parent.pointers[pos] = getNewPointerEdge(this.jsav, parent, this, {"arrow-end": "classic-wide-long"});
        } else {
          parent.pointers[pos].end(this);
        }
      }
    }
    this.childnodes = [];
  };

  function getNewPointerEdge(jsav, start, end, options) {
    var edge = new Edge(jsav, start, end, options);
    edge.layout = function (options) {
      if (!this.end()) {
        return;
      }
      var sElem = this.start().element,
          eElem = this.end().element,
          start = (options && options.start) ? options.start : this.start().position(),
          end = (options && options.end) ? options.end : this.end().position(),
          sWidth = sElem.outerWidth(),
          sHeight = sElem.outerHeight() / 2.0,
          eWidth = eElem.outerWidth() / 2.0,
          pos = this.start().pointers[0] === this ? 0 : 1,
          fromX = start.left + POINTER_AREA_WIDTH / 2 + pos * (sWidth - POINTER_AREA_WIDTH),
          fromY = start.top + sHeight,
          toX = end.left + eWidth,
          toY = end.top;
      this.g.movePoints([[0, fromX, fromY], [1, toX, toY]], options);
    };
    return edge;
  }

  function setchild(self, pos, node, options) {
    var oPos = pos ? 0 : 1,
        other,
        newchildnodes,
        child = self.childnodes[pos],
        oChild = self.childnodes[oPos],
        opts = $.extend({hide: true}, options);
    if (typeof node === "undefined") {
      if (child && child.value() !== "jsavnull") {
        return child;
      } else {
        return undefined;
      }
    } else {
      var nullopts = $.extend({}, opts);
      nullopts.edgeLabel = undefined;
      if (node === null) { // node is null, remove child
        if (child && child.value() !== "jsavnull") {
          child.parent(null);
          if (opts.hide) { child.hide(); }
          if (self.pointers[pos]) { self.pointers[pos].end(null).hide(); }
          // child exists
          if (!oChild || oChild.value() === "jsavnull") { // ..but no other child
            if (oChild) { oChild.hide(); }
            self._setchildnodes([]);
          } else { // other child exists
            // create a null node and set it as other child
            other = self.container.newNode("jsavnull", self, nullopts);
            other.element.addClass("jsavnullnode").attr("data-binchildrole", pos ? "right" : "left");
            if (opts.hide) { child.hide(); }
            newchildnodes = [];
            newchildnodes[pos] = other;
            newchildnodes[oPos] = oChild;
            self._setchildnodes(newchildnodes, opts);
          }
        }
      } else { // create a new node and set the child
        if (!(node instanceof BinaryPointerTreeNode)) {
          // if there is a child node and value is number or string, just change the value of the node
          if (child && (typeof node === "number" || typeof node === "string")) {
            child.value(node, opts);
            if (!self.pointers[pos]) {
              self.pointers[pos] = getNewPointerEdge(self.jsav, self, child, {"arrow-end": "classic-wide-long"});
            }
            return child;
          } else {
            node = self.container.newNode(node, self, $.extend(opts, {pos: pos}));
          }
        } else {
          // if this node is already a child somewhere else, remove it there
          if (node.parent() && node.parent() !== self) {
            node.remove({hide: false});
          } else if (node.parent() === self) {
            oChild = null;
            self.pointers[oPos].hide();
          }
          node.parent(self, {pos: pos});
        }
        node.element.attr("data-binchildrole", pos ? "right" : "left");
        newchildnodes = [];
        newchildnodes[pos] = node;
        if (child) {
          if (opts.hide || child.value() === "jsavnull") {
            child.hide();
          } else {
            child.parent(null, {oldPos: pos});
          }
        }
        if (!oChild) {
          other = self.container.newNode("jsavnull", self, nullopts);
          other.element.addClass("jsavnullnode").attr("data-binchildrole", oPos ? "right" : "left");
          newchildnodes[oPos] = other;
        } else {
          newchildnodes[oPos] = oChild;
        }
        self._setchildnodes(newchildnodes, opts);
        return node;
      }
    }
    return child;
  }


  bptnodeproto.addChild = function (node, options) {
    var pos = -1;
    if (!this.left()) { // try left child
      pos = 0;
    } else if (!this.right()) { // try right child
      pos = 1;
    } else {
      console.error("tree node already has two children, cannot add more");
      return;
    }
    return this.child(pos, node, options);
  };
  bptnodeproto.left = function (node, options) {
    return setchild(this, 0, node, options);
  };
  bptnodeproto.right = function (node, options) {
    return setchild(this, 1, node, options);
  };
  bptnodeproto.child = function (pos, node, options) {
    return setchild(this, pos, node, options);
  };
  // bptnodeproto.child = function (pos, node, options) {
  //   if (typeof node === "undefined") {
  //     return this.childnodes[pos];
  //   } else {
  //     if (typeof node === "string" || typeof node === "number") {
  //       node = this.container.newNode(node, this, options);
  //     }
  //     return setchild(this, pos, node, options);
  //   }
  // };
  bptnodeproto.remove = function (options) {
    if (this === this.container.rootnode) {
      this.container.root(this.container.newNode("", null), options);
      return this;
    }
    var parent = this.parent();
    if (parent.left() === this) {
      return setchild(parent, 0, null, options);
    } else if (parent.right() === this) {
      return setchild(parent, 1, null, options);
    }
  };
  bptnodeproto.edgeToLeft = function () {
    return this.edgeToChild(0);
  };
  bptnodeproto.edgeToRight = function () {
    return this.edgeToChild(1);
  };
  bptnodeproto._setvalue = JSAV.anim(function (newValue) {
    var oldVal = this.value(),
        valtype = typeof(newValue);
    if (typeof oldVal === "undefined") { oldVal = ""; }
    if (valtype === "object") { valtype = "string"; }
    this.element
        .removeClass("jsavnullnode")
        .find(".jsavvalue")
        .html(this._valstring(newValue))
        .end()
        .attr({"data-value": newValue, "data-value-type": valtype});
    if (newValue === "jsavnull") {
      this.element.addClass("jsavnullnode");
    }
    return [oldVal];
  });
  bptnodeproto._setparent = JSAV.anim(function (newParent, options) {
    var oldParent = this.parentnode,
        pos = options.pos,
        oldPos = options.oldPos;
    // console.log("this: " + this.value() + "\nnew parent: " + (newParent ? newParent.value() : "") + "\nold parent: " + (oldParent ? oldParent.value() : "") + "\npos: " + pos + ", oldPos: " + oldPos);
    this._edgetoparent.end(newParent, options);
    if (newParent) {
      newParent.pointers[pos].end(this, options);
    }
    // if (options && options.edgeLabel) {
    //   this._edgetoparent.label(options.edgeLabel, options);
    // }
    this.element.attr("data-parent", newParent ? newParent.id() : "");
    this.parentnode = newParent;
    options = {pos: oldPos, oldPos: pos};
    return [oldParent, options];
  });
  bptnodeproto.parent = function (newParent, options) {
    if (typeof newParent === "undefined") {
      return this.parentnode;
    }
    if (newParent) {
      if (!this._edgetoparent) {
        this._setEdgeToParent(new FakeEdge(this.jsav, this, newParent, options));
      }
      var pos;
      if (options && typeof options.pos !== "undefined") {
        pos = options.pos;
      } else {
        pos = (newParent.left() === this ? 0 : 1);
        options = $.extend(true, {pos: pos}, options ? options : {});
      }
      if (!newParent.pointers[pos]) {
        newParent.pointers[pos] = getNewPointerEdge(this.jsav, newParent, this, {"arrow-end": "classic-wide-long"});
      } else {
        newParent.pointers[pos].show();
      }
    }
    if (this.parentnode && this.parentnode !== newParent) {
      if (this.parentnode.pointers[0] && this.parentnode.pointers[0].end() === this) {
        this.parentnode.pointers[0].hide();
        options = $.extend(true, {oldPos: 0}, options ? options : {});
      }
      if (this.parentnode.pointers[1] && this.parentnode.pointers[1].end() === this) {
        this.parentnode.pointers[1].hide();
        options = $.extend(true, {oldPos: 1}, options ? options : {});
      }
    }
    return this._setparent(newParent, options);
  };

  JSAV._types.ds.BinaryPointerTree = BinaryPointerTree;
  JSAV._types.ds.BinaryPointerTreeNode = BinaryPointerTreeNode;

  JSAV.ext.ds.binarypointertree = function (options) {
    return new BinaryPointerTree(this, $.extend(true, {visible: true, autoresize: true}, options));
  };

})(jQuery);