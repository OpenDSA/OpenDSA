/* global console fp  */
(function() {
  "use strict";
    
    var randomDigit;

    function generateRandomList () {
	var result = [];
	var minIntegerVal = 0;
	var maxIntegerVal = 9;
	var len = 2 + Math.floor(Math.random() * 8);
	for(var i=0; i<len; i++) {
	    result.push(minIntegerVal + 
			Math.floor(Math.random() * maxIntegerVal));
	}	
	return result;
    }

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

    /* 1: add all elements */
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
    ]

	    ];// functions array

	    // pick a random input
	    var randomDigit =  Math.floor(Math.random() * 10); 
	    var list = generateRandomList();
	    //console.log(list);
	    var integer = Math.floor(Math.random() * 10); 
	    // pick a random function
	    var functionNumber = 
		Math.floor(Math.random() * helperFunctions.length); 
	    functionNumber = 3;
	    var helper = helperFunctions[ functionNumber ][2];
	    var main = mainFunctions[helperFunctions[functionNumber][1]];
	    var params = helperFunctions[ functionNumber ][0];
	    var helperStr = helper.toString();	    
	    var mainStr = main.toString().replace(/randomDigit/g,randomDigit);
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
	    console.log(answer);
	},// init

	checkAnswer: function (studentAnswer) {
	    return this.answer === studentAnswer.replace(/\s+/g,"");
	}
    };// RP8part3  

    window.RP8part3 = window.RP8part3 || RP8part3;
}());

