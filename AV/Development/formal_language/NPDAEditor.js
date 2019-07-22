var lambda = String.fromCharCode(955),
		epsilon = String.fromCharCode(949),
		arrow = String.fromCharCode(8594),
		emptystring,
		parenthesis = "(",
		variables = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

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
		}else if ($(".jsavgraph").hasClass("convert")) {
			this.highlight();
			convertTransition(this);
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
	//converting npda to grammar

	var increaseOne = [];
	var decreaseOne = [];
	var productions = [];
	var visitedEdges = [];
	var finalState;
	var table;
	var lastRow = 0;
	var count = 0;
	var start;
	var convertToGrammar = function() {
		var edges = g.edges();
		//check if the npda is in the right format - pop 1 and push 0 or 2 symbols; also separate transitions into town categories - size increases one or decreases one
		for (var next = edges.next(); next; next = edges.next()) {
			if(g.isFinal(next.end())){
				finalState = next.end();
				if(t[1] != 'Z' || t[2] === emptystring){	
					jsav.umsg("Transition to final state must only pop 'Z' ");
					break;
				}
			}
			var weights = toColonForm(next.weight()).split('<br>');
			for (var i = 0; i < weights.length; i++) {
				var t = weights[i].split(':');
				//if doesn't pop or pop more than one or push 1 symbol that's not lambda or push more than 2
				if(t[1] === emptystring || t[1].length > 1 || (t[2].length === 1 && t[2] != emptystring) || t[2].length > 2) {
					jsav.umsg("This NPDA is not in the correct format, transitions must pop 1 and push 0 or 2. Please correct it and try again");
					return;
				}else if (t[2].length === 2){
					increaseOne.push(weights[i]);
				}else{
					decreaseOne.push(weights[i]);
				}
			}
		}
		convertMode();
		$('#completeConvertButton').show();
		$('#completeConvertButton').click(completeConvert);
		jsav.umsg("Click on the transitions to convert transitions into equivalent productions");
		table = jsav.ds.matrix({rows: 100, columns: 3, style: "table"});
		for (var i = lastRow + 1; i < 100; i++) {
      		table._arrays[i].hide();
    	}
		table.layout();
		$(".jsavmatrix").css("margin-left", "auto");
	};

	function completeConvert () {
		var edges = g.edges();
		for (var next = edges.next(); next; next = edges.next()) {
			if(!visitedEdges.includes(next)){
				convertTransition(next);
			}
		}
	};

	//convert transition(s) to equivalent production(s)
	function convertTransition(edge) {
		if(!visitedEdges.includes(edge)){
			visitedEdges.push(edge);
		}else{
			alert('This transitition has already been converted');
			return;
		}
		var transitions = toColonForm(edge.label()).split('<br>');
		function setTableValue (a, b, c) {
			table.value(lastRow, 0, a);
			table.value(lastRow, 1, b);
			table.value(lastRow, 2, c);
			table._arrays[lastRow].show();
			lastRow++;
		}
		for(var i = 0; i < transitions.length; i++){
			var transition = transitions[i];
			var transitionSplit = transition.split(':');
			var fromNode = edge.start();
			var toNode = edge.end();
			var qi = fromNode.value();
			var qj = toNode.value();
			if(increaseOne.indexOf(transition) > -1) {
				var states = g.nodes();
				for (var k = 0; k < states.length; k++) {
					var qk = states[k].value();
					for (var l = 0; l < states.length; l++) {
						var ql = states[l].value();
						// format ['', '', ['','','']]
						productions.push(['(' + qi + transitionSplit[1] + qk + ')', arrow, [transitionSplit[0] , '(' + qj + transitionSplit[2][0] + ql + ')' , '(' + ql + transitionSplit[2][1] + qk + ')']]);
						setTableValue('(' + qi + transitionSplit[1] + qk + ')', arrow, transitionSplit[0] + '(' + qj + transitionSplit[2][0] + ql + ')' + '(' + ql + transitionSplit[2][1] + qk + ')');
					}
				}
			}else{
				productions.push(['(' + qi + transitionSplit[1] + qj + ')', arrow, [transitionSplit[0]]]);
				setTableValue('(' + qi + transitionSplit[1] + qj + ')', arrow, transitionSplit[0]);
			}
			table.layout();
		}
		count++;
		if(count >= g.edges().length){
			jsav.umsg('Finished');
			alert('All transitions have been converted, export to grammar editor?');
			productions = removeUseless(productions);

			var reducedTable = jsav.ds.matrix(productions, {style: "table"});
			reducedTable.layout();
			$(".jsavmatrix").css("margin-left", "auto");

			productions = transform(productions);
			localStorage['grammar'] = JSON.stringify(productions);
			window.open("./grammarEditor.html");
		}
	};

  // convert from (qiAqj) form to letter form
  function transform (productions) {
  	//map (qiAqj) form to a letter
  	var dict = {};
  	dict[start] = 'S';
  	var index = 0;
  	//assign letters
  	for (var i = 0; i < productions.length; i++) {
  		if(!(productions[i][0] in dict)){
  			dict[productions[i][0]] = variables[index];
  			index ++;
  		}
  	}
  	//create the new productions
  	var ret = [];
  	for (var i = 0; i < productions.length; i++) {
  		if(productions[i][2].length === 1){
  			ret.push([dict[productions[i][0]], arrow, productions[i][2][0]]);
  		}else{
  			ret.push([dict[productions[i][0]], arrow, productions[i][2][0] + dict[productions[i][2][1]] + dict[productions[i][2][2]]]);
  		}
  	}
  	return ret;
  };


  // remove useless productions
  function removeUseless (arr) {
    var derivers = {};  // variables that derive a string of terminals
    var productions = _.map(_.filter(arr, function(x) { return x[0];}), function(x) { return x.slice();});
    var counter = 0;
    while (findDerivable(derivers, productions)) {
      counter++;
      if (counter > 500) {
        console.log(counter);
        break;
      }
    };
    var transformed = [];
    // remove productions which do not derive a string of terminals
    for (var i = 0; i < productions.length; i ++) {
      if (_.every(productions[i][2], function(x) {return x in derivers || (variables.indexOf(x) === -1 && parenthesis.indexOf(x[0]) === -1);})) {
         transformed.push(productions[i]);
      }
    }
    var pDict = {};   // dictionary to hold reachable variables
    start = '(' + g.initial.value() + 'Z' + finalState.value() + ')';
    for (var i = 0; i < transformed.length; i++) {
      if (!(transformed[i][0] in pDict)) {
        pDict[transformed[i][0]] = [];
      }
      // map left hand side to the variables in the right hand side
      var r = _.uniq(_.filter(transformed[i][2], function(x) {return parenthesis.indexOf(x[0]) !== -1;}));
      pDict[transformed[i][0]] = _.union(pDict[transformed[i][0]], r);
    }
    var visited = {};
    visited[start] = true;
    // find reachable variables and map them in pDict
    findReachable(start, pDict, visited);
    // remove unreachable productions
    transformed = _.filter(transformed, function(x) { return x[0] === start || pDict[start].indexOf(x[0]) !== -1;});
    // var ret = _.map(transformed, function(x) {return x.join('');});
    return transformed;
  };

  // Function to get variables which can derive a string of terminals
  function findDerivable (set, productions) {
    for (var i = 0; i < productions.length; i++) {
      if (_.every(productions[i][2], function(x) { return x in set || (variables.indexOf(x) === -1 && parenthesis.indexOf(x[0]) === -1);})) {
        if (!(productions[i][0] in set)) {
          set[productions[i][0]] = true;
          return true;
        }
      }
    }
    return false;
  };
  // FADepthFirstSearch on the dictionary
  function findReachable (start, pDict, visited) {
    for (var i = 0; i < pDict[start].length; i++) {
      if (!(pDict[start][i] in visited)) {
        visited[pDict[start][i]] = true;
        findReachable(pDict[start][i], pDict, visited);
        pDict[start] = _.union(pDict[start], pDict[pDict[start][i]]);
      }
    }
  };


	//===============================
	//editing modes

	var convertMode = function() {
		cancel();
		var jg = $(".jsavgraph");
		jg.addClass("convert");
		$("#mode").html('Convert to grammar');
		addEdgeSelect();
		jsav.umsg("Click on the transitions to convert to grammar");
	};
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
		jg.removeClass("convert");
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
			$('.jsavedgelabel').click(labelClickHandler);
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
	$('#convertToGrammarButton').click(convertToGrammar);
	$('#completeConvertButton').hide();
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
