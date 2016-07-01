// Turing Machine "class", extending FiniteAutomaton
var TuringMachine = function(jsav, options) {
	FiniteAutomaton.apply(this, arguments);
	this.tape = new Tape(jsav, this, {});
	this.transitions = [];
}

JSAV.ext.ds.tm = function (options) {
	var opts = $.extend(true, {visible: true, autoresize: true}, options);
	return new TuringMachine(this, opts);
};

JSAV.utils.extend(TuringMachine, JSAV._types.ds.Graph);

TuringMachine.prototype = Object.create(FA.FiniteAutomaton.prototype, {});
var tm = TuringMachine.prototype;

tm.addTransition = function(start, end, toRead, toWrite, direction) {
	var transition = new TMTransition(this.jsav, start, end, toRead, toWrite, direction, {});
	var edge = this.addEdge(start, end, {weight: transition.weight});
	transition.edge = edge;
	edge.transition = transition;
	return transition;
}

// traverse on a given input string (can do nondeterministic traversal)
tm.play = function(inputString) {
	var currentStates = [new Configuration(this.initial, inputString)],
			cur,
			counter = 0,
			configView = [];		// configurations to display in the message box
	for (var j = 0; j < currentStates.length; j++) {
		configView.push(currentStates[j].toString());
	}
	jsav.umsg(configView.join(' | '));
	g.initial.addClass('current');
	jsav.displayInit();

	while (true) {
		if (counter === 500) {
			console.log(counter);
			break;
		}
		counter++;
		for (var j = 0; j < currentStates.length; j++) {
			currentStates[j].state.removeClass('current');
			currentStates[j].state.removeClass('accepted');
		}
		// get next states
		cur = traverse(currentStates);
		if (!cur || cur.length === 0) {
			break;
		}
		currentStates = cur;
		configView = [];
		// add highlighting and display
		for (var j = 0; j < currentStates.length; j++) {
			currentStates[j].state.addClass('current');
			if (currentStates[j].state.hasClass('final')) {
				currentStates[j].state.addClass('accepted');
			}
			configView.push(currentStates[j].toString());
		}
		jsav.umsg(configView.join(' | '));
		jsav.step();
	}
	for (var k = 0; k < currentStates.length; k++) {
		if (currentStates[k].state.hasClass('final')) {
			currentStates[k].state.addClass('accepted');
		} else {
			currentStates[k].state.addClass('rejected');
		}
	}
	jsav.step();
	jsav.recorded();
};
// given a list of configurations, returns the set of next configurations
var traverse = function(currentStates) {
	var nextStates = [];
	for (var j = 0; j < currentStates.length; j++) {
		var currentState = currentStates[j];
		var successors = currentState.state.neighbors();
		for (var next = successors.next(); next; next = successors.next()) {
			var edge = g.getEdge(currentState.state, next),
					weight = edge.weight().split('<br>');
			for (var i = 0; i < weight.length; i++) {
				var w = weight[i].split(':');
				if (currentState.tape.value() === w[0]) {
					var nextConfig = new Configuration(next, currentState.tape);
					nextConfig.tape.value(w[1]);
					nextConfig.tape.move(w[2]);
					nextStates.push(nextConfig);
					break;
				}
			}
		}
	}
	// remove duplicate configurations
	nextStates = _.uniq(nextStates, function(x) {return x.toID();});
	return nextStates;
};

var Configuration = function(state, tape) {
	this.state = state;
	this.tape = new Tape(tape);
	// toString returns the state value + the 'viewport' of the tape, to be displayed to the user
	this.toString = function() {
		return this.state.value() + ' ' + viewTape(this.tape);
	}
	this.toID = function() {
		// console.log(this.tape.currentIndex);
		return this.state.value() + ' ' + this.tape + this.tape.currentIndex;
	}
};


// Transition object for Turing Machine
var TMTransition = function(jsav, start, end, toRead, toWrite, direction, options) {
	var weight = toRead + ", " + toWrite + ", " + direction;
	this.weight = weight;
	this.jsav = jsav;
	this.start = start;
	this.end = end;
	this.toWrite = toWrite;
	this.toRead = toRead;
	this.direction = direction;
}

var tmTrans = TMTransition.prototype;

tmTrans.getWeight = function() {
	return this.weight;
}


// Tape object for Turing Machine
var Tape = function(jsav, tm, options) {
	this.jsav = jsav;
	this.tm = tm;
	this.head = 0;
	this.cells = ["w"];
}

var tape = Tape.prototype;
