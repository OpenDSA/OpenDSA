$(document).ready(function(){
    "use strict";
	
	//Slide 1    
    var av = new JSAV("DemorganIntersect");
    av.umsg("Display Demorgan Algorithm");
    //av.nodes();
    av.displayInit();

    //Slide 2
    var urlLinkStep1 = "../../../AV/Yilu/figure1.jff";
    var figure1 = new av.ds.FA({center:true, url: urlLinkStep1, top: 50, width: 600, height:600});
    av.umsg("There are two machines");
	av.step();

	
	//Slide 3
	figure1.hide();
	var urlLinkStep2 = "../../../AV/Yilu/figure2.jff";
	var figure2 = new av.ds.FA({url: urlLinkStep2, left: 20, width: 600, height:600});
	av.umsg("Take complement of two machines and then the union");
	av.step();
	
	//Slide 4
	figure2.hide();
	var urlLinkStep3 = "../../../AV/Yilu/figure3.jff";
	var figure3 = new av.ds.FA({center:true, url: urlLinkStep3, top: 30, width: 600, height:600});
	av.umsg("Convert to DFA");
	av.step();
	
	//Slide 5
	figure3.hide();
	var urlLinkStep4 = "../../../AV/Yilu/figure4.jff";
	var figure4 = new av.ds.FA({center:true, url: urlLinkStep4, top: 50, width: 600, height:600});
	av.umsg("Minimize");
	av.step();
	
	//Slide 6
	figure4.hide();
	var urlLinkStep5 = "../../../AV/Yilu/figure5.jff";
	var figure5 = new av.ds.FA({center:true, url: urlLinkStep5, top: 50, width: 600, height:600});
	av.umsg("Complement");
	av.step();
	av.recorded();
});