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

var willRejectMultiple = function (graph, inputString) {
	var currentStates = [graph.initial];
	currentStates = addLambdaClosure(graph, currentStates);
	var currentEdges = [];
	var edgeWeight = [];
	var edgeProgress = [];
	var curS = currentStates;
	var curE = currentEdges;
	for (var i = 0; i < inputString.length; i++) {
		for (var j = 0; j < currentStates.length; j++) {
	   		currentStates[j].removeClass('current');
	   	}
	   	var traverseStep = pretraverseMultiple(graph, currentStates, currentEdges, edgeWeight, edgeProgress, inputString[i]);
	   	curS = traverseStep[0];
	   	curE = traverseStep[1];
	   	if (curS.length == 0 && curE.length == 0) {
	   		break;
	   	}
		currentStates = curS;
		currentEdges = curE;
		edgeWeight = traverseStep[2];
		edgeProgress = traverseStep[3];
	}
	var rejected = true;
	for (var k = 0; k < currentStates.length; k++) {
		currentStates[k].removeClass('current');
		if (currentStates[k].hasClass('final') && curS.length > 0) {
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

var pretraverseMultiple = function(graph, currentStates, currentEdges, edgeWeight, edgeProgress, letter) {
	var nextStates = [];
	var nextEdges = [];
	var eWeight = [];
	var eProgress = [];
	for (var g = 0; g < currentEdges.length; g++) {
		var curEdge = currentEdges[g];
		var wArray = curEdge.weight().split('<br>');
		var w = wArray[edgeWeight[g]];
		var pos = edgeProgress[g];
		if (letter == w[pos + 1]) {
			pos = pos + 1;
			if (w.length == pos + 1) {
				if (!curEdge.end().hasClass('current')) {
					curEdge.end().addClass('current');
					nextStates.push(curEdge.end());
				}
			}
			else {
				nextEdges.push(curEdge);
				eWeight.push(edgeWeight[g]);
				eProgress.push(pos);
				wArray[edgeWeight[g]] = w;
			}
		}
	}
	for (var i = 0; i < currentStates.length; i++) {
		var successors = currentStates[i].neighbors();
		for (var next = successors.next(); next; next = successors.next()) {
			var edge = graph.getEdge(currentStates[i], next);
			var weight = edge.weight().split('<br>');
			for (var j = 0; j < weight.length; j++) {
				if (weight[j].length > 1) {
					if (letter == weight[j][0]) {
						nextEdges.push(edge);
						eWeight.push(j);
						eProgress.push(0);
					}
				}
				else {
					if (letter == weight[j] && !next.hasClass('current')) {
						next.addClass('current');
						nextStates.push(next);
					}
				}
			}
		}
	}
	nextStates = addLambdaClosure(graph, nextStates);
	return [nextStates, nextEdges, eWeight, eProgress];
};

var traverseMultiple = function(graph, currentStates, currentEdges, edgeWeight, edgeProgress, letter) {
	var nextStates = [];
	var nextEdges = [];
	var eWeight = [];
	var eProgress = [];
	for (var g = 0; g < currentEdges.length; g++) {
		var curEdge = currentEdges[g];
		var wArray = curEdge.weight().split('<br>');
		var w = wArray[edgeWeight[g]];
		var pos = edgeProgress[g];
		w = w.substr(0, pos - 3) + w[pos] + w.substr(pos + 5);
		pos = pos - 3;
		wArray[edgeWeight[g]] = w;
		if (letter == w[pos + 1]) {
			pos = pos + 1;
			if (w.length == pos + 1) {
				if (!curEdge.end().hasClass('current')) {
					curEdge.end().addClass('current');
					nextStates.push(curEdge.end());
				}
			}
			else {
				nextEdges.push(curEdge);
				eWeight.push(edgeWeight[g]);
				w = w.substr(0, pos) + "<b>" + w[pos] + "</b>" + w.substr(pos + 1);
				pos = pos + 3;
				eProgress.push(pos);
				wArray[edgeWeight[g]] = w;
			}
		}
		curEdge.weight(wArray.join("<br>"));
		if(curEdge.weight().indexOf('<b>') == -1) {
			curEdge.removeClass('edgeSelect');
		}
	}
	for (var i = 0; i < currentStates.length; i++) {
		var successors = currentStates[i].neighbors();
		for (var next = successors.next(); next; next = successors.next()) {
			var edge = graph.getEdge(currentStates[i], next);
			var weight = edge.weight().split('<br>');
			for (var j = 0; j < weight.length; j++) {
				if (weight[j].length > 1) {
					if (letter == weight[j][0]) {
						for (var k = 0; k < nextEdges.length; k++) {
							if (edge == nextEdges[k] && j == eWeight[k]) {
								eProgress[k] = eProgress[k] + 7;
							}
						}
						edge.addClass('edgeSelect');
						var bold = "<b>" + letter + "</b>" + weight[j].substr(1);
						weight[j] = bold;
						edge.weight(weight.join("<br>"));
						nextEdges.push(edge);
						eWeight.push(j);
						eProgress.push(3);
					}
				}
				else {
					if (letter == weight[j] && !next.hasClass('current')) {
						next.addClass('current');
						nextStates.push(next);
					}
				}
			}
		}
	}
	nextStates = addLambdaClosure(graph, nextStates);
	return [nextStates, nextEdges, eWeight, eProgress];
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