/* global console, LAMBDA */
(function() {
  "use strict";
    var RP16part1 = {    

	init: function () {
	    var exp = LAMBDA.getRndExp(1,4,6,"xyzuvw","");
	    this.answer = LAMBDA.countBetaRedexes(exp) + "";
	    //console.log(this.answer);
	    this.expression = LAMBDA.printExp( exp )
		.replace(/\s/g,"  ");   // increase spacing
	}, // init function

	validateAnswer: function (studentAnswer) {
	    return this.answer ===
		studentAnswer.replace(/\s+/g,"");
	}// validateAnswer function

    };// RP16part1
    
    window.RP16part1 = window.RP16part1 || RP16part1;

}());


