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
	    		if (gg.nodes[i].f) {
	    			node.addClass("final");
	    		}
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
	    	jsav.displayInit();
	    	g.click(nodeClickHandler);
			g.click(edgeClickHandler, {edge: true});
			$('.jsavgraph').click(graphClickHandler);
			$('.jsavedgelabel').click(labelClickHandler);
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

	var graphClickHandler = function(e) {
		if ($(".jsavgraph").hasClass("addNodes")) {
			saveFAState();
			executeAddNode(g, e.pageY, e.pageX);
		} 
		else if ($('.jsavgraph').hasClass('moveNodes') && selected != null) {
			saveFAState();
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
			var Prompt = new NodePrompt(updateNode);
			Prompt.render(selected.value(), selected.hasClass('start'), selected.hasClass('final'), selected.stateLabel());
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
			saveFAState();
			executeDeleteNode(g, this);
			updateAlphabet();
		}
	};

	var edgeClickHandler = function(e) {
		if ($('.jsavgraph').hasClass('deleteNodes')) {
			saveFAState();
			executeDeleteEdge(g, this);
			updateAlphabet();
		}
	};

	var labelClickHandler = function(e) {
		if ($(".jsavgraph").hasClass("editNodes")) {
			label = this;
			var values = $(label).html().split('<br>');
			var Prompt = new EdgePrompt(updateEdge, emptystring);
   			Prompt.render(values);
		}
	};

	function updateNode(initial_state, final_state, node_label) {
		saveFAState();
		executeEditNode(g, selected, initial_state, final_state, node_label);
	};

	function createEdge(edge_label) {
		saveFAState();
		var edge = executeAddEdge(g, first, selected, edge_label);
		$(edge._label.element).click(labelClickHandler);
		updateAlphabet();
	};

	function updateEdge(edge_label) {
		saveFAState();
		executeEditEdge(g, label, edge_label);
		updateAlphabet();
	};

	var updateAlphabet = function() {
		g.updateAlphabet();
		$("#alphabet").html("" + Object.keys(g.alphabet).sort());
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
		if ($(".jsavgraph").hasClass("deleteNodes")) {
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
		saveFAState();
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
			}
		}
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
			next.g.element.removeClass("testingLambda");
		}
	};

	var layoutGraph = function() {
		saveFAState();
		g.layout();
	};

	var readyTraversal = function() {
		removeModeClasses();
		jsav.umsg('Click on an input to trace its traversal.');
	};

	var displayTraversals = function () {
		if (g.initial == null) {
			window.alert("FA traversal requires an initial state.");
			return;
		}
		var Prompt = new TraversePrompt(traverseInputs);
		Prompt.render();
	};

	var traverseInputs = function (inputs) {
		var nodes = g.nodes();
		for (var next = nodes.next(); next; next = nodes.next()) {
			next.removeClass('current');
		}
		serialization = serialize(g);
		var travArray = [];
		readyTraversal();
		for (var i = 0; i < inputs.length; i++) {
			travArray.push(inputs[i]);
		}
		document.getElementById("multipleTraversals").innerHTML = "";
		jsavArray = jsav.ds.array(travArray, {element: $('.traversalPlace')});
		for (var j = 0; j < travArray.length; j++) {
			if(willReject(g, travArray[j])){
				jsavArray.css(j, {"background-color": "red"});
			}
			else {
				jsavArray.css(j, {"background-color": "green"});
			}
		}
		$('#multipleTraversals').off("click");
		$('#multipleTraversals').show();
		jsavArray.click(arrayClickHandler);
		jsavArray.show();
	};

	function arrayClickHandler(index) {
		play(this.value(index));
	};

	var play = function (inputString) {
		localStorage['graph'] = serialization;
		localStorage['traversal'] = inputString;
		window.open("./FATraversal.html");
	};

	function saveFAState () {
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
			var defaultData = '{"nodes":[{"left":753.90625,"top":171.109375,"i":true,"f":false},{"left":505.890625,"top":342,"i":false,"f":false},{"left":1042,"top":199.40625,"i":false,"f":false},{"left":287.90625,"top":123.625,"i":false,"f":false},{"left":535.921875,"top":0,"i":false,"f":false},{"left":0,"top":89.234375,"i":false,"f":true}],"edges":[{"start":0,"end":1,"weight":"a"},{"start":0,"end":2,"weight":"b"},{"start":1,"end":3,"weight":"a"},{"start":3,"end":4,"weight":"b"},{"start":3,"end":5,"weight":"a"},{"start":4,"end":0,"weight":"a"},{"start":5,"end":3,"weight":"g"}]}';
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