"use strict";

/* global LAMBDA, console */

var question = {};
var L = LAMBDA;



/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
        common code for SyntaxTF and SyntaxMC exercises
   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

function pickRndCharacter(c,s) {
    var list = s.split("").map(function (e,i) { return (e===c ? i : -1) ; });
    list = list.filter(function (x) { return x >= 0; });
    return list[L.getRnd(0,list.length-1)];		       
}
function findMatchingParen(s,index) {
    s = s.split("");
    var count = 0;
    for(var i=index+1; i<s.length; i++) {
	if (s[i] === ')') {
	    if (count === 0) {
		return i;
	    } else {
		count--;
	    }
	} else {
	    if (s[i] === '(') {
		count++;
	    }
	}
    }
    throw new Error("Could not find closing paren for the one at position " +
		    index + " in " + s);
}
function removeParenPair(s) {
    var openParen = pickRndCharacter('(',s);
    var closeParen = findMatchingParen(s,openParen);
    return s.substring(0,openParen) + s.substring(openParen+1,closeParen) + 
	s.substring(closeParen+1);
}
function removeDot(s) {
    var dot = pickRndCharacter('.',s);
    return s.substring(0,dot) + " " + s.substring(dot+1);
}
function addParens(s) {
    var n = s.length;
    var closing = n-1;
    while (s[closing] === ')') {
	closing--;
    }
    var p1 = L.getRnd(0,closing-1);
    var p2 = L.getRnd(closing+1,n-1);
    // do not insert in front of a space or a dot
    if (s[p1] === " " || s[p1] === ".") {
	p1++;
    }
    // do not insert after a lambda
    if (p1>0 && s[p1-1] === "\u03BB" ) {
	p1 += 2;
    }
    return s.substring(0,p1) + "(" + 
	s.substring(p1,p2) + ")" + s.substring(p2);
}
function getSyntaxError(minDepth,maxDepth,vs) {
    var s = L.printExp( L.getRndExp(1,minDepth,maxDepth,vs,""));
    var rnd = L.getRnd(1,3);
    question.answer = "True";
    switch (rnd) {
    case 1: 
	if (s.indexOf('(') !== -1) {
	    s = removeParenPair(s);
	    question.answer = "False";
	}
	//  leave s unchanged if it does not contain any parens
	break;
    case 2: 
	if (s.indexOf('.') !== -1) {
	    s = removeDot(s);
	    question.answer = "False";
	}
	//  leave s unchanged if it does not contain any dot
	break;
    case 3: 
	s = addParens(s);
        question.answer = "False";
	break;
    }    
    return s;
}


/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
                 code for SyntaxTF exercise
   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
// Initialize Alpha Multiple Choice Exercises.
function initSyntaxTF()
{
    var vs = "uvxyz";
    var maxDepth = 6;
    var minDepth = 4;
    var exp;
    if (L.getRnd(0,1) === 0) {
	// syntactically correct lambda exp
	exp = L.printExp( L.getRndExp(1,minDepth,maxDepth,vs,""));
	question.answer = "True";
    } else {
	exp = getSyntaxError(minDepth,maxDepth,vs);
    }
    var jsav = new JSAV("jsav", {"animationMode": "none"});
    jsav.code(exp, {lineNumbers: false});

    question.statement = exp;
}
function getAnswerSyntaxTF() {
    return question.answer;
}
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
                 code for SyntaxMC exercise
   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

