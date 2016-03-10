/* global console, LAMBDA */
(function() {
    "use strict";
    var L = LAMBDA;
    var RP18part1 = {    

	init: function () {
	    var n1, n2, exp;
	    switch (L.getRnd(0,1)) {
	    case 0:
		/* a * b */		
		n1 = Math.floor(Math.random() * 5);
		n2 = Math.floor(Math.random() * 5);
		exp = L.absyn.createMultiplication(
		    L.absyn.createNumber(n1),
		    L.absyn.createNumber(n2));
		this.expression = L.printExp(exp);
		this.answer = L.printExp(L.absyn.createNumber(n1*n2));
		break;
	    case 1:
		/* a + b */		
		n1 = Math.floor(Math.random() * 7);
		n2 = Math.floor(Math.random() * 7);
		exp = L.absyn.createAddition(
		    L.absyn.createNumber(n1),
		    L.absyn.createNumber(n2));
		this.expression = L.printExp(exp);
		this.answer = L.printExp(L.absyn.createNumber(n1+n2));
		break;
	    }
	    //console.log(this.answer);
	    
	}, // init function

	validateAnswer: function (studentAnswer) {
	    console.log(this.answer.replace(/\s+/g,"").replace(/\u03BB/g,"^"));
	    return this.answer.replace(/\s+/g,"").replace(/\u03BB/g,"^") ===
		studentAnswer.replace(/\s+/g,"");
	}// validateAnswer function

    };// RP18part1
    
    window.RP18part1 = window.RP18part1 || RP18part1;

}());


