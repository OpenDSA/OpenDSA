/* global console, LAMBDA */
(function() {
  "use strict";
    var L = LAMBDA;
    var question = {};
    var arr;

    function pickExpressionSubcase(minDepth,maxDepth,vars,
				    prob1a,prob1b,prob3) {
	/* pick a, p, abd B in subst(a,p,B) */
	var substCase,a,p,B,tmp,tmp2, x;
	var rnd = Math.random();
	a = L.getRndExp(1,1,3,vars,"");
	if (rnd < prob1a) {
	    substCase = "1a";
	    p = L.absyn.createVarExp( vars.substr(L.getRnd(0,vars.length-1),1));
	    B = p;
	} else if (rnd < prob1b) {
	    substCase = "1b";
	    tmp = L.getRnd(0,vars.length-1);
	    while (true) {
		tmp2 = L.getRnd(0,vars.length-1);
		if (tmp2 !== tmp) { break; }
	    }
	    p = L.absyn.createVarExp( vars.substr(tmp,1));
	    B = L.absyn.createVarExp( vars.substr(tmp2,1));
	} else if (rnd < prob3) {
	    substCase = "3";
	    p = L.absyn.createVarExp( vars.substr(L.getRnd(0,vars.length-1),1));
	    while (true) {
		B = L.getRndExp(1,2,4,vars,"");
		if (L.absyn.isAppExp(B)) {
		    break;
		}
	    }	
	} else {
	    // first pick the lambda abstraction
	    while (true) {
		B = L.getRndExp(1,2,4,vars,"");
		if (L.absyn.isLambdaAbs(B)) {
		    break;
		}
	    }
	    x = L.absyn.getLambdaAbsParam(B);
	    // now pick subcase
	    rnd = L.getRnd(1,3);
	    if (rnd === 1) {
		substCase = "2a";
		p = x;
	    } else {
		// pick a variable p different from x and a
		while (true) {
		    tmp = vars.substr( L.getRnd(0,vars.length-1), 1);		
		    if (tmp !== L.absyn.getVarExpId(x) &&
			tmp !== L.printExp(a)) {
			break; 
		    }
		}
		p = L.absyn.createVarExp(tmp);
		// handle the two remaining subcases
		if (rnd === 2) {
		    substCase = "2b";
		    if (L.free(x,a)) {
			while (true) {
			    a = L.getRndExp(1,1,3,vars,"");
			    if (! L.free(x,a)) {
				break;
			    }
			}
		    }
		}
		else {
		    substCase = "2c";
		    if (! L.free(x,a)) {
			while (true) {
			    a = L.getRndExp(1,1,3,vars,"");
			    if (L.free(x,a)) {
				break;
			    }
			}
		    }
		} 
	    }
	}
	// make sure that a and p are not identical
	if (substCase !== '2b' && substCase !== '2c') {
	    while (L.printExp(a) === L.printExp(p)) {
		a = L.getRndExp(1,1,3,vars,"");
	    }
	}
	return [substCase,a,p,B];
    }

    var Substitution1 = {    

	init: function () {
	    var vs = "xyz";
	    var minDepth = 4;
	    var maxDepth = 6;
	    var subst = pickExpressionSubcase(2, 4, vs, 0.4, 0.8, 0.9);
	    var substCase = (subst[0] !== "1a" && subst[0] !== "1b") ?
		"This is not an instance of case 1" : subst[0];
	    var a = subst[1];
	    var p = subst[2];
	    var B = subst[3];
	    this.substExpression = "subst( " + L.printExp(a) + ", " + 
		L.printExp(p) + ", " + 	L.printExp(B) + " )";
	    this.answer = substCase;	    
	} // init function


    };// Substitution1
    
    window.Substitution1 = window.Substitution1 || Substitution1;

}());


