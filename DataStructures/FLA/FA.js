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

    $("#rmenu").load("rmenu.html");
    $("#rmenu").hide();

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
      jsav.umsg("Nest step is to identify the transitions out of the DFA start state. For each letter in the alphabet, consider all states reachable in the NFA from any state in the start state on that letter. This becomes the name of the target state on that transition.");

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
          jsav.umsg("Repeat the process for each new node we find");
        }
      }
    }
    // add the final markers
    if (visualizable)
      jsav.umsg("Determine the final states");
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

  /**
   * MAke publicly available methods
   */
  FiniteAutomaton.convertNFAtoDFA = convertToDFA;
  window.FADepthFirstSearch = dfs;
  window.lambdaClosure = lambdaClosure;
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
    this.jsav.umsg("We need to complete all the missing tansitions for this Machine");
    this.completeTransitions();
    var nodes = getAllNonStartNorFinalStates(this.fa);
    for (var i = 0; i < nodes.length; i++) {
      this.jsav.step();
      this.jsav.umsg("We should collapse the node " + nodes[i].value());
      localStorage.trans = 'false';
      nodes[i].highlight();
      this.fa.selected = nodes[i];
      this.collapseState(nodes[i], transitionOptions);
      this.jsav.step();
      this.jsav.umsg("You can click on each table row to heighlight the affected transitions.");
      nodes[i].unhighlight();
      this.jsav.step();
      this.jsav.umsg("Removing the node " + nodes[i].value() + " will create an new but equivalent graph");
      this.finalizeRE();
    }
    this.jsav.step();
    this.jsav.umsg("After removing all nodes that are not fianl and not start, the resulting Regular Exepression is");
    this.transitions.hide();
    drawTheFinalGraph(this.jsav, finaGraphOptions, this.generateExpression());
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
    this.current = (index == undefined)? 1: index;//the location to highlight
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
  minimizer.minimizeDFA = function (jsav, referenceGraph, tree, newGraphDimensions) {
    this.init(jsav, referenceGraph, tree);
    var listOfVisitedLeaves = [];
    var listOfLeaves = this.getLeaves(this.tree.root());
    var leaf;
    var moreToSplit = true;
    this.jsav.umsg("Now we will test the terminals against the states in that subset to see if they all go to the same subset. Split them up when they do not go to the same place.")
    while (moreToSplit) {
      moreToSplit = null;
      for (var i = 0; i < listOfLeaves.length; i++) {
        listOfVisitedLeaves = listOfVisitedLeaves.concat(listOfLeaves);
        this.jsav.step();
        this.unhighlightAllTreeNodes(this.tree);
        this.unhighlightAll(this.referenceGraph);
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
    this.jsav.step();
    this.unhighlightAllTreeNodes(this.tree);
    this.unhighlightAll(this.referenceGraph);
    this.jsav.umsg("Since we do not have any more splits, the resulting tree represents the nodes in the minimized DFA.");
    this.jsav.step();
    return this.done(newGraphDimensions);
  }
  minimizer.init = function (jsav, referenceGraph, tree) {
    this.selectedNode = null;
    this.jsav = jsav;
    this.referenceGraph = referenceGraph;
    this.alphabet = Object.keys(this.referenceGraph.alphabet);
    this.tree = tree;
    this.finals = [];
    this.nonfinals = [];
    this.reachable = [];
    this.minimizedEdges = {};

    this.addTrapState();
    var val = this.getReachable();
    this.initTree(val);
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
        //this.selectedNode.unhighlight();
        this.unhighlightAll(this.referenceGraph);
        //this.selectedNode = null;
        this.jsav.umsg("Node " + latixifyNodeName(treeNode) + " will not be divided.");
        highlightAllNodes(treeNode.split(','), this.referenceGraph);
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
    nodeListAsString = listOFNodesToString(nodeListAsString);
    nodeListAsString += " by using the transition label " + letter;
    this.jsav.umsg("Node " + latixifyNodeName(treeNode) + " will be divided into " + nodeListAsString + ".");
    highlightAllNodes(treeNode.split(','), this.referenceGraph);
    //this.unhighlightAll(this.referenceGraph);
    this.tree.layout();
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
    this.jsav.step();
    //graph.click(nodeClickHandlers);
    this.jsav.umsg("Finish the DFA by finding the transisitons between nodes.");
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
