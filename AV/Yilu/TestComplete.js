$(document).ready(function(){
    "use strict";
	
	//Slide 1    
    var av = new JSAV("TestComplete");
    av.umsg("Display Demorgan Algorithm");
    //av.nodes();

    
    //Slide 2
    var urlLinkStep1 = "../../../AV/Yilu/incomplete.jff";
    var figure = new av.ds.FA({center:true, url: urlLinkStep1, left: 10, top:0, height: 500, width: 500});
    av.umsg("Start with two machines");
	  av.displayInit();

    figure = FiniteAutomaton.completeDFA(av, figure);
    //figure1.options;
	av.step();

	figure = FiniteAutomaton.complement(av, figure, {left: 10, top:0, height: 500, width: 500});
  av.step();

  var oldNodes = figure.nodes();
  for(var next = oldNodes.next(); next; next = oldNodes.next()){
    figure.removeNode(next);
  }
  var urlLink = "../../../AV/Yilu/figure.jff";
  var figure1 = new av.ds.FA({center:true, url: urlLink, left: 10, top:0, height: 500, width: 500});
  //var str = FiniteAutomaton.completeDFA(av, figure1);
  var figure2 = new av.ds.FA({center:true, url: urlLink, left: 10, top:200, width: 500});
  figure1.hide();
  figure2.hide();
  var minimized = FiniteAutomaton.intersect(av,figure1, figure2, {left: 10, top:0, height: 450, width: 750});
	av.recorded();
});