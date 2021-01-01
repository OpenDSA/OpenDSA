/*global PIFRAMES */
/* Written by ?? and Cliff Shaffer */
$(document).ready(function() {
  "use strict";
  var av_name = "RegExRegLangFS";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);

  // Frame 1
  av.umsg("Recall that we define the term :term:`regular language` to mean the languages that are recognized by a DFA. And we know these are the same as the languages recognized by an NFA, because we know that every NFA can be converted to a DFA.<br/><br/>In this frameset, we will show the relationship between regular languages (and thus, DFAs and NFAs) with Regular Expressions.");
  av.displayInit();
  
  //frame 11
  av.umsg(Frames.addQuestion("q11"));
  var url = "../../../AV/VisFormalLang/Regular/Machines/phiRE.jff";
  var phiDFA = new av.ds.FA({url: url})
  av.step();
  //frame 12
  av.umsg(Frames.addQuestion("q12"));
  phiDFA.hide();
  var url = "../../../AV/VisFormalLang/Regular/Machines/lambdaRE.jff";
  var lambdaDFA = new av.ds.FA({url: url});
  av.step();
  //frame 13
  av.umsg(Frames.addQuestion("q13"));
  lambdaDFA.hide();
  var url = "../../../AV/VisFormalLang/Regular/Machines/aRE.jff";
  var aDFA = new av.ds.FA({url: url});
  av.step();
  //frame 14
  av.umsg("But what about the 'more interesting' regular expressions that are built from AND, OR, and concatenation? Do these all have matching NFAs?");
  aDFA.hide();
  av.step();
  //frame 15
  av.umsg("If we could find a way to 'simulate' each of these operations with an NFA, then we know that we can construct a machine for any R.E. This idea of 'simulation' is a standard approach to proving such things!");
  av.step();
  //frame 16
  av.umsg("Suppose that $r$ and $s$ are R.E. (By induction…) That means that there is an NFA for r and an NFA for s. To help us visualize such things, it helps if we can have a standard way to draw the idea of an arbitrary NFA.");
  av.step();
  //frame 17
  av.umsg(Frames.addQuestion("q17"));
  av.step();
  //frame 18
  av.umsg(Frames.addQuestion("q18"));
  var leftMargin = 200;
  var topMargin = 50;
  var fa = new av.ds.FA({left: leftMargin, top: topMargin, width: 300, height: 200});
  var startX = 50;
  var lambda = String.fromCharCode(955);
  var s = fa.addNode({value:"s", left: startX, top: 50});
  var n1 = fa.addNode({value:" ",left: 100 + startX, top: 0});
  var n2 = fa.addNode({value:" ",left: 100 + startX, top: 50});
  var n3 = fa.addNode({value:" ",left: 100 + startX, top: 100});
  toggleFinal(fa, n1);
  toggleFinal(fa, n2);
  toggleFinal(fa, n3);
  toggleInitial(fa, s);
  var e1 = fa.addEdge(s, n1, {weight:" "});
  e1.css({"stroke-dasharray": "."});
  var e2 = fa.addEdge(s, n2, {weight:" "});
  e2.css({"stroke-dasharray": "."});
  var e3 = fa.addEdge(s, n3, {weight:" "});
  e3.css({"stroke-dasharray": "."});
  av.step();
  //frame 19
  av.umsg(Frames.addQuestion("q19"));
  var f = fa.addNode({value:"f", left: 200 + startX, top: 50});
  toggleFinal(fa, f);
  av.step();
  //frame 20
  av.umsg(Frames.addQuestion("q20"));
  fa.addEdge(n1, f,{weight: lambda});
  fa.addEdge(n2, f,{weight: lambda});
  fa.addEdge(n3, f,{weight: lambda});
  av.step();
  //frame 21
  av.umsg(Frames.addQuestion("q21"));
  toggleFinal(fa, n1);
  toggleFinal(fa, n2);
  toggleFinal(fa, n3);
  av.step();
  
  //frame 22
  av.umsg("We can use this figure to represent the NFA that accepts the regular expression $r$");
  fa.css({outline: "1px black solid", border: "10px transparent solid;"});
  av.label("NFA that accepts $r$", {left: leftMargin + 40, top: 200});
  //frame 23
  av.umsg("Completed part 1. Now we have an NFA model that accepts a regular expression $r$.")
  av.recorded();
  });
