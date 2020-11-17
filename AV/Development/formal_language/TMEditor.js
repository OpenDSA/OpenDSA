var lambda = String.fromCharCode(955),
		epsilon = String.fromCharCode(949),
		square = String.fromCharCode(35),
		emptystring;

(function($) {
	var jsav = new JSAV("av");
	jsav.displayInit();
	var g;
	var exerController,
	exerciseLocation;

	var loadHandler = function()
	{
		type = $('h1').attr('id');
		if(type == 'tester'){
			exerciseLocation = getExerciseLocation();//;oad the exercise name from the Tester/Fixer html file.
        	exerController = new ExerciseController(jsav, g, exerciseLocation, "json", {initGraph: initGraph, type: "TM"});
        	exerController.load();
        
        	var exercise = jsav.flexercise(modelSolution, initializeExercise,
          	{feedback: "atend", grader: "finalStep", controls: $(".jsavexercisecontrols"), exerciseController: exerController});
        	exercise.reset();
		}
		else{
			g = initGraph({layout: "manual"});
			g.layout();
			resetUndoButtons();
			jsav.displayInit();
		}
	}
	//Function sent to exercise constructor to initialize the exercise
	function initializeExercise() {
		g.clear();
		exerController.fa = initGraph();
	  }
	  
	  //Function used by exercise object to show the model answer and to grade the solution by comparing the model answer with student answer.
	  //In our case, we will make this function show the test cases only.
	  function modelSolution(modeljsav) {
			var containHideTest = false;
			var testCases = exerController.tests[0]["testCases"];
			var list = [["Test Number", "Test String", "Accept/Reject"]];
			var testNum = 1;
			for (i = 0; i < testCases.length; i++) {
				var testCase = testCases[i];
				var hideOption = testCase.ShowTestCase;
				if (hideOption == false || hideOption== undefined) {
					containHideTest = true;
				}
				if(testCase.ShowTestCase){	
					var input = Object.keys(testCase)[0];
					//var inputResult = FiniteAutomaton.willReject(this.fa, input);
					list.push([testNum, input, testCase[input]]);
					testNum = testNum + 1;
				}
			}
			if(containHideTest){
				list.push([testNum, "Hidden Test", "Hidden Solution"]);
			}
			var model = modeljsav.ds.matrix(list);
		//layoutTable(model);
		modeljsav.displayInit();
		return model;
	  }  
	// initialize graph
	var initGraph = function(opts) {
		g = jsav.ds.TM($.extend({width: '750px', height: 440, emptystring: square, editable: true}, opts));
		g.enableDragging();
		emptystring = g.emptystring;
		var gWidth = g.element.width(),
		gHeight = g.element.height();
    	jsav.displayInit();
    	g.click(nodeClickHandler);
		g.click(edgeClickHandler, {edge: true});
		$('.jsavgraph').click(graphClickHandler);
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
		// else if ($('.jsavgraph').hasClass('moveNodes')) {
		// }
	};

	// handler for the nodes of the graph
	var nodeClickHandler = function(e) {	
		// editing nodes should be changed to match the interface in multitapeTest.js
		if ($(".jsavgraph").hasClass("edit")) {
			g.saveFAState();
			g.selected = this;
			g.selected.highlight();
			var Prompt = new FANodePrompt(updateNode, g.selected.hasClass('start'), g.selected.hasClass('final'), g.selected.stateLabel());
			Prompt.render(g.selected.value());
			g.selected.unhighlight();
		}
		else if ($('.jsavgraph').hasClass('moveNodes')) {
		}
		else if ($('.jsavgraph').hasClass('delete')) {
			g.saveFAState();
			g.removeNode(this);
		}
	};

	function updateNode(wasInitialState, initial_state, wasFinalState, final_state, node_label) {
		g.saveFAState();
    	executeEditNode(g, g.selected, wasInitialState, initial_state, wasFinalState, final_state, node_label);
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
		   highlight_select_button();
    removeModeClasses();

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
		moveNodesMode();
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

	  // Disable all editing modes so that click handlers do not fire.
	  // Called when the user switches editing modes, or otherwise presses a button that changes the view.
	var removeModeClasses = function() {
	    // Clear all superfluous or otherwise outdated information on the page.
	    $('.arrayPlace').empty();
	    $('#download').html('');
	    jsav.umsg('');
	    // Unselect and unhighlight any selected nodes or edges.
	    if (g.first) {
	      g.first.unhighlight();
	      g.first = null;
	    }
	    if (g.selected) {
	      g.selected.unhighlight();
	      g.selected = null;
	    }
	    if ($(".jsavgraph").hasClass("deleteNodes")) {
	      $(".jsavgraph").removeClass("deleteNodes");
	      // Return edges to normal size.
	      collapseEdges();
	    }
	    else {
	      $(".jsavgraph").removeClass("addNodes");
	      $(".jsavgraph").removeClass("addEdges");
	      $(".jsavgraph").removeClass("editNodes");
	      $(".jsavgraph").removeClass("moveNodes");
	      $(".jsavgraph").removeClass("working");
	    }
	  };


	// Function to reset the size of the undo stack and the redo stack.
	// Since both of them are empty, both buttons are also disabled.
	// Called whenever the user loads a new graph.
	function resetUndoButtons () {
		document.getElementById("undoButton").disabled = true;
		document.getElementById("redoButton").disabled = true;
	};

	  function highlight_select_button(){
    // Add active class to the current button (highlight it)
    /*var header = document.getElementById("menu_options");
    var btns = header.getElementsByClassName("icon_btn");
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
      });
    }*/
    $('#undoButton').removeClass("active");
    $('#redoButton').removeClass("active");
    $('#deleteButton').removeClass("active");
    $('#editButton').removeClass("active");
    $('#nodeButton').removeClass("active");
    $('#edgeButton').removeClass("active");
        $('#collapseButton').removeClass("active");
  }


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

	loadHandler();

}(jQuery));
