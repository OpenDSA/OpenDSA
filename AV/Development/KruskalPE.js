/*global graphUtils */
(function() {
  "use strict";
  var exercise,
      graph,
      config = ODSA.UTILS.loadConfig(),
      interpret = config.interpreter,
      settings = config.getSettings(),
      jsav = new JSAV($(".avcontainer"), {settings: settings});

  function init() {
    // create the graph
    if (graph) {
      graph.clear();
    }
    graph = jsav.ds.graph({
      width: 400,
      height: 400,
      layout: "automatic",
      directed: false
    });
    graphUtils.generate(graph, {weighted: true}); // Randomly generate the graph with weights
    graph.layout();

    jsav.displayInit();
    return graph;
  }

  function fixState(modelGraph) {
    var graphEdges = graph.edges(),
        modelEdges = modelGraph.edges();

    // compare the edges between exercise and model
    for (var i = 0; i < graphEdges.length; i++) {
      var edge = graphEdges[i],
          modelEdge = modelEdges[i];
      if (modelEdge.hasClass("marked") && !edge.hasClass("marked")) {
        // mark the edge that is marked in the model, but not in the exercise
        markEdge(edge);
        break;
      }
    }
  }

  function model(modeljsav) {
    var i,
        graphNodes = graph.nodes(),
        graphEdges = graph.edges();
    // create the model
    var modelGraph = modeljsav.ds.graph({
      width: 400,
      height: 400,
      layout: "automatic",
      directed: false
    });

    // copy nodes from graph
    for (i = 0; i < graphNodes.length; i++) {
      modelGraph.addNode(graphNodes[i].value());
    }

    // copy edges from graph
    var modelNodes = modelGraph.nodes();
    for (i = 0; i < graphEdges.length; i++) {
      var startIndex = graphNodes.indexOf(graphEdges[i].start()),
          endIndex   = graphNodes.indexOf(graphEdges[i].end()),
          startNode  = modelNodes[startIndex],
          endNode    = modelNodes[endIndex],
          weight     = graphEdges[i].weight();
      modelGraph.addEdge(startNode, endNode, {weight: weight});
    }

    function getValue(node) { return node.value(); }

    var modelEdges = modelGraph.edges();
    // sort the edges alphabetically
    modelEdges.sort(function(a, b) {
      var aNodes = [a.start(), a.end()],
          bNodes = [b.start(), b.end()],
          aName = aNodes.map(getValue).sort().join(""),
          bName = bNodes.map(getValue).sort().join("");
      return [aName, bName].sort()[0] === aName ? -1 : 1;
    });

    var distanceMatrixValues = [];
    modelEdges.forEach(function(edge) {
      var nodes = [edge.start(), edge.end()],
          edgeName = "(" + nodes.map(getValue).sort().join(", ") + ")";
      distanceMatrixValues.push([edgeName, edge.weight()]);
    });

    var distances = modeljsav.ds.matrix(distanceMatrixValues, {
      style: "table",
      center: false,
      autoresize: false
    });
    distances.element.css({
      position: "absolute",
      top: 0,
      left: 10
    });

    // Mark the 'A' node
    modelGraph.layout();

    modeljsav.displayInit();

    // start the algorithm
    kruskal(modelNodes, modelEdges, distances, modeljsav);

    modeljsav.umsg(interpret("av_ms_mst"));
    // hide all edges that are not part of the spanning tree
    for (i = 0; i < modelGraph.edges().length; i++) {
      if (!modelEdges[i].hasClass("marked")) {
        modelEdges[i].hide();
      }
    }
    // call the layout function for the new graph
    modelGraph.layout();
    modeljsav.step();

    return modelGraph;
  }

  function kruskal(modelNodes, modelEdges, distances, modeljsav) {
    // Array of strings for book keeping of connected parts of the graph
    // Initially equal to ["A", "B", "C" ...]
    var connections = [];
    modelNodes.forEach(function(node) {
      connections.push(node.value());
    });

    // Checks if adding the edge would create a cycle in the spanning tree
    function createsCycle(edge) {
      var start = edge.start().value(),
          end = edge.end().value();
      // check if there is a connection that contains both values
      return connections.some(function(set) {
        return set.indexOf(start) !== -1 && set.indexOf(end) !== -1;
      });
    }

    // Returns the index of the set where the node belongs to
    function findSet(node) {
      var value = node.value();
      return connections.reduce(function(current, set, index) {
        if (set.indexOf(value) !== -1) {
          return index;
        }
        return current;
      }, -1);
    }

    function addEdge(edge) {
      var startSetIndex = findSet(edge.start()),
          endSetIndex = findSet(edge.end());
      connections[startSetIndex] += connections[endSetIndex];
      connections[endSetIndex] = "";
    }

    // sort edges according to weight and alphabetical order
    modelEdges.sort(sortEdges);

    modelEdges.forEach(function(currentEdge) {
      //msg = "<b><u>Processing Edge (" + start().value() + "," + endNode.value() + "):</b></u>";
      if (!createsCycle(currentEdge)) {
        //Add to MST
        // msg += " Adding edge to the MST";
        addEdge(currentEdge);
        markEdge(currentEdge, modeljsav);
      } else {
        // msg += " Dismiss edge";
        modeljsav.step();
      }
    });
  }

  function markEdge(edge, av) {
    edge.addClass("marked");
    edge.start().addClass("marked");
    edge.end().addClass("marked");
    if (av) {
      av.gradeableStep();
    } else {
      exercise.gradeableStep();
    }
  }

  function sortEdges(a, b) {
    var weightA = a.weight(),
        weightB = b.weight();
    if (weightA === weightB) {
      var startA = a.start().value().charCodeAt(0),
          endA   = a.end().value().charCodeAt(0),
          minA   = Math.min(startA, endA),
          maxA   = Math.max(startA, endA),
          startB = b.start().value().charCodeAt(0),
          endB   = b.end().value().charCodeAt(0),
          minB   = Math.min(startB, endB),
          maxB   = Math.max(startB, endB);
      return (minA - minB) * 1000 + maxA - maxB;
    }
    return weightA - weightB;
  }

  // Process About button: Pop up a message with an Alert
  function about() {
    window.alert(ODSA.AV.aboutstring(interpret(".avTitle"), interpret("av_Authors")));
  }

  exercise = jsav.exercise(model, init, {
    compare: {class: "marked"},
    controls: $(".jsavexercisecontrols"),
    fix: fixState
  });
  exercise.reset();

  $(".jsavcontainer").on("click", ".jsavedge", function() {
    var edge = $(this).data("edge");
    if (!edge.hasClass("marked")) {
      markEdge(edge);
    }
  });

  $(".jsavcontainer").on("click", ".jsavgraphnode", function() {
    alert("Please click on graph edges from the array to the left NOT graph nodes");
  });

  $("#about").click(about);
})();
