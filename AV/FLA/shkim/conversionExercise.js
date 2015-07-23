(function ($) {	
	localStorage["jsav-speed"] = 0; // set default animation speed to max
	var jsav = new JSAV("av"),
		input,						// terminal to expand on
		selectedNode = null,
		expanded,					// string containing the names of the next states
		g1,							// reference (original NFA)
		g,							// working conversion
		alphabet;

	var lambda = String.fromCharCode(955),
		epsilon = String.fromCharCode(949);

	// initializes the reference/original NFA
	function initGraph () {
		if (localStorage['convertNFA'] === "true") {
			localStorage['convertNFA'] = false;
			var data = localStorage['toConvert'];
			return deserialize(data);
		}
		var graph = jsav.ds.fa({width: '45%', height: 440, layout: 'automatic', element: $('#reference')});
		var a = graph.addNode(),		
	  		b = graph.addNode(),
	  		c = graph.addNode(),
	  		d = graph.addNode();
	  	graph.makeInitial(a);
	  	c.addClass("final");
	  	d.addClass('final');

	    graph.addEdge(a, a, {weight: 'a'});
	    graph.addEdge(a, b, {weight: 'a'});
	    graph.addEdge(b, b, {weight: 'b'});
	    graph.addEdge(b, c, {weight: 'b'});
	    graph.addEdge(c, d, {weight: 'a'});
	    graph.addEdge(d, b, {weight: 'b'});
	    graph.addEdge(d, c, {weight: ''});	//lambda
		graph.layout();
		graph.updateAlphabet();
		alphabet = Object.keys(graph.alphabet).sort();
		$("#alphabet").html("" + alphabet);
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

	// initializes the DFA to be created by the user
	function initialize () {
		if (g) {
			//g.clear();
			$('#editable').empty();
		}
		jsav.umsg("Choose a state to expand:");
		g = jsav.ds.fa({width: '45%', height: 440, element: $('#editable')});
		var a = g.addNode();
		a.stateLabel(lambdaClosure([g1.initial.value()], g1).sort().join());
		a.stateLabelPositionUpdate();
		g.makeInitial(a);

		$("#editable").click(graphClickHandlers);
		g.click(nodeClickHandlers);
		return g;
	};
	// shows the answer and checks the user's DFA (buggy)
	function modelAnswer (modeljsav) {
		// bug: all of the edges seem to be shifted a screen to the right
		var graph = convertToDFA(modeljsav, g1, {width: '90%', height: 440, layout: 'automatic', element: $('.jsavmodelanswer .jsavcanvas')});
		graph.layout();
		// temp (should check FA equivalence)
		if (graph.equals(g)) {
			jsav.umsg("You got it!");
			alert("Congratulations!");
			localStorage['toConvert'] = true;
			localStorage['converted'] = serialize(g);
			window.open('../martin tamayo/Finite Accepter/FAEditor.html');
		}
		modeljsav.displayInit();
		modeljsav.recorded();
		return graph;
	};
	// handler for the graph window
	var graphClickHandlers = function (e) {
		// place selected node
		if ($('.jsavgraph').hasClass('moveNodes') && selectedNode != null) {
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
		else { 
			if ($(".jsavgraph").hasClass("working")) {
				// user is allowed to omit 'q' and separate state names with empty space or commas
				var input2 = prompt("Which group of NFA states will that go to on " + input + "?");
				if (!input2) {
					return;
				}
				var inputArr = input2.trim().split(/\s*[,\s]\s*/);
				for (var i = 0; i < inputArr.length; i++) {
					if (inputArr[i].indexOf("q") === -1) {
						inputArr[i] = 'q' + inputArr[i];
					} 
				}
				input2 = inputArr.sort().join();
				if (input2 !== expanded) {
					alert("That's incorrect");
					$('.editButton').show();
					$('.jsavgraph').removeClass("working");
					selectedNode.unhighlight();
					jsav.umsg("Choose a state to expand:");
					return;
				}
				// create the new state
				var newNode = g.addNode(),
				    nodeX = newNode.element.width()/2.0,
					nodeY = newNode.element.height()/2.0;
				$(newNode.element).offset({top: e.pageY - nodeY, left: e.pageX - nodeX});
				var check = expanded.split(',');
				// make the new state final if any of the original states were final
				for (var i = 0; i < check.length; i++) {
					if (g1.getNodeWithValue(check[i]).hasClass('final')) {
						newNode.addClass('final');
						break;
					}
				}
				newNode.stateLabel(expanded);
				newNode.stateLabelPositionUpdate();
				var newEdge = g.addEdge(selectedNode, newNode, {weight: input})
				if(newEdge) {newEdge.layout();}
				$('.editButton').show();
				$('.jsavgraph').removeClass("working");
				selectedNode.unhighlight();
				newNode.unhighlight();
				jsav.umsg("Choose a state to expand:");
			} 
		}
	};
	// handler for the nodes of the DFA
	var nodeClickHandlers = function (e) {	
		this.highlight();
		if ($('.jsavgraph').hasClass('moveNodes')) {
			selectedNode = this;
			jsav.umsg("Click to place state");
			e.stopPropagation();
		} 
		// allow user to remove nodes since there is no check to see if a new node already exists
		else if ($(".jsavgraph").hasClass("removeNodes")) {
			if (!this.equals(g.initial)) {		//dont remove if it's an initial state
				g.removeNode(this);
			}
			this.unhighlight();
		}
		else {
			if (!$(".jsavgraph").hasClass("working")) {
				selectedNode = this;
				input = prompt("Expand on what terminal?");
				if (input === null) {
					this.unhighlight();
					return;
				} else if (!_.contains(alphabet, input)) {
					alert("That terminal is not in the alphabet!");
					this.unhighlight();
					return;
				} else {
					var next = [],
						valArr = this.stateLabel().split(','),
						finality = false;
			        for (var j = 0; j < valArr.length; j++) {
			          	next = _.union(next, lambdaClosure(g1.transitionFunction(g1.getNodeWithValue(valArr[j]), 
			          		input), g1));
			        }
			        var node = next.sort().join();
			        if (!node) {
			        	alert("There are no paths on that terminal!");
			        	this.unhighlight();
			        	return;
			        } 
			        expanded = node;
			        $('.editButton').hide();
			        $('.jsavgraph').addClass("working");
					jsav.umsg("Click to place new state");
					e.stopPropagation();
				}	
			} else {
				// add transition if this is the toNode
				if (this.stateLabel() === expanded) {
					var newEdge = g.addEdge(selectedNode, this, {weight: input});
					if (newEdge) { newEdge.layout();}
				}
				$('.editButton').show();
				$('.jsavgraph').removeClass("working");
				selectedNode.unhighlight();
				this.unhighlight();
				jsav.umsg("Choose a state to expand:");
				e.stopPropagation();
			}
		}
	};
	g1 = initGraph();
	var exercise = jsav.exercise(modelAnswer, initialize, {compare: {class: "final"}});
	exercise.reset();

	//================================
	//editing modes

	var moveNodesMode = function () {
		$(".jsavgraph").removeClass("removeNodes");
		$(".jsavgraph").addClass("moveNodes");
		$("#mode").html('Moving states');
		jsav.umsg("Click a state");
		$('#conversionButton').show();
	};
	var removeNodesMode = function () {
		$(".jsavgraph").removeClass("moveNodes");
		$(".jsavgraph").addClass("removeNodes");
		$("#mode").html('Removing states');
		jsav.umsg("Click a state");
		$('#conversionButton').show();
	};
	var conversionMode = function () {
		$(".jsavgraph").removeClass("moveNodes");
		$('.jsavgraph').removeClass("removeNodes");
		$("#mode").html('');
		jsav.umsg("Choose a state to expand");
		$('#conversionButton').hide();
	};

  	$('#conversionButton').click(conversionMode);
  	$('#movenodesbutton').click(moveNodesMode);
  	$('#removenodesbutton').click(removeNodesMode);
}(jQuery));