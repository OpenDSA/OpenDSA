const DEOR = 1,
			DECAT = 2,
			DESTAR = 3,
			DEPARENS = 4,
			NOTRECOGNIZED = 5;
/** The set of transitions that still require expansion. */
var toDo = []; 

/** The set of lambda-transitions still unborn! */
var toDoTransitions = [];

/** The current action, or 0 if no action. */
var action = 0;

/** The transition being replaced. */
var transition = null;

/** The number of transitions needed for the current step. */
var transitionNeeded = 0;

/** The replacement transitions. */
var replacements = [];

/** For the concatenation. */
var catBeginMade = false, catEndMade = false;

paper.install(window);

var REtoFAController = function(jsav, options) {
	this.init(jsav, options);
};

var controllerProto = REtoFAController.prototype;

controllerProto.init = function(jsav, expression, options) {
	this.jsav = jsav;	
	this.fa = jsav.ds.fa($.extend({width: '750px', height: 440, layout: 'automatic'}, options));
	var start = this.fa.addNode({left: '15px'});
	var end = this.fa.addNode({left: '700px', top: '400px'});
	this.fa.makeInitial(start);
	this.fa.makeFinal(end);
	var t = this.fa.addEdge(start, end, {weight: expression});
	this.transition = t;
	var action = this.requiredAction(expression);
	if (action == NOTRECOGNIZED) {
		alert("Expression not recognized!");
		return;
	}
	else if (action != 0) {
		toDo.push(t);
	}
	this.nextStep();
}

controllerProto.clear = function() {
	this.fa.clear();
}

/**
 * This will return the action that are necessary for a given subexpression.
 * If this method returns 0, that indicates that no action is required.
 * 
 * @param expression
 *            the expression to check for actions that may be required
 */
controllerProto.requiredAction = function(expression) {
	if (expression.length <= 1)
		return 0;
	if (or(expression).length > 1)
		return DEOR;
	if (cat(expression).length > 1)
		return DECAT;
	if (expression.charAt(expression.length - 1) == '*')
		return DESTAR;
	if (expression.charAt(0) == '('
			&& expression.charAt(expression.length - 1) == ')')
		return DEPARENS;
	return NOTRECOGNIZED;
}

/**
 * Creates a lambda-transition between two states.
 * 
 * @param from
 *            the from state
 * @param to
 *            the to state
 * @return a lambda-transition between those states
 */
controllerProto.lambda = function(from, to) {
	return this.fa.addEdge(from, to, {weight: lambda});
}

controllerProto.transitionCheck = function(transition) {
	if (action != 0) {
		alert("We're already in the process of\n"
				+ "deexpressionifying a transition.");
		return;
	}
	if ((action = this.requiredAction(transition.weight())) == 0) {
		alert("That's as good as it gets.", "No Action Necessary");
		return;
	}
	this.transition = transition;
	toDo.splice(0, 1);
	var label = transition.weight();
	switch (action) {
		case DEPARENS: {
			var s1 = transition.start(), s2 = transition.end();
			var newLabel = delambda(label.substring(1, label.length - 1));
			this.fa.removeEdge(transition);
			var t = this.fa.addEdge(s1, s2, {weight: newLabel});
			if (this.requiredAction(newLabel) != 0)
				toDo.push(t);
				action = 0; // That's all that need be done.
				break;
			}
		case DESTAR:
			replacements = this.replaceTransition(transition, [delambda(label.substring(0,label.length - 1))]);
			transitionNeeded = 4;
			break;
		case DEOR:
			replacements = this.replaceTransition(transition, or(label));
			transitionNeeded = 2 * replacements.length;
			break;
		case DECAT:
			replacements = this.replaceTransition(transition, cat(label));
			transitionNeeded = replacements.length + 1;
			catBeginMade = catEndMade = false;
			break;
	}
	this.nextStep();
}


/**
 * Does a step.
 */
