(function ($) {	
	var settings = new JSAV.utils.Settings($('.jsavsettings'));
	    // settings.add("speed", {"type": "range",
	//                  "value": "10",
	//                  "min": 1,
	//                  "max": 10,
	//                  "step": 1});
	var jsav = new JSAV("av", {"settings": settings}),
		input,
		selectedNode = null,
		expanded,
		g1,		//reference (original NFA)
		g,		//working conversion
		alphabet;

	var lambda = String.fromCharCode(955),
		epsilon = String.fromCharCode(949);

	function initGraph() {
		//bug(?): it looks like using the 'element' option when initializing a graph rewrites its default value
		var graph = jsav.ds.fa($.extend({width: '45%', height: 440, layout: 'automatic', element: $('#reference')}));
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

	function initialize() {
		if (g) {
			//g.clear();		this doesn't seem to work
			$('#editable').empty();
		}
		jsav.umsg("Choose a state to expand:");
		g = jsav.ds.fa($.extend({width: '45%', height: 440, element: $('#editable')}));
		var a = g.addNode();
		a.stateLabel(lambdaClosure([g1.initial.value()], g1).sort().join());
		a.stateLabelPositionUpdate();
		g.makeInitial(a);

		$("#editable").click(graphClickHandlers);
		g.click(nodeClickHandlers);
		return g;
	};

	function modelAnswer(modeljsav) {
		// manual creation of the default DFA:

		// var graph = modeljsav.ds.fa($.extend({width: '90%', height: 440, layout: 'automatic', element: $('.jsavmodelanswer .jsavcanvas')}));
		// var a = graph.addNode(),
		// 	b = graph.addNode(),
		// 	c = graph.addNode(),
		// 	d = graph.addNode(),
		// 	e = graph.addNode();
		// graph.makeInitial(a);
		// c.addClass('final');
		// d.addClass('final');
		// a.stateLabel("q0");
		// b.stateLabel("q0,q1");
		// c.stateLabel("q1,q2");
		// d.stateLabel("q2,q3");
		// e.stateLabel("q1");
		// a.stateLabelPositionUpdate();
		// b.stateLabelPositionUpdate();
		// c.stateLabelPositionUpdate();
		// d.stateLabelPositionUpdate();
		// e.stateLabelPositionUpdate();

		// graph.addEdge(a, b, {weight: "a"});
		// graph.addEdge(b, b, {weight: "a"});
		// graph.addEdge(b, c, {weight: "b"});
		// graph.addEdge(c, c, {weight: "b"});
		// graph.addEdge(c, d, {weight: "a"});
		// graph.addEdge(d, d, {weight: "a"});
		// graph.addEdge(d, e, {weight: "b"});
		// graph.addEdge(e, c, {weight: "b"});

		var graph = convertToDFA(modeljsav, g1, $.extend({width: '90%', height: 440, layout: 'automatic', element: $('.jsavmodelanswer .jsavcanvas')}))

		graph.layout();
		if (graph.equals(g)) {
			jsav.umsg("YOU GOT IT");
		}
		modeljsav.displayInit();
		modeljsav.recorded();
		return graph;
	};


	var graphClickHandlers = function(e) {
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
				var input2 = prompt("Which group of NFA states will that go to on " + input + "?");
				// input2 processing
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
				var newNode = g.addNode(),
				    nodeX = newNode.element.width()/2.0,
					nodeY = newNode.element.height()/2.0;
				$(newNode.element).offset({top: e.pageY - nodeY, left: e.pageX - nodeX});
				var check = expanded.split(',');
				for (var i = 0; i< check.length; i++) {
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

	var nodeClickHandlers = function(e) {	
		this.highlight();
		if ($('.jsavgraph').hasClass('moveNodes')) {
				selectedNode = this;
				jsav.umsg("Click to place state");
				e.stopPropagation();
			} 
			else if ($(".jsavgraph").hasClass("removeNodes")) {
				if (!this.equals(g.initial)) {		//dont remove if its an initial state
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
				} else{
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
			        // else if (node === this.stateLabel()) {
			        // 	var newEdge = g.addEdge(this, this, {weight: input})
			        // 	if (newEdge) {newEdge.layout();}
			        // 	this.unhighlight();
			        // 	return;
			        // }
			        expanded = node;
			        $('.editButton').hide();
			        $('.jsavgraph').addClass("working");
					jsav.umsg("Click to place new state");
					e.stopPropagation();
				}
				
				} else {
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

	var moveNodesMode = function() {
		$(".jsavgraph").removeClass("removeNodes");
		$(".jsavgraph").addClass("moveNodes");
		$("#mode").html('Moving states');
		jsav.umsg("Click a state");
		$('#conversionButton').show();
	};

	var removeNodesMode = function() {
		$(".jsavgraph").removeClass("moveNodes");
		$(".jsavgraph").addClass("removeNodes");
		$("#mode").html('Removing states');
		jsav.umsg("Click a state");
		$('#conversionButton').show();
	};

	var conversionMode = function() {
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