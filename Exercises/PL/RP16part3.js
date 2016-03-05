/* global console, LAMBDA */
(function() {
  "use strict";
    var L = LAMBDA;
    var RP16part3 = {    

	init: function () {
	    var redex, result;
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
	    //console.log(this.answer);
	}, // init function

	validateAnswer: function (guess) {
	    return guess.replace(/\s+/g,"") ===
		this.answer.replace(/\s+/g,"").replace(/\u03BB/g,"^");
	}


    };// RP16part1
    
    window.RP16part3 = window.RP16part3 || RP16part3;

}());


