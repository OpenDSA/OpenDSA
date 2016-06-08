(function ($) {	
 localStorage["jsav-speed"] = 0; // set default animation speed to max
 var jsav = new JSAV("av"),
 expandT,						// terminal to expand on
 selectedNode = null,
 expanded,					// string containing the names of the next states
 referenceGraph,							// reference (original NFA)
 studentGraph,							// working conversion
 alphabet;

 var lambda = String.fromCharCode(955),
 epsilon = String.fromCharCode(949);

 var automata, currentExercise = 0;
 initGraph();
 initQuestionLinks();
 updateQuestionLinks();

var correctSteps = 0,
		incorrectSteps = 0,
		studentScore = 0;

 // initializes the reference/original NFA
 function initGraph () {
 	if (localStorage['convertNFA'] === "true") {
 		localStorage['convertNFA'] = false;
 		var data = localStorage['toConvert'];
 		referenceGraph = deserialize(data);
		$("#questionTitle").hide();
 	} else {
		loadXML();
	}
 };
	
 function initQuestionLinks() {
	//not from localStorage but from XML file
	if (automata) {
		for (i = 0; i < automata.length; i++) {
			$("#exerciseLinks").append("<a href='#' id='" + i + "' class='links'>" + (i+1) + "</a>");
		}			
	}
 }

 //called when a question link is clicked
 function toAutomaton() {
	presentAutomaton(this.getAttribute('id'));
	currentExercise = this.getAttribute('id');
	updateQuestionLinks();
 }

 //add a square border to current link
 function updateQuestionLinks() {
	$('.links').removeClass('currentExercise');
	$("#" + currentExercise).addClass('currentExercise');
 }

 function deserialize (data) {
	 var gg = jQuery.parseJSON(data);
	 var graph = jsav.ds.fa({width: '45%', height: 440, layout: 'manual', element: $('#reference')});
	 for (var i = 0; i < gg.nodes.length; i++) {
		 var node = graph.addNode('q' + i),
				 offset = $('.jsavgraph').offset(),
				 offset2 = parseInt($('.jsavgraph').css('border-width'), 10);
		 $(node.element).offset({top : parseInt(gg.nodes[i].top) + offset.top + offset2, left: (parseInt(gg.nodes[i].left) / 2) + offset.left + offset2});
		 if (gg.nodes[i].i) {
			 graph.makeInitial(node);
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
			 var edge = graph.addEdge(graph.nodes()[gg.edges[i].start], graph.nodes()[gg.edges[i].end], {weight: w});
		 }
		 else {
			 var edge = graph.addEdge(graph.nodes()[gg.edges[i].start], graph.nodes()[gg.edges[i].end]);
		 }
		 edge.layout();
	 }
	 graph.layout();
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
	 var initialNode = studentGraph.addNode();
	 initialNode.stateLabel(lambdaClosure([referenceGraph.initial.value()], referenceGraph).sort().join());
	 initialNode.stateLabelPositionUpdate();
	 studentGraph.makeInitial(initialNode);
	
	 correctSteps = 0;
	 incorrectSteps = 0;
	 studentScore = 0;
	 $("#correctSteps").text(correctSteps);
	 $("#incorrectSteps").text(incorrectSteps);
	 $("#studentScore").text(studentScore); 
	 $("#editable").off('click').click(graphClickHandlers);
	 studentGraph.click(nodeClickHandlers);
	 return studentGraph;
 };

 // handler for the graph window
 var graphClickHandlers = function (e) {
	 // place selected node
	 if ($('.jsavgraph').hasClass('moveNodes') && selectedNode != null) {
		 var nodeX = selectedNode.element.width()/2.0,
				 nodeY = selectedNode.element.height()/2.0,
				 edges = studentGraph.edges();
		 $(selectedNode.element).offset({top: e.pageY - nodeY, left: e.pageX - nodeX});
		 selectedNode.stateLabelPositionUpdate();
		 for (var next = edges.next(); next; next = edges.next()) {
			 if (next.start().equals(selectedNode) || next.end().equals(selectedNode)) {
				 next.layout();
			 }
		 }
		 selectedNode.unhighlight();
		 selectedNode = null;
		 e.stopPropagation();
		 jsav.umsg("Click a state");
	 }
	 else { 
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
			 correctSteps++;
			 studentScore++;
			 $("#correctSteps").text(correctSteps);
			 $("#studentScore").text(studentScore);

			 $('.editButton').show();
			 $('.jsavgraph').removeClass("working");
			 selectedNode.unhighlight();
			 newNode.unhighlight();
			 jsav.umsg("Choose a state to expand:");
		 } 
	 }
 };
 // handler for the nodes of the DFA
 var nodeClickHandlers = function (e) {	
	 this.highlight();
	 if ($('.jsavgraph').hasClass('moveNodes')) {
		 selectedNode = this;
		 jsav.umsg("Click to place state");
		 e.stopPropagation();
	 } 
	 // allow user to remove nodes since there is no check to see if a new node already exists
	 else if ($(".jsavgraph").hasClass("removeNodes")) {
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
				 incorrectSteps++;
			 	 studentScore -= 0.25;
			 	 $("#incorrectSteps").text(incorrectSteps);
			 	 $("#studentScore").text(studentScore);

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
					 incorrectSteps++;
				 	 studentScore -= 0.25;
				 		$("#incorrectSteps").text(incorrectSteps);
				 		$("#studentScore").text(studentScore);

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
				 incorrectSteps++;
				 studentScore -= 0.25;
				 $("#incorrectSteps").text(incorrectSteps);
				 $("#studentScore").text(studentScore);
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
 var exercise = jsav.exercise(modelAnswer, initialize, {compare: {class: "jsavhighlight"}, modelButtonTitle: "Answer", feedback: "continuous"});
 //use customized score showing instead of poorly documented jsavscore
 $(".jsavscore").hide();
 $(".realScore").show();
 exercise.reset();

 //================================
 //editing modes

 var moveNodesMode = function () {
	 $(".jsavgraph").removeClass("removeNodes");
	 $(".jsavgraph").addClass("moveNodes");
	 $("#mode").html('Moving states');
	 jsav.umsg("Click a state");
	 $('#conversionButton').show();
 };
 var removeNodesMode = function () {
	 $(".jsavgraph").removeClass("moveNodes");
	 $(".jsavgraph").addClass("removeNodes");
	 $("#mode").html('Removing states');
	 jsav.umsg("Click a state");
	 $('#conversionButton').show();
 };
 var conversionMode = function () {
	 $(".jsavgraph").removeClass("moveNodes");
	 $('.jsavgraph').removeClass("removeNodes");
	 $("#mode").html('');
	 jsav.umsg("Choose a state to expand");
	 $('#conversionButton').hide();
 };

 function modelAnswer (modeljsav) {
	 // bug: all of the edges seem to be shifted a screen to the right
	 var graph = convertToDFA(modeljsav, referenceGraph, {width: '90%', height: 440, layout: 'automatic', element: $('.jsavmodelanswer .jsavcanvas')});
	 graph.layout();
	 if (graph.equals(studentGraph)) {
		 jsav.umsg("You got it!");
		 alert("Congratulations!");
		 localStorage['toConvert'] = true;
		 localStorage['converted'] = serialize(studentGraph);
		 window.open('./FAEditor.html');
	 }
	 modeljsav.displayInit();
	 modeljsav.recorded();
	 return graph;		
 };

 //function to present an automaton in XML file with index
 function presentAutomaton(index) {
	 var automaton = automata[index];
	 if (!automaton) {
		 alert("No automaton with this index");
		 return;
	 }
	 if (referenceGraph) {
		var nodes = referenceGraph.nodes();
		referenceGraph.clear();
		//because this clear step deletes the html as well
		$("#graphs").prepend("<div id='reference' class='jsavcanvas'></div>");
	 }
	 	referenceGraph = jsav.ds.fa({width: '45%', height: 440, layout: "automatic", element: $("#reference")});
	 var nodeMap = {};			// map node IDs to nodes
	 var xmlStates = automaton.getElementsByTagName("state");
	 xmlStates = _.sortBy(xmlStates, function(x) { return x.id; })
		 var xmlTrans = automaton.getElementsByTagName("transition");
	 // Iterate over the nodes and initialize them.
	 for (var i = 0; i < xmlStates.length; i++) {
		 var x = Number(xmlStates[i].getElementsByTagName("x")[0].childNodes[0].nodeValue);
		 var y = Number(xmlStates[i].getElementsByTagName("y")[0].childNodes[0].nodeValue);
		 var newNode = referenceGraph.addNode({left: x, top: y});
		 // Add the various details, including initial/final states and state labels.
		 var isInitial = xmlStates[i].getElementsByTagName("initial")[0];
		 var isFinal = xmlStates[i].getElementsByTagName("final")[0];
		 var isLabel = xmlStates[i].getElementsByTagName("label")[0];
		 if (isInitial) {
			 referenceGraph.makeInitial(newNode);
		 }
		 if (isFinal) {
			 newNode.addClass('final');
		 }
		 if (isLabel) {
			 ewNode.stateLabel(isLabel.childNodes[0].nodeValue);
		 }
		 nodeMap[xmlStates[i].id] = newNode;
		 newNode.stateLabelPositionUpdate();
	 }
	 // Iterate over the edges and initialize them.
	 for (var i = 0; i < xmlTrans.length; i++) {
		 var from = xmlTrans[i].getElementsByTagName("from")[0].childNodes[0].nodeValue;
		 var to = xmlTrans[i].getElementsByTagName("to")[0].childNodes[0].nodeValue;
		 var read = xmlTrans[i].getElementsByTagName("read")[0].childNodes[0];
		 // Empty string always needs to be checked for.
		 if (!read) {
			 read = lambda;
		 }
		 else {
			 read = read.nodeValue;
		 }
		 var edge = referenceGraph.addEdge(nodeMap[from], nodeMap[to], {weight: read});
		 edge.layout();
	 }
	 referenceGraph.layout();
	 referenceGraph.updateAlphabet();
	 alphabet = Object.keys(referenceGraph.alphabet).sort();
	 $("#alphabet").html("" + alphabet);

 };

 function loadXML () {
		$.ajax({
			url: "./conversions.xml",
			dataType: 'xml',
			async: false,
			success: function(data) {
				//allow multiple automata in one file
				automata = data.getElementsByTagName("automaton");
				presentAutomaton(0);
			}
		});
	};

	$('#conversionButton').click(conversionMode);
	$('#movenodesbutton').click(moveNodesMode);
	$('#removenodesbutton').click(removeNodesMode);
	$('.links').click(toAutomaton);
}(jQuery));
