$(document).ready(function(){
    "use strict";
	
	//Slide 1    
    var av = new JSAV("RightQuotient");

    var urlLink1 = "../../../AV/Yilu/re.jff";
    var urlLink2 = "../../../AV/Yilu/re2.jff";

    var figure1 = new av.ds.FA({center:true, url: urlLink1, left: 10, top:0, height: 500, width: 350});
    
    var figure2 = new av.ds.FA({center:true, url: urlLink2, left: 400, top:0, height: 500, width: 350});
    FiniteAutomaton.changeNodeName(figure2, 'p');
  	console.log(figure1.getFinals());
  	console.log(figure1);
  	//var intersect = FiniteAutomaton.intersect(av,figure1, figure2, {left: 100, top:0, height: 300, width: 300});
  	//intersect.layout();
    av.displayInit();

  	//FiniteAutomaton.findLanguageSet(figure1);
  	
    /*

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
*/
    
    var rightQuotient = FiniteAutomaton.rightQuotient(av, figure1, figure2, {center:true, left: 10, top:0, height: 200, width: 200, layout:"automatic"});
    av.step();
    /*
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
    console.log('figure1 language is : '+languageSet1);
    console.log('figure2 language is : '+languageSet2);


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
      if (quotient.includes("+")){
    	quotient+=')';
      }
    }
    else {
      var lastPlus = truncated.lastIndexOf('+');
      //console.log(lastPlus);
      //this.substr(0, index) + replacement + this.substr(index + replacement.length);
      var spaced1 = truncated.substr(0, lastPlus) + ' ' + truncated.substr(lastPlus+1);
      //console.log(spaced1);
      var lastPlusStar =  languageSet2.length-(truncated.length - lastPlus);
      //console.log(lastPlusStar);
      if (lastPlusStar > 0){
      	var spaced2 = languageSet2.substr(0, lastPlusStar) + ' ' + languageSet2.substr(lastPlusStar+1);
      	//console.log(spaced2);
      	if (spaced1.endsWith(spaced2)){
	      	quotient = truncated.substring(0, truncated.length-languageSet2.length);
	      	var left = spaced2.split(" ")[0];
	      	if (!left.includes("+")){
	      		quotient = quotient.replace('(', '');
	      	}
	      	quotient += left;
	      	console.log('quotient language is : '+quotient);
	      }
      }
    }
    //console.log(quotient);
    controller.drawTheFinalGraph(av, {center:true, left: 10, top:0, height: 500, width: 500}, quotient);
    console.log(quotient);
    //controller.transitions.hide();
    //controller.drawTheFinalGraph(av, {center:true, url: urlLink1, left: 10, top:0, height: 500, width: 500}, controller.generateExpression());
  	av.recorded();
  	*/
    av.recorded();
}); 