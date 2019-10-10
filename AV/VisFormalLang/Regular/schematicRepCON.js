$(document).ready(function() {
    "use strict";
  
var av_name = "schematicRepCON";
  var av = new JSAV(av_name);
  av.umsg("Lets suppose that we have a regular expression $r$, we need to find a simple representation for the NFA that accepts $r$");
  av.displayInit();
  av.umsg("The NFA should has a start and a final states.");
  var leftMargin = 200;
  var topMargin = 50;
  var fa = new av.ds.FA({left: leftMargin, top: topMargin, width: 300, height: 200});
  var startX = 50;
  var lambda = String.fromCharCode(955);
  var s = fa.addNode({value:"s", left: startX, top: 50});
  var n1 = fa.addNode({value:" ",left: 100 + startX, top: 0});
  var n2 = fa.addNode({value:" ",left: 100 + startX, top: 50});
  var n3 = fa.addNode({value:" ",left: 100 + startX, top: 100});
  var f = fa.addNode({value:"f", left: 200 + startX, top: 50});
  fa.addEdge(n1, f,{weight: lambda});
  fa.addEdge(n2, f,{weight: lambda});
  fa.addEdge(n3, f,{weight: lambda});
  toggleInitial(fa, s);
  toggleFinal(fa, f);
  av.step();
  av.umsg("To accept any regular exepression $r$, the NFA should start from $s$ and go to some inermediate states until it reaches the final state $f$");
  var e1 = fa.addEdge(s, n1, {weight:" "});
  e1.css({"stroke-dasharray": "."});
  var e2 = fa.addEdge(s, n2, {weight:" "});
  e2.css({"stroke-dasharray": "."});
  var e3 = fa.addEdge(s, n3, {weight:" "});
  e3.css({"stroke-dasharray": "."});
  av.step();
  av.umsg("We can use this figure to represent the NFA that accepts the regular expression $r$");
  fa.css({outline: "1px black solid", border: "10px transparent solid;"});
  av.label("NFA that accepts $r$", {left: leftMargin + 80, top: 200});
  av.recorded();
});

  /*
  var startY = 0;
  var p1Y = startY +s.element.outerHeight() +topMargin ;
  var p1X = startX+s.element.outerWidth() + leftMargin;
  var points = [[p1X, p1Y], [p1X + 10, p1Y + 10], [p1X + 20, p1Y -10 ], [p1X + 30, p1Y +10], [p1X + 40, p1Y-10], [p1X + 50, p1Y +10], [p1X + 60, p1Y-10], [p1X + 70, p1Y]];
  var line = av.g.polyline(points,{
    "arrow-end": "classic-wide-long",
    opacity: 0, "stroke-width": 2,
    "stroke-dasharray": "-"
  });
  line.show();*/