/*
Finite Automaton module.
An extension to the JFLAP library.
*/
(function ($) {
  "use strict";
  if (typeof JSAV === "undefined") {
    return;
  }
  var Edge = JSAV._types.ds.Edge;
  JSAV.ext.ds.fa = function (options) {
    var opts = $.extend(true, {visible: true, autoresize: true}, options);
    return new FiniteAutomaton(this, opts);
  };

  /*
  Finite automaton class, used for DFAs/NFAs, PDAs, Mealy/Moore machines, and Turing Machines.
  Extended from the JSAV graph class.
  */
  var FiniteAutomaton = function (jsav, options) {
    this.init(jsav, options);
  };
  JSAV.utils.extend(FiniteAutomaton, JSAV._types.ds.Graph);
  var faproto = FiniteAutomaton.prototype;

  faproto.init = function (jsav, options) {
    this._nodes = [];
    this._edges = [];
    this._alledges = null;
    this.stack = ['Z'];           // for PDA
    this.alphabet = {};           // input alphabet
    this.jsav = jsav;
    this.initial;                 // initial state
    this.options = $.extend({visible: true, nodegap: 40, autoresize: true, width: 400, height: 200,
                              directed: true, center: true, arcoffset: 50, emptystring: String.fromCharCode(955)}, options);
    //this.options = $.extend({directed: true}, options);
    this.emptystring = this.options.emptystring;
    this.shorthand = false;
    var el = this.options.element || $("<div/>");
    el.addClass("jsavgraph jsavfiniteautomaton");
    for (var key in this.options) {
      var val = this.options[key];
      if (this.options.hasOwnProperty(key) && typeof(val) === "string" || typeof(val) === "number" || typeof(val) === "boolean") {
        el.attr("data-" + key, val);
      }
    }
    if (!this.options.element) {
      $(jsav.canvas).append(el);
    }
    this.element = el;
    el.attr({"id": this.id()}).width(this.options.width).height(this.options.height);
    if (this.options.autoresize) {
      el.addClass("jsavautoresize");
    }
    if (this.options.center) {
      el.addClass("jsavcenter");
    }
    this.constructors = $.extend({
      Graph: FiniteAutomaton,
      Node: faState,
      Edge: faTransition
    }, this.options.constructors);
    JSAV.utils._helpers.handlePosition(this);
    JSAV.utils._helpers.handleVisibility(this, this.options); 
  };

  JSAV.utils._events._addEventSupport(faproto);

  /*
  Method used to add a new node to the FA.
  Unlike a graph, you cannot define the node's name yourself.
  Do not change the name manually! It is used as an ID.
  */
  faproto.addNode = function(options) {
    var value;
    if (!options || !options.value) {
      value = "q" + this._nodes.length;
    }
    else{
      value = options.value;
    }
    return this.newNode(value, options);
  };

  // Method to remove the given node
  faproto.removeNode = function(node, options) {
    var nodeIndex = this._nodes.indexOf(node);
    if (nodeIndex === -1) { return; } // no such node
    
    this.removeInitial(node);         // remove initial marker if necessary

    // remove all edges connected to this node
    var allEdges = this.edges();
    for (var i = allEdges.length; i--; ) {
      var edge = allEdges[i];
      if (edge.start().id() === node.id() || edge.end().id() === node.id()) {
        this.removeEdge(edge, options);
      }
    }

    // update the adjacency lists
    var firstAdjs = this._edges.slice(0, nodeIndex),
        newAdjs = firstAdjs.concat(this._edges.slice(nodeIndex + 1));
    this._setadjs(newAdjs, options);

    // create a new array of nodes without the removed node
    var firstNodes = this._nodes.slice(0, nodeIndex),
        newNodes = firstNodes.concat(this._nodes.slice(nodeIndex + 1));
    // set the nodes (makes the operation animated)
    this._setnodes(newNodes, options);

    // finally hide the node
    // hide labels
    if (node._stateLabel) { node._stateLabel.hide(options);}
    if (node._mooreOutput) { node._mooreOutput.hide(options);}
    node.hide(options);
    // renumber nodes
    this.updateNodes();
    // return this for chaining
    return this;
  };

  // Method to create a new node (.addNode calls this)
  faproto.newNode = function(value, options) {
    var newNode = new this.constructors.Node(this, value, options), // create new node
        newNodes = this._nodes.slice(0);
        newNodes.push(newNode); // add new node to clone of node array
    // set the nodes (makes the operation animatable
    this._setnodes(newNodes, options);

    var newAdjs = this._edges.slice(0);
    newAdjs.push([]);
    this._setadjs(newAdjs, options);

    return newNode;
  }; 

  /*
  Function to add an edge to the FA.
  Should always provide an edge weight, or there will be errors.
  */
  faproto.addEdge = function(fromNode, toNode, options) {
    // assumes a weight is always given
    if (options.weight === "") {
      options.weight = this.emptystring;
    }
    if (this.hasEdge(fromNode, toNode)) {     // if an edge already exists update it
      var prevEdge = this.getEdge(fromNode, toNode);
      var prevWeight = prevEdge.weight();
      if (prevWeight.split('<br>').indexOf(options.weight) !== -1) { return; }

      prevEdge.weight(prevWeight.split('<br>').concat([options.weight]).join('<br>'));
      return prevEdge;
    }
    var opts = $.extend({}, this.options, options);
    if (opts.directed && !opts["arrow-end"]) {
      opts["arrow-end"] = "classic-wide-long";
    }

    // get indices of the nodes
    var fromIndex = this._nodes.indexOf(fromNode),
        toIndex = this._nodes.indexOf(toNode);
    if (fromIndex === -1 || toIndex === -1) { return; } // no such nodes

    // create new edge
    var edge = new faTransition(this.jsav, fromNode, toNode, opts),
        adjlist = this._edges[fromIndex].slice(0);
    // add new edge to adjlist
    adjlist.push(edge);
    // set the adjlist (makes the operation animated)
    this._setadjlist(adjlist, fromIndex, opts);

    // make a pair of arcs if necessary
    if (this.hasEdge(toNode, fromNode) && !toNode.equals(fromNode)) {
      var prevEdge = this.getEdge(toNode, fromNode);
      prevEdge.dfaArc(true);
      edge.dfaArc(true);
      prevEdge.layout();
      edge.layout();
    }
    return edge;
  };
  // Function to delete the given edge. Can pass in an edge or two nodes.
  faproto.removeEdge = function(fNode, tNode, options) {
    var edge,
        fromNode,
        toNode,
        opts;
    // if first argument is an edge object
    if (fNode.constructor === JSAV._types.ds.faTransition) {
      edge = fNode;
      fromNode = edge.start();
      toNode = edge.end();
      opts = tNode;
    } else { // if not edge, assume two nodes
      fromNode = fNode;
      toNode = tNode;
      edge = this.getEdge(fromNode, toNode);
      opts = options;
    }
    if (!edge) { return; } // no such edge

    var fromIndex = this._nodes.indexOf(fromNode),
        toIndex = this._nodes.indexOf(toNode),
        adjlist = this._edges[fromIndex],
        edgeIndex = adjlist.indexOf(edge),
        newAdjlist = adjlist.slice(0, edgeIndex).concat(adjlist.slice(edgeIndex + 1));
    this._setadjlist(newAdjlist, fromIndex, options);
    // remove arcs
    if (edge.dfaArc()) {
      var oppEdge = this.getEdge(toNode, fromNode);
      oppEdge.dfaArc(false);
      oppEdge.layout();
    }
    // we "remove" the edge by hiding it
    edge.hide();
  };
  // Function to make a state initial.
  faproto.makeInitial = function(node, options) {
    node.addClass("start");
    this.initial = node;
    node.addInitialMarker($.extend({container: this}, this.options));
  };

  // Function to find and remove the initial state marker.
  faproto.removeInitial = function(node, options) {
    if (node.equals(this.initial)) {
      node.removeClass('start');
      this.initial = undefined;
      if (node._initialMarker) {
        node._initialMarker.element.remove();
        node._initialMarker = undefined;
      }
    }
  };

  faproto.setShorthand = function (setBoolean) {
    this.shorthand = setBoolean;
  }

  /*
  Function to update the input alphabet.
  Returns an object.
  Currently assumes every character is a unique input symbol.
  */
  faproto.updateAlphabet = function () {
    var alphabet = {};
    var edges = this.edges();
    var w;
    for (var next = edges.next(); next; next = edges.next()) {
      w = next.weight();
      w = w.split('<br>');
      for (var i = 0; i < w.length; i++) {
        var t = w[i].split('|');
        for (var j = 0; j < t.length; j++) {
          var letters = t[j].split(':')[0];
          if (letters !== String.fromCharCode(955) && letters !== String.fromCharCode(949)) {
            for (var k = 0; k < letters.length; k++) {
              var letter = letters[k];
              if (!(letter in alphabet)) {
                alphabet[letter] = 0;
              }
              alphabet[letter]++;
            }
          }
        }
      }
    }
    this.alphabet = alphabet;
    return alphabet;
  };

  /*
  Function to get the stack alphabet for a PDA
  Returns an array.
  */
  faproto.getStackAlphabet = function () {
    var alphabet = [];
    var edges = this.edges();
    var w;
    for (var next = edges.next(); next; next = edges.next()) {
      w = next.weight();
      w = w.split('<br>');
      for (var i = 0; i < w.length; i++) {
        var letter1 = w[i].split(':')[1],
            letter2 = w[i].split(':')[2],
            letters;
        if (letter1 !== this.emptystring && letter2 !== this.emptystring) {
          letters = letter1.split('').concat(letter2.split(''));
        } else if (letter1 !== this.emptystring) {
          letters = letter1.split('');
        } else if (letter2 !== this.emptystring) {
          letters = letter2.split('');
        } else {
          break;
        }
        for (var j = 0; j < letters.length; j++) {
          if (letters[j] !== this.emptystring && alphabet.indexOf(letters[j]) === -1){
            alphabet.push(letters[j]);
          }
        }
      }
    }
    return alphabet;
  };

  /*
  Function to update the names of the nodes.
  Used to renumber nodes when one is deleted.
  */
  faproto.updateNodes = function() {
    for (var i = 0; i < this._nodes.length; i++) {
      this._nodes[i].value('q'+i);
    }
  };
  // Function to find a node using its name.
  faproto.getNodeWithValue = function(value) {
    var nodes = this.nodes();
    for (var next = nodes.next(); next; next = nodes.next()) {
      if (next.value() === value) {
        return next;
      }
    }
  };

  // unused, only deterministic
  faproto.takePushdownTransition = function (nodeFrom, letter, options) {
    var edges = nodeFrom.getOutgoing();

    for (var i = 0; i < edges.length; i++) {
      var edge = edges[i],
          w = edge.weight().split('<br>');
      for (var j = 0; j < w.length; j++) {
        var t = w[j].split(':');
        if (t[0] !== letter) {continue;}
        if (t[1] !== this.emptystring) {
          var l = [],
              cur;
          for (var k = 0; k < t[1].length; k++) {
            cur = this.stack.pop();
            if (cur) {
              l.push(cur);
            } else {
              break;
            }
          }
          if (t[1] === l.join('')) {
            if (t[2] !== this.emptystring){
              for (var h = t[2].length - 1; h >= 0; h--) {
                this.stack.push(t[2].charAt(h));
              }
            }
            return edge.end();
          } else {
            l.reverse();
            this.stack = this.stack.concat(l);
          }
        } else {
          if (t[2] !== this.emptystring){
            for (var h = t[2].length - 1; h >= 0; h--) {
              this.stack.push(t[2].charAt(h));
            }
          }
          return edge.end();
        }
      }
    }
  };

  // Used for testingND for FAs and Moore Machines.
  faproto.transitionFunction = function (nodeFrom, letter, options) {
    // returns an array of values, does not work for PDAs or TMs
    var edges = nodeFrom.getOutgoing(),
        ret = [];
    for (var i = 0; i < edges.length; i++) {
      var edge = edges[i];
      if (edge.weight().split('<br>').indexOf(letter) !== -1) {
        ret.push(edge.end().value());
      }
    }
    return ret;
  };
  
  // Function to test ND in automata with multiple input symbols on one edge.
  faproto.transitionFunctionMultiple = function (nodeFrom, letter, options) {
    var edges = nodeFrom.getOutgoing(),
        ret = [];
    for (var i = 0; i < edges.length; i++) {
      var edge = edges[i];
      var w = edge.weight().split('<br>');
      for (var j = 0; j < w.length; j++) {
        if (w[j][0] === letter) {
          ret.push(edge.end().value());
        }
      }
    }
    return ret;
  };

  // Hacky function, but it's used for testingND for Mealy Machines.
  faproto.inputTransitionFunction = function (nodeFrom, letter, options) {
    var edges = nodeFrom.getOutgoing(),
        ret = [];
    for (var i = 0; i < edges.length; i++) {
      var edge = edges[i];
      var weights = edge.weight().split('<br>');
      var inputs = [];
      for (var j = 0; j < weights.length; j++) {
        inputs.push(weights[j].split(":")[0]);
      }
      for (var k = 0; k < inputs.length; k++) {
        if (inputs[k] === letter) {
          ret.push(edge.end().value());
        }
      }
      // if (inputs.indexOf(letter) !== -1) {
      //   ret.push(edge.end().value());
      // }
      // if (inputs.indexOf(letter) != inputs.lastIndexOf(letter)) {
      //   ret.push(edge.end().value());
      // }
    }
    return ret;
  };

  // TestingND for Mealy Machines with multiple input symbols on one edge.
  faproto.inputTransitionFunctionMultiple = function (nodeFrom, letter, options) {
    var edges = nodeFrom.getOutgoing(),
        ret = [];
    for (var i = 0; i < edges.length; i++) {
      var edge = edges[i];
      var weights = edge.weight().split('<br>');
      var inputs = [];
      for (var j = 0; j < weights.length; j++) {
        inputs.push(weights[j].split(":")[0]);
      }
      for (var k = 0; k < inputs.length; k++) {
        if (inputs[k][0] === letter) {
          ret.push(edge.end().value());
        }
      }
    }
    return ret;
  };

  // unused; see traversal functions in individual tests
  faproto.traverse = function (state, letter, options) {
    var successors = state.neighbors(),
        traversed = [];
    for (var next = successors.next(); next; next = successors.next()) {
      var weight = this.getEdge(currentState, next).weight().split('<br>');
      for (var i = 0; i < weight.length; i++) {
        if (letter == weight[i]) {
          traversed.push(next);
        }
      }
    } 
    if (traversed.length > 0) {
      return JSAV.utils.iterable(traversed);
    } else { return null };
  };

  /*
  Function to lay out the FA. 
  Uses JFLAP's graph layout algorithms; an FA layout algorithm needs to be written.
  */
  faproto.layout = function(options) {
    if (options && options.layout) {
      var layoutAlg = options.layout;
    } else{
      var layoutAlg = this.options.layout || "_default";
    }
    var ret = this.jsav.ds.layout.graph[layoutAlg](this, options);
    var nodes = this.nodes();
    // Update the position of the state label for each node
    for (var next = nodes.next(); next; next = nodes.next()) {
      next.stateLabelPositionUpdate();
    }
    var edges = this.edges();
    // Remove edges without a weight
    for (next = edges.next(); next; next = edges.next()) {
      if (!next.weight()) {
        this.removeEdge(next);
      }
    }
    return ret;
  };


  /*
  FA edge/transition class.
  Extended from JSAV graph edge class.
  Unlike the graph, the displayed edge is a SVG path, not a line.
  This allows the edge to be arced or made into a loop.
  */
  var faTransition = function (jsav, start, end, options) {
    this.options = $.extend({arc: false}, options);
    this.jsav = jsav;
    this.startnode = start;
    this.endnode = end;
    this.options = $.extend(true, {"display": true}, options);
    this.container = start.container;
    var startPos = start?start.element.position():{left:0, top:0},
        endPos = end?end.element.position():{left:0, top:0};
    if (startPos.left === endPos.left && startPos.top === endPos.top) {
      // layout not done yet
      this.g = this.jsav.g.path("M-1 -1L-1 -1", $.extend({container: this.container}, this.options));
    } else {
        if (end) {
          endPos.left += end.element.outerWidth() / 2;
          endPos.top += end.element.outerHeight();
        }
        if (!startPos.left && !startPos.top) {
          startPos = endPos;
        }
        this.g = this.jsav.g.path("M" + startPos.left + " " + startPos.top + "L" + endPos.left + " " + endPos.top, 
                                  $.extend({container: this.container}, this.options));
    }

    this.element = $(this.g.rObj.node);

    var visible = (typeof this.options.display === "boolean" && this.options.display === true);
    this.g.rObj.attr({"opacity": 0});
    this.element.addClass("jsavedge jsavfatransition");
    if (start) {
      this.element[0].setAttribute("data-startnode", this.startnode.id());
    }
    if (end) {
      this.element[0].setAttribute("data-endnode", this.endnode.id());
    }
    this.element[0].setAttribute("data-container", this.container.id());
    this.element.data("edge", this);

    if (typeof this.options.weight !== "undefined") {
      this._weight = this.options.weight;
      this.label(this._weight);
    }
    if (visible) {
      this.g.show();
    }
  };
  JSAV.utils.extend(faTransition, JSAV._types.ds.Edge);

  var fatransitionproto = faTransition.prototype;
  // Function to set the weight of the edge or return the current weight of the edge
  fatransitionproto.weight = function(newWeight) {
    if (typeof newWeight === "undefined") {
      return this._weight;
    } else if (newWeight === "") {
      newWeight = this.container.emptystring;
    } 
    this._setweight(newWeight);
    this.label(newWeight);
  };

  /*
  Function to layout an edge.
  Mostly the same as graphproto.layout, but JSAV graphs lack arcs and loops.
  Labels are also handled differently.
  */
  fatransitionproto.layout = function(options) {
    // delete edges without weights
    if (!this._label.text()) {
      this.container.removeEdge(this);
      return;
    } 
    this.weight(this._label.element[0].innerHTML);
    var controlPointX, controlPointY, midX, midY,
        sElem = this.start().element,
        eElem = this.end().element,
        start = (options && options.start)?options.start:this.start().position(),
        end = (options && options.end)?options.end:this.end().position(),
        sWidth = sElem.outerWidth()/2.0,
        sHeight = sElem.outerHeight()/2.0,
        eWidth = eElem.outerWidth()/2.0,
        eHeight = eElem.outerHeight()/2.0,
        fromX = (options && options.fromPoint)?options.fromPoint[0]:Math.round(start.left + sWidth),
        fromY = (options && options.fromPoint)?options.fromPoint[1]:Math.round(start.top + sHeight),
        toX = Math.round(end.left + eWidth),
        toY = Math.round(end.top + eHeight),
        fromAngle = normalizeAngle(2*Math.PI - Math.atan2(toY - fromY, toX - fromX)),
        toAngle = normalizeAngle(2*Math.PI - Math.atan2(fromY - toY, fromX - toX)),
        startRadius = parseInt(sElem.css("borderBottomRightRadius"), 10) || 0,
        ADJUSTMENT_MAGIC = 2.2, // magic number to work with "all" stroke widths
        strokeWidth = parseInt(this.g.element.css("stroke-width"), 10),
        // adjustment for the arrow drawn before the end of the edge line
        startStrokeAdjust = this.options["arrow-begin"]? strokeWidth * ADJUSTMENT_MAGIC:0,
        fromPoint = (options && options.fromPoint)?options.fromPoint:
                                    getNodeBorderAtAngle({width: sWidth + startStrokeAdjust,
                                                          height: sHeight + startStrokeAdjust,
                                                          x: fromX, y: fromY}, {x: toX, y: toY}, fromAngle, startRadius),
        // arbitrarily choose to use bottom-right border radius
        endRadius = parseInt(eElem.css("borderBottomRightRadius"), 10) || 0,
        // adjustment for the arrow drawn after the end of the edge line
        endStrokeAdjust = this.options["arrow-end"]?strokeWidth * ADJUSTMENT_MAGIC:0,
        toPoint = getNodeBorderAtAngle({width: eWidth + endStrokeAdjust, height: eHeight + endStrokeAdjust, x: toX, y: toY},
                                        {x: fromX, y: fromY}, toAngle, endRadius);
    // getNodeBorderAtAngle returns an array [x, y], and movePoints wants the point position
    // in the (poly)line as first item in the array, so we'll create arrays like [0, x, y] and
    // [1, x, y]
    
    // If the edge is a loop:
    if (this.start().equals(this.end())) {
      var adjust = Math.sqrt(2) / 2.0;
      fromY = Math.round(fromY - adjust * sHeight);
      fromX = Math.round(fromX - adjust * sWidth);
      var loopR = Math.round(0.8 * sWidth);
      this.g.path("M" + fromX + ',' + fromY + ' a' + loopR + ',' + loopR + ' -45 1,1 ' 
                  + (Math.round(2 * sWidth * adjust) + 2) + ',' + 0, options);
    }
    // If the edge should be an arc (implemented as a quadratic bezier curve)
    else if (this.options.arc) {
      var midX = ((fromPoint[0] + toPoint[0]) / 2.0),
          midY = ((fromPoint[1] + toPoint[1]) / 2.0),
          vectorX = fromPoint[1] - toPoint[1],
          vectorY = toPoint[0] - fromPoint[0],
          scaling = this.options.arcoffset / Math.sqrt(Math.pow(vectorX, 2) + Math.pow(vectorY, 2)),
          controlPointX = midX + scaling * vectorX,
          controlPointY = midY + scaling * vectorY;
      this.g.path('M '+ fromPoint[0] + ',' + fromPoint[1] + ' Q' + controlPointX + ',' 
            + controlPointY + ' ' + toPoint[0] + ',' + toPoint[1], options);
    } else {  //line (same as .movePoints)
        this.g.path(("M" + fromPoint[0] + " " + fromPoint[1] + "L" + toPoint[0] + " " + toPoint[1]), options);
    }
      
    // update the edge label position
    if ($.isFunction(this._labelPositionUpdate)) {
      var bbtop = Math.min(fromPoint[1], toPoint[1]),
          bbleft = Math.min(fromPoint[0], toPoint[0]),
          bbwidth = Math.abs(fromPoint[0] - toPoint[0]),
          bbheight = Math.abs(fromPoint[1] - toPoint[1]);
      if (this.start().equals(this.end())) {
        bbtop = Math.round(start.top - 1.1 * sHeight);
        bbleft = Math.round(start.left);
        bbwidth = Math.round(2 * sWidth);
        bbheight = Math.round(0.5 * sHeight);
      }
      var bbox = {top: bbtop, left: bbleft, width: bbwidth, height: bbheight};
      this._labelPositionUpdate($.extend({bbox: bbox}, options));

      // rotate label to fit along the edge:
      var rotateAngle;
      if ((Math.PI / 2.0) < fromAngle && fromAngle < (3 * Math.PI / 2.0)) {
        rotateAngle = normalizeAngle(Math.PI - fromAngle);
      } else {
        rotateAngle = normalizeAngle((2*Math.PI) - fromAngle);
      }
      if (this.options.arc) {
        if ((controlPointY - midY) / Math.abs(controlPointY - midY) > 0) {
          this._label.css("transform", "rotate(" + rotateAngle + "rad)" + " translateY(" + (this._label.element.height() / 2.0 + strokeWidth + 1 + this.options.arcoffset/2.0) + "px)");
        } else {
          this._label.css("transform", "rotate(" + rotateAngle + "rad)" + " translateY(-" + (this._label.element.height() / 2.0 + strokeWidth + 1 + this.options.arcoffset/2.0) + "px)");
        }
      }
      else {
        this._label.css("transform", "rotate(" + rotateAngle + "rad)" + " translateY(-" + (this._label.element.height() / 2.0 + strokeWidth + 1) + "px)");
      }
    }

    if (this.start().value() === "jsavnull" || this.end().value() === "jsavnull") {
      this.addClass("jsavedge", options).addClass("jsavnulledge", options);
    } 
    else {
      this.addClass("jsavedge", options).removeClass("jsavnulledge");
    }
  };
  function normalizeAngle(angle) {
    var pi = Math.PI;
    while (angle < 0) {
      angle += 2 * pi;
    }
    while (angle >= 2 * pi) {
      angle -= 2 * pi;
    }
    return angle;
  }

  // calculate the intersection of line from pointa to pointb and circle with the given center and radius
  function lineIntersectCircle(pointa, pointb, center, radius) {
    var result = {};
    var a = (pointb.x - pointa.x) * (pointb.x - pointa.x) + (pointb.y - pointa.y) * (pointb.y - pointa.y);
    var b = 2 * ((pointb.x - pointa.x) * (pointa.x - center.x) +(pointb.y - pointa.y) * (pointa.y - center.y));
    var cc = center.x * center.x + center.y * center.y + pointa.x * pointa.x + pointa.y * pointa.y -
                2 * (center.x * pointa.x + center.y * pointa.y) - radius * radius;
    var deter = b * b - 4 * a * cc;
    function interpolate(p1, p2, d) {
      return {x: p1.x+(p2.x-p1.x)*d, y:p1.y+(p2.y-p1.y)*d};
    }
    if (deter <= 0 ) {
      result.inside = false;
    } else {
      var e = Math.sqrt (deter);
      var u1 = ( - b + e ) / (2 * a );
      var u2 = ( - b - e ) / (2 * a );
      if ((u1 < 0 || u1 > 1) && (u2 < 0 || u2 > 1)) {
        if ((u1 < 0 && u2 < 0) || (u1 > 1 && u2 > 1)) {
          result.inside = false;
        } else {
          result.inside = true;
        }
      } else {
        if (0 <= u2 && u2 <= 1) {
          result.enter=interpolate (pointa, pointb, u2);
        }
        if (0 <= u1 && u1 <= 1) {
          result.exit=interpolate (pointa, pointb, u1);
        }
        result.intersects = true;
      }
    }
    return result;
  }

  function getNodeBorderAtAngle(dim, targetNodeCenter, angle, radius) {
    // dim: x, y coords of center and *half* of width and height
    // make sure they have non-zero values
    dim.width = Math.max(dim.width, 1);
    dim.height = Math.max(dim.height, 1);
    var x, y, pi = Math.PI,
        urCornerA = Math.atan2(dim.height*2.0, dim.width*2.0),
        ulCornerA = pi - urCornerA,
        lrCornerA = 2*pi - urCornerA,
        llCornerA = urCornerA + pi,
        intersect, topAngle, bottomAngle, leftAngle, rightAngle;
    // set the radius to be at most half the width or height of the element
    radius = Math.min(radius, dim.width, dim.height);
    // on the higher level, divide area (2pi) to four seqments based on which way the edge will be drawn:
    //  - right side (angle < 45deg or angle > 315deg)
    //  - top (45deg < angle < 135deg) or (pi/4 < angle < (3/4)*pi)
    //  - left side (135deg < angle < 225deg)
    //  - bottom (225deg < angle < 315deg)
    // Each of these areas will then be divided to three sections:
    //  - middle section, where the node border is a line
    //  - two sections where the node border is part of the rounded corner circle
    if (angle < urCornerA || angle > lrCornerA) { // on right side
      topAngle = Math.atan2(dim.height - radius, dim.width);
      bottomAngle = 2*pi - topAngle;
      // default to the right border line
      x = dim.x + dim.width;
      y = dim.y - dim.width * Math.tan(angle);

      // handle the rounded corners if necessary
      if (radius > 0 && angle > topAngle && angle < bottomAngle) { // the rounded corners
        // calculate intersection of the line between node centers and the rounded corner circle
        if (angle < bottomAngle && angle > pi) { // bottom right
          intersect = lineIntersectCircle({x: dim.x, y: dim.y}, targetNodeCenter,
                                      {x: dim.x + dim.width - radius, y: dim.y + dim.height - radius}, radius);
        } else { // top right
          intersect = lineIntersectCircle({x: dim.x, y: dim.y}, targetNodeCenter,
                                      {x: dim.x + dim.width - radius, y: dim.y - dim.height + radius}, radius);
        }
      }
    } else if (angle > ulCornerA && angle < llCornerA) { // left
      topAngle = pi - Math.atan2(dim.height - radius, dim.width);
      bottomAngle = 2*pi - topAngle;

      // default to the left border line
      x = dim.x - dim.width;
      y = dim.y + dim.width*Math.tan(angle);

      // handle the rounded corners
      if (radius > 0 && (angle < topAngle || angle > bottomAngle)) {
        if (topAngle > angle) { // top left
          intersect = lineIntersectCircle({x: dim.x, y: dim.y}, targetNodeCenter, // line
                          {x: dim.x - dim.width + radius, y: dim.y - dim.height + radius}, radius); // circle
        } else { // bottom left
          intersect = lineIntersectCircle({x: dim.x, y: dim.y}, targetNodeCenter, // line
                          {x: dim.x - dim.width + radius, y: dim.y + dim.height - radius}, radius); // circle
        }
      }
    } else if (angle <= ulCornerA) { // top
      rightAngle = Math.atan2(dim.height, dim.width - radius);
      leftAngle = pi - rightAngle;

      // default to the top border line
      y = dim.y - dim.height;
      x = dim.x + (dim.height)/Math.tan(angle);

      // handle the rounded corners
      if (radius > 0 && (angle > leftAngle || angle < rightAngle)) {
        if (angle > leftAngle) { // top left
          intersect = lineIntersectCircle({x: dim.x, y: dim.y}, targetNodeCenter, // line
                          {x: dim.x - dim.width + radius, y: dim.y - dim.height + radius}, radius); // circle
        } else { // top right
          intersect = lineIntersectCircle({x: dim.x, y: dim.y}, targetNodeCenter, // line
                          {x: dim.x + dim.width - radius, y: dim.y - dim.height + radius}, radius); // circle
        }
      }
    } else { // on bottom side
      leftAngle = pi + Math.atan2(dim.height, dim.width-radius);
      rightAngle = 2*pi - Math.atan2(dim.height, dim.width-radius);

      // default to the bottom border line
      y = dim.y + dim.height;
      x = dim.x - (dim.height)/Math.tan(angle);
      if (radius > 0 && (angle < leftAngle || angle > rightAngle)) {
        if (angle > rightAngle) { // bottom right
          intersect = lineIntersectCircle({x: dim.x, y: dim.y}, targetNodeCenter, // line
                          {x: dim.x + dim.width - radius, y: dim.y + dim.height - radius}, radius); // circle
        } else { // bottom left
          intersect = lineIntersectCircle({x: dim.x, y: dim.y}, targetNodeCenter, // line
                          {x: dim.x - dim.width + radius, y: dim.y + dim.height - radius}, radius); // circle
        }
      }
    }
    // if on a corner and we found an intersection, set that as the edge coordinates
    if (intersect && intersect.exit) {
      x = intersect.exit.x;
      y = intersect.exit.y;
    }
    return [Math.round(x), Math.round(y)];
  }

  // Function to set whether an edge should be an arc or not
  fatransitionproto.dfaArc = function(newBool) {
    if (typeof newBool === "undefined") {
      return this.options.arc;
    } 
    else if (typeof newBool === 'boolean') {
      this.options.arc = newBool;
    }
  };

  /*
  FA state class.
  Extended from JSAV graph node class.
  Main difference is the addition of labels and markers.
  */
  var faState = function (container, value, options) {
    this.init(container, value, options);
  };
  JSAV.utils.extend(faState, JSAV._types.ds.GraphNode);

  var fastateproto = faState.prototype;

  fastateproto.init = function (container, value, options) {
    this.jsav = container.jsav;
    this.container = container;
    this.options = $.extend(true, {visible: true, left: 0, top: 0}, options);
    this.constructors = $.extend({}, container.constructors, this.options.constructors);
    var el = this.options.nodeelement || $("<div><span class='jsavvalue'>" + this._valstring(value) + "</span></div>"),
      valtype = typeof(value);
    if (valtype === "object") { valtype = "string"; }
    this.element = el;
    el.addClass("jsavnode jsavgraphnode jsavfastate")
        .attr({"data-value": value, "id": this.id(), "data-value-type": valtype })
        .data("node", this);
    if (this.options.autoResize) {
      el.addClass("jsavautoresize");
    }
    this.container.element.append(el);

    JSAV.utils._helpers.handlePosition(this);
    JSAV.utils._helpers.handleVisibility(this, this.options);
  };
  /*
  Function to get all outgoing edges of a node.
  Returns a normal array, not an iterable array like .getNodes does.
  */
  fastateproto.getOutgoing = function() {
    var edges = this.container._edges[this.container._nodes.indexOf(this)];
    return edges; 
  };
  /*
  Function to set the state label or get the current value of the state label.
  "node.stateLabel()" does not return the state label if the node is hidden!
  "node._stateLabel.element[0].innerHTML" will return the state label regardless of visibility
  */
  fastateproto.stateLabel = function(newLabel, options) {
    // the editable labels that go underneath the states
    if (typeof newLabel === "undefined") {
      if (this._stateLabel && this._stateLabel.element.filter(":visible").size() > 0) {
        return this._stateLabel.text();
      } else {
        return undefined;
      }
    } else {
      if (!this._stateLabel) {
        this._stateLabel = this.jsav.label(newLabel, {container: this.container.element});
        this._stateLabel.element.addClass("jsavstatelabel");
      } else {
        this._stateLabel.text(newLabel, options);
      }
    }
  };

  fastateproto.mooreOutput = function(newOutput, options) {
    // the editable labels that go underneath the states
    if (typeof newOutput === "undefined") {
      if (this._mooreOutput && this._mooreOutput.element.filter(":visible").size() > 0) {
        return this._mooreOutput.text();
      } else {
        return undefined;
      }
    } else {
      if (!this._mooreOutput) {
        this._mooreOutput = this.jsav.label(newOutput, {container: this.container.element});
        this._mooreOutput.element.addClass("jsavmooreoutput");
      } else {
        this._mooreOutput.text(newOutput, options);
      }
    }
  };

  /*
  Function to update the position of the state label. 
  Must be run whenever nodes are moved.
  */
  fastateproto.stateLabelPositionUpdate = function(options) {
    // update initial arrow position while we're at it
    if (this._initialMarker) {
      var fromPoint = [this.position().left - 10, this.position().top + this.element.outerHeight()/2.0],
          toPoint = [this.position().left, this.position().top + this.element.outerHeight()/2.0];
      this._initialMarker.movePoints([[0].concat(fromPoint), [1].concat(toPoint)], options);
    }
    if(this._stateLabel) {
      var bbox = this.position(),
          lbbox = this._stateLabel.bounds(),
          nWidth = this.element.outerWidth(),
          nHeight = this.element.outerHeight(),
          newTop = bbox.top + nHeight,
          newLeft = bbox.left;
      if (newTop !== lbbox.top || newLeft || lbbox.left) {
        this._stateLabel.css({top: newTop, left: newLeft, width: nWidth}, options);
      }
    }
    if(this._mooreOutput) {
      var bbox = this.position(),
          lbbox = this._mooreOutput.bounds(),
          nWidth = this.element.outerWidth(),
          nHeight = this.element.outerHeight(),
          newTop = bbox.top - 10,
          newLeft = bbox.left + nWidth - 20;
      if (newTop !== lbbox.top || newLeft || lbbox.left) {
        this._mooreOutput.css({top: newTop, left: newLeft, width: nWidth}, options);
      }
    }
  };
  // Function to add the initial state arrow to this state
  fastateproto.addInitialMarker = function(options) {
    var t = this.position().top + this.element.outerHeight()/2.0,
        l2 = this.position().left,
        l1 = l2 - 10;
    this._initialMarker = this.jsav.g.line(l1, t, l2, t, $.extend({"stroke-width": 5, "arrow-end": "block-wide-short"}, options));
  };
  
  var dstypes = JSAV._types.ds;
  dstypes.FiniteAutomaton = FiniteAutomaton;
  dstypes.faState = faState;
  dstypes.faTransition = faTransition;

}(jQuery));


