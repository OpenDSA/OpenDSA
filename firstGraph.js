(function ($) {
  //whih should we passthrough id or class
  var jsav = new JSAV($('.avcontainer'));
  var Edge = JSAV._types.ds.Edge; // shortcut to JSAV Edge
 
  var initGraph = function(opts) {
    var graph = jsav.ds.graph($.extend({width: 500, height: 300, directed: true}, opts));
    var q2 = graph.addNode("q2", {"left": 350, "top": 100}),
        q1 = graph.addNode("q1", {"left": 200, "top": 100}),
        q0 = graph.addNode("q0", {"left": 50, "top": 100});

    //adding edges between two different nodes
    graph.addEdge(q0, q1, {weight: 'b'});
    graph.addEdge(q1, q2, {weight: 'a'});

    //modifying addEdge function to have an edge for same node
    graph.addEdge = function(fromNode, toNode, options){

      //to keep the arrow on the line
      var opts = $.extend({}, this.options, options);
      if (opts.directed && !opts["arrow-end"]) {
        opts["arrow-end"] = "classic-wide-long";
      }

       if(fromNode === toNode){
          var path = jsav.g.path("M242 127 C220 85 310 85 282 127 0", opts);
      }
    };

    //adding edge for same node
    graph.addEdge(q1, q1, {weight: 'b'});

    jsav.label("b", {left: 259, bottom: 210});

    return graph;
   };

   //graph with manual label to be able to change positions  freely
  var graph = initGraph({layout: "manual"});
  graph.layout();
  jsav.displayInit();

}(jQuery));

