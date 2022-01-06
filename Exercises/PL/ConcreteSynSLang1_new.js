/* global console,  SLang */
(function() {
  "use strict";

    var question = {};
    var ConcreteSynSLang1 = {    


	init: function() {
	    var SL = SLang;
	    var vs = "uvxyz";
	    var maxDepth = 5;
	    var minDepth = 4;
	    var numCorrect = SL.absyn.getRnd(0,1);
	    var options = [ "True", "False" ];
	    var exps = [ ];
	    var exp, badExp;
	    var error;
	    
	    function getRndExp() {
		var exp =
		    SL.printExp(
			SL.absyn.getProgramExp(
			    SL.absyn.generateRandomSLang1Program(
				0,2,5,"xyz","")));
		
		while (exp.length < 10 ||  exp.length>35) {
		    exp = 
			SL.printExp(
			    SL.absyn.getProgramExp(
				SL.absyn.generateRandomSLang1Program(
				    0,2,5,"xyz","")));
		}
		return exp;		
	    }// getRndExp function

	    // replace a with b in exp
	    function replaceWith(exp,a,b) {
		var index, lastIndex, rnd;
		var from = a === " " ? "space" : "comma";
		var to = b === " " ? "space" : "comma";		
		index = exp.indexOf(a); 
		lastIndex = exp.lastIndexOf(a); 
		rnd = SL.absyn.getRnd(1,3);
		if (index > -1) {
		    switch (rnd) {
		    case 1: // replace first a
			exp = exp.substring(0,index) + b +
			    exp.substring(index+1);
			error = "replacing the first " + from + " with a "
			    + to;
			break;
		    case 2: // replace last a
			exp = exp.substring(0,lastIndex) + b +
			    exp.substring(lastIndex+1);
			error = "replacing the last " + from + " with a "
			    + to;
			break;
		    case 3: // replace all as
			exp = exp.replace(new RegExp(a,'g'),b);
			error = "replacing all occurrences of " + from 
			    + " with a " + to;
			break;
		    }
		}// there is at least one blank space		
		return exp;
	    }// replaceWith method


	    function addSyntaxError(exp) {
		var type = SL.absyn.getRnd(1,4);
		var rnd, index, lastIndex;
		switch (type) {
		    case 1:  // replace space(s) with comma
		    return replaceWith(exp," ",",");

		    case 2:  // replace comma(s) with space
		    return replaceWith(exp,","," ");

		    case 3: // replace "=>" with " "
		    index = exp.indexOf("=>");
		    error = "replacing the first => with a space";
		    if (index > -1) {
			if (SL.absyn.getRnd(0,1) === 0) {
			    error = "replacing the last => with a space";
			    index = exp.lastIndexOf("=>");
			}
			return exp.substring(0,index) + " " +
			    exp.substring(index+2);			    
		    } 
		    break;
		    case 4: // replace " " with "=>"
		    index = exp.indexOf(" ");
		    error = "replacing the first space with a =>";
		    if (index > -1) {
			if (SL.absyn.getRnd(0,1) === 0) {
			    error = "replacing the last space with a =>";
			    index = exp.lastIndexOf(" ");
			}
			return exp.substring(0,index) + "=>" +
			    exp.substring(index+1);			    
		    } 
		}// switch
		return exp;
	    }// addSyntaxError

	    // add valid programs
	    while (exps.length < numCorrect) {
		exp = getRndExp();
		if (exps.indexOf(exp) === -1) {
		    exps.push(exp);
		}
	    }

	    // add non-programs
	    while (exps.length < 1) {
		exp = getRndExp();
		badExp = addSyntaxError( exp );
		if (exp !== badExp && exps.indexOf(exp) === -1) {
		    exps.push(badExp);
		}
	    }

	    this.expression = exps[0];
	    this.answer = numCorrect == 1 ? "True" : "False";
	    if ( this.answer === "True")
		this.hint4 = "The correct answer is True.";
	    else
	    {
		var span = "<span style=\"font-family: 'Courier New'\">";
		this.hint4 = "The correct answer is False. The expression "
		    + " above was obtained by starting with the following "
		    + " syntactically correct expression:</br>"
		    + span + exp + "</span>"
		    + "</br> and then " + error;
	    }
	}// init function
    };

    window.ConcreteSynSLang1 = window.ConcreteSynSLang1 || ConcreteSynSLang1;

}());


