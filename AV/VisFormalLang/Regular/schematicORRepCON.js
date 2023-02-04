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

  var av_name = "schematicORRepCON";
  var av = new JSAV(av_name);

  // Slide 1
  av.umsg("Suppose that we have a reqular expression $r+s$.");
  av.displayInit();

  // Slide 2
  av.umsg("First, suppose that this NFA accepts $r$.");
  var rFA = drawScheme(av, "r", 200, 0);
  av.step();

  // Slide 3
  av.umsg("Suppose also that this is the NFA that accepts $s$.");
  var sFA = drawScheme(av, "s", 200, 250);
  av.step();

  // Slide 4
  av.umsg("The first step now is to create a new start state.");
  var fa = new av.ds.FA({left: 50, top: 0, width: 50, height: 600});
  var newS = fa.addNode({value:"s", left: 10, top: 200});
  toggleInitial(fa, newS);
  sFA.initial._initialMarker.hide();
  sFA.initial.css({"font-weight": "normal"});
  rFA.initial._initialMarker.hide();
  rFA.initial.css({"font-weight": "normal"});
  av.step();

  // Slide 5
  av.umsg("Conncet the new start state with the start state for each NFA using labmda transitions.");
  av.g.line(90, 235, 255, 325, {"arrow-end": "classic-wide-long", "stroke-width": 2});
  av.label(lambda, {left: 170, top: 275});
  av.g.line(90, 225, 255, 85, {"arrow-end": "classic-wide-long", "stroke-width": 2});
  av.label(lambda, {left: 170, top: 140});
  av.step();

  // Slide 6
  av.umsg("Then create a new final state.");
  var fa2 = new av.ds.FA({left: 650, top: 0, width: 20, height: 600});
  var newF = fa2.addNode({value:"f", left: 0, top: 200});
  toggleFinal(fa2, newF);
  rFA.getFinals()[0].css({"border-style": "dotted"});
  sFA.getFinals()[0].css({"border-style": "dotted"});
  av.step();

  // Slide 7
  av.umsg("Connect the old final states to the new final state with lambda transitions.");
  av.g.line(485, 330, 655, 235, {"arrow-end": "classic-wide-long", "stroke-width": 2});
  av.label(lambda, {left: 580, top: 160});
  av.g.line(485, 90, 655, 225, {"arrow-end": "classic-wide-long", "stroke-width": 2});
  av.label(lambda, {left: 580, top: 260});
  av.step();

  // Slide 8
  av.umsg("The resulting NFA accepts $r + s$.");
  fa.disableDragging();
  fa2.disableDragging();
  av.recorded();
});
