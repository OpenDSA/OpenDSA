(function ($) {
  "use strict";
  /*global alert: true, ODSA */
  $(document).ready(function () {
    var settings = new JSAV.utils.Settings($(".jsavsettings")),
    jsav = new JSAV($('.avcontainer'), {settings: settings}),
    exercise, graph, modelGraph,
    edgeCount = 9, graphNodes = [], gnodes = [], mstnodes = [];
    var exerciseStep, step;
    jsav.recorded();
	
    function init() {
      exerciseStep = 0;
	  step = 0;
      var i;
      if (graph) {
        graph.clear();
      }
      graph = jsav.ds.graph({width: 600, height: 600, layout: "manual", directed: true});
      initGraph("orig");
      graph.layout();
      jsav.displayInit();
      return graph;
    }
    function fixState(mGraph) {
	  var i;
      var node;
	  var prev;
	  for (i = 0; i <gnodes.length; i++) {
	    if(gnodes[i].addedStep === exerciseStep) {
		  node = graphNodes[i];
		  prev = graphNodes[gnodes.indexOf(gnodes[i].prev)];
		}
	  }
	  markIt(node, null);
	  if (prev) {
		  node.edgeFrom(prev).css({"stroke-width":"4", "stroke":"red"});
	  }
    }
    function model(modeljsav) {
      var i;
      modelGraph = modeljsav.ds.graph({width: 600, height: 600, layout: "manual", directed: true});
      initGraph("model");
      modelGraph.layout();
	  modeljsav.displayInit();
	  dfs(gnodes[0], modeljsav);
	  modeljsav.umsg("Final DFS graph");
	  for (i = 0; i < edgeCount; i++) {
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
	  if (av)
        av.umsg("Visit node " + node.value());
      node.highlight();
	  if (av) {
        av.step();
		if(node.prev) {
	      av.umsg("Add edge ("+node.prev.value()+","+node.value()+") to the DFS graph");
	      edge = node.edgeFrom(node.prev).css({"stroke-width":"4", "stroke":"red"});
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
        if(next.hasClass("visited")) {
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
		  node.edgeFrom(prev).css({"stroke-width":"4", "stroke":"red"});
		}
		exercise.gradeableStep();
      }
    });
    $("#about").click(about);
  });
}(jQuery));
