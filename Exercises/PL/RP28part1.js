/* global console, SLang, PLutils  */
(function() {
  "use strict";

    var RP28part1 = {    


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
		var params, LHS, RHS;
		var op, left, right;
		var vars = vs.split("");
		PLutils.shuffle(vars);
		params = pickParams(vs,1);
		switch (A.getRnd(0,2)) {
		case 0: op = '+'; break;
		case 1: op = '-'; break;
		case 2: op = '*'; break;
		}
		rnd = A.getRnd(0,2);
		switch (rnd) {
		case 0:
		    left = A.createVarExp(params[0]);
		    right = A.createIntExp(A.getRnd(2,9));		    
		    break;
		case 1:
		    left = A.createIntExp(A.getRnd(2,9));		    
		    right = A.createVarExp(params[0]);
		    break;
		case 2:
		    left = A.createVarExp(params[0]);
		    right = A.createVarExp(params[0]);
		    break;
		}
		return A.createFnExp(params,[A.createPrimApp2Exp(op,left,right)]);
	    }// getRandomFunction function

	    function makeRecFunction(vName,fName,startValue,p) {
		var body;
		var v = A.createVarExp(vName);
		var one = A.createIntExp(1);
		var two = A.createIntExp(2);
		var rnd = A.getRnd(1,2);
		body = A.createIfExp(
		    A.createPrimApp2Exp(
			"===",v, A.createIntExp(startValue)),
		    A.createVarExp(p[0]),
		    A.createIfExp(
			A.createPrimApp2Exp(
			    "===", v, A.createIntExp(startValue+1)),
			A.createVarExp(p[1]),
			A.createPrimApp2Exp(
			    "+",
			    A.createAppExp(A.createVarExp(fName + rnd),
					   [ "args", A.createPrimApp2Exp(
						 "-", v,one) ]),
			    A.createAppExp(A.createVarExp(fName+(1+(rnd+2)%2)),
					   [ "args", A.createPrimApp2Exp(
					       "-", v,two) ]) ) ) );
		return A.createFnExp(vName, [ body ]);
	    }// makeRecFunction functiom

	    function getRndExpRP28part1() {
		// structure of exp: (fn(p) => (fn(fName)=>body arg) args)
		// p1 contains 1 to 3 integer vars and two function variables 
		// p2 is 1 to 2 vars such that p1 union p2 = {x,y,z}
		// block is the concatenation of block1 and block2
		// block1 calls both functions and prints either the values of
		// the args of the variable that the functions assigns to
		// block2 has the form:
		// fn(v) => [print (f);  set f = fn()=>v; print(f); ] int)
		var fName, vName, startValue, numSteps;	
		var fNames = ["f", "g", "h"];
		var vNames = ["i", "j", "k","m", "n", "p", "q"];
		var i, index1, index2, rnd, value;
		var variables = vs.split("");
		var p = [];
		var arg, args, body, f1, f2, fs, all;
		fName = fNames[A.getRnd(0,fNames.length-1)];
		vName = vNames[A.getRnd(0,vNames.length-1)];
		startValue = A.getRnd(-3,3);		
		numSteps = A.getRnd(4,6);
		p = pickParams(vs,2);
		fs = [ fName + "1" , fName + "2"];
		f1 = fs[0];
		f2 = fs[1];
		all = p.concat(fs);
		PLutils.shuffle(all);
		args = [];
		for(i = 0; i<all.length; i++) {
		    if (vs.indexOf(all[i]) > -1) {
			args.push(A.createIntExp(A.getRnd(4,10)));
		    } else {
			args.push(getRandomFunction(vs));
			if (all[i]===f1) {
			    f1 = [ f1, args[args.length-1] ];
			} else {
			    f2 = [ f2, args[args.length-1] ];
			}
		    }
		}		
		args.unshift("args");
		arg = [ "args", makeRecFunction(vName,fName,startValue,p)];
		body = [ ];
		body.push(A.createPrintExp(
		    A.createAppExp(A.createVarExp(fName),
				  ["args", 
				   A.createIntExp(startValue + numSteps)])));
		rnd = A.getRnd(1,2);
		body.push(A.createAssignExp(fName+rnd,A.createVarExp(fName)));
		body.push(A.createPrintExp(
		    A.createAppExp(A.createVarExp(fName),
				  ["args", 
				   A.createIntExp(startValue + numSteps)])));
		body.push(A.createAssignExp(fName+(1+(rnd+2)%2),
					    A.createVarExp(fName)));
		body.push(A.createPrintExp(
		    A.createAppExp(A.createVarExp(fName),
				  ["args", 
				   A.createIntExp(startValue + numSteps)])));

		// structure of exp: (fn(all) => (fn(fName)=>body arg) args)
		return A.createAppExp(
		    A.createFnExp(all,
				  [ A.createAppExp(
				      A.createFnExp(fName,body),
				      arg ) ] ),
		    args);
	    }// getRndExpRP28part1 function

	    function callByValueRP28part1(exp,envir) {
		var f = evalExpRP28part1(A.getAppExpFn(exp),envir);
		var args = evalExpsRP28part1(A.getAppExpArgs(exp),envir);
		if (E.isClo(f)) {
		    if (E.getCloParams(f).length !== args.length) {		
			throw new Error("Runtime error: wrong number of arguments in " +
					"a function call (" + E.getCloParams(f).length +
					" expected but " + args.length + " given)");
		    } else {
			var values = evalExpsRP28part1(E.getCloBody(f),
					      E.update(E.getCloEnv(f),
						       E.getCloParams(f),args));
			return values[values.length-1];
		    }
		} else {
		    throw f + " is not a closure and thus cannot be applied.";
		}    
	    }

	    function evalExpsRP28part1(list,envir) {
		return list.map( function(e) { return evalExpRP28part1(e,envir); } );
	    }

	    function evalExpRP28part1(exp,envir) {
		if (A.isIntExp(exp)) {
		    return E.createNum(A.getIntExpValue(exp));
		}
		else if (A.isVarExp(exp)) {
		    return E.lookup(envir,A.getVarExpId(exp));
		} else if (A.isPrintExp(exp)) {
		    SL.output += JSON.stringify(
			evalExpRP28part1( A.getPrintExpExp(exp), envir ));
		} else if (A.isPrint2Exp(exp)) {
		    SL.output += A.getPrint2ExpString(exp) +
				 (A.getPrint2ExpExp(exp) !== null ?
				  " " + JSON.stringify( evalExpRP28part1( A.getPrint2ExpExp(exp), 
								 envir ) )
				  : "");
		} else if (A.isAssignExp(exp)) {
		    var v = evalExpRP28part1(A.getAssignExpRHS(exp),envir);
		    E.lookupReference(
                        envir,A.getAssignExpVar(exp))[0] = v;
		    return v;
		} else if (A.isFnExp(exp)) {
		    return E.createClo(A.getFnExpParams(exp),
				       A.getFnExpBody(exp),envir);
		}
		else if (A.isAppExp(exp)) {
		    return callByValueRP28part1(exp,envir);
		} else if (A.isPrimApp1Exp(exp)) {
		    return SL.applyPrimitive(A.getPrimApp1ExpPrim(exp),
					     [evalExpRP28part1(A.getPrimApp1ExpArg(exp),envir)]);
		} else if (A.isPrimApp2Exp(exp)) {
		    return SL.applyPrimitive(A.getPrimApp2ExpPrim(exp),
					     [evalExpRP28part1(A.getPrimApp2ExpArg1(exp),envir),
					      evalExpRP28part1(A.getPrimApp2ExpArg2(exp),envir)]);
		} else if (A.isIfExp(exp)) {
		    if (E.getBoolValue(evalExpRP28part1(A.getIfExpCond(exp),envir))) {
			return evalExpRP28part1(A.getIfExpThen(exp),envir);
		    } else {
			return evalExpRP28part1(A.getIfExpElse(exp),envir);
		    }
		} else {
		    throw "Error: Attempting to evaluate an invalid expression";
		}
	    }// evalExpRP28part1 function

	    // convert two applications to let expressions
	    function convertToLetExpressions(exp) {		
		// exp always has the form:
		//     (fn(p)=>(fn(f)=>body arg) args)
		var letExp = [ "let" ];
		var i, p, args, f, innerFunc, arg, body;
		var fn = A.getAppExpFn(exp);
		var innerApp = A.getFnExpBody(fn)[0];
		var else1, else2,argStr, argStr1, argStr2, argStr3;
		p = A.getFnExpParams(fn);
		args = A.getAppExpArgs(exp);
		innerFunc = A.getAppExpFn(innerApp);
		f = A.getFnExpParams(innerFunc)[0];
		arg = A.getAppExpArgs(innerApp);
		body = A.getFnExpBody(innerFunc);
		for(i=0; i<p.length; i++) {
		    letExp.push("    " + p[i] + " = " + SL.printExp(args[i]));
		}
		letExp.push("in");
		letExp.push("    let");
		argStr = SL.printExp(arg[0]).split("else");
		letExp.push("        " + f + " = " + argStr[0]);
		letExp.push("                      else"  + argStr[1]);
		letExp.push("                           else"  + argStr[2]);
		letExp.push("    in");
		for(i=0; i<body.length-1; i++) {
		    letExp.push("        " + SL.printExp(body[i]) + ";");
		}
		letExp.push("        " + SL.printExp(body[i]));

		letExp.push("    end");
		letExp.push("end");
		return letExp;
	    }// convertToLetExpressions function
	    
	    iterations = 0;
	    while(true) {
		exp = undefined;
		iterations++;
		exp = getRndExpRP28part1();
		expStr =  convertToLetExpressions(exp);
		if (expStr.length > 500) { continue; }
		value = null;
		try {
		    expStr = undefined;
		    SL.output = "";
		    value = evalExpRP28part1(exp,globalEnv);
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

    window.RP28part1 = window.RP28part1 || RP28part1;

}());


