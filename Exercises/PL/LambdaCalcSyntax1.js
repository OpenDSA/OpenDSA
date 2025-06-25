/* global console, LAMBDA */
(function() {
  "use strict";
    var L = LAMBDA;
    var question = {};
    var LambdaCalcSyntax1 = {    

	init: function() {
	    var vs = "uvxyz";
	    var maxDepth = 6;
	    var minDepth = 4;
	    	
	    var subExp = "";
	    var hint4 =  "The expression above is syntactically correct.";

	    // David: all of these helper functions are duplicated in 
	    // LambdaCalcSyntax2.js. Because...
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
		subExp =  s.substring(openParen+1,closeParen);
		return s.substring(0,openParen) + 
		    s.substring(openParen+1,closeParen) + 
		    s.substring(closeParen+1);
	    }
	    function removeDot(s) {
		var dot = pickRndCharacter('.',s);
		subExp =  s.substring(dot - 2, dot);		
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
			hint4 = "There are missing parentheses around " +
			      subExp;
		    }
		    //  leave s unchanged if it does not contain any parens
		    break;
		case 2: 
		    if (s.indexOf('.') !== -1) {
			s = removeDot(s);
			question.answer = "False";
			hint4 = "There is a dot missing after " +
			    subExp;			
		    }
		    //  leave s unchanged if it does not contain any dot
		    break;
		case 3:
		    var correct = s;
		    s = addParens(s);
		    question.answer = "False";
		    hint4 = "A correctly parenthesized modification of this expression (with two parentheses removed) would be: " + correct;
		    break;
		}    
		return s;
	    }// getSyntaxError function


	

	    if (L.getRnd(0,1) === 0) {
		// syntactically correct lambda exp
		this.expression = 
		    L.printExp( L.getRndExp(1,minDepth,maxDepth,vs,""));
		this.answer = "True";
	    } else {
		this.expression = getSyntaxError(minDepth,maxDepth,vs);
		this.answer = question.answer;
	    }
	    this.hint4 = hint4;
	} //init

    };// LambdaCalcSyntax1  
    
    window.LambdaCalcSyntax1 = window.LambdaCalcSyntax1 || LambdaCalcSyntax1;

}());


