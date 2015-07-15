(function ($) {
	var jsav = new JSAV("av"),
		arr,
		g,
		lambda = String.fromCharCode(955),
		epsilon = String.fromCharCode(949);

	var initialize = function() {
		g = localStorage['graph'];
		if (!g) {
			jsav.umsg("Error!");
			return;
		}
		var traversal = localStorage['traversal'];
		var runFunction = initGraph({layout: "automatic"});
		$('.jsavcontrols').show();
		if (traversal != lambda && traversal != epsilon) {
			runFunction(traversal);
		}
		else {
			runFunction("")
		}
	};

	var initGraph = function(opts) {
		var gg = jQuery.parseJSON(g);
		var graph = jsav.ds.fa($.extend({width: '90%', height: 440}, opts));
		for (var i = 0; i < gg.nodes.length; i++) {
	    	var node = graph.addNode('q' + i),
	    		offset = $('.jsavgraph').offset(),
	    		offset2 = parseInt($('.jsavgraph').css('border-width'), 10);
	    	$(node.element).offset({top : parseInt(gg.nodes[i].top) + offset.top + offset2, left: parseInt(gg.nodes[i].left) + offset.left + offset2});
	    	if (gg.nodes[i].i) {
	    		graph.makeInitial(node);
	    	}
	    	node.stateLabel(gg.nodes[i].stateLabel);
	    	node.stateLabelPositionUpdate();
	  	}
	  	for (var i = 0; i < gg.edges.length; i++) {
	    	if (gg.edges[i].weight !== undefined) {
	    		var w = delambdafyMealy(gg.edges[i].weight);
	    		var edge = graph.addEdge(graph.nodes()[gg.edges[i].start], graph.nodes()[gg.edges[i].end], {weight: w});
        	}
	    	else {
	    		var edge = graph.addEdge(graph.nodes()[gg.edges[i].start], graph.nodes()[gg.edges[i].end]);
	    	}
	    	edge.layout();
	    }
	    g = graph;
	    if (gg.shorthand) {
	    	return runShorthand;
	    }
	    return run;
    };

    function delambdafyMealy(weight) {
    	var weights = weight.split("<br>");
			for (var i = 0; i < weights.length; i++) {
			var symbols = weights[i].split(":");
			for (var j = 0; j < symbols.length; j++) {
				if (symbols[j] == "&lambda;") {
					symbols[j] = lambda;
				}
				else if (symbols[j] == "&epsilon;") {
					symbols[j] = epsilon;
				}
			}
			weights[i] = symbols.join(":");
		}
		return weights.join("<br>");
    };
    
	var run = function(inputString) {
		$('.jsavoutput').css({"text-align": "center", 'font-size': '2em'});
		var textArray = [];
		g.initial.addClass('current');
		var accepted = true;
		var outputString = "";
		var currentState = g.initial;
		
		for (var i = 0; i < inputString.length; i++) {
			textArray.push(inputString[i]);
		}
		arr = jsav.ds.array(textArray, {element: $('.arrayPlace')});

		jsav.displayInit();

		var failingIndex = inputString.length - 1;
		var finalIndex = inputString.length - 1;
		if (!inputString) {
			finalIndex = 0;
		}

		for (var i = 0; i < inputString.length; i++) {
			currentState.removeClass('current');
		   	var traverseStep = traverseMealy(g, currentState, inputString[i]);
		   	if (traverseStep[0] == null) {
		   		currentState.addClass('rejected');
		   		accepted = false;
		   		arr.css(i, {"background-color": "red"});
		   		failingIndex = i;
		   		jsav.step();
		   		break;
		   	}
			currentState = traverseStep[0];
			outputString += traverseStep[1];
			currentState.addClass('current');
			arr.css(i, {"background-color": "yellow"});
			jsav.umsg(outputString);
			jsav.step();
		}
		if (accepted) {
			currentState.addClass('accepted');
			arr.css(finalIndex, {"background-color": "green"});
			if (!outputString) {
				jsav.umsg("<b>Accepted</b>");
			}
		}
		else {
			for (var l = failingIndex; l < inputString.length - 1; l++) {
				arr.css(l, {"background-color": "red"});
			}
			arr.css(finalIndex, {"background-color": "red"});
			jsav.umsg("<b>Rejected</b>");
		}
		jsav.step();
		jsav.recorded();

		arr.click(arrayClickHandler);
	};

	var runShorthand = function (inputString) {
		$('.jsavoutput').css({"text-align": "center", 'font-size': '2em'});
		var textArray = [];
		g.initial.addClass('current');

		var accepted = true,
			outputString = "",
			currentState = g.initial,
			currentEdge = null;
			edgeWeight = null,
			edgeProgress = null;

		for (var i = 0; i < inputString.length; i++) {
			textArray.push(inputString[i]);
		}
		arr = jsav.ds.array(textArray, {element: $('.arrayPlace')});

		jsav.displayInit();

		var failingIndex = inputString.length - 1;
		var finalIndex = inputString.length - 1;
		if (!inputString) {
			finalIndex = 0;
		}

		for (var i = 0; i < inputString.length; i++) {
			if (currentState) {
				currentState.removeClass('current');
			}
		   	var traverseStep = traverseMealyShorthand(g, currentState, currentEdge, edgeWeight, edgeProgress, inputString[i]);
		   	var nextState = traverseStep[0];
		   	var nextEdge = traverseStep[1];
		   	if (nextState == null) {
		   		if (nextEdge == null) {
		   			if (currentState) {
		   				currentState.addClass('rejected');
		   			}
		   			accepted = false;
		   			arr.css(i, {"background-color": "red"});
		   			failingIndex = i;
		   			jsav.step();
		   			break;
		   		}
		   		else {
		   			edgeWeight = traverseStep[2];
		   			edgeProgress = traverseStep[3];
		   		}
		   	}
			currentState = nextState;
			currentEdge = nextEdge;
			outputString += traverseStep[4];
			if (currentState) {
				currentState.addClass('current');
			}
			arr.css(i, {"background-color": "yellow"});
			jsav.umsg(outputString);
			jsav.step();
		}
		
		if (accepted) {
			if (currentState) {
				currentState.addClass('accepted');
			}
			arr.css(finalIndex, {"background-color": "green"});
			if (!outputString) {
				jsav.umsg("<b>Accepted</b>");
			}
		}
		else {
			for (var l = failingIndex; l < inputString.length - 1; l++) {
				arr.css(l, {"background-color": "red"});
			}
			arr.css(finalIndex, {"background-color": "red"});
			jsav.umsg("<b>Rejected</b>");
		}
		jsav.step();
		jsav.recorded();

		arr.click(arrayClickHandler);
	};

	function arrayClickHandler(index) {
		var oldFx = $.fx.off || false;
    	$.fx.off = true;
    	if (index > jsav.currentStep() - 1) {
    		while (index > jsav.currentStep() - 1 && jsav._redo.length) {
				jsav.forward();
			}
    	}
    	if (index < jsav.currentStep() - 1) {
    		while (index < jsav.currentStep() - 1 && jsav._undo.length) {
				jsav.backward();
			}
    	}
		$.fx.off = oldFx;
	};

	initialize();
}(jQuery));