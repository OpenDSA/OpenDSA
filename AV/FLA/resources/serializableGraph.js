// Function to create a JSON node object to serialize.
function Node (l, t, i, f, label, moutput) {
  this.left = l;
  this.top = t;
  this.i = i;
  this.f = f;
  this.stateLabel = label;
  this.mooreOutput = moutput;
}
// Function to create a JSON edge object to serialize.
function Edge (s, e, w) {
  this.start = s;
  this.end = e;
  this.weight = w;
}
// Function to create a JSON graph object to serialize.
function Graph (ns, es, sh) {
  this.nodes = ns;
  this.edges = es;
  this.shorthand = sh;
}
// Function to serialize a JSAV graph to JSON. Regularly used by all three automaton editors.
// Mainly called by Undo / Redo functions to preserve the original state of the graph as changes are made.
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
// Takes an edge weight and changes every instance of lambda and epsilon to "&lambda;" and "&epsilon;" respectively.
// This is necessary because the HTML and JS representations of lambda and epsilon are different. JSON uses HTML.
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
// Take a node output character and changes any instance of an empty string to its respective HTML representation.
// Only used by Moore Machines.
function lambdafyMoore(mooreOutput) {
  if (mooreOutput == String.fromCharCode(955)) {
    mooreOutput = "&lambda;";
  }
  else if (mooreOutput == String.fromCharCode(949)) {
    mooreOutput = "&epsilon;";
  }
  return mooreOutput;
}
// Reverses the effect of lambdafy, changing every instance of "&lambda;" and "&epsilon;" on an edge weight to JavaScript notation.
// Used when loading a serialized graph and initializing a JSAV graph in the view from it.
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
// Reverses the effect of lambdafyMoore, changing any instance of "&lambda;" or "&epsilon" in a node output to JavaScript notation.
// Used by Moore Machines when loading a serialized graph and initializing a JSAV graph in the view from it.
function delambdafyMoore(outputChar) {
  if (outputChar == "&lambda;") {
    outputChar = String.fromCharCode(955);
  }
  else if (outputChar == "&epsilon;") {
    outputChar = String.fromCharCode(949);
  }
  return outputChar;
};