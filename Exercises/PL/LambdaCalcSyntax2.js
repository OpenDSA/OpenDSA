/* global console, LAMBDA */
(function() {
  "use strict";
    var L = LAMBDA;
    var question = {};

    var LambdaCalcSyntax2 = {    

	init: function() {
	    var vs = "uvxyz";
	    var maxDepth = 5;
	    var minDepth = 4;
	    var exp;
	    var numCorrect = 0;
	    var exps = [ ];
	    var isCorrect;
	    var options = [ 0, 1, 2, 3, 4];
	    var hint4 = "";
	    var correctIndices = [];
	    
	    // David: all of these helper functions (except isNew) are 
	    // duplicated in LambdaCalcSyntax1.js. Because...
	    // When I moved them to a separate JS file that I loaded (with 
	    // use-require) in both LambdaCalcSyntax1.html and LambdaCalcSyntax2.html,
	    // OpenDSA did not like it (error on loading the shared JS file)

	    function pickRndCharacter(c,s) {
		var list = s.split("")
		    .map(function (e,i) { return (e===c ? i : -1) ; });
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
		throw new Error("Could not find closing paren for the one " +
				"at position " + index + " in " + s);
	    }
	    function removeParenPair(s) {
		var openParen = pickRndCharacter('(',s);
		var closeParen = findMatchingParen(s,openParen);
		return s.substring(0,openParen) + 
		    s.substring(openParen+1,closeParen) + 
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
	    }// getSyntaxError function

	    function isNew(arr) {
		var exp = arr[arr.length-1];
		for(var i=0; i<arr.length-1; i++) {
		    if (arr[i] === exp) {
			return false;
		    }
		}
		return true;
	    }

	    while (exps.length < 4) {	
		if (L.getRnd(0,1) === 0) {
		    // syntactically correct lambda exp
		    exps.push( L.printExp( L.getRndExp(1,minDepth,maxDepth,vs,"")) );
		    isCorrect = true;
		} else {
		    exps.push( getSyntaxError(minDepth,maxDepth,vs) );
		    isCorrect = question.answer === "True";
		}
		
		if (isNew(exps)) {
		    numCorrect += isCorrect ? 1 : 0;
		    if (isCorrect)
          		correctIndices.push( exps.length );
		} else {
		    exps.pop();
		}
	    }

	    this.expressions  = "Line 1: " + exps[0] + "<br />";
	    this.expressions += "Line 2: " + exps[1] + "<br />";
	    this.expressions += "Line 3: " + exps[2] + "<br />";
	    this.expressions += "Line 4: " + exps[3] + "<br />";

	    this.answer = String(numCorrect);
	    if (correctIndices.length == 0)
		this.hint4 = "None of the expressions above are syntactically correct.";
	    else if (correctIndices.length == 4)
		this.hint4 = "All of the expressions above are syntactically correct.";
	    else if (correctIndices.length == 1)
		this.hint4 = "Only the expression on line " + correctIndices[0]
		+ " above is syntactically correct.";
	    else
	    {
		this.hint4 = "Only the expressions on lines " +
		    correctIndices[0];
		for( var i = 1; i < correctIndices.length - 1; i++)
		    this.hint4 += ", " + correctIndices[i];
		this.hint4 += " and "
		    + correctIndices[correctIndices.length - 1]
                    + " above are syntactically correct.";
	    }
	} //i


    };// LambdaCalcSyntax2  
    
    window.LambdaCalcSyntax2 = window.LambdaCalcSyntax2 || LambdaCalcSyntax2;

}());


