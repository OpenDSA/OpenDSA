$(document).ready(function() {
  "use strict";
  var av_name = "ConvertRLREFS";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);

  // Frame 1
  av.umsg("Since every regular expression has an NFA that implements it, this means that the regular expressions are a subset of the regular languages. The next question is: Does every regular language have a regular expression?");
  av.displayInit();

  // Frame 2
  av.umsg("$\\textbf {Theorem}$: Let $L$ be regular. Then there exists a RegEx $r$ such that $L =L(r)$.");
  av.step();

  // Frame 3
  av.umsg("Perhaps you thought it fairly intuitive to see that any regular expression can be implemented as a NFA. But for most of us, going the other way is not at all obvious. The proof that any NFA can be converted to a regular expression is rather difficult, and we are just going to give a sketch.")  
  av.step();

  // Frame 4
  av.umsg("$\\textbf {Proof Idea}$:<br> Use a process that removes states sucessively, generating equivalent generalized transition graphs (GTG) until only two states are left (the initial state and one final state), with the resulting regular expression as the transition. <br>This regular expression left as the sole transition is equivalent to the original NFA.");
  av.step();

  // Frame 5
  av.umsg(Frames.addQuestion("GTG"));
  av.step();

  //frame 6
  av.umsg(Frames.addQuestion("complete"));
  av.step();

  //frame 7
  av.umsg(Frames.addQuestion("emptyset"));
  av.step();

  // Frame 8
  av.umsg(Frames.addQuestion("regular"));
  av.step();

  // Frame 9
  av.umsg(Frames.addQuestion("rji"));
  av.step();

  // Frame 10
  av.umsg("$\\textbf {Proof}$:<br>$L$ is regular $\\Rightarrow \\exists$ NFA $M$ such that $L=L(M)$.<br>$\\textbf {1}$ Assume $M$ has one final state, and that start state $s \\not\\in F$.<br>$\\textbf {2}$ Convert $M$ to a complete GTG.<br>Let $r_{ij}$ stand for the label of the edge from $q_i$ to $q_j$.<br>$\\textbf {3}$ If the GTG has only two states, then it has this form:");
  var url = "../../../AV/VisFormalLang/Regular/Machines/RegExGTG.jff";
  var gtg = new av.ds.FA({top: 100, url: url});
  av.step();

  // Frame 11
  av.umsg(Frames.addQuestion("rii"));
  av.step();

  // Frame 12
  av.umsg(Frames.addQuestion("rij"));
  av.step();

  // Frame 13
  av.umsg(Frames.addQuestion("rjj"));
  av.step();

  // Frame 14
  av.umsg(Frames.addQuestion("rjiagain"));
  av.step();

  // Frame 15
  av.umsg(Frames.addQuestion("repeats"));
  av.step();

  // Frame 16
  av.umsg("Once this big loop ends, the machine may loop again on $qi$ to read zero or more $r_{ii}$, then go to $qj$ to read $r_{ij}$, ending at $qj$ with an optional zero or more loops to read $r_{jj}$.");
  av.step();

  // Frame 17
  av.umsg("You can think of this as the base case GTG. In other words, if we have a GTG with any number of states, we need to reduce it to be in this base shape. Then we know the RegEx for it.");
  av.step();

  // Frame 18
  av.umsg(Frames.addQuestion("onefinal"));
  av.step();

  // Frame 19
  av.umsg("What happens if the GTG has three states? then it must have the following form:");
  gtg.hide();
  var url = "../../../AV/VisFormalLang/Regular/Machines/RegExGTG3s.jff";
  var gtg3 = new av.ds.FA({url: url, top: 50});
  av.step();

  // Frame 20
  av.umsg("To return to the base form with two states, We need to remove the state $q_k$ and its edges. But before that, we need to make some replacements so that removing $q_k$ will generate an equivalent GTG (by changing the labels appropriately).");
  av.step();

  // Frame 21
  av.umsg(Frames.addQuestion("clearqk1"));
  av.step();

  // Frame 22
  av.umsg(Frames.addQuestion("clearqk2"));
  av.step();

  // Frame 23
  av.umsg(Frames.addQuestion("clearqk3"));
  av.step();

  // Frame 24
  av.umsg(Frames.addQuestion("clearqk4"));
  av.step();

  // Frame 25
  av.umsg("After making these label replacements, we can remove $qk$ and have a two-state GTG for the same RegEx.");
  av.step();

  // Frame 26
  av.umsg("If the GTG has four or more states, pick any state $q_k$ that is not the start or the final state. It will be removed. For all $o\\neq k$,$p\\neq k$, replace $r_{op}$ with $r_{op}+r_{ok}r_{kk}^*r_{kp}$. When done, remove $q_k$ and all its edges. Continue eliminating states until only two states are left.")
  av.step();

  // Frame 27
  av.umsg("[OPTIONAL] In each step, we can simplify regular expressions r and s with any of the following rules that apply:<br> $r+r=r$ (OR a subset with itself is the same subset)<br> $s+r^∗s=r^∗s$ (OR a subset with a bigger subset is just the bigger subset)<br> $r+\\emptyset =r$ (OR a subset with the empty set is just the subset)<br> $r\\emptyset =\\emptyset$ (Intersect a subset with the empty set yields the empty set)<br> $\\emptyset^∗=\\{\\lambda \\}$ (Special case)<br> $r\\lambda =r$ (Traversing a RegEx and then doing a free transition is just the same RegEx)<br>$(\\lambda +r)^∗=r^∗$ (Taking a free transition adds nothing.)<br> $(\\lambda +r)r^∗=r^∗$ (Being able to do an optional extra r adds nothing to the star operator)");
  gtg3.hide();
  av.step();

  // Frame 28
  av.umsg("Here is an example for an NFA with 3 states and the corresponding GTG with 2 states after removing the third state.")
  var url1 = "../../../AV/VisFormalLang/Regular/Machines/RegExCon1.jff";
  var url2 = "../../../AV/VisFormalLang/Regular/Machines/RegExCon2.jff";
  var x = new av.ds.FA({left: 0, top:50, url: url1});
  var y = new av.ds.FA({left: 0, top: 250, url: url2});
  av.step();
  
  // Frame 29
  av.umsg("You should convince yourself that, in this image, the lower GTG is a proper re-creation of the upper NFA. In other words, the RegEx labeling the self-loop for the left state in the right machine is correctly characterizing all the ways that one can remain in state q0 of the left machine. Likewise, the RegEx labeling the edge from the left state to the right state in the machine on the right is correctly characterizing all the ways that one can go from q0 to q2 in the machine on the right.");
  av.step();

  // Frame 30
  av.umsg("We have now demonstrated that regular expressions are equivalent to DFAs. Meaning that given any regular expression, we have (the sketch for) an algorithm to convert it to some DFA. And vice versa.");
  x.hide();
  y.hide();
  av.step();

  // Frame 31
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();
});
