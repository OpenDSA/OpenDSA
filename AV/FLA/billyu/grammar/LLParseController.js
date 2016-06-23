var LLParseController = function(arr, jsav, m, options) {
	this.init(arr, jsav, m, options);
}

var controllerProto = LLParseController.prototype;

controllerProto.init = function(arr, jsav, m, options) {
	this.arr = arr;
	this.jsav = jsav;
	this.m = m;
	this.startParse = options.startParse;
}

controllerProto.startParsing = function() {
	var firsts = {};
	var follows = {};
	var arr = this.arr;
	var productions = _.map(_.filter(arr, function(x) { return x[0]}), function(x) {return x.slice();});
	if (productions.length === 0) {
		alert('No grammar.');
		return;
	}

	var parseHelper = new ParseHelper(productions, this.m, this.jsav);
	var grammarTools = new GrammarTools();
	var pDict = parseHelper.getDict();  // a dictionary mapping left sides to right sides

	var derivers = {};  // variables that derive lambda
	var counter = 0;
	while (grammarTools.removeLambdaHelper(derivers, productions)) {
		counter++;
		if (counter > 500) {
			console.log(counter);
			break;
		}
	};

	var VTObject = parseHelper.gatherVT();
	var v = VTObject.v;
	var t = VTObject.t;

	// populate firsts and follows sets
	for (var i = 0; i < v.length; i++) {
		firsts[v[i]] = parseHelper.first(v[i], pDict, derivers).sort();
	}
	for (var i = 0; i < v.length; i++) {
		follows[v[i]] = parseHelper.follow(v[i], productions, pDict, derivers).sort();
	}
	/*
	parseTable is the parse table, while parseTableDisplay is the matrix displayed to the user.
	parseTableDisplay includes the row/column headers (which are ignored by the click handler).
	*/
	parseTable = [];
	for (var i = 0; i < v.length; i++) {
		var a = [];
		for (var j = 0; j < t.length; j++) {
			a.push("");
		}
		parseTable.push(a);
	}
	// fill in parseTable
	for (var i = 0; i < productions.length; i++) {
		var pFirst = parseHelper.first(productions[i][2], pDict, derivers);
		var vi = v.indexOf(productions[i][0]);
		for (var j = 0; j < pFirst.length; j++) {
			var ti = t.indexOf(pFirst[j]);
			if (pFirst[j] !== emptystring && ti !== -1) {
				// exit parsing if a parse table conflict is found
				if (parseTable[vi][ti] && parseTable[vi][ti] !== productions[i][2]) {
					alert('This grammar is not LL(1)!');
					return;
				}
				parseTable[vi][ti] = productions[i][2];
			} 
		}
		if (pFirst.indexOf(emptystring) !== -1) {
			var pFollow = follows[productions[i][0]];
			for (var j = 0; j < pFollow.length; j++) {
				var ti = t.indexOf(pFollow[j]);
				if (pFollow[j] !== emptystring && ti !== -1) {
					// exit parsing if a parse table conflict is found
					if (parseTable[vi][ti] && parseTable[vi][ti] !== productions[i][2]) {
						alert('This grammar is not LL(1)!');
						return;
					}
					parseTable[vi][ti] = productions[i][2];
				}
			}
		}
	}

	this.startParse();
	$('#followbutton').show();
	$('.jsavcontrols').hide();
	$(this.m.element).css("margin-left", "auto");
	// $(m.element).css('position', 'absolute');

	// create the table for FIRST and FOLLOW sets
	var ffDisplay = [];
	ffDisplay.push(["", "FIRST", "FOLLOW"]);
	for (var i = 0; i < v.length; i++) {
		var vv = v[i];
		ffDisplay.push([vv, "", ""]);
	}
	this.jsav.umsg('Define FIRST sets. ! is '+emptystring+'.');
	ffTable = new this.jsav.ds.matrix(ffDisplay);
	// ffTable = new jsav.ds.matrix(ffDisplay, {left: "30px", relativeTo: m, anchor: "right top", myAnchor: "left top"});
	arrayStep = 1;
	ffTable.click(function(index) {
		parseHelper.firstFollowHandler(ffTable, index);
	});

	$('#followbutton').click(function () {
		var check = parseHelper.continueToFollow(firsts, follows); 
		if (check) {
			$('#parsetablebutton').show();
		}
	});

	// Function to check FOLLOW set and transition to parse table editing
	var continueToParseTable = function () {
		$('#firstinput').remove();
		var incorrect = checkTable(firsts, follows);
		// provide option to complete FOLLOW sets automatically
		if (incorrect.length > 0) {
			var confirmed = confirm('The following sets are incorrect: ' + incorrect + '.\nFix automatically?');
			if (confirmed) {
				for (var i = 1; i < ffTable._arrays.length; i++) {
					var a = ffTable._arrays[i].value(0);
					ffTable.value(i, 2, follows[a]);
				}
				layoutTable(ffTable);
			} else {
				return;
			}
		} 
		$(ffTable.element).off();
		$('#parsetablebutton').hide();
		$('#parsereadybutton').show();
		jsav.umsg('Fill entries in parse table. ! is '+emptystring+'.');
		var pTableDisplay = [];
		pTableDisplay.push([""].concat(t));
		for (var i = 0; i < v.length; i++) {
			var toPush = [v[i]];
			for (var j = 0; j < parseTable[i].length; j++) {
				toPush.push('');
			}
			pTableDisplay.push(toPush);
		}
		parseTableDisplay = new jsav.ds.matrix(pTableDisplay);
		parseTableDisplay.addClass("parseTableDisplay");
		parseTableDisplay.click(llparseTableHandler);
	};
	$('#parsetablebutton').click(continueToParseTable);
	$('#parsereadybutton').click(function() {
		checkllParseTable(parseTableDisplay, parseTable);
	});

	// do the parsing
	var continueParse = function () {
		var inputString = prompt('Input string');
		if (inputString === null) {
			return;
		}
		startParse();
		$(m.element).css("margin-left", "auto");
		//$(m.element).css('position', 'absolute');
		var pTableDisplay = [];
		pTableDisplay.push([""].concat(t));
		for (var i = 0; i < v.length; i++) {
			pTableDisplay.push([v[i]].concat(parseTable[i]));
		}
		//jsav.label('Grammar', {relativeTo: m, anchor: "center top", myAnchor: "center bottom"});
		parseTableDisplay = new jsav.ds.matrix(pTableDisplay);
		layoutTable(parseTableDisplay);
		//parseTableDisplay = new jsav.ds.matrix(pTableDisplay, {left: "30px", relativeTo: m, anchor: "right top", myAnchor: "left top"});
		var remainingInput = inputString + '$';
		// display remaining input and the parse stack
		updateSLRDisplay('<mark>' + remainingInput[0] + '</mark>' + remainingInput.substring(1) , ' <mark>' + productions[0][0] + '</mark>');
		jsav.displayInit();
		parseTree = new jsav.ds.tree();

		var next;
		var parseStack = [parseTree.root(productions[0][0])];

		updateSLRDisplay('<mark>' + remainingInput[0] + '</mark>' + remainingInput.substring(1), "");
		var accept = true;
		
		parseTree.layout();
		counter = 0;
		while (true) {
			counter++;
			if (counter > 500) {
				console.warn(counter);
				break;
			}
			next = parseStack.pop();
			if (!next) {
				break;
			}
			var vi = v.indexOf(next.value());
			var ti = t.indexOf(remainingInput[0])
			// if the terminal on the stack and the next terminal in the input do not match, the string is rejected
			if (vi === -1 && next.value() !== remainingInput[0]) {
				accept = false;
				break;
			}
			jsav.step();
			// if terminal:
			if (vi !== -1) {
				var toAdd = parseTable[vi][ti];
				if (!toAdd) {
					accept = false;
					break;
				}
				for (var j = 0; j < parseTableDisplay._arrays.length; j++) {
					parseTableDisplay._arrays[j].unhighlight();
				}
				// highlight the relevant cell in the parse table (offset by 1 due to row/column headers)
				parseTableDisplay.highlight(vi + 1, ti + 1);
				var temp = [];
				// create parse tree nodes
				for (var i = 0 ; i < toAdd.length; i++) {
					// note: .child(x, y) creates a child node but returns the parent
					var n = next.child(i, toAdd[i]).child(i);
					if (v.indexOf(toAdd[i]) === -1) {
						n.addClass('terminal');
					}
					if (toAdd[i] !== emptystring) {
						temp.unshift(n);
					}
				}
				parseStack = parseStack.concat(temp);
				parseTree.layout();
			} else if (next.value() === remainingInput[0]) {
					remainingInput = remainingInput.substring(1);
			} 
			updateSLRDisplay('<mark>' + remainingInput[0] + '</mark>' + remainingInput.substring(1),
				 _.map(parseStack, function(x, k) {
				if (k === parseStack.length - 1) {return '<mark>'+x.value()+'</mark>';} return x.value();}));
		}
		jsav.step();
		if (accept && remainingInput[0] === '$' && !next) {
			jsav.umsg('"' + inputString + '" accepted');
		} else {
			jsav.umsg('"' + inputString + '" rejected');
		}
		for (var j = 0; j < parseTableDisplay._arrays.length; j++) {
			parseTableDisplay._arrays[j].unhighlight();
		}
		jsav.recorded();
	};
	// allow user to parse repeatedly with different inputs
	$('#parsebutton').click(continueParse);
}
