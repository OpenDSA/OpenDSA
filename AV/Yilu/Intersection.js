$(document).ready(function(){
	"use strict";
	 
    var av = new JSAV("Intersection");
    
    //av.umsg("Another Intersection algorithm");
    //av.nodes();
    var url1 = "../../../AV/Yilu/int1.jff";
    var url2 = "../../../AV/Yilu/int2.jff";
    var figure1 = new av.ds.FA({center:true, url: url1, left: 10, top:0, width: 500});
    //var str = FiniteAutomaton.completeDFA(av, figure1);
    var figure2 = new av.ds.FA({center:true, url: url2, left: 10, top:200, width: 500});
    
    FiniteAutomaton.changeNodeName(figure2, 'p');

    av.displayInit();
    var matrix1 = FiniteAutomaton.findTable(av, figure1);
   	var matrix2 = FiniteAutomaton.findTable(av, figure2);
   	var alphabet = FiniteAutomaton.findAlphabet(figure1);

    var table1 = FiniteAutomaton.matrixFromRelation(figure1, matrix1, alphabet);
    var table2 = FiniteAutomaton.matrixFromRelation(figure2, matrix2, alphabet);
    

    var table1g = av.ds.matrix(table1, { left: 600, style: "table" });
    var table2g = av.ds.matrix(table2, { left: 600, top: 200, style:"table"});


	av.step();
    
	var rowNum = figure1.nodes().length * figure2.nodes().length;
	var table = FiniteAutomaton.emptyMatrix(alphabet, rowNum);
    
    var intersectionTable = av.ds.matrix(table, { left: 800, style:"table" });
    console.log(intersectionTable);
	console.log(table);

    var inter = new av.ds.FA({left: 0, top:20, height: 500, width: 500, layout: 'automatic'});

    FiniteAutomaton.intersectionFromTable(av, inter, figure1, figure2, matrix1, matrix2,table1g, table2g, alphabet, intersectionTable);
    var matrix = FiniteAutomaton.findTable(av, inter);
    
    inter.layout();
    av.recorded();
});