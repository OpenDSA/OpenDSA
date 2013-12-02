(function ($) {
  "use strict";
  /*global alert: true, ODSA, console */

  var nodes = [];
  var edgeStarts = [];
  var edgeEnds = [];
  var nNodes = 6;
  var nEdges = 10;
  var adjacencyMatrix = [,];
  var randomWeights = [];
  
  function generateNodeEdgeCounts() {
    //generate the number of nodes and edges
    var n;
    var e;
    while (true) {
      n = Math.floor((Math.random() * 10));
      if (n >= 5) {    //Number Of nodes should be at least 5
        nNodes = n;
        break;
      }
    }
    while (true) {
      e = Math.floor((Math.random() * 50));
      // Number of Edges should at least two more than the number of nodes and at most
      // the number of nodes pair combination
      if (e > nNodes + 2 && e < (nNodes * (nNodes - 1)) / 2) {
        nEdges = e;
        break;
      }
    }
  }

  function generateRandomWeights() {
    var count = 0;
    var weight;
    randomWeights = new Array(nEdges);
    while (true) {
      weight = Math.floor((Math.random() * 10));
      if (weight === 0) {
        continue;
      }
      else {
        randomWeights[count] = weight;
        count++;
      }
      if (count === nEdges) {
        break;
      }
    }
  }

  function isEligibleEdge(startIndex, endIndex) {
    if ((startIndex === endIndex) || (startIndex >= nNodes) || (endIndex >= nNodes)) {
      return false;
    }
    if ((adjacencyMatrix[startIndex][endIndex] === 1) ||
        (adjacencyMatrix[endIndex][startIndex] === 1)) {
      return false;
    }
    else {
      return true;
    }
  }

  function generateRandomPairs() {
    var count = 0;
    var index1;
    var index2;
    //Initialize the adjacency matrix
    for (var i = 0; i < nNodes; i++) {
      for (var j = 0; j < nNodes; j++) {
        adjacencyMatrix[i][j] = 0;
      }
    }
    while (true) {
      index1 = Math.floor((Math.random() * 10));
      index2 = Math.floor((Math.random() * 10));
      if (!isEligibleEdge(index1, index2)) {
        continue;
      }
      else {
        edgeStarts[count] = index1;
        edgeEnds[count] = index2;
        count++;
        if (count === nEdges) {
          break;
        }
      }
      adjacencyMatrix[index1][index2] = 1;
      adjacencyMatrix[index2][index1] = 1;
    }
  }

  function generate(g, weighted) {
    var i;
    //generateNodeEdgeCounts();
    nodes = new Array(nNodes);
    edgeStarts = new Array(nEdges);
    edgeEnds = new Array(nEdges);
    //Generate the nodes
    for (i = 0; i < nNodes; i++) {
      nodes[i] = String.fromCharCode(i + 65);
    }
    //Create the adjacencyMatrix
    adjacencyMatrix = new Array(nNodes);
    for (i = 0; i < nNodes; i++) {
      adjacencyMatrix[i] = new Array(nNodes);
    }
    generateRandomPairs();
    if (weighted) {
      generateRandomWeights();
    }
    for (i = 0; i < nNodes; i++) {
      g.addNode(nodes[i]);
    }
    for (i = 0; i < nEdges; i++) {
      console.log(edgeStarts[i] + "  " + edgeEnds[i]);
      if (weighted) {
        g.addEdge(g.nodes()[edgeStarts[i]], g.nodes()[edgeEnds[i]],
                  {"weight": parseInt(randomWeights[i])});
      }
      else {
        g.addEdge(g.nodes()[edgeStarts[i]], g.nodes()[edgeEnds[i]]);
      }
    }
  }

  $(document).ready(function () {
    var settings = new JSAV.utils.Settings($(".jsavsettings")),
    jsav = new JSAV($('.avcontainer'), {settings: settings}),
    exercise, graph, modelGraph, graphNodes = [], gnodes = [];
    var exerciseStep, step;
    jsav.recorded();
	
    function init() {
      exerciseStep = 0;
      step = 0;
      var i;
      if (graph) {
        graph.clear();
      }
      graph = jsav.ds.graph({width: 400, height: 400, layout: "automatic", directed: false});
      generate(graph, false);  //Randomly generate the graph without weights
      //initGraph("orig");
      graph.layout();
      graphNodes = graph.nodes();
      for (i = 0; i < graph.edges().length; i++) {
        console.log(graph.edges()[i].start().value() + "  " + graph.edges()[i].end().value());
      }
      jsav.displayInit();
      return graph;
    }

    function fixState(mGraph) {
      var i;
      var node;
      var prev;
      for (i = 0; i < gnodes.length; i++) {
        if (gnodes[i].addedStep === exerciseStep) {
          node = graphNodes[i];
          prev = graphNodes[gnodes.indexOf(gnodes[i].prev)];
        }
      }
      markIt(node, null);
      if (prev) {
        node.edgeFrom(prev).css({"stroke-width": "4", "stroke": "red"});
      }
    }

    function model(modeljsav) {
      var i;
      modelGraph = modeljsav.ds.graph({width: 400, height: 400,
                                       layout: "automatic", directed: false});
      for (i = 0; i < graph.nodeCount(); i++) {
        modelGraph.addNode(graph.nodes()[i].value());
      }
      for (i = 0; i < graph.edges().length; i++) {
        modelGraph.addEdge(modelGraph.nodes()[graph.nodes().indexOf(graph.edges()[i].start())],
                           modelGraph.nodes()[graph.nodes().indexOf(graph.edges()[i].end())]);
      }
      //initGraph("model");
      modelGraph.layout();
      modeljsav.displayInit();
      gnodes = modelGraph.nodes();
      dfs(gnodes[0], modeljsav);
      modeljsav.umsg("Final DFS graph");
      for (i = 0; i < modelGraph.edges().length; i++) {
        if (!modelGraph.edges()[i].added) {
          modelGraph.edges()[i].hide();
        }
      }
      modelGraph.layout();
      modeljsav.step();
      return modelGraph;
    }

    // Mark a node in the graph.
    function markIt(node, av) {
      var edge;
      step++;
      node.addedStep = step;
      node.addClass("visited");
      if (av) {
        av.umsg("Visit node " + node.value());
      }
      node.highlight();
      if (av) {
        av.step();
        if (node.prev) {
          av.umsg("Add edge (" + node.prev.value() + "," + node.value() +
                  ") to the DFS graph");
          edge = node.edgeFrom(node.prev).css({"stroke-width": "4", "stroke": "red"});
          edge.added = true;
          av.step();
        }
        av.stepOption('grade', true);
      }
    }

    function dfs(start, av) {
      var adjacent = [];
      var next;
      markIt(start, av);
      adjacent = start.neighbors();
      for (next = adjacent.next(); next; next = adjacent.next()) {
        av.umsg("Process edge (" + start.value() + "," + next.value() + ")");
        if (next.hasClass("visited")) {
          av.umsg(" :Node " + next.value() + " already visited", {'preserve': true});
        }
        av.step();
        if (!next.hasClass("visited")) {
          next.prev = start;
          dfs(next, av);
        }
      }
    }

    function initGraph(type) {
      var a, b, c, d, e, f;
      //Nodes of the original graph
      if (type === "orig") {
        a = graph.addNode("A", {"left": 25, "top": 50});
        b = graph.addNode("B", {"left": 325, "top": 50});
        c = graph.addNode("C", {"left": 145, "top": 75});
        d = graph.addNode("D", {"left": 145, "top": 200});
        e = graph.addNode("E", {"left": 0, "top": 300});
        f = graph.addNode("F", {"left": 325, "top": 250});
        //Original graph edges
        graph.addEdge(a, c);
        graph.addEdge(a, e);
        graph.addEdge(c, b);
        graph.addEdge(c, d);
        graph.addEdge(c, e);
        graph.addEdge(c, f);
        graph.addEdge(f, b);
        graph.addEdge(d, f);
        graph.addEdge(e, f);
        graphNodes = graph.nodes();
      }
      else {
        //Nodes of the model Graph
        a = modelGraph.addNode("A", {"left": 25, "top": 50});
        b = modelGraph.addNode("B", {"left": 325, "top": 50});
        c = modelGraph.addNode("C", {"left": 145, "top": 75});
        d = modelGraph.addNode("D", {"left": 145, "top": 200});
        e = modelGraph.addNode("E", {"left": 0, "top": 300});
        f = modelGraph.addNode("F", {"left": 325, "top": 250});
        //Model graph edges
        modelGraph.addEdge(a, c);
        modelGraph.addEdge(a, e);
        modelGraph.addEdge(c, b);
        modelGraph.addEdge(c, d);
        modelGraph.addEdge(c, e);
        modelGraph.addEdge(c, f);
        modelGraph.addEdge(f, b);
        modelGraph.addEdge(d, f);
        modelGraph.addEdge(e, f);
        gnodes = modelGraph.nodes();
      }
    }

    // Process About button: Pop up a message with an Alert
    function about() {
      alert("Heapsort Proficiency Exercise\nWritten by Ville Karavirta\nCreated as part of the OpenDSA hypertextbook project\nFor more information, see http://algoviz.org/OpenDSA\nSource and development history available at\nhttps://github.com/cashaffer/OpenDSA\nCompiled with JSAV library version " + JSAV.version());
    }
	
    exercise = jsav.exercise(model, init, { css: "background-color" },
    {controls: $('.jsavexercisecontrols'), fix: fixState });
    exercise.reset();
	
    $(".jsavcontainer").on("click", ".jsavgraphnode", function () {
      var nodeIndex = $(this).parent(".jsavgraph").find(".jsavgraphnode").index(this);
      var node = graphNodes[nodeIndex];
      var prev;
      if (!node.hasClass('visited')) {
        markIt(node, null);
        exerciseStep++;
        prev = graphNodes[gnodes.indexOf(gnodes[nodeIndex].prev)];
        if (prev) {
          node.edgeFrom(prev).css({"stroke-width": "4", "stroke": "red"});
        }
        exercise.gradeableStep();
      }
    });
    $("#about").click(about);
  });
}(jQuery));
