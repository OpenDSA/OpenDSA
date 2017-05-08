(function ($) {
	var jsav = new JSAV("av"), // Instance variable to store the JSAV algorithm visualization.
		jsavArray, // Instance variable to store the JSAV array (in which input strings are displayed).
		first = null, // Instance variable to store the first node clicked in "Add Edges" mode.
		selected = null, // Instance variable to store a node or edge that is clicked.
		label = null, // Instance variable to store the label clicked in "Edit Edges" mode.
		undoStack, // Instance variable to store a backup array of serialized graphs, loaded when the user clicks "Undo".
		redoStack, // Instance variable to store a backup array of serialized graphs, loaded when the user clicks "Redo".
		g, // Instance variable to store the current JSAV graph.
		lambda = String.fromCharCode(955), // Instance variable to store the JavaScript representation of lambda.
		epsilon = String.fromCharCode(949), // Instance variable to store the JavaScript representation of epsilon.
		emptystring = lambda, // Instance variable to store which empty string notation is being used.
		pretraverseFunction = pretraverse; // Instance variable to indicate which traversal function to run (shorthand or no).
    
    // Initializes a graph with automatic layout. Mainly called by Undo/Redo.
    var initialize = function(graph) {
		g = graph;
		initGraph({layout: "automatic"});
	};

	// Initializes a graph by parsing a JSON representation.
	var initGraph = function(opts) {
		// Remove the old graph, parse JSON, and initialize the new graph.
		$('.jsavgraph').remove();
		var gg = jQuery.parseJSON(g);
		g = jsav.ds.fa($.extend({width: '90%', height: 440}, opts));
		// Add the JSON nodes to the graph.
		for (var i = 0; i < gg.nodes.length; i++) {
	    	var node = g.addNode('q' + i),
	    		offset = $('.jsavgraph').offset(),
	    		offset2 = parseInt($('.jsavgraph').css('border-width'), 10);
	    	$(node.element).offset({top : parseInt(gg.nodes[i].top) + offset.top + offset2, left: parseInt(gg.nodes[i].left) + offset.left + offset2});
	    	// Make the node initial if it is the initial node.
	    	if (gg.nodes[i].i) {
	    		g.makeInitial(node);
	    	}
	    	// Add the output character, but check first to see if it's the empty string.
	    	// If so, it needs to be converted to the appropriate representation format.
	    	var outputChar = delambdafyMoore(gg.nodes[i].mooreOutput);
	    	if (!outputChar) {
	    		outputChar = emptystring;
	    	}
	    	else if ((outputChar == lambda || outputChar == epsilon) && outputChar != emptystring) {
	    		emptyString();
	    	}
	    	node.mooreOutput(outputChar);
	    	// Add the state label (if applicable) and update its position on the graph.
	    	node.stateLabel(gg.nodes[i].stateLabel);
	    	node.stateLabelPositionUpdate();
	    	// Note that Moore Machines do not have final states.
	  	}
	  	// Add the JSON edges to the graph.
	  	for (var i = 0; i < gg.edges.length; i++) {
	    	if (gg.edges[i].weight !== undefined) {
	    		// Any instances of lambda or epsilon need to be converted from HTML format to JS format.
	    		var w = delambdafy(gg.edges[i].weight);
	    		w = checkEmptyString(w);
	    		var edge = g.addEdge(g.nodes()[gg.edges[i].start], g.nodes()[gg.edges[i].end], {weight: w});
        	}
	    	else {
	    		var edge = g.addEdge(g.nodes()[gg.edges[i].start], g.nodes()[gg.edges[i].end]);
	    	}
	    	edge.layout();
	    }
	    // Set whether or not shorthand mode is enabled.
	    if (gg.shorthand) {
	    	setShorthand(true);
	    }
	    else {
	    	setShorthand(false);
	    }
	    finalize();
    };

    // Update character alphabets, display the graph, and add click handlers.
    var finalize = function() {
    	updateAlphabet();
	    updateMooreOutput();
	    jsav.displayInit();
	    g.click(nodeClickHandler);
		g.click(edgeClickHandler, {edge: true});
		$('.jsavgraph').click(graphClickHandler);
		$('.jsavedgelabel').click(labelClickHandler);
    };

    // Function to switch which empty string is being used (lambda or epsilon) if a loaded graph uses the opposite representation to what the editor is currently using.
    var checkEmptyString = function(w) {
    	var wArray = w.split("<br>");
    	// It is necessary to check every transition on the edge.
    	for (var i = 0; i < wArray.length; i++) {
    		wArray[i] = wArray[i].split(":")[0];
    		if ((wArray[i] == lambda || wArray[i] == epsilon) && wArray[i] != emptystring) {
    			emptyString();
    		}
    	}
    	return wArray.join("<br>");
    };

    // Sets click handlers for when the user clicks on the JSAV graph.
	var graphClickHandler = function(e) {
		if ($(".jsavgraph").hasClass("addNodes")) {
			// If in "Add Nodes" mode, save the graph and add a node.
			saveMooreState();
			selected = executeAddNode(g, e.pageY, e.pageX);
			selected.highlight();
			// Immediately open the custom prompt box to edit the node because the output character needs to be set.
			var Prompt = new MooreNodePrompt(createNode, cancelNode, emptystring);
			Prompt.render(selected.value(), selected.hasClass('start'), selected.stateLabel(), selected.mooreOutput());
			selected.unhighlight();
		} 
		else if ($('.jsavgraph').hasClass('moveNodes') && selected != null) {
			// If in "Move Nodes" mode, and a node has already been selected, save the graph and move the node.
			saveMooreState();
			executeMoveNode(g, selected, e.pageY, e.pageX);
			selected.unhighlight();
			selected = null;
			e.stopPropagation();
			jsav.umsg('Click a node.');
		}
	};

	// Sets click handlers for when the user clicks on a JSAV node.
	var nodeClickHandler = function(e) {	
		if ($(".jsavgraph").hasClass("editNodes")) {
			// If in "Edit Nodes" mode, open the custom prompt box to edit the selected node.
			selected = this;
			selected.highlight();
			var Prompt = new MooreNodePrompt(updateNode, doNothing, emptystring);
			Prompt.render(selected.value(), selected.hasClass('start'), selected.stateLabel(), selected.mooreOutput());
			selected.unhighlight();
		}
		else if ($(".jsavgraph").hasClass("addEdges")) {
			if (!$(".jsavgraph").hasClass("working")) {
				// If in "Add Edges" mode, and this is the first node clicked, highlight it and store a pointer to it.
				first = this;
				first.highlight();
				$('.jsavgraph').addClass("working");
				jsav.umsg('Select a node to make an edge to.');
   			}
   			else {
   				// If in "Add Edges" mode and this is the second node clicked, open the custom prompt box to add an edge between the nodes.
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
			// If in "Move Nodes" mode, selected the node as the node to be moved.
			if (selected) {
				selected.unhighlight();
			}
			selected = this;
			selected.highlight();
			jsav.umsg('Click to place node.');
			e.stopPropagation();
		}
		else if ($('.jsavgraph').hasClass('deleteNodes')) {
			// If in "Delete Nodes" mode, save the graph and delete the node.
			saveMooreState();
			executeDeleteNode(g, this);
			updateAlphabet();
			updateMooreOutput();
			checkAllEdges();
		}
	};

	// Sets click handler for when the user clicks a JSAV edge.
	var edgeClickHandler = function(e) {
		if ($('.jsavgraph').hasClass('deleteNodes')) {
			// If in "Delete Nodes" mode (which also serves to delete edges), save the graph and delete the edge.
			saveMooreState();
			executeDeleteEdge(g, this);
			updateAlphabet();
			checkAllEdges();
		}
	};

	// Sets click handler for when the user clicks a JSAV edge label.
	var labelClickHandler = function(e) {
		if ($('.jsavgraph').hasClass('editNodes')) {
			// If in "Edit Nodes" mode (which also serves to edit edges), open the custom prompt box to edit the edge.
			label = this;
			var values = $(label).html().split('<br>');
			var Prompt = new EdgePrompt(updateEdge, emptystring);
   			Prompt.render(values);
		}
	};

	// Called by the edit node custom prompt box when the user clicks "Cancel".
	// It is simply a placeholder function.
	function doNothing() {
		return;
	};

	// Called by the add node custom prompt box when the user clicks "Cancel".
	// Removes the node that was added to the graph, as well as the graph serialization that was added to the undo stack.
	function cancelNode() {
		g.removeNode(selected);
		undoStack.pop();
		if(undoStack.length == 0) {
			document.getElementById("undoButton").disabled = true;
		}
		updateMooreOutput();
	};

	// Called by the add node custom prompt box when the user clicks "OK".
	// Configures the properties of the new node on the graph.
	function createNode(initial_state, node_label, output_char) {
		executeEditMooreNode(g, selected, initial_state, node_label, output_char);
		updateMooreOutput();
	};

	// Called by the edit node custom prompt box to save the graph and update the node upon clicking "OK".
	function updateNode(initial_state, node_label, output_char) {
		saveMooreState();
		executeEditMooreNode(g, selected, initial_state, node_label, output_char);
		updateMooreOutput();
	};

	// Called by the add edge custom prompt box to save the graph and create the edge upon clicking "Done".
	function createEdge(edge_label) {
		saveMooreState();
		var edge = executeAddEdge(g, first, selected, edge_label);
		$(edge._label.element).click(labelClickHandler);
		// This new edge does need its edge label click handler to be set individually.
		updateAlphabet();
		checkEdge(edge);
	};

	// Called by the edit edge custom prompt box to save the graph and update the edge upon clicking "Done".
	function updateEdge(edge_label) {
		saveMooreState();
		executeEditEdge(g, label, edge_label);
		updateAlphabet();
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

	// Function to automatically update the input character alphabet display at the bottom of the view.
	// Called whenever a graph is loaded, an action is undone/redone, or any edges are add/edited/removed.
	var updateAlphabet = function() {
		g.updateAlphabet();
		$("#alphabet").html("" + Object.keys(g.alphabet).sort());
	};

	// Function to automatically update the output character alphabet display at the bottom of the view.
	// Called whenever a graph is loaded, an action is undone/redone, or any nodes are add/edited/removed.
	var updateMooreOutput = function() {
		var alphabet = {};
		var nodes = g.nodes();
		var w;
		for (var next = nodes.next(); next; next = nodes.next()) {
  			var letter = next.mooreOutput();
  			if (letter !== emptystring) {
  				if (!(letter in alphabet)) {
 	     			alphabet[letter] = 0;
    			}
   				alphabet[letter]++;
			}
		}
		$("#mooreOutput").html("" + Object.keys(alphabet).sort());
	};

	// Function to switch to "Add Nodes" mode.
	// Triggered by clicking the "Add Nodes" button.
	var addNodes = function() {
		removeModeClasses();
		removeND();
		$('.jsavgraph').addClass("addNodes");
		$("#mode").html('Adding nodes');
		jsav.umsg('Click to add nodes.');
	};

	// Function to switch to "Add Edges" mode.
	// Triggered by clicking the "Add Edges" button.
	var addEdges = function() {
		removeModeClasses();
		removeND();
		$(".jsavgraph").addClass("addEdges");
		$("#mode").html('Adding edges');
		jsav.umsg('Click a node.');
	};

	// Function to switch to "Move Nodes" mode.
	// Triggered by clicking the "Move Nodes" button.
	var moveNodes = function() {
		removeModeClasses();
		removeND();
		$('.jsavgraph').addClass('moveNodes');
		$("#mode").html('Moving nodes');
		jsav.umsg('Click a node.');
	};

	// Function to switch to "Edit Nodes" mode.
	// Triggered by clicking the "Edit Nodes/Edges" button.
	var editNodes = function() {
		removeModeClasses();
		removeND();
		$('.jsavgraph').addClass('editNodes');
		$("#mode").html('Editing nodes and edges');
		jsav.umsg('Click a node or edge label.');
	};

	// Function to switch to "Delete Nodes" mode.
	// Triggered by clicking the "Delete Nodes/Edges" button.
	var deleteNodes = function() {
		removeModeClasses();
		removeND();
		$('.jsavgraph').addClass('deleteNodes');
		$("#mode").html('Deleting nodes and edges');
		jsav.umsg('Click a node or edge to delete it.');
		// Expand the edges to make them easier to click.
		expandEdges();
	};

	// Disable all editing modes so that click handlers do not fire.
	// Called when the user switches editing modes, or otherwise presses a button that changes the view.
	var removeModeClasses = function() {
		// Clear all superfluous or otherwise outdated information on the page.
		$('.arrayPlace').empty();
		$('#download').html('');
		$("#mode").html('');
		jsav.umsg('');
		// Unselect and unhighlight any selected nodes or edges.
		if (first) {
			first.unhighlight();
			first = null;
		}
		if (selected) {
			selected.unhighlight();
			selected = null;
		}
		if($(".jsavgraph").hasClass("deleteNodes")) {
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
		saveMooreState();
		if(!emptyString()) {
			// If there are no empty strings on the graph, nothing was changed. Remove the saved graph from the undo stack.
			undoStack.pop();
			if(undoStack.length == 0) {
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
		var nodes = g.nodes();
		for (var next = nodes.next(); next; next = nodes.next()) {
			if (next.mooreOutput() === emptystring) {
				next.mooreOutput(greekLetter);
				graphChanged = true;
			}
		}
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
			next.g.element.removeClass('testingLambda');
		}
	};

	// Saves the graph, then reconfigures the layout automatically.
	// Triggered by clicking the "Layout" button.
	var layoutGraph = function() {
		removeModeClasses();
		removeND();
		saveMooreState();
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
			window.alert("Moore traversal requires an initial state.");
			return;
		}
		var nodes = g.nodes();
		for (var next = nodes.next(); next; next = nodes.next()) {
			if (!next.mooreOutput()) {
				window.alert("This automaton is not a Moore Machine.");
				// There is a check as to whether or not this is a Moore Machine, but this should never happen.
				return;
			}
		}
		removeND();
		if (testND()) {
			testLambda();
			window.alert("This Moore Machine is nondeterministic.\nYou cannot run input on it.");
			// The graph will refuse to run input on a nondeterministic Moore Machine.
			return;
		};
		var Prompt = new TraversePrompt(traverseInputs);
		Prompt.render();
	};

	// Traces every input string and the output string it produces on the graph and populates a JSAV array showing them.
	// They are highlighted either green or red depending on whether they were accepted or rejected.
	// Called by the traversal custom prompt box upon clicking "Traverse".
	var traverseInputs = function(inputArray) {
		var nodes = g.nodes();
		for (var next = nodes.next(); next; next = nodes.next()) {
			// Remove "current", or else it will mess with the traversal algorithms.
			next.removeClass('current');
		}
		var outputArray = [];
		var acceptArray = [];
		readyTraversal();
		for (var i = 0; i < inputArray.length; i++) {
			// Create arrays of input strings and output strings.
			var outputData = pretraverseFunction(g, inputArray[i]);
			acceptArray.push(outputData[0]);
			if (outputData[0]) {
				outputArray.push(outputData[1]);
			}
			else {
				// If rejected, display "Rejected" in bold where the output string should be.
				outputArray.push("Rejected");
			}
		}
		// Use these arrays to populate the JSAV array.
		var travArray = [];
		for (var j = 0; j < inputArray.length; j++) {
			if (!inputArray[j]) {
				inputArray[j] = emptystring;
			}
			if (!outputArray[j]) {
				outputArray[j] = emptystring;
			}
			travArray.push(inputArray[j] + "<br><b>" + outputArray[j] +"</b>");
		}
		jsavArray = jsav.ds.array(travArray, {element: $('.arrayPlace')});
		for (var k = 0; k < travArray.length; k++) {
			if(acceptArray[k]){
				// If accepted, color green.
				jsavArray.css(k, {"background-color": "green"});
			}
			else {
				// If accepted, color red.
				jsavArray.css(k, {"background-color": "red"});
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
		play(this.value(index).split("<br>")[0]);
	};

	// Function to open the graph in another window and run the input string on it.
	// Triggered by clicking on an input string in the JSAV array.
	var play = function (inputString) {
		localStorage['graph'] = serialize(g);
		localStorage['traversal'] = inputString;
		window.open("./MooreTraversal.html");
	};

	// Save the graph and switch to shorthand mode, in which sequences of input symbols on an edge are acceptable.
	// Triggered by clicking the "Enable/Disable Shorthand" button.
	function switchShorthand() {
		removeModeClasses();
		removeND();
		saveMooreState();
		setShorthand(!g.shorthand);
	};

	// Function to set whether or not shorthand mode is enabled.
	// If it is disabled, every violating egde (edges with multiple symbol transitions) are highlighted orange.
	// If any edges are highlighted orange, the "Traverse" button is disabled.
	function setShorthand (setBoolean) {
		g.setShorthand(setBoolean);
		if (g.shorthand) {
			document.getElementById("begin").disabled = false;
			document.getElementById("shorthandButton").innerHTML = "Disable Shorthand";
			// The traversal function to run needs to be changed.
			pretraverseFunction = pretraverseShorthand;
			var edges = g.edges();
			for (var next = edges.next(); next; next = edges.next()) {
				next.removeClass('testingShorthand');
			}
		}
		else {
			document.getElementById("shorthandButton").innerHTML = "Enable Shorthand";
			// The traversal function to run needs to be changed.
			pretraverseFunction = pretraverse;
			checkAllEdges();
		}
	};

	// Function to reset the size of the undo stack and the redo stack.
	// Since both of them are empty, both buttons are also disabled.
	// Called whenever the user loads a new graph.
	function resetUndoButtons () {
		document.getElementById("undoButton").disabled = true;
		document.getElementById("redoButton").disabled = true;
		undoStack = [];
		redoStack = [];
	};

	// Function to save the state of the graph and push it to the undo stack.
	// Called whenever any graph manipulation is made.
	// Note that a size restriction of 20 is imposed on both the undo stack and the redo stack.
	function saveMooreState () {
		var data = serialize(g);
		undoStack.push(data);
		redoStack = [];
		document.getElementById("undoButton").disabled = false;
		document.getElementById("redoButton").disabled = true;
		if (undoStack.length > 20) {
			undoStack.shift();
		}
	};

	// Function to undo previous action by reinitializing the graph that existed before it was performed.
	// Pushes the current graph to the redo stack and enables the redo button.
	// Triggered by clicking the "Undo" button.
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

	// Function to redo previous action by reinitializing the graph that existed after it was performed.
	// Pushes the current graph to the undo stack and, if applicable, enables the undo button.
	// Enabled by clicking the "Undo" button, and triggered by clicking the "Redo" button.
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

	// Handler for initializing graph upon loading the web page.
	// Simply initializes a default data set.
	function onLoadHandler() {
		var data = '{"nodes":[{"left":508,"top":201,"i":true,"f":false,"stateLabel":"","mooreOutput":"l"},{"left":345,"top":43,"i":false,"f":false,"stateLabel":"","mooreOutput":"a"},{"left":184,"top":357,"i":false,"f":false,"stateLabel":"","mooreOutput":"p"},{"left":815,"top":42,"i":false,"f":false,"stateLabel":"","mooreOutput":"j"},{"left":660,"top":366,"i":false,"f":false,"stateLabel":"","mooreOutput":"f"}],"edges":[{"start":0,"end":3,"weight":"a"},{"start":0,"end":1,"weight":"d"},{"start":1,"end":2,"weight":"e"},{"start":2,"end":0,"weight":"f"},{"start":3,"end":4,"weight":"b"},{"start":4,"end":0,"weight":"c"}]}';
		initialize(data);
		resetUndoButtons();
	};

	// Function to serialize the current graph to XML format.
	var serializeGraphToXML = function (graph) {
		var text = '<?xml version="1.0" encoding="UTF-8"?>';
	    text = text + "<structure>";
	    text = text + "<type>moore</type>"
	    text = text + "<automaton>"
	    var nodes = graph.nodes();
	    // Iterate over the nodes and add them all to the serialization.
	    for (var next = nodes.next(); next; next = nodes.next()) {
	    	var left = next.position().left;
		    var top = next.position().top;
		    var i = next.hasClass("start");
		    var label = next.stateLabel();
		    var output = next.mooreOutput();
		    text = text + '<state id="' + next.value().substring(1) + '" name="' + next.value() + '">';
		    text = text + '<x>' + left + '</x>';
		    text = text + '<y>' + top + '</y>';
		    if (label) {
		    	text = text + '<label>' + label + '</label>';
		    }
		    if (i) {
		    	text = text + '<initial/>';
		    }
		    if (output === emptystring) {
		    	text = text + '<output/>';
		    }
		    else {
		    	text = text + '<output>' + output + '</output>';
		    }
	    	text = text + '</state>';
	    }
	    var edges = graph.edges();
	    // Now iterate over the edges and do the same with them.
	    for (var next = edges.next(); next; next = edges.next()) {
	    	var fromNode = next.start().value().substring(1);
	    	var toNode = next.end().value().substring(1);
	    	var w = next.weight().split('<br>');
	    	var wout = next.end().mooreOutput();
	    	for (var i = 0; i < w.length; i++) {
	    		text = text + '<transition>';
	    		text = text + '<from>' + fromNode + '</from>';
	    		text = text + '<to>' + toNode + '</to>';
	    		if (w[i] === emptystring) {
	    			text = text + '<read/>';
	    		}
	    		else {
	    			text = text + '<read>' + w[i] + '</read>';
	    		}
	    		if (wout === emptystring) {
	    			text = text + '<transout/>';
	    		}
	    		else {
	    			text = text + '<transout>' + wout + '</transout>';
	    		}
	    		text = text + '</transition>';
	    	}
	    }
	    text = text + "</automaton></structure>"
	    // This XML format mimics that used by JFLAP 7, and is thus compatible with the software.
	    return text;
	};

	// Function to save the current graph as an XML file and provide a download link for it.
	// Triggered by clicking the "Save" button.
	// Note that there are some browser-specific differences in how this is handled.
	var saveXML = function () {
		removeModeClasses();
		var downloadData = "text/xml;charset=utf-8," + encodeURIComponent(serializeGraphToXML(g));
    	$('#download').html('<a href="data:' + downloadData + '" target="_blank" download="fa.xml">Download Moore</a>');
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
	    if (xmlDoc.getElementsByTagName("type")[0].childNodes[0].nodeValue !== 'moore') {
	    	// This file was created by a different automaton editor.
	    	window.alert('File does not contain a Moore Machine.');
	      	return;
	    }
	    else {
	    	if (g) {
				g.clear();
			}
			g = new jsav.ds.fa({width: '90%', height: 440, layout: "automatic"});
			var nodeMap = {};			// map node IDs to nodes
	      	var xmlStates = xmlDoc.getElementsByTagName("state");
	      	xmlStates = _.sortBy(xmlStates, function(x) { return x.id; })
	      	var xmlTrans = xmlDoc.getElementsByTagName("transition");
	      	// Iterate over the nodes and initialize them.
	      	for (var i = 0; i < xmlStates.length; i++) {
	        	var x = Number(xmlStates[i].getElementsByTagName("x")[0].childNodes[0].nodeValue);
	        	var y = Number(xmlStates[i].getElementsByTagName("y")[0].childNodes[0].nodeValue);
	        	var newNode = g.addNode({left: x, top: y});
	        	// Add the various details, including initial states, state labels, and output characters.
	        	var isInitial = xmlStates[i].getElementsByTagName("initial")[0];
	        	var isLabel = xmlStates[i].getElementsByTagName("label")[0];
	        	var isOutput = xmlStates[i].getElementsByTagName("output")[0].childNodes[0];
	        	if (isInitial) {
	        		g.makeInitial(newNode);
	        	}
	        	if (isLabel) {
	        		newNode.stateLabel(isLabel.childNodes[0].nodeValue);
	        	}
	        	if (!isOutput) {
	        		// Empty string needs to be checked for even for nodes in Moore Machines.
	        		newNode.mooreOutput(emptystring);
	        	}
	        	else {
	        		newNode.mooreOutput(isOutput.nodeValue);
	        	}
	        	nodeMap[xmlStates[i].id] = newNode;
	        	newNode.stateLabelPositionUpdate();
	        	// Note that Moore Machines do not have final states.
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

	onLoadHandler();

	// Button click handlers.
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
}(jQuery));