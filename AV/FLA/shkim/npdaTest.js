(function ($) {
	var jsav = new JSAV("av"),
		selectedNode = null,
		g;				// the PDA
	/*
	Empty string can be set to anything when initializing the graph:
	e.g. initGraph({layout: "automatic", emptystring: epsilon});
	By default it is set to lambda.
	*/
	var lambda = String.fromCharCode(955),
		epsilon = String.fromCharCode(949),
		emptystring;
	// initialize PDA
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

	    g.addEdge(a, b, {weight: 'a:' + emptystring + ":a"});
	    //g.addEdge(a, d); 		it's a FA, need to always provide a weight

	    g.addEdge(b, b, {weight: 'a:a:aa'});
	    g.addEdge(b, c, {weight: 'b:a:' + emptystring});
	    g.addEdge(b, d, {weight: 'b:a:a'});

	    g.addEdge(c, c, {weight: 'b:a:' + emptystring});
	    g.addEdge(c, d, {weight: 'b:a:a'});
	    g.addEdge(c, f, {weight: emptystring + ':' + emptystring + ':' + emptystring});

	    g.addEdge(d, c, {weight: 'b:a:' + emptystring});
	    g.addEdge(d, e, {weight: 'b:a:a'});

	    g.addEdge(e, c, {weight: 'b:a:' + emptystring});
	
    	$(".jsavgraph").click(graphClickHandler);
    	g.click(nodeClickHandler);
		g.click(edgeClickHandler, {edge: true});
		$('.jsavedgelabel').click(labelClickHandler);
		return g;
    };

    // handler for editing transitions 
    // (outdated, should be changed to be more like multitapeTest.js or Martin's FA editor)
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
	// make edges easier to click/see
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
	// tests

	// toggles highlighting nondeterministic nodes
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
	// toggles highlighting lambda transitions
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
		$('#loadbutton').hide();
		$("#mode").html('');
		$('.jsavcontrols').show();
		g.initial.addClass('current');
		var currentStates = [new Configuration(g.initial, ['Z'], inputString, 0)];
		currentStates = addLambdaClosure(currentStates);
		var configView = "Configurations: ";
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
		   	configView = "Configurations: ";
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
	// Save/Load
	// save PDA as XML
	var serializePDAToXML = function (graph) {
		var text = '<?xml version="1.0" encoding="UTF-8"?>';
	    text = text + "<structure>";
	    text = text + "<type>pda</type>"
	    text = text + "<automaton>"
	    var nodes = graph.nodes();
	    for (var next = nodes.next(); next; next = nodes.next()) {
	    	var left = next.position().left;
		    var top = next.position().top;
		    var i = next.hasClass("start");
		    var f = next.hasClass("final");
		    var label = next.stateLabel();
		    text = text + '<state id="' + next.value().substring(1) + '" name="' + next.value() + '">';
		    text = text + '<x>' + left + '</x>';
		    text = text + '<y>' + top + '</y>';
		    if (label) {
		    	text = text + '<label>' + label + '</label>';
		    }
		    if (i) {
		    	text = text + '<initial/>';
		    }
		    if (f) {
		    	text = text + '<final/>';
		    }
	    	text = text + '</state>';
	    }
	    var edges = graph.edges();
	    for (var next = edges.next(); next; next = edges.next()) {
	    	var fromNode = next.start().value().substring(1);
	    	var toNode = next.end().value().substring(1);
	    	var w = next.weight().split('<br>');
	    	for (var i = 0; i < w.length; i++) {
	    		text = text + '<transition>';
	    		text = text + '<from>' + fromNode + '</from>';
	    		text = text + '<to>' + toNode + '</to>';
	    		var wSplit = w[i].split(":");
	    		if (wSplit[0] === emptystring) {
	    			text = text + '<read/>';
	    		} else {
	    			text = text + '<read>' + wSplit[0] + '</read>';
	    		}
	    		if (wSplit[1] === emptystring) {
	    			text = text + '<pop/>';
	    		} else {
	    			text = text + '<pop>' + wSplit[1] + '</pop>';
	    		}
	    		if (wSplit[2] === emptystring) {
	    			text = text + '<push/>';
	    		} else {
	    			text = text + '<push>' + wSplit[2] + '</push>';
	    		}
	    		text = text + '</transition>';
	    	}
	    }
	    text = text + "</automaton></structure>"
	    return text;
	};
	var save = function () {
		var downloadData = "text/xml;charset=utf-8," + encodeURIComponent(serializePDAToXML(g));
    	$('#download').html('<a href="data:' + downloadData + '" target="_blank" download="pda.xml">Download PDA</a>');
    	$('#download a')[0].click();
	};

	// load a PDA from a XML file
  	var parseFile = function (text) {
	    var parser,
	        xmlDoc;
	    if (window.DOMParser) {
	      	parser=new DOMParser();
	      	xmlDoc=parser.parseFromString(text,"text/xml");
	    } else {
	      	xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
	      	xmlDoc.async=false;
	      	xmlDoc.loadXML(text);
	    }
	    if (xmlDoc.getElementsByTagName("type")[0].childNodes[0].nodeValue !== 'pda') {
	      	alert('File does not contain a pushdown automaton.');
	      	// clear input
	      	var loaded = $('#loadbutton');
	      	loaded.wrap('<form>').closest('form').get(0).reset();
	      	loaded.unwrap();
	      	return;
	    } else {
	    	if (g) {
				g.clear();
				$('.jsavgraph').off();
			}
			g = new jsav.ds.fa({width: '90%', height: 440, layout: "manual"});
			var nodeMap = {};			// map node IDs to nodes
	      	var xmlStates = xmlDoc.getElementsByTagName("state");
	      	xmlStates = _.sortBy(xmlStates, function(x) {return x.id;})
	      	var xmlTrans = xmlDoc.getElementsByTagName("transition");
	      	for (var i = 0; i < xmlStates.length; i++) {
	        	var x = Number(xmlStates[i].getElementsByTagName("x")[0].childNodes[0].nodeValue);
	        	var y = Number(xmlStates[i].getElementsByTagName("y")[0].childNodes[0].nodeValue);
	        	var newNode = g.addNode({left: x, top: y});
	        	var isInitial = xmlStates[i].getElementsByTagName("initial")[0];
	        	var isFinal = xmlStates[i].getElementsByTagName("final")[0];
	        	var isLabel = xmlStates[i].getElementsByTagName("label")[0];
	        	if (isInitial) {
	        		g.makeInitial(newNode);
	        	}
	        	if (isFinal) {
	        		newNode.addClass('final');
	        	}
	        	if (isLabel) {
	        		newNode.stateLabel(isLabel.childNodes[0].nodeValue);
	        	}
	        	nodeMap[xmlStates[i].id] = newNode;
	      	}
	      	for (var i = 0; i < xmlTrans.length; i++) {
	      		var from = xmlTrans[i].getElementsByTagName("from")[0].childNodes[0].nodeValue;
	      		var to = xmlTrans[i].getElementsByTagName("to")[0].childNodes[0].nodeValue;
	      		var read = xmlTrans[i].getElementsByTagName("read")[0].childNodes[0];
	      		var pop = xmlTrans[i].getElementsByTagName("pop")[0].childNodes[0];
	      		var push = xmlTrans[i].getElementsByTagName("push")[0].childNodes[0];
	      		if (!read) {
	      			read = emptystring;
	      		} else {
	      			read = read.nodeValue;
	      		}
	      		if (!pop) {
	      			pop = emptystring;
	      		} else {
	      			pop = pop.nodeValue;
	      		}
	      		if (!push) {
	      			push = emptystring;
	      		} else {
	      			push = push.nodeValue;
	      		}
	      		g.addEdge(nodeMap[from], nodeMap[to], {weight: read + ":" + pop + ":" + push});
	      	}
	      	g.layout();
	      	updateAlphabet();
			$(".jsavgraph").click(graphClickHandler);
    		g.click(nodeClickHandler);
			g.click(edgeClickHandler, {edge: true});
			$('.jsavedgelabel').click(labelClickHandler);
			var loaded = $('#loadbutton');
	      	loaded.wrap('<form>').closest('form').get(0).reset();
	      	loaded.unwrap();
	      	return;
	    }
	};
  	var waitForReading = function (reader) {
    	reader.onloadend = function(event) {
        	var text = event.target.result;
        	parseFile(text);
    	}
  	};
  	var load = function () {
    	var loaded = document.getElementById('loadbutton');
    	var file = loaded.files[0],
        	reader = new FileReader();
    	waitForReading(reader);
    	reader.readAsText(file);
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
	$('#savebutton').click(save);
  	$('#loadbutton').on('change', load);
}(jQuery));	