$(document).ready(function(){
    "use strict";
	
	//Slide 1    
    var av = new JSAV("TestComplete");
    av.umsg("Display Demorgan Algorithm");
    //av.nodes();


    //Slide 2
    var urlLinkStep1 = "../../../AV/Yilu/incomplete.jff";
    var figure1 = new av.ds.FA({center:true, url: urlLinkStep1, left: 10, top:0, height: 500, width: 500});
    figure1.layout();
    av.umsg("Start with two machines");
	av.displayInit();

    figure1 = FiniteAutomaton.completeDFA(av, figure1);
    figure1.options = $.extend({layout: 'automatic'}, figure1.options);//figure1.options;
    /*this.options = $.extend({
      visible: true,
      nodegap: 40,
      autoresize: true,
      width: 400,
      height: 200,
      directed: true,
      center: true,
      arcoffset: 50,
      emptystring: String.fromCharCode(955)
    }, options);*/
    //console.log(figure1);
	av.step();

	figure1 = FiniteAutomaton.complement(av, figure1, {left: 10, top:0, height: 500, width: 500});
	av.recorded();
});