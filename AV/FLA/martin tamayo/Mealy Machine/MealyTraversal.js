(function ($) {
	var jsav = new JSAV("av"), // variable to store the JSAV algorithm animation
		arr, // variable to store the JSAV array
		g, // variable to store the JSAV graph
		lambda = String.fromCharCode(955), // lambda empty string representation
		epsilon = String.fromCharCode(949); // epsilon empty string representation

	// Initializes a new graph and runs a traversal input. Called whenever the page is loaded.
	var initialize = function() {
		g = localStorage['graph']; // The graph was saved to local storage by the MealyEditor.
		if (!g) {
			jsav.umsg("Error!");
			return;
		}
		var traversal = localStorage['traversal']; // The input string was saved to local storage by the MealyEditor.
		var runFunction = initGraph({layout: "automatic"}); // Run function may or may not have shorthand enabled.
		$('.jsavcontrols').show();
		if (traversal != lambda && traversal != epsilon) {
			runFunction(traversal); // Traverse.
		}
		else {
			runFunction(""); // If the input string is lambda or epsilon, traverse on the empty string.
		}
	};

	// Function to create a graph out of a serialized representation.
	var initGraph = function(opts) {
		var gg = jQuery.parseJSON(g);
		var graph = jsav.ds.fa($.extend({width: '90%', height: 440}, opts));
		// For each node in the JSON, initialize it on the graph.
		for (var i = 0; i < gg.nodes.length; i++) {
	    	var node = graph.addNode('q' + i),
	    		offset = $('.jsavgraph').offset(),
	    		offset2 = parseInt($('.jsavgraph').css('border-width'), 10);
	    	$(node.element).offset({top : parseInt(gg.nodes[i].top) + offset.top + offset2, left: parseInt(gg.nodes[i].left) + offset.left + offset2});
	    	if (gg.nodes[i].i) {
	    		graph.makeInitial(node);
	    	}
	    	// If the node has a state label, it needs to be positioned correctly.
	    	node.stateLabel(gg.nodes[i].stateLabel);
	    	node.stateLabelPositionUpdate();
	  	}
	  	// For each edge in the JSON, initialize it on the graph.
	  	for (var i = 0; i < gg.edges.length; i++) {
	    	if (gg.edges[i].weight !== undefined) {
	    		// Transitions with empty string characters are saved differently in JSON than they are on the graph.
	    		var w = delambdafy(gg.edges[i].weight);
	    		var edge = graph.addEdge(graph.nodes()[gg.edges[i].start], graph.nodes()[gg.edges[i].end], {weight: w});
        	}
	    	else {
	    		var edge = graph.addEdge(graph.nodes()[gg.edges[i].start], graph.nodes()[gg.edges[i].end]);
	    	}
	    	// The layout of the edge needs to be explicitly handled.
	    	edge.layout();
	    }
	    g = graph;
	    // If shorthand is noted as enabled in the JSON, make a note to run the shorthand version of the traversal algorithm.
	    if (gg.shorthand) {
	    	return runShorthand;
	    }
	    return run;
    };
    
    // Creates the slideshow for the input string traversal on the graph. Called at the end of the initialize function.
	var run = function(inputString) {
		// Display the output string in large font in the center of the screen.
		// Start with the initial state and an empty output string.
		$('.jsavoutput').css({"text-align": "center", 'font-size': '2em'});
		g.initial.addClass('current');
		var accepted = true;
		var outputString = "";
		var currentState = g.initial;
		
		// Create an array of characters in the input string.
		var textArray = [];
		for (var i = 0; i < inputString.length; i++) {
			textArray.push(inputString[i]);
		}
		// Use this array to initialize the JSAV array.
		arr = jsav.ds.array(textArray, {element: $('.arrayPlace')});
		jsav.displayInit();

		// Used to track which index in the input string the traversal fails on (if it does), and therefore which indices in the JSAV array to color red.
		var failingIndex = inputString.length - 1;
		var finalIndex = inputString.length - 1;
		if (!inputString) {
			finalIndex = 0;
		}

		// Iterate over each character in the input string.
		for (var i = 0; i < inputString.length; i++) {
			currentState.removeClass('current');
			// Run traversal step to find next state and output character.
		   	var traverseStep = traverseMealy(g, currentState, inputString[i]);
		   	if (traverseStep[0] == null) {
		   		// If no next state was found, the input string was rejected. Update CSS of JSAV graph and array.
		   		currentState.addClass('rejected');
		   		accepted = false;
		   		arr.css(i, {"background-color": "red"});
		   		// Add a step to the slideshow and break out of the loop.
		   		jsav.step();
		   		break;
		   	}
			// Prepare for the next iteration of the loop. Update the current character in the JSAV array and add a step to the slideshow.
			currentState = traverseStep[0];
			outputString += traverseStep[1];
			currentState.addClass('current');
			arr.css(i, {"background-color": "yellow"});
			jsav.umsg(outputString);
			jsav.step();
		}

		if (accepted) {
			// If the input string was accepted, color every character in the JSAV array green.
			for (var l = 0; l < inputString.length; l++) {
				arr.css(l, {"background-color": "green"});
			}
			currentState.addClass('accepted');
			// If the output string is empty, display "Accepted" in bold where it would have been displayed.
			if (!outputString) {
				jsav.umsg("<b>Accepted</b>");
			}
		}

		else {
			// If the input string was rejected, color every character in the JSAV array red.
			for (var l = 0; l < inputString.length; l++) {
				arr.css(l, {"background-color": "red"});
			}
			// Replace the output string with "Rejected" in bold.
			jsav.umsg("<b>Rejected</b>");
		}

		// Add the last step to the slideshow, stop recording the slideshow, and add the click handler to the JSAV array.
		jsav.step();
		jsav.recorded();
		arr.click(arrayClickHandler);
	};

	// Creates the slideshow for the input string traversal on the graph. Called at the end of the initialize function.
	// Used instead of "run" if shorthand mode is enabled for the graph we are traversing on.
	var runShorthand = function (inputString) {
		// Display the output string in large font in the center of the screen.
		// Start with the initial state and an empty output string. Declare variables to store current edge information.
		$('.jsavoutput').css({"text-align": "center", 'font-size': '2em'});
		g.initial.addClass('current');
		var accepted = true,
			outputString = "",
			currentState = g.initial,
			currentEdge = null;
			edgeWeight = null,
			edgeProgress = null;

		// Create an array of characters in the input string.
		var textArray = [];
		for (var i = 0; i < inputString.length; i++) {
			textArray.push(inputString[i]);
		}
		// Use this array to initialize the JSAV array.
		arr = jsav.ds.array(textArray, {element: $('.arrayPlace')});
		jsav.displayInit();

		// Iterate over each character in the input string.
		for (var i = 0; i < inputString.length; i++) {
			if (currentState) {
				currentState.removeClass('current');
			}
			// Run traversal step to find next state (or next edge) and output character.
		   	var traverseStep = traverseMealyShorthand(g, currentState, currentEdge, edgeWeight, edgeProgress, inputString[i]);
		   	var nextState = traverseStep[0];
		   	var nextEdge = traverseStep[1];
		   	if (nextState == null) {
		   		// If no next state was found...
		   		if (nextEdge == null) {
		   			// If no next edge was found either, the input string was rejected. Update CSS of JSAV graph and array.
		   			if (currentState) {
		   				currentState.addClass('rejected');
		   			}
		   			accepted = false;
		   			arr.css(i, {"background-color": "red"});
		   			// Add a step to the slideshow and break out of the loop.
		   			jsav.step();
		   			break;
		   		}
		   		else {
		   			// A next edge was found. Note which edge transition we are on and which symbol in that edge transition we are on.
		   			edgeWeight = traverseStep[2];
		   			edgeProgress = traverseStep[3];
		   		}
		   	}
		   	// Prepare for the next iteration of the loop. Update the current character in the JSAV array and add a step to the slideshow.
			currentState = nextState;
			currentEdge = nextEdge;
			outputString += traverseStep[4];
			if (currentState) {
				currentState.addClass('current');
			}
			arr.css(i, {"background-color": "yellow"});
			jsav.umsg(outputString);
			jsav.step();
		}
		
		if (accepted) {
			// If the input string was accepted, color every character in the JSAV array green.
			for (var l = 0; l < inputString.length; l++) {
				arr.css(l, {"background-color": "green"});
			}
			if (currentState) {
				// Note that there may or may not be a current state. We need to check.
				currentState.addClass('accepted');
			}
			// If the output string is empty, display "Accepted" in bold where it would have been displayed.
			if (!outputString) {
				jsav.umsg("<b>Accepted</b>");
			}
		}

		else {
			// If the input string was rejected, color every character in the JSAV array red.
			for (var l = 0; l < inputString.length; l++) {
				arr.css(l, {"background-color": "red"});
			}
			// Replace the output string with "Rejected" in bold.
			jsav.umsg("<b>Rejected</b>");
		}

		// Add the last step to the slideshow, stop recording the slideshow, and add the click handler to the JSAV array.
		jsav.step();
		jsav.recorded();
		arr.click(arrayClickHandler);
	};

	// Function to handle click events on the JSAV array (take you to the corresponding step in the traversal).
	function arrayClickHandler(index) {
		// Temporarily turn off animation (if it was on).
		var oldFx = $.fx.off || false;
    	$.fx.off = true;
    	// If the step clicked on comes after the current step, increment until you reach that step.
    	if (index > jsav.currentStep() - 1) {
    		while (index > jsav.currentStep() - 1 && jsav._redo.length) {
				jsav.forward();
			}
    	}
    	// If the step clicked on comes before the current step, decrement until you reach that step.
    	if (index < jsav.currentStep() - 1) {
    		while (index < jsav.currentStep() - 1 && jsav._undo.length) {
				jsav.backward();
			}
    	}
    	// If animation was originally on, turn it back on again now.
		$.fx.off = oldFx;
	};

	initialize();
}(jQuery));