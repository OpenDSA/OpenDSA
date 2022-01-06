/*global PIFRAMES */
/* Written by Mostafa Mohammed and Cliff Shaffer */
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
    e1.css({"stroke": "red"});
    var e2 = fa.addEdge(s, n2, {weight:" "});
    e2.css({"stroke": "red"});
    var e3 = fa.addEdge(s, n3, {weight:" "});
    e3.css({"stroke": "red"});
    av.g.rect(left + 30, top + 10, 260, 150);
    av.label("NFA that accepts $" + name + "$", {left: left + 40, top: top +125});
    fa.disableDragging();
    return fa;
  }

  var av_name = "RegEx2NFAstarFS";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);

  // Frame 1
  av.umsg("<b>Part 4.</b> The last operator that we need to implement is the Kleene star ($*$) operator. The operator will concatenate the language with itself zero or more times.");
  av.displayInit();

  // Frame 2
  av.umsg(Frames.addQuestion("schema"));
  av.step();

  // Frame 3
  av.umsg(Frames.addQuestion("start"));
  var rFA = drawScheme(av, "r", 100, 50);
  av.step();

  // Frame 4
  av.umsg(Frames.addQuestion("connectstart"));
  var fa = new av.ds.FA({left: 30, top: 0, width: 50, height: 600});
  var newS = fa.addNode({value:"s", left: 10, top: 100});
  toggleInitial(fa, newS);
  rFA.initial._initialMarker.hide();
  rFA.initial.css({"font-weight": "normal"});
  av.step();

  // Frame 5
  av.umsg("Connect the new start state with the NFA start state using a lambda transition.");
  av.g.line(70, 130, 150, 130, {"arrow-end": "classic-wide-long", "stroke-width": 2});
  av.label(lambda, {left: 110, top: 95});
  av.step();

  // Frame 6
  av.umsg(Frames.addQuestion("final"));
  var fa2 = new av.ds.FA({left: 450, top: 0, width: 20, height: 600});
  var newF = fa2.addNode({value:"f", left: 0, top: 100});
  toggleFinal(fa2, newF);
  rFA.getFinals()[0].css({"border-style": "dotted"});
  av.step();

  // Frame 7
  av.umsg("Connect the final state for the NFA with the new final state by a lambda transition.");
  av.g.line(385, 132, 450, 132, {"arrow-end": "classic-wide-long", "stroke-width": 2});
  av.label(lambda, {left: 420, top: 95});
  av.step();

  // Frame 8
  av.umsg(Frames.addQuestion("zero"));
  av.step();

  // Frame 9
  av.umsg(Frames.addQuestion("more"));
  av.g.path('M '+ 55 + ',' + 145 + ' Q' + 300 + ','
            + 455 + ' ' + 470 + ',' + 145, {"arrow-end": "classic-wide-long", "stroke-width": 2});
  av.label(lambda, {left: 280, top: 265});
  av.step();

  // Frame 10
  av.umsg("Since we need to repeat $r$ as much as we want, we need to be able to go back to the start state using a $\\lambda$ transition. We used $\\lambda$ transitions because we need a free transitions between states.");
  av.g.path('M '+ 470 + ',' + 115 + ' Q' + 270 + ','
            + -100 + ' ' + 55 + ',' + 115, {"arrow-end": "classic-wide-long", "stroke-width": 2});
  av.label(lambda, {left: 260, top: 0});
  fa.disableDragging();
  fa2.disableDragging();
  av.step();
  
  // Frame 11
  av.umsg("This is the NFA that accepts $r^*$")
  av.step();

  // Frame 12
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();

});
