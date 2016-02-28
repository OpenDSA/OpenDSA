/* global console, LAMBDA */
(function() {
  "use strict";
    var L = LAMBDA;
    var question = {};
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


    function makeRegex( lambdaexp ) {
	lambdaexp = lambdaexp.replace(/\s+/g,"").replace(/\u03BB/g,"^").split("");
	return ("\\s*" + lambdaexp.join("\\s*") + "\\s*")
	    .replace(/\^/g,"\\^").replace(/\./g,"\\.").replace(/\(/g,"\\(")
	    .replace(/\)/g,"\\)");
    }


    var RP15part1 = {    

	init: function () {

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
	}, // init function

	validateAnswer: function () {
	    for(var i=0; i<question.answer.length; i++) {
		if ((L.light[i] && question.answer[i] !== '#' &&
		     question.answer[i] !== "\u03BB@.") ||
		    (! L.light[i]  && question.answer[i] === '#')) {
		    return false;
		}
	    }
	    
	    return true;
	}// validateAnswer function

    };// RP15part1
    
    window.RP15part1 = window.RP15part1 || RP15part1;

}());


