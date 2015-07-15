var pretraverse = function (graph, inputString) {
	var accepted = true,
	    outputString = "",
	    currentState = graph.initial;
	var traverseFunction;
	if (graph.initial.mooreOutput()) {
		traverseFunction = traverseMoore;
	}
	else {
		traverseFunction = traverseMealy;
	}
	for (var i = 0; i < inputString.length; i++) {
	   	var traverseStep = traverseFunction(graph, currentState, inputString[i]);
	   	if (traverseStep[0] == null) {
	   		accepted = false;
	   		break;
	   	}
		currentState = traverseStep[0];
		outputString += traverseStep[1];
	}
	return [accepted, outputString];
};

var pretraverseShorthand = function (graph, inputString) {
	var accepted = true,
		outputString = "",
		currentState = graph.initial,
		currentEdge = null;
		edgeWeight = null,
		edgeProgress = null;
	var traverseFunction;
	if (graph.initial.mooreOutput()) {
		traverseFunction = traverseMooreShorthand;
	}
	else {
		traverseFunction = traverseMealyShorthand;
	}
	for (var i = 0; i < inputString.length; i++) {
	   	var traverseStep = traverseFunction(graph, currentState, currentEdge, edgeWeight, edgeProgress, inputString[i]);
	   	var nextState = traverseStep[0];
	   	var nextEdge = traverseStep[1];
	   	if (nextState == null) {
	   		if (nextEdge == null) {
	   			accepted = false;
	   			break;
	   		}
	   		else {
	   			edgeWeight = traverseStep[2];
	   			edgeProgress = traverseStep[3];
	   		}
	   	}
		currentState = nextState;
		currentEdge = nextEdge;
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

var traverseMealy = function(graph, currentState, letter) {
	var lambda = String.fromCharCode(955),
		epsilon = String.fromCharCode(949),
	    nextState = null,
	    outputChar = "",
	    successors = currentState.neighbors();
	for (var next = successors.next(); next; next = successors.next()) {
		var weights = graph.getEdge(currentState, next).weight().split('<br>');
		for (var j = 0; j < weights.length; j++) {
			var weight = weights[j].split(":");
			var inputChar = weight[0];
			if (letter == inputChar) {
				nextState = next;
				if (weight[1] != lambda && weight[1] != epsilon) {
					outputChar = weight[1];
				}
			}
		}
	}
	return [nextState, outputChar];
};

var traverseMealyShorthand = function(graph, currentState, currentEdge, edgeWeight, edgeProgress, letter) {
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
			if (w[pos + 1] == ":") {
				nextState = currentEdge.end();
				outputChar = w.split(":")[1];
				if (outputChar == lambda || outputChar == epsilon) {
					outputChar = "";
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
				var inputChar = weights[j].split(":")[0];
				if (inputChar.length > 1) {
					if (letter == inputChar[0]) {
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
					if (letter == inputChar) {
						nextState = next;
						outputChar = weights[j].split(":")[1];
						if (outputChar == lambda || outputChar == epsilon) {
							outputChar = "";
						}
					}
				}
			}
		}
	}
	return [nextState, nextEdge, eWeight, eProgress, outputChar];
};

var traverseMoore = function(graph, currentState, letter) {
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

var traverseMooreShorthand = function(graph, currentState, currentEdge, edgeWeight, edgeProgress, letter) {
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