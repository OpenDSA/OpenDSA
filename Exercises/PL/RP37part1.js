/* global console,  SLang, PLutils */
(function() {
  "use strict";

    var RP37part1 = {    

	init: function() {
	    var SL = SLang;
	    var A = SL.absyn;
	    var E = SL.env;
	    var vTop, vTopCount, vMid, vMidCount, mMid, vBot, vBotCount, mBot;
	    var ast, cNames, mNames;
	    var varsFromMidUp, varsFromBotUp;

	    function initRandomParts() {
		var i;
		var classNames = [ ["A","B","C"],
				   ["C1","C2","C3"],
				   ["C","D","E"],
				   ["X","Y","Z"] ];
		
		var methodNames = [ ["f","g","h"],
				    ["i","j","k"],
				    ["m1","m2","m3"],
				    ["f1","f2","f3"],
				    ["g1","g2","g3"] ];
		var options = [ 0, 1, 2, 3, 4];
		var varNames = [ ["a","b","c"],
				 ["b","c","d"],
				 ["c","d","e"],
				 ["p","q","r"],
				 ["x","y","z"],
				 ["u","v","w"],
				 ["s","t","u"] ];

		PLutils.shuffle(options); // used for method names
		cNames = classNames[ PLutils.getRnd(0,classNames.length-1)];

		// root (top) class
		vTop = varNames[ PLutils.getRnd(0,varNames.length-1)];
		vTopCount = PLutils.getRnd(1,3);
		// no methods, just initialize

		// middle class
		vMid = varNames[ PLutils.getRnd(0,varNames.length-1)];
		vMidCount = PLutils.getRnd(1,3);
		mMid = methodNames[ options[0] ];

		// bottom class
		vBot = varNames[ PLutils.getRnd(0,varNames.length-1)];
		vBotCount = PLutils.getRnd(1,3);
		mBot = methodNames[ options[1] ];

	    }// initRandomParts function

	    function buildAST() {
		var tmp, classes = [];
		var i, j, classIndex, numIVars, iVarsTop, iVarsMid, iVarsBot;
		var methods, methodIndex = 0, params;
		var body, fn, args, mainBody;

		// pick instance variables for all classes
		PLutils.shuffle(vTop);
		iVarsTop = [];
		for(i=0; i<vTopCount; i++) { iVarsTop.push(vTop[i]);  }
		PLutils.shuffle(vMid);
		iVarsMid = [];
		for(i=0; i<vMidCount; i++) { iVarsMid.push(vMid[i]);  }
		PLutils.shuffle(vBot);
		iVarsBot = [];
		for(i=0; i<vBotCount; i++) { iVarsBot.push(vBot[i]);  }

		// compute the unin of all ivars
		// for top and middle classes
		// for all three classes
		tmp = [];
		for(i=0; i<iVarsTop.length; i++) {
		    tmp.push( iVarsTop[i] );
		}
		for(i=0; i<iVarsMid.length; i++) {
		    tmp.push( iVarsMid[i] );
		}
		// remove dups
		varsFromMidUp = tmp.filter(function(item, pos) {
		    return tmp.indexOf(item) === pos;
		});
		for(i=0; i<iVarsBot.length; i++) {
		    tmp.push( iVarsBot[i] );
		}
		// remove dups
		varsFromBotUp = tmp.filter(function(item, pos) {
		    return tmp.indexOf(item) === pos;
		});

		PLutils.shuffle(varsFromMidUp);
		PLutils.shuffle(varsFromBotUp);
		//console.log(varsFromMidUp);
		//console.log(varsFromBotUp);

		// top class
		switch (vTopCount) {
		    case 1: 
		    params = [ "m" ]; 
		    body = [A.createAssignExp(iVarsTop[0],
					      A.createVarExp("m"))]; 
		    break;
		    case 2: 
		    params = [ "m", "n" ]; 
		    body = [ A.createAssignExp(iVarsTop[0],
					       A.createVarExp("m")),
			     A.createAssignExp(iVarsTop[1],
					       A.createVarExp("n")) ]; 
		    break;
		    case 3: 
		    params = [ "m", "n", "o" ]; 
		    body = [ A.createAssignExp(iVarsTop[0],A.createVarExp("m")),
			     A.createAssignExp(iVarsTop[1],A.createVarExp("n")),
			     A.createAssignExp(iVarsTop[2],A.createVarExp("o"))
			   ]; 

		    break;
		}
		methods = [];
		methods.push(A.createMethod("initialize",params,body));
		classes.push(A.createClass(cNames[0],"Object",
					   iVarsTop,methods));

		// middle class
		methods = [];
		params = [ "m", "n", "o"];
		for(i=0; i<iVarsMid.length; i++) { 
		    methods.push(A.createMethod(
			mMid[i],[params[i]],
			[ A.createAssignExp(varsFromMidUp[i],
					    A.createVarExp(params[i])) ]));
		}
		classes.push(A.createClass(cNames[1],cNames[0],
					   iVarsMid,methods));

		// bottom class
		methods = [];
		for(i=0; i<iVarsBot.length; i++) { 
		    methods.push(A.createMethod(
			mBot[i],[params[i]],
			[ A.createAssignExp(varsFromBotUp[i],
					    A.createVarExp(params[i])) ]));
		}
		classes.push(A.createClass(cNames[2],cNames[1],
					   iVarsBot,methods));


		// main body
		body = [];
		for(i=0; i<vMidCount; i++) {
		    body.push( A.createMethodCall(
			A.createVarExp("o"),
			mMid[i],
			[A.createIntExp(PLutils.getRnd(1,9)) ] ));
		}
		for(i=0; i<vBotCount; i++) {
		    body.push( A.createMethodCall(
			A.createVarExp("o"),
			mBot[i],
			[A.createIntExp(PLutils.getRnd(1,9)) ] ));
		}
		body.push(A.createPrintExp(A.createVarExp("o")));
		fn = A.createFnExp(["o"],body);
		args = [];
		for(i=0; i<vTopCount; i++) {
		    args.push(A.createIntExp(PLutils.getRnd(1,9)));
		}
		mainBody = [ A.createAppExp(
		    fn,
		    [ "args", A.createNewExp(cNames[2],args) ] ) ];
		return A.createProgram(classes,mainBody);

	    }

	    function getSourceForMethod(m) {
		var i, numMethods;
		var code = "  method " + A.getMethodName(m) + " (" +
		    A.getMethodParams(m) + ") { ";
		numMethods = A.getMethodBody(m).length;
		for(i=0; i<numMethods-1; i++) {
		    code += SLang.printExp(A.getMethodBody(m)[i]) + "; ";
		}
		code += SLang.printExp(A.getMethodBody(m)[numMethods-1]) + " }";
		return code;
	    }
	    function getSourceForClass(c) {
		var i, code = [];
		var numVars = A.getClassIvars(c).length;
		var numMethods = A.getClassMethods(c).length;
		var iVars = " ";
		code.push("class " + A.getClassName(c) + " extends " +
		    A.getClassSuperClass(c) + " {");
		for(i=0; i<numVars; i++) {
		    iVars += " protected " + A.getClassIvars(c)[i];
		}
		if (iVars.length > 1) {  // at least one instance variable
		    code.push(iVars);
		}
		for(i=0; i<numMethods; i++) {
		   code = code.concat(getSourceForMethod(
		       A.getClassMethods(c)[i]));
		}
		code.push("}");
		return code;
	    }
	    function getSourceCode(ast) {
		var code = [];
		var classes = A.getProgramDecls(ast);
		var mainMethodCall = A.getProgramMainBody(ast)[0];
		var i, args;
		var mainBody, newExp, newExpArgs, fn, body;
		newExp = A.getAppExpArgs(mainMethodCall)[0];
		newExpArgs = A.getNewExpArgs(newExp);
		fn = A.getAppExpFn(mainMethodCall);		
		body = A.getFnExpBody(fn);
		for(i=0; i<classes.length; i++) {
		    code = code.concat(getSourceForClass(classes[i]));
		}
		code.push("public class Driver extends Object {");
		code.push("  method main() {");
		code.push("    let");
		args = [];
		for(i=0; i<newExpArgs.length; i++) {
		    args.push(A.getIntExpValue(newExpArgs[i]));
		}
		code.push("        o = new " + cNames[2] + "(" + args + ")" );
		code.push("    in");
		for(i=0; i<body.length-1 ; i++) {
		    code.push("      " + SLang.printExp(body[i]) + ";");
		}
		code.push("      " + SLang.printExp(body[body.length-1]));
		code.push("    end");
		code.push("  }");
		code.push("}");
		return code;
	    }// getSourceCode function


function evalExpRP37part1(exp,envir) {
    var f, v, args, values, obj, sup;
    if (A.isIntExp(exp)) {
	return E.createNum(A.getIntExpValue(exp));
    } else if (A.isVarExp(exp)) {
	return E.lookup(envir,A.getVarExpId(exp));
    } else if (A.isPrintExp(exp)) {
	SLang.output += JSON.stringify(
	    evalExpRP37part1( A.getPrintExpExp(exp), envir ));
    } else if (A.isPrint2Exp(exp)) {
	console.log( A.getPrint2ExpString(exp) +
		     (A.getPrint2ExpExp(exp) !== null ?
		      " " + JSON.stringify( evalExpRP37part1( A.getPrint2ExpExp(exp), 
						     envir ) )
		      : ""));
    } else if (A.isAssignExp(exp)) {
	v = evalExpRP37part1(A.getAssignExpRHS(exp),envir);
	E.lookupReference(
                        envir,A.getAssignExpVar(exp))[0] = v;
	return v;
    } else if (A.isFnExp(exp)) {
	return E.createClo(A.getFnExpParams(exp),
				   A.getFnExpBody(exp),envir);
    } else if (A.isAppExp(exp)) {
	f = evalExpRP37part1(A.getAppExpFn(exp),envir);
	args = evalExpsRP37part1(A.getAppExpArgs(exp),envir);
	if (E.isClo(f)) {
	    if (E.getCloParams(f).length !== args.length) {		
		throw new Error("Runtime error: wrong number of arguments in " +
				"a function call (" + E.getCloParams(f).length +
				" expected but " + args.length + " given)");
	    } else {
		values = evalExpsRP37part1(E.getCloBody(f),
			          E.update(E.getCloEnv(f),
					   E.getCloParams(f),args));
		return values[values.length-1];
	    }
	} else {
	    throw f + " is not a closure and thus cannot be applied.";
	}
    } else if (A.isPrim1AppExp(exp)) {
        return SLang.applyPrimitive(A.getPrim1AppExpPrim(exp),
			      [evalExpRP37part1(A.getPrim1AppExpArg(exp),envir)]);
    } else if (A.isPrim2AppExp(exp)) {
        return SLang.applyPrimitive(A.getPrim2AppExpPrim(exp),
			      [evalExpRP37part1(A.getPrim2AppExpArg1(exp),envir),
			       evalExpRP37part1(A.getPrim2AppExpArg2(exp),envir)]);
    } else if (A.isIfExp(exp)) {
	if (E.getBoolValue(evalExpRP37part1(A.getIfExpCond(exp),envir))) {
	    return evalExpRP37part1(A.getIfExpThen(exp),envir);
	} else {
	    return evalExpRP37part1(A.getIfExpElse(exp),envir);
	}
    } else if (A.isThisExp(exp)) {
	return E.lookup(envir,"_this");
    } else if (A.isNewExp(exp)) {
	args = evalExpsRP37part1(A.getNewExpArgs(exp),envir);
	obj = SLang.makeNewObject(A.getNewExpClass(exp));
	SLang.findAndInvokeMethod("initialize",A.getNewExpClass(exp),obj,args);
        return obj;
    } else if (A.isMethodCall(exp)) {
	obj = evalExpRP37part1(A.getMethodCallObject(exp),envir);
	args = evalExpsRP37part1(A.getMethodCallArgs(exp),envir);
	return SLang.findAndInvokeMethod(A.getMethodCallMethod(exp),
				   SLang.getClassNameInterp(E.getObjectState(obj)),
				   obj, 
				   args
				   );
    } else if (A.isSuperCall(exp)) {
	obj = E.lookup(envir,"_this");
	sup = E.lookup(envir,"_super");
	args = evalExpsRP37part1(A.getSuperCallArgs(exp),envir);
	return SLang.findAndInvokeMethod(A.getSuperCallMethod(exp),
				   E.getClassNameName(sup),
				   obj, 
				   args
				   );
    } else {
	throw new Error("Error: Attempting to evaluate an invalid expression");
    }
}
	    function evalExpsRP37part1(list,envir) {
		return list.map( function(e) { return evalExpRP37part1(e,envir); } );
	    }

	    initRandomParts();	    
	    ast = buildAST();
	    // eval the program
	    SLang.output = "";
	    SLang.numFindAndInvoke = 0;
	    SLang.elaborateDecls(A.getProgramDecls(ast));
	    var values = evalExpsRP37part1(A.getProgramMainBody(ast),
				       E.createEmptyEnv());
	    this.program = getSourceCode(ast).join("<br />");
	    this.answer = SLang.numFindAndInvoke + "";
	    //console.log(this.answer);
	}, // init function

	validateAnswer: function (guess) {
	    return this.answer.replace(/\s+/g,"") ===
		guess.replace(/\s+/g,"");
	}// validateAnswer function

    };

    window.RP37part1 = window.RP37part1 || RP37part1;

}());


