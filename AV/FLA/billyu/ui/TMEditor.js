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
		g = jsav.ds.tm($.extend({width: '90%', height: 440, emptystring: square, editable: true}, opts));
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
		else if ($('.jsavgraph').hasClass('moveNodes')) {
		}
	};

	// handler for the nodes of the graph
	var nodeClickHandler = function(e) {	
		// editing nodes should be changed to match the interface in multitapeTest.js
		if ($(".jsavgraph").hasClass("editNodes")) {
			this.highlight();
			var input = prompt("State Label: ", this.stateLabel());
			this.stateLabel(input);
			this.stateLabelPositionUpdate();
			this.unhighlight();
		}
		else if ($('.jsavgraph').hasClass('moveNodes')) {
		}
		else if ($('.jsavgraph').hasClass('delete')) {
			g.removeNode(this);
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
		cancel();
		var jg = $(".jsavgraph");
		jg.addClass("addNodes");
		$("#mode").html('Adding nodes');
		jsav.umsg("Click to add nodes");
	};
	var addEdgesMode = function() {
		cancel();
		var jg = $(".jsavgraph");
		jg.addClass("addEdges");
		g.disableDragging();
		$(".jsavgraph").addClass("addEdges");
		$('.jsavgraph').off('mousedown').mousedown(mouseDown);
		$('.jsavgraph').off('mousemove').mousemove(mouseMove);
		$('.jsavgraph').off('mouseup').mouseup(mouseUp);
		$("#mode").html('Adding edges');
		jsav.umsg("Drag from one edge to another.");
	};
	var moveNodesMode = function() {
		cancel();
		var jg = $(".jsavgraph");
		jg.addClass("moveNodes");
		$("#mode").html('');
		jsav.umsg("Drag to move.");
	};
	var editNodesMode = function() {
		cancel();
		var jg = $(".jsavgraph");
		jg.addClass("editNodes");
		$("#mode").html('Editing nodes and edges');
		addEdgeSelect();
		jsav.umsg("Click a node or edge to edit.");
	};
	var deleteMode = function() {
		cancel();
		var jg = $(".jsavgraph");
		jg.addClass("delete");
		$("#mode").html('Deleting');
		jsav.umsg("Click a node or edge to delete.");
	};
	// change between editing and not editing (traversal)
	var changeEditingMode = function() {
		cancel();
		$("#mode").html('Editing');
		if ($(".notEditing").is(":visible")) {
			$('#changeButton').html('Done editing');
		} else {
			$('#changeButton').html('Edit');
		}
		$('.notEditing').toggle();
		$('.editing').toggle();
	};
	var cancel = function() {
		removeEdgeSelect();
		removeLabelMenu();
		var jg = $(".jsavgraph");
		jg.removeClass("working");
		jg.removeClass("addNodes");
		jg.removeClass("addEdges");
		jg.removeClass("moveNodes");
		jg.removeClass("editNodes");
		jg.removeClass("delete");
		$("#mode").html('\n');
		jsav.umsg("Enjoy");
	}

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

	var startX, startY, endX, endY; // start position of dragging edge line
	function mouseDown(e) {
		if (!$('.jsavgraph').hasClass('addEdges')) return;
		var targetClass = $(e.target).attr('class');
		if (targetClass !== "jsavvaluelabel") return;
		var node = $(e.target);
		g.first = g.getNodeWithValue(node.text());
		g.first.highlight();
		offset = $('.jsavgraph').offset(),
	 	offset2 = parseInt($('.jsavgraph').css('border-width'), 10);
		startX = e.pageX - 15; 
		startY = e.pageY - offset.top + offset2 - 5;
	}

	function mouseUp(e) {
		if (!g.first) return;
		var targetClass = $(e.target).attr('class');
		if (targetClass !== "jsavvaluelabel") {
			$('path[opacity="1.5"]').remove();
			g.first.unhighlight();
			g.first = null;
			return;
		}
		var node = $(e.target);
		g.selected = g.getNodeWithValue(node.text());
		g.selected.highlight();
		
		initEdgeInput();
	}

	function initEdgeInput() {
		// draw the edge input box at correct position
		var path = $('path[opacity="1.5"]');
		var box = path[0].getBBox();
		var edgeInput = $('#edge');
		edgeInput.show();
		var leftOffset = 15 + box.x + box.width / 2;
		var topOffset = box.y + box.height / 2 + $('.jsavgraph').offset().top - 5;
		edgeInput.css({left: leftOffset, top: topOffset});
		path.remove();
		first = g.first;
		g.first = null;
		$('#toRead').focus();
		$(document).keyup(function(e) {
			if (e.keyCode == 13) {
				addEdgeWithInputBox();
			}
		});
	}

	function addEdgeWithInputBox() {
		if (!first) return;
		var edgeInput = $('#edge');
		var toRead = $('#toRead').val();
		var toWrite = $('#toWrite').val();
		var direction = $('#direction').val();
		var edgeWeight = toRead + ":" + toWrite + ":" + direction;
		g.addEdge(first, g.selected, {weight: edgeWeight});

		edgeInput.hide();
		first.unhighlight();
		g.selected.unhighlight();
		first = null;
		g.selected= null;
	}

	function mouseMove(e) {
		if (!g.first) return;
		endX = e.pageX - 15;
		endY = e.pageY - offset.top + offset2 - 5;
		$('path[opacity="1.5"]').remove();
		jsav.g.line(startX, startY, endX, endY, {"opacity": 1.5});
	}

	$('#playButton').click(function() {onClickTraverse()});
	//$('#multiplebutton').click(displayTraversals);
	$('#nodeButton').click(addNodesMode);
	$('#changeButton').click(changeEditingMode);
	$('#edgeButton').click(addEdgesMode);
	$('#moveButton').click(moveNodesMode);
	$('#editButton').click(editNodesMode);
	$('#saveButton').click(save);
  $('#loadFile').on('change', load);
	$('#undoButton').click(function() {g.undo();});
	$('#redoButton').click(function() {g.redo();});
	$('#cancelButton').click(cancel);
	$('#deleteButton').click(deleteMode);
	$(document).keyup(function(e) {
		if (e.keyCode == 27) {
			cancel();
		}
	});

	g = initGraph({layout: "manual"});
	g.layout();
	jsav.displayInit();
	updateAlphabet();

}(jQuery));
