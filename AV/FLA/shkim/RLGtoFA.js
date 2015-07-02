(function ($) {
	var jsav = new JSAV("av"),
		saved = false,
		//startState,
		selectedNode = null,
		g,
		grammar;

  	var variables = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	//Empty string can be set to anything when initializing the graph:
	//e.g. initGraph({layout: "automatic", emptystring: epsilon})
	//By default it is set to lambda.
	var lambda = String.fromCharCode(955),
		epsilon = String.fromCharCode(949),
		emptystring = lambda;
	/*
	graph:
	initial state is filled green
	current states (during slideshow) are filled blue
	array:
	characters already traversed are highlighted yellow
	if a character is not accepted, it is filled red
	if the inputted string passes, the final character is filled green

	Add lambda transitions by setting weight to empty string.

	The values of the FA nodes should never be changed manually (for now)
	*/

	var initGraph = function(opts) {
		g = jsav.ds.fa($.extend({width: '90%', height: 440}, opts));
		var newStates = _.uniq(_.map(grammar, function(x) { return x[0];}));
		for (var i = 0; i < newStates.length; i++) {
			var n = g.addNode();
			if (i === 0) {
				g.makeInitial(n);
			}
			n.stateLabel(newStates[i]);
		}
		var f = g.addNode();
		f.addClass("final");
		for (var i = 0; i < grammar.length; i++) {
			var p = grammar[i],
				r = p[1],
				fromNode = g.getNodeWithValue("q" + newStates.indexOf(p[0])),
				toVar = "",
				toNode,
				w;
			for (var j = 0; j < r.length; j++) {
				if (variables.indexOf(r[j]) !== -1) {
					toVar = r[j];
					w = r.substring(0, j)
					break;
				}
			}
			if (toVar) {
				toVar = "q" + newStates.indexOf(toVar);
				toNode = g.getNodeWithValue(toVar);
			} else {
				toNode = f;
				w = r;
			}
			g.addEdge(fromNode, toNode, {weight: w});
		}
	   	g.layout();
		addHandlers();
		return g;
	};
	function addHandlers() {
		$(".jsavgraph").click(function(e) {
			if ($(".jsavgraph").hasClass("addNodes")) {
				var newNode = g.addNode(),
				    nodeX = newNode.element.width()/2.0,
					nodeY = newNode.element.height()/2.0;
				$(newNode.element).offset({top: e.pageY - nodeY, left: e.pageX - nodeX});
			} 
			else if ($('.jsavgraph').hasClass('moveNodes') && selectedNode != null) {
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
				jsav.umsg("Click a node");
			}
		});
		//add eventhandlers to nodes
		g.click(function(e) {	
			if ($(".jsavgraph").hasClass("editNodes")) {
				this.highlight();
				var input = prompt("Delete state, make state initial, make state final, or give state a label? d, i, f, or l");
				if (input === null) {
					this.unhighlight();
					return;
				}
				input = input.toUpperCase();
				if (input == 'D') {
					g.removeNode(this);
					updateAlphabet();
				}
				else if (input == 'I') {
					var nodes = g.nodes();
					for (var next = nodes.next(); next; next = nodes.next()) {
						g.removeInitial(next);
					}
					// for (var i = 0; i < g.nodeCount(); i++) {
					// 	g.nodes()[i].removeClass('start');
					// 	g.removeInitial(g.nodes()[i]);
					// }
					g.makeInitial(this);
				} else if (input == 'F') {
					this.toggleClass('final');
				} 
				//adds labels to states
				else if (input == 'L') {
					var input2 = prompt("Label?");
					if (input2 !== null) {
						//this.element.attr('title', input2);
						this.stateLabel(input2);
						this.stateLabelPositionUpdate();
					}
				}
	   			this.unhighlight();
				} else if ($(".jsavgraph").hasClass("addEdges")) {
					this.highlight();
					if (!$(".jsavgraph").hasClass("working")) {
					first = this;
					$('.jsavgraph').addClass("working");
					jsav.umsg("Select a node to make an edge to");
	   			} else {
	   				var input2 = prompt("Accepted character?");
	   				var newEdge;
					// if (input2 === "") {
					// 	newEdge = g.addEdge(first, this, {weight: "\&lambda;"});
					// } else 
					if (input2 != null) {
						newEdge = g.addEdge(first, this, {weight: input2});
					} 
					if (!(typeof newEdge === 'undefined')) {
						newEdge.layout();
					}
					$('.jsavgraph').removeClass("working");
					first.unhighlight();
					this.unhighlight();
					updateAlphabet();
					jsav.umsg("Click a node");
	   			}
				} else if ($('.jsavgraph').hasClass('moveNodes')) {
					this.highlight();
					selectedNode = this;
					jsav.umsg("Click to place node");
					e.stopPropagation();
				}
			});
		//add eventhandlers to edges
		g.click(function(e) {
			if ($('.jsavgraph').hasClass('editNodes')) {
				this.highlight();
				var input = prompt("Delete edge, or change value? d or c");
				if (input === null) {
					this.unhighlight();
					return;
				}
				input = input.toUpperCase();
				if (input == 'D') {
					g.removeEdge(this);
				}
				else if (input == 'C') {
					var input2 = prompt("Accepted character?");
					// if (input2 === "") {
					// 	this.weight("\&lambda;");
					// } else 
					if (input2 != null) {
						this.weight(input2);
					} 
				}
				updateAlphabet();
				this.unhighlight();
			}
		}, {edge: true});
	};
	if (!localStorage['grammar']) {
		window.close();
	}
	grammar = _.map(localStorage['grammar'].split(','), function(x) {return x.split(String.fromCharCode(8594));});
	var g = initGraph({layout: "automatic"});
	//var g = initGraph({layout: "automatic", emptystring: epsilon});
	g.layout();
	jsav.displayInit();
	//===============================
	var updateAlphabet = function() {
		g.updateAlphabet();
		$("#alphabet").html("" + Object.keys(g.alphabet).sort());
	};
	updateAlphabet();

	//================================
	//editing modes

	var addNodesMode = function() {
		$(".jsavgraph").removeClass("addEdges");
		$(".jsavgraph").removeClass("moveNodes");
		$(".jsavgraph").removeClass("editNodes");
		$(".jsavgraph").addClass("addNodes");
		$("#mode").html('Adding nodes');
		jsav.umsg("Click to add nodes");
	};

	var addEdgesMode = function() {
		$(".jsavgraph").removeClass("addNodes");
		$(".jsavgraph").removeClass("moveNodes");
		$(".jsavgraph").removeClass("editNodes");
		$(".jsavgraph").addClass("addEdges");
		$("#mode").html('Adding edges');
		jsav.umsg("Click a node");
	};

	var moveNodesMode = function() {
		$(".jsavgraph").removeClass("addNodes");
		$(".jsavgraph").removeClass("addEdges");
		$(".jsavgraph").removeClass("editNodes");
		$(".jsavgraph").addClass("moveNodes");
		$("#mode").html('Moving nodes');
		jsav.umsg("Click a node");
	};

	var editNodesMode = function() {
		$(".jsavgraph").removeClass("addNodes");
		$(".jsavgraph").removeClass("addEdges");
		$(".jsavgraph").removeClass("moveNodes");
		$(".jsavgraph").addClass("editNodes");
		$("#mode").html('Editing nodes and edges');
		jsav.umsg("Click a node or edge");
	};

	var changeEditingMode = function() {
		$(".jsavgraph").removeClass("addNodes");
		$(".jsavgraph").removeClass("addEdges");
		$(".jsavgraph").removeClass("moveNodes");
		$('.jsavgraph').removeClass('editNodes');
		$("#mode").html('Editing');
		if ($(".notEditing").is(":visible")) {
			$('#changeButton').html('Done editing');
		} else {
			$('#changeButton').html('Edit');
		}
		$('.notEditing').toggle();
		$('.editing').toggle();
	}

	//====================
	//tests

	var testND = function() {
		$('#changeButton').toggleClass("highlightingND");
		if ($('#changeButton').hasClass("highlightingND") || $('#changeButton').hasClass("highlightingL")) {
			$('#changeButton').hide();
		} else{
			$('#changeButton').show();
		}
		var nodes = g.nodes();
		for(var next = nodes.next(); next; next = nodes.next()) {
			var edges = next.getOutgoing();
			if (edges.length === 0) {continue;}
			var weights = _.map(edges, function(e) {return e.weight().split('<br>')});
			for (var i = 0; i < weights.length; i++) {
				var findLambda = _.find(weights[i], function(e) {return e.split(':')[0] === emptystring});
				if (findLambda) { break; }
			}
			var dup = _.map(_.flatten(weights), function(e) {return _.initial(e.split(':')).join()})
			if (findLambda || _.uniq(dup).length < dup.length) {
				next.toggleClass('testingND');
			}
		}
	};
	var testLambda = function() {
		$('#changeButton').toggleClass("highlightingL");
		if ($('#changeButton').hasClass("highlightingND") || $('#changeButton').hasClass("highlightingL")) {
			$('#changeButton').hide();
		} else{
			$('#changeButton').show();
		}
		var edges = g.edges();
		for (var next = edges.next(); next; next = edges.next()) {
			var wSplit = next.weight().split('<br>');
			for (var i = 0; i < wSplit.length; i++) {
				if (_.every(wSplit[i].split(':'), function(x) {return x === emptystring})) {
					next.g.element.toggleClass('testingLambda');
					break;
				}
			}
		}
	};

	//====================
	//temp: TODO

	var play = function() {
		var inputString = prompt("Input string?", "aqvx");
		if (inputString === null) {
			return;
		}
		jsav.umsg("");
		var textArray = [];
		$("button").hide();			//disable buttons
		$('#reset').show();
		$("#mode").html('');
		$('.jsavcontrols').show();
		
		var currentStates = [new Configuration(g.initial, inputString, 0)],
			cur;
		currentStates = addLambdaClosure(currentStates);
		var configView = [];
		for (var j = 0; j < currentStates.length; j++) {
			currentStates[j].state.addClass('current');
	   		configView.push(currentStates[j].toString());
	   	}
		jsav.umsg(configView.join(' | '));
		jsav.displayInit();

		// for (var i = 0; i < inputString.length; i++) {
		// 	console.log(i);
		//    	cur = traverse(currentState, inputString, i);
		//    	if (!cur) {
		//    		jsav.step();
		//    		break;
		//    	} else {
		//    		cur = cur[0];
		//    		i = cur[1];
		//    	}
		//    	currentState.removeClass('current');
		// 	currentState = cur;
		// 	currentState.addClass('current');
		// 	jsav.step();
		// }
		// if (currentState.hasClass('final') && cur != null) {
		// 		jsav.umsg("Accepted");
		// } else {
		// 	jsav.umsg("Rejected");
		// }
		var counter = 0;
		var stringAccepted = false;
		while (true) {
			jsav.step();
			counter++;
			if (counter > 500) {
				break;
			}
			cur = traverse(currentStates);
			if (cur.length === 0) {
				break;
			}
			for (var j = 0; j < currentStates.length; j++) {
		   		currentStates[j].state.removeClass('current');
		   		currentStates[j].state.removeClass('accepted');
		   		currentStates[j].state.removeClass('rejected');
		   	}
			currentStates = cur;
			configView = [];
			for (var j = 0; j < currentStates.length; j++) {
				currentStates[j].state.addClass('current');
				if (currentStates[j].curIndex === inputString.length) {
					if (currentStates[j].state.hasClass('final')) {
						currentStates[j].state.addClass('accepted');
						stringAccepted = true;
					} else {
						currentStates[j].state.addClass('rejected');
					}
				}
		   		configView.push(currentStates[j].toString());
		   	}
		    jsav.umsg(configView.join(' | '));
		    if (stringAccepted) {
		   		break;
		   	}
		}
		//jsav.step();
		// for (var k = 0; k < currentStates.length; k++) {
		// 	if (currentStates[k].state.hasClass('final') && currentStates[k].curIndex === inputString.length) {
		// 		stringAccepted = true;
		// 		currentStates[k].state.addClass('accepted');
		// 	} else {
		// 		currentStates[k].state.addClass('rejected');
		// 	}
		// }
		if (stringAccepted) {
			//jsav.umsg("Accepted");
		} else {
			jsav.umsg("Rejected");
		}
		jsav.recorded();	
	};

	// var traverse = function(currentState, str, pos) {
	// 	var successors = currentState.neighbors();
	// 	for (var next = successors.next(); next; next = successors.next()) {
	// 		var weight = g.getEdge(currentState, next).weight().split('<br>');
	// 		for (var i = 0; i < weight.length; i++) {
	// 			console.log(str.substr(pos, weight[i].length))
	// 			console.log(weight[i])
	// 			if (str.substr(pos, weight[i].length) === weight[i]) {
	// 				return [next, pos - 1 + weight[i].length];
	// 			}
	// 		}
	// 	} 
	// 	return null;
	// };

	var traverse = function(currentStates) {
		var nextStates = [];
		for (var i = 0; i < currentStates.length; i++) {
			var s = currentStates[i].inputString;
			var c = currentStates[i].curIndex;
			var successors = currentStates[i].state.neighbors();
			for (var next = successors.next(); next; next = successors.next()) {
				var weight = g.getEdge(currentStates[i].state, next).weight().split('<br>');
				for (var j = 0; j < weight.length; j++) {
					if (s.substr(c, weight[j].length) === weight[j]) {
						nextStates.push(new Configuration(next, s, c + weight[j].length));
					}
				}
			}
		}
		nextStates = _.uniq(nextStates, function(x) {return x.toString();});
		nextStates = addLambdaClosure(nextStates);
		return nextStates;
	};

	var addLambdaClosure = function(nextStates) {
		lambdaStates = [];
		for (var i = 0; i < nextStates.length; i++) {
			var successors = nextStates[i].state.neighbors();
			for (var next = successors.next(); next; next = successors.next()) {
				var weight = g.getEdge(nextStates[i].state, next).weight().split('<br>');
				for (var j = 0; j < weight.length; j++) {
					if (!next.hasClass('current') && _.every(weight[j].split(':'), function(x) {return x === emptystring})) {
   						next.addClass('current');
   						var nextConfig = new Configuration(next, nextStates[i].inputString, nextStates[i].curIndex);
						lambdaStates.push(nextConfig);
   					}
				}
			}
		}
		if(lambdaStates.length > 0) {
			lambdaStates = addLambdaClosure(lambdaStates);
		}
		for (var k = 0; k < lambdaStates.length; k++) {
			nextStates.push(lambdaStates[k]);
		}
		nextStates = _.uniq(nextStates, function(x) {return x.toString();});
		return nextStates;
	};

	var Configuration = function(state, str, index) {
		this.state = state;
		this.inputString = str;
		this.curIndex = index;
		this.toString = function() {
			return this.state.value() + ' ' + this.inputString.substring(0, index);
		}
	};


  	$('#playbutton').click(play);
	$('#layoutbutton').click(function() {g.layout()});
  	$('#testndbutton').click(testND);
  	$('#testlambdabutton').click(testLambda);
  	//$('#saveButton').click(save);
  	$('#addnodesbutton').click(addNodesMode);
	$('#changeButton').click(changeEditingMode);
	$('#addedgesbutton').click(addEdgesMode);
	$('#movenodesbutton').click(moveNodesMode);
	$('#editnodesbutton').click(editNodesMode);
}(jQuery));	