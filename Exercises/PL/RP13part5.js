/* global console, fp, PLutils */
(function() {
  "use strict";

    var RP13part5 = {    
	init: function() {

	    var functions = [

    [ "The following function takes in a (flat) list of integers. After " +
      "you replace the comment made up of question marks with the correct " +
      "answer, this function is supposed to return the sum of the elements " +
      "in the input list.",
      /* 0: the add function */
function (ns) {
    var h = function (list,k) {
	if (fp.isNull(list)) {
	    return k(0);
	} else {
	    return h(fp.tl(list),
		     function (x) {
			 /* ???????????????????? */
		     });
	}
    };
    return h(ns,function (x) { return x; })
},
      [ ["[]" , "0" ],
	["[1]", "1" ],
	["[1,2]", "3" ],
	["[1,2,3]", "6" ],
	["[1,-2,3,-4]", "-2" ],
	["[5,4,3,-2,-1,0,-7,6]", "8" ]
      ]
    ],


    [ "The following function takes in a non-empty (flat) list of integers. " +
      "After you replace the comment made up of question marks with the " +
      "correct answer, this function is supposed to return the sum of the " +
      "elements in the input list.",
      /* 1: the min function */
function (ns) {
    var h = function (list,k) {
	if (fp.isNull(list)) {
	    return k(fp.hd(ns));
	} else {
	    return h(fp.tl(list),
		     function (x) {
			 /* ??????????????????? */
		     });
	}
    };
    return h(ns,function (x) { return x; })
},
      
      [ ["[1]", "1" ],
	["[1,2]", "1" ],
	["[3,2,1]", "1" ],
	["[1,-2,3,-4,5]", "-4" ],
	["[5,-7,4,3,-2,-1,0,-5,6]", "-7" ]
      ]
    ],

    [ "The following function takes in a (flat) list of integers. " +
      "After you replace the comment made up of question marks with the " +
      "correct answer, this function is supposed to return the reverse of " +
      "input list.",
      /* 2: the reverse function */
function (ns) {
    var h = function (list,k) {
	if (fp.isNull(list)) {
	    return k(list);
	} else {
	    return h(fp.tl(list),
		     function (x) {
			 /* ????????????????? */
		     });
	}
    };
    return h(ns,function (x) { return x; })
},
      
      [ ["[]", "[]" ],
	["[1]", "[1]" ],
	["[3,2,1]", "[1,2,3]" ],
	["[1,-2,3,-4,5]", "[5,-4,3,-2,1]" ]
      ]
    ],
   
	    ];// functions array

	    // pick a random input
	    var randomDigit = Math.floor( Math.random() * 10);
	    // pick a random function
	    var functionNumber = Math.floor(Math.random() * functions.length); 
	    functionNumber = 2;
	    this.initialStatement = functions[ functionNumber ][0];
	    var f = functions[ functionNumber ][1];
	    this.functionDef = "var f = " + f.toString();
	    this.tests = functions[ functionNumber ][2];
	    var fStr = f.toString();
		// .replace(/\/\*.+\*\//,correctAnswer);
	}, //init

	checkAnswer: function (studentAnswer) {
	    var fDefinition = this.functionDef
		.replace(/\/\*.+\*\//,studentAnswer);
	    var passTests = true, i, output;
	    try {
		for(var i=0; i<this.tests.length; i++) {
		    var output = 
			JSON.stringify(eval(fDefinition + "; f(" + 
					    this.tests[i][0] + ");"));
		    console.log(output);
		    if (output.replace(/\s+/g,"") !==
			this.tests[i][1].replace(/\s+/g,"")) {
			return false;
		    }
		    //console.log(output);
		}
	    } catch (e) {
		passTests = false;
	    }
	    // return this.answer === studentAnswer.replace(/\s+/g,"");
	    return passTests;
	}
    };// RP13part5  

    window.RP13part5 = window.RP13part5 || RP13part5;
}());

