// Adds a new node to the specified graph in the given x, y coordinates.
var executeAddNode = function(graph, top, left){
	var newNode = graph.addNode();
	var offsetTop = top - newNode.element.height()/2.0,
		offsetLeft = left - newNode.element.width()/2.0;
	$(newNode.element).offset({top: offsetTop, left: offsetLeft});
	// Node position is centered on the given top, left coordinates.
	return newNode;
};

// Removes the specified node from the specified graph.
var executeDeleteNode = function(graph, node){
	graph.removeNode(node);
};

// Adds a new edge to the specified graph between the two given nodes with the given weight.
var executeAddEdge = function(graph, fromNode, toNode, weight){
	var newEdge = graph.addEdge(fromNode, toNode, {weight: weight});
	if (newEdge) {
		// Acquire each distinct edge transition.
		var weight = newEdge.weight().split('<br>');
		var transitions = [];
		for (var i = 0; i < weight.length; i++) {
			// Ensure there are no repeated edge transitions.
			if (transitions.indexOf(weight[i]) == -1) {
				transitions.push(weight[i]);
			}
		}
		// Update edge weight to erase any duplicate edge transitions.
		newEdge.weight(transitions.join("<br>"));
		newEdge.layout();
		return newEdge;
	}
	else {
		// This should never happen, but it's here just in case (to prevent the program from simply crashing).
		return graph.getEdge(fromNode, toNode);
	}
};

// Removes the specified edge from the specified graph.
var executeDeleteEdge = function(graph, edge){
	graph.removeEdge(edge);
};

// Moves the specified node on the specified graph to the given x, y coordinates.
var executeMoveNode = function(graph, node, top, left){
	var offsetTop = top - node.element.height()/2.0;
	var offsetLeft = left - node.element.width()/2.0;
	$(node.element).offset({top: offsetTop, left: offsetLeft});
	node.stateLabelPositionUpdate();
	// Node position is centered on the given top, left coordinates. Its state label position is updated as such.
	// Now loop through all graph edges and reposition every edge connected to this node.
	var edges = graph.edges();
	for (var next = edges.next(); next; next = edges.next()) {
		if (next.start().equals(node) || next.end().equals(node)) {
			next.layout();
		}
	}
};

// Changes properties of the specified node on the specified graph. Used only by Finite Automaton Editor.
var executeEditFANode = function(graph, node, initialState, finalState, nodeLabel){
	if (initialState) {
		// If this node is the initial state, no other node may be the initial state.
		for (var i = 0; i < graph.nodeCount(); i++) {
			graph.removeInitial(graph.nodes()[i]);
		}
		graph.makeInitial(node);
	}
	else {
		// Remove initial state if not the initial state. This has no effect if it wasn't the initial state to begin with.
		graph.removeInitial(node);
	}
	if (finalState) {
		// Make final state.
		node.addClass('final');
	}
	else {
		// Remove final state.
		node.removeClass('final');
	}
	// Add the state label (if applicable) and update its position relative to that of the node.
	node.stateLabel(nodeLabel);
	node.stateLabelPositionUpdate();
};

// Changes properties of the specified node on the specified graph. Used only by Mealy Machine Editor.
var executeEditMealyNode = function(graph, node, initialState, nodeLabel){
	if (initialState) {
		// If this node is the initial state, no other node may be the initial state.
		for (var i = 0; i < graph.nodeCount(); i++) {
			graph.removeInitial(graph.nodes()[i]);
		}
		graph.makeInitial(node);
	}
	else {
		// Remove initial state if not the initial state. This has no effect if it wasn't the initial state to begin with.
		graph.removeInitial(node);
	}
	// Add the state label (if applicable) and update its position relative to that of the node.
	node.stateLabel(nodeLabel);
	node.stateLabelPositionUpdate();
	// Note that since this is a Mealy Machine, there is no such thing as a "final state".
};

// Changes properties of the specified node on the specified graph. Used only by Moore Machine Editor.
var executeEditMooreNode = function(graph, node, initialState, nodeLabel, nodeOutput){
	if (initialState) {
		// If this node is the initial state, no other node may be the initial state.
		for (var i = 0; i < graph.nodeCount(); i++) {
			graph.removeInitial(graph.nodes()[i]);
		}
		graph.makeInitial(node);
	}
	else {
		// Remove initial state if not the initial state. This has no effect if it wasn't the initial state to begin with.
		graph.removeInitial(node);
	}
	// Add the output character and state label (if applicable) and update their position relative to that of the node.
	node.mooreOutput(nodeOutput);
	node.stateLabel(nodeLabel);
	node.stateLabelPositionUpdate();
	// Note that since this is a Moore Machine, there is no such thing as a "final state".
};

// Changes the specified edge label to the specified weight. Must also specify the graph.
var executeEditEdge = function(graph, edge_label, weight){
	$(edge_label).html(weight);
	graph.layout({layout: "manual"});
	// Updating layout is necessary so that the new label is positioned appropriately on the edge.
};