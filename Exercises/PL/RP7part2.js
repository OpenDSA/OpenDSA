//       var fp = require('./fp');

/* global console */
(function() {
  "use strict";

    function generateRandomArray() {
	var f = function (maxLength,maxDepth) {
	    var result = [];
	    var minIntegerVal = 0;
	    var maxIntegerVal = 9;
	    var len = 2 + Math.floor(Math.random() * (maxLength-2));
	    for(var i=0; i<len; i++) {
		if (maxDepth === 0 || Math.random() < 0.6) {
		    result.push(minIntegerVal + 
				Math.floor(Math.random() * maxIntegerVal));
		} else {
		    result.push(f(maxLength,maxDepth-1));
		}
	    }
	    return result;
	}
	var a = f(5, 3);
	var complexity = JSON.stringify(a).match(/\[/g).length;
	
	while (complexity < 3 || complexity > 5) {
	    a = f(5, 3);
	    complexity = JSON.stringify(a).match(/\[/g).length;
	}
	return a;
    }

    var RP7part2 = {    
	init: function() {

	    var functions = [

    /* In the array of functions below, the following values appearing
       in the function body are placeholder values to be replaced later on:
 
       -12345 will be replaced by a random digit between 0 and 9
       -999   will be replaced by a random digit present in the input tree

     */
    /* 0: identity function */
    [ "<span class='string'>t</span> is a tree of integers",
function (t) {   
    if (fp.isNull(t)) {
	return t;
    } else if (fp.isList(fp.hd(t))) {
	return fp.cons(fp.hd(t),f(fp.tl(t)));
    } else {
	return fp.cons(fp.hd(t),f(fp.tl(t)));
    }
}], 
    /* 1: replace with 1 each list element at the first level  */
    ["<span class='string'>t</span> is a tree of integers",
function (t) {  
    if (fp.isNull(t)) {
	return [];
    } else if (fp.isList(fp.hd(t))) {
	return fp.cons(1,f(fp.tl(t)));
    } else {
	return fp.cons(fp.hd(t),f(fp.tl(t)));
    }
}],
    /* 2: add up all values at all levels of the tree */
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
    /* 3: add up all values at all levels of the tree + 1 for each list */
    ["<span class='string'>t</span> is a tree of integers",
function (t) {
    if (fp.isNull(t)) {
	return -10;
    } else if (fp.isList(fp.hd(t))) {
	return fp.add(f(fp.hd(t)),f(fp.tl(t)));
    } else {
	return fp.add(fp.hd(t),f(fp.tl(t)));
    }
}]
];

	    // pick a random input
	    var tree = generateRandomArray();
	    // pick a random function
	    var functionNumber = Math.floor(Math.random() * functions.length); 
	    functionNumber = 2;
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
		answer = JSON.stringify(eval("var f = " + fStr + "; f(" + 
					     JSON.stringify(tree) + ");"));
	    } 
	    catch (e) {
		answer = "error";
	    }
	    console.log(answer);	  
	    this.functionDef = fStr;
	    this.params = params;
	    this.functionCall = ("f( " + JSON.stringify(tree) + " )")
		.split("").join(" ");
	    this.answer = answer;
	    
	}// init
    }// RP7part2  

    window.RP7part2 = window.RP7part2 || RP7part2;
}());

