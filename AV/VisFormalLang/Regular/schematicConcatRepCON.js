$(document).ready(function() {
    "use strict";
  function drawScheme(av, name, left, top){
  var fa = new av.ds.FA({left: left, top: top, width: 300, height: 200});
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
  var e1 = fa.addEdge(s, n1, {weight:" "});
  e1.css({"stroke-dasharray": "."});
  var e2 = fa.addEdge(s, n2, {weight:" "});
  e2.css({"stroke-dasharray": "."});
  var e3 = fa.addEdge(s, n3, {weight:" "});
  e3.css({"stroke-dasharray": "."});
  fa.css({outline: "1px black solid", border: "10px transparent solid;"});
  av.label("NFA that accepts $" + name + "$", {left: left + 80, top: top +200});
  return fa;
}  
var av_name = "schematicRepCON";
  var av = new JSAV(av_name);
  av.umsg("Lets suppose that we have a reqular expresLets suppose that we have a reqular expression $r.s$");
  av.displayInit();
  av.umsg("First, suppose that this NFA accepts $r$.");
  var rFA = drawScheme(av, "r", 200,50);
  av.step();
  av.umsg("Suppose also that this is the NFA that accept $s$");
  var sFA = drawScheme(av, "s", 600,50);
  av.step();
  av.recorded();
});
