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
	exerciseLocation,
	canvasControls, // pan + rubber-band select, set up at the bottom via GraphEditor.attachPanAndSelect
	// The edges/preview-line SVG is a sibling of .jsavgraph (not a child
	// of it), so it needs the same transform applied explicitly to stay
	// visually in sync - see alsoTransform in GraphEditor.createZoomPan.
	zoomPan = GraphEditor.createZoomPan('.jsavgraph', { minZoom: 0.25, maxZoom: 3, alsoTransform: '.jsavcanvas > svg' });
	$("#rmenu").load("./rmenu.html");
    $("#rmenu").hide();
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
		GraphEditor.rebindClickHandlers(graphClickHandler, labelClickHandler);
		return g;
	};

	// handler for editing edges/transitions
	var labelClickHandler = function(e) {
		transitions.openEditTable(this);
	};

	// handler for the graph window
	var graphClickHandler = function(e) {
		if (canvasControls.consumeSuppressedClick()) { return; } // this click ended a pan/selection drag, not a real click
		if ($(".jsavgraph").hasClass("addNodes")) {
			g.saveFAState();
			// zoom-aware: converts the click into the canvas's own coordinates
			var local = zoomPan.screenToLocal(e.pageX, e.pageY);
			executeAddNode(g, local.y, local.x);
		}
	};

	// handler for the nodes of the graph
	// Mode-dispatch on click is generic across all graph editors - see GraphEditor.js.
	// Order matters: edit mode also carries the moveNodes class, so editNodes is checked first.
	var nodeClickHandler = function(e) {
		GraphEditor.dispatchModeClick.call(this, {
			editNodes: function() {
				// editing nodes should be changed to match the interface in multitapeTest.js
				g.saveFAState();
				g.selected = this;
				g.selected.highlight();
				var Prompt = new FANodePrompt(updateNode, g.selected.hasClass('start'), g.selected.hasClass('final'), g.selected.stateLabel());
				Prompt.render(g.selected.value());
				g.selected.unhighlight();
			},
			moveNodes: function() {},  // dragging is handled by JSAV; a click does nothing here
			deleteNodes: function() {
				g.saveFAState();
				g.removeNode(this);
			}
		});
	};

	function updateNode(wasInitialState, initial_state, wasFinalState, final_state, node_label) {
		g.saveFAState();
    	executeEditNode(g, g.selected, wasInitialState, initial_state, wasFinalState, final_state, node_label);
  	};

	// handler for the edges of the graph
	var edgeClickHandler = function(e) {
		GraphEditor.dispatchModeClick.call(this, {
			editNodes: function() {
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
		});
	};

	window.TMsaver = function (dummy) {
		return g.serializeToXML();
	}
	
	//===============================
	//editing modes

	var addNodesMode = function() {
		GraphEditor.enterMode(jsav, {
			removeModeClassesFn: removeModeClasses,
			removeTestHighlightsFn: function() {},  // the TM editor has no test highlighting
			setup: function() {
				cancel();
				$("#mode").html('Adding nodes');
			},
			modeClass: 'addNodes',
			message: 'Click to add nodes',
			buttonSelector: '#nodeButton'
		});
	};
	var addEdgesMode = function() {
		GraphEditor.enterMode(jsav, {
			removeModeClassesFn: removeModeClasses,
			removeTestHighlightsFn: function() {},
			setup: function() {
				cancel();
				g.disableDragging();
				GraphEditor.bindTransitionDrag(mouseDown, mouseMove, mouseUp);
				$("#mode").html('Adding edges');
			},
			modeClass: 'addEdges',
			message: 'Drag from one edge to another.',
			buttonSelector: '#edgeButton'
		});
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
		GraphEditor.enterMode(jsav, {
			removeModeClassesFn: removeModeClasses,
			removeTestHighlightsFn: function() {},
			setup: function() {
				cancel();
				moveNodesMode();
				$("#mode").html('Editing nodes and edges');
				addEdgeSelect();
			},
			modeClass: 'editNodes',
			message: 'Click a node or edge to edit.',
			buttonSelector: '#editButton'
		});
	};
	var deleteMode = function() {
		GraphEditor.enterMode(jsav, {
			removeModeClassesFn: removeModeClasses,
			removeTestHighlightsFn: function() {},
			setup: function() {
				cancel();
				$("#mode").html('Deleting');
			},
			modeClass: 'deleteNodes',
			message: 'Click a node or edge to delete. Enter to confirm.',
			buttonSelector: '#deleteButton'
		});
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
		GraphEditor.cancel(jsav, g, removeEdgeSelect);
		// TM-specific cleanup on top of the shared cancel.
		removeLabelMenu();
		transitions.closeAll();
		$("#mode").html('\n');
		jsav.umsg("Enjoy");
	};

	// The add-transition box and the edit-transitions table are shared with
	// the PDA editor - see GraphEditor.createTransitionEditor.
	var transitions = GraphEditor.createTransitionEditor({
		getGraph: function() { return g; },
		addFields: ['toRead', 'toWrite', 'direction'],
		editFields: ['read', 'write', 'dir'],
		emptySymbol: square,
		addDefaults: [square, square, null],  // keep the last chosen direction
		formatWeight: function(v) { return v[0] + ";" + v[1] + "," + v[2]; },
		deleteModeClass: 'deleteNodes',
		deleteLastRowCommits: false,  // TM marks the row "Deleted" and waits for Enter
		labelClickHandler: labelClickHandler,
		onEditCancel: function() { cancel(); }
	});

	// make edges easier to click
	var addEdgeSelect = function () { transitions.addEdgeSelect(); };
	var removeEdgeSelect = function () { transitions.removeEdgeSelect(); };
	var removeLabelMenu = function() { transitions.removeLabelMenu(); };

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
				// the loaded transitions' labels need the click handler too
				GraphEditor.rebindClickHandlers(graphClickHandler, labelClickHandler);
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
		// The preview line is drawn on the edges' SVG, which has a different
		// local origin than node top/left positions - screenToDrawingLocal
		// (not screenToLocal) is the correct, zoom-aware conversion for it.
		var local = zoomPan.screenToDrawingLocal(e.pageX, e.pageY);
		startX = local.x;
		startY = local.y;
	}

	function mouseUp(e) {
		if (!g.first) return;
		var label = GraphEditor.stateLabelAtPointer(e);
		if (!label) {
			$('path[opacity="1.5"]').remove();
			g.first.unhighlight();
			g.first = null;
			return;
		}
		var node = $(label);
		g.selected = g.getNodeWithValue(node.text());
		g.selected.highlight();

		transitions.openAddBox(g.first, g.selected);
	}

	function mouseMove(e) {
		if (!g.first) return;
		var local = zoomPan.screenToDrawingLocal(e.pageX, e.pageY);
		endX = local.x;
		endY = local.y;
		$('path[opacity="1.5"]').remove();
		jsav.g.line(startX, startY, endX, endY, {"opacity": 1.5});
	}
	
	  // Disable all editing modes so that click handlers do not fire.
	  // Called when the user switches editing modes, or otherwise presses a button that changes the view.
	var removeModeClasses = function() {
		GraphEditor.removeModeClasses(jsav, g, removeEdgeSelect);
	};

	// Function to reset the size of the undo stack and the redo stack.
	// Since both of them are empty, both buttons are also disabled.
	// Called whenever the user loads a new graph.
	function resetUndoButtons () {
		GraphEditor.resetUndoButtons();
	};

	function highlight_select_button(){
		GraphEditor.highlightSelectButton();
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
		highlight_select_button();
		g.undo();
		GraphEditor.rebindClickHandlers(graphClickHandler, labelClickHandler);
	});
	$('#redoButton').click(function() {
		highlight_select_button();
		g.redo();
		GraphEditor.rebindClickHandlers(graphClickHandler, labelClickHandler);
	});
	$('#savePDF').click(GraphEditor.saveCanvasAsImage);
	$('#cancelButton').click(cancel);
	$('#deleteButton').click(deleteMode);
	// The add box's own Add / Cancel buttons
	$('#addEdge').click(function() { transitions.commitAdd(); });
	$('#cancelEdge').click(function() { cancel(); });
	loadHandler();

	// View menu layout items (generic - see GraphEditor.js)
	GraphEditor.attachLayoutMenu({
		jsav: jsav,
		getGraph: function() { return g; },
		removeModeClassesFn: removeModeClasses,
		removeTestHighlightsFn: function() {}
	});

	// --- Zoom / pan / rubber-band select (generic - see GraphEditor.js) ---
	// Zoom and pan are only turned on where the page has the zoom toolbar
	// (and so a way to reset the view); box-select works everywhere.
	var hasZoomControls = $('#zoomInButton').length > 0;
	if (hasZoomControls) { GraphEditor.attachZoomControls(zoomPan); }
	canvasControls = GraphEditor.attachPanAndSelect({ zoomPan: zoomPan, getGraph: function() { return g; }, allowPan: hasZoomControls });

	function deleteSelectedNodes() {
		if (!g.selectedNodes || !g.selectedNodes.length) { return; }
		g.saveFAState();
		var nodes = g.selectedNodes;
		canvasControls.clearSelection();
		for (var i = 0; i < nodes.length; i++) { executeDeleteNode(g, nodes[i]); }
	}

	// Keyboard shortcuts - same keys as the FA and PDA editors. (Escape inside
	// the transition boxes is handled by the boxes themselves.)
	GraphEditor.registerKeybindings([
		{ test: function(e) { return e.key === 'Escape'; }, action: cancel },
		{ test: function(e) { return (e.ctrlKey || e.metaKey) && !e.shiftKey && e.key.toLowerCase() === 'z'; },
			action: function() { GraphEditor.clickButtonUnlessDisabled('#undoButton'); } },
		{ test: function(e) { return (e.ctrlKey || e.metaKey) && (e.key.toLowerCase() === 'y' || (e.shiftKey && e.key.toLowerCase() === 'z')); },
			action: function() { GraphEditor.clickButtonUnlessDisabled('#redoButton'); } },
		{ test: function(e) { return !e.ctrlKey && !e.metaKey && e.key.toLowerCase() === 'a'; }, action: editMode },
		{ test: function(e) { return !e.ctrlKey && !e.metaKey && e.key.toLowerCase() === 's'; }, action: addNodesMode },
		{ test: function(e) { return !e.ctrlKey && !e.metaKey && e.key.toLowerCase() === 't'; }, action: addEdgesMode },
		{ test: function(e) { return !e.ctrlKey && !e.metaKey && e.key.toLowerCase() === 'd'; }, action: deleteMode },
		{ test: function(e) { return !e.ctrlKey && !e.metaKey && e.key.toLowerCase() === 'u'; },
			action: function() { GraphEditor.clickButtonUnlessDisabled('#undoButton'); } },
		{ test: function(e) { return (e.key === 'Delete' || e.key === 'Backspace') && g.selectedNodes && g.selectedNodes.length > 0; },
			action: deleteSelectedNodes }
	]);

}(jQuery));

