/* global console,  SLang, PLutils */
(function() {
  "use strict";

    var RP21part5 = {    

	init: function() {
	    var SL = SLang;
	    var A = SL.absyn;
	    var E = SL.env;
	    var vs = "xyz";
	    var exp, expStr,value;
	    var globalEnv = E.update(E.createEmptyEnv(),
				     ["x","y","z"],
				     [E.createNum(1),
				      E.createNum(2),
				      E.createNum(3)]);
	    var allVariables, selectedVar;
	    var varBoundToClosure, varBoundToInt;
	    var maxLength = 50;
	    var rnd, params, body, env;
	    var isClo = function (v) { return E.isClo(v.value); };
	    var isNum = function (v) { return E.isNum(v.value); };
	    
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
	    // all of the variable expressions in exp that have a value
	    //(must be called AFTER exp has been evaluated)
	    function collectVariables(exp) {
		var args, i;
		if (A.isVarExp(exp)) {
		    if (exp.value) {
			allVariables.push(exp);
		    }
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
	    function evalExpRP21part5(exp,envir) {
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
		    var f = evalExpRP21part5(A.getAppExpFn(exp),envir);
		    var args = A.getAppExpArgs(exp)
			.map( function(arg) { 
			    return evalExpRP21part5(arg,envir); } );
		    if (E.isClo(f)) {
			if (E.getCloParams(f).length !== args.length) {		
			    throw new Error(
		"Runtime error: wrong number of arguments in " +
		"a function call (" + E.getCloParams(f).length +
		" expected but " + args.length + " given)");
			} else {
			    return evalExpRP21part5(E.getCloBody(f),
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
			    return evalExpRP21part5(arg,envir); } ));
		} else {
		    throw new Error(
			"Error: Attempting to evaluate an invalid expression");
		}
	    }// evalExpRP21part5

	    function getRndExpRP21part5() {
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
		    //rnd = 2;
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
			    pickParams(vs),
			    ( A.getRnd(0,1) === 0 ?
			      SL.absyn.createIntExp(SL.absyn.getRnd(0,30)) :
			      SL.absyn.createVarExp(
				  variables[
				      SL.absyn.getRnd(0,variables.length-1)]))
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

	    // to limit the number of lines used up by the JSON format, pack
	    // as much on each line (but only up to MaxLength characters)
	    // Precondition: 
	    //     exp is either a string, or an array in which the first
	    //     element is always a string
	    function myStringify(indent,arr,maxLength) {
		//function nSpaces(n) { return new Array(n+1).join(' '); }
		var spaces = new Array(indent+1).join(' ');
		var line = JSON.stringify(arr);
		if (line.length <= maxLength) {
		    return [ spaces + line ];
		}
		var i, result = [], prefix, suffix; 
		for(i=0; i<arr.length; i++) {
		    prefix = spaces + (i=== 0 ? "[ " : "  ");
		    suffix = i === arr.length-1 ? "" : ",";
		    if (typeof arr[i] === "object") {
			line = JSON.stringify(arr[i]);
			if (line.length <= maxLength) {
			    result.push( prefix + line + suffix);
			} else {
			    result = result.concat(
				myStringify(indent+2,arr[i],maxLength)
			    );
			}
		    } else {
			// array element is a string or a number
			if (typeof(arr[i]) === "string") {
			    result.push(prefix + '"' + arr[i] + '"' + suffix);
			} else {
			    result.push(prefix  + arr[i] + suffix);
			}
		    }

		}
		result[result.length-1] = 
		    result[result.length-1] + "]";
		return result;
	    }// myStringify function

	    // return any integer value that is in the global environment or
	    // in the given expression but is different from the third arg
	    function pickAnotherInteger(exp,v,excluded)
	    {
		var globalValue = E.lookup(globalEnv,v);
		if (A.getRnd(0,1) === 0) {
		    // pick the variable's value from the global env if possible
		    if (E.getNumValue(globalValue) !== excluded) {
			return globalValue;
		    }
		}
		var values = expStr.match(/[0-9]+/g) // from exp
		    .map(function (s) { return Number(s); })
		    .filter(function (v) { return v !== excluded; } );
		if (values.length > 0) {
		    // return a value from the expression		    
		    return E.createNum(values[A.getRnd(0,values.length-1)]);
		} else {
		    return E.createNum(excluded + 1);
		}
	    }// pickAnotherInteger function
	    
	    function pickRandomParams(params) {
		var variables = vs.split("");
		var newVar;
		switch (params.length) {
		case 0:
		    return [ variables[A.getRnd(0,variables.length-1)] ];
		case 1:
		    if (A.getRnd(0,1)===0) {
			// add another var
			while ((newVar = 
			       variables[A.getRnd(0,variables.length-1)]) ===
			      params[0]) { /* empty */ var x=1; }
			if (A.getRnd(0,1)===0) {
			    // add at beginning
			    params.unshift(newVar);
			} else {
			    // add at end
			    params.push(newVar);
			}
			return params;
		    } else {
			// delete param
			return [];
		    }
		    break;
		default:  // 2 or 3 params
		    switch (A.getRnd(0,2)) {
			case 0:
			params.pop();
			break;
			case 1:
			params.splice(1,0);
			break;
			case 2:
			params.shift();
			break;
		    }
		    return params;			    
		}// top-level switch
	    }// pickRandomParams function

	    function pickRandomBody(body) {
		var bodyStr = SL.printExp(body);
		var newBody = getRndExp(0,1);
		while (bodyStr === SL.printExp(newBody)) {
		    newBody = getRndExp(0,1);
		}
		return newBody;
	    }// pickRandomBody

	    function pickRandomEnv(env) {
		var variables = vs.split("");
		var bindings = E.getEnvBindings(env);
		if (! E.isEmptyEnv(env)) {
		    if (A.getRnd(0,4)===0) {
			return E.createEmptyEnv();
		    } else {
			// delete one of the bindings
			bindings.splice(A.getRnd(0,bindings.length-1),1);
			return E.createEnv(
			    bindings, E.getEnvEnv(env));
		    }
		} else {
		    return E.createEnv(
			[[variables[A.getRnd(0,variables.length-1)],
			  E.createNum(A.getRnd(0,10))]],
			env);
		}
	    }// pickRandomEnv

	    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	    // pick an expression
	    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

	    while (true) {
		exp = getRndExpRP21part5();
		expStr = SL.printExp(exp);
		if (expStr.length > 50) { continue; }
		try {
		    value = evalExpRP21part5(exp,globalEnv);
		} catch (e) {
		    // expression does not have a value; discard it
		    continue;
		}
		// expression has a value; but another condition  must hold:
		// at least one variable must be bound to a closure
		// and at least one variable must be bound to an integer
		allVariables = [];	   
		collectVariables(exp);
		varBoundToClosure = allVariables.filter( isClo );
		varBoundToInt = allVariables.filter( isNum );
		if (varBoundToClosure.length !== 0  &&
		    varBoundToInt.length !== 0) {
		    break;
		}
	    }// while loop

	    this.expression = expStr;

	    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	    //  	   pick correct answer
	    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

	    if (A.getRnd(0,1)===0) {
	
		// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
		// correct answer is True and ...
		this.answer = "True";
		if (A.getRnd(0,1)===0) {
		    // --------------------------------
		    // ... correct  value is a closure
		    selectedVar = 
			varBoundToClosure[A.getRnd(
			    0,varBoundToClosure.length-1)];
		    value = selectedVar.value;
		} else {
		    // --------------------------------
		    // ... correct  value is an integer
		    selectedVar = 
			varBoundToInt[A.getRnd(
			    0,varBoundToInt.length-1)];
		    value = selectedVar.value;
		}
	    } else {
		// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
		// correct answer is False and ...		
		this.answer = "False";	
		if (A.getRnd(0,1)===0) {
		    // --------------------------------------------
		    // ... selected variable value is a closure ...
		    selectedVar = 
			varBoundToClosure[A.getRnd(
			    0,varBoundToClosure.length-1)];
		    if (A.getRnd(0,1)===0) {
			// ... display another closure
			rnd = A.getRnd(0,2);
			params = E.getCloParams(selectedVar.value);
			body = E.getCloBody(selectedVar.value);	
			env = E.getCloEnv(selectedVar.value);
			switch (rnd) {
			    case 0: // change parameters of closure
			    value = E.createClo(
				pickRandomParams(params),body,env);
			    break;
			    case 1: // change body of closure
			    value = E.createClo(
				params,pickRandomBody(body),env);
			    break;
			    case 2: // change env of closure
			    value = E.createClo(
				params,body,pickRandomEnv(env));
			    break;
			}
		    } else {
			// ... display an integer
			 value = varBoundToInt[A.getRnd(
			     0,varBoundToInt.length-1)].value;
		    }
		} else {
		    // ---------------------------------------------
		    // ... selected variable value is an integer ...
		    selectedVar = 
			varBoundToInt[A.getRnd(
			    0,varBoundToInt.length-1)];

		    if (A.getRnd(0,1)===0) {
			// ... display another integer
			value = pickAnotherInteger(
			    exp,
			    A.getVarExpId(selectedVar),
			    E.getNumValue(selectedVar.value));

		    } else {
			// ... display a closure
			value = varBoundToClosure[A.getRnd(
			    0,varBoundToClosure.length-1)].value;
		    }
		}
		
	    }

	    selectedVar.selected = true;		    
	    this.underlinedExpression = underlineExp(exp);
	    this.value = myStringify(0,value,maxLength)
		.join("<br />");
	    //console.log(JSON.stringify(selectedVar.value));
	}// init function

    };

    window.RP21part5 = window.RP21part5 || RP21part5;

}());


