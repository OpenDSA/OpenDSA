/* global console, LAMBDA */
(function() {
  "use strict";
    var L = LAMBDA;
    var A = L.absyn;
    var RP16part2 = {    

	init: function () {
	    var e;
	    var redex, result;
	    var done = false;
	    
	    if (L.getRnd(0,1) === 0 ) {
		// most likely not to need an alpha conversion (very rare)
		e = L.getRndExp(1,4,6,"xyzuvw","");
		while (L.countBetaRedexes(e) !== 1) {
		    e = L.getRndExp(1,4,6,"xyzuvw","");
		}
		redex = L.findLeftmostOutermostBetaRedex(e);
		LAMBDA.alpha = false;
		result = LAMBDA.substitute(
		    A.getAppExpArg(redex),
		    A.getLambdaAbsParam(A.getAppExpFn(redex)),
		    A.getLambdaAbsBody(A.getAppExpFn(redex))		
		);

	    } else {
		// guarantee an alpha conversion
		while ( ! done ) {
		    e = L.getRndExp(1,4,6,"xyzuvw","");
		    while (L.countBetaRedexes(e) !== 1) {
			e = L.getRndExp(1,4,6,"xyzuvw","");
		    }
		    redex = L.findLeftmostOutermostBetaRedex(e);
		    LAMBDA.alpha = false;
		    result = LAMBDA.substitute(
		    A.getAppExpArg(redex),
			A.getLambdaAbsParam(A.getAppExpFn(redex)),
			A.getLambdaAbsBody(A.getAppExpFn(redex))		
		    );
		    if (LAMBDA.alpha) {
			done = true;
		    }
		}// loop on finding an alpha-conversion
	    }// guaranteed alpha conversion
	    
	    this.answer = LAMBDA.alpha ? "True" : "False";
	    this.expression = L.printExp(e).replace(/\s/g,"  "); // increase spacing

	    // print reduced redex only	    
	    //console.log(LAMBDA.alpha + " " + L.printExp(result));
	} // init function

    };// RP16part1
    
    window.RP16part2 = window.RP16part2 || RP16part2;

}());


