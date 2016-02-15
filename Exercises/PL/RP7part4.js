/* global console, fp, PLutils */
(function() {
  "use strict";

    var RP7part4 = {    
	init: function() {

	    var functions = [

    /* In the array of functions below, the following values appearing
       in the function body are placeholder values to be replaced later on:
 
       -12345 will be replaced by a random digit between 0 and 9
     */

    [ "<span class='string'>t</span> is a tree of integers",
      /* 0: identity function */
function (t) {   
    if (fp.isNull(t)) {
	return t;
    } else if (fp.isList(fp.hd(t))) {
	return fp.cons(fp.hd(t),f(fp.tl(t)));
    } else {
	return fp.cons(fp.hd(t),f(fp.tl(t)));
    }
}], 

    [ "<span class='string'>t</span> is a tree of integers",
      /* 1: add a random digit at the end of each list */
function (t) {   
    if (fp.isNull(t)) {
	return fp.cons(-12345,t);
    } else if (fp.isList(fp.hd(t))) {
	return fp.cons(f(fp.hd(t)),f(fp.tl(t)));
    } else {
	return fp.cons(fp.hd(t),f(fp.tl(t)));
    }
}], 


    [ "<span class='string'>t</span> is a tree of integers",
      /* 2: adds a random digit at the beginning of each sub-list 
	 (but not the top-level list)
	 */
function (t) {   
    if (fp.isNull(t)) {
	return t;
    } else if (fp.isList(fp.hd(t))) {
	return fp.cons(fp.cons(-12345,f(fp.hd(t))),f(fp.tl(t)));
    } else {
	return fp.cons(fp.hd(t),f(fp.tl(t)));
    }
}], 

    /* 3: replace with a random digit each list element at the first level  */
    ["<span class='string'>t</span> is a tree of integers",
function (t) {  
    if (fp.isNull(t)) {
	return [];
    } else if (fp.isList(fp.hd(t))) {
	return fp.cons(-12345,f(fp.tl(t)));
    } else {
	return fp.cons(fp.hd(t),f(fp.tl(t)));
    }
}],
    /* 4: add up all values at all levels of the tree then add a random 
       digit for each opening bracket in the input */
    ["<span class='string'>t</span> is a tree of integers",
function (t) {
    if (fp.isNull(t)) {
	return -12345;
    } else if (fp.isList(fp.hd(t))) {
	return fp.add(f(fp.hd(t)),f(fp.tl(t)));
    } else {
	return fp.add(fp.hd(t),f(fp.tl(t)));
    }
}],

    /* 5: same as the previous one expect sub (right-assoc) instead of  add
       and no term subtracted at the end */
    ["<span class='string'>t</span> is a tree of integers",
function (t) {
    if (fp.isNull(t)) {
	return 0;
    } else if (fp.isList(fp.hd(t))) {
	return fp.sub(f(fp.hd(t)),f(fp.tl(t)));
    } else {
	return fp.sub(fp.hd(t),f(fp.tl(t)));
    }
}],

    [ "<span class='string'>t</span> is a tree of integers",
      /* 6: replace each number with the same random digit */
function (t) {   
    if (fp.isNull(t)) {
	return t;
    } else if (fp.isList(fp.hd(t))) {
	return fp.cons(f(fp.hd(t)),f(fp.tl(t)));
    } else {
	return fp.cons(-12345,f(fp.tl(t)));
    }
}], 


    [ "<span class='string'>t</span> is a tree of integers",
      /* 7: replace each number at the top-level with the same random digit */
function (t) {   
    if (fp.isNull(t)) {
	return t;
    } else if (fp.isList(fp.hd(t))) {
	return fp.cons(fp.hd(t),f(fp.tl(t)));
    } else {
	return fp.cons(-12345,f(fp.tl(t)));
    }
}], 

    [ "<span class='string'>t</span> is a tree of integers",
      /* 8: remove all of the integers, only keep empty lists */
function (t) {   
    if (fp.isNull(t)) {
	return t;
    } else if (fp.isList(fp.hd(t))) {
	return fp.cons(f(fp.hd(t)),f(fp.tl(t)));
    } else {
	return f(fp.tl(t));
    }
}], 

    [ "<span class='string'>n</span> is an integer and " +
      "<span class='string'>t</span> is a tree of integers",
      /* 9: shallow version of isMember */
function (n,t) {   
    if (fp.isNull(t)) {
	return false;
    } else if (fp.isList(fp.hd(t))) {
	return f(n,fp.tl(t));
    } else if (fp.isEq(fp.hd(t),n)) {
	return true;
    } else {
	return f(n,fp.tl(t));
    }
}], 

    [ "<span class='string'>n</span> is an integer and " +
      "<span class='string'>t</span> is a tree of integers",
      /* 10: deep version of isMember */
function (n,t) {   
    if (fp.isNull(t)) {
	return false;
    } else if (fp.isList(fp.hd(t))) {
	if (f(n,fp.hd(t))) {
	    return true;
	} else {
	    return f(n,fp.tl(t));
	}
    } else if (fp.isEq(fp.hd(t),n)) {
	return true;
    } else {
	return f(n,fp.tl(t));
    }
}], 

    [ "<span class='string'>n</span> is an integer and " +
      "<span class='string'>t</span> is a tree of integers",
      /* 11: count the number of occurrences of n in all of t */
function (n,t) {   
    if (fp.isNull(t)) {
	return 0;
    } else if (fp.isList(fp.hd(t))) {
	return fp.add(f(n,fp.hd(t)),f(n,fp.tl(t)));
    } else if (fp.isEq(fp.hd(t),n)) {
	return fp.add(1,f(n,fp.tl(t)));
    } else {
	return f(n,fp.tl(t));
    }
}], 

    [ "<span class='string'>n</span> is an integer and " +
      "<span class='string'>t</span> is a tree of integers",
      /* 12: count the number of occurrences of n at the top level of t */
function (n,t) {   
    if (fp.isNull(t)) {
	return 0;
    } else if (fp.isList(fp.hd(t))) {
	return f(n,fp.tl(t));
    } else if (fp.isEq(fp.hd(t),n)) {
	return fp.add(1,f(n,fp.tl(t)));
    } else {
	return f(n,fp.tl(t));
    }
}], 

    [ "<span class='string'>n</span> is an integer and " +
      "<span class='string'>t</span> is a tree of integers",
      /* 13: add up the occurrences of n in all of t */
function (n,t) {   
    if (fp.isNull(t)) {
	return 0;
    } else if (fp.isList(fp.hd(t))) {
	return fp.add(f(n,fp.hd(t)),f(n,fp.tl(t)));
    } else if (fp.isEq(fp.hd(t),n)) {
	return fp.add(n,f(n,fp.tl(t)));
    } else {
	return f(n,fp.tl(t));
    }
}], 


    [ "<span class='string'>n</span> is an integer and " +
      "<span class='string'>t</span> is a tree of integers",
      /* 14: replace all occurrences of n in all of t with a random digit */
function (n,t) {   
    if (fp.isNull(t)) {
	return t;
    } else if (fp.isList(fp.hd(t))) {
	return fp.cons(f(n,fp.hd(t)),f(n,fp.tl(t)));
    } else if (fp.isEq(fp.hd(t),n)) {
	return fp.cons(-12345,f(n,fp.tl(t)));
    } else {
	return fp.cons(fp.hd(t),f(n,fp.tl(t)));
    }
}], 

    [ "<span class='string'>n</span> is an integer and " +
      "<span class='string'>t</span> is a tree of integers",
      /* 15: delete all integers in t that are larger than n */
function (n,t) {   
    if (fp.isNull(t)) {
	return t;
    } else if (fp.isList(fp.hd(t))) {
	return fp.cons(f(n,fp.hd(t)),f(n,fp.tl(t)));
    } else if (fp.isGT(fp.hd(t),n)) {
	return f(n,fp.tl(t));
    } else {
	return fp.cons(fp.hd(t),f(n,fp.tl(t)));
    }
}], 


    [ "<span class='string'>n</span> is an integer and " +
      "<span class='string'>t</span> is a tree of integers",
      /* 16: delete all integers in t that are less than n */
function (n,t) {   
    if (fp.isNull(t)) {
	return t;
    } else if (fp.isList(fp.hd(t))) {
	return fp.cons(f(n,fp.hd(t)),f(n,fp.tl(t)));
    } else if (fp.isLT(fp.hd(t),n)) {
	return f(n,fp.tl(t));
    } else {
	return fp.cons(fp.hd(t),f(n,fp.tl(t)));
    }
}], 


    [ "<span class='string'>n</span> is an integer and " +
      "<span class='string'>t</span> is a tree of integers",
      /* 17: delete all occurrences of n in t*/
function (n,t) {   
    if (fp.isNull(t)) {
	return t;
    } else if (fp.isList(fp.hd(t))) {
	return fp.cons(f(n,fp.hd(t)),f(n,fp.tl(t)));
    } else if (fp.isEq(fp.hd(t),n)) {
	return f(n,fp.tl(t));
    } else {
	return fp.cons(fp.hd(t),f(n,fp.tl(t)));
    }
}], 


    [ "<span class='string'>n</span> is an integer and " +
      "<span class='string'>t</span> is a tree of integers",
      /* 18: duplicate each occurrences of n in t*/
function (n,t) {   
    if (fp.isNull(t)) {
	return t;
    } else if (fp.isList(fp.hd(t))) {
	return fp.cons(f(n,fp.hd(t)),f(n,fp.tl(t)));
    } else if (fp.isEq(fp.hd(t),n)) {
	return fp.cons(n,fp.cons(fp.hd(t),f(n,fp.tl(t))));
    } else {
	return fp.cons(fp.hd(t),f(n,fp.tl(t)));
    }
}] 


	    ];// functions array

	    // pick a random input
	    var tree = PLutils.generateRandomTree();
	    var integer = Math.floor(Math.random() * 10); 
	    // pick a random function
	    var functionNumber = Math.floor(Math.random() * functions.length); 
	    //functionNumber = 18;
	    var f = functions[ functionNumber ][1];
	    var fStr = f.toString();
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
						 JSON.stringify(tree) + ");"));
		} else if (f.length===2) {
		    // function has two argument
		    answer = JSON.stringify(
			eval("var f = " + fStr + "; f(" + integer + "," +
			     JSON.stringify(tree) + ");"));
		}
	    } 
	    catch (e) {
		answer = "error";
	    }
	    this.functionDef = "var f = " + fStr;
	    this.params = params;
	    if (f.length===1) {
		this.functionCall = ("f( " + JSON.stringify(tree) + " )")
		    .split("").join(" ");
	    } else {
		this.functionCall = ("f( " + integer + "," + 
				     JSON.stringify(tree) + " )")
		    .split("").join(" ");
	    }
	    this.answer = answer.replace(/\+/g,"");
	    //console.log(answer);
	},// init

	checkAnswer: function (studentAnswer) {
	    return this.answer === studentAnswer.replace(/\s+/g,"");
	}
    };// RP7part4  

    window.RP7part4 = window.RP7part4 || RP7part4;
}());

