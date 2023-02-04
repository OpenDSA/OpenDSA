$(document).ready(function () {
  "use strict";
  var av_name = "MembershipFS";
  var av = new JSAV(av_name,);
  var Frames = PIFRAMES.init(av_name);
  // Load the config object with interpreter and code created by odsaUtils.js

  // Frame 1
  av.umsg("The most important question that we can ask about a grammar is whether a given string can be derived from it. This is know as the  <b>Membership Problem</b>.")
  av.displayInit();
  
  // Frame 2
  av.umsg(Frames.addQuestion("membership"));
  av.step();

  // Frame 3
  av.umsg(Frames.addQuestion("java"));
  av.step();

  // Frame 4
  av.umsg("Formally, the membership problem can be defined as:<br/>Given CFG $G$ and string $w \\in \\Sigma^*$, is $w \\in L(G)$?");
  av.step();


  // Frame 5
  av.umsg(Frames.addQuestion("evena"));
  av.step();

  // Frame 6
  av.umsg(Frames.addQuestion("abbab"));
  av.step();

  // Frame 7
  av.umsg("<b>Exhaustive Search</b> is a brute force algorithm that searches the entire space of possible derivation trees in some way to find the proper derivation for the given string. So it is an inefficient way to determine if a string is $\\in L$. Exhaustive Search means to search all ways of expanding from the start symbol until we either reach the string in question, or determine that it cannot be in the language.");
  av.step();

  // Frame 8
  av.umsg(Frames.addQuestion("onestep"));
  av.step();

  // Frame 9
  av.umsg(Frames.addQuestion("twostep"));
  av.step();

  // Frame 10
  av.umsg(Frames.addQuestion("numstep"));
  av.step();

  // Frame 11
  av.umsg("If the string is in the language, the search algorithm will find it. But what happens if $w$ is not in $L(G)$?<br/><br/>When do we stop the loop in the algorithm and know for sure that $w$ is not going to be derived?");
  av.step();

  // Frame 12
  av.umsg(Frames.addQuestion("lambda"));
  av.step();

  // Frame 13
  av.umsg("To avoid such infinite loops, we want to consider special forms of context free grammars such that we can always determine when strings are or are not in the language. It turns out to be easy to take a context-free grammar and convert it into a special form that makes it easier to test membership.");
  av.step();

  // Frame 14
  av.umsg(Frames.addQuestion("length"));
  av.step();

  // Frame 15
  av.umsg(Frames.addQuestion("terminals"));
  av.step();

  // Frame 16
  av.umsg(Frames.addQuestion("maxstep"));
  av.step();

  // Frame 17
  av.umsg(Frames.addQuestion("double"));
  av.step();

  // Frame 18
  av.umsg(Frames.addQuestion("goodgram"));
  av.step();

  // Frame 19
  av.umsg(Frames.addQuestion("baaba"));
  av.step();

  // Frame 20
  av.umsg(Frames.addQuestion("fail"));
  av.step();

  // Frame 21
  av.umsg("Soon we will learn methods for taking a grammar and transforming it into an equivalent (or almost equivalent) grammar. We will see that some ways of writing a grammar for a language are better than others, in terms of our ability to write practical algorithms for solving the membership problem. For now, here is another form that will make membership testing easier.");
  av.step();

  // Frame 22
  av.umsg("Since the problem with the exhaustive search algorithm is the grammar productions, some special grammar forms can lead to $n = |w|$ iterations to determine if a string $w \\in L(G)$ or not.<br/>This special form is called Simple grammar (or s-grammar).");
  av.step();

  // Frame 23
  av.umsg("$\\textbf{Definition:}$ Simple grammar (or s-grammar) has all productions of the form:<br/>$A \\rightarrow ax$<br/>where $A \\in V$, $a \\in T$, and $x \\in V^*$, AND any pair $(A,a)$ can occur in at most one rule.<br/><br/>If you use the exhaustive search method to ask if $w\\in L(G)$ when $G$ is an s-grammar, the number of terminals increases with each step. This limits the number of substition cycles needed to be $|w|$. Note that while this is far better, it is still often a lot of work.");
  av.step();

  // Frame 24
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();
});
