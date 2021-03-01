$(document).ready(function(){
    "use strict";
	
	//Slide 1    
    var av = new JSAV("TestComplete");
    av.umsg("Display Demorgan Algorithm");
    //av.nodes();
    av.displayInit();

    //Slide 2
    var urlLinkStep1 = "../../../AV/Yilu/incomplete.jff";
    var figure1 = new av.ds.FA({center:true, url: urlLinkStep1, left: 10, top:0, height: 500, width: 500});
    av.umsg("Start with two machines");
    figure1.layout();
	av.step();

    FiniteAutomaton.completeDFA(av, figure1);
    figure1.layout();
	av.step();

	 FiniteAutomaton.complement(av, figure1, {left: 10, top:0, height: 500, width: 500});
	av.recorded();
});