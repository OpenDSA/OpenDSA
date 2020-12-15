// TODO: The Traversor code needs to be factored out,
// along with the copy VisFormalLang/TM/TManbncnCON.js
var lambda = String.fromCharCode(955),
		epsilon = String.fromCharCode(949),
		square = String.fromCharCode(9633),
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
        	exerController = new ExerciseController(jsav, g, exerciseLocation, "json", {initGraph: initGraph, type: "PDA"});
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
  		// var a = g.addNode({left: 0.10 * gWidth, top: 0.3 * gHeight}),		
	    //   		b = g.addNode({left: 0.35 * gWidth, top: 0.7 * gHeight}),
	    //   		c = g.addNode({left: 0.10 * gWidth, top: 0.7 * gHeight}),
	    //   		d = g.addNode({left: 0.6 * gWidth, top: 0.7 * gHeight}),
	    //   		e = g.addNode({left: 0.85 * gWidth, top: 0.5 * gHeight}),
	    //   		f = g.addNode({left: 0.35 * gWidth, top: 0.3 * gHeight});
	    //   	g.makeInitial(a);
	    //   	c.addClass('final');

	   //  g.addEdge(a, b, {weight: 'a;#,R'});
	   // 	g.addEdge(a, a, {weight: '#;#,R'});
	   //  //g.addEdge(a, d); 		it's a FA, need to always provide a weight

	   //  g.addEdge(b, b, {weight: '#;#,R'});
	   //  g.addEdge(b, c, {weight: square + ';' + square + ',L'});
	   //  g.addEdge(b, d, {weight: 'a;a,R'});

	   // 	g.addEdge(d, d, {weight: '#;#,R'});
	   //   g.addEdge(d, e, {weight: 'a;#,R'});
	   // 	g.addEdge(d, f, {weight: square + ';' + square + ',L'});

	   //  g.addEdge(e, e, {weight: '#;#,R'});
	   //  g.addEdge(e, d, {weight: 'a;a,R'});

	   //  g.addEdge(f, f, {weight: '#;#,L'});
	   //  g.addEdge(f, f, {weight: 'a;a,L'});
	   //  g.addEdge(f, a, {weight: square + ';' + square + ',R'});
	
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
	var phraseChanged = "";
	var direction = "";
	var letChanged = "";
	var letScanned = "";
	var currState = "";
	var prevLet = "";	
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
		$('.jsavoutput').css({"text-align": "left"});
        var arr = new Array(15);    // arbitrary size
        for (var i = 0; i < 15; i++) {
			arr[i] = String.fromCharCode(9633);
			if(arr[i] == "□"){
				arr[i] = "#";
			}
		}
		var indexx = 7-inputString.length/2;
        for(var x = 0; x < inputString.length; x++){
            arr[7-inputString.length/2 + x] = inputString.charAt(x);
        }
        
        
        var nodess = g.nodes();
		var topos = 0;
		for(var y = 0; y<nodess.length; y++){
			if(topos<nodess[y].position().top){
				topos = nodess[y].position().top;
			}

		}
		jsav.umsg("We will see how the machine processes input string '" + inputString + "'.");
		jsav.ds.tape([arr[0], arr[1], arr[2], arr[3], arr[4], arr[5], arr[6], arr[7], arr[8],arr[9], arr[10], arr[11], arr[12], arr[13], arr[14]], 150, topos + 50, "both");
		var p3 = jsav.g.line(165+30*(7-inputString.length/2), 140 + topos, 165 + 30*(7-inputString.length/2), 85 + topos, {"arrow-end": "classic-wide-long"});
		var rects = jsav.g.rect(150+30*(7-inputString.length/2), 140 + topos, 30, 30);
		nodess[0].highlight();
        var currentStates = [new Configuration(g.initial, inputString, jsav)],
        cur,
        counter = 0,
        configView = [];		// configurations to display in the message box
// for (var j = 0; j < currentStates.length; j++) {
//     configView.push(currentStates[j].toString());
// }
// this.jsav.umsg(configView.join(' | '));
g.initial.highlight();
jsav.displayInit();

