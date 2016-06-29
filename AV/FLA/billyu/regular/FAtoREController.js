var lambda = String.fromCharCode(955), // Instance variable to store the JavaScript representation of lambda.
		epsilon = String.fromCharCode(949), // Instance variable to store the JavaScript representation of epsilon.
		none = String.fromCharCode(248), // empty set symbol used for converting to RE
		emptystring = lambda,
		collapseStateTable, // table that shows relevant transitions of a collapsed node
		transitions;

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
		this.jsav.umsg("Use collapse state tool to remove nonfinal, noninitial states.");
		if (this.fa.nodes().length == 2) this.generateExpression();
	}
}

// change ...<br>... to (...+...)
// add parentheses to the ones with + sign
function normalizeTransitionToRE(transition, last) {
	var arr = transition.split("<br>");
	if (arr.length == 1) {
		return transition;
	}
	if (arr.length == 0 && last) return re;
	var re = "(" + arr[0];
	for (var i = 1; i < arr.length; i++) {
		re += "+" + arr[i];
	}
	re += ")";
	return re;
}

function transitionsTableHandler(row, col, e) {
	var fa = this.element.data('fa');
	for (var i = 0; i < transitions._arrays.length; i++) {
		transitions.unhighlight(i);
	}
	transitions.highlight(row);
	var edges = fa.edges();
	for (var edge = edges.next(); edge; edge = edges.next()) {
		edge.element.removeClass('testingLambda');
		edge._label.element.removeClass('testingLambda');
	}
	var table = collapseStateTable;
	var from = fa.getNodeWithValue(table[row][0]);
	var to = fa.getNodeWithValue(table[row][1]);
	var direct = fa.getEdge(from, to);
	var step1 = fa.getEdge(from, fa.selected);
	var step2 = fa.getEdge(fa.selected, fa.selected);
	var step3 = fa.getEdge(fa.selected, to);
	direct.element.addClass('testingLambda');
	step1.element.addClass('testingLambda');
	step2.element.addClass('testingLambda');
	step3.element.addClass('testingLambda');
	direct._label.element.addClass('testingLambda');
	step1._label.element.addClass('testingLambda');
	step2._label.element.addClass('testingLambda');
	step3._label.element.addClass('testingLambda');
}

controllerProto.collapseState = function(node) {
	if (!node) {
		this.jsav.umsg("Click a nonfinal, noninitial state.");
		$('.jsavgraph').addClass("collapse");
		return;
	}
	var table = [];
	var nodes1 = this.fa.nodes();
	var nodes2 = this.fa.nodes();
	for (var from = nodes1.next(); from; from = nodes1.next()) {
		nodes2.reset();
		for (var to = nodes2.next(); to; to = nodes2.next()) {
			if (from == this.fa.selected || to == this.fa.selected) continue;
			var straight = this.fa.getEdge(from, to).weight();
			var begin = this.fa.getEdge(from, this.fa.selected).weight();
			var pause = this.fa.getEdge(this.fa.selected, this.fa.selected).weight();
			var end = this.fa.getEdge(this.fa.selected, to).weight();
			var indirect = "";

			direct = normalizeTransitionToRE(straight);
			if (begin == none || end == none) {
				table.push([from.value(), to.value(), direct]);
			}
			else {
				var step1 = normalizeTransitionToRE(begin);
				var step2 = normalizeTransitionToRE(pause);
				var step3 = normalizeTransitionToRE(end);
				if (step2 == none || step2 == lambda) {
					if (step1 == lambda) {
						indirect = step3;
					}
					else if (step3 == lambda) {
						indirect = step1;
					}
					else {
						indirect = step1 + step3;
					}
				}
				else {
					if (step1 == lambda && step3 == lambda) {
						indirect = addStar(step2);
					}
					else if (step1 == lambda) {
						indirect = addStar(step2) + step3;
					}
					else if (step3 == lambda) {
						indirect = step1 + addStar(step2);
					}
					else {
						indirect = step1 + addStar(step2) + step3;
					}
				}
				if (direct == none) {
					table.push([from.value(), to.value(), indirect]);
				}
				else {
					table.push([from.value(), to.value(), direct + "+" + indirect]);
				}
			}
		}
	}
	collapseStateTable = table;

	$dialog = $("#dialog");
	var tav = new JSAV("transitions");
	if (transitions) transitions.clear();
	transitions = tav.ds.matrix(table, {style: "table"});
	transitions.element.data({'fa': this.fa});
	transitions.click(transitionsTableHandler);
	$dialog.dialog({
		dialogClass: "no-close",
		width: 200,
		maxHeight: 800 
	});
	$dialog.dialog("open");
}

// add empty transitions to states without transitions to each other
controllerProto.completeTransitions = function() {
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
	this.checkForTransitions();
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
	this.fa.removeNode(this.fa.selected);
	if (this.fa.nodes().length == 2) {
		this.generateExpression();
	}	
}

// get the RE from last two states;
controllerProto.generateExpression = function() {
	var from = this.fa.initial;
	var to = this.fa.getFinals()[0];
	var fromm = normalizeTransitionToRE(this.fa.getEdge(from, from).weight());
	var fromTo = normalizeTransitionToRE(this.fa.getEdge(from, to).weight(), true);
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
					expression = fromTo + addStar(too);
				}
				else {
					expression = fromTo + too + "*";
				}
			}
			else if (too == none || too == lambda) {
				if (fromm.length > 1) {
					expression = addStar(fromm) + fromTo;
				}
				else {
					expression = fromm + "*" + fromTo;
				}
			}
			else {
				if (fromm.length > 1 && too.length > 1) {
					expression = addStar(fromm) + fromTo + addStar(too);
				}
				else if (fromm.length > 1) {
					expression = addStar(fromm) + fromTo + too + "*";
				}
				else if (too.length > 1) {
					expression = fromm + "*" + fromTo + addStar(too);
				}
				else {
					expression = fromm + "*" + fromTo + too + "*";
				}
			}
		}
		else {
			//cycle = something;
			if ((fromm == none || fromm == lambda) && (too == none || too == lambda)) {
				cycle = addStar(fromTo + toFrom);
				target = fromTo;
			}
			else if (fromm == none || fromm == lambda) {
				cycle = addStar(fromTo + addStar(too) + toFrom);
				target = fromTo + addStar(too);
			}
			else if (too == none || too == lambda) {
				cycle = addStar(addStar(fromm) + fromTo + toFrom);
				target = addStar(fromm) + fromTo;
			}
			else {
				cycle = addStar(addStar(fromm) + fromTo + addStar(too) + toFrom);
				target = addStar(fromm) + fromTo + addStar(too);
			}
			expression = cycle + target;
		}
	}
	$('h1').text("Expression: " + expression);
	$('#exportButton').show();
	$('#exportButton').click(function() {
		exportToRE(expression);
	});
}

function exportToRE(expression) {
	localStorage["expression"] = expression;
	window.open("../ui/REtoFA.html");
}

// add star if needed for transitions
function addStar (transition) {
	if (transition.length == 1) return transition + "*";
	var count = 0;
	if (transition.charAt(0) !== "(") return "(" + transition + ")*";
	for (var i = 0; i < transition.length; i++) {
		if (transition.charAt(i) == "(") count++;
		else if (transition.charAt(i) == ")") count--;
		if (count == 0 && i < transition.length - 1) return "(" + transition + ")*";
	}
	return transition + "*";
}
