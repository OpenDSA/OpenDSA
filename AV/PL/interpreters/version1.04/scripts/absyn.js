/* global SLang : true, console  */

(function (){

"use strict";

var exports = {};

function createProgram(e) {
    return ["Program", e]; 
}
function isProgram(e) { 
    return e[0] === "Program"; 
}
function getProgramExp(e) { 
    if (isProgram(e)) {
	return e[1];
    } else {
	throw new Error("Interpreter error: "  +
			"The argument of getProgramExp is not a program.");
    }
}				       
function createVarExp(v) { 
    return ["VarExp", v]; 
}
function isVarExp(e) { 
    return e[0] === "VarExp"; 
}
function getVarExpId(e) { 
    if (isVarExp(e)) {
	return e[1];
    } else {
	throw new Error("Interpreter error: "  +
			"The argument of getVarExpId is not a VarExp.");
    }
}
function createIntExp(n) {
    return ["IntExp", parseInt(n)];
}
function isIntExp(e) { 
    return e[0] === "IntExp"; 
}
function getIntExpValue(e) { 
    if (isIntExp(e)) {
	return e[1];
    } else {
	throw new Error("Interpreter error: "  +
			"The argument of getIntExpValue is not an IntExp.");
    }
}
function createFnExp(params,body) {
    return ["FnExp",params,body];
}
function isFnExp(e) { 
    return e[0] === "FnExp"; 
}
function getFnExpParams(e) { 
    if (isFnExp(e)) {
	return e[1];
    } else {
	throw new Error("Interpreter error: "  +
			"The argument of getFnExpParams is not an FnExp.");
    }
}
function getFnExpBody(e) { 
    if (isFnExp(e)) {
	return e[2];
    } else {
	throw new Error("Interpreter error: "  +
			"The argument of getFnExpBody is not an FnExp.");
    }
}
function createAppExp(fn,args) {
    return ["AppExp",fn,args];
}
function isAppExp(e) { 
    return e[0] === "AppExp"; 
}
function getAppExpFn(e) { 
    if (isAppExp(e)) {
	return e[1];
    } else {
	throw new Error("Interpreter error: "  +
			"The argument of getAppExpFn is not an AppExp.");
    }
}
function getAppExpArgs(e) { 
    if (isAppExp(e)) {
	return e[2].slice(1); // eliminate the first element (i.e., "args")
    } else {
	throw new Error("Interpreter error: "  +
			"The argument of getAppExpArgs is not an AppExp.");
    }
}
function createPrimAppExp(prim,args) {
    return ["PrimAppExp",prim,args];
}
function isPrimAppExp(e) { 
    return e[0] === "PrimAppExp"; 
}
function getPrimAppExpPrim(e) { 
    if (isPrimAppExp(e)) {
	return e[1];
    } else {
	throw new Error("Interpreter error: "  +
			"The argument of getPrimAppExpPrim is not a PrimAppExp.");
    }
}
function getPrimAppExpArgs(e) { 
    if (isPrimAppExp(e)) {
	return e[2];
    } else {
	throw new Error("Interpreter error: "  +
			"The argument of getPrimAppExpArgs is not a PrimAppExp.");
    }
}

	// returns a random number between min and max includeed
function getRnd (min,max) {
	    return Math.floor(Math.random() * (1+max-min)) + min;
}

function getRndVarIn (list) {
    var n = list.length;
    if (n === 0) {
	throw new Error("Exhausted the supply of variables");
    } else {
	return list.substr(getRnd(0,n-1),1);
    }
}
    
function generateRandomSLang1Program (depth,minDepth,maxDepth,
				      allowed,bound,inputType) {
    function helper(depth,minDepth,maxDepth,allowed,bound,inputType) {
	var type, i, op, arity;
	var v, params,numParams, args, numArgs;
	// type: 1 (var_exp), 2 (fn_exp), 3 (app_exp), 
	//       4 (papp_exp), 5 (int)
	if ( inputType ) {
	    type = inputType;
	} else if (depth >= maxDepth) {
	    type = Math.random() < 0.5 ? 1 : 5;
	} else if (depth < minDepth) {
	    type = getRnd(2,4);
	} else {
	    type = getRnd(1,5);
	}
	switch (type) {
	case 1: 
	    if (bound !== "" && Math.random()>0.3) {
		v = getRndVarIn(bound);
	    } else {
		v = getRndVarIn(allowed);
	    }
	    return createVarExp(v);
	case 2:
	    numParams = getRnd(0,2);
	    params = [];
	    v = getRndVarIn(bound+allowed);
	    for(i=0; i<numParams; i++) {
		while (params.indexOf(v) !== -1) {
		    v = getRndVarIn(bound+allowed);
		}
		params.push(v);
	    }
	    return createFnExp(params,
			       helper(depth+1,minDepth,maxDepth,allowed,
				      bound+v));
	case 3:
	    numArgs = getRnd(0,2);
	    args = ["args"];
	    for(i=0; i<numArgs; i++) {
		args.push( 
		    helper(depth+1,minDepth,maxDepth,allowed,bound));
	    }
	    return createAppExp(
		helper(depth+1,minDepth,maxDepth,allowed,bound),
		args);
	case 4:
	    arity = getRnd(1,2);
	    args = [];
	    //console.log("before ",arity, args);
	    if (arity === 1) {
		op = "add1";
		//console.log("picked ",op);
		args.push(helper(depth+1,minDepth,maxDepth,allowed,bound));
		//console.log(" *****1 ",op, JSON.stringify(args));		
	    } else {
		op = (getRnd(0,1) === 0 ? '+' : '*');
		//console.log("picked ",op);		
		args.push(helper(depth+1,minDepth,maxDepth,allowed,bound));
		args.push(helper(depth+1,minDepth,maxDepth,allowed,bound));
		//console.log(" *****2 ",op, JSON.stringify(args));		
	    }
	    //console.log("after ",arity,JSON.stringify(args));
	    return createPrimAppExp(op,args);
	case 5:
	    return createIntExp(getRnd(1,10)+"");
	}
	throw new Error( "Incorrect expression type: ", type);
    }// helper
    var e = helper(depth,minDepth,maxDepth,allowed,bound,inputType);
    //console.log(e );
    return createProgram( e);

}// 	generateRandomSLang1Program function


exports.createProgram = createProgram;
exports.isProgram = isProgram;
exports.getProgramExp = getProgramExp;
exports.createVarExp = createVarExp;
exports.isVarExp = isVarExp;
exports.getVarExpId = getVarExpId;
exports.createIntExp = createIntExp;
exports.isIntExp = isIntExp;
exports.getIntExpValue = getIntExpValue;
exports.createFnExp = createFnExp;
exports.isFnExp = isFnExp;
exports.getFnExpParams = getFnExpParams;
exports.getFnExpBody = getFnExpBody;
exports.createAppExp = createAppExp;
exports.isAppExp = isAppExp;
exports.getAppExpFn = getAppExpFn;
exports.getAppExpArgs = getAppExpArgs;
exports.createPrimAppExp = createPrimAppExp;
exports.isPrimAppExp = isPrimAppExp;
exports.getPrimAppExpPrim = getPrimAppExpPrim;
exports.getPrimAppExpArgs = getPrimAppExpArgs;
exports.getRnd = getRnd;
exports.getRndVarIn = getRndVarIn;
exports.generateRandomSLang1Program = generateRandomSLang1Program;

window.SLang.absyn = exports;
}());
