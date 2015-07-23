(function ($) {
	var jsav = new JSAV("av"),
		m,
		g;
	
	var lambda = String.fromCharCode(955),
		epsilon = String.fromCharCode(949),
		emptystring;

	// initialize PDA
	var initGraph = function(opts) {
		g = jsav.ds.fa($.extend({width: '45%', height: 440, element: $('#reference')}, opts));
		emptystring = g.emptystring;
		var gWidth = g.element.width(),
			gHeight = g.element.height();
  		// var a = g.addNode({left: 0.10 * gWidth, top: 0.3 * gHeight}),		
    //   		b = g.addNode({left: 0.35 * gWidth, top: 0.3 * gHeight}),
    //   		c = g.addNode({left: 0.60 * gWidth, top: 0.3 * gHeight}),
    //   		d = g.addNode({left: 0.25 * gWidth, top: 0.7 * gHeight}),
    //   		e = g.addNode({left: 0.50 * gWidth, top: 0.7 * gHeight}),
    //   		f = g.addNode({left: 0.85 * gWidth, top: 0.3 * gHeight});
    //   	g.makeInitial(a);
    //   	f.addClass('final');

	   //  g.addEdge(a, b, {weight: 'a:Z:aZ'});

	   //  g.addEdge(b, c, {weight: 'b:a:xb'});

	   //  g.addEdge(c, d, {weight: emptystring + ':x:' + emptystring});

	   //  //g.addEdge(b, d, {weight: 'b:a:b'});

	   //  g.addEdge(d, e, {weight: 'c:b:' + emptystring});

	   //  g.addEdge(e, f, {weight: 'd:Z:' + emptystring});
		
		var a = g.addNode({left: 0.10 * gWidth, top: 0.3 * gHeight}),
      		b = g.addNode({left: 0.60 * gWidth, top: 0.3 * gHeight}),
      		c = g.addNode({left: 0.25 * gWidth, top: 0.7 * gHeight}),
      		d = g.addNode({left: 0.85 * gWidth, top: 0.7 * gHeight});
      	g.makeInitial(a);
      	d.addClass('final');

	    g.addEdge(a, b, {weight: 'a:Z:aZ'});

	    g.addEdge(b, c, {weight: 'b:a:'+emptystring});

	    g.addEdge(c, d, {weight: 'd:Z:' + emptystring});
	
		return g;
    };
	var updateAlphabet = function() {
		g.updateAlphabet();
		$("#alphabet").html("" + Object.keys(g.alphabet).sort());
		var sa = g.getStackAlphabet();
		$('#stackalphabet').html("Z," + _.without(sa.sort(), 'Z'));
	};

	var g = initGraph({layout: "manual"});
	g.layout();
	jsav.displayInit();
	updateAlphabet();

	//=================================
	// convert to CFG
	var convertToGrammar = function () {
		// start variable is 'S'
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

		// create the grammar productions automatically

		// for (var next = edges.next(); next; next = edges.next()) {
		// 	var weight = next.weight().split("<br>");
		// 	for (var i = 0; i < weight.length; i++) {
		// 		var weight2 = weight[i].split(':');
		// 		if (weight2[2] === emptystring) {
		// 			converted.push([next.start().value() + weight2[1] + next.end().value(), arrow, weight2[0]]);
		// 		} else {
		// 			nodes = g.nodes();
		// 			for (var next2 = nodes.next(); next2; next2 = nodes.next()) {
		// 				var nodes2 = g.nodes();
		// 				for (var next3 = nodes2.next(); next3; next3 = nodes2.next()) {
		// 					var var1 = next.start().value() + weight2[1] + next2.value(),
		// 						var2 = next.end().value() + weight2[2][0] + next3.value(),
		// 						var3 = next3.value() + weight2[2][1] + next2.value();
		// 					converted.push([var1, arrow, weight2[0] + " " + var2 + " " + var3]);
		// 					if (newVariables.indexOf(var1) === -1) {
		// 						newVariables.push(var1);
		// 					} if (newVariables.indexOf(var2) === -1) {
		// 						newVariables.push(var2);
		// 					} if (newVariables.indexOf(var3) === -1) {
		// 						newVariables.push(var3);
		// 					}
		// 				}
		// 			}
		// 		}
		// 	}
		// }

		// attempts export
		var exportConverted = function () {
			// attempt to export
			var toExport = true;
			// attempt to convert temporary variables into grammar variables
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
			// if the resulting grammar is small enough, open it in a new tab
			if (toExport) {
				localStorage['grammar'] = converted;
				window.open("grammarTest.html", "_self");
			}
		};

		// create the grammar productions interactively

		// checks if grammar is complete
		var checkConversion = function () {
			var edges = g.edges();
			for (var next = edges.next(); next; next = edges.next()) {
				if (!next.hasClass('convertadded')) {
					return false;
				}
			}
			return true;
		}
		// handler for edges during conversion
		var convertEdgeHandler = function () {
			if (this.hasClass('convertadded')) {
				return;
			}
			var weight = this.weight().split("<br>");
			this.addClass('convertadded');
			for (var i = 0; i < weight.length; i++) {
				var weight2 = weight[i].split(':');
				if (weight2[2] === emptystring) {
					converted.push([this.start().value() + weight2[1] + this.end().value(), arrow, weight2[0]]);
				} else {
					nodes = g.nodes();
					for (var next2 = nodes.next(); next2; next2 = nodes.next()) {
						var nodes2 = g.nodes();
						for (var next3 = nodes2.next(); next3; next3 = nodes2.next()) {
							var var1 = this.start().value() + weight2[1] + next2.value(),
								var2 = this.end().value() + weight2[2][0] + next3.value(),
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
			if (m) { m.clear();}
			m = new jsav.ds.matrix(converted, {container: $('#editable')});
			if (checkConversion()) {
				var confirmed = confirm("Grammar completed! Export?\nExporting will replace the temporary variables.");
				if (confirmed) {
					exportConverted();
				}
			}
		};
		//m = new jsav.ds.matrix(converted, {container: $('#editable')});
		m = new jsav.ds.matrix([["","",""]], {container: $('#editable')});
		jsav.umsg('Click transitions to add productions.');
		g.click(convertEdgeHandler, {edge: true});
	};
	/*
	Function to check the transitions of the PDA for proper format: 
	All transitions must pop exactly one symbol and push exactly zero or two symbols.
	There must also be a single final state and at least one transition into the final 
	state that pops Z off the stack.
	*/
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
				$('#reference').empty();
			}
			g = new jsav.ds.fa({width: '45%', height: 440, layout: "manual", element: $('#reference')});
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

	$('#togrammarbutton').click(convertToGrammar);
	$('#loadbutton').on('change', load);
}(jQuery));
