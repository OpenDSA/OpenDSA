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
var av_name = "schematicStarRepCON";
  var av = new JSAV(av_name);
  av.umsg("Lets suppose that we have a reqular expression $r^*$");
  av.displayInit();
  av.umsg("First, suppose that this NFA accepts $r$.");
  var rFA = drawScheme(av, "r", 200,150);
  av.step();
  av.umsg("First we need to create a new start state");
  var fa = new av.ds.FA({left: 100, top: 0, width: 50, height: 600});
  var newS = fa.addNode({value:"s", left: 10, top: 200});
  toggleInitial(fa, newS);
  rFA.initial._initialMarker.hide();
  rFA.initial.css({"font-weight": "normal"});
  av.step();
  av.umsg("Connct the new start state with the NFA start state using a lambda transition.");
  av.g.line(140, 230, 250, 230, {"arrow-end": "classic-wide-long", "stroke-width": 2});
  av.label(lambda, {left:180, top:195});
  av.step();
  av.umsg("Create a new Final state.");
  var fa2 = new av.ds.FA({left: 600, top: 0, width: 20, height: 600});
  var newF = fa2.addNode({value:"f", left: 0, top: 200});
  toggleFinal(fa2, newF);
  rFA.getFinals()[0].css({"border-style": "dotted"});
  av.step();
  av.umsg("Concet the final state for the NFA with the new finla state by a lambda transition.")
  av.g.line(485, 230, 600, 230, {"arrow-end": "classic-wide-long", "stroke-width": 2});
  av.label(lambda, {left:550, top:195});
  av.step();
  av.umsg("$r^*$ means that you can repeat the same regular expression zero or more times.");
  av.step();
  av.umsg("Repeating $r$ zero times means that you can go from the start state to the final state using a" + lambda + " transition");
  av.g.path('M '+ 140 + ',' + 230 + ' Q' + 370 + ',' 
        + 600 + ' ' + 600 + ',' + 235, {"arrow-end": "classic-wide-long", "stroke-width": 2});
  av.label(lambda, {left:370, top:400});
  av.step();
  av.umsg("Repeating $r$ zero times also means that you can go from the final state to the start state using a" + lambda + " transition");
  av.g.path('M '+ 600 + ',' + 225 + ' Q' + 370 + ',' 
        + 0 + ' ' + 140 + ',' + 225, {"arrow-end": "classic-wide-long", "stroke-width": 2});
  av.label(lambda, {left:370, top:70});
  fa.disableDragging();
  fa2.disableDragging();
  av.recorded();
  
});
