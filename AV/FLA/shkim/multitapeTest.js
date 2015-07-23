(function ($) {
	localStorage["jsav-speed"] = 0;		// set default animation speed to max
	var jsav = new JSAV("av"),
		selectedNode = null,
		tapeNumber = 2,					// default number of tapes
		first, 							// keeps track of the selected node for the editing prompt
		second,							// keeps track of the second node in an edge for the editing prompt
		g;								// the TM

	var lambda = String.fromCharCode(955),
		epsilon = String.fromCharCode(949),
		square = String.fromCharCode(9633),
		emptystring;
	// initialize TM
	// The default TM has two tapes and is hardcoded (will be the default no matter how many tapes the user selects)
	var initGraph = function(opts) {
		g = jsav.ds.fa($.extend({width: '90%', height: 440, emptystring: square}, opts));
		emptystring = g.emptystring;
		var gWidth = g.element.width(),
			gHeight = g.element.height();
  		var a = g.addNode({left: 0.45 * gWidth, top: 0.35 * gHeight}),		
      		b = g.addNode({left: 0.1 * gWidth, top: 0.75 * gHeight}),
      		c = g.addNode({left: 0.8 * gWidth, top: 0.75 * gHeight});
      	g.makeInitial(a);
      	c.addClass('final');

	   	g.addEdge(a, a, {weight: 'b:b:S|b:b:R'});
	   	g.addEdge(a, a, {weight: 'a:a:S|b:b:R'});
	   	g.addEdge(a, a, {weight: 'b:b:S|a:a:R'});
	   	g.addEdge(a, a, {weight: 'a:a:S|a:a:R'});
	   	g.addEdge(a, b, {weight: 'b:b:R|b:b:R'});
	   	g.addEdge(a, b, {weight: 'a:a:R|a:a:R'});
	   	g.addEdge(a, c, {weight: emptystring+':'+emptystring+':S|'+emptystring+':'+emptystring+':S'});
	   	g.addEdge(a, c, {weight: emptystring+':'+emptystring+':S|a:a:R'});
	   	g.addEdge(a, c, {weight: emptystring+':'+emptystring+':S|b:b:R'});

	   	g.addEdge(b, b, {weight: 'b:b:R|b:b:R'});
	   	g.addEdge(b, b, {weight: 'a:a:R|a:a:R'});
	   	g.addEdge(b, c, {weight: emptystring+':'+emptystring+':S|a:a:R'});
	   	g.addEdge(b, c, {weight: emptystring+':'+emptystring+':S|b:b:R'});
	   	g.addEdge(b, c, {weight: emptystring+':'+emptystring+':S|'+emptystring+':'+emptystring+':S'});
	   
    	$(".jsavgraph").click(graphClickHandler);
    	g.click(nodeClickHandler);
		g.click(edgeClickHandler, {edge: true});
		$('.jsavedgelabel').click(labelClickHandler);
		return g;
    };

    // handler for editing edges/transitions
    // opens a separate interface
    var labelClickHandler = function(e) {
		if ($(".jsavgraph").hasClass("editNodes")) {
			first = this;
			var prompter = new EdgePrompt();
			prompter.render("edit");
		} else if ($(".jsavgraph").hasClass("deleteNodes")) {
			first = this;
			var prompter = new EdgePrompt();
			prompter.render("delete");
		}
	};
	// handler for the graph window
	var graphClickHandler = function(e) {
		if ($(".jsavgraph").hasClass("addNodes")) {
			var newNode = g.addNode(),
			    nodeX = newNode.element.width()/2.0,
				nodeY = newNode.element.height()/2.0;
			$(newNode.element).offset({top: e.pageY - nodeY, left: e.pageX - nodeX});
		} 
		else if ($('.jsavgraph').hasClass('moveNodes') && selectedNode != null) {
			var nodeX = selectedNode.element.width()/2.0,
				nodeY = selectedNode.element.height()/2.0,
				edges = g.edges();
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
			jsav.umsg("Click a node");
		}
	};
	// handler for the nodes of the graph
	var nodeClickHandler = function(e) {
		// editing nodes opens a separate interface, similar to editing edges	
		if ($(".jsavgraph").hasClass("editNodes")) {
			first = this;
			first.highlight();
			var Prompt = new NodePrompt();
			Prompt.render(this.value(), this.hasClass('start'), this.hasClass('final'), this.element.attr('title'));
			first.unhighlight();
		} else if ($(".jsavgraph").hasClass("addEdges")) {
			this.highlight();
			if (!$(".jsavgraph").hasClass("working")) {
				first = this;
				$('.jsavgraph').addClass("working");
				jsav.umsg("Select a state to make a transition to");
   			} else {
   				// adding an edge is also handled by the interface
   				second = this;
   				var prompter = new EdgePrompt();
   				prompter.render("add");
   				$('.jsavgraph').removeClass("working");
				first.unhighlight();
				second.unhighlight();
				updateAlphabet();
				jsav.umsg("Click a node");
   			}
		} else if ($('.jsavgraph').hasClass('moveNodes')) {
			if (selectedNode) {
				selectedNode.unhighlight();
			}
			this.highlight();
			selectedNode = this;
			jsav.umsg("Click to place node");
			e.stopPropagation();
		} else if ($('.jsavgraph').hasClass('deleteNodes')) {
			g.removeNode(this);
			updateAlphabet();
		}
	};
	// handler for the edges of the graph (used only for directly deleting entire edges)
	var edgeClickHandler = function(e) {
		if ($('.jsavgraph').hasClass('deleteNodes')) {
			g.removeEdge(this);
			updateAlphabet();
			
		}
	};
    var g = initGraph({layout: "manual"});
	g.layout();
	jsav.displayInit();

	//===============================
	var updateAlphabet = function() {
		g.updateAlphabet();
		$("#alphabet").html("" + Object.keys(g.alphabet).sort());
		var sa = getTapeAlphabet(g);
		$('#stackalphabet').html(emptystring + "," + sa.sort());
	};
	updateAlphabet();

	$('#asktapesinput').focus();

	//===============================
	// prompts (based on Martin's FA editor code)
	// Interface for editing a node
	function NodePrompt() {
		// create interface and obscure everything else
	    this.render = function(value, is, fs, lab) {
	        var winW = window.innerWidth;
	        var winH = window.innerHeight;
	        var dialogueoverlay = document.getElementById('dialogueoverlay');
	        var dialoguebox = document.getElementById('dialoguebox');
	        dialogueoverlay.style.display = "block";
	        dialogueoverlay.style.height = winH+"px";
	        dialoguebox.style.left = (winW/2) - (300/2)+"px";
	        dialoguebox.style.top = '30%';
	        dialoguebox.style.display = "block";
	        document.getElementById('dialogueboxhead').innerHTML = "Edit Node <b>" + value + ":</b>";
	        document.getElementById('dialogueboxbody').innerHTML = 'Initial State:<input type="checkbox" id="initial_state">';
	        document.getElementById('dialogueboxbody').innerHTML += '<br>Final State:<input type="checkbox" id="final_state">';
	        document.getElementById('dialogueboxbody').innerHTML += '<br>Label: <input id="label">';
	        document.getElementById('dialogueboxfoot').innerHTML = '<button onclick="ok()">OK</button> <button onclick="terminate()">Cancel</button>';
	        if (is) {
	            document.getElementById('initial_state').checked = true;
	        }
	        if (fs) {
	            document.getElementById('final_state').checked = true;
	        }
	        if (lab) {
	            document.getElementById('label').value = lab;
	        }
	        document.getElementById('label').focus();
	    };
	    // close the prompt (by hiding it)
	    terminate = function() {
	        document.getElementById('dialoguebox').style.display = "none";
	        document.getElementById('dialogueoverlay').style.display = "none";
	    };
	    // make the appropriate changes to the TM node
	    ok = function() {
	        var initial_state = document.getElementById('initial_state').checked;
	        var final_state = document.getElementById('final_state').checked;
	        var node_label = document.getElementById('label').value;
	        if (initial_state) {
				var nodes = g.nodes();
				for (var next = nodes.next(); next; next = nodes.next()) {
					g.removeInitial(next);
				}
				g.makeInitial(first);
			} else{
				g.removeInitial(first);
			}
			if (final_state) {
				first.addClass('final');
			} else {
				first.removeClass('final');
			}
			//adds labels to states
			if (node_label) {
				first.stateLabel(node_label);
				first.stateLabelPositionUpdate();
			}
	        document.getElementById('dialoguebox').style.display = "none";
	        document.getElementById('dialogueoverlay').style.display = "none";
	    };
	};
	// Interface for editing an edge/adding a new edge
	var EdgePrompt = function() {
		// create prompt elements
	    this.render = function(value) {
	        var winW = window.innerWidth;
	        var winH = window.innerHeight;
	        var dialogueoverlay = document.getElementById('dialogueoverlay');
	        var dialoguebox = document.getElementById('dialoguebox');
	        dialogueoverlay.style.display = "block";
	        dialogueoverlay.style.height = winH+"px";
	        dialoguebox.style.left = (winW/2) - (300/2)+"px";
	        dialoguebox.style.top = '30%';
	        dialoguebox.style.display = "block";
	        if(value === "add"){
	        	// create input boxes for the transition values
	            document.getElementById('dialogueboxhead').innerHTML = "Create Edge:";
	            document.getElementById('dialogueboxfoot').innerHTML = '<button onclick="addEdge()">OK</button> <button onclick="end()">Cancel</button>';
	            var ih = 'Read : Write : Move<br>';
		        for (var i = 0; i < tapeNumber; i++) {
		        	ih += 'Tape ' + (i+1) +' <input class="transitionInput"> : <input class="transitionInput"> : <select class="transitionInput transitionSelect"><option>L</option><option>R</option><option selected="selected">S</option></select><br>'
		        }
		        document.getElementById('dialogueboxbody').innerHTML = ih;
	        } else if (value === "delete") {
	        	// creates a button for each transition
	        	document.getElementById('dialogueboxhead').innerHTML = "Delete Transitions:";
	            document.getElementById('dialogueboxfoot').innerHTML = '<button onclick="finishDeletion()">Done</button>';
	            var self = first;
	            var values = $(self).html().split('<br>');
	            var createForm = [];
	            for (var i = 0; i < values.length; i++) {
	            	createForm.push('<input type="button" class="transitiondelete" value="' + values[i] + '">');
	            }
   				createForm = createForm.join('<br>');
		        document.getElementById('dialogueboxbody').innerHTML = createForm;
		        $('.transitiondelete').click(deleteEdge);
	        }
	        else if (value === "edit") {
	        	// create an input box for each field in each tape of each transition
	            document.getElementById('dialogueboxhead').innerHTML = "Edit Edge:";
	            document.getElementById('dialogueboxfoot').innerHTML = '<button onclick="changeEdge()">OK</button> <button onclick="end()">Cancel</button>';

				var self = first;
   				var values = $(self).html().split('<br>');
   				var createForm = [];
   				for (var i = 0; i < values.length; i++) {
   					var val2 = values[i].split('|');
   					var createForm2 = [];
   					for (var j = 0; j < val2.length; j++) {
   						var val3 = val2[j].split(':');
   						var createForm3 = [];
   						for (var k = 0; k < val3.length; k++) {
   							if (k == 2) {
   								if (val3[k] === 'L') {
   									createForm3.push('<select class="transitionInput transitionSelect"><option selected="selected">L</option><option>R</option><option>S</option></select>');
   								} else if (val3[k] === 'R') {
   									createForm3.push('<select class="transitionInput transitionSelect"><option>L</option><option selected="selected">R</option><option>S</option></select>');
   								} else {
   									createForm3.push('<select class="transitionInput transitionSelect"><option>L</option><option>R</option><option selected="selected">S</option></select>');
   								}
   							} else{
   								createForm3.push('<input class="transitionInput" value="' + val3[k] + '">');
   							}
   						}
   						createForm2.push(createForm3.join(':'));
   					}
   					createForm.push(createForm2.join(' | '));
   				}
   				createForm = createForm.join('<br>');
		        document.getElementById('dialogueboxbody').innerHTML = createForm;
	        }
	        $('.transitionInput').first().focus();
	    };
	    // close the prompt (by hiding it)
	    end = function() {
	    	updateAlphabet();
	        document.getElementById('dialoguebox').style.display = "none";
	        document.getElementById('dialogueoverlay').style.display = "none";
	    };
	    // create the new edge in the TM
	    addEdge = function() {
	    	var w = [];
	    	var s = "";
	    	$('.transitionInput').each(function(index){
	    		var c = this.value;
	    		if (!c) {
	    			c = emptystring;
	    		}
	    		s += c;
	    		if ((index + 1) % 3) {
	    			s += ':';
	    		} else {
	    			w.push(s);
	    			s = "";
	    		}
	    	});
			w = w.join('|');
			var newEdge = g.addEdge(first, second, {weight: w});
			if (newEdge) {
				$(newEdge._label.element).click(labelClickHandler);
			}
			if (!(typeof newEdge === 'undefined')) {
				newEdge.layout();
			}
	        this.end();
	    };
	    // make edits to the TM edge
	    changeEdge = function() {
	    	var w = [];
	    	var s = "";
	    	$('.transitionInput').each(function(index){
	    		var c = this.value;
	    		if (!c) {
	    			c = emptystring;
	    		}
	    		s += c;
	    		if (!((index + 1) % (3 * tapeNumber))) {
	    			w.push(s);
	    			s = "";
	    		}
	    		else if ((index + 1) % 3) {
	    			s += ':';
	    		} else {
	    			s += '|';
	    		}
	    	});
	    	w = w.join('<br>');
			$(first).html(w);
			g.layout({layout: "manual"});
	        this.end();
	    };
	    deleteEdge = function() {
	    	$(this).remove();
	    };
	    // take out deleted transitions
	    finishDeletion = function() {
			var w = [];
	    	$('.transitiondelete').each(function(index){
	    		w.push(this.value);
	    	});
	    	w = w.join('<br>');
			$(first).html(w);
			g.layout({layout: "manual"});
	        this.end();
	    };
	};


	//===============================
	// editing modes

	var addNodesMode = function() {
		removeEdgeSelect();
		removeLabelMenu();
		var jg = $(".jsavgraph");
		jg.removeClass("working");
		jg.removeClass("addEdges");
		jg.removeClass("moveNodes");
		jg.removeClass("editNodes");
		jg.removeClass("deleteNodes");
		jg.addClass("addNodes");
		$("#mode").html('Adding nodes');
		jsav.umsg("Click to add nodes");
	};
	var addEdgesMode = function() {
		removeEdgeSelect();
		removeLabelMenu();
		var jg = $(".jsavgraph");
		jg.removeClass("working");
		jg.removeClass("addNodes");
		jg.removeClass("moveNodes");
		jg.removeClass("editNodes");
		jg.removeClass("deleteNodes");
		jg.addClass("addEdges");
		$("#mode").html('Adding edges');
		jsav.umsg("Click a node");
	};
	var moveNodesMode = function() {
		removeEdgeSelect();
		removeLabelMenu();
		var jg = $(".jsavgraph");
		jg.removeClass("working");
		jg.removeClass("addNodes");
		jg.removeClass("addEdges");
		jg.removeClass("editNodes");
		jg.removeClass("deleteNodes");
		jg.addClass("moveNodes");
		$("#mode").html('Moving nodes');
		jsav.umsg("Click a node");
	};
	var editNodesMode = function() {
		var jg = $(".jsavgraph");
		jg.removeClass("working");
		jg.removeClass("addNodes");
		jg.removeClass("addEdges");
		jg.removeClass("moveNodes");
		jg.removeClass("deleteNodes");
		jg.addClass("editNodes");
		$("#mode").html('Editing nodes and edges');
		addEdgeSelect();
		jsav.umsg("Click a node or edge");
	};
	var deleteNodesMode = function() {
		var jg = $(".jsavgraph");
		jg.removeClass("working");
		jg.removeClass("addNodes");
		jg.removeClass("addEdges");
		jg.removeClass("moveNodes");
		jg.removeClass("editNodes");
		jg.addClass("deleteNodes");
		$("#mode").html('Deleting nodes and edges');
		addEdgeSelect();
		jsav.umsg("Click a node or edge");
	};
	// change between editing and non-editing (traversal)
	var changeEditingMode = function() {
		removeLabelMenu();
		var jg = $(".jsavgraph");
		jg.removeClass("working");
		jg.removeClass("addNodes");
		jg.removeClass("addEdges");
		jg.removeClass("moveNodes");
		jg.removeClass('editNodes');
		jg.removeClass("deleteNodes");
		removeEdgeSelect();
		$("#mode").html('Editing');
		if ($(".notEditing").is(":visible")) {
			$('#changeButton').html('Done editing');
		} else {
			$('#changeButton').html('Edit');
		}
		$('.notEditing').toggle();
		$('.editing').toggle();
	};
	// make edges easier to click
	var addEdgeSelect = function () {
		var edges = g.edges();
		for (var next = edges.next(); next; next= edges.next()) {
			next.addClass('edgeSelect');
			next.layout();
		}
	};
	var removeEdgeSelect = function () {
		var edges = g.edges();
		for (var next = edges.next(); next; next = edges.next()) {
			if (next.hasClass('edgeSelect')) {
				next.removeClass('edgeSelect');
				next.layout();
			}
		}
	};
	var removeLabelMenu = function() {
		if ($('#editedgelabel')) {
			$('#editedgelabel').remove();
		}
	};

	//====================
	//traversal

	// traverse on given input string
	var play = function(str) {
		if (!g.initial) {
			alert('Please define an initial state');
			return;
		}
		var n = tapeNumber;
		if (!n || n < 1) {
			return;
		}
		var inputs = [];
		if (str) {
			inputs = str.split('|');
		} else {
			for (var i = 0; i < n; i++) {
				var singleInput = prompt('Input ' + (i + 1));
				if (singleInput === null) {
					return;
				}
				inputs.push(singleInput);
			}
		}
		jsav.umsg("");
		$("button").hide();			// disable buttons
		$("#loadbutton").hide();
		$('#alphabets').hide();
		$("#mode").html('');
		$('.jsavcontrols').show();
		$('.jsavoutput').css({"text-align": "center", 'font-size': '1.5em', 'font-family': 'monospace'});
		
		var currentStates = [new Configuration(g.initial, inputs)],
			cur,
			counter = 0,
			configView = [];		// configurations to display in the message box
		for (var j = 0; j < currentStates.length; j++) {
	   		configView.push(currentStates[j].toString());
	   	}
	    jsav.umsg(configView.join('<br>'));
		g.initial.addClass('current');
		jsav.displayInit();
		
		while (true) {
			if (counter === 500) {
				console.log(counter);
				break;
			}
			counter++;
			for (var j = 0; j < currentStates.length; j++) {
		   		currentStates[j].state.removeClass('current');
		   		currentStates[j].state.removeClass('accepted');
		   	}
		   	// get next states
			cur = traverse(currentStates);
			if (!cur || cur.length === 0) {
				break;
			}
			currentStates = cur;
			configView = [];
			// add highlighting and display
			for (var j = 0; j < currentStates.length; j++) {
				currentStates[j].state.addClass('current');
				if (currentStates[j].state.hasClass('final')) {
					currentStates[j].state.addClass('accepted');
				}
		   		configView.push(currentStates[j].toString());
		   	}
		    jsav.umsg(configView.join('<br>'));
			jsav.step();
		}
		for (var k = 0; k < currentStates.length; k++) {
			if (currentStates[k].state.hasClass('final')) {
				currentStates[k].state.addClass('accepted');
			} else {
				currentStates[k].state.addClass('rejected');
			}
		}
		jsav.step();
		jsav.recorded();
	};
	// given a list of configurations, returns the set of next configurations
	var traverse = function(currentStates) {
		var nextStates = [];
		for (var j = 0; j < currentStates.length; j++) {
			var currentState = currentStates[j];
			var successors = currentState.state.neighbors();
			for (var next = successors.next(); next; next = successors.next()) {
				var edge = g.getEdge(currentState.state, next),
					weight = edge.weight().split('<br>');
				for (var i = 0; i < weight.length; i++) {
					var w = weight[i].split('|');
					var match = [];
					for (var k = 0; k < w.length; k++) {
						var val = w[k].split(':');
						if (currentState.tapes[k].value() === val[0]) {
							match.push([val[1],val[2]]);
						}
					}
					if (match.length === w.length) {
						var nextConfig = new Configuration(next, currentState.tapes);
						for (var m = 0; m < match.length; m++) {
							nextConfig.tapes[m].value(match[m][0]);
							nextConfig.tapes[m].move(match[m][1]);
						}
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
	// configuration object: contains the current state and the current tapes for that state
	var Configuration = function(state, tapes) {
		this.state = state;
		this.tapes = [];		// list of tapes
		for (var i = 0; i < tapes.length; i++) {
			this.tapes.push(new Tape(tapes[i]));
		}
		// turn configuration into a string to display to the user
		this.toString = function() {
			var ret = this.state.value();
			for (var i = 0; i < this.tapes.length; i++) {
				ret+= " " + viewTape(this.tapes[i]);
			}
			return ret;
		}
		// get an ID for the configuration to allow removing duplicates
		this.toID = function() {
			var ret = this.state.value();
			for (var i = 0; i < this.tapes.length; i++) {
				ret+= " " + this.tapes[i] + this.tapes[i].currentIndex;
			}
			return ret;
		}
	};

	// runs traversal on a single input, with no display
	var runInput = function(inputString) {
		inputString = inputString.split('|');
		var currentStates = [new Configuration(g.initial, inputString)],
			cur,
			counter = 0;
		
		while (true) {
			for (var k = 0; k < currentStates.length; k++) {
				if (currentStates[k].state.hasClass('final')) {
					return inputString.join("|") + '<br>Accepted</br>';
				} 
			}
			if (counter >= 500) {
				console.log(counter);
				break;
			}
			counter++;
			cur = traverse(currentStates);
			if (!cur || cur.length === 0) {
				break;
			}
			currentStates = cur;
		}
		return inputString.join("|") + '<br>Rejected<br>';
	};
	// traverse on multiple inputs, place traversal results in an array
	var displayTraversals = function () {
		if (!g.initial) {
			alert('Please define an initial state');
			return;
		}
		var inputString = prompt("Input string?", "abaa|ababaabaab,c|aaaaa");
		if (!inputString) {
			return;
		}
		var travArray = [];
		var inputs = inputString.split(',');
		jsav.umsg("Click to trace");
		$("#mode").html('');
		$("button").hide();			//disable buttons
		$("#loadbutton").hide();
		$('#alphabets').hide();
		for (var i = 0; i < inputs.length; i++) {
			travArray.push(runInput(inputs[i]));
		}
		var jsavArray = jsav.ds.array(travArray, {element: $('.arrayPlace')});
		jsavArray.mouseenter(jsavArray.highlight).mouseleave(jsavArray.unhighlight);
		jsavArray.click(arrayClickHandler);
		jsavArray.show();
		jsav.displayInit();
	};
	// handler for the array of multiple inputs; clicking on an index provides the trace for that input
	var arrayClickHandler = function (index) {
		var input = this.value(index).split('<br>')[0];
		this.hide();
		play(input);
	};

	// ask user for the number of tapes per state (if the input is invalid, defaults to 2)
	var askForTapes = function () {
		var asked = Number(document.getElementById("asktapesinput").value);
		if (asked) {
			tapeNumber = asked;
		}
		$("#asktapes").hide();
		document.getElementById('dialogueoverlay').style.display = 'none';
	};

	//======================
	// Save/Load
	// save TM as XML
	var serializeTMToXML = function (graph) {
		var text = '<?xml version="1.0" encoding="UTF-8"?>';
	    text = text + "<structure>";
	    text = text + "<type>turing</type>";
	    text = text + "<tapes>" + tapeNumber + "</tapes>";
	    text = text + "<automaton>";
	    var nodes = graph.nodes();
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
	    var edges = graph.edges();
	    for (var next = edges.next(); next; next = edges.next()) {
	    	var fromNode = next.start().value().substring(1);
	    	var toNode = next.end().value().substring(1);
	    	var w = next.weight().split('<br>');
	    	for (var i = 0; i < w.length; i++) {
	    		text = text + '<transition>';
	    		text = text + '<from>' + fromNode + '</from>';
	    		text = text + '<to>' + toNode + '</to>';
	    		var wSplit = w[i].split("|");
	    		for (var j = 0; j < tapeNumber; j++) {
	    			var singleTape = wSplit[j].split(':');
	    			if (singleTape[0] === emptystring) {
	    				text = text + '<read tape="'+(j+1)+'"/>';
		    		} else {
		    			text = text + '<read tape="'+(j+1)+'">' + singleTape[0] + '</read>';
		    		}
		    		if (singleTape[1] === emptystring) {
		    			text = text + '<write tape="'+(j+1)+'"/>';
		    		} else {
		    			text = text + '<write tape="'+(j+1)+'">' + singleTape[1] + '</write>';
		    		}
		    		text = text + '<move tape="'+(j+1)+'">' + singleTape[2] + '</move>';
	    		}
	    		text = text + '</transition>';
	    	}
	    }
	    text = text + "</automaton></structure>"
	    return text;
	};
	var save = function () {
		var downloadData = "text/xml;charset=utf-8," + encodeURIComponent(serializeTMToXML(g));
    	$('#download').html('<a href="data:' + downloadData + '" target="_blank" download="tm.xml">Download TM</a>');
    	$('#download a')[0].click();
	};

	// load a TM from a XML file
  	var parseFile = function (text) {
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
	      	// clear input
	      	var loaded = $('#loadbutton');
	      	loaded.wrap('<form>').closest('form').get(0).reset();
	      	loaded.unwrap();
	      	return;
	    } else {
	    	if (g) {
				g.clear();
				$('.jsavgraph').off();
			}
			g = new jsav.ds.fa({width: '90%', height: 440, emptystring: square, layout: "manual"});
			if (xmlDoc.getElementsByTagName("tapes")[0]) {
				tapeNumber = Number(xmlDoc.getElementsByTagName("tapes")[0].childNodes[0].nodeValue);
			} else {
				tapeNumber = 1;
			}
			var nodeMap = {};			// map node IDs to nodes
	      	var xmlStates = xmlDoc.getElementsByTagName("state");
	      	xmlStates = _.sortBy(xmlStates, function(x) {return x.id;})
	      	var xmlTrans = xmlDoc.getElementsByTagName("transition");
	      	for (var i = 0; i < xmlStates.length; i++) {
	        	var x = Number(xmlStates[i].getElementsByTagName("x")[0].childNodes[0].nodeValue);
	        	var y = Number(xmlStates[i].getElementsByTagName("y")[0].childNodes[0].nodeValue);
	        	var newNode = g.addNode({left: x, top: y});
	        	var isInitial = xmlStates[i].getElementsByTagName("initial")[0];
	        	var isFinal = xmlStates[i].getElementsByTagName("final")[0];
	        	var isLabel = xmlStates[i].getElementsByTagName("label")[0];
	        	if (isInitial) {
	        		g.makeInitial(newNode);
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
	      		var read = _.sortBy(xmlTrans[i].getElementsByTagName("read"), function(x) {return x.tape;});
	      		var write = _.sortBy(xmlTrans[i].getElementsByTagName("write"), function(x) {return x.tape;});
	      		var move = _.sortBy(xmlTrans[i].getElementsByTagName("move"), function(x) {return x.tape;});
	      		var newWeight = [];
	      		for (var j = 0; j < read.length; j++) {
	      			var singleRead = read[j].childNodes[0];
	      			var singleWrite = write[j].childNodes[0];
	      			var singleMove = move[j].childNodes[0].nodeValue;
	      			if (!singleRead) {
	      				singleRead = square;
	      			} else {
	      				singleRead = singleRead.nodeValue;
	      			}
	      			if (!singleWrite) {
	      				singleWrite = square;
	      			} else {
	      				singleWrite = singleWrite.nodeValue;
	      			}
	      			newWeight.push(singleRead + ":" + singleWrite + ":" + singleMove);
	      		}
	      		g.addEdge(nodeMap[from], nodeMap[to], {weight: newWeight.join("|")});
	      	}
	      	g.layout();
	      	updateAlphabet();
			$(".jsavgraph").click(graphClickHandler);
	    	g.click(nodeClickHandler);
			g.click(edgeClickHandler, {edge: true});
			$('.jsavedgelabel').click(labelClickHandler);
			var loaded = $('#loadbutton');
	      	loaded.wrap('<form>').closest('form').get(0).reset();
	      	loaded.unwrap();
	      	return;
	    }
	};
  	var waitForReading = function (reader) {
    	reader.onloadend = function(event) {
        	var text = event.target.result;
        	parseFile(text);
    	}
  	};
  	var load = function () {
    	var loaded = document.getElementById('loadbutton');
    	var file = loaded.files[0],
        	reader = new FileReader();
    	waitForReading(reader);
    	reader.readAsText(file);
  	};

	//======================
	$('#playbutton').click(function() {play()});
	$('#multiplebutton').click(displayTraversals);
	$('#layoutbutton').click(function() {g.layout()});
	$('#addnodesbutton').click(addNodesMode);
	$('#changeButton').click(changeEditingMode);
	$('#addedgesbutton').click(addEdgesMode);
	$('#movenodesbutton').click(moveNodesMode);
	$('#editnodesbutton').click(editNodesMode);
	$('#deletenodesbutton').click(deleteNodesMode);
	$('#asktapesbutton').click(askForTapes);
	// allow the input for tape number to be entered by pressing the 'enter' key
	$("#asktapesinput").keyup(function(event){
	    if(event.keyCode == 13){
	        $("#asktapesbutton").click();
	    }
	});
	$('#savebutton').click(save);
  	$('#loadbutton').on('change', load);
}(jQuery));	