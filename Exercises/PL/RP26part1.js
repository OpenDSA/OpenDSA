/* global console, SLang, PLutils  */
(function() {
  "use strict";

    var RP26part1 = {    


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
		if (params.length === 0 || A.getRnd(0,3) === 0) {
		    LHS = vars[0];
		} else {
		    LHS = params[ A.getRnd(0,pLength-1)];
		}
		op = headsOrTails() ? '+' : '*';
		left = A.createIntExp(A.getRnd(2,9));
		right = A.createIntExp(A.getRnd(2,9));
		useParam = pLength>0 && headsOrTails();
		if (useParam) {
		    if (headsOrTails()) {
			left = A.createVarExp(params[ A.getRnd(0,pLength-1)] );
		    } else {
			right = A.createVarExp(params[ A.getRnd(0,pLength-1)] );
		    }
		} else {
		    PLutils.shuffle(vars);
		    if (headsOrTails()) {
			left = A.createVarExp(vars[0]);
		    } else {
			right = A.createVarExp(vars[0]);
		    }
		}
		RHS = A.createPrimApp2Exp(op,left,right);
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


	    function addBlock2(block,f) {
		// append a let block to the given block
		var fName = f[0];
		var fExp = f[1];
		var fParams = A.getFnExpParams(fExp);
		var fBody = A.getFnExpBody(fExp);
		var fLHS = A.getAssignExpVar(fBody[0]);
		var v;
		var variables = vs.split("");
		var args, i;
		PLutils.shuffle(variables);

		if (fParams.length === 0) {
		    // add: let
		    //           fLHS = <some int>
		    //      in
		    //           print (fName);     
		    //           set fName = fn () => fLHS
		    //           print (fName)
		    //      end
		    block.push(
			A.createAppExp(
			    A.createFnExp([fLHS],
					  [A.createPrintExp(
					      A.createAppExp(
						  A.createVarExp(fName),
						  ["args"])),
					   A.createAssignExp(
					       fName,
					       A.createFnExp( 
						   [ ],
						   [A.createVarExp(fLHS)])),
					   A.createPrintExp(
					      A.createAppExp(
						  A.createVarExp(fName),
						  ["args"]))]),
			    ["args", A.createIntExp(A.getRnd(4,10))]));
		} else {
		    // add: let
		    //           <var some> = <some int>
		    //      in
		    //           print (fName <args>);     
		    //           set fName = fn () => <some var>
		    //           print (fName)
		    //      end
		    v = variables[0];
		    args = ["args"];
		    for(i=0; i<fParams.length; i++) {
			PLutils.shuffle(variables);
			args.push(A.createVarExp(variables[0]));
		    }
		    block.push(
			A.createAppExp(
			    A.createFnExp([v],
					  [A.createPrintExp(
					      A.createAppExp(
						  A.createVarExp(fName),
						  args)),
					   A.createAssignExp(
					       fName,
					       A.createFnExp( 
						   [ ],
						   [A.createVarExp(fLHS)])),
					   A.createPrintExp(
					      A.createAppExp(
						  A.createVarExp(fName),
						  ["args"]))]),
			    ["args", A.createIntExp(A.getRnd(4,10))]));

		}
	    }

	    function getRndExpRP26part1() {
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
		p1 = pickParams(vs);
		p2 = pickParams(vs);
		fs1 = pickParams(fs,2);
		f1 = fs1[0];
		f2 = fs1[1];
		all1 = p1.concat(fs1);
		PLutils.shuffle(all1);
		args1 = [];
		for(i = 0; i<all1.length; i++) {
		    if (vs.indexOf(all1[i]) > -1) {
			args1.push(A.createIntExp(A.getRnd(4,10)));
		    } else {
			args1.push(getRandomFunction(vs));
			if (all1[i]===f1) {
			    f1 = [ f1, args1[args1.length-1] ];
			} else {
			    f2 = [ f2, args1[args1.length-1] ];
			}
		    }
		}
		if (headsOrTails()) {
		    addCallThenPrint(block1,f1,p1);
		    addCallThenPrint(block1,f2,p1);
		} else {
		    addCallThenPrint(block1,f2,p1);
		    addCallThenPrint(block1,f1,p1);
		}

		if (A.getFnExpParams(f1[1]).length ===0) {
		    addBlock2(block1,f1);
		} else if (A.getFnExpParams(f2[1]).length ===0) {
		    addBlock2(block1,f2);
		} else {
		    addBlock2(block1,headsOrTails() ? f1 : f2);
		}
		args1.unshift("args");
		// structure of exp: (fn(p1)=>  block1 args1)
		return SL.absyn.createAppExp(
		    SL.absyn.createFnExp(all1,block1),args1);
	    }// getRndExpRP26part1 function

	    function callByValueRP26part1(exp,envir) {
		var f = evalExpRP26part1(A.getAppExpFn(exp),envir);
		var args = evalExpsRP26part1(A.getAppExpArgs(exp),envir);
		if (E.isClo(f)) {
		    if (E.getCloParams(f).length !== args.length) {		
			throw new Error("Runtime error: wrong number of arguments in " +
					"a function call (" + E.getCloParams(f).length +
					" expected but " + args.length + " given)");
		    } else {
			var values = evalExpsRP26part1(E.getCloBody(f),
					      E.update(E.getCloEnv(f),
						       E.getCloParams(f),args));
			return values[values.length-1];
		    }
		} else {
		    throw f + " is not a closure and thus cannot be applied.";
		}    
	    }

	    function evalExpsRP26part1(list,envir) {
		return list.map( function(e) { return evalExpRP26part1(e,envir); } );
	    }



	    function evalExpRP26part1(exp,envir) {
		if (A.isIntExp(exp)) {
		    return E.createNum(A.getIntExpValue(exp));
		}
		else if (A.isVarExp(exp)) {
		    return E.lookup(envir,A.getVarExpId(exp));
		} else if (A.isPrintExp(exp)) {
		    SL.output += JSON.stringify(
			evalExpRP26part1( A.getPrintExpExp(exp), envir ));
		} else if (A.isPrint2Exp(exp)) {
		    SL.output += A.getPrint2ExpString(exp) +
				 (A.getPrint2ExpExp(exp) !== null ?
				  " " + JSON.stringify( evalExpRP26part1( A.getPrint2ExpExp(exp), 
								 envir ) )
				  : "");
		} else if (A.isAssignExp(exp)) {
		    var v = evalExpRP26part1(A.getAssignExpRHS(exp),envir);
		    E.lookupReference(
                        envir,A.getAssignExpVar(exp))[0] = v;
		    return v;
		} else if (A.isFnExp(exp)) {
		    return E.createClo(A.getFnExpParams(exp),
				       A.getFnExpBody(exp),envir);
		}
		else if (A.isAppExp(exp)) {
		    //if (exp.comesFromLetBlock) {
			return callByValueRP26part1(exp,envir);
		    //} else {
		//	switch (SL.ppm) {
		//	case "byval" : return callByValueRP26part1(exp,envir);
		//	case "byref" : return callByReference(exp,envir);
		//	case "bycpr" : return callByCopyRestore(exp,envir);
		//	}
		//    }
		} else if (A.isPrimApp1Exp(exp)) {
		    return SL.applyPrimitive(A.getPrimApp1ExpPrim(exp),
					     [evalExpRP26part1(A.getPrimApp1ExpArg(exp),envir)]);
		} else if (A.isPrimApp2Exp(exp)) {
		    return SL.applyPrimitive(A.getPrimApp2ExpPrim(exp),
					     [evalExpRP26part1(A.getPrimApp2ExpArg1(exp),envir),
					      evalExpRP26part1(A.getPrimApp2ExpArg2(exp),envir)]);
		} else if (A.isIfExp(exp)) {
		    if (E.getBoolValue(evalExpRP26part1(A.getIfExpCond(exp),envir))) {
			return evalExpRP26part1(A.getIfExpThen(exp),envir);
		    } else {
			return evalExpRP26part1(A.getIfExpElse(exp),envir);
		    }
		} else {
		    throw "Error: Attempting to evaluate an invalid expression";
		}
	    }// evalExpRP26part1 function

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
		//var fn2 = A.getAppExpFn(fn1body);
		p1 = A.getFnExpParams(fn1);
		//p2 = A.getFnExpParams(fn2);		
		//body = A.getFnExpBody(fn2);
		args1 = A.getAppExpArgs(exp);
		//args2 = A.getAppExpArgs(fn1body);

		for(i=0; i<p1.length; i++) {
		    letExp.push("    " + p1[i] + " = " + SL.printExp(args1[i]));
		}
		letExp.push("in");
		for(i=0; i<fn1body.length-1; i++) {
		    letExp.push("    " + SL.printExp(fn1body[i]) + ";");
		}

		// handle the inner let block
		innerApp = fn1body[i]; // last expression in the main body
		innerFn = A.getAppExpFn(innerApp);
		innerParam = A.getFnExpParams(innerFn)[0];
		innerBody = A.getFnExpBody(innerFn);
		innerArg = A.getAppExpArgs(innerApp)[0];
		letExp.push("    let");
		letExp.push("        " + innerParam + " = " + 
			    SL.printExp(innerArg));
		letExp.push("    in");
		for(i=0; i<innerBody.length-1; i++) {
		    letExp.push("        " + SL.printExp(innerBody[i]) + ";");
		}
		letExp.push("        " + SL.printExp(innerBody[i]));
		letExp.push("    end");
/*
		letExp.push("    let");
		for(i=0; i<p2.length; i++) {
		    letExp.push("        " + p2[i] + " = " + 
				SL.printExp(args2[i]));
		}
		letExp.push("    in");
		letExp.push("        " + SL.printExp(body));
		letExp.push("    end");
*/
		letExp.push("end");
		return letExp;
	    }// convertToLetExpressions function
	    
	    iterations = 0;
	    while(true) {
		exp = undefined;
		iterations++;
		exp = getRndExpRP26part1();
		expStr =  convertToLetExpressions(exp);
		if (expStr.length > 500) { continue; }
		value = null;
		try {
		    expStr = undefined;
		    SL.output = "";
		    value = evalExpRP26part1(exp,globalEnv);
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
	    this.answer = SL.output;
	    
	    //console.log(SL.output);
	},// init function

	validateAnswer: function (guess) {
	    return this.answer.replace(/\s+/g,"") ===
		guess.replace(/\s+/g,"");
	}// validateAnswer function
	
    };

    window.RP26part1 = window.RP26part1 || RP26part1;

}());


