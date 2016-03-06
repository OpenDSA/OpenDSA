/* global console, LAMBDA */
(function() {
  "use strict";
    var L = LAMBDA;
    var RP17part2 = {    

	init: function () {
	    var vars = "uvxyz";
	    var numSteps = 3;  // minimum number of reductions in this exercise

	    function infiniteLoop(reduction) { 
		return reduction[0].length > 1; 
	    }
	    // return true if at least one expression in the reduction
	    // is too long
	    function expressionIsTooLong(reduction) { 
		return 35 < reduction
		    .map(function (x) { return x[0].length; })
		    .reduce(function(a,b) { return Math.max(a,b);} , -1);
	    }
	    // return true if the number of steps in the reduction is too small
	    function reductionIsTooShort(reduction) { 
		return reduction.length <= numSteps;
	    }
	    // return true if the number of steps in the reduction is too large
	    function reductionIsTooLong(reduction) { 
		return reduction.length > numSteps + 2;
	    }
	    function sameReduction(r1,r2) {
		if (r1.length !== r2.length) {
		    return false;
		} else {
		    for(var i=1; i<r1.length; i++) {
			if (r1[i][0] !== r2[i][0]) {
			    return false;
			}
		    }
		    return true;
		}
	    }
	    function sameFirstReduction(r1,r2) {
		return r1[1] === r2[1];
	    }

	    function generateExpression(sameNumberSteps) {
		var normalRed, applicativeRed;
		var e;
		while ( true ) {		    
		    e = L.getRndExp(1,2,6,vars,"");
		    normalRed = L.reduceToNormalForm(e,"normal");
		    applicativeRed = L.reduceToNormalForm(e,"applicative");   
		    if ( infiniteLoop(normalRed) ||
			 infiniteLoop(applicativeRed) ||
			 expressionIsTooLong(normalRed) ||
			 expressionIsTooLong(applicativeRed) ||
			 reductionIsTooShort(normalRed) ||
			 reductionIsTooShort(applicativeRed) ||
			 sameReduction(normalRed,applicativeRed)) {
			continue;
		    }
		    if (sameNumberSteps) {
			if (normalRed.length === applicativeRed.length) {
			    return e;
			}
		    } else{
			if (normalRed.length !== applicativeRed.length) {
			    //console.log(JSON.stringify(applicativeRed));
			    //console.log(JSON.stringify(normalRed));
			    return e;
			}
		    }
		}// infinite loop
	    }// generateReductions function

	    if (L.getRnd(0,1) === 0) {
		// same number of steps
		this.expression = L.printExp(generateExpression(true));
		this.answer = "True";
	    } else {
		// different number of steps
		this.expression = L.printExp(generateExpression(false));
		this.answer = "False";
	    }
	    this.expression = this.expression.replace(/\s/g," ");
	    //console.log(this.answer)

	} // init function

    };// RP17part2
    
    window.RP17part2 = window.RP17part2 || RP17part2;

}());


