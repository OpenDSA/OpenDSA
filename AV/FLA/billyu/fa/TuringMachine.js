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

TuringMachine.prototype = Object.create(FiniteAutomaton.prototype, {});
var tm = TuringMachine.prototype;

tm.addTransition = function(start, end, toRead, toWrite, direction) {
	var transition = new TMTransition(this.jsav, start, end, toRead, toWrite, direction, {});
	var edge = this.addEdge(start, end, {weight: transition.weight});
	transition.edge = edge;
	edge.transition = transition;
	return transition;
}


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