/*
NFA to DFA conversion
Note: g.transitionFunction takes a single node and returns an array of node values
Requires underscore.js
The commented code creates a slideshow of the conversion (buggy).
*/
var convertToDFA = function(jsav, graph, opts) {
  // $('button').hide();
  // $('input').hide();
  // jsav.label("Converted:");
  var g = jsav.ds.fa($.extend({layout: 'automatic'}, opts)),
      alphabet = Object.keys(graph.alphabet),
      startState = graph.initial,
      newStates = [];
  // Get the first converted state
  var first = lambdaClosure([startState.value()], graph).sort().join();
  newStates.push(first);
  var temp = newStates.slice(0);

  //jsav.displayInit();
  first = g.addNode({value: val}); 
  g.makeInitial(first);
  //first.addClass("start");
  g.layout();
  //jsav.step();

  // Repeatedly get next states and apply lambda closure
  while (temp.length > 0) {
    var val = temp.pop(),
        valArr = val.split(',');
    var prev = g.getNodeWithValue(val);
    for (var i = 0; i < alphabet.length; i++) {
      var letter = alphabet[i];
      var next = [];
      for (var j = 0; j < valArr.length; j++) {
        next = _.union(next, lambdaClosure(graph.transitionFunction(graph.getNodeWithValue(valArr[j]), letter), graph));
      }
      var node = next.sort().join();
      if (node) {
        if (!_.contains(newStates, node)) {
          temp.push(node);
          newStates.push(node);
          node = g.addNode({value: node});
        } else {
          node = g.getNodeWithValue(node);
        }
        var edge = g.addEdge(prev, node, {weight: letter});

        //g.layout();
        //jsav.step();
      }
    }
  }
  // add the final markers
  addFinals(g, graph);
  g.layout();
  var nodes = g.nodes();
  for (var next = nodes.next(); next; next = nodes.next()) {
    next.stateLabel(next.value());
    next.stateLabelPositionUpdate();
    //next.hide();
    //next._stateLabel.hide();
  }
  g.updateNodes();
  return g;
  // var edges = g.edges();
  // for (next = edges.next(); next; next = edges.next()) {
  //   next.hide();
  // }
  // graph.hide();

  // jsav.displayInit();
  // var bfs = [],
  //     visited = [];
  // bfs.push(g.initial);
  // visited.push(g.initial);
  // while (bfs.length > 0) {
  //   var cur = bfs.shift();
  //   cur.show();
  //   cur._stateLabel.show();
  //   var successors = cur.neighbors();
  //   for (var next = successors.next(); next; next = successors.next()) {
  //     if (!_.contains(visited, next)) {
  //       bfs.push(next);
  //       visited.push(next);
  //     }
  //   }
  //   jsav.step();
  // }
  // for (var i = 0; i < visited.length; i++) {
  //   var outgoing = visited[i].getOutgoing();
  //   for (var j = 0; j < outgoing.length; j++) {
  //     outgoing[j].show();
  //   }
  //   jsav.step();
  // }
  // jsav.recorded();
};
// Function to add final markers to the resulting DFA
var addFinals = function(g1, g2) {
  var nodes = g1.nodes();
  for (var next = nodes.next(); next; next = nodes.next()) {
    var values = next.value().split(',');
    for (var i = 0; i < values.length; i++) {
      if (g2.getNodeWithValue(values[i]).hasClass('final')) {
        next.addClass('final');
        break;
      }
    }
  }
};
/*
Function to apply lambda closure.
Takes in an array of values (state names), returns an array of values
Only used in NFA to DFA conversion.
There's a different lambda closure function used for nondeterministic traversal in certain tests.
*/
var lambdaClosure = function(input, graph) {
  var l = "\&lambda;",
      arr = [];
  for (var i = 0; i < input.length; i++) {
    arr.push(input[i]);
    var next = graph.transitionFunction(graph.getNodeWithValue(input[i]), l);
    arr = _.union(arr, next);
  }
  var temp = arr.slice(0);
  while (temp.length > 0) {
    var val = temp.pop(),
        next = graph.transitionFunction(graph.getNodeWithValue(val), l);
    next = _.difference(next, arr);
    arr = _.union(arr, next);
    temp = _.union(temp, next);

  }
  return arr;
};

