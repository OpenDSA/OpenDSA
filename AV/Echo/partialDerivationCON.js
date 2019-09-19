$(document).ready(function(){
	"use strict";
	var av_name = "partialDerivationCON";
	var av = new JSAV(av_name, {animationMode: "none"});
	
	//building tree
	var tr = av.ds.tree({ nodegap: 15});
	tr.root("A");

	var rootA = tr.root();
	var firstC = tr.newNode("a");
	var secondC = tr.newNode("A");
	var thirdC = tr.newNode("a");
	
	rootA.addChild(firstC);
	rootA.addChild(secondC);
	rootA.addChild(thirdC);
	tr.layout();
	av.displayInit();
	av.recorded();
});
