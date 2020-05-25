$(document).ready(function() {
"use strict";
var av_name = "NFA";
var av = new JSAV(av_name);
var Frames = PIFRAMES.init(av_name);
var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
	interpret = config.interpreter,
	code = config.code;
var goNext = false;

//Frame 1
av.umsg("Non-Deterministic Finite Automata (NFA) are very similar to a Deterministic Finite Acceptor (DFA). Lets look at the formal definition for the difference.");
av.displayInit();
//Frame 2
av.umsg(Frames.addQuestion("q0"));
av.step();
//Frame 3
av.umsg(Frames.addQuestion("q2"));
av.step();
//Frame 4
av.umsg(Frames.addQuestion("q3"));
av.step();
//Frame 5
av.umsg(Frames.addQuestion("q1"));
av.step();
//NFA with multi transition
var urllinkNFA="../../../AV/VisFormalLang/FA/Machines/NFAexample1.jff";
var linkNFA= new av.ds.FA({center:true , url:urllinkNFA});
//Frame 6
av.umsg("In the NFA below, there are two disjoint paths. <br /> Effectively giving us the union of two languages $L = \\{aa\\} \\cup \\{ab^nb \\mid n \\ge 0\\}$");
av.step();
//Frame 7
av.umsg(Frames.addQuestion("q4"));
av.step();
//Frame 8
av.umsg(Frames.addQuestion("q15"));
av.step();
linkNFA.hide();
//NFA with lambda
var urllinkNFAlambda="../../../AV/VisFormalLang/FA/Machines/NFAexample2.jff";
var linkNFAlambda= new av.ds.FA({center:true , url:urllinkNFAlambda});
//Frame 9
av.umsg("NFA also allows the use of $\\lambda$ symbol. Which is called a \"lambda transition\"");
av.step();
//Frame 10
av.umsg(Frames.addQuestion("q5"));
av.step();
//Frame 11
av.umsg(Frames.addQuestion("q6"));
av.step();
//Frame 12
av.umsg(Frames.addQuestion("q7"));
av.step();
//Frame 13
av.umsg(Frames.addQuestion("q8"));
av.step();
//Frame 14
av.umsg(Frames.addQuestion("q9"));
av.step();
//Frame 15
av.umsg(Frames.addQuestion("q23"));
av.step();
//Frame 16
av.umsg(Frames.addQuestion("q14"));
av.step();
//Frame 17
av.umsg("Correct! If 10 possible paths exist, and only one ends in a final state. The input NFA will ACCEPT. Ignoring all the failure paths.");
av.step();
//Frame 18
av.umsg(Frames.addQuestion("q12"));
av.step();
//Frame 19
av.umsg(Frames.addQuestion("q10"));
av.step();
//Frame 20
av.umsg(Frames.addQuestion("q111"));
av.step();
//Frame 21
av.umsg("Exactly, that is why we have NFAs. They are easier to solve any problem by finding an NFA than trying a DFA.");
av.step();
av.umsg("Completed.");
av.step();

av.recorded();
});
