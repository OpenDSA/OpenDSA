/*
   Automaton module.
   An extension to the JFLAP library.
   This will be the base class for all models used in OpenFLAP
 */
var lambda = String.fromCharCode(955),
  epsilon = String.fromCharCode(949),
  emptystring = lambda,
  menuSelected; // stores the node that's right clicked on


(function ($) {
  "use strict";
  if (typeof JSAV === "undefined") {
    console.log("Error!!! No JSAV lib!!!");
  }
  var Edge = JSAV._types.ds.Edge;
  JSAV.ext.ds.automaton = function (options) {
    var opts = $.extend(true, { visible: true, autoresize: true }, options);
    return new Automaton(this, opts);
  };

  /*
     Automaton class, used for DFAs/NFAs, PDAs, Mealy/Moore machines, and Turing Machines.
     Extended from the JSAV graph class.
   */
  var Automaton = function (jsav, options) {
    this.init(jsav, options);
  };
  JSAV.utils.extend(Automaton, JSAV._types.ds.Graph);
  var automatonproto = Automaton.prototype;
  window.Automaton = Automaton;
  automatonproto.init = function (jsav, options) {
    this._nodes = [];
    this._edges = [];
    this._alledges = null;
    this.isDraggable = true;
    this.alphabet = {}; // input alphabet
    this.jsav = jsav;
    this.initial; // initial state
    this.first; // first selected node, used for creating edges
    this.selected; // selected node, used for right click, delete etc
    this.undoStack = [];
    this.redoStack = [];
    this.editable = options.editable;
    this.options = $.extend({
      visible: true,
      nodegap: 40,
      autoresize: true,
      width: 400,
      height: 200,
      directed: true,
      center: true,
      arcoffset: 50,
      emptystring: String.fromCharCode(955)
    }, options);
    //this.options = $.extend({directed: true}, options);
    this.emptystring = this.options.emptystring;
    this.shorthand = false;
    var el = this.options.element || $("<div/>");
    el.addClass("jsavgraph jsavfiniteautomaton");
    for (var key in this.options) {
      var val = this.options[key];
      if (this.options.hasOwnProperty(key) && typeof (val) === "string" || typeof (val) === "number" || typeof (val) === "boolean") {
        el.attr("data-" + key, val);
      }
    }
    if (!this.options.element) {
      $(jsav.canvas).append(el);
    }
    this.element = el;
    el.attr({ "id": this.id() }).width(this.options.width).height(this.options.height);
    if (this.options.autoresize) {
      el.addClass("jsavautoresize");
    }
    if (this.options.center) {
      el.addClass("jsavcenter");
    }
    this.constructors = $.extend({
      Graph: Automaton,
      Node: State,
      Edge: Transition
    }, this.options.constructors);
    JSAV.utils._helpers.handlePosition(this);
    JSAV.utils._helpers.handleVisibility(this, this.options);
    var t = this;
    $(document).click(function () {
      t.hideRMenu();
    });

    //$("#rmenu").load("../../AV/OpenFLAP/rmenu.html");
    //$("#rmenu").hide();

    /**************** Add ability to run multiple inputs ***************************/
    // Bind opening of modal to a button
    $('#openMultiRun').click(function () {
      $('#multiModal').show();
    });
    $("#multiRun").load("multiRun.html"); // Load Info from html file
    $("#multiModal").hide(); // Hide it automatically
  };

  /**
   * Add event listener to the button in the modal that closes the modal
   */
  $(document).on("click", '#closeModal', function () {
    $('#multiModal').hide();
  });
  /**
   * Add event listener To the remove button of the top row
   */
  $(document).on("click", '#removeTopButton', function () {
    var tbody = $('#multiInputTable > table > tbody');
    var rows = tbody.find('tr');
    if (rows.length > 3) {
      $(this).parents('tr').detach();
    }
  });

  /**
   * Add event listener To the remove button of the lower rows
   */
  $(document).on("click", '#removeButton', function () {
    var tbody = $('#multiInputTable > table > tbody');
    var rows = tbody.find('tr');
    if (rows.length > 3) {
      $(this).parents('tr').detach();
    }
  });

  /**
   * Add event listener To the add row button
   */
  $(document).on("click", '#addRowButton', function () {
    var $TABLE = $('#multiInputTable');
    var $clone = $TABLE.find('tr.hide').clone(true).removeClass('hide table-line');
    $TABLE.find('table').append($clone);
  });
  // IN PROGRESS.
  /*$(document).on("click", '#runMultipleInputsButton', function(){
    if (!this.initial) {
    alert('Please define an initial state');
    return;
    }
    console.log('Past It')
    var tbody = $('#multiInputTable > table > tbody');
    var rows = tbody.find('tr');
    if (rows === null) {
    return;
    }

    for (var i = 1; i < rows.length; i++) {
      var currInputString = rows[i].cells[0].innerHTML;
      console.log(currInputString);
      var result = this.traverseOneInput(currInputString);
      if (result){
        rows[i].cells[1].innerHTML = "Accepted"
      }
      else {
        rows[i].cells[1].innerHTML = "Rejected"
      }
      if (i >= 50) break;
    }
  });*/
  /******************* End Add ability to run multiple inputs ******************************/

  JSAV.utils._events._addEventSupport(automatonproto);

  automatonproto.initFromParsedJSONSource = function (source, ratio) {
    var nodes = this.nodes();
    if (!ratio) {
      ratio = 1;
    }
    for (var next = nodes.next(); next; next = nodes.next()) {
      this.removeNode(next);
    }
    for (var i = 0; i < source.nodes.length; i++) {
      var nodeValue = (source.nodes[i].nodeValue) ? source.nodes[i].nodeValue : 'q' + i;
      var node = this.addNode({ value: nodeValue }),
        offset = $('.jsavgraph').offset(),
        offset2 = parseInt($('.jsavgraph').css('border-width'), 10);
      var topOffset = parseInt(source.nodes[i].top) + offset.top + offset2;
      var leftOffset = (parseInt(source.nodes[i].left) + offset2) * ratio + offset.left;
      if (leftOffset > 550 && ratio == 0.5) {
        leftOffset = 550;
      }
      // Make the node initial if it is the initial node.
      if (source.nodes[i].i) {
        this.makeInitial(node);
        if (leftOffset < 25 && ratio == 0.5) {
          leftOffset = 25;
        }
      }
      // Make the node a final state if it is a final state.
      if (source.nodes[i].f) {
        this.makeFinal(node);
      }
      // Expand the graph lengthways if we are loading it from a smaller window (conversionExersice.html / minimizationTest.html).
      $(node.element).offset({ top: topOffset, left: leftOffset });

      // Add the state label (if applicable) and update its position on the graph.
      node.stateLabel(source.nodes[i].stateLabel);
      node.stateLabelPositionUpdate();
    }
    // Add the JSON edges to the graph.
    for (var i = 0; i < source.edges.length; i++) {
      if (source.edges[i].weight !== undefined) {
        // Any instances of lambda or epsilon need to be converted from HTML format to JS format.
        var w = delambdafy(source.edges[i].weight);
        w = checkEmptyString(w);
        var edge = this.addEdge(this.nodes()[source.edges[i].start], this.nodes()[source.edges[i].end], { weight: w });
      } else {
        var edge = this.addEdge(this.nodes()[source.edges[i].start], this.nodes()[source.edges[i].end]);
      }
      edge.layout();
    }
  }

  /*
     Method used to add a new node to the FA.
     Unlike a graph, you cannot define the node's name yourself.
     Do not change the name manually! It is used as an ID.
   */
  automatonproto.addNode = function (options) {
    var value;
    if (!options || !options.value) {
      value = "q" + this._nodes.length;
    } else {
      value = options.value;
    }
    var newNode = this.newNode(value, options);
    newNode.automaton = this;
      newNode.element.draggable({
        start: dragStart,
        stop: dragStop,
        drag: dragging,
        containment: "parent"
      });
      if (!this.isDraggable) {
        newNode.element.draggable('disable');
      } else {
        newNode.element.draggable('enable');
      }
    if (this.editable) {
      newNode.element.contextmenu(function (e) {
        newNode.showMenu(e);
      });
    }
    return newNode;
  };

  automatonproto.getTransitionsFromState = function (node) {
    var neighbors = node.neighbors();
    var re = [];
    neighbors.foreach(function (neighbor, index, nbrs) {
      var edge = this.getEdge(node, neighbor);
      re.push(edge);
    });
    return re;
  }

  automatonproto.enableDragging = function () {
    this.isDraggable = true;
    for (var i = this._nodes.length; i--;) {
      this._nodes[i].element.draggable('enable');
    }
  };

  automatonproto.disableDragging = function () {
    this.isDraggable = false;
    for (var i = 0; i < this._nodes.length; i++) {
      this._nodes[i].element.draggable('disable');
    }
  };

  // Method to remove the given node
  automatonproto.removeNode = function (node, options) {
    var nodeIndex = this._nodes.indexOf(node);
    if (nodeIndex === -1) { return; } // no such node

    this.removeInitial(node); // remove initial marker if necessary

    // remove all edges connected to this node
    var allEdges = this.edges();
    for (var i = allEdges.length; i--;) {
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
    if (node._stateLabel) { node._stateLabel.hide(options); }
    if (node._mooreOutput) { node._mooreOutput.hide(options); }
    node.hide(options);
    // renumber nodes
    this.updateNodes();
    // return this for chaining
    return this;
  };

  // Method to create a new node (.addNode calls this)
  automatonproto.newNode = function (value, options) {
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
  automatonproto.addEdge = function (fromNode, toNode, options) {
    // assumes a weight is always given
    if (options.weight === "" || options.weight == lambda) {
      options.weight = this.emptystring;
    }
    if (this.hasEdge(fromNode, toNode)) { // if an edge already exists update it
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
    var edge = new Transition(this.jsav, fromNode, toNode, opts),
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

    if (edge) {
      var otherEdge = edge.endnode.getOutgoing();
      for (var i = 0; i < otherEdge.length; i++) {
        if (otherEdge[i].endnode.equals(edge.startnode) && !otherEdge[i].shift && !edge.shift && !otherEdge[i].endnode.equals(otherEdge[i].startnode)) //It the other edge is going to the same node
        {
          otherEdge[i].shift = true;
          edge.shift = true;

          edge.shiftedTo = -1;
          otherEdge[i].shiftedTo = 1;
          otherEdge[i].layout();
          break;
        }
      }
      // Acquire each distinct edge transition.
      var weight = edge.weight().split('<br>');
      var transitions = [];
      for (var i = 0; i < weight.length; i++) {
        // Ensure there are no repeated edge transitions.
        if (transitions.indexOf(weight[i]) == -1) {
          transitions.push(weight[i]);
        }
      }
      // Update edge weight to erase any duplicate edge transitions.
      edge.weight(transitions.join("<br>"));
      edge.layout();
      this.updateAlphabet();
      return edge;
    } else {
      // This should never happen, but it's here just in case (to prevent the program from simply crashing).
      return graph.getEdge(fromNode, toNode);
    }
  };

  // Function to delete the given edge. Can pass in an edge or two nodes.
  automatonproto.removeEdge = function (fNode, tNode, options) {
    var edge,
      fromNode,
      toNode,
      opts;
    // if first argument is an edge object
    if (fNode.constructor === JSAV._types.ds.Transition) {
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
    this.updateAlphabet();
  };

  // Function to make a state initial.
  automatonproto.makeInitial = function (node, options) {
    node.addClass("start");
    this.initial = node;
    node.addInitialMarker($.extend({ container: this }, this.options));
  };

  // Function to find and remove the initial state marker.
  automatonproto.removeInitial = function (node, options) {
    if (node.equals(this.initial)) {
      node.removeClass('start');
      this.initial = undefined;
      if (node._initialMarker) {
        node._initialMarker.element.remove();
        node._initialMarker = undefined;
      }
    }
  };

  automatonproto.makeFinal = function (node) {
    node.addClass("final");
  }

  automatonproto.removeFinal = function (node) {
    node.removeClass("final");
  }

  automatonproto.setShorthand = function (setBoolean) {
    this.shorthand = setBoolean;
  }

  // return final states as [fastate]
  automatonproto.getFinals = function () {
    var nodes = this.nodes(),
      finals = [];
    for (var node = nodes.next(); node; node = nodes.next()) {
      if (node.hasClass('final')) {
        finals.push(node);
      }
    }
    return finals;
  }

  //update all edge label positions
  automatonproto.updateEdgePositions = function () {
    var edges = this.edges();
    for (var edge = edges.next(); edge; edge = edges.next()) {
      edge.layout();
    }
  }

  /*
     Function to update the input alphabet.
     Returns an object.
     Currently assumes every character is a unique input symbol.
   */
  automatonproto.updateAlphabet = function () {
    var alphabet = {};
    var edges = this.edges();
    var w;
    for (var next = edges.next(); next; next = edges.next()) {
      w = next.weight();
      w = w.split('<br>');
      for (var i = 0; i < w.length; i++) {
        var t = w[i].split('|');
        for (var j = 0; j < t.length; j++) {
          t[j] = toColonForm(t[j]);
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
     Function to update the names of the nodes.
     Used to renumber nodes when one is deleted.
   */
  automatonproto.updateNodes = function () {
    for (var i = 0; i < this._nodes.length; i++) {
      this._nodes[i].value('q' + i);
    }
  };
  // Function to find a node using its name.
  automatonproto.getNodeWithValue = function (value) {
    var nodes = this.nodes();
    for (var next = nodes.next(); next; next = nodes.next()) {
      if (next.value() === value) {
        return next;
      }
    }
  };

  // unused, only deterministic
  automatonproto.takePushdownTransition = function (nodeFrom, letter, options) {
    var edges = nodeFrom.getOutgoing();

    for (var i = 0; i < edges.length; i++) {
      var edge = edges[i],
        w = edge.weight().split('<br>');
      for (var j = 0; j < w.length; j++) {
        var t = w[j].split(':');
        if (t[0] !== letter) { continue; }
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
            if (t[2] !== this.emptystring) {
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
          if (t[2] !== this.emptystring) {
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
  automatonproto.transitionFunction = function (nodeFrom, letter, options) {
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
  automatonproto.transitionFunctionMultiple = function (nodeFrom, letter, options) {
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
  automatonproto.inputTransitionFunction = function (nodeFrom, letter, options) {
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
  automatonproto.inputTransitionFunctionMultiple = function (nodeFrom, letter, options) {
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
  automatonproto.traverse = function (state, letter, options) {
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

  automatonproto.runMultipleInputs = function () {
    if (!this.initial) {
      alert('Please define an initial state');
      return;
    }
    // console.log('Past It')
    var tbody = $('#multiInputTable > table > tbody');
    var rows = tbody.find('tr');
    if (rows === null) {
      return;
    }

    for (var i = 1; i < rows.length; i++) {
      var currInputString = rows[i].cells[0].innerHTML;
      var result = this.traverseOneInput(currInputString);
      if (result) {
        rows[i].cells[1].innerHTML = "Accepted"
      } else {
        rows[i].cells[1].innerHTML = "Rejected"
      }
      if (i >= 50) break;
    }
  }

  /*
     Function to lay out the FA.
     Uses JFLAP's graph layout algorithms; an FA layout algorithm needs to be written.
   */
  automatonproto.layout = function (options) {
    if (options && options.layout) {
      var layoutAlg = options.layout;
    } else {
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
  //Layout algorithms
  /*
  * GEM layout algorithm
  */
  automatonproto.gemLayoutAlg = function (isovertices) {
    if (isovertices == null) {
      isovertices = new Set();
    }
    var Tmax = 256.0;
    var Tmin = 3.0;
    var OPTIMAL_EDGE_LENGTH = 100.0;
    var GRAVITATIONAL_CONSTANT = 1.0 / 16.0;
    var vArray = this.nodes();
    var Rmax = 120 * (vArray.length - isovertices.size);
    var Tglobal = Tmin + 1.0;
    // Determine an optimal edge length. With isovertices, we
    // want optimal length to be about average of existing edges
    // that will remain unchanged due to isovertex status.
    var optimalEdgeLength = OPTIMAL_EDGE_LENGTH;
    if (isovertices.size > 0) {
      var iso = Array.from(isovertices);
      var count = 0;
      var lengths = 0.0;
      for (var i = 0; i < iso.length; i++) {
        for (var j = i + 1; j < iso.length; j++) {
          if (!(this.hasEdge(iso[i], iso[j]) || this.hasEdge(iso[j], iso[i]))) {
            continue;
          } 
          var leftSquare = Math.pow(iso[i].element.position().left - iso[j].element.position().left, 2);
          var topSquare = Math.pow(iso[i].element.position().top - iso[j].element.position().top, 2);
          var distance = Math.sqrt(leftSquare + topSquare);
          lengths += distance;
          count++;
        }
      }
      if (count > 0) {
        optimalEdgeLength = lengths / count;
      }
    }
    // The barycenter of the graph.
    var c = [0.0, 0.0];

    // Initialize the record for each vertex.
    var records = new Map();
    for (var i = 0; i < vArray.length; i++) {
      var temperature = Tmin;
      var skew = 0.0;
      var r = [[0, 0], [0.0, 0.0], temperature, skew];
      r[0] = [vArray[i].element.position().left, vArray[i].element.position().top];
      // The barycenter will be updated.
      c[0] += r[0][0];
      c[1] += r[0][1];
      records.set(vArray[i], r);
    }

    // Iterate until done.
    var vertices = [];
    for (var i = 0; i < Rmax && Tglobal > Tmin; i++) {
      if (vertices.length == 0) {
        vertices = this.nodes();
        if (vertices.length == 0) {
          return;
        }
      }

      // Choose a vertex V to update.
      var index = Math.floor(Math.random() * vertices.length);
      var vertex = vertices[index];
      vertices.splice(index, 1);
      var record = records.get(vertex);
      var point = [vertex.element.position().left, vertex.element.position().top];

      // Compute the impulse of V.
      var Theta = this.degree(this.nodes(), vertex);
      Theta *= 1.0 + Theta / 2.0;
      var p = [(c[0] / this.nodeCount() - point[0]) * GRAVITATIONAL_CONSTANT * Theta, (c[1] / this.nodeCount() - point[1]) * GRAVITATIONAL_CONSTANT * Theta]; // Attraction to BC.
      // Random disturbance.
      p[0] += Math.random() * 10.0 - 5.0;
      p[1] += Math.random() * 10.0 - 5.0;

      // Forces exerted by other nodes.
      for (var j = 0; j < vArray.length; j++) {
        if (vArray[j] == vertex) {
          continue;
        }
        var otherPoint = [vArray[j].element.position().left, vArray[j].element.position().top];
        var delta = [point[0] - otherPoint[0], point[1] - otherPoint[1]];
        var D2 = delta[0] * delta[0] + delta[1] * delta[1];
        var O2 = optimalEdgeLength * optimalEdgeLength;
        if (delta[0] != 0.0 || delta[1] != 0.0) {
          for (var k = 0; k < 2; k++) {
            p[k] += delta[k] * O2 / D2;
          }
        }
        if (!(this.hasEdge(vertex, vArray[j]) || this.hasEdge(vArray[j], vertex))) {
          continue;
        }
        for (var k = 0; k < 2; k++) {
          p[k] -= delta[k] * D2 / (O2 * Theta);
        }
      }
      // Adjust the position and temperature.
      if (p[0] != 0.0 || p[1] != 0.0) {
        var absp = Math.sqrt(Math.abs(p[0] * p[0] + p[1] * p[1]));
        for (var j = 0; j < 2; j++) {
          p[j] *= record[2] / absp;
        }
        // update the position!
        vertex.moveTo(point[0] + p[0], point[1] + p[1]);
        // update the barycenter
        c[0] += p[0];
        c[1] += p[1];
      }
    }
    //Finally, shift all points onto the screen.
    this.shiftOntoScreen(400, 20, true);
    var nodes = this.nodes();
    // Update the position of the state label for each node
    for (var next = nodes.next(); next; next = nodes.next()) {
      next.stateLabelPositionUpdate();
    }
    var edges = this.edges();
    var edge;
    while (edges.hasNext()) {
      edge = edges.next();
      edge.layout();
    }
  };
  /*
  * This algorithm assigns all vertices to random points in the graph, while applying a
  * little effort taken to minimize edge intersections.
  */
  automatonproto.randomLayoutAlg = function (options) {
    var vertices = this.nodes();
    if (vertices.length == 0) {
      return;
    }
    //Then, generate random points and assign the vertices to a
    var points = [];
    //VertexChain to minimize a few edge collisions
    var chain = [];
    this.assignPointsAndVertices(chain, points, vertices);
    //Then minimize vertex overlap.
    this.lessenVertexOverlap(points, vertices);
    //Next, find a more optimal point order with which to match the points to the vertices.
    points = this.findCorrectPointOrder(points);

    //Finally, move all vertices to their corresponding points.  Wrap up the algorithm by 
    //making sure all points are on the screen.
    for (var i = 0; i<points.length; i++) {
      chain[i].moveTo(points[i][0], points[i][1]);
    }

    this.shiftOntoScreen(400, 20, true);
    var nodes = this.nodes();
    // Update the position of the state label for each node
    for (var next = nodes.next(); next; next = nodes.next()) {
      next.stateLabelPositionUpdate();
    }
    var edges = this.edges();
    var edge;
    while (edges.hasNext()) {
      edge = edges.next();
      edge.layout();
    }

  };
  /**
  * This method shifts the random points away from each other, if needed, in order to minimize
  * vertex overlap.
  */
  automatonproto.findCorrectPointOrder = function(points) {
    var notProcessedPoints, newPointOrder;
    var current, anchor, minPoint;
    var currentTheta, minTheta, anchorTheta;

    anchor = [0, 0];
    anchorTheta = 0;
    newPointOrder = [];
    notProcessedPoints = [];
    for (var i = 0; i < points.length; i++) {
      notProcessedPoints.push(points[i]);
    }

    //Find the angle of all points relative to the last point placed and "anchorTheta".  Then place
    //the point with the minimum angle.  "anchorTheta" will slowly rotate around a circle counterclockwise.
    while (notProcessedPoints.length > 0) {
      minPoint = notProcessedPoints[0];
      minTheta = 2*Math.PI + 1;
      for (var j = 0; j < notProcessedPoints.length; j++) {
        current = notProcessedPoints[j];

        if (current[1] != anchor[1]) {
          currentTheta = Math.atan((current[0] - anchor[0]) / (current[1] - anchor[1]));
        }
        else if (current[0] > anchor[0]) {
          currentTheta = Math.PI / 2;
        }
        else {
          currentTheta = Math.PI / (-2);
        }
        /* atan -> -pi/2...pi/2.  Adding 4pi to the currentTheta, subtracting the anchorTheta, and taking
        * the remainder when dividing by pi works for all four quadrants the angle could be in.
        * The object is to find the smallest absolute polar theta of the current point from the anchor
        * which is greater than, or next in a counterclockwise traversal, from the anchorTheta.
        */
        currentTheta = (currentTheta + 4*Math.PI - anchorTheta) % (Math.PI);
        if (currentTheta < minTheta) {
          minTheta = currentTheta;
          minPoint = current;
        }
      }
      anchor = minPoint;
      anchorTheta = (anchorTheta + minTheta) % (2*Math.PI);
      notProcessedPoints.splice(notProcessedPoints.indexOf(minPoint), 1);
      newPointOrder.push(minPoint);
    }
    points = newPointOrder;
    return points;
  };
  /**
  * This method creates random points and assigns all movable vertices to the VertexChain
  */
  automatonproto.assignPointsAndVertices = function(chain, points, vertices) {
    var x, y;
    var random = Math.random();
    for (var i = 0; i < vertices.length; i++) {
      x = Math.random() * (900 - 30 * 2);
      y = Math.random() * (900 - 30 * 2);
      //x = random * (30 - 60);
      //y = random * (30 - 60);
      points.push([x, y]);
      this.addVertex(chain, vertices[i]);
    }
  };
  /**
  * This method shifts the random points away from each other, if needed, in order to minimize
  * vertex overlap.
  */
  automatonproto.lessenVertexOverlap = function(points, vertices) {
    var point;
    //First, sort the vertices by their x and y values
    var xOrder = [];
    var yOrder = [];

    for (var i = 0; i < points.length; i++) {
      xOrder.push(points[i]);
      yOrder.push(points[i]);
    }
    xOrder.sort(function(a, b) {
      var ax = a[0];
      var bx = b[0];
      return bx - ax;
    });
    yOrder.sort(function(a, b) {
      var ax = a[0];
      var bx = b[0];
      return bx - ax;
    });
    //Then, shift over any points that need to be shifted over
    var xBuffer, yBuffer, xDiff, yDiff;
    xBuffer = 30 + 30;
    yBuffer = 30 + 30;
    for (var i = 0; i<vertices.length - 1; i++) {
      xDiff = (xOrder[i][0] - xOrder[i+1][0]);
      yDiff = (xOrder[i][1] - xOrder[i+1][1]);
      if (xDiff < xBuffer && yDiff < yBuffer) {
        for (var j = i; j>=0; j--) {
          point = xOrder[j];
          point[0] = point[0] + xBuffer - xDiff;
          point[1] = point[1];
        }
      }
      xDiff = yOrder[i][0] - yOrder[i+1][0];
      yDiff = yOrder[i][1] - yOrder[i+1][1];
      if (xDiff < xBuffer && yDiff < yBuffer) {
        for (var j = i; j>=0; j--) {
          point = yOrder[j];
          point[0] = point[0];
          point[1] = point[1] + yBuffer - yDiff;
        }
      }
    }

  };
  /*
  * Two Circle layout algorithm
  */
  automatonproto.twoCircleLayoutAlg = function(options) {
    //First, initialize classwide variables.
    var innerCircle = [];
    var outerCircle = [];
    var vertices = this.nodes();
    if (vertices.length == 0) {
      return;
    }
    
    //Put in the inner circle all vertices with degree >= 3 and all those pointing to two members of the inner circle.
    this.assignToCircles(vertices, innerCircle, outerCircle);

    //console.log(innerCircle.length);
    //console.log(outerCircle.length);
    //Create inner circle chain and place it in graph
    var innerCircleChain = [];
    for (var i = 0; i < innerCircle.length; i++) {
      this.addVertex(innerCircleChain, innerCircle[i]);
    }
    var radius = this.layoutInCircle(innerCircleChain, 0, Math.PI, 2*Math.PI);
    innerCircle = innerCircleChain;

    //Create outer circle chains and place them in the graph.
    if (outerCircle.length > 0) {
      var lengthOfChain = innerCircle.length;
      var outerCircleChains = this.createOuterCircleChains(innerCircle, outerCircle, lengthOfChain);
      this.shuffleOuterChains(outerCircleChains, lengthOfChain);

      var span, division;
      division = (2*Math.PI / lengthOfChain);
      span = division * 4/5;
      for (var i = 0; i < lengthOfChain; i++) {
        this.layoutInCircle(outerCircleChains[i], radius, division*i, span);
      }
    }

    //Finally, adjust the points so that they can be presented on the screen.
    for (var i=0; i<vertices.length; i++) {
      var r = vertices[i].element.position().left;      
      var theta = vertices[i].element.position().top;
      vertices[i].moveTo(Math.cos(theta) * r, Math.sin(theta) * r);
    }

    this.shiftOntoScreen(900, 30, true);
    var nodes = this.nodes();
    // Update the position of the state label for each node
    for (var next = nodes.next(); next; next = nodes.next()) {
      next.stateLabelPositionUpdate();
    }
    var edges = this.edges();
    var edge;
    while (edges.hasNext()) {
      edge = edges.next();
      edge.layout();
    }
  };

  /**
  * Shuffles the order of vertices in the outer circle <code>CircleChains</code> in order to minimize overlapping
  * transitions between vertices in two different <code>CircleChains</code>.  If a vertex from one <code>CircleChain
  * </code> has an edge to another vertex in an adjacent <code>CircleChain</code>, the two vertices will be moved to 
  * their <code>CircleChain's</code> common border, and whatever other vertices to which the two vertices are linked 
  * will be adjusted accordingly. 
  */
  automatonproto.shuffleOuterChains = function(outerCircleChains, lengthOfChain) {
    var currentChain;
    var nextChain;
    for (var i = 0; i < lengthOfChain; i++) {
      currentChain = outerCircleChains[i];
      if (i < lengthOfChain - 1) {
        nextChain = outerCircleChains[i+1];
      }
      else {
        nextChain = outerCircleChains[0];
      }
      this.alignTwoChains(currentChain, nextChain);
    }
  };

  /**
  * Divides the vertices that are in the outer circle into <code>VertexChains</code>, which correspond to an inner circle
  * vertex.  Outer circle vertices are assigned to a specific <code>VertexChain</code> according to the following priorities. 
  * <br><br> 1. Whether they link to an inner circle vertex <br> 2.  Whether they link to an existing outer circle item <br>
  * 3.  If they link to two outer circle items in different <code>VertexChains</code> or have a degree = 0, they are
  * assigned to the smaller of the two <code>VertexChains</code> or the smallest existing <code>VertexChain</code>, 
  * respectively.
  */
  automatonproto.createOuterCircleChains = function(innerCircle, outerCircle, lengthOfChain) {
    var outerCircleChains = [];
    //var lengthOfChain = innerCircle.length;
    for (var m = 0; m < lengthOfChain; m++) {
      outerCircleChains[m] = [];
    }
    var chainIndex = [];
    var lengthOfIndex = outerCircle.length;

    for (var i = 0; i < outerCircle.length; i++) {
      chainIndex[i] = -1;
      for (var j = 0; j < innerCircle.length; j++) {
        if (this.hasEdge(outerCircle[i], innerCircle[j]) || this.hasEdge(innerCircle[j], outerCircle[i])) {
          this.addVertex(outerCircleChains[j], outerCircle[i]);
          chainIndex[i] = j;
        }
      }
    }

    //Next, if a vertex is linked to an outercircle item, add it; if to items in two different chains, add
    //it to the one with the minimum size.
    var match1, match2, min;
    var addedToChain = false;
    do {
      addedToChain = false;
      for (var i = 0; i < outerCircle.length; i++) {
        if (chainIndex[i] == -1) {
          match1 = -1; 
          match2 = -1;
          for (var j = 0; j < lengthOfChain; j++) {
            if (this.isEdgeToChainMember(outerCircleChains[j], outerCircle[i]) && chainIndex[i] == -1) {
              if (match1 == -1) {
                match1 = j;
              }
              else {
                match2 = j;
              }
            }
          }

          if (match1 > -1 && match2 == -1) {
            this.addVertex(outerCircleChains[match1], outerCircle[i]);
            chainIndex[i] = match1;
            addedToChain = true;
          }
          else if (match1 > -1 && match2 > -1) {
            if (outerCircleChains[match1].length < outerCircleChains[match2].length) {
              min = match1;
            }
            else {
              min = match2;
            }
            chainIndex[i] = min;
            addedToChain = true;
          }
        }
      }
    } while (addedToChain);

    //If no vertex can be added, find the chain with minimum length, and then add all unplaceded vertices to it.
    min = 0;
    for (var i = 0; i < lengthOfChain; i++) {
      if (outerCircleChains[min].length > outerCircleChains[i].length) {
        min = i;
      }
    }
    for (var i = 0; i < outerCircle.length; i++) {
      if (chainIndex[i] == -1) {
        this.addVertex(outerCircleChains[min], outerCircle[i]);
      }
    }
    return outerCircleChains;
  };

  /**
  * Divides the vertices by placing them either in the inner circle or outer circle.  All inner circle vertices will have 
  * a degree greater than 2 or will be adjacent to two other inner circle vertices.  The rest of the vertices are placed
  * in the outer circles. 
  */
  automatonproto.assignToCircles = function (vertices, innerCircle, outerCircle) {
    for (var i = 0; i < vertices.length; i++) {
      
      if (this.degree(vertices, vertices[i]) > 2) {
        innerCircle.push(vertices[i]);
      }
      else {
        outerCircle.push(vertices[i]);
      }
    }
    if (innerCircle.length == 0) {
      innerCircle = outerCircle;
      outerCircle = [];
      return;
    }

    var innerCircleInsertion;
    var count;
    do {
      innerCircleInsertion = false;
      for (var i = 0; i < outerCircle.length; i++) {
        count = 0;
        for (var j = 0; j < innerCircle.length; j++) {
          if (this.hasEdge(outerCircle[i], innerCircle[j]) || this.hasEdge(innerCircle[j], outerCircle[i])) {
            count++;
          }
        }
        if (count >= 2) {
          innerCircle.push(outerCircle[i]);
          outerCircle.splice(i, 1);
          innerCircleInsertion = true;
        }
      }
    } while (innerCircleInsertion);
  };
  //Find the degree of a given node
  automatonproto.degree = function(vertices, node) {
    var degree = 0;
    for (var q = 0; q < vertices.length; q++) {
      if (vertices[q].edgeTo(node) || node.edgeTo(vertices[q])) {
        degree++;
      }
      /*
      if (node.edgeTo(vertices[q])) {
        degree++;
      }*/
    }
    return degree;
  };
  ////////////////////////////////////////////////////////////////////////////////
  /*
  *
  */
  automatonproto.treeLayoutAlg = function(hierarchical) {
    var vertices = this.nodes();
    if (this.nodeCount() == 0) {
      return;
    }

    if (hierarchical) {
      //make sure the right kind of graph is present for
      //hierarchical graphs.
      vertices.sort(function(a, b) {
        var degreea = 0;
        var degreeb = 0;
        
        for (var q = 0; q < vertices.length; q++) {
          if (vertices[q].edgeTo(a)/* && vertices[q] != a*/) {
            degreea++;
          }
          if (vertices[q].edgeTo(b)/* && vertices[q] != b*/) {
            degreeb++;
          }
        }
        return degreea - degreeb;
        //return a.neighbors().length - b.neighbors().length;
      });
    }
    else {
      vertices.sort(function(a, b) {
        var degreea = 0;
        var degreeb = 0;
        for (var q = 0; q < vertices.length; q++) {
          if (vertices[q].edgeTo(a) || a.edgeTo(vertices[q])) {
            degreea++;
          }
          
          if (vertices[q].edgeTo(b) || b.edgeTo(vertices[q])) {
            degreeb++;
          }
          
        }
        return degreeb - degreea;
      });
    }
    var notPlaced = [];
    for (var m=0; m<vertices.length; m++) {
      notPlaced.push(vertices[m]);
    }
    //var notPlaced = vertices;
    var firstLevel = [[], null];
    var counter;
    while (notPlaced.length > 0) {
      firstLevel[0].push(notPlaced[0]);
      notPlaced.splice(0, 1);
      counter = firstLevel;
      while (counter != null && notPlaced.length > 0) {
        this.processChildren(notPlaced, counter, hierarchical);
        counter = counter[1];
      }
    }
    this.treelayoutHelper(firstLevel, 0);
    this.shiftOntoScreen(400, 20, true);
    var nodes = this.nodes();
    // Update the position of the state label for each node
    for (var next = nodes.next(); next; next = nodes.next()) {
      next.stateLabelPositionUpdate();
    }
    var edges = this.edges();
    var edge;
    while (edges.hasNext()) {
      edge = edges.next();
      edge.layout();
    }


  };
  automatonproto.treelayoutHelper = function(level, height) {
    var currentX = -1.0 * level[0].length * (30 + 30) / 2;
    for (var v = 0; v < level[0].length; v++) {
      level[0][v].moveTo(currentX, height);
      currentX = currentX + 30 + 30;
    }
    if (level[1] != null) {
      this.treelayoutHelper(level[1], height + 60);
    }
  };

  /*
  * This method checks the list of vertices that haven't been placed in a level to determine if any
  * vertices in this level have any non-placed vertices as children.  All children found are placed in
  * the next level down the hierarchy.
  */
  automatonproto.processChildren = function(notPlaced, level, hierarchy) {
    var chain;
    var lastChain = null;

    for (var i = 0; i < level[0].length; i++) {
      chain = [];
      for (var j = notPlaced.length - 1; j >= 0; j--) {
        if ((this.hasEdge(level[0][i], notPlaced[j]) || (this.hasEdge(notPlaced[j], level[0][i]) && !hierarchy)) && level[0][i] != notPlaced[j]) {
          this.addVertex(chain, notPlaced[j]);
          //chain = thisChain.slice();
          notPlaced.splice(j, 1);
        }
      }
      /* Then, align this VertexChain to the last chain generated in the level to minimize overlaps.        
       * If there are vertices in the last chain, add the vertices in the last chain generated to the next, 
       * level, since the last chain is done with alignment.  Define the next level if necessary.  After
       * this, set the current chain to be the last chain.
       */
      if (lastChain != null) {
        this.alignTwoChains(lastChain, chain);
        if (lastChain.length > 0) {
          if (level[1] == null) {
            level[1] = [[], null];
          }
          for (var m = 0; m < lastChain.length; m++) {
            level[1][0].push(lastChain[m]);
          }
        }
      }
      lastChain = chain;
      


    }
    //Finally, add the last chain generated to the graph.
    if (lastChain != null && lastChain.length > 0) {
      if (level[1] == null) {
        level[1] = [[], null];
      }
      for (var b = 0; b < lastChain.length; b++) {
        level[1][0].push(lastChain[b]);
      }
      

    }

    //return nextLevel;
  };

  /*
  * If there is an edge between a vertex in <code>first</code> and a vertex in <code>last</code>, then the two
  * vertices are moved in their respective chains to their common border, with subchains in tow behind them.  This
  * only happens for the first matching pair, and other matching pairs have no effect.  The vertex in 
  * <code>first</code> will be moved to the end of vertices in its <code>VertexChain</code>, and the vertex in 
  * <code>last</code> will be moved to the beginning of vertices in its <code>VertexChain</code>.
  */
  automatonproto.alignTwoChains = function(firstChain, nextChain) {
    var fstart, fend, nstart, nend;
    for (var j = 0; j < firstChain.length; j++) {
      for (var k = 0; k < nextChain.length; k++) {
        if (this.getDegreeInChain(firstChain, firstChain[j]) < 2 
          && this.getDegreeInChain(nextChain, nextChain[k]) < 2
          && (this.hasEdge(firstChain[j], nextChain[k]) || this.hasEdge(nextChain[k], firstChain[j]))) {
          fstart=j;   
          fend=j;   
          nstart=k;   
          nend=k;
          while (fstart > 0 && (this.hasEdge(firstChain[fstart], firstChain[fstart - 1]) || this.hasEdge(firstChain[fstart - 1], firstChain[fstart]))) {
            fstart--;
          }
          while (fend < firstChain.length - 1 && (this.hasEdge(firstChain[fend], firstChain[fend + 1]) || this.hasEdge(firstChain[fend + 1], firstChain[fend]))) {
            fend++;
          }
          while (nstart > 0 && (this.hasEdge(nextChain[nstart], nextChain[nstart - 1]) || this.hasEdge(nextChain[nstart - 1], nextChain[nstart]))) {
            nstart--;
          }
          while (nend < nextChain.length - 1 && (this.hasEdge(nextChain[nend], nextChain[nend + 1]) || this.hasEdge(nextChain[nend + 1], nextChain[nend]))) {
            nend++;
          }
          this.orientSubChain(firstChain, firstChain.length - 1, fstart + fend - j, fstart, fend, true);
          this.orientSubChain(nextChain, 0, nstart+nend-k, nstart, nend, false);
          return;
        }
      }
    }
  }
  /*
  * 
  */
  automatonproto.orientSubChain = function(chain, destIndex, matchingIndex, start, end, shuffleDirection) {
    var toMove = [];
    for (var l = 0; l < end-start+1; l++) {
      toMove.push(0);
    }
    var dest, chainSize;
    chainSize = chain.length;
    if (destIndex > 0 && destIndex >= start) {
      dest = destIndex + start - end - 1;
    }
    else {
      dest = destIndex;
    }
    for (var i = start; i <= end; i++) {
      //toMove.splice(i-start, 1, chain[i]);
      toMove[i-start] = chain[i];
    }
    for (var j = 0; j < toMove.length; j++) {
      //if (toMove[j] != 0) {
      chain.splice(chain.indexOf(toMove[j]), 1);
      //}
    }
    for (var k = 0; k < toMove.length; k++) {
      if (shuffleDirection) {

        if (destIndex == chainSize || dest == chain.length) {
          if (matchingIndex == start/* && toMove[toMove.length-1-k] != 0*/) {
            chain.push(toMove[toMove.length-1-k]);
          }
          else {
            if (toMove[k] != 0) {
             chain.push(toMove[k]);
            }
          }
        }
        else if (matchingIndex == start) {
          chain.splice(dest+1, 0, toMove[toMove.length-1-k]);
        }
        else {
          //if (toMove[k] != 0) {
          chain.splice(dest+1, 0, toMove[k]);
          //}
        }
      }
      else if (matchingIndex == start) {
        //if (toMove[k] != 0) {
        chain.splice(dest, 0, toMove[k]);
        //}
        
      }
      else {
        //if (toMove[toMove.length-1-k] != 0) {
        chain.splice(dest, 0, toMove[toMove.length-1-k]);
        //}
      }
    }
    return chain;
  };

  /*
  * Vertex Chain functions
  */
  automatonproto.addVertex = function(chain, vertex) {
    var destIndex, subChainBound;
    if (chain == null) {
      chain = [];
    }
    for (var i=0; i<chain.length; i++) {
      if (this.hasEdge(vertex, chain[i]) || this.hasEdge(chain[i], vertex)) {
        //If there is an open node to the right of the vertex, then it is inserted there.
        if (i == chain.length - 1 || !(this.hasEdge(chain[i], chain[i+1]) || this.hasEdge(chain[i+1], chain[i]))) {
          destIndex = i + 1;
        }
        //Otherwise, then the node is inserted to the left.
        else {
          destIndex = i;
        }
        chain.splice(destIndex, 0, vertex);
        //Now check to see if there is at least one more node in the chain that this links to.  That node,
         //if it has a degree <= 2 (inc. the newly added node), can be put on the opposite side of this.
        for (var j=i+2; j<chain.length; j++) {
          if ((this.hasEdge(vertex, chain[j]) || this.hasEdge(chain[j], vertex)) && this.getDegreeInChain(chain, chain[j]) <= 2) {
            if (j<chain.length - 1 && (this.hasEdge(chain[j], chain[j+1]) || this.hasEdge(chain[j+1], chain[j]))) {
              chain = this.orientSubChain(chain, destIndex, j, j, chain.length-1, (destIndex==i+1));
            }
            else {
              subChainBound = j;
              while (subChainBound > i+2 && (this.hasEdge(chain[subChainBound-1], chain[subChainBound]) || this.hasEdge(chain[subChainBound], chain[subChainBound-1]))) {
                subChainBound--;
              }
              this.orientSubChain(chain, destIndex, j, subChainBound, j, (destIndex==i+1));
            }
            return;
          }
        }
        return;
      }
    }
    //Added at end if there are no adjacencies.
    chain.push(vertex);
  };

  /*
  * Get the degree of give vertex in a given chain.
  */
  automatonproto.getDegreeInChain = function(chain, vertex) {
    var count = 0;
    for (var i = 0; i < chain.length; i++) {
      if ((this.hasEdge(vertex, chain[i]) || this.hasEdge(chain[i], vertex)) && vertex != chain[i]) {
        count++;
      }
    }
    return count;
  };
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////


  /*
  * Spiral layout algorithms
  */
  automatonproto.spiralLayoutAlg = function(options) {
    var vertices = this.nodes();
    if (this.nodeCount() == 0) {
      return;
    }
    /*
    vertices.sort(function(a, b) {
      return b.neighbors().length - a.neighbors().length;
    });
    */
    var chain = [];
    vertices.sort(function(a, b) {
      var degreea = 0;
      var degreeb = 0;
      for (var q = 0; q < vertices.length; q++) {
        if (vertices[q].edgeTo(a)) {
          degreea++;
        }
        if (a.edgeTo(vertices[q])) {
          degreea++;
        }
        if (vertices[q].edgeTo(b)) {
          degreeb++;
        }
        if (b.edgeTo(vertices[q])) {
          degreeb++;
        }
      }
      return degreeb - degreea;
    });
    for (var j = 0; j < vertices.length; j++) {
      this.addVertex(chain, vertices[j]);
    }
    var r = 0;
    var theta = 0;
    var posShift = (Math.sqrt(Math.pow(30, 2) + Math.pow(30, 2))) + 30;
    for (var i=0; i<this.nodeCount(); i++) {
      r = Math.sqrt(Math.pow(r, 2) + Math.pow(posShift, 2));      
      theta = theta + Math.asin(posShift / r);
      chain[i].moveTo(Math.cos(theta) * r, Math.sin(theta) * r);
      //vertices[i].moveTo(r, theta);
    }
    
    this.shiftOntoScreen(400, 20, true);
    var nodes = this.nodes();
    // Update the position of the state label for each node
    for (var next = nodes.next(); next; next = nodes.next()) {
      next.stateLabelPositionUpdate();
    }
    var edges = this.edges();
    var edge;
    while (edges.hasNext()) {
      edge = edges.next();
      edge.layout();
    }

  };
  automatonproto.findDegree = function(node) {
    var vertices = this.nodes();
    var degree = 0;
    for (var q= 0; q < this.nodeCount(); q++) {
      if (this.hasEdge(vertices[q], node)) {
        degree++;
      }
    }
    if (this.hasEdge(node, node)) {
      degree++;
    }
    return degree;
  }
  automatonproto.shiftOntoScreen = function(size, buffer, scaleOnlyOverflow) {
    if (size == 0) {
      return;
    }
    var vertices = this.nodes();
    var currentX, currentY, minX, minY, maxX, maxY, heightRatio, widthRatio;
    //First, find the extreme values of x & y
    minX=100000;   minY=100000;   
    maxX=0;   maxY=0;
    for (var j=0; j<vertices.length; j++) {
      currentX = vertices[j].element.position().left;
      currentY = vertices[j].element.position().top; 
      if (currentX < minX)
        minX = currentX;
      if (currentX > maxX)
        maxX = currentX;
      if (currentY < minY)
        minY = currentY;      
      if (currentY > maxY)
        maxY = currentY;
    }
    //Then, set all points so that their coordinates range from (0...maxX-minX, 0...maxY-minY)
    for (var k=0; k<vertices.length; k++) {
      vertices[k].moveTo(vertices[k].element.position().left - minX, vertices[k].element.position().top - minY);        
    }
    
    //Calculate whether the points go off the defined screen minus buffer space, and adjust
    widthRatio = (maxX - minX) / (size - 2 * buffer);
    heightRatio = (maxY - minY) / (size - 2 * buffer);        
    if (widthRatio > 1.0 || !scaleOnlyOverflow) {
      for (var m=0; m<vertices.length; m++) {
        vertices[m].moveTo(vertices[m].element.position().left / widthRatio, vertices[m].element.position().top);   
      }
    }
    if (heightRatio > 1.0 || !scaleOnlyOverflow) {
      for (var n=0; n<vertices.length; n++) {

        vertices[n].moveTo(vertices[n].element.position().left, vertices[n].element.position().top / heightRatio);

      }
    }
    
    //Finally, shift the points right and down the respective buffer values
    for (var x=0; x<vertices.length; x++) {
      vertices[x].moveTo(vertices[x].element.position().left + buffer, vertices[x].element.position().top + buffer);
    }
  };
  /*
  *Circle Layout Algorithm
  */
  automatonproto.circleLayoutAlg = function (options) {
    var vertices = this.nodes();
    if (vertices.length == 0) {
      return;
    }
    var boxes = [];
    for (var i=0; i < vertices.length; i++) {
      var addTo = this.addToExistingBox(boxes, vertices[i]);
      if (!addTo) {
        //[chain, right, down, upperleft, size]
        var box = [[], null, null, [0, 0], [0, 0]];
        var vertexDim = 30;
        var vertexBuffer = 30;
        this.addVertex(box[0], vertices[i]);
        boxes.push(box);
      }
    }
    for (var m = boxes.length - 1; m > 0; m--) {
      this.mergeIfPossible(boxes, boxes[m], m);
    }
    
    for (var i = 0; i<boxes.length; i++) {
      this.layoutInCircleAndPack(boxes, boxes[i]);
    }
    this.shiftOntoScreen(400, 20, true);
    var nodes = this.nodes();
    // Update the position of the state label for each node
    for (var next = nodes.next(); next; next = nodes.next()) {
      next.stateLabelPositionUpdate();
    }
    var edges = this.edges();
    var edge;
    while (edges.hasNext()) {
      edge = edges.next();
      edge.layout();
    }
  };
  
  /**
   * Tries to merge two boxes, and will do so if one vertex in the given
   * box has an edge with any boxes in the list of boxes.
   *
   */
  automatonproto.mergeIfPossible = function(boxes, current, max) {
    var toSearch = [[], null, null, [0, 0], [0, 0]];
    for (var n = max-1; n >= 0; n--) {
      toSearch = boxes[n];
      for (var k = 0; k<current[0].length; k++) {
        if (this.isEdgeToChainMember(toSearch[0], current[0][k])) {
          this.merge(toSearch[0], current[0]);
          boxes.splice(boxes.indexOf(current), 1);
          return;
        }
      }
    }
  };
  /**
   * Moves all vertices in the box given into this box.
   * 
   */
   automatonproto.merge = function(chain, box) {
    for (var i = 0; i<box.length; i++) {
      this.addVertex(chain, box[i]);
    }
   }
  /**
   * Adds the given vertex to a box if it has an edge to one of them.
   * 
   * return Whether the given vertex was added.
   */
  automatonproto.addToExistingBox = function(boxes, vertex) {
    for (var j = 0; j < boxes.length; j++) {
      if (this.isEdgeToChainMember(boxes[j][0], vertex)) {
        this.addVertex(boxes[j][0], vertex);
        return true;
      }
    }
    return false;
  };
  /**
   * Returns whether the given vertex has an edge to a <code>VertexChain</code> member.
   *  
   */
  automatonproto.isEdgeToChainMember = function(chain, vertex) {
    if (this.getDegreeInChain(chain, vertex) > 0) {
      return true;
    }
    return false;
  };
  //Layout in circle 
  automatonproto.layoutInCircle = function(vertices, r, midTheta, span) {
    var diagonalLength = Math.sqrt(Math.pow(30, 2) + Math.pow(30, 2)) + 30;

    if (vertices.length == 0) {
      return;
    }
    if (vertices.length == 1) {
      if (r == 0) {
        vertices[0].moveTo(0, 0);
      }
      else {
        vertices[0].moveTo(r + diagonalLength, midTheta);
      }
      return diagonalLength;
    }
    //var radius = diagonalLength / thetaDivision;
    var startTheta;
    var thetaDivision;
    var divisions;
    startTheta = midTheta - span / 2;
    if (2 * Math.PI - span < .0001) {
      divisions = vertices.length;
    }
    else {
      divisions = vertices.length - 1;
    }
    thetaDivision = span / divisions;
    var radius = diagonalLength / thetaDivision;
    if (radius < r + diagonalLength) {
      radius = r + diagonalLength;
    }

    for (var i=0; i<vertices.length; i++) {
      vertices[i].moveTo(radius, startTheta + thetaDivision * i)
    }
    return radius;
  };

  automatonproto.layoutInCircleAndPack = function (boxes, box) {
    var vertices = box[0];
    var radius = this.layoutInCircle(vertices, 0, Math.PI, 2*Math.PI);
    for (var i=0; i<this.nodeCount(); i++) {
      var r = vertices[i].element.position().left;      
      var theta = vertices[i].element.position().top;
      vertices[i].moveTo(Math.cos(theta) * r, Math.sin(theta) * r);
    }
    box[4] = [2 * (radius + 30) + 30, 2 * (radius + 30) + 30];
    if (boxes.indexOf(box) != 0) {
      this.setUpperLeft(boxes, box, boxes[0]);
      for (var j = 0; j < box.length; j++) {
        box[j].moveTo(upperLeftArray[j][0] + vertices[j].element.position().left, upperLeftArray[j][1] + vertices[j].element.position().top);
      }
    }
  };
  /**
   * Sets the value of the point representing this box's upper-left corner.  This is calculated
   * by traversing the linked list the boxes form and attempting to find an open space.  If
   * the height of this box is less than or equal to the parameter box, then this box's upperLeft 
   * point will be in the first available point to the right of the parameter box, with the same
   * height.  If not, the point will be below and perhaps to the right of the parameter box.   
   * 
   * @param current the current box in the traversal of the linked list.
   */
  automatonproto.setUpperLeft = function(boxes, thisBox, current) {
    if (thisBox[4][1] <= current[4][1]) {
      thisBox[3] = [thisBox[3][0] + current[4][0], thisBox[3][1]];
      while (current[1] != null) {
        current = current[1];
        thisBox[3] = [thisBox[3][0] + current[4][0], thisBox[3][1]];
      }
      current[1] = thisBox;
      return;
    }
    var upperLeft = [upperLeftArray[currIndex][0], upperLeftArray[currIndex][1] + 30];
    thisBox[3] = [thisBox[3][0], thisBox[3][1] + current[4][1]];
    if (current[2] == null) {
      current[2] = thisBox;
    }
    else {
      this.setUpperLeft(boxes, thisBox, current[2]);
    }
  };
  // function to hide the right click menu
  // called when mouse clicks on anywhere on the page except the menu
  automatonproto.hideRMenu = function () {
    var nodes = this.nodes();
    if (menuSelected) {
      menuSelected.unhighlight();
    }
    menuSelected = null;
    $("#rmenu").hide();
  };

  // Function to save the state of the graph and push it to the undo stack.
  // Called whenever any graph manipulation is made.
  // Note that a size restriction of 20 is imposed on both the undo stack and the redo stack.
  automatonproto.saveFAState = function () {
    var data = serialize(this);
    this.undoStack.push(data);
    this.redoStack = [];
    document.getElementById("undoButton").disabled = false;
    document.getElementById("redoButton").disabled = true;
    if (this.undoStack.length > 20) {
      this.undoStack.shift();
    }
  };

  // Function to undo previous action by reinitializing the graph that existed before it was performed.
  // Pushes the current graph to the redo stack and enables the redo button.
  // Triggered by clicking the "Undo" button.
  automatonproto.undo = function () {
    var data = serialize(this);
    this.redoStack.push(data);
    data = this.undoStack.pop();
    data = jQuery.parseJSON(data);
    this.initFromParsedJSONSource(data);
    document.getElementById("redoButton").disabled = false;
    if (this.undoStack.length == 0) {
      document.getElementById("undoButton").disabled = true;
    }
  };

  // Function to redo previous action by reinitializing the graph that existed after it was performed.
  // Pushes the current graph to the undo stack and, if applicable, enables the undo button.
  // Enabled by clicking the "Undo" button, and triggered by clicking the "Redo" button.
  automatonproto.redo = function () {
    var data = serialize(this);
    this.undoStack.push(data);
    data = this.redoStack.pop();
    data = jQuery.parseJSON(data);
    this.initFromParsedJSONSource(data);
    document.getElementById("undoButton").disabled = false;
    if (this.redoStack.length == 0) {
      document.getElementById("redoButton").disabled = true;
    }
  };

  //********************************************************************************* */
  /*
     state class.
     Extended from JSAV graph node class.
     Main difference is the addition of labels and markers.
   */
  var State = function (container, value, options) {
    this.init(container, value, options);
  };
  JSAV.utils.extend(State, JSAV._types.ds.GraphNode);

  var stateproto = State.prototype;

  stateproto.init = function (container, value, options) {
    this.jsav = container.jsav;
    this.container = container;
    this.options = $.extend(true, { visible: true, left: 0, top: 0 }, options);
    this.constructors = $.extend({}, container.constructors, this.options.constructors);
    var el = this.options.nodeelement || $("<div><span class='jsavvalue'>" + this._valstring(value) + "</span></div>"),
      valtype = typeof (value);
    if (valtype === "object") { valtype = "string"; }
    this.element = el;
    el.addClass("jsavnode jsavgraphnode jsavfastate")
      .attr({ "data-value": value, "id": this.id(), "data-value-type": valtype })
      .data("node", this);
    if (this.options.autoResize) {
      el.addClass("jsavautoresize");
    }
    this.container.element.append(el);
    this.wasHighlighted;

    JSAV.utils._helpers.handlePosition(this);
    JSAV.utils._helpers.handleVisibility(this, this.options);
  };

  /*
     Function to get all outgoing edges of a node.
     Returns a normal array, not an iterable array like .getNodes does.
   */
  stateproto.getOutgoing = function () {
    var edges = this.container._edges[this.container._nodes.indexOf(this)];
    return edges;
  };
  /*
     Function to get all incoming edges of a node.
     Returns a normal array, not an iterable array like .getNodes does.
   */
  stateproto.getIncoming = function () {
    var edges = [];
    for (var i = 0; i < this.container._edges.length; i++) {
      for (var j = 0; j < this.container._edges[i].length; j++) {
        if (this.container._edges[i][j].end() === this) {
          edges.push(this.container._edges[i][j]);
        }
      }
    }
    return edges;
  };
  /*
     Function to set the state label or get the current value of the state label.
     "node.stateLabel()" does not return the state label if the node is hidden!
     "node._stateLabel.element[0].innerHTML" will return the state label regardless of visibility
   */
  stateproto.stateLabel = function (newLabel, options) {
    // the editable labels that go underneath the states
    if (typeof newLabel === "undefined") {
      if (this._stateLabel && this._stateLabel.element.filter(":visible").size() > 0) {
        return this._stateLabel.text();
      } else {
        return undefined;
      }
    } else {
      if (!this._stateLabel) {
        this._stateLabel = this.jsav.label(newLabel, { container: this.container.element });
        this._stateLabel.element.addClass("jsavstatelabel");
      } else {
        this._stateLabel.text(newLabel, options);
      }
    }
  };

  // displays the right click menu, called when right clicks on a node
  stateproto.showMenu = function (e) {
    var g = this.automaton;
    g.first = null;
    var nodes = g.nodes();
    for (var next = nodes.next(); next; next = nodes.next()) {
      next.unhighlight();
    }
    this.highlight();
    menuSelected = this;

    e.preventDefault();
    //make menu appear where mouse clicks
    $("#rmenu").css({ left: this.element.offset().left + e.offsetX, top: this.element.offset().top + e.offsetY });

    $("#rmenu").show();
    // add a check mark if the node is already a certain state
    if (this.equals(g.initial)) {
      $("#makeInitial").html("&#x2713;Initial");
    } else {
      $("#makeInitial").html("Initial");
    }
    if (this.hasClass("final")) {
      $("#makeFinal").html("&#x2713;Final");
    } else {
      $("#makeFinal").html("Final");
    }

    var node = this;
    //off and on to avoid binding event more than once
    $("#makeInitial").off('click').click(function () {
      toggleInitial(g, node);
    });
    $("#makeFinal").off('click').click(function () {
      toggleFinal(g, node);
    });
    $("#deleteNode").off('click').click(function () {
      g.hideRMenu();
      g.removeNode(node);
    });
    $("#changeLabel").off('click').click(function () {
      changeLabel(node);
    });
    $("#clearLabel").off('click').click(function () {
      clearLabel(node);
    });
  }

  stateproto.mooreOutput = function (newOutput, options) {
    // the editable labels that go underneath the states
    if (typeof newOutput === "undefined") {
      if (this._mooreOutput && this._mooreOutput.element.filter(":visible").size() > 0) {
        return this._mooreOutput.text();
      } else {
        return undefined;
      }
    } else {
      if (!this._mooreOutput) {
        this._mooreOutput = this.jsav.label(newOutput, { container: this.container.element });
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
  stateproto.stateLabelPositionUpdate = function (options) {
    // update initial arrow position while we're at it
    if (this._initialMarker) {
      var fromPoint = [this.position().left - 10, this.position().top + this.element.outerHeight() / 2.0],
        toPoint = [this.position().left, this.position().top + this.element.outerHeight() / 2.0];
      this._initialMarker.movePoints([
        [0].concat(fromPoint), [1].concat(toPoint)
      ], options);
    }
    if (this._stateLabel) {
      var bbox = this.position(),
        lbbox = this._stateLabel.bounds(),
        nWidth = this.element.outerWidth(),
        nHeight = this.element.outerHeight(),
        newTop = bbox.top + nHeight,
        newLeft = bbox.left - 30;
      if (newTop !== lbbox.top || newLeft || lbbox.left) {
        this._stateLabel.css({ top: newTop, left: newLeft /*, width: nWidth*/ }, options);
      }
    }
    if (this._mooreOutput) {
      var bbox = this.position(),
        lbbox = this._mooreOutput.bounds(),
        nWidth = this.element.outerWidth(),
        nHeight = this.element.outerHeight(),
        newTop = bbox.top - 10,
        newLeft = bbox.left + nWidth - 20;
      if (newTop !== lbbox.top || newLeft || lbbox.left) {
        this._mooreOutput.css({ top: newTop, left: newLeft, width: nWidth }, options);
      }
    }
  };
  // Function to add the initial state arrow to this state
  stateproto.addInitialMarker = function (options) {
    var t = this.position().top + this.element.outerHeight() / 2.0,
      l2 = this.position().left,
      l1 = l2 - 10;
    this._initialMarker = this.jsav.g.line(l1, t, l2, t, $.extend({ "stroke-width": 5, "arrow-end": "block-wide-short" }, options));
  };

  // draggable functions
  // edited by Peixuan Ge (6/14/2020) to solve the problem
  // that a FiniteAutomaton graph would mess up if any node is dragged
  var animStacks = [];

  /*
  * Function to back up all the animation of a jsav to the parameter above.
  * This is used to solve problem that dragging node may mess up the graph.
  */
  function backupAnimStacks(av) {
    // if the animation stacks are already backuped, return this function.
    for(i = 0 ; i < animStacks.length ; i++){
      if(animStacks[i].jsav == av){
        return;
      }
    }
    // else push a deep copy of the animations stacks to the parameter above.
    var anAnimStack = [];
    var i, temp;
    for(i = 0 ; i < av._undo.length ; i++){
      temp = [];
      av._undo[i].operations.forEach((item) => {
        temp.push(item);
      });
      anAnimStack.push(temp);
    }
    for(i = 0 ; i < av._redo.length ; i++){
      temp = [];
      av._redo[i].operations.forEach((item) => {
        temp.push(item);
      });
      anAnimStack.push(temp);
    }
    animStacks.push({
      "animStack" : anAnimStack,
      "jsav" : av
    });
  }

  /*
  * Function to restore all the animation of a jsav.
  * This is used to solve problem that dragging node may mess up the graph.
  * Dragging node would mess up the animation stacks,
  * this function can restore them and
  * should always run after the backup is called.
  */
  function restoreAnimStacks(av) {
    var i, j;
    // check if a jsav is backuped
    for(i = 0 ; i < animStacks.length ; i++){
      if(animStacks[i].jsav == av){
        var animStack = animStacks[i].animStack;
        //if an extra unnecessary animation is inserted to the stack, remove it
        if(av._undo.length + av._redo.length !== animStack.length){
          av._undo.shift();
          for(j = 0 ; j < av._redo.length ; j++){
            //must create new object here
            av._redo[j].operations = [];
            animStack[j].forEach((item) => {
              av._redo[j].operations.push(item)
            });
          }
        }
        else{
          //restore the animation stacks
          var stackIndex = 0;
          for(j = 0 ; j < av._undo.length ; j++){
            av._undo[j].operations = [];
            animStack[stackIndex].forEach((item) => {
              av._undo[j].operations.push(item)
            });
            stackIndex++;
          }
          for(j = 0 ; j < av._redo.length ; j++){
            av._redo[j].operations = [];
            animStack[stackIndex].forEach((item) => {
              av._redo[j].operations.push(item)
            });
            stackIndex++
          }
        }
        return;
      }
    }
    console.error("restoreAnimFailed");
  }

  //variable to store FAs that have any node changed
  var nodeChangedAutomaton = [];
  /*
  * Function to add event listeners to all the jsav control buttons.
  * Give them extra tasks to layout the graph
  * and restore the animation animStacks.
  * (This is an alternative approach to fix the problem, and not the best way.
  * Hopefully someone can finish this in the future.)
  */
  function addLayoutListeners(av, node) {
    //check if a FiniteAutomaton is already patched
    //if not add listeners to jsav control buttons and record that FA
    if(!nodeChangedAutomaton.includes(node.automaton)){
      nodeChangedAutomaton.push(node.automaton);
      $("#" + av.container[0].id + " .jsavbegin").click(function() {
          node.automaton.layout();
          restoreAnimStacks(av);
      })
      $("#" + av.container[0].id + " .jsavbackward").click(function() {
          node.automaton.layout();
          restoreAnimStacks(av);
      })
      $("#" + av.container[0].id + " .jsavforward").click(function() {
          node.automaton.layout();
          restoreAnimStacks(av);
      })
      $("#" + av.container[0].id + " .jsavend").click(function() {
          node.automaton.layout();
          restoreAnimStacks(av);
      })
    }
  }

  //Peixuan added backupAnimStacks function
  function dragStart(event, node) {
    backupAnimStacks(node.helper.data("node").automaton.jsav);
    $(document).trigger("jsav-speed-change", 50);
    var dragNode = node.helper.data("node");
    dragNode.wasHighlighted = dragNode.hasClass("jsavhighlight");
    dragNode.highlight();
  };

  //Peixuan added restoreAnimStacks and addLayoutListeners functions
  function dragStop(event, node) {
    var dragNode = node.helper.data("node");
    if (!dragNode.wasHighlighted) {
      dragNode.unhighlight();
    }
    $(document).trigger("jsav-speed-change", JSAV.ext.SPEED);
    restoreAnimStacks(dragNode.automaton.jsav);
    addLayoutListeners(dragNode.automaton.jsav, dragNode);
  };

  function dragging(event, node) {
    var dragNode = node.helper.data("node");
    g = dragNode.automaton;
    if (dragNode == g.initial) {
      if (node.helper.offset().left < 45) {
        node.helper.offset({ left: 45 });
      }
    }
    var nodes = g.nodes();
    var neighbors = dragNode.neighbors();
    nodes.reset();
    for (var next = nodes.next(); next; next = nodes.next()) {
      if (next.neighbors().includes(dragNode)) {
        neighbors.push(next);
      }
    }
    for (var i = 0; i < neighbors.length; i++) {
      var neighbor = neighbors[i];
      var edge1 = g.getEdge(dragNode, neighbor);
      var edge2 = g.getEdge(neighbor, dragNode);
      if (edge1) edge1.layout();
      if (edge2) edge2.layout();
    }
    if (dragNode == g.initial) {
      g.removeInitial(dragNode);
      g.makeInitial(dragNode);
    }
    dragNode.stateLabelPositionUpdate();
    dragNode.element.draggable('enable');
  };

  //********************************************************************************************************************************* */
  /*
     edge/transition class.
     Extended from JSAV graph edge class.
     Unlike the graph, the displayed edge is a SVG path, not a line.
     This allows the edge to be arced or made into a loop.
   */
  var Transition = function (jsav, start, end, options) {
    this.options = $.extend({ arc: false }, options);
    this.jsav = jsav;
    this.startnode = start;
    this.shift = false;
    this.shiftedTo = 1; // -1 is shifting down, 1 is shifting up
    this.endnode = end;
    this.options = $.extend(true, { "display": true }, options);
    this.container = start.container;
    var startPos = start ? start.element.position() : { left: 0, top: 0 },
      endPos = end ? end.element.position() : { left: 0, top: 0 };
    if (startPos.left === endPos.left && startPos.top === endPos.top) {
      // layout not done yet
      this.g = this.jsav.g.path("M-1 -1L-1 -1", $.extend({ container: this.container }, this.options));
    } else {
      if (end) {
        endPos.left += end.element.outerWidth() / 2;
        endPos.top += end.element.outerHeight();
      }
      if (!startPos.left && !startPos.top) {
        startPos = endPos;
      }
      this.g = this.jsav.g.path("M" + startPos.left + " " + startPos.top + "L" + endPos.left + " " + endPos.top,
        $.extend({ container: this.container }, this.options));
    }

    this.element = $(this.g.rObj.node);

    var visible = (typeof this.options.display === "boolean" && this.options.display === true);
    this.g.rObj.attr({ "opacity": 0 });
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
  JSAV.utils.extend(Transition, JSAV._types.ds.Edge);

  var transitionproto = Transition.prototype;
  // Function to set the weight of the edge or return the current weight of the edge
  transitionproto.weight = function (newWeight) {
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
  transitionproto.layout = function (options) {
    // delete edges without weights
    if (!this._label.text()) {
      this.container.removeEdge(this);
      return;
    }
    this.weight(this._label.element[0].innerHTML);
    var controlPointX, controlPointY, midX, midY,
      sElem = this.start().element,
      eElem = this.end().element,
      start = (options && options.start) ? options.start : this.start().position(),
      end = (options && options.end) ? options.end : this.end().position(),
      sWidth = sElem.outerWidth() / 2.0,
      sHeight = sElem.outerHeight() / 2.0,
      eWidth = eElem.outerWidth() / 2.0,
      eHeight = eElem.outerHeight() / 2.0,
      fromX = (options && options.fromPoint) ? options.fromPoint[0] : Math.round(start.left + sWidth),
      fromY = (options && options.fromPoint) ? options.fromPoint[1] : Math.round(start.top + sHeight),
      toX = Math.round(end.left + eWidth),
      toY = Math.round(end.top + eHeight),
      fromAngle = normalizeAngle(2 * Math.PI - Math.atan2(toY - fromY, toX - fromX)),
      toAngle = normalizeAngle(2 * Math.PI - Math.atan2(fromY - toY, fromX - toX)),
      startRadius = parseInt(sElem.css("borderBottomRightRadius"), 10) || 0,
      ADJUSTMENT_MAGIC = 2.2, // magic number to work with "all" stroke widths
      strokeWidth = parseInt(this.g.element.css("stroke-width"), 10),
      // adjustment for the arrow drawn before the end of the edge line
      startStrokeAdjust = this.options["arrow-begin"] ? strokeWidth * ADJUSTMENT_MAGIC : 0,
      fromPoint = (options && options.fromPoint) ? options.fromPoint :
        getNodeBorderAtAngle({
          width: sWidth + startStrokeAdjust,
          height: sHeight + startStrokeAdjust,
          x: fromX,
          y: fromY
        }, { x: toX, y: toY }, fromAngle, startRadius),
      // arbitrarily choose to use bottom-right border radius
      endRadius = parseInt(eElem.css("borderBottomRightRadius"), 10) || 0,
      // adjustment for the arrow drawn after the end of the edge line
      endStrokeAdjust = this.options["arrow-end"] ? strokeWidth * ADJUSTMENT_MAGIC : 0,
      toPoint = getNodeBorderAtAngle({ width: eWidth + endStrokeAdjust, height: eHeight + endStrokeAdjust, x: toX, y: toY }, { x: fromX, y: fromY }, toAngle, endRadius);
    // getNodeBorderAtAngle returns an array [x, y], and movePoints wants the point position
    // in the (poly)line as first item in the array, so we'll create arrays like [0, x, y] and
    // [1, x, y]

    // If the edge is a loop:
    if (this.start().equals(this.end())) {
      var adjust = Math.sqrt(2) / 2.0;
      fromX = Math.round(fromX - adjust * sWidth);
      var loopR = Math.round(0.8 * sWidth);
      //this.g.path("M" + fromX + ',' + fromY + ' a' + loopR + ',' + loopR + ' -45 1,1 '
      //    + (Math.round(2 * sWidth * adjust) + 2) + ',' + 0, options);
      /************************This code is added to determine the arc direction for the loop arrow. if the state is in the second half of the
      FA, then the acr will be in the button. */
      var FAnodes = this.container._nodes;
      var minToplocation = FAnodes[0].position().top,
        maxTopLocation = FAnodes[0].position().top;
      for (var n = 1; n < FAnodes.length; n++) {
        minToplocation = Math.min(minToplocation, FAnodes[n].position().top);
        maxTopLocation = Math.max(maxTopLocation, FAnodes[n].position().top);
      }

      // if (this.end().element.position().top <= 0) {
      //   this.end().element.offset({ top: this.end().element.offset().top + this.end().element.position().top + 50 });
      //   this.endnode.getIncoming().forEach(edge => edge.layout());
      // } else if (this.end().element.height() + this.end().element.position().top >= 200) {
      //   this.end().element.offset({ top: this.end().element.offset().top - 50 });
      //   this.endnode.getIncoming().forEach(edge => edge.layout());
      // }
      if ((this.end().position().top > this.container.element.height() / 2) && minToplocation !== maxTopLocation) { //this means, draw the arrow at the button
        fromY = Math.round(fromY + sHeight); //Change the - sign to + in case we need to flip the loop arrow and remove "adjust"
        this.g.path("M" + fromX + ',' + fromY + ' a' + loopR + ',' + loopR + ' -45 1,0 ' //this 1 is to draw it from the top. Make it 0 to flip it.
          +
          (Math.round(2 * sWidth * adjust) + 2) + ',' + 0, options);
      } else {
        fromY = Math.round(fromY - adjust * sHeight);
        this.g.path("M" + fromX + ',' + fromY + ' a' + loopR + ',' + loopR + ' -45 1,1 ' //this 1 is to draw it from the top. Make it 0 to flip it.
          +
          (Math.round(2 * sWidth * adjust) + 2) + ',' + 0, options);
      }
    }
    // If the edge should be an arc (implemented as a quadratic bezier curve)
    else if (this.options.arc) {
      this.options.arcoffset = 15;
      var midX = ((fromPoint[0] + toPoint[0]) / 2.0),
        midY = ((fromPoint[1] + toPoint[1]) / 2.0),
        vectorX = fromPoint[1] - toPoint[1],
        vectorY = toPoint[0] - fromPoint[0],
        scaling = this.options.arcoffset / Math.sqrt(Math.pow(vectorX, 2) + Math.pow(vectorY, 2));

      if (this.shift) {
        if (vectorX > -10 && vectorY > -10) {//Top
          this.shiftedTo = 1;
          if (Math.abs(fromPoint[1] - toPoint[1]) > Math.abs(fromPoint[0] - toPoint[1])) {
            fromPoint[0] += 2.5;
            toPoint[0] += 2.5;

          }
          else {
            fromPoint[1] += 2.5;
            toPoint[1] += 2.5;
          }
          vectorY = Math.abs(vectorY) + 3;
          vectorX = Math.abs(vectorX) + 3;
        } else if (vectorX < 10 && vectorY < 10) {//bottom
          this.shiftedTo = -1;
          if (Math.abs(fromPoint[1] - toPoint[1]) > Math.abs(fromPoint[0] - toPoint[1])) {
            fromPoint[0] -= 2.5;
            toPoint[0] -= 2.5;
          } else {
            fromPoint[1] -= 2.5;
            toPoint[1] -= 2.5;
          }

          vectorY = -Math.abs(vectorY) - 3;
          vectorX = -Math.abs(vectorX) - 3;
        }
        else {
          if (vectorX > -10 && vectorY < 10) {//top
            this.shiftedTo = 1;
            fromPoint[0] += 2.5;
            toPoint[0] += 2.5;
            fromPoint[1] -= 2.5;
            toPoint[1] -= 2.5;
          }
          else {
            this.shiftedTo = -1;
            fromPoint[0] -= 2.5;
            toPoint[0] -= 2.5;
            fromPoint[1] += 2.5;
            toPoint[1] += 2.5;
          }
        }

      }
      var controlPointX = midX + scaling * vectorX,
        controlPointY = midY + scaling * vectorY;
      //controlPointY = (controlPointY <= 70)? controlPointY + controlPoint_offset: controlPointY;
      //controlPointY = (controlPointY >= 140)? controlPointY - controlPoint_offset: controlPointY;
      this.g.path('M ' + fromPoint[0] + ',' + fromPoint[1] + ' Q' + controlPointX + ',' +
        controlPointY + ' ' + toPoint[0] + ',' + toPoint[1], options);
    } else { //line (same as .movePoints)
      this.g.path(("M" + fromPoint[0] + " " + fromPoint[1] + "L" + toPoint[0] + " " + toPoint[1]), options);
    }

    // update the edge label position
    if ($.isFunction(this._labelPositionUpdate)) {
      var bbtop = Math.min(fromPoint[1], toPoint[1]),
        bbleft = Math.min(fromPoint[0], toPoint[0]),
        bbwidth = Math.abs(fromPoint[0] - toPoint[0]),
        bbheight = Math.abs(fromPoint[1] - toPoint[1]);
      if (this.start().equals(this.end())) { //in case of loop arrow we need to do the same as we did for the arrow direction.
        var FAnodes = this.container._nodes;
        var minToplocation = FAnodes[0].position().top,
          maxTopLocation = FAnodes[0].position().top;
        for (var n = 1; n < FAnodes.length; n++) {
          minToplocation = Math.min(minToplocation, FAnodes[n].position().top);
          maxTopLocation = Math.max(maxTopLocation, FAnodes[n].position().top);
        }
        bbtop = Math.round(start.top - 1.1 * sHeight);
        if ((this.end().position().top > this.container.element.height() / 2) && minToplocation !== maxTopLocation) {
          var labelCount = this._weight.split("<br>").length;
          bbtop = Math.round(start.top + sHeight * 2 + 2.6 * sHeight + 20 * (labelCount - 1));
        }
        bbleft = Math.round(start.left);
        bbwidth = Math.round(2 * sWidth);
        bbheight = Math.round(0.5 * sHeight);
      }
      var bbox = { top: bbtop, left: bbleft, width: bbwidth, height: bbheight };
      this._labelPositionUpdate($.extend({ bbox: bbox }, options));

      // rotate label to fit along the edge:
      var rotateAngle;
      if ((Math.PI / 2.0) < fromAngle && fromAngle < (3 * Math.PI / 2.0)) {
        rotateAngle = normalizeAngle(Math.PI - fromAngle);
      } else {
        rotateAngle = normalizeAngle((2 * Math.PI) - fromAngle);
      }
      if (this.options.arc) {
        if ((controlPointY - midY) / Math.abs(controlPointY - midY) > 0) {
          this._label.css("transform", "rotate(" + rotateAngle + "rad)" + " translateY(" + (this._label.element.height() / 2.0 + strokeWidth + 1 + this.options.arcoffset / 2.0) + "px)");
        } else {
          this._label.css("transform", "rotate(" + rotateAngle + "rad)" + " translateY(-" + (this._label.element.height() / 2.0 + strokeWidth + 1 + this.options.arcoffset / 2.0) + "px)");
        }
      } else {
        this._label.css("transform", "rotate(" + rotateAngle + "rad)" + " translateY(-" + (this._label.element.height() / 2.0 + strokeWidth + 1) + "px)");
      }
    }

    if (this.start().value() === "jsavnull" || this.end().value() === "jsavnull") {
      this.addClass("jsavedge", options).addClass("jsavnulledge", options);
    } else {
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
    var b = 2 * ((pointb.x - pointa.x) * (pointa.x - center.x) + (pointb.y - pointa.y) * (pointa.y - center.y));
    var cc = center.x * center.x + center.y * center.y + pointa.x * pointa.x + pointa.y * pointa.y -
      2 * (center.x * pointa.x + center.y * pointa.y) - radius * radius;
    var deter = b * b - 4 * a * cc;

    function interpolate(p1, p2, d) {
      return { x: p1.x + (p2.x - p1.x) * d, y: p1.y + (p2.y - p1.y) * d };
    }
    if (deter <= 0) {
      result.inside = false;
    } else {
      var e = Math.sqrt(deter);
      var u1 = (-b + e) / (2 * a);
      var u2 = (-b - e) / (2 * a);
      if ((u1 < 0 || u1 > 1) && (u2 < 0 || u2 > 1)) {
        if ((u1 < 0 && u2 < 0) || (u1 > 1 && u2 > 1)) {
          result.inside = false;
        } else {
          result.inside = true;
        }
      } else {
        if (0 <= u2 && u2 <= 1) {
          result.enter = interpolate(pointa, pointb, u2);
        }
        if (0 <= u1 && u1 <= 1) {
          result.exit = interpolate(pointa, pointb, u1);
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
      urCornerA = Math.atan2(dim.height * 2.0, dim.width * 2.0),
      ulCornerA = pi - urCornerA,
      lrCornerA = 2 * pi - urCornerA,
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
      bottomAngle = 2 * pi - topAngle;
      // default to the right border line
      x = dim.x + dim.width;
      y = dim.y - dim.width * Math.tan(angle);

      // handle the rounded corners if necessary
      if (radius > 0 && angle > topAngle && angle < bottomAngle) { // the rounded corners
        // calculate intersection of the line between node centers and the rounded corner circle
        if (angle < bottomAngle && angle > pi) { // bottom right
          intersect = lineIntersectCircle({ x: dim.x, y: dim.y }, targetNodeCenter, { x: dim.x + dim.width - radius, y: dim.y + dim.height - radius }, radius);
        } else { // top right
          intersect = lineIntersectCircle({ x: dim.x, y: dim.y }, targetNodeCenter, { x: dim.x + dim.width - radius, y: dim.y - dim.height + radius }, radius);
        }
      }
    } else if (angle > ulCornerA && angle < llCornerA) { // left
      topAngle = pi - Math.atan2(dim.height - radius, dim.width);
      bottomAngle = 2 * pi - topAngle;

      // default to the left border line
      x = dim.x - dim.width;
      y = dim.y + dim.width * Math.tan(angle);

      // handle the rounded corners
      if (radius > 0 && (angle < topAngle || angle > bottomAngle)) {
        if (topAngle > angle) { // top left
          intersect = lineIntersectCircle({ x: dim.x, y: dim.y }, targetNodeCenter, // line
            { x: dim.x - dim.width + radius, y: dim.y - dim.height + radius }, radius); // circle
        } else { // bottom left
          intersect = lineIntersectCircle({ x: dim.x, y: dim.y }, targetNodeCenter, // line
            { x: dim.x - dim.width + radius, y: dim.y + dim.height - radius }, radius); // circle
        }
      }
    } else if (angle <= ulCornerA) { // top
      rightAngle = Math.atan2(dim.height, dim.width - radius);
      leftAngle = pi - rightAngle;

      // default to the top border line
      y = dim.y - dim.height;
      x = dim.x + (dim.height) / Math.tan(angle);

      // handle the rounded corners
      if (radius > 0 && (angle > leftAngle || angle < rightAngle)) {
        if (angle > leftAngle) { // top left
          intersect = lineIntersectCircle({ x: dim.x, y: dim.y }, targetNodeCenter, // line
            { x: dim.x - dim.width + radius, y: dim.y - dim.height + radius }, radius); // circle
        } else { // top right
          intersect = lineIntersectCircle({ x: dim.x, y: dim.y }, targetNodeCenter, // line
            { x: dim.x + dim.width - radius, y: dim.y - dim.height + radius }, radius); // circle
        }
      }
    } else { // on bottom side
      leftAngle = pi + Math.atan2(dim.height, dim.width - radius);
      rightAngle = 2 * pi - Math.atan2(dim.height, dim.width - radius);

      // default to the bottom border line
      y = dim.y + dim.height;
      x = dim.x - (dim.height) / Math.tan(angle);
      if (radius > 0 && (angle < leftAngle || angle > rightAngle)) {
        if (angle > rightAngle) { // bottom right
          intersect = lineIntersectCircle({ x: dim.x, y: dim.y }, targetNodeCenter, // line
            { x: dim.x + dim.width - radius, y: dim.y + dim.height - radius }, radius); // circle
        } else { // bottom left
          intersect = lineIntersectCircle({ x: dim.x, y: dim.y }, targetNodeCenter, // line
            { x: dim.x - dim.width + radius, y: dim.y + dim.height - radius }, radius); // circle
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
  transitionproto.dfaArc = function (newBool) {
    if (typeof newBool === "undefined") {
      return this.options.arc;
    } else if (typeof newBool === 'boolean') {
      this.options.arc = newBool;
    }
  };




  var dstypes = JSAV._types.ds;
  dstypes.Automaton = Automaton;
  dstypes.State = State;
  dstypes.Transition = Transition;
  var toColonForm = function (string) {
    var re = string.replace(/,/g, ":");
    re = re.replace(/;/g, ":");
    return re;
  }


  // function to toggle the intitial state of a node
  // appears as a button in the right click menu
  var toggleInitial = function (g, node) {
    $("#rmenu").hide();
    node.unhighlight();
    if (node.equals(g.initial)) {
      g.removeInitial(node);
    } else {
      if (g.initial) {
        alert("There can only be one intial state!");
      } else {
        g.makeInitial(node);
      }
    }
  };

  // function to toggle the final state of a node
  // appears as a button in the right click menu
  var toggleFinal = function (g, node) {
    if (node.hasClass("final")) {
      node.removeClass("final");
    } else {
      node.addClass("final");
    }
    $("#rmenu").hide();
    node.unhighlight();
  };

  // function to change the customized label of a node
  // an option in right click menu
  var changeLabel = function (node) {
    $("#rmenu").hide();
    var nodeLabel = prompt("How do you want to label it?");
    if (!nodeLabel || nodeLabel == "null") {
      nodeLabel = "";
    }
    node.stateLabel(nodeLabel);
    node.stateLabelPositionUpdate();
    node.unhighlight();
  }

  // function to clear the customized label
  // an option in the right click menu
  var clearLabel = function (node) {
    $("#rmenu").hide();
    node.unhighlight();
    node.stateLabel("");
  }

  // Function to switch which empty string is being used (lambda or epsilon) if a loaded graph uses the opposite representation to what the editor is currently using.
  var checkEmptyString = function (w) {
    var wArray = w.split("<br>");
    // It is necessary to check every transition on the edge.
    for (var i = 0; i < wArray.length; i++) {
      if ((wArray[i] == lambda || wArray[i] == epsilon) && wArray[i] != emptystring) {
        emptyString();
      }
    }
    return wArray.join("<br>");
  };
  window.toColonForm = toColonForm;
  window.toggleInitial = toggleInitial;
  window.toggleFinal = toggleFinal;
}(jQuery));
//END of Automaton class


/*
****************************************************************************
  Finite Automaton module.
  An extension to the JFLAP library.
****************************************************************************
*/
(function ($) {
  var FiniteAutomaton = function (jsav, options) {
    Automaton.apply(this, arguments);
    this.configurations = $("<ul>"); // configurations jQuery object used to setup view at a step
    this.configViews = []; // configurations view for a step
    this.step = 0; // current step the user is at, used for changing configuration display
    if (options.url) { //load the machine from the file
      this.loadFAFromJFLAPFile(options.url);
      //this.disableDragging();
    }
  }

  JSAV.ext.ds.FA = function (options) {
    var opts = $.extend(true, { visible: true, autoresize: true }, options);
    return new FiniteAutomaton(this, opts);
  };

  JSAV.utils.extend(FiniteAutomaton, JSAV._types.ds.Graph);

  FiniteAutomaton.prototype = Object.create(Automaton.prototype, {});
  var faproto = FiniteAutomaton.prototype;
  window.FiniteAutomaton = FiniteAutomaton;
  faproto.loadFAFromJFLAPFile = function (url) {
    if (ODSA.UTILS.scoringServerEnabled()) { //we need to change the url from relative path to absolute path
      var oldUrlParts = url.split('/AV');
      url = '/OpenDSA/AV' + oldUrlParts[1];
    }
    var parser,
      xmlDoc,
      text,
      jsav = this.jsav;
    $.ajax({
      url: url,
      async: false, // we need it now, so not asynchronous request
      success: function (data) {
        text = data;
      }
    });
    if (window.DOMParser) {
      parser = new DOMParser();
      xmlDoc = parser.parseFromString(text, "text/xml");
    } else {
      xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
      xmlDoc.async = false;
      xmlDoc.loadXML(txt);
    }
    if (!xmlDoc.getElementsByTagName("type")[0]) {
      // This file is not a file that can be parsed.
      window.alert('File does not contain an automaton.');
      return;
    }
    if (xmlDoc.getElementsByTagName("type")[0].childNodes[0].nodeValue !== 'fa') {
      // This file was created by a different automaton editor.
      window.alert('File does not contain a finite automaton.');
      return;
    } else {
      var maxYvalue = 0;
      var nodeMap = {}; // map node IDs to nodes
      var xmlStates = xmlDoc.getElementsByTagName("state");
      //xmlStates = sortBy(xmlStates, function(x) { return x.id; })

      var xmlTrans = xmlDoc.getElementsByTagName("transition");
      // Iterate over the nodes and initialize them.
      for (var i = 0; i < xmlStates.length; i++) {
        var x = Number(xmlStates[i].getElementsByTagName("x")[0].childNodes[0].nodeValue);
        var y = Number(xmlStates[i].getElementsByTagName("y")[0].childNodes[0].nodeValue);
        maxYvalue = (y > maxYvalue) ? x : maxYvalue;
        var newNode = this.addNode({ left: x, top: y, value: xmlStates[i].attributes[1].nodeValue });
        // Add the various details, including initial/final states and state labels.
        var isInitial = xmlStates[i].getElementsByTagName("initial")[0];
        var isFinal = xmlStates[i].getElementsByTagName("final")[0];
        var isLabel = xmlStates[i].getElementsByTagName("label")[0];
        if (isInitial) {
          this.makeInitial(newNode);
        }
        if (isFinal) {
          newNode.addClass('final');
        }
        if (isLabel) {
          label_val = '<p class = "label_css">' + isLabel.childNodes[0].nodeValue + '</p>';
          newNode.stateLabel(label_val);
        }
        nodeMap[xmlStates[i].id] = newNode;
        newNode.stateLabelPositionUpdate();
      }
      // Iterate over the edges and initialize them.
      for (var i = 0; i < xmlTrans.length; i++) {
        var from = xmlTrans[i].getElementsByTagName("from")[0].childNodes[0].nodeValue;
        var to = xmlTrans[i].getElementsByTagName("to")[0].childNodes[0].nodeValue;
        var read = xmlTrans[i].getElementsByTagName("read")[0].childNodes[0];
        // Empty string always needs to be checked for.
        if (!read) {
          read = emptystring;
        } else {
          read = read.nodeValue;
        }
        var edge = this.addEdge(nodeMap[from], nodeMap[to], { weight: read });
        edge.layout();
      }
      var currentFAHeight = this.element.height();
      this.element.height(Math.max(currentFAHeight, maxYvalue));
      //jsav.displayInit();
    }
    /*if (auto === 'auto'){
      layoutGraph();
      }*/
  };

  var union = function(graph, Starts, Ends){
    var start = graph.addNode();
    var nodes = graph.nodes();
    graph.makeInitial(start);
    for (i in Starts){
      graph.addEdge(start, Starts[i], {weight: lambda});
    }
    var end = graph.addNode();
    graph.makeFinal(end);
    for (i in Ends){
      graph.addEdge(Ends[i], end, {weight: lambda});
    }
    graph.layout();
  }

  /*
    Combine two NFAs. 
  */
  var combine = function(jsav, newOne, other, opts) {
    var lambda = String.fromCharCode(955)
    g = jsav.ds.FA($.extend({ layout: 'automatic' }, opts));
    var otherStates = other.nodes();
    var newOneStates = newOne.nodes();
    var newOneStart = 0;
    var otherStart = newOneStates.length;
    var newOneFinals = [];
    var otehrFinals = [];
    var starts = [];
    var ends = [];
    //var otherToNew = {};
    for(i = 0; i < newOneStates.length; i++){
      s = newOneStates[i];
      var s1 = g.addNode();
      if (s.hasClass('final')){
        //s1.addClass('final');
        ends.push(s1);
        newOneFinals.push(s1);
      }
      if (s.hasClass('start')){
        starts.push(s1);
        newOneStart = i;
      }
    }
    for(i = 0; i < otherStates.length; i++){
      s = otherStates[i];
      var s1 = g.addNode();
      if (s.hasClass('final')){
        ends.push(s1);
        otehrFinals.push(s1);
      }
      if (s.hasClass('start')){
        starts.push(s1);
        otherStart += i;
      }
    }

    otherEdges = other.edges();
    newOneEdges = newOne.edges();
    newNodes = g.nodes();

    for(i = 0; i < newOneEdges.length; i++){
      e1 = newOneEdges[i];
      fromInd = newOneStates.indexOf(e1.start());
      toInd = newOneStates.indexOf(e1.end());
      label = e1.label();
      weight = e1.weight();
      g.addEdge(newNodes[fromInd], newNodes[toInd], { weight: weight});
    }

    for(i = 0; i < otherEdges.length; i++){
      e = otherEdges[i];
      fromInd = otherStates.indexOf(e.start());
      toInd = otherStates.indexOf(e.end());
      label = e.label();
      weight = e.weight();
      g.addEdge(newNodes[fromInd+newOneStates.length], newNodes[toInd+newOneStates.length], { weight: weight});
    }
    g.layout();

    var result = {'graph': g, 'start': starts, 'end': ends}
    return result;
  };

  /*
    Take the complement of a NFA
  */
  var complement = function(jsav, graph, opts) {
    var nodes = graph.nodes();

    for (var next = nodes.next(); next; next = nodes.next()) {
      toggleFinal(graph, next);    
    }
    
    graph.layout();
    return graph;
  };


  /*
    NFA to DFA conversion
    Note: g.transitionFunction takes a single node and returns an array of node values
    Requires underscore.js
  */
  var convertToDFA = function (jsav, graph, opts, visualizable = false) {
    var left = 10;
    var g;
    if (!visualizable)
      g = jsav.ds.FA($.extend({ layout: 'automatic' }, opts)),
        alphabet = Object.keys(graph.alphabet),
        startState = graph.initial,
        newStates = [];
    else {
      var options = $.extend(true, { layout: 'automatic' }, opts);
      g = jsav.ds.FA(options),
        alphabet = Object.keys(graph.alphabet),
        startState = graph.initial,
        newStates = [];
    }
    // Get the first converted state
    if (visualizable)
      jsav.umsg("The first step is to find the lambda closure for the NFA start state. From the NFA's start state, find every other state that can be reached by a lambda transition.");
    var first = lambdaClosure([startState.value()], graph).sort().join();
    if (visualizable) {
      var listOfFirstNodes = first.split(',');
      var highlightedNodes = [];
      for (var i = 0; i < listOfFirstNodes.length; i++) {
        var node = graph.getNodeWithValue(listOfFirstNodes[i])
        node.highlight();
        highlightedNodes.push(node);
      }
    }
    newStates.push(first);
    if (visualizable) {
      jsav.step();
      jsav.umsg("The resulting list of states becomes the name of the DFA's start state.");
    }
    var temp = newStates.slice(0);
    first = g.addNode({ value: first });
    g.makeInitial(first);
    g.layout();
    if (visualizable) {
      left += 50;
      for (var state in highlightedNodes) {
        highlightedNodes[state].unhighlight();
      }
      jsav.step();
      jsav.umsg("Now identify the transitions out of the DFA start state. For each symbol in the alphabet, consider all states reachable in the NFA from any state in the start state on that symbol. Use this list of states as the name of the target state on that transition.");

    }
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
        var nodeName = next.sort().join();
        var node;

        if (nodeName) {
          if (!_.contains(newStates, nodeName)) {
            temp.push(nodeName);
            newStates.push(nodeName);
            node = g.addNode({ value: nodeName });
            if (visualizable) {
              if (left + 50 < opts.width)
                left += 50;
              g.layout();
            }
          } else {
            node = g.getNodeWithValue(nodeName);
          }
          var edge = g.addEdge(prev, node, { weight: letter });
        }
      }
      if (visualizable) {
        if (temp.length > 0) {
          jsav.step();
          jsav.umsg("Repeat the process for each state until all DFA states have transitions for each symbol in the alphabet.");
        }
      }
    }
    // add the final markers
    if (visualizable) {
      jsav.umsg("Next, we determine the final states. We mark as final all states in the DFA that include in their name some final state in the NFA.");
      jsav.step();
    }
    addFinals(g, graph);
    g.layout();
    if (visualizable) {
      jsav.step();
      jsav.umsg("The final (optional) step is to rename the states.")
    }
    /*var nodes = g.nodes();
      for (var next = nodes.next(); next; next = nodes.next()) {
      next.stateLabel(next.value());
      next.stateLabelPositionUpdate();
      }*/
    g.updateNodes();
    g.layout();
    //g.disableDragging();
    return g;
  };

  // Function to add final markers to the resulting DFA
  var addFinals = function (g1, g2) {
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
  var lambdaClosure = function (input, graph) {
    var arr = [];
    for (var i = 0; i < input.length; i++) {
      arr.push(input[i]);
      var next = graph.transitionFunction(graph.getNodeWithValue(input[i]), lambda);
      arr = _.union(arr, next);
    }
    var temp = arr.slice(0);
    while (temp.length > 0) {
      var val = temp.pop(),
        next = graph.transitionFunction(graph.getNodeWithValue(val), lambda);
      next = _.difference(next, arr);
      arr = _.union(arr, next);
      temp = _.union(temp, next);

    }
    return arr;
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

  var visualizeConvertToDFA = function (jsav, graph, opts) {
    // jsav.label("Converted:");
    var left = 10;
    var options = $.extend(true, { layout: 'automatic' }, opts);
    var g = jsav.ds.FA(options),
      alphabet = Object.keys(graph.alphabet),
      startState = graph.initial,
      newStates = [];
    // Get the first converted state
    jsav.umsg("The first step is to find the lambda closure for the NFA start state.");
    var first = lambdaClosure([startState.value()], graph).sort().join();
    var listOfFirstNodes = first.split(',');
    var highlightedNodes = [];
    for (var i = 0; i < listOfFirstNodes.length; i++) {
      var node = graph.getNodeWithValue(listOfFirstNodes[i])
      node.highlight();
      highlightedNodes.push(node);
    }
    newStates.push(first);
    jsav.step();
    jsav.umsg("The result we got is the start state for the DFA.");
    var temp = newStates.slice(0);

    first = g.addNode({ value: first });
    left += 50;
    g.makeInitial(first);
    g.layout();
    for (var state in highlightedNodes) {
      highlightedNodes[state].unhighlight();
    }
    jsav.step();
    jsav.umsg("Nest step is to identify the transitons for the DFA start state.");

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
        var nodeName = next.sort().join();
        var node;

        if (nodeName) {
          if (!_.contains(newStates, nodeName)) {
            temp.push(nodeName);
            newStates.push(nodeName);
            node = g.addNode({ value: nodeName });
            if (left + 50 < opts.width)
              left += 50;
            g.layout();
          } else {
            node = g.getNodeWithValue(nodeName);
          }
          var edge = g.addEdge(prev, node, { weight: letter });
        }
      }
      if (temp.length > 0) {
        jsav.step();
        jsav.umsg("repeat the same process for each new node we find");
      }
    }
    // add the final markers
    jsav.umsg("Determine the final states");
    addFinals(g, graph);
    g.layout();
    jsav.step();
    jsav.umsg("Final step is to rename the states names.")
    var nodes = g.nodes();
    for (var next = nodes.next(); next; next = nodes.next()) {
      next.stateLabel(next.value());
      next.stateLabelPositionUpdate();
    }
    g.updateNodes();
    return g;
  };

  //helper function to get a node with its value in the graph
  var getNodeWithValue = function (graph, value) {
    var nodes = graph.nodes();
    for (var node = nodes.next(); node; node = nodes.next()) {
      if (node.value() === value) {
        return node;
      }
    }
  };


  //Complete the DFA by adding missing edges from each nodes to a new node. 
  var completeDFA = function(jsav, graph){

    graph.options = $.extend({layout: 'automatic'}, graph.options);
    nodes = graph.nodes();
    edges = graph.edges();
    alp = graph.alphabet;
    alphabet = [];
    missing = {};
    hasMissing = false;
    for (const key in alp) {
      alphabet.push(key);
    }
    for (var next = nodes.next(); next; next = nodes.next()) {
      var edgesFromNext = next.container._edges[next.container._nodes.indexOf(next)];
      if (edgesFromNext.length != alphabet.length){
        if (edgesFromNext.length == 0){
          missing[next.container._nodes.indexOf(next)] = [];
          for (i in alphabet){
            missing[next.container._nodes.indexOf(next)].push(alphabet[i]);
          }
        }
        else {
          for (edge in edgesFromNext){
            var weights = edgesFromNext[edge]._weight.split('<br>');
            if (weights.length != alphabet.length){
              hasMissing =true;
              missing[next.container._nodes.indexOf(next)] = [];
              for (i in alphabet){
                if (weights.indexOf(alphabet[i]) == -1){
                  missing[next.container._nodes.indexOf(next)].push(alphabet[i]);
                }
              }
            }
          }
        }
      }
    }

    if (hasMissing){
      var newNode = graph.addNode();
      var newLabel = alphabet.toString().replace(',', '<br>');
      graph.addEdge(newNode, newNode, {weight: newLabel});
      for (i in missing){
        var label = missing[i].toString().replace(',', '<br>');
        graph.addEdge(nodes[i], newNode, {weight: label});
      }
    }
    graph.layout();
    return graph;
  };

  /*
    Find the intersection between two DFAs by DeMorgan's Law
  */
  FiniteAutomaton.intersect = function(jsav,first, second,opts){
    figure1 = FiniteAutomaton.complement(jsav, first, opts);
    figure2 = FiniteAutomaton.complement(jsav, second, opts);
    jsav.umsg("Take complement of the two machines");
    jsav.step();

    figure1.hide();
    figure2.hide();
    var combinedResult = FiniteAutomaton.combine(jsav, figure1, figure2, {left: 10, top:0, height: 450, width: 750});
    var combined = combinedResult['graph'];
    jsav.umsg("combine the two machines in one window");
    jsav.step();

    FiniteAutomaton.union(combined, combinedResult['start'], combinedResult['end']);
    jsav.umsg("take union of the two machines");
    jsav.step();

    combined.hide();
    var dfa = FiniteAutomaton.convertNFAtoDFA(jsav, combined, {top: 0, left: 10, width: 500, height: 150});
    jsav.umsg("Convert the NFA machine to DFA")
    jsav.step();

    var mytree = new jsav.ds.tree({width: 400, height: 340, editable: true, left: 550, top: 0});
    mytree.hide();
    dfa.hide();
    var minm = new Minimizer();
    var minized = minm.minimizeDFA(jsav, dfa, mytree, {left: 10, top:0, height: 450, width: 750}, false);
    jsav.umsg("Then, minimize the DFA");
    jsav.step();


    minized = FiniteAutomaton.complement(jsav, minized, {left: 10, top:0, height: 450, width: 750});
    minized.layout();
    jsav.umsg("Finaly, take the complement of the minimized DFA so we will get the intersection");

    return minized;

  };

  

  /*
    Get edge outgoing edge from the node
  */
  FiniteAutomaton.edgeFrom = function(node){
    return  node.container._edges[node.container._nodes.indexOf(node)];
  };

  /*
    Get the alphabet of a graph.
  */
  var findAlphabet = function(graph){
    var alp =  graph.alphabet;
    var alphabet = [];
    for (const key in alp) {
      alphabet.push(key);
    }
    alphabet.sort();
    return alphabet;
  };

  /*
    Get the relation matrix of a graph. 
    The first row of the matrix should be the alphabets 
    Then, the rest rows will be the from node, and the end nodes 
    connected to the from node by an edge with the according letter
    in the alphabet in the first row. 
  */
  var matrixFromRelation = function(figure, matrix, alphabet){
    var table = [];
    var row1 = [];
    row1.push(' ');
    for (var row in matrix){
      var tableRow = [];
      tableRow.push(figure.nodes()[row].options['value']);
      for (var a in alphabet){
        if (row == 0){
          row1.push(alphabet[a]);
        }
        var ind = matrix[row][alphabet[a]];
        //console.log(ind);
        var aNode = figure.nodes()[ind].options['value'];
        tableRow.push(aNode);
      }
      if (row == 0){
        table.push(row1);
      }
      table.push(tableRow);
    }
    return table;
  }

  /*
    Change the node names of a graph
    Example: One graph can have nodes {q1, q2, q3}. 
            Call FiniteAutomaton.changeNodeName(graph, "p"), 
            The nodes will be changed to {p1, p2, p3};
  */
  FiniteAutomaton.changeNodeName = function(figure, name){
    for (i in figure._nodes) {
      figure._nodes[i].value(name + i);
      figure._nodes[i].options['value'] = name + i;
    }
  }


  /*
    Generate an empty matrix with. 
    Example: If alphabet is {"q1", "q2", "q3"}, and rowNum is 2
            The result empty matrix should look like: 
            ----------------
            |  | a | b | c |
            ----------------
            |  |   |   |   |
            ----------------
            |  |   |   |   |
            ----------------
            |  |   |   |   |
            ----------------
  */
  var emptyMatrix = function(alphabet, rowNum){
    var table = [];
    var row1 = [];
    row1.push(' ');
    for (var row = 0;row<rowNum;row+=1){
      var tableRow = [];
      tableRow.push('');
      for (var a in alphabet){
        if (row == 0){
          row1.push(alphabet[a]);
        }
        var aNode = '';
        tableRow.push(aNode);
      }
      if (row == 0){
        table.push(row1);
      }
      table.push(tableRow);
    }
    return table;
  }

  /*
    Get the intersection of two NFAs with transition tables
  */
  FiniteAutomaton.intersectionFromTable = function(av, figure1, figure2){
    var matrix1 = findTable(av, figure1);
    var matrix2 = findTable(av, figure2);
    var alphabet = findAlphabet(figure1);

    var table1 = matrixFromRelation(figure1, matrix1, alphabet);
    var table2 = matrixFromRelation(figure2, matrix2, alphabet);
    

    var table1g = av.ds.matrix(table1, { left: 600, style: "table" });
    var table2g = av.ds.matrix(table2, { left: 600, top: 200, style:"table"});


    av.step();
    
    var rowNum = figure1.nodes().length * figure2.nodes().length;
    var table = emptyMatrix(alphabet, rowNum);
    
    var intersectionTable = av.ds.matrix(table, { left: 800, style:"table" });
    var inter = new av.ds.FA({left: 0, top:20, height: 500, width: 500, layout: 'automatic'});

    intersectFromTable(av, inter, figure1, figure2, matrix1, matrix2,table1g, table2g, alphabet, intersectionTable);
    var matrix = findTable(av, inter);
    
    inter.layout();
    return inter;
  };

  /*
    Get intersection from the intersection table
    Arguement table1, table2 are the table find by FiniteAutomaton.findTable().
    table1g and table2g are the jsav.ds.matrix generated with the matrix found by
    FiniteAutomaton.matrixFromRelation(). 
    The intersectionTable should be an empty table to 
  */
  var intersectFromTable = function(av, graph, graph1, graph2, table1, table2,tabl1g, tabl2g, alphabet, intersectionTable){
    var nodes = [];
    var toNodes = [];
    //var unitsize = graph.
    let counter = 0;
    var tableNum = 0;
    graph.hide();
    for (var i in table1){

      //var leftNodeName = getNodeWithValue(graph1, )
      var leftNodeName = graph1.nodes()[i].options['value'];
      //console.log(leftNodeName.options['value']);
      for (var j in table2){
        var rightNodeName = graph2.nodes()[j].options['value'];
        //nodes.push('(' + leftNodeName + ',' + rightNodeName + ')');
        var fromNodeName = '(' + leftNodeName + ',' + rightNodeName + ')';
        tableNum+=1;
        intersectionTable._arrays[tableNum].value(0, fromNodeName);
        var added = graph.addNode({ value: fromNodeName });
        if (table1[i]['initial'] && table2[j]['initial']){
          graph.makeInitial(added);
        }

        if (table1[i]['final'] && table2[j]['final']){
          graph.makeFinal(added);
        }
        nodes[counter] = fromNodeName;
        toNodes[counter] = {};

        counter += 1;
      }
    }
    
    tableNum = 0;
    counter = 0;
    graph1.hide();
    graph2.hide();

    graph.layout();
    graph.show();
    av.step();
    for (var i in table1){

      intersectionTable._arrays[tableNum+1].highlight(0);
      tabl1g._arrays[Number(i)+1].highlight(0);
      var leftNodeName = graph1.nodes()[i].options['value'];
      for (var j in table2){
        tabl2g._arrays[Number(j)+1].highlight(0);
        var rightNodeName = graph2.nodes()[j].options['value'];
        var fromNodeName = '(' + leftNodeName + ',' + rightNodeName + ')';
        tableNum+=1;
        intersectionTable._arrays[tableNum].highlight(0);
        nodes[counter] = fromNodeName;
        toNodes[counter] = {};

        for (var k in alphabet){
          tabl1g._arrays[0].highlight(Number(k)+1);
          tabl2g._arrays[0].highlight(Number(k)+1);
          tabl1g._arrays[Number(i)+1].highlight(Number(k)+1);
          tabl2g._arrays[Number(j)+1].highlight(Number(k)+1);
          var toLeftNodeInd = table1[i][alphabet[k]];
          var toRightNodeInd = table2[j][alphabet[k]];
          var toLeftNodeName = graph1.nodes()[toLeftNodeInd].options['value'];
          var toRightNodeName = graph2.nodes()[toRightNodeInd].options['value'];
          graph1.nodes()[toLeftNodeInd].highlight();
          graph2.nodes()[toRightNodeInd].highlight();
          var toNodeName = '(' + toLeftNodeName + ',' + toRightNodeName + ')';
          intersectionTable._arrays[tableNum].value(Number(k)+1, toNodeName);


          var edgeweight = alphabet[k];
          var fromNode = getNodeWithValue(graph, fromNodeName);
          var toNode = getNodeWithValue(graph, toNodeName);
          fromNode.highlight();
          toNode.highlight();
          graph.addEdge(fromNode, toNode, { weight: edgeweight });
          graph.layout();
          av.step();
          fromNode.unhighlight();
          toNode.unhighlight();
          graph1.nodes()[toLeftNodeInd].unhighlight();
          graph2.nodes()[toRightNodeInd].unhighlight();
          tabl1g._arrays[Number(i)+1].unhighlight(Number(k)+1);
          tabl2g._arrays[Number(j)+1].unhighlight(Number(k)+1);
          tabl1g._arrays[0].unhighlight(Number(k)+1);
          tabl2g._arrays[0].unhighlight(Number(k)+1);
          toNodes[counter][alphabet[k]] = toNodeName;
        }

        counter += 1;
        intersectionTable._arrays[tableNum].unhighlight(0);
        tabl2g._arrays[Number(j)+1].unhighlight(0);
      }
     tabl1g._arrays[Number(i)+1].unhighlight(0);
    }

    graph.layout();
  };


  /*
    findTable returns a table containing information for each node. 
    Each element in the array should record the outcoming edge with
    the number of its corresponding endnode; it should also record
    whether the node is a initial node or a final node. 
    For example: {a:2, b:2, initial: false, final: false}
  */
  var findTable = function(jsav, graph){
    var table = [];
    var alp =  graph.alphabet;
    var alphabet = [];
    for (const key in alp) {
      alphabet.push(key);
    }
    alphabet.sort();

    var nodes = graph.nodes();
    for (var node = nodes.next(); node; node = nodes.next()){
      var edgesFromNode = node.container._edges[node.container._nodes.indexOf(node)];
      var startNodeValue = node.options["value"];
      var index = node.container._nodes.indexOf(node);
      
      table[index] = {};

      for (edge in edgesFromNode){
        var oneEdge = edgesFromNode[edge];
        var endNode = oneEdge.endnode;
        var label = oneEdge._weight;
        var labels = label.split("<br>");
        for(i in labels){
          var endNodeValue = endNode.options["value"];
          table[index][labels[i]] = endNode.container._nodes.indexOf(endNode);
        }
        table[index]['initial'] = false;
        table[index]['final'] = false;

      }
    }
    var initial = graph.initial;
    var initialInd = initial.container._nodes.indexOf(initial);
    table[initialInd]['initial'] = true;

    var finals = graph.getFinals();
    for (find in finals){
      var finalInd = finals[find].container._nodes.indexOf(finals[find]);
      table[finalInd]['final'] = true;
    }
    return table;
  };


  /*
    Visualize the right quotient algorithm between 2 NFAs.
  */
  FiniteAutomaton.rightQuotient = function(jsav, graph1, graph2, option){
    var nodes = graph1.nodes();
    var nodes2 = graph2.nodes();
    var initial2 = graph2.initial;
    var last;
    for (var next = nodes.next();next;next=nodes.next()){
      var edges2 = initial2.getOutgoing();
      var edges1 =next.getOutgoing();
      if (last!=null){
        last.unhighlight();
      }
      next.highlight();
      last = next;
      jsav.step();
      
      var found = false;
      for (var i = 0, j = 0; i < edges1.length && j < edges2.length; ){
        var edge1 = edges1[i];
        var edge2 = edges2[j];
        var end1 = edge1.endnode;
        var end2 = edge2.endnode;
        end1.highlight();
        end2.highlight();
        jsav.step();
        end1.unhighlight();
        end2.unhighlight();

        var weights = edge1._weight.split('<br>');


        if (weights.includes(edge2._weight)){

          if (edge1.endnode.hasClass('final') && edge2.endnode.hasClass('final')){
            found = true;
            break;

          }
          else {
            if (edge1.endnode == edge1.startnode && edge2.endnode == edge2.startnode){
              if (edge1.endnode.hasClass('final'))
                j++;
              else if (edge2.endnode.hasClass('final'))
                i++;
              else
                break;
            }
            else if (edge1.endnode == edge1.startnode){
              i++;
              if (!edge2.endnode.hasClass('final')){
                edges2 = edge2.endnode.getOutgoing();
                j = 0;
              }

            }
            else if (edge2.endnode == edge2.startnode){
              j++;
              if (!edge1.endnode.hasClass('final')){
                edges1 = edge1.endnode.getOutgoing();
                i = 0;
              }
            }
            else{
              edges1 = edge1.endnode.getOutgoing();
              edges2 = edge2.endnode.getOutgoing();
              i = 0;
              j = 0;
            }
          }
        }
        else {
          i++;
        }
      }
      if (found){
        graph1.makeFinal(next);
      }
      else{
        next.removeClass('final');
      }
    }
  }

  var quotient = function(jsav, graph1, graph2, option){
    var controller = new window.FAtoREController(jsav, graph1);
    var finalLeft = graph1.getFinals()[0];
    var finalRight = graph2.getFinals()[0];
    var edgesCheckedLeft = [];
    var edgesCheckedRight = [];
    var end = finalLeft;
    while(finalRight != graph2.initial && finalLeft != graph1.initial){
      var edgesLeft = finalLeft.getIncoming();
      var edgesRight = finalRight.getIncoming();
      var keepGoing = false;
      //console.log(finalRight);
      var found = false;
      for (var edgeRight in edgesRight){
        if (found){
          break;
        }
        var edge2 = edgesRight[edgeRight];
        for (var edgeLeft in edgesLeft){
          var edge1 = edgesLeft[edgeLeft];
          if (edge1._weight == edge2._weight){

            finalRight.highlight();
            finalLeft.highlight();
            var lastRight = finalRight;
            var lastLeft = finalLeft;
            
            edgesCheckedLeft.push(edge1);
            

            edgesCheckedRight.push(edge2);
            
            finalLeft =  edge1.startnode;
            finalRight = edge2.startnode;
            finalRight.highlight();
            finalLeft.highlight();
            jsav.step();
            edge1.hide();
            jsav.step();
            lastRight.unhighlight();
            lastLeft.unhighlight();
            found = true;

            lastLeft.hide();
            for (var hiddenLeft in edgesLeft){
              if (edgesLeft[hiddenLeft].isVisible()){
                lastLeft.show();
              }
            }
            break;
          }
        }
      }
    }
    jsav.step();
    graph1.hide();
    graph2.hide();
    var figure = new jsav.ds.FA(option);
    var edges = graph1.edges();
    for (var next = edges.next(); next; next = edges.next()) {
      if (!edgesCheckedLeft.includes(next)){
        var start = next.startnode;
        var end = next.endnode;
        var finalFrom = figure.getNodeWithValue(start.options.value);
        
        if (!finalFrom){
          finalFrom = figure.addNode({value: start.options.value});
        }
        var finalTo = figure.getNodeWithValue(end.options.value);
        if (!finalTo){
          finalTo = figure.addNode({value: end.options.value});
        }
        figure.addEdge(finalFrom, finalTo, {weight: next.weight()} );
      }
    }
    figure.makeInitial(figure.nodes()[0]);
    figure.makeFinal(figure.nodes()[figure.nodes().length-1]);
    figure.layout();
    return figure;
  };



  /**
   * MAke publicly available methods
   */
  FiniteAutomaton.convertNFAtoDFA = convertToDFA;
  window.FADepthFirstSearch = dfs;
  window.lambdaClosure = lambdaClosure;

  FiniteAutomaton.complement = complement;
  FiniteAutomaton.combine = combine
  FiniteAutomaton.completeDFA = completeDFA;
  FiniteAutomaton.union = union;
}(jQuery));
/*
****************************************************************************
  Traverse Acceptor
****************************************************************************
*/
(function ($) {
  // Used by FAEditor to determine if the given graph will accept the given input string.
  // This is necessary to determine whether the strings should be displayed in red or green in the JSAV array.
  var willReject = function (graph, inputString) {
    // Start with the closure of the initial state.
    var currentStates = [graph.initial];
    console.log(currentStates);
    currentStates = addLambdaClosure(graph, currentStates);
    var nextStates = currentStates;
    // Iterate over each character in the input string.
    for (var i = 0; i < inputString.length; i++) {
      for (var j = 0; j < currentStates.length; j++) {
        // Current is used to track which states have already been visited in each iteration of the loop. At the beginning of the loop, remove "current" from every state.
        currentStates[j].removeClass('current');
      }
      // Call traverse function.
      nextStates = traverse(graph, currentStates, inputString[i]);
      if (nextStates.length == 0) {
        // If there are no next states, the graph has rejected the input string. Break out of the loop.
        break;
      }
      // Prepare for next iteration of the loop.
      currentStates = nextStates;
    }
    var rejected = true;
    // Check to see if any of the states we have finished on are final states.
    for (var k = 0; k < currentStates.length; k++) {
      currentStates[k].removeClass('current');
      if (currentStates[k].hasClass('final') && nextStates.length > 0) {
        // Note that if the length of nextStates is zero, it means the break statement in Line 18 was triggered. We never reached the end of the input string, so the input was rejected and this if statement does not run.
        rejected = false;
      }
    }
    // Return a boolean indicating whether or not the input string was rejected.
    return rejected;
  };

  // Used by the FAEditor. This function can traverse over edges with sequences of input symbols on them.
  // This is used instead of willReject if "Shorthand" mode is enabled in the FAEditor.
  var willRejectShorthand = function (graph, inputString) {
    // Start with the closure of the initial state and with no edges selected.
    var currentStates = [graph.initial];
    currentStates = addLambdaClosure(graph, currentStates);
    var currentEdges = [];
    var edgeWeight = []; // edgeWeight[i] is the index of the string in currentEdges[i].split("<br>") that the traversal is currently situated on.
    var edgeProgress = []; // edgeProgress[i] is the index of the character of the string in currentEdges[i].split("<br>")[edgeWeight[i]] that the traversal is currently situated on.
    var nextStates = currentStates;
    var nextEdges = currentEdges;
    // Iterate over each character in the input string.
    for (var i = 0; i < inputString.length; i++) {
      for (var j = 0; j < currentStates.length; j++) {
        // Current is used to track which states have already been visited in each iteration of the loop. At the beginning of the loop, remove "current" from every state.
        currentStates[j].removeClass('current');
      }
      // Call pretraverse function (this avoids unnecessarily bolding edge weights in the FAEditor).
      var traverseStep = pretraverseShorthand(graph, currentStates, currentEdges, edgeWeight, edgeProgress, inputString[i]);
      nextStates = traverseStep[0];
      nextEdges = traverseStep[1];
      if (nextStates.length == 0 && nextEdges.length == 0) {
        // If there are no next states or next edges, the graph has rejected the input string. Break out of the loop.
        break;
      }
      // Prepare for next iteration of the loop.
      currentStates = nextStates;
      currentEdges = nextEdges;
      edgeWeight = traverseStep[2];
      edgeProgress = traverseStep[3];
    }
    var rejected = true;
    // Check to see if any of the states we have finished on are final states. (If we finished only in the middle of edges, this loop doesn't run and the input string is rejected - obviously, since we are not on any final state.)
    for (var k = 0; k < currentStates.length; k++) {
      currentStates[k].removeClass('current');
      if (currentStates[k].hasClass('final') && nextStates.length > 0) {
        // Note that if the length of nextStates is zero, it means the break statement in Line 59 was triggered. We never reached the end of the input string, so the input was rejected and this if statement does not run.
        rejected = false;
      }
    }
    // Return a boolean indicating whether or not the input string was rejected.
    return rejected;
  };

  // Used by willReject function and by FATraversal.js.
  // Calculates the next states traversed to given a graph, an array of current states, and a single input symbol.
  var traverse = function (graph, currentStates, letter) {
    var nextStates = [];
    // Iterate over current states.
    for (var i = 0; i < currentStates.length; i++) {
      var successors = currentStates[i].neighbors();
      // Iterate over every reachable state from the current state.
      for (var next = successors.next(); next; next = successors.next()) {
        var weight = graph.getEdge(currentStates[i], next).weight().split('<br>');
        // Iterate over every edge weight between the current state and the next state.
        for (var j = 0; j < weight.length; j++) {
          // If the edge weight matches the input symbol and the next state is not already accounted for (possible, if we already reached it from another current state), mark it as a next state.
          if (letter == weight[j] && !next.hasClass('current')) {
            next.addClass('current');
            nextStates.push(next);
          }
        }
      }
    }
    // For each of the next states, add its closure (i.e. every state it can reach on a lambda transition). Then return this list of states.
    nextStates = addLambdaClosure(graph, nextStates);
    return nextStates;
  };

  // Used by willRejectShorthand function to traverse the graph without affecting the CSS styles of the edges in the FAEditor.
  // Calculates the next states and edges traversed to given a graph, input symbols, and four arrays containing information on current states and edges.
  // This is used instead of traverse if "Shorthand" mode is enabled in the FAEditor.
  var pretraverseShorthand = function (graph, currentStates, currentEdges, edgeWeight, edgeProgress, letter) {
    var nextStates = [];
    var nextEdges = [];
    var eWeight = []; // eWeight[i] is the index of the string in nextEdges[i].split("<br>") that the traversal is progressing to.
    var eProgress = []; // eProgress[i] is the index of the character of the string in nextEdges[i].split("<br>")[eWeight[i]] that the traversal is progressing to.
    // Iterate over the current edges.
    for (var g = 0; g < currentEdges.length; g++) {
      // Isolate which edge transition we're on and which character of that edge transition we're on.
      var curEdge = currentEdges[g];
      var wArray = curEdge.weight().split('<br>');
      var w = wArray[edgeWeight[g]];
      var pos = edgeProgress[g];
      // If the next letter of the edge transition matches the input symbol...
      if (letter == w[pos + 1]) {
        pos = pos + 1;
        if (w.length == pos + 1) {
          // If the next letter is the last letter of the edge transition, we have made it to the next state.
          // Add the state at the end of this edge to the current states if it's currently unaccounted for.
          if (!curEdge.end().hasClass('current')) {
            curEdge.end().addClass('current');
            nextStates.push(curEdge.end());
          }
        } else {
          // If we are still in the middle of the edge transition, note the edge, the edge transition, and the new position in the edge transition.
          nextEdges.push(curEdge);
          eWeight.push(edgeWeight[g]);
          eProgress.push(pos);
        }
      }
    }
    // Iterate over the current states.
    for (var i = 0; i < currentStates.length; i++) {
      var successors = currentStates[i].neighbors();
      // Iterate over every reachable state from the current state.
      for (var next = successors.next(); next; next = successors.next()) {
        var edge = graph.getEdge(currentStates[i], next);
        var weight = edge.weight().split('<br>');
        // Iterate over every edge weight between the current state and the next state.
        for (var j = 0; j < weight.length; j++) {
          if (weight[j].length > 1) {
            // If the edge weight is more than one character long and matches the input symbol, mark the edge as a next edge.
            // Also note which edge transition is being traversed on and the current position in the edge transition (i.e. index zero).
            if (letter == weight[j][0]) {
              nextEdges.push(edge);
              eWeight.push(j);
              eProgress.push(0);
            }
          } else {
            // If the edge weight is one character long and matches the input symbol, and the next state is thus far unaccounted for, mark it as a next state.
            if (letter == weight[j] && !next.hasClass('current')) {
              next.addClass('current');
              nextStates.push(next);
            }
          }
        }
      }
    }
    // For each of the next states, add its closure (i.e. every state it can reach on a lambda transition). Then return this list of states.
    nextStates = addLambdaClosure(graph, nextStates);
    return [nextStates, nextEdges, eWeight, eProgress];
  };

  // Used by FATraversal.js to traverse the graph while updating the CSS styles of nodes and edges to indicate the overall state of the traversal.
  // Calculates the next states and edges traversed to given a graph, input symbols, and four arrays containing information on current states and edges.
  // This is used instead of traverse if "Shorthand" mode is enabled in the FAEditor.
  var traverseShorthand = function (graph, currentStates, currentEdges, edgeWeight, edgeProgress, letter) {
    var nextStates = [];
    var nextEdges = [];
    var eWeight = []; // eWeight[i] is the index of the string in nextEdges[i].split("<br>") that the traversal is progressing to.
    var eProgress = []; // eProgress[i] is the index of the character of the string in nextEdges[i].split("<br>")[eWeight[i]] that the traversal is progressing to.
    // Iterate over the current edges.
    for (var g = 0; g < currentEdges.length; g++) {
      // Isolate which edge transition we're on and which character of that edge transition we're on.
      var curEdge = currentEdges[g];
      var wArray = curEdge.weight().split('<br>');
      var w = wArray[edgeWeight[g]];
      var pos = edgeProgress[g];
      // Note that the character is currently bolded (e.g. "tra<b>n</b>sition"). We want to unbold the current character.
      w = w.substr(0, pos - 3) + w[pos] + w.substr(pos + 5);
      // This causes the index of the current character to decrease by 3.
      pos = pos - 3;
      // Update the array of edge transitions to contain this un-bolded version of the transition.
      wArray[edgeWeight[g]] = w;
      // If the next letter of the edge transition matches the input symbol...
      if (letter == w[pos + 1]) {
        pos = pos + 1;
        if (w.length == pos + 1) {
          // If the next letter is the last letter of the edge transition, we have made it to the next state.
          // Add the state at the end of this edge to the current states if it's currently unaccounted for.
          if (!curEdge.end().hasClass('current')) {
            curEdge.end().addClass('current');
            nextStates.push(curEdge.end());
          }
        } else {
          // If we are still in the middle of the edge transition, note the edge, the edge transition, and the new position in the edge transition.
          nextEdges.push(curEdge);
          eWeight.push(edgeWeight[g]);
          // We now want to bold the next character in the position. That involves changing the string and shifting the index we are currently on by 3.
          w = w.substr(0, pos) + "<b>" + w[pos] + "</b>" + w.substr(pos + 1);
          pos = pos + 3;
          eProgress.push(pos);
          // Update the array of edge transitions to contain this bolded version of the transition.
          wArray[edgeWeight[g]] = w;
        }
      }
      // The transition label of the edge needs to be updated, since characters within it have been altered with additions of "<b>" and "</b>".
      curEdge.weight(wArray.join("<br>"));
      if (curEdge.weight().indexOf('<b>') == -1) {
        // The edge itself is bolded. If none of the characters in the edge are bolded anymore, un-bold the edge.
        curEdge.removeClass('edgeSelect');
      }
    }
    // Iterate over the current states.
    for (var i = 0; i < currentStates.length; i++) {
      var successors = currentStates[i].neighbors();
      // Iterate over every reachable state from the current state.
      for (var next = successors.next(); next; next = successors.next()) {
        var edge = graph.getEdge(currentStates[i], next);
        var weight = edge.weight().split('<br>');
        // Iterate over every edge weight between the current state and the next state.
        for (var j = 0; j < weight.length; j++) {
          if (weight[j].length > 1) {
            // If the edge weight is more than one character long and matches the input symbol, mark the edge as a next edge.
            if (letter == weight[j][0]) {
              edge.addClass('edgeSelect');
              for (var k = 0; k < nextEdges.length; k++) {
                if (edge == nextEdges[k] && j == eWeight[k]) {
                  // If there are already bolded characters in the edge, that means eProgress contains pointers to other characters in the edge transition.
                  // Adding "<b>" and "</b>" to this edge transition will shift the string and cause those points to be off by 7.
                  // Thus, these pointers need to be updated to point to the right characters in the edge transition.
                  eProgress[k] = eProgress[k] + 7;
                }
              }
              // Bold the first character in the edge transition.
              var bold = "<b>" + letter + "</b>" + weight[j].substr(1);
              weight[j] = bold;
              // Update the edge weight to contain this bolded character.
              edge.weight(weight.join("<br>"));
              nextEdges.push(edge);
              // Also note which edge transition is being traversed on and the current position in the edge transition.
              // In this case, that current position is index 3, since indices 0-2 are taken up by "<b>".
              eWeight.push(j);
              eProgress.push(3);
            }
          } else {
            // If the edge weight is one character long and matches the input symbol, and the next state is thus far unaccounted for, mark it as a next state.
            if (letter == weight[j] && !next.hasClass('current')) {
              next.addClass('current');
              nextStates.push(next);
            }
          }
        }
      }
    }
    // For each of the next states, add its closure (i.e. every state it can reach on a lambda transition). Then return this list of states.
    nextStates = addLambdaClosure(graph, nextStates);
    return [nextStates, nextEdges, eWeight, eProgress];
  };

  // Function that takes a graph and list of states and returns a list of every state reachable on a lambda transition from those states, in addition to those states themselves.
  var addLambdaClosure = function (graph, nextStates) {
    // Either lambda or epsilon may be used to represent the empty string.
    var lambda = String.fromCharCode(955),
      epsilon = String.fromCharCode(949),
      lambdaStates = [];
    // Iterate over the array of states.
    for (var i = 0; i < nextStates.length; i++) {
      var successors = nextStates[i].neighbors();
      // Iterate over the states reachable from those states.
      for (var next = successors.next(); next; next = successors.next()) {
        var weight = graph.getEdge(nextStates[i], next).weight().split('<br>');
        // Iterate over the edge weights connecting these states.
        for (var j = 0; j < weight.length; j++) {
          // If any of these edge weights are the empty string, mark the next state as reachable (if it hasn't already been accounted for).
          if ((weight[j] == lambda || weight[j] == epsilon) && !next.hasClass('current')) {
            next.addClass('current');
            lambdaStates.push(next);
          }
        }
      }
    }
    // If some states were added because we could reach them on a lambda transition, we then need to check if there are any more states that THOSE states can reach on a lambda transition...
    if (lambdaStates.length > 0) {
      // ... And this necessitates a recursive call:
      lambdaStates = addLambdaClosure(graph, lambdaStates);
    }
    // Once we are completely done finding the lambda closure, add them to the original array of states and return that array.
    for (var k = 0; k < lambdaStates.length; k++) {
      nextStates.push(lambdaStates[k]);
    }
    return nextStates;
  };

  //Construct a new class for FA acceptor to help in Visualizations
  //var lambda = String.fromCharCode(955), // lambda empty string representation
  //  epsilon = String.fromCharCode(949); // epsilon empty string representation
  var TraverseAcceptor = function (jsav, FA) {
    this.init(jsav, FA);
  };

  var acceptorProto = TraverseAcceptor.prototype;

  acceptorProto.init = function (jsav, FA) {
    this.jsav = jsav;
    this.FA = FA;
  }

  acceptorProto.run = function (inputString, matrixRow) {
    // Start with the closure of the initial state.
    this.FA.initial.addClass('current');
    var currentStates = [this.FA.initial];
    currentStates = addLambdaClosure(this.FA, currentStates);
    var nextStates = currentStates;
    this.jsav.step();

    // Create an array of characters in the input string.
    var textArray = [];
    for (var i = 0; i < inputString.length; i++) {
      textArray.push(inputString[i]);
    }
    // Use this array to initialize the JSAV array.
    //var arr = this.jsav.ds.array(textArray);//{element: $('.arrayPlace')});
    //jsav.displayInit();
    //this.ListOfArr.push(arr);
    // Iterate over each character in the input string.
    for (var i = 0; i < inputString.length; i++) {
      // "Current" is used to mark states as visited, so start by removing "Current" from every node.
      for (var j = 0; j < currentStates.length; j++) {
        currentStates[j].removeClass('current');
      }
      // Run traversal step to find next states.
      nextStates = traverse(this.FA, currentStates, inputString[i]);
      if (nextStates.length == 0) {
        // If there are no next states, the input string was rejected. Update CSS of JSAV graph and array.
        for (var k = 0; k < currentStates.length; k++) {
          currentStates[k].addClass('rejected');
        }
        //arr.css(i, {"background-color": "red"});
        this.matrix.css(matrixRow, i, { "background-color": "red" });
        // Add a step to the slideshow and break out of the loop.
        this.jsav.step();
        break;
      }
      // Prepare for the next iteration of the loop. Update the current character in the JSAV array and add a step to the slideshow.
      currentStates = nextStates;
      //arr.css(i, {"background-color": "yellow"});
      this.jsav.umsg("Read a letter and follow its transition out of the current state.");
      this.matrix.css(matrixRow, i, { "background-color": "yellow" });
      this.jsav.step();
    }

    var rejected = true;
    for (var k = 0; k < currentStates.length; k++) {
      // If we finished on a final state, the input string was accepted (unless we didn't make it to the end of the input string).
      if (currentStates[k].hasClass('final') && nextStates.length > 0) {
        // If there are no next states, it means the break statement in line 128 was triggered. Otherwise, we know we made it to the end of the input string.
        currentStates[k].addClass('accepted');
        rejected = false;
      }
    }

    if (rejected) {
      // If the input string was rejected, color every character in the JSAV array red.
      for (var l = 0; l < inputString.length; l++) {
        //arr.css(l, {"background-color": "red"});
        this.matrix.css(matrixRow, l, { "background-color": "red" });
      }
      this.jsav.umsg("We are at the end of the string, but we are not in a final state. So the string is REJECTED.");
    } else {
      // If the input string was accepted, color every character in the JSAV array green.
      for (var l = 0; l < inputString.length; l++) {
        //arr.css(l, {"background-color": "green"});
        this.matrix.css(matrixRow, l, { "background-color": "green" });
      }
      this.jsav.umsg("We are at the end of the string, and we are in a final state. So the string is ACCEPTED.");
    }

    // If the input string was rejected, label every current node as rejected.
    var nodes = this.FA.nodes();
    for (var next = nodes.next(); next; next = nodes.next()) {
      if (next.hasClass('current') && rejected) {
        next.addClass('rejected');
      }
      next.removeClass('current');
    }

    // Add the last step to the slideshow, stop recording the slideshow, and add the click handler to the JSAV array.
    this.jsav.step();
    //jsav.recorded();
  };

  acceptorProto.visualize = function (listOfStrings, arrayOptions) {
    var special = ['zeroth', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth'];
    this.matrix = this.jsav.ds.matrix(listOfStrings, { style: "table", top: arrayOptions.top, left: arrayOptions.left });
    for (var i = 0; i < listOfStrings.length; i++) {
      this.jsav.umsg("The " + special[i + 1] + " string is " + listOfStrings[i].join(''));
      this.resetFA();
      this.run(listOfStrings[i], i);
    }
    this.matrix.click(this.matrixClickHandler);
  }
  acceptorProto.resetFA = function () {
    var nodes = this.FA.nodes();
    for (var next = nodes.next(); next; next = nodes.next()) {
      if (next.hasClass('rejected')) {
        next.removeClass('rejected');
      }
      if (next.hasClass('accepted')) {
        next.removeClass('accepted');
      }
    }
  }
  acceptorProto.matrixClickHandler = function (row, column) {
    // Temporarily turn off animation (if it was on).
    var index = column;
    for (var r = 0; r < row; r++)
      index += this._arrays[r]._values.length;
    index += row; //we have an additional accepted step for each row
    var oldFx = $.fx.off || false;
    $.fx.off = true;
    // If the step clicked on comes after the current step, increment until you reach that step.
    if (index > this.jsav.currentStep() - 1) {
      while (index > this.jsav.currentStep() - 1 && this.jsav._redo.length) {
        this.jsav.forward();
      }
    }
    // If the step clicked on comes before the current step, decrement until you reach that step.
    if (index < this.jsav.currentStep() - 1) {
      while (index < this.jsav.currentStep() - 1 && this.jsav._undo.length) {
        this.jsav.backward();
      }
    }
    // If animation was originally on, turn it back on again now.
    $.fx.off = oldFx;
  };


  window.FiniteAutomaton.willReject = willReject;
  window.FiniteAutomaton.addLambdaClosure = addLambdaClosure;
  window.FiniteAutomaton.traverse = traverse;
  window.TraverseAcceptor = TraverseAcceptor;
}(jQuery));

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


/*********************************************
 * FAtoGrammarConverter
 */
(function ($) {
  var FAtoGrammarConverter = function (jsav, FA) {
    this.init(jsav, FA);
  };
  window.FAtoGrammarConverter = FAtoGrammarConverter;
  var controllerProto = FAtoGrammarConverter.prototype;

  controllerProto.init = function (jsav, FA) {
    this.jsav = jsav;
    this.FA = FA;
  }
  controllerProto.convertToGrammar = function (grammarMatrix) {
    // by default sets S to be the start variable
    var variables = "SABCDEFGHIJKLMNOPQRTUVWXYZ";
    var s = this.FA.initial;
    var newVariables = [s];
    var nodes = this.FA.nodes();
    var arrow = String.fromCharCode(8594);
    var converted = [];
    var matrixIndex = 0;
    // quit if the FA is too large for conversion
    if (this.FA.nodeCount() > 26) {
      window.alert('The FA must have at most 26 states to convert it into a grammar!');
      return;
    }
    for (var next = nodes.next(); next; next = nodes.next()) {
      if (!next.equals(s)) {
        newVariables.push(next);
      }
    }
    var finals = [];
    this.jsav.step();
    this.jsav.umsg("Now we need to check every state and transition to determine grammar productions.");
    for (var i = 0; i < newVariables.length; i++) {
      var edges = newVariables[i].getOutgoing();
      this.jsav.step();
      if (i > 0) {
        newVariables[i - 1].unhighlight();
        newVariables[i - 1].getOutgoing().map(function (edge) {
          edge.removeClass("testingLambda");
          edge._label.removeClass("testingLambda");
        });
      }
      this.jsav.umsg("For state: " + newVariables[i].value() + ", there " + ((edges.length > 1) ? "are " : "is ") + edges.length + " transition" + ((edges.length > 1) ? "s" : ""));
      newVariables[i].highlight();
      for (var j = 0; j < edges.length; j++) {
        var toVar = variables[newVariables.indexOf(edges[j].end())];
        var weight = edges[j].weight().split("<br>");
        newVariables[i].getOutgoing().map(function (edge) {
          edge.addClass("testingLambda");
          edge._label.addClass("testingLambda");
        });
        for (var k = 0; k < weight.length; k++) {
          var terminal = weight[k];
          if (weight[k] === emptystring) {
            terminal = "";
          }
          converted.push([variables[i], arrow, terminal + toVar]);
          grammarMatrix.value(matrixIndex, 0, variables[i]);
          grammarMatrix.value(matrixIndex, 2, terminal + toVar);
          grammarMatrix._arrays[matrixIndex++].show();

        }
      }
      if (newVariables[i].hasClass('final')) {
        this.jsav.step();
        this.jsav.umsg("Since " + variables[i] + " is the final state, we need to add a new transition with " + emptystring);
        finals.push([variables[i], arrow, emptystring]);
        grammarMatrix.value(matrixIndex, 0, variables[i]);
        grammarMatrix.value(matrixIndex, 2, emptystring);
        grammarMatrix._arrays[matrixIndex].show();
      }
    }
    newVariables[newVariables.length - 1].unhighlight();
    newVariables[newVariables.length - 1].getOutgoing().map(function (edge) {
      edge.removeClass("testingLambda");
      edge._label.removeClass("testingLambda");
    });
    converted = converted.concat(finals);
    // save resulting grammar as an array of arrays of strings
    // (same format as how the grammarEditor reads grammars)

    return JSON.stringify(converted);
  };
}(jQuery));


/*********************************************
 * FAtoREController
 */
(function ($) {
  var lambda = String.fromCharCode(955), // Instance variable to store the JavaScript representation of lambda.
    //jsav = new JSAV("av"),
    epsilon = String.fromCharCode(949), // Instance variable to store the JavaScript representation of epsilon.
    none = String.fromCharCode(248), // empty set symbol used for converting to RE
    emptystring = lambda,
    collapseStateTable, // table that shows relevant transitions of a collapsed node
    //g, //reference graph
    transitions;

  var FAtoREController = function (jsav, fa, options) {
    this.init(jsav, fa, options);
  };
  window.FAtoREController = FAtoREController;
  var controllerProto = FAtoREController.prototype;

  controllerProto.init = function (jsav, fa, options) {
    this.jsav = jsav;
    this.fa = fa;
    this.visualize = false;
  };

  controllerProto.checkForTransitions = function () {
    var edgesNum = this.fa.edges().length;
    var nodesNum = this.fa.nodes().length;
    if (edgesNum == nodesNum * nodesNum) {
      if (this.visualize == false) {
        $("#collapseButton").show();
        $("#finalize").show();
        $("#cheat").hide();
        $("#edgeButton").hide();
        $(".jsavgraph").removeClass("addEdges");
        //this.jsav.umsg("Use collapse state tool to remove nonfinal, noninitial states.");
        $("p").text("Use collapse state tool to remove nonfinal, noninitial states.");
      }
      if (this.fa.nodes().length == 2) this.generateExpression();
    }
  };

  // change ...<br>... to (...+...)
  // add parentheses to the ones with + sign
  function normalizeTransitionToRE(transition, last) {
    //  var arr = transition.split("<br>");
    //  if (arr.length == 1) {
    //  return transition;
    //  }
    //  if (arr.length == 0 && last) return re;
    //  var re = "(" + arr[0];
    //  for (var i = 1; i < arr.length; i++) {
    //  re += "+" + arr[i];
    //  }
    //  re += ")";
    //  return re;
    //}
    if (needParentheses(transition)) {
      return addParentheses(transition);
    }
    return transition;
  }

  function transitionsTableHandler(row, col, e) {
    var fa = this.element.data("fa");
    for (var i = 0; i < transitions._arrays.length; i++) {
      transitions.unhighlight(i);
    }
    transitions.highlight(row);
    var edges = fa.edges();
    for (var edge = edges.next(); edge; edge = edges.next()) {
      edge.element.removeClass("testingLambda");
      edge._label.element.removeClass("testingLambda");
    }
    var table = collapseStateTable;
    var from = fa.getNodeWithValue(table[row][0]);
    var to = fa.getNodeWithValue(table[row][1]);
    var direct = fa.getEdge(from, to);
    var step1 = fa.getEdge(from, fa.selected);
    var step2 = fa.getEdge(fa.selected, fa.selected);
    var step3 = fa.getEdge(fa.selected, to);
    direct.element.addClass("testingLambda");
    step1.element.addClass("testingLambda");
    step2.element.addClass("testingLambda");
    step3.element.addClass("testingLambda");
    direct._label.element.addClass("testingLambda");
    step1._label.element.addClass("testingLambda");
    step2._label.element.addClass("testingLambda");
    step3._label.element.addClass("testingLambda");
  }

  controllerProto.collapseState = function (node, transitionOptions) {
    if (!node) {
      $(".jsavgraph").addClass("collapse2");
      $(".jsavgraph").removeClass("editNodes");
      return;
    }
    if (localStorage.trans === "true") {
      return;
    }
    var table = [];
    var nodes1 = this.fa.nodes();
    var nodes2 = this.fa.nodes();
    for (var from = nodes1.next(); from; from = nodes1.next()) {
      nodes2.reset();
      for (var to = nodes2.next(); to; to = nodes2.next()) {
        if (from == this.fa.selected || to == this.fa.selected) continue;
        var straight = this.fa.getEdge(from, to).weight();
        var begin = this.fa.getEdge(from, node).weight();
        var pause = this.fa.getEdge(node, node).weight();
        var end = this.fa.getEdge(node, to).weight();
        var indirect = "";

        //var direct = normalizeTransitionToRE(straight);
        var direct = straight;
        if (begin == none || end == none) {
          table.push([from.value(), to.value(), direct]);
        } else {
          //    var step1 = normalizeTransitionToRE(begin);
          //    var step2 = normalizeTransitionToRE(pause);
          //    var step3 = normalizeTransitionToRE(end);
          var step1 = begin;
          var step2 = pause;
          var step3 = end;
          if (step2 == none || step2 == lambda) {
            if (step1 == lambda) {
              indirect = step3;
            } else if (step3 == lambda) {
              indirect = step1;
            } else {
              indirect = step1 + step3;
            }
          } else if (step1 == lambda && step3 == lambda) {
            indirect = addStar(step2);
          } else if (step1 == lambda) {
            indirect = addStar(step2) + step3;
          } else if (step3 == lambda) {
            indirect = step1 + addStar(step2);
          } else {
            indirect = step1 + addStar(step2) + step3;
          }
          if (direct == none) {
            table.push([from.value(), to.value(), indirect]);
          } else {
            table.push([from.value(), to.value(), direct + "+" + indirect]);
          }
        }
      }
    }
    collapseStateTable = table;

    //  $dialog = $("#dialog");
    // var tav = new JSAV("dialog2");
    //  if (transitions) transitions.clear();
    if (transitions) delete transitions;
    localStorage.setItem("trans", "true");
    if (this.visualize)
      transitions = this.jsav.ds.matrix(table, { left: transitionOptions.left, style: "table" });
    else
      transitions = this.jsav.ds.matrix(table, { style: "table", element: $("#TransitionTable") });
    transitions.element.data({ fa: this.fa });
    transitions.click(transitionsTableHandler);
    if (this.visualize == false)
      $("p").text("Click Finalize to complete state removal.");
    //  $dialog.dialog({
    //  dialogClass: "no-close",
    //  width: 10,
    //  maxHeight: 800
    //  });
    //  $dialog.dialog("open");
    this.transitions = transitions;
  };

  // add empty transitions to states without transitions to each other
  controllerProto.completeTransitions = function () {
    var nodes1 = this.fa.nodes();
    var nodes2 = this.fa.nodes();
    for (var from = nodes1.next(); from; from = nodes1.next()) {
      for (var to = nodes2.next(); to; to = nodes2.next()) {
        if (!this.fa.hasEdge(from, to)) {
          this.fa.addEdge(from, to, { weight: none });
        }
      }
      nodes2.reset();
    }
    this.checkForTransitions();
  };

  // closes the transitions box and update FA
  controllerProto.finalizeRE = function () {
    if (localStorage.trans !== "true") {
      alert("You need to select the state collapser button and click on a noninitial, nonfinal node before you can click finalize.");
      return;
    }
    //$("#dialog").dialog("close");
    $("#TransitionTable").empty();
    if (this.visualize == false)
      $("p").text("Use collapse state tool to remove nonfinal, noninitial states.");
    localStorage.removeItem("trans");

    var table = collapseStateTable;
    for (var i = 0; i < table.length; i++) {
      var row = table[i];
      var from = this.fa.getNodeWithValue(row[0]);
      var to = this.fa.getNodeWithValue(row[1]);
      var newTransition = row[2];
      this.fa.removeEdge(from, to);
      this.fa.addEdge(from, to, { weight: newTransition });
    }
    this.fa.removeNode(this.fa.selected);
    if (this.fa.nodes().length == 2) {
      this.generateExpression();
    }
  };

  // get the RE from last two states;
  controllerProto.generateExpression = function () {
    var from = this.fa.initial;
    var to = this.fa.getFinals()[0];
    var fromm = normalizeTransitionToRE(this.fa.getEdge(from, from).weight());
    var fromTo = normalizeTransitionToRE(this.fa.getEdge(from, to).weight(), true);
    var toFrom = normalizeTransitionToRE(this.fa.getEdge(to, from).weight());
    var too = normalizeTransitionToRE(this.fa.getEdge(to, to).weight());
    var cycle = "",
      target = "",
      expression = "";
    if (fromTo == none) {
      expression = none;
    } else if (toFrom == none) {
      //cycle = "";
      if ((fromm == none || fromm == lambda) && (too == none || too == lambda)) {
        expression = fromTo;
      } else if (fromm == none || fromm == lambda) {
        if (too.length > 1) {
          expression = fromTo + addStar(too);
        } else {
          expression = fromTo + too + "*";
        }
      } else if (too == none || too == lambda) {
        if (fromm.length > 1) {
          expression = addStar(fromm) + fromTo;
        } else {
          expression = fromm + "*" + fromTo;
        }
      } else if (fromm.length > 1 && too.length > 1) {
        expression = addStar(fromm) + fromTo + addStar(too);
      } else if (fromm.length > 1) {
        expression = addStar(fromm) + fromTo + too + "*";
      } else if (too.length > 1) {
        expression = fromm + "*" + fromTo + addStar(too);
      } else {
        expression = fromm + "*" + fromTo + too + "*";
      }
    } else {
      //cycle = something;
      if ((fromm == none || fromm == lambda) && (too == none || too == lambda)) {
        cycle = addStar(fromTo + toFrom);
        target = fromTo;
      } else if (fromm == none || fromm == lambda) {
        cycle = addStar(fromTo + addStar(too) + toFrom);
        target = fromTo + addStar(too);
      } else if (too == none || too == lambda) {
        cycle = addStar(addStar(fromm) + fromTo + toFrom);
        target = addStar(fromm) + fromTo;
      } else {
        cycle = addStar(addStar(fromm) + fromTo + addStar(too) + toFrom);
        target = addStar(fromm) + fromTo + addStar(too);
      }
      expression = cycle + target;
    }
    if (this.visualize == false) {
      $("p").text("Generalized transition graph finished! Expression: " + expression + ". Click Export to open the regular expression in a new window.");
      $("#finalize").hide();
      $("#exportButton").show();
      $("#exportButton").click(function () {
        exportToRE(expression);
      });
    }
    return expression;
  };

  function exportToRE(expression) {
    localStorage.expression = expression;
    window.open("./REtoFA.html");
  }

  // add star if needed for transitions
  function addStar(transition) {
    if (transition.length == 1) return transition + "*";
    var count = 0;
    if (transition.charAt(0) !== "(") return "(" + transition + ")*";
    for (var i = 0; i < transition.length; i++) {
      if (transition.charAt(i) == "(") count++;
      else if (transition.charAt(i) == ")") count--;
      if (count == 0 && i < transition.length - 1) return "(" + transition + ")*";
    }
    return transition + "*";
  }

  //returns true if word needs parentheses (if it is an "+" (OR) expression)
  function needParentheses(word) {
    for (var i = 0; i < word.length; i++) {
      if (word.charAt(i) === "+") {
        return true;
      }
    }
    return false;
  }

  function addParentheses(word) {
    return "(" + word + ")";
  }

  controllerProto.visualizeConversion = function (transitionOptions = {}, finaGraphOptions = {}) {
    this.visualize = true;
    this.jsav.step();
    this.jsav.umsg("We start by completing all missing tansitions for this Machine by adding transistions on $\\emptyset$.");
    this.completeTransitions();
    var nodes = getAllNonStartNorFinalStates(this.fa);
    for (var i = 0; i < nodes.length; i++) {
      this.jsav.step();
      this.jsav.umsg("We will collapse the node " + nodes[i].value() + ".");
      localStorage.trans = 'false';
      nodes[i].highlight();
      this.fa.selected = nodes[i];
      this.collapseState(nodes[i], transitionOptions);
      this.jsav.step();
      this.jsav.umsg("You can click on each table row to highlight the affected transitions.");
      nodes[i].unhighlight();
      this.jsav.step();
      this.jsav.umsg("Changing the labels while removing the node " + nodes[i].value() + " will create a new but equivalent machine.");
      this.finalizeRE();
    }
    this.jsav.step();
    this.jsav.umsg("After removing all nodes that are not final and not start, the resulting Regular Exepression is:");
    this.transitions.hide();
    drawTheFinalGraph(this.jsav, finaGraphOptions, this.generateExpression());
    this.jsav.step();
    this.jsav.umsg("The result might not be an intuitive regular expression corresponding to the original machine, but it is a legitimate regular expression. Which demonstrates that the conversion can be made.");
  }

  function getAllNonStartNorFinalStates(graph) {
    var listOfNodes = graph.nodes();
    var results = [];
    listOfNodes.map(function (node) {
      if (!node.hasClass("final") && !node.hasClass("start"))
        results.push(node);
    });
    return results;
  }

  function drawTheFinalGraph(jsav, options, expression) {
    var fa = jsav.ds.FA($.extend(options));
    var start = fa.addNode({ left: '15px' });
    var height = options.height || 440;
    var width = options.width || 750;
    var end = fa.addNode({ left: width - 10, top: height - 40 });
    fa.makeInitial(start);
    fa.makeFinal(end);
    var t = fa.addEdge(start, end, { weight: expression });
    return fa;
  }
}(jQuery));


/*********************************************
 * tape.js
 */
(function ($) {
  // Support for creating tapes for autometa visualization. (extends JSAV array class)
  // Written by Ziyou Shang, Kaiyang Zhang, Galina Belolipetski
  "use strict";
  if (typeof JSAV === "undefined") { return; }

  /*
  Tape class implementation
  Extended from the JSAV array class.
  element is an array with values to put into the tape
  x_coord is the x-coordinate
  y-coord is the y-coordinate
  direction is the side to put the "infinite" sign, with choice of "none", "left", "right", or "both"
  */
  var Tape = function (jsav, element, x_coord, y_coord, direction, index, options) {
    // constant to calculate position to draw the "infinite" sign
    var cell_size = 30;

    // set the constructors
    this.jsav = jsav;
    this.x_coord = x_coord; //x coordinate of placement
    this.y_coord = y_coord; //y coordinate of placement
    this.direction = direction; // in which direction tape extends
    this.options = options;
    this.current = (index == undefined)? -1: index;//the location to highlight
    this.arr = null;
    this.leftPoly = null;
    this.rightPoly = null;

    if ($.isArray(element)) {
      // x & y control
      var right = x_coord + element.length * cell_size; //topright

      //default position of array's top center and call JSAV array constructor
      var left_arr = String(x_coord) + "px";
      var top_arr = String(y_coord - 16) + "px";
      this.arr = jsav.ds.array(element, { left: left_arr, top: top_arr });

      //unhighlights everything
      for (var i = 0; i < this.arr.size(); i++) {
        this.arr.unhighlight(i);
      }
      if (this.current > -1 && this.current < this.arr.size()) {
        this.arr.highlight(this.current); //highlights the current position
      }

      //right and left points to draw the "infinite sign" with poly-lines
      var points = [
        [-5, 0],
        [15, 0],
        [11, 3],
        [21, 7],
        [5, 12],
        [9, 20],
        [28, 28],
        [-5, 28]
      ];
      var points_l = [
        [-5, 0],
        [15, 0],
        [11, 3],
        [21, 7],
        [5, 12],
        [9, 20],
        [28, 28],
        [-5, 28]
      ];


      var highlightLeft = (this.current === -1);
      var highlightRight = (this.current >= this.arr.size());

      if (direction === "right") { this.plot_right(jsav, right, y_coord, points, highlightRight); }
      if (direction === "left") { this.plot_left(jsav, x_coord, y_coord, points_l, highlightLeft); }
      if (direction === "both") {
        this.plot_right(jsav, right, y_coord, points, highlightRight);
        this.plot_left(jsav, x_coord, y_coord, points_l, highlightLeft);
      }

      // change the style (shape) of the JSAV array class
      this.arr.css(true, { "border-radius": "0px" });
    }
  }

  // extend JSAV array class
  JSAV.utils.extend(Tape, JSAV._types.ds.AVArray);
  var proto = Tape.prototype;
  // function to draw right "infinite" tape sign
  proto.plot_right = function(jsav, right, y_coord, points, highlightRight) {
    for (var i = 0; i < points.length; i++) {
      points[i][0] += right;
      points[i][1] += y_coord;
    }
    var poly;
    if (highlightRight) {
      poly = jsav.g.polyline(points, { "stroke-width": 2, stroke: "#ff7" });
    } else {
      poly = jsav.g.polyline(points, { "stroke-width": 2 });
    }
    this.rightPoly = poly;
    poly.show();
  }

  // function to draw left "infinite" tape sign
  proto.plot_left = function(jsav, x_coord, y_coord, points_l, highlightLeft) {
    for (var i = 0; i < points_l.length; i++) {
      points_l[i][0] = x_coord - points_l[i][0];
      points_l[i][1] = y_coord + points_l[i][1];
    }
    var poly_l;
    if (highlightLeft) {
      poly_l = jsav.g.polyline(points_l, { "stroke-width": 2, stroke: "#ff7" });
    } else {
      poly_l = jsav.g.polyline(points_l, { "stroke-width": 2 });
    }
    this.leftPoly = poly_l;
    poly_l.show();
  }

  //attempt to highlight a particular position, but need access to the tape arr object
  //not necessary, but kept here for the future; this method can be used if the
  // tape does not have an initial highlighed location passed in
  // unhighlights everything and highlights the necessary position
  proto.highlightPosition = function (loc) {
    if (this.current !== "undefined") {
      for (var i = 0; i < this.arr.size(); i++) {
        this.arr.unhighlight(i);
      }
    }
    if (loc !== "undefined") {
      this.arr.highlight(loc);
    }
  };

  proto.getValueAt = function(index){
    return this.arr.value(index);
  }

  proto.setValueAt = function(index, value){
    this.arr.value(index, value);
  }

  proto.moveLeft = function(){
    var highlightIndex = false;
    if(this.arr.isHighlight(this.current)){
      highlightIndex = true;
      this.arr.unhighlight(this.current);
    }
    if(this.current > 0){
      this.current--;
      if(highlightIndex){
        this.arr.highlight(this.current);
      }
    }
  }
  proto.moveRight = function(){
    var highlightIndex = false;
    if(this.arr.isHighlight(this.current)){
      highlightIndex = true;
      this.arr.unhighlight(this.current);
    }

    if(this.current < this.arr.size() - 1)
      this.current++;
      if(highlightIndex){
        this.arr.highlight(this.current);
      }
  }

  proto.highlightCurrent = function(){
    this.arr.highlight(this.current);
  }

  proto.unhighlightCurrent = function(){
    this.arr.index(this.current).unhighlight();
  }

  proto.getCurrentValue = function(){
    return this.arr.value(this.current);
  }

  proto.setCurrentValue = function(value){
    this.arr.value(this.current, value);
  }

  proto.clearTapeContent = function(){
    for(var i = 0; i< this.arr.size(); i++){
      this.arr.value(i, "#");
    }
    this.unhighlightCurrent();
    this.current = 0;
  }

  proto.setTapeArray = function(newArr, startIndex){
    var index = startIndex;
    for(var i = startIndex; i< newArr.length; i++){
      this.arr.value(i,newArr[index++]);
    }
    this.current = startIndex;
    this.highlightCurrent();
  }
  proto.hide = function(){
    this.arr.hide();
    if(this.rightPoly != null){
      this.rightPoly.hide();
    }
    if(this.leftPoly != null){
      this.leftPoly.hide();
    }
  }

  // Add the Tape constructor to the public facing JSAV interface.
  JSAV.ext.ds.tape = function (element, x_coord, y_coord, direction, options) {
    return new Tape(this, element, x_coord, y_coord, direction, options);
  };
  JSAV._types.ds.Tape = Tape;
}(jQuery));

/**********************************
 * Minimizer.js
 */

(function ($) {
  var Minimizer = function () { }

  var minimizer = Minimizer.prototype;
  window.Minimizer = Minimizer;
  minimizer.minimizeDFA = function (jsav, referenceGraph, tree, newGraphDimensions, visual = true) {
    this.init(jsav, referenceGraph, tree, visual);
    var listOfVisitedLeaves = [];
    var listOfLeaves = this.getLeaves(this.tree.root());
    var leaf;
    var moreToSplit = true;
    if (this.visualize)
      this.jsav.umsg("Now we will test the terminals against the states in that subset to see if they all go to the same subset. Split them up when they do not go to the same place.")
    while (moreToSplit) {
      moreToSplit = null;
      for (var i = 0; i < listOfLeaves.length; i++) {
        listOfVisitedLeaves = listOfVisitedLeaves.concat(listOfLeaves);
        if (this.visualize){
          this.jsav.step();
          this.unhighlightAllTreeNodes(this.tree);
          this.unhighlightAll(this.referenceGraph);
        }
        leaf = listOfLeaves[i];
        var leafTreeNode = getTreeNode(leaf, this.tree.root());
        leafTreeNode.highlight();
        var split = this.autoPartition(leaf);
        if (moreToSplit !== null)
          moreToSplit = split || moreToSplit;
        else
          moreToSplit = split;
      }
      listOfLeaves = _.difference(this.getLeaves(this.tree.root()), listOfVisitedLeaves);
    }
    if (this.visualize){
      this.jsav.step();
      this.unhighlightAllTreeNodes(this.tree);
      this.unhighlightAll(this.referenceGraph);
      this.jsav.umsg("Since we do not have any more splits, the resulting tree represents the nodes in the minimized DFA.");
      this.jsav.step();
    }
    return this.done(newGraphDimensions);
  }
  minimizer.init = function (jsav, referenceGraph, tree, visual = true) {
    this.selectedNode = null;
    this.jsav = jsav;
    this.referenceGraph = referenceGraph;
    this.alphabet = Object.keys(this.referenceGraph.alphabet);
    this.tree = tree;
    this.finals = [];
    this.nonfinals = [];
    this.reachable = [];
    this.minimizedEdges = {};
    this.visualize = visual;

    this.addTrapState();
    var val = this.getReachable();
    this.initTree(val);

    if (this.visualize){
      this.jsav.umsg("Initially, the tree will consist of 2 nodes. A node for nonfinal states, and another state for final states.")
      this.jsav.step();
      this.jsav.umsg("These are the nonfinal states.")
      highlightAllNodes(this.nonfinals, this.referenceGraph);
      getTreeNode(this.nonfinals.sort().join(), this.tree.root()).highlight();
      this.jsav.step();
      this.unhighlightAllTreeNodes(this.tree);
      this.unhighlightAll(this.referenceGraph);
      this.jsav.umsg("These are the final states.")
      highlightAllNodes(this.finals, this.referenceGraph);
      getTreeNode(this.finals.sort().join(), this.tree.root()).highlight();
      this.jsav.step();
      this.unhighlightAllTreeNodes(this.tree);
      this.unhighlightAll(this.referenceGraph);
    }
  }

  // minimizing DFA needs a complete FA, so this function adds trap states
  minimizer.addTrapState = function () {

    var nodes = this.referenceGraph.nodes();
    var trapEdge = this.alphabet.join("<br>");
    var trapNode;
    for (var node = nodes.next(); node; node = nodes.next()) {
      for (var i = 0; i < this.alphabet.length; i++) {
        var letter = this.alphabet[i];
        var toNode = this.referenceGraph.transitionFunction(node, letter)[0];
        if (toNode) continue;
        if (!trapNode) {
          this.jsav.step();
          this.jsav.umsg("Adding a Trap state to the DFA");
          trapNode = this.referenceGraph.addNode();
          this.referenceGraph.addEdge(trapNode, trapNode, { weight: trapEdge });
        }
        this.referenceGraph.addEdge(node, trapNode, { weight: letter });
      }
    }
    if (trapNode) {
      this.referenceGraph.layout();
      this.jsav.step();
    }
  };

  // Function to get reachable states from the initial state
  // returns all reachable states in an array val
  minimizer.getReachable = function () {
    var val = [];
    this.reachable = [this.referenceGraph.initial];
    FADepthFirstSearch(this.reachable, this.referenceGraph.initial);
    for (var i = 0; i < this.reachable.length; i++) {
      val.push(this.reachable[i].value());
      if (this.reachable[i].hasClass('final')) {
        this.finals.push(this.reachable[i].value());
      } else {
        this.nonfinals.push(this.reachable[i].value());
      }
    }
    return val;
  }

  minimizer.initTree = function (val) {
    this.tree.root(val.sort().join());
    this.tree.root().child(0, this.nonfinals.sort().join());
    this.tree.root().child(1, this.finals.sort().join());
    this.tree.root().child(1).addClass('final');
    this.tree.layout();

  }

  minimizer.treeIsComplete = function () {
    var leaves = this.getLeaves(this.tree.root());
    for (var i = 0; i < leaves.length; i++) {
      var leaf = leaves[i].split(',');
      for (var k = 0; k < this.alphabet.length; k++) {
        var dArr = [],
          letter = this.alphabet[k];
        for (var j = 0; j < leaf.length; j++) {
          var node = this.referenceGraph.getNodeWithValue(leaf[j]);
          var next = this.referenceGraph.transitionFunction(node, letter);
          if (next[0]) {
            dArr.push(next[0]);
          }
        }
        // I apologize for this, I don't understand it either.
        if (!_.find(leaves, function (v) { return _.difference(dArr, v.split(',')).length === 0 }) && dArr.length !== 0) {
          return false;
        }
      }
    }
  }

  minimizer.getLeaves = function (node) {
    // gets the leaf values of a tree
    var arr = [];
    if (node.childnodes == false) {
      return arr.concat([node.value()]);
    } else {
      for (var i = 0; i < node.childnodes.length; i++) {
        arr = arr.concat(this.getLeaves(node.child(i)));
      }
      return arr;
    }
  }
  minimizer.getTreeNodes = function (node) {
    // gets the leaf values of a tree
    var arr = [];
    if (node.childnodes == false) {
      return arr.concat([node]);
    } else {
      arr = arr.concat([node]);
      for (var i = 0; i < node.childnodes.length; i++) {
        arr = arr.concat(this.getTreeNodes(node.child(i)));
      }
      return arr;
    }
  }
  minimizer.unhighlightAll = function (graph) {
    var nodes = graph.nodes();
    for (var next = nodes.next(); next; next = nodes.next()) {
      next.unhighlight();
    }
  };
  minimizer.unhighlightAllTreeNodes = function (tree) {
    var leaves = this.getTreeNodes(tree.root());
    leaves.map(function (node) {
      node.unhighlight();
    })
  };
  minimizer.autoPartition = function (treeNode) {
    var leaves = this.getLeaves(this.tree.root());
    var val = treeNode.split(','); //this.selectedNode.value().split(',');
    var nObj = {},
      sets = {},
      letter;
    // check all terminals (even if one was inputted by the user)
    for (var k = 0; k < this.alphabet.length; k++) {
      nObj = {};
      letter = this.alphabet[k];
      for (var j = 0; j < val.length; j++) {
        var node = this.referenceGraph.getNodeWithValue(val[j]);
        var next = this.referenceGraph.transitionFunction(node, letter);
        if (!nObj.hasOwnProperty(next[0])) {
          nObj[next[0]] = [];
        }
        nObj[next[0]].push(node.value());
      }
      var nArr = Object.keys(nObj);
      if (!_.find(leaves, function (v) { return _.difference(nArr, v.split(',')).length === 0 })) {
        break;
      } else if (k === this.alphabet.length - 1) {
        if (this.visualize){
          //this.selectedNode.unhighlight();
          this.unhighlightAll(this.referenceGraph);
          //this.selectedNode = null;
          this.jsav.umsg("Node " + latixifyNodeName(treeNode) + " will not be divided.");
          highlightAllNodes(treeNode.split(','), this.referenceGraph);
        }
        return false;
      }
    }
    var nArr = Object.keys(nObj);
    for (var i = 0; i < leaves.length; i++) {
      var leaf = leaves[i].split(',');
      for (var j = 0; j < nArr.length; j++) {
        if (!sets.hasOwnProperty(leaves[i])) {
          sets[leaves[i]] = [];
        }
        if (_.contains(leaf, nArr[j])) {
          sets[leaves[i]] = _.union(sets[leaves[i]], nObj[nArr[j]]);
        }
      }
    }
    var sArr = Object.keys(sets);
    var node = getTreeNode(treeNode, this.tree.root())
    //node.highlight();
    var nodeListAsString = "";
    for (var i = 0; i < sArr.length; i++) {
      var nVal = sets[sArr[i]].sort().join();
      if (nVal) {
        if (nodeListAsString !== "")
          nodeListAsString += "-";
        //this.selectedNode.addChild(nVal, {edgeLabel: letter});
        node.addChild(nVal, { edgeLabel: letter });
        nodeListAsString += "Node " + nVal;
      }
    }
    if(this.visualize){
      nodeListAsString = listOFNodesToString(nodeListAsString);
      nodeListAsString += " by using the transition label " + letter;
      this.jsav.umsg("Node " + latixifyNodeName(treeNode) + " will be divided into " + nodeListAsString + ".");
      highlightAllNodes(treeNode.split(','), this.referenceGraph);
      //this.unhighlightAll(this.referenceGraph);
      this.tree.layout();
    }
    return true;
  };
  minimizer.done = function (newGraphDimensions) {
    var leaves = this.getLeaves(this.tree.root());
    for (var i = 0; i < leaves.length; i++) {
      var leaf = leaves[i].split(',');
      for (var k = 0; k < this.alphabet.length; k++) {
        var dArr = [],
          letter = this.alphabet[k];
        for (var j = 0; j < leaf.length; j++) {
          var node = this.referenceGraph.getNodeWithValue(leaf[j]);
          var next = this.referenceGraph.transitionFunction(node, letter);
          if (next[0]) {
            dArr.push(next[0]);
          }
        }
        if (!_.find(leaves, function (v) { return _.difference(dArr, v.split(',')).length === 0 }) && dArr.length !== 0) {
          this.jsav.umsg("There are distinguishable states remaining");
          return;
        }
      }
    }
    // if complete create minimized DFA

    var graph = this.jsav.ds.FA({
      width: newGraphDimensions.width,
      height: newGraphDimensions.height,
      layout: 'automatic',
      left: newGraphDimensions.left,
      top: newGraphDimensions.top
    });
    for (var i = 0; i < leaves.length; i++) {
      var node = graph.addNode({ value: leaves[i] });
      //node.stateLabel(leaves[i]);
      var leaf = leaves[i].split(',');
      for (var j = 0; j < leaf.length; j++) {
        var n = this.referenceGraph.getNodeWithValue(leaf[j]);
        if (n.equals(this.referenceGraph.initial)) {
          graph.makeInitial(node);
          break;
        } else if (n.hasClass('final')) {
          node.addClass('final');
          break;
        }
      }
    }
    var edges = this.referenceGraph.edges();
    // "create" edges, store as a reference
    for (var next = edges.next(); next; next = edges.next()) {
      // get nodes make edges
      var ns = next.start().value(),
        ne = next.end().value(),
        nodes = graph.nodes(),
        node1,
        node2;
      for (var next2 = nodes.next(); next2; next2 = nodes.next()) {
        if (next2.value().split(',').indexOf(ns) !== -1) {
          node1 = next2;
        }
        if (next2.value().split(',').indexOf(ne) !== -1) {
          node2 = next2;
        }
      }
      // graph.addEdge(node1, node2, {weight: next.weight()});
      if (!this.minimizedEdges.hasOwnProperty(node1.value())) {
        this.minimizedEdges[node1.value()] = [];
      }
      var edgesFrom1 = this.minimizedEdges[node1.value()];
      if (!edgesFrom1.hasOwnProperty(node2.value())) {
        edgesFrom1[node2.value()] = [];
      }
      edgesFrom1[node2.value()] = _.union(edgesFrom1[node2.value()],
        next.weight().split("<br>"));
    }
    graph.layout();
    if (this.visualize){
      this.jsav.step();
      //graph.click(nodeClickHandlers);
      this.jsav.umsg("Finish the DFA by finding the transisitons between nodes.");
    }
    studentGraph = graph;
    return this.complete(graph);
  };
  minimizer.complete = function (studentGraph) {
    for (var i in this.minimizedEdges) {
      for (var j in this.minimizedEdges[i]) {
        var n1 = studentGraph.getNodeWithValue(i),
          n2 = studentGraph.getNodeWithValue(j),
          w = this.minimizedEdges[i][j].join('<br>');
        var newEdge = studentGraph.addEdge(n1, n2, { weight: w });
        if (newEdge) {
          newEdge.layout();
        }
      }
    }
    studentGraph.disableDragging();
    return studentGraph;
  };
  var getTreeNode = function (nodeValue, node) {
    if (node.childnodes == false && node.value() === nodeValue) { //leaf
      return node;
    } else {
      var result = null;
      for (var i = 0; i < node.childnodes.length; i++) {
        result = result || getTreeNode(nodeValue, node.child(i));
      }
      return result;
    }
  }

  var listOFNodesToString = function (nodeListAsString) {
    var lastCommaIndex = nodeListAsString.lastIndexOf('-');
    if (lastCommaIndex > 0) {
      nodeListAsString = nodeListAsString.slice(0, lastCommaIndex) + ", and " + nodeListAsString.slice(lastCommaIndex + 1);
      nodeListAsString = nodeListAsString.split('-').join(', ');
    }

    return latixifyNodeName(nodeListAsString);
  }
  var latixifyNodeName = function (nodeListAsString) {
    var re = /q\d+/g;
    var listOfNodes = nodeListAsString.match(re);
    if (listOfNodes)
      listOfNodes.map(function (node) {
        nodeListAsString = nodeListAsString.replace(node, '$' + node.slice(0, 1) + '_{' + node.slice(1) + '}$');
      })
    return nodeListAsString;
  }

  var highlightAllNodes = function (listOfNodes, graph) {
    for (var i = 0; i < listOfNodes.length; i++) {
      graph.getNodeWithValue(listOfNodes[i]).highlight("green");
    }
  }

}(jQuery));

/**********************************
 * GrammarToFAConverter.js
 */

(function ($) {

  var variables = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var arrow = String.fromCharCode(8594)
  parenthesis = "(";

  var lambda = String.fromCharCode(955),
    epsilon = String.fromCharCode(949),
    square = String.fromCharCode(9633),
    dot = String.fromCharCode(183),
    emptystring = lambda;

  var lastRow, // index of the last visible row (the empty row)
    //arr,        // the grammar
    backup = null, // a copy of the original grammar (as a string) before it is transformed
    //m,          // the grammar table
    tGrammar, // transformed grammar
    derivationTable, // the derivation table shown during brute-force parsing
    parseTableDisplay, // the parse table
    parseTree, // parse tree shown during parsing slideshows
    parseTable, // parse table used for pasing
    conflictTable, // used for SLR parsing conflicts
    ffTable, // table for FIRST and FOLLOW sets
    arrayStep, // the position of FIRST or FOLLOW cells
    selectedNode, // used for FA/graph editing
    modelDFA, // DFA used to build SLR parse table
    //builtDFA,       // DFA created by the user
    type, // type of parsing, can be bf, ll, slr
    grammars, // stores grammar exercises, xml
    currentExercise = 0, // current exercise index
    multiple = false, // if multiple grammar editing is enabled
    fi, // input box for matrix
    row, // row number for input box
    col; // column number for input box

  var GrammarToFAConverter = function (jsav, grammar, matrixOptions) {
    this.init(jsav, grammar, matrixOptions);
  };
  window.GrammarToFAConverter = GrammarToFAConverter;
  var controllerProto = GrammarToFAConverter.prototype;

  controllerProto.init = function (jsav, grammar, matrixOptions) {
    this.jsav = jsav;
    this.grammerArray = JSON.parse(grammar);
    lastRow = this.grammerArray.length;
    this.grammerArray.push(["", arrow, ""]);
    if (grammar == null) {
      this.grammerArray = new Array(20); // arbitrary array size
      for (var i = 0; i < this.grammerArray.length; i++) {
        this.grammerArray[i] = ["", arrow, ""];
      }
      lastRow = 0;
    }
    this.initMatrix(matrixOptions);
  };

  function layoutTable(mat, index) {
    // if column index is given, does layout for that column, otherwise lays out all columns
    if (typeof index === 'undefined') {
      for (var i = 0; i < mat._arrays[0]._indices.length; i++) {
        layoutColumn(mat, i);
      }
    } else {
      layoutColumn(mat, index);
    }
    mat.layout();
  };
  // Function to lay out a single column width
  function layoutColumn(mat, index) {
    var maxWidth = 100; // default cell size
    for (var i = 0; i < mat._arrays.length; i++) {
      if (typeof mat._arrays[i]._indices[index] !== undefined) {
        var cell = mat._arrays[i]._indices[index].element;
        if ($(cell).width() > maxWidth) {
          maxWidth = $(cell).width();
        }
      }
    }
    if (maxWidth > 100) {
      for (var i = 0; i < mat._arrays.length; i++) {
        var cell = mat._arrays[i]._indices[index].element;
        $(cell).find('.jsavvalue').width(maxWidth);
      }
    }
  };
  controllerProto.initMatrix = function (matrixOptions) {
    if (this.grammerMatrix)
      this.grammerMatrix.clear();
    this.grammerMatrix = this.jsav.ds.matrix(this.grammerArray, { style: "table", left: matrixOptions.left, top: matrixOptions.top });
    // hide all of the empty rows
    for (var i = lastRow + 1; i < this.grammerArray.length; i++) {
      this.grammerMatrix._arrays[i].hide();
    }
    layoutTable(this.grammerMatrix, 2);
    this.grammerMatrix.on('click', this.matrixClickHandler);
  }
  controllerProto.matrixClickHandler = function (index, index2) {
    if (fi) {
      var input = fi.val();
      var regex = new RegExp(emptystring, g);
      input = input.replace(regex, "");
      input = input.replace(regex, "!");
      if (input === "" && col == 2) {
        input = emptystring;
      }
      if (input === "" && col === 0) {
        alert('Invalid left-hand side.');
      }
      if (col == 2 && _.find(this.grammerArray, function (x) { return x[0] == this.grammerArray[row][0] && x[2] == input && this.grammerArray.indexOf(x) !== row; })) {
        alert('This production already exists.');
      }
      fi.remove();
      this.grammerMatrix.value(row, col, input);
      this.grammerArray[row][col] = input;
      layoutTable(m, 2);
    }
  };
  // interactive converting right-linear grammar to FA
  controllerProto.convertToFA = function (NFAoptions) {
    if (checkLHSVariables(this.grammerArray)) {
      alert('Your production is unrestricted on the left hand side');
      return;
    }
    if (!checkRightLinear(this.grammerArray)) {
      alert('The grammar is not right-linear!');
      return;
    }
    var productions = _.filter(this.grammerArray, function (x) { return x[0]; });
    //startParse();
    //this.jsav.umsg('Complete the FA.');
    // keep a map of variables to FA states
    this.nodeMap = {};
    this.builtDFA = this.jsav.ds.FA({ width: NFAoptions.width, height: NFAoptions.height, left: NFAoptions.left, top: NFAoptions.top, layout: "automatic" });
    this.builtDFA.disableDragging();
    var newStates = []; // variables
    for (var i = 0; i < productions.length; i++) {
      newStates.push(productions[i][0]);
      newStates = newStates.concat(_.filter(productions[i][2], function (x) { return variables.indexOf(x) !== -1; }));
    }
    newStates = _.uniq(newStates);
    // create FA states
    for (var i = 0; i < newStates.length; i++) {
      var n = this.builtDFA.addNode({ value: newStates[i] });
      this.nodeMap[newStates[i]] = n;
      if (i === 0) {
        this.builtDFA.makeInitial(n);
      }
      //n.stateLabel(newStates[i]);
    }
    // add final state
    this.finalNode = this.builtDFA.addNode({ value: "F" });
    // nodeMap[emptystring] = f;
    this.finalNode.addClass("final");
    this.builtDFA.layout();
    selectedNode = null;

    //$('#completeallbutton').click(this.completeConvertToFA);



    // handler for the grammar table: clicking a production will create the appropriate transition


    //this.builtDFA.click(this.convertDfaHandler);
    //this.grammerMatrix.click(this.convertGrammarHandler);
    //$('#av').append($('#convertmovebutton'));
    this.loopOverEachRow();
    this.jsav.step();
    this.jsav.umsg("This is the equivalent NFA for this Regular Grammer.");
  };

  function checkLHSVariables(grammerArray) {
    //check if there is more than one variable on the LHS
    var productions = _.filter(grammerArray, function (x) { return x[0] });
    for (var i = 0; i < productions.length; i++) {
      var lhs = productions[i][0];
      if (lhs.length !== 1) {
        return true;
      } else if (variables.indexOf(lhs) === -1) {
        return true;
      }
    }
    return false;
  }
  var checkRightLinear = function (grammerArray) {
    var productions = _.filter(grammerArray, function (x) { return x[0] });
    for (var i = 0; i < productions.length; i++) {
      var r = productions[i][2];
      for (var j = 0; j < r.length; j++) {
        if (variables.indexOf(r[j]) !== -1 && j !== r.length - 1) {
          return false;
        }
      }
    }
    return true;
  };
  // check if FA is finished; if it is, ask if the user wants to export the FA
  controllerProto.checkDone = function () {
    var edges = this.builtDFA.edges();
    var tCount = 0;
    for (var next = edges.next(); next; next = edges.next()) {
      var w = next.weight().split('<br>');
      tCount = tCount + w.length;
    }
  };
  controllerProto.completeConvertToFA = function () {
    var productions = _.filter(this.grammerArray, function (x) { return x[0] });
    for (var i = 0; i < productions.length; i++) {
      // if the current production is not finished yet
      if (!m.isHighlight(i)) {
        var start = this.nodeMap[productions[i][0]];
        var rhs = productions[i][2];
        //if there is no capital letter, then go to final state
        if (variables.indexOf(rhs[rhs.length - 1]) === -1) {
          var end = f;
          var w = rhs;
        } else {
          var end = this.nodeMap[rhs[rhs.length - 1]];
          var w = rhs.substring(0, rhs.length - 1);
        }
        this.grammerMatrix.highlight(i);
        var newEdge = this.builtDFA.addEdge(start, end, { weight: w });
        if (newEdge) {
          newEdge.layout();
          this.checkDone();
        }
      }
    }
  };
  // handler for the nodes of the FA
  controllerProto.convertDfaHandler = function (e) {
    // adding transitions
    this.highlight();
    if (selectedNode) {
      var t = prompt('Terminal to transition on?');
      if (t === null) {
        selectedNode.unhighlight();
        selectedNode = null;
        this.unhighlight();
        return;
      }
      var lv = selectedNode.stateLabel();
      var rv = this.stateLabel();
      // check if valid transition
      for (var i = 0; i < productions.length; i++) {
        var r = productions[i][2];
        var add = false;
        if (rv && productions[i][0] === lv && r[r.length - 1] === rv && r.substring(0, r.length - 1) === t) {
          add = true;
        }
        if (productions[i][0] === lv && this.hasClass('final') && (r === t || (r === emptystring && t === ""))) {
          add = true;
        }
        if (add) {
          m.highlight(i);
          var newEdge = this.builtDFA.addEdge(selectedNode, this, { weight: t });
          selectedNode.unhighlight();
          selectedNode = null;
          this.unhighlight();
          if (newEdge) {
            newEdge.layout();
            this.checkDone();
          }
          return;
        }
      }
      alert('That transition is not correct.');
      selectedNode.unhighlight();
      selectedNode = null;
      this.unhighlight();
    } else {
      selectedNode = this;
    }
    e.stopPropagation();
  };
  controllerProto.convertGrammarHandler = function (index) {
    this.grammerMatrix.highlight(index);
    var l = this.grammerMatrix.value(index, 0);
    var r = this.grammerMatrix.value(index, 2);
    var nodes = this.builtDFA.nodes();
    if (variables.indexOf(r[r.length - 1]) === -1) {
      var newEdge = this.builtDFA.addEdge(this.nodeMap[l], this.finalNode, { weight: r });
    } else {
      var newEdge = this.builtDFA.addEdge(this.nodeMap[l], this.nodeMap[r[r.length - 1]], { weight: r.substring(0, r.length - 1) });
    }
    if (newEdge) {
      newEdge.layout();
      this.checkDone();
    }
  };
  controllerProto.loopOverEachRow = function () {
    for (var i = 0; i < this.grammerArray.length - 1; i++) {
      this.jsav.step();
      this.jsav.umsg("For each production, we need to draw the appropriate transition.")
      this.convertGrammarHandler(i);
    }
  };
}(jQuery));
