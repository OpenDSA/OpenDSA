// Used by FAEditor to determine if the given graph will accept the given input string.
// This is necessary to determine whether the strings should be displayed in red or green in the JSAV array.
var willReject = function (graph, inputString) {
	// Start with the closure of the initial state.
	var currentStates = [graph.initial];
	currentStates = addLambdaClosure(graph, currentStates);
	var nextStates = currentStates;
	// Iterate over each character in the input string.
	for (var i = 0; i < inputString.length; i++) {
		for (var j = 0; j < currentStates.length; j++) {
			// Current is used to track which states have already been visited in each iteration of the loop. At the beginning of the loop, remove "current" from every state.
	   		currentStates[j].removeClass('current');
	   	}
	   	// Call traverse function.
	   	nextStates = traverse(graph, currentStates, inputString[i]);
	   	if (nextStates.length == 0) {
	   		// If there are no next states, the graph has rejected the input string. Break out of the loop.
	   		break;
	   	}
	   	// Prepare for next iteration of the loop.
		currentStates = nextStates;
	}
	var rejected = true;
	// Check to see if any of the states we have finished on are final states.
	for (var k = 0; k < currentStates.length; k++) {
		currentStates[k].removeClass('current');
		if (currentStates[k].hasClass('final') && nextStates.length > 0) {
			// Note that if the length of nextStates is zero, it means the break statement in Line 18 was triggered. We never reached the end of the input string, so the input was rejected and this if statement does not run.
			rejected = false;
		}
	}
	// Return a boolean indicating whether or not the input string was rejected.
	return rejected;
};

// Used by the FAEditor. This function can traverse over edges with sequences of input symbols on them.
// This is used instead of willReject if "Shorthand" mode is enabled in the FAEditor.
var willRejectShorthand = function (graph, inputString) {
	// Start with the closure of the initial state and with no edges selected.
	var currentStates = [graph.initial];
	currentStates = addLambdaClosure(graph, currentStates);
	var currentEdges = [];
	var edgeWeight = []; // edgeWeight[i] is the index of the string in currentEdges[i].split("<br>") that the traversal is currently situated on.
	var edgeProgress = []; // edgeProgress[i] is the index of the character of the string in currentEdges[i].split("<br>")[edgeWeight[i]] that the traversal is currently situated on.
	var nextStates = currentStates;
	var nextEdges = currentEdges;
	// Iterate over each character in the input string.
	for (var i = 0; i < inputString.length; i++) {
		for (var j = 0; j < currentStates.length; j++) {
			// Current is used to track which states have already been visited in each iteration of the loop. At the beginning of the loop, remove "current" from every state.
	   		currentStates[j].removeClass('current');
	   	}
	   	// Call pretraverse function (this avoids unnecessarily bolding edge weights in the FAEditor).
	   	var traverseStep = pretraverseShorthand(graph, currentStates, currentEdges, edgeWeight, edgeProgress, inputString[i]);
	   	nextStates = traverseStep[0];
	   	nextEdges = traverseStep[1];
	   	if (nextStates.length == 0 && nextEdges.length == 0) {
	   		// If there are no next states or next edges, the graph has rejected the input string. Break out of the loop.
	   		break;
	   	}
	   	// Prepare for next iteration of the loop.
		currentStates = nextStates;
		currentEdges = nextEdges;
		edgeWeight = traverseStep[2];
		edgeProgress = traverseStep[3];
	}
	var rejected = true;
	// Check to see if any of the states we have finished on are final states. (If we finished only in the middle of edges, this loop doesn't run and the input string is rejected - obviously, since we are not on any final state.)
	for (var k = 0; k < currentStates.length; k++) {
		currentStates[k].removeClass('current');
		if (currentStates[k].hasClass('final') && nextStates.length > 0) {
			// Note that if the length of nextStates is zero, it means the break statement in Line 59 was triggered. We never reached the end of the input string, so the input was rejected and this if statement does not run.
			rejected = false;
		}
	}
	// Return a boolean indicating whether or not the input string was rejected.
	return rejected;
};

// Used by willReject function and by FATraversal.js.
// Calculates the next states traversed to given a graph, an array of current states, and a single input symbol.
var traverse = function(graph, currentStates, letter) {
	var nextStates = [];
	// Iterate over current states.
	for (var i = 0; i < currentStates.length; i++) {
		var successors = currentStates[i].neighbors();
		// Iterate over every reachable state from the current state.
		for (var next = successors.next(); next; next = successors.next()) {
			var weight = graph.getEdge(currentStates[i], next).weight().split('<br>');
			// Iterate over every edge weight between the current state and the next state.
			for (var j = 0; j < weight.length; j++) {
				// If the edge weight matches the input symbol and the next state is not already accounted for (possible, if we already reached it from another current state), mark it as a next state.
				if (letter == weight[j] && !next.hasClass('current')) {
					next.addClass('current');
					nextStates.push(next);
				}
			}
		}
	}
	// For each of the next states, add its closure (i.e. every state it can reach on a lambda transition). Then return this list of states.
	nextStates = addLambdaClosure(graph, nextStates);
	return nextStates;
};

