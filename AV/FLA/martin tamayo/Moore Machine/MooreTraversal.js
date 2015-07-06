(function ($) {
	var jsav = new JSAV("av"),
		arr,
		g;

	var lambda = String.fromCharCode(955),
		epsilon = String.fromCharCode(949);

	var initialize = function() {
		g = localStorage['graph'];
		if (!g) {
			jsav.umsg("Error!");
			return;
		}
		var traversal = localStorage['traversal'];
		initGraph({layout: "automatic"});
		$('.jsavcontrols').show();
		run(traversal);
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
	    	var outputChar = delambdafyMoore(gg.nodes[i].mooreOutput);
	    	node.mooreOutput(outputChar);
	    	node.stateLabel(gg.nodes[i].stateLabel);
	    	node.stateLabelPositionUpdate();
	  	}
	  	for (var i = 0; i < gg.edges.length; i++) {
	    	if (gg.edges[i].weight !== undefined) {
	    		var w = delambdafy(gg.edges[i].weight);
	    		var edge = graph.addEdge(graph.nodes()[gg.edges[i].start], graph.nodes()[gg.edges[i].end], {weight: w});
        	}
	    	else {
	    		var edge = graph.addEdge(graph.nodes()[gg.edges[i].start], graph.nodes()[gg.edges[i].end]);
	    	}
	    	edge.layout();
	    }
	    g = graph;
    };

    function delambdafy(weight) {
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

    function delambdafyMoore(outputChar) {
    	if (outputChar == "&lambda;") {
			outputChar = lambda;
		}
		else if (outputChar == "&epsilon;") {
			outputChar = epsilon;
		}
		return outputChar;
    };

	var run = function(inputString) {
		$('.jsavoutput').css({"text-align": "center", 'font-size': '2em'});
		var textArray = [];
		g.initial.addClass('current');
		var accepted = true;
		var outputString = "";
		var currentState = g.initial;
		var cur;
		
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
		   	cur = traverse(g, currentState, inputString[i]);
		   	if (cur[0] == null) {
		   		accepted = false;
		   		arr.css(i, {"background-color": "red"});
		   		failingIndex = i;
		   		jsav.step();
		   		break;
		   	}
			currentState = cur[0];
			outputString += cur[1];
			currentState.addClass('current');
			arr.css(i, {"background-color": "yellow"});
			jsav.umsg(outputString);
			jsav.step();
		}

		if (accepted) {
			currentState.addClass('accepted');
			arr.css(finalIndex, {"background-color": "green"});
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
	};
	
	initialize();
	
}(jQuery));