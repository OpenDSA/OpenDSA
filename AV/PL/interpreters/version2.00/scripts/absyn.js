/* global SLang : true */

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
function createPrintExp(v,e) {
    return ["PrintExp", v, e];
}
function isPrintExp(e) { 
    return e[0] === "PrintExp"; 
}
function getPrintExpExp(e) { 
    if (isPrintExp(e)) {
	return e[1];
    } else {
	throw new Error("Interpreter error: "  +
			"The argument of getPrintExpExp is not a PrintExp.");
    }
}
function createAssignExp(v,e) {
    return ["AssignExp", v, e];
}
function isAssignExp(e) { 
    return e[0] === "AssignExp"; 
}
function getAssignExpVar(e) { 
    if (isAssignExp(e)) {
	return e[1];
    } else {
	throw new Error("Interpreter error: "  +
			"The argument of getAssignExpVar is not an AssignExp.");
    }
}
function getAssignExpRHS(e) { 
    if (isAssignExp(e)) {
	return e[2];
    } else {
	throw new Error("Interpreter error: "  +
			"The argument of getAssignExpRHS is not an AssignExp.");
    }
}
function createBlock(list) {
    return ["Block",list];
}
function isBlock(b) { 
    return b[0] === "Block"; 
}
function getBlockList(b) { 
    if (isBlock(b)) {
	return b[1];
    } else {
	throw new Error("Interpreter error: "  +
			"The argument of getBlockList is not a Block.");
    }
}

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
exports.createPrintExp = createPrintExp;
exports.isPrintExp = isPrintExp;
exports.getPrintExpExp = getPrintExpExp;
exports.createAssignExp = createAssignExp;
exports.isAssignExp = isAssignExp;
exports.getAssignExpVar = getAssignExpVar;
exports.getAssignExpRHS = getAssignExpRHS;
exports.createBlock = createBlock;
exports.isBlock = isBlock;
exports.getBlockList = getBlockList;

SLang.absyn = exports;
}());
