/* global console, fp */
(function() {
  "use strict";

    var f;

    function acceptableTokens( code ) {
	var tokens = code.trim().split(/[,\(\) \n\t;{}]+/);
	var good = [ "return", "if", "else", "k", "list", "x"];
	for(var i=0; i<tokens.length; i++) {
	    if (tokens[i] === "") {
		continue;
	    }
	    if (tokens[i].startsWith("fp.")) {
		if (eval(tokens[i]) === undefined) {
		    console.log("bad token: " + tokens[i]);
		    return false;
		}
	    } else if ( (! tokens[i].match(/^\d+$/)) && 
			(good.indexOf(tokens[i]) === -1) ) {
		console.log("bad token: " + tokens[i]);
		return false;
	    }
	}
	return true;
    }

    var RP13part5 = {    
	init: function() {
	    var functions = [

		/* in this array, each element is a four-element list:
		   index 0: text describing the function's behavior
		   index 1: the function
		   index 2: unit tests
                               each unit test is made of:
                                    the input
                                    the output
                                    the trace of the execution
		   index 3: one correct answer (not used here; for reference)
		*/
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
    return h(ns,function (x) { return x; });
},
      [ ["[]" , "0", "{base}"],
	["[1]", "1", "{rec [1]}{base}{k(.): hd=1 x=0}"],
	["[1,2]", "3", 
	 "{rec [1,2]}{rec [2]}{base}{k(.): hd=2 x=0}{k(.): hd=1 x=2}"],
	["[1,2,3]", "6",
	 "{rec [1,2,3]}{rec [2,3]}{rec [3]}{base}{k(.): hd=3 x=0}{k(.): hd=2 x=3}{k(.): hd=1 x=5}"],
	["[1,-2,3,-4]", "-2",
	 "{rec [1,-2,3,-4]}{rec [-2,3,-4]}{rec [3,-4]}{rec [-4]}{base}{k(.): hd=-4 x=0}{k(.): hd=3 x=-4}{k(.): hd=-2 x=-1}{k(.): hd=1 x=-3}"], 
	["[5,4,3,-2,-1,0,-7,6]", "8",
	 "{rec [5,4,3,-2,-1,0,-7,6]}{rec [4,3,-2,-1,0,-7,6]}{rec [3,-2,-1,0,-7,6]}{rec [-2,-1,0,-7,6]}{rec [-1,0,-7,6]}{rec [0,-7,6]}{rec [-7,6]}{rec [6]}{base}{k(.): hd=6 x=0}{k(.): hd=-7 x=6}{k(.): hd=0 x=-1}{k(.): hd=-1 x=-1}{k(.): hd=-2 x=-2}{k(.): hd=3 x=-4}{k(.): hd=4 x=-1}{k(.): hd=5 x=3}"],
      ],
      "return k(fp.add(x,fp.hd(list)));"
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
    return h(ns,function (x) { return x; });
},
      [ ["[1]" , "1", "{rec [1]}{base}{k(.): hd=1 x=0}"],
	["[1,2,3,4,5]", "3", 
	 "{rec [1,2,3,4,5]}{rec [2,3,4,5]}{rec [3,4,5]}{rec [4,5]}{rec [5]}{base}{k(.): hd=5 x=0}{k(.): hd=4 x=5}{k(.): hd=3 x=-1}{k(.): hd=2 x=4}{k(.): hd=1 x=-2}"],
	["[2,3,4,5,1]", "-1", 
	 "{rec [2,3,4,5,1]}{rec [3,4,5,1]}{rec [4,5,1]}{rec [5,1]}{rec [1]}{base}{k(.): hd=1 x=0}{k(.): hd=5 x=1}{k(.): hd=4 x=4}{k(.): hd=3 x=0}{k(.): hd=2 x=3}"],
	["[5,4,3,2,1]", "3",
	"{rec [5,4,3,2,1]}{rec [4,3,2,1]}{rec [3,2,1]}{rec [2,1]}{rec [1]}{base}{k(.): hd=1 x=0}{k(.): hd=2 x=1}{k(.): hd=3 x=1}{k(.): hd=4 x=2}{k(.): hd=5 x=2}"],
	["[-1,-2,-3,-4,-5]", "-3",
	"{rec [-1,-2,-3,-4,-5]}{rec [-2,-3,-4,-5]}{rec [-3,-4,-5]}{rec [-4,-5]}{rec [-5]}{base}{k(.): hd=-5 x=0}{k(.): hd=-4 x=-5}{k(.): hd=-3 x=1}{k(.): hd=-2 x=-4}{k(.): hd=-1 x=2}"],
      ],
      " return k(fp.sub(fp.hd(list),x));"
    ],


    [ "The following function takes in a (flat) list of integers. After " +
      "you replace the comment made up of question marks with the correct " +
      "answer, this function is supposed to return its input list but with " +
      "all of its elements doubled. For example, " +
      "<span class='string'>f([1,2,3])</span> must " +
      "return <span class='string'>[2,4,6]</span>.",

      /* 2: the "multiply all by 2" function */
function (ns) {
    var h = function (list,k) {
	if (fp.isNull(list)) {
	    /* trace 1 */
	    return k([ ]);
	} else {
	    /* trace 2 */
	    return h(fp.tl(list),
		     function (x) {
		     /* trace 3 */
			 /* ???????????????????? */
		     });
	}
    };
    return h(ns,function (x) { return x; });
},
      [ ["[]" , "[]", 
	 "{base}"],
	["[1]" , "[2]", 
	 "{rec [1]}{base}{k(.): hd=1 x=[]}" ],
	["[1,2,3]" , "[2,4,6]", 
	 "{rec [1,2,3]}{rec [2,3]}{rec [3]}{base}{k(.): hd=3 x=[]}{k(.): hd=2 x=[6]}{k(.): hd=1 x=[4,6]}"], 
	["[1,-2,3,-4]" , "[2,-4,6,-8]", 
	 "{rec [1,-2,3,-4]}{rec [-2,3,-4]}{rec [3,-4]}{rec [-4]}{base}{k(.): hd=-4 x=[]}{k(.): hd=3 x=[-8]}{k(.): hd=-2 x=[6,-8]}{k(.): hd=1 x=[-4,6,-8]}"], 
      ],
      "return k(fp.cons(fp.mul(2,fp.hd(list)),x));"
    ],

    [ "The following function takes in a (flat) list of integers. After " +
      "you replace the comment made up of question marks with the correct " +
      "answer, this function is supposed to return the input list " +
      "concatenated with itself. For example, " +
      "<span class='string'>f([1,2,3])</span> must " +
      "return <span class='string'>[1,2,3,1,2,3]</span>.",

      /* 3: the "append to self" function */
function (ns) {
    var h = function (list,k) {
	if (fp.isNull(list)) {
	    /* trace 1 */
	    return k(ns);
	} else {
	    /* trace 2 */
	    return h(fp.tl(list),
		     function (x) {
		     /* trace 3 */
			 /* ???????????????????? */
		     });
	}
    };
    return h(ns,function (x) { return x; });
},
      [ ["[]" , "[]", 
	 "{base}"],
	["[1]" , "[1,1]", 
	 "{rec [1]}{base}{k(.): hd=1 x=[1]}"],
	["[1,2,3]" , "[1,2,3,1,2,3]", 
	 "{rec [1,2,3]}{rec [2,3]}{rec [3]}{base}{k(.): hd=3 x=[1,2,3]}{k(.): hd=2 x=[3,1,2,3]}{k(.): hd=1 x=[2,3,1,2,3]}"],
	["[1,-2,3,-4]" , "[1,-2,3,-4,1,-2,3,-4]", 
	 "{rec [1,-2,3,-4]}{rec [-2,3,-4]}{rec [3,-4]}{rec [-4]}{base}{k(.): hd=-4 x=[1,-2,3,-4]}{k(.): hd=3 x=[-4,1,-2,3,-4]}{k(.): hd=-2 x=[3,-4,1,-2,3,-4]}{k(.): hd=1 x=[-2,3,-4,1,-2,3,-4]}"], 
      ],
      "return k(fp.cons(fp.hd(list),x));"
    ],


    [ "The following function takes in a (flat) list of integers. After " +
      "you replace the comment made up of question marks with the correct " +
      "answer, this function is supposed to return a list containing two " +
      "copies of each integer in the input list. For example, " +
      "<span class='string'>f([1,2,3])</span> must " +
      "return <span class='string'>f([1,1,2,2,3,3]</span>.",

      /* 4: the "duplicate elements" function */
function (ns) {
    var h = function (list,k) {
	if (fp.isNull(list)) {
	    /* trace 1 */
	    return k([ ]);
	} else {
	    /* trace 2 */
	    return h(fp.tl(list),
		     function (x) {
		     /* trace 3 */
			 /* ???????????????????? */
		     });
	}
    };
    return h(ns,function (x) { return x; });
},
      [ ["[]" , "[]", 
	 "{base}"],
	["[1]" , "[1,1]", 
	 "{rec [1]}{base}{k(.): hd=1 x=[]}"],
	["[1,2,3]" , "[1,1,2,2,3,3]", 
	 "{rec [1,2,3]}{rec [2,3]}{rec [3]}{base}{k(.): hd=3 x=[]}{k(.): hd=2 x=[3,3]}{k(.): hd=1 x=[2,2,3,3]}"],
	["[1,-2,3,-4]" , "[1,1,-2,-2,3,3,-4,-4]", 
	 "{rec [1,-2,3,-4]}{rec [-2,3,-4]}{rec [3,-4]}{rec [-4]}{base}{k(.): hd=-4 x=[]}{k(.): hd=3 x=[-4,-4]}{k(.): hd=-2 x=[3,3,-4,-4]}{k(.): hd=1 x=[-2,-2,3,3,-4,-4]}"],
      ],
	"return k(fp.cons(fp.hd(list),fp.cons(fp.hd(list),x)));",      
    ],




    [ "The following function takes in a non-empty (flat) list of integers. " +
      "After " +
      "you replace the comment made up of question marks with the correct " +
      "answer, this function is supposed to return the smallest integer " +
      "in the input list.",

      /* 5: the min function */
function (ns) {
    var h = function (list,k) {
	if (fp.isNull(list)) {
	    /* trace 1 */
	    return k(fp.hd(ns));
	} else {
	    /* trace 2 */
	    return h(fp.tl(list),
		     function (x) {
		     /* trace 3 */
			 /* ???????????????????? */
		     });
	}
    };
    return h(fp.tl(ns),function (x) { return x; });
},
      [ ["[1]" , "1", 
	 "{base}"],
	["[1,2,3,4,5]" , "1", 
	 "{rec [2,3,4,5]}{rec [3,4,5]}{rec [4,5]}{rec [5]}{base}{k(.): hd=5 x=1}{k(.): hd=4 x=1}{k(.): hd=3 x=1}{k(.): hd=2 x=1}"],
	["[2,3,4,5,1]" , "1", 
	 "{rec [3,4,5,1]}{rec [4,5,1]}{rec [5,1]}{rec [1]}{base}{k(.): hd=1 x=2}{k(.): hd=5 x=1}{k(.): hd=4 x=1}{k(.): hd=3 x=1}"],
	["[3,2,1,4,5]" , "1", 
	 "{rec [2,1,4,5]}{rec [1,4,5]}{rec [4,5]}{rec [5]}{base}{k(.): hd=5 x=3}{k(.): hd=4 x=3}{k(.): hd=1 x=3}{k(.): hd=2 x=1}"],
	["[1,2,-1,4,-1,5]" , "-1", 
	 "{rec [2,-1,4,-1,5]}{rec [-1,4,-1,5]}{rec [4,-1,5]}{rec [-1,5]}{rec [5]}{base}{k(.): hd=5 x=1}{k(.): hd=-1 x=1}{k(.): hd=4 x=-1}{k(.): hd=-1 x=-1}{k(.): hd=2 x=-1}"],
	[ "[5,1,2,3,4]", "1",
	  "{rec [1,2,3,4]}{rec [2,3,4]}{rec [3,4]}{rec [4]}{base}{k(.): hd=4 x=5}{k(.): hd=3 x=4}{k(.): hd=2 x=3}{k(.): hd=1 x=2}"
	]
      ],
	"return k(fp.min(x,fp.hd(list)));",      
    ],

    [ "The following function takes in a non-empty (flat) list of integers. " +
      "After " +
      "you replace the comment made up of question marks with the correct " +
      "answer, this function is supposed to return the largest integer " +
      "in the input list.",

      /* 6: the max function */
function (ns) {
    var h = function (list,k) {
	if (fp.isNull(list)) {
	    /* trace 1 */
	    return k(fp.hd(ns));
	} else {
	    /* trace 2 */
	    return h(fp.tl(list),
		     function (x) {
		     /* trace 3 */
			 /* ???????????????????? */
		     });
	}
    };
    return h(fp.tl(ns),function (x) { return x; });
},
      [ ["[5]" , "5", 
	 "{base}"],
	["[1,2,3,4,5]" , "5", 
	 "{rec [2,3,4,5]}{rec [3,4,5]}{rec [4,5]}{rec [5]}{base}{k(.): hd=5 x=1}{k(.): hd=4 x=5}{k(.): hd=3 x=5}{k(.): hd=2 x=5}"],
	["[5,3,4,2,1]" , "5", 
	 "{rec [3,4,2,1]}{rec [4,2,1]}{rec [2,1]}{rec [1]}{base}{k(.): hd=1 x=5}{k(.): hd=2 x=5}{k(.): hd=4 x=5}{k(.): hd=3 x=5}"],
	["[3,2,5,4,3]" , "5", 
	 "{rec [2,5,4,3]}{rec [5,4,3]}{rec [4,3]}{rec [3]}{base}{k(.): hd=3 x=3}{k(.): hd=4 x=3}{k(.): hd=5 x=4}{k(.): hd=2 x=5}"],
	["[-10,-20,-5,-40,-5,-55]" , "-5", 
	 "{rec [-20,-5,-40,-5,-55]}{rec [-5,-40,-5,-55]}{rec [-40,-5,-55]}{rec [-5,-55]}{rec [-55]}{base}{k(.): hd=-55 x=-10}{k(.): hd=-5 x=-10}{k(.): hd=-40 x=-5}{k(.): hd=-5 x=-5}{k(.): hd=-20 x=-5}"],
	[ "[1,5,4,3,2]", "5",
	  "{rec [5,4,3,2]}{rec [4,3,2]}{rec [3,2]}{rec [2]}{base}{k(.): hd=2 x=1}{k(.): hd=3 x=2}{k(.): hd=4 x=3}{k(.): hd=5 x=4}"]
      ],
	"return k(fp.max(x,fp.hd(list)));",      
    ],

    [ "The following function takes in a non-empty (flat) list of integers. " +
      "After " +
      "you replace the comment made up of question marks with the correct " +
      "answer, this function is supposed to return an integer that is equal " +
      " to the bitwise AND of all of the integers in the input list. " +
      "For example, <span class='string'>f([1,2,3])</span> must " +
      "return <span class='string'>1</span>. Note that, as soon as a 0 is " +
      "encountered in the input list, the final answer is known right away " +
      "without ever calling a continuation (i.e., without performing any " +
      "computation). Finally, you must use the " +
      "<span class='string'>fp.bitAnd</span> function in your answer.",

      /* 7: the "bitwise AND" function */
function (ns) {
    var h = function (list,k) {
	if (fp.isNull(list)) {
	    /* trace 1 */
	    return k(-1);
	} else if (fp.isZero(fp.hd(list))) {
	    /* trace 1 */
	    return 0;
	} else {
	    /* trace 2 */
	    return h(fp.tl(list),
		     function (x) {
		     /* trace 3 */
			 /* ???????????????????? */
		     });
	}
    };
    return h(ns,function (x) { return x; });
},
      [ ["[0]" , "0", 
	 "{base}"],
	["[1]" , "1", 
	 "{rec [1]}{base}{k(.): hd=1 x=-1}"],
	["[1,2,3,4,0]" , "0", 
	 "{rec [1,2,3,4,0]}{rec [2,3,4,0]}{rec [3,4,0]}{rec [4,0]}{base}"],
	["[1,2,0,4,5]" , "0", 
	 "{rec [1,2,0,4,5]}{rec [2,0,4,5]}{base}"],
	["[15,14,12,8,24]" , "8", 
	 "{rec [15,14,12,8,24]}{rec [14,12,8,24]}{rec [12,8,24]}{rec [8,24]}{rec [24]}{base}{k(.): hd=24 x=-1}{k(.): hd=8 x=24}{k(.): hd=12 x=8}{k(.): hd=14 x=8}{k(.): hd=15 x=8}"]
      ],
	"return k(fp.bitAnd(fp.hd(list),x));"      
    ],

    [ "The following function takes in a non-empty (flat) list of integers. " +
      "After " +
      "you replace the comment made up of question marks with the correct " +
      "answer, this function is supposed to return an integer that is equal " +
      " to the bitwise OR of all of the integers in the input list. " +
      "For example, <span class='string'>f([1,2,3])</span> must " +
      "return <span class='string'>3</span>. Note that, as soon as a -1 is " +
      "encountered in the input list, the final answer is known right away " +
      "without ever calling a continuation (i.e., without performing any " +
      "computation). Finally, you must use the " +
      "<span class='string'>fp.bitOr</span> function in your answer.",

      /* 8: the "bitwise OR" function */
function (ns) {
    var h = function (list,k) {
	if (fp.isNull(list)) {
	    /* trace 1 */
	    return k(0);
	} else if (fp.isEq(fp.hd(list),-1)) {
	    /* trace 1 */
	    return -1;
	} else {
	    /* trace 2 */
	    return h(fp.tl(list),
		     function (x) {
		     /* trace 3 */
			 /* ???????????????????? */
		     });
	}
    };
    return h(ns,function (x) { return x; });
},
      [ ["[0]" , "0", 
	 "{rec [0]}{base}{k(.): hd=0 x=0}"],
	["[1]" , "1", 
	 "{rec [1]}{base}{k(.): hd=1 x=0}"],      
	["[-1]" , "-1", 
	 "{base}"],
	["[1,2,3,4,-1]" , "-1", 
	 "{rec [1,2,3,4,-1]}{rec [2,3,4,-1]}{rec [3,4,-1]}{rec [4,-1]}{base}"],
	["[1,2,-1,4,5]" , "-1", 
	 "{rec [1,2,-1,4,5]}{rec [2,-1,4,5]}{base}"],
	["[15,14,12,8,24]" , "31", 
	 "{rec [15,14,12,8,24]}{rec [14,12,8,24]}{rec [12,8,24]}{rec [8,24]}{rec [24]}{base}{k(.): hd=24 x=0}{k(.): hd=8 x=24}{k(.): hd=12 x=24}{k(.): hd=14 x=28}{k(.): hd=15 x=30}"]
      ],
	"return k(fp.bitOr(fp.hd(list),x));"      
    ],

    [ "The following function takes in a non-empty (flat) list of integers. " +
      "After " +
      "you replace the comment made up of question marks with the correct " +
      "answer, this function is supposed to return an integer that is equal " +
      " to the bitwise XOR of all of the integers in the input list. " +
      "For example, <span class='string'>f([1,2,3])</span> must " +
      "return <span class='string'>0</span>. You must use the " +
      "<span class='string'>fp.bitXor</span> function in your answer.",

      /* 9: the "bitwise XOR" function */
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
    return h(ns,function (x) { return x; });
},
      [ ["[0]" , "0", 
	 "{rec [0]}{base}{k(.): hd=0 x=0}"],
	["[1]" , "1", 
	 "{rec [1]}{base}{k(.): hd=1 x=0}"],      
	["[-1]" , "-1", 
	 "{rec [-1]}{base}{k(.): hd=-1 x=0}"],      
	["[1,2,3]" , "0", 
	 "{rec [1,2,3]}{rec [2,3]}{rec [3]}{base}{k(.): hd=3 x=0}{k(.): hd=2 x=3}{k(.): hd=1 x=1}"],
	["[15,1,2,4,8]" , "0", 
	 "{rec [15,1,2,4,8]}{rec [1,2,4,8]}{rec [2,4,8]}{rec [4,8]}{rec [8]}{base}{k(.): hd=8 x=0}{k(.): hd=4 x=8}{k(.): hd=2 x=12}{k(.): hd=1 x=14}{k(.): hd=15 x=15}"]
      ],
	"return k(fp.bitXor(fp.hd(list),x));"      
    ],


    [ "The following function takes in a (flat) list of integers. After " +
      "you replace the comment made up of question marks with the correct " +
      "answer, this function is supposed to return the number of integers " +
      "contained in the input list. For example, " +
      "<span class='string'>f([1,5,2])</span> must " +
      "return <span class='string'>3</span>." ,

      /* 10: the "count elements" function */
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
    return h(ns,function (x) { return x; });
},
      [ ["[]" , "0", 
	 "{base}"],
	["[5]" , "1", 
	 "{rec [5]}{base}{k(.): hd=5 x=0}"],
	["[1,-3,2,-4]" , "4", 
	 "{rec [1,-3,2,-4]}{rec [-3,2,-4]}{rec [2,-4]}{rec [-4]}{base}{k(.): hd=-4 x=0}{k(.): hd=2 x=1}{k(.): hd=-3 x=2}{k(.): hd=1 x=3}"]
      ],
	"return k(fp.add(x,1));",      
    ],

    [ "The following function takes in a (flat) list of integers. After " +
      "you replace the comment made up of question marks with the correct " +
      "answer, this function is supposed to return the input list after " +
      "all occurrences of the integer 3 have been removed. For example, " +
      "<span class='string'>f([1,2,3,4,3,5])</span> must " +
      "return <span class='string'>[1,2,4,5]</span>.",

      /* 11: the "remove all 3s" function */
function (ns) {
    var h = function (list,k) {
	if (fp.isNull(list)) {
	    /* trace 1 */
	    return k([ ]);
	} else {
	    /* trace 2 */
	    return h(fp.tl(list),
		     function (x) {
		     /* trace 3 */
			 /* ???????????????????? */
		     });
	}
    };
    return h(ns,function (x) { return x; });
},
      [ ["[]" , "[]", 
	 "{base}"],
	["[1]" , "[1]", 
	 "{rec [1]}{base}{k(.): hd=1 x=[]}"],
	["[3]" , "[]", 
	 "{rec [3]}{base}{k(.): hd=3 x=[]}"],
	["[1,3,2]" , "[1,2]", 
	 "{rec [1,3,2]}{rec [3,2]}{rec [2]}{base}{k(.): hd=2 x=[]}{k(.): hd=3 x=[2]}{k(.): hd=1 x=[2]}"],
	["[3,1,3,2,3]" , "[1,2]", 
	 "{rec [3,1,3,2,3]}{rec [1,3,2,3]}{rec [3,2,3]}{rec [2,3]}{rec [3]}{base}{k(.): hd=3 x=[]}{k(.): hd=2 x=[]}{k(.): hd=3 x=[2]}{k(.): hd=1 x=[2]}{k(.): hd=3 x=[1,2]}"],
	[ "[3,3,3,3,3]", "[]",
	  "{rec [3,3,3,3,3]}{rec [3,3,3,3]}{rec [3,3,3]}{rec [3,3]}{rec [3]}{base}{k(.): hd=3 x=[]}{k(.): hd=3 x=[]}{k(.): hd=3 x=[]}{k(.): hd=3 x=[]}{k(.): hd=3 x=[]}"]
      ],
	"if (fp.isEq(fp.hd(list),3)) { return k(x); } else { return k(fp.cons(fp.hd(list),x)); }",      
    ],

    [ "The following function takes in a (flat) list of integers. After " +
      "you replace the comment made up of question marks with the correct " +
      "answer, this function is supposed to return the input list after " +
      "all occurrences of the integer 3 have been replaced with the integer " +
      "5. For example, <span class='string'>f([1,2,3,4,3,5])</span> must " +
      "return <span class='string'>[1,2,5,4,5,5]</span>.",

      /* 12: the "replace all 3s with a 5" function */
function (ns) {
    var h = function (list,k) {
	if (fp.isNull(list)) {
	    /* trace 1 */
	    return k([ ]);
	} else {
	    /* trace 2 */
	    return h(fp.tl(list),
		     function (x) {
		     /* trace 3 */
			 /* ???????????????????? */
		     });
	}
    };
    return h(ns,function (x) { return x; });
},
      [ ["[]" , "[]", 
	 "{base}"],
	["[1]" , "[1]", 
	 "{rec [1]}{base}{k(.): hd=1 x=[]}"],
	["[3]" , "[5]", 
	 "{rec [3]}{base}{k(.): hd=3 x=[]}"],
	["[3,4,3,1,3]" , "[5,4,5,1,5]", 
	 "{rec [3,4,3,1,3]}{rec [4,3,1,3]}{rec [3,1,3]}{rec [1,3]}{rec [3]}{base}{k(.): hd=3 x=[]}{k(.): hd=1 x=[5]}{k(.): hd=3 x=[1,5]}{k(.): hd=4 x=[5,1,5]}{k(.): hd=3 x=[4,5,1,5]}"],
	["[1,2,4]" , "[1,2,4]", 
	 "{rec [1,2,4]}{rec [2,4]}{rec [4]}{base}{k(.): hd=4 x=[]}{k(.): hd=2 x=[4]}{k(.): hd=1 x=[2,4]}"]

      ],
	"if (fp.isEq(fp.hd(list),3)) { return k(fp.cons(5,x)); } else { return k(fp.cons(fp.hd(list),x)); }",      
    ],


    [ "The following function takes in a (flat) list of integers. After " +
      "you replace the comment made up of question marks with the correct " +
      "answer, this function is supposed to return the number of " +
      "occurrences of the integer 3 in the input list. For example, " +
      "<span class='string'>f([1,2,3,4,3,5])</span> must " +
      "return <span class='string'>2</span>.",

      /* 13: the "count all 3s" function */
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
    return h(ns,function (x) { return x; });
},
      [ ["[]" , "0", 
	 "{base}"],
	["[1]" , "0", 
	 "{rec [1]}{base}{k(.): hd=1 x=0}"],
	["[3]" , "1", 
	 "{rec [3]}{base}{k(.): hd=3 x=0}"],
	["[3,1,3,2,3]" , "3", 
	 "{rec [3,1,3,2,3]}{rec [1,3,2,3]}{rec [3,2,3]}{rec [2,3]}{rec [3]}{base}{k(.): hd=3 x=0}{k(.): hd=2 x=1}{k(.): hd=3 x=1}{k(.): hd=1 x=2}{k(.): hd=3 x=2}"],
	["[3,3,3,3,3]" , "5",
	 "{rec [3,3,3,3,3]}{rec [3,3,3,3]}{rec [3,3,3]}{rec [3,3]}{rec [3]}{base}{k(.): hd=3 x=0}{k(.): hd=3 x=1}{k(.): hd=3 x=2}{k(.): hd=3 x=3}{k(.): hd=3 x=4}"]
      ],
	"if (fp.isEq(fp.hd(list),3)) { return k(fp.add(1,x)); } else { return x; };",      
    ],

    [ "The following function takes in a (flat) list of integers. After " +
      "you replace the comment made up of question marks with the correct " +
      "answer, this function is supposed to return the reverse of the " +
      "input list. For example, " +
      "<span class='string'>f([1,2,3])</span> must " +
      "return <span class='string'>[3,2,1]</span>. Of course, your answer " +
      "to this problem may NOT contain a call to the  <span class='string'>" +
      "fp.reverse</span> function. Instead, you should use the " +
      "<span class='string'>fp.append</span> function.",

      /* 14: the reverse function */
function (ns) {
    var h = function (list,k) {
	if (fp.isNull(list)) {
	    /* trace 1 */
	    return k([ ]);
	} else {
	    /* trace 2 */
	    return h(fp.tl(list),
		     function (x) {
		     /* trace 3 */
			 /* ???????????????????? */
		     });
	}
    };
    return h(ns,function (x) { return x; });
},
      [ ["[]" , "[]", 
	 "{base}"],
	["[1]" , "[1]", 
	 "{rec [1]}{base}{k(.): hd=1 x=[]}"],
	["[1,2]" , "[2,1]", 
	 "{rec [1,2]}{rec [2]}{base}{k(.): hd=2 x=[]}{k(.): hd=1 x=[2]}"],
	["[4,2,3,4]" , "[4,3,2,4]", 
	 "{rec [4,2,3,4]}{rec [2,3,4]}{rec [3,4]}{rec [4]}{base}{k(.): hd=4 x=[]}{k(.): hd=3 x=[4]}{k(.): hd=2 x=[4,3]}{k(.): hd=4 x=[4,3,2]}"]
      ],
	"return k(fp.append(x,fp.makeList(fp.hd(list))));",      
    ],

    [ "The following function takes in a non-empty (flat) list of integers. " +
      "After " +
      "you replace the comment made up of question marks with the correct " +
      "answer, this function is supposed to return the product of the " +
      " elements in the input list.",

      /* 15: the product function */
function (ns) {
    var h = function (list,k) {
	if (fp.isNull(list)) {
	    /* trace 1 */
	    return k(1);
	 } else if (fp.isZero(fp.hd(list))) {
	     /* trace 1 */
	     return 0;
	 } else {
	     /* trace 2 */
	     return h(fp.tl(list),
		      function (x) {
			  /* trace 3 */
			  /* ???????????????????? */
		      });
	 }
    };
    return h(ns,function (x) { return x; });
},
      [ ["[0]", "0", 
	 "{base}"],
	["[0,1,2]", "0", 
	 "{base}"],
	["[1,0,2]", "0", 
	 "{rec [1,0,2]}{base}"],
	["[1,2,3,4,0]", "0", 
	 "{rec [1,2,3,4,0]}{rec [2,3,4,0]}{rec [3,4,0]}{rec [4,0]}{base}"],
	["[1,2,3,4,5]", "120", 
	 "{rec [1,2,3,4,5]}{rec [2,3,4,5]}{rec [3,4,5]}{rec [4,5]}{rec [5]}{base}{k(.): hd=5 x=1}{k(.): hd=4 x=5}{k(.): hd=3 x=20}{k(.): hd=2 x=60}{k(.): hd=1 x=120}"]
      ],
      "return k(fp.mul(x,fp.hd(list)));"
    ],


    [ "The following function takes in a (flat) list of integers. After " +
      "you replace the comment made up of question marks with the correct " +
      "answer, this function is supposed to return the input list " +
      "in which each consecutive sub-sequence made up of the same number " +
      "has been replaced with a single occurrence of that number. " +
      "For example, <span class='string'>f([1,1,2,2,2,1,1,1])</span> must " +
      "return <span class='string'>[1,2,1]</span>.",

      /* 16: the "remove consecutive duplicates" function */
function (ns) {
    var h = function (list,k) {
	if (fp.isNull(list)) {
	    /* trace 1 */
	    return k([]);
	} else {
	    /* trace 2 */
	    return h(fp.tl(list),
		     function (x) {
			 /* trace 3 */
			 /* ???????????????????? */
		     });
	}
    };
    return h(ns,function (x) { return x; });
},
      [ ["[]", "[]", 
	 "{base}"],
	["[1]", "[1]", 
	 "{rec [1]}{base}{k(.): hd=1 x=[]}"],
	["[1,2,3]", "[1,2,3]", 
	 "{rec [1,2,3]}{rec [2,3]}{rec [3]}{base}{k(.): hd=3 x=[]}{k(.): hd=2 x=[3]}{k(.): hd=1 x=[2,3]}"],
	[ "[1,1,1]","[1]",
	  "{rec [1,1,1]}{rec [1,1]}{rec [1]}{base}{k(.): hd=1 x=[]}{k(.): hd=1 x=[1]}{k(.): hd=1 x=[1]}"],
	[ "[1,1,2,2,2,3,4,4,4,4,3,3]","[1,2,3,4,3]",
	  "{rec [1,1,2,2,2,3,4,4,4,4,3,3]}{rec [1,2,2,2,3,4,4,4,4,3,3]}{rec [2,2,2,3,4,4,4,4,3,3]}{rec [2,2,3,4,4,4,4,3,3]}{rec [2,3,4,4,4,4,3,3]}{rec [3,4,4,4,4,3,3]}{rec [4,4,4,4,3,3]}{rec [4,4,4,3,3]}{rec [4,4,3,3]}{rec [4,3,3]}{rec [3,3]}{rec [3]}{base}{k(.): hd=3 x=[]}{k(.): hd=3 x=[3]}{k(.): hd=4 x=[3]}{k(.): hd=4 x=[4,3]}{k(.): hd=4 x=[4,3]}{k(.): hd=4 x=[4,3]}{k(.): hd=3 x=[4,3]}{k(.): hd=2 x=[3,4,3]}{k(.): hd=2 x=[2,3,4,3]}{k(.): hd=2 x=[2,3,4,3]}{k(.): hd=1 x=[2,3,4,3]}{k(.): hd=1 x=[1,2,3,4,3]}"]
      ],
      "if (fp.isNull(fp.tl(list))) { return k(fp.cons(fp.hd(list),x)); } else if (fp.isEq(fp.hd(list),fp.hd(fp.tl(list)))) { return k(x); } else { return k(fp.cons(fp.hd(list),x));}"
    ],

    [ "The following function takes in a (flat) list of integers. After " +
      "you replace the comment made up of question marks with the correct " +
      "answer, this function is supposed to return its input list but with " +
      "all of its elements incremented by 1. For example, " +
      "<span class='string'>f([1,2,3])</span> must " +
      "return <span class='string'>[2,3,4]</span>.",

      /* 17: the "add 1 to all" function */
function (ns) {
    var h = function (list,k) {
	if (fp.isNull(list)) {
	    /* trace 1 */
	    return k([ ]);
	} else {
	    /* trace 2 */
	    return h(fp.tl(list),
		     function (x) {
		     /* trace 3 */
			 /* ???????????????????? */
		     });
	}
    };
    return h(ns,function (x) { return x; });
},
      [ ["[]" , "[]", 
	 "{base}"],
	["[1]" , "[2]", 
	 "{rec [1]}{base}{k(.): hd=1 x=[]}" ],
	["[1,2,3]" , "[2,3,4]", 
	"{rec [1,2,3]}{rec [2,3]}{rec [3]}{base}{k(.): hd=3 x=[]}{k(.): hd=2 x=[4]}{k(.): hd=1 x=[3,4]}"],
	["[-4,-3,-2,0,-1]" , "[-3,-2,-1,1,0]", 
	 "{rec [-4,-3,-2,0,-1]}{rec [-3,-2,0,-1]}{rec [-2,0,-1]}{rec [0,-1]}{rec [-1]}{base}{k(.): hd=-1 x=[]}{k(.): hd=0 x=[0]}{k(.): hd=-2 x=[1,0]}{k(.): hd=-3 x=[-1,1,0]}{k(.): hd=-4 x=[-2,-1,1,0]}"]
      ],
      "return k(fp.cons(fp.add(1,fp.hd(list)),x));"
    ],



    [ "The following function takes in a non-empty (flat) list of integers. " +
      "After " +
      "you replace the comment made up of question marks with the correct " +
      "answer, this function is supposed to return its input list but with " +
      "its last element duplicated. For example, " +
      "<span class='string'>f([1,2,3])</span> must " +
      "return <span class='string'>[1,2,3,3]</span>.",

      /* 18: the "duplicate last" function */
function (ns) {
    var h = function (list,k) {
	if (fp.isNull(fp.tl(list))) {
	    /* trace 1 */
	    return k(fp.cons(fp.hd(list),list));
	} else {
	    /* trace 2 */
	    return h(fp.tl(list),
		     function (x) {
			 /* trace 3 */
			 /* ???????????????????? */
		     });
	}
    };
    return h(ns,function (x) { return x; });
},
      [ ["[1]" , "[1,1]", 
	 "{base}"],
	["[1,2,3]" , "[1,2,3,3]", 
	 "{rec [1,2,3]}{rec [2,3]}{base}{k(.): hd=2 x=[3,3]}{k(.): hd=1 x=[2,3,3]}"],
	["[3,2,1,0]" , "[3,2,1,0,0]", 
	 "{rec [3,2,1,0]}{rec [2,1,0]}{rec [1,0]}{base}{k(.): hd=1 x=[0,0]}{k(.): hd=2 x=[1,0,0]}{k(.): hd=3 x=[2,1,0,0]}"]
      ],
      "return k(fp.cons(fp.hd(list),x));"
    ],

