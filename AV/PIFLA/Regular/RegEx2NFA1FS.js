/*global PIFRAMES */
/* Written by ?? and Cliff Shaffer */
$(document).ready(function() {
  "use strict";
  var av_name = "RegEx2NFA1FS";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);

  // Frame 1
  av.umsg("<b>Part 1.</b> Recall that we define the term :term:`regular language` to mean the languages that are recognized by a DFA. And we know these are the same as the languages recognized by an NFA, because we know that every NFA can be converted to a DFA (and vice versa).<br/><br/>Now, we will show the relationship between regular languages (and thus, DFAs and NFAs) and Regular Expressions.");
  av.displayInit();
  
  // Frame 2
  av.umsg(Frames.addQuestion("nothing"));
  var url = "../../../AV/OpenFLAP/machines/Regular/phiRE.jff";
  var phiDFA = new av.ds.FA({url: url})
  av.step();

  // Frame 3
  av.umsg(Frames.addQuestion("lambda"));
  phiDFA.hide();
  url = "../../../AV/OpenFLAP/machines/Regular/lambdaRE.jff";
  var lambdaDFA = new av.ds.FA({url: url});
  av.step();

  // Frame 4
  av.umsg(Frames.addQuestion("a"));
  lambdaDFA.hide();
  url = "../../../AV/OpenFLAP/machines/Regular/aRE.jff";
  var aDFA = new av.ds.FA({url: url});
  av.step();

  // Frame 5
  av.umsg("But what about the 'more interesting' regular expressions that are built from AND, OR, and concatenation? Do these all have matching NFAs? If we could find a way to 'simulate' each of these operations with an NFA, then we know that we can construct a machine for any RE. This idea of 'simulation' is a standard approach to proving that one representation is no more powerful than another.");
  aDFA.hide();
  av.step();
  
  // Frame 6
  av.umsg("Suppose that $r$ and $s$ are RE. That means that there is an NFA for $r$ and an NFA for $s$. To help us visualize such things, it helps if we can have a standard way to draw the idea of an arbitrary NFA. In particular, since we will want to combine machines together, it will be much easier if we know that the machines that we combine have one start state and one final state.");
  av.step();
  
  // Frame 7
  av.umsg(Frames.addQuestion("onefinalq"));
  var leftMargin = 200;
  var topMargin = 50;
  var fa = new av.ds.FA({left: leftMargin, top: topMargin, width: 300, height: 200});
  var startX = 0;
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
  e1.css({"stroke": "red"});
  var e2 = fa.addEdge(s, n2, {weight:" "});
  e2.css({"stroke": "red"});
  var e3 = fa.addEdge(s, n3, {weight:" "});
  e3.css({"stroke": "red"});
  av.step();

  // Frame 8
  av.umsg(Frames.addQuestion("onefinala"));
  av.step();

  // Frame 9
  av.umsg(Frames.addQuestion("addfinal"));
  var f = fa.addNode({value:"f", left: 200 + startX, top: 50});
  toggleFinal(fa, f);
  av.step();

  // Frame 10
  av.umsg(Frames.addQuestion("addedges"));
  fa.addEdge(n1, f,{weight: lambda});
  fa.addEdge(n2, f,{weight: lambda});
  fa.addEdge(n3, f,{weight: lambda});
  av.step();

  // Frame 11
  av.umsg(Frames.addQuestion("equiv"));
  toggleFinal(fa, n1);
  toggleFinal(fa, n2);
  toggleFinal(fa, n3);
  av.step();
  
  // Frame 12
  av.umsg("Now we know that we can take any NFA and replace it with an equivalent NFA with only one final state. This will be easier to use for the next steps.<br/><br/>By the way, this construction is a good example of why the concept of the NFA is useful even if NFAs have no more 'power' than DFAs. This construction is easy to understand, but it only works because we used $\\lambda$ transitions, which DFAs do not have.");
  av.step();
  
  // Frame 13
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();
});
