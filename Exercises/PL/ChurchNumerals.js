/* global console, LAMBDA */
(function() {
    "use strict";
    var L = LAMBDA;
    var ChurchNumerals = {    

	init: function () {
	    var n1, n2, n1Lambda, n2Lambda, exp;
	    var span = "<span style=\"font-family: 'Courier New'\">";
	    switch (L.getRnd(0,1)) {
	    case 0:
		/* a * b */		
		n1 = Math.floor(Math.random() * 5);
		n2 = Math.floor(Math.random() * 5);
		n1Lambda = L.absyn.createNumber(n1);
		n2Lambda = L.absyn.createNumber(n2);		
		exp = L.absyn.createMultiplication(n1Lambda, n2Lambda);
		this.expression = L.printExp(exp);
		this.answer = L.printExp(L.absyn.createNumber(n1*n2));
		this.hint3 = "The answer is " + span + this.answer
		    .replace(/\u03BB/g,"^") + "</span>"
		    + ", i.e., the numeral " + (n1 * n2) 
		    + " because</br> the arithmetic operator " + span
		    + " \u03BBm.\u03BBn.\u03BBf.(m (n f))</span> is MULT</br>"
		    + " and the two operands "
		    + span + L.printExp(n1Lambda) + "</span>"
		    + " and "
		    + span + L.printExp(n2Lambda) + "</span>"
		    + " correspond to the numerals " + n1 + " and " + n2
		    + ", respectively.";
		break;
	    case 1:
		/* a + b */		
		n1 = Math.floor(Math.random() * 7);
		n2 = Math.floor(Math.random() * 7);
		n1Lambda = L.absyn.createNumber(n1);
		n2Lambda = L.absyn.createNumber(n2);		
		exp = L.absyn.createAddition(n1Lambda, n2Lambda);
		this.expression = L.printExp(exp);
		this.answer = L.printExp(L.absyn.createNumber(n1+n2));
		this.hint3 = "The answer is " + span + this.answer 
		    .replace(/\u03BB/g,"^") + "</span>"
		    + ", i.e., the numeral " + (n1 + n2) + ", because</br>"
		    + "the arithmetic operator " + span 
		    + "(\u03BBm.\u03BBn.\u03BBf.\u03BBx.((n f) ((m f) x))</span> "
		    + "is PLUS</br>"
		    + " and the two operands "
		    + span + L.printExp(n1Lambda) + "</span>"
		    + " and "
		    + span + L.printExp(n2Lambda) + "</span>"
		    + " correspond to the numerals " + n1 + " and " + n2
		    + ", respectively.";
		break;
	    }
	    //console.log(this.answer);
	    
	}, // init function

	validateAnswer: function (studentAnswer) {
	    //console.log(this.answer.replace(/\s+/g,"").replace(/\u03BB/g,"^"));
	    return this.answer.replace(/\s+/g,"").replace(/\u03BB/g,"^") ===
		studentAnswer.replace(/\s+/g,"");
	}// validateAnswer function

    };// ChurchNumerals
    
    window.ChurchNumerals = window.ChurchNumerals || ChurchNumerals;

}());