/*
DFA minimization.
UNUSED AND INCOMPLETE.
See minimizationTest.html for interactive DFA minimization, which features an
algorithm for automatic splitting of minimization tree nodes.
However, automatic minimization of the whole DFA is not yet implemented.
*/
var minimize = function (graph) {
  // this assumes all of the edges are in the alphabet
  // remove all unreachable states
  var reachable = [graph.initial],
      nodes = graph.nodes();
  dfs(reachable, graph.initial);
  for (var next = nodes.next(); next; next = nodes.next()) {
    if ($.inArray(next, reachable) < 0) {
      graph.removeNode(next);
    }
  }
  // incomplete
};
// helper depth-first search to find connected component
var dfs = function (visited, node, options) {
  var successors = node.neighbors();
  for (var next = successors.next(); next; next = successors.next()) {
    if (!_.contains(visited, next)) {
      visited.push(next);
      dfs(visited, next);
    }
  }
};

//===========================================
/*
Turing Machine class
Holds the tape as a linked list and keeps track of the current position
as well as the beginning of the string.
*/
var Tape = function (str) {
  // if the tape is initialized using a string, writes the string to the new tape
  if (typeof str === 'string') {
    this.head = makeTape(str);
    this.current = this.head.right()[0];  // the current symbol
    this.currentIndex = 0;                // the current position
  } 
  // else, assume that a Tape object was passed in, and create a copy of it
  else {
    var copy = copyTape(str);
    this.head = copy[0];
    this.current = copy[1];
    this.currentIndex = str.currentIndex;
  }
  // Returns the string written on the tape starting from the head of the string, including empty squares
  this.toString = function() {
    var temp = this.head,
        ret = "";
    while (temp) {
      ret += temp.value();
      temp = temp._right;
    }
    return ret;
  };
  // Move the tape left and set the new head of the string
  this.left = function() {
    var next = this.current.left();
    this.current = next[0];
    this.currentIndex--;
    if (next[1]) {
      this.head = next[1];
    }
    return this.current;
  };
  // Move the tape right
  this.right = function() {
    var next = this.current.right();
    this.current = next[0];
    this.currentIndex++;
    return this.current;
  };
  // Write to the current position
  this.value = function (newVal) {
    return this.current.value(newVal);
  };
  // Move the tape and read the symbol
  this.move = function (str) {
    if (str === "L") {
      return this.left();
    } else if (str === "R") {
      return this.right();
    } else if (str === "S") {
      return this.current;
    }
  };
};
// Tape linked list node
var TapeNode = function (left, right, val) {
  this._left = left;
  this._right = right;
  if (typeof val === "undefined") {
    //this._value = "";
    this._value = String.fromCharCode(9633);
  } else {
    this._value = val;
  }
  // Return the value written at this position or write a symbol to this position
  this.value = function (newVal) {
    if (typeof newVal === "undefined") {
      return this._value;
    } else {
      this._value = newVal;
      return this._value;
    }
  };
  /*
  Traverse left or right and read. 
  If can't, create empty tape nodes. 
  Returns an array containing the read symbol and the new head of the string
  */
  this.left = function (n) {
    if (this._left) {
      return [this._left];
    } else {
      if (!n) { n = 10; }
      return extendTape("left", this, n);
    }
  }
  this.right = function (n) {
    if (this._right) {
      return [this._right];
    } else {
      if (!n) { n = 10; }
      return extendTape("right", this, n);
    }
  }
};
// Function to initialize the linked list from an inputted string
var makeTape = function (str) {
  var prev = new TapeNode(null, null);
  var head = prev;
  for (var i = 0; i < str.length; i++) {
    var temp = new TapeNode(prev, null, str.charAt(i));
    prev._right = temp;
    prev = temp;
  }
  return head;
};
// Function to initialize the linked list by copying the inputted tape
var copyTape = function (t) {
  var prev = new TapeNode(null, null, t.current.value());
  var cur = prev;
  var temp = t.current._right;
  while (temp) {
    var next = new TapeNode(prev, null, temp.value());
    prev._right = next;
    prev = next;
    temp = temp._right;
  }
  prev = cur;
  temp = t.current;
  while (temp._left) {
    var next = new TapeNode(null, prev, temp._left.value());
    prev._left = next;
    prev = next;
    temp = temp._left;
  }
  return [temp, cur];
};
/*
Creates n empty tape nodes to the beginning or end of the tape 
and returns the read symbol and the leftmost/rightmost new node
*/
var extendTape = function (dir, node, n) {
  if (dir === 'left') {
    var next = new TapeNode(null, node),
        prev = next;
    node._left = next;
    for (var i = 0; i < n - 1; i++) {
      var temp = new TapeNode(null, prev);
      prev._left = temp;
      prev = temp;
    }
    return [next, prev];
  }
  if (dir === 'right') {
    var next = new TapeNode(node, null),
        prev = next;
    node._right = next;
    for (var i = 0; i < n - 1; i++) {
      var temp = new TapeNode(prev, null);
      prev._right = temp;
      prev = temp;
    }
    return [next, prev];
  }
};
/*
Function to get the tape alphabet.
Should maybe be added as a FA method.
*/
var getTapeAlphabet = function (graph) {
  var alphabet = [];
  var edges = graph.edges();
  var w;
  for (var next = edges.next(); next; next = edges.next()) {
    w = next.weight();
    w = w.split('<br>');
    for (var i = 0; i < w.length; i++) {
      var t = w[i].split('|');
      for (var k = 0; k < t.length; k++) {
        var letter1 = t[k].split(':')[0],
            letter2 = t[k].split(':')[1],
            letters;
        if (letter1 !== graph.emptystring && letter2 !== graph.emptystring) {
          letters = letter1.split('').concat(letter2.split(''));
        } else if (letter1 !== graph.emptystring) {
          letters = letter1.split('');
        } else if (letter2 !== graph.emptystring) {
          letters = letter2.split('');
        } else {
          break;
        }
        for (var j = 0; j < letters.length; j++) {
          if (letters[j] !== graph.emptystring && alphabet.indexOf(letters[j]) === -1){
            alphabet.push(letters[j]);
          }
        }
      }
    }
  }
  return alphabet;
};
/*
Function to get the tape "viewport".
This returns a string showing the current position and the seven
symbols to the left and right of the current position.
The current position is highlighted as well.
*/
var viewTape = function (t) {
  var arr = new Array(15);    // arbitrary size
  for (var i = 0; i < 15; i++) {
    arr[i] = String.fromCharCode(9633);;
  }
  i = 7;
  var temp = t.current;
  while (temp) {
    if (i < 0) {break;}
    arr[i] = temp.value();
    i--;
    temp = temp._left;
  }
  i = 7;
  temp = t.current;
  while (temp) {
    if (i >= arr.length) {break;}
    arr[i] = temp.value();
    i++;
    temp = temp._right;
  }
  var view = "|";
  for (var i = 0; i < arr.length; i++) {
    if (i === 7) {
      view+="<mark>" + arr[i] + "</mark>";
    } else {
      view+=arr[i];
    }
  }
  view+="|";
  return view;
};
/*
Function to get the tape output, the string made from the current position up to,
but not including, the first empty square found.
*/
var produceOutput = function (t) {
  var temp = t.current,
      output = "";
  while (temp && temp.value() !== String.fromCharCode(9633)) {
    output += temp.value();
    temp = temp._right;
  }
  return output;
};

