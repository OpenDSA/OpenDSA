/* global console, LAMBDA */
(function() {
  "use strict";
    var L = LAMBDA;
    var question = {};
    var arr;


    function pickExpression(minDepth,maxDepth,vars) {
	/* pick a, p, abd B in subst(a,p,B) */
	var substCase,a,p,B,tmp,tmp2, x;
	var rnd = Math.random();    
	a = L.getRndExp(1,1,3,vars,"");
	if (rnd<0.15) {
	    substCase = "1a";
	    p = L.absyn.createVarExp( vars.substr(L.getRnd(0,vars.length-1),1));
	    B = p;
	} else if (rnd<0.30) {
	    substCase = "1b";
	    tmp = L.getRnd(0,vars.length-1);
	    while (true) {
		tmp2 = L.getRnd(0,vars.length-1);
		if (tmp2 !== tmp) { break; }
	    }
	    p = L.absyn.createVarExp( vars.substr(tmp,1));
	    B = L.absyn.createVarExp( vars.substr(tmp2,1));
	} else if (rnd<0.45) {
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

    var RP15part2 = {    

	init: function () {
	    //var jsav = new JSAV("jsav", {"animationMode": "none"});
	    var vs = "xyz";
	    var minDepth = 4;
	    var maxDepth = 6;
	    var subst = pickExpression(2,4,vs);
	    var substCase = subst[0];
	    var a = subst[1];
	    var p = subst[2];
	    var B = subst[3];
	    var options = ["1a","1b","2a","2b","2c","3"];
	    this.substExpression = "subst( " + L.printExp(a) + ", " + 
		L.printExp(p) + ", " + 	L.printExp(B) + " )";
	    //arr = jsav.ds.array([subst]);
	    //arr.addClass([0],"noBoxShadow");
	    this.answer = substCase;
	    
	    //console.log(this.answer);
	    options.splice(options.indexOf(substCase),1);

	    this.option1 = options[0];
	    this.option2 = options[1];
	    this.option3 = options[2];
	    this.option4 = options[3];
	    this.option5 = options[4];
	} // init function


    };// RP15part2
    
    window.RP15part2 = window.RP15part2 || RP15part2;

}());


