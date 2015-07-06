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

var traverse = function(graph, currentState, letter) {
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