var lambda = String.fromCharCode(955),
		epsilon = String.fromCharCode(949),
		emptystring;

(function($) {
	var jsav = new JSAV("av");
	jsav.displayInit();
	var g;

// initialize graph
	var initGraph = function(opts) {
		g = jsav.ds.npda($.extend({width: '90%', height: 440, emptystring: lambda, editable: true}, opts));
		emptystring = g.emptystring;
		var gWidth = g.element.width(),
				gHeight = g.element.height();
		var a = g.addNode({left: 0.10 * gWidth, top: 0.3 * gHeight}),		
				b = g.addNode({left: 0.35 * gWidth, top: 0.3 * gHeight}),
				c = g.addNode({left: 0.60 * gWidth, top: 0.3 * gHeight}),
				d = g.addNode({left: 0.25 * gWidth, top: 0.7 * gHeight}),
				e = g.addNode({left: 0.50 * gWidth, top: 0.7 * gHeight}),
				f = g.addNode({left: 0.85 * gWidth, top: 0.3 * gHeight});
		g.makeInitial(a);
		f.addClass('final');

		g.addEdge(a, b, {weight: 'a,' + "Z" + ";aZ"});
		//g.addEdge(a, d); 		it's a FA, need to always provide a weight

		g.addEdge(b, b, {weight: 'a,a;aa'});
		g.addEdge(b, c, {weight: 'b,a;' + emptystring});
		g.addEdge(b, d, {weight: 'b,a;a'});

		g.addEdge(c, c, {weight: 'b,a;' + emptystring});
		g.addEdge(c, d, {weight: 'b,a;a'});
		g.addEdge(c, f, {weight: emptystring + ',' + "Z" + ';' + "Z"});

		g.addEdge(d, c, {weight: 'b,a;' + emptystring});
		g.addEdge(d, e, {weight: 'b,a;a'});

		g.addEdge(e, c, {weight: 'b,a;' + emptystring});

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
		// delete edge if there is only one transition and in delete mode
		if (weights.length == 1 && g.hasClass("delete")) {
			g.saveFAState();
			$(label).html("");
			g.layout({layout: 'manual'});
			return;
		}
		var tbody = $('#editEdge > table > tbody');
		var rows = tbody.find('tr');
		for (var i = rows.length - 1; i > 0; i--) {
			rows[i].remove();
		}
		var row = $(rows[0]);
		for (var i = 0; i < weights.length; i++) {
			weights[i] = toColonForm(weights[i]);
			var letters = weights[i].split(":");
			rows = tbody.find('tr');
			if (i >= rows.length) {
				var newRow = row.clone();
				tbody.append(newRow);
			}
			var lastRow = tbody.find('tr').last();
			lastRow.find('#input').val(letters[0]);
			lastRow.find('#pop').val(letters[1]);
			lastRow.find('#push').val(letters[2]);
			lastRow.find('#deleteEdge').text("Delete");
			lastRow.find('#deleteEdge').click(deleteRowInEditEdge);
		}
		var editEdgeInput = $('#editEdge');
		tbody.attr({remove: false});
		$('#deleteEdge').text("Delete");
		editEdgeInput.css({left: $(label).offset().left, top: $(label).offset().top});
		editEdgeInput.show();
		$('#input').focus();

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
				var input = row.find('#input').val();
				var pop = row.find('#pop').val();
				var push = row.find('#push').val();
				if (input == "") input = lambda;
				if (pop == "") pop = lambda;
				if (push == "") push = lambda;
				weights.push(input + "," + pop + ";" + push);
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


	var toggleND = function() {
		$('#changeButton').toggleClass("highlightingND");
		if ($('#changeButton').hasClass("highlightingND") || $('#changeButton').hasClass("highlightingL")) {
			$('#changeButton').hide();
		} else{
			$('#changeButton').show();
		}
		g.toggleND();
	};

	var toggleLambda = function() {
		$('#changeButton').toggleClass("highlightingL");
		if ($('#changeButton').hasClass("highlightingND") || $('#changeButton').hasClass("highlightingL")) {
			$('#changeButton').hide();
		} else{
			$('#changeButton').show();
		}
		g.toggleLambda();
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
		var inputString = prompt("Input string?", "abb");
		if (inputString === null) {
			return;
		}
		jsav.umsg("");
		var textArray = [];
		$("#functionality").hide();			//disable buttons
		$("#mode").html('');
		$('.jsavcontrols').show();
		$('#configurations').show();
		g.play(inputString);
	};

	var save = function() {
		var downloadData = "text/xml;charset=utf-8," + encodeURIComponent(g.serializeToXML());
		$('#download').html('<a href="data:' + downloadData + '" target="_blank" download="npda.xml">Download NPDA</a>');
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
		$('#input').val(lambda);
		$('#pop').val(lambda);
		edgeInput.show();
		var leftOffset = 15 + box.x + box.width / 2;
		var topOffset = box.y + box.height / 2 + $('.jsavgraph').offset().top - 5;
		edgeInput.css({left: leftOffset, top: topOffset});
		path.remove();
		first = g.first;
		g.first = null;
		$('#input').focus();
		$(document).keyup(function(e) {
			if (e.keyCode == 13) {
				addEdgeWithInputBox();
			}
		});
	}

	function addEdgeWithInputBox() {
		if (!first) return;
		var edgeInput = $('#edge');
		var input = $('#input').val();
		var pop = $('#pop').val();
		var push = $('#push').val();
		var edgeWeight = input + "," + pop + ";" + push;
		g.saveFAState();
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


	$('#playButton').click(onClickTraverse);
	$('#layoutbutton').click(function() {g.layout()});
	$('#testNDbutton').click(toggleND);
	$('#testlambdabutton').click(toggleLambda);
	$('#cancelButton').click(cancel);
	$('#nodeButton').click(addNodesMode);
	$('#edgeButton').click(addEdgesMode);
	$('#moveButton').click(moveNodesMode);
	$('#editButton').click(editMode);
	$('#deleteButton').click(deleteMode);
	$('#saveButton').click(save);
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
	$('#loadFile').on('change', load);
	$('#configurations').hide();
	$('.configuration').hide();

	g = initGraph({layout: "manual"});
	g.layout();
	resetUndoButtons();
	jsav.displayInit();
}(jQuery));
