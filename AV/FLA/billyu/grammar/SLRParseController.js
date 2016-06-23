var SLRParseController = function(arr, jsav, m, options) {
	this.init(arr, jsav, m, options);
}

var controllerProto = SLRParseController.prototype;

controllerProto.init = function(arr, jsav, m, options) {
	this.arr = arr;
	this.jsav = jsav;
	this.m = m;
	this.startParse = options.startParse;
}

controllerProto.startParsing = function() {
	var arr = this.arr;
	var productions = _.map(_.filter(arr, function(x) { return x[0]}), function(x) {return x.slice();});
	if (productions.length === 0) {
		alert('No grammar.');
		return;
	}
	var parseHelper = new ParseHelper(productions, this.m, this.jsav);

	var VTObject = parseHelper.gatherVT();
	// variables:
	var v = VTObject.v;
	// terminals:
	var t = VTObject.t;
	// terminals + variables:
	var tv = t.concat(v);
	// variables + terminals:
	var vt = v.concat(t);

	parseTable = [];
	for (var i = 0; i < productions.length; i++) {
		var a = [];
		for (var j = 0; j < tv.length; j++) {
			a.push("");
		}
		parseTable.push(a);
	}
	
	this.startParse();

	$(m.element).css("margin-left", "auto");
	// $(m.element).css('position', 'absolute');

	var slrM = [[0, "S'", arrow, productions[0][0]]];
	for (var i = 0; i < productions.length; i++) {
		var prod = productions[i];
		slrM.push([i+1, prod[0], prod[1], prod[2]]);
	}
	if (m) {
		m.clear();
	}
	m = jsav.ds.matrix(slrM, {style: "table"});
	layoutTable(m);

	var ffDisplay = [];
	ffDisplay.push(["", "FIRST", "FOLLOW"]);
	for (var i = 0; i < v.length; i++) {
		var vv = v[i];
		ffDisplay.push([vv, "", ""]);
	}
	jsav.umsg('Define FIRST sets. ! is '+emptystring+'.');
	ffTable = new jsav.ds.matrix(ffDisplay);
	// ffTable = new jsav.ds.matrix(ffDisplay, {left: "30px", relativeTo: m, anchor: "right top", myAnchor: "left top"});
	arrayStep = 1;

	// build DFA to model the parsing stack
	modelDFA = jsav.ds.fa({width: '90%', height: 440, layout: 'automatic'});
	var sNode = modelDFA.addNode();
	modelDFA.makeInitial(sNode);
	sNode.stateLabel("S'"+arrow+dot+productions[0][0]);
	var nodeStack = [sNode];
	while (nodeStack.length > 0) {
		var nextNode = nodeStack.pop();
		nextNode.addClass('slrvisited');
		var items = addClosure(nextNode.stateLabel().split('<br>'), productions);
		nextNode.stateLabel(items.join('<br>'));
		for (var i = 0; i < vt.length; i++) {
			var symbol = vt[i];
			var nextItems = addClosure(goTo(items, symbol), productions);
			if (nextItems.length > 0) {
				var nodes = modelDFA.nodes();
				var toNode = null;
				// check if node has already been created
				for (var next = nodes.next(); next; next = nodes.next()) {
					var curItems = next.stateLabel().split('<br>');
					var inter = _.intersection(curItems, nextItems);
					if (inter.length === curItems.length && inter.length === nextItems.length) {
						toNode = next;
					} 
				}
				if (!toNode) {
					toNode = modelDFA.addNode();
					toNode.stateLabel(nextItems.join('<br>'));
				}
				modelDFA.addEdge(nextNode, toNode, {weight: symbol});
				if (!toNode.hasClass('slrvisited')) {
					nodeStack.push(toNode);
				}
			}
		}
	}
	// add final states
	var nodes = modelDFA.nodes();
	for (var next = nodes.next(); next; next = nodes.next()) {
		var items = next.stateLabel().split('<br>');
		for (var i = 0; i < items.length; i++) {
			var r = items[i];
			if (r[r.length - 1] === dot) {
				next.addClass('final');
				break;
			}
		}
	}
	modelDFA.layout();

	// use DFA to generate the parse table
	var pDict = parseHelper.getDict();
	
	var derivers = {};  // variables that derive lambda
	var counter = 0;
	while (removeLambdaHelper(derivers, productions)) {
		counter++;
		if (counter > 500) {
			console.log(counter);
			break;
		}
	};
	// get FIRSTs and FOLLOWs
	var firsts = {};
	for (var i = 0; i < v.length; i++) {
		firsts[v[i]] = parseHelper.first(v[i], pDict, derivers).sort();
	}
	var follows = {};
	for (var i = 0; i < v.length; i++) {
		follows[v[i]] = parseHelper.follow(v[i], productions, pDict, derivers).sort();
	}

	// add the extra S' -> S production
	pDict["S'"] = productions[0][0];
	if (productions[0][0] in derivers) {
		derivers["S'"] = true;
	}
	productions.unshift(["S'", arrow, productions[0][0]]);

	// Create parse table using the DFA
	nodes.reset();
	var index = 0;
	conflictTable = [];
	for (var next = nodes.next(); next; next = nodes.next()) {
		var row = [];
		var conflictRow = [];
		for (var j = 0; j < tv.length; j++) {
			row.push("");
			conflictRow.push([]);
		}
		parseTable.push(row);
		conflictTable.push(conflictRow);
		var edges = next.getOutgoing();
		for (var i = 0; i < edges.length; i++) {
			var w = edges[i].weight().split('<br>');
			for (var j = 0; j < w.length; j++) {
				var ti = t.indexOf(w[j]);
				if (ti !== -1) {
					var entry = 's' + edges[i].end().value().substring(1);
					parseTable[index][ti] = entry;
					conflictTable[index][ti].push(entry);
				} else {
					var vi = tv.indexOf(w[j]);
					parseTable[index][vi] = edges[i].end().value().substring(1);
				}
			}
		}
		if (next.hasClass('final')) {
			var l = next.stateLabel().split('<br>');
			var rItem = null;
			var rk = [];
			for (var i = 0; i < l.length; i++){
				if (l[i].indexOf(dot) === l[i].length - 1) {
					rItem = l[i].substring(0, l[i].length-1);
					if (!rItem.split(arrow)[1]) {
						rItem = rItem + emptystring;
					}
					break;
				}
			}
			if (rItem.substr(0, 2) === "S'") {
				var ti = tv.indexOf('$');
				parseTable[index][ti] = 'acc';
			} else {
				for (var i = 0; i < productions.length; i++) {
					if (productions[i].join('') === rItem) {
						rk.push(i);
					}
				}
				for (var j = 0; j < rk.length; j++) {
					var followSet = follows[productions[rk[j]][0]];
					for (var i = 0; i < followSet.length; i++) {
						var ti = tv.indexOf(followSet[i]);
						parseTable[index][ti] = 'r' + rk[j];
						conflictTable[index][ti].push('r' + rk[j]);
					}
				}
			}
		}
		index++;
	}

	var conflict = _.filter(conflictTable, function(row) {return _.filter(row, function(entry) {return entry.length > 1;});});

	modelDFA.hide();
	$('#followbutton').show();
	$('.jsavcontrols').hide();

	if (conflict.length > 0) {
		var contin = confirm("This grammar is not SLR(1)\nContinue?");
		if (!contin) {
			$('#backbutton').click();
			return;
		}
	}
		
	// interactable FIRST/FOLLOW, same as LL parsing
	ffTable.click(function(index) {
		parseHelper.firstFollowHandler(ffTable, index);
	});
	$('#followbutton').click(function () {
		var check = parseHelper.continueToFollow(firsts, follows);
		if (check) {
			$('#slrdfabutton').show();
		}
	});
	// Function to check FOLLOW sets and initialize the DFA
	var continueToDFA = function () {
		$('#firstinput').remove();
		var incorrect = checkTable(firsts, follows);
		// provide option to complete the FOLLOW sets automatically
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
		$('#slrdfabutton').hide();
		$('#parsetablebutton').show();
		jsav.umsg('Build the DFA: Click a state.');

		// create the DFA
		var t = this;
		builtDFA = jsav.ds.fa({width: '90%', height: 440});
		builtDFA.enableDragging();
		builtDFA.click(function(e) {
			t.dfaHandler(e);
		});
		$('.jsavgraph').click(function(e) {
			t.graphHandler(e);
		});
		$('#av').append($('#dfabuttons'));
		$('#dfabuttons').show();
		var pr = confirm("Would you like to define the initial set yourself?");
		if (pr) {
			// user fills out the initial set in the goTo window and adds the initial node to the graph manually
			localStorage['slrdfaproductions'] = _.map(productions, function(x) {return x.join('');});
			localStorage['slrdfasymbol'] = 'initial';
			window.open('slrGoTo.html', '', 'width = 800, height = 750, screenX = 300, screenY = 25');
			jsav.umsg("Add the initial node.");
		} else {
			// initial state is added automatically
			var builtInitial = builtDFA.addNode({left: 50, top: 50});
			builtDFA.makeInitial(builtInitial);
			builtInitial.stateLabel(modelDFA.initial._stateLabel.element[0].innerHTML);
			builtDFA.layout();
		}
	};
	$('#slrdfabutton').click(continueToDFA);

	// Function to check the DFA and transition to the parse table
	var continueToParseTable = function () {
		var edges1 = modelDFA.edges();
		var edges2 = builtDFA.edges();
		var tCount1 = 0,
				tCount2 = 0,
				correctFinals = true;
		for (var next = edges1.next(); next; next = edges1.next()) {
			tCount1 = tCount1 + next.weight().split('<br>').length;
		}
		for (var next = edges2.next(); next; next = edges2.next()) {
			tCount2 = tCount2 + next.weight().split('<br>').length;
		}
		var bNodes = builtDFA.nodes();
		for (var next = bNodes.next(); next; next = bNodes.next()) {
			var nis = next.stateLabel().split('<br>');
			var ff = _.find(nis, function(x) {return x[x.length - 1] === dot; });
			if (ff && !next.hasClass('final')) {
				correctFinals = false;
				break;
			}
			if (!ff && next.hasClass('final')) {
				correctFinals = false;
				break;
			}
		}
		// if the number of transitions and number of nodes match, and final nodes are correct
		if (tCount1 !== tCount2 || modelDFA.nodeCount() !== builtDFA.nodeCount() || !correctFinals) {
			var confirmed = confirm('Not finished!\nFinish automatically?');
			// "finish automatically" = displaying the model DFA. This changes the layout.
			if (confirmed) {
				builtDFA.clear();
				modelDFA.show();
			} else {
				return;
			}
		} 
		$('#dfabuttons').hide();
		$('#parsetablebutton').hide();
		$('#parsereadybutton').show();
		jsav.umsg('Fill entries in parse table. ! is '+emptystring+'.');
		// initialize parse table display
		var pTableDisplay = [];
		pTableDisplay.push([""].concat(tv));
		for (var i = 0; i < modelDFA.nodeCount(); i++) {
			var toPush = [i];
			for (var j = 0; j < parseTable[i].length; j++) {
				toPush.push('');
			}
			pTableDisplay.push(toPush);
		}
		//jsav.label('Grammar', {relativeTo: m, anchor: "center top", myAnchor: "center bottom"});
		parseTableDisplay = new jsav.ds.matrix(pTableDisplay);
		parseTableDisplay.click(slrparseTableHandler);
	};
	$('#parsetablebutton').click(continueToParseTable);
	$('#parsereadybutton').click(function() {
		checkslrParseTable(parseTableDisplay, parseTable);
	});

	// do the parsing
	var continueParse = function () {
		$('#buttons').prepend($('#parsebutton'));
		var inputString = prompt('Input string');
		if (inputString === null) {
			return;
		}
		startParse();
		var slrM = [];
		for (var i = 0; i < productions.length; i++) {
			var prod = productions[i];
			slrM.push([i, prod[0], prod[1], prod[2]]);
		}
		if (m) {
			m.clear();
		}
		m = jsav.ds.matrix(slrM, {style: "table"});
		layoutTable(m);
		var pTableDisplay = [];
		pTableDisplay.push([""].concat(tv));
		for (var i = 0; i < modelDFA.nodeCount(); i++) {
			pTableDisplay.push([i].concat(parseTable[i]));
		}
		//parseTableDisplay = new jsav.ds.matrix(pTableDisplay, {left: "30px", relativeTo: m, anchor: "right top", myAnchor: "left top"});
		$(m.element).css("margin-left", "auto");
		$(m.element).css("margin-top", "0px");
		parseTableDisplay = new jsav.ds.matrix(pTableDisplay);
		layoutTable(parseTableDisplay);
		// The parse 'tree' is a directed graph with layered output. This allows the tree to be built bottom up
		parseTree = new jsav.ds.graph({layout: "layered", directed: true});
		parseTree.element.addClass('parsetree');
		var remainingInput = inputString + '$';
		var parseStack = [0];
		var currentRow = 0;
		var accept = false;
		var displayOrder = [];
		updateSLRDisplay(remainingInput, productions[1][0]);

		$('.jsavcontrols').insertAfter($('.jsavmatrix:eq(1)'));
		$('.jsavoutput').insertAfter($('.jsavcontrols'));
		var container = document.getElementById("container");
		container.scrollTop = container.scrollHeight;
	 
		jsav.displayInit();
		// m.hide();
		// parseTableDisplay.hide();
		updateSLRDisplay(remainingInput ,"");
		
		counter = 0;
		while (true) {
			counter++;
			if (counter > 500) {
				console.warn(counter);
				break;
			}
			// index of the lookahead
			var lookAhead = tv.indexOf(remainingInput[0]);
			// parse table entry to be processed
			var entry = parseTable[currentRow][lookAhead];
			for (var j = 0; j < m._arrays.length; j++) {
				m.unhighlight(j);
			}
			for (var j = 0; j < parseTableDisplay._arrays.length; j++) {
				parseTableDisplay.unhighlight(j);
			}
			parseTableDisplay.highlight(currentRow+1, lookAhead+1);
			if (!entry) {
				break;
			} 
			if (entry === 'acc') {
				accept = true;
				jsav.step();
				break;
			}
			if (entry[0] === 's') {             // shift
				// add parse tree node, and add items to the stack
				var term = parseTree.addNode(remainingInput[0]);
				term.addClass('terminal');
				parseStack.push(term);
				displayOrder.push(term);
				currentRow = Number(entry.substring(1));
				parseStack.push(currentRow);
				remainingInput = remainingInput.substring(1);
				parseTree.layout();
			} else if (entry[0] === 'r') {      // reduce
				var pIndex = Number(entry.substring(1));
				var p = productions[pIndex];
				m.highlight(pIndex);
				if (p[2] === emptystring) {
					var lNode = parseTree.addNode(emptystring);
					lNode.addClass('terminal');
					parseTree.layout();
					jsav.step();
					var par = parseTree.addNode(p[0]);
					parseTree.addEdge(par, lNode);
					var n = currentRow;
				} else {
					var par = parseTree.addNode(p[0]);
					var childs = [];
					for (var i = p[2].length - 1; i >= 0; i--) {
						parseStack.pop();
						childs.unshift(parseStack.pop());
					}
					for (var i = 0; i < childs.length; i++) {
						parseTree.addEdge(par, childs[i]);
					}
					var n = parseStack[parseStack.length - 1];
				}
				parseTree.layout();
				updateSLRDisplay(remainingInput,
					_.map(parseStack, function(x, k) {
					if (typeof x === 'number' || typeof x === 'string') {
						return x;
					}
					return x.value();}));
				jsav.step();
				parseStack.push(par);
				displayOrder.push(par);
				currentRow = Number(parseTable[n][tv.indexOf(p[0])]);
				for (var j = 0; j < parseTableDisplay._arrays.length; j++) {
					parseTableDisplay.unhighlight(j);
				}
				parseTableDisplay.highlight(n+1, tv.indexOf(p[0]) + 1);
				parseStack.push(currentRow);
				parseTree.layout();
			}
			updateSLRDisplay(remainingInput,
				 _.map(parseStack, function(x, k) {
				if (typeof x === 'number' || typeof x === 'string') {
					return x;
				}
				return x.value();}));
			jsav.step();
		}
		if (accept) {
			jsav.umsg('"' + inputString + '" accepted');
		} else {
			jsav.umsg('"' + inputString + '" rejected');
		}
		jsav.recorded();
	};
	$('#parsebutton').click(continueParse);
}

