"use strict";
$(document).read(function () {
	var av = new JSAV("GraphIntroCON", {"animationMode" : "none"});
	var gTop = 10;
    var gLeft = 350;
    var gRight = 425;

    var graphOne = av.ds.graph({left: gLeft, right: gRight, top: gTop, directed: false});

    var nodeOne = graphOne.addNode(" ", {left: gLeft, top: gTop});
    var nodeTwo = graphOne.addNode(" ", {left: gLeft + 50, top: gTop});
    var nodeThree = graphOne.addNode(" ", {left: gLeft + 25, top: gTop + 25});
    var nodeFour = graphOne.addNode(" ", {left: gLeft,  top: gTop + 50});
    var nodeFive =graphOne.addNode(" ", {left: gLeft + 50, top: gTop + 50});

    graphOne.addEdge(nodeOne, nodeFour);
    graphOne.addEdge(nodeOne, nodeThree);
    graphOne.addEdge(nodeTwo, nodeThree);
    graphOne.addEdge(nodeTwo, nodeFive);
    grapOne.addEdge(nodeFour, nodeFive);

    var alabel = av.label("(a)", {left: gtLeft + 40, top: 115}).show;
    graphOne.layout();


    gLeft = 450;
    gRight = 525;
    var graphTwo = av.ds.graph({left: gLeft, right: gRight, top: gTop, directed: true});

    nodeOne = graphTwo.addNode(" ", {left: gLeft, top: gTop});
    nodeTwo = graphTwo.addNode(" ", {left: gLeft + 50, top: gTop});
    nodeThree = graphTwo.addNode(" ", {left: gLeft + 25, top: gTop + 25});
    nodeFour = graphTwo.addNode(" ", {left: gLeft,  top: gTop + 50});
    nodeFive =graphTwo.addNode(" ", {left: gLeft + 50, top: gTop + 50});

    graphTwo.addEdge(nodeOne, nodeFour);
    graphTwo.addEdge(nodeOne, nodeThree);
    graphTwo.addEdge(nodeTwo, nodeThree);
    graphTwo.addEdge(nodeFive, nodeTwo);
    graphTwo.addEdge(nodeFour, nodeFive);
    grapTwo.addEdge(nodeThree, nodeFour);

    var blabel = av.label("(b)", {left: gtLeft + 40, top: 115}).show;
    grapTwo.layout();

    gLeft = 550;
    gRight = 625;
    var graphThree = av.ds.graph({left: gLeft, right: gRight, top: gTop, directed: true});

    nodeOne = graphThree.addNode("0", {left: gLeft, top: gTop});
    nodeTwo = graphThree.addNode("2", {left: gLeft + 50, top: gTop});
    nodeThree = graphThree.addNode("4", {left: gLeft + 25, top: gTop + 25});
    nodeFour = graphThree.addNode("1", {left: gLeft,  top: gTop + 50});
    nodeFive =graphThree.addNode("3", {left: gLeft + 50, top: gTop + 50});

    graphThree.addEdge(nodeOne, nodeFour, {weight: 3});
    graphThree.addEdge(nodeOne, nodeThree, {weight: 4});
    graphThree.addEdge(nodeTwo, nodeThree, {weight: 1});
    graphThree.addEdge(nodeFive, nodeTwo, {weight: 7});
    graphThree.addEdge(nodeFour, nodeFive, {weight: 3});
    grapThree.addEdge(nodeThree, nodeFour, {weight: 1});

    var clabel = av.label("(c)", {left: gtLeft + 40, top: 115}).show;
    grapThree.layout();


})