/* global console, fp  */
(function() {
  "use strict";
   
    var randomDigit;
    var randomDigit2;

    var RP10part5 = {    
	init: function() {
	    var e, f, g, h, j, k;
/*
	    // pick a random function
	    var functionNumber = 
		Math.floor(Math.random() * functions.length); 
	    //functionNumber = 9;
	    var params = functions[ functionNumber ][0];
	    var f = functions[ functionNumber ][1];
	    var fStr = f.toString();

	    // pick a random input
	    var x =  Math.floor(Math.random() * 11);
	    var y =  Math.floor(Math.random() * 11); 
	    var constraint;

	    // enfore special constraints, if any
	    if (functions[functionNumber][2]) {
		constraint = functions[functionNumber][2];
		switch (constraint) {
		case "y cannot be 0":
		    if ( y === 0)  {
			y =  1 + Math.floor(Math.random() * 10); 
		    }
		    break;
		case "x cannot be 0":
		    if ( x === 0)  {
			x =  1 + Math.floor(Math.random() * 10); 
		    }
		    break;
		case "x/y must have at most three decimals":
		    pickDivisionArguments(x,y,false);
		    break;
		case "y/x must have at most three decimals":
		    pickDivisionArguments(x,y,true);
		    break;
		}
		//console.log("new y = " + y);
	    }// enforce constraints


	    var answer;
	    try {
		answer = JSON.stringify(
		    eval("var f = " + fStr + ";\n" +
			 "var g = f(" + x + ");\n" +
			 "g(" + y + ")"));
	    } 
	    catch (e) {
		answer = "error";
	    }
*/

	    function generateEorFfunction(funcName,sign) { /* a * x +/- b */
		var a, b, sign_of_a = "";
		var result = "var " + funcName + " = function (x)   { return ";
		var suffix= "; }"
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
		var suffix= "; }"
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
		var suffix= "; }"
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
		var suffix= "; }"
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
	    
	    this.answer = "to do"
	    this.functionDef = e + "<br />" + f + "<br />" + g + "<br />" +
		h + "<br />" + j + "<br />" + k + "<br />";
	    this.functionCall = "to do";
	    console.log(answer);
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
    };// RP10part5  

    window.RP10part5 = window.RP10part5 || RP10part5;
}());

