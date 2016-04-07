/* global console,  SLang, PLutils */
(function() {
  "use strict";

    var RP24part1 = {    


	init: function() {
	    var SL = SLang;
	    var A = SL.absyn;
	    var E = SL.env;
	    var exp, expStr;
	    var value, rnd, exprType;
	    var globalEnv = E.update(E.createEmptyEnv(),
				     ["x","y","z"],
				     [E.createNum(1),
				      E.createNum(2),
				      E.createNum(3)]);

	    function getRndExp(min,max,type) {
		return SL.absyn.getProgramExp(
		    SL.absyn.generateRandomSLang1Program(
			0,min,max,"xyz","",type));
	    }// getRndExp function

	    // main interpreter function tweaked for this problem
	    function evalExpRP24part1(exp,envir) {
		if (A.isIntExp(exp)) {
		    SLang.countCases.numInt++;
		    return E.createNum(A.getIntExpValue(exp));
		}
		else if (A.isVarExp(exp)) {
		    SLang.countCases.numVar++;
		    return E.lookup(envir,A.getVarExpId(exp));
		}
		else if (A.isFnExp(exp)) {
		    SLang.countCases.numFn++;
		    return E.createClo(
			A.getFnExpParams(exp),A.getFnExpBody(exp),envir);
		}
		else if (A.isAppExp(exp)) {
		    SLang.countCases.numApp++;
		    var f = evalExpRP24part1(A.getAppExpFn(exp),envir);
		    var args = A.getAppExpArgs(exp)
			.map( function(arg) { 
			    return evalExpRP24part1(arg,envir); } );
		    if (E.isClo(f)) {
			if (E.getCloParams(f).length !== args.length) {		
			    throw new Error(
		"Runtime error: wrong number of arguments in " +
		"a function call (" + E.getCloParams(f).length +
		" expected but " + args.length + " given)");
			} else {
			    return evalExpRP24part1(E.getCloBody(f),
					   E.update(E.getCloEnv(f),
						    E.getCloParams(f),args));
			}
		    } else {
			throw new Error(
			    f + 
			" is not a closure and thus cannot be applied.");
		    }
		} else if (A.isPrimAppExp(exp)) {
		    SLang.countCases.numPrim++;
		    return SL.applyPrimitive(
			A.getPrimAppExpPrim(exp),
			A.getPrimAppExpArgs(exp).map( function(arg) { 
			    return evalExpRP24part1(arg,envir); } ));
		} else {
		    throw new Error(
			"Error: Attempting to evaluate an invalid expression");
		}
	    }// evalExpRP24part1
	    
	    rnd = Math.random();
	    rnd = 0;
	    if (rnd < 0.1) {
		// this case means that the expression has any type and may 
		// contain a semantic error
		exprType = -1;
	    } else if (rnd < 0.2) {
		exprType = 2;
	    } else if (rnd < 0.6) {
		exprType = 3;
	    } else {
		exprType = 4;
	    }

	    while (true) {
		if (exprType === -1) {
		    exp = getRndExp(3,6);
		} else {
		    exp = getRndExp(3,6,exprType);
		}
		expStr = SL.printExp(exp);
		if (expStr.length > 50) { continue; }
		value = null;
		try {
		    SLang.countCases = { numInt: 0, numVar: 0, numFn: 0,
					 numApp: 0, numPrim: 0 };
		    value = evalExpRP24part1(exp,globalEnv);
		} catch (e) {
		    console.log("My exception: ",e);

		    // a semantic error occurred
		}
		if (value || exprType === -1) {
		    break;
		}
	    }

	    this.expression = expStr;
	    this.answer = SLang.countCases;

	    console.log(JSON.stringify(this.answer));
	},// init function

	validateAnswer: function (guess) {
	    return (this.answer.numInt + "").replace(/\s+/g,"") ===
		guess.numInt.replace(/\s+/g,"") &&
		(this.answer.numVar + "").replace(/\s+/g,"") ===
		guess.numVar.replace(/\s+/g,"") &&
		(this.answer.numFn + "").replace(/\s+/g,"") ===
		guess.numFn.replace(/\s+/g,"") &&
		(this.answer.numApp + "").replace(/\s+/g,"") ===
		guess.numApp.replace(/\s+/g,"") &&
		(this.answer.numPrim + "").replace(/\s+/g,"") ===
		guess.numPrim.replace(/\s+/g,"");
	}// validateAnswer function
	
    };

    window.RP24part1 = window.RP24part1 || RP24part1;

}());


