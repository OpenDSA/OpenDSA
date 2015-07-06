var executeAddNode = function(graph, top, left){
	var newNode = graph.addNode();
	var offsetTop = top - newNode.element.height()/2.0,
		offsetLeft = left - newNode.element.width()/2.0;
	$(newNode.element).offset({top: offsetTop, left: offsetLeft});
};

var executeDeleteNode = function(graph, node){
	graph.removeNode(node);
};

var executeAddEdge = function(graph, fromNode, toNode, weight){
	var newEdge = graph.addEdge(fromNode, toNode, {weight: weight});
	if (newEdge) {
		var weight = newEdge.weight().split('<br>');
		var transitions = [];
		for (var i = 0; i < weight.length; i++) {
			if (transitions.indexOf(weight[i]) == -1) {
				transitions.push(weight[i]);
			}
		}
		newEdge.weight(transitions.join("<br>"));
		newEdge.layout();
		return newEdge;
	}
	else {
		return graph.getEdge(fromNode, toNode);
	}
};

var executeDeleteEdge = function(graph, edge){
	graph.removeEdge(edge);
};

var executeMoveNode = function(graph, node, top, left){
	var offsetTop = top - node.element.height()/2.0;
	var offsetLeft = left - node.element.width()/2.0;
	var edges = graph.edges();
	$(node.element).offset({top: offsetTop, left: offsetLeft});
	node.stateLabelPositionUpdate();
	for (var next = edges.next(); next; next = edges.next()) {
		if (next.start().equals(node) || next.end().equals(node)) {
			next.layout();
		}
	}
};

var executeEditNode = function(graph, node, initialState, nodeLabel){
	if (initialState) {
		for (var i = 0; i < graph.nodeCount(); i++) {
			graph.removeInitial(graph.nodes()[i]);
		}
		graph.makeInitial(node);
	}
	else {
		graph.removeInitial(node);
	}
	node.stateLabel(nodeLabel);
	node.stateLabelPositionUpdate();
};

var executeEditEdge = function(graph, edge, weight){
	$(edge).html(weight);
	graph.layout({layout: "manual"});
};