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
      av.umsg(" Enqueue and visit node " + node.value(), {preserve: true});
    }
    node.highlight();
    if (av) {
      if (node.prev) {
        av.step();
        av.umsg("Add edge (" + node.prev.value() + "," + node.value() + ") to the BFS graph");
        edge = node.edgeFrom(node.prev).css({"stroke-width": "4", "stroke": "red"});
        edge.added = true;
      }
      av.gradeableStep();
    }
  }
  function bfs(start, av) {
    var queue = [start],
        node,
        neighbor,
        adjacent;
    function nodeSort(a, b) {
      return a.value().charCodeAt(0) - b.value().charCodeAt(0);
    }

    markIt(start, av);

    while (queue.length) {
      // dequeue node
      node = queue.pop();
      // get neighbors and sort them in alphabetical order
      adjacent = node.neighbors();
      adjacent.sort(nodeSort);
      av.umsg("Dequeue " + node.value());
      av.step();

      // Check if all neighbors have already been visited
      var visitedAll = true;
      for (var i = 0; i < adjacent.length; i++) {
        if (!adjacent[i].hasClass("visited")) {
          visitedAll = false;
          break;
        }
      }

      if (!visitedAll) {
        // go through all neighbors
        while (adjacent.hasNext()) {
          neighbor = adjacent.next();
          av.umsg("Process edge (" + node.value() + "," + neighbor.value() + ").");
          if (!neighbor.hasClass("visited")) {
            // enqueue and visit node
            queue.unshift(neighbor);
            neighbor.prev = node;
            markIt(neighbor, av);
          } else {
            av.umsg(" Node " + neighbor.value() + " already visited.", {'preserve': true});
            av.step();
          }
        }
      } else {
        av.umsg("All the neighbors of " + node.value() + " have already been visited.\n");
        av.step();
      }

    }
  }
  
  // Process About button: Pop up a message with an Alert
  function about() {
    alert("BFS Proficiency Exercise\nWritten by -\nCreated as part of the OpenDSA hypertextbook project\nFor more information, see http://algoviz.org/OpenDSA\nSource and development history available at\nhttps://github.com/cashaffer/OpenDSA\nCompiled with JSAV library version " + JSAV.version());
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
