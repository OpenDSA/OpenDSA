/*global ODSA LAMBDA */

// This is just a demo to illustrate templates for calling on the
// interpreter to produce a slide show for a fixed expression or a
// randomized expression.  Most likely this AV will not appear
// directly in the book, but chunks of it can be used in a variety of
// places.

// To incorporate it into a AV, use the following:
// 
// .. inlineav:: LC1CON ss
//    :long_name: Illustrate Lambda Calculus applicative order
//    :links: AV/PL/LC/LCCON.css
//    :scripts: AV/PL/interpreters/lambdacalc/version1.4.used.in.book/scripts/init.js AV/PL/interpreters/lambdacalc/version1.4.used.in.book/scripts/grammar.js AV/PL/interpreters/lambdacalc/version1.4.used.in.book/scripts/absyn.js AV/PL/interpreters/lambdacalc/version1.4.used.in.book/scripts/interpreter.js AV/PL/interpreters/lambdacalc/version1.4.used.in.book/scripts/randomExamples.js AV/PL/LC/LC1CON.js
//    :output: show

$(document).ready(function() {
    "use strict";
    var av_name = "LC1CON";
    // If you want to provide a specific exp for the av, it's easy --
    // just use this

    //    LAMBDA.interpret(av_name,'((^x.x ^x.x) (^x.x ^x.x))',"applicative");

    ///////////////////////// IF RANDOM EXP //////////////////////////////////////////////////////
    
    // If you want to provide a random exp, we borrow the technique
    // David used in the proficiency exercise

    // getRndExp seems to produce an already parsed exp, so we need to
    // generate an appropriate exp and then unparse it to package it
    // for LAMBDA.interpret and consequent display

    // Helper functions

    function infiniteLoop(reduction) { return reduction[0].length > 1; }
    function tooLong(reduction) { 
	return 35 < reduction.map(function (x) { return x[0].length; })
	    .reduce(function(a,b) { return Math.max(a,b);} , -1);
    }
    function sameReduction(r1,r2) {
	if (r1.length !== r2.length) {
	    return false;
	} else {
	    for(var i=1; i<r1.length; i++) {
		if (r1[i][0] !== r2[i][0]) {
		    return false;
		}
	    }
	    return true;
	}
    }


    var vars = "uvxyz";
    var numSteps = 3;  // minimum number of reductions in this exercise
    var e;


    var order = "applicative";	// Toggle if want normal
    var theExp = [];
    var normalRed, applicativeRed;
    while (theExp.length < numSteps+1 || theExp.length > numSteps+2) {
	e = LAMBDA.getRndExp(1,2,6,vars,"");
	normalRed = LAMBDA.reduceToNormalForm(e,"normal");
	applicativeRed = LAMBDA.reduceToNormalForm(e,"applicative");   
	if (order === "normal") {
	    if ( infiniteLoop(normalRed) ||
		 sameReduction(normalRed,applicativeRed) ||
		 tooLong(normalRed) ) {
		theExp = [];
	    } else {
		theExp = normalRed;
	    }
	} else { // applicative order
	    if ( infiniteLoop(applicativeRed) ||
		 sameReduction(normalRed,applicativeRed) ||
		 tooLong(applicativeRed) ) {
		theExp = [];
	    } else {
		theExp = applicativeRed;
	    }
	}
    }
    theExp = theExp.map(function(a) { return a[0]; });
    theExp = theExp.map(function (x) { return x.replace(/\u03BB/g,'^');}); 
    console.log(theExp[0].length);
    console.log(theExp[0]);
    LAMBDA.interpret(av_name,theExp[0],"applicative");
});

