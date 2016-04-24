/* global console, is */
(function() {
  "use strict";

    var randomDigit;

    function makeSeq(list,seq) {
	var hd;
	if (list.length===0) {
	    return seq;
	} else {
	    hd = list.splice(0,1)[0];
	    return is.cons(hd,function () { return makeSeq(list,seq); });
	}
    }
    function acceptableTokens( code ) {
	var tokens = code.trim().split(/[\*\+,\(\) \n\t;{}]+/);
	var good = [ "return", "function", "if", "else", 
		     "s", "s1","s2", "f", "+", "*",
		   "===","<",">"];
	for(var i=0; i<tokens.length; i++) {
	    if (tokens[i] === "") {
		continue;
	    }
	    if (tokens[i].startsWith("is.")) {
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
	//console.log("no bad tokens");
	return true;
    }

    var RP32part2 = {    
	init: function() {
	    randomDigit = 2 + Math.floor(8 * Math.random());
	    var functions = [

		/* in this array, each element is a four-element list:
		   index 0: text describing the function's behavior
		   index 1: the params of the function
		   index 2: unit tests
                               each unit test is made of:
                                    the input
                                    the output
 		   index 3: one correct answer (not used here; for reference)
		*/
   [ // 0: add a constant to each element
      "The following function takes in a sequence of integers. After " +
      "you replace the comment made up of question marks with the correct " +
      "body, this function is supposed to return a sequence in which " +
      randomDigit + " has been added to each element of the input sequence. " +
      "For example:<br />" +
      "f ( [10,20,30,40,50, ... ] ) = [" + 	   
	   [10,20,30,40,50].map(
	       function(n) { return n+randomDigit; }) + ", ... ]",
      "s",
      [ /* test 0 */
	  ["is.take(f(is.from(1)),10)" , 
	   JSON.stringify([1,2,3,4,5,6,7,8,9,10].map(
	       function(n) { return n+randomDigit; }))],
	  /* test 1 */
	  ["is.take(f(is.iterates(function(n){ return n;},10)),10)" , 
	   JSON.stringify([10,10,10,10,10,10,10,10,10,10].map(
	       function(n) { return n+randomDigit; }))],
      ],
/*   return is.cons(is.hd(s) + 5,
            function () {
                  return f(is.tl(s)); });
*/
    ],

   [ // 1: multiply each element by a constant
      "The following function takes in a sequence of integers. After " +
      "you replace the comment made up of question marks with the correct " +
      "body, this function is supposed to return a sequence in which " +
      "each element of the input sequence has been multiplied by " +
      randomDigit + ". For example:<br />" +
      "f ( [10,20,30,40,50, ... ] ) = [" + 	   
	   [10,20,30,40,50].map(
	       function(n) { return n*randomDigit; }) + ", ... ]",
      "s",
      [ /* test 0 */
	  ["is.take(f(is.from(1)),10)" , 
	   JSON.stringify([1,2,3,4,5,6,7,8,9,10].map(
	       function(n) { return n*randomDigit; }))],
	  /* test 1 */
	  ["is.take(f(is.iterates(function(n){ return n;},10)),10)" , 
	   JSON.stringify([10,10,10,10,10,10,10,10,10,10].map(
	       function(n) { return n*randomDigit; }))],
      ],
/*     return is. cons (is.hd(s) * 5,
            function () {
                  return f(is.tl(s));
             };
*/
    ],

   [ // 2: replace one value with another
      "The following function takes in a sequence of integers. After " +
      "you replace the comment made up of question marks with the correct " +
      "body, this function is supposed to return a sequence in which " +
      "each occurrence of the number " + randomDigit + " has been replaced " +
      "by " + (randomDigit+1) + ". For example:<br />" +
      "f ( [1,2,3,4,5,6,7,8,9,10, ... ] ) = [" + 	   
	   [1,2,3,4,5,6,7,8,8,10].map(
	       function(n) { return n===randomDigit ? randomDigit+1 : n; }) +
	   ", ... ]",
      "s",
      [ /* test 0 */
	  ["is.take(f(is.from(1)),10)" , 
	   JSON.stringify([1,2,3,4,5,6,7,8,9,10].map(
	       function(n) { return n===randomDigit ? randomDigit+1 : n; }))],
	  /* test 1 */
	  ["is.take(f(is.iterates(function(n){ return n;}," + randomDigit +")),10)" , 

	   "[" + (new Array(10)).join(""+(randomDigit+1)+",") + 
	   (randomDigit+1) + "]"]
      ],
/*      if (is.hd(s) === 3) {	
           return is.cons (4, function () { return f(is.tl(s)); });
        } else {
           return is.cons (is.hd(s), function () { return f(is.tl(s)); });
       }
*/
   ],

   [ // 3: insert the same random number before every element
      "The following function takes in a sequence of integers. After " +
      "you replace the comment made up of question marks with the correct " +
      "body, this function is supposed to return the sequence obtained " +
      "by inserting the number " + randomDigit + " in front of each " +
      "number in the input sequence. For example:<br />" +
      "f( [10,20,30,40,50, ... ] ) = [" +
      "10,20,30,40,50".replace(/(\d+)/g,randomDigit + ",$1") + ", ... ]",
      "s",
      [ /* test 0 */
	  ["is.take(f(is.from(1)),20)" , 
	   "[1,2,3,4,5,6,7,8,9,10]".replace(/(\d+)/g,randomDigit + ",$1") ],
	  /* test 1 */
	  ["is.take(f(is.iterates(function(n){ return n;},10)),20)", 
	   "[10,10,10,10,10,10,10,10,10,10]".replace(/(\d+)/g,randomDigit + ",$1") ],
      ],
/*
      return is.cons (0,
                      function () {
                           return is.cons(is.hd(s),
                                          function () {
                                                 return f(is.tl(s)); });})
*/
    ],

   [ // 4: insert the same random number after every element
      "The following function takes in a sequence of integers. After " +
      "you replace the comment made up of question marks with the correct " +
      "body, this function is supposed to return the sequence obtained " +
      "by inserting the number " + randomDigit + " after each " +
      "number in the input sequence. For example:<br />" +
      "f( [10,20,30,40,50, ... ] ) = [" +
      "10,20,30,40,50".replace(/(\d+)/g,"$1," + randomDigit) + ", ... ]",
      "s",
      [ /* test 0 */
	  ["is.take(f(is.from(1)),20)" , 
	   "[1,2,3,4,5,6,7,8,9,10]".replace(/(\d+)/g,"$1," + randomDigit ) ],
	  /* test 1 */
	  ["is.take(f(is.iterates(function(n){ return n;},10)),20)", 
	   "[10,10,10,10,10,10,10,10,10,10]".replace(/(\d+)/g,"$1," + randomDigit) ],
      ],
/*
      return is.cons (is.hd(s),
                      function () {
                           return is.cons(0,
                                          function () {
                                                 return f(is.tl(s)); });})
*/
    ],

   [ // 5: duplicate all elements
      "The following function takes in a sequence of integers. After " +
      "you replace the comment made up of question marks with the correct " +
      "body, this function is supposed to return the sequence obtained " +
      "by duplicating each element in the input sequence. For example:<br />" +
      "f( [1,2,3,4,5, ... ] ) = [1,1,2,2,3,3,4,4,5,5, ... ]",
      "s",
      [ /* test 0 */
	  ["is.take(f(is.from(1)),10)" , 
	   "[1,1,2,2,3,3,4,4,5,5]"],
	  /* test 1 */
	  ["is.take(f(is.iterates(function(n){ return n;},10)),10)", 
	   "[10,10,10,10,10,10,10,10,10,10]"],
      ],
/*
      return is.cons (is.hd(s),
                      function () {
      	                    return is.cons(is.hd(s),
      				       function () {
                  			   return f(is.tl(s)); });})
*/
    ],

   [ // 6: add pair of consecutive integers
      "The following function takes in a sequence of integers. After " +
      "you replace the comment made up of question marks with the correct " +
      "body, this function is supposed to return the sequence obtained " +
      "by first adding up the first and second elements of the input " +
      "sequence, then adding up the third and fourth elements of the input " +
      "sequence, etc. For example:<br />" +
      "f( [1,2,3,4,5,6,7,8, ... ] ) = [3,7,11,15, ... ]",
      "s",
      [ /* test 0 */
	  ["is.take(f(is.from(1)),5)" , 
	   "[3,7,11,15,19]"],
	  /* test 1 */
	  ["is.take(f(is.iterates(function(n){ return n;},10)),5)", 
	   "[20,20,20,20,20]"],
      ],
/*
      return is.cons(is.hd(s) + is.hd(is.tl(s)),
      	    	     function () {
      		       return f(is.tl(is.tl(s))); });
*/
    ],

   [ // 7: swap pairs of consecutive integers
      "The following function takes in a sequence of integers. After " +
      "you replace the comment made up of question marks with the correct " +
      "body, this function is supposed to return the sequence obtained " +
      "by first swapping the first and second elements of the input " +
      "sequence, then swapping the third and fourth elements of the input " +
      "sequence, etc. For example:<br />" +
      "f( [1,2,3,4,5,6,7,8,9,10, ... ] ) = [2,1,4,3,6,5,8,7,10,9, ... ]",
      "s",
      [ /* test 0 */
	  ["is.take(f(is.from(1)),6)" , 
	   "[2,1,4,3,6,5]"],
	  /* test 1 */
	  ["is.take(f(is.iterates(function(n){ return n;},10)),5)", 
	   "[10,10,10,10,10]"],
      ],
/*
      return is.cons(is.hd(is.tl(s)),
      		   function () {
      		       return is.cons(is.hd(s),
      				      function () { 
      					  return f(is.tl(is.tl(s))); });});
*/
    ],

   [ // 8: delete each element that is smaller than its successor
      "The following function takes in a sequence of integers. After " +
      "you replace the comment made up of question marks with the correct " +
      "body, this function is supposed to return the input sequence " +
      "after removing the elements that are smaller than their " +
      "immediate successor. For example:<br />" +
      "f( [1,2,0,3,2,1,4,5,6, ... ] ) = [2,3,2, ... ]",
      "s",
      [ /* test 0 */
	["is.take(f(is.map(function (n) { return Math.round(10*Math.sin(n)); },is.from(1))),10)",
	  "[9,1,-8,10,4,-5,10,7,-3,9]"],
       /* test 1 */
        ["is.take(f(is.map(function (n) { return -n; },is.from(1))),10)", 
	   "[-1,-2,-3,-4,-5,-6,-7,-8,-9,-10]"],
      ],
/*
      if (is.hd(s) < is.hd(is.tl(s))) {
        	return f(is.tl(s));
      } else {
       	return is.cons(is.hd(s),
      		       function () {
      			   return f(is.tl(s)); });}
*/
    ],

   [ // 9: cumulative sums
      "The following function takes in a sequence of integers. After " +
      "you replace the comment made up of question marks with the correct " +
      "body, this function is supposed to return the sequence in which " +
      "the first, second, third, etc., element is the sum of the first, "+
      "first two, first three, etc., elements in the input list. For example:<br />" +
      "f( [1,2,3,4,5, ... ] ) = [1,3,6,10,15, ... ]",
      "s",
      [ /* test 0 */
	["is.take(f(is.from(1)),10)",
	  "[1,3,6,10,15,21,28,36,45,55]"],
       /* test 1 */
	["is.take(f(is.map(function (n) { return Math.round(10*Math.sin(n)); },is.from(1))),10)",
        "[8,17,18,10,0,-3,4,14,18,13]"
	]
      ],
/*
      return is.cons(is.hd(s),
           	   function () {
      			   return f(is.cons(
      			       is.hd(s) + is.hd(is.tl(s)),
       			       function () {
          				   return is.tl(is.tl(s)); }));});
*/
    ],

   [ // 10: sum of two sequences
      "The following function takes in two sequences of integers. After " +
      "you replace the comment made up of question marks with the correct " +
      "body, this function is supposed to return the sequence containing " +
      "the sum of the first number in the first sequence and the first " +
      "number in the second sequence, then the sum of the second " +
      "number in the first sequence and the second number in the second " +
      "sequence, etc. For example:<br />" +
      "f ( [1,2,3,4,5, ... ], [10,20,30,40,50, ... ] ) = [11,22,33,44,55, ... ]",
      "s1,s2",
      [ /* test 0 */
	["is.take(f(is.from(1),is.from(5)),10)",
	  "[6,8,10,12,14,16,18,20,22,24]"],
       /* test 1 */
	["is.take(f(is.from(10),is.iterates(function(n){ return n;},1)),10)", 
	  "[11,12,13,14,15,16,17,18,19,20]"]
      ],
/*
  return is.cons(is.hd(s1) + is.hd(s2),
                        function () {
                            return f(is.tl(s1),is.tl(s2)); } );
*/
    ],

   [ // 11: max of two sequences
      "The following function takes in two sequences of integers. After " +
      "you replace the comment made up of question marks with the correct " +
      "body, this function is supposed to return the sequence containing " +
      "the largest number between the first number in the first sequence and " +
      "the first number in the second sequence, then the largest number " +
      "between the second number in the first sequence and the second number " +
      "in the second sequence, etc. For example:<br />" +
      "f ( [1,20,3,40,5,60,7, ... ], [2,3,4,5,6,7,8, ... ] ) = [2,20,4,40,6,60,8, ... ]",
      "s1,s2",
      [ /* test 0 */
	["is.take(f(is.from(1),is.iterates(function(n){ return n;},5)),10)", 
	  "[5,5,5,5,5,6,7,8,9,10]"],
       /* test 1 */

	["is.take(f(is.map(function (n) { return Math.round(10*Math.sin(n)); },is.from(1)),is.from(-5)),10)",
	 "[8, 9, 1, -2, -1, 0, 7, 10, 4, 4]"
	],
      ],
/*
if (is.hd(s1) > is.hd(s2)) {
  return is.cons(is.hd(s1),
                        function () {
                            return f(is.tl(s1),is.tl(s2)); } );
} else {
  return is.cons(is.hd(s2),
                        function () {
                            return f(is.tl(s1),is.tl(s2)); } );
} 
*/ 
    ],

   [ // 12: interleave two sequences
      "The following function takes in two sequences of integers. After " +
      "you replace the comment made up of question marks with the correct " +
      "body, this function is supposed to return the sequence obtained " +
      "by interleaving the two input sequences as follows:<br />" +
      "f ( [1,2,3,4,5, ... ], [10,20,30,40,50, ... ] ) = [1,10,2,20,3,30,4,40,5,50, ... ]",
      "s1,s2",
      [ /* test 0 */
	["is.take(f(is.from(1),is.map(function(n){ return 10*n;},is.from(1))),10)", 
	  "[1,10,2,20,3,30,4,40,5,50]"],
       /* test 1 */
        ["is.take(f(is.from(1),is.map(function (n) { return Math.round(10*Math.sin(n)); },is.from(1))),10)" ,
         "[1, 8, 2, 9, 3, 1, 4, -8, 5, -10]"]
      ],
/*
   return is.cons(is.hd(s1),
                  function () {  return f(s2,is.tl(s1)); });
*/ 
    ],

   [ // 13: interleave while skipping 
      "The following function takes in two sequences of integers. After " +
      "you replace the comment made up of question marks with the correct " +
      "body, this function is supposed to return the sequence in which " +
      "the first, third, fifth, etc., elements are the corresponding elements " +
      "in the first input sequence and the second, fourth, sixth, etc., " +
      "elements are the corresponding elements in the second input " +
      "sequence. For example:<br />" +
      "f ( [1,2,3,4,5, ... ], [10,20,30,40,50,60, ... ] ) = [1,20,3,40,5,60, ... ]",
      "s1,s2",
      [ /* test 0 */
	["is.take(f(is.from(1),is.map(function(n){ return 10*n;},is.from(1))),10)", 
	  "[1,20,3,40,5,60,7,80,9,100]"],
       /* test 1 */
        ["is.take(f(is.from(1),is.map(function (n) { return Math.round(10*Math.sin(n)); },is.from(1))),10)" ,
         "[1, 9, 3, -8, 5, -3, 7, 10, 9, -5]"]
      ],
/*
   return is.cons(is.hd(s1),
                  function () {  
                           return f(is.tl(s2),is.tl(s1)); });
*/ 
    ],

   [ // 14: merge sorted sequences while keeping duplicated
      "The following function takes in two sequences of integers sorted in " +
      "ascending order. After you replace the comment made up of question " +
      "marks with the correct body, this function is supposed to return the " +
      "sequence obtained by merging, in ascending order, the two input " +
      "sequences without deleting any elements. For example:<br />" +
      "f ( [1,2,5,5,8, ... ], [3,4,6,7,8, ... ] ) = [1,2,3,4,5,5,6,7,8,8 ... ]",
      "s1,s2",
      [ /* test 0 */
	["is.take(f(is.from(1),is.from(3)),10)", 
	  "[1,2,3,3,4,4,5,5,6,6]"],
       /* test 1 */
	["is.take(f(makeSeq([1,2,5,5,8],is.from(9)),makeSeq([3,4,6,7,8],is.from(10))),10)",
	"[1,2,3,4,5,5,6,7,8,8]"]

      ],
/*
   if (is.hd(s1) < is.hd(s2)) {
      return is.cons(is.hd(s1),
                     function () {  
                           return f(is.tl(s1),s2)});
   } else {
      return is.cons(is.hd(s2),
                     function () {  
                           return f(s1,is.tl(s2))});
   }
*/ 
    ],

   [ // 15: merge sorted sequences WITHOUT duplicates
      "The following function takes in two sequences of integers sorted in " +
      "ascending order containing NO duplicates. After you replace the comment made up of question " +
      "marks with the correct body, this function is supposed to return the " +
      "sequence obtained by merging, in ascending order, the two input " +
      "sequences with NO duplicates in the output sequence. For example:<br />" +
      "f ( [1,2,5,8,9, ... ], [3,4,5,6,7,8,9,10, ... ] ) = [1,2,3,4,5,6,7,8,9,10, ... ]",
      "s1,s2",
      [ /* test 0 */
	["is.take(f(is.from(1),is.from(3)),10)", 
	  "[1,2,3,4,5,6,7,8,9,10]"],
       /* test 1 */
	["is.take(f(makeSeq([1,2,5,8,9],is.from(10)),makeSeq([3,4,5,6,7,8,9,10],is.from(10))),10)",
	"[1,2,3,4,5,6,7,8,9,10]"]

      ],
/*
  if (is.hd(s1) === is.hd(s2)) {
     return f(s1,is.tl(s2));
  } else if (is.hd(s1) < is.hd(s2)) {
      return is.cons(is.hd(s1),
                     function () {  
                           return f(is.tl(s1),s2)});
   } else {
      return is.cons(is.hd(s2),
                     function () {  
                           return f(s1,is.tl(s2))});
   }
*/ 
    ]
	    
	    ];// functions array

	    // pick a random function
	    var functionNumber = Math.floor(Math.random() * 
					    functions.length); 
	    this.initialStatement = functions[ functionNumber ][0];
	    this.functionDisplayed = "var f = function (" + 
		functions[functionNumber][1] + ")" +
		 " {\n             /* ?????????????????? */    \n};";

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
		fDefinition =
		    this.functionDisplayed
		    .toString().replace(/\/\*[ ]*[\?]+[ ]*\*\//,
					 studentAnswer);
		for(i=0; i<this.tests.length; i++) {
		    output = eval(fDefinition + this.tests[i][0]);
		    if (JSON.stringify(output).replace(/\s+/g,"") !==
			this.tests[i][1].replace(/\s+/g,"")) {
			return false;
		    }
		}
	    } catch (e) {
		//console.log("exception: " + e);
		passTests = false;
	    }
	    // return this.answer === studentAnswer.replace(/\s+/g,"");
	    return passTests;
	}
    };// RP32part2  

    window.RP32part2 = window.RP32part2 || RP32part2;
}());

