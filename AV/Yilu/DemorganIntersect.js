$(document).ready(function(){
    "use strict";
	
	//Slide 1    
    var av = new JSAV("DemorganIntersect");
    av.umsg("Display Demorgan Algorithm");
    av.displayInit();

    //Slide 2
    var urlLinkStep1 = "../../../AV/Yilu/figure1.jff";
    var figure1 = new av.ds.FA({center:true, url: urlLinkStep1, top: 50});
    av.umsg("There are two machines");
	av.step();

	
	//Slide 3
	figure1.hide();
	var urlLinkStep2 = "../../../AV/Yilu/figure2.jff";
	var figure2 = new av.ds.FA({center:true, url: urlLinkStep2, top: 50});
	av.umsg("Take complement of two machines and then the union");
	av.step();
	
	//Slide 4
	figure2.hide();
	var urlLinkStep3 = "../../../AV/Yilu/figure3.jff";
	var figure3 = new av.ds.FA({center:true, url: urlLinkStep3, top: 30});
	av.umsg("Convert to DFA");
	av.step();
	
	//Slide 5
	figure3.hide();
	var urlLinkStep4 = "../../../AV/Yilu/figure4.jff";
	var figure4 = new av.ds.FA({center:true, url: urlLinkStep4, top: 50});
	av.umsg("Minimize");
	av.step();
	
	//Slide 6
	figure4.hide();
	var urlLinkStep5 = "../../../AV/Yilu/figure5.jff";
	var figure5 = new av.ds.FA({center:true, url: urlLinkStep5, top: 50});
	av.umsg("Complement");
	av.step();
	av.recorded();
/*
	var av_name = "DemorganIntersect";
var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);

  // Frame 1
  av.umsg("Here we give a formal definition for Nondeterministic Finite Automata (NFA), and gain some understanding about their limitations.");
  av.displayInit();
  // Frame 7
  //NFA with multi transition
  var urllinkNFA = "../../../AV/OpenFLAP/machines/FA/NFAexample1.jff";
  var linkNFA = new av.ds.FA({center: true, url: urllinkNFA, top: 50});
  //av.umsg(Frames.addQuestion("nfaexamp"));
  av.step();
  
  // Frame 9
  av.umsg("The NFA accepts a string if <b>any</b> of the paths that it might take when processing that string ends in a final state. It does not matter that there are paths where the machine goes wrong (that is, ends up in a non-final state). What matters is that there is at least one way for the NFA to go right.");
  av.step();
  
  // Frame 10
  av.umsg("Nondeterminism gives us is a simple way to express the concept of 'or'. In this example, the machine effectively gives us the union of two languages: $L = \\{ab^n \\mid n > 0\\} \\cup \\{aa\\}$. In other words, the machine can accept strings that start with 'a' and follow the path to q1 (which then accepts one or more 'b'), or strings that start with 'a' and follow the path to q2 (which then accepts another 'a').");
  av.step();

  //Frame 11
  linkNFA.hide();
  //NFA with lambda
  var urllinkNFAlambda = "../../../AV/OpenFLAP/machines/FA/NFAexample2.jff";
  var linkNFAlambda = new av.ds.FA({center: true, url: urllinkNFAlambda, top: 30});
  av.umsg("You might have noticed that there is another difference in how the $\\delta$ function is defined for the NFA. In addition to the symbols of the alphabet, a transition is also permitted on the $\\lambda$ symbol. This is called a \"lambda transition\". Of course, in the input string there is no actual $\\lambda$ symbol.");
  av.step();

  // Frame 19
  av.umsg("Why use NFAs? One reason is that they can be easier to create or understand. For example, hopefully it is easy to see that this one accepts the union of two pretty simple languages. So, $L = \\{(ab)^n \\mid n>0\\} \\cup \\{a^nb \\mid n>0\\}$. While this language can also be accepted by a DFA, it might not be as simple to come up with the answer.");
  av.step();
  
  // Frame 20
  av.umsg("Another reason could be that NFAs allow us to define some languages that cannot be defined by any DFA. After all, nondeterminism and $\\lambda$ transitions seem like pretty powerful constructs. However, we are about to see that there is an algorithm that can convert any NFA into an equivalent DFA. Therefore, since any language that can be accepted by an NFA can also be accepted by a corresponding DFA, the set of languages accepted by NFAs cannot be greater than the set accepted by DFAs.");
  av.step();
  
  // Frame 21
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();
  */
});