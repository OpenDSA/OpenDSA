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

    [ "<span class='string'>ns</span> is a (flat) list of integers",
      /* 11: reverse */
function (ns) {   
    return fp.reduce(
        function(x,y) {
	    return fp.cons(y,x);
	},
        ns,
	[ ]
    );
}], 


    [ "<span class='string'>ns</span> is a (flat) list of integers",
      /* 12: wrong reverse (generates error) */
function (ns) {   
    return fp.reduce(
        function(x,y) {
	    return fp.cons(x,y);
	},
        ns,
	[ ]
    );
}], 


    [ "<span class='string'>ns</span> is a (flat) list of integers",
      /* 13: reverse with increasingly nested lists + add init acc. at end */
function (ns) {   
    return fp.reduce(
        function(x,y) {
	    return fp.makeList(y,x);
	},
        ns,
	[ randomDigit ]
    );
}], 

    [ "<span class='string'>ns</span> is a (flat) list of integers",
      /* 14: insert init acc. and then add a list around the first, then first
       two , then first three, etc., elements in the resulting list*/
function (ns) {   
    return fp.reduce(
        function(x,y) {
	    return fp.makeList(x,y);
	},
        ns,
	[ randomDigit ]
    );
}], 

    [ "<span class='string'>ns</span> is a (flat) list of integers",
      /* 15: make a reversed list of duplicates */
function (ns) {   
    return fp.reduce(
        function(x,y) {
	    return fp.cons(fp.makeList(y,y),x);
	},
        ns,
	[ ]
    );
}], 

    [ "<span class='string'>ns</span> is a (flat) list of integers",
      /* 16: reverse and eliminate the elements LE to random digit */
function (ns) {   
    return fp.reduce(
        function(x,y) {
	    if (fp.isGT(y,randomDigit)) {
		return fp.cons(y,x);
	    } else {
		return x;
	    }
	},
        ns,
	[ ]
    );
}], 

    [ "<span class='string'>ns</span> is a (flat) list of integers",
      /* 17: reverse and eliminate the elements GE to random digit */
function (ns) {   
    return fp.reduce(
        function(x,y) {
	    if (fp.isLT(y,randomDigit)) {
		return fp.cons(y,x);
	    } else {
		return x;
	    }
	},
        ns,
	[ ]
    );
}], 


    [ "<span class='string'>ns</span> is a (flat) list of integers",
      /* 18: reverse and add random digit to all elements */
function (ns) {   
    return fp.reduce(
        function(x,y) {
	    return fp.cons(fp.add(y,randomDigit),x);
	},
        ns,
	[ ]
    );
}], 


    [ "<span class='string'>ns</span> is a (flat) list of integers",
      /* 19: split-like function except that equal elements are in the
       first sub-list */
function (ns) {   
    return fp.reduce(
        function(x,y) {
	    if (fp.isGT(y,randomDigit)) {
		return fp.makeList(fp.hd(x),
				   fp.cons(y,fp.hd(fp.tl(x))));
	    } else {
		return fp.makeList(fp.cons(y,fp.hd(x)),
				   fp.hd(fp.tl(x)));
	    }
	},
	ns,
	[ [ ], [ ] ]
    );
}], 

    [ "<span class='string'>ns</span> is a (flat) list of integers",
      /* 20: return [ sum, count ] */
function (ns) {   
    return fp.reduce(
        function(x,y) {
	    return fp.makeList(fp.add(y,fp.hd(x)),
			       fp.add(fp.hd(fp.tl(x)),1));

	},
	ns,
	[ 0, 0 ]
    );
}], 

    [ "<span class='string'>ns</span> is a non-empty (flat) list of integers",
      /* 21: return [ min, max ] */
function (ns) {   
    return fp.reduce(
        function(x,y) {
	    if (fp.isLT(y,fp.hd(x))) {
		return fp.cons(y,fp.tl(x));
	    } else if (fp.isGT(y,fp.hd(fp.tl(x)))) {
		return fp.makeList(fp.hd(x),y);
	    } else {
		return x;
	    }
	},
	fp.tl(ns),
	[ fp.hd(ns) , fp.hd(ns) ]
    );
}], 

    [ "<span class='string'>ns</span> is a non-empty (flat) list of integers",
      /* 22: reverse and remove consecutive duplicates */
function (ns) {   
    return fp.reduce(
        function(x,y) {
	    if (fp.isEq(fp.hd(x),y)) {
		return x;
	    } else {
		return fp.cons(y,x);
	    }
	},
	fp.tl(ns),
	[ fp.hd(ns) ]
    );
}], 


    [ "<span class='string'>ns</span> is a (flat) list of integers",
      /* 23 isMember(randomDigit,ns) */
function (ns) {   
    return fp.reduce(
        function(x,y) {
	    if (x) {
		return true;
	    } else if (fp.isEq(y,randomDigit)) {
		return true;
	    } else {
		return false;
	    }
	},
	ns,
	false
    );
}], 

    [ "<span class='string'>ns</span> is a (flat) list of integers",
      /* 24 is last element equal to randomDigit */
function (ns) {   
    return fp.reduce(
        function(x,y) {
	    if (fp.isEq(y,randomDigit)) {
		return true;
	    } else {
		return false;
	    }
	},
	ns,
	false
    );
}], 


    [ "<span class='string'>ns</span> is a (flat) list of integers",
      /* 25 reverse and subst randomDigit with randomDigit2 */
function (ns) {   
    return fp.reduce(
        function(x,y) {
	    if (fp.isEq(y,randomDigit)) {
		return fp.cons(randomDigit2,x);
	    } else {
		return fp.cons(y,x);
	    }
	},
	ns,
	[ ]
    );
}], 

    [ "<span class='string'>ns</span> is a (flat) list of integers",
      /* 26: reverse and remove all occurrences of randomDigit*/
function (ns) {   
    return fp.reduce(
        function(x,y) {
	    if (fp.isEq(y,randomDigit)) {
		return x;
	    } else {
		return fp.cons(y,x);
	    }
	},
	ns,
	[ ]
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
	    //functionNumber = 26;
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
	    
	    //console.log(answer);
	},// init

	checkAnswer: function (studentAnswer) {
	    return this.answer === studentAnswer.replace(/\s+/g,"");
	}
    };// RP11part4  

    window.RP11part4 = window.RP11part4 || RP11part4;
}());

