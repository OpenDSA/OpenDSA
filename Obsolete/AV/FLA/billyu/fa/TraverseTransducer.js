// Used by MealyEditor and MooreEditor to determine the output string, given a graph and an input string.
// This is necessary for displaying output strings in the JSAV array in the MealyEditor or MooreEditor.
var pretraverse = function (graph, inputString) {
	// Start with the initial state and an empty output string.
	var accepted = true,
	    outputString = "",
	    currentState = graph.initial;
	var traverseFunction;
	if (graph.initial.mooreOutput()) {
		// If this is a Moore Machine, employ the Moore traversal algorithm.
		traverseFunction = traverseMoore;
	}
	else {
		// Otherwise, this must be a Mealy Machine, so employ the Mealy traversal algorithm.
		traverseFunction = traverseMealy;
	}
	// Iterate over each character in the input string.
	for (var i = 0; i < inputString.length; i++) {
	   	var traverseStep = traverseFunction(graph, currentState, inputString[i]);
	   	if (traverseStep[0] == null) {
	   		// If the next state is null, the input string is rejected. Break out of the loop.
	   		accepted = false;
	   		break;
	   	}
	   	// Prepare for the next iteration of the loop.
		currentState = traverseStep[0];
		outputString += traverseStep[1];
	}
	// Return whether the input string was accepted and the output string that was generated.
	return [accepted, outputString];
};

// Used by MealyEditor and MooreEditor. This function can traverse over edges with sequences of input symbols on them.
// This is used instead of pretraverse if "Shorthand" mode is enabled in the MealyEditor or MooreEditor.
var pretraverseShorthand = function (graph, inputString) {
	// Start with the initial state and an empty output string.
	var accepted = true,
		outputString = "",
		currentState = graph.initial,
		currentEdge = null;
		edgeWeight = null,
		edgeProgress = null;
	var traverseFunction;
	if (graph.initial.mooreOutput()) {
		// If this is a Moore Machine, employ the Moore traversal algorithm.
		traverseFunction = traverseMoore;
	}
	else {
		// Otherwise, this must be a Mealy Machine, so employ the Mealy traversal algorithm.
		traverseFunction = traverseMealy;
	}
	// Iterate over each character in the input string.
	for (var i = 0; i < inputString.length; i++) {
	   	var traverseStep = traverseShorthand(graph, currentState, currentEdge, edgeWeight, edgeProgress, inputString[i]);
	   	var nextState = traverseStep[0];
	   	var nextEdge = traverseStep[1];
	   	if (nextState == null) {
	   		if (nextEdge == null) {
	   			// If the next state and next edge are both null, the input string is rejected. Break out of the loop.
	   			accepted = false;
	   			break;
	   		}
	   		else {
	   			// If the next state is null but the next edge is not, we are in the middle of the edge.
	   			// Update which edge transition we are on and which character in that edge transition we are on.
	   			edgeWeight = traverseStep[2];
	   			edgeProgress = traverseStep[3];
	   		}
	   	}
	   	// Prepare for the next iteration of the loop.
		currentState = nextState;
		currentEdge = nextEdge;
		outputString += traverseStep[4];
	}
	// If the input string was accepted and we finished in the middle of an edge, we need to un-select the edge.
	if (currentEdge && accepted) {
		currentEdge.removeClass('edgeSelect');
		var wArray = currentEdge.weight().split('<br>');
		var w = wArray[edgeWeight];
		var pos = edgeProgress;
		// Un-bold the bolded character in the edge.
		w = w.substr(0, pos - 3) + w[pos] + w.substr(pos + 5);
		wArray[edgeWeight] = w;
		// Update the edge weight to contain no bolded characters.
		currentEdge.weight(wArray.join("<br>"));
	}
	// Return whether the input string was accepted and the output string that was generated.
	return [accepted, outputString];
};

