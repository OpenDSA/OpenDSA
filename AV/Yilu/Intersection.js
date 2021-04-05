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
    
    console.log(figure2);
    for (i in figure2._nodes) {
      figure2._nodes[i].value('p' + i);
      figure2._nodes[i].options['value'] = 'p' + i;
      //next.stateLabel('p'+num);
    }
    //figure2.updateNodes();
    //console.log(figure2.nodes());
    av.displayInit();
    var matrix1 = FiniteAutomaton.findTable(av, figure1);
   	var matrix2 = FiniteAutomaton.findTable(av, figure2);
   	var alphabet = FiniteAutomaton.findAlphabet(figure1);

    var table1 = [];
    var table2 = [];
    var row1 = [];
    row1.push(' ');
    for (var row in matrix1){
    	var tableRow = [];
    	tableRow.push(figure1.nodes()[row].options['value']);
    	for (var a in alphabet){
    		if (row == 0){
    			row1.push(alphabet[a]);
    		}
    		var ind = matrix1[row][alphabet[a]];
    		//console.log(ind);
    		var aNode = figure1.nodes()[ind].options['value'];
    		tableRow.push(aNode);
    	}
    	if (row == 0){
    		table1.push(row1);
    	}
    	table1.push(tableRow);
    }

    row1 = [];
    row1.push(' ');
    for (var row in matrix2){
    	var tableRow = [];
    	tableRow.push(figure2.nodes()[row].options['value']);
    	for (var a in alphabet){
    		if (row == 0){
    			row1.push(alphabet[a]);
    		}
    		var ind = matrix2[row][alphabet[a]];
    		//console.log(ind);
    		var aNode = figure2.nodes()[ind].options['value'];
    		tableRow.push(aNode);
    	}
    	if (row == 0){
    		table2.push(row1);
    	}
    	table2.push(tableRow);
    }

    var table1g = av.ds.matrix(table1, { left: 500, style: "table" });
    var table2g = av.ds.matrix(table2, { left: 500, top: 200, style:"table"});


	av.step();
    
	var rowNum = figure1.nodes().length * figure2.nodes().length;
	var table = [];
    row1 = [];
    row1.push(' ');
    //var row = 0;
    for (var row = 0;row<rowNum;row+=1){
    	var tableRow = [];
    	tableRow.push('');
    	for (var a in alphabet){
    		if (row == 0){
    			row1.push(alphabet[a]);
    		}
    		//var ind = matrix[row][alphabet[a]];
    		//console.log(ind);
    		var aNode = '';
    		tableRow.push(aNode);
    	}
    	if (row == 0){
    		table.push(row1);
    	}
    	table.push(tableRow);
    }
    //console.log(table);
    var intersectionTable = av.ds.matrix(table, { left: 700, style:"table" });
    console.log(intersectionTable);
	console.log(table);

    //av.step();

   	

    //figure1.hide();
    //figure2.hide();
    //table1g.hide();
    //table2g.hide();

    var inter = new av.ds.FA({left: 0, top:20, height: 300, layout: 'automatic'});

    FiniteAutomaton.intersectionFromTable(av, inter, figure1, figure2, matrix1, matrix2,table1g, table2g, alphabet, intersectionTable);
    var matrix = FiniteAutomaton.findTable(av, inter);
    //console.log(matrix);

    /*
    var table = [];
    row1 = [];
    row1.push(' ');
    for (var row in matrix){
    	var tableRow = [];
    	tableRow.push(inter.nodes()[row].options['value']);
    	for (var a in alphabet){
    		if (row == 0){
    			row1.push(alphabet[a]);
    		}
    		var ind = matrix[row][alphabet[a]];
    		//console.log(ind);
    		var aNode = inter.nodes()[ind].options['value'];
    		tableRow.push(aNode);
    	}
    	if (row == 0){
    		table.push(row1);
    	}
    	table.push(tableRow);
    }
    //console.log(table);
    var intersectionTable = av.ds.matrix(table, { left: 500, autoresize: true, style:"table" });
    console.log(intersectionTable);
*/
    inter.layout();
    av.recorded();
});