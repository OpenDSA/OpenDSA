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

    var RP14part4 = {    

	init: function () {

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
	}, // init function

	validateFreeVar: function() {
	    for(var i=0; i<question.answer.length; i++) {
		if ((L.light[i] && question.answer[i] !== '?') ||
		    (! L.light[i]  && question.answer[i] === '?')) {
		    return false;
		}
	    }
	    return true;
	}// validateFreeVar function

    };// RP14part4
    
    window.RP14part4 = window.RP14part4 || RP14part4;

}());