// Used by pretraverse and by MealyTraversal.js.
// Calculates the next state traversed to and the output character, given a graph, current state, and input symbol.
var traverseMealy = function(graph, currentState, letter) {
	// We need to be prepared to encounter the empty string as a potential output character.
	var lambda = String.fromCharCode(955),
		epsilon = String.fromCharCode(949),
	    nextState = null,
	    outputChar = "",
	    successors = currentState.neighbors();
	// Iterate over every state reachable from the current state.
	for (var next = successors.next(); next; next = successors.next()) {
		var weights = graph.getEdge(currentState, next).weight().split('<br>');
		// Iterate over every edge weight between the current state and the next state.
		for (var j = 0; j < weights.length; j++) {
			var weight = weights[j].split(":");
			var inputChar = weight[0];
			// If the edge weight input character matches the current input symbol, mark the next state as the next state.
			// Also add the output character to the output string unless the output character is the empty string (lambda or epsilon).
			if (letter == inputChar) {
				nextState = next;
				if (weight[1] != lambda && weight[1] != epsilon) {
					outputChar = weight[1];
				}
			}
		}
	}
	// Return the next state (null if none were found) and the output character.
	return [nextState, outputChar];
};

// Used by pretraverseShorthand and by MealyTraversal.js.
// Calculates the next state or edge traversed to and the output character, given a graph, current state or edge (and position in that edge transition), and input symbol.
// This is used instead of traverse if "Shorthand" mode is enabled in the MealyEditor.
var traverseMealyShorthand = function(graph, currentState, currentEdge, edgeWeight, edgeProgress, letter) {
	// We need to be prepared to encounter the empty string as a potential output character.
	var lambda = String.fromCharCode(955),
		epsilon = String.fromCharCode(949),
		nextState = null;
		nextEdge = null;
		eWeight = null,
		eProgress = null,
		outputChar = "";
	// If we are currently on an edge (i.e. if currentEdge is not null)...
	if (currentEdge) {
		// Isolate which edge transition we're on and which character of that edge transition we're on.
		var wArray = currentEdge.weight().split('<br>');
		var w = wArray[edgeWeight];
		var pos = edgeProgress;
		// Note that the character is currently bolded (e.g. "tra<b>n</b>si:tion"). We want to unbold the current character.
		w = w.substr(0, pos - 3) + w[pos] + w.substr(pos + 5);
		// This causes the index of the current character to decrease by 3.
		pos = pos - 3;
		// Update the array of edge transitions to contain this un-bolded version of the transition.
		wArray[edgeWeight] = w;
		// If the next letter of the edge transition matches the input symbol...
		if (letter == w[pos + 1]) {
			pos = pos + 1;
			if (w[pos + 1] == ":") {
				// If the next letter is the last letter of the edge transition's input symbols, we have made it to the next state.
				// The next state is the state at the end of this edge.
				nextState = currentEdge.end();
				outputChar = w.split(":")[1];
				// The output character is whatever output symbols are on this edge. If it's lambda or epsilon, the output character is the empty string.
				if (outputChar == lambda || outputChar == epsilon) {
					outputChar = "";
				}
			}
			else {
				// If we are still in the middle of the edge transition, note the edge, the edge transition, and the new position in the edge transition.
				nextEdge = currentEdge;
				eWeight = edgeWeight;
				// We now want to bold the next character in the position. That involves changing the string and shifting the index we are currently on by 3.
				w = w.substr(0, pos) + "<b>" + w[pos] + "</b>" + w.substr(pos + 1);
				pos = pos + 3;
				eProgress = pos;
				// Update the array of edge transitions to contain this bolded version of the transition.
				wArray[edgeWeight] = w;
			}
		}
		// The transition label of the edge needs to be updated, since characters within it have been altered with additions and removals of "<b>" and "</b>".
		currentEdge.weight(wArray.join("<br>"));
		if(currentEdge.weight().indexOf('<b>') == -1) {
			// The edge itself may still be bolded. If none of the characters in the edge are bolded anymore, un-bold the edge.
			currentEdge.removeClass('edgeSelect');
		}
	}
	// Otherwise, if we are currently on a node (i.e. if currentState is not null)...
	// (Note that at any time, either currentState or currentEdge should be null, but never both.)
	else if (currentState) {
		var successors = currentState.neighbors();
		// Iterate over every state reachable from the current state.
		for (var next = successors.next(); next; next = successors.next()) {
			var edge = graph.getEdge(currentState, next);
			var weights = edge.weight().split('<br>');
			// Iterate over every edge weight between the current state and the next state.
			for (var j = 0; j < weights.length; j++) {
				var inputChar = weights[j].split(":")[0];
				if (inputChar.length > 1) {
					// If the edge weight is more than one character long and matches the input symbol, mark the edge as the next edge.
					if (letter == inputChar[0]) {
						edge.addClass('edgeSelect');
						// Bold the first character in the edge transition.
						var bold = "<b>" + letter + "</b>" + weights[j].substr(1);
						weights[j] = bold;
						edge.weight(weights.join("<br>"));
						nextEdge = edge;
						// Also note which edge transition is being traversed on and the current position in the edge transition.
						// In this case, that current position is index 3, since indices 0-2 are taken up by "<b>".
						eWeight = j;
						eProgress = 3;
					}
				}
				else {
					// If the edge weight is one character long and matches the input symbol, mark the next state.
					if (letter == inputChar) {
						nextState = next;
						outputChar = weights[j].split(":")[1];
						// The output character is whatever output symbols are on the edge. If it's lambda or epsilon, the output character is the empty string.
						if (outputChar == lambda || outputChar == epsilon) {
							outputChar = "";
						}
					}
				}
			}
		}
	}
	// Return the next state or next edge (as well as the edge transition and position in the edge transition), along with the output character.
	return [nextState, nextEdge, eWeight, eProgress, outputChar];
};

