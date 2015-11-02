/*global window */
(function() {
  "use strict";

  var gConnCompTF = {
    initJSAV: function() {
      var av = new JSAV("GConnCompTF");

      var gTop = 0;
      var gLeft = 150;
      var graph = av.ds.graph({center: true, visible: true, height: 200, directed: true});

      var node0 = graph.addNode("0", {left: gLeft, top: gTop});
      var node1 = graph.addNode("1", {left: gLeft,  top: gTop + 100});
      var node2 = graph.addNode("2", {left: gLeft + 100, top: gTop});
      var node3 = graph.addNode("3", {left: gLeft + 100, top: gTop + 100});
      var node4 = graph.addNode("4", {left: gLeft +  50, top: gTop + 50});
      var node5 = graph.addNode("5", {left: gLeft + 175, top: gTop + 100});
      var node6 = graph.addNode("6", {left: gLeft + 175, top: gTop});
      graph.addNode("7", {left: gLeft + 250, top: gTop}); // We don't use this node again

      //add edges to grapph
      graph.addEdge(node0, node1);
      graph.addEdge(node0, node4);
      graph.addEdge(node1, node3);
      graph.addEdge(node2, node3);
      graph.addEdge(node2, node4);
      graph.addEdge(node4, node1);
      graph.addEdge(node6, node5);
      graph.layout();
      av.displayInit();
      av.recorded();
    }
  };

  window.gConnCompTF = window.gConnCompTF || gConnCompTF;
}());
