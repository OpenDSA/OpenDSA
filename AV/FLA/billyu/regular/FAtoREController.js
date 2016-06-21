var FAtoREController = function(jsav, fa, options) {
	this.init(jsav, fa, options);
};

var controllerProto = FAtoREController.prototype;

controllerProto.init = function(jsav, fa, options) {
	this.jsav = jsav;	
	this.fa = fa;
}

controllerProto.checkForTransitions = function() {
	var edgesNum = this.fa.edges().length;
	var nodesNum = this.fa.nodes().length;
	if (edgesNum == nodesNum * nodesNum) {
		$('#collapseButton').show();
		$('#cheat').hide();
		$('#edgeButton').hide();
		$('.jsavgraph').removeClass('addEdges');
		jsav.umsg("Use collapse state tool to remove nonfinal, noninitial states.");
		if (this.fa.nodes().length == 2) generateExpression();
	}
}

controllerProto.collapseState = function() {
	jsav.umsg("Click a nonfinal, noninitial state.");
	$('.jsavgraph').addClass("collapse");
}

// add empty transitions to states without transitions to each other
controllerProto.completeTransitions = function() {
	removeModeClasses();
	var nodes1 = this.fa.nodes();
	var nodes2 = this.fa.nodes();
	for (var from = nodes1.next(); from; from = nodes1.next()) {
		for (var to = nodes2.next(); to; to = nodes2.next()) {
			if (!this.fa.hasEdge(from, to)) {
				this.fa.addEdge(from, to, {weight: none});
			}
		}
		nodes2.reset();
	}
	checkForTransitions();
}

// closes the transitions box and update FA
controllerProto.finalizeRE = function() {
	if (!collapseStateTable) return;
	$('#dialog').dialog("close");

	var table = collapseStateTable;
	for (var i = 0; i < table.length; i++) {
		var row = table[i];
		var from = this.fa.getNodeWithValue(row[0]);
		var to = this.fa.getNodeWithValue(row[1]);
		var newTransition = row[2];
		this.fa.removeEdge(from, to);
		this.fa.addEdge(from, to, {weight: newTransition});
	}
	this.fa.removeNode(selected);
	if (this.fa.nodes().length == 2) {
		generateExpression();
	}	
}

// get the RE from last two states;
controllerProto.generateExpression = function() {
	var from = this.fa.initial;
	var to = this.fa.getFinals()[0];
	var fromm = normalizeTransitionToRE(this.fa.getEdge(from, from).weight());
	var fromTo = normalizeTransitionToRE(this.fa.getEdge(from, to).weight());
	var toFrom = normalizeTransitionToRE(this.fa.getEdge(to, from).weight());
	var too = normalizeTransitionToRE(this.fa.getEdge(to, to).weight());
	var cycle = "", target = "", expression = "";
	if (fromTo == none) {
		expression = none;
	}
	else {
		if (toFrom == none) {
			//cycle = "";
			if ((fromm == none || fromm == lambda) && (too == none || too == lambda)) {
				expression = fromTo;
			}
			else if (fromm == none || fromm == lambda) {
				if (too.length > 1) {
					expression = fromTo + "(" + too + ")*";
				}
				else {
					expression = fromTo + too + "*";
				}
			}
			else if (too == none || too == lambda) {
				if (fromm.length > 1) {
					expression = "(" + fromm + ")*" + fromTo;
				}
				else {
					expression = fromm + "*" + fromTo;
				}
			}
			else {
				if (fromm.length > 1 && too.length > 1) {
					expression = "(" + fromm + ")*" + fromTo + "(" + too + ")*";
				}
				else if (fromm.length > 1) {
					expression = "(" + fromm + ")*" + fromTo + too + "*";
				}
				else if (too.length > 1) {
					expression = fromm + "*" + fromTo + "(" + too + ")*";
				}
				else {
					expression = fromm + "*" + fromTo + too + "*";
				}
			}
		}
		else {
			//cycle = something;
			if ((fromm == none || fromm == lambda) && (too == none || too == lambda)) {
				cycle = "(" + fromTo + toFrom + ")*";
				target = fromTo;
			}
			else if (fromm == none || fromm == lambda) {
				cycle = "(" + fromTo + addStar(too) + toFrom + ")*";
				target = fromTo + addStar(too);
			}
			else if (too == none || too == lambda) {
				cycle = "(" + addStar(fromm) + fromTo + toFrom + ")*";
				target = addStar(fromm) + fromTo;
			}
			else {
				cycle = "(" + addStar(fromm) + fromTo + addStar(too) + toFrom + ")*";
				target = addStar(fromm) + fromTo + addStar(too);
			}
			expression = cycle + target;
		}
	}
	this.jsav.umsg("Expression: " + expression);
}

// add star if needed for transitions
controllerProto.addStar = function(transition) {
	if (transition.length == 1) return transition + "*";
	var count = 0;
	if (transition.charAt(0) !== "(") return "(" + transition + ")*";
	for (var i = 0; i < transition.length; i++) {
		if (transition.charAt(i) == "(") count++;
		else if (transition.charAt(i) == ")") count--;
		if (count == 0 && i < transition.length - 1) return "(" + transition + ")";
	}
	return transition + "*";
}
