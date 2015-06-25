(function ($) {
	localStorage["jsav-speed"] = 0; // set default animation speed to max
	var jsav = new JSAV("av"),
		saved = false,
		selectedNode = null,
		g;

	var lambda = String.fromCharCode(955),
		epsilon = String.fromCharCode(949),
		square = String.fromCharCode(9633),
		emptystring;
	
	var initGraph = function(opts) {
		g = jsav.ds.fa($.extend({width: '90%', height: 440, emptystring: square}, opts));
		emptystring = g.emptystring;
		var gWidth = g.element.width(),
			gHeight = g.element.height();
  		var a = g.addNode({left: 0.10 * gWidth, top: 0.3 * gHeight}),		
      		b = g.addNode({left: 0.35 * gWidth, top: 0.7 * gHeight}),
      		c = g.addNode({left: 0.10 * gWidth, top: 0.7 * gHeight}),
      		d = g.addNode({left: 0.6 * gWidth, top: 0.7 * gHeight}),
      		e = g.addNode({left: 0.85 * gWidth, top: 0.5 * gHeight}),
      		f = g.addNode({left: 0.35 * gWidth, top: 0.3 * gHeight});
      	g.makeInitial(a);
      	c.addClass('final');

	    g.addEdge(a, b, {weight: 'a:#:R'});
	   	g.addEdge(a, a, {weight: '#:#:R'});
	    //g.addEdge(a, d); 		it's a FA, need to always provide a weight

	    g.addEdge(b, b, {weight: '#:#:R'});
	    g.addEdge(b, c, {weight: square + ':' + square + ':L'});
	    g.addEdge(b, d, {weight: 'a:a:R'});

	   	g.addEdge(d, d, {weight: '#:#:R'});
	    g.addEdge(d, e, {weight: 'a:#:R'});
	   	g.addEdge(d, f, {weight: square + ':' + square + ':L'});

	    g.addEdge(e, e, {weight: '#:#:R'});
	    g.addEdge(e, d, {weight: 'a:a:R'});

	    g.addEdge(f, f, {weight: '#:#:L'});
	    g.addEdge(f, f, {weight: 'a:a:L'});
	    g.addEdge(f, a, {weight: square + ':' + square + ':R'});
	
    	$(".jsavgraph").click(graphClickHandler);
    	g.click(nodeClickHandler);
		g.click(edgeClickHandler, {edge: true});
		$('.jsavedgelabel').click(labelClickHandler);
		return g;
    };

    var labelClickHandler = function(e) {
		if ($(".jsavgraph").hasClass("editNodes") && !$(".jsavgraph").hasClass("working")) {
				$(".jsavgraph").addClass("working");
			var self = this;
				var values = $(this).html().split('<br>');
				var createForm = '<form id="editedgelabel"><select class="labelmenu" id="edgelabelselect" size="' + values.length + '">'
				for (var i = 0; i < values.length; i++) {
					createForm += '<option>' + values[i] + '</option>';
				}
				createForm += '</select><br><input type="button" class="labelmenu" id="changetransitionbutton" value="Change transition"><input type="button" class="labelmenu" id="deletetransitionbutton" value="Delete transition"><input type="button" class="labelmenu" id="donelabelbutton" value="Done"></form>'
			$(createForm).appendTo($('.jsavgraph'));
			var xBound = $('.jsavgraph').offset().left + $('.jsavgraph').width(),
				yBound = $('.jsavgraph').offset().top + $('.jsavgraph').height(),
				xOffset = e.pageX,
				yOffset = e.pageY,
				xWidth = $('#editedgelabel').width(),
				yHeight = $('#editedgelabel').height();
			if (xBound < xOffset + xWidth) {
				xOffset -= xWidth;
			}
			if (yBound < yOffset + yHeight) {
				yOffset -= yHeight;
			}
			$('#editedgelabel').offset({top: yOffset, left: xOffset});
			var changeTransition = function() {
				var x = document.getElementById("edgelabelselect").selectedIndex;
				if (x !== -1) {
					var y = document.getElementById('edgelabelselect').options[x].text;
					var n = prompt("New transition label?", y);
					if (n) {
						var nSplit = n.split(':');
						for (var i = 0; i < nSplit.length; i++) {
							if (nSplit[i] === "") {
								nSplit[i] = emptystring;
							}
						}
						n = nSplit.join(':');
						document.getElementById('edgelabelselect').options[x].innerHTML = n;
					}
				}
			};
			var deleteTransition = function() {
				var x = document.getElementById('edgelabelselect').selectedIndex;
				if (x !== -1) {
					document.getElementById('edgelabelselect').remove(x);
					document.getElementById('edgelabelselect').size--;
					if (document.getElementById('edgelabelselect').size === 0) {
						$('#donelabelbutton').trigger("click");
					}
				}
			};
			var finishEdgeLabel = function() {
				var newVal = [];
				for (var j = 0; j < $('#edgelabelselect > option').length; j++) {
					newVal.push(document.getElementById('edgelabelselect').options[j].text);
				}
				newVal = newVal.join('<br>');
				$(self).html(newVal);
				$('#editedgelabel').remove();
				g.layout({layout: "manual"});
				console.log(_.map(g._alledges, function(x){return x.weight()}))
				$('.jsavgraph').removeClass("working");
				updateAlphabet();
			};
			$('#changetransitionbutton').click(changeTransition);
			$('#deletetransitionbutton').click(deleteTransition);
			$('#donelabelbutton').click(finishEdgeLabel);
		}
		};
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
	var nodeClickHandler = function(e) {	
		if ($(".jsavgraph").hasClass("editNodes")) {
			this.highlight();
			var input = prompt("Delete state, make state initial, make state final, or give state a label? d, i, f, or l");
			if (input === null) {
				this.unhighlight();
				return;
			}
			input = input.toUpperCase();
			if (input == 'D') {
				g.removeNode(this);
				updateAlphabet();
			}
			else if (input == 'I') {
				var nodes = g.nodes();
				for (var next = nodes.next(); next; next = nodes.next()) {
					g.removeInitial(next);
				}
				g.makeInitial(this);
			} else if (input == 'F') {
				this.toggleClass('final');
			} 
			//adds labels to states
			else if (input == 'L') {
				var input2 = prompt("Label?");
				if (input2 !== null) {
					this.stateLabel(input2);
					this.stateLabelPositionUpdate();
				}
			}
   			this.unhighlight();
			} else if ($(".jsavgraph").hasClass("addEdges")) {
				this.highlight();
				if (!$(".jsavgraph").hasClass("working")) {
				first = this;
				$('.jsavgraph').addClass("working");
				jsav.umsg("Select a state to make a transition to");
   			} else {
   				var input2 = prompt("Character to read?");
   				var input3 = prompt('Character to write?');
   				var input4 = prompt('Direction to move the tape head: left, right, or stay? L, R, S?');
   				if (input4) {
   					input4 = input4.toUpperCase();
   				}
   				var newEdge;
   				if (!input2) {
   					input2 = emptystring;
   				}
   				if (!input3) {
   					input3 = emptystring;
   				}
   				if (!input4 || (input4 !== 'L' && input4 !== 'R' && input4 !== 'S')) {
   					input4 = 'S';
   				}
   				var w = input2 + ':' + input3 + ':' + input4;
				if (input2 != null) {
					newEdge = g.addEdge(first, this, {weight: w});
					if (newEdge) {
						$(newEdge._label.element).click(labelClickHandler);
					}
				} 
				if (!(typeof newEdge === 'undefined')) {
					newEdge.layout();
				}
				$('.jsavgraph').removeClass("working");
				first.unhighlight();
				this.unhighlight();
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
		}
	};
	var edgeClickHandler = function(e) {
		if ($('.jsavgraph').hasClass('editNodes')) {
			this.highlight();
			var input = confirm("Delete edge?");
			if (input === null) {
				this.unhighlight();
				return;
			}
			if (input) {
				g.removeEdge(this);
			}
			updateAlphabet();
			this.unhighlight();
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
	//===============================
	//editing modes

	var addNodesMode = function() {
		removeEdgeSelect();
		removeLabelMenu();
		$(".jsavgraph").removeClass("working");
		$(".jsavgraph").removeClass("addEdges");
		$(".jsavgraph").removeClass("moveNodes");
		$(".jsavgraph").removeClass("editNodes");
		$(".jsavgraph").addClass("addNodes");
		$("#mode").html('Adding nodes');
		jsav.umsg("Click to add nodes");
	};
	var addEdgesMode = function() {
		removeEdgeSelect();
		removeLabelMenu();
		$(".jsavgraph").removeClass("working");
		$(".jsavgraph").removeClass("addNodes");
		$(".jsavgraph").removeClass("moveNodes");
		$(".jsavgraph").removeClass("editNodes");
		$(".jsavgraph").addClass("addEdges");
		$("#mode").html('Adding edges');
		jsav.umsg("Click a node");
	};
	var moveNodesMode = function() {
		removeEdgeSelect();
		removeLabelMenu();
		$(".jsavgraph").removeClass("working");
		$(".jsavgraph").removeClass("addNodes");
		$(".jsavgraph").removeClass("addEdges");
		$(".jsavgraph").removeClass("editNodes");
		$(".jsavgraph").addClass("moveNodes");
		$("#mode").html('Moving nodes');
		jsav.umsg("Click a node");
	};
	var editNodesMode = function() {
		$(".jsavgraph").removeClass("working");
		$(".jsavgraph").removeClass("addNodes");
		$(".jsavgraph").removeClass("addEdges");
		$(".jsavgraph").removeClass("moveNodes");
		$(".jsavgraph").addClass("editNodes");
		$("#mode").html('Editing nodes and edges');
		addEdgeSelect();
		jsav.umsg("Click a node or edge");
	};
	var changeEditingMode = function() {
		removeLabelMenu();
		$(".jsavgraph").removeClass("working");
		$(".jsavgraph").removeClass("addNodes");
		$(".jsavgraph").removeClass("addEdges");
		$(".jsavgraph").removeClass("moveNodes");
		$('.jsavgraph').removeClass('editNodes');
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

	// ND
	var play = function(str) {
		if (!g.initial) {
			alert('Please define an initial state');
			return;
		}
		var inputString;
		if (str) {
			inputString = str;
		} else {
			inputString = prompt("Input string?", "aaaa");
			if (inputString == null) {
				return;
			}
		}
		jsav.umsg("");
		$("button").hide();			//disable buttons
		$('#alphabets').hide();
		$("#mode").html('');
			$('.jsavcontrols').show();
			$('.jsavoutput').css({"text-align": "center", 'font-size': '2em', 'font-family': 'monospace'});
		
		var currentStates = [new Configuration(g.initial, inputString)],
			cur,
			counter = 0,
			configView = [];
		for (var j = 0; j < currentStates.length; j++) {
	   		configView.push(currentStates[j].toString());
	   	}
	    jsav.umsg(configView.join(' | '));
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
			cur = traverse(currentStates);
			if (!cur || cur.length === 0) {
				break;
			}
			currentStates = cur;
			configView = [];
			for (var j = 0; j < currentStates.length; j++) {
				currentStates[j].state.addClass('current');
				if (currentStates[j].state.hasClass('final')) {
					currentStates[j].state.addClass('accepted');
				}
		   		configView.push(currentStates[j].toString());
		   	}
		    jsav.umsg(configView.join(' | '));
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
	var traverse = function(currentStates) {
		var nextStates = [];
		for (var j = 0; j < currentStates.length; j++) {
			var currentState = currentStates[j];
			var successors = currentState.state.neighbors();
			for (var next = successors.next(); next; next = successors.next()) {
				var edge = g.getEdge(currentState.state, next),
					weight = edge.weight().split('<br>');
				for (var i = 0; i < weight.length; i++) {
					var w = weight[i].split(':');
					if (currentState.tape.value() === w[0]) {
						var nextConfig = new Configuration(next, currentState.tape);
						nextConfig.tape.value(w[1]);
						nextConfig.tape.move(w[2]);
						nextStates.push(nextConfig);
						break;
					}
				}
			}
		}
		nextStates = _.uniq(nextStates, function(x) {return x.toID();});
		return nextStates;
	};
	var Configuration = function(state, tape) {
			this.state = state;
			this.tape = new Tape(tape);
		this.toString = function() {
			return this.state.value() + ' ' + viewTape(this.tape);
		}
		this.toID = function() {
			return this.state.value() + ' ' + this.tape + viewTape(this.tape);
		}
	};


	// multiple traversal
	var runInput = function(inputString) {
		var currentStates = [new Configuration(g.initial, inputString)],
			cur,
			counter = 0;
		
		while (true) {
			for (var k = 0; k < currentStates.length; k++) {
				if (currentStates[k].state.hasClass('final')) {
					return inputString + '<br>Accepted<br>';
				} 
			}
			if (counter === 500) {
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
		return inputString + '<br>Rejected<br>';
	};
	var displayTraversals = function () {
		if (!g.initial) {
			alert('Please define an initial state');
			return;
		}
		var inputString = prompt("Input string?", "aaa,aaaa,aaaaaa,aaaaaaaa");
		if (!inputString) {
			return;
		}
		var travArray = [];
		var inputs = inputString.split(',');
		jsav.umsg("Click to trace");
		$("#mode").html('');
		$("button").hide();			//disable buttons
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
		var arrayClickHandler = function (index) {
			var input = this.value(index).split('<br>')[0];
			this.hide();
			play(input);
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
}(jQuery));	