controllerProto.dfaHandler = function(e) {
  // SLR(1) parsing helpers:
  // click handler for the nodes of the DFA being built
	if (selectedNode) {
		selectedNode.unhighlight();
	}
	if ($('.jsavgraph').hasClass('addfinals')) {
		this.toggleClass('final');
	} 
	else {
		this.highlight();
		// if node clicked is the toNode for the new edge
		// check for goto set
		if(selectedNode && localStorage['slrdfareturn']) {
			var newItemSet = localStorage['slrdfareturn'].replace(/,/g, '<br>');
			if (this.stateLabel() === newItemSet) {
				builtDFA.addEdge(selectedNode, this, {weight: localStorage['slrdfasymbol']});
				builtDFA.layout();
				jsav.umsg("Build the DFA: Click a state.");
				selectedNode.unhighlight();
				this.unhighlight();
				selectedNode = null;
				return;
			} else {
				alert('Incorrect.');
				this.unhighlight();
				return;
			}
		}
		// if node clicked is fromNode
		var pr = prompt('Grammar symbol for the transition?');
		if (!pr) {
			this.unhighlight();
			return;
		}
		var bEdges = this.getOutgoing();
		for (var i = 0; i < bEdges.length; i++) {
			if (bEdges[i].weight().split('<br>').indexOf(pr) !== -1) {
				alert('Transition already created.');
				this.unhighlight();
				return;
			}
		}
		selectedNode = this;
		var nodes = modelDFA.nodes();
		var checkNode;
		for (var next = nodes.next(); next; next = nodes.next()) {
			// get state label of the hidden node:
			var modelItems = next._stateLabel.element[0].innerHTML.split('<br>');
			// get state label of the visible node:
			var builtItems = this.stateLabel().split('<br>');
			// find the model node corresponding to the selected node:
			var inter = _.intersection(modelItems, builtItems);
			if (inter.length === modelItems.length && inter.length === builtItems.length) {
				checkNode = next;
				break;
			} 
		}
		// find model edge corresponding to transition to be built
		var edges = checkNode.getOutgoing();
		for (var i = 0; i < edges.length; i++) {
			var w = edges[i].weight().split('<br>');
			if (w.indexOf(pr) !== -1) {
				// open goto window for user to fill out the item set
				var productions = _.filter(arr, function(x) {return x[0];});
				localStorage['slrdfaproductions'] = ["S'" + arrow + productions[0][0]].concat(_.map(productions, function(x) {return x.join('');}));
				localStorage['slrdfaitemset'] = this.stateLabel().split('<br>');
				localStorage['slrdfasymbol'] = pr;
				window.open('slrGoTo.html', '', 'width = 800, height = 750, screenX = 300, screenY = 25');
				jsav.umsg('Place the new node.');
				break;
			}
		}
		e.stopPropagation();
	}
}

