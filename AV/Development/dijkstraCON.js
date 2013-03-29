"use strict";

(function ($) {
  var jsav = new JSAV("dijkstraCON1", {"animationMode": "none"});
  var g = jsav.ds.graph({width: 300, height: 200,
                         layout: "manual", directed: true});
  var a = g.addNode("a", {"left": 0, "top":  75});
  var b = g.addNode("b", {"left": 100, "top":  0});
  var c = g.addNode("c", {"left": 100, "top": 150});
  var d = g.addNode("d", {"left": 250, "top":  25});
  var e = g.addNode("e", {"left": 250, "top": 150});

  g.addEdge(a, b).label("10");
  g.addEdge(a, c).label("3");
  g.addEdge(a, d).label("20");
  g.addEdge(b, d).label("5");
  g.addEdge(c, b).label("2");
  g.addEdge(c, e).label("15");
  g.addEdge(d, e).label("11");
  g.layout();
  jsav.displayInit();
}(jQuery));
