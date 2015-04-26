/* global SLang : true, parser, console  */

(function () {

    "use strict";

    var A = SLang.absyn;
    var E = SLang.env;
    var classEnv;
    var defaultValue = E.createNum( -12345 );
    
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
	    throw "The " + nth(index) + " argument of '" + op + "' has the wrong type.";
	}
    }
}
function applyPrimitive(prim,args) {
    switch (prim) {
    case "+": 
	typeCheckPrimitiveOp(prim,args,[E.isNum,E.isNum]);
	return E.createNum( E.getNumValue(args[0]) + E.getNumValue(args[1]));
    case "-": 
	typeCheckPrimitiveOp(prim,args,[E.isNum,E.isNum]);
	return E.createNum( E.getNumValue(args[0]) - E.getNumValue(args[1]));
    case "*": 
	typeCheckPrimitiveOp(prim,args,[E.isNum,E.isNum]);
	return E.createNum( E.getNumValue(args[0]) * E.getNumValue(args[1]));
    case "/": 
	typeCheckPrimitiveOp(prim,args,[E.isNum,E.isNum]);
	return E.createNum( E.getNumValue(args[0]) / E.getNumValue(args[1]));
    case "%": 
	typeCheckPrimitiveOp(prim,args,[E.isNum,E.isNum]);
	return E.createNum( E.getNumValue(args[0]) % E.getNumValue(args[1]));
    case "<": 
	typeCheckPrimitiveOp(prim,args,[E.isNum,E.isNum]);
	return E.createBool( E.getNumValue(args[0]) < E.getNumValue(args[1]));
    case ">": 
	typeCheckPrimitiveOp(prim,args,[E.isNum,E.isNum]);
	return E.createBool( E.getNumValue(args[0]) > E.getNumValue(args[1]));
    case "===": 
	typeCheckPrimitiveOp(prim,args,[E.isNum,E.isNum]);
	return E.createBool( E.getNumValue(args[0]) === E.getNumValue(args[1]));
    case "add1": 
	typeCheckPrimitiveOp(prim,args,[E.isNum]);
	return E.createNum( 1 + E.getNumValue(args[0]) );
    case "~": 
	typeCheckPrimitiveOp(prim,args,[E.isNum]);
	return E.createNum( - E.getNumValue(args[0]) );
    case "not": 
	typeCheckPrimitiveOp(prim,args,[E.isBool]);
	return E.createBool( ! E.getBoolValue(args[0]) );
    }
}
/* helper functions for OOP */
function elaborateDecls(decls) {
    classEnv = decls;
}
function lookupClass(name,classes) {
    for(var i = 0; i<classes.length; i++) {
	if (name === classes[i][1]) { 
	    return classes[i];
	}
    }
    throw new Error("Class unknown: " + name);
}
function lookupMethod(name,methods) {
    for(var i = 0; i<methods.length; i++) {
	if (name === methods[i][1]) { 
	    return methods[i];
	}
    }
    throw new Error("Method unknown: " + name);
}
/* given an object and a class name cName, returns the list of parts
   starting at cName */
function viewObjectAs(object,cName) {
    for(var i=0; i,object.length; i++) {
	if (cName === object[i][0]) {
	    return object.slice[i];  
	}
    }
    throw new Error("Not an object: " + JSON.stringify(object));
}
function getClassName(parts) {
    if (parts.length > 0 ) {
	return parts[0][0];
    } else {
	throw new Error("Not an object: " + JSON.stringify(parts));
    }
}
/* given a class definition, return the corresponding part */
function makePart(classDef) {
    var name = getClassName(classDef);
    var fieldNames = A.getClassIvars(classDef);
    return [ name,
	     fieldNames.map( function (name) { return [ defaultValue ]; })
	   ];
}
/* given a list of parts, return the environment in which each field is bound to its value */
function buildFieldEnv(parts) {
    var env = E.createEmptyEnv();
    var theClass, fields, refs;
    for(var i=0; i<parts.length; i++) {
	theClass = lookupClass(parts[i][0],classEnv);
	fields = A.getClassIvars(theClass);
	refs = parts[i][1];
	env = E.updateWithReferences(env,fields,refs);
    }
    return env;
}
/* given a class name, return an instance of the class, that is, an array
   of parts */
function makeNewObject(className) {
    var theClass, result;
    if (className === "Object") {
	return [];
    } else {
	theClass = lookupClass(className,classEnv);
	result = makeNewObject(A.getClassSuperClass(theClass));
	result.unshift(makePart(theClass));
	return result;
    }
}
function evalExp(exp,envir) {
    var f, v, args, values, obj;
    if (A.isIntExp(exp)) {
	return E.createNum(A.getIntExpValue(exp));
    }
    else if (A.isVarExp(exp)) {
	return E.lookup(envir,A.getVarExpId(exp));
    } else if (A.isPrintExp(exp)) {
	console.log( JSON.stringify(
	    evalExp( A.getPrintExpExp(exp), envir )));
    } else if (A.isAssignExp(exp)) {
	v = evalExp(A.getAssignExpRHS(exp),envir);
	E.lookupReference(
                        envir,A.getAssignExpVar(exp))[0] = v;
	return v;
    } else if (A.isFnExp(exp)) {
	return E.createClo(A.getFnExpParams(exp),
				   A.getFnExpBody(exp),envir);
    }
    else if (A.isAppExp(exp)) {
	f = evalExp(A.getAppExpFn(exp),envir);
	args = evalExps(A.getAppExpArgs(exp),envir);
	if (E.isClo(f)) {
	    if (E.getCloParams(f).length !== args.length) {		
		throw new Error("Runtime error: wrong number of arguments in " +
                        "a function call (" + E.getCloParams(f).length +
			" expected but " + args.length + " given)");
	    } else {
		values = evalExps(E.getCloBody(f),
			        E.update(E.getCloEnv(f),
					 E.getCloParams(f),args));
		return values[values.length-1];
	    }
	} else {
	    throw f + " is not a closure and thus cannot be applied.";
	}
    } else if (A.isPrim1AppExp(exp)) {
        return applyPrimitive(A.getPrim1AppExpPrim(exp),
			      [evalExp(A.getPrim1AppExpArg(exp),envir)]);
    } else if (A.isPrim2AppExp(exp)) {
        return applyPrimitive(A.getPrim2AppExpPrim(exp),
			      [evalExp(A.getPrim2AppExpArg1(exp),envir),
			       evalExp(A.getPrim2AppExpArg2(exp),envir)]);
    } else if (A.isIfExp(exp)) {
	if (E.getBoolValue(evalExp(A.getIfExpCond(exp),envir))) {
	    return evalExp(A.getIfExpThen(exp),envir);
	} else {
	    return evalExp(A.getIfExpElse(exp),envir);
	}
    } if (A.isNewExp(exp)) {
	args = evalExps(A.getNewExpArgs(exp),envir);
	obj = makeNewObject(A.getNewExpClass(exp),envir);
        return obj;
    } else {
	throw "Error: Attempting to evaluate an invalid expression";
    }
}
function evalExps(list,envir) {
    return list.map( function(e) { return evalExp(e,envir); } );
}
function myEval(p) {
    var values;
    if (A.isProgram(p)) {
	elaborateDecls(A.getProgramDecls(p));
	values = evalExps(A.getProgramMainBody(p),E.createEmptyEnv());
	return values[values.length-1];
    } else {
	window.alert( "The input is not a program.");
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
            return JSON.stringify(value);
        }
    } catch (exception) {
	window.alert(exception);
        return "No output [Runtime error]";
    }
    return output;
}

SLang.interpret = interpret; // make the interpreter public

}());
