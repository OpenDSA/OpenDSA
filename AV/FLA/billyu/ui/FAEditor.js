var latexit = "http://latex.codecogs.com/svg.latex?";
(function ($) {
	var jsav = new JSAV("av"), // Instance variable to store the JSAV algorithm visualization.
		jsavArray, // Instance variable to store the JSAV array (in which input strings are displayed).
		label = null, // Instance variable to store the label clicked in "Edit Edges" mode.
		g, // Instance variable to store the current JSAV graph.
		lambda = String.fromCharCode(955), // Instance variable to store the JavaScript representation of lambda.
		epsilon = String.fromCharCode(949), // Instance variable to store the JavaScript representation of epsilon.
		none = String.fromCharCode(248), // empty set symbol used for converting to RE
		emptystring = lambda, // Instance variable to store which empty string notation is being used.
		willRejectFunction = willReject, // Instance variable to indicate which traversal function to run (shorthand or no).
		exerciseIndex,//for creating exercises
		type,//type of editor: fixer, tester or editor
		fatoreController,
		exerController;

	// Handler for initializing graph upon loading the web page.
	// Loads the graph from conversionExercise.html / minimizationTest.html if we are navigating here from those pages.
	// Otherwise simply initializes a default data set.
	function onLoadHandler() {
		// initialize right click menu and hide it for future use
		type = $('h1').attr('id');
		if (type == 'fixer' || type == 'tester') {
			switch (type) {
			case 'fixer':
				exerController = new ExerciseController(jsav, g, "../exercises/fixerTests.json", "json", {initGraph: initGraph});
				exerController.load();
				break;
			case 'tester':
				exerController = new ExerciseController(jsav, g, "../exercises/FAwithExpression.json", "json", {initGraph: initGraph});
				exerController.load();
				break;
			default:
				break;
			}
		}
		else {
			$('#begin').click(displayTraversals);
			var data;
			//this editor is opened from exercise generator
			if (localStorage['createExercise'] == 'true') {
				jsav.umsg("When you're done, click 'finish'.");
				// exercise generator does not need the functionality buttons
				$(".functionality").hide();
				$(".createExercise").show();
				exerciseIndex = localStorage['exerciseIndex'];
				data = localStorage['problem' + exerciseIndex];
			}
			else {
				$(".functionality").show();
				$(".createExercise").hide();
				if (localStorage['toConvert'] === "true") {
					data = localStorage['converted'];
					$('#clearLabelButton').show();
					console.log("here");
				}
				else if (localStorage['toMinimize'] === "true") {
					data = localStorage['minimized'];
					$('#clearLabelButton').show();
				}
				else if (localStorage['REtoFA'] == "true") {
					data = localStorage['FAfromRE'];
				}
				else {
					data = '{"nodes":[],"edges":[]}';
				}
			}
			initialize(data);
		}
		$('#undoButton').click(function(){
			g.undo();
			$('.jsavgraph').click(graphClickHandler);
			$('.jsavedgelabel').click(labelClickHandler);
		});
		$('#redoButton').click(function(){
			g.redo();
			$('.jsavgraph').click(graphClickHandler);
			$('.jsavedgelabel').click(labelClickHandler);
		});
		resetUndoButtons();
	};


	// Initializes a graph with automatic layout. Mainly called by Undo/Redo.
	var initialize = function(graph) {
		g = graph;
		initGraph({layout: "automatic"});
	};

	// Sets click handler for when the user clicks a JSAV edge label.
	var labelClickHandler = function(e) {
		if ($(".jsavgraph").hasClass("editNodes")) {
			// If in "Edit Nodes" mode (which also serves to edit edges), open the custom prompt box to edit the edge.
			label = this;
			var values = $(label).html().split('<br>');
			var Prompt = new EdgePrompt(updateEdge, emptystring);
   			Prompt.render(values);
		}
		else if ($(".jsavgraph").hasClass("deleteNodes")) {
			console.log("click on label");
			g.saveFAState();
			$(this).html("");
			g.layout({layout:"manual"});
		}
	};

	// Initializes a graph by parsing a JSON representation.
	var initGraph = function(opts) {
		// Remove the old graph, parse JSON, and initialize the new graph.
		$('.jsavgraph').remove();
		var source = opts.graph ? opts.graph : jQuery.parseJSON(g);
		g = jsav.ds.fa($.extend({width: '750px', height: 440, editable: true}, opts));
		var ratio = 1;
		if (localStorage['toConvert'] == "true" || localStorage['toMinimize'] == "true") {
			ratio = 2;
		}
		g.initFromParsedJSONSource(source, ratio);

		// Clear anything in local storage as we do not need it anymore.
		// (Local storage is used to transfer graph information between different windows. It is used by conversionExercise.html and minimizationTest.html.)
		localStorage['toConvert'] = false;
		localStorage['toMinimize'] = false;
		localStorage['REtoFA'] = false;
		finalize();
		return g;
	};

	// Update input character alphabet, display the graph, and add click handlers.
	var finalize = function() {
		jsav.displayInit();
		g.click(nodeClickHandler);
		g.click(edgeClickHandler, {edge: true});
		$('.jsavgraph').click(graphClickHandler);
		$('.jsavedgelabel').click(labelClickHandler);
	};

    // Sets click handlers for when the user clicks on the JSAV graph.
	var graphClickHandler = function(e) {
		if ($("#rmenu").is(":visible")) {
			g.hideRMenu();
		}
		else if ($(".jsavgraph").hasClass("addNodes")) {
			// If in "Add Nodes" mode, save the graph and add a node.
			g.saveFAState();
			executeAddNode(g, e.pageY, e.pageX);
		} 
	};

	// Sets click handlers for when the user clicks on a JSAV node.
	var nodeClickHandler = function(e) {	
		if ($(".jsavgraph").hasClass("editNodes")) {
			// If in "Edit Nodes" mode, open the custom prompt box to edit the selected node.
			g.saveFAState();
			g.selected = this;
			g.selected.highlight();
			var Prompt = new FANodePrompt(updateNode);
			Prompt.render(g.selected.value(), g.selected.hasClass('start'), g.selected.hasClass('final'), g.selected.stateLabel());
			g.selected.unhighlight();
		}
		else if ($('.jsavgraph').hasClass('deleteNodes')) {
			// If in "Delete Nodes" mode, save the graph and delete the node.
			g.saveFAState();
			executeDeleteNode(g, this);
			checkAllEdges();
		}
		else if ($('.jsavgraph').hasClass('collapse')) {
			g.selected = this;
			if (g.selected == g.initial || g.selected.hasClass('final')) return;
			fatoreController.collapseState(g.selected);
		}
	};

	// Sets click handler for when the user clicks a JSAV edge.
	var edgeClickHandler = function(e) {
		if ($('.jsavgraph').hasClass('deleteNodes')) {
			// If in "Delete Nodes" mode (which also serves to delete edges), save the graph and delete the edge.
			g.saveFAState();
			executeDeleteEdge(g, this);
			checkAllEdges();
		}
	};

	// Called by the edit node custom prompt box to save the graph and update the node upon clicking "OK".
	function updateNode(initial_state, final_state, node_label) {
		g.saveFAState();
		executeEditFANode(g, g.selected, initial_state, final_state, node_label);
	};

	// Called by the add edge custom prompt box to save the graph and create the edge upon clicking "Done".
	function createEdge(edge_label) {
		if (!g.first || !g.selected) return;
		g.saveFAState();
		var edge = g.addEdge(g.first, g.selected, {weight: edge_label});
		$(edge._label.element).click(labelClickHandler);
		// This new edge does need its edge label click handler to be set individually.
		checkEdge(edge);
		g.first.unhighlight();
		g.selected.unhighlight();
		g.updateEdgePositions();
		g.first = null;
		g.selected = null;
	};

	// Called by the edit edge custom prompt box to save the graph and update the edge upon clicking "Done".
	function updateEdge(edge_label) {
		g.saveFAState();
		executeEditEdge(g, label, edge_label);
		checkAllEdges();
		// Check to see if shorthand notation is disabled, and whether the transitions on this edge are therefore allowed (i.e. only one character long).
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

	// Function to check if a single edge contains any transitions of more than one input symbol in sequence.
	// Generates warnings only when shorthand mode is disabled.
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

	// Function to check if any graph edge contains any transitions of more than one input symbol in sequence.
	// Generates warnings only when shorthand mode is disabled.
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

	// Function to switch to "Add Nodes" mode.
	// Triggered by clicking the "Add Nodes" button.
	var addNodes = function() {
		removeModeClasses();
		removeND();
		$('.jsavgraph').addClass("addNodes");
		jsav.umsg('Click to add nodes.');
	};

	// Function to switch to "Add Edges" mode.
	// Triggered by clicking the "Add Edges" button.
	var addEdges = function() {
		removeModeClasses();
		removeND();
		g.disableDragging();
		$(".jsavgraph").addClass("addEdges");
		$('.jsavgraph').off('mousedown').mousedown(mouseDown);
		$('.jsavgraph').off('mousemove').mousemove(mouseMove);
		$('.jsavgraph').off('mouseup').mouseup(mouseUp);
		jsav.umsg('Drag from one node to another.');
	};

	// Function to switch to "Move Nodes" mode.
	// Triggered by clicking the "Move Nodes" button.
	var moveNodes = function() {
		removeModeClasses();
		removeND();
		g.enableDragging();
		jsav.umsg('Drag to Move.');
	};

	// Function to switch to "Edit Nodes" mode.
	// Triggered by clicking the "Edit Nodes/Edges" button.
	var editNodes = function() {
		removeModeClasses();
		removeND();
		$('.jsavgraph').addClass('editNodes');
		jsav.umsg('Click a node or edge label.');
	};

	// Function to switch to "Delete Nodes" mode.
	// Triggered by clicking the "Delete Nodes/Edges" button.
	var deleteNodes = function() {
		removeModeClasses();
		removeND();
		$('.jsavgraph').addClass('deleteNodes');
		jsav.umsg('Click a node or edge to delete it.');
		// Expand the edges to make them easier to click.
		expandEdges();
	};

	// Function to enlarge edges in "Delete Nodes/Edges" mode, making them easier to click.
	var expandEdges = function() {
		var edges = g.edges();
		for (var next = edges.next(); next; next = edges.next()) {
			next.g.element.addClass('edgeSelect');
		}
	};

	// Function to shrink edges back to normal size when switching out of "Delete Nodes/Edges" mode.
	var collapseEdges = function() {
		var edges = g.edges();
		for (var next = edges.next(); next; next = edges.next()) {
			next.g.element.removeClass('edgeSelect');
		}
	};

	// Saves the graph before calling the function to switch the empty string symbol.
	// Triggered by clicking the "Lambda/Epsilon Mode" button.
	var switchEmptyString = function() {
		removeModeClasses();
		removeND();
		if(!emptyString()) {
			// If there are no empty strings on the graph, nothing was changed. Remove the saved graph from the undo stack.
			g.undoStack.pop();
			if(g.undoStack.length == 0) {
				document.getElementById("undoButton").disabled = true;
			}
		}
	};

	// Function to switch the empty string representation of the graph (lambda <-> epsilon).
	// Returns true if this alters the graph (i.e. if any empty string transitions currently exist).
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

	// Function to loop through the graph and replace all instances of the empty string with a different character.
	// Used to switch between lambda and epsilon.
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

	// Function that checks graph for nondeterminism.
	// Any nodes with multiple identical outgoing edges or lambda transitions are highlighted blue.
	// Triggered by clicking the "Highlight Nondeterminism" button.
	var testND = function() {
		removeModeClasses();
		var nd = false;
		var nodes = g.nodes();
		for(var next = nodes.next(); next; next = nodes.next()) {
			var findLambda = false;
			var findMultiple = false;
			var transition = g.transitionFunction(next, emptystring);
			if (transition.length > 0) {
				findLambda = true;
			}
			for (var key in g.alphabet) {
				// If edges have sequences of input symbols on them, only the first one matters.
				// Reason why is because this is the outgoing edge input symbol for the node.
				transition = g.transitionFunctionMultiple(next, key);
				if (transition.length > 1) {
					findMultiple = true;
					break;
				}
			}
			if (findLambda || findMultiple) {
				next.toggleClass('testingND');
				nd = true;
			}
		}
		return nd;
	};

	// Function that checks graph for lambda transitions, which are highlighted red.
	// Triggered by clicking the "Highlight Lambda/Epsilon Transitions" button.
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

	// Undoes the effects of testND and testLambda, unhighlighting all nodes and edges.
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

	// Saves the graph, then reconfigures the layout automatically.
	// Triggered by clicking the "Layout" button.
	var layoutGraph = function() {
		removeModeClasses();
		removeND();
		g.layout();
	};

	// Exit out of all editing modes and prepare the view for the input string JSAV array.
	var readyTraversal = function() {
		removeModeClasses();
		jsav.umsg('Click on an input to trace its traversal.');
	};

	// Presents the custom prompt box for traversal input strings.
	// Check the graph for the initial state. If there isn't one, an error is returned.
	// Triggered by clicking the "Traverse" button.
	var displayTraversals = function () {
		if (g.initial == null) {
			window.alert("FA traversal requires an initial state.");
			return;
		}
		var Prompt = new TraversePrompt(traverseInputs);
		Prompt.render();
	};

	// Traces every input string on the graph and populates a JSAV array showing them.
	// They are highlighted either green or red depending on whether they were accepted or rejected.
	// Called by the traversal custom prompt box upon clicking "Traverse".
	var traverseInputs = function (inputs) {
		var nodes = g.nodes();
		for (var next = nodes.next(); next; next = nodes.next()) {
			// Remove "current", or else it will mess with the traversal algorithms.
			// (Traversal algorithms use "current" to mark states as visited.)
			next.removeClass('current');
		}
		var travArray = [];
		readyTraversal();
		for (var i = 0; i < inputs.length; i++) {
			// Create an array of the input strings.
			if (inputs[i]) {
				travArray.push(inputs[i]);
			}
			else {
				travArray.push(emptystring);
			}
		}
		// Use this array to populate the JSAV array.
		jsavArray = jsav.ds.array(travArray, {element: $('.arrayPlace')});
		for (var j = 0; j < inputs.length; j++) {
			if (willRejectFunction(g, inputs[j])) {
				// If rejected, color red.
				jsavArray.css(j, {"background-color": "red"});
			}
			else {
				// If accepted, color green.
				jsavArray.css(j, {"background-color": "green"});
			}
		}
		// Remove any click handlers already on the JSAV array.
		// Add the click handler and show the JSAV array.
		$('.arrayPlace').off("click");
		jsavArray.click(arrayClickHandler);
		jsavArray.show();
	};

	// Click handler for the JSAV array.
	function arrayClickHandler(index) {
		play(this.value(index));
	};

	// Function to open the graph in another window and run the input string on it.
	// Triggered by clicking on an input string in the JSAV array.
	var play = function (inputString) {
		localStorage['graph'] = serialize(g);
		localStorage['traversal'] = inputString;
		window.open("./FATraversal.html");
	};

	// Save the graph and switch to shorthand mode, in which sequences of input symbols on an edge are acceptable.
	// Triggered by clicking the "Enable/Disable Shorthand" button.
	function switchShorthand() {
		removeModeClasses();
		removeND();
		setShorthand(!g.shorthand);
	};

	// Function to set whether or not shorthand mode is enabled.
	// If it is disabled, every violating egde (edges with multiple symbol transitions) are highlighted orange.
	// If any edges are highlighted orange, the "Traverse" button is disabled.
	function setShorthand (setBoolean) {
		if (type !== "editor") return;
		g.setShorthand(setBoolean);
		if (g.shorthand) {
			document.getElementById("begin").disabled = false;
			document.getElementById("shorthandButton").innerHTML = "Disable Shorthand";
			// The traversal function to run needs to be changed.
			willRejectFunction = willRejectShorthand;
			var edges = g.edges();
			for (var next = edges.next(); next; next = edges.next()) {
				next.removeClass('testingShorthand');
			}
		}
		else {
			document.getElementById("shorthandButton").innerHTML = "Enable Shorthand";
			// The traversal function to run needs to be changed.
			willRejectFunction = willReject;
			checkAllEdges();
		}
	};

	// Function to reset the size of the undo stack and the redo stack.
	// Since both of them are empty, both buttons are also disabled.
	// Called whenever the user loads a new graph.
	function resetUndoButtons () {
		document.getElementById("undoButton").disabled = true;
		document.getElementById("redoButton").disabled = true;
	};

	//cancel all current options
	function cancel() {
		$(".jsavgraph").removeClass("addNodes").removeClass("addEdges").removeClass("moveNodes").removeClass("editNodes").removeClass("deleteNodes").removeClass("working");
		jsav.umsg("");
		var nodes = g.nodes();
		_.each(nodes, function(x) {x.unhighlight();});
		g.selected = null;
		g.hideRMenu();
		collapseEdges();
		g.enableDragging();
	}

	function finishExercise() {
		localStorage['problem' + exerciseIndex] = serialize(g);
		localStorage['createExercise'] = false;
		window.close();
	}

	// Function to save the current graph as an XML file and provide a download link for it.
	// Triggered by clicking the "Save" button.
	// Note that there are some browser-specific differences in how this is handled.
	var saveXML = function () {
		removeModeClasses();
		var downloadData = "text/xml;charset=utf-8," + encodeURIComponent(serializeGraphToXML(g));
    	$('#download').html('<a href="data:' + downloadData + '" target="_blank" download="fa.xml">Download FA</a>');
			$('#download a')[0].click();
    	jsav.umsg("Saved");
	};

	// Function to parse an XML file and initialize a graph from it.
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
	    	// This file is not a file that can be parsed.
	      	window.alert('File does not contain an automaton.');
	      	return;
	    }
	    if (xmlDoc.getElementsByTagName("type")[0].childNodes[0].nodeValue !== 'fa') {
	    	// This file was created by a different automaton editor.
	    	window.alert('File does not contain a finite automaton.');
	      	return;
	    }
	    else {
	    	if (g) {
				g.clear();
			}
			g = new jsav.ds.fa({width: '730px', height: 440, layout: "automatic", editable: true});
			var nodeMap = {};			// map node IDs to nodes
	      	var xmlStates = xmlDoc.getElementsByTagName("state");
	      	xmlStates = _.sortBy(xmlStates, function(x) { return x.id; })
	      	var xmlTrans = xmlDoc.getElementsByTagName("transition");
	      	// Iterate over the nodes and initialize them.
	      	for (var i = 0; i < xmlStates.length; i++) {
	        	var x = Number(xmlStates[i].getElementsByTagName("x")[0].childNodes[0].nodeValue);
	        	var y = Number(xmlStates[i].getElementsByTagName("y")[0].childNodes[0].nodeValue);
	        	var newNode = g.addNode({left: x, top: y});
	        	// Add the various details, including initial/final states and state labels.
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
	        	newNode.stateLabelPositionUpdate();
	      	}
	      	// Iterate over the edges and initialize them.
	      	for (var i = 0; i < xmlTrans.length; i++) {
	      		var from = xmlTrans[i].getElementsByTagName("from")[0].childNodes[0].nodeValue;
	      		var to = xmlTrans[i].getElementsByTagName("to")[0].childNodes[0].nodeValue;
	      		var read = xmlTrans[i].getElementsByTagName("read")[0].childNodes[0];
	      		// Empty string always needs to be checked for.
	      		if (!read) {
	      			read = emptystring;
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

	// Function to parse the XML file once the File Reader is done reading it.
  	var waitForReading = function (reader) {
    	reader.onloadend = function(event) {
        	var text = event.target.result;
        	parseFile(text);
    	}
  	};

  	// Function to load an XML file from the user's computer.
  	// Triggered upon changing the file in the "Choose File" button.
  	// Note that there are some browser-specific differences with what form this "Choose File" button takes.
  	var loadXML = function () {
    	var loaded = document.getElementById('loadFile');
    	var file = loaded.files[0],
        	reader = new FileReader();
    	waitForReading(reader);
    	reader.readAsText(file);
  	};

	// Function to convert an FA to a Right-Linear Grammar.
	// Triggered by clicking the "Convert to Right-Linear Grammar" button.
	// Currently only works in certain browsers (not Safari).
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
		window.open("./grammarEditor.html");
	};

	// Function to convert an NFA to a DFA.
	// Triggered by clicking the "Convert to DFA" button.
	// Currently incomplete - does not work as intended.
	var convertToDFA = function() {
		localStorage['convertNFA'] = true;
		localStorage['toConvert'] = serialize(g);
		window.open("./NFAtoDFA.html");
	};

	// Function to convert a complete DFA to a minimum-state DFA.
	// Checks for nondeterminism, but currently does not check the completeness of the DFA.
	// Triggered by clicking the "Minimize DFA" button.
	var minimizeDFA = function() {
		removeND();
		if (testND()) {
			testLambda();
			window.alert("This Finite Automaton is nondeterministic.\nPlease convert to DFA before minimizing.");
			return;
		}
		localStorage['minimizeDFA'] = true;
		localStorage['toMinimize'] = serialize(g);
		window.open("./minDFA.html");
	}

	// transfrom FA to regular expression
	var toRE = function() {
		$("html, body").animate({ scrollTop: 0 }, "slow");
		removeModeClasses();
		if (!g.initial) {
			alert("You must have an initial state.");
			return;
		}
		var finals = g.getFinals();
		if (finals.length !== 1) {
			alert("You must have exactly one final state.");
			return;
		}
		$('h1').text("Finite Automaton to Regular Expression");
		$('.jsavgraph').addClass('RE');
		$('#nodeButton').hide();
		$('#editButton').hide();
		$('#deleteButton').hide();
		$('#collapseButton').hide();
		fatoreController = new FAtoREController(jsav, g, {});
		jsav.umsg("Use add edges tool to put empty transitions between states with no transitions.");
		$('#cheat').show();
		$('#cheat').click(function() {
			fatoreController.completeTransitions();
		});
		$('#collapseButton').click(function() {
			fatoreController.collapseState();
		});
		$('#finalize').click(function() {
			fatoreController.finalizeRE();
		});

		fatoreController.checkForTransitions();
	}

	// Disable all editing modes so that click handlers do not fire.
	// Called when the user switches editing modes, or otherwise presses a button that changes the view.
	var removeModeClasses = function() {
		// Clear all superfluous or otherwise outdated information on the page.
		$('.arrayPlace').empty();
		$('#download').html('');
		jsav.umsg('');
		// Unselect and unhighlight any selected nodes or edges.
		if (g.first) {
			g.first.unhighlight();
			g.first = null;
		}
		if (g.selected) {
			g.selected.unhighlight();
			g.selected = null;
		}
		if ($(".jsavgraph").hasClass("deleteNodes")) {
			$(".jsavgraph").removeClass("deleteNodes");
			// Return edges to normal size.
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

	function clearLabels() {
		var nodes = g.nodes();
		for (var node = nodes.next(); node; node = nodes.next()) {
			clearLabel(node); // function declared in FA.js
		}
	}
	
	var startX, startY, endX, endY; // start position of dragging edge line
	function mouseDown(e) {
		if (!$('.jsavgraph').hasClass('addEdges')) return;
		var targetClass = $(e.target).attr('class');
		if (targetClass !== "jsavvaluelabel") return;
		var node = $(e.target);
		g.first = g.getNodeWithValue(node.text());
		g.first.highlight();
		offset = $('.jsavgraph').offset(),
	 	offset2 = parseInt($('.jsavgraph').css('border-width'), 10);
		startX = e.pageX - offset.left + offset2;
		startY = e.pageY - offset.top + offset2;
	}

	function mouseUp(e) {
		if (!g.first) return;
		var targetClass = $(e.target).attr('class');
		if (targetClass !== "jsavvaluelabel") {
			$('path[opacity="1.5"]').remove();
			g.first.unhighlight();
			g.first = null;
			return;
		}
		var node = $(e.target);
		g.selected = g.getNodeWithValue(node.text());
		g.selected.highlight();
		if ($('.jsavgraph').hasClass("RE")) {
			createEdge(none);
			fatoreController.checkForTransitions();
		}
		else {
			var Prompt = new EdgePrompt(createEdge, emptystring);
			Prompt.render("");
		}
		$('path[opacity="1.5"]').remove();
	}

	function mouseMove(e) {
		if (!g.first) return;
		endX = e.pageX - offset.left + offset2;
		endY = e.pageY - offset.top + offset2;
		$('path[opacity="1.5"]').remove();
		jsav.g.line(startX, startY, endX, endY, {"opacity": 1.5});
	}

	// Button click handlers.
	$('#saveButton').click(saveXML);
	$("#finish").click(finishExercise);
	$('#loadFile').change(loadXML);
	$('#cancelButton').click(cancel);
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
	$('#toDFAButton').click(convertToDFA);
	$('#minimizeButton').click(minimizeDFA);
	$('#toGrammarButton').click(convertToGrammar);
	$('#toREButton').click(toRE);
	$('#clearLabelButton').click(clearLabels);
	$('#collapseButton').hide();
	$('#cheat').hide();
	$('#exportButton').hide();
	$('#clearLabelButton').hide();
	$( "#dialog" ).dialog({ autoOpen: false });
	$("#help").dialog({autoOpen: false });
	$("#helpButton").click(function() {
		$("#help").dialog({
			dialogClass: "alert",
			width: 400,
			height: 300
		});
		$("#help").dialog("open");
	});
	$(document).keyup(function(e) {
		if (e.keyCode === 27) cancel();   // esc
	});
	$('#download').hide();

	// magic happens here
	onLoadHandler();

}(jQuery));
