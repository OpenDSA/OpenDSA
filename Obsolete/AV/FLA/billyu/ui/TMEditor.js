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

	    g.addEdge(a, b, {weight: 'a;#,R'});
	   	g.addEdge(a, a, {weight: '#;#,R'});
	    //g.addEdge(a, d); 		it's a FA, need to always provide a weight

	    g.addEdge(b, b, {weight: '#;#,R'});
	    g.addEdge(b, c, {weight: square + ';' + square + ',L'});
	    g.addEdge(b, d, {weight: 'a;a,R'});

	   	g.addEdge(d, d, {weight: '#;#,R'});
	    g.addEdge(d, e, {weight: 'a;#,R'});
	   	g.addEdge(d, f, {weight: square + ';' + square + ',L'});

	    g.addEdge(e, e, {weight: '#;#,R'});
	    g.addEdge(e, d, {weight: 'a;a,R'});

	    g.addEdge(f, f, {weight: '#;#,L'});
	    g.addEdge(f, f, {weight: 'a;a,L'});
	    g.addEdge(f, a, {weight: square + ';' + square + ',R'});
	
    $(".jsavgraph").click(graphClickHandler);
    g.click(nodeClickHandler);
		g.click(edgeClickHandler, {edge: true});
		$('.jsavedgelabel').click(labelClickHandler);
		return g;
	};

	// handler for editing edges/transitions
	var labelClickHandler = function(e) {
		initEditEdgeInput(this);
	};

	// show table for the label clicked
	var initEditEdgeInput = function(label) {
		var weights = $(label).html().split("<br>");
		if (weights.length == 1 && g.hasClass("delete")) {
			$(label).html("");
			g.layout({layout: "manual"});
			g.updateEdgePositions();
			return;
		}
		var tbody = $('#editEdge > table > tbody');
		var rows = tbody.find('tr');
		for (var i = rows.length - 1; i > 0; i--) {
			rows[i].remove();
		}
		var row = $(rows[0]);
		row.find('#read').focus();
		for (var i = 0; i < weights.length; i++) {
			weights[i] = toColonForm(weights[i]);
			var letters = weights[i].split(":");
			rows = tbody.find('tr');
			if (i >= rows.length) {
				var newRow = row.clone();
				tbody.append(newRow);
			}
			var lastRow = tbody.find('tr').last();
			lastRow.find('#read').val(letters[0]);
			lastRow.find('#write').val(letters[1]);
			lastRow.find('#dir').val(letters[2]);
			lastRow.find('#deleteEdge').text("Delete");
			lastRow.find('#deleteEdge').click(deleteRowInEditEdge);
		}
		var editEdgeInput = $('#editEdge');
		tbody.attr({remove: false});
		$('#deleteEdge').text("Delete");
		editEdgeInput.css({left: $(label).offset().left, top: $(label).offset().top});
		editEdgeInput.show();

		$(document).off('keyup').keyup(function(e) {
			if (e.keyCode == 13) {
				completeEditEdge(label);
			} else if (e.keyCode == 27) {
				cancel();
			}
		});
	};

	var deleteRowInEditEdge = function() {
		var tbody = $(this).parent().parent().parent();
		if (tbody.children().length == 1) {
			$('#deleteEdge').text("Deleted");
			tbody.attr({remove: 'true'});
			return;
		}
		$(this).parent().parent().remove();
	};

	var completeEditEdge = function(label) {
		var editEdgeInput = $('#editEdge');
		var tbody = editEdgeInput.find('tbody');
		var newWeight = "";
		if (tbody.attr('remove') == 'true') {
			newWeight = "";
		}
		else {
			var rows = tbody.find('tr');
			var weights = [];
			for (var i = 0; i < rows.length; i++) {
				var row = $(rows[i]);
				var read = row.find('#read').val();
				var write = row.find('#write').val();
				var dir = row.find('#dir').val();
				if (read == "") read = square;
				if (write == "") write = square;
				if (dir == "") dir = square;
				weights.push(read + ";" + write + "," + dir);
			}
			newWeight = weights.join("<br>");
		}
		$(label).html(newWeight);
		g.saveFAState();
		g.layout({layout: 'manual'});
		g.updateEdgePositions();
		editEdgeInput.hide();
		g.updateAlphabet();
	};

	// handler for the graph window
	var graphClickHandler = function(e) {
		if ($(".jsavgraph").hasClass("addNodes")) {
			g.saveFAState();
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
		if ($(".jsavgraph").hasClass("edit")) {
			this.highlight();
			var input = prompt("State Label: ", this.stateLabel());
			if (!input || input == "null"){
				this.unhighlight();
				return;
			}
			g.saveFAState();
			this.stateLabel(input);
			this.stateLabelPositionUpdate();
			this.unhighlight();
		}
		else if ($('.jsavgraph').hasClass('moveNodes')) {
		}
		else if ($('.jsavgraph').hasClass('delete')) {
			g.saveFAState();
			g.removeNode(this);
		}
	};

	// handler for the edges of the graph
	var edgeClickHandler = function(e) {
		if ($('.jsavgraph').hasClass('edit')) {
			this.highlight();
			var input = confirm("Delete edge?");
			if (input === null) {
				this.unhighlight();
				return;
			}
			if (input) {
				g.saveFAState();
				g.removeEdge(this);
			}
			this.unhighlight();
		}
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
		g.enableDragging();
		var jg = $(".jsavgraph");
		jg.addClass("moveNodes");
		$("#mode").html('');
		jsav.umsg("Drag to move.");
	};
	var editMode = function() {
		cancel();
		var jg = $(".jsavgraph");
		jg.addClass("edit");
		$("#mode").html('Editing nodes and edges');
		addEdgeSelect();
		jsav.umsg("Click a node or edge to edit.");
	};
	var deleteMode = function() {
		cancel();
		var jg = $(".jsavgraph");
		jg.addClass("delete");
		$("#mode").html('Deleting');
		jsav.umsg("Click a node or edge to delete. Enter to confirm.");
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
		jg.removeClass("edit");
		jg.removeClass("delete");
		var nodes = g.nodes();
		for (var node = nodes.next(); node; node = nodes.next()) {
			node.unhighlight();
		}
		$('#edge').hide();
		$('#editEdge').hide();
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
		var rows = $('#edge > table > tr');
		for (var i = 1; i < rows.length; i++) {
			rows[i].remove();
		}
		$('#toRead').val(square);
		$('#toWrite').val(square);
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
		var edgeWeight = toRead + ";" + toWrite + "," + direction;
		g.addEdge(first, g.selected, {weight: edgeWeight});
		$('.jsavedgelabel').off('click').click(labelClickHandler);

		edgeInput.hide();
		first.unhighlight();
		g.selected.unhighlight();
		g.updateEdgePositions();
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

	// Function to reset the size of the undo stack and the redo stack.
	// Since both of them are empty, both buttons are also disabled.
	// Called whenever the user loads a new graph.
	function resetUndoButtons () {
		document.getElementById("undoButton").disabled = true;
		document.getElementById("redoButton").disabled = true;
	};

	$('#playButton').click(function() {onClickTraverse()});
	//$('#multiplebutton').click(displayTraversals);
	$('#nodeButton').click(addNodesMode);
	$('#changeButton').click(changeEditingMode);
	$('#edgeButton').click(addEdgesMode);
	$('#moveButton').click(moveNodesMode);
	$('#editButton').click(editMode);
	$('#saveButton').click(save);
  $('#loadFile').on('change', load);
	$('#undoButton').click(function() {
		g.undo();
		$(".jsavgraph").click(graphClickHandler);
		$('.jsavedgelabel').click(labelClickHandler);
	});
	$('#redoButton').click(function() {
		g.redo();
		$(".jsavgraph").click(graphClickHandler);
		$('.jsavedgelabel').click(labelClickHandler);
	});
	$('#cancelButton').click(cancel);
	$('#deleteButton').click(deleteMode);
	$(document).keyup(function(e) {
		if (e.keyCode == 27) {
			e.preventDefault();
			cancel();
		}
	});

	g = initGraph({layout: "manual"});
	g.layout();
	resetUndoButtons();
	jsav.displayInit();

}(jQuery));
