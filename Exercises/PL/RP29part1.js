/* global console, SLang  */
(function() {
  "use strict";

    var RP29part1 = {    

	init: function() {
	    var SL = SLang;
	    var A = SL.absyn;
	    var E = SL.env;
	    var globVar, globVal;
	    var arrName, arrLen, arrVals = [];
	    var mainVal, mainParams = [ ];
	    var fooParams = [], fooParamConstIndex;
	    var fooBody, fooBodyBlock = [], fooBodyLen;
	    var vs = "xyz";	    
	    var fs = "fgh";
	    var exp, expStr;
	    var value, value2, value3, rnd, iterations;
	    var globalEnv = E.update(E.createEmptyEnv(),
				     ["x","y","z"],
				     [E.createNum(1),
				      E.createNum(2),
				      E.createNum(3)]);
	    var tooLong = function (s) { return s.length > 3; };

	    function getRandomLHS() {
		var rnd = A.getRnd(0,4);
		switch (rnd) {
		case 0: return fooParams[0];		    
		case 1: return fooParams[1];		
		case 2: return globVar;
		case 3: return arrName + "[" + A.getRnd(0,arrLen-1) + "]";
		case 4: return arrName + "[" + globVar + "]";
		}
	    }//  getRandomLHS function

	    function getRandomRHS(LHS) {
		var rnd = A.getRnd(0,5);
		var index, output;		
		if (LHS === globVar) {
		    output = A.getRnd(0,arrLen-1);
		    if (output === globVal) {
			output = (output + 1) % arrLen;
		    }
		    return output;
		}
		switch (rnd) {
		case 0:  // integer
		    return (headsOrTails() ? 1 : -1) * A.getRnd(0,10);
		case 1:  // parameter
		    index = fooParams.indexOf(LHS);
		    if (index === -1) {
			return fooParams[A.getRnd(0,fooParams.length-1)];
		    } else {
			return fooParams[(index+1) % fooParams.length];
		    }
		    break;
		case 2: // globalArray element
		    output = arrName + "[" + globVar + "]";
		    if (LHS === output) {
			return arrName + "[" + A.getRnd(0,arrLen-1) + "]";
		    } else {
			return output;
		    }
		    break;
		case 3: // addition
		    return A.createPrimApp2Exp( '+',			
			A.createVarExp(
			    fooParams[A.getRnd(0,fooParams.length-1)]),
			A.createIntExp(A.getRnd(1,10)));
		case 4: // subtraction
		    return A.createPrimApp2Exp( '-',			
			A.createVarExp(
			    fooParams[A.getRnd(0,fooParams.length-1)]),
			A.createIntExp(A.getRnd(1,10)));
		case 5: // multiplication
		    return A.createPrimApp2Exp( '*',			
			A.createVarExp(
			    fooParams[A.getRnd(0,fooParams.length-1)]),
			A.createIntExp(A.getRnd(2,10)));
		}
	    }// getRandomRHS function

	    function getRandomAssignment() {
		var LHS = getRandomLHS();
		var RHS = getRandomRHS(LHS);
		while (JSON.stringify(RHS) === JSON.stringify(LHS)) {
		       RHS = getRandomRHS(LHS);
		}
		return [LHS,RHS];
	    }// getRandomAssignment function

	    function tweakAssignments(block) {
		var i, output = [ block[0] ];
		var str, strArray = [ JSON.stringify(block[0]) ];
		var indexGlobVar = -1, indexArrGlobVar = -1, tmp;
		// remove duplicates
		for(i = 1; i<block.length; i++) {
		    str = JSON.stringify(block[i]);
		    if (strArray.indexOf(str) === -1) {
			output.push( block[i] );
			strArray.push(str);
		    }
		}
		// make sure that, if both are present, the assingment to 
		// appears before the assignment to the global array indexed
		// by globVar 
		for(i = 0; i<output.length; i++) {
		    if (output[i][0] === globVar) {
			indexGlobVar = i;
			break;
		    }		    
		}
		for(i = 0; i<output.length; i++) {
		    if (output[i][0] === arrName + "[" + globVar + "]") {
			indexArrGlobVar = i;
			break;
		    }		    
		}
		if (indexGlobVar > -1 &&  indexArrGlobVar > -1 && 
		    indexGlobVar > indexArrGlobVar) {
		    // swap them
		    tmp = output[indexArrGlobVar];
		    output[indexArrGlobVar] = output[indexGlobVar];
		    output[indexGlobVar] = tmp;
		}
		return output;
	    }
	    function initRandomParts() {
		var i;
		var globVars = [ "f", "g", "h" ];
		var arrNames = [ "a", "b", "c" ];
		globVar = globVars[ A.getRnd(0,globVars.length-1)];
		arrName = arrNames[ A.getRnd(0,arrNames.length-1)];
		arrLen = A.getRnd(3,5);
		globVal = A.getRnd(0,arrLen-1);		
		for(i=0; i<arrLen; i++) {
		    arrVals.push((headsOrTails() ? 1 : -1)*A.getRnd(0,10));
		}
		mainVal = A.getRnd(0,arrLen-1);
		if (mainVal === globVal) {
		    mainVal = (mainVal + 1) % arrLen;
		}
		switch (A.getRnd(0,2)) {
		    case 0: fooParams = ["p","q"]; break;
		    case 1: fooParams = ["r","s"]; break;
		    case 2: fooParams = ["u","v"]; break;
		}
		fooParamConstIndex = headsOrTails() ? 0 : 1;
		fooBody = [];
		fooBodyLen = A.getRnd(3,6);
		for(i=0; i<fooBodyLen; i++) {
		    fooBody.push(getRandomAssignment());
		}
		fooBody = tweakAssignments(fooBody);
		fooBodyLen = fooBody.length;
	    }// initRandomParts function


	    function getPseudocode() {
		var i, output = [], line;
		var left, op ,right;
		output.push("int " + globVar + " = " + globVal + ";");
		line = "int " + arrName + "[" + arrLen + "] = { ";
		for(i=0; i<arrLen-1; i++) {
		    line += arrVals[i] + ", ";
		}
		line += arrVals[i] + " };";
		output.push(line);
		output.push("");
		output.push("void foo(int " + fooParams[0] + ", int " + 
			    fooParams[1] + ") {");
		for(i=0; i<fooBodyLen; i++) {
		    if (typeof fooBody[i][1] === "object") {
			// a primitive application
			op = A.getPrimApp2ExpPrim(fooBody[i][1]);
			left = A.getVarExpId(
			    A.getPrimApp2ExpArg1(fooBody[i][1]));
			right = A.getIntExpValue(
			    A.getPrimApp2ExpArg2(fooBody[i][1]));
			output.push( "  " + fooBody[i][0] + " = " +  	     
				     left + " " + op + " " + right + ";");
		    } else {
			output.push("  " + fooBody[i][0] + " = " +  	    
				    fooBody[i][1] + ";");
		    }
		}
		output.push("  print " + fooParams[0] + ";");
		output.push("  print " + fooParams[1] + ";");
		output.push("  print " + globVar + ";");
		output.push("}");
		output.push("int main() {");
		output.push("  int " + globVar + " = " + mainVal + ";");
		if (fooParamConstIndex === 0) {
		    output.push("  foo(" + arrName + "[" + mainVal + "], " +
				arrName + "[" + globVar + "]);");
		} else {
		    output.push("  foo(" + arrName + "[" + globVar + "], " +
				arrName + "[" + mainVal + "]);");
		}
		output.push("  print " + globVar + ";");
		for(i=0; i<arrLen; i++) {
		    output.push("  print " + arrName + "[" + i + "];");
		}
		output.push("}");
		return output;
	    }
	    function headsOrTails() {
		return A.getRnd(0,1)===0;
	    }

	    function makeSLangExp(s) {
		var indexLeftBrack, indexRightBrack, index;
		if (isFinite(s)) {
		    return A.createIntExp(s);
		} else 	if (typeof s === "object") {
		    //s is already a SLang exp
		    return s;
		} else {
		    // s is a simple variable or an array element
		    return A.createVarExp(s);
		}
	    }
	    function getRndExpRP29part1() {
		/*
		// structure of exp in peudocode:
		

		int h = 2;                   // globVar
		int a[3] = { -7, 7, -9 };    // arr

		void foo(int p, int q) {     // fooParams
		    h = 0;
		    a[h] = p * 6;
		    a[h] = p;
		    a[h] = p - 7;            // fooBody
		    q = q - 6;
		    print p;
		    print q;
		    print h;
		}
		int main() {
		    int h = 0;               // mainVal
		    foo(a[h], a[0]);         // mainParams
		    print h;
		    print a[0];
		    print a[1];
		    print a[2];
		}
		*/

		// structure of SLand expression
		//                               AppExp (AKA app1 for outer let)
		//                     _________/     \
		//        FnExp (fn1)                 args1 = globVal+arrVals
		//      /            \
		// globVar+a[.]     [ AppExp ]    <-- app2 (nested let)
		//                 /          \
		//             FnExp (fn2)     args2 = foo's definition
		//           /            \
		//       "foo"         [ AppExp ]    <-- app3 (nested let)
		//                   /            \
		//               FnExp (fn3)       args3 = mainVal
		//             /            \
		//         globVar        [ AppExp ]    <-- fooApp
		//                       /          \
		//                    "foo"        args3 = mainParams
		
		var i, output;
		var args1 =  ["args", A.createIntExp(globVal) ];
		var args2 = [ "args" ];
		var args3 = ["args", A.createIntExp(mainVal) ];
		var args4 = ["args"];
		var fn1, fn1Params = [ globVar ], fn2, fn3, fn3Body;
		var app1, app2, app3, fooApp;
		var fooBodyBlock = [];
		for(i=0; i<arrLen; i++) { 
		    args1.push( A.createIntExp(arrVals[i]) );		    
		}
		for(i=0; i<fooBodyLen; i++) {
		    fooBodyBlock.push(
			A.createAssignExp(
			    fooBody[i][0],
			    makeSLangExp(fooBody[i][1])));
		}
		fooBodyBlock.push(
		    A.createPrintExp(A.createVarExp(fooParams[0])));
		fooBodyBlock.push(
		    A.createPrintExp(A.createVarExp(fooParams[1])));
		fooBodyBlock.push(
		    A.createPrintExp(A.createVarExp(globVar)));
		args2.push( A.createFnExp(fooParams,fooBodyBlock) );
		if (fooParamConstIndex === 0) {
		    args4.push(A.createVarExp(arrName + "_" + mainVal));

		    args4.push(A.createVarExp(arrName + "_" + globVar));
		} else {
		    args4.push(A.createVarExp(arrName + "_" + globVar));

		    args4.push(A.createVarExp(arrName + "_" + mainVal));

		}
		fooApp = A.createAppExp(A.createVarExp("foo"), args4);
		fn3Body = [ fooApp ];
		fn3Body.push(
		    A.createPrintExp(A.createVarExp(globVar)));
		for(i=0; i<arrLen; i++) {
		    fn3Body.push(
			A.createPrintExp(A.createVarExp(arrName + "_" + i)));
		}
		fn3 = A.createFnExp([globVar], fn3Body);
		app3 = A.createAppExp(fn3,args3);
		app3.comesFromLetBlock = true;
		fn2 = A.createFnExp(["foo"],[ app3 ]);
		app2 = A.createAppExp(fn2,args2);
		app2.comesFromLetBlock = true;
		for(i=0; i<arrLen; i++) {
		    fn1Params.push(arrName + "_" + i);
		}
		fn1 = A.createFnExp(fn1Params, [ app2 ]); 
		app1 = A.createAppExp(fn1,args1);
		app1.comesFromLetBlock = true;
		return app1;
	    }// getRndExpRP29part1 function

	    function callByValueRP29part1(exp,envir) {
		var f = evalExpRP29part1(A.getAppExpFn(exp),envir);
		var args = evalExpsRP29part1(A.getAppExpArgs(exp),envir);
		if (E.isClo(f)) {
		    if (E.getCloParams(f).length !== args.length) {		
			throw new Error("Runtime error: wrong number of arguments in " +
					"a function call (" + E.getCloParams(f).length +
					" expected but " + args.length + " given)");
		    } else {
			var values = evalExpsRP29part1(E.getCloBody(f),
					      E.update(E.getCloEnv(f),
						       E.getCloParams(f),args));
			return values[values.length-1];
		    }
		} else {
		    throw f + " is not a closure and thus cannot be applied.";
		}    
	    }

	    function callByReferenceRP29part1(exp,envir) {
		var f = evalExpRP29part1(A.getAppExpFn(exp),envir);
		var args = A.getAppExpArgs(exp).map( function (arg) {
		    if (A.isVarExp(arg)) {
			return E.lookupReference(envir,dealWithArray(A.getVarExpId(arg),envir));
		    } else {
			throw new Error("The arguments of a function called by-ref must all be variables.");
		    }
		} );
		if (E.isClo(f)) {
		    if (E.getCloParams(f).length !== args.length) {		
			throw new Error("Runtime error: wrong number of arguments in " +
					"a function call (" + E.getCloParams(f).length +
					" expected but " + args.length + " given)");
		    } else {
			var values = evalExpsRP29part1(E.getCloBody(f),
					      E.updateWithReferences(
						  E.getCloEnv(f),
						  E.getCloParams(f),args));
			return values[values.length-1];
		    }
		} else {
		    throw new Error(f + " is not a closure and thus cannot be applied.");
		}    
	    }

	    function callByCopyRestoreRP29part1(exp,envir) {
		var f = evalExpRP29part1(A.getAppExpFn(exp),envir);
		var args = A.getAppExpArgs(exp).map( function (arg) {
		    if (A.isVarExp(arg)) {
			return E.lookupReference(envir,dealWithArray(A.getVarExpId(arg),envir));
		    } else {
			throw new Error("The arguments of a function called by-ref must all be variables.");
		    }
		} );
		// make copies
		var copies = args.map( function (arg) { return [ arg[0] ]; } );
		var restore = function ( list1, list2 ) {
		    for(var i=0; i<list1.length; i++) {
			list1[i][0] = list2[i][0];
		    }
		};
		if (E.isClo(f)) {
		    if (E.getCloParams(f).length !== args.length) {		
			throw new Error("Runtime error: wrong number of arguments in " +
					"a function call (" + E.getCloParams(f).length +
					" expected but " + args.length + " given)");
		    } else {
			var values = evalExpsRP29part1(E.getCloBody(f),
						       E.updateWithReferences(
							   E.getCloEnv(f),
							   E.getCloParams(f),copies));
			restore(args,copies);
			return values[values.length-1];
		    }
		} else {
		    throw new Error(f + " is not a closure and thus cannot be applied.");
		}    
	    }

	    function evalExpsRP29part1(list,envir) {
		return list.map( function(e) { return evalExpRP29part1(e,envir); } );
	    }

	    // if s is a simple variable or s is <arr>_<int>: return s
	    // else s = <arr>[<var>]: return <arr>_<value_of_var>
	    function dealWithArray(s,envir) {	
		var tmp = s;
		var parts, index, indexLeftBrack = s.indexOf("[");
		if (s.indexOf("_") === -1 && indexLeftBrack === -1) {
		    return s;
		}
		if (indexLeftBrack > -1) {
		    s = s.charAt(0) + "_" + 
			s.substring(indexLeftBrack+1,s.length-1);
		}
		parts = s.split("_");
		if (parts[1].match(/\d/)) {
		    return s;
		}
		index = E.getNumValue(
		    evalExpRP29part1(A.createVarExp(parts[1]),
				     envir));
		return parts[0] +  "_" + index;
	    }

	    function evalExpRP29part1(exp,envir) {
		var v, parts, index, indexLeftBrack;
		if (A.isIntExp(exp)) {
		    return E.createNum(A.getIntExpValue(exp));
		}
		else if (A.isVarExp(exp)) {
		    v = dealWithArray(A.getVarExpId(exp),envir);
		    return E.lookup(envir,v);
		} else if (A.isPrintExp(exp)) {
		    SL.output += JSON.stringify(
			evalExpRP29part1( A.getPrintExpExp(exp), envir ));
		} else if (A.isPrint2Exp(exp)) {
		    SL.output += A.getPrint2ExpString(exp) +
				 (A.getPrint2ExpExp(exp) !== null ?
				  " " + JSON.stringify( evalExpRP29part1( A.getPrint2ExpExp(exp), 
								 envir ) )
				  : "");
		} else if (A.isAssignExp(exp)) {
		    v = evalExpRP29part1(A.getAssignExpRHS(exp),envir);
		    E.lookupReference(
                        envir,dealWithArray(A.getAssignExpVar(exp),envir))[0] = v;
		    return v;
		} else if (A.isFnExp(exp)) {
		    return E.createClo(A.getFnExpParams(exp),
				       A.getFnExpBody(exp),envir);
		}
		else if (A.isAppExp(exp)) {
		    if (exp.comesFromLetBlock) {
			return callByValueRP29part1(exp,envir);
		    } else {
			switch (SL.ppm) {
			case "byval" : return callByValueRP29part1(exp,envir);
			case "byref" : return callByReferenceRP29part1(exp,envir);
			case "bycpr" : return callByCopyRestoreRP29part1(exp,envir);
			}
		    }
		} else if (A.isPrimApp1Exp(exp)) {
		    return SL.applyPrimitive(A.getPrimApp1ExpPrim(exp),
					     [evalExpRP29part1(A.getPrimApp1ExpArg(exp),envir)]);
		} else if (A.isPrimApp2Exp(exp)) {
		    return SL.applyPrimitive(A.getPrimApp2ExpPrim(exp),
					     [evalExpRP29part1(A.getPrimApp2ExpArg1(exp),envir),
					      evalExpRP29part1(A.getPrimApp2ExpArg2(exp),envir)]);
		} else if (A.isIfExp(exp)) {
		    if (E.getBoolValue(evalExpRP29part1(A.getIfExpCond(exp),envir))) {
			return evalExpRP29part1(A.getIfExpThen(exp),envir);
		    } else {
			return evalExpRP29part1(A.getIfExpElse(exp),envir);
		    }
		} else {
		    throw "Error: Attempting to evaluate an invalid expression";
		}
	    }// evalExpRP29part1 function

	    iterations = 0;
	    while(true) {
		exp = undefined;
		iterations++;
		initRandomParts();
		this.expression = getPseudocode().join("<br />");
		exp = getRndExpRP29part1();
		value = null;
		try {
		    expStr = undefined;
		    SL.output = "";
		    SL.ppm = "byval";
		    value = evalExpRP29part1(exp,globalEnv);
		    this.byvalOutput = 
			SL.output.match(/-?\d+/g).join(" ");
		    SL.output = "";
		    SL.ppm = "byref";
		    value2 = evalExpRP29part1(exp,globalEnv);
		    this.byrefOutput = 
			SL.output.match(/-?\d+/g).join(" ");
		    SL.output = "";
		    SL.ppm = "bycpr";
		    value3 = evalExpRP29part1(exp,globalEnv);
		    this.bycprOutput = 
			SL.output.match(/-?\d+/g).join(" ");	    
		} catch (e) {
		    //console.log("My exception: ",e);
		}


		if (value !== null && value2 !== null && value3 !== null &&
		    this.byvalOutput !== this.byrefOutput && 
		    this.byvalOutput !== this.bycprOutput && 
		    this.byrefOutput !== this.bycprOutput && 
		    this.byvalOutput.match(/-?\d+/g)
		    .filter(tooLong).length === 0 &&
		    this.byrefOutput.match(/-?\d+/g)
		    .filter(tooLong).length === 0 &&
		    this.bycprOutput.match(/-?\d+/g)
		    .filter(tooLong).length === 0 ) {

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
	    	   
	    //console.log(this.byvalOutput);
	    //console.log(this.byrefOutput);
	    //console.log(this.bycprOutput);
	},// init function

	validateAnswer: function (guess) {
	    return this.byvalOutput.replace(/\s+/g,"") ===
		guess[0].replace(/\s+/g,"")  &&
		this.byrefOutput.replace(/\s+/g,"") ===
		guess[1].replace(/\s+/g,"")  &&
		this.bycprOutput.replace(/\s+/g,"") ===
		guess[2].replace(/\s+/g,"");
	}// validateAnswer function
	
    };

    window.RP29part1 = window.RP29part1 || RP29part1;

}());


