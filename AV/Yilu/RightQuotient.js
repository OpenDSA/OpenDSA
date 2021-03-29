$(document).ready(function(){
    "use strict";
	
	//Slide 1    
    var av = new JSAV("RightQuotient");
    av.umsg("Display Demorgan Algorithm");

    var urlLink1 = "../../../AV/Yilu/re.jff";
    var urlLink2 = "../../../AV/Yilu/re2.jff";

    var figure1 = new av.ds.FA({center:true, url: urlLink1, left: 10, top:0, height: 500, width: 500});
  	
  	//var intersect = FiniteAutomaton.intersect(av,figure1, figure2, {left: 100, top:0, height: 300, width: 300});
  	//intersect.layout();
    av.displayInit();

  	FiniteAutomaton.findLanguageSet(figure1);
  	

    av.step();

    var controller = new window.FAtoREController(av, figure1,{center:true, url: urlLink1, left: 10, top:0, height: 500, width: 500} );
    controller.completeTransitions();
    var nodes = controller.getAllNonStartNorFinalStates(figure1);
    for (var i = 0; i < nodes.length; i++) {
      localStorage.trans = 'false';
      figure1.selected = nodes[i];
      controller.collapseState(nodes[i], null);
      nodes[i].unhighlight();
      controller.finalizeRE();
      //controller.finalizeRE();
    }
    var languageSet1 = controller.generateExpression();

    av.step();
    var nodes = figure1.nodes();
    // Update the position of the state label for each node
    for (var next = nodes.next(); next; next = nodes.next()) {
      figure1.removeNode(next);
    }
    var edges = figure1.edges();
    // Remove edges without a weight
    for (next = edges.next(); next; next = edges.next()) {
      figure1.removeEdge(next);
    }

    var figure2 = new av.ds.FA({center:true, url: urlLink2, left: 10, top:0, height: 500, width: 500});
    
    av.step();
    controller = new window.FAtoREController(av, figure2,{center:true, url: urlLink1, left: 10, top:0, height: 500, width: 500} );
    controller.completeTransitions();
    var nodes = controller.getAllNonStartNorFinalStates(figure2);
    for (var i = 0; i < nodes.length; i++) {
      localStorage.trans = 'false';
      figure1.selected = nodes[i];
      controller.collapseState(nodes[i], null);
      nodes[i].unhighlight();
      controller.finalizeRE();
    }
    var languageSet2 = controller.generateExpression();
    av.step();
    nodes = figure2.nodes();
    // Update the position of the state label for each node
    for (var next = nodes.next(); next; next = nodes.next()) {
      figure2.removeNode(next);
    }
    edges = figure2.edges();
    // Remove edges without a weight
    for (next = edges.next(); next; next = edges.next()) {
      figure2.removeEdge(next);
    }

    var l1 = languageSet1.split();
    var l2 = languageSet2.split();
    //console.log(l1);
    //console.log(l2);

    //console.log(languageSet1);
    let truncated = languageSet1;
    if (languageSet1.endsWith(')')){
      truncated = languageSet1.substring(0, languageSet1.length-1);
    }
    //console.log(truncated);
    //console.log(languageSet2);
    var quotient = '';
    if (truncated.endsWith(languageSet2)){
      quotient = truncated.substring(0, truncated.length-languageSet2.length);
    }


    
    quotient+=')';
    //console.log(quotient);
    controller.drawTheFinalGraph(av, {center:true, left: 10, top:0, height: 500, width: 500}, quotient);
    //controller.transitions.hide();
    //controller.drawTheFinalGraph(av, {center:true, url: urlLink1, left: 10, top:0, height: 500, width: 500}, controller.generateExpression());
  	av.recorded();
  	
}); 