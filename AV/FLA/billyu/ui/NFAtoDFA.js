(function ($) {	
	localStorage["jsav-speed"] = 0; // set default animation speed to max
	var jsav = new JSAV("av"),
	expandT,						// terminal to expand on
	selectedNode = null,
	expanded,					// string containing the names of the next states
	referenceGraph,							// reference (original NFA)
	studentGraph,							// working conversion
	answerGraph,
	alphabet;

	var lambda = String.fromCharCode(955),
	epsilon = String.fromCharCode(949);

	// initializes the reference/original NFA
	function initGraph () {
	 if (localStorage['convertNFA'] == "true") {
	   localStorage['convertNFA'] = false;
		 //localStorage['convertNFA'] = false;
		 var data = localStorage['toConvert'];
		 referenceGraph = deserialize(data);
		 initialize();
	 } 
	 else {
		 alert("If you want to convert an NFA, please use FAEditor.");
		 window.close();
	 }
	};

	function deserialize (data) {
	 var gg = jQuery.parseJSON(data);
	 var graph = jsav.ds.fa({width: '45%', height: 440, layout: 'manual', element: $('#reference')});
	 graph.initFromParsedJSONSource(gg, 0.5);
	 graph.updateAlphabet();
	 alphabet = Object.keys(graph.alphabet).sort();
	 $("#alphabet").html("" + alphabet);
	 return graph;
	};

	// initializes the DFA to be created by the user
	function initialize () {
	 if (studentGraph) {
		 $('#editable').empty();
	 }
	 jsav.umsg("Choose a state to expand:");
	 studentGraph = jsav.ds.fa({width: '45%', height: 440, element: $('#editable')});
	 var initialNode = studentGraph.addNode({left: "20px"});
	 initialNode.stateLabel(lambdaClosure([referenceGraph.initial.value()], referenceGraph).sort().join());
	 initialNode.stateLabelPositionUpdate();
	 studentGraph.makeInitial(initialNode);

	 $("#editable").off('click').click(graphClickHandlers);
	 studentGraph.click(nodeClickHandlers);
	 answerGraph = convertToDFA(jsav, referenceGraph, {width: '45%', height: 440, layout: 'automatic', element: $('#answer')});
	 answerGraph.hide();
	 return studentGraph;
	};

	// handler for the graph window
	var graphClickHandlers = function (e) {
	 if ($(".jsavgraph").hasClass("working")) {
		 // user is allowed to omit 'q' and separate state names with empty space or commas
		 var targetS = prompt("Which group of NFA states will that go to on " + expandT + "?");
		 if (!targetS) {
			 return;
		 }
		 var inputArr = targetS.trim().split(/\s*[,\s]\s*/);
		 for (var i = 0; i < inputArr.length; i++) {
			 if (inputArr[i].indexOf("q") === -1) {
				 inputArr[i] = 'q' + inputArr[i];
			 } 
		 }
		 targetS = inputArr.sort().join();
		 if (targetS !== expanded) {
			 alert("State label is incorrect.");
			 $('.editButton').show();
			 $('.jsavgraph').removeClass("working");
			 selectedNode.unhighlight();
			 jsav.umsg("Choose a state to expand:");
			 return;
		 }
		 // create the new state
		 var newNode = studentGraph.addNode(),
				 nodeX = newNode.element.width()/2.0,
				 nodeY = newNode.element.height()/2.0;
		 $(newNode.element).offset({top: e.pageY - nodeY, left: e.pageX - nodeX});
		 var check = expanded.split(',');
		 // make the new state final if any of the original states were final
		 for (var i = 0; i < check.length; i++) {
			 if (referenceGraph.getNodeWithValue(check[i]).hasClass('final')) {
				 newNode.addClass('final');
				 break;
			 }
		 }
		 newNode.stateLabel(expanded);
		 newNode.stateLabelPositionUpdate();
		 var newEdge = studentGraph.addEdge(selectedNode, newNode, {weight: expandT})
			 if(newEdge) {newEdge.layout();}

		 $('.editButton').show();
		 $('.jsavgraph').removeClass("working");
		 selectedNode.unhighlight();
		 newNode.unhighlight();
		 jsav.umsg("Choose a state to expand:");
	 } 
	};

	// handler for the nodes of the DFA
	var nodeClickHandlers = function (e) {	
	 this.highlight();
	 // allow user to remove nodes since there is no check to see if a new node already exists
	 if ($(".jsavgraph").hasClass("removeNodes")) {
		 if (!this.equals(studentGraph.initial)) {		//dont remove if it's an initial state
			 studentGraph.removeNode(this);
		 }
		 this.unhighlight();
	 }
	 else {
		 if (!$(".jsavgraph").hasClass("working")) {
			 selectedNode = this;
			 expandT = prompt("Expand on what terminal?");
			 if (expandT === null) {
				 this.unhighlight();
				 return;
			 } else if (!_.contains(alphabet, expandT)) {
				 alert("That terminal is not in the alphabet!");

				 this.unhighlight();
				 return;
			 } else {
				 var next = [],
						 valArr = this.stateLabel().split(','),
						 finality = false;
				 for (var j = 0; j < valArr.length; j++) {
					 next = _.union(next, lambdaClosure(referenceGraph.transitionFunction(referenceGraph.getNodeWithValue(valArr[j]), 
									 expandT), referenceGraph));
				 }
				 var node = next.sort().join();
				 if (!node) {
					 alert("There are no paths on that terminal!");

					 this.unhighlight();
					 return;
				 } 
				 expanded = node;
				 $('.editButton').hide();
				 $('.jsavgraph').addClass("working");
				 jsav.umsg("Click to place new state");
				 e.stopPropagation();
			 }	
		 } else {
			 // add transition if this is the toNode
			 if (this.stateLabel() === expanded) {
				 var newEdge = studentGraph.addEdge(selectedNode, this, {weight: expandT});
				 if (newEdge) { newEdge.layout();}
			 }
			 else {
				 alert("State label is incorrect.");
			 }
			 $('.editButton').show();
			 $('.jsavgraph').removeClass("working");
			 selectedNode.unhighlight();
			 this.unhighlight();
			 jsav.umsg("Choose a state to expand:");
			 e.stopPropagation();
		 }
	 }
	};

	//================================
	//editing modes

	var removeNodesMode = function () {
	 $(".jsavgraph").addClass("removeNodes");
	 $("#mode").html('Removing states');
	 jsav.umsg("Click a state");
	 $('#conversionButton').show();
	};
	var conversionMode = function () {
	 $('.jsavgraph').removeClass("removeNodes");
	 $("#mode").html('');
	 jsav.umsg("Choose a state to expand");
	 $('#conversionButton').hide();
	};

	function complete() {
	 var nodes = studentGraph.nodes();
	 for (var next = nodes.next(); next; next = nodes.next()) {
	 	studentGraph.removeNode(next);
	 }
	 studentGraph = convertToDFA(jsav, referenceGraph, {width: '45%', height: 440, layout: 'automatic', element: $('#editable')});
	 studentGraph.layout();
	 jsav.umsg("Conversion completed.");
	 $('#exportButton').show();
	};

	var exportToFA = function() {
	 localStorage['toConvert'] = true;
	 localStorage['converted'] = serialize(studentGraph);
	 window.open('./FAEditor.html');
	}	

	var checkDone = function() {
		if (studentGraph.equals(answerGraph)) {
			jsav.umsg("Conversion completed.");
			$('#exportButton').show();
		}
		else {
			jsav.umsg("You're not done yet.");
		}
	}

	$('#conversionButton').click(conversionMode);
	$('#removenodesbutton').click(removeNodesMode);
	$('#completeButton').click(complete);
	$('#exportButton').click(exportToFA);
	$('#checkDone').click(checkDone);
	$('#exportButton').hide();
	initGraph();
}(jQuery));
