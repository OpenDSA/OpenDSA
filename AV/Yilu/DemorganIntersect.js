$(document).ready(function(){
    "use strict";
	
	//Slide 1    
    var av = new JSAV("DemorganIntersect");
    av.umsg("Display Demorgan Algorithm");
    //av.nodes();
    av.displayInit();

    //Slide 2
    var urlLinkStep1 = "../../../AV/Yilu/figure.jff";
    var figure1 = new av.ds.FA({center:true, url: urlLinkStep1, left: 10, top:0, height: 500, width: 500});
    var figure2 = new av.ds.FA({center:true, url: urlLinkStep1, left: 10, top:200, width: 500});
    av.umsg("Start with two machines");
	av.step();


	//Slide 3
	figure1=FiniteAutomaton.complement(av, figure1, {center:true, left: 10, top:0, width: 500});
	figure2=FiniteAutomaton.complement(av, figure2, {center:true, left: 10, top:200, width: 500});
	av.step();


	//Slide 4
	figure2.hide();
	figure1.hide();
	var combined = FiniteAutomaton.combine(av, figure1, figure2, {left: 10, top:0, height: 450, width: 750});
	av.step();


	//Slide5
	var start = combined.addNode();
	combined.removeInitial(combined.initial);
    combined.makeInitial(start);
    var newOneStart = figure1.nodes().indexOf(figure1.initial);
    var otherStart = figure2.nodes().indexOf(figure2.initial) + figure1.nodes().length;
    combined.addEdge(start, combined.nodes()[newOneStart] /*newNodes[newOneStates.length]*/, {weight: lambda});
    combined.addEdge(start, combined.nodes()[otherStart] /*newNodes[0]*/, {weight: lambda});
    combined.layout();
    av.step();

    //Slide 6
    combined.hide();
    var dfa = FiniteAutomaton.convertNFAtoDFA(av, combined, {top: 0, left: 10, width: 500, height: 150});
	av.step();

	//Slide 7
	var mytree = new av.ds.tree({width: 400, height: 340, editable: true, left: 550, top: 0});
  	var minm = new Minimizer();
  	var newGraphDimensions = {top: 320, left: 400, width: 400, height: 260};
  	var minimized = minm.minimizeDFA(av, dfa, mytree, newGraphDimensions);
	av.recorded();
	/*
	
	//Slide 3
	figure1.hide();
	var urlLinkStep2 = "../../../AV/Yilu/figure2.jff";
	var figure2 = new av.ds.FA({center:true, url: urlLinkStep2, width: 600, height:600});
	av.umsg("Take the union of the two complemented machines");
	av.step();
	
	//Slide 4
	figure2.hide();
	var urlLinkStep3 = "../../../AV/Yilu/figure3.jff";
	var figure3 = new av.ds.FA({center:true, url: urlLinkStep3, width: 600, height:600});
	av.umsg("Convert it to DFA");
	av.step();
	
	//Slide 5
	figure3.hide();
	var urlLinkStep4 = "../../../AV/Yilu/figure4.jff";
	var figure4 = new av.ds.FA({center:true, url: urlLinkStep4, width: 600, height:600});
	av.umsg("Minimize the DFA");
	av.step();
	
	//Slide 6
	figure4.hide();
	var urlLinkStep5 = "../../../AV/Yilu/figure5.jff";
	var figure5 = new av.ds.FA({center:true, url: urlLinkStep5, width: 600, height:600});
	av.umsg("Take the complement");
	av.step();
	av.recorded();
	*/
});