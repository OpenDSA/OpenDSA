// Turing Machine "class", extending FiniteAutomaton
var TuringMachine = function(jsav, options) {
	FiniteAutomaton.apply(this, arguments);
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

// traverse on a given input string (can do nondeterministic traversal)
tm.play = function(inputString) {
	var currentStates = [new Configuration(this.initial, inputString)],
			cur,
			counter = 0,
			configView = [];		// configurations to display in the message box
	for (var j = 0; j < currentStates.length; j++) {
		configView.push(currentStates[j].toString());
	}
	this.jsav.umsg(configView.join(' | '));
	this.initial.highlight();
	this.jsav.displayInit();

	while (true) {
		if (counter === 500) {
			console.log(counter);
			break;
		}
		counter++;
		for (var j = 0; j < currentStates.length; j++) {
			currentStates[j].state.unhighlight();
			this.removeAccept(currentStates[j].state);
		}
		// get next states
		cur = this.traverse(currentStates);
		if (!cur || cur.length === 0) {
			break;
		}
		currentStates = cur;
		configView = [];
		// add highlighting and display
		for (var j = 0; j < currentStates.length; j++) {
			currentStates[j].state.highlight();
			if (this.isFinal(currentStates[j].state)) {
				this.showAccept(currentStates[j].state);
			}
			configView.push(currentStates[j].toString());
		}
		this.jsav.umsg(configView.join(' | '));
		this.jsav.step();
	}
	for (var k = 0; k < currentStates.length; k++) {
		if (this.isFinal(currentStates[k].state)) {
			this.showAccept(currentStates[k].state);
		} else {
			this.showReject(currentStates[k].state);
		}
	}
	this.jsav.step();
	this.jsav.recorded();
};

tm.showAccept = function(state) {
	state.addClass('accepted');
}

tm.removeAccept = function(state) {
	state.removeClass('accepted');
}

tm.showReject = function(state) {
	state.addClass('rejected');
}

tm.isInitial = function(state) {
	return state == this.initial;
}

tm.isFinal = function(state) {
	return state.hasClass('final');
}

// given a list of configurations, returns the set of next configurations
tm.traverse = function(currentStates) {
	var nextStates = [];
	for (var j = 0; j < currentStates.length; j++) {
		var currentState = currentStates[j];
		var successors = currentState.state.neighbors();
		for (var next = successors.next(); next; next = successors.next()) {
			var edge = this.getEdge(currentState.state, next),
					weight = edge.weight().split('<br>');
			for (var i = 0; i < weight.length; i++) {
				weight[i] = toColonForm(weight[i]);
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

//======================
// Save/Load
// save TM as XML
tm.serializeToXML = function() {
	var text = '<?xml version="1.0" encoding="UTF-8"?>';
	text = text + "<structure>";
	text = text + "<type>turing</type>";
	text = text + "<automaton>";
	var nodes = this.nodes();
	for (var next = nodes.next(); next; next = nodes.next()) {
		var left = next.position().left;
		var top = next.position().top;
		var i = next.hasClass("start");
		var f = next.hasClass("final");
		var label = next.stateLabel();
		text = text + '<state id="' + next.value().substring(1) + '" name="' + next.value() + '">';
		text = text + '<x>' + left + '</x>';
		text = text + '<y>' + top + '</y>';
		if (label) {
			text = text + '<label>' + label + '</label>';
		}
		if (i) {
			text = text + '<initial/>';
		}
		if (f) {
			text = text + '<final/>';
		}
		text = text + '</state>';
	}
	var edges = this.edges();
	for (var next = edges.next(); next; next = edges.next()) {
		var fromNode = next.start().value().substring(1);
		var toNode = next.end().value().substring(1);
		var w = next.weight().split('<br>');
		for (var i = 0; i < w.length; i++) {
			text = text + '<transition>';
			text = text + '<from>' + fromNode + '</from>';
			text = text + '<to>' + toNode + '</to>';
			w[i] = toColonForm(w[i]);
			var wSplit = w[i].split(":");
			if (wSplit[0] === emptystring) {
				text = text + '<read/>';
			} else {
				text = text + '<read>' + wSplit[0] + '</read>';
			}
			if (wSplit[1] === emptystring) {
				text = text + '<write/>';
			} else {
				text = text + '<write>' + wSplit[1] + '</write>';
			}
			text = text + '<move>' + wSplit[2] + '</move>';
			text = text + '</transition>';
		}
	}
	text = text + "</automaton></structure>"
		return text;
};

// load a TM from an XML file
tm.initFromXML = function(text) {
	var parser,
			xmlDoc;
	if (window.DOMParser) {
		parser=new DOMParser();
		xmlDoc=parser.parseFromString(text,"text/xml");
	} else {
		xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async=false;
		xmlDoc.loadXML(text);
	}
	if (xmlDoc.getElementsByTagName("type")[0].childNodes[0].nodeValue !== 'turing') {
		alert('File does not contain a Turing machine.');
	} else if (xmlDoc.getElementsByTagName("tapes")[0] && Number(xmlDoc.getElementsByTagName("tapes")[0].childNodes[0].nodeValue) !== 1) {
		alert('File contains a multitape Turing machine.');
		var loaded = $('#loadbutton');
		loaded.wrap('<form>').closest('form').get(0).reset();
		loaded.unwrap();
		return;
	} else {
		var nodes = this.nodes();
		for (var node = nodes.next(); node; node = nodes.next()) {
			this.removeNode(node);
		}
		var nodeMap = {};			// map node IDs to nodes
		var xmlStates = xmlDoc.getElementsByTagName("state");
		xmlStates = _.sortBy(xmlStates, function(x) {return x.id;})
			var xmlTrans = xmlDoc.getElementsByTagName("transition");
		for (var i = 0; i < xmlStates.length; i++) {
			var x = Number(xmlStates[i].getElementsByTagName("x")[0].childNodes[0].nodeValue);
			var y = Number(xmlStates[i].getElementsByTagName("y")[0].childNodes[0].nodeValue);
			var newNode = this.addNode({left: x, top: y});
			var isInitial = xmlStates[i].getElementsByTagName("initial")[0];
			var isFinal = xmlStates[i].getElementsByTagName("final")[0];
			var isLabel = xmlStates[i].getElementsByTagName("label")[0];
			if (isInitial) {
				this.makeInitial(newNode);
			}
			if (isFinal) {
				newNode.addClass('final');
			}
			if (isLabel) {
				newNode.stateLabel(isLabel.childNodes[0].nodeValue);
			}
			nodeMap[xmlStates[i].id] = newNode;
		}
		for (var i = 0; i < xmlTrans.length; i++) {
			var from = xmlTrans[i].getElementsByTagName("from")[0].childNodes[0].nodeValue;
			var to = xmlTrans[i].getElementsByTagName("to")[0].childNodes[0].nodeValue;
			var read = xmlTrans[i].getElementsByTagName("read")[0].childNodes[0];
			var write = xmlTrans[i].getElementsByTagName("write")[0].childNodes[0];
			var move = xmlTrans[i].getElementsByTagName("move")[0].childNodes[0].nodeValue;
			if (!read) {
				read = square;
			} else {
				read = read.nodeValue;
			}
			if (!write) {
				write = square;
			} else {
				write = write.nodeValue;
			}
			this.addEdge(nodeMap[from], nodeMap[to], {weight: read + ";" + write + "," + move});
		}
		this.layout();
	}
};


// Configuration class
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
	var weight = toRead + ";" + toWrite + "," + direction;
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


/*
	 Holds the tape as a linked list and keeps track of the current position
	 as well as the beginning of the string.
 */
var Tape = function (str) {
	// if the tape is initialized using a string, writes the string to the new tape
	if (typeof str === 'string') {
		this.head = makeTape(str);
		this.current = this.head.right()[0];  // the current symbol
		this.currentIndex = 0;                // the current position
	} 
	// else, assume that a Tape object was passed in, and create a copy of it
	else {
		var copy = copyTape(str);
		this.head = copy[0];
		this.current = copy[1];
		this.currentIndex = str.currentIndex;
	}
	// Returns the string written on the tape starting from the head of the string, including empty squares
	this.toString = function() {
		var temp = this.head,
				ret = "";
		while (temp) {
			ret += temp.value();
			temp = temp._right;
		}
		return ret;
	};
	// Move the tape left and set the new head of the string
	this.left = function() {
		var next = this.current.left();
		this.current = next[0];
		this.currentIndex--;
		if (next[1]) {
			this.head = next[1];
		}
		return this.current;
	};
	// Move the tape right
	this.right = function() {
		var next = this.current.right();
		this.current = next[0];
		this.currentIndex++;
		return this.current;
	};
	// Write to the current position
	this.value = function (newVal) {
		return this.current.value(newVal);
	};
	// Move the tape and read the symbol
	this.move = function (str) {
		if (str === "L") {
			return this.left();
		} else if (str === "R") {
			return this.right();
		} else if (str === "S") {
			return this.current;
		}
	};
};

// Tape linked list node
var TapeNode = function (left, right, val) {
	this._left = left;
	this._right = right;
	if (typeof val === "undefined") {
		//this._value = "";
		this._value = String.fromCharCode(9633);
	} else {
		this._value = val;
	}
	// Return the value written at this position or write a symbol to this position
	this.value = function (newVal) {
		if (typeof newVal === "undefined") {
			return this._value;
		} else {
			this._value = newVal;
			return this._value;
		}
	};
	/*
		 Traverse left or right and read. 
		 If can't, create empty tape nodes. 
		 Returns an array containing the read symbol and the new head of the string
	 */
	this.left = function (n) {
		if (this._left) {
			return [this._left];
		} else {
			if (!n) { n = 10; }
			return extendTape("left", this, n);
		}
	}
	this.right = function (n) {
		if (this._right) {
			return [this._right];
		} else {
			if (!n) { n = 10; }
			return extendTape("right", this, n);
		}
	}
};

// Function to initialize the linked list from an inputted string
var makeTape = function (str) {
	var prev = new TapeNode(null, null);
	var head = prev;
	for (var i = 0; i < str.length; i++) {
		var temp = new TapeNode(prev, null, str.charAt(i));
		prev._right = temp;
		prev = temp;
	}
	return head;
};

// Function to initialize the linked list by copying the inputted tape
var copyTape = function (t) {
	var prev = new TapeNode(null, null, t.current.value());
	var cur = prev;
	var temp = t.current._right;
	while (temp) {
		var next = new TapeNode(prev, null, temp.value());
		prev._right = next;
		prev = next;
		temp = temp._right;
	}
	prev = cur;
	temp = t.current;
	while (temp._left) {
		var next = new TapeNode(null, prev, temp._left.value());
		prev._left = next;
		prev = next;
		temp = temp._left;
	}
	return [temp, cur];
};

/*
	 Creates n empty tape nodes to the beginning or end of the tape 
	 and returns the read symbol and the leftmost/rightmost new node
 */
var extendTape = function (dir, node, n) {
	if (dir === 'left') {
		var next = new TapeNode(null, node),
				prev = next;
		node._left = next;
		for (var i = 0; i < n - 1; i++) {
			var temp = new TapeNode(null, prev);
			prev._left = temp;
			prev = temp;
		}
		return [next, prev];
	}
	if (dir === 'right') {
		var next = new TapeNode(node, null),
				prev = next;
		node._right = next;
		for (var i = 0; i < n - 1; i++) {
			var temp = new TapeNode(prev, null);
			prev._right = temp;
			prev = temp;
		}
		return [next, prev];
	}
};

/*
	 Function to get the tape alphabet.
 */
tm.getTapeAlphabet = function () {
	var alphabet = [];
	var edges = this.edges();
	var w;
	for (var next = edges.next(); next; next = edges.next()) {
		w = next.weight();
		w = toColonForm(w);
		w = w.split('<br>');
		for (var i = 0; i < w.length; i++) {
			var t = w[i].split('|');
			for (var k = 0; k < t.length; k++) {
				var letter1 = t[k].split(':')[0],
						letter2 = t[k].split(':')[1],
						letters;
				if (letter1 !== this.emptystring && letter2 !== this.emptystring) {
					letters = letter1.split('').concat(letter2.split(''));
				} else if (letter1 !== this.emptystring) {
					letters = letter1.split('');
				} else if (letter2 !== this.emptystring) {
					letters = letter2.split('');
				} else {
					break;
				}
				for (var j = 0; j < letters.length; j++) {
					if (letters[j] !== this.emptystring && alphabet.indexOf(letters[j]) === -1){
						alphabet.push(letters[j]);
					}
				}
			}
		}
	}
	return alphabet;
};

/*
	 Function to get the tape "viewport".
	 This returns a string showing the current position and the seven
	 symbols to the left and right of the current position.
	 The current position is highlighted as well.
 */
var viewTape = function (t) {
	var arr = new Array(15);    // arbitrary size
	for (var i = 0; i < 15; i++) {
		arr[i] = String.fromCharCode(9633);;
	}
	i = 7;
	var temp = t.current;
	while (temp) {
		if (i < 0) {break;}
		arr[i] = temp.value();
		i--;
		temp = temp._left;
	}
	i = 7;
	temp = t.current;
	while (temp) {
		if (i >= arr.length) {break;}
		arr[i] = temp.value();
		i++;
		temp = temp._right;
	}
	var view = "|";
	for (var i = 0; i < arr.length; i++) {
		if (i === 7) {
			view+="<mark>" + arr[i] + "</mark>";
		} else {
			view+=arr[i];
		}
	}
	view+="|";
	return view;
};

tm.updateAlphabetFunction = tm.updateAlphabet;
tm.updateAlphabet = function() {
	this.updateAlphabetFunction();
	$("#alphabet").html("" + Object.keys(this.alphabet).sort());
	var sa = this.getTapeAlphabet();
	$('#stackalphabet').html(emptystring + "," + sa.sort());
}

/*
	 Function to get the tape output, the string made from the current position up to,
	 but not including, the first empty square found.
 */

var produceOutput = function (t) {
	var temp = t.current,
			output = "";
	while (temp && temp.value() !== String.fromCharCode(9633)) {
		output += temp.value();
		temp = temp._right;
	}
	return output;
};
