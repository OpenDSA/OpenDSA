(function ($) {
	var jsav = new JSAV("av"),
		jsavArray,
		first = null,
		selected = null,
		label = null,
		undoStack,
		redoStack,
		g,
		lambda = String.fromCharCode(955),
		epsilon = String.fromCharCode(949),
		emptystring = lambda,
		pretraverseFunction = pretraverse;
    
    var initialize = function(graph) {
		g = graph;
		initGraph({layout: "automatic"});
	};

	var initGraph = function(opts) {
		$('.jsavgraph').remove();
		var gg = jQuery.parseJSON(g);
		g = jsav.ds.fa($.extend({width: '90%', height: 440}, opts));
		for (var i = 0; i < gg.nodes.length; i++) {
	    	var node = g.addNode('q' + i),
	    		offset = $('.jsavgraph').offset(),
	    		offset2 = parseInt($('.jsavgraph').css('border-width'), 10);
	    	$(node.element).offset({top : parseInt(gg.nodes[i].top) + offset.top + offset2, left: parseInt(gg.nodes[i].left) + offset.left + offset2});
	    	if (gg.nodes[i].i) {
	    		g.makeInitial(node);
	    	}
	    	var outputChar = delambdafyMoore(gg.nodes[i].mooreOutput);
	    	if (!outputChar) {
	    		outputChar = emptystring;
	    	}
	    	else if ((outputChar == lambda || outputChar == epsilon) && outputChar != emptystring) {
	    		emptyString();
	    	}
	    	node.mooreOutput(outputChar);
	    	node.stateLabel(gg.nodes[i].stateLabel);
	    	node.stateLabelPositionUpdate();
	  	}
	  	for (var i = 0; i < gg.edges.length; i++) {
	    	if (gg.edges[i].weight !== undefined) {
	    		var w = delambdafy(gg.edges[i].weight);
	    		w = checkEmptyString(w);
	    		var edge = g.addEdge(g.nodes()[gg.edges[i].start], g.nodes()[gg.edges[i].end], {weight: w});
        	}
	    	else {
	    		var edge = g.addEdge(g.nodes()[gg.edges[i].start], g.nodes()[gg.edges[i].end]);
	    	}
	    	edge.layout();
	    }
	    if (gg.shorthand) {
	    	setShorthand(true);
	    }
	    else {
	    	setShorthand(false);
	    }
	    finalize();
    };

    var finalize = function() {
    	updateAlphabet();
	    updateMooreOutput();
	    jsav.displayInit();
	    g.click(nodeClickHandler);
		g.click(edgeClickHandler, {edge: true});
		$('.jsavgraph').click(graphClickHandler);
		$('.jsavedgelabel').click(labelClickHandler);
    };

    var checkEmptyString = function(w) {
    	var wArray = w.split("<br>");
    	for (var i = 0; i < wArray.length; i++) {
    		wArray[i] = wArray[i].split(":")[0];
    		if ((wArray[i] == lambda || wArray[i] == epsilon) && wArray[i] != emptystring) {
    			emptyString();
    		}
    	}
    	return wArray.join("<br>");
    };

	var graphClickHandler = function(e) {
		if ($(".jsavgraph").hasClass("addNodes")) {
			saveMooreState();
			selected = executeAddNode(g, e.pageY, e.pageX);
			selected.highlight();
			var Prompt = new MooreNodePrompt(createNode, cancelNode, emptystring);
			Prompt.render(selected.value(), selected.hasClass('start'), selected.stateLabel(), selected.mooreOutput());
			selected.unhighlight();
		} 
		else if ($('.jsavgraph').hasClass('moveNodes') && selected != null) {
			saveMooreState();
			executeMoveNode(g, selected, e.pageY, e.pageX);
			selected.unhighlight();
			selected = null;
			e.stopPropagation();
			jsav.umsg('Click a node.');
		}
	};

	var nodeClickHandler = function(e) {	
		if ($(".jsavgraph").hasClass("editNodes")) {
			selected = this;
			selected.highlight();
			var Prompt = new MooreNodePrompt(updateNode, doNothing, emptystring);
			Prompt.render(selected.value(), selected.hasClass('start'), selected.stateLabel(), selected.mooreOutput());
			selected.unhighlight();
		}
		else if ($(".jsavgraph").hasClass("addEdges")) {
			if (!$(".jsavgraph").hasClass("working")) {
				first = this;
				first.highlight();
				$('.jsavgraph').addClass("working");
				jsav.umsg('Select a node to make an edge to.');
   			}
   			else {
   				selected = this;
   				selected.highlight();
   				var Prompt = new EdgePrompt(createEdge, emptystring);
   				Prompt.render("");
				$('.jsavgraph').removeClass("working");
				first.unhighlight();
				selected.unhighlight();
				jsav.umsg('Click a node.');
   			}
		}
		else if ($('.jsavgraph').hasClass('moveNodes')) {
			if (selected) {
				selected.unhighlight();
			}
			selected = this;
			selected.highlight();
			jsav.umsg('Click to place node.');
			e.stopPropagation();
		}
		else if ($('.jsavgraph').hasClass('deleteNodes')) {
			saveMooreState();
			executeDeleteNode(g, this);
			updateAlphabet();
			updateMooreOutput();
			checkAllEdges();
		}
	};

	var edgeClickHandler = function(e) {
		if ($('.jsavgraph').hasClass('deleteNodes')) {
			saveMooreState();
			executeDeleteEdge(g, this);
			updateAlphabet();
			checkAllEdges();
		}
	};

	var labelClickHandler = function(e) {
		if ($('.jsavgraph').hasClass('editNodes')) {
			label = this;
			var values = $(label).html().split('<br>');
			var Prompt = new EdgePrompt(updateEdge, emptystring);
   			Prompt.render(values);
		}
	};

	function doNothing() {
		return;
	};

	function cancelNode() {
		g.removeNode(selected);
		undoStack.pop();
		if(undoStack.length == 0) {
			document.getElementById("undoButton").disabled = true;
		}
		updateMooreOutput();
	};

	function createNode(initial_state, node_label, output_char) {
		executeEditMooreNode(g, selected, initial_state, node_label, output_char);
		updateMooreOutput();
	};

	function updateNode(initial_state, node_label, output_char) {
		saveMooreState();
		executeEditMooreNode(g, selected, initial_state, node_label, output_char);
		updateMooreOutput();
	};

	function createEdge(edge_label) {
		saveMooreState();
		var edge = executeAddEdge(g, first, selected, edge_label);
		$(edge._label.element).click(labelClickHandler);
		updateAlphabet();
		checkEdge(edge);
	};

	function updateEdge(edge_label) {
		saveMooreState();
		executeEditEdge(g, label, edge_label);
		updateAlphabet();
		checkAllEdges();
		if (!g.shorthand) {
			var weights = edge_label.split("<br>");
			for (var i = 0; i < weights.length; i++) {
				if (weights[i].length > 1) {
					window.alert("Shorthand notation is disabled for this automaton.\n\nTo traverse, please enter only single character transition labels.");
					break;
				}
			}	
		}
	};

	function checkEdge(edge) {
		if (g.shorthand) {
			return;
		}
		var weights = edge.weight().split("<br>");
		for (var i = 0; i < weights.length; i++) {
			if (weights[i].length > 1) {
				window.alert("Shorthand notation is disabled for this automaton.\n\nTo traverse, please enter only single character transition labels.");
				edge.addClass('testingShorthand');
				document.getElementById("begin").disabled = true;
				break;
			}
		}
	};

	function checkAllEdges() {
		if (g.shorthand) {
			return;
		}
		document.getElementById("begin").disabled = false;
		var edges = g.edges();
		for (var next = edges.next(); next; next = edges.next()) {
			next.removeClass('testingShorthand');
			var weights = next.weight().split("<br>");
			for (var i = 0; i < weights.length; i++) {
				if (weights[i].length > 1) {
					next.addClass('testingShorthand');
					document.getElementById("begin").disabled = true;
				}
			}
		}
	};

	var updateAlphabet = function() {
		g.updateAlphabet();
		$("#alphabet").html("" + Object.keys(g.alphabet).sort());
	};

	var updateMooreOutput = function() {
		var alphabet = {};
		var nodes = g.nodes();
		var w;
		for (var next = nodes.next(); next; next = nodes.next()) {
  			var letter = next.mooreOutput();
  			if (letter !== emptystring) {
  				if (!(letter in alphabet)) {
 	     			alphabet[letter] = 0;
    			}
   				alphabet[letter]++;
			}
		}
		$("#mooreOutput").html("" + Object.keys(alphabet).sort());
	};

	var addNodes = function() {
		removeModeClasses();
		removeND();
		$('.jsavgraph').addClass("addNodes");
		$("#mode").html('Adding nodes');
		jsav.umsg('Click to add nodes.');
	};

	var addEdges = function() {
		removeModeClasses();
		removeND();
		$(".jsavgraph").addClass("addEdges");
		$("#mode").html('Adding edges');
		jsav.umsg('Click a node.');
	};

	var moveNodes = function() {
		removeModeClasses();
		removeND();
		$('.jsavgraph').addClass('moveNodes');
		$("#mode").html('Moving nodes');
		jsav.umsg('Click a node.');
	};

	var editNodes = function() {
		removeModeClasses();
		removeND();
		$('.jsavgraph').addClass('editNodes');
		$("#mode").html('Editing nodes and edges');
		jsav.umsg('Click a node or edge label.');
	};

	var deleteNodes = function() {
		removeModeClasses();
		removeND();
		$('.jsavgraph').addClass('deleteNodes');
		$("#mode").html('Deleting nodes and edges');
		jsav.umsg('Click a node or edge to delete it.');
		expandEdges();
	};

	var removeModeClasses = function() {
		$('.arrayPlace').empty();
		$('#download').html('');
		$("#mode").html('');
		jsav.umsg('');
		if (first) {
			first.unhighlight();
			first = null;
		}
		if (selected) {
			selected.unhighlight();
			selected = null;
		}
		if($(".jsavgraph").hasClass("deleteNodes")) {
			$(".jsavgraph").removeClass("deleteNodes");
			collapseEdges();
		}
		else {
			$(".jsavgraph").removeClass("addNodes");
			$(".jsavgraph").removeClass("addEdges");
			$(".jsavgraph").removeClass("editNodes");
			$(".jsavgraph").removeClass("moveNodes");
			$(".jsavgraph").removeClass("working");
		}
	};

	var expandEdges = function() {
		var edges = g.edges();
		for (var next = edges.next(); next; next = edges.next()) {
			next.g.element.addClass('edgeSelect');
		}
	};

	var collapseEdges = function() {
		var edges = g.edges();
		for (var next = edges.next(); next; next = edges.next()) {
			next.g.element.removeClass('edgeSelect');
		}
	};

	var switchEmptyString = function() {
		removeModeClasses();
		removeND();
		saveMooreState();
		if(!emptyString()) {
			undoStack.pop();
			if(undoStack.length == 0) {
				document.getElementById("undoButton").disabled = true;
			}
		}
	};

	var emptyString = function() {
		document.getElementById("epsilonButton").innerHTML = emptystring + " Mode";
		var graphChanged = false;
		if (emptystring === lambda) {
			graphChanged = updateTransitions(epsilon);
			emptystring = epsilon;
		}
		else {
			graphChanged = updateTransitions(lambda);
			emptystring = lambda;
		}
		document.getElementById("lambdaButton").innerHTML = "Highlight " + emptystring + "-Transitions";
		return graphChanged;
	};

	var updateTransitions = function(greekLetter) {
		var graphChanged = false;
		var nodes = g.nodes();
		for (var next = nodes.next(); next; next = nodes.next()) {
			if (next.mooreOutput() === emptystring) {
				next.mooreOutput(greekLetter);
				graphChanged = true;
			}
		}
		var edges = g.edges();
		for (var next = edges.next(); next; next = edges.next()) {
			var weights = next.weight().split("<br>");
			for (var i = 0; i < weights.length; i++) {
				if (weights[i] === emptystring) {
					weights[i] = greekLetter;
					graphChanged = true;
				}
			}
			next.weight(weights.join("<br>"));
		}
		return graphChanged;
	};

	var testND = function() {
		removeModeClasses();
		var nd = false;
		var nodes = g.nodes();
		for(var next = nodes.next(); next; next = nodes.next()) {
			var findLambda = false;
			var findMultiple = false;
			var transition = g.transitionFunction(next, emptystring);
			if (transition.length > 0) {
				findLambda = true;
			}
			for (var key in g.alphabet) {
				transition = g.transitionFunctionMultiple(next, key);
				if (transition.length > 1) {
					findMultiple = true;
					break;
				}
			}
			if (findLambda || findMultiple) {
				next.toggleClass('testingND');
				nd = true;
			}
		}
		return nd;
	};

	var testLambda = function() {
		removeModeClasses();
		var edges = g.edges();
		for (var next = edges.next(); next; next = edges.next()) {
			wSplit = next.weight().split('<br>');
			for (var i = 0; i < wSplit.length; i++) {
				if (wSplit[i] == emptystring) {
					next.g.element.toggleClass('testingLambda');
					break;
				}
			}
		}
	};

	var removeND = function() {
		var nodes = g.nodes();
		for(var next = nodes.next(); next; next = nodes.next()) {
			next.removeClass("testingND");
		}
		var edges = g.edges();
		for (var next = edges.next(); next; next = edges.next()) {
			next.g.element.removeClass('testingLambda');
		}
	};

	var layoutGraph = function() {
		removeModeClasses();
		removeND();
		saveMooreState();
		g.layout();
	};
	
	var readyTraversal = function() {
		removeModeClasses();
		jsav.umsg('Click on an input to trace its traversal.');
	};

	var displayTraversals = function () {
		if (g.initial == null) {
			window.alert("Moore traversal requires an initial state.");
			return;
		}
		var nodes = g.nodes();
		for (var next = nodes.next(); next; next = nodes.next()) {
			if (!next.mooreOutput()) {
				window.alert("This automaton is not a Moore Machine.");
				return;
			}
		}
		removeND();
		if (testND()) {
			testLambda();
			window.alert("This Moore Machine is nondeterministic.\nYou cannot run input on it.");
			return;
		};
		var Prompt = new TraversePrompt(traverseInputs);
		Prompt.render();
	};

	var traverseInputs = function(inputArray) {
		var nodes = g.nodes();
		for (var next = nodes.next(); next; next = nodes.next()) {
			next.removeClass('current');
		}
		var outputArray = [];
		var acceptArray = [];
		readyTraversal();
		for (var i = 0; i < inputArray.length; i++) {
			var outputData = pretraverseFunction(g, inputArray[i]);
			acceptArray.push(outputData[0]);
			if (outputData[0]) {
				outputArray.push(outputData[1]);
			}
			else {
				outputArray.push("Rejected");
			}
		}
		var travArray = [];
		for (var j = 0; j < inputArray.length; j++) {
			if (!inputArray[j]) {
				inputArray[j] = emptystring;
			}
			if (!outputArray[j]) {
				outputArray[j] = emptystring;
			}
			travArray.push(inputArray[j] + "<br><b>" + outputArray[j] +"</b>");
		}
		jsavArray = jsav.ds.array(travArray, {element: $('.arrayPlace')});
		for (var k = 0; k < travArray.length; k++) {
			if(acceptArray[k]){
				jsavArray.css(k, {"background-color": "green"});
			}
			else {
				jsavArray.css(k, {"background-color": "red"});
			}
		}
		$('.arrayPlace').off("click");
		jsavArray.click(arrayClickHandler);
		jsavArray.show();
	};

	function arrayClickHandler(index) {
		play(this.value(index).split("<br>")[0]);
	};

	var play = function (inputString) {
		localStorage['graph'] = serialize(g);
		localStorage['traversal'] = inputString;
		window.open("./MooreTraversal.html");
	};

	function switchShorthand() {
		removeModeClasses();
		removeND();
		saveMooreState();
		setShorthand(!g.shorthand);
	};

	function setShorthand (setBoolean) {
		g.setShorthand(setBoolean);
		if (g.shorthand) {
			document.getElementById("begin").disabled = false;
			document.getElementById("shorthandButton").innerHTML = "Disable Shorthand";
			pretraverseFunction = pretraverseShorthand;
			var edges = g.edges();
			for (var next = edges.next(); next; next = edges.next()) {
				next.removeClass('testingShorthand');
			}
		}
		else {
			document.getElementById("shorthandButton").innerHTML = "Enable Shorthand";
			pretraverseFunction = pretraverse;
			checkAllEdges();
		}
	};

	function resetUndoButtons () {
		document.getElementById("undoButton").disabled = true;
		document.getElementById("redoButton").disabled = true;
		undoStack = [];
		redoStack = [];
	};

	function saveMooreState () {
		var data = serialize(g);
		undoStack.push(data);
		redoStack = [];
		document.getElementById("undoButton").disabled = false;
		document.getElementById("redoButton").disabled = true;
		if (undoStack.length > 20) {
			undoStack.shift();
		}
	};

	function undo () {
		removeModeClasses();
		var data = serialize(g);
		redoStack.push(data);
		data = undoStack.pop();
		initialize(data);
		document.getElementById("redoButton").disabled = false;
		if(undoStack.length == 0) {
			document.getElementById("undoButton").disabled = true;
		}
	};

	function redo () {
		removeModeClasses();
		var data = serialize(g);
		undoStack.push(data);
		data = redoStack.pop();
		initialize(data);
		document.getElementById("undoButton").disabled = false;
		if(redoStack.length == 0) {
			document.getElementById("redoButton").disabled = true;
		}
	};

	function onLoadHandler() {
		var data = '{"nodes":[{"left":508,"top":201,"i":true,"f":false,"stateLabel":"","mooreOutput":"l"},{"left":345,"top":43,"i":false,"f":false,"stateLabel":"","mooreOutput":"a"},{"left":184,"top":357,"i":false,"f":false,"stateLabel":"","mooreOutput":"p"},{"left":815,"top":42,"i":false,"f":false,"stateLabel":"","mooreOutput":"j"},{"left":660,"top":366,"i":false,"f":false,"stateLabel":"","mooreOutput":"f"}],"edges":[{"start":0,"end":3,"weight":"a"},{"start":0,"end":1,"weight":"d"},{"start":1,"end":2,"weight":"e"},{"start":2,"end":0,"weight":"f"},{"start":3,"end":4,"weight":"b"},{"start":4,"end":0,"weight":"c"}]}';
		initialize(data);
		resetUndoButtons();
	};

	var serializeGraphToXML = function (graph) {
		var text = '<?xml version="1.0" encoding="UTF-8"?>';
	    text = text + "<structure>";
	    text = text + "<type>moore</type>"
	    text = text + "<automaton>"
	    var nodes = graph.nodes();
	    for (var next = nodes.next(); next; next = nodes.next()) {
	    	var left = next.position().left;
		    var top = next.position().top;
		    var i = next.hasClass("start");
		    var label = next.stateLabel();
		    var output = next.mooreOutput();
		    text = text + '<state id="' + next.value().substring(1) + '" name="' + next.value() + '">';
		    text = text + '<x>' + left + '</x>';
		    text = text + '<y>' + top + '</y>';
		    if (label) {
		    	text = text + '<label>' + label + '</label>';
		    }
		    if (i) {
		    	text = text + '<initial/>';
		    }
		    if (output === emptystring) {
		    	text = text + '<output/>';
		    }
		    else {
		    	text = text + '<output>' + output + '</output>';
		    }
	    	text = text + '</state>';
	    }
	    var edges = graph.edges();
	    for (var next = edges.next(); next; next = edges.next()) {
	    	var fromNode = next.start().value().substring(1);
	    	var toNode = next.end().value().substring(1);
	    	var w = next.weight().split('<br>');
	    	var wout = next.end().mooreOutput();
	    	for (var i = 0; i < w.length; i++) {
	    		text = text + '<transition>';
	    		text = text + '<from>' + fromNode + '</from>';
	    		text = text + '<to>' + toNode + '</to>';
	    		if (w[i] === emptystring) {
	    			text = text + '<read/>';
	    		}
	    		else {
	    			text = text + '<read>' + w[i] + '</read>';
	    		}
	    		if (wout === emptystring) {
	    			text = text + '<transout/>';
	    		}
	    		else {
	    			text = text + '<transout>' + wout + '</transout>';
	    		}
	    		text = text + '</transition>';
	    	}
	    }
	    text = text + "</automaton></structure>"
	    return text;
	};

	var saveXML = function () {
		removeModeClasses();
		var downloadData = "text/xml;charset=utf-8," + encodeURIComponent(serializeGraphToXML(g));
    	$('#download').html('<a href="data:' + downloadData + '" target="_blank" download="fa.xml">Download Moore</a>');
    	jsav.umsg("Saved");
	};

	// load a FA from a XML file
  	var parseFile = function (text) {
	    var parser,
	        xmlDoc;
	    if (window.DOMParser) {
	      	parser = new DOMParser();
	      	xmlDoc = parser.parseFromString(text,"text/xml");
	    }
	    else {
	      	xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
	      	xmlDoc.async = false;
	      	xmlDoc.loadXML(txt);
	    }
	    if (!xmlDoc.getElementsByTagName("type")[0]) {
	      	window.alert('File does not contain an automaton.');
	      	return;
	    }
	    if (xmlDoc.getElementsByTagName("type")[0].childNodes[0].nodeValue !== 'moore') {
	    	window.alert('File does not contain a Moore Machine.');
	      	return;
	    }
	    else {
	    	if (g) {
				g.clear();
			}
			g = new jsav.ds.fa({width: '90%', height: 440, layout: "automatic"});
			var nodeMap = {};			// map node IDs to nodes
	      	var xmlStates = xmlDoc.getElementsByTagName("state");
	      	xmlStates = _.sortBy(xmlStates, function(x) { return x.id; })
	      	var xmlTrans = xmlDoc.getElementsByTagName("transition");
	      	for (var i = 0; i < xmlStates.length; i++) {
	        	var x = Number(xmlStates[i].getElementsByTagName("x")[0].childNodes[0].nodeValue);
	        	var y = Number(xmlStates[i].getElementsByTagName("y")[0].childNodes[0].nodeValue);
	        	var newNode = g.addNode({left: x, top: y});
	        	var isInitial = xmlStates[i].getElementsByTagName("initial")[0];
	        	var isLabel = xmlStates[i].getElementsByTagName("label")[0];
	        	var isOutput = xmlStates[i].getElementsByTagName("output")[0].childNodes[0];
	        	if (isInitial) {
	        		g.makeInitial(newNode);
	        	}
	        	if (isLabel) {
	        		newNode.stateLabel(isLabel.childNodes[0].nodeValue);
	        	}
	        	if (!isOutput) {
	        		newNode.mooreOutput(emptystring);
	        	}
	        	else {
	        		newNode.mooreOutput(isOutput.nodeValue);
	        	}
	        	nodeMap[xmlStates[i].id] = newNode;
	        	newNode.stateLabelPositionUpdate();
	      	}
	      	for (var i = 0; i < xmlTrans.length; i++) {
	      		var from = xmlTrans[i].getElementsByTagName("from")[0].childNodes[0].nodeValue;
	      		var to = xmlTrans[i].getElementsByTagName("to")[0].childNodes[0].nodeValue;
	      		var read = xmlTrans[i].getElementsByTagName("read")[0].childNodes[0];
	      		if (!read) {
	      			read = emptystring;
	      		}
	      		else {
	      			read = read.nodeValue;
	      		}
	      		var edge = g.addEdge(nodeMap[from], nodeMap[to], {weight: read});
	      		edge.layout();
	      	}
			finalize();
	    }
	};

  	var waitForReading = function (reader) {
    	reader.onloadend = function(event) {
        	var text = event.target.result;
        	parseFile(text);
    	}
  	};

  	var loadXML = function () {
    	var loaded = document.getElementById('loadFile');
    	var file = loaded.files[0],
        	reader = new FileReader();
    	waitForReading(reader);
    	reader.readAsText(file);
  	};

	onLoadHandler();

	$('#begin').click(displayTraversals);
	$('#saveButton').click(saveXML);
	$('#loadFile').change(loadXML);
	$('#undoButton').click(undo);
	$('#redoButton').click(redo);
	$('#nodeButton').click(addNodes);
	$('#edgeButton').click(addEdges);
	$('#moveButton').click(moveNodes);
	$('#editButton').click(editNodes);
	$('#deleteButton').click(deleteNodes);
	$('#layoutButton').click(layoutGraph);
	$('#ndButton').click(testND);
	$('#lambdaButton').click(testLambda);
	$('#epsilonButton').click(switchEmptyString);
	$('#shorthandButton').click(switchShorthand);
}(jQuery));