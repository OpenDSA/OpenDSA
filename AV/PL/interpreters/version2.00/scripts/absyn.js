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
function createPrimApp1Exp(prim,arg) {
    return ["PrimApp1Exp",prim,arg];
}
function isPrimApp1Exp(e) { 
    return e[0] === "PrimApp1Exp"; 
}
function getPrimApp1ExpPrim(e) { 
    if (isPrimApp1Exp(e)) {
	return e[1];
    } else {
	throw new Error("Interpreter error: "  +
			"The argument of getPrimApp1ExpPrim is not a PrimApp1Exp.");
    }
}
function getPrimApp1ExpArg(e) { 
    if (isPrimApp1Exp(e)) {
	return e[2];
    } else {
	throw new Error("Interpreter error: "  +
			"The argument of getPrimApp1ExpArg is not a PrimApp1Exp.");
    }
}
function createPrimApp2Exp(prim,arg1,arg2) {
    return ["PrimApp2Exp",prim,arg1,arg2];
}
function isPrimApp2Exp(e) { 
    return e[0] === "PrimApp2Exp"; 
}
function getPrimApp2ExpPrim(e) { 
    if (isPrimApp2Exp(e)) {
	return e[1];
    } else {
	throw new Error("Interpreter error: "  +
			"The argument of getPrimApp2ExpPrim is not a PrimApp2Exp.");
    }
}
function getPrimApp2ExpArg1(e) { 
    if (isPrimApp2Exp(e)) {
	return e[2];
    } else {
	throw new Error("Interpreter error: "  +
			"The argument of getPrimApp2ExpArg is not a PrimApp2Exp.");
    }
}
function getPrimApp2ExpArg2(e) { 
    if (isPrimApp2Exp(e)) {
	return e[3];
    } else {
	throw new Error("Interpreter error: "  +
			"The argument of getPrimApp2ExpArg is not a PrimApp2Exp.");
    }
}
function createPrintExp(e) {
    return ["PrintExp", e];
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
function createPrint2Exp(s,e) {
    return ["Print2Exp", s, e];
}
function isPrint2Exp(e) { 
    return e[0] === "Print2Exp"; 
}
function getPrint2ExpString(e) { 
    if (isPrint2Exp(e)) {
	return e[1];
    } else {
	throw new Error("Interpreter error: "  +
			"The argument of getPrint2ExpString is not a Print2Exp.");
    }
}
function getPrint2ExpExp(e) { 
    if (isPrint2Exp(e)) {
	return e[2];
    } else {
	throw new Error("Interpreter error: "  +
			"The argument of getPrint2ExpExp is not a Print2Exp.");
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
function createIfExp(condExp,thenExp,elseExp) {
    return ["IfExp",condExp,thenExp,elseExp];
}
function isIfExp(e) { 
    return e[0] === "IfExp"; 
}
function getIfExpCond(e) { 
    if (isIfExp(e)) {
	return e[1];
    } else {
	throw new Error("Interpreter error: "  +
			"The argument of getIfExpCond is not an IfExp.");
    }
}
function getIfExpThen(e) { 
    if (isIfExp(e)) {
	return e[2];
    } else {
	throw new Error("Interpreter error: "  +
			"The argument of getIfExpThen is not an IfExp.");
    }
}
function getIfExpElse(e) { 
    if (isIfExp(e)) {
	return e[3];
    } else {
	throw new Error("Interpreter error: "  +
			"The argument of getIfExpElse is not an IfExp.");
    }
}


	// returns a random number between min and max includeed
function getRnd (min,max) {
	    return Math.floor(Math.random() * (1+max-min)) + min;
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
exports.createPrintExp = createPrintExp;
exports.isPrintExp = isPrintExp;
exports.getPrintExpExp = getPrintExpExp;
exports.createPrint2Exp = createPrint2Exp;
exports.isPrint2Exp = isPrint2Exp;
exports.getPrint2ExpExp = getPrint2ExpExp;
exports.getPrint2ExpString = getPrint2ExpString;
exports.createAssignExp = createAssignExp;
exports.isAssignExp = isAssignExp;
exports.getAssignExpVar = getAssignExpVar;
exports.getAssignExpRHS = getAssignExpRHS;
exports.createBlock = createBlock;
exports.isBlock = isBlock;
exports.getBlockList = getBlockList;
exports.createPrimApp1Exp = createPrimApp1Exp;
exports.createPrimApp2Exp = createPrimApp2Exp;
exports.isPrimApp1Exp = isPrimApp1Exp;
exports.isPrimApp2Exp = isPrimApp2Exp;
exports.getPrimApp1ExpPrim = getPrimApp1ExpPrim;
exports.getPrimApp2ExpPrim = getPrimApp2ExpPrim;
exports.getPrimApp1ExpArg = getPrimApp1ExpArg;
exports.getPrimApp2ExpArg1 = getPrimApp2ExpArg1;
exports.getPrimApp2ExpArg2 = getPrimApp2ExpArg2;
exports.createIfExp = createIfExp;
exports.isIfExp = isIfExp;
exports.getIfExpCond = getIfExpCond;
exports.getIfExpThen = getIfExpThen;
exports.getIfExpElse = getIfExpElse;
exports.getRnd= getRnd;

SLang.absyn = exports;
}());
