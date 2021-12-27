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

  var av_name = "RegEx2NFAcatFS";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);
  
  // Frame 1
  av.umsg("<b>Part 3.</b> Next, we will define a construction for the NFA that can accept the RE $r \\cdot s$, given that we have NFAs that are equivalent to $r$ and $s$.");
  av.displayInit();

  // Frame 2
  av.umsg(Frames.addQuestion("concat"));
  av.step();

  // Frame 3
  av.umsg(Frames.addQuestion("setup"));
  av.step();

  // Frame 4
  av.umsg("We need to combine together two NFA schemas. One is equivalent to the RegEx $r$ and the other is equivalent to $s$.");
  var rFA = drawScheme(av, "r", 80, 0);
  var sFA = drawScheme(av, "s", 80, 230);
  av.step();

  // Frame 5
  av.umsg(Frames.addQuestion("start"));
  av.step();

  // Frame 6
  av.umsg(Frames.addQuestion("and"));
  var fa = new av.ds.FA({left: 0, top: 0, width: 50, height: 600});
  var newS = fa.addNode({value:"s", left: 10, top: 190});
  toggleInitial(fa, newS);
  av.step();

  // Frame 7
  av.umsg(Frames.addQuestion("startconnect"));
  av.step();

  // Frame 8
  av.umsg(Frames.addQuestion("lambda"));
  rFA.initial._initialMarker.hide();
  av.g.line(40, 215, 135, 85, {"arrow-end": "classic-wide-long", "stroke-width": 2});
  rFA.initial.css({"font-weight": "normal"});
  av.label(lambda, {left: 70, top: 80});
  av.step();

  // Frame 9
  av.umsg(Frames.addQuestion("connector"));
  sFA.initial._initialMarker.hide();
  sFA.initial.css({"font-weight": "normal"});
  av.g.line(350, 98, 145, 300, {"arrow-end": "classic-wide-long", "stroke-width": 2});
  av.label(lambda, {left: 200, top: 170});
  av.step();

  // Frame 10
  av.umsg(Frames.addQuestion("final"));
  sFA.getFinals()[0].css({"border-style": "dotted"});
  var fa2 = new av.ds.FA({left: 500, top: 0, width: 20, height: 600});
  var newF = fa2.addNode({value:"f", left: -40, top: 180});
  toggleFinal(fa2, newF);
  rFA.getFinals()[0].css({"border-style": "dotted"});
  av.step();

  // Frame 11
  av.umsg("Once the string is accepted by the NFA for $s$, this means that this string belongs to the language $L(r \\cdot s)$. The transition symbol is $\\lambda$.");
  av.g.line(365, 315, 460, 210, {"arrow-end": "classic-wide-long", "stroke-width": 2});
  av.label(lambda, {left: 420, top: 245});
  av.step();

  // Frame 12
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();
});  
