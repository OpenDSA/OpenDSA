$(document).ready(function () {
  "use strict";
  var av_name = "introNonRegularFS";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);

  // Frame 1
  av.umsg("How do we prove that a language is regular? We have a number of approaches in our toolbox.");
  av.displayInit();

  // Frame 2
  av.umsg(Frames.addQuestion("approaches"));
  av.step();

  // Frame 3
  av.umsg(Frames.addQuestion("finite"));
  av.step(); 
  
  // Frame 4
  av.umsg(Frames.addQuestion("infinite"));
  av.step();

  // Frame 5
  av.umsg(Frames.addQuestion("anbminfinite"));
  av.step();

  // Frame 6
  av.umsg(Frames.addQuestion("anbmregex"));
  av.step();

  // Frame 7
  av.umsg(Frames.addQuestion("anbninfinite"));
  av.step();

  // Frame 8
  av.umsg(Frames.addQuestion("anbnmemory"));
  av.step();

  // Frame 9
  av.umsg(Frames.addQuestion("dfamemory"));
  av.step();

  // Frame 10
  av.umsg("Since the number of states in a DFA or NFA is finite, the memory is finite. Further, while a program in a traditional programming language might have one integer (that conceptually at least stores an infinite number of values, even if that is not literally true), a DFA has no similar thing.");
  av.step();

  // Frame 11
  av.umsg(Frames.addQuestion("noNFA"));
  av.step();

  // Frame 12
  av.umsg(Frames.addQuestion("nonregular"));
  av.step();

  // Frame 13
  av.umsg("So, $L_2 = \\{a^nb^n | n > 0 \\}$ is nonregular. But Why? An intutive way to determine if a language is not regular is to ask yourself a single question. Does the language require any kind of memory?<br/><br/>If the answer is yes, then the languages is not regular. Unfortunately, while that is good intuition, it is not clear that we are right if we claim that a language requires memory to accept all of its strings. We need a more certain process for deciding this.");
  av.step();

  // Frame 14
  av.umsg("In this chapter we will answer a single question: How can we prove that a language is not regular? We will build some techniques for doing this. Unfortunately, we will find that we can't always prove a language to be either regular or nonregular. But we can for a lot of languages.");
  av.step();

  // Frame 15
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();
});
