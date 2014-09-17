(function ($) {
  "use strict";
  var global = window.ttplustree = {};

  global.newNode = function (jsav, keys, isLeaf, values) {
    if (isLeaf) {
      for (var i = 0; i < keys.length; i++) {
        keys[i] = keys[i] + '<br><div class="leaf-node-value">' + values[i] + '</div>';
      }
    }
    var arr = jsav.ds.array(keys, {left: "0", top: "0"});
    if (isLeaf) {
      arr.element.addClass('leaf-node');
    } else {
      arr.element.addClass('internal-node');
    }
    return new global.node(jsav, arr, isLeaf).center();
  };

  global.node = function (jsav, arr, isLeaf) {
    this.jsav = jsav;
    this.array = arr;
    this.isLeaf = isLeaf;
    this.children = [];
    this.edges = [];
  };

  var nodeproto = global.node.prototype;
  nodeproto.value = function (idx, key, value) {
    if (this.isLeaf && value) {
      key = key + '<br><div class="leaf-node-value">' + value + '</div>';
    }
    this.array.value(idx, key);
  };

  nodeproto.move = function (left, top) {
    this.array.css({"left": "+=" + left + "px", "top": "+=" + top + "px"});
  };

  nodeproto.center = function () {
    var canvas = $(this.array.element).parent();
    var cw = $(canvas).outerWidth();
    var aw = $(this.array.element).outerWidth();
    var left_offset = (cw / 2) - (aw / 2);
    this.array.css({left: left_offset + "px"});
    return this;
  };

  nodeproto.addChild = function (newChild) {
    this.children.push(newChild);
    this.edges.push(null);
    this.drawEdge(this.children.length - 1);
  };

  nodeproto.drawEdge = function (child_idx) {
    // Calculate edge position
    var pos = $(this.array.element).position();
    var c_pos = $(this.children[child_idx].array.element).position();
    var x1 = pos.left,
      y1 = pos.top,
      x2 = c_pos.left,
      y2 = c_pos.top;

    // Adjust coordinates to align edges with arrays
    var left_off = ($(this.array.element).outerWidth() / $(this.array.element).children('li').size()) * child_idx;
    var top_off = $(this.array.element).outerHeight();
    x1 += left_off;
    y1 += top_off - 2;
    x2 += $(this.children[child_idx].array.element).outerWidth() / 2;
    y2 += 2;

    if (child_idx === 0) {
      x1 += 3;
      y1 -= 3;
    } else if (child_idx === 2) {
      x1 -= 3;
      y1 -= 3;
    }

    // Set edge to right position
    if (!this.edges[child_idx]) {
      this.edges[child_idx] = this.jsav.g.line(x1, y1, x2, y2);
    } else {
      this.edges[child_idx].movePoints([[0, x1, y1], [1, x2, y2]]);
    }
  };

  nodeproto.updateEdges = function () {
    for (var i = 0; i < this.edges.length; i++) {
      this.drawEdge(i);
    }
    return this;
  };
  nodeproto.hideEdges = function () {
    for (var i = 0; i < this.edges.length; i++) {
      this.edges[i].hide();
    }
    return this;
  };

  nodeproto.showEdges = function () {
    for (var i = 0; i < this.edges.length; i++) {
      this.edges[i].show();
    }
    return this;
  };

  nodeproto.showEdge = function (idx) {
    this.edges[idx].show();
    return this;
  };

  nodeproto.highlightToggle = function () {
    if (this.array.isHighlight()) {
      this.array.unhighlight();
    } else {
      this.array.highlight();
    }
  };

  nodeproto.highlightToggleEdge = function (idx) {
    this.edges[idx].toggleClass('highlight-edge');
  };

  nodeproto.child = function (pos) {
    return this.children[pos];
  };
}(jQuery));