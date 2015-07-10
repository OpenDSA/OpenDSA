var pretraverse = function (graph, inputString) {
	var accepted = true,
	    outputString = "",
	    currentState = graph.initial;
	for (var i = 0; i < inputString.length; i++) {
	   	var cur = traverse(graph, currentState, inputString[i]);
	   	if (cur[0] == null) {
	   		accepted = false;
	   		break;
	   	}
		currentState = cur[0];
		outputString += cur[1];
	}
	return [accepted, outputString];
};

var pretraverseMultiple = function (graph, inputString) {
	var accepted = true,
		outputString = "",
		currentState = graph.initial,
		currentEdge = null;
		edgeWeight = null,
		edgeProgress = null;
	for (var i = 0; i < inputString.length; i++) {
	   	var traverseStep = traverseMultiple(graph, currentState, currentEdge, edgeWeight, edgeProgress, inputString[i]);
	   	var curS = traverseStep[0];
	   	var curE = traverseStep[1];
	   	if (curS == null) {
	   		if (curE == null) {
	   			accepted = false;
	   			break;
	   		}
	   		else {
	   			edgeWeight = traverseStep[2];
	   			edgeProgress = traverseStep[3];
	   		}
	   	}
		currentState = curS;
		currentEdge = curE;
		outputString += traverseStep[4];
	}
	if (currentEdge && accepted) {
		currentEdge.removeClass('edgeSelect');
		var wArray = currentEdge.weight().split('<br>');
		var w = wArray[edgeWeight];
		var pos = edgeProgress;
		w = w.substr(0, pos - 3) + w[pos] + w.substr(pos + 5);
		wArray[edgeWeight] = w;
		currentEdge.weight(wArray.join("<br>"));
	}
	return [accepted, outputString];
};

var traverse = function(graph, currentState, letter) {
	var lambda = String.fromCharCode(955),
		epsilon = String.fromCharCode(949),
	    nextState = null,
	    outputChar = "",
	    successors = currentState.neighbors();
	for (var next = successors.next(); next; next = successors.next()) {
		var weights = graph.getEdge(currentState, next).weight().split('<br>');
		for (var j = 0; j < weights.length; j++) {
			if (letter == weights[j]) {
				nextState = next;
				if (next.mooreOutput() != lambda && next.mooreOutput() != epsilon) {
					outputChar = next.mooreOutput();
				}
			}
		}
	}
	return [nextState, outputChar];
};

var traverseMultiple = function(graph, currentState, currentEdge, edgeWeight, edgeProgress, letter) {
	var lambda = String.fromCharCode(955),
		epsilon = String.fromCharCode(949),
		nextState = null;
		nextEdge = null;
		eWeight = null,
		eProgress = null,
		outputChar = "";
	if (currentEdge) {
		var wArray = currentEdge.weight().split('<br>');
		var w = wArray[edgeWeight];
		var pos = edgeProgress;
		w = w.substr(0, pos - 3) + w[pos] + w.substr(pos + 5);
		pos = pos - 3;
		wArray[edgeWeight] = w;
		if (letter == w[pos + 1]) {
			pos = pos + 1;
			if (w.length == pos + 1) {
				nextState = currentEdge.end();
				currentEdge.removeClass('edgeSelect');
				if (nextState.mooreOutput() != lambda && nextState.mooreOutput() != epsilon) {
					outputChar = nextState.mooreOutput();
				}
			}
			else {
				nextEdge = currentEdge;
				eWeight = edgeWeight;
				w = w.substr(0, pos) + "<b>" + w[pos] + "</b>" + w.substr(pos + 1);
				pos = pos + 3;
				eProgress = pos;
				wArray[edgeWeight] = w;
			}
		}
		currentEdge.weight(wArray.join("<br>"));
		if(currentEdge.weight().indexOf('<b>') == -1) {
			currentEdge.removeClass('edgeSelect');
		}
	}
	else if (currentState) {
		var successors = currentState.neighbors();
		for (var next = successors.next(); next; next = successors.next()) {
			var edge = graph.getEdge(currentState, next);
			var weights = edge.weight().split('<br>');
			for (var j = 0; j < weights.length; j++) {
				if (weights[j].length > 1) {
					if (letter == weights[j][0]) {
						edge.addClass('edgeSelect');
						var bold = "<b>" + letter + "</b>" + weights[j].substr(1);
						weights[j] = bold;
						edge.weight(weights.join("<br>"));
						nextEdge = edge;
						eWeight = j;
						eProgress = 3;
					}
				}
				else {
					if (letter == weights[j]) {
						nextState = next;
						if (next.mooreOutput() != lambda && next.mooreOutput() != epsilon) {
							outputChar = next.mooreOutput();
						}
					}
				}
			}
		}
	}
	return [nextState, nextEdge, eWeight, eProgress, outputChar];
};