controllerProto.completeStep = function() {
	if (action == 0) {
		var t = toDo[0];
		this.transitionCheck(t);
	}
	var from = this.transition.start();
	var to = this.transition.end();
	switch (action) {
		case DEPARENS:
			// Probably a deparenthesization, or whatever.
			return;
		case DEOR:
			for (var i = 0; i < replacements.length; i++) {
				this.lambda(from, replacements[i].start());
				this.lambda(replacements[i].end(), to);
			}
			break;
		case DECAT:
			this.lambda(from, replacements[0].start());
			for (var i = 0; i < replacements.length - 1; i++)
				this.lambda(replacements[i].end(), replacements[i + 1].start());
			this.lambda(replacements[replacements.length - 1].end(), to);
			break;
		case DESTAR:
			this.lambda(from, replacements[0].start());
			this.lambda(replacements[0].end(), to);
			this.lambda(from, to);
			this.lambda(to, from);
			break;
	}
	transitionNeeded = 0;
	this.nextStep();
}

controllerProto.nextStep = function() {
	if (transitionNeeded == 0) {
		if (toDo.length > 0) {
			if (action != 0)
				this.jsav.umsg("Resolution complete.");
			else
				this.jsav.umsg("Welcome to the converter.");
			this.jsav.umsg(toDo.length + " more resolutions needed.");
			action = 0;
			return;
		}
		action = 0;
		// We're all done.
		this.jsav.umsg("The automaton is complete.");
		$('#export').show();
	}

	//convertPane.detailLabel.setText(transitionNeeded + " more "+Universe.curProfile.getEmptyString()+"-transitions needed.");
	switch (action) {
		case DEOR:
			this.jsav.umsg("De-oring " + this.transition.weight());
			break;
		case DECAT:
			this.jsav.umsg("De-concatenating " + this.transition.weight());
			break;
		case DESTAR:
			this.jsav.umsg("De-staring " + this.transition.weight());
			break;
	}
}

controllerProto.exportToFA = function() {
	localStorage["REtoFA"] = true;
	localStorage["FAfromRE"] = serialize(this.fa);
	console.log(serialize(this.fa));
	window.open("../ui/FAEditor.html");
}

/**
 * Does everything.
 */
controllerProto.completeAll = function() {
	while (action != 0 || toDo.length > 0)
		this.completeStep();
}

/**
 * Given a transition to replace, and a list of the strings the transition
 * is being broken into, modify the automaton so that that transition is
 * replaced with a sequence of transitions each corresponding to the array.
 * 
 * @param transition
 *            the transition to replace
 * @param exps
 *            the array of string expressions to replace the transition with
 * @return the array of transitions created
 */
controllerProto.replaceTransition = function(transition, exps) {
	// Compose the transform.
	var t = [];
	var at = new Matrix(); // AffineTransform to draw the new nodes
	var startPos = transition.start().position();
	var endPos = transition.end().position();
	var pStart = new Point(startPos.left, startPos.top);
	var pEnd = new Point(endPos.left, endPos.top);

	at.translate(pStart.x, pStart.y);
	at.scale(pStart.getDistance(pEnd), pStart.getDistance(pEnd));
	at.rotate(Math.atan2(pEnd.y - pStart.y, pEnd.x - pStart.x));

	var ps = new Point(0.2, 0.0);
	var pe = new Point(0.8, 0.0);	

	this.fa.removeEdge(transition);

	for (var i = 0; i < exps.length; i++) {
		pStart = new Point();
		pEnd = new Point();
		var y = exps.length > 1 ? (1.0 * i / (1.0 * exps.length - 1.0) - 0.5) * 0.5 : 0.0;
		pe.y = ps.y = y;
		pStart = at.transform(ps);
		pEnd = at.transform(pe);
		// Clamp bounds.
		pStart.x = Math.max(pStart.x, 20);
		pStart.y = Math.max(pStart.y, 20);
		pEnd.x = Math.max(pEnd.x, 20);
		pEnd.y = Math.max(pEnd.y, 20);

		var s = this.fa.addNode({left: pStart.x + 'px', top: pStart.y + 'px'});
		var e = this.fa.addNode({left: pEnd.x + 'px', top: pEnd.y + 'px'});
		var edge = this.fa.addEdge(s, e, {weight: exps[i]});
		t.push(edge);
		if (this.requiredAction(edge.weight()) != 0)
			toDo.push(edge);
	}
	return t;
}
