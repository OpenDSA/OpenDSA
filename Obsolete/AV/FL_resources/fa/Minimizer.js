var Minimizer = function() {
}

var minimizer = Minimizer.prototype;

minimizer.minimizeDFA = function(jsav, referenceGraph, tree, newGraphDimensions){
	this.init(jsav, referenceGraph, tree);
	var listOfVisitedLeaves = [];
	var listOfLeaves = this.getLeaves(this.tree.root());
	var leaf;
	var moreToSplit = true;
	this.jsav.umsg("Now we will test the terminals against the states in that subset to see if they all go to the same subset. Split them up when they do not go to the same place.")
	while(moreToSplit){
		moreToSplit = null;
	for(var i = 0; i< listOfLeaves.length; i++){
		listOfVisitedLeaves = listOfVisitedLeaves.concat(listOfLeaves);
		this.jsav.step();
		this.unhighlightAllTreeNodes(this.tree);
		this.unhighlightAll(this.referenceGraph);
		leaf = listOfLeaves[i];
		var leafTreeNode = getTreeNode(leaf, this.tree.root());
		leafTreeNode.highlight();
		var split = this.autoPartition(leaf);
		if(moreToSplit !== null)
			moreToSplit =  split || moreToSplit;
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
minimizer.init = function(jsav, referenceGraph, tree) {
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
minimizer.addTrapState = function() {
	
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
				this.referenceGraph.addEdge(trapNode, trapNode, {weight: trapEdge});
			}
			this.referenceGraph.addEdge(node, trapNode, {weight: letter});
		}
	}
	if(trapNode){
		this.referenceGraph.layout();
		this.jsav.step();
	}
};

// Function to get reachable states from the initial state
// returns all reachable states in an array val
minimizer.getReachable = function() {
	var val = [];
	this.reachable = [this.referenceGraph.initial];
	dfs(this.reachable, this.referenceGraph.initial);
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
	
}

minimizer.treeIsComplete = function() {
	var leaves = this.getLeaves(this.tree.root());
	for (var i = 0; i < leaves.length; i++) {
		var leaf = leaves[i].split(',');
		for (var k = 0; k < this.alphabet.length; k++) {
			var dArr = [],
					letter = this.alphabet[k];
			for (var j = 0 ; j < leaf.length; j++) {
				var node = this.referenceGraph.getNodeWithValue(leaf[j]);
				var next = this.referenceGraph.transitionFunction(node, letter);
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

minimizer.getLeaves = function(node) {
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
minimizer.getTreeNodes = function(node) {
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
minimizer.unhighlightAll = function(graph) {
	var nodes = graph.nodes();
	for (var next = nodes.next(); next; next = nodes.next()) {
		next.unhighlight();
	}
};
minimizer.unhighlightAllTreeNodes = function(tree) {
	var leaves = this.getTreeNodes(tree.root());
	leaves.map(function(node){
		node.unhighlight();
	})
};
minimizer.autoPartition = function(treeNode) {
	var leaves = this.getLeaves(this.tree.root());
	var val = treeNode.split(',');//this.selectedNode.value().split(',');
	var nObj = {},
		sets = {},
		letter;
	// check all terminals (even if one was inputted by the user)
	for (var k = 0; k < this.alphabet.length; k++) {
		nObj = {};
		letter = this.alphabet[k];
		for (var j = 0 ; j < val.length; j++) {
			var node = this.referenceGraph.getNodeWithValue(val[j]);
			var next = this.referenceGraph.transitionFunction(node, letter);
			if (!nObj.hasOwnProperty(next[0])) {
				nObj[next[0]] = [];
			}
			nObj[next[0]].push(node.value());
		}
		var nArr = Object.keys(nObj);
		if (!_.find(leaves, function(v){return _.difference(nArr, v.split(',')).length === 0})) {
			break;
		}
		else if (k === this.alphabet.length - 1) {
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
			if(nodeListAsString!== "")
				nodeListAsString += "-";
			//this.selectedNode.addChild(nVal, {edgeLabel: letter});
			node.addChild(nVal, {edgeLabel: letter});
			nodeListAsString += "Node " +nVal;
		}
	}
	nodeListAsString = listOFNodesToString(nodeListAsString);
	nodeListAsString+= " by using the transition label " + letter;
	this.jsav.umsg("Node "+ latixifyNodeName(treeNode) +" will be divided into " + nodeListAsString + ".");
	highlightAllNodes(treeNode.split(','), this.referenceGraph);
	//this.unhighlightAll(this.referenceGraph);
	this.tree.layout();
	return true;
};
minimizer.done = function(newGraphDimensions) {
	var leaves = this.getLeaves(this.tree.root());
	for (var i = 0; i < leaves.length; i++) {
		var leaf = leaves[i].split(',');
		for (var k = 0; k < this.alphabet.length; k++) {
			var dArr = [],
				letter = this.alphabet[k];
			for (var j = 0 ; j < leaf.length; j++) {
				var node = this.referenceGraph.getNodeWithValue(leaf[j]);
				var next = this.referenceGraph.transitionFunction(node, letter);
				if (next[0]) {
					dArr.push(next[0]);
				}
			}
			if (!_.find(leaves, function(v){return _.difference(dArr, v.split(',')).length === 0}) && dArr.length !== 0) {
				this.jsav.umsg("There are distinguishable states remaining");
				return;
			}
		}
	}
	// if complete create minimized DFA
	
	var graph = this.jsav.ds.FA({width: newGraphDimensions.width, 
								height: newGraphDimensions.height, layout: 'automatic', 
								left: newGraphDimensions.left, 
								top: newGraphDimensions.top});
	for (var i = 0; i < leaves.length; i ++) {
		var node = graph.addNode();
		node.stateLabel(leaves[i]);
		var leaf = leaves[i].split(',');
		for (var j = 0; j < leaf.length; j++) {
			var n = this.referenceGraph.getNodeWithValue(leaf[j]);
			if (n.equals(this.referenceGraph.initial)) {
				graph.makeInitial(node);
				break;
			}
			else if (n.hasClass('final')) {
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
			if (next2.stateLabel().split(',').indexOf(ns) !== -1) {
				node1 = next2;
			} 
			if (next2.stateLabel().split(',').indexOf(ne) !== -1) {
				node2 = next2;
			}
		}
		// graph.addEdge(node1, node2, {weight: next.weight()});
		if(!this.minimizedEdges.hasOwnProperty(node1.value())) {
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
minimizer.complete = function(studentGraph) {
	for (var i in this.minimizedEdges) {
		for (var j in this.minimizedEdges[i]) {
			var n1 = studentGraph.getNodeWithValue(i),
				n2 = studentGraph.getNodeWithValue(j),
				w = this.minimizedEdges[i][j].join('<br>');
			var newEdge = studentGraph.addEdge(n1, n2, {weight: w});
			if (newEdge) {
				newEdge.layout();
			}
		}
	}
	return studentGraph;
};
var getTreeNode = function(nodeValue, node){
	if (node.childnodes == false && node.value()===nodeValue) {//leaf
		return node;
	} else {
		var result = null; 
		for (var i = 0; i < node.childnodes.length; i++) {
			result = result || getTreeNode(nodeValue, node.child(i));
		}
		return result;
	}
}

var listOFNodesToString = function(nodeListAsString){
	var lastCommaIndex = nodeListAsString.lastIndexOf('-');
	if(lastCommaIndex > 0){
		nodeListAsString = nodeListAsString.slice(0, lastCommaIndex  ) + ", and " + nodeListAsString.slice(lastCommaIndex + 1);
		nodeListAsString = nodeListAsString.split('-').join(', ');
	}

	return latixifyNodeName(nodeListAsString);
}
var latixifyNodeName = function(nodeListAsString){
	var re = /q\d+/g;
	var listOfNodes = nodeListAsString.match(re);
	listOfNodes.map( function(node) {
		nodeListAsString = nodeListAsString.replace(node, '$' + node.slice(0, 1) + '_{' + node.slice(1) + '}$');
   })
   return nodeListAsString;
}

var highlightAllNodes = function (listOfNodes, graph){
	for (var i = 0; i< listOfNodes.length; i++) {
		graph.getNodeWithValue(listOfNodes[i]).highlight("green");
	}
}
