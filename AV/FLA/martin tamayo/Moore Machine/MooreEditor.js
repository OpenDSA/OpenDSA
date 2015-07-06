(function ($) {
	var jsav = new JSAV("av"),
		jsavArray,
		saved = false,
		serialization,
		first = null,
		selected = null,
		label = null,
		undoStack = [],
		redoStack = [],
		data,
		g,
		lambda = String.fromCharCode(955),
		epsilon = String.fromCharCode(949),
		emptystring = lambda;
    
    var initialize = function(graph) {
		if (g) {
			localStorage['backup'] = serialize(g);
		}
		data = graph;
		initGraph({layout: "automatic"});
	};

	var initGraph = function(opts) {
		$('.jsavgraph').remove();
		var gg;
		try {
			gg = jQuery.parseJSON(data);
		}
		catch(err) {
			jsav.umsg('Error: Tried to load invalid file.');
			g = localStorage['backup'];
			gg = jQuery.parseJSON(g);
		}
		finally {
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
	    		node.mooreOutput(outputChar);
	    		node.stateLabel(gg.nodes[i].stateLabel);
	    		node.stateLabelPositionUpdate();
	  		}
	  		for (var i = 0; i < gg.edges.length; i++) {
	    		if (gg.edges[i].weight !== undefined) {
	    			var w = delambdafy(gg.edges[i].weight);
	    			var edge = g.addEdge(g.nodes()[gg.edges[i].start], g.nodes()[gg.edges[i].end], {weight: w});
        		}
	    		else {
	    			var edge = g.addEdge(g.nodes()[gg.edges[i].start], g.nodes()[gg.edges[i].end]);
	    		}
	    		edge.layout();
	    	}
	    	updateAlphabet();
	    	updateMooreOutput();
	    	g.click(nodeClickHandler);
			g.click(edgeClickHandler, {edge: true});
			$('.jsavgraph').click(graphClickHandler);
			$('.jsavedgelabel').click(labelClickHandler);
	    	jsav.displayInit();
	    }
    };

    function delambdafy(weight) {
    	var weights = weight.split("<br>");
		for (var i = 0; i < weights.length; i++) {
			var symbols = weights[i].split(":");
			for (var j = 0; j < symbols.length; j++) {
				if (symbols[j] == "&lambda;") {
					symbols[j] = lambda;
					if (lambda != emptystring) {
						emptyString();
					}
				}
				else if (symbols[j] == "&epsilon;") {
					symbols[j] = epsilon;
					if (epsilon != emptystring) {
						emptyString();
					}
				}
			}
			weights[i] = symbols.join(":");
		}
		return weights.join("<br>");
    };

    function delambdafyMoore(outputChar) {
    	if (!outputChar) {
    		return emptystring;
    	}
    	if (outputChar == "&lambda;") {
			outputChar = lambda;
			if (lambda != emptystring) {
				emptyString();
			}
		}
		else if (outputChar == "&epsilon;") {
			outputChar = epsilon;
			if (epsilon != emptystring) {
				emptyString();
			}
		}
		return outputChar;
    };

	var graphClickHandler = function(e) {
		if ($(".jsavgraph").hasClass("addNodes")) {
			saveMooreState();
			selected = executeAddNode(g, e.pageY, e.pageX);
			selected.highlight();
			var Prompt = new NodePrompt(createNode, cancelNode, emptystring);
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
			var Prompt = new NodePrompt(updateNode, doNothing, emptystring);
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
		}
	};

	var edgeClickHandler = function(e) {
		if ($('.jsavgraph').hasClass('deleteNodes')) {
			saveMooreState();
			executeDeleteEdge(g, this);
			updateAlphabet();
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
		executeEditNode(g, selected, initial_state, node_label, output_char);
		updateMooreOutput();
	};

	function updateNode(initial_state, node_label, output_char) {
		saveMooreState();
		executeEditNode(g, selected, initial_state, node_label, output_char);
		updateMooreOutput();
	};

	function createEdge(edge_label) {
		saveMooreState();
		var edge = executeAddEdge(g, first, selected, edge_label);
		$(edge._label.element).click(labelClickHandler);
		updateAlphabet();
	};

	function updateEdge(edge_label) {
		saveMooreState();
		executeEditEdge(g, label, edge_label);
		updateAlphabet();
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
		$('#multipleTraversals').hide();
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
				transition = g.transitionFunction(next, key);
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
		serialization = serialize(g);
		var outputArray = [];
		var acceptArray = [];
		readyTraversal();
		for (var i = 0; i < inputArray.length; i++) {
			var outputData = pretraverse(g, inputArray[i]);
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
			travArray.push(inputArray[j] + "<br><b>" + outputArray[j] +"</b>");
		}
		document.getElementById("multipleTraversals").innerHTML = "";
		jsavArray = jsav.ds.array(travArray, {element: $('.traversalPlace')});
		for (var k = 0; k < travArray.length; k++) {
			if(acceptArray[k]){
				jsavArray.css(k, {"background-color": "green"});
			}
			else {
				jsavArray.css(k, {"background-color": "red"});
			}
		}
		$('#multipleTraversals').off("click");
		$('#multipleTraversals').show();
		jsavArray.click(arrayClickHandler);
		jsavArray.show();
	};

	function arrayClickHandler(index) {
		play(this.value(index).split("<br>")[0]);
	};

	var play = function (inputString) {
		localStorage['graph'] = serialization;
		localStorage['traversal'] = inputString;
		window.open("./MooreTraversal.html");
	};

	function saveMooreState () {
		data = serialize(g);
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
		data = serialize(g);
		redoStack.push(data);
		data = undoStack.pop();
		initGraph({layout: "automatic"});
		document.getElementById("redoButton").disabled = false;
		if(undoStack.length == 0) {
			document.getElementById("undoButton").disabled = true;
		}
	};

	function redo () {
		removeModeClasses();
		data = serialize(g);
		undoStack.push(data);
		data = redoStack.pop();
		initGraph({layout: "automatic"});
		document.getElementById("undoButton").disabled = false;
		if(redoStack.length == 0) {
			document.getElementById("redoButton").disabled = true;
		}
	};

	var setSaved = function () {
		saved = true
	};

	var save = function() {
		var downloadData = "text/json;charset=utf-8," + encodeURIComponent(serialize(g));
		$('#download').html('<a href="data:' + downloadData + '" target="_blank" download="data.json">Download JSON</a>');
		jsav.umsg("Saved");
	};

	var loadNewFile = function () {
		if (!saved) {
			return;
		}
		if (jsavArray) {
			jsavArray.hide();
		}
		undoStack = [];
		redoStack = [];
		document.getElementById("undoButton").disabled = true;
		document.getElementById("redoButton").disabled = true;
		data = document.getElementById("loadFile").files[0];
		onLoadHandler();
	};

	function onLoadHandler() {
		if (data) {
			var reader = new FileReader();
			reader.onload = loadComplete;
			reader.readAsText(data);
			function loadComplete() {
				var readerData = reader.result;
				initialize(readerData);
			}
			data = null;
		}
		else if (serialization) {
			initialize(serialization);
		}
		else {
			var defaultData = '{"nodes":[{"left":508,"top":201,"i":true,"f":false,"stateLabel":"","mooreOutput":"l"},{"left":345,"top":43,"i":false,"f":false,"stateLabel":"","mooreOutput":"a"},{"left":184,"top":357,"i":false,"f":false,"stateLabel":"","mooreOutput":"p"},{"left":815,"top":42,"i":false,"f":false,"stateLabel":"","mooreOutput":"j"},{"left":660,"top":366,"i":false,"f":false,"stateLabel":"","mooreOutput":"f"}],"edges":[{"start":0,"end":3,"weight":"a"},{"start":0,"end":1,"weight":"d"},{"start":1,"end":2,"weight":"e"},{"start":2,"end":0,"weight":"f"},{"start":3,"end":4,"weight":"b"},{"start":4,"end":0,"weight":"c"}]}';
			initialize(defaultData);
		}
	};

	onLoadHandler();

	$('#begin').click(displayTraversals);
	$('#saveButton').click(save);
	$('#submitButton').click(loadNewFile);
	$('#loadFile').change(setSaved);
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
}(jQuery));