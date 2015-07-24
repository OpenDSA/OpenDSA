(function ($) {
	var jsav = new JSAV("av"), // variable to store the JSAV algorithm animation
		arr, // variable to store the JSAV array
		g, // variable to store the JSAV graph
		lambda = String.fromCharCode(955), // lambda empty string representation
		epsilon = String.fromCharCode(949); // epsilon empty string representation

	// Initializes a new graph and runs a traversal input. Called whenever the page is loaded.
	var initialize = function() {
		g = localStorage['graph']; // The graph was saved to local storage by the FAEditor.
		if (!g) {
			jsav.umsg("Error!");
			return;
		}
		var traversal = localStorage['traversal']; // The input string was saved to local storage by the FAEditor.
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
	    	if (gg.nodes[i].f) {
	    		node.addClass("final");
	    	}
	    	// If the node has a state label, it needs to be positioned correctly.
	    	node.stateLabel(gg.nodes[i].stateLabel);
	    	node.stateLabelPositionUpdate();
	  	}
	  	// For each edge in the JSON, initialize it on the graph.
	  	for (var i = 0; i < gg.edges.length; i++) {
	    	if (gg.edges[i].weight !== undefined) {
	    		// Transitions on the empty string are saved differently in JSON than they are on the graph.
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
		// Start with the closure of the initial state.
		g.initial.addClass('current');
		var currentStates = [g.initial];
		currentStates = addLambdaClosure(g, currentStates);
		var nextStates = currentStates;
		
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
			// "Current" is used to mark states as visited, so start by removing "Current" from every node.
			for (var j = 0; j < currentStates.length; j++) {
		   		currentStates[j].removeClass('current');
		   	}
		   	// Run traversal step to find next states.
		   	nextStates = traverse(g, currentStates, inputString[i]);
		   	if (nextStates.length == 0) {
		   		// If there are no next states, the input string was rejected. Update CSS of JSAV graph and array.
		   		for (var k = 0; k < currentStates.length; k++) {
		   			currentStates[k].addClass('rejected');
		   		}
		   		arr.css(i, {"background-color": "red"});
		   		// Add a step to the slideshow and break out of the loop.
		   		jsav.step();
		   		break;
		   	}
		   	// Prepare for the next iteration of the loop. Update the current character in the JSAV array and add a step to the slideshow.
			currentStates = nextStates;
			arr.css(i, {"background-color": "yellow"});
			jsav.step();
		}

		var rejected = true;
		for (var k = 0; k < currentStates.length; k++) {
			// If we finished on a final state, the input string was accepted (unless we didn't make it to the end of the input string).
			if (currentStates[k].hasClass('final') && nextStates.length > 0) {
				// If there are no next states, it means the break statement in line 128 was triggered. Otherwise, we know we made it to the end of the input string.
				currentStates[k].addClass('accepted');
				rejected = false;
			}
		}

		if (rejected) {
			// If the input string was rejected, color every character in the JSAV array red.
			for (var l = 0; l < inputString.length; l++) {
				arr.css(l, {"background-color": "red"});
			}
			jsav.umsg("Rejected");
		}

		else {
			// If the input string was accepted, color every character in the JSAV array green.
			for (var l = 0; l < inputString.length; l++) {
				arr.css(l, {"background-color": "green"});
			}
			jsav.umsg("Accepted");
		}

		// If the input string was rejected, label every current node as rejected.
		var nodes = g.nodes();
		for (var next = nodes.next(); next; next = nodes.next()) {
			if (next.hasClass('current') && rejected) {
				next.addClass('rejected');
			}
			next.removeClass('current');
		}

		// Add the last step to the slideshow, stop recording the slideshow, and add the click handler to the JSAV array.
		jsav.step();
		jsav.recorded();
		arr.click(arrayClickHandler);
	};

	// Creates the slideshow for the input string traversal on the graph. Called at the end of the initialize function.
	// Used instead of "run" if shorthand mode is enabled for the graph we are traversing on.
	var runShorthand = function(inputString) {
		// Start with the closure of the initial state and an empty array of edges.
		g.initial.addClass('current');
		var currentStates = [g.initial];
		currentStates = addLambdaClosure(g, currentStates);
		var currentEdges = [];
		var edgeWeight = [];
		var edgeProgress = [];
		var nextStates = currentStates;
		var nextEdges = currentEdges;
		
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
			// "Current" is used to mark states as visited, so start by removing "Current" from every node.
			for (var j = 0; j < currentStates.length; j++) {
		   		currentStates[j].removeClass('current');
		   	}
		   	// Run traversal step to find next states and next edges.
		   	var traverseStep = traverseShorthand(g, currentStates, currentEdges, edgeWeight, edgeProgress, inputString[i]);
	   		nextStates = traverseStep[0];
	   		nextEdges = traverseStep[1];
		   	if (nextStates.length == 0 && nextEdges.length == 0) {
		   		// If there are no next states or next edges, the input string was rejected. Update CSS of JSAV graph and array.
		   		for (var k = 0; k < currentStates.length; k++) {
		   			currentStates[k].addClass('rejected');
		   		}
		   		arr.css(i, {"background-color": "red"});
		   		// Add a step to the slideshow and break out of the loop.
		   		jsav.step();
		   		break;
		   	}
		   	// Prepare for the next iteration of the loop. Update the current character in the JSAV array and add a step to the slideshow.
			currentStates = nextStates;
			currentEdges = nextEdges;
			edgeWeight = traverseStep[2];
			edgeProgress = traverseStep[3];
			arr.css(i, {"background-color": "yellow"});
			jsav.step();
		}

		var rejected = true;
		for (var k = 0; k < currentStates.length; k++) {
			// If we finished on a final state, the input string was accepted (unless we didn't make it to the end of the input string).
			if (currentStates[k].hasClass('final') && nextStates.length > 0) {
				// If there are no next states, either we finished in the middle of edges, or the break statement in line 217 was triggered.
				currentStates[k].addClass('accepted');
				rejected = false;
			}
		}
		
		if (rejected) {
			// If the input string was rejected, color every character in the JSAV array red.
			for (var l = 0; l < inputString.length; l++) {
				arr.css(l, {"background-color": "red"});
			}
			jsav.umsg("Rejected");
		}

		else {
			// If the input string was accepted, color every character in the JSAV array green.
			for (var l = 0; l < inputString.length; l++) {
				arr.css(l, {"background-color": "green"});
			}
			jsav.umsg("Accepted");
		}

		// If the input string was rejected, label every current node as rejected.
		var nodes = g.nodes();
		for (var next = nodes.next(); next; next = nodes.next()) {
			if (next.hasClass('current') && rejected) {
				next.addClass('rejected');
			}
			next.removeClass('current');
		}

		// Un-bold all of the edges and edge transitions.
		var edges = g.edges();
		for (var next = edges.next(); next; next = edges.next()) {
			next.removeClass('edgeSelect');
		   	var w = next.weight().split("<b>");
		   	var unbold = w.join("");
		   	w = unbold.split("</b>");
		   	unbold = w.join("");
		   	next.weight(unbold);
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