while (true) {
    if (counter === 500) {
        console.log(counter);
        break;
    }
    counter++;
    for (var j = 0; j < currentStates.length; j++) {
        currentStates[j].state.unhighlight();
        g.removeAccept(currentStates[j].state);
    }
    // get next states
	//cur = g.traverse(currentStates);
	var nextStates = [];
	for (var j = 0; j < currentStates.length; j++) {
		var currentState = currentStates[j];
		var tapeValue = currentState.tape.currentValue();
		// var tapeValue = currentState.tape.value();
		var successors = currentState.state.neighbors();
		for (var next = successors.next(); next; next = successors.next()) {
			var edge = g.getEdge(currentState.state, next),
                    weight = edge.weight().split('<br>');
			for (var i = 0; i < weight.length; i++) {
				weight[i] = toColonForm(weight[i]);
				var w = weight[i].split(':');
				if (tapeValue === w[0]) {
					var nextConfig = new Configuration(next, currentState.tape, jsav);
					if (w[1] !== square){
                        nextConfig.tape.value(w[1]);
                        arr[indexx] = w[1]
					}
                    nextConfig.tape.move(w[2]);
                    if(w[2] == "R"){
                        indexx = indexx + 1;
						p3.translateX(30);
						rects.translateX(30);
						direction = "right one cell, ";
                    }
                    else if(w[2] == "L"){
                        indexx = indexx -1;
						p3.translateX(-30);
						rects.translateX(-30);
						direction = "left one cell, ";
					}
					prevLet = w[0];
					letChanged = w[1];
					if(prevLet == letChanged){
						phraseChanged = "The current cell value remains the same and the tape head shifts " + direction + "scanning " + arr[indexx] +". ";
					}
					else{
						phraseChanged = "The current cell value becomes " + letChanged + " and the tape head shifts " + direction + "scanning " + arr[indexx] + ". ";
					}

					nextStates.push(nextConfig);
					break;
				}
				else if ((tapeValue === undefined) && w[0] === "#"){
					var nextConfig = new Configuration(next, currentState.tape, jsav);
					if (w[1] !== "#"){
                        nextConfig.tape.value(w[1]);
						arr[indexx] = w[1]
						if(w[2] == "R"){
							indexx = indexx + 1;
							p3.translateX(30);
							rects.translateX(30);
							direction = "right one cell, ";
						}
						else if(w[2] == "L"){
							indexx = indexx -1;
							p3.translateX(-30);
							rects.translateX(-30);
							direction = "left one cell, ";
						}
						prevLet = w[0];
						letChanged = w[1];
						if(prevLet == letChanged){
							phraseChanged = "The current cell value remains the same and the tape head shifts " + direction + "scanning " + arr[indexx] +". ";
						}
						else{
							phraseChanged = "The current cell value becomes " + letChanged + " and the tape head shifts " + direction + "scanning " + arr[indexx] + ". ";
						}
					}
					else{
						if(w[2] == "R"){
							indexx = indexx + 1;
							p3.translateX(30);
							rects.translateX(30);
							direction = "right one cell, ";
						}
						else if(w[2] == "L"){
							indexx = indexx -1;
							p3.translateX(-30);
							rects.translateX(-30);
							direction = "left one cell, ";
						}
						prevLet = w[0];
						letChanged = w[1];
						if(prevLet == letChanged){
							phraseChanged = "The current cell value remains the same and the tape head shifts " + direction + "scanning " + arr[indexx] +". ";
						}
						else{
							phraseChanged = "The current cell value becomes " + letChanged + " and the tape head shifts " + direction + "scanning " + arr[indexx] + ". ";
						}
					}
					nextConfig.tape.move(w[2]);
					nextStates.push(nextConfig);
					break;
				}
			}
		}
	}
	nextStates = _.uniq(nextStates, function(x) {return x.toID();});
	cur = nextStates;
    if (!cur || cur.length === 0) {
        break;
    }
    currentStates = cur;
    configView = [];
	// add highlighting and display
	var previous = 0;
    for (var j = 0; j < currentStates.length; j++) {
		currentStates[j].state.highlight();
		currState = "The current state is " + currentStates[j].state.value();
		jsav.umsg("Step " + counter + ": " + phraseChanged + currState);
		jsav.ds.tape([arr[0], arr[1], arr[2], arr[3], arr[4], arr[5], arr[6], arr[7], arr[8],arr[9], arr[10], arr[11], arr[12], arr[13], arr[14]], 150, topos + 50, "both");
        if (g.isFinal(currentStates[j].state)) {
            g.showAccept(currentStates[j].state);
        }
        //configView.push(currentStates[j].toString());
    }
    jsav.step();
}
for (var k = 0; k < currentStates.length; k++) {
	if (g.isFinal(currentStates[k].state)) {
		g.showAccept(currentStates[k].state);
	} else {
		g.showReject(currentStates[k].state);
	}
	
}
jsav.step();
jsav.recorded();
		//g.play(inputString);
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

var Tape = function(str) {
	"use strict";
	this.arr = [];
	this.current = 0;
	this.currentIndex = 0;

	if (typeof str === 'string') {
		this.arr = str.split("");
		this.current = this.arr[0];  // the current symbol
		this.currentIndex = 0;                // the current position
	}
	// else, assume that a Tape object was passed in, and create a copy of it
	else {
		this.currentIndex = str.currentIndex;
		this.arr = str.getArr();
		this.current = this.arr[this.currentIndex];
	}

	this.copy = function(value){
		var newarr = new Array(value.length);
		for (var i = 0; i < value.length; i++){
			newarr[i] = value[i];
		}
		return newarr;
	}

	this.toString = function(){
		return this.arr.toString();
	}

	this.write = function(value, location){
		this.arr[location] = value;
		size++;
		this.current = location;
	}

	this.getArr = function(){
		return this.arr;
	}

	this.currentValue = function() {
		return this.arr[this.currentIndex];
	}

	this.value = function(newValue) {
		if (typeof newValue === "undefined") {
			return undefined;
		}
		this.arr[this.currentIndex] = newValue;
		return this.arr[this.currentIndex];
	}

	this.goRight = function() {
			this.currentIndex+=1;
			this.current = this.arr[this.currentIndex];
			return this.current;
	}

	this.goLeft = function() {
			this.currentIndex-=1;
			this.current = this.arr[this.currentIndex];
			return this.current;
	}

	this.removeValue = function(location) {
		this.arr[location] = null;
		for (var i = 0; i < arr.length; i++)	{
			arr[i] = arr[i+1];
		}
	}

	// Move the tape and read the symbol
	this.move = function (str) {
		if (str === "L") {
			return this.goLeft();
		} else if (str === "R") {
			return this.goRight();
		} else if (str === "S") {
			return this.curren;
		}
	}

	this.viewTape = function (t, av) {
		var arr = av.ds.tape(t, 325, 30, "both", this.currentIndex);
		return arr;
	};
};
