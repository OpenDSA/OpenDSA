/*global PIFRAMES */
/* Written by Eunoh Cho, Cliff Shaffer */
$(document).ready(function () {
  "use strict";
  var av_name = "RelationsFS";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);

  // Frame 1
  av.umsg("Here we will define a :term:`relation` on elements in a set, and catagorize various types of relations.");
  av.displayInit();
  
  // Frame 2
  av.umsg(Frames.addQuestion("tuple"));
  av.step();
  
  // Frame 3
  av.umsg(Frames.addQuestion("binary"));
  av.step();
  
  // Frame 4
  av.umsg(Frames.addQuestion("infix"));
  av.step();

  // Frame 5
  av.umsg(Frames.addQuestion("relation"));
  av.step();
  
  // Frame 6
  av.umsg("Notice that for a set with just 3 elements, there are 9 ordered pairs, any of which might be in a given relation. So there are a <b>lot</b> of possible relations. There are lots of times when we want to know something about the properties of a given relation. If a relation has the given property, this says something about which ordered pairs are or are not allowed into the relation.");
  av.step();

  // Frame 7
  av.umsg("Here are some standard classifications for relations.<br/>$R$ is :term:`reflexive` if $aRb$ for all $a \\in S$.<br/>$R$ is :term:`irreflexive` if $aRa$ is not true for all $a \\in S$.<br/>$R$ is :term:`symmetric` if whenever $aRb$, then $bRa$ for all $a, b \\in S$.<br/>$R$ is :term:`antisymmetric` if whenever $aRb$ and $bRa$, then $a=b$ for all $a, b \\in S$.<br/>$R$ is :term:`transitive` if whenever $aRb$ and $bRc$, then $aRc$ for all $a, b, c \\in S$.<br/><br/>The following slides will explore the significance to these catagories.");
  av.step();

  // Frame 8
  av.umsg(Frames.addQuestion("reflex"));
  av.step();
  
  // Frame 9
  av.umsg(Frames.addQuestion("irreflexleq"));
  av.step();
  
  // Frame 10
  av.umsg(Frames.addQuestion("irreflexle"));
  av.step();
  
  // Frame 11
  av.umsg(Frames.addQuestion("symmetric"));
  av.step();
  
  // Frame 12
  av.umsg(Frames.addQuestion("antisymmetric"));
  av.step();

  // Frame 13
  av.umsg("Here is an interesting fact: $=$ is both symmetric and antisymmetric! How can that be? Because there is no case where $b=a$ unless $b$ and $a$ are the same, so there is no situation where an 'interesting' ordered pair gets into the relation.");
  av.step();

  // Frame 14
  av.umsg(Frames.addQuestion("transitive"));
  av.step();

  // Frame 15
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();
});
