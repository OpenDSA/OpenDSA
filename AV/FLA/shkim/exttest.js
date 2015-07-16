// old DFA editor test
// Has the option to convert to RL grammar and can save/load JFLAP files.
// Otherwise, see Martin's FA editor for the latest FA editor

"use strict";
/*global alert: true, ODSA */

(function ($) {
	ODSA.SETTINGS.MODULE_ORIGIN = '*';
	var jsav = new JSAV("av"),
		saved = false,
		// startState,
		selectedNode = null,
		arr,
		g;
	// Empty string can be set to anything when initializing the graph:
	// e.g. initGraph({layout: "automatic", emptystring: epsilon})
	// By default it is set to lambda.
	var lambda = String.fromCharCode(955),
		epsilon = String.fromCharCode(949),
		emptystring = lambda;
	/*
	Add lambda transitions by setting weight to empty string or by making it emptystring.
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
	
			// can add emptystring in two ways:
		    g.addEdge(a, d, {weight: ''});
		    g.addEdge(a, e, {weight: emptystring});

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
	// add click handlers to the graph (outdated interface for editing the FA)
	function addHandlers() {
		// handler for the graph window
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
		// add eventhandlers to nodes
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
				// adds labels to states
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
		// add eventhandlers to edges
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

	var g = initGraph({layout: "automatic"});
	// var g = initGraph({layout: "automatic", emptystring: epsilon});
	g.layout();
	jsav.displayInit();
	//===============================
	var updateAlphabet = function() {
		g.updateAlphabet();
		$("#alphabet").html("" + Object.keys(g.alphabet).sort());
	};
	updateAlphabet();

	//================================
	// editing modes

	var addNodesMode = function() {
		var jg = $(".jsavgraph");
		jg.removeClass("addEdges");
		jg.removeClass("moveNodes");
		jg.removeClass("editNodes");
		jg.addClass("addNodes");
		$("#mode").html('Adding nodes');
		jsav.umsg("Click to add nodes");
	};
	var addEdgesMode = function() {
		var jg = $(".jsavgraph");
		jg.removeClass("addNodes");
		jg.removeClass("moveNodes");
		jg.removeClass("editNodes");
		jg.addClass("addEdges");
		$("#mode").html('Adding edges');
		jsav.umsg("Click a node");
	};
	var moveNodesMode = function() {
		var jg = $(".jsavgraph");
		jg.removeClass("addNodes");
		jg.removeClass("addEdges");
		jg.removeClass("editNodes");
		jg.addClass("moveNodes");
		$("#mode").html('Moving nodes');
		jsav.umsg("Click a node");
	};
	var editNodesMode = function() {
		var jg = $(".jsavgraph");
		jg.removeClass("addNodes");
		jg.removeClass("addEdges");
		jg.removeClass("moveNodes");
		jg.addClass("editNodes");
		$("#mode").html('Editing nodes and edges');
		jsav.umsg("Click a node or edge");
	};
	// change between editing and non-editing (highlight ND, convert to grammar)
	var changeEditingMode = function() {
		var jg = $(".jsavgraph");
		jg.removeClass("addNodes");
		jg.removeClass("addEdges");
		jg.removeClass("moveNodes");
		jg.removeClass('editNodes');
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
	// tests
	// toggle highlighting nondeterministic nodes
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
	// toggle highlighting lambda transitions
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
	// traversal
	// DFA ONLY
	// outdated, see Martin's FA editor for latest FA traversal (with ND traversal and multiple-character transitions)

	// will not work with the default DFA
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
	// save as a XML file readable by JFLAP
	var serializeGraphToXML = function (graph) {
		var text = '<?xml version="1.0" encoding="UTF-8"?>';
	    text = text + "<structure>";
	    text = text + "<type>fa</type>"
	    text = text + "<automaton>"
	    var nodes = graph.nodes();
	    for (var next = nodes.next(); next; next = nodes.next()) {
	    	var left = next.position().left;
		    var top = next.position().top;
		    var i = next.hasClass("start");
		    var f = next.hasClass("final");
		    var label = next.stateLabel();
		    text = text + '<state id="' + next.value().substring(1) + '" name="' + next.value() + '">';
		    text = text + '<x>' + left + '</x>';
		    text = text + '<y>' + top + '</y>';
		    if (label) {
		    	text = text + '<label>' + label + '</label>';
		    }
		    if (i) {
		    	text = text + '<initial/>';
		    }
		    if (f) {
		    	text = text + '<final/>';
		    }
	    	text = text + '</state>';
	    }
	    var edges = graph.edges();
	    for (var next = edges.next(); next; next = edges.next()) {
	    	var fromNode = next.start().value().substring(1);
	    	var toNode = next.end().value().substring(1);
	    	var w = next.weight().split('<br>');
	    	for (var i = 0; i < w.length; i++) {
	    		text = text + '<transition>';
	    		text = text + '<from>' + fromNode + '</from>';
	    		text = text + '<to>' + toNode + '</to>';
	    		if (w[i] === emptystring) {
	    			text = text + '<read/>';
	    		} else {
	    			text = text + '<read>' + w[i] + '</read>';
	    		}
	    		text = text + '</transition>';
	    	}
	    }
	    text = text + "</automaton></structure>"
	    return text;
	};
	var save = function () {
		var downloadData = "text/xml;charset=utf-8," + encodeURIComponent(serializeGraphToXML(g));
    	$('#download').html('<a href="data:' + downloadData + '" target="_blank" download="fa.xml">Download FA</a>');
    	$('#download a')[0].click();
	};

	// load a FA from a XML file
  	var parseFile = function (text) {
	    var parser,
	        xmlDoc;
	    if (window.DOMParser) {
	      	parser=new DOMParser();
	      	xmlDoc=parser.parseFromString(text,"text/xml");
	    } else {
	      	xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
	      	xmlDoc.async=false;
	      	xmlDoc.loadXML(txt);
	    }
	    if (xmlDoc.getElementsByTagName("type")[0].childNodes[0].nodeValue !== 'fa') {
	      	alert('File does not contain a finite automaton.');
	      	// clear input
	      	var loaded = $('#loadbutton');
	      	loaded.wrap('<form>').closest('form').get(0).reset();
	      	loaded.unwrap();
	      	return;
	    } else {
	    	if (g) {
				g.clear();
			}
			g = new jsav.ds.fa({width: '90%', height: 440, layout: "manual"});
			var nodeMap = {};			// map node IDs to nodes
	      	var xmlStates = xmlDoc.getElementsByTagName("state");
	      	xmlStates = _.sortBy(xmlStates, function(x) {return x.id;})
	      	var xmlTrans = xmlDoc.getElementsByTagName("transition");
	      	for (var i = 0; i < xmlStates.length; i++) {
	        	var x = Number(xmlStates[i].getElementsByTagName("x")[0].childNodes[0].nodeValue);
	        	var y = Number(xmlStates[i].getElementsByTagName("y")[0].childNodes[0].nodeValue);
	        	var newNode = g.addNode({left: x, top: y});
	        	var isInitial = xmlStates[i].getElementsByTagName("initial")[0];
	        	var isFinal = xmlStates[i].getElementsByTagName("final")[0];
	        	var isLabel = xmlStates[i].getElementsByTagName("label")[0];
	        	if (isInitial) {
	        		g.makeInitial(newNode);
	        	}
	        	if (isFinal) {
	        		newNode.addClass('final');
	        	}
	        	if (isLabel) {
	        		newNode.stateLabel(isLabel.childNodes[0].nodeValue);
	        	}
	        	nodeMap[xmlStates[i].id] = newNode;
	      	}
	      	for (var i = 0; i < xmlTrans.length; i++) {
	      		var from = xmlTrans[i].getElementsByTagName("from")[0].childNodes[0].nodeValue;
	      		var to = xmlTrans[i].getElementsByTagName("to")[0].childNodes[0].nodeValue;
	      		var read = xmlTrans[i].getElementsByTagName("read")[0].childNodes[0];
	      		if (!read) {
	      			read = "";
	      		} else {
	      			read = read.nodeValue;
	      		}
	      		g.addEdge(nodeMap[from], nodeMap[to], {weight: read});
	      	}
	      	g.layout();
			addHandlers();
	    }
	};
  	var waitForReading = function (reader) {
    	reader.onloadend = function(event) {
        	var text = event.target.result;
        	parseFile(text);
    	}
  	};
  	var load = function () {
    	var loaded = document.getElementById('loadbutton');
    	var file = loaded.files[0],
        	reader = new FileReader();
    	waitForReading(reader);
    	reader.readAsText(file);
  	};

	// automatically convert FA to right-linear grammar
	var convertToGrammar = function () {
		// by default sets S to be the start variable
		var variables = "SABCDEFGHIJKLMNOPQRTUVWXYZ";
		var s = g.initial;
		var newVariables = [s];
		var nodes = g.nodes();
		var arrow = String.fromCharCode(8594);
		var converted = [];
		// quit if the FA is too large for conversion
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
		// save resulting grammar as an array of strings 
		// (same format as how the grammar test exports grammars to local storage)
		localStorage['grammar'] = converted;
		// open grammar
		window.open("grammarTest.html", "_self");
	};

	// testing OpenDSA's reset (use to return from traversal)
  	$('#reset').click(function() {
  		save();
  		ODSA.AV.reset();
  		if (jsav) {
  			jsav.clear();
  		}
  		jsav = new JSAV($('.avcontainer'));
  		$("button").show();
  		// always resets to the default graph (doesn't save any edits made by the user)
  		var g = initGraph({layout: "automatic"});
		g.layout();
		jsav.displayInit();
		updateAlphabet();
  	});
  	$('#playbutton').click(play);
	$('#layoutbutton').click(function() {g.layout()});
  	$('#testndbutton').click(testND);
  	$('#testlambdabutton').click(testLambda);
  	$('#savebutton').click(save);
  	$('#loadbutton').on('change', load);
  	$('#addnodesbutton').click(addNodesMode);
	$('#changeButton').click(changeEditingMode);
	$('#addedgesbutton').click(addEdgesMode);
	$('#movenodesbutton').click(moveNodesMode);
	$('#editnodesbutton').click(editNodesMode);
	$('#togrammarbutton').click(convertToGrammar);
}(jQuery));	