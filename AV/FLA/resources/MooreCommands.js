var executeAddNode = function(top, left){
	var newNode = g.addNode();
	var offsetTop = top - newNode.element.height()/2.0,
		offsetLeft = left - newNode.element.width()/2.0;
	$(newNode.element).offset({top: offsetTop, left: offsetLeft});
	var outputChar = window.prompt("Output character?");
	if (outputChar) {
		newNode.mooreOutput(outputChar);
	}
	else {
		newNode.mooreOutput(emptystring);
	}
	newNode.stateLabelPositionUpdate();
};

var executeDeleteNode = function(node){
	g.removeNode(node);
	updateAlphabet();
};

var executeAddEdge = function(toNode, fromNode, weight){
	var newEdge = g.addEdge(toNode, fromNode, {weight: weight});
	newEdge.layout();
	updateAlphabet();
};

var executeDeleteEdge = function(edge){
	g.removeEdge(edge);
	updateAlphabet();
};

var executeMoveNode = function(node, top, left){
	var offsetTop = top - node.element.height()/2.0;
	var offsetLeft = left - node.element.width()/2.0;
	var edges = g.edges();
	$(node.element).offset({top: offsetTop, left: offsetLeft});
	node.stateLabelPositionUpdate();
	for (var next = edges.next(); next; next = edges.next()) {
		if (next.start().equals(node) || next.end().equals(node)) {
			next.layout();
		}
	}
};

var executeEditNode = function(node, initialState, nodeLabel, nodeOutput){
	if (initialState) {
		for (var i = 0; i < g.nodeCount(); i++) {
			g.removeInitial(g.nodes()[i]);
		}
		g.makeInitial(node);
	}
	else {
		g.removeInitial(node);
	}
	if (nodeOutput) {
		node.mooreOutput(nodeOutput);
	}
	else {
		node.mooreOutput(emptystring);
	}
	node.stateLabel(nodeLabel);
	node.stateLabelPositionUpdate();
};

var executeEditEdge = function(edge, weight){
	edge.weight(weight);
	edge.layout();
	updateAlphabet();
};