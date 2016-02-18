/* global console, fp  */
(function() {
  "use strict";
   
    var randomDigit;
    var randomDigit2;

    var RP9part1 = {    
	init: function() {

	    // update x and y so that x / y contains no more than 
	    // 3 digits after the decimal point
	    function pickDivisionArguments(a,b,swap) {
		var quotient = (a / b) + "";
		var periodIndex = quotient.indexOf(".");
		while ( b === 0 ||
			(periodIndex > -1 &&
			 periodIndex + 3 < quotient.length-1) ) {
		    a = Math.floor(Math.random() * 11);		
		    b = 1 + Math.floor(Math.random() * 10);
		    quotient = (a / b) + "";
		    periodIndex = quotient.indexOf(".");
		}
		if (swap) {
		    x = b;
		    y = a;
		} else {
		    x = a;
		    y = b;
		}
	    }// pickDivision arguments

	    var functions = [

    /* 0 */
    [ "<span class='string'>x</span> and <span class='string'>y</span> " +
      "are both integers",
function (x) { 
   return function (y) { return x - y; }; 
}     
    ],

    /* 1 */
    [ "<span class='string'>x</span> and <span class='string'>y</span> " +
      "are both integers",
function (x) { 
   return function (y) { return y - x; }; 
}     
    ],

    /* 2 */
    [ "<span class='string'>x</span> and <span class='string'>y</span> " +
      "are both integers",
function (x) { 
   return function (y) { return x % y; }; 
},
      "y cannot be 0"
    ],

    /* 3 */
    [ "<span class='string'>x</span> and <span class='string'>y</span> " +
      "are both integers",
function (x) { 
   return function (y) { return y % x; }; 
},
      "x cannot be 0"
    ],

    /* 4 */
    [ "<span class='string'>x</span> and <span class='string'>y</span> " +
      "are both integers",
function (x) { 
   return function (y) { return x / y; }; 
},
      "x/y must have at most three decimals"
    ],

    /* 5 */
    [ "<span class='string'>x</span> and <span class='string'>y</span> " +
      "are both integers",
function (x) { 
   return function (y) { return y / x; }; 
},
      "y/x must have at most three decimals"
    ],

    /* 6 */
    [ "<span class='string'>x</span> and <span class='string'>y</span> " +
      "are both integers",
function (x) { 
   return function (y) { return x < y; }; 
}     
    ],

    /* 7 */
    [ "<span class='string'>x</span> and <span class='string'>y</span> " +
      "are both integers",
function (x) { 
   return function (y) { return y < x; }; 
}     
    ],

    /* 8 */
    [ "<span class='string'>x</span> and <span class='string'>y</span> " +
      "are both integers",
function (x) { 
   return function (y) { return x > y; }; 
}     
    ],

    /* 9 */
    [ "<span class='string'>x</span> and <span class='string'>y</span> " +
      "are both integers",
function (x) { 
   return function (y) { return y > x; }; 
}     
    ],

	    ];// functions array

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
	    this.answer = answer;
	    this.functionDef = "var f = " + fStr + ";<br /><br />" +
		"var g = f(" + x + ");<br />";
	    this.params = params;
	    this.functionCall = "g( " + y + " )";
	    //console.log(answer);
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
    };// RP9part1  

    window.RP9part1 = window.RP9part1 || RP9part1;
}());

