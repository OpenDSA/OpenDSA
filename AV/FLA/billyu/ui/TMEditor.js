var lambda = String.fromCharCode(955),
		epsilon = String.fromCharCode(949),
		square = String.fromCharCode(9633),
		emptystring;

(function($) {
	var jsav = new JSAV("av");
	jsav.displayInit();
	var g;

// initialize graph
	var initGraph = function(opts) {
		g = jsav.ds.tm($.extend({width: '90%', height: 440, emptystring: square}, opts));
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

	// handler for editing edges/transitions
	var labelClickHandler = function(e) {
		if ($(".jsavgraph").hasClass("editNodes") && !$(".jsavgraph").hasClass("working")) {
			var jg = $(".jsavgraph");
			jg.addClass("working");
			var self = this;
			var values = $(this).html().split('<br>');
			// interface for editing individual transitions is as a dropdown menu
			var createForm = '<form id="editedgelabel"><select class="labelmenu" id="edgelabelselect" size="' + values.length + '">'
			for (var i = 0; i < values.length; i++) {
				createForm += '<option>' + values[i] + '</option>';
			}
			createForm += '</select><br><input type="button" class="labelmenu" id="changetransitionbutton" value="Change transition"><input type="button" class="labelmenu" id="deletetransitionbutton" value="Delete transition"><input type="button" class="labelmenu" id="donelabelbutton" value="Done"></form>'
			$(createForm).appendTo(jg);
			// place menu where the user clicked (adjust positioning near the edges of the window)
			var xBound = jg.offset().left + jg.width(),
				yBound = jg.offset().top + jg.height(),
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
			// function for editing the selected transition
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
			// function for deleting the selected transition
			var deleteTransition = function() {
				var x = document.getElementById('edgelabelselect').selectedIndex;
				if (x !== -1) {
					document.getElementById('edgelabelselect').remove(x);
					document.getElementById('edgelabelselect').size--;
					// if all transitions are deleted, close the menu
					if (document.getElementById('edgelabelselect').size === 0) {
						$('#donelabelbutton').trigger("click");
					}
				}
			};
			// applies changes to the transitions and closes the menu
			var finishEdgeLabel = function() {
				var newVal = [];
				for (var j = 0; j < $('#edgelabelselect > option').length; j++) {
					newVal.push(document.getElementById('edgelabelselect').options[j].text);
				}
				newVal = newVal.join('<br>');
				$(self).html(newVal);
				$('#editedgelabel').remove();
				g.layout({layout: "automatic"});
				// console.log(_.map(g._alledges, function(x){return x.weight()}))
				$('.jsavgraph').removeClass("working");
				updateAlphabet();
			};
			$('#changetransitionbutton').click(changeTransition);
			$('#deletetransitionbutton').click(deleteTransition);
			$('#donelabelbutton').click(finishEdgeLabel);
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
		// editing nodes should be changed to match the interface in multitapeTest.js
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

	// handler for the edges of the graph
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
	
	//===============================
	// updates the alphabets displayed above the graph
	var updateAlphabet = function() {
		g.updateAlphabet();
		$("#alphabet").html("" + Object.keys(g.alphabet).sort());
		var sa = getTapeAlphabet(g);
		$('#stackalphabet').html(emptystring + "," + sa.sort());
	};

	//===============================
	//editing modes

	var addNodesMode = function() {
		removeEdgeSelect();
		removeLabelMenu();
		var jg = $(".jsavgraph");
		jg.removeClass("working");
		jg.removeClass("addEdges");
		jg.removeClass("moveNodes");
		jg.removeClass("editNodes");
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
		jg.addClass("editNodes");
		$("#mode").html('Editing nodes and edges');
		addEdgeSelect();
		jsav.umsg("Click a node or edge");
	};
	// change between editing and not editing (traversal)
	var changeEditingMode = function() {
		removeLabelMenu();
		var jg = $(".jsavgraph");
		jg.removeClass("working");
		jg.removeClass("addNodes");
		jg.removeClass("addEdges");
		jg.removeClass("moveNodes");
		jg.removeClass('editNodes');
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

	var onClickTraverse = function() {
		if (!g.initial) {
			alert('Please define an initial state');
			return;
		}
		var inputString = prompt("Input string?", "aaaa");
		while (inputString == null) {
			alert("Don't try to trick the program!");
			inputString = prompt("Input string?", "aaaa");	
		}
		jsav.umsg("");
		$("#functionality").hide();			//disable buttons
		$('#alphabets').hide();
		$("#mode").html('');
		$('.jsavcontrols').show();
		$('.jsavoutput').css({"text-align": "center", 'font-size': '2em', 'font-family': 'monospace'});

		g.play(inputString);
	}

	var save = function() {
		var downloadData = "text/xml;charset=utf-8," + encodeURIComponent(g.serializeToXML());
		$('#download').html('<a href="data:' + downloadData + '" target="_blank" download="tm.xml">Download TM</a>');
		$('#download a')[0].click();
	}

	var load = function() {
		var loaded = document.getElementById('loadFile');
		var file = loaded.files[0],
		reader = new FileReader();
		waitForReading(reader);
		reader.readAsText(file);
	}

	var waitForReading = function (reader) {
		reader.onloadend = function(event) {
				var text = event.target.result;
				g.initFromXML(text);
		}
	};

	$('#playButton').click(function() {onClickTraverse()});
	//$('#multiplebutton').click(displayTraversals);
	$('#nodeButton').click(addNodesMode);
	$('#changeButton').click(changeEditingMode);
	$('#edgeButton').click(addEdgesMode);
	$('#moveButton').click(moveNodesMode);
	$('#editButton').click(editNodesMode);
	$('#saveButton').click(save);
  $('#loadFile').on('change', load);

	g = initGraph({layout: "manual"});
	g.layout();
	jsav.displayInit();
	updateAlphabet();

}(jQuery));
