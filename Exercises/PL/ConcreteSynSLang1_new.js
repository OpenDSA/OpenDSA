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
		index = exp.indexOf(a); 
		lastIndex = exp.lastIndexOf(a); 
		rnd = SL.absyn.getRnd(1,3);
		if (index > -1) {
		    switch (rnd) {
		    case 1: // replace first a
			exp = exp.substring(0,index) + b +
			    exp.substring(index+1);
			break;
		    case 2: // replace last a
			exp = exp.substring(0,lastIndex) + b +
			    exp.substring(lastIndex+1);
			break;
		    case 3: // replace all bs
			exp = exp.replace(new RegExp(a,'g'),b);
			break;
		    }
		}// there is at least one blank space		
		return exp;
	    }// replaceWith method


	    function addSyntaxError(exp) {
		var type = SL.absyn.getRnd(1,4);
		var rnd, index, lastIndex;
		type =4;
		switch (type) {
		    case 1:  // replace space(s) with comma
		    return replaceWith(exp," ",",");

		    case 2:  // replace comma(s) with space
		    return replaceWith(exp,","," ");

		    case 3: // replace "=>" with " "
		    index = exp.indexOf("=>");
		    if (index > -1) {
			if (SL.absyn.getRnd(0,1) === 0) {
			    index = exp.lastIndexOf("=>");
			}
			return exp.substring(0,index) + " " +
			    exp.substring(index+2);			    
		    } 
		    break;
		    case 4: // replace " " with "=>"
		    index = exp.indexOf(" ");
		    if (index > -1) {
			if (SL.absyn.getRnd(0,1) === 0) {
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
	}// init function
    };

    window.ConcreteSynSLang1 = window.ConcreteSynSLang1 || ConcreteSynSLang1;

}());


