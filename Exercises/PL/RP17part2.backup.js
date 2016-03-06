/* global console, LAMBDA */
(function() {
  "use strict";
    var L = LAMBDA;
    var RP17part2 = {    

	init: function () {
	    var vars = "uvxyz";
	    var numSteps = 2;  // minimum number of reductions in this exercise
	    var quad, appAlphaNum, appBetaNum, norAlphaNum, norBetaNum;
	    var text1 = "When evaluating this \u03BB expression with the " +
		"applicative order strategy, the numbers of " +
		"\u03B1-conversions and \u03B2-reductions are ";
	    var text2 = "When evaluating this \u03BB expression with the " +
		"normal order strategy, the numbers of " +
		"\u03B1-conversions and \u03B2-reductions are ";
	    var options = [1,2,3,4,5,6];

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

	    function generateExpression(sameFirstReduction) {
		var normalRed, applicativeRed;
		var normalNumAlpha, applicativeNumAlpha;
		var e;
		while ( true ) {	
		    e = L.getRndExp(1,2,6,vars,"");
		    LAMBDA.numAlpha = 0;
		    console.log("================ app");
		    applicativeRed = L.reduceToNormalForm(e,"applicative");   
		    applicativeNumAlpha = LAMBDA.numAlpha;
		    console.log("================ norm");
		    LAMBDA.numAlpha = 0;
		    normalRed = L.reduceToNormalForm(e,"normal");
		    normalNumAlpha = LAMBDA.numAlpha;
		    if ( infiniteLoop(normalRed) ||
			 infiniteLoop(applicativeRed) ||
			 expressionIsTooLong(normalRed) ||
			 expressionIsTooLong(applicativeRed) ||
			 reductionIsTooShort(normalRed) ||
			 reductionIsTooShort(applicativeRed) ||
			 sameReduction(normalRed,applicativeRed)) {
			continue;
		    }
		    return [applicativeRed,normalRed,
			    applicativeNumAlpha,normalNumAlpha];
		}// infinite loop
	    }// generateReductions function
	    quad = generateExpression();
	    console.log(JSON.stringify(quad[0]));
	    console.log(JSON.stringify(quad[2]));
	    console.log(JSON.stringify(quad[1]));
	    console.log(JSON.stringify(quad[3]));
	    appAlphaNum = quad[2];
	    norAlphaNum = quad[3];
	    appBetaNum = quad[0].length - 1;
	    norBetaNum = quad[1].length - 1;
	    this.expression = quad[0][0][0].replace(/\s/g," ");
	    this.answer = text1 + appAlphaNum + " and " + appBetaNum + 
		", respectively. " + text2 + norAlphaNum + " and " + 
		norBetaNum + ", respectively. ";
	    this.option1 = options[0];
	    this.option2 = options[1];
	    this.option3 = options[2];
	    this.option4 = options[3];
	    this.option5 = options[4];
	    //console.log(this.answer)
	    console.log("%%%%%%%%%%%%%%%%%%%% DONE %%%%%%%%%%%%%%%%%%%%%%%%");
	} // init function

    };// RP17part2
    
    window.RP17part2 = window.RP17part2 || RP17part2;

}());


