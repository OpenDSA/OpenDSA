$(document).ready(function(){
	"use strict";
	var av_name = "PartialDerivationEx";
	var av = new JSAV(av_name);
	
	//building tree
	var tr = av.ds.tree({ nodegap: 15});
	tr.root("A");
	var rootA = tr.root();
	rootA.addChild("a");
	rootA.addChild("A");
	rootA.addChild("a");
	rt.layout();
	av.displayInit();
	av.recorded();:

});
