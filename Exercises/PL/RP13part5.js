/* global console, fp, PLutils */
(function() {
  "use strict";

    var f;

    function acceptableTokens( code ) {
	var tokens = code.trim().split(/[,\(\) \n\t]+/);
	var good = [ "return", "if", "else", "k", "list", "x",";" ];
	for(var i=0; i<tokens.length; i++) {
	    if (tokens[i] === "") {
		continue;
	    }
	    if (tokens[i].startsWith("fp.")) {
		if (eval(tokens[i]) === undefined) {
		    console.log("bad token: " + tokens[i]);
		    return false;
		}
	    } else if (good.indexOf(tokens[i]) === -1) {
		console.log("bad token: " + tokens[i]);
		return false;
	    }
	}
	console.log("all tokens OK");
	return true;
    };

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
	    /* trace 1 */
	    return k(0);
	} else {
	    /* trace 2 */
	    return h(fp.tl(list),
		     function (x) {
		     /* trace 3 */
			 /* ???????????????????? */
		     });
	}
    };
    return h(ns,function (x) { return x; })
},
      [ ["[]" , "0", "[base]"],
	["[1]", "1", "[rec] [1][base][k(.)] ns=[1] x=0"],
	["[1,2]", "3", 
	 "[rec] [1,2][rec] [1,2][base][k(.)] ns=[1,2] x=0[k(.)] ns=[1,2] x=2"  ],
	["[1,2,3]", "6",
	"[rec] [1,2,3][rec] [1,2,3][rec] [1,2,3][base][k(.)] ns=[1,2,3] x=0[k(.)] ns=[1,2,3] x=3[k(.)] ns=[1,2,3] x=5"],
	["[1,-2,3,-4]", "-2",
	"[rec] [1,-2,3,-4][rec] [1,-2,3,-4][rec] [1,-2,3,-4][rec] [1,-2,3,-4][base][k(.)] ns=[1,-2,3,-4] x=0[k(.)] ns=[1,-2,3,-4] x=-4[k(.)] ns=[1,-2,3,-4] x=-1[k(.)] ns=[1,-2,3,-4] x=-3"],
	["[5,4,3,-2,-1,0,-7,6]", "8",
	"[rec] [5,4,3,-2,-1,0,-7,6][rec] [5,4,3,-2,-1,0,-7,6][rec] [5,4,3,-2,-1,0,-7,6][rec] [5,4,3,-2,-1,0,-7,6][rec] [5,4,3,-2,-1,0,-7,6][rec] [5,4,3,-2,-1,0,-7,6][rec] [5,4,3,-2,-1,0,-7,6][rec] [5,4,3,-2,-1,0,-7,6][base][k(.)] ns=[5,4,3,-2,-1,0,-7,6] x=0[k(.)] ns=[5,4,3,-2,-1,0,-7,6] x=6[k(.)] ns=[5,4,3,-2,-1,0,-7,6] x=-1[k(.)] ns=[5,4,3,-2,-1,0,-7,6] x=-1[k(.)] ns=[5,4,3,-2,-1,0,-7,6] x=-2[k(.)] ns=[5,4,3,-2,-1,0,-7,6] x=-4[k(.)] ns=[5,4,3,-2,-1,0,-7,6] x=-1[k(.)] ns=[5,4,3,-2,-1,0,-7,6] x=3"]
      ]
    ],

    [ "The following function takes in a non-empty (flat) list of integers. " +
      "After " +
      "you replace the comment made up of question marks with the correct " +
      "answer, this function is supposed to return an integer that is equal " +
      " to the result of converting the " +
      "list to an arithmetic expression with a minus sign between " +
      "consecutive integers, and then evaluating this expression with " +
      "subtraction being right-associative. For example, " +
      "<span class='string'>f([1,2,3])</span> must " +
      "return <span class='string'>2</span>, since " +
      "<span class='string'>(1-(2-3)) = 2</span>, and " +
      "<span class='string'>f([10])</span> must return " +
      "<span class='string'>10</span>.",

      /* 1: the subRight function */
function (ns) {
    var h = function (list,k) {
	if (fp.isNull(list)) {
	    /* trace 1 */
	    return k(0);
	} else {
	    /* trace 2 */
	    return h(fp.tl(list),
		     function (x) {
		     /* trace 3 */
			 /* ???????????????????? */
		     });
	}
    };
    return h(ns,function (x) { return x; })
},
      [ ["[1]" , "1", "[rec] [1][base][k(.)] ns=[1] x=0"],
	["[1,2,3,4,5]", "3", 
	 "[rec] [1,2,3,4,5][rec] [1,2,3,4,5][rec] [1,2,3,4,5][rec] [1,2,3,4,5][rec] [1,2,3,4,5][base][k(.)] ns=[1,2,3,4,5] x=0[k(.)] ns=[1,2,3,4,5] x=5[k(.)] ns=[1,2,3,4,5] x=-1[k(.)] ns=[1,2,3,4,5] x=4[k(.)] ns=[1,2,3,4,5] x=-2"],
	["[2,3,4,5,1]", "-1", 
	 "[rec] [2,3,4,5,1][rec] [2,3,4,5,1][rec] [2,3,4,5,1][rec] [2,3,4,5,1][rec] [2,3,4,5,1][base][k(.)] ns=[2,3,4,5,1] x=0[k(.)] ns=[2,3,4,5,1] x=1[k(.)] ns=[2,3,4,5,1] x=4[k(.)] ns=[2,3,4,5,1] x=0[k(.)] ns=[2,3,4,5,1] x=3"  ],
	["[5,4,3,2,1]", "3",
	"[rec] [5,4,3,2,1][rec] [5,4,3,2,1][rec] [5,4,3,2,1][rec] [5,4,3,2,1][rec] [5,4,3,2,1][base][k(.)] ns=[5,4,3,2,1] x=0[k(.)] ns=[5,4,3,2,1] x=1[k(.)] ns=[5,4,3,2,1] x=1[k(.)] ns=[5,4,3,2,1] x=2[k(.)] ns=[5,4,3,2,1] x=2"],
	["[-1,-2,-3,-4,-5]", "-3",
	"[rec] [-1,-2,-3,-4,-5][rec] [-1,-2,-3,-4,-5][rec] [-1,-2,-3,-4,-5][rec] [-1,-2,-3,-4,-5][rec] [-1,-2,-3,-4,-5][base][k(.)] ns=[-1,-2,-3,-4,-5] x=0[k(.)] ns=[-1,-2,-3,-4,-5] x=-5[k(.)] ns=[-1,-2,-3,-4,-5] x=1[k(.)] ns=[-1,-2,-3,-4,-5] x=-4[k(.)] ns=[-1,-2,-3,-4,-5] x=2"]
      ]
    ],

	    ];// functions array

	    // pick a random function
	    var functionNumber = Math.floor(Math.random() * functions.length); 
	    functionNumber = 1;
	    this.initialStatement = functions[ functionNumber ][0];
	    f = functions[ functionNumber ][1];
	    this.functionDisplayed = "var f = " + f.toString()
		.replace(/[ \t]*\/\* trace [123] \*\/[ \t]*\n/g, "");
	    this.tests = functions[ functionNumber ][2];
	    var fStr = f.toString();
		// .replace(/\/\*.+\*\//,correctAnswer);
	}, //init

	checkAnswer: function (studentAnswer) {
	    var fDefinition;  
	    var passTests = true, i, output;
	    var trace;
	    
	    if (! acceptableTokens(studentAnswer) ) {
		return false;
	    }

	    try {
		fDefinition = 'var trace = "";\n var f = ' + 
		    f.toString().replace(/\/\*[ ]*[\?]+[ ]*\*\//,
					 studentAnswer) + ";\n";
		fDefinition = fDefinition
		    .replace("/* trace 1 */",
			     'trace += "[base]";' )
		    .replace("/* trace 2 */",
			     'trace += "[rec] " + ' +
			     'JSON.stringify(ns);')
		    .replace("/* trace 3 */",
			     'trace += "[k(.)] ' +
			     'ns=" + JSON.stringify(ns) +' + 
			     ' " x=" + JSON.stringify(x);'
			     );
		for(var i=0; i<this.tests.length; i++) {
		    var output = 			
			eval(fDefinition + "[ f( " + this.tests[i][0] + " ), " +
			     "trace ]");
		    trace = output[1];

		    console.log(trace);
		    console.log(this.tests[i][2]);
		    console.log(trace === this.tests[i][2]);
		    if (JSON.stringify(output[0]).replace(/\s+/g,"") !==
			this.tests[i][1].replace(/\s+/g,"") ||
			trace !== this.tests[i][2]) {
			return false;
		    }
		}
	    } catch (e) {
		console.log("exception: " + e);
		passTests = false;
	    }
	    // return this.answer === studentAnswer.replace(/\s+/g,"");
	    return passTests;
	}
    };// RP13part5  

    window.RP13part5 = window.RP13part5 || RP13part5;
}());

