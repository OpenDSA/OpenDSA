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
    graphUtils.generate(graph, {
      weighted: true,
      nodes: 6,
      edges: 12
    }); // Randomly generate the graph with weights
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
    var i;
    // create the model
    var modelGraph = modeljsav.ds.graph({
      width: 400,
      height: 400,
      layout: "automatic",
      directed: false
    });

    // copy the graph and its weights
    graphUtils.copy(graph, modelGraph, {weights: true});
    var modelNodes = modelGraph.nodes();

    var modelEdges = modelGraph.edges();
    // sort the edges alphabetically
    modelEdges.sort(function(a, b) {
      var nameA = edgeName(a),
          nameB = edgeName(b);
      return [nameA, nameB].sort()[0] === nameA ? -1 : 1;
    });

    var edgeMatrixValues = [];
    modelEdges.forEach(function(edge) {
      var eName = "(" + edgeName(edge, ", ") + ")";
      edgeMatrixValues.push([eName, edge.weight()]);
    });

    var edgeMatrix = modeljsav.ds.matrix(edgeMatrixValues, {
      style: "table",
      center: false,
      autoresize: false
    });
    edgeMatrix.element.css({
      position: "absolute",
      top: 0,
      left: 10
    });

    modeljsav.displayInit();

    // start the algorithm
    kruskal(modelNodes, modelEdges, edgeMatrix, modeljsav);

    modeljsav.umsg(interpret("av_ms_mst"));
    // hide all edges that are not part of the spanning tree
    for (i = 0; i < modelGraph.edges().length; i++) {
      if (!modelEdges[i].hasClass("marked")) {
        modelEdges[i].hide();
      }
    }
    modeljsav.step();

    return modelGraph;
  }

  function kruskal(modelNodes, modelEdges, edgeMatrix, modeljsav) {
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

    function edgeIndex(edge) {
      var eName = "(" + edgeName(edge, ", ") + ")";
      for (var i = 0; i < modelEdges.length; i++) {
        if (edgeMatrix.value(i, 0) === eName) { return i; }
      }
      return -1;
    }

    // sort edges according to weight and alphabetical order
    modelEdges.sort(sortEdges);

    modelEdges.forEach(function(currentEdge) {
      //msg = "<b><u>Processing Edge (" + start().value() + "," + endNode.value() + "):</b></u>";
      modeljsav.umsg(interpret("av_ms_processing"), {fill: {edge: edgeName(currentEdge, ", ")}});
      var index = edgeIndex(currentEdge);
      if (!createsCycle(currentEdge)) {
        //Add to MST
        modeljsav.umsg(interpret("av_ms_adding"), {preserve: true});
        addEdge(currentEdge);
        edgeMatrix.addClass(index, 0, "marked");
        edgeMatrix.addClass(index, 1, "marked");
        markEdge(currentEdge, modeljsav);
      } else {
        modeljsav.umsg(interpret("av_ms_dismiss"), {preserve: true});
        currentEdge.addClass("discarded");
        edgeMatrix.addClass(index, 0, "discarded");
        edgeMatrix.addClass(index, 1, "discarded");
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

  function getValue(node) { return node.value(); }

  function edgeName(edge, separator) {
    var s = separator || "";
    return [edge.start(), edge.end()].map(getValue).sort().join(s);
  }

  function sortEdges(a, b) {
    var weightA = a.weight(),
        weightB = b.weight();
    if (weightA === weightB) {
      var nameA = edgeName(a),
          nameB = edgeName(b),
          names = [nameA, nameB].sort();
      return names[0] === nameA ? -1 : 1;
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
