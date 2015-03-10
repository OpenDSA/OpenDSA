var absyn = require('./absyn');
var interpreter = {};
var parser = require('./grammar');
var util = require('util');

(function (exports) {

"use strict";

/** takes in a VarExp and a lambda expression
 */
function free(x,exp) {
    if (absyn.isVarExp(exp)) {
	return absyn.getVarExpId(x) === absyn.getVarExpId(exp);
    } else if (absyn.isLambdaAbs(exp)) {
	return absyn.getVarExpId(x) !== absyn.getVarExpId(absyn.getLambdaAbsParam(exp)) && free(x,absyn.getLambdaAbsBody(exp));
    } else if (absyn.isAppExp(exp)) {
	return free(x,absyn.getAppExpFn(exp)) || free(x,absyn.getAppExpArg(exp));
    } else {
	throw new Error("Interpreter error: " +
			"The second argument of free is not a lambda expression.");
    }
}
/** takes in a VarExp and a lambda expression
 */
function occursIn(x,exp) {
    if (absyn.isVarExp(exp)) {
	return absyn.getVarExpId(x) === absyn.getVarExpId(exp);
    } else if (absyn.isLambdaAbs(exp)) {
	return absyn.getVarExpId(x) === absyn.getVarExpId(absyn.getLambdaAbsParam(exp)) || occursIn(x,absyn.getLambdaAbsBody(exp));
    } else if (absyn.isAppExp(exp)) {
	return occursIn(x,absyn.getAppExpFn(exp)) || occursIn(x,absyn.getAppExpArg(exp));
    } else {
	throw new Error("Interpreter error: " +
			"The second argument of occursIn is not a lambda expression.");
    }
}
/** takes in a VarExp and a lambda expression
 */
function bound(x,exp) {
    return occursIn(x,exp) && ! free(x,exp);
}
/** takes in a lambda expression and returns a list of strings
 */
function freeVars(exp) {
    if (absyn.isVarExp(exp)) {
	return [ absyn.getVarExpId(exp) ];
    } else if (absyn.isLambdaAbs(exp)) {
	var v = absyn.getVarExpId(absyn.getLambdaAbsParam(exp));
	var bodyVars = freeVars(absyn.getLambdaAbsBody(exp));
	var index = bodyVars.indexOf(v);
	if (index === -1) {
	    return bodyVars;
	} else {
	    return bodyVars.filter(function(x) { return  x !== v; });
	}	
    } else if (absyn.isAppExp(exp)) {
	return freeVars(absyn.getAppExpFn(exp))
	    .concat(freeVars(absyn.getAppExpArg(exp)))
	    .reduce(function(a,x) { 
		if (a.indexOf(x)===-1) { 
		    a.push(x); return a;} else { return a; } },
		    []);
    }
}
/** takes in a string and a lambda expression
 */
function notFreeIn(x,exp) {
    return freeVars(exp).indexOf(x) === -1;
}
    /** takes in a string and a list of string
*/
function removeVariable (x,xs) {
    var index = xs.indexOf(x);
    if (index === -1) {
	return xs;
    } else {
	xs.splice(index,1);
	return xs;
    }
}
function newVariable(list) {
    var code = "a".charCodeAt(0);
    var last = 1+"z".charCodeAt(0);
    while (code !== last) {
	var character = String.fromCharCode(code);
	if (list.indexOf(character) === -1) {
	    return character;
	}
	code = code + 1;
    }
    throw new Error("Interpreter error: " +
		    "Too many variables in use.");
}
/** substitute lambda exp. m for variable exp x in lambda exp. e 
 */
function substitute(m,x,e) {
    var xStr = absyn.getVarExpId(x);
    if (absyn.isVarExp(e)) {
	return absyn.getVarExpId(e) === xStr ? m : e;
    } else if (absyn.isAppExp(e)) {
	return absyn.createAppExp(
	    substitute(m,x,absyn.getAppExpFn(e)),
	    substitute(m,x,absyn.getAppExpArg(e)));
    } else if (absyn.isLambdaAbs(e)) {
	var param = absyn.getLambdaAbsParam(e);
	var paramStr = absyn.getVarExpId(param);
	var body = absyn.getLambdaAbsBody(e);
	if ( paramStr === xStr) {
	    // e is of the form ^x.B */
	    return e;
	} else if (notFreeIn(paramStr, m)) {
	    return absyn.createLambdaAbs(param,substitute(m,x,body));
	} else {
	    var newVar = absyn.createVarExp(
		newVariable(freeVars(m).concat(freeVars(body))));
	    return absyn.createLambdaAbs(
		newVar,	
		substitute(m,x,substitute(newVar,param,body)));
	}
    }
}
function beta(e) {
    var e2;
    if (absyn.isAppExp(e)) {
	var fn = absyn.getAppExpFn(e);
	var arg = absyn.getAppExpArg(e);
	if (absyn.isLambdaAbs(fn)) {
	    e2 = substitute(arg,
			    absyn.getLambdaAbsParam(fn),
			    absyn.getLambdaAbsBody(fn));
	    e2.redex = true;
	    return e2;
	} else {
	    return e;
	}
    } else {
	return e;
    }
}
function appOrder(e) {
    if (absyn.isVarExp(e)) {
	return e;
    } else if (absyn.isLambdaAbs(e)) {
	return 	absyn.createLambdaAbs(
	    absyn.getLambdaAbsParam(e),
	    appOrder( absyn.getLambdaAbsBody(e)));
    } else { // application expression
	var fn = absyn.getAppExpFn(e);
	var arg = absyn.getAppExpArg(e);
	var fnRed = appOrder(fn);
	var argRed = appOrder(arg);
	if (absyn.isLambdaAbs(fnRed)) {
	    return appOrder(beta(absyn.createAppExp(fnRed,argRed)));
	} else {
	    return absyn.createAppExp(fnRed,argRed);
	}

    }
}
function isBetaRedex(e) {
    return absyn.isAppExp(e) &&
	absyn.isLambdaAbs(absyn.getAppExpFn(e));
}
function containsInnerBetaRedex(e) {
    return (absyn.isLambdaAbs(e) &&
	    containsBetaRedex(absyn.getLambdaAbsBody(e))) ||
	(absyn.isAppExp(e) &&
	 (containsBetaRedex(absyn.getAppExpFn(e)) ||
	  containsBetaRedex(absyn.getAppExpArg(e)) ));
}
function containsBetaRedex(e) {
   return  isBetaRedex(e) || containsInnerBetaRedex(e);
}
function reduceLeftmostInnermostBetaRedex (e) {
	var param, body, fn, arg, e2;
	if (absyn.isVarExp(e)) {
	return e;
    } else if (absyn.isLambdaAbs(e)) {
	param = absyn.getLambdaAbsParam(e);
	body = reduceLeftmostInnermostBetaRedex(
	    absyn.getLambdaAbsBody(e));
	return absyn.createLambdaAbs(param,body);	
    } else if (absyn.isAppExp(e)) {
	fn = absyn.getAppExpFn(e);
	arg = absyn.getAppExpArg(e);
	if (containsBetaRedex(fn)) {
	    e2 = reduceLeftmostInnermostBetaRedex(fn);
	    return absyn.createAppExp(e2,arg);
	} else if (containsBetaRedex(arg)) {
	    return absyn.createAppExp(
		fn,reduceLeftmostInnermostBetaRedex(arg));
	} else if (isBetaRedex(e)) {
	    return beta(e);
	} else {
	    return e;
	}	    
    }
}
function findLeftmostInnermostBetaRedex (e) {
    var fn, arg;
    if (absyn.isVarExp(e)) {
	return "no beta redex";
    } else if (absyn.isLambdaAbs(e)) {
	return findLeftmostInnermostBetaRedex(absyn.getLambdaAbsBody(e));
    } else if (absyn.isAppExp(e)) {
	fn = absyn.getAppExpFn(e);
	arg = absyn.getAppExpArg(e);
	if (containsBetaRedex(fn)) {
	    return findLeftmostInnermostBetaRedex(fn);
	} else if (containsBetaRedex(arg)) {
	    return findLeftmostInnermostBetaRedex(arg);
	} else if (isBetaRedex(e)) {
	    return e;
	} else {
	    return "no beta redex";
	}
    }
}
function reduceToNormalForm(e) {
    var output = [ ];
    var redex, redexStr, start, length, eStr, prefix, suffix, reducedStr;
    output.push( [ printExp(e) ] );
    while (true) {
	redex = findLeftmostInnermostBetaRedex(e);
	if (redex === "no beta redex") {
	    return output;
	} else {
	    redexStr = printExp(redex);
	    eStr = printExp(e);
	    length = redexStr.length;
	    start = eStr.indexOf(redexStr);
	    prefix = eStr.substr(0,start);
	    suffix = eStr.substr(start+length);
	    reducedStr = printExp(beta(redex));
	    output.push( [ prefix + reducedStr + suffix, 
			   myLength(eStr.substr(0,start)),
			   myLength(eStr.substr(0,start+length-1)) ]);
	    e = reduceLeftmostInnermostBetaRedex (e);
	}
    }
}
/*
function reduceToNormalForm(e) {
    var output = [ ];
    output.push(printExp(e));
    var eprime;
    while (true) {
	eprime = reduceLeftmostInnermostBetaRedex(e);
	if (printExp(eprime) === printExp(e)) {
	    return output;
	} else {
	    output.push(printExp(eprime));
	    e = eprime;	    
	}
    }
}
*/
function printExp(exp) {
    if (absyn.isVarExp(exp)) {
	return absyn.getVarExpId(exp);
    } else if (absyn.isLambdaAbs(exp)) {
	return "^" +
	    absyn.getVarExpId(absyn.getLambdaAbsParam(exp))  +
	    "." +
	    printExp(absyn.getLambdaAbsBody(exp));
    }
    else if (absyn.isAppExp(exp)) {
	return "(" +
	    printExp(absyn.getAppExpFn(exp)) +
	    " " +
	    printExp(absyn.getAppExpArg(exp)) +
	    ")";
    }
}
function evalExp(exp) {
    if (absyn.isVarExp(exp)) {
	return absyn.getVarExpId(exp);
    } else if (absyn.isLambdaAbs(exp)) {
	return "^" +
	    absyn.getVarExpId(absyn.getLambdaAbsParam(exp))  +
	    "." +
	    evalExp(absyn.getLambdaAbsBody(exp));
    }
    else if (absyn.isAppExp(exp)) {
	return "(" +
	    evalExp(absyn.getAppExpFn(exp)) +
	    " " +
	    evalExp(absyn.getAppExpArg(exp)) +
	    ")";
    }
}
function interpret(source) {
    var output='';
    try {
	var ast = parser.parse(source);
	return  myEval( ast );
    } catch (exception) {
        return "No output [Runtime error]";
    }
    return output;
}

function mySplit(s) {
    var output = [];
    var index;
    while (s.length > 0) {
	if (s[0] !== "^") {
	    output.push(s[0]);
	    s = s.substr(1);
	} else {
	    index = s.indexOf(".");
	    output.push(s.substr(0,index+1));
	    s = s.substr(index+1);
	}
    }
    
    return output;
}
function myLength(s) {
    var output=0;
    var index;
    while (s.length > 0) {
	if (s[0] !== "^") {
	    output += 1;
	    s = s.substr(1);
	} else {
	    index = s.indexOf(".");
	    output += 1;
	    s = s.substr(index+1);
	}
    }
    return output;
}
function fillIn(start,end) {
    if (start === end) {
	return [end];
    } else {
	var a=fillIn(start+1,end);
	a.unshift(start);
	return a;
    }
}
function loadArray(arr,chars) {   
    for(var index=0; index<chars.length; index++) {
	arr.value(index,chars[index]);
    }
    for(index=chars.length; index<arr.size(); index++) {
	arr.value(index,"");
    }
}
function myEval(p) {

    if (absyn.isProgram(p)) {
	return reduceToNormalForm( absyn.getProgramExp(p));
    } else {
	console.log(( "The input is not a program."));
    }
}

function startAV(lambdaexp) {


/*
    for(var i=0; i<exps.length; i++) {
	console.log( "'" + exps[i][0].length + "'" +
		     "'" + myLength(exps[i][0]) + "'" +
		     exps[i][0]);
    }
*/

    var defaultCellStyle =  {"border": "none", "width" : "25px", 
			     "min-width" : "25px", "box-shadow" : "none" };
    var oneCharWidth = 	{"width" : "8px", "min-width" : "5px" };
    var emptyWidth = 	{"width" : "0px", "min-width" : "0px" };
    var position = { anchor: 'left top', left: 0, top: 0 };
    var highlightCell = { "background-color" : "#89D" };
    var unhighlightCell = { "background-color" : "#FFF" };
    var av = new JSAV("container");
    var numCols = Math.max.apply(null, exps.map(function(x) 
						{ return myLength(x[0]); }));
    var arr = av.ds.array(fillIn(1,numCols));
    loadArray(arr,mySplit(exps[0][0]));
    var oneChar = function(x) { return arr.value(x).length === 1; };
    var noChar = function(x) { return arr.value(x).length === 0; };
    arr.css(true, defaultCellStyle).css( oneChar, oneCharWidth)
    .css(noChar,emptyWidth);
    av.umsg("<h2>Initial \u03BB-expression:</h2>");
    av.displayInit();

    for(var slide=1; slide<exps.length; slide++) {
	// %%%%%%%%%%%%%%%% new slide %%%%%%%%%%%%%%%%%%%%%%%
	av.umsg("<h2>[\u03B2-reduction #" + slide + 
		"] Find the leftmost innermost \u03B2-redex</h2>");
	av.step();
	// %%%%%%%%%%%%%%%% new slide %%%%%%%%%%%%%%%%%%%%%%%
	av.umsg("<h2>[\u03B2-reduction #" + slide + "] The leftmost " + 
		"innermost \u03B2-redex is highlighted below</h2>");
	loadArray(arr,mySplit(exps[slide-1][0]));
	arr.css(true, defaultCellStyle)
	    .css(oneChar, oneCharWidth)
	    .css(noChar,emptyWidth)
	    .css(fillIn(exps[slide][1],exps[slide][2]), highlightCell);
	av.step();
	// %%%%%%%%%%%%%%%% new slide %%%%%%%%%%%%%%%%%%%%%%%
	av.clearumsg();
	av.umsg("<h2>[\u03B2-reduction #" + slide +
		"] Reduce the \u03B2-redex</h2>");
	av.step();
	// %%%%%%%%%%%%%%%% new slide %%%%%%%%%%%%%%%%%%%%%%%
	av.umsg("<h2>[\u03B2-reduction #" + slide +
		"] Completed the \u03B2-reduction</h2>");
	loadArray(arr,mySplit(exps[slide][0]));
	arr.css(true, defaultCellStyle).css(oneChar, oneCharWidth)
	    .css(noChar,emptyWidth)
	    .css(true, unhighlightCell);
	av.step();
    }
    av.label("<h2>The \u03BB-expression above is in \u03B2-normal form.</h2>",
	    { left: 230, top : 50 });
    av.recorded();
}


exports.interpret = interpret; // make the interpreter public
}( interpreter));

var a = interpreter.interpret( process.argv[2] );

console.log( "[");
if (a.length>0) {
    console.log( "[ '" + a[0][0] + "' ]" 
	       + (a.length > 1 ? "," : ""));
}
for(var i=1; i<a.length; i++) {
     var line = "[ '" + a[i][0] + "'";
     for (var j = 1; j<a[i].length; j++) {
	 line = line + ", " + a[i][j];
     }
    line = line + "]";
    if (i < a.length-1) {
	line = line + ",";
    }
    console.log(line);
}
console.log( "];\n");