// Used by willRejectShorthand function to traverse the graph without affecting the CSS styles of the edges in the FAEditor.
// Calculates the next states and edges traversed to given a graph, input symbols, and four arrays containing information on current states and edges.
// This is used instead of traverse if "Shorthand" mode is enabled in the FAEditor.
var pretraverseShorthand = function(graph, currentStates, currentEdges, edgeWeight, edgeProgress, letter) {
	var nextStates = [];
	var nextEdges = [];
	var eWeight = []; // eWeight[i] is the index of the string in nextEdges[i].split("<br>") that the traversal is progressing to.
	var eProgress = []; // eProgress[i] is the index of the character of the string in nextEdges[i].split("<br>")[eWeight[i]] that the traversal is progressing to.
	// Iterate over the current edges.
	for (var g = 0; g < currentEdges.length; g++) {
		// Isolate which edge transition we're on and which character of that edge transition we're on.
		var curEdge = currentEdges[g];
		var wArray = curEdge.weight().split('<br>');
		var w = wArray[edgeWeight[g]];
		var pos = edgeProgress[g];
		// If the next letter of the edge transition matches the input symbol...
		if (letter == w[pos + 1]) {
			pos = pos + 1;
			if (w.length == pos + 1) {
				// If the next letter is the last letter of the edge transition, we have made it to the next state.
				// Add the state at the end of this edge to the current states if it's currently unaccounted for.
				if (!curEdge.end().hasClass('current')) {
					curEdge.end().addClass('current');
					nextStates.push(curEdge.end());
				}
			}
			else {
				// If we are still in the middle of the edge transition, note the edge, the edge transition, and the new position in the edge transition.
				nextEdges.push(curEdge);
				eWeight.push(edgeWeight[g]);
				eProgress.push(pos);
			}
		}
	}
	// Iterate over the current states.
	for (var i = 0; i < currentStates.length; i++) {
		var successors = currentStates[i].neighbors();
		// Iterate over every reachable state from the current state.
		for (var next = successors.next(); next; next = successors.next()) {
			var edge = graph.getEdge(currentStates[i], next);
			var weight = edge.weight().split('<br>');
			// Iterate over every edge weight between the current state and the next state.
			for (var j = 0; j < weight.length; j++) {
				if (weight[j].length > 1) {
					// If the edge weight is more than one character long and matches the input symbol, mark the edge as a next edge.
					// Also note which edge transition is being traversed on and the current position in the edge transition (i.e. index zero).
					if (letter == weight[j][0]) {
						nextEdges.push(edge);
						eWeight.push(j);
						eProgress.push(0);
					}
				}
				else {
					// If the edge weight is one character long and matches the input symbol, and the next state is thus far unaccounted for, mark it as a next state.
					if (letter == weight[j] && !next.hasClass('current')) {
						next.addClass('current');
						nextStates.push(next);
					}
				}
			}
		}
	}
	// For each of the next states, add its closure (i.e. every state it can reach on a lambda transition). Then return this list of states.
	nextStates = addLambdaClosure(graph, nextStates);
	return [nextStates, nextEdges, eWeight, eProgress];
};

