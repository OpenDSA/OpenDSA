/*global PIFRAMES */
/* Written by Mostafa Mohammed and Cliff Shaffer */
$(document).ready(function() {
  "use strict";

  function drawSchema(av, name, left, top){
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

  var av_name = "RegEx2NFAorFS";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);
  
  // Frame 1
  av.umsg("<b>Part 2.</b> In Part 1, we showed how to convert the base case REs ($\\lambda$ and any symbol from $\\Sigma$) to NFAs. And we showed that any NFA can be converted to an equivalent NFA with a single final state.<br/><br/>Now we will see how to convert more complex REs to an NFA.");
  av.displayInit();

  // Frame 2
  av.umsg("Recall that REs have three building operators: OR, concatenate, and star. By showing how any two REs in the form of NFAs can be OR'ed or concatendated, or how an RE can be made to repeat zero or more times, we show how any RE can be converted to an NFA.");
  av.step();

  // Frame 3
  av.umsg(Frames.addQuestion("blackbox"));
  var rFA = drawSchema(av, "r", 90, 10);
  av.step();

  // Frame 4
  av.umsg("We already know that there are NFAs for the RE base cases: $\\lambda$ and any symbol from $\\Sigma$. Inductively, we are going to assume that the schema is always equivalent to some RE. We are about to show how use any of the RE builder operations (OR, concatenation, and star) on NFAs. In this way, we show that any RE has an equivalent NFA.")
  av.step();

  // Frame 5
  av.umsg(Frames.addQuestion("ORLang"));
  av.step();

  // Frame 6
  av.umsg("To do this, we use two NFA schemas. One represents the RegEx $r$ and the other NFA represents $s$. We will use these two NFA schemas as building blocks to create the NFA that represents the RegEx $r+s$.");
  var sFA = drawSchema(av, "s", 90, 230);
  av.step();

  // Frame 7
  av.umsg(Frames.addQuestion("start"));
  var fa = new av.ds.FA({left: 0, top: 0, width: 50, height: 600});
  var newS = fa.addNode({value:"s", left: 20, top: 190});
  toggleInitial(fa, newS);
  sFA.initial._initialMarker.hide();
  sFA.initial.css({"font-weight": "normal"});
  rFA.initial._initialMarker.hide();
  rFA.initial.css({"font-weight": "normal"});
  av.step();

  // Frame 8
  av.umsg(Frames.addQuestion("whylambda"));
  av.g.line(50, 215, 140, 90, {"arrow-end": "classic-wide-long", "stroke-width": 2});
  av.label(lambda, {left: 80, top: 100});
  av.g.line(50, 230, 140, 310, {"arrow-end": "classic-wide-long", "stroke-width": 2});
  av.label(lambda, {left: 80, top: 270});
  av.step();

  // Frame 9
  av.umsg(Frames.addQuestion("singlefinal"));
  av.step();

  // Frame 10
  av.umsg(Frames.addQuestion("final"));
  var fa2 = new av.ds.FA({left: 460, top: 0, width: 20, height: 600});
  var newF = fa2.addNode({value:"f", left: 0, top: 190});
  toggleFinal(fa2, newF);
  rFA.getFinals()[0].css({"border-style": "dotted"});
  sFA.getFinals()[0].css({"border-style": "dotted"});
  av.step();

  // Frame 11
  av.umsg("If a string is accepted by either NFA, this means that this string belongs to the language $L(r+s)$.");
  av.g.line(375, 90, 465, 215, {"arrow-end": "classic-wide-long", "stroke-width": 2});
  av.label(lambda, {left: 430, top: 120});
  av.g.line(375, 310, 465, 230, {"arrow-end": "classic-wide-long", "stroke-width": 2});
  av.label(lambda, {left: 430, top: 260});
  av.step();

  // Frame 12
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();
});
