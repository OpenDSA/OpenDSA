(function ($) {
	var jsav = new JSAV("av"),
		jsavArray,
		first = null,
		selected = null,
		label = null,
		undoStack,
		redoStack,
		g,
		lambda = String.fromCharCode(955),
		epsilon = String.fromCharCode(949),
		emptystring = lambda,
		willRejectFunction = willReject;

	var initialize = function(graph) {
		g = graph;
		initGraph({layout: "automatic"});
	};

	var initGraph = function(opts) {
		$('.jsavgraph').remove();
		var gg = jQuery.parseJSON(g);
		g = jsav.ds.fa($.extend({width: '90%', height: 440}, opts));
		for (var i = 0; i < gg.nodes.length; i++) {
	    	var node = g.addNode('q' + i),
	    		offset = $('.jsavgraph').offset(),
	    		offset2 = parseInt($('.jsavgraph').css('border-width'), 10);
	    	$(node.element).offset({top : parseInt(gg.nodes[i].top) + offset.top + offset2, left: parseInt(gg.nodes[i].left) + offset.left + offset2});
	    	if (gg.nodes[i].i) {
	    		g.makeInitial(node);
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
	   			w = checkEmptyString(w);
	   			var edge = g.addEdge(g.nodes()[gg.edges[i].start], g.nodes()[gg.edges[i].end], {weight: w});
       		}
	   		else {
	   			var edge = g.addEdge(g.nodes()[gg.edges[i].start], g.nodes()[gg.edges[i].end]);
	   		}
	   		edge.layout();
	   	}
	   	if (gg.shorthand) {
	   		setShorthand(true);
	    }
	    else {
	    	setShorthand(false);
	    }
	    finalize();
    };

    var finalize = function() {
    	updateAlphabet();
	    jsav.displayInit();
	    g.click(nodeClickHandler);
		g.click(edgeClickHandler, {edge: true});
		$('.jsavgraph').click(graphClickHandler);
		$('.jsavedgelabel').click(labelClickHandler);
    };

    var checkEmptyString = function(w) {
    	var wArray = w.split("<br>");
    	for (var i = 0; i < wArray.length; i++) {
    		if ((wArray[i] == lambda || wArray[i] == epsilon) && wArray[i] != emptystring) {
    			emptyString();
    		}
    	}
    	return wArray.join("<br>");
    };

	var graphClickHandler = function(e) {
		if ($(".jsavgraph").hasClass("addNodes")) {
			saveFAState();
			executeAddNode(g, e.pageY, e.pageX);
		} 
		else if ($('.jsavgraph').hasClass('moveNodes') && selected != null) {
			saveFAState();
			executeMoveNode(g, selected, e.pageY, e.pageX);
			selected.unhighlight();
			selected = null;
			e.stopPropagation();
			jsav.umsg('Click a node.');
		}
	};

	var nodeClickHandler = function(e) {	
		if ($(".jsavgraph").hasClass("editNodes")) {
			selected = this;
			selected.highlight();
			var Prompt = new FANodePrompt(updateNode);
			Prompt.render(selected.value(), selected.hasClass('start'), selected.hasClass('final'), selected.stateLabel());
			selected.unhighlight();
		}
		else if ($(".jsavgraph").hasClass("addEdges")) {
			if (!$(".jsavgraph").hasClass("working")) {
				first = this;
				first.highlight();
				$('.jsavgraph').addClass("working");
				jsav.umsg('Select a node to make an edge to.');
   			}
   			else {
   				selected = this;
   				selected.highlight();
   				var Prompt = new EdgePrompt(createEdge, emptystring);
   				Prompt.render("");
				$('.jsavgraph').removeClass("working");
				first.unhighlight();
				selected.unhighlight();
				jsav.umsg('Click a node.');
   			}
		}
		else if ($('.jsavgraph').hasClass('moveNodes')) {
			if (selected) {
				selected.unhighlight();
			}
			selected = this;
			selected.highlight();
			jsav.umsg('Click to place node.');
			e.stopPropagation();
		}
		else if ($('.jsavgraph').hasClass('deleteNodes')) {
			saveFAState();
			executeDeleteNode(g, this);
			updateAlphabet();
			checkAllEdges();
		}
	};

	var edgeClickHandler = function(e) {
		if ($('.jsavgraph').hasClass('deleteNodes')) {
			saveFAState();
			executeDeleteEdge(g, this);
			updateAlphabet();
			checkAllEdges();
		}
	};

	var labelClickHandler = function(e) {
		if ($(".jsavgraph").hasClass("editNodes")) {
			label = this;
			var values = $(label).html().split('<br>');
			var Prompt = new EdgePrompt(updateEdge, emptystring);
   			Prompt.render(values);
		}
	};

	function updateNode(initial_state, final_state, node_label) {
		saveFAState();
		executeEditFANode(g, selected, initial_state, final_state, node_label);
	};

	function createEdge(edge_label) {
		saveFAState();
		var edge = executeAddEdge(g, first, selected, edge_label);
		$(edge._label.element).click(labelClickHandler);
		updateAlphabet();
		checkEdge(edge);
	};

	function updateEdge(edge_label) {
		saveFAState();
		executeEditEdge(g, label, edge_label);
		updateAlphabet();
		checkAllEdges();
		if (!g.shorthand) {
			var weights = edge_label.split("<br>");
			for (var i = 0; i < weights.length; i++) {
				if (weights[i].length > 1) {
					window.alert("Shorthand notation is disabled for this automaton.\n\nTo traverse, please enter only single character transition labels.");
					break;
				}
			}	
		}
	};

	function checkEdge(edge) {
		if (g.shorthand) {
			return;
		}
		var weights = edge.weight().split("<br>");
		for (var i = 0; i < weights.length; i++) {
			if (weights[i].length > 1) {
				window.alert("Shorthand notation is disabled for this automaton.\n\nTo traverse, please enter only single character transition labels.");
				edge.addClass('testingShorthand');
				document.getElementById("begin").disabled = true;
				break;
			}
		}
	};

	function checkAllEdges() {
		if (g.shorthand) {
			return;
		}
		document.getElementById("begin").disabled = false;
		var edges = g.edges();
		for (var next = edges.next(); next; next = edges.next()) {
			next.removeClass('testingShorthand');
			var weights = next.weight().split("<br>");
			for (var i = 0; i < weights.length; i++) {
				if (weights[i].length > 1) {
					next.addClass('testingShorthand');
					document.getElementById("begin").disabled = true;
				}
			}
		}
	};

	var updateAlphabet = function() {
		g.updateAlphabet();
		$("#alphabet").html("" + Object.keys(g.alphabet).sort());
	};

	var addNodes = function() {
		removeModeClasses();
		removeND();
		$('.jsavgraph').addClass("addNodes");
		$("#mode").html('Adding nodes');
		jsav.umsg('Click to add nodes.');
	};

	var addEdges = function() {
		removeModeClasses();
		removeND();
		$(".jsavgraph").addClass("addEdges");
		$("#mode").html('Adding edges');
		jsav.umsg('Click a node.');
	};

	var moveNodes = function() {
		removeModeClasses();
		removeND();
		$('.jsavgraph').addClass('moveNodes');
		$("#mode").html('Moving nodes');
		jsav.umsg('Click a node.');
	};

	var editNodes = function() {
		removeModeClasses();
		removeND();
		$('.jsavgraph').addClass('editNodes');
		$("#mode").html('Editing nodes and edges');
		jsav.umsg('Click a node or edge label.');
	};

	var deleteNodes = function() {
		removeModeClasses();
		removeND();
		$('.jsavgraph').addClass('deleteNodes');
		$("#mode").html('Deleting nodes and edges');
		jsav.umsg('Click a node or edge to delete it.');
		expandEdges();
	};

	var removeModeClasses = function() {
		$('.arrayPlace').empty();
		$('#download').html('');
		$("#mode").html('');
		jsav.umsg('');
		if (first) {
			first.unhighlight();
			first = null;
		}
		if (selected) {
			selected.unhighlight();
			selected = null;
		}
		if ($(".jsavgraph").hasClass("deleteNodes")) {
			$(".jsavgraph").removeClass("deleteNodes");
			collapseEdges();
		}
		else {
			$(".jsavgraph").removeClass("addNodes");
			$(".jsavgraph").removeClass("addEdges");
			$(".jsavgraph").removeClass("editNodes");
			$(".jsavgraph").removeClass("moveNodes");
			$(".jsavgraph").removeClass("working");
		}
	};

	var expandEdges = function() {
		var edges = g.edges();
		for (var next = edges.next(); next; next = edges.next()) {
			next.g.element.addClass('edgeSelect');
		}
	};

	var collapseEdges = function() {
		var edges = g.edges();
		for (var next = edges.next(); next; next = edges.next()) {
			next.g.element.removeClass('edgeSelect');
		}
	};

	var switchEmptyString = function() {
		removeModeClasses();
		removeND();
		saveFAState();
		if(!emptyString()) {
			undoStack.pop();
			if(undoStack.length == 0) {
				document.getElementById("undoButton").disabled = true;
			}
		}
	};

	var emptyString = function() {
		document.getElementById("epsilonButton").innerHTML = emptystring + " Mode";
		var graphChanged = false;
		if (emptystring === lambda) {
			graphChanged = updateTransitions(epsilon);
			emptystring = epsilon;
		}
		else {
			graphChanged = updateTransitions(lambda);
			emptystring = lambda;
		}
		document.getElementById("lambdaButton").innerHTML = "Highlight " + emptystring + "-Transitions";
		return graphChanged;
	};

	var updateTransitions = function(greekLetter) {
		var graphChanged = false;
		var edges = g.edges();
		for (var next = edges.next(); next; next = edges.next()) {
			var weights = next.weight().split("<br>");
			for (var i = 0; i < weights.length; i++) {
				if (weights[i] === emptystring) {
					weights[i] = greekLetter;
					graphChanged = true;
				}
			}
			next.weight(weights.join("<br>"));
		}
		return graphChanged;
	};

	var testND = function() {
		removeModeClasses();
		var nodes = g.nodes();
		for(var next = nodes.next(); next; next = nodes.next()) {
			var findLambda = false;
			var findMultiple = false;
			var transition = g.transitionFunction(next, emptystring);
			if (transition.length > 0) {
				findLambda = true;
			}
			for (var key in g.alphabet) {
				transition = g.transitionFunctionMultiple(next, key);
				if (transition.length > 1) {
					findMultiple = true;
					break;
				}
			}
			if (findLambda || findMultiple) {
				next.toggleClass('testingND');
			}
		}
	};

	var testLambda = function() {
		removeModeClasses();
		var edges = g.edges();
		for (var next = edges.next(); next; next = edges.next()) {
			wSplit = next.weight().split('<br>');
			for (var i = 0; i < wSplit.length; i++) {
				if (wSplit[i] == emptystring) {
					next.g.element.toggleClass('testingLambda');
					break;
				}
			}
		}
	};

	var removeND = function() {
		var nodes = g.nodes();
		for(var next = nodes.next(); next; next = nodes.next()) {
			next.removeClass("testingND");
		}
		var edges = g.edges();
		for (var next = edges.next(); next; next = edges.next()) {
			next.g.element.removeClass("testingLambda");
		}
	};

	var layoutGraph = function() {
		removeModeClasses();
		removeND();
		saveFAState();
		g.layout();
	};

	var readyTraversal = function() {
		removeModeClasses();
		jsav.umsg('Click on an input to trace its traversal.');
	};

	var displayTraversals = function () {
		if (g.initial == null) {
			window.alert("FA traversal requires an initial state.");
			return;
		}
		var Prompt = new TraversePrompt(traverseInputs);
		Prompt.render();
	};

	var traverseInputs = function (inputs) {
		var nodes = g.nodes();
		for (var next = nodes.next(); next; next = nodes.next()) {
			next.removeClass('current');
		}
		var travArray = [];
		readyTraversal();
		for (var i = 0; i < inputs.length; i++) {
			if (inputs[i]) {
				travArray.push(inputs[i]);
			}
			else {
				travArray.push(emptystring);
			}
		}
		jsavArray = jsav.ds.array(travArray, {element: $('.arrayPlace')});
		for (var j = 0; j < inputs.length; j++) {
			if (willRejectFunction(g, inputs[j])) {
				jsavArray.css(j, {"background-color": "red"});
			}
			else {
				jsavArray.css(j, {"background-color": "green"});
			}
		}
		$('.arrayPlace').off("click");
		jsavArray.click(arrayClickHandler);
		jsavArray.show();
	};

	function arrayClickHandler(index) {
		play(this.value(index));
	};

	var play = function (inputString) {
		localStorage['graph'] = serialize(g);
		localStorage['traversal'] = inputString;
		window.open("./FATraversal.html");
	};

	function switchShorthand() {
		removeModeClasses();
		removeND();
		saveFAState();
		setShorthand(!g.shorthand);
	};

	function setShorthand (setBoolean) {
		g.setShorthand(setBoolean);
		if (g.shorthand) {
			document.getElementById("begin").disabled = false;
			document.getElementById("shorthandButton").innerHTML = "Disable Shorthand";
			willRejectFunction = willRejectShorthand;
			var edges = g.edges();
			for (var next = edges.next(); next; next = edges.next()) {
				next.removeClass('testingShorthand');
			}
		}
		else {
			document.getElementById("shorthandButton").innerHTML = "Enable Shorthand";
			willRejectFunction = willReject;
			checkAllEdges();
		}
	};

	function resetUndoButtons () {
		document.getElementById("undoButton").disabled = true;
		document.getElementById("redoButton").disabled = true;
		undoStack = [];
		redoStack = [];
	};

	function saveFAState () {
		var data = serialize(g);
		undoStack.push(data);
		redoStack = [];
		document.getElementById("undoButton").disabled = false;
		document.getElementById("redoButton").disabled = true;
		if (undoStack.length > 20) {
			undoStack.shift();
		}
	};

	function undo () {
		removeModeClasses();
		var data = serialize(g);
		redoStack.push(data);
		data = undoStack.pop();
		initialize(data);
		document.getElementById("redoButton").disabled = false;
		if(undoStack.length == 0) {
			document.getElementById("undoButton").disabled = true;
		}
	};

	function redo () {
		removeModeClasses();
		var data = serialize(g);
		undoStack.push(data);
		data = redoStack.pop();
		initialize(data);
		document.getElementById("undoButton").disabled = false;
		if(redoStack.length == 0) {
			document.getElementById("redoButton").disabled = true;
		}
	};

	function onLoadHandler() {
		var defaultData = '{"nodes":[{"left":753.90625,"top":171.109375,"i":true,"f":false},{"left":505.890625,"top":342,"i":false,"f":false},{"left":1042,"top":199.40625,"i":false,"f":false},{"left":287.90625,"top":123.625,"i":false,"f":false},{"left":535.921875,"top":0,"i":false,"f":false},{"left":0,"top":89.234375,"i":false,"f":true}],"edges":[{"start":0,"end":1,"weight":"a"},{"start":0,"end":2,"weight":"b"},{"start":1,"end":3,"weight":"a"},{"start":3,"end":4,"weight":"b"},{"start":3,"end":5,"weight":"a"},{"start":4,"end":0,"weight":"a"},{"start":5,"end":3,"weight":"g"}]}';
		initialize(defaultData);
		resetUndoButtons();
	};

	// =================================================================================================================================
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

	var saveXML = function () {
		removeModeClasses();
		var downloadData = "text/xml;charset=utf-8," + encodeURIComponent(serializeGraphToXML(g));
    	$('#download').html('<a href="data:' + downloadData + '" target="_blank" download="fa.xml">Download FA</a>');
    	jsav.umsg("Saved");
	};

	// load a FA from a XML file
  	var parseFile = function (text) {
	    var parser,
	        xmlDoc;
	    if (window.DOMParser) {
	      	parser = new DOMParser();
	      	xmlDoc = parser.parseFromString(text,"text/xml");
	    }
	    else {
	      	xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
	      	xmlDoc.async = false;
	      	xmlDoc.loadXML(txt);
	    }
	    if (!xmlDoc.getElementsByTagName("type")[0]) {
	      	window.alert('File does not contain an automaton.');
	      	return;
	    }
	    if (xmlDoc.getElementsByTagName("type")[0].childNodes[0].nodeValue !== 'fa') {
	    	window.alert('File does not contain a finite automaton.');
	      	return;
	    }
	    else {
	    	if (g) {
				g.clear();
			}
			g = new jsav.ds.fa({width: '90%', height: 440, layout: "manual"});
			var nodeMap = {};			// map node IDs to nodes
	      	var xmlStates = xmlDoc.getElementsByTagName("state");
	      	xmlStates = _.sortBy(xmlStates, function(x) { return x.id; })
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
	      		}
	      		else {
	      			read = read.nodeValue;
	      		}
	      		var edge = g.addEdge(nodeMap[from], nodeMap[to], {weight: read});
	      		edge.layout();
	      	}
			finalize();
	    }
	};

  	var waitForReading = function (reader) {
    	reader.onloadend = function(event) {
        	var text = event.target.result;
        	parseFile(text);
    	}
  	};

  	var loadXML = function () {
    	var loaded = document.getElementById('loadFile');
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
			window.alert('The FA must have at most 26 states to convert it into a grammar!');
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
		window.open("../../shkim/grammarTest.html");
	};

	onLoadHandler();

	$('#begin').click(displayTraversals);
	$('#saveButton').click(saveXML);
	$('#loadFile').change(loadXML);
	$('#undoButton').click(undo);
	$('#redoButton').click(redo);
	$('#nodeButton').click(addNodes);
	$('#edgeButton').click(addEdges);
	$('#moveButton').click(moveNodes);
	$('#editButton').click(editNodes);
	$('#deleteButton').click(deleteNodes);
	$('#layoutButton').click(layoutGraph);
	$('#ndButton').click(testND);
	$('#lambdaButton').click(testLambda);
	$('#epsilonButton').click(switchEmptyString);
	$('#shorthandButton').click(switchShorthand);
	$('#togrammarbutton').click(convertToGrammar);
}(jQuery));