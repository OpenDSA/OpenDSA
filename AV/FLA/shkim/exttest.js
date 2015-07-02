"use strict";
/*global alert: true, ODSA */

(function ($) {
	ODSA.SETTINGS.MODULE_ORIGIN = '*';
	var jsav = new JSAV("av"),
		saved = false,
		//startState,
		selectedNode = null,
		arr,
		g;
	//Empty string can be set to anything when initializing the graph:
	//e.g. initGraph({layout: "automatic", emptystring: epsilon})
	//By default it is set to lambda.
	var lambda = String.fromCharCode(955),
		epsilon = String.fromCharCode(949),
		emptystring = lambda;
	/*
	Add lambda transitions by setting weight to empty string.
	*/

	var initGraph = function(opts) {
		if (!saved) {
			g = jsav.ds.fa($.extend({width: '90%', height: 440}, opts));
			emptystring = g.emptystring;
	  		var a = g.addNode(),		
	      		b = g.addNode(),
	      		c = g.addNode(),
	      		d = g.addNode(),
	      		e = g.addNode();
	      	g.makeInitial(b);
	      	e.addClass('final');
	
		    g.addEdge(a, d, {weight: ''});
		    g.addEdge(a, e, {weight: ''});

		    g.addEdge(b, a, {weight: 'b'});
		    g.addEdge(b, a, {weight: 'a'});
		    g.addEdge(b, c, {weight: 'a'});

		    g.addEdge(c, e, {weight: 'x'});

		    g.addEdge(d, c, {weight: 'qv'});
			g.addEdge(d, e, {weight: 'y'});	
		
			addHandlers();
		}
		else {
				var ggg = localStorage['graph'],
				gg = jQuery.parseJSON(ggg),
			//BUG: if height is set to a %, loading a graph causes the height of the jsavgraph element to increase by a few pixels every time
				graph = jsav.ds.fa($.extend({width: '90%', height: 440}, opts));
			for (var i = 0; i < gg.nodes.length; i++) {
				//the 'left' and 'top' options arent working for some reason
	    		//var node = graph.addNode("q" + i, {'left': parseInt(gg.nodes[i].left), 'top': parseInt(gg.nodes[i].top)});
	    		var node = graph.addNode('q' + i),
	    			offset = $('.jsavgraph').offset(),
	    			offset2 = parseInt($('.jsavgraph').css('border-width'), 10);
	    		$(node.element).offset({top : parseInt(gg.nodes[i].top) + offset.top + offset2, left: parseInt(gg.nodes[i].left) + offset.left + offset2});
	    		if (gg.nodes[i].i) {
	    			graph.makeInitial(node);
	    		}
	    		if (gg.nodes[i].f) {
	    			node.addClass("final");
	    		}
	  		}
	  		for (var i = 0; i < gg.edges.length; i++) {
	    		if (gg.edges[i].weight !== undefined) {
	      			var edge = graph.addEdge(graph.nodes()[gg.edges[i].start], graph.nodes()[gg.edges[i].end], {weight: (gg.edges[i].weight)});
	    		}
	    		else {
	      			var edge = graph.addEdge(graph.nodes()[gg.edges[i].start], graph.nodes()[gg.edges[i].end]);
	    		}
	    		edge.layout();
	    	}
	    	g = graph;
	    	addHandlers();
		}
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
					g.makeInitial(this);
				} else if (input == 'F') {
					this.toggleClass('final');
				} 
				//adds labels to states
				else if (input == 'L') {
					var input2 = prompt("Label?");
					if (input2 !== null) {
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
					if (input2 != null) {
						this.weight(input2);
					} 
				}
				updateAlphabet();
				this.unhighlight();
			}
		}, {edge: true});
	};

	//localStorage.clear();
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

	// var testND = function() {
	// 	$('#changeButton').toggleClass("highlightingND");
	// 	if ($('#changeButton').hasClass("highlightingND") || $('#changeButton').hasClass("highlightingL")) {
	// 		$('#changeButton').hide();
	// 	} else{
	// 		$('#changeButton').show();
	// 	}
	// 	var nodes = g.nodes();
	// 	for(var next = nodes.next(); next; next = nodes.next()) {
	// 		var edges = next.getOutgoing();
	// 		var weights = _.map(edges, function(e) {return e.weight()});
	// 		if (_.contains(weights, g.emptystring) || _.uniq(weights).length < weights.length) {
	// 			next.toggleClass("testingND");
	// 		}
	// 	}
	// };

	// var testLambda = function() {
	// 	$('#changeButton').toggleClass("highlightingL");
	// 	if ($('#changeButton').hasClass("highlightingND") || $('#changeButton').hasClass("highlightingL")) {
	// 		$('#changeButton').hide();
	// 	} else{
	// 		$('#changeButton').show();
	// 	}
	// 	var edges = g.edges();
	// 	for (var next = edges.next(); next; next = edges.next()) {
	// 		if (next.weight().indexOf(g.emptystring) !== -1) {
	// 			next.g.element.toggleClass('testingLambda');
	// 		}
	// 	}
	// };

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
	//temp:
	//DFA ONLY

	var play = function() {
		var inputString = prompt("Input string?", "aba");
		if (inputString === null) {
			return;
		}
		jsav.umsg("");
		var textArray = [];
		$("button").hide();			//disable buttons
		$('#reset').show();
		$("#mode").html('');
		if (arr) {
			arr.clear();
		}
		$('.jsavcontrols').show();
		

		var currentState = g.initial,
			cur;
		currentState.addClass('current');
		for (var i = 0; i < inputString.length; i++) {
			textArray.push(inputString[i]);
			}
			arr = jsav.ds.array(textArray, {element: $('.arrayPlace')});

			jsav.displayInit();

		for (var i = 0; i < inputString.length; i++) {
		   	cur = traverse(currentState, inputString[i]);
		   	if (cur == null) {
		   		arr.css(i, {"background-color": "red"});
		   		jsav.step();
		   		break;
		   	}
		   	currentState.removeClass('current');
			currentState = cur;
			currentState.addClass('current');
			arr.css(i, {"background-color": "yellow"});
			jsav.step();
		}
		if (currentState.hasClass('final') && cur != null) {
				arr.css(inputString.length - 1, {"background-color": "green"});
				jsav.umsg("Accepted");
		} else {
			arr.css(inputString.length - 1, {"background-color": "red"});
			jsav.umsg("Rejected");
		}
		jsav.step();
		jsav.recorded();	
	};
	var traverse = function(currentState, letter) {
		var successors = currentState.neighbors();
		for (var next = successors.next(); next; next = successors.next()) {
			var weight = g.getEdge(currentState, next).weight().split('<br>');
			for (var i = 0; i < weight.length; i++) {
				if (letter == weight[i]) {
					return next;
				}
			}
		} 
		return null;
	};

	//======================
	var save = function () {
		localStorage['graph'] = serialize(g);	//I changed serializableGraph.js
		jsav.umsg("Saved");
		saved = true;
	};

	// var save = function () {
	// 	localStorage['graph'] = serialize(g);	//I changed serializableGraph.js
	// 	//saved = true;
	// 	var downloadData = "text/json;charset=utf-8," + encodeURIComponent(localStorage['graph']);
	// 	$('#download').html('<a href="data:' + downloadData + '" download="data.json">download JSON</a>');
	// 	//$('<a href="data:' + downloadData + '" download="data.json">download JSON</a>').trigger('click');
	// 	jsav.umsg("Saved");
	// };
	// var load = function () {
	// 	if (saved) {
	// 		//g.hide();		//g.clear() didn't seem to do anything
	// 						//would like a reset button - should look at openDSA reset
	// 		$('.jsavgraph').remove(); 
	// 		g = initGraph({layout: "automatic"});
	// 		jsav.displayInit();
	// 		jsav.umsg("Loaded");
	// 		updateAlphabet();
	// 	} else{
	// 		jsav.umsg("There is nothing to load");
	// 	}
	// };
	// var setSaved = function () {
	// 	saved = true;
	// };

	var convertToGrammar = function () {
		var variables = "SABCDEFGHIJKLMNOPQRTUVWXYZ";
		var s = g.initial;
		var newVariables = [s];
		var nodes = g.nodes();
		var arrow = String.fromCharCode(8594);
		var converted = [];
		if (g.nodeCount() > 26) {
			alert('The FA must have at most 26 states to convert it into a grammar!');
			return;
		}
		for (var next = nodes.next(); next; next = nodes.next()) {
			if (!next.equals(s)) {
				newVariables.push(next);
			}
		}
		var finals = [];
		for (var i = 0; i < newVariables.length; i++) {
			var edges = newVariables[i].getOutgoing();
			for (var j = 0; j < edges.length; j++) {
				var toVar = variables[newVariables.indexOf(edges[j].end())];
				var weight = edges[j].weight().split("<br>");
				for (var k = 0; k < weight.length; k++) {
					var terminal = weight[k];
					if (weight[k] === emptystring) {
						terminal = "";
					}
					converted.push(variables[i] + arrow + terminal + toVar);
				}
			}
			if (newVariables[i].hasClass('final')) {
				finals.push(variables[i] + arrow + emptystring);
			}
		}
		converted = converted.concat(finals);
		localStorage['grammar'] = converted;
		window.open("grammarTest.html", "_self");
	};


  	$('#reset').click(function() {
  		save();
  		ODSA.AV.reset();
  		if (jsav) {
  			jsav.clear();
  		}
  		jsav = new JSAV($('.avcontainer'));
  		$("button").show();
  		var g = initGraph({layout: "automatic"});
		g.layout();
		jsav.displayInit();
		updateAlphabet();
  	});
  	$('#playbutton').click(play);
	$('#layoutbutton').click(function() {g.layout()});
  	$('#testndbutton').click(testND);
  	$('#testlambdabutton').click(testLambda);
  	$('#saveButton').click(save);
  	$('#addnodesbutton').click(addNodesMode);
	$('#changeButton').click(changeEditingMode);
	$('#addedgesbutton').click(addEdgesMode);
	$('#movenodesbutton').click(moveNodesMode);
	$('#editnodesbutton').click(editNodesMode);
	$('#togrammarbutton').click(convertToGrammar);
}(jQuery));	