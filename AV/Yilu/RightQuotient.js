$(document).ready(function(){
    "use strict";
	
	//Slide 1    
    var av = new JSAV("RightQuotient");
    av.umsg("Display Demorgan Algorithm");

    var urlLink1 = "../../../AV/Yilu/l1.jff";
    var urlLink2 = "../../../AV/Yilu/l2.jff";

    var figure1 = new av.ds.FA({center:true, url: urlLink1, left: 10, top:0, height: 500, width: 500});
  	var figure2 = new av.ds.FA({center:true, url: urlLink2, left: 10, top:200, width: 500});
  	figure1.hide();
  	figure2.hide();
  	var intersect = FiniteAutomaton.intersect(av,figure1, figure2, {left: 100, top:0, height: 300, width: 300});
  	intersect.layout();

  	FiniteAutomaton.findLanguageSet(intersect);
  	av.displayInit();
  	av.recorded();
});