/* global console, LAMBDA */
(function() {
  "use strict";
    var L = LAMBDA;
    var BetaReduction = {    

	init: function () {
	    var redex, result, span;
	    while (true) {
		redex = L.absyn.createAppExp(
		    // add type 2 for lambda abstraction
		    L.getRndExp(1,2,5,"xyzuvw","",2),
		    L.getRndExp(1,1,4,"xyzuvw",""));
		result = LAMBDA.beta(redex);
		if  ( (L.printExp(redex).length < 40) &&
		      (L.printExp(redex).length > 15) &&
		      (L.printExp(result).length < 20) ) {
		    break;
		}
	    }// loop on length of expressions
	    
	    this.answer = L.printExp(result);
	    this.expression = L.printExp(redex).replace(/\s/g,"  "); // increase spacing
	    span = "<span style=\"font-family: 'Courier new'\">";
	    this.hint5 = "The correct answer is: " 
		+ span +  LAMBDA.printExp(result).replace(/\u03BB/g,"^"); + "</span>";
	}, // init function

	validateAnswer: function (guess) {
	    return guess.replace(/\s+/g,"") ===
		this.answer.replace(/\s+/g,"").replace(/\u03BB/g,"^");
	}


    };// RP16part1
    
    window.BetaReduction = window.BetaReduction || BetaReduction;

}());


