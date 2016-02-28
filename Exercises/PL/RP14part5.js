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

    function clickHandler(index, e) {
	if(L.light[index]) {
	    arr.unhighlight(index);
	    L.light[index] = false;
	} else {
	    arr.highlight(index);
	    L.light[index] = true;
	}
    }

    var RP14part5 = {    

	init: function () {

	    var answer;
	    var jsav = new JSAV("jsav", {"animationMode": "none"});
	    var vs = "xyz";
	    var minDepth = 4;
	    var maxDepth = 6;
	    var exp, lambdas, chosenLambda, firstLambda, numBound;
	    var longest = function (a,x) { 
		return L.printExp(x).length > a ? x : a; };
	    while (true) {
		exp = L.getRndExp(1,minDepth,maxDepth,vs,"");
		lambdas = L.listLambdas(exp);
		
		if ( lambdas.length > 0) {
		    //chosenLambda = lambdas[L.getRnd(0,lambdas.length-1)];
		    firstLambda = lambdas[0];
		    lambdas.shift();
		    chosenLambda = lambdas.reduce(longest,firstLambda);
		    //L.printExp(firstLambda).length);
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
	}, // init function

	validateBoundVar: function () {
	    for(var i=0; i<question.answer.length; i++) {
		if ((L.light[i] && question.answer[i] !== '#' &&
		     question.answer[i] !== "\u03BB@.") ||
		    (! L.light[i]  && question.answer[i] === '#')) {
		    return false;
		}
	    }
	    
	    return true;
	}// validateBoundVar function

    };// RP14part5
    
    window.RP14part5 = window.RP14part5 || RP14part5;

}());


