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
    //var str = FiniteAutomaton.completeDFA(av, figure1);
    var figure2 = new av.ds.FA({center:true, url: urlLinkStep1, left: 10, top:200, width: 500});
    av.umsg("Start with two machines");
	av.step();


	//Slide 3
	figure1=FiniteAutomaton.complement(av, figure1, {center:true, left: 10, top:0, width: 500});
	figure2=FiniteAutomaton.complement(av, figure2, {center:true, left: 10, top:200, width: 500});
	av.umsg("Take complement of the two machines");
	av.step();


	//Slide 4
	av.umsg("combine the two machines in one window")
	var combinedResult = FiniteAutomaton.combine(av, figure1, figure2, {left: 10, top:0, height: 450, width: 750});
	//console.log(combinedResult);
	var combined = combinedResult['graph'];
	/*
	var nodes = figure1.nodes();
	
	for (var next = nodes.next(); next; next = nodes.next()) {
      figure1.removeNode(next);
    }
    nodes = figure2.nodes();
    for (var next = nodes.next(); next; next = nodes.next()) {
      figure2.removeNode(next);
    }
    */
    figure1.hide();
    figure2.hide();
    combined.layout();
    av.step();


    //Slide5
    av.umsg("take union of the two machines")
    FiniteAutomaton.union(combined, combinedResult['start'], combinedResult['end']);
    av.step();

	//Slide5
	/*
	var start = combined.addNode();
	combined.removeInitial(combined.initial);
    combined.makeInitial(start);
    combined.addEdge(start, combined.nodes()[0] , {weight: lambda});
    combined.addEdge(start, combined.nodes()[3] , {weight: lambda});
    combined.layout();
    av.umsg("Combine the two machines into one machine and take the union of them");
    av.step();
	*/
	
    //Slide 6
    combined.hide();
    var dfa = FiniteAutomaton.convertNFAtoDFA(av, combined, {top: 0, left: 10, width: 500, height: 150});
    dfa.layout();
    av.umsg("Convert the NFA machine to DFA")
  	av.step();
  	
  	//Slide 7
  	var mytree = new av.ds.tree({width: 400, height: 340, editable: true, left: 550, top: 0});
  	mytree.hide();
  	dfa.hide();
  	var minm = new Minimizer();
  	var minized = minm.minimizeDFA(av, dfa, mytree, {left: 10, top:0, height: 450, width: 750});
  	minized.layout();
  	av.umsg("Then, minimize the DFA");
  	av.step();


  	//minDFA.jsav = av;
  	//Slide 8
  	//s = minized.initial;
  	minized = FiniteAutomaton.complement(av, minized, {left: 10, top:0, height: 450, width: 750});
    //minized.makeInitial(s);
  	av.umsg("Finaly, take the complement of the minimized DFA so we will get the intersection");
    
  	av.recorded();
});