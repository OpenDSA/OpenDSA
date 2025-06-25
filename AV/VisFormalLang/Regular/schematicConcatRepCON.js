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
  fa.disableDragging();
  return fa;
}  

  var av_name = "schematicConcatRepCON";
  var av = new JSAV(av_name);
  av.umsg("Lets suppose that we have a reqular expression $r.s$");
  av.displayInit();

  av.umsg("First, suppose that this NFA accepts $r$.");
  var rFA = drawScheme(av, "r", 100, 0);
  av.step();

  av.umsg("Suppose also that this is the NFA that accept $s$");
  var sFA = drawScheme(av, "s", 450, 0);
  av.step();

  av.umsg("The fist step is to connect the final state for the NFA that accepts $r$ to the start state of the NFA that accepts $s$ using a lambda transition.");
  rFA.getFinals()[0].css({"border-style": "dotted"});
  sFA.initial._initialMarker.hide();
  sFA.initial.css({"font-weight": "normal"});
  av.g.line(385, 80, 500, 80, {"arrow-end": "classic-wide-long", "stroke-width": 2});
  av.label(lambda, {left:420, top:45});
  av.step();

  av.umsg("Then create a new start state");
  var fa = new av.ds.FA({left: 0, top: 0, width: 50, height: 600});
  var newS = fa.addNode({value:"s", left: 10, top: 50});
  toggleInitial(fa, newS);
  rFA.initial._initialMarker.hide();
  rFA.initial.css({"font-weight": "normal"});
  av.step();
  av.umsg("Connct the new start state with the final state for the NFA that accepts r by using a lambda transition.");
  av.g.line(40, 80, 150, 80, {"arrow-end": "classic-wide-long", "stroke-width": 2});
  av.label(lambda, {left:60, top:45});
  av.step();
  av.umsg("Create a new Final state.");
  var fa2 = new av.ds.FA({left: 800, top: 0, width: 20, height: 600});
  var newF = fa2.addNode({value:"f", left: 0, top: 50});
  toggleFinal(fa2, newF);
  sFA.getFinals()[0].css({"border-style": "dotted"});
  av.step();
  av.umsg("Connect the final state for the NFA that accepts s with the new finla state by a lambda transition.")
  av.g.line(735, 80, 800, 80, {"arrow-end": "classic-wide-long", "stroke-width": 2});
  av.label(lambda, {left:770, top:45});
  fa.disableDragging();
  fa2.disableDragging();
  av.recorded();

});
