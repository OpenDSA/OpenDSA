/* global console, fp, PLutils  */
(function() {
  "use strict";
   
    var randomDigit;
    var randomDigit2;

    var RP8part3 = {    
	init: function() {

	    var mainFunctions = [

/* one list accumulator */
function f(ns) {
    return helper(ns,[]);
},

/* one integer accumulator */
function f(ns) {
    return helper(ns,randomDigit);
},
	    ];

	    var helperFunctions = [

    /* 0: reverse */
    [ "<span class='string'>ns</span> is a (flat) list of integers and " +
      "<span class='string'>a</span> is a list accumulator",
      0, // index of main function 
function helper(ns,a) {
    if (fp.isNull(ns)) {
	return a;
    } else {
	return helper(fp.tl(ns),fp.cons(fp.hd(ns),a));
    }
}
    ],

    /* 1: add all elements + init acc. */
    [ "<span class='string'>ns</span> is a (flat) list of integers and " +
      "<span class='string'>a</span> is an integer accumulator",
      1, // index of main function 
function helper(ns,a) {
    if (fp.isNull(ns)) {
	return a;
    } else {
	return helper(fp.tl(ns),fp.add(fp.hd(ns),a));
    }
}
    ],

    /* 2: sub all elements from right to left (*NOT* right associativity)
       if   ns is [ 1, 2, 3, 4 ] 
       and  a = 0
       then result is (4-(3-(2-(1-0)))) = 2

     */
    [ "<span class='string'>ns</span> is a (flat) list of integers and " +
      "<span class='string'>a</span> is an integer accumulator",
      1, // index of main function 
function helper(ns,a) {
    if (fp.isNull(ns)) {
	return a;
    } else {
	return helper(fp.tl(ns),fp.sub(fp.hd(ns),a));
    }
}
    ],

    /* 3: sub all elements from left to right (i.e., left associativity) but
          with the initial accumulator value inserted in front of the list
       if   ns is [ 1, 2, 3, 4 ] 
       and  a = 0
       then result is ((((0-1)-2)-3)-4)
     */
    [ "<span class='string'>ns</span> is a (flat) list of integers and " +
      "<span class='string'>a</span> is an integer accumulator",
      1, // index of main function 
function helper(ns,a) {
    if (fp.isNull(ns)) {
	return a;
    } else {
	return helper(fp.tl(ns),fp.sub(a,fp.hd(ns)));
    }
}
    ],

    /* 4: copy then reverse */
    [ "<span class='string'>ns</span> is a (flat) list of integers and " +
      "<span class='string'>a</span> is a list accumulator",
      0, // index of main function 
function helper(ns,a) {
    if (fp.isNull(ns)) {
	return a;
    } else {
	return fp.cons(fp.hd(ns),
		       helper(fp.tl(ns),
			      fp.cons(fp.hd(ns),a)));
    }
}
    ],

    /* 5: add all elements + init acc + randomDigit * input length */
    [ "<span class='string'>ns</span> is a (flat) list of integers and " +
      "<span class='string'>a</span> is an integer accumulator",
      1, // index of main function 
function helper(ns,a) {
    if (fp.isNull(ns)) {
	return a;
    } else {
	return fp.add(randomDigit,helper(fp.tl(ns),fp.add(fp.hd(ns),a)));
    }
}
    ],

    /* 6: skip second, fourth, etc., elements then reverse
          "error" when the input has odd length
    */
    [ "<span class='string'>ns</span> is a (flat) list of integers and " +
      "<span class='string'>a</span> is a list accumulator",
      0, // index of main function 
function helper(ns,a) {
    if (fp.isNull(ns)) {
	return a;
    } else {
	return helper(fp.tl(fp.tl(ns)),fp.cons(fp.hd(ns),a));
    }
}
    ],


    /* 7: add second, fourth, etc. elements 
          "error" if input has odd length
    */
    [ "<span class='string'>ns</span> is a (flat) list of integers and " +
      "<span class='string'>a</span> is an integer accumulator",
      1, // index of main function 
function helper(ns,a) {
    if (fp.isNull(ns)) {
	return a;
    } else {
	return helper(fp.tl(fp.tl(ns)),fp.add(fp.hd(ns),a));
    }
}
    ],

    /* 8: identity */
    [ "<span class='string'>ns</span> is a (flat) list of integers and " +
      "<span class='string'>a</span> is a list accumulator",
      0, // index of main function 
function helper(ns,a) {
    if (fp.isNull(ns)) {
	return a;
    } else {
	return fp.cons(fp.hd(ns),helper(fp.tl(ns),a));
    }
}
    ],

    /* 9: duplicate each element */
    [ "<span class='string'>ns</span> is a (flat) list of integers and " +
      "<span class='string'>a</span> is a list accumulator",
      0, // index of main function 
function helper(ns,a) {
    if (fp.isNull(ns)) {
	return a;
    } else {
	return fp.cons(fp.hd(ns),fp.cons(fp.hd(ns),helper(fp.tl(ns),a)));
    }
}
    ],

    /* 10: remove all elements GT a random digit then reverse*/
    [ "<span class='string'>ns</span> is a (flat) list of integers and " +
      "<span class='string'>a</span> is a list accumulator",
      0, // index of main function 
function helper(ns,a) {
    if (fp.isNull(ns)) {
	return a;
    } else if (fp.isGT(fp.hd(ns),randomDigit)) {
	return helper(fp.tl(ns),a);
    } else {
	return helper(fp.tl(ns),fp.cons(fp.hd(ns),a));
    }
}
    ],


    /* 11: reverse then remove all elements LT a random digit */
    [ "<span class='string'>ns</span> is a (flat) list of integers and " +
      "<span class='string'>a</span> is a list accumulator",
      0, // index of main function 
function helper(ns,a) {
    if (fp.isNull(ns)) {
	return a;
    } else if (fp.isLT(fp.hd(ns),randomDigit)) {
	return helper(fp.tl(ns),a);
    } else {
	return helper(fp.tl(ns),fp.cons(fp.hd(ns),a));
    }
}
    ],

    /* 12: return element count + init acc. */
    [ "<span class='string'>ns</span> is a (flat) list of integers and " +
      "<span class='string'>a</span> is an integer accumulator",
      1, // index of main function 
function helper(ns,a) {
    if (fp.isNull(ns)) {
	return a;
    } else {
	return helper(fp.tl(ns),fp.add(1,a));
    }
}
    ],

    /* 13: count all elements GT a random digit then add init acc.*/
    [ "<span class='string'>ns</span> is a (flat) list of integers and " +
      "<span class='string'>a</span> is an integer accumulator",
      1, // index of main function 
function helper(ns,a) {
    if (fp.isNull(ns)) {
	return a;
    } else if (fp.isGT(fp.hd(ns),randomDigit)) {
	return fp.add(1,helper(fp.tl(ns),a));
    } else {
	return helper(fp.tl(ns),a);
    }
}
    ],

    /* 14: count all elements LT a random digit then add init acc.*/
    [ "<span class='string'>ns</span> is a (flat) list of integers and " +
      "<span class='string'>a</span> is an integer accumulator",
      1, // index of main function 
function helper(ns,a) {
    if (fp.isNull(ns)) {
	return a;
    } else if (fp.isLT(fp.hd(ns),randomDigit)) {
	return fp.add(1,helper(fp.tl(ns),a));
    } else {
	return helper(fp.tl(ns),a);
    }
}
    ],

    /* 15: count all elements EQ to a random digit then add init acc.*/
    [ "<span class='string'>ns</span> is a (flat) list of integers and " +
      "<span class='string'>a</span> is an integer accumulator",
      1, // index of main function 
function helper(ns,a) {
    if (fp.isNull(ns)) {
	return a;
    } else if (fp.isEq(fp.hd(ns),randomDigit)) {
	return fp.add(1,helper(fp.tl(ns),a));
    } else {
	return helper(fp.tl(ns),a);
    }
}
    ]

	    ];// functions array

	    // pick a random input
	    var randomDigit =  Math.floor(Math.random() * 10);
	    var randomDigit2 =  Math.floor(Math.random() * 10); 
	    var list = PLutils.generateRandomList();
	    var integer = Math.floor(Math.random() * 10); 
	    // pick a random function
	    var functionNumber = 
		Math.floor(Math.random() * helperFunctions.length); 
	    //functionNumber = 15;
	    var helper = helperFunctions[ functionNumber ][2];
	    var main = mainFunctions[helperFunctions[functionNumber][1]];
	    var params = helperFunctions[ functionNumber ][0];
	    var helperStr = helper.toString()
		.replace(/randomDigit/g,randomDigit);
	    var mainStr = main.toString().replace(/randomDigit/g,randomDigit2);
	    var answer;
	    try {
		answer = JSON.stringify(
		    eval(helperStr + mainStr + 
			 "f(" + JSON.stringify(list) + ");"));
	    } 
	    catch (e) {
		answer = "error";
	    }
	    this.answer = answer;
	    this.functionDef = helperStr + "<br /><br />" +  mainStr;
	    this.params = params;
	    this.functionCall = "f( " + JSON.stringify(list) + " )";
	    //console.log(answer);
	},// init

	checkAnswer: function (studentAnswer) {
	    if (this.answer.match(/^-?\d+$/) ||
		this.answer === "error") {
		// correct answer is an integer or "error"
		return this.answer === studentAnswer.trim();
	    } else {
		return this.answer === studentAnswer.replace(/\s+/g,"");
	    }
	}
    };// RP8part3  

    window.RP8part3 = window.RP8part3 || RP8part3;
}());

