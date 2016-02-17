/* global console, fp, PLutils */
(function() {
  "use strict";

    var RP11part4 = {    
	init: function() {

	    var functions = [

    /* In the array of functions below, the following values appearing
       in the function body are placeholder values to be replaced later on:
 
       -12345 will be replaced by a random digit between 0 and 9
     */

    [ "<span class='string'>ns</span> is a (flat) list of integers",
      /* 0: add elements plus init. acc. */
function (ns) {   
    return fp.reduce(
        function(x,y) {
	    return fp.add(x,y);
	},
        ns,
	randomDigit
    );
}], 

    [ "<span class='string'>ns</span> is a (flat) list of integers",
      /* 1: sub elements  */
function (ns) {   
    return fp.reduce(
        function(x,y) {
	    return fp.sub(x,y);
	},
        ns,
	randomDigit
    );
}], 

    [ "<span class='string'>ns</span> is a (flat) list of integers",
      /* 2: count elements + init. acc. */
function (ns) {   
    return fp.reduce(
        function(x,y) {
	    return fp.add(x,1);
	},
        ns,
	randomDigit
    );
}], 

    [ "<span class='string'>ns</span> is a (flat) list of integers",
      /* 3: add elements GT random digit (plus init. acc.) */
function (ns) {   
    return fp.reduce(
        function(x,y) {
	    if (fp.isGT(y,randomDigit2)) {
		return fp.add(x,y); 
	    } else {
		return x;
	    }
	},
        ns,
	randomDigit
    );
}], 

    [ "<span class='string'>ns</span> is a (flat) list of integers",
      /* 4: add elements LT random digit (plus init. acc.) */
function (ns) {   
    return fp.reduce(
        function(x,y) {
	    if (fp.isLT(y,randomDigit2)) {
		return fp.add(x,y); 
	    } else {
		return x;
	    }
	},
        ns,
	randomDigit
    );
}], 

    [ "<span class='string'>ns</span> is a (flat) list of integers",
      /* 5: count elements GT random digit (plus init. acc.) */
function (ns) {   
    return fp.reduce(
        function(x,y) {
	    if (fp.isGT(y,randomDigit2)) {
		return fp.add(x,1); 
	    } else {
		return x;
	    }
	},
        ns,
	randomDigit
    );
}], 


    [ "<span class='string'>ns</span> is a (flat) list of integers",
      /* 6: count elements LT random digit (plus init. acc.) */
function (ns) {   
    return fp.reduce(
        function(x,y) {
	    if (fp.isLT(y,randomDigit2)) {
		return fp.add(x,1); 
	    } else {
		return x;
	    }
	},
        ns,
	randomDigit
    );
}], 


    [ "<span class='string'>ns</span> is a (flat) list of integers",
      /* 7: add/sub elements GT/LT random digit from acc. */
function (ns) {   
    return fp.reduce(
        function(x,y) {
	    if (fp.isGT(y,randomDigit2)) {
		return fp.add(x,y); 
	    } else {
		return fp.sub(x,y); 
	    }
	},
        ns,
	randomDigit
    );
}], 

    [ "<span class='string'>ns</span> is a (flat) list of integers",
      /* 8: add/sub elements LT/GT random digit from acc. */
function (ns) {   
    return fp.reduce(
        function(x,y) {
	    if (fp.isLT(y,randomDigit2)) {
		return fp.add(x,y); 
	    } else {
		return fp.sub(x,y); 
	    }
	},
        ns,
	randomDigit
    );
}], 

    [ "<span class='string'>ns</span> is a non-empty (flat) list of integers",
      /* 9: max function */
function (ns) {   
    return fp.reduce(
        function(x,y) {
	    if (fp.isGT(y,x)) {
		return y; 
	    } else {
		return x; 
	    }
	},
        fp.tl(ns),
	fp.hd(ns)
    );
}], 


    [ "<span class='string'>ns</span> is a non-empty (flat) list of integers",
      /* 10: min function */
function (ns) {   
    return fp.reduce(
        function(x,y) {
	    if (fp.isLT(y,x)) {
		return y; 
	    } else {
		return x; 
	    }
	},
        fp.tl(ns),
	fp.hd(ns)
    );
}], 



	    ];// functions array

	    // pick a random input
	    var randomDigit = Math.floor( Math.random() * 10);
	    var randomDigit2 = Math.floor( Math.random() * 10);

	    var list = PLutils.generateRandomList();
	    var integer = Math.floor(Math.random() * 10); 
	    // pick a random function
	    var functionNumber = Math.floor(Math.random() * functions.length); 
	    functionNumber = 10;
	    var f = functions[ functionNumber ][1];
	    var fStr = f.toString()
		.replace(/randomDigit2/g,randomDigit2)
		.replace(/randomDigit/g,randomDigit) + ";";
	    var params = functions[ functionNumber ][0];
	    var answer;
	    try {
		// finalize the function's body, if needed
		if (fStr.indexOf("-12345") > -1) {
		    fStr = fStr.replace(/-12345/g,
					"" + Math.floor(Math.random()*10));
		}
		// compute the answer
		if (f.length===1) {
		    // function has one argument
		    answer = JSON.stringify(eval("var f = " + fStr + "; f(" + 
						 JSON.stringify(list) + ");"));
		} else if (f.length===2) {
		    // function has two argument
		    answer = JSON.stringify(
			eval("var f = " + fStr + "; f(" + integer + "," +
			     JSON.stringify(list) + ");"));
		}
	    } 
	    catch (e) {
		answer = "error";
	    }
	    this.functionDef = "var f = " + fStr;
	    this.params = params;
	    if (f.length===1) {
		this.functionCall = ("f( " + JSON.stringify(list) + " )")
		    .split("").join(" ");
	    } else {
		this.functionCall = ("f( " + integer + "," + 
				     JSON.stringify(list) + " )")
		    .split("").join(" ");
	    }
	    this.answer = answer.replace(/\+/g,"");
	    
	    console.log(answer);
	},// init

	checkAnswer: function (studentAnswer) {
	    return this.answer === studentAnswer.replace(/\s+/g,"");
	}
    };// RP11part4  

    window.RP11part4 = window.RP11part4 || RP11part4;
}());

