/*global ODSA */
$(document).ready(function() {
  "use strict";
  var av_name = "DfsCON";
  var interpret = ODSA.UTILS.loadConfig({av_name: av_name}).interpreter;
  var av = new JSAV(av_name);
  //var jsav;
  var g;
  var arr;
  var a, b, c, d, e, f;
  var size;

  // Slide 1 Implement the graph
  g = av.ds.graph({width: 500, height: 500, layout: "manual", directed: true});
  arr = av.ds.array([" "," "," ", " ", " "],{layout: "vertical"});
  arr.css({"left": "300px", "bottom": "500px", "width": "30px"});
  size = 4;
  a = g.addNode("A", {"left": 25});
  b = g.addNode("B", {"left": 325});
  c = g.addNode("C", {"left": 145, "top": 75});
  d = g.addNode("D", {"left":145, "top": 200});
  e = g.addNode("E", {"top": 300});
  f = g.addNode("F", {"left":325, "top":250});
  g.addEdge(a, c);
  g.addEdge(c, a);
  g.addEdge(a, e);
  g.addEdge(c, b);
  g.addEdge(b, c);
  g.addEdge(c, e);
  g.addEdge(c, f);
  g.addEdge(b, f);
  g.addEdge(f, b);
  g.addEdge(f, c);
  g.addEdge(f, d);
  g.addEdge(d, c);
  g.addEdge(d, f);
  g.addEdge(f, e);
  g.addEdge(e, a);
  g.addEdge(e, f);
  g.layout();
  av.umsg(interpret("sc1"));
  av.displayInit();

  // Slide 2
  av.umsg(interpret("sc2"));
  a.highlight();
  av.step();

  // Slide 3
  av.umsg(interpret("sc3"));
  arr.value(4, "A");
  av.step();

  // Slide 4, 5, 6
  av.umsg(interpret("sc4"));
  av.step();
  av.umsg(interpret("sc5"));
  av.step();
  av.umsg(interpret("sc6"));
  c.highlight();
  av.step();

  // Slide 7
  av.umsg(interpret("sc7"));
  c.edgeFrom(a).css({"stroke-width":"4", "stroke":"red"}); // highlight
  arr.value(3, "C");
  av.step();

  // SLide 8, 9, 10
  av.umsg(interpret("sc8"));
  av.step();
  av.umsg(interpret("sc9"));
  av.step();
  av.umsg(interpret("sc10"));
  av.step();

  // Slide 11
  av.umsg(interpret("sc11"));
  b.highlight();
  av.step();

  // Slide 12
  av.umsg(interpret("sc12"));
  arr.value(2, "B");
  b.edgeFrom(c).css({"stroke-width":"10", "stroke":"red"});
  av.step();

  // SLide 13, 14, 15
  av.umsg(interpret("sc13"));
  av.step();
  av.umsg(interpret("sc14"));
  av.step();
  av.umsg(interpret("sc15"));
  av.step();

  // Slide 16
  av.umsg(interpret("sc16"));
  f.highlight();
  av.step();

  // Slide 17
  av.umsg(interpret("sc17"));
  arr.value(1, "F");
  f.edgeFrom(b).css({"stroke-width":"4", "stroke":"red"});
  av.step();

  // SLide 18, 19, 20, 21
  av.umsg(interpret("sc18"));
  av.step();
  av.umsg(interpret("sc19"));
  av.step();
  av.umsg(interpret("sc20"));
  av.step();
  av.umsg(interpret("sc21"));
  av.step();

  // Slide 23
  av.umsg(interpret("sc22"));
  d.highlight();
  av.step();

  // Slide 24
  av.umsg(interpret("sc23"));
  arr.value(0, "D");
  d.edgeFrom(f).css({"stroke-width":"4", "stroke":"red"});
  av.step();

  // SLide 24, 25
  av.umsg(interpret("sc24"));
  av.step();
  av.umsg(interpret("sc25"));
  av.step();

  // Slide 26
  av.umsg(interpret("sc26"));
  arr.value(0, " ");
  av.step();

  // Slide 27, 28
  av.umsg(interpret("sc27"));
  av.step();
  av.umsg(interpret("sc28"));
  av.step();

  // SLide 29
  av.umsg(interpret("sc29"));
  e.highlight();
  av.step();

  // Slide 30
  av.umsg(interpret("sc26"));
  arr.value(0, "E");
  e.edgeFrom(f).css({"stroke-width":"4", "stroke":"red"});
  av.step();

  // SLide 31, 32
  av.umsg(interpret("sc31"));
  av.step();
  av.umsg(interpret("sc32"));
  av.step();

  // Slide 33
  av.umsg(interpret("sc33"));
  arr.value(0, " ");
  av.step();

  // Slide 34
  av.umsg(interpret("sc34"));
  arr.value(1, " ");
  av.step();

  // Slide 34
  av.umsg(interpret("sc35"));
  arr.value(2, " ");
  av.step();

  // SLide 35, 36
  av.umsg(interpret("sc36"));
  av.step();
  av.umsg(interpret("sc37"));
  av.step();

  // Slide 38
  av.umsg(interpret("sc38"));
  arr.value(3, " ");
  av.step();

  // SLide 39
  av.umsg(interpret("sc39"));
  av.step();

  // Slide 40
  av.umsg(interpret("sc40"));
  arr.value(4, " ");
  av.step();

  // SLide 41
  av.umsg(interpret("sc41"));
  g.removeEdge(a, e);
  g.removeEdge(e, a);
  g.removeEdge(c, d);
  g.removeEdge(d, c);
  g.removeEdge(c, f);
  g.removeEdge(f, c);
  g.removeEdge(c, e);
  g.removeEdge(e, c);
  av.recorded();
});
