$(document).ready(function () {
  "use strict";
  var av_name = "MembershipProblemFF";
  var av = new JSAV(av_name,);
  var Frames = PIFRAMES.init(av_name);
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
      interpret = config.interpreter, // get the interpreter
      code = config.code;             // get the code object
  var goNext = false;

  //frame 1
  av.umsg("Membership problem is to determine if a string belongs to a language.")
  av.displayInit();
  
  //frame 2
  av.umsg(Frames.addQuestion("q2"));
  av.step();

  //frame 3
  av.umsg(Frames.addQuestion("q3"));
  av.step();

  //frame 4
  av.umsg("Formally, the membership problem can be defined as:<br/>Given CFG $G$ and string $w \\in \\Sigma^*$, is $w \\in L(G)$?");
  av.step();


  //frame 5
  av.umsg(Frames.addQuestion("q5"));
  av.step();

  //frame 6
  av.umsg(Frames.addQuestion("q6"));
  av.step();

  //frame 7
  av.umsg("$\\textbf{Exhaustive Search Algorithm}$: This approach is similar to the brute force algorithms so it is an inefficient way to determine if a string is $\\in L$. Exhaustive Search means an exhaustive search for all ways of expanding from the start symbol.");
  av.step();

  //frame 8
  av.umsg(Frames.addQuestion("q8"));
  av.step();

  //frame 9
  av.umsg(Frames.addQuestion("q9"));
  av.step();

  //frame 10
  av.umsg(Frames.addQuestion("q10"));
  av.step();

  //frame 11
  av.umsg("As we see, if the string is in the language, the search algorithm will find it. BUT, What happens if $w$ is not in $L(G)$?");
  av.step();

  //frame 12
  av.umsg("As we see, if the string is in the language, the search algorithm will find it. BUT, What happens if $w$ is not in $L(G)$?<br/> When do we stop the loop in the algorithm and know for sure that $w$ is not going to be derived?");
  av.step();

  //frame 13
  av.umsg(Frames.addQuestion("q13"));
  av.step();

  //frame 14
  av.umsg("This means that we may enter an infinty loop to determine that a string is not in the language.");
  av.step();

  //frame 15
  av.umsg("We want to consider special forms of context free grammars such that we can determine when strings are or are not in the language. It turns out to be easy take a context-free grammar and convert it into a special form that makes it easier to test membership.");
  av.step();

  //frame 16
  av.umsg(Frames.addQuestion("q16"));
  av.step();

  //frame 17
  av.umsg(Frames.addQuestion("q17"));
  av.step();

  //frame 18
  av.umsg(Frames.addQuestion("q18"));
  av.step();

  //frame 19
  av.umsg(Frames.addQuestion("q19"));
  av.step();

  //frame 20
  av.umsg(Frames.addQuestion("q20"));
  av.step();

  //frame 21
  av.umsg(Frames.addQuestion("q21"));
  av.step();

  //frame 22
  av.umsg(Frames.addQuestion("q22"));
  av.step();

  //frame 23
  av.umsg(Frames.addQuestion("q23"));
  av.step();

  //frame 24
  av.umsg("Next chapter, we will learn methods for taking a grammar and transforming it into an equivalent (or almost equivalent) grammar. We will see that some ways of writing a grammar for a language are better than others, in terms of our ability to write practical algorithms for solving the membership problem. For now, here is another form that will make membership testing easier");
  av.step();

  //frame 25
  av.umsg("Since the problem with the exhaustive algorithm is the grammar productions, some special grammar forms can lead to $n = |w|$ iterations to determine if a string $w \\in L(G)$ or not.<br/>This special form is called Simple grammar (or s-grammar)");
  av.step();

  //frame 26
  av.umsg("$\\textbf{Definition:}$ Simple grammar (or s-grammar) has all productions of the form:<br/>$A \\rightarrow ax$<br/>where $A\\in V$, $a\\ in T$, and $x \\in V^*$ AND any pair $(A,a)$ can occur in at most one rule");
  av.step();

  //frame 27
  av.umsg("$\\textbf{Definition:}$ Simple grammar (or s-grammar) has all productions of the form:<br/>$A \\rightarrow ax$<br/>where $A\\in V$, $a\\ in T$, and $x \\in V^*$ AND any pair $(A,a)$ can occur in at most one rule<br/>If you use the exhaustive search method to ask if $w\\in L(G)$, where $G$ is an s-grammar, the number of terminals increases with each step.");
  av.recorded();

});