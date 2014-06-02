(function ($) {
  "use strict";
  /*global alert: true, ODSA */
  $(document).ready(function () {
    var settings = new JSAV.utils.Settings($(".jsavsettings")),
    jsav = new JSAV($('.avcontainer'), {settings: settings}),
    exercise, graph, modelGraph, randomWeights = [], arr = [], labels, distances, mst, 
    modelDistances, modelLabels, modelMst, edgeCount = 8, graphNodes = [], gnodes = [], mstnodes = [];
    var exerciseStep, modelStep;
    jsav.recorded();
	
    function init() {
      exerciseStep = 0;
      modelStep = 1;
      var i;
      if (graph) {
        graph.clear();
      }
      var count = 0;
      var weight;
      randomWeights = new Array(edgeCount);
      while (true){
        weight = Math.floor((Math.random() * 10));
        if (weight === 0){
          continue;
        }
        else{
          randomWeights[count] = weight;
          count++;
        }
        if (count === edgeCount){
          break;
        }
      }
      graph = jsav.ds.graph({width: 600, height: 600, layout: "manual", directed: true});
      initGraph("orig");
      graph.layout();
      arr = new Array(graph.nodeCount());
      for (i = 0; i < arr.length; i++) {
        arr[i] = Infinity;
      }
      distances = jsav.ds.array(arr, {layout: "vertical", left: 600, top: 150});
      for (i = 0; i < arr.length; i++) {
        arr[i] = graph.nodes()[i].value();
      }
      labels = jsav.ds.array(arr, {layout: "vertical", left: 553, top: 150});
      jsav.displayInit();
      return graph;
    }
    function minVertexExercise() {
      var v;    // The closest node seen so far
      var next; // Current node being looked at
      graphNodes.reset();
      for (next = graphNodes.next(); next; next = graphNodes.next()) {
        if (!next.hasClass("visited")) {
          v = next;
          break;
        }
      }
      for (next = graphNodes.next(); next; next = graphNodes.next()) {
        if (!(next.hasClass("visited")) && distances.value(next.index) < distances.value(v.index)) {
          v = next;
        }
      }
      //console.log("v is " + v.value() + ", Distance for v is " + distances.value(v.index));
      return v;
    }
    function dijkstraExercise(s) {
      var v;         // The current node
      var neighbors = []; // The neighbors of a specific node
      var cost;         // cost of adding the node
      var next, i;
      // Initialize "parents" to dummy values
      for (next = gnodes.next(); next; next = gnodes.next()) {
        next.parent = next;
      }
      distances.value(s.index, 0);
      for (i = 0; i < exerciseStep; i++) {
        v = minVertexExercise();
        v.addClass("visited");
        distances.highlight(graphNodes.indexOf(v));
        labels.highlight(graphNodes.indexOf(v));
        v.highlight();
        if (v !== s) {
        //Add the edge
          var edge = graph.getEdge(v.parent, v);
          edge.css({"stroke-width": "4", "stroke": "red"});
        }
        neighbors = v.neighbors();
        for (var j = 0; j < neighbors.length; j++) {
          if (!neighbors[j].hasClass("visited")) {
            var w = neighbors[j];
            cost = v.edgeTo(w).weight() + distances.value(v.index); 
            if (distances.value(w.index) > cost) {
              w.parent = v;
              distances.value(w.index, cost);
            }
          }
        }
      }
    }
    function fixState(mGraph) {
      var i;
      //Removing all highlights from nodes and edges in the exercise graph
      for (i = 0; i < graphNodes.length; i++) {
        graphNodes[i].unhighlight();
        graphNodes[i].removeClass('visited');
        labels.unhighlight(i);
        distances.unhighlight(i);
        distances.value(i, Infinity);
      }
      for (i = 0;i < graph.edges().length;i++) {
        graph.edges()[i].css({"stroke-width": "1", "stroke": "black"});
      }
      dijkstraExercise(graphNodes[0]);
      //exercise.gradeableStep();
    }
    function model(modeljsav) {
      var i;
      modelGraph = modeljsav.ds.graph({width: 600, height: 600, layout: "manual", directed: true});
      modelMst = modeljsav.ds.graph({width: 600, height: 400, layout: "manual", directed: true});
      modelMst.hide();
      initGraph("model");
      modelGraph.layout();
      arr = new Array(graph.nodeCount());
      for (i = 0; i < arr.length; i++) {
        arr[i] = Infinity;
      }
      modelDistances = modeljsav.ds.array(arr, {layout: "vertical", left: 700, top: 50});
      for (i = 0; i < arr.length; i++) {
        arr[i] = graph.nodes()[i].value();
      }
      modelLabels = modeljsav.ds.array(arr, {layout: "vertical", left: 653, top: 50});
      modeljsav.displayInit();
      dijkstra(gnodes[0], modeljsav);
      displayMST(modeljsav);
      return modelGraph;
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
        graph.addEdge(a, c, {"weight": randomWeights[0]});
        graph.addEdge(a, e, {"weight": randomWeights[1]});
        graph.addEdge(c, b, {"weight": randomWeights[2]});
        graph.addEdge(c, d, {"weight": randomWeights[3]});
        graph.addEdge(c, f, {"weight": randomWeights[4]});
        graph.addEdge(f, b, {"weight": randomWeights[5]});
        graph.addEdge(d, f, {"weight": randomWeights[6]});
        graph.addEdge(e, f, {"weight": randomWeights[7]});
		graphNodes = graph.nodes();
		for (var i = 0; i < graphNodes.length; i++) {
          graphNodes[i].index = i;
        }
      }
      else {
        //Nodes of the model Graph
        a = modelGraph.addNode("A", {"left": 25, "top": 50});
        b = modelGraph.addNode("B", {"left": 325, "top": 50});
        c = modelGraph.addNode("C", {"left": 145, "top": 75});
        d = modelGraph.addNode("D", {"left": 145, "top": 200});
        e = modelGraph.addNode("E", {"left": 0, "top": 300});
        f = modelGraph.addNode("F", {"left": 325, "top": 250});
        //Nodes of the Model paths
        modelMst.addNode("A", {"left": 25, "top": 50});
        modelMst.addNode("B", {"left": 325, "top": 50});
        modelMst.addNode("C", {"left": 145, "top": 75});
        modelMst.addNode("D", {"left": 145, "top": 200});
        modelMst.addNode("E", {"left": 0, "top": 300});
        modelMst.addNode("F", {"left": 325, "top": 250});
        //Model graph edges
        modelGraph.addEdge(a, c, {"weight": randomWeights[0]});
        modelGraph.addEdge(a, e, {"weight": randomWeights[1]});
        modelGraph.addEdge(c, b, {"weight": randomWeights[2]});
        modelGraph.addEdge(c, d, {"weight": randomWeights[3]});
        modelGraph.addEdge(c, f, {"weight": randomWeights[4]});
        modelGraph.addEdge(f, b, {"weight": randomWeights[5]});
        modelGraph.addEdge(d, f, {"weight": randomWeights[6]});
        modelGraph.addEdge(e, f, {"weight": randomWeights[7]});
        gnodes = modelGraph.nodes();
        mstnodes = modelMst.nodes();
        for (var i = 0; i < mstnodes.length; i++) {
          gnodes[i].index = i;
        }
      }
    }
    function displayMST(modeljsav) {
      modelGraph.hide();
      modelMst.show();
      modelMst.layout();
      modeljsav.umsg("Complete Shortest Paths");
    }
    // Mark a node in the graph.
    function markIt(node, modeljsav) {
      node.addClass("visited");
      node.addedStep = modelStep;     //The step this node was added
      modeljsav.umsg("Add node " + node.value());
      modelDistances.highlight(gnodes.indexOf(node));
      modelLabels.highlight(gnodes.indexOf(node));
      node.highlight();
      modeljsav.step();
      modeljsav.stepOption('grade', true);
    }
    function minVertex() {
      var v;    // The closest node seen so far
      var next; // Current node being looked at
      gnodes.reset();
      for (next = gnodes.next(); next; next = gnodes.next()) {
        if (!next.hasClass("visited")) {
          v = next;
          break;
        }
      }
      for (next = gnodes.next(); next; next = gnodes.next()) {
        if (!(next.hasClass("visited")) && modelDistances.value(next.index) < modelDistances.value(v.index)) {
          v = next;
        }
      }
      //console.log("v is " + v.value() + ", Distance for v is " + distances.value(v.index));
      return v;
    }
    // Compute Dijkstra's algorithm and return edges
    function dijkstra(s, modeljsav) {
      var v;         // The current node added
      var neighbors = []; // The neighbors of a specific node
      var cost;         // cost of adding the node
      var next, i;
      // Initialize "parents" to dummy values
      for (next = gnodes.next(); next; next = gnodes.next()) {
        next.parent = next;
      }
      modelDistances.value(s.index, 0);
      modeljsav.umsg("Update the distance value of node " + s.value());
      modeljsav.step();
      for (i = 0; i < modelGraph.nodeCount(); i++) {
        v = minVertex();
        markIt(v, modeljsav);
        modelStep++;
        //console.log(v.value()+"  "+v.addedStep)
        if (modelDistances.value(v.index) === Infinity) {
          modeljsav.umsg("No other nodes are reachable, so quit.");
          modeljsav.step();
          return;
        }
        if (v !== s) {
          //Add an edge to the MST
          var edge = modelGraph.getEdge(v.parent, v);
          edge.css({"stroke-width": "4", "stroke": "red"});
          edge.addedStep = modelStep - 1;
          var mstedge = modelMst.addEdge(mstnodes[v.parent.index], mstnodes[v.index], {"weight": edge.weight()});
          mstedge.css({"stroke-width": "2", "stroke": "red"});
          modeljsav.umsg("Add edge (" + v.parent.value() + "," + v.value() + ")");
          modeljsav.step();
        }
        neighbors = v.neighbors();
        for (var j = 0; j < neighbors.length; j++) {
          if (!neighbors[j].hasClass("visited")) {
            var w = neighbors[j];
            cost = v.edgeTo(w).weight() + modelDistances.value(v.index);
            //Update Distances Of neighbors not added yet
            var msg = "<u>Processing edge (" + v.value() + "," + w.value() + "): </u>";
            if (modelDistances.value(w.index) > cost) {
              w.parent = v;
              modelDistances.value(w.index, cost);
              msg += "Update the distance value of node (" + w.value() + ")";
            }
            else {
              msg += "Leave the distance value of node (" + w.value() + ") unchanged";
            }
            modeljsav.umsg(msg);
            modeljsav.step();
          }
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
      if (!node.hasClass('visited')) {
        var neighbors = [];
        var cost;
        var edge;
        if (exerciseStep === 0){
          distances.value(nodeIndex, 0);  
        }
        //update neighbors distances
        neighbors = node.neighbors();
        for (var j = 0; j < neighbors.length; j++) {
          if (!neighbors[j].hasClass("visited")) {
            var w = neighbors[j];
            cost = node.edgeTo(w).weight() + distances.value(node.index);
            //Update Distances Of neighbors not added yet
            if (distances.value(w.index) > cost) {
              w.parent = node;
              distances.value(w.index, cost);
            }
          }
        }
        node.addClass('visited');
        node.highlight();
        labels.highlight(nodeIndex);
        distances.highlight(nodeIndex);
        exerciseStep++;
        console.log("Exercise Step:"+exerciseStep);
        exercise.gradeableStep();		 
        edge = graph.getEdge(node.parent, node);
        if (edge) {
          edge.css({"stroke-width": "4", "stroke": "red"});
        }
      }
    });
    $("#about").click(about);
  });
}(jQuery));
