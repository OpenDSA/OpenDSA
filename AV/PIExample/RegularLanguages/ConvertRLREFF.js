$(document).ready(function() {
  "use strict";
  var av_name = "ConvertRLREFF";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);

  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
  interpret = config.interpreter, // get the interpreter
  code = config.code;             // get the code object

  //var separator =  av.g.path(["M", 350, 0, "v", 500].join(","));
  //separator.show();
  // Slide 1
  av.umsg("Since every regular expression has an NFA that implements it, this means that the regular expressions are a subset of the regular languages. The next question is: Does every regular language have a regular expression?");
  av.displayInit();
  // Slide 2
  av.umsg("$\\textbf {Theorem}$: Let L be regular. Then there exists an R.E. such that L=L(r).");
  av.step();
  // Slide 3
  av.umsg("Perhaps you thought it fairly intuitive to see that any regular expression can be implemented as a NFA, as described above. But for most of us, its not obvious that any NFA can be converted to a regular expression. This proof is rather difficult, and we are just going to give a sketch.")  
  av.step();
  // Slide 4
  av.umsg("$\\textbf {Proof Idea}$:<br> Use a process that removes states sucessively, generating equivalent generalized transition graphs (GTG) until only two states are left (the initial state and one final state), with the resulting regular expression as the transition. <br>This regular expression left as the sole transition is equivalent to the original NFA.");
  av.step();

  //frame 5
  av.umsg(Frames.addQuestion("q5"));
  av.step();
  //frame 6
  av.umsg(Frames.addQuestion("q6"));
  av.step();

  //frame 7
  av.umsg(Frames.addQuestion("q7"));
  av.step();
  //frame 8
  av.umsg(Frames.addQuestion("q8"));
  av.step();
  //frame 9
  av.umsg(Frames.addQuestion("q9"));
  av.step();
  //frame 10
  av.umsg("$\\textbf {Proof}$:<br> $L$ is regular $\\Rightarrow \\exists$ NFA $M$ such that $L=L(M)$.<br> $\\textbf {1}$ Assume $M$ has one final state, and $q_0 \\not\\in F$.<br>  $\\textbf {2}$ Convert $M$ to a complete GTG.<br> Let $r_{ij}$ stand for the label of the edge from $q_i$ to $q_j$.<br>$\\textbf {3}$ If the GTG has only two states, then it has this form:");
  var url = "../../../AV/VisFormalLang/Regular/Machines/RegExGTG.jff";
  var gtg = new av.ds.FA({top: 100, url: url});
  av.step();
  //frame 11
  av.umsg(Frames.addQuestion("q11"));
  av.step();
  //frame 12
  av.umsg(Frames.addQuestion("q12"));
  av.step();
  //frame 13
  av.umsg(Frames.addQuestion("q13"));
  av.step();
  //frame 14
  av.umsg(Frames.addQuestion("q14"));
  av.step();
  //frame 15
  av.umsg(Frames.addQuestion("q15"));
  av.step();
  //frame 16
  av.umsg("Exactly. Once this big loop ends, the machine may loop again on $qj$ to read zero or more $r_{ii}$, then go to $qj$ to read $r_{ij}$ ending at $qj$ with optional zero or more loop to read $r_{jj}$");
  av.step();
  //frame 17
  av.umsg("You can think of this GTG as the base case GTG. In other words, if we have a GTG with any number of states, we need to reduce it to be in this base shape. Then we know the RegEx for it");
  av.step();
  //frame 18
  av.umsg(Frames.addQuestion("q18"));
  av.step();
  //frame 19
  av.umsg("What happens if the GTG has three states? then it must have the following form:");
  gtg.hide();
  var url = "../../../AV/VisFormalLang/Regular/Machines/RegExGTG3s.jff";
  var gtg3 = new av.ds.FA({url: url});
  av.step();
  //frame 20
  av.umsg("We need to remove the state $q_k$ and its edges. But before that, we need to make some replacemetns to gurantee that the removal process will not affect our GTG");
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
  av.umsg(Frames.addQuestion("q24"));
  av.step();
  av.umsg("As we saw, after making these replacements, we can remove $qk$ without affecting the GTG.");
  av.step();
  //frame 25
  av.umsg("If the GTG has four or more states, pick any state $q_k$ that is not the start or the final state. It will be removed. For all $o\\neq k$,$p\\neq k$, replace $r_{op}$ with $r_{op}+r_{ok}r_{kk}^*r_{kp}$. When done, remove $q_k$ and all its edges. Continue eliminating states until only two states are left. Finish with step (3).")
  av.step();

  //frame 9
  av.umsg("[OPTIONAL] In each step, we can simplify regular expressions r and s with any of these rules that apply:<br> $r+r=r$ (OR a subset with itself is the same subset)<br> $s+r^∗s=r^∗s$ (OR a subset with a bigger subset is just the bigger subset)<br> $r+\\emptyset =r$ (OR a subset with the empty set is just the subset)<br> $r\\emptyset =\\emptyset$ (Intersect a subset with the empty set yields the empty set)<br> $\\emptyset^∗=\\{\\lambda \\}$ (Special case)<br> $r\\lambda =r$ (Traversing a R.E. and then doing a free transition is just the same R.E.) <br> $(\\lambda +r)^∗=r^∗$ (Taking a free transition adds nothing.)<br> $(\\lambda +r)r^∗=r^∗$ (Being able to do an option extra r adds nothing)");
  gtg3.hide();
  av.step();
  av.umsg("Let us see an example for an NFA with 3 states and the corresponding GTG with 2 states after removing the third state.")
  var url1 = "../../../AV/VisFormalLang/Regular/Machines/RegExCon1.jff";
  var url2 = "../../../AV/VisFormalLang/Regular/Machines/RegExCon2.jff";
  var x = new av.ds.FA({left: 0, top:50, url: url1});
  var y = new av.ds.FA({left: 0, top: 250, url: url2});
  av.step();
  
  av.umsg("You should convince yourself that, in this image, the lower GTG is a proper re-creation of the upper NFA. In other words, the R.E labeling the self-loop for the left state in the right machine is correctly characterizing all the ways that one can remain in state q0 of the left machine. Likewise, the R.E. labeling the edge from the left state to the right state in the machine on the right is correctly characterizing all the ways that one can go from q0 to q2 in the machine on the right.");
  av.step();
  av.umsg("We have now demonstrated that regular expressions are equivalent to DFAs. Meaning that given any regular expression, we have an algorithm to convert it to some DFA. And vice versa.");
  x.hide();
  y.hide();
  //frame 10

  av.recorded();
});