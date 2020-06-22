$(document).ready(function(){
    "use strict";

    var av_name = "SATProof";
    var av = new JSAV(av_name);


var Frames = PIFRAMES.init(av_name);
// Load the config object with interpreter and code created by odsaUtils.js
var config = ODSA.UTILS.loadConfig({av_name: av_name}),
interpret = config.interpreter, // get the interpreter
code = config.code;             // get the code object
var goNext = false;





//frame 1
av.umsg("To start the process of being able to prove problems are NP-complete, we need to prove just one problem <b>H</b> is NP-complete. After that, to show that any problem <b>X</b> is NP-hard, we just need to reduce <b>H</b> to <b>X</b>. When doing NP-completeness proofs, it is very important not to get this reduction backwards!");
av.displayInit();

//2
av.umsg("If we reduce candidate problem <b>X</b> to known hard problem <b>H</b>, this means that we use <b>H</b> as a step to solving <b>X</b>. All that means is that we have found a (known) hard way to solve <b>X</b>.<br><br> However, when we reduce known hard problem <b>H</b> to candidate problem <b>X</b>, that means we are using <b>X</b> as a step to solve <b>H</b>. And if we know that <b>H</b> is hard, that means <b>X</b> must also be hard (because if <b>X</b> were not hard, then neither would <b>H</b> be hard).");
av.step();

//3
av.umsg(Frames.addQuestion("q1"));
av.step();

//4
av.umsg(Frames.addQuestion("q2"));
av.step();

//5
av.umsg(Frames.addQuestion("q3"));
av.step();

//6
av.umsg("So a crucial first step to getting this whole theory off the ground is finding one problem that is NP-hard. The first proof that a problem is NP-hard (and because it is in NP, therefore NP-complete) was done by Stephen Cook. <br><br>For this feat, Cook won the first Turing award, which is the closest Computer Science equivalent to the Nobel Prize. The <q>grand-daddy</q> NP-complete problem that Cook used is called SATISFIABILITY (or SAT for short).");
av.step();

//7
av.umsg("A <i>Boolean expression</i> is comprised of Boolean variables combined using the operators AND (⋅), OR (+), and NOT (to negate Boolean variable x we write <i class = 'over'>x</i>). A <i>literal</i> is a Boolean variable or its negation. A <i>clause</i> is one or more literals OR'ed together.");
av.step();

//8
av.umsg("Let <b>E</b> be a Boolean expression over variables <b>x<sub>1</sub>,x<sub>2</sub>,...,x<sub>n</sub></b>. Then we define Conjunctive Normal Form (CNF) to be a Boolean expression written as a series of clauses that are AND'ed together. For example, <br><br><br><b>E = (x<sub>5</sub> + x<sub>7</sub> + <i class = 'over'>x</i><sub>8</sub> + x<sub>10</sub>)⋅(<i class = 'over'>x</i><sub>2</sub> + x<sub>3</sub>)⋅(x<sub>1</sub> + <i class = 'over'>x</i><sub>3</sub> + x<sub>6</sub>)</b> <br><br><br>is in CNF, and has three clauses. Now we can define the problem SAT.");
av.step();

//9
av.umsg("<b>Problem</b><br><br>SATISFIABILITY (SAT)<br><br><b>Input: </b>A Boolean expression <b>E</b> over variables x<sub>1</sub>,x<sub>2</sub>,... in Conjunctive Normal Form. <br><br> <b>Output: </b>YES if there is an assignment to the variables that makes <b>E</b> true, NO otherwise.");
av.step();

//10
av.umsg("Cook proved that SAT is NP-hard. Explaining Cook's proof is beyond the scope of this course. But we can briefly summarize it as follows. Any decision problem <b>F</b> can be recast as some language acceptance problem <b>L</b>: <br><br><b>F(I) = YES ⇔ L(I') = ACCEPT.</b><br><br>That is, if a decision problem <b>F</b> yields YES on input <b>I</b>, then there is a language <b>L</b> containing string <b>I′</b> where <b>I′</b> is some suitable transformation of input <b>I</b>. Conversely, if <b>F</b> would give answer NO for input <b>I</b>, then <b>I</b> 's transformed version <b>I′</b> is not in the language <b>L</b>.");
av.step();

//11
av.umsg(Frames.addQuestion("q4"));
av.step();

//12
av.umsg(Frames.addQuestion("q5"));
av.step();

//13
av.umsg("Turing machines are a simple model of computation for writing programs that are language acceptors. There is a <q>universal</q> Turing machine that can take input as a description for a Turing machine, and an input string, and return the execution of that machine on that string. <br><br>This Turing machine in turn can be cast as a Boolean expression such that the expression is satisfiable if and only if the Turing machine yields ACCEPT for that string.");
av.step();

//14
av.umsg(Frames.addQuestion("q6"));
av.step();

//15
av.umsg(" Cook used Turing machines in his proof because they are simple enough that he could develop this transformation of Turing machines to Boolean expressions, but rich enough to be able to compute any function that a regular computer can compute. ");
av.step();

//16
av.umsg("The significance of this transformation is that any decision problem that is performable by the Turing machine is transformable to SAT. Thus, SAT is NP-hard.");
av.step();

//17
av.umsg("To show that a decision problem <b>X</b> is NP-complete, we prove that <b>X</b> is in NP (normally easy, and normally done by giving a suitable polynomial-time, non-deterministic algorithm) and then prove that <b>X</b> is NP-hard. <br><br>To prove that <b>X</b> is NP-hard, we choose a known NP-complete problem, say <b>A</b>. We describe a polynomial-time transformation that takes an arbitrary instance <b>I</b> of <b>A</b> to an instance <b>I′</b> of <b>X</b>. We then describe a polynomial-time transformation from <b>SLN′</b> to <b>SLN</b> such that <b>SLN</b> is the solution for <b>I</b>.");
av.step();

//18
av.umsg(Frames.addQuestion("q7"));
av.step();

//19
av.umsg("The following modules show a number of known NP-complete problems, and also some proofs that they are NP-complete. The various proofs will link the problems together as shown here:");
var x=200;
var y=20;
var l=180;
var w=30;
var r= 10;
av.g.rect(x,y+0,l,w,r,{"fill":"Silver","opacity":"0.5"});
av.label("<b>Circuit-SAT</b>",{top:y-10,left:x+l/4});
av.g.line(x+l/2,y+w,x+l/2,y+75);
y+=75;
av.g.rect(x,y+0,l,w,r,{"fill":"Silver","opacity":"0.5"});
av.label("<b>SAT</b>",{top:y-10,left:x+2*l/5});
av.g.line(x+l/2,y+w,x+l/2,y+75);
y+=75;
av.g.rect(x,y+0,l,w,r,{"fill":"Silver","opacity":"0.5"});
av.label("<b>3-SAT</b>",{top:y-10,left:x+4*l/11});

var x2=x-150;
y+=100;
var x1 = x+150;
av.g.rect(x2,y+0,l,w,r,{"fill":"Silver","opacity":"0.5"});
av.label("<b>Clique</b>",{top:y-10,left:x2+l/3});
av.g.line(x+l/4,y-100+w,x2+l/2,y);
av.g.line(x+3*l/4,y-100+w,x1+l/2,y);
av.g.rect(x1,y+0,l,w,r,{"fill":"Silver","opacity":"0.5"});
av.label("<b>Hamiltonian Cycle</b>",{top:y-10,left:x1+l/12});
av.g.line(x2+l/2,y+w,x2+l/2,y+75);
av.g.line(x1+l/2,y+w,x1+l/2,y+75);
y+=75;
av.g.rect(x2,y+0,l,w,r,{"fill":"Silver","opacity":"0.5"});
av.label("<b>Independent Set</b>",{top:y-10,left:x2+l/8});
av.g.rect(x1,y+0,l,w,r,{"fill":"Silver","opacity":"0.5"});
av.label("<b>Traveling Salesman</b>",{top:y-10,left:x1+l/16});
av.g.line(x2+l/2,y+w,x2+l/2,y+75);
y+=75;
av.g.rect(x2,y+0,l,w,r,{"fill":"Silver","opacity":"0.5"});
av.label("<b>Vertex Cover</b>",{top:y-10,left:x2+l/5});
av.label("Figure 1: We will use this sequence of reductions for the NP Complete Proof",{top:y+50,left:0});
av.step();



av.recorded();
});
