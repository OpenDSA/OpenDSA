/*global window */
(function() {
  "use strict";

  var gAdjacentTF1 = {
    initJSAV: function() {
      var av = new JSAV("GAdjacentTF1");
      var g = av.ds.graph({center: true, visible: true, height: 200, directed: true});
      var n1 = g.addNode("4", {left: 10, top: 0});
      var n2 = g.addNode("1", {left: 10, top: 65});
      var n3 = g.addNode("3", {left: 10, top: 130});
      var n4 = g.addNode("5", {left: 100, top: 130});
      var n5 = g.addNode("2", {left: 100, top: 65});

      g.addEdge(n1, n2);
      g.addEdge(n2, n3);
      g.addEdge(n3, n4);
      g.addEdge(n4, n5);
      g.addEdge(n5, n1);
      g.addEdge(n2, n4);
      g.layout();
      av.displayInit();
      av.recorded();
    },

    getAnswer: function(node) {
      if (node === 1) { return "True"; }
      if (node === 2) { return "True"; }
      if (node === 3) { return "True"; }
      return "False";
    }
  };

  window.gAdjacentTF1 = window.gAdjacentTF1 || gAdjacentTF1;
}());
