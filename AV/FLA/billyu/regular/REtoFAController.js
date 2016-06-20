const DEOR = 1,
			DEECAT = 2,
			DESTAR = 3,
			DEPARENS = 4;
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

var REtoFAController = function(jsav, options) {
	this.init(jsav, options);
};

var controllerProto = REtoFAController.prototype;

controllerProto.init = function(jsav, options) {
	this.jsav = jsav;	
	this.fa = jsav.ds.fa($.extend({width: '750px', height: 440}, options));
	var start = this.fa.addNode();
	var end = this.fa.addNode();
	this.fa.makeInitial(start);
	this.fa.makeFinal(end);
	var t = this.fa.addEdge(start, end);
	if (requiredAction(t.weight()) != 0)
		toDo.add(t);
	nextStep();
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
	if (Discretizer.or(expression).length > 1)
		return DEOR;
	if (Discretizer.cat(expression).length > 1)
		return DECAT;
	if (expression.charAt(expression.length - 1) == '*')
		return DESTAR;
	if (expression.charAt(0) == '('
			&& expression.charAt(expression.length - 1) == ')')
		return DEPARENS;
	alert("Expression not recognized!");
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
	return new this.fa.addEdge(from, to, {weight: ""});
}

/**
 * Does a step.
 */
controllerProto.completeStep = function() {
	if (action == 0) {
		var t = toDo[0];
		transitionCheck(t);
	}
	var from = transition.start();
	var to = transition.end();
	switch (action) {
		case DEPARENS:
			// Probably a deparenthesization, or whatever.
			return;
		case DEOR:
			for (var i = 0; i < replacements.length; i++) {
				console.log(this);
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
			this.lambda(from, replacements[0].from());
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
		//convertPane.detailLabel.setText("\"Export\" will put it in a new window.");
		return;
	}

	//convertPane.detailLabel.setText(transitionNeeded + " more "+Universe.curProfile.getEmptyString()+"-transitions needed.");
	switch (action) {
		case DEOR:
			this.jsav.umsg("De-oring " + transition._label.text());
			break;
		case DECAT:
			this.jsav.umsg("De-concatenating " + transition._label.text());
			break;
		case DESTAR:
			this.jsav.umsg("De-staring " + transition._label.text());
			break;
	}
}

/**
 * Does everything.
 */
controllerProto.completeAll = function() {
	while (action != 0 || toDo.length > 0)
		this.completeStep();
}

controllerProto.transitionCheck = function(transition) {
	if (action != 0) {
		alert("We're already in the process of\n"
				+ "deexpressionifying a transition.");
		return;
	}
	if ((action = requiredAction(transition.weight())) == 0) {
		alert("That's as good as it gets.", "No Action Necessary");
		return;
	}
	this.transition = transition;
	toDo.splice(0, 1);
	var label = transition.weight();
	switch (action) {
		case DEPARENS: {
			var s1 = transition.start(), s2 = transition.end();
			var newLabel = Discretizer.delambda(label.substring(1, label.length - 1));
			this.fa.removeEdge(transition);
			var t = g.addEdge(s1, s2, {weight: newLabel});
			if (requiredAction(newLabel) != 0)
				toDo.push(t);
				action = 0; // That's all that need be done.
				break;
			}
		case DESTAR:
			// !!!!!!!!!!!!!
			replacements = replaceTransition(transition, new String[] { Discretizer.delambda(label.substring(0,label.length() - 1)) });
			transitionNeeded = 4;
			break;
		case DEOR:
			replacements = replaceTransition(transition, Discretizer.or(label));
			transitionNeeded = 2 * replacements.length;
			break;
		case DECAT:
			replacements = replaceTransition(transition, Discretizer.cat(label));
			transitionNeeded = replacements.length + 1;
			catBeginMade = catEndMade = false;
			break;
	}
	nextStep();
}