controllerProto.graphHandler = function(e) {
  // click handler for the DFA graph window/canvas
	// if adding initial node
	if (localStorage['slrdfareturn'] && localStorage['slrdfasymbol'] === 'initial') {
		var builtInitial = builtDFA.addNode({left: 50, top: 50}),
				nodeX = builtInitial.element.width()/2.0,
				nodeY = builtInitial.element.height()/2.0;
		$(builtInitial.element).offset({top: e.pageY - nodeY, left: e.pageX - nodeX});
		builtDFA.makeInitial(builtInitial);
		builtInitial.stateLabel(localStorage['slrdfareturn'].replace(/,/g, '<br>'));
		builtDFA.layout();
		localStorage.removeItem('slrdfareturn');
		localStorage.removeItem('slrdfasymbol');
		jsav.umsg('Build the DFA: Click a state.');
		return;
	}
	// if user has determined the next item set and is ready to place the new DFA node
	if(selectedNode && localStorage['slrdfareturn']) {
		var newItemSet = localStorage['slrdfareturn'].replace(/,/g, '<br>');
		var newItemSetArr = newItemSet.split('<br>');
		// check to see if the toNode has already been created
		var nodes = builtDFA.nodes();
		for (var next = nodes.next(); next; next = nodes.next()) {
			var sla = next.stateLabel().split('<br>');
			var inter = _.intersection(sla, newItemSetArr);
			if (inter.length === sla.length && inter.length === newItemSetArr.length) {
				alert('The node already exists!');
				return;
			}
		}
		// add new node
		var newNode = builtDFA.addNode(),
				nodeX = newNode.element.width()/2.0,
				nodeY = newNode.element.height()/2.0;
		$(newNode.element).offset({top: e.pageY - nodeY, left: e.pageX - nodeX});
		newNode.stateLabel(newItemSet);
		builtDFA.addEdge(selectedNode, newNode, {weight: localStorage['slrdfasymbol']});
		builtDFA.layout();
		jsav.umsg("Build the DFA: Click a state.");
		selectedNode.unhighlight();
		selectedNode = null;
	}
}

controllerProto.updateSLRDisplay = function(remainingInput, stack) {
	this.jsav.umsg("<pre>Remaining Input: " + remainingInput + "\nStack: " + stack + "</pre>");
}
