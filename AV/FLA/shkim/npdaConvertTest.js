(function ($) {
	var jsav = new JSAV("av"),
		saved = false,
		selectedNode = null,
		arr,
		g,
		m;
	//Empty string can be set to anything when initializing the graph:
	//e.g. initGraph({layout: "automatic", emptystring: epsilon})
	//By default it is set to lambda.
	var lambda = String.fromCharCode(955),
		epsilon = String.fromCharCode(949),
		emptystring;
	
	var initGraph = function(opts) {
		g = jsav.ds.fa($.extend({width: '90%', height: 440}, opts));
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

	    g.addEdge(a, b, {weight: 'a:Z:aZ'});

	    g.addEdge(b, c, {weight: 'b:a:xb'});

	    g.addEdge(c, d, {weight: emptystring + ':x:' + emptystring});

	    //g.addEdge(b, d, {weight: 'b:a:b'});

	    g.addEdge(d, e, {weight: 'c:b:' + emptystring});

	    g.addEdge(e, f, {weight: 'd:Z:' + emptystring});
	
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
				jsav.umsg("Select a node to make an edge to");
   			} else {
   				var input2 = prompt("Accepted character?");
   				var input3 = prompt('Stack symbol(s) to pop?');
   				var input4 = prompt('Stack symbol(s) to push?');
   				var newEdge;
   				if (!input2) {
   					input2 = emptystring;
   				}
   				if (!input3) {
   					input3 = emptystring;
   				}
   				if (!input4) {
   					input4 = emptystring;
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
	
	//localStorage.clear();
    var g = initGraph({layout: "manual"});
	g.layout();
	jsav.displayInit();

	//===============================
	var updateAlphabet = function() {
		g.updateAlphabet();
		$("#alphabet").html("" + Object.keys(g.alphabet).sort());
		var sa = g.getStackAlphabet();
		$('#stackalphabet').html("Z," + _.without(sa.sort(), 'Z'));
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
	//tests

	var testND = function() {
		$('#changeButton').toggleClass("highlightingND");
		if ($('#changeButton').hasClass("highlightingND") || $('#changeButton').hasClass("highlightingL")) {
			$('#changeButton').hide();
		} else{
			$('#changeButton').show();
		}
		var nodes = g.nodes();
		for(var next = nodes.next(); next; next = nodes.next()) {
			var edges = next.getOutgoing();
			if (edges.length === 0) {continue;}
			var weights = _.map(edges, function(e) {return e.weight().split('<br>')});
			for (var i = 0; i < weights.length; i++) {
				var findLambda = _.find(weights[i], function(e) {return e.split(':')[0] === emptystring});
				if (findLambda) { break; }
			}
			var dup = _.map(_.flatten(weights), function(e) {return _.initial(e.split(':')).join()})
			if (findLambda || _.uniq(dup).length < dup.length) {
				next.toggleClass('testingND');
			}
		}
	};
	var testLambda = function() {
		$('#changeButton').toggleClass("highlightingL");
		if ($('#changeButton').hasClass("highlightingND") || $('#changeButton').hasClass("highlightingL")) {
			$('#changeButton').hide();
		} else{
			$('#changeButton').show();
		}
		var edges = g.edges();
		for (var next = edges.next(); next; next = edges.next()) {
			var wSplit = next.weight().split('<br>');
			for (var i = 0; i < wSplit.length; i++) {
				if (_.every(wSplit[i].split(':'), function(x) {return x === emptystring})) {
					next.g.element.toggleClass('testingLambda');
					break;
				}
			}
		}
	};


	//====================
	//traversal

	var play = function() {
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
		$("button").hide();			//disable buttons
		$("#mode").html('');
		$('.jsavcontrols').show();
		g.initial.addClass('current');
		var currentStates = [new Configuration(g.initial, ['Z'], inputString, 0)];
		currentStates = addLambdaClosure(currentStates);
		var configView = "";
	   	for (var j = 0; j < currentStates.length; j++) {
	   		configView += currentStates[j].toString() + ' | ';
	   	}
	    jsav.umsg(configView);
		var cur;
		
		jsav.displayInit();
		var counter = 0;
		var stringAccepted = false;
		while (true) {
			jsav.step();
			counter++;
			if (counter > 500) {
				break;
			}
			for (var j = 0; j < currentStates.length; j++) {
		   		currentStates[j].state.removeClass('current');
		   		currentStates[j].state.removeClass('accepted');
		   		currentStates[j].state.removeClass('rejected');
		   	}
		   	cur = traverse(currentStates, inputString[i]);
		   	if (cur.length === 0) {
		   		break;
		   	}
			currentStates = cur;
		   	configView = "";
		   	for (var j = 0; j < currentStates.length; j++) {
		   		if (currentStates[j].curIndex === inputString.length) {
					if (currentStates[j].state.hasClass('final')) {
						currentStates[j].state.addClass('accepted');
						stringAccepted = true;
					} else {
						currentStates[j].state.addClass('rejected');
					}
				}
		   		configView += cur[j].toString() + ' | ';
		   	}
		    jsav.umsg(configView);
		}

		if (stringAccepted) {
			jsav.umsg("Accepted");
		} else {
			jsav.umsg("Rejected");
		}
		jsav.recorded();
	};

	var traverse = function(currentStates) {
		// currentStates is an array of configurations
		var nextStates = [];
		for (var i = 0; i < currentStates.length; i++) {
			var successors = currentStates[i].state.neighbors(),
				curStack = currentStates[i].stack,
				curIndex = currentStates[i].curIndex,
				s = currentStates[i].inputString,
				letter = s[curIndex];
			for (var next = successors.next(); next; next = successors.next()) {
				var w = g.getEdge(currentStates[i].state, next).weight().split('<br>');
				for (var j = 0; j < w.length; j++) {
					var nextIndex = curIndex + 1;
					var t = w[j].split(':');
			        if (t[0] !== letter && t[0] !== emptystring) {continue;}
			        if (t[0] === emptystring) {nextIndex = curIndex;}
			        if (t[1] !== emptystring) {
			          var l = [],
			              cur;
			          for (var k = 0; k < t[1].length; k++) {
			            cur = curStack.pop();
			            if (cur) {
			              l.push(cur);
			            } else {
			              break;
			            }
			          }
			          if (t[1] === l.join('')) {
			          	var nextConfig = new Configuration(next, curStack, s, nextIndex);
			          	if (t[2] !== emptystring){
			              for (var h = t[2].length - 1; h >= 0; h--) {
			                nextConfig.stack.push(t[2].charAt(h));
			              }
			            }
			            next.addClass('current');
						nextStates.push(nextConfig);
			          } 
			          l.reverse();
			          curStack = curStack.concat(l);
			        } else {
			          	var nextConfig = new Configuration(next, curStack, s, nextIndex);
			          	if (t[2] !== emptystring){
			              for (var h = t[2].length - 1; h >= 0; h--) {
			                nextConfig.stack.push(t[2].charAt(h));
			              }
			            }
			            next.addClass('current');
						nextStates.push(nextConfig);
			           	break;
			        }
				}
			}
		}
		nextStates = _.uniq(nextStates, function(x) {return x.toString();});
		nextStates = addLambdaClosure(nextStates);
		return nextStates;
	};

	var addLambdaClosure = function(nextStates) {
		lambdaStates = [];
		for (var i = 0; i < nextStates.length; i++) {
			var successors = nextStates[i].state.neighbors();
			for (var next = successors.next(); next; next = successors.next()) {
				var weight = g.getEdge(nextStates[i].state, next).weight().split('<br>');
				for (var j = 0; j < weight.length; j++) {
					if (!next.hasClass('current') && _.every(weight[j].split(':'), function(x) {return x === emptystring})) {
   						next.addClass('current');
   						var nextConfig = new Configuration(next, nextStates[i].stack, nextStates[i].inputString, nextStates[i].curIndex)
						lambdaStates.push(nextConfig);
   					}
				}
			}
		}
		if(lambdaStates.length > 0) {
			lambdaStates = addLambdaClosure(lambdaStates);
		}
		for (var k = 0; k < lambdaStates.length; k++) {
			nextStates.push(lambdaStates[k]);
		}
		nextStates = _.uniq(nextStates, function(x) {return x.toString();});
		return nextStates;
	};

	// Configuration object
	var Configuration = function(state, stack, str, index) {
		this.state = state;
		this.inputString = str;
		this.curIndex = index;
		this.stack = stack.slice(0);
		this.toString = function() {
			return this.state.value() + ' ' + this.inputString.substring(0, this.curIndex) + ' ' + this.stack.join();
		}
	};

	//======================
	// convert to CFG

	var convertToGrammar = function () {
		var variables = "SABCDEFGHIJKLMNOPQRTUVWXYZ";
		var s = g.initial;
		var newVariables = [];
		var nodes = g.nodes();
		var edges = g.edges();
		var arrow = String.fromCharCode(8594);
		var converted = [];
		var finalState;
		var allTransitions = checkFormat();
		if (!allTransitions) {
			alert('The NPDA is not in the correct format!');
			return;
		}
		for (var next = nodes.next(); next; next = nodes.next()) {
			if (next.hasClass('final')) {
				finalState = next;
			}
		}
		newVariables.push(s.value() + 'Z' + finalState.value());
		//console.log(newVariables[0]);
		for (var next = edges.next(); next; next = edges.next()) {
			var weight = next.weight().split("<br>");
			for (var i = 0; i < weight.length; i++) {
				var weight2 = weight[i].split(':');
				if (weight2[2] === emptystring) {
					converted.push([next.start().value() + weight2[1] + next.end().value(), arrow, weight2[0]]);
				} else {
					nodes = g.nodes();
					for (var next2 = nodes.next(); next2; next2 = nodes.next()) {
						var nodes2 = g.nodes();
						for (var next3 = nodes2.next(); next3; next3 = nodes2.next()) {
							var var1 = next.start().value() + weight2[1] + next2.value(),
								var2 = next.end().value() + weight2[2][0] + next3.value(),
								var3 = next3.value() + weight2[2][1] + next2.value();
							converted.push([var1, arrow, weight2[0] + " " + var2 + " " + var3]);
							if (newVariables.indexOf(var1) === -1) {
								newVariables.push(var1);
							} if (newVariables.indexOf(var2) === -1) {
								newVariables.push(var2);
							} if (newVariables.indexOf(var3) === -1) {
								newVariables.push(var3);
							}
						}
					}
				}
			}
		}
		// for (var i = 0; i < converted.length; i++) {
		// 	console.log(""+converted[i]);
		// }
		// console.log(converted.length);
		// if (m) { m.clear();}
		// m = jsav.ds.matrix(converted, {style: "table"});
		localStorage['grammar'] = _.map(converted, function(x) {return x.join("")});
		var toExport = true;
		for (var i = 0; i < converted.length; i++) {
			var left = converted[i][0];
			var right = converted[i][2].split(' ');
			if (right.length > 1) {
				var i1 = newVariables.indexOf(left),
					i2 = newVariables.indexOf(right[1]),
					i3 = newVariables.indexOf(right[2]);
				if (i1 > 25 || i2 > 25 || i3 > 25) {
					alert('Too large to export!');
					toExport = false;
					break;
					// i1 = i1 % 26;
					// i2 = i2 % 26; 
					// i3 = i3 % 26;
				}
				left = variables[i1];
				var r1 = variables[i2];
				var r2 = variables[i3];
				if (!r1) {console.log(right[1])}
				converted[i] = left + arrow + right[0] + r1 + r2;
			} else {
				var i1 = newVariables.indexOf(left);
				if (i1 > 25) {
					alert('Too large to export!');
					toExport = false;
					break;
				}
				converted[i] = variables[i1] + arrow + right[0];
			} 
			
		}
		var sorting = _.partition(converted, function(x) {return x[0] === 'S'});
		converted = sorting[0].concat(sorting[1].sort());
		// for (var i = 0; i < converted.length; i++) {
		// 	console.log(""+converted[i]);
		// }
		if (toExport) {
			localStorage['grammar'] = converted;
			window.open("grammarTest.html", "_self");
		} else {
			window.open('npdaTable.html', '', 'width = 600, height = 625, screenX = 500, screenY = 25')
		}
	};

	var checkFormat = function () {
		var transitions = [];
		var popZ = false;
		var fCounter = 0;
		var edges = g.edges();
		for (var next = edges.next(); next; next = edges.next()) {
			transitions = transitions.concat(next.weight().split('<br>'));
			if (next.end().hasClass('final')) {
				var w = next.weight().split('<br>');
				for (var i = 0; i < w.length; i++) {
					var w2 = w[i].split(':');
					if (w2[1] === 'Z') {
						popZ = true;
					}
				}
			}
		}
		for (var i = 0; i < transitions.length; i++) {
			var t = transitions[i].split(':');
			if (t[1].length !== 1 || t[1] === emptystring) {
				return false;
			}
			if (t[2].length !== 2 && t[2] !== emptystring) {
				return false;
			} 
		}
		var nodes = g.nodes();
		for (var next = nodes.next(); next; next = nodes.next()) {
			if (next.hasClass('final')) {
				fCounter++;
			}
		}
		if (fCounter !== 1 || !popZ) { return false;}
		return transitions;
	};

	//======================
	$('#playbutton').click(play);
	$('#layoutbutton').click(function() {g.layout()});
	$('#testNDbutton').click(testND);
	$('#testlambdabutton').click(testLambda);
	$('#addnodesbutton').click(addNodesMode);
	$('#changeButton').click(changeEditingMode);
	$('#addedgesbutton').click(addEdgesMode);
	$('#movenodesbutton').click(moveNodesMode);
	$('#editnodesbutton').click(editNodesMode);
	$('#togrammarbutton').click(convertToGrammar);
}(jQuery));	