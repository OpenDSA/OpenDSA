(function ($) {
  "use strict";
  var global = window.ttplustree = {};

  global.leafArrows = [];
  global.leafList = [];

  global.drawLeafArrows = function (jsav) {
    // Add as many elements to the leafs arrows arrays as there are leafs
    while (global.leafArrows.length !== global.leafList.length) {
      if (global.leafArrows.length < global.leafList.length) {
        global.leafArrows.push(null);
      } else if (global.leafArrows.length > global.leafList.length) {
        var edge = global.leafArrows.pop();
        if (edge) {
          edge.hide();
        }
      }
    }

    // Draw the arrows
    for (var i = 0; i < global.leafList.length - 1; i++) {
      var p1 = $(global.leafList[i].array.element).position();
      var p2 = $(global.leafList[i + 1].array.element).position();
      var w1 = $(global.leafList[i].array.element).outerWidth();
      var h1 = $(global.leafList[i].array.element).outerHeight();
      var h2 = $(global.leafList[i + 1].array.element).outerHeight();

      var x1 = p1.left + w1,
        y1 = p1.top + (h1 / 2),
        x2 = p2.left,
        y2 = p2.top + (h2 / 2);

      if (!global.leafArrows[i]) {
        global.leafArrows[i] = jsav.g.line(x1, y1, x2, y2, {"arrow-end": "classic", "stroke-width": 3.0});
      } else {
        global.leafArrows[i].movePoints([[0, x1, y1], [1, x2, y2]]);
      }
    }
  };

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

  nodeproto.removeChild = function (idx) {
    // Remove child and edge
    var child = this.children.splice(idx, 1);
    var edge = this.edges.splice(idx, 1);
    // Hide edge
    if (edge[0]) {
      edge[0].hide();
    }
    // Return child
    return child[0];
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
    y1 += top_off;
    x2 += $(this.children[child_idx].array.element).outerWidth() / 2;
    y2 += 2;

    if (child_idx === 0) {
      x1 += 2;
      y1 -= 1;
    } else if (child_idx === 2) {
      x1 -= 2;
      y1 -= 1;
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