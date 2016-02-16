/* global console, fp  */
(function() {
  "use strict";
   
    var RP10part4 = {    
	init: function() {
	    var e, f, g, h, j, k;
	    var randomDigit = Math.floor( Math.random() * 10);
	    var randomDigit2 = Math.floor( Math.random() * 10);

	    function generateEorFfunction(funcName,sign) { /* a * x +/- b */
		var a, b, sign_of_a = "";
		var result = "var " + funcName + " = function (x)   { return ";
		var suffix = "; };";
		if (Math.random() < 0.1) {
		    a = 0;
		} else {
		    a = 1 + Math.floor( Math.random() * 10);
		    sign_of_a = Math.random() < 0.5 ? "-" : "";
		    result += 
			(a === 1 ?
			 (sign_of_a === "-" ? "-x" : "x") :
			 (sign_of_a === "-" ? "-" + a + " * x" :
			 a + " * x"));
		    
		}
		b = Math.floor( Math.random() * 11);
		return (a === 0 ?  result + b :
		    b === 0 ? result : result + " " + sign + " " + b) + suffix;
	    }// generateEorFfunction


	    function generateGorHfunction(funcName,sign) { /* a * x >/< b */
		var a, b, sign_of_a = "";
		var result = "var " + funcName + " = function (x)   { return ";
		var suffix = "; };";
		a = 1 + Math.floor( Math.random() * 10);
		sign_of_a = Math.random() < 0.5 ? "-" : "";
		result += (a === 1 ? (sign_of_a === "-" ? "-x" : "x") : 
			   (sign_of_a + a + " * x"));
		b = Math.floor( Math.random() * 11);
		return  result + " " + sign + " " + b + suffix;
	    }// generateGorHfunction

	    function generateJfunction() { /* a * x +/- b * y */
		var a, b, sign_of_a = "", sign_of_b = "";
		var result = "var j = function (x,y) { return ";
		var suffix = "; };";
		var LHS, op, RHS;
		a = 1 + Math.floor( Math.random() * 10);
		b = 1 + Math.floor( Math.random() * 10);
		sign_of_a = Math.random() < 0.5 ? "-" : "";
		sign_of_b = Math.random() < 0.5 ? "-" : "";
		LHS = (sign_of_a === "-" ?
		       (a === 1 ? "-x" : "-" + a + " * x") :
		       (a === 1 ? "x"  : a + " * x"));
		op = Math.random() < 0.5 ? "+" : "-"; 
		if (op === "-" && sign_of_b === "-" ) {
		    op = "+";
		    sign_of_b = "";
		} else if (op === "+" && sign_of_b === "-" ) {
		    op = "-";
		    sign_of_b = "";
		}
		RHS = (sign_of_b === "-" ?
		       (b === 1 ? "-y" : "-" + b + " * y") :
		       (b === 1 ? "y"  : b + " * y"));
		return result + LHS + " " + op + " " + RHS + suffix;
	    }// generateJfunction

	    function generateKfunction() { /* a * x >/< b * y */
		var a, b, sign_of_a = "", sign_of_b = "";
		var result = "var k = function (x,y) { return ";
		var suffix = "; };";
		var LHS, RHS;
		a = 1 + Math.floor( Math.random() * 10);
		b = 1 + Math.floor( Math.random() * 10);
		sign_of_a = Math.random() < 0.5 ? "-" : "";
		sign_of_b = Math.random() < 0.5 ? "-" : "";
		LHS = (sign_of_a === "-" ?
		       (a === 1 ? "-x" : "-" + a + " * x") :
		       (a === 1 ? "x"  : a + " * x"));
		RHS = (sign_of_b === "-" ?
		       (b === 1 ? "-y" : "-" + b + " * y") :
		       (b === 1 ? "y"  : b + " * y"));
		return result + LHS + " " + 
		    (Math.random() < 0.5 ? "<" : ">" ) + " " + RHS + suffix;
	    }// generateKfunction
	    
	    e = generateEorFfunction("e","+");
	    f = generateEorFfunction("f","-");
	    g = generateGorHfunction("g",">");
	    h = generateGorHfunction("h","<");
	    j = generateJfunction();
	    k = generateKfunction();
	    
	    this.functionDef = e + "<br />" + f + "<br />" + g + "<br />" +
		h + "<br />" + j + "<br />" + k;
	    switch (Math.floor( Math.random() * 15 )) {
	    case 0:
		this.functionCall = "compose( e , f )( " + randomDigit + " )";
		break;
	    case 1:
		this.functionCall = 
		    "curry( compose )( e )( f )( " + randomDigit + " )";
		break;
	    case 2:
		this.functionCall = "compose( f , e )( " + randomDigit + " )";
		break;
	    case 3:
		this.functionCall = 
		    "curry( compose )( f )( e )( " + randomDigit + " )";
		break;
	    case 4:
		this.functionCall = "compose( g , f )( " + randomDigit + " )";
		break;
	    case 5:
		this.functionCall = 
		    "curry( compose )( g )( f )( " + randomDigit + " )";
		break;
	    case 6:
		this.functionCall = "compose( e , compose( f , e ) )( " + 
		    randomDigit + " )";
		break;
	    case 7:
		this.functionCall = "compose( compose( f , e ) , e )( " + 
		    randomDigit + " )";
		break;
	    case 8:
		this.functionCall = "compose( g , compose( f , e ) )( " + 
		    randomDigit + " )";
		break;
	    case 9:
		this.functionCall = "compose( compose( g , e ) , f )( " + 
		    randomDigit + " )";
		break;
	    case 10:
		this.functionCall = "curry( j )( " + randomDigit + 
		    " )( " + randomDigit2 + " )";
		break;
	    case 11:
		this.functionCall = "curry( k )( " + randomDigit + 
		    " )( " + randomDigit2 + " )";
		break;
	    case 12:
		this.functionCall = "compose( e , curry( j )( " + randomDigit + 
		    " ) )( " + randomDigit2 + " )";
		break;
	    case 13:
		this.functionCall = "compose( curry( j )( " + randomDigit + 
		    " ) , f )( " + randomDigit2 + " )";
		break;
	    case 14:
		this.functionCall = "compose( curry( k )( " + randomDigit + 
		    " ) , f )( " + randomDigit2 + " )";
		break;		
	    }

	    this.answer = JSON.stringify(
		eval("var curry = function (f) { return function (x) {" +
                     "return function (y) { return f(x,y); };};};" +
		     "var compose = function (f,g) {" +
		     "return function (x) { return f(g(x));};};" +
		     e + f + g + h + j + k + this.functionCall ));	    
	    //console.log(this.answer);
	},// init

	checkAnswer: function (studentAnswer) {
	    if (this.answer === "error" ||
		this.answer === "false" ||
		this.answer === "true") {
		return this.answer === studentAnswer.trim();
	    } else if (this.answer.match(/^-?\d+(\.\d+)?$/)) {
		// correct answer is a number
		// allow for 1.25 = 1.250
		return Number(this.answer) === Number(studentAnswer.trim());
	    } else {
		return this.answer === studentAnswer.replace(/\s+/g,"");
	    }
	}
    };// RP10part4  

    window.RP10part4 = window.RP10part4 || RP10part4;
}());

