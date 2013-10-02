(function ($) {
    "use strict";
    /*global alert: true, ODSA */
    $(document).ready(function () {
      var initData, bh,
      settings = new JSAV.utils.Settings($(".jsavsettings")),
      jsav = new JSAV($('.avcontainer'), {settings: settings}),
      exercise,
      swapIndex, graph, modelGraph;
      jsav.recorded();

      function init() {
        if (graph) {
          graph.clear();
        }
        graph = jsav.ds.graph({width: 600, height: 600, layout: "manual", directed: false});
        initGraph("orig");
        graph.layout();
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
          graph.addEdge(a, c, {"weight": 7});
          graph.addEdge(a, e, {"weight": 9});
          graph.addEdge(c, b, {"weight": 5});
          graph.addEdge(c, d, {"weight": 1});
          graph.addEdge(c, f, {"weight": 2});
          graph.addEdge(f, b, {"weight": 6});
          graph.addEdge(d, f, {"weight": 2});
          graph.addEdge(e, f, {"weight": 1});
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
          modelGraph.addEdge(a, c, {"weight": 7});
          modelGraph.addEdge(a, e, {"weight": 9});
          modelGraph.addEdge(c, b, {"weight": 5});
          modelGraph.addEdge(c, d, {"weight": 1});
          modelGraph.addEdge(c, f, {"weight": 2});
          modelGraph.addEdge(f, b, {"weight": 6});
          modelGraph.addEdge(d, f, {"weight": 2});
          modelGraph.addEdge(e, f, {"weight": 1});
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
