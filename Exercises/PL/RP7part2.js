//       var fp = require('./fp');

/* global console */
(function() {
  "use strict";


var functions = [
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
    function (t) {  
	if (fp.isNull(t)) {
	    return [];
	} else if (fp.isList(fp.hd(t))) {
	    return fp.cons(1,f(fp.tl(t)));
	} else {
	    return fp.cons(fp.hd(t),f(fp.tl(t)));
	}
    },
    /* 2: add up all values at all levels of the tree */
    function (t) {
	if (fp.isNull(t)) {
	    return 0;
	} else if (fp.isList(fp.hd(t))) {
	    return fp.add(f(fp.hd(t)),f(fp.tl(t)));
	} else {
	    return fp.add(fp.hd(t),f(fp.tl(t)));
	}
    },
    /* 3: add up all values at all levels of the tree + 1 for each list */
    function (t) {
	if (fp.isNull(t)) {
	    return -10;
	} else if (fp.isList(fp.hd(t))) {
	    return fp.add(f(fp.hd(t)),f(fp.tl(t)));
	} else {
	    return fp.add(fp.hd(t),f(fp.tl(t)));
	}
    }
];


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
	  var input = generateRandomArray();
	  var functionNumber = Math.floor(Math.random() * functions.length); 
	  functionNumber = 0;
	  var f = functions[ functionNumber ][1];
	  var params = functions[ functionNumber ][0];
	  //console.log( "var f = " + f);
	  //console.log("f( " + JSON.stringify(input) + " ) = ");
	  var answer;
	  try {
	      answer = JSON.stringify(eval("var f = " + f + "; f(" + 
					   JSON.stringify(input) + ");"));
	  } 
	  catch (e) {
	      answer = "error";
	  }
	  console.log(answer);
	  this.functionDef = f.toString();
	  this.params = params;
	  this.functionCall = ("f( " + JSON.stringify(input) + " )")
	      .split("").join(" ");
	  this.answer = answer;
	  
      }// init
  }// RP7part2  

    window.RP7part2 = window.RP7part2 || RP7part2;
}());

