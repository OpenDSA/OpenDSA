/*
Demo for interactive DFA minimization.
While it has the option to split a minimization tree node automatically,
it lacks the option to do the entire minimization automatically.
Furthermore, the current implementation of the algorithm is inefficient;
if computational complexity is a concern, should be changed to use a union-find structure.
*/
(function ($) {
	// gets the leaf values of a tree
	var getLeaves = function(node) {
		var arr = [];
		if (node.childnodes == false) {
			return arr.concat([node.value()]);
		} else { 
			for (var i = 0; i < node.childnodes.length; i++) {
				arr = arr.concat(getLeaves(node.child(i)));
			}
			return arr;
		}
	};
	localStorage["jsav-speed"] = 0; // set default animation speed to max
	var jsav = new JSAV("av"),
		input,						// terminal to partition on
		selectedNode = null,
		referenceGraph,							// reference (original DFA); assumes its a DFA
		studentGraph,							// working conversion
		bt,							// tree
		alphabet,
		partitions = [],			// user created partitions
		checkNodeArr = [],			// correct partitions
		minimizedEdges = {};		// adjlist of minimized DFA
	
	var lambda = String.fromCharCode(955),
			epsilon = String.fromCharCode(949);
  
	// initialize reference/original DFA
	function initGraph() {
		if (localStorage['minimizeDFA'] == "true") {
			localStorage['minimizeDFA'] = false;
			var data = localStorage['toMinimize'];
			return deserialize(data);
		}
		else {
			alert("Use FAEditor to minimize DFA.");
			window.close();
		}
	};

	function deserialize (data) {
		var gg = jQuery.parseJSON(data);
		var graph = jsav.ds.fa({width: '45%', height: 440, layout: 'manual', element: $('#reference')});
		graph.initFromParsedJSONSource(gg, 0.5);
		graph.updateAlphabet();
		alphabet = Object.keys(graph.alphabet).sort();
		$("#alphabet").html("" + alphabet);
	  return graph;
	};

	// initialize tree of undistinguishable states
	function initializeBT() {
		$('#editable').empty();
		bt = jsav.ds.tree();
		addTrapState();
		var val = [],
			finals = [],
			nonfinals = [];
		// ignore unreachable states
		var reachable = [referenceGraph.initial];
		dfs(reachable, referenceGraph.initial);
		for (var i = 0; i < reachable.length; i++) {
			val.push(reachable[i].value());
			if (reachable[i].hasClass('final')) {
				finals.push(reachable[i].value());
			} else {
				nonfinals.push(reachable[i].value());
			}
		}
		bt.root(val.sort().join());
		bt.root().child(0, nonfinals.sort().join());
		bt.root().child(1, finals.sort().join());
		bt.root().child(1).addClass('final');
		bt.layout();
		bt.click(treeClickHandlers);
	};

	function addTrapState() {
		var alphabet = Object.keys(referenceGraph.alphabet);
		var nodes = referenceGraph.nodes();
		var trapEdge = alphabet.join("<br>");
		var trapNode;
		for (var node = nodes.next(); node; node = nodes.next()) {
			for (var i = 0; i < alphabet.length; i++) {
				var letter = alphabet[i];
				var toNode = referenceGraph.transitionFunction(node, letter)[0];
				if (toNode) continue;
				if (!trapNode) {
					trapNode = referenceGraph.addNode();
					referenceGraph.addEdge(trapNode, trapNode, {weight: trapEdge});
				}
				referenceGraph.addEdge(node, trapNode, {weight: letter});
			}
		}
	};

	// check if tree is complete
	function done() {
		if (selectedNode) {
			selectedNode.unhighlight();
			selectedNode = null;
		}
		unhighlightAll(referenceGraph);
		var leaves = getLeaves(bt.root());
		for (var i = 0; i < leaves.length; i++) {
			var leaf = leaves[i].split(',');
			for (var k = 0; k < alphabet.length; k++) {
				var dArr = [],
					letter = alphabet[k];
				for (var j = 0 ; j < leaf.length; j++) {
					var node = referenceGraph.getNodeWithValue(leaf[j]);
					var next = referenceGraph.transitionFunction(node, letter);
					if (next[0]) {
						dArr.push(next[0]);
					}
				}
				if (!_.find(leaves, function(v){return _.difference(dArr, v.split(',')).length === 0}) && dArr.length !== 0) {
					jsav.umsg("There are distinguishable states remaining");
					return;
				}
			}
		}
		// if complete create minimized DFA
		$('.split').hide();
		$('#autobutton').hide();
		$('.hide').show();
		$('#exportbutton').hide();
		$('#editable').empty();
		var graph = jsav.ds.fa({width: '45%', height: 440, layout: 'automatic', element: $('#editable')});
		for (var i = 0; i < leaves.length; i ++) {
			var node = graph.addNode();
			node.stateLabel(leaves[i]);
			var leaf = leaves[i].split(',');
			for (var j = 0; j < leaf.length; j++) {
				var n = referenceGraph.getNodeWithValue(leaf[j]);
				if (n.equals(referenceGraph.initial)) {
					graph.makeInitial(node);
					break;
				}
				else if (n.hasClass('final')) {
					node.addClass('final');
					break;
				}
			}
		}
		var edges = referenceGraph.edges();
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
			if(!minimizedEdges.hasOwnProperty(node1.value())) {
				minimizedEdges[node1.value()] = [];
			}
			var edgesFrom1 = minimizedEdges[node1.value()];
			if (!edgesFrom1.hasOwnProperty(node2.value())) {
				edgesFrom1[node2.value()] = [];
			}
			edgesFrom1[node2.value()] = _.union(edgesFrom1[node2.value()], 
					next.weight().split("<br>"));
		}
		graph.layout();
		
		graph.click(nodeClickHandlers);
		jsav.umsg("Finish the DFA");
		studentGraph = graph;
		return graph;
	};
	
	// handler for the nodes of the original DFA (click to add to the set being worked on)
	var refClickHandlers = function(e) {
		if (selectedNode && $('#editable').hasClass('working')) {
			if (!_.contains(partitions.join().split(','), this.value())) {
				alert('The group being split does not contain ' + this.value());
				return;
			}
			var values = selectedNode.value().split(',');
			if (selectedNode.value() === "") {
				selectedNode.value(this.value());
			} else if (_.contains(values, this.value())) {
				selectedNode.value(_.without(values, this.value()).join());
			} else {
				selectedNode.value(_.union(values, [this.value()]).sort().join());
			}
			bt.layout();
		}
	};

	// handler for the nodes of the tree
	function treeClickHandlers(e) {
		var leaves = getLeaves(bt.root());
		// ignore if not a leaf node
		if (!_.contains(leaves, this.value())) {
			return;
		}
		if (!$('#editable').hasClass('working')) {
			if (selectedNode) {
				selectedNode.unhighlight();
				unhighlightAll(referenceGraph);
			}
			var val = this.value().split(',');
			// highlight the DFA states which are in the selected tree node
			var hNodes = referenceGraph.nodes();
			for (var next = hNodes.next(); next; next = hNodes.next()) {
				if (_.contains(val, next.value())) {
					next.highlight();
				}
			}
			selectedNode = this;
			this.highlight();
		} else {
			if (!_.contains(checkNodeArr, this)) {
				return;
			}
			if (selectedNode) {
				selectedNode.unhighlight();
			}
			selectedNode = this;
			this.highlight();
		}
	};

	// handler for the nodes of the minimized DFA
	var nodeClickHandlers = function(e) {
		if ($(".jsavgraph").hasClass("addEdges")) {
			this.highlight();
			if (!$(".jsavgraph").hasClass("working")) {
				first = this;
				$('.jsavgraph').addClass("working");
				jsav.umsg("Select a state to make a transition to");
   			} else {
   				var input2 = prompt("Accepted character?");
   				var newEdge;
   				// check if valid transition
				if (_.contains(minimizedEdges[first.value()][this.value()], input2)) {
					newEdge = studentGraph.addEdge(first, this, {weight: input2});
					if (!(typeof newEdge === 'undefined')) {
						newEdge.layout();
					}
				} else {
					alert("That transition is incorrect!");
				}
				$('.jsavgraph').removeClass("working");
				first.unhighlight();
				this.unhighlight();
				jsav.umsg("Click a state");
   			}
		}
	};
    //================================
	// DFA editing modes

	var addEdgesMode = function() {
		$(".jsavgraph").addClass("addEdges");
		$("#mode").html('Adding edges');
		jsav.umsg("Click a state");
	};

	// DFA hint functions
	// creates a single remaining transition in the minimized DFA
	var hint = function() {
		for (var i in minimizedEdges) {
			for (var j in minimizedEdges[i]) {
				var n1 = studentGraph.getNodeWithValue(i),
					n2 = studentGraph.getNodeWithValue(j),
					w = minimizedEdges[i][j].join('<br>');
				if (!studentGraph.hasEdge(n1, n2) || !_.contains(studentGraph.getEdge(n1, n2).weight().split(','), w)) {
					var newEdge = studentGraph.addEdge(n1, n2, {weight: w});
					if (newEdge) {
						newEdge.layout();
					}
					return;
				}
			}
		}
	};
	// completes the minimized DFA
	var complete = function() {
		for (var i in minimizedEdges) {
			for (var j in minimizedEdges[i]) {
				var n1 = studentGraph.getNodeWithValue(i),
					n2 = studentGraph.getNodeWithValue(j),
					w = minimizedEdges[i][j].join('<br>');
				var newEdge = studentGraph.addEdge(n1, n2, {weight: w});
				if (newEdge) {
					newEdge.layout();
				}
			}
		}
	};
	// check if the minimized DFA is complete
	var dfaDone = function() {
		var edges = studentGraph.edges(),
			currentCount = 0,
			minimizedCount = 0;
		for (var next = edges.next(); next; next = edges.next()) {
			currentCount += next.weight().split('<br>').length;
		}
		for (var i in minimizedEdges) {
			for (var j in minimizedEdges[i]) {
				minimizedCount += minimizedEdges[i][j].length;
			}
		}
		// if not complete, tell the user how many transitions are left
		if (currentCount !== minimizedCount) {
			alert("" + (minimizedCount - currentCount) + ' transitions remain to be placed.')
		}
		else {
			jsav.umsg("You got it!");
			$('.hide').hide();
			$('#exportbutton').show();
		}
	};

	var exportToFA = function() {
		localStorage['toMinimize'] = true;
		localStorage['minimized'] = serialize(studentGraph);
		window.open('./FAEditor.html');
	}

	// tree editing functions:
	// function to unhighlight all of the nodes of the reference DFA
	var unhighlightAll = function(graph) {
		var nodes = graph.nodes();
		for (var next = nodes.next(); next; next = nodes.next()) {
			next.unhighlight();
		}
	};

	// checks if user's current partitioning is correct
	var checkNodes = function() {
		var checker = [];
		for (var i = 0; i < checkNodeArr.length; i++) {
			checker.push(checkNodeArr[i].value());
		}
		if (_.difference(checker, partitions).length === 0) {
			if (selectedNode) { selectedNode.unhighlight();}
			unhighlightAll(referenceGraph);
			selectedNode = null;
			$('#editable').removeClass("working");
			$('.treework').hide();
			$('.split').show();
			jsav.umsg("The expansion is correct - Split a leaf node");
		} else {
			alert('Those partitions are incorrect');
		}
	};

	// adds another partition (since splitting a node only generates two children)
	var addAnotherChild = function() {
		var par = checkNodeArr[0].parent(),
			i = checkNodeArr.length;
		checkNodeArr.push(par.child(i, "", {edgeLabel: input}).child(i));
		bt.layout();
	};

	// deletes a partition
	var removeTreeNode = function() {
		if (selectedNode) {
			checkNodeArr = _.without(checkNodeArr, selectedNode);
			selectedNode.remove();
			selectedNode = null;
			bt.layout();
		}
	};
	// splits a tree node
	var setTerminal = function() {
		if (!selectedNode) { return;}
		var leaves = getLeaves(bt.root());
		var val = selectedNode.value().split(',');
		
		input = prompt("Set terminal");
		if (input === null) {
			return;
		} else if (!_.contains(alphabet, input)) {
			alert("That terminal is not in the alphabet!");
			return;
		} else {
			var nObj = {};
			var sets = {};
			partitions = [];
			// get next nodes (assumes DFA)
			for (var i = 0 ; i < val.length; i++) {
				var node = referenceGraph.getNodeWithValue(val[i]);
				var next = referenceGraph.transitionFunction(node, input);
				if (!nObj.hasOwnProperty(next[0])) {
					nObj[next[0]] = [];
				}
				nObj[next[0]].push(node.value());
			}
			var nArr = Object.keys(nObj);
			// check undistinguishability
			for (var i = 0; i < leaves.length; i++) {
				var leaf = leaves[i].split(',');
				if (_.difference(nArr, leaf).length === 0) {
					alert(input + " does not distinguish these states");
					return;
				}
			}
			// map leaves to states which transition into that leaf
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
			// partition states on where their transitions take them
			var sArr = Object.keys(sets);
			for (var i = 0; i < sArr.length; i++) {
				var nVal = sets[sArr[i]].sort().join();
				if (nVal) {
					partitions.push(nVal);
				}
			}
			checkNodeArr = [];
			// NOTE: .child returns the parent
			checkNodeArr.push(selectedNode.child(0, "", {edgeLabel: input}).child(0));
			checkNodeArr.push(selectedNode.child(1, "", {edgeLabel: input}).child(1));

			$('#editable').addClass("working");
			$('.treework').show();
			$('.split').hide();
			selectedNode.unhighlight();
			selectedNode = null;
			jsav.umsg('Enter states');
			bt.layout();
			return;
		}
	};
	// Split a node automatically
	// ignores the terminal that the user inputted (should be changed)
	var autoPartition = function() {
		// if the user was making the partitions, delete them
		if ($('#editable').hasClass('working')) {
			selectedNode = checkNodeArr[0].parent();
			for (var i = 0; i < checkNodeArr.length; i++) {
				checkNodeArr[i].remove();
			}
		}
		if (!selectedNode) { return;}
		var leaves = getLeaves(bt.root());
		var val = selectedNode.value().split(',');
		var nObj = {},
			sets = {},
			letter;
		// check all terminals (even if one was inputted by the user)
		for (var k = 0; k < alphabet.length; k++) {
			nObj = {};
			letter = alphabet[k];
			for (var j = 0 ; j < val.length; j++) {
				var node = referenceGraph.getNodeWithValue(val[j]);
				var next = referenceGraph.transitionFunction(node, letter);
				if (!nObj.hasOwnProperty(next[0])) {
					nObj[next[0]] = [];
				}
				nObj[next[0]].push(node.value());
			}
			var nArr = Object.keys(nObj);
			if (!_.find(leaves, function(v){return _.difference(nArr, v.split(',')).length === 0})) {
				break;
			}
			else if (k === alphabet.length - 1) {
				alert('Cannot split this node');
				selectedNode.unhighlight();
				unhighlightAll(referenceGraph);
				selectedNode = null;
				return;
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
		for (var i = 0; i < sArr.length; i++) {
			var nVal = sets[sArr[i]].sort().join();
			if (nVal) {
				selectedNode.addChild(nVal, {edgeLabel: letter});
			}
		}
		selectedNode.unhighlight();
		selectedNode = null;
		unhighlightAll(referenceGraph);
		if ($('#editable').hasClass('working')) {
			$('#editable').removeClass("working");
			$('.treework').hide();
			$('.split').show();
		} 
		jsav.umsg('Split a leaf node');
		bt.layout();
		return;
	};

	$('#edgebutton').click(addEdgesMode);
	$('#donebutton').click(done);
	$('#hintbutton').click(hint);
	$('#completebutton').click(complete);
	$('#checkbutton').click(checkNodes);
	$('#addchildbutton').click(addAnotherChild);
	$('#removetreenodebutton').click(removeTreeNode);
	$('#setterminalbutton').click(setTerminal);
	$('#autobutton').click(autoPartition);
	$('#layoutRef').click(function(){referenceGraph.layout()});
	$('#dfadonebutton').click(dfaDone);
	$('#exportbutton').click(exportToFA);

	var onLoadHandler = function() {
		referenceGraph = initGraph();
		jsav.umsg('Split a leaf node');
		initializeBT();
		referenceGraph.layout();
		referenceGraph.updateAlphabet();
		alphabet = Object.keys(referenceGraph.alphabet).sort();
		$("#alphabet").html("" + alphabet);
		referenceGraph.click(refClickHandlers);
	}

	onLoadHandler();

}(jQuery));
