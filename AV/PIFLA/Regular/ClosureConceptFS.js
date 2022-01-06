$(document).ready(function () {
  "use strict";
  var av_name = "ClosureConceptFS";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);

  // Frame 1
  av.umsg("Let's do a quick review of the concept of set closure.");
  av.displayInit();

  // Frame 2
  av.umsg(Frames.addQuestion("add"));
  av.step();

  // Frame 3
  av.umsg(Frames.addQuestion("addclosed"));
  av.step();
  
  // Frame 4
  av.umsg(Frames.addQuestion("multiply"));
  av.step();

  // Frame 5
  av.umsg(Frames.addQuestion("multclosed"));
  av.step();

  // Frame 6
  av.umsg(Frames.addQuestion("subtract"));
  av.step();

  // Frame 7
  av.umsg(Frames.addQuestion("subnotclosed"));
  av.step();

  // Frame 8
  av.umsg(Frames.addQuestion("div"));
  av.step();

  // Frame 9
  av.umsg(Frames.addQuestion("generalize"));
  av.step();
  
  // Frame 10
  av.umsg(Frames.addQuestion("increment"));
  av.step();

  // Frame 11
  av.umsg(Frames.addQuestion("strings"));
  av.step();
  
  // Frame 12
  av.umsg(Frames.addQuestion("addstrings"));
  av.step();

  // Frame 13
  av.umsg(Frames.addQuestion("regular"));
  av.step();
  
  // Frame 14
  av.umsg("That might seem odd! The set of regular languages is a set of sets of strings! But that is perfectly normal for set theory. A set can be a collection of primative members (like numbers or strings), or it can be a set of sets. (It can even be a mix of sets and primitives, but we don't need to worry about that now.)");
  av.step();

  // Frame 15
  av.umsg("So, for the rest of the module, we will talk about operators that take in sets of strings (in particular, any regular languages), and whose result is a set of strings. The main question that we will want to answer is: Is the resulting set of strings also always a regular language, regardless of what regular language(s) are given to the operator?");
  av.step();
  
  // Frame 16
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();
});
