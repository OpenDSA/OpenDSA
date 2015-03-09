"use strict";
$(document).ready(function () {
	var av = new JSAV("GraphIntro3CON");


    //slide 1
    av.umsg("Here is a directed graph");

	//set up graph 
	var gTop = 10; 
	var gLeft = 100;
	var graph = av.ds.graph({top: gTop, left: gLeft, directed: true});

	var nodeOne = graph.addNode("0", {left: gLeft, top: gTop});
    var nodeTwo = graph.addNode("2", {left: gLeft + 100, top: gTop});
    var nodeThree = graph.addNode("4", {left: gLeft + 50, top: gTop + 50});
    var nodeFour = graph.addNode("1", {left: gLeft,  top: gTop + 100});
    var nodeFive =graph.addNode("3", {left: gLeft + 100, top: gTop + 100});

    graph.addEdge(nodeOne, nodeFour);
    graph.addEdge(nodeOne, nodeThree);
    graph.addEdge(nodeTwo, nodeThree);
    graph.addEdge(nodeFive, nodeTwo);
    graph.addEdge(nodeFour, nodeFive);
    graph.addEdge(nodeThree, nodeFour);   
    
    graph.layout();
    av.displayInit();

    //slide 2
    av.umsg("This is the adjacency marix representation of the directed graph")
    //set up matrix 
    var mTop = 10; 
    var mLeft = 500;
    var mat = av.ds.matrix([[, 1, , ,1], [ , , , 1, ,], [ , , , , 1], [ , , , 1, ,], [, , 1, , ,]], 
    	{style: "plain", top: mTop, left: mLeft});

    mat.css("matrixBorder");
    mat.layout();
    av.step();
   
    //slide 3 
    av.umsg("This is the adjacency list representation of the directed graph"); 
    mat.hide();
    graph.hide();
    graph = av.ds.graph({top: gTop, left: 30, directed: true});
    var nodeOne = graph.addNode("0", {left: gLeft, top: gTop});
    var nodeTwo = graph.addNode("2", {left: gLeft + 100, top: gTop});
    var nodeThree = graph.addNode("4", {left: gLeft + 50, top: gTop + 50});
    var nodeFour = graph.addNode("1", {left: gLeft,  top: gTop + 100});
    var nodeFive =graph.addNode("3", {left: gLeft + 100, top: gTop + 100});

    graph.addEdge(nodeOne, nodeFour);
    graph.addEdge(nodeOne, nodeThree);
    graph.addEdge(nodeTwo, nodeThree);
    graph.addEdge(nodeFive, nodeTwo);
    graph.addEdge(nodeFour, nodeFive);
    graph.addEdge(nodeThree, nodeFour);   
    
    graph.layout();

    //set up ADJEANCY LIST 
    var aTop = 10; 
    var aLeft = 350;

    var aList = av.ds.array([, , , , ,], {indexed: true, left: aLeft, top: aTop, layout: "vertical"});
    aList.layout();

    //set up linked list 
    var lTop =  15; 
    var lLeft = 450; 
    var list1 = av.ds.list({top: lTop, left: lLeft});

    list1.addFirst("1");
    list1.layout();
    list1.add(1, "4");
    list1.layout();

    //second linked list 
    lTop = 60; 
    var list2 = av.ds.list({top: lTop, left: lLeft});
    list2.addFirst("0");
    list2.add(1, "3");
    list2.add(2, "4");
    list2.layout();
    
    //third linked list
    lTop = 105;
    var list3 = av.ds.list({top: lTop, left: lLeft});
    list3.addFirst("3");
    list3.add(1, "4");
    list3.layout();

    //fourth linked list 
    lTop = 150; 
    var list4 = av.ds.list({top: lTop, left: lLeft});
    list4.addFirst("1");
    list4.add(1, "2");
    list4.layout();

    //fifth linked list 
    lTop = 195; 
    var list5 = av.ds.list({top: lTop, left: lLeft});
    list5.addFirst("0");
    list5.add(1, "1");
    list5.add(2, "2");
    list5.layout();

    //add lines connect array to list 
    
    var line = av.g.line( 395, 45, 440, 45, {"stroke-width": 3});
    line = av.g.line( 395, 90, 440, 90, {"stroke-width": 3});
    line = av.g.line( 395, 135, 440, 135, {"stroke-width": 3});
    line = av.g.line( 395, 180, 440, 180, {"stroke-width": 3});
    line = av.g.line( 395, 225, 440, 225, {"stroke-width": 3});
    

    av.recorded();



});