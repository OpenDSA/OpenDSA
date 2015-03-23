/* global SLang : true, parser */

(function () {

"use strict";

var A = SLang.absyn;
var E = SLang.env;

function nth(n) {
    switch (n+1) {
    case 1: return "first";
    case 2: return "second";
    case 3: return "third";
    default: return (n+1) + "th";
    }
}
function typeCheckPrimitiveOp(op,args,typeCheckerFunctions) {
    var numArgs = typeCheckerFunctions.length;
    if (args.length !== numArgs) {
	throw "Wrong number of arguments given to '" + op + "'.";
    }
    for( var index = 0; index<numArgs; index++) {
	if ( ! (typeCheckerFunctions[index])(args[index]) ) {
	    throw new Error("The " + nth(index) + " argument of '" + op + 
			    "' has the wrong type.");
	}
    }
}

function applyPrimitive(prim,args) {
    switch (prim) {
    case "+": 
	typeCheckPrimitiveOp(prim,args,[E.isNum,E.isNum]);
	return E.createNum( E.getNumValue(args[0]) + E.getNumValue(args[1]));
    case "*": 
	typeCheckPrimitiveOp(prim,args,[E.isNum,E.isNum]);
	return E.createNum( E.getNumValue(args[0]) * E.getNumValue(args[1]));
    case "add1": 
	typeCheckPrimitiveOp(prim,args,[E.isNum]);
	return E.createNum( 1 + E.getNumValue(args[0]) );
    }
}
function evalExp(exp,envir) {
    if (A.isIntExp(exp)) {
	return E.createNum(A.getIntExpValue(exp));
    } else if (A.isVarExp(exp)) {
	return E.lookup(envir,A.getVarExpId(exp));
    } else if (A.isFnExp(exp)) {
	return E.createClo(A.getFnExpParams(exp),A.getFnExpBody(exp),envir);
    } else if (A.isAppExp(exp)) {
	var f = evalExp(A.getAppExpFn(exp),envir);
	var args = A.getAppExpArgs(exp).map( 
                              function(arg) { return evalExp(arg,envir); } );
	if (E.isClo(f)) {
	    return evalExp(E.getCloBody(f),
			   E.update(E.getCloEnv(f), E.getCloParams(f),args));
	} else { throw f + " is not a closure and thus cannot be applied."; } 
    } else if (A.isPrimAppExp(exp)) {
        return applyPrimitive(A.getPrimAppExpPrim(exp),
			      A.getPrimAppExpArgs(exp).map( function(arg) { 
                                  return evalExp(arg,envir); } ));
    } else { throw "Error: Attempting to evaluate an invalid expression"; }
}
function myEval(p) {
    if (A.isProgram(p)) {
	return evalExp(A.getProgramExp(p),E.initEnv());
    } else {
	window.alert( "The input is not a program.");
    }
}
function expToString(exp) {
    return JSON.stringify(exp);
}
function valueToString(value) {

function envToString(e) {
    function aux(e) {
	if (E.isEmptyEnv(e)) {
	    return "EmptyEnv";
	} else {
	    var result = "|| " + aux(E.getEnvEnv(e));
            var bindings = E.getEnvBindings(e);
	    for(var i=0; i<bindings.length; i++) {
		result = bindings[i][0] + " = " +valueToString(bindings[i][1]) + " " + result;
	    }
	    return result;
	}
    }

    return "{ " + aux(e) + " }";
}

    if (E.isNum(value)) {
	return E.getNumValue(value)+"";
    }
    else if (E.isClo(value)) {
	return "Closure( params=" + E.getCloParams(value) + " , body="+ 
	expToString(E.getCloBody(value)) + " , env=" + envToString(E.getCloEnv(value)) +" )";
    }
}

function interpret(source) {
    var output='';

    try {
        if (source === '') {
            window.alert('Nothing to interpret: you must provide some input!');
	} else {
	    var ast = parser.parse(source);
	    var value = myEval( ast );
            return valueToString(value);
        }
    } catch (exception) {
	window.alert(exception);
        return "No output [Runtime error]";
    }
    return output;
}
// the code below is not functional
function stringRepresentation(value) {
    switch (value[0]) {
    case "Num": 
	return E.getNumValue(value);
    case "Clo":
	return;
    }
}

SLang.interpret = interpret; // make the interpreter public

}());
