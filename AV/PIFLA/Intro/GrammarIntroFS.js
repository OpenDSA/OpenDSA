/*global PIFRAMES */
/* Written by Eunoh Cho, Mostafa Mohammed, Cliff Shaffer */
$(document).ready(function() {
  "use strict";
  var av_name = "GrammarIntroFS";
  var av = new JSAV(av_name);

  /**<sentence> → <subject><verb><d.o.>
     <subject> → <noun> | <article><noun>
     <verb> → hit | ran | ate
     <d.o.> → <article><noun> | <noun>
     <noun> → Fritz | ball
     <article>→ the | an | a
  */

  var Frames = PIFRAMES.init(av_name);
  var grammar = av.label("$\\begin{eqnarray*}" +
                         "\\lt sentence\\gt&\\rightarrow&\\lt subject\\gt\\lt verb\\gt\\lt d.o.\\gt\\\\" +
                         "\\lt subject\\gt&\\rightarrow&\\lt noun\\gt | \\lt article\\gt\\lt noun\\gt\\\\" +
                         "\\lt verb\\gt&\\rightarrow&\\ \\mbox{hit}\\ |\\ \\mbox{ran}\\ |\\ \\mbox{ate}\\\\" +
                         "\\lt d.o. \\gt&\\rightarrow&\\lt article \\gt\\lt noun\\gt | \\lt noun\\gt\\\\" +
                         "\\lt noun \\gt&\\rightarrow&\\ \\mbox{Fritz}\\ |\\ \\mbox{ball}\\\\" +
                         "\\lt article\\gt&\\rightarrow&\\ \\mbox{the}\\ |\\ \\mbox{an}\\ |\\ \\mbox{a}" +
                         "\\end{eqnarray*}$",
                         {top: 30, left: 100}).hide();

  // Frame 1
  av.umsg("We'll start with a grammar you can maybe relate to.");
  av.displayInit();

  // Frame 2
  grammar.show();
  av.umsg(Frames.addQuestion("grammar"));
  av.step();

  // Frame 3
  av.umsg(Frames.addQuestion("terminal"));
  av.step();

  // Frame 4
  av.umsg(Frames.addQuestion("nonterminal"));
  av.step();

  // Frame 5
  av.umsg(Frames.addQuestion("production"));
  av.step();

  // Frame 6
  av.umsg(Frames.addQuestion("start"));
  av.step();

  // Frame 7
  av.umsg(Frames.addQuestion("sentence"));
  av.step();

  // Frame 8
  av.umsg(Frames.addQuestion("first"));
  av.step();

  // Frame 9
  av.umsg(Frames.addQuestion("Fritz"));
  av.step();

  // Frame 10
  av.umsg(Frames.addQuestion("verb"));
  av.step();

  // Frame 11
  av.umsg(Frames.addQuestion("do"));
  av.step();

  // Frame 12
  av.umsg(Frames.addQuestion("article"));
  av.step();

  // Frame 13
  av.umsg(Frames.addQuestion("noun"));
  av.step();

  // Frame 14
  av.umsg(Frames.addQuestion("bad"));
  av.step();

  // Frame 15
  av.umsg(Frames.addQuestion("syntax"));
  av.step();

  // Frame 16
  av.umsg("Throughout this course, we will need to talk about many things like different types of grammars and different types of computing machines. In each case, we will want to be very precise about what they can do. And in order to talk precisely about what they can do, we need to be very precise about what they are. So, we will often create a mathematical definition that precisely describes the thing in question.");
  av.step();

  // Frame 17
  av.umsg("A good mathematical definition for something identifies those parts that are necessary and ignores those parts that are not. Think for a moment before going on: If you want to describe a grammar precisely, then what do you need to know about it?. Take a look at the grammar below, and think about what you need to know to define and use it. Obviously, part of the defintion for this grammar is its productions. What else do we need?");
  av.step();

  // Frame 18
  av.umsg(Frames.addQuestion("leftside"));
  av.step();

  // Frame 19
  av.umsg(Frames.addQuestion("rightside"));
  av.step();

  // Frame 20
  av.umsg("$W⇒z$ means that W derives string z, $W⇒^∗z$ means that W derives string z in 0 or more steps, $W⇒^+z$ means that W derives string z in 1 or more steps.");
  grammar.hide();
  av.step();

  // Frame 21
  av.umsg("$L(G)$ represents the language described by the some grammar $G$. The formal definition for $L(G)$ is: $L(G) = \\{w \\in T{}^{*} \\mid S \\stackrel{*}{\\Rightarrow} w\\}$.");
  av.step();

  // Frame 22
  av.umsg("Now, try to describe this in words: What is the language of the grammar? Answer: It is all strings formed from the set of terminals ($T^∗$ is all possible strings over $T$), such that if you start with $S$ (the start symbol for the grammar), then you can derive the string.");
  av.step();

  // Frame 23
  av.umsg(Frames.addQuestion("parts"));
  av.step();

  // Frame 24
  av.umsg(Frames.addQuestion("parts2"));
  av.step();

  // Frame 25
  av.umsg(Frames.addQuestion("LG"));
  av.step();

  // Frame 26
  av.umsg(Frames.addQuestion("G"));
  av.step();

  // Frame 27
  av.umsg(Frames.addQuestion("LGlist"));
  av.step();

  // Frame 28
  av.umsg(Frames.addQuestion("whichrules"));
  av.step();

  // Frame 29
  av.umsg(Frames.addQuestion("pickstrings"));
  av.step();

  // Frame 30
  av.umsg(Frames.addQuestion("whatlang"));
  av.step(); 

  // Frame 31
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();
});
