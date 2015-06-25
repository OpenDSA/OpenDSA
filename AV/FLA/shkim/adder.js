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
  		var q0 = g.addNode({left: 0.25 * gWidth, top: 0.23 * gHeight}),
  			q1 = g.addNode({left: 0.1 * gWidth, top: 0.7 * gHeight}),
  			q2 = g.addNode({left: 0.01 * gWidth, top: 0.3 * gHeight}),
  			q3 = g.addNode({left: 0.1 * gWidth, top: 0.02 * gHeight}),
  			q4 = g.addNode({left: 0.4 * gWidth, top: 0.2 * gHeight}),
  			q5 = g.addNode({left: 0.25 * gWidth, top: 0.65 * gHeight}),
  			q6 = g.addNode({left: 0.55 * gWidth, top: 0.2 * gHeight}),
  			q7 = g.addNode({left: 0.47 * gWidth, top: 0.5 * gHeight}),
  			q8 = g.addNode({left: 0.7 * gWidth, top: 0.2 * gHeight}),
  			q9 = g.addNode({left: 0.6 * gWidth, top: 0.5 * gHeight}),
  			q10 = g.addNode({left: 0.85 * gWidth, top: 0.17 * gHeight}),
  			q11 = g.addNode({left: 0.95 * gWidth, top: 0.4 * gHeight}),
  			q12 = g.addNode({left: 0.55 * gWidth, top: 0.9 * gHeight}),
  			q13 = g.addNode({left: 0.75 * gWidth, top: 0.8 * gHeight});
      	g.makeInitial(q0);
      	q3.addClass('final');

	    g.addEdge(q0, q0, {weight: '0:0:R'});
	    g.addEdge(q0, q0, {weight: '#:#:R'});
	    g.addEdge(q0, q0, {weight: 'a:0:R'});
	    g.addEdge(q0, q1, {weight: '1:1:R'});
	    g.addEdge(q0, q1, {weight: 'b:1:R'});
	    g.addEdge(q0, q2, {weight: emptystring+':'+emptystring+':L'});
	    g.addEdge(q0, q4, {weight: '+:+:R'});

	    g.addEdge(q1, q1, {weight: 'b:1:R'});
	    g.addEdge(q1, q1, {weight: '1:1:R'});
	    g.addEdge(q1, q1, {weight: '#:#:R'});
	    g.addEdge(q1, q0, {weight: 'a:0:R'});
	    g.addEdge(q1, q0, {weight: '0:0:R'});
	    g.addEdge(q1, q2, {weight: emptystring+':'+emptystring+':L'});
	    g.addEdge(q1, q5, {weight: '+:+:R'});

	    g.addEdge(q2, q2, {weight: '1:1:L'});
	    g.addEdge(q2, q2, {weight: '0:0:L'});
	    g.addEdge(q2, q3, {weight: emptystring+':'+emptystring+':R'});

	    g.addEdge(q4, q4, {weight: '1:1:R'});
	    g.addEdge(q4, q4, {weight: '0:0:R'});
	    g.addEdge(q4, q6, {weight: emptystring+':'+emptystring+':L'});
	    g.addEdge(q4, q6, {weight: '+:+:R'});
	    g.addEdge(q4, q6, {weight: 'a:a:L'});
	    g.addEdge(q4, q6, {weight: 'b:b:L'});

	    g.addEdge(q5, q5, {weight: '1:1:R'});
	    g.addEdge(q5, q5, {weight: '0:0:R'});
	    g.addEdge(q5, q7, {weight: emptystring+':'+emptystring+':L'});
	    g.addEdge(q5, q7, {weight: '+:+:L'});
	    g.addEdge(q5, q7, {weight: 'a:a:L'});
	    g.addEdge(q5, q7, {weight: 'b:b:L'});

	    g.addEdge(q6, q8, {weight: '0:a:L'});
	    g.addEdge(q6, q8, {weight: '1:b:L'});
	    g.addEdge(q6, q13, {weight: '+:a:L'});

	    g.addEdge(q7, q8, {weight: '0:b:L'});
	    g.addEdge(q7, q9, {weight: '1:0:L'});
	    g.addEdge(q7, q13, {weight: '+:b:L'});

	    g.addEdge(q8, q8, {weight: '0:0:L'});
	    g.addEdge(q8, q8, {weight: '1:1:L'});
	    g.addEdge(q8, q10, {weight: '+:+:L'});

	    g.addEdge(q9, q9, {weight: '1:0:L'});
	    g.addEdge(q9, q8, {weight: '0:1:L'});
	    g.addEdge(q9, q10, {weight: '#:1:L'});
	    g.addEdge(q9, q13, {weight: '+:1:L'});

	    g.addEdge(q10, q10, {weight: '#:#:L'});
	    g.addEdge(q10, q11, {weight: '1:#:L'});
	    g.addEdge(q10, q11, {weight: '0:#:L'});
	    g.addEdge(q10, q12, {weight: emptystring+':'+emptystring+':R'});

	    g.addEdge(q11, q11, {weight: '0:0:L'});
	    g.addEdge(q11, q11, {weight: '1:1:L'});
	    g.addEdge(q11, q12, {weight: emptystring+':'+emptystring+':R'});

	    g.addEdge(q12, q12, {weight: '#:'+emptystring+':R'});
	    g.addEdge(q12, q12, {weight: '+:'+emptystring+':R'});
	    g.addEdge(q12, q0, {weight: 'a:0:R'});
	    g.addEdge(q12, q0, {weight: '0:0:R'});
	    g.addEdge(q12, q1, {weight: '1:1:R'});
	    g.addEdge(q12, q1, {weight: 'b:1:R'});

	    g.addEdge(q13, q10, {weight: '#:+:L'});
	    g.addEdge(q13, q11, {weight: '0:+:L'});
	    g.addEdge(q13, q11, {weight: '1:+:L'});
	   	
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

	var play = function(str) {
		if (!g.initial) {
			alert('Please define an initial state');
			return;
		}
		var inputString;
		if (str) {
			inputString = str;
		} else {
			inputString = prompt("Input string?", "1+1");
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
		
		var currentState = g.initial,
			next;
		var tape = new Tape(inputString);
		jsav.umsg(viewTape(tape));
		currentState.addClass('current');
			jsav.displayInit();
		
		while (true) {
			next = traverse(currentState, tape.value());
			var cur;
			if (!next) {
				break;
			}
			var weight = next[1];
			tape.value(weight[1]);
			tape.move(weight[2]);
			jsav.umsg(viewTape(tape));
			cur = next[0];
			currentState.removeClass('current');
			currentState = cur;
			currentState.addClass('current');
			jsav.step();
		}
		if (currentState.hasClass('final')) {
			currentState.addClass('accepted');
		} else {
			currentState.addClass('rejected');
		}
		jsav.umsg(produceOutput(tape));
		jsav.step();
		jsav.recorded();
	};
	var traverse = function(currentState, letter) {
		var successors = currentState.neighbors();
		for (var next = successors.next(); next; next = successors.next()) {
			var edge = g.getEdge(currentState, next),
				weight = edge.weight().split('<br>');
			for (var i = 0; i < weight.length; i++) {
				var w = weight[i].split(':');
				if (letter === w[0]) {
					return [next, w];
				}
			}
		} 
		return null;
	};

	// multiple traversal
	var runInput = function(inputString) {
		var currentState = g.initial,
			next;
		var tape = new Tape(inputString);
		while (true) {
			next = traverse(currentState, tape.value());
			var cur;
			if (!next) {
				break;
			}
			var weight = next[1];
			tape.value(weight[1]);
			tape.move(weight[2]);
			cur = next[0];
			currentState = cur;
		}
		if (currentState.hasClass('final')) {
			return inputString + '<br>Output:<br>' + produceOutput(tape);
		} else {
			return inputString + '<br>Rejected<br><br>';
		}
	};
	var displayTraversals = function () {
		var inputString = prompt("Input string?", "1+1,10+1,101+10+100");
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