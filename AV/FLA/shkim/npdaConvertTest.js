(function ($) {
	var jsav = new JSAV("av"),
		g;
	// Empty string can be set to anything when initializing the graph:
	// e.g. initGraph({layout: "automatic", emptystring: epsilon})
	// By default it is set to lambda.
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

	    g.addEdge(a, b, {weight: 'a:Z:aZ'});

	    g.addEdge(b, c, {weight: 'b:a:xb'});

	    g.addEdge(c, d, {weight: emptystring + ':x:' + emptystring});

	    //g.addEdge(b, d, {weight: 'b:a:b'});

	    g.addEdge(d, e, {weight: 'c:b:' + emptystring});

	    g.addEdge(e, f, {weight: 'd:Z:' + emptystring});
	
		return g;
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

	//======================
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
		// create the grammar productions
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
		// attempt to export
		localStorage['grammar'] = _.map(converted, function(x) {return x.join("")});
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
		// otherwise, open a new window with the temporary variables
		if (toExport) {
			localStorage['grammar'] = converted;
			window.open("grammarTest.html", "_self");
		} else {
			window.open('npdaTable.html', '', 'width = 600, height = 625, screenX = 500, screenY = 25')
		}
	};
	// checks the transitions of the PDA: 
	// All transitions must pop exactly one symbol and push exactly zero or two symbols
	// There must also be a single final state and at least one transition into the final 
	// state that pops Z off the stack
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
	$('#togrammarbutton').click(convertToGrammar);
}(jQuery));