function isNew(arr) {
    var exp = arr[arr.length-1];
    for(var i=0; i<arr.length-1; i++) {
	if (arr[i] === exp) {
	    return false;
	}
    }
    return true;
}
function initSyntaxMC()
{
    var vs = "uvxyz";
    var maxDepth = 5;
    var minDepth = 4;
    var exp;
    var numCorrect = 0;
    var exps = [ ];
    var isCorrect;


    while (exps.length < 4) {	
	if (L.getRnd(0,1) === 0) {
	    // syntactically correct lambda exp
	    exps.push( L.printExp( L.getRndExp(1,minDepth,maxDepth,vs,"")) );
	    isCorrect = true;
	} else {
	    exps.push( getSyntaxError(minDepth,maxDepth,vs) );
	    isCorrect = false;
	}

	if (isNew(exps)) {
	    numCorrect += isCorrect ? 1 : 0;
	} else {
	    exps.pop();
	}
    }

    question.answer = String(numCorrect);

    var jsav = new JSAV("jsav",{"animationMode": "none"});
    jsav.code(exps.join("\n"), {lineNumbers: false});


}
function getAnswerSyntaxMC() {
    return question.answer;
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
                 code for SyntaxTreeMC exercise
   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

function initSyntaxTreeMC()
{
    var vs = "uvxyz";
    var maxDepth = 4;
    var minDepth = 4;
    var exp = L.getRndExp(1,minDepth,maxDepth,vs,"");
    var options = [ L.getNumNodes(exp),10,20,30,40 ];

    question.options = options;

    var jsav = new JSAV("jsav",{"animationMode": "none"});
    jsav.code( L.printExp(exp), {lineNumbers: false});
}
function getOptionSyntaxTreeMC() {
    return question.options;
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
                 code for freeVarHighlight exercise
   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

    var arr;
    var setArrayCellsWidth = function (highlight,range) {
	arr.removeClass(true,"oneCharWidth");
	arr.removeClass(true,"emptyWidth");
	arr.removeClass(true,"lambdaWidth");
	arr.removeClass(true,"parenWidth");
	arr.addClass(true, "defaultCellStyle");
	arr.addClass(oneChar, "oneCharWidth");
	arr.addClass(noChar,"emptyWidth");
	arr.addClass(lambdaChar,"lambdaWidth");
	arr.addClass(parenChar,"parenWidth");
	if (highlight !== undefined) {
	    if (highlight) {
		arr.removeClass(true,"unhighlightCell");
		arr.addClass(range, "highlightCell");
	    } else {
		arr.removeClass(true,"highlightCell");
		arr.addClass(range, "unhighlightCell");
	    }
	}
    };
    function oneChar (x) { return arr.value(x).length === 1; }
    var noChar = function(x) { return arr.value(x).length === 0; };
    var lambdaChar = function(x) { return arr.value(x).length === 3; };
    var parenChar = function(x) { 
	return arr.value(x) === '(' || arr.value(x) === ')' ||
	    arr.value(x) === ' '; 
    };

function initFreeVarHighlight () {

    var jsav = new JSAV("jsav", {"animationMode": "none"});
    var vs = "uvxyz";
    var minDepth = 3;
    var maxDepth = 4;
    var exp = L.getRndExp2(1,minDepth,maxDepth,vs,"");
    var answer = L.mySplit(L.getFreeBoundVariables(exp));
    arr = jsav.ds.array(L.mySplit(L.printExp(exp)));
    setArrayCellsWidth();
    L.light = [ ];
    for(var i=0; i<arr.size(); i++) {
	L.light.push(false);
    }
    arr.click(clickHandler);
    question.answer = answer;
}
function clickHandler(index, e) {
    if(L.light[index]) {
	arr.unhighlight(index);
	L.light[index] = false;
    } else {
	arr.highlight(index);
	L.light[index] = true;
    }
}
function validateFreeVar() {
    for(var i=0; i<question.answer.length; i++) {
	if ((L.light[i] && question.answer[i] !== '?') ||
	    (! L.light[i]  && question.answer[i] === '?')) {
	    return false;
	}
    }
    return true;
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
                 code for boundVarHighlight exercise
   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

function initBoundVarHighlight () {
    var answer;
    var jsav = new JSAV("jsav", {"animationMode": "none"});
    var vs = "xyz";
    var minDepth = 4;
    var maxDepth = 6;
    var exp, lambdas, chosenLambda, firstLambda, numBound;
    var attempts = 0;
    var longest = function (a,x) { return L.printExp(x).length > a ? x : a; };
    while (true) {
	attempts++;
	exp = L.getRndExp(1,minDepth,maxDepth,vs,"");
	lambdas = L.listLambdas(exp);

	if ( lambdas.length > 0) {
	    //chosenLambda = lambdas[L.getRnd(0,lambdas.length-1)];
	    firstLambda = lambdas[0];
	    lambdas.shift();
	    chosenLambda = lambdas.reduce(longest,firstLambda);
	    answer = L.labelBoundVariables(exp,chosenLambda);
	    numBound = answer.split("#").length-1;
	    if (numBound > 0 && answer.length < 40) {
		break;
	    }
	}
    }
    question.answer = L.mySplit(answer);    
    arr = jsav.ds.array(L.mySplit(L.printExp(exp)));
    setArrayCellsWidth();
    L.light = [ ];
    for(var i=0; i<arr.size(); i++) {
	L.light.push(false);
	if (question.answer[i] === "\u03BB@.") {
	    arr.addClass([i],"bindingVar");
	}
    }
    arr.click(clickHandler);
}
function validateBoundVar() {
    for(var i=0; i<question.answer.length; i++) {
	if ((L.light[i] && question.answer[i] !== '#' &&
	     question.answer[i] !== "\u03BB@.") ||
	    (! L.light[i]  && question.answer[i] === '#')) {
	    return false;
	}
    }
    
    return true;
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
                 code for alphaConversion  exercise
   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

function makeRegex( lambdaexp ) {
    lambdaexp = lambdaexp.replace(/\s+/g,"").replace(/\u03BB/g,"^").split("");
    return ("\\s*" + lambdaexp.join("\\s*") + "\\s*")
	.replace(/\^/g,"\\^").replace(/\./g,"\\.").replace(/\(/g,"\\(")
	.replace(/\)/g,"\\)");
}
function initAlphaConversion () {

    var answer;
    var jsav = new JSAV("jsav", {"animationMode": "none"});
    var vs = "xyz";
    var minDepth = 4;
    var maxDepth = 6;
    var exp, lambdas, chosenLambda, firstLambda, numBound;
    var attempts = 0;

    while (true) {
	attempts++;
	exp = L.getRndExp(1,minDepth,maxDepth,vs,"");
	lambdas = L.listLambdas(exp);

	if ( lambdas.length > 0) {
	    chosenLambda = lambdas[L.getRnd(0,lambdas.length)];
	    answer = L.labelBoundVariables(exp,chosenLambda);
	    numBound = answer.split("#").length-1;
	    if (numBound > 0 && answer.length < 30) {
		break;
	    }
	}
    }

    answer = L.mySplit(answer);    
    arr = jsav.ds.array(L.mySplit(L.printExp(exp)));
    setArrayCellsWidth();
    for(var i=0; i<arr.size(); i++) {
	if (answer[i] === "\u03BB@.") {
	    arr.addClass([i],"bindingVar");
	}
    }
    answer = answer.join("");
    question.answer = answer.replace(/@|\#/g,"a").replace(/\s+/g,"").replace(/\u03BB/g,"^").split("");
    question.answer = ("\\s*" + question.answer.join("\\s*") + "\\s*")
	.replace(/\^/g,"\\^").replace(/\./g,"\\.").replace(/\(/g,"\\(")
	.replace(/\)/g,"\\)");
}

function getAnswerAlphaConversion() {
    return question.answer;
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
                 code for substitutionCases exercise
   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

function pickExpression(minDepth,maxDepth,vars) {
    /* pick a, p, abd B in subst(a,p,B) */
    var substCase,a,p,B,tmp,tmp2, x;
    var rnd = Math.random();    
    a = L.getRndExp(1,1,3,vars,"");
    if (rnd<0.15) {
	substCase = "1a";
	p = L.absyn.createVarExp( vars.substr(L.getRnd(0,vars.length-1),1));
	B = p;
    } else if (rnd<0.30) {
	substCase = "1b";
	tmp = L.getRnd(0,vars.length-1);
	while (true) {
	    tmp2 = L.getRnd(0,vars.length-1);
	    if (tmp2 !== tmp) { break; }
	}
	p = L.absyn.createVarExp( vars.substr(tmp,1));
	B = L.absyn.createVarExp( vars.substr(tmp2,1));
    } else if (rnd<0.45) {
	substCase = "3";
	p = L.absyn.createVarExp( vars.substr(L.getRnd(0,vars.length-1),1));
	while (true) {
	    B = L.getRndExp(1,2,4,vars,"");
	    if (L.absyn.isAppExp(B)) {
		break;
	    }
	}	
    } else {
	// first pick the lambda abstraction
	while (true) {
	    B = L.getRndExp(1,2,4,vars,"");
	    if (L.absyn.isLambdaAbs(B)) {
		break;
	    }
	}
	x = L.absyn.getLambdaAbsParam(B);
	// now pick subcase
	rnd = L.getRnd(1,3);
	if (rnd === 1) {
	    substCase = "2a";
	    p = x;
	} else {
	    // pick a variable p different from x and a
	    while (true) {
		tmp = vars.substr( L.getRnd(0,vars.length-1), 1);		
		if (tmp !== L.absyn.getVarExpId(x) &&
		    tmp !== L.printExp(a)) {
		    break; 
		}
	    }
	    p = L.absyn.createVarExp(tmp);
	    // handle the two remaining subcases
	    if (rnd === 2) {
		substCase = "2b";
		if (L.free(x,a)) {
		    while (true) {
			a = L.getRndExp(1,1,3,vars,"");
			if (! L.free(x,a)) {
			    break;
			}
		    }
		}
	    }
	    else {
		substCase = "2c";
		if (! L.free(x,a)) {
		    while (true) {
			a = L.getRndExp(1,1,3,vars,"");
			if (L.free(x,a)) {
			    break;
			}
		    }
		}
	    } 
	}
    }
    // make sure that a and p are not identical
    if (substCase !== '2b' && substCase !== '2c') {
	while (L.printExp(a) === L.printExp(p)) {
	    a = L.getRndExp(1,1,3,vars,"");
	}
    }
    return [substCase,a,p,B];
}
function initSubstitutionCases() {
    var answer;
    var jsav = new JSAV("jsav", {"animationMode": "none"});
    var vs = "xyz";
    var minDepth = 4;
    var maxDepth = 6;
    var subst = pickExpression(2,4,vs);
    var substCase = subst[0];
    var a = subst[1];
    var p = subst[2];
    var B = subst[3];
    subst = "subst( " + L.printExp(a) + ", " + L.printExp(p) + ", " + 
	L.printExp(B) + " )";
    arr = jsav.ds.array([subst]);
    arr.addClass([0],"noBoxShadow");
    question.answer = substCase;
}

function getAnswerSubstitutionCases() {
    return question.answer;
}

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
                 code for substitutionResult exercise
   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

function initSubstitutionResult() {
    var answer;
    var jsav = new JSAV("jsav", {"animationMode": "none"});
    var vs = "xyz";
    var minDepth = 4;
    var maxDepth = 6;
    var subst = pickExpression(2,4,vs);
    var substCase = subst[0];
    var a = subst[1];
    var p = subst[2];
    var B = subst[3];
    a = ["AppExp",["VarExp","x"], 
	 ["VarExp","y"]];
    p = ["VarExp","z"];
    B = ["LambdaAbs",["VarExp","x"], ["LambdaAbs",["VarExp","y"],
				      ["AppExp",["VarExp","x"], 
				       ["VarExp","y"]]]];
    subst = "subst( " + L.printExp(a) + ", " + L.printExp(p) + ", " + 
	L.printExp(B) + " )";
    arr = jsav.ds.array([subst]);
    arr.addClass([0],"noBoxShadow");
    question.answer = makeRegex(L.printExp( L.substitute(a,p,B) ));
    console.log(L.printExp( L.substitute(a,p,B)));
}

function getAnswerSubstitutionResult() {
    return question.answer;
}
