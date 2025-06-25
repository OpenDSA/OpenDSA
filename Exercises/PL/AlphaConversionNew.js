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

    var AlphaConversionNew = {    

	init: function () {

	    var jsav = new JSAV("jsav", {"animationMode": "none"});
	    var vs = "xyz";
	    var minDepth = 4;
	    var maxDepth = 6;
	    var exp, lambdas, chosenLambda, firstLambda, numBound;
	    var attempts = 0;
	    var answer;

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
	    answer = answer.replace(/@|\#/g,"a")
		.replace(/\u03BB/g,"^");
	    this.displayableAnswer =
		"<span style=\"font-family:'Courier New'\">"
		+ answer + "</span>";
	    this.answer = answer.replace(/\s+/g,"");

	}, // init function

	validateAnswer: function (studentAnswer) {
	    return this.answer === studentAnswer.replace(/\s+/g,"");
	}

    };// AlphaConversionNew
    
    window.AlphaConversionNew = window.AlphaConversionNew || AlphaConversionNew;

}());


