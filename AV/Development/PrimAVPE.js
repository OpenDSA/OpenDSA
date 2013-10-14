(function ($) {
    "use strict";
    /*global alert: true, ODSA */
    $(document).ready(function () {
      var settings = new JSAV.utils.Settings($(".jsavsettings")),
      jsav = new JSAV($('.avcontainer'), {settings: settings}),
      exercise, graph, modelGraph, randomWeights = [], arr = [], labels, distances, edgeCount = 8;
      jsav.recorded();

      function init() {
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
			console.log(weight);
			count++;
		  }
		  if (count === edgeCount){
		    break;
		  }
		}
        graph = jsav.ds.graph({width: 600, height: 600, layout: "manual", directed: false});
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

      function fixState(mGraph) {
        graph.nodes()[0].highlight();
      }

      function model(modeljsav) {
        modelGraph = modeljsav.ds.graph({width: 600, height: 600, layout: "manual", directed: false});
        initGraph("model");
        modelGraph.layout();
        modeljsav._undo = [];
        modeljsav.displayInit();
		for(var i = 0;i < graph.nodes().length; i++){
		  modelGraph.nodes()[i].highlight(); 
		  modeljsav.stepOption("grade", true);
		  modeljsav.step();
		}
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
          modelGraph.addEdge(a, c, {"weight": randomWeights[0]});
          modelGraph.addEdge(a, e, {"weight": randomWeights[1]});
          modelGraph.addEdge(c, b, {"weight": randomWeights[2]});
          modelGraph.addEdge(c, d, {"weight": randomWeights[3]});
          modelGraph.addEdge(c, f, {"weight": randomWeights[4]});
          modelGraph.addEdge(f, b, {"weight": randomWeights[5]});
          modelGraph.addEdge(d, f, {"weight": randomWeights[6]});
          modelGraph.addEdge(e, f, {"weight": randomWeights[7]});
        }
      }

      // Process About button: Pop up a message with an Alert
      function about() {
        alert("Heapsort Proficiency Exercise\nWritten by Ville Karavirta\nCreated as part of the OpenDSA hypertextbook project\nFor more information, see http://algoviz.org/OpenDSA\nSource and development history available at\nhttps://github.com/cashaffer/OpenDSA\nCompiled with JSAV library version " + JSAV.version());
      }

      exercise = jsav.exercise(model, init, { css: "background-color" },
        { controls: $('.jsavexercisecontrols'), fix: fixState });
      exercise.reset();
      $(".jsavcontainer").on("click", ".jsavgraphnode", function () {
        var nodeIndex = $(this).parent(".jsavgraph").find(".jsavgraphnode").index(this);
        graph.nodes()[nodeIndex].highlight();
        console.log(graph);
        console.log("----------------");
        console.log(modelGraph);
        exercise.gradeableStep();
      });
      $("#about").click(about);
    });
  }(jQuery));
