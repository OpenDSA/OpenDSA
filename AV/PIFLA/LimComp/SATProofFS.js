// Written by Yijing Wu and Cliff Shaffer
$(document).ready(function(){
  "use strict";

  var av_name = "SATProofFS";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);

  // Frame 1
  av.umsg("Recall that to prove a problem NP-complete, we must prove that it is in NP, and that it is NP-hard. To prove that it is in NP, we usually provide a NP algorithm. This is typically easy: Check in polynomial time that a guessed answer is correct. To prove that the problem is NP-hard, our normal process is to find some known NP-hard problem and reduce it to our problem.<br/><br/>Thus, to start the process of being able to prove problems are NP-complete, we need to know that some problem <b>H</b> is NP-complete. After that, every problem proven NP-complete gives us another problem available to use in future proofs of other problems.");
  av.displayInit();

  // Frame 2
  av.umsg(Frames.addQuestion("direction"));
  av.step();

  // Frame 3
  av.umsg(Frames.addQuestion("hard"));
  av.step();

  // Frame 4
  av.umsg("So a crucial first step to getting this whole theory off the ground is finding one problem that is NP-hard. The first proof that a problem is NP-hard (and because it is in NP, therefore NP-complete) was done by Stephen Cook. <br/><br/>For this feat, Cook won the first Turing award, which is the closest Computer Science equivalent to the Nobel Prize. The <q>grand-daddy</q> NP-complete problem that Cook used is called SATISFIABILITY (or SAT for short).");
  av.step();

  // Frame 5
  av.umsg("A <b>Boolean expression</b> is comprised of Boolean variables combined using the operators AND (⋅), OR (+), and NOT (to negate Boolean variable $x$ we write $\\bar{x}$). A <b>literal</b> is a Boolean variable or its negation. A <b>clause</b> is one or more literals OR'ed together.");
  av.step();

  // Frame 6
  av.umsg("Let <b>E</b> be a Boolean expression over variables <b>x<sub>1</sub>,x<sub>2</sub>,...,x<sub>n</sub></b>. Then we define Conjunctive Normal Form (CNF) to be a Boolean expression written as a series of clauses that are AND'ed together. For example, <br><br><br><b>E = (x<sub>5</sub> + x<sub>7</sub> + <i class = 'over'>x</i><sub>8</sub> + x<sub>10</sub>)⋅(<i class = 'over'>x</i><sub>2</sub> + x<sub>3</sub>)⋅(x<sub>1</sub> + <i class = 'over'>x</i><sub>3</sub> + x<sub>6</sub>)</b> <br><br><br>is in CNF, and has three clauses. Now we can define the problem SAT.");
  av.step();

  // Frame 7
  av.umsg("<b>Problem</b><br><br>SATISFIABILITY (SAT)<br><br><b>Input: </b>A Boolean expression <b>E</b> over variables x<sub>1</sub>,x<sub>2</sub>,... in Conjunctive Normal Form. <br><br> <b>Output: </b>YES if there is an assignment to the variables that makes <b>E</b> true, NO otherwise.");
  av.step();

  // Frame 8
  av.umsg(Frames.addQuestion("decision"));
  av.step();

  // Frame 9
  av.umsg(Frames.addQuestion("TM"));
  av.step();

  // Frame 10
  av.umsg("Cook used Turing machines in his proof because they are simple enough that he could develop this transformation of Turing machines to Boolean expressions, and rich enough to be able to compute any function that a regular computer can compute.<br/><br/>The significance of this transformation is that any decision problem that is performable by the Turing machine is transformable to SAT. Thus, SAT is NP-hard.");
  av.step();

  // Frame 11
  av.umsg(Frames.addQuestion("q7"));
  av.step();

  // Frame 12
  av.umsg("Here are several known NP-complete problems. They are linked to show the most typical reductions used to prove the problem NP-complete.");
  var x=200;
  var y=20;
  var l=180;
  var w=30;
  var r= 10;
  av.g.rect(x,y+0,l,w,r,{"fill":"Silver"});
  av.label("<b>Circuit-SAT</b>",{top:y-10,left:x+l/4});
  av.g.line(x+l/2,y+w,x+l/2,y+75);
  y+=75;
  av.g.rect(x,y+0,l,w,r,{"fill":"Silver"});
  av.label("<b>SAT</b>",{top:y-10,left:x+2*l/5});
  av.g.line(x+l/2,y+w,x+l/2,y+75);
  y+=75;
  av.g.rect(x,y+0,l,w,r,{"fill":"Silver"});
  av.label("<b>3-SAT</b>",{top:y-10,left:x+4*l/11});

  var x2=x-150;
  y+=100;
  var x1 = x+150;
  av.g.rect(x2,y+0,l,w,r,{"fill":"Silver"});
  av.label("<b>Clique</b>",{top:y-10,left:x2+l/3});
  av.g.line(x+l/4,y-100+w,x2+l/2,y);
  av.g.line(x+3*l/4,y-100+w,x1+l/2,y);
  av.g.rect(x1,y+0,l,w,r,{"fill":"Silver"});
  av.label("<b>Hamiltonian Cycle</b>",{top:y-10,left:x1+l/12});
  av.g.line(x2+l/2,y+w,x2+l/2,y+75);
  av.g.line(x1+l/2,y+w,x1+l/2,y+75);
  y+=75;
  av.g.rect(x2,y+0,l,w,r,{"fill":"Silver"});
  av.label("<b>Independent Set</b>",{top:y-10,left:x2+l/8});
  av.g.rect(x1,y+0,l,w,r,{"fill":"Silver"});
  av.label("<b>Traveling Salesman</b>",{top:y-10,left:x1+l/16});
  av.g.line(x2+l/2,y+w,x2+l/2,y+75);
  y+=75;
  av.g.rect(x2,y+0,l,w,r,{"fill":"Silver"});
  av.label("<b>Vertex Cover</b>",{top:y-10,left:x2+l/5});
  av.step();

  // Frame 13
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();
});
