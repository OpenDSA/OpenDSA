/* global console,  SLang */
(function() {
  "use strict";

    var RP22part1 = {    


	init: function() {
	    var SL = SLang;
	    var vs = "uvxyz";
	    var maxDepth = 5;
	    var minDepth = 4;
	    var exp, expStr;
	    var ast, value, done;
	    var E = SL.env;
	    var globalEnv = E.update(E.createEmptyEnv(),["x","y","z"],[1,2,3]);
	    var valueType = SL.absyn.getRnd(0,1) === 0 ? "integer" : "closure";
	    valueType = "closure";


	    function getRndExpTmp() {
		//  structure of exp: (fn(p1)=>(fn(p2)=>body args') args)
		// p1 is 1 to 3 vars and args is the same # of vars/ints
		// p2 is 1 to 2 vars such that p1 union p2 = {x,y,z}
                // the length of args' is equal to the length of p2
		// body as depth 2 and ony uses variables as leaves
		
		var exp, body;
/*
		var exp = SL.absyn.getProgramExp(
		    SL.absyn.generateRandomSLang1Program(
			0,4,7,"xyz",""));
		expStr = SL.printExp(exp);
		while (expStr.length < 10 ||  expStr.length>50) {
		    exp = SL.absyn.getProgramExp(
			SL.absyn.generateRandomSLang1Program(
			    0,4,7,"xyz",""));
		    expStr = SL.printExp(exp);
		}
		return exp;
	    }// getRndExp function
*/
	    }
	    function correctType(value) {
		return (valueType === "integer" && E.isNum(value)) ||
		    (valueType === "closure" && E.isClo(value));
	    }

	    function containsVar(expStr) {
		expStr = expStr.replace(/fn\([xyz,]*\)=>/g,"");
		return expStr.indexOf("x")  > -1 ||
		     expStr.indexOf("y")  > -1 ||
		    expStr.indexOf("y")  > -1 ;
	    }

	    function getRndExp() {
		var exp = SL.absyn.getProgramExp(
		    SL.absyn.generateRandomSLang1Program(
			0,4,7,"xyz",""));
		expStr = SL.printExp(exp);
		while (expStr.length < 10 ||  expStr.length>50) {
		    exp = SL.absyn.getProgramExp(
			SL.absyn.generateRandomSLang1Program(
			    0,4,7,"xyz",""));
		    expStr = SL.printExp(exp);
		}
		return exp;
	    }// getRndExp function
	    
	    
	    while (true) {
		exp = getRndExp();
		done = true;
		try {
		    //console.log(exp)
		    ast = parser.parse(SL.printExp(exp));
		    value = SL.evalExp(exp,globalEnv);
		    //console.log(JSON.stringify(value));
		} catch (e) {
		    //console.log("here: ", e);
		    done = false;
		}
		if (done) {
		    if (correctType(value) && containsVar(SL.printExp(exp))) {
			break;
		    }
		}
		//console.log("try again");
	    }

	    this.expression = SL.printExp(exp);
	    this.answer = "correct";
	}// init function
    };

    window.RP22part1 = window.RP22part1 || RP22part1;

}());


