$(document).ready(function(){
	"use strict";
	 
    var av = new JSAV("Intersection");
    av.displayInit();
    av.umsg("Another Intersection algorithm");
    //av.nodes();
    var url1 = "../../../AV/Yilu/int1.jff";
    var url2 = "../../../AV/Yilu/int2.jff";
    var figure1 = new av.ds.FA({center:true, url: url1, left: 10, top:0, height: 500, width: 500});
    //var str = FiniteAutomaton.completeDFA(av, figure1);
    var figure2 = new av.ds.FA({center:true, url: url2, left: 10, top:200, width: 500});
	av.step();

    

    av.umsg("start with two machines");

   	var matrix1 = FiniteAutomaton.findTable(av, figure1);
   	var matrix2 = FiniteAutomaton.findTable(av, figure2);
   	var alphabet = FiniteAutomaton.findAlphabet(figure1);

    figure1.hide();
    figure2.hide();

    var inter = new av.ds.FA({center:true, left: 0, top:0, height: 500, width: 500, layout: 'automatic'});
    FiniteAutomaton.intersectionFromTable(inter, figure1, figure2, matrix1, matrix2, alphabet);
    inter.layout();
    av.recorded();
});