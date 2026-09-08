var selectedNode;

var Minimizer = function(jsav, referenceGraph, tree) {
	this.init(jsav, referenceGraph, tree);
}

var minimizer = Minimizer.prototype;

minimizer.init = function(jsav, referenceGraph, tree) {
	this.jsav = jsav;
	this.ref = referenceGraph;
	this.alphabet = Object.keys(this.ref.alphabet);
	this.tree = tree;
	this.finals = [];
	this.nonfinals = [];
	this.reachable = [];

	this.addTrapState();
	var val = this.getReachable();
	this.initTree(val);
}

// minimizing DFA needs a complete FA, so this function adds trap states
minimizer.addTrapState = function() {
	var nodes = this.ref.nodes();
	var trapEdge = this.alphabet.join("<br>");
	var trapNode;
	for (var node = nodes.next(); node; node = nodes.next()) {
		for (var i = 0; i < this.alphabet.length; i++) {
			var letter = this.alphabet[i];
			var toNode = this.ref.transitionFunction(node, letter)[0];
			if (toNode) continue;
			if (!trapNode) {
				trapNode = this.ref.addNode();
				this.ref.addEdge(trapNode, trapNode, {weight: trapEdge});
			}
			this.ref.addEdge(node, trapNode, {weight: letter});
		}
	}
};

// Function to get reachable states from the initial state
// returns all reachable states in an array val
minimizer.getReachable = function() {
	var val = [];
	this.reachable = [this.ref.initial];
	dfs(this.reachable, this.ref.initial);
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

minimizer.initTree = function(val) {
	this.tree.root(val.sort().join());
	this.tree.root().child(0, this.nonfinals.sort().join());
	this.tree.root().child(1, this.finals.sort().join());
	this.tree.root().child(1).addClass('final');
	this.tree.layout();
	var t = this;
	this.tree.click(function(e) {
		t.treeClickHandlers(this, e);
	});
}

minimizer.treeIsComplete = function() {
	var leaves = getLeaves(this.tree.root());
	for (var i = 0; i < leaves.length; i++) {
		var leaf = leaves[i].split(',');
		for (var k = 0; k < this.alphabet.length; k++) {
			var dArr = [],
					letter = this.alphabet[k];
			for (var j = 0 ; j < leaf.length; j++) {
				var node = this.ref.getNodeWithValue(leaf[j]);
				var next = this.ref.transitionFunction(node, letter);
				if (next[0]) {
					dArr.push(next[0]);
				}
			}
			// I apologize for this, I don't understand it either.
			if (!_.find(leaves, function(v){return _.difference(dArr, v.split(',')).length === 0}) && dArr.length !== 0) {
				return false;
			}
		}
	}
}

Minimizer.getLeaves = function(node) {
	// gets the leaf values of a tree
	var arr = [];
	if (node.childnodes == false) {
		return arr.concat([node.value()]);
	} else { 
		for (var i = 0; i < node.childnodes.length; i++) {
			arr = arr.concat(getLeaves(node.child(i)));
		}
		return arr;
	}
}

minimizer.treeClickHandlers = function(node, e) {
	var leaves = getLeaves(this.tree.root());
	// ignore if not a leaf node
	if (!_.contains(leaves, node.value())) {
		return;
	}
	if (!$('#editable').hasClass('working')) {
		if (selectedNode) {
			selectedNode.unhighlight();
			referenceGraph.unhighlightAll();
		}
		var val = node.value().split(',');
		// highlight the DFA states which are in the selected tree node
		var hNodes = this.ref.nodes();
		for (var next = hNodes.next(); next; next = hNodes.next()) {
			if (_.contains(this.reachable, next.value())) {
				next.highlight();
			}
		}
		selectedNode = node;
		node.highlight();
	} else {
		if (!_.contains(checkNodeArr, node)) {
			return;
		}
		if (selectedNode) {
			selectedNode.unhighlight();
		}
		selectedNode = node;
		node.highlight();
	}
};
