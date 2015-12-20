/*global window */
(function() {
  "use strict";

  var ginoutDegreeFIB = {
    initJSAV: function() {
      var av = new JSAV("GinoutDegreeFIB");
      av.recorded();
      var g = av.ds.graph({center: true, visible: true, height: 250,
                           directed: true});
      var n0 = g.addNode("0", {top: 0, left: 100});
      var n1 = g.addNode("1", {top: 90, left: 5});
      var n2 = g.addNode("2", {top: 30, left: 200});
      var n3 = g.addNode("3", {top: 140, left: 200});
      var n4 = g.addNode("4", {top: 190, left: 100});

      g.addEdge(n0, n1);
      g.addEdge(n0, n2);
      g.addEdge(n1, n2);
      g.addEdge(n1, n3);
      g.addEdge(n1, n4);
      g.addEdge(n2, n4);
      g.addEdge(n3, n4);
      g.layout();
    },

    getAnswer: function(node, index) {
      var a = [[0, 1, 2, 1, 3], [2, 3, 1, 1, 0]];
      return a[index][node];
    }
  };

  window.ginoutDegreeFIB = window.ginoutDegreeFIB || ginoutDegreeFIB;
}());
