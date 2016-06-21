var lambda = String.fromCharCode(955);
function Node (l, t, i, f, label, moutput) {
	this.left = l;
	this.top = t;
	this.i = i;
	this.f = f;
	this.stateLabel = label;
	this.mooreOutput = moutput;
}
function Edge (s, e, w) {
	this.start = s;
	this.end = e;
	this.weight = w;
}
function Graph (ns, es, sh) {
	this.nodes = ns;
	this.edges = es;
	this.shorthand = sh;
}
function serialize(g) {
	var nodes = [];
	var edges = [];
	var shorthand = g.shorthand;
	var gNodes = g.nodes();
	var ind = 0;
	for (var next = gNodes.next(); next; next = gNodes.next()) {
		var left = next.position().left;
		var top = next.position().top;
		var i = next.hasClass("start");
		var f = next.hasClass("final");
		var label = next.stateLabel();
		var moutput = lambdafyMoore(next.mooreOutput());
		var node = new Node(left, top, i, f, label, moutput);
		nodes[ind] = node;
		ind++;
	}
	for (var i = 0; i < g.edges().length; i++) {
		var start = g.nodes().indexOf(g.edges()[i].start());
		var end = g.nodes().indexOf(g.edges()[i].end());
		var weight = g.edges()[i].weight();
		weight = lambdafy(weight);
		var edge = new Edge(start, end, weight);
		edges[i] = edge;
	}
	var gg = new Graph(nodes, edges, shorthand);
	jsonGraph = JSON.stringify(gg);
	return jsonGraph
}
function lambdafy(weight) {
	var weights = weight.split("<br>");
	for (var i = 0; i < weights.length; i++) {
		var symbols = weights[i].split(":");
		for (var j = 0; j < symbols.length; j++) {
			if (symbols[j] == String.fromCharCode(955)) {
				symbols[j] = "&lambda;";
			}
			else if (symbols[j] == String.fromCharCode(949)) {
				symbols[j] = "&epsilon;";
			}
		}
		weights[i] = symbols.join(":");
	}
	return weights.join("<br>");
}
function lambdafyMoore(mooreOutput) {
	if (mooreOutput == String.fromCharCode(955)) {
		mooreOutput = "&lambda;";
	}
	else if (mooreOutput == String.fromCharCode(949)) {
		mooreOutput = "&epsilon;";
	}
	return mooreOutput;
}
function delambdafy(weight) {
	var weights = weight.split("<br>");
	for (var i = 0; i < weights.length; i++) {
		var symbols = weights[i].split(":");
		for (var j = 0; j < symbols.length; j++) {
			if (symbols[j] == "&lambda;") {
				symbols[j] = String.fromCharCode(955);
			}
			else if (symbols[j] == "&epsilon;") {
				symbols[j] = String.fromCharCode(949);
			}
		}
		weights[i] = symbols.join(":");
	}
	return weights.join("<br>");
};
function delambdafyMoore(outputChar) {
	if (outputChar == "&lambda;") {
		outputChar = String.fromCharCode(955);
	}
	else if (outputChar == "&epsilon;") {
		outputChar = String.fromCharCode(949);
	}
	return outputChar;
};

// function to serialize the current graph to xml format.
function serializeGraphToXML (graph) {
	var text = '<?xml version="1.0" encoding="utf-8"?>';
	text = text + "<structure>";
	text = text + "<type>fa</type>"
		text = text + "<automaton>"
		var nodes = graph.nodes();
	// iterate over the nodes and add them all to the serialization.
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
	// now iterate over the edges and do the same with them.
	for (var next = edges.next(); next; next = edges.next()) {
		var fromnode = next.start().value().substring(1);
		var tonode = next.end().value().substring(1);
		var w = next.weight().split('<br>');
		for (var i = 0; i < w.length; i++) {
			text = text + '<transition>';
			text = text + '<from>' + fromnode + '</from>';
			text = text + '<to>' + tonode + '</to>';
			if (w[i] === lambda) {
				text = text + '<read/>';
			}
			else {
				text = text + '<read>' + w[i] + '</read>';
			}
			text = text + '</transition>';
		}
	}
	text = text + "</automaton></structure>"
		// this xml format mimics that used by jflap 7, and is thus compatible with the software.
		return text;
};
