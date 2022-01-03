/* global console, LAMBDA */
(function() {
  "use strict";
    var BetaRedex1 = {    

	init: function () {
	    var exp = LAMBDA.getRndExp(1,4,6,"xyzuvw","");
	    var listOfRedexes = LAMBDA.countBetaRedexes(exp);
	    this.answer = listOfRedexes.length + "";
	    this.hint3 = "";  // in case there are no beta-redexes
	    if (listOfRedexes.length === 1)
		this.hint3 = "The beta-redex is " 
		    + LAMBDA.printExp( listOfRedexes[0] );
	    else if (listOfRedexes.length > 1)
	    {
		this.hint3 = "The beta-redexes are: " 
		    + "<ol style=\"font-family: 'Courier New'\">";
		for( var i = 0; i < this.answer; i++)
		    this.hint3 += "<li>" + LAMBDA.printExp( listOfRedexes[i] )
		    + "</li>";
		this.hint3 += "<ol>";
	    }
	    this.expression = LAMBDA.printExp( exp )
		.replace(/\s/g,"  ");   // increase spacing
	}, // init function

	validateAnswer: function (studentAnswer) {
	    return this.answer ===
		studentAnswer.replace(/\s+/g,"");
	}// validateAnswer function

    };// BetaRedex1
    
    window.BetaRedex1 = window.BetaRedex1 || BetaRedex1;

}());