/* this exercise does not use the following function because there are several
   answers with different traces
*/

    [ "The following function takes in a non-empty (flat) list of integers. " +
      "After " +
      "you replace the comment made up of question marks with the correct " +
      "answer, this function is supposed to return true if and only if " +
      "all of the elements in the input list are non-negative. For example, " +
      "<span class='string'>f([1,2,3])</span> must " +
      "return <span class='string'>true</span> while " +
      "<span class='string'>f([1,-2,3])</span> must return " +
      "<span class='string'>false</span>.",

      /* 19: the "all non-negative" function */
function (ns) {
    var h = function (list,k) {
	if (fp.isNull(list)) {
	    /* trace 1 */
	    return k(true);               // would work with only 'true'
	} else if (fp.isLT(fp.hd(list),0)) {
	    /* trace 1 */
	    return false;
	} else {
	    /* trace 2 */
	    return h(fp.tl(list),
		     function (x) {
		     /* trace 3 */
			 /* ???????????????????? */
		     });
	}
    };
    return h(ns,function (x) { return x; });
},
      [ ["[1]" , "true", 
	 "{rec [1]}{base}"],
	["[1,2,3]" , "true", 
	 "{rec [1,2,3]}{rec [2,3]}{rec [3]}{base}"],
	["[-1,2,3]" , "false", 
	 "{base}"],
	["[1,-2,3]" , "false", 
	 "{rec [1,-2,3]}{base}"],
	["[1,2,-3]" , "false", 
	 "{rec [1,2,-3]}{rec [2,-3]}{base}" ]
      ],
      "return x;"  // or: return k(x);    // but different traces
    ],

	    ];// functions array

	    // pick a random function
	    var functionNumber = Math.floor(Math.random() * 
					    (functions.length-1)); 
	    //  the -1 above is because we do not want to use function #19
	    //functionNumber = 19;
	    this.initialStatement = functions[ functionNumber ][0];
	    f = functions[ functionNumber ][1];
	    this.functionDisplayed = "var f = " + f.toString()
		.replace(/[ \t]*\/\* trace [123] \*\/[ \t]*\n/g, "");
	    this.tests = functions[ functionNumber ][2];
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
		    .replace(/\/\* trace 1 \*\//g,
			     'trace += "{base}";' )
		    .replace("/* trace 2 */",
			     'trace += "{rec " + ' +
			     'JSON.stringify(list) + "}";')
		    .replace("/* trace 3 */",
			     'trace += "{k(.): ' +
			     'hd=" + JSON.stringify(fp.hd(list)) +' + 
			     ' " x=" + JSON.stringify(x) + "}";'
			     );
		for(i=0; i<this.tests.length; i++) {
		    //console.log("test " + i);
		    output = 			
			eval(fDefinition + "[ f( " + this.tests[i][0] + " ), " +
			     "trace ]");
		    trace = output[1];		    
		    //console.log(trace);
		    //console.log(this.tests[i][2]);
		    //console.log(trace === this.tests[i][2]);
		    //console.log(output[0]);
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

