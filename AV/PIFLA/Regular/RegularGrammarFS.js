/*global PIFRAMES */
/* Written by ?? and Cliff Shaffer */

// Title: Regular Grammars Introduction Frameset
// Author: Mostafa Mohammed; Cliff Shaffer
// Institution: Virginia Tech
// Features: Programmed Instruction
// Keyword: Regular Grammar; Regular Language
// Natural Language: en
// Programming Language: N/A
/* Description: Programmed Instruction Frameset presenting an introduction to regular grammars, their definitions and properties. */

$(document).ready(function() {
  "use strict";
  var av_name = "RegularGrammarFS";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);

  // Frame 1
  av.umsg("<b>Regular Grammars</b> are another way to define a regular language.");
  av.displayInit();

  // Frame 2
  av.umsg(Frames.addQuestion("RL"));
  av.step();

  // Frame 3
  av.umsg(Frames.addQuestion("RG"));
  av.step();

  // Frame 4
  av.umsg(Frames.addQuestion("variable"));
  av.step();

  // Frame 5
  av.umsg(Frames.addQuestion("terminal"));
  av.step();

  // Frame 6
  av.umsg(Frames.addQuestion("production"));
  av.step();

  // Frame 7
  av.umsg(Frames.addQuestion("start"));
  av.step();

  // Frame 8
  av.umsg(Frames.addQuestion("sets"));
  av.step();

  // Frame 9
  av.umsg("A grammar $G$ is defined as $G = (V, T, S, P)$ where<br>$V =$ variables (or non-terminals) $= A, B, \\ldots, Z$<br>$T =$ terminals $= a, b, \\ldots, z, 0, 1, \\ldots 9$<br>$P =$ productions (replacement rules)<br>$S =$ start symbol<br>$V, T$ and $P$ are finite sets.<br/><br/>Now that we have been reminded about the pieces of a grammar definition, let's start defining what makes a grammar regular.");
  av.step();

  // Frame 10
  av.umsg(Frames.addQuestion("linear"));
  av.step();

  // Frame 11
  av.umsg(Frames.addQuestion("right"));
  av.step();

  // Frame 12
  av.umsg(Frames.addQuestion("left"));
  av.step();

  // Frame 13
  av.umsg(Frames.addQuestion("regular"));
  av.step();

  // Frame 14
  av.umsg(Frames.addQuestion("Ex2"));
  av.step();

  // Frame 15
  av.umsg(Frames.addQuestion("Ex3"));
  av.step();

  // Frame 16
  av.umsg(Frames.addQuestion("Ex4"));
  av.step();

  // Frame 17
  av.umsg("We have now made a definition for a linear grammar. And we also defined a regular grammar as one that is <b>either</b> right-linear or left-linear. Perhaps this seems a bit restrictive to you, and maybe you can't be sure if a grammar with, for example, only left-linear rules is really general enough to describe all regular languages. And maybe its also not obvious to you that right-linear and left-linear grammars are equivalent. In the rest of this module, we will prove that both these claims are true.");
  av.step();
  
  // Frame 18
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();
});
