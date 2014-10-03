/*global alert: true, ODSA, graphUtils */
(function ($) {
  "use strict";
  
  var settings = new JSAV.utils.Settings($(".jsavsettings")),
  jsav = new JSAV($('.avcontainer'), {settings: settings}),
  exercise, graph, modelGraph, graphNodes = [], gnodes = [], mstnodes = [];
  var exerciseStep, step;
  //jsav.recorded();
  
  function init() {
    exerciseStep = 0;
    step = 0;
    var i;
    if (graph) {
      graph.clear();
    }
    graph = jsav.ds.graph({width: 400, height: 400, layout: "automatic", directed: false});
    graphUtils.generate(graph);
    graphNodes = graph.nodes();
    gnodes = [];
    graph.layout();
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
    modelGraph = modeljsav.ds.graph({width: 400, height: 400, layout: "automatic", directed: false});
    for (i = 0; i < graph.nodeCount(); i++) {
      modelGraph.addNode(graph.nodes()[i].value());
    }
    for (i = 0; i < graph.edges().length; i++) {
      modelGraph.addEdge(modelGraph.nodes()[graph.nodes().indexOf(graph.edges()[i].start())],
                         modelGraph.nodes()[graph.nodes().indexOf(graph.edges()[i].end())]);
    }
    gnodes = modelGraph.nodes();
    modelGraph.layout();
    modeljsav.displayInit();
    bfs(gnodes[0], modeljsav);
    modeljsav.umsg("Final BFS graph");
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
        av.umsg("Add edge (" + node.prev.value() + "," + node.value() + ") to the BFS graph");
        edge = node.edgeFrom(node.prev).css({"stroke-width": "4", "stroke": "red"});
        edge.added = true;
        av.step();
      }
      av.stepOption('grade', true);
    }
  }
  function bfs(start, av) {
    var adjacent = [];
    var visitedNeighbors = 0;
    var next;
    if (!start.hasClass("visited")) {
      markIt(start, av);  //Visit
    }
    adjacent = start.neighbors();
    //Sort the neighbors according to their value
    adjacent.sort(function (a, b) {
      return a.value().charCodeAt(0) - b.value().charCodeAt(0);
    });
    for (var i = 0; i < adjacent.length; i++) {
      if (adjacent[i].hasClass("visited")) {
        visitedNeighbors++;
      }
    }
    //Base Case
    if (visitedNeighbors === adjacent.length) {
      return;
    }
    else {
      for (next = adjacent.next(); next; next = adjacent.next()) {
        av.umsg("Process edge (" + start.value() + "," + next.value() + ")");
        if (next.hasClass("visited")) {
          av.umsg(" :Node " + next.value() + " already visited", {'preserve': true});
        }
        av.step();
        if (!next.hasClass("visited")) {
          next.prev = start;
          markIt(next, av);
        }
      }
      adjacent.reset();
      for (next = adjacent.next(); next; next = adjacent.next()) {
        bfs(next, av);
      }
      
    }
  }
  
  // Process About button: Pop up a message with an Alert
  function about() {
    alert("Heapsort Proficiency Exercise\nWritten by Ville Karavirta\nCreated as part of the OpenDSA hypertextbook project\nFor more information, see http://algoviz.org/OpenDSA\nSource and development history available at\nhttps://github.com/cashaffer/OpenDSA\nCompiled with JSAV library version " + JSAV.version());
  }
  
  exercise = jsav.exercise(model, init,
                           { compare:  { css: "background-color" },
                             controls: $('.jsavexercisecontrols'),
                             fix: fixState });
  exercise.reset();
  
  $(".jsavcontainer").on("click", ".jsavgraphnode", function () {
    var nodeIndex = $(this).parent(".jsavgraph").find(".jsavgraphnode").index(this);
    var node = graphNodes[nodeIndex];
    var prev;
    if (!node.hasClass('visited')) {
      markIt(node, null);
      exerciseStep++;
      if (gnodes.length) {
        prev = graphNodes[gnodes.indexOf(gnodes[nodeIndex].prev)];
        if (prev) {
          node.edgeFrom(prev).css({"stroke-width": "4", "stroke": "red"});
        }
      }
      exercise.gradeableStep();
    }
  });
  $("#about").click(about);

}(jQuery));
