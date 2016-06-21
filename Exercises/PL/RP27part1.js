/* global console, SLang, PLutils  */
(function() {
  "use strict";

    var RP27part1 = {    


	init: function() {
	    var SL = SLang;
	    var A = SL.absyn;
	    var E = SL.env;
	    var vs = "xyz";	    
	    var fs = "fgh";
	    var exp, expStr;
	    var value, rnd, iterations;
	    var globalEnv = E.update(E.createEmptyEnv(),
				     ["x","y","z"],
				     [E.createNum(1),
				      E.createNum(2),
				      E.createNum(3)]);

	    function headsOrTails() {
		return A.getRnd(0,1)===0;
	    }

	    function pickParams(vs,num) {
		var n, i, result = [];
		var variables = vs.split("");
		PLutils.shuffle(variables);
		if (num===undefined) {
		    n = A.getRnd(1,3);
		} else {
		    n = num;
		}
		for(i=0; i< n; i++) {
		    result.push(variables[0]);
		    variables.splice(0,1);
		}
		return result;
	    }

	    function getRandomFunction(vs) {
		// return fn (params) => set LHS = RHS
		var params, pLength, LHS, RHS;
		var op, useParam, left, right;
		var vars = vs.split("");
		PLutils.shuffle(vars);
		params = pickParams( vs, A.getRnd(0,2) );
		pLength = params.length;
		LHS = vars[0];
		RHS = A.createVarExp(vars[1]);
		return A.createFnExp(params,[A.createAssignExp(LHS,RHS)]);
	    }// getRandomFunction function

	    // f has the form [ "g", FnExp ]
	    // vars is an array of var names
	    function addCallThenPrint(block,f,vars) {
		// add call to f
		var i, args = ["args"];
		var params = A.getFnExpParams(f[1]);
		var v, printedAlready = [];
		for(i=0; i<params.length; i++) {
		    v = vars[A.getRnd(0,vars.length-1)];
		    args.push(A.createVarExp(v));
		    if (printedAlready.indexOf(v) === -1) {
			printedAlready.push(v);
		    }
		}
		block.push(A.createAppExp(A.createVarExp(f[0]),args));
		// add print exp
		if (printedAlready.length>0) {
		    for(i=0; i<printedAlready.length; i++) {
			block.push(
			    A.createPrintExp(
				A.createVarExp(printedAlready[i])));
		    } 
		} else {
		    block.push(
			A.createPrintExp(
			    A.createVarExp( 
				A.getAssignExpVar(A.getFnExpBody(f[1])[0]))));
				
		}		
	    }// addCallThenPrint function

	    function getRndExpRP27part1() {
		// structure of exp: (fn(p1) => block args1)
		// p1 contains 1 to 3 integer vars and two function variables 
		// p2 is 1 to 2 vars such that p1 union p2 = {x,y,z}
		// block is the concatenation of block1 and block2
		// block1 calls both functions and prints either the values of
		// the args of the variable that the functions assigns to
		// block2 has the form:
		// fn(v) => [print (f);  set f = fn()=>v; print(f); ] int)
		var i, index1, index2, rnd, value;
		var variables = vs.split("");
		var p1 = [], p2 = [], p1Length, p2Length;
		var args1 = ["args"],  args2 = ["args"];
		var body;
		var funcVar;
		var funcArity;
		var funcIndex1, funcIndex2;
		var f1, f2, f1params, f2params, fs1, all1;
		var block1 = [];
		var LHS, RHS;
		p1 = pickParams(vs,A.getRnd(1,2) );
		fs1 = pickParams(fs,1);
		f1 = fs1[0];
		all1 = p1.concat(fs1);
		PLutils.shuffle(all1);
		args1 = [];
		for(i = 0; i<all1.length; i++) {
		    if (vs.indexOf(all1[i]) > -1) {
			args1.push(A.createIntExp(A.getRnd(4,10)));
		    } else {
			args1.push(getRandomFunction(vs));
			f1 = [ f1, args1[args1.length-1] ];
		    }
		}
		if (headsOrTails()) {
		    LHS = p1[A.getRnd(0,p1.length-1)];
		    RHS = A.createIntExp(A.getRnd(4,15));
		    block1.push(A.createAssignExp(LHS,RHS));
		}

		addCallThenPrint(block1,f1,p1);

		args1.unshift("args");
		// structure of exp: (fn(p1)=>  block1 args1)
		return SL.absyn.createAppExp(
		    SL.absyn.createFnExp(all1,block1),args1);
	    }// getRndExpRP27part1 function

	    function callByValueRP27part1(exp,envir) {
		var f = evalExpRP27part1(A.getAppExpFn(exp),envir);
		var args = evalExpsRP27part1(A.getAppExpArgs(exp),envir);
		if (E.isClo(f)) {
		    if (E.getCloParams(f).length !== args.length) {		
			throw new Error("Runtime error: wrong number of arguments in " +
					"a function call (" + E.getCloParams(f).length +
					" expected but " + args.length + " given)");
		    } else {
			var values = evalExpsRP27part1(E.getCloBody(f),
					      E.update(E.getCloEnv(f),
						       E.getCloParams(f),args));
			return values[values.length-1];
		    }
		} else {
		    throw f + " is not a closure and thus cannot be applied.";
		}    
	    }

	    function evalExpsRP27part1(list,envir) {
		return list.map( 
		    function(e) { return evalExpRP27part1(e,envir); } );
	    }

	    function evalExpRP27part1(exp,envir) {
		if (A.isIntExp(exp)) {
		    return E.createNum(A.getIntExpValue(exp));
		}
		else if (A.isVarExp(exp)) {
		    return E.lookup(envir,A.getVarExpId(exp));
		} else if (A.isPrintExp(exp)) {
		    SLang.savedEnv = envir;
		    SL.output += JSON.stringify(
			evalExpRP27part1( A.getPrintExpExp(exp), envir ));
		} else if (A.isPrint2Exp(exp)) {
		    SL.output += A.getPrint2ExpString(exp) +
				 (A.getPrint2ExpExp(exp) !== null ?
				  " " + JSON.stringify( evalExpRP27part1( A.getPrint2ExpExp(exp), 
								 envir ) )
				  : "");
		} else if (A.isAssignExp(exp)) {
		    var v = evalExpRP27part1(A.getAssignExpRHS(exp),envir);
		    E.lookupReference(
                        envir,A.getAssignExpVar(exp))[0] = v;
		    return v;
		} else if (A.isFnExp(exp)) {
		    return E.createClo(A.getFnExpParams(exp),
				       A.getFnExpBody(exp),
				       envir);
		}
		else if (A.isAppExp(exp)) {
		    //if (exp.comesFromLetBlock) {
			return callByValueRP27part1(exp,envir);
		    //} else {
		//	switch (SL.ppm) {
		//	case "byval" : return callByValueRP27part1(exp,envir);
		//	case "byref" : return callByReference(exp,envir);
		//	case "bycpr" : return callByCopyRestore(exp,envir);
		//	}
		//    }
		} else if (A.isPrim1AppExp(exp)) {
		    return SL.applyPrimitive(A.getPrim1AppExpPrim(exp),
					     [evalExpRP27part1(A.getPrim1AppExpArg(exp),envir)]);
		} else if (A.isPrim2AppExp(exp)) {
		    return SL.applyPrimitive(A.getPrim2AppExpPrim(exp),
					     [evalExpRP27part1(A.getPrim2AppExpArg1(exp),envir),
					      evalExpRP27part1(A.getPrim2AppExpArg2(exp),envir)]);
		} else if (A.isIfExp(exp)) {
		    if (E.getBoolValue(evalExpRP27part1(A.getIfExpCond(exp),envir))) {
			return evalExpRP27part1(A.getIfExpThen(exp),envir);
		    } else {
			return evalExpRP27part1(A.getIfExpElse(exp),envir);
		    }
		} else {
		    throw "Error: Attempting to evaluate an invalid expression";
		}
	    }// evalExpRP27part1 function

	    // convert two two applications to let expressions
	    function convertToLetExpressions(exp) {
		// exp always has the form:
		//     (fn(p1)=>body args1)
		var p1, p2, args1, args2, body;
		var letExp = [ "let" ];
		var i;
		var fn1 = A.getAppExpFn(exp);
		var fn1body = A.getFnExpBody(fn1);
		var innerApp, innerParam, innerFn, innerArg, innerBody;
		p1 = A.getFnExpParams(fn1);
		args1 = A.getAppExpArgs(exp);

		for(i=0; i<p1.length; i++) {
		    letExp.push("    " + p1[i] + " = " + SL.printExp(args1[i]));
		}
		letExp.push("in");
		for(i=0; i<fn1body.length-1; i++) {
		    letExp.push("    " + SL.printExp(fn1body[i]) + ";");
		}
		letExp.push("    " + SL.printExp(fn1body[i]));
		letExp.push("end");
		return letExp;
	    }// convertToLetExpressions function
	    
	    iterations = 0;
	    while(true) {
		exp = undefined;
		iterations++;
		exp = getRndExpRP27part1();
		expStr =  convertToLetExpressions(exp);
		if (expStr.length > 500) { continue; }
		value = null;
		try {
		    expStr = undefined;
		    SL.output = "";
		    value = evalExpRP27part1(exp,globalEnv);
		    expStr = convertToLetExpressions(exp);
		} catch (e) {
		    //console.log("My exception: ",e);
		}
		if (exp && expStr) {
		    break;
		}
		if (iterations>500) {
		    // not needed locally but might be needed on Canvas
		    // when the files do not load appropriately???
		    expStr = ["Something went wrong...",
			      "Please, reload the page."];
		    break;
		}
	    }



	    this.expression = expStr.join("<br />");
	    this.answer = JSON.stringify(SL.savedEnv,null,2);

	    //console.log(this.answer);

	},// init function

	validateAnswer: function (guess) {
	    return this.answer.replace(/\s+/g,"") ===
		guess.replace(/\s+/g,"");
	}// validateAnswer function
	
    };

    window.RP27part1 = window.RP27part1 || RP27part1;

}());