// Used by FATraversal.js to traverse the graph while updating the CSS styles of nodes and edges to indicate the overall state of the traversal.
// Calculates the next states and edges traversed to given a graph, input symbols, and four arrays containing information on current states and edges.
// This is used instead of traverse if "Shorthand" mode is enabled in the FAEditor.
var traverseShorthand = function(graph, currentStates, currentEdges, edgeWeight, edgeProgress, letter) {
	var nextStates = [];
	var nextEdges = [];
	var eWeight = []; // eWeight[i] is the index of the string in nextEdges[i].split("<br>") that the traversal is progressing to.
	var eProgress = []; // eProgress[i] is the index of the character of the string in nextEdges[i].split("<br>")[eWeight[i]] that the traversal is progressing to.
	// Iterate over the current edges.
	for (var g = 0; g < currentEdges.length; g++) {
		// Isolate which edge transition we're on and which character of that edge transition we're on.
		var curEdge = currentEdges[g];
		var wArray = curEdge.weight().split('<br>');
		var w = wArray[edgeWeight[g]];
		var pos = edgeProgress[g];
		// Note that the character is currently bolded (e.g. "tra<b>n</b>sition"). We want to unbold the current character.
		w = w.substr(0, pos - 3) + w[pos] + w.substr(pos + 5);
		// This causes the index of the current character to decrease by 3.
		pos = pos - 3;
		// Update the array of edge transitions to contain this un-bolded version of the transition.
		wArray[edgeWeight[g]] = w;
		// If the next letter of the edge transition matches the input symbol...
		if (letter == w[pos + 1]) {
			pos = pos + 1;
			if (w.length == pos + 1) {
				// If the next letter is the last letter of the edge transition, we have made it to the next state.
				// Add the state at the end of this edge to the current states if it's currently unaccounted for.
				if (!curEdge.end().hasClass('current')) {
					curEdge.end().addClass('current');
					nextStates.push(curEdge.end());
				}
			}
			else {
				// If we are still in the middle of the edge transition, note the edge, the edge transition, and the new position in the edge transition.
				nextEdges.push(curEdge);
				eWeight.push(edgeWeight[g]);
				// We now want to bold the next character in the position. That involves changing the string and shifting the index we are currently on by 3.
				w = w.substr(0, pos) + "<b>" + w[pos] + "</b>" + w.substr(pos + 1);
				pos = pos + 3;
				eProgress.push(pos);
				// Update the array of edge transitions to contain this bolded version of the transition.
				wArray[edgeWeight[g]] = w;
			}
		}
		// The transition label of the edge needs to be updated, since characters within it have been altered with additions of "<b>" and "</b>".
		curEdge.weight(wArray.join("<br>"));
		if(curEdge.weight().indexOf('<b>') == -1) {
			// The edge itself is bolded. If none of the characters in the edge are bolded anymore, un-bold the edge.
			curEdge.removeClass('edgeSelect');
		}
	}
	// Iterate over the current states.
	for (var i = 0; i < currentStates.length; i++) {
		var successors = currentStates[i].neighbors();
		// Iterate over every reachable state from the current state.
		for (var next = successors.next(); next; next = successors.next()) {
			var edge = graph.getEdge(currentStates[i], next);
			var weight = edge.weight().split('<br>');
			// Iterate over every edge weight between the current state and the next state.
			for (var j = 0; j < weight.length; j++) {
				if (weight[j].length > 1) {
					// If the edge weight is more than one character long and matches the input symbol, mark the edge as a next edge.
					if (letter == weight[j][0]) {
						edge.addClass('edgeSelect');
						for (var k = 0; k < nextEdges.length; k++) {
							if (edge == nextEdges[k] && j == eWeight[k]) {
								// If there are already bolded characters in the edge, that means eProgress contains pointers to other characters in the edge transition.
								// Adding "<b>" and "</b>" to this edge transition will shift the string and cause those points to be off by 7.
								// Thus, these pointers need to be updated to point to the right characters in the edge transition.
								eProgress[k] = eProgress[k] + 7;
							}
						}
						// Bold the first character in the edge transition.
						var bold = "<b>" + letter + "</b>" + weight[j].substr(1);
						weight[j] = bold;
						// Update the edge weight to contain this bolded character.
						edge.weight(weight.join("<br>"));
						nextEdges.push(edge);
						// Also note which edge transition is being traversed on and the current position in the edge transition.
						// In this case, that current position is index 3, since indices 0-2 are taken up by "<b>".
						eWeight.push(j);
						eProgress.push(3);
					}
				}
				else {
					// If the edge weight is one character long and matches the input symbol, and the next state is thus far unaccounted for, mark it as a next state.
					if (letter == weight[j] && !next.hasClass('current')) {
						next.addClass('current');
						nextStates.push(next);
					}
				}
			}
		}
	}
	// For each of the next states, add its closure (i.e. every state it can reach on a lambda transition). Then return this list of states.
	nextStates = addLambdaClosure(graph, nextStates);
	return [nextStates, nextEdges, eWeight, eProgress];
};

// Function that takes a graph and list of states and returns a list of every state reachable on a lambda transition from those states, in addition to those states themselves.
var addLambdaClosure = function(graph, nextStates) {
	// Either lambda or epsilon may be used to represent the empty string.
	var lambda = String.fromCharCode(955),
		epsilon = String.fromCharCode(949),
	    lambdaStates = [];
	// Iterate over the array of states.
	for (var i = 0; i < nextStates.length; i++) {
		var successors = nextStates[i].neighbors();
		// Iterate over the states reachable from those states.
		for (var next = successors.next(); next; next = successors.next()) {
			var weight = graph.getEdge(nextStates[i], next).weight().split('<br>');
			// Iterate over the edge weights connecting these states.
			for (var j = 0; j < weight.length; j++) {
				// If any of these edge weights are the empty string, mark the next state as reachable (if it hasn't already been accounted for).
				if ((weight[j] == lambda || weight[j] == epsilon) && !next.hasClass('current')) {
					next.addClass('current');
					lambdaStates.push(next);
				}
			}
		}
	}
	// If some states were added because we could reach them on a lambda transition, we then need to check if there are any more states that THOSE states can reach on a lambda transition...
	if(lambdaStates.length > 0) {
		// ... And this necessitates a recursive call:
		lambdaStates = addLambdaClosure(graph, lambdaStates);
	}
	// Once we are completely done finding the lambda closure, add them to the original array of states and return that array.
	for (var k = 0; k < lambdaStates.length; k++) {
		nextStates.push(lambdaStates[k]);
	}
	return nextStates;
};