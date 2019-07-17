/*
	 Automaton module.
     An extension to the JFLAP library.
     This will be the base class for all models used in OpenFLAP
 */
var lambda = String.fromCharCode(955),
		epsilon = String.fromCharCode(949),
		emptystring = lambda,
		menuSelected; // stores the node that's right clicked on

var Automaton;

(function($) {
	"use strict";
	if (typeof JSAV === "undefined") {
		console.log("Error!!! No JSAV lib!!!");
	}
	var Edge = JSAV._types.ds.Edge;
	JSAV.ext.ds.automaton = function (options) {
		var opts = $.extend(true, {visible: true, autoresize: true}, options);
		return new Automaton(this, opts);
	};

	/*
		 Automaton class, used for DFAs/NFAs, PDAs, Mealy/Moore machines, and Turing Machines.
		 Extended from the JSAV graph class.
	 */
	Automaton = function (jsav, options) {
		this.init(jsav, options);
	};
	JSAV.utils.extend(Automaton, JSAV._types.ds.Graph);
	var automatonproto = Automaton.prototype;

	automatonproto.init = function (jsav, options) {
		this._nodes = [];
		this._edges = [];
		this._alledges = null;
		this.alphabet = {};           // input alphabet
		this.jsav = jsav;
		this.initial;                 // initial state
		this.first;										// first selected node, used for creating edges
		this.selected;								// selected node, used for right click, delete etc
		this.undoStack = [];
		this.redoStack = [];
		this.editable = options.editable;
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
Graph: Automaton,
Node: State,
Edge: Transition
}, this.options.constructors);
JSAV.utils._helpers.handlePosition(this);
JSAV.utils._helpers.handleVisibility(this, this.options); 
var t = this;
$(document).click(function() {
		t.hideRMenu();
		});

$("#rmenu").load("rmenu.html");
$("#rmenu").hide();

/**************** Add ability to run multiple inputs ***************************/
// Bind opening of modal to a button
$('#openMultiRun').click(function(){
    $('#multiModal').show();
  });
$("#multiRun").load("multiRun.html"); // Load Info from html file
$("#multiModal").hide(); // Hide it automatically
};

/**
 * Add event listener to the button in the modal that closes the modal
 */
$(document).on("click", '#closeModal', function(){
    $('#multiModal').hide();
  });
/**
 * Add event listener To the remove button of the top row 
 */
$(document).on("click", '#removeTopButton', function(){
  var tbody = $('#multiInputTable > table > tbody');
  var rows = tbody.find('tr');
  if (rows.length > 3) {
    $(this).parents('tr').detach();
  }
});

/**
 * Add event listener To the remove button of the lower rows
 */
$(document).on("click", '#removeButton', function(){
  var tbody = $('#multiInputTable > table > tbody');
  var rows = tbody.find('tr');
  if (rows.length > 3) {
    $(this).parents('tr').detach();
  }
});

/**
 * Add event listener To the add row button 
 */
