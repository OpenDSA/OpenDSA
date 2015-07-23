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
		g1,							// reference (original DFA); assumes its a DFA
		g,							// working conversion
		bt,							// tree
		alphabet,
		partitions = [],			// user created partitions
		checkNodeArr = [],			// correct partitions
		minimizedEdges = {};		// adjlist of minimized DFA
	
	var lambda = String.fromCharCode(955),
		epsilon = String.fromCharCode(949);
	// initialize reference/original DFA
	function initGraph() {
		if (localStorage['minimizeDFA'] === "true") {
			localStorage['minimizeDFA'] = false;
			var data = localStorage['toMinimize'];
			return deserialize(data);
		}
		var graph = jsav.ds.fa({width: '45%', height: 440, layout: 'manual', element: $('#reference')});
		var gWidth = graph.element.width();
		var a = graph.addNode({left: 0.05*gWidth, top: 50}),		
      		b = graph.addNode({left: 0.2*gWidth, top: 300}),
      		c = graph.addNode({left: 0.2*gWidth, top: 10}),
      		d = graph.addNode({left: 0.85*gWidth, top: 30}),
      		e = graph.addNode({left: 0.25*gWidth, top: 200}),
      		f = graph.addNode({left: 0.1*gWidth, top: 370}),
      		h = graph.addNode({left: 0.55*gWidth, top: 300}),
      		i = graph.addNode({left: 0.55*gWidth, top: 100}),
      		j = graph.addNode({left: 0.85*gWidth, top: 350});

      	graph.makeInitial(a);
      	d.addClass("final");
      	h.addClass('final');
      	j.addClass('final');

	    graph.addEdge(a, f, {weight: 'a'});
	    graph.addEdge(a, c, {weight: 'b'});
	    graph.addEdge(b, e, {weight: 'a'});
	    graph.addEdge(b, a, {weight: 'b'});
	    graph.addEdge(c, d, {weight: 'a'});
	    graph.addEdge(c, e, {weight: 'b'});
	    graph.addEdge(d, i, {weight: 'b'});
	    graph.addEdge(d, j, {weight: 'a'});
	    graph.addEdge(e, a, {weight: 'b'});
	    graph.addEdge(e, i, {weight: 'a'});
	    graph.addEdge(f, b, {weight: 'b'});
	    graph.addEdge(f, j, {weight: 'a'});
	    graph.addEdge(h, h, {weight: 'a'});
	    graph.addEdge(h, b, {weight: 'b'});
	    graph.addEdge(i, a, {weight: 'b'});
	    graph.addEdge(i, e, {weight: 'a'});
	    graph.addEdge(j, h, {weight: 'a'});
	    graph.addEdge(j, i, {weight: 'b'});
		graph.layout();
		a.stateLabelPositionUpdate();
		graph.updateAlphabet();
		alphabet = Object.keys(graph.alphabet).sort();
		$("#alphabet").html("" + alphabet);

		graph.click(refClickHandlers);
		return graph;
	};

	function deserialize (data) {
		var gg = jQuery.parseJSON(data);
		var graph = jsav.ds.fa({width: '45%', height: 440, layout: 'manual', element: $('#reference')});
		for (var i = 0; i < gg.nodes.length; i++) {
	    	var node = graph.addNode('q' + i),
	    		offset = $('.jsavgraph').offset(),
	    		offset2 = parseInt($('.jsavgraph').css('border-width'), 10);
	    	$(node.element).offset({top : parseInt(gg.nodes[i].top) + offset.top + offset2, left: (parseInt(gg.nodes[i].left) / 2) + offset.left + offset2});
	    	if (gg.nodes[i].i) {
	    		graph.makeInitial(node);
	    	}
	    	if (gg.nodes[i].f) {
	    		node.addClass("final");
	   		}
	   		node.stateLabel(gg.nodes[i].stateLabel);
	   		node.stateLabelPositionUpdate();
	  	}
	  	for (var i = 0; i < gg.edges.length; i++) {
	   		if (gg.edges[i].weight !== undefined) {
	   			var w = delambdafy(gg.edges[i].weight);
	   			var edge = graph.addEdge(graph.nodes()[gg.edges[i].start], graph.nodes()[gg.edges[i].end], {weight: w});
       		}
	   		else {
	   			var edge = graph.addEdge(graph.nodes()[gg.edges[i].start], graph.nodes()[gg.edges[i].end]);
	   		}
	   		edge.layout();
	   	}
	   	graph.layout();
		graph.updateAlphabet();
		alphabet = Object.keys(graph.alphabet).sort();
		$("#alphabet").html("" + alphabet);
	   	return graph;
	};

	// initialize tree of undistinguishable states
	function initialize() {
		if (bt) {
			//g.clear();
			$('#editable').empty();
		}
		bt = jsav.ds.tree();
		var val = [],
			finals = [],
			nonfinals = [];
		// ignore unreachable states
		var reachable = [g1.initial];
		dfs(reachable, g1.initial);
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
		return bt;
	};
	// check if tree is complete
	function done() {
		if (selectedNode) {
			selectedNode.unhighlight();
			selectedNode = null;
		}
		unhighlightAll(g1);
		var leaves = getLeaves(bt.root());
		for (var i = 0; i < leaves.length; i++) {
			var leaf = leaves[i].split(',');
			for (var k = 0; k < alphabet.length; k++) {
				var dArr = [],
					letter = alphabet[k];
				for (var j = 0 ; j < leaf.length; j++) {
					var node = g1.getNodeWithValue(leaf[j]);
					var next = g1.transitionFunction(node, letter);
					
					dArr.push(next[0]);
				}
				if (!_.find(leaves, function(v){return _.difference(dArr, v.split(',')).length === 0})) {
					jsav.umsg("There are distinguishable states remaining");
					return;
				}
			}
		}
		// if complete create minimized DFA
		$('.split').hide();
		$('#autobutton').hide();
		$('.hide').show();
		$('#editable').empty();
		var graph = jsav.ds.fa({width: '45%', height: 440, layout: 'automatic', element: $('#editable')});
		for (var i = 0; i < leaves.length; i ++) {
			var node = graph.addNode();
			node.stateLabel(leaves[i]);
			var leaf = leaves[i].split(',');
			for (var j = 0; j < leaf.length; j++) {
				var n = g1.getNodeWithValue(leaf[j]);
				if (n.equals(g1.initial)) {
					graph.makeInitial(node);
					break;
				}
				else if (n.hasClass('final')) {
					node.addClass('final');
					break;
				}
			}
		}
		var edges = g1.edges();
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
			minimizedEdges[node1.value()] = _.union(minimizedEdges[node1.value()], 
					[""+node2.value()+','+next.weight()]);
		}
		graph.layout();
		
		$("#editable").click(graphClickHandlers);
		graph.click(nodeClickHandlers);
		jsav.umsg("Finish the DFA");
		g = graph;
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
	var treeClickHandlers = function(e) {
		var leaves = getLeaves(bt.root());
		// ignore if not a leaf node
		if (!_.contains(leaves, this.value())) {
			return;
		}
		if (!$('#editable').hasClass('working')) {
			if (selectedNode) {
				selectedNode.unhighlight();
				unhighlightAll(g1);
			}
			var val = this.value().split(',');
			// highlight the DFA states which are in the selected tree node
			var hNodes = g1.nodes();
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
	// handler for the minimized DFA window
	var graphClickHandlers = function(e) {
		if ($('.jsavgraph').hasClass('moveNodes') && selectedNode) {
			var nodeX = selectedNode.element.width()/2.0,
				nodeY = selectedNode.element.height()/2.0,
				edges = g.edges();
			$(selectedNode.element).offset({top: e.pageY - nodeY, left: e.pageX - nodeX});
			selectedNode.stateLabelPositionUpdate();
			for (var next = edges.next(); next; next = edges.next()) {
				if (next.start().equals(selectedNode) || next.end().equals(selectedNode)) {
					next.layout();
				}
			}
			selectedNode.unhighlight();
			selectedNode = null;
			e.stopPropagation();
			jsav.umsg("Click a state");
		} 
	};
	// handler for the nodes of the minimized DFA
	var nodeClickHandlers = function(e) {
		if ($('.jsavgraph').hasClass('moveNodes')) {
			if (selectedNode) {
				selectedNode.unhighlight();
			}
			this.highlight();
			selectedNode = this;
			jsav.umsg("Click to place state");
			e.stopPropagation();
		} else if ($(".jsavgraph").hasClass("addEdges")) {
			this.highlight();
			if (!$(".jsavgraph").hasClass("working")) {
				first = this;
				$('.jsavgraph').addClass("working");
				jsav.umsg("Select a state to make a transition to");
   			} else {
   				var input2 = prompt("Accepted character?");
   				var newEdge;
   				// check if valid transition
				if (_.contains(minimizedEdges[first.value()], "" + this.value() +','+ input2)) {
					newEdge = g.addEdge(first, this, {weight: input2});
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
	jsav.umsg('Split a leaf node');
    g1 = initGraph();
    bt = initialize();

    //================================
	// DFA editing modes

	var moveNodesMode = function() {
		$(".jsavgraph").removeClass("addEdges");
		$(".jsavgraph").addClass("moveNodes");
		$("#mode").html('Moving states');
		jsav.umsg("Click a state");
	};
	var addEdgesMode = function() {
		$(".jsavgraph").removeClass("moveNodes");
		$(".jsavgraph").addClass("addEdges");
		$("#mode").html('Adding edges');
		jsav.umsg("Click a state");
	};

	// DFA hint functions
	// creates a single remaining transition in the minimized DFA
	var hint = function() {
		for (var i in minimizedEdges) {
			for (var j = 0; j < minimizedEdges[i].length; j++) {
				var n1 = g.getNodeWithValue(i),
					n2 = g.getNodeWithValue(minimizedEdges[i][j].split(',')[0]),
					w = minimizedEdges[i][j].split(',')[1];
				if (!g.hasEdge(n1, n2) || !_.contains(g.getEdge(n1, n2).weight().split(','), w)) {
					var newEdge = g.addEdge(n1, n2, {weight: w});
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
			for (var j = 0; j < minimizedEdges[i].length; j++) {
				var n1 = g.getNodeWithValue(i),
					n2 = g.getNodeWithValue(minimizedEdges[i][j].split(',')[0]),
					w = minimizedEdges[i][j].split(',')[1];
				var newEdge = g.addEdge(n1, n2, {weight: w});
				if (newEdge) {
					newEdge.layout();
				}
			}
		}
	};
	// check if the minimized DFA is complete
	var dfaDone = function() {
		var edges = g.edges(),
			currentCount = 0,
			minimizedCount = 0;
		for (var next = edges.next(); next; next = edges.next()) {
			currentCount += next.weight().split('<br>').length;
		}
		for (var i in minimizedEdges) {
			minimizedCount += minimizedEdges[i].length;
		}
		// if not complete, tell the user how many transitions are left
		if (currentCount !== minimizedCount) {
			alert("" + (minimizedCount - currentCount) + ' transitions remain to be placed.')
		}
		else {
			jsav.umsg("You got it!");
			alert("Congratulations!");
			localStorage['toMinimize'] = true;
			localStorage['minimized'] = serialize(g);
			window.open('../martin tamayo/Finite Accepter/FAEditor.html');
		}
	};

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
		//console.log(checkNodeArr);
		for (var i = 0; i < checkNodeArr.length; i++) {
			checker.push(checkNodeArr[i].value());
		}
		if (_.difference(checker, partitions).length === 0) {
			if (selectedNode) { selectedNode.unhighlight();}
			unhighlightAll(g1);
			selectedNode = null;
			$('#editable').removeClass("working");
			$('.treework').hide();
			$('.split').show();
			jsav.umsg("The expansion is correct - Split a leaf node");
		} else {
			//console.log(checker);
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
			//console.log(checkNodeArr);
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
				var node = g1.getNodeWithValue(val[i]);
				var next = g1.transitionFunction(node, input);
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
				var node = g1.getNodeWithValue(val[j]);
				var next = g1.transitionFunction(node, letter);
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
				unhighlightAll(g1);
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
		unhighlightAll(g1);
		if ($('#editable').hasClass('working')) {
			$('#editable').removeClass("working");
			$('.treework').hide();
			$('.split').show();
		} 
		jsav.umsg('Split a leaf node');
		bt.layout();
		return;
	};

	$('#movebutton').click(moveNodesMode);
	$('#edgebutton').click(addEdgesMode);
	$('#donebutton').click(done);
	$('#hintbutton').click(hint);
	$('#completebutton').click(complete);
	$('#checkbutton').click(checkNodes);
	$('#addchildbutton').click(addAnotherChild);
	$('#removetreenodebutton').click(removeTreeNode);
	$('#setterminalbutton').click(setTerminal);
	$('#autobutton').click(autoPartition);
	$('#layoutRef').click(function(){g1.layout()});
	$('#dfadonebutton').click(dfaDone);
}(jQuery));