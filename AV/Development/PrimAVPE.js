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
		if(graph)
		{
			graph.clear();
		}
		graph = jsav.ds.graph({width: 600, height: 600, layout: "manual", directed: false});
		initGraph();
		graph.layout();
		jsav.displayInit();
		return graph;
    }
    
    function fixState(modelHeap) {
		
    }
   
    function model(modeljsav) {
		modelGraph = modeljsav.ds.graph({width: 600, height: 600, layout: "manual", directed: false});
		initModelGraph();
		modelGraph.layout();
		//modeljsav._undo = [];
		modeljsav.displayInit();
		modelGraph.nodes()[0].highlight();
		modeljsav.stepOption("grade",true);
		modeljsav.step();
		/*
		for(var i=0;i<modelGraph.nodeCount();i++)
		{	
			modeljsav.umsg("Highlighting node "+modelGraph.nodes()[i].value());
			modelGraph.nodes()[i].highlight();
			modeljsav.stepOption("grade", true);
			modeljsav.step();
		}
		*/
	  return modelGraph;
    }
	
function initGraph() {

    //Nodes of the original graph
    var a = graph.addNode("A", {"left": 25, "top": 50});
    var b = graph.addNode("B", {"left": 325, "top": 50});
    var c = graph.addNode("C", {"left": 145, "top": 75});
    var d = graph.addNode("D", {"left": 145, "top": 200});
    var e = graph.addNode("E", {"left": 0, "top": 300});
    var f = graph.addNode("F", {"left": 325, "top": 250});
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
	
function initModelGraph() {

    //Nodes of the original graph
    var a = modelGraph.addNode("A", {"left": 25, "top": 50});
    var b = modelGraph.addNode("B", {"left": 325, "top": 50});
    var c = modelGraph.addNode("C", {"left": 145, "top": 75});
    var d = modelGraph.addNode("D", {"left": 145, "top": 200});
    var e = modelGraph.addNode("E", {"left": 0, "top": 300});
    var f = modelGraph.addNode("F", {"left": 325, "top": 250});
    //Original graph edges
    modelGraph.addEdge(a, c, {"weight": 7});
    modelGraph.addEdge(a, e, {"weight": 9});
    modelGraph.addEdge(c, b, {"weight": 5});
    modelGraph.addEdge(c, d, {"weight": 1});
    modelGraph.addEdge(c, f, {"weight": 2});
    modelGraph.addEdge(f, b, {"weight": 6});
    modelGraph.addEdge(d, f, {"weight": 2});
    modelGraph.addEdge(e, f, {"weight": 1});
    }
	
      // Process About button: Pop up a message with an Alert
    function about() {
      alert("Heapsort Proficiency Exercise\nWritten by Ville Karavirta\nCreated as part of the OpenDSA hypertextbook project\nFor more information, see http://algoviz.org/OpenDSA\nSource and development history available at\nhttps://github.com/cashaffer/OpenDSA\nCompiled with JSAV library version " + JSAV.version());
    }

    exercise = jsav.exercise(model, init, { css: "background-color" },
                            { feedback: "continuous",
                             controls: $('.jsavexercisecontrols'),
                              fixmode: "fix",
                             fix: fixState });
    exercise.reset();
    $(".jsavcontainer").on("click",".jsavgraphnode", function () {
       var nodeIndex=$(this).parent(".jsavgraph").find(".jsavgraphnode").index(this);
	   graph.nodes()[0].highlight();
	   exercise.gradeableStep();
    });
    $("#about").click(about);
  });
}(jQuery));