$(document).on("click", '#addRowButton', function(){
  var $TABLE =  $('#multiInputTable');
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

automatonproto.initFromParsedJSONSource = function(source, ratio) {
	var nodes = this.nodes();
	if (!ratio) {
		ratio = 1;
	}
	for (var next = nodes.next(); next; next = nodes.next()) {
		this.removeNode(next);
	}
	for (var i = 0; i < source.nodes.length; i++) {
		var nodeName;
		if(source.names)
			nodeName = source.names[i];
		else
		nodeName = 'q' + i;
		var node = this.addNode({value:nodeName}),
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
		$(node.element).offset({top : topOffset, left: leftOffset});

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
			var edge = this.addEdge(this.nodes()[source.edges[i].start], this.nodes()[source.edges[i].end], {weight: w});
		}
		else {
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
automatonproto.addNode = function(options) {
	var value;
	if (!options || !options.value) {
		value = "q" + this._nodes.length;
	}
	else{
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
		if (this.editable) {
			newNode.element.contextmenu(function(e) {
			newNode.showMenu(e);
		});
	}
	return newNode;
};

automatonproto.getTransitionsFromState = function(node) {
	var neighbors = node.neighbors();
	var re = [];
	neighbors.foreach(function(neighbor, index, nbrs) {
			var edge = this.getEdge(node, neighbor);
			re.push(edge);
			});
	return re;
}

automatonproto.enableDragging = function() {
	for (var i = this._nodes.length; i--; ) {
		this._nodes[i].element.draggable('enable');
	}
};

automatonproto.disableDragging = function() {
	for (var i = 0; i < this._nodes.length; i++) {
		this._nodes[i].element.draggable('disable');
	}
};

// Method to remove the given node
automatonproto.removeNode = function(node, options) {
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
automatonproto.newNode = function(value, options) {
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
automatonproto.addEdge = function(fromNode, toNode, options) {
	// assumes a weight is always given
	if (options.weight === "" || options.weight == lambda) {
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
	}
	else {
		// This should never happen, but it's here just in case (to prevent the program from simply crashing).
		return graph.getEdge(fromNode, toNode);
	}
};

// Function to delete the given edge. Can pass in an edge or two nodes.
automatonproto.removeEdge = function(fNode, tNode, options) {
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
automatonproto.makeInitial = function(node, options) {
	node.addClass("start");
	this.initial = node;
	node.addInitialMarker($.extend({container: this}, this.options));
};

// Function to find and remove the initial state marker.
automatonproto.removeInitial = function(node, options) {
	if (node.equals(this.initial)) {
		node.removeClass('start');
		this.initial = undefined;
		if (node._initialMarker) {
			node._initialMarker.element.remove();
			node._initialMarker = undefined;
		}
	}
};

automatonproto.makeFinal = function(node) {
	node.addClass("final");
}

automatonproto.removeFinal = function(node) {
	node.removeClass("final");
}

automatonproto.setShorthand = function (setBoolean) {
	this.shorthand = setBoolean;
}

// return final states as [fastate]
automatonproto.getFinals = function() {
	var nodes = this.nodes(), finals = [];
	for (var node = nodes.next(); node; node = nodes.next()) {
		if (node.hasClass('final')) {
			finals.push(node);
		}
	}
	return finals;
}

//update all edge label positions
automatonproto.updateEdgePositions = function() {
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
automatonproto.updateNodes = function() {
	for (var i = 0; i < this._nodes.length; i++) {
		this._nodes[i].value('q'+i);
	}
};
// Function to find a node using its name.
automatonproto.getNodeWithValue = function(value) {
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
        if (result){
          rows[i].cells[1].innerHTML = "Accepted"
        }
        else {
          rows[i].cells[1].innerHTML = "Rejected"
        }
        if (i >= 50) break;
  }
}

/*
	 Function to lay out the FA. 
	 Uses JFLAP's graph layout algorithms; an FA layout algorithm needs to be written.
 */
automatonproto.layout = function(options) {
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

// function to hide the right click menu
// called when mouse clicks on anywhere on the page except the menu
automatonproto.hideRMenu = function() {
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
automatonproto.saveFAState = function() {
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
automatonproto.undo = function() {
	var data = serialize(this);
	this.redoStack.push(data);
	data = this.undoStack.pop();
	data = jQuery.parseJSON(data);
	this.initFromParsedJSONSource(data);
	document.getElementById("redoButton").disabled = false;
	if(this.undoStack.length == 0) {
		document.getElementById("undoButton").disabled = true;
	}
};

// Function to redo previous action by reinitializing the graph that existed after it was performed.
// Pushes the current graph to the undo stack and, if applicable, enables the undo button.
// Enabled by clicking the "Undo" button, and triggered by clicking the "Redo" button.
automatonproto.redo = function() {
	var data = serialize(this);
	this.undoStack.push(data);
	data = this.redoStack.pop();
	data = jQuery.parseJSON(data);
	this.initFromParsedJSONSource(data);
	document.getElementById("undoButton").disabled = false;
	if(this.redoStack.length == 0) {
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
	this.wasHighlighted;

	JSAV.utils._helpers.handlePosition(this);
	JSAV.utils._helpers.handleVisibility(this, this.options);
};

/*
	 Function to get all outgoing edges of a node.
	 Returns a normal array, not an iterable array like .getNodes does.
 */
stateproto.getOutgoing = function() {
	var edges = this.container._edges[this.container._nodes.indexOf(this)];
	return edges; 
};
/*
	 Function to set the state label or get the current value of the state label.
	 "node.stateLabel()" does not return the state label if the node is hidden!
	 "node._stateLabel.element[0].innerHTML" will return the state label regardless of visibility
 */
stateproto.stateLabel = function(newLabel, options) {
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

// displays the right click menu, called when right clicks on a node
stateproto.showMenu = function(e) {
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
	$("#rmenu").css({left: this.element.offset().left + e.offsetX, top: this.element.offset().top + e.offsetY});

	$("#rmenu").show();
	// add a check mark if the node is already a certain state
	if (this.equals(g.initial)) {
		$("#makeInitial").html("&#x2713;Initial");
	}
	else {
		$("#makeInitial").html("Initial");
	}
	if (this.hasClass("final")) {
		$("#makeFinal").html("&#x2713;Final");
	}
	else {
		$("#makeFinal").html("Final");
	}

	var node = this;
	//off and on to avoid binding event more than once
	$("#makeInitial").off('click').click(function() {
			toggleInitial(g, node);
			});
	$("#makeFinal").off('click').click(function() {
			toggleFinal(g, node);
			});
	$("#deleteNode").off('click').click(function() {
			g.hideRMenu();
			g.removeNode(node);
			});
	$("#changeLabel").off('click').click(function() {
			changeLabel(node);
			});
	$("#clearLabel").off('click').click(function() {
			clearLabel(node);
			});
}

stateproto.mooreOutput = function(newOutput, options) {
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
stateproto.stateLabelPositionUpdate = function(options) {
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
				newLeft = bbox.left - 30;
		if (newTop !== lbbox.top || newLeft || lbbox.left) {
			this._stateLabel.css({top: newTop, left: newLeft/*, width: nWidth*/}, options);
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
stateproto.addInitialMarker = function(options) {
	var t = this.position().top + this.element.outerHeight()/2.0,
			l2 = this.position().left,
			l1 = l2 - 10;
	this._initialMarker = this.jsav.g.line(l1, t, l2, t, $.extend({"stroke-width": 5, "arrow-end": "block-wide-short"}, options));
};

// draggable functions
function dragStart(event, node) {
	var dragNode = node.helper.data("node");
	dragNode.wasHighlighted = dragNode.hasClass("jsavhighlight");
	dragNode.highlight();
};

function dragStop(event, node) {
	var dragNode = node.helper.data("node");
	if (!dragNode.wasHighlighted) {
		dragNode.unhighlight();
	}
};

function dragging(event, node) {
	$('path[opacity="0"]').remove();
	var dragNode = node.helper.data("node");
	g = dragNode.automaton;
	if (dragNode == g.initial) {
		if (node.helper.offset().left < 45) {
			node.helper.offset({left: 45});
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
JSAV.utils.extend(Transition, JSAV._types.ds.Edge);

var transitionproto = Transition.prototype;
// Function to set the weight of the edge or return the current weight of the edge
transitionproto.weight = function(newWeight) {
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
transitionproto.layout = function(options) {
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
		fromX = Math.round(fromX - adjust * sWidth);
		var loopR = Math.round(0.8 * sWidth);
		//this.g.path("M" + fromX + ',' + fromY + ' a' + loopR + ',' + loopR + ' -45 1,1 ' 
		//		+ (Math.round(2 * sWidth * adjust) + 2) + ',' + 0, options);
		/************************This code is added to determine the arc direction for the loop arrow. if the state is in the second half of the 
		FA, then the acr will be in the button. */
		if((this.end().position().top > this.container.element.height()/2)){//this means, draw the arrow at the button
			fromY = Math.round(fromY + sHeight);//Change the - sign to + in case we need to flip the loop arrow and remove "adjust"
			this.g.path("M" + fromX + ',' + fromY + ' a' + loopR + ',' + loopR + ' -45 1,0 '  //this 1 is to draw it from the top. Make it 0 to flip it.
				+ (Math.round(2 * sWidth * adjust) + 2) + ',' + 0, options);
		}
		else
		{
			fromY = Math.round(fromY - adjust * sHeight);
			this.g.path("M" + fromX + ',' + fromY + ' a' + loopR + ',' + loopR + ' -45 1,1 '  //this 1 is to draw it from the top. Make it 0 to flip it.
				+ (Math.round(2 * sWidth * adjust) + 2) + ',' + 0, options);
		}
	}
	// If the edge should be an arc (implemented as a quadratic bezier curve)
	else if (this.options.arc) {
		this.options.arcoffset = 15;
		var midX = ((fromPoint[0] + toPoint[0]) / 2.0),
				midY = ((fromPoint[1] + toPoint[1]) / 2.0),
				vectorX = fromPoint[1] - toPoint[1],
				vectorY = toPoint[0] - fromPoint[0],
				scaling = this.options.arcoffset / Math.sqrt(Math.pow(vectorX, 2) + Math.pow(vectorY, 2)),
				controlPointX = midX + scaling * vectorX,
				controlPointY = midY + scaling * vectorY;
				//controlPointY = (controlPointY <= 70)? controlPointY + controlPoint_offset: controlPointY;
				//controlPointY = (controlPointY >= 140)? controlPointY - controlPoint_offset: controlPointY;
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
		if (this.start().equals(this.end())) {//in case of loop arrow we need to do the same as we did for the arrow direction. 
			bbtop = Math.round(start.top - 1.1 * sHeight);
			if((this.end().position().top > this.container.element.height()/2)){
				bbtop = Math.round(start.top + sHeight * 2 + 2.6 * sHeight);
			}
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
transitionproto.dfaArc = function(newBool) {
	if (typeof newBool === "undefined") {
		return this.options.arc;
	} 
	else if (typeof newBool === 'boolean') {
		this.options.arc = newBool;
	}
};




var dstypes = JSAV._types.ds;
dstypes.Automaton = Automaton;
dstypes.State = State;
dstypes.Transition = Transition;

}(jQuery));

var toColonForm = function(string) {
	var re = string.replace(/,/g, ":");
	re = re.replace(/;/g, ":");
	return re;
}