// Used by pretraverse and by MooreTraversal.js.
// Calculates the next state traversed to and the output character, given a graph, current state, and input symbol.
var traverseMoore = function(graph, currentState, letter) {
	// We need to be prepared to encounter the empty string as a potential output character.
	var lambda = String.fromCharCode(955),
		epsilon = String.fromCharCode(949),
	    nextState = null,
	    outputChar = "",
	    successors = currentState.neighbors();
	// Iterate over every state reachable from the current state.
	for (var next = successors.next(); next; next = successors.next()) {
		var weights = graph.getEdge(currentState, next).weight().split('<br>');
		// Iterate over every edge weight between the current state and the next state.
		for (var j = 0; j < weights.length; j++) {
			// If the edge weight matches the current input symbol, mark the next state as the next state.
			// Also add the output character to the output string unless the output character is the empty string (lambda or epsilon).
			if (letter == weights[j]) {
				nextState = next;
				// Note that since this is a Moore Machine, the output character is on the next state.
				if (next.mooreOutput() != lambda && next.mooreOutput() != epsilon) {
					outputChar = next.mooreOutput();
				}
			}
		}
	}
	// Return the next state (null if none were found) and the output character.
	return [nextState, outputChar];
};

// Used by pretraverseShorthand and by MooreTraversal.js.
// Calculates the next state or edge traversed to and the output character, given a graph, current state or edge (and position in that edge transition), and input symbol.
// This is used instead of traverse if "Shorthand" mode is enabled in the MooreEditor.
var traverseMooreShorthand = function(graph, currentState, currentEdge, edgeWeight, edgeProgress, letter) {
	// We need to be prepared to encounter the empty string as a potential output character.
	var lambda = String.fromCharCode(955),
		epsilon = String.fromCharCode(949),
		nextState = null;
		nextEdge = null;
		eWeight = null,
		eProgress = null,
		outputChar = "";
	// If we are currently on an edge (i.e. if currentEdge is not null)...
	if (currentEdge) {
		// Isolate which edge transition we're on and which character of that edge transition we're on.
		var wArray = currentEdge.weight().split('<br>');
		var w = wArray[edgeWeight];
		var pos = edgeProgress;
		// Note that the character is currently bolded (e.g. "tra<b>n</b>si:tion"). We want to unbold the current character.
		w = w.substr(0, pos - 3) + w[pos] + w.substr(pos + 5);
		// This causes the index of the current character to decrease by 3.
		pos = pos - 3;
		// Update the array of edge transitions to contain this un-bolded version of the transition.
		wArray[edgeWeight] = w;
		// If the next letter of the edge transition matches the input symbol...
		if (letter == w[pos + 1]) {
			pos = pos + 1;
			if (w.length == pos + 1) {
				// If the next letter is the last letter of the edge transition, we have made it to the next state.
				// The next state is the state at the end of this edge.
				nextState = currentEdge.end();
				// The output character is whatever output symbols are on the next state. If it's lambda or epsilon, the output character is the empty string.
				if (nextState.mooreOutput() != lambda && nextState.mooreOutput() != epsilon) {
					outputChar = nextState.mooreOutput();
				}
			}
			else {
				// If we are still in the middle of the edge transition, note the edge, the edge transition, and the new position in the edge transition.
				nextEdge = currentEdge;
				eWeight = edgeWeight;
				// We now want to bold the next character in the position. That involves changing the string and shifting the index we are currently on by 3.
				w = w.substr(0, pos) + "<b>" + w[pos] + "</b>" + w.substr(pos + 1);
				pos = pos + 3;
				eProgress = pos;
				// Update the array of edge transitions to contain this bolded version of the transition.
				wArray[edgeWeight] = w;
			}
		}
		// The transition label of the edge needs to be updated, since characters within it have been altered with additions and removals of "<b>" and "</b>".
		currentEdge.weight(wArray.join("<br>"));
		if(currentEdge.weight().indexOf('<b>') == -1) {
			// The edge itself may still be bolded. If none of the characters in the edge are bolded anymore, un-bold the edge.
			currentEdge.removeClass('edgeSelect');
		}
	}
	// Otherwise, if we are currently on a node (i.e. if currentState is not null)...
	// (Note that at any time, either currentState or currentEdge should be null, but never both.)
	else if (currentState) {
		var successors = currentState.neighbors();
		// Iterate over every state reachable from the current state.
		for (var next = successors.next(); next; next = successors.next()) {
			var edge = graph.getEdge(currentState, next);
			var weights = edge.weight().split('<br>');
			// Iterate over every edge weight between the current state and the next state.
			for (var j = 0; j < weights.length; j++) {
				if (weights[j].length > 1) {
					// If the edge weight is more than one character long and matches the input symbol, mark the edge as the next edge.
					if (letter == weights[j][0]) {
						edge.addClass('edgeSelect');
						// Bold the first character in the edge transition.
						var bold = "<b>" + letter + "</b>" + weights[j].substr(1);
						weights[j] = bold;
						edge.weight(weights.join("<br>"));
						nextEdge = edge;
						// Also note which edge transition is being traversed on and the current position in the edge transition.
						// In this case, that current position is index 3, since indices 0-2 are taken up by "<b>".
						eWeight = j;
						eProgress = 3;
					}
				}
				else {
					// If the edge weight is one character long and matches the input symbol, mark the next state.
					if (letter == weights[j]) {
						nextState = next;
						// The output character is whatever output symbols are on the next state. If it's lambda or epsilon, the output character is the empty string.
						if (next.mooreOutput() != lambda && next.mooreOutput() != epsilon) {
							outputChar = next.mooreOutput();
						}
					}
				}
			}
		}
	}
	// Return the next state or next edge (as well as the edge transition and position in the edge transition), along with the output character.
	return [nextState, nextEdge, eWeight, eProgress, outputChar];
};