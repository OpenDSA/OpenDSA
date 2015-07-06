var willReject = function (graph, inputString) {
	var currentStates = [graph.initial];
	currentStates = addLambdaClosure(graph, currentStates);
	var cur = currentStates;
	for (var i = 0; i < inputString.length; i++) {
		for (var j = 0; j < currentStates.length; j++) {
	   		currentStates[j].removeClass('current');
	   	}
	   	cur = traverse(graph, currentStates, inputString[i]);
	   	if (cur.length == 0) {
	   		break;
	   	}
		currentStates = cur;
	}
	var rejected = true;
	for (var k = 0; k < currentStates.length; k++) {
		currentStates[k].removeClass('current');
		if (currentStates[k].hasClass('final') && cur.length > 0) {
			rejected = false;
		}
	}
	return rejected;
};

var traverse = function(graph, currentStates, letter) {
	var nextStates = [];
	for (var i = 0; i < currentStates.length; i++) {
		var successors = currentStates[i].neighbors();
		for (var next = successors.next(); next; next = successors.next()) {
			var weight = graph.getEdge(currentStates[i], next).weight().split('<br>');
			for (var j = 0; j < weight.length; j++) {
				if (letter == weight[j] && !next.hasClass('current')) {
					next.addClass('current');
					nextStates.push(next);
				}
			}
		}
	}
	nextStates = addLambdaClosure(graph, nextStates);
	return nextStates;
};

var addLambdaClosure = function(graph, nextStates) {
	var lambda = String.fromCharCode(955),
		epsilon = String.fromCharCode(949),
	    lambdaStates = [];
	for (var i = 0; i < nextStates.length; i++) {
		var successors = nextStates[i].neighbors();
		for (var next = successors.next(); next; next = successors.next()) {
			var weight = graph.getEdge(nextStates[i], next).weight().split('<br>');
			for (var j = 0; j < weight.length; j++) {
				if ((weight[j] == lambda || weight[j] == epsilon) && !next.hasClass('current')) {
					next.addClass('current');
					lambdaStates.push(next);
				}
			}
		}
	}
	if(lambdaStates.length > 0) {
		lambdaStates = addLambdaClosure(graph, lambdaStates);
	}
	for (var k = 0; k < lambdaStates.length; k++) {
		nextStates.push(lambdaStates[k]);
	}
	return nextStates;
};