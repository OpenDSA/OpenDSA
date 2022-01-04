/* global console, LAMBDA */
(function() {
  "use strict";
    var L = LAMBDA;
    var BetaReductionOrder1 = {    

	init: function () {
	    var vars = "uvxyz";
	    var numSteps = 3;  // minimum number of reductions in this exercise
	    var pair;
	    
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
		var firstRedexNormal, firstRedexApplicative;
		var e;
		var hint5;
		while ( true ) {		    
		    e = L.getRndExp(1,2,6,vars,"");
		    normalRed = L.reduceToNormalForm(e,"normal");
		    firstRedexNormal = L.getFirstRedex();
		    applicativeRed = L.reduceToNormalForm(e,"applicative");
		    firstRedexApplicative = L.getFirstRedex();		    
		    if ( infiniteLoop(normalRed) ||
			 infiniteLoop(applicativeRed) ||
			 expressionIsTooLong(normalRed) ||
			 expressionIsTooLong(applicativeRed) ||
			 reductionIsTooShort(normalRed) ||
			 reductionIsTooShort(applicativeRed) ||
			 sameReduction(normalRed,applicativeRed)) {
			continue;
		    }
		    var span = "<span style=\"font-family: 'Courier New'\">";

		    if (sameFirstReduction) {
			if (normalRed[1][0] === applicativeRed[1][0]) {
			    hint5 =  "The correct answer is True</br> because both strategies "
				+ "reduce the following beta-redex first: "
				+ span + firstRedexNormal + "</span>";
			    return [e,hint5];
			}
		    } else{
			if (normalRed[1][0] !== applicativeRed[1][0]) {
			    hint5 =  "The correct answer is False</br> because the applicative "
				+ "order strategy reduces the following beta-redex first: "
			        + span + firstRedexApplicative + "</span></br>"
				+ "whereas the normal order strategy reduces the following "
				+ " beta-redex first: " + span + firstRedexNormal
				+ "</span>";
			    return [e,hint5];
			}
		    }
		}// infinite loop
	    }// generateReductions function

	    if (L.getRnd(0,1) === 0) {
		// same first reduction
		pair = generateExpression(true);
		this.expression = L.printExp( pair[0] );
		this.answer = "True";
		this.hint5 = pair[1];
	    } else {
		// different first reduction
		pair = generateExpression(false);		
		this.expression = L.printExp( pair[0] );
		this.answer = "False";
		this.hint5 = pair[1];		
	    }
	    this.expression = this.expression.replace(/\s/g," ");

	} // init function

    };// BetaReductionOrder1
    
    window.BetaReductionOrder1 = window.BetaReductionOrder1 || BetaReductionOrder1;

}());


