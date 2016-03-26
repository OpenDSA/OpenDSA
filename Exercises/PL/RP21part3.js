/* global console,  SLang, PLutils */
(function() {
  "use strict";

    var RP21part3 = {    

	init: function() {
	    var SL = SLang;
	    var A = SL.absyn;
	    var E = SL.env;
	    var vs = "xyz";
	    var maxDepth = 5;
	    var minDepth = 4;
	    var exp, expStr;
	    var ast, value, done;
	    var globalEnv = E.update(E.createEmptyEnv(),
				     ["x","y","z"],
				     [E.createNum(1),
				      E.createNum(2),
				      E.createNum(3)]);
	    var allVariables, selectedVar;

	    function pickParams(variables) {
		var n, i, result = [];
		variables = variables.split("");
		PLutils.shuffle(variables);
		n = SL.absyn.getRnd(1,3);
		for(i=0; i< n; i++) {
		    result.push(variables[0]);
		    variables.splice(0,1);
		}
		return result;
	    }

	    // same as printExp but output " " for all characters except
	    // for the selected variables (which becomes "-")
	    function underlineExp(exp) {
		function nSpaces(n) { return new Array(n+1).join(' '); }
		var i, params, args, result = "";
		var tmp;
		if (A.isVarExp(exp)) {
		    if (exp.selected) {
			return "-";
		    } else {
			return " ";
		    }
		    return A.getVarExpId(exp);
		} else if (A.isFnExp(exp)) {
		    result  = "   ";  // for "fn("
		    params = A.getFnExpParams(exp);
		    for(i=0; i< params.length; i++) {
			result += " "; // for params[i];  
			if (i<params.length-1) {
			    result += " ";  //  for ","
			}
		    }
		    result += "   " + // for )=>
		    underlineExp(A.getFnExpBody(exp));
		    return result;
		} else if (A.isAppExp(exp)) {
		    result = " " /* for "(" */ + 
			underlineExp(A.getAppExpFn(exp));	
		    args = A.getAppExpArgs(exp);
		    if (args.length > 0) {
			result += " ";
		    }
		    for(i=0; i<args.length-1; i++) {
			result += underlineExp(args[i]) + " ";
		    }
		    if (args.length>0) {
			result += underlineExp(args[args.length-1]);
		    }
		    result += " "; // for ")"
		    return result;
		} else if (A.isPrimAppExp(exp)) {
		    tmp = A.getPrimAppExpPrim(exp);
		    tmp = nSpaces(tmp.length);
		    result =  tmp + " ";  // for "("
		    args = A.getPrimAppExpArgs(exp);
		    for(i=0; i<args.length-1; i++) {
			result += underlineExp(args[i]) + " "; // for ","
		    }
		    if (args.length>0) {
			result += underlineExp(args[args.length-1]);
		    }
		    result += " ";  // for ")"
		    return result;
		} else if (A.isIntExp(exp)) {
		    tmp = A.getIntExpValue(exp) + "";
		    return nSpaces(tmp.length);
		} else { 
		    throw new Error("Unknown expression type: " +
				    JSON.stringify(exp));
		}
	    }// underlinexExp function

	    // store in the variable allVariables
	    // all of the variable expressions in exp
	    function collectVariables(exp) {
		var args, i;
		if (A.isVarExp(exp)) {
		    allVariables.push(exp);
		} else if (A.isFnExp(exp)) {
		    collectVariables(A.getFnExpBody(exp));
		} else if (A.isAppExp(exp)) {
		    collectVariables(A.getAppExpFn(exp));	
		    args = A.getAppExpArgs(exp);
		    for(i=0; i<args.length; i++) {
			collectVariables(args[i]);
		    }
		} else if (A.isPrimAppExp(exp)) {
		    args = A.getPrimAppExpArgs(exp);
		    for(i=0; i<args.length; i++) {
			collectVariables(args[i]);
		    }
		} else if (A.isIntExp(exp)) {
		    /* do nothing */
		    i++; // to remove jshint warning
		} else { 
		    throw new Error("Unknown expression type: " +
				    JSON.stringify(exp));
		}
	    }// collectVariables function

	    // eval the exp while storing with each variable expression in it
	    // its value
	    function evalExpRP21part3(exp,envir) {
		if (A.isIntExp(exp)) {
		    return E.createNum(A.getIntExpValue(exp));
		}
		else if (A.isVarExp(exp)) {
		    exp.value = E.lookup(envir,A.getVarExpId(exp));
		    return exp.value;
		}
		else if (A.isFnExp(exp)) {
		    return E.createClo(
			A.getFnExpParams(exp),A.getFnExpBody(exp),envir);
		}
		else if (A.isAppExp(exp)) {
		    var f = evalExpRP21part3(A.getAppExpFn(exp),envir);
		    var args = A.getAppExpArgs(exp)
			.map( function(arg) { 
			    return evalExpRP21part3(arg,envir); } );
		    if (E.isClo(f)) {
			if (E.getCloParams(f).length !== args.length) {		
			    throw new Error(
		"Runtime error: wrong number of arguments in " +
		"a function call (" + E.getCloParams(f).length +
		" expected but " + args.length + " given)");
			} else {
			    return evalExpRP21part3(E.getCloBody(f),
					   E.update(E.getCloEnv(f),
						    E.getCloParams(f),args));
			}
		    } else {
			throw new Error(
			    f + 
			" is not a closure and thus cannot be applied.");
		    }
		} else if (A.isPrimAppExp(exp)) {
		    return SL.applyPrimitive(
			A.getPrimAppExpPrim(exp),
			A.getPrimAppExpArgs(exp).map( function(arg) { 
			    return evalExpRP21part3(arg,envir); } ));
		} else {
		    throw new Error(
			"Error: Attempting to evaluate an invalid expression");
		}
	    }// evalExpRP21part3

	    function getRndExpRP21part3() {
		// structure of exp: (fn(p1)=>(fn(p2)=>body args2) args)
		// p1 is 1 to 3 vars and args is the same # of vars/ints
		// p2 is 1 to 2 vars such that p1 union p2 = {x,y,z}
                // the length of args2 is equal to the length of p2
		// body has depth 2 and only uses variables as leaves
		var i, index1, index2, rnd;
		var variables = vs.split("");
		var p1 = [], p2 = [], p1Length, p2Length;
		var args = ["args"],  args2 = ["args"];
		var exp, body = SL.absyn.getProgramExp(
		    SL.absyn.generateRandomSLang1Program(
			0,2,2,"xyz",""));
		p1 = pickParams(vs);
		p2 = pickParams(vs);
		// make sure all variables appear in p1 union p2
		for(i=0; i<variables.length; i++) {
		    index1 = p1.indexOf(variables[i]);
		    index2 = p2.indexOf(variables[i]);
		    if (index1 === -1 && index2 === -1) {
			rnd = SL.absyn.getRnd(0,10);
			if (rnd===1) {
			    if (index1===-1) {
				p1.push(variables[i]);
			    } else {
				p2.push(variables[i]);
			    }
			} else {
			    if (index2===-1) {
				p2.push(variables[i]);
			    } else {
				p1.push(variables[i]);
			    }
			}
		    }
		}
		// build args2
		for(i=0; i < p2.length; i++) {
		    rnd = SL.absyn.getRnd(0,2);
		    switch (rnd) {
			case 0:  // a single variable
			args2.push(SL.absyn.createVarExp(
			    variables[SL.absyn.getRnd(0,variables.length-1)]));
			break;
			case 1:  // add1(<var>)
			args2.push(
			    SL.absyn.createPrimAppExp(
				"add1",
				[ SL.absyn.createVarExp(
				    variables[SL.absyn.getRnd(
					0,variables.length-1)]) ] ));
			break;
			case 2:  // +(<var>,<var>) or *(same)
			args2.push(
			    SL.absyn.createPrimAppExp(
				SL.absyn.getRnd(0,1)===0 ? "+" : "*",
				[ SL.absyn.createVarExp(
				    variables[SL.absyn.getRnd(
					0,variables.length-1)]),
				  SL.absyn.createVarExp(
				      variables[SL.absyn.getRnd(
					  0,variables.length-1)]) ] ));

			break;
		    }// switch
		}// for loop

		// build args
		for(i=0; i < p1.length; i++) {
		    rnd = SL.absyn.getRnd(0,2);
		    rnd = 2;
		    switch (rnd) {
		    case 0: 
			args.push(SL.absyn.createVarExp(
			    variables[SL.absyn.getRnd(0,variables.length-1)]));
			break;
		    case 1:
			args.push(SL.absyn.createIntExp(
			    SL.absyn.getRnd(4,20)));
			break;
		    case 2:
			args.push(SL.absyn.createFnExp(
			    [ variables[SL.absyn.getRnd(0,
							variables.length-1)] ],
			    SL.absyn.createIntExp(SL.absyn.getRnd(0,10))
			));
			break;
		    }
		}
		exp = SL.absyn.createAppExp(
		    SL.absyn.createFnExp(
			p1,
			SL.absyn.createAppExp(
			    SL.absyn.createFnExp(p2,getRndExp(0,2)),
			    args2)),
		    args);
		return exp;
	    }// getRndExp function

	    function getRndExp(min,max) {
		return SL.absyn.getProgramExp(
		    SL.absyn.generateRandomSLang1Program(
			0,min,max,"xyz",""));
	    }// getRndExp function
	    
	    while (true) {
		exp = getRndExpRP21part3();
		expStr = SL.printExp(exp);
		if (expStr.length > 50) { continue; }
		done = true;
		try {
		    // eval just to make sure that the whole exp has a value
		    SL.evalExp(exp,globalEnv);
		} catch (e) {
		    done = false;
		}
		if (done) {
		    break;
		}
	    }


	    allVariables = [];
	    collectVariables(exp);
	    // pick one variable
	    selectedVar = allVariables[A.getRnd(0,allVariables.length-1)];
	    selectedVar.selected = true;
	    // eval again to get the value of the selected variable
	    evalExpRP21part3(exp,globalEnv);
	    //console.log(JSON.stringify(allVariables));
	    this.expression = SL.printExp(exp);
	    this.underlinedExpression = underlineExp(exp);
	    this.answer = E.isNum(selectedVar.value) ?
		(E.getNumValue(selectedVar.value) + "") : "closure";
				
	    //console.log(this.answer);
	},// init function

	validateAnswer: function (studentAnswer) {
	    return this.answer.replace(/\s+/g,"") ===
		studentAnswer.replace(/\s+/g,"");
	}// validateAnswer function

    };

    window.RP21part3 = window.RP21part3 || RP21part3;

}());


