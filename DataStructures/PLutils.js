/* global console, fp */
(function() {
  "use strict";

    var PLutils = {    

	/* generate a random tree represented as a list of lists 
	   of ... of integers
	 */
	generateRandomTree : function () {

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
	    };
	    var a = f(5, 3);
	    var complexity = JSON.stringify(a).match(/\[/g).length;
	    
	    while (complexity < 3 || complexity > 5) {
		a = f(5, 3);
		complexity = JSON.stringify(a).match(/\[/g).length;
	    }
	    return a;
	},// generateRandomTree

	/* generate a random (flat) list of integers */
	generateRandomList : function () {
	    var result = [];
	    var minIntegerVal = 0;
	    var maxIntegerVal = 9;
	    var len = 2 + Math.floor(Math.random() * 8);
	    for(var i=0; i<len; i++) {
		result.push(minIntegerVal + 
			    Math.floor(Math.random() * maxIntegerVal));
	    }	
	return result;
	},//  generateRandomList

	/* generate a random list of (flat) integer lists */
	generateRandomListOfLists : function () {
	    var result = [];
	    var minIntegerVal = 0;
	    var maxIntegerVal = 9;
	    var len = 2 + Math.floor(Math.random() * 4);
	    var arr;
	    var len2
	    var i,j;
	    for(var i=0; i<len; i++) {
		arr = [];
		len2 = 2 + Math.floor(Math.random() * 4);
		for(var j=0; j<len2; j++) {
		    arr.push(minIntegerVal + 
			     Math.floor(Math.random() * maxIntegerVal));
		}	
		result.push(arr);
	    }
	    return result;
	}, //  generateRandomListOfLists

	// randomizes the order of the element in the given list
	shuffle : function ( list ) {
	    var i = list.length;
	    while ( --i ) {
		var j = Math.floor( Math.random() * ( i + 1 ) );
		var tempi = list[i];
		var tempj = list[j];
		list[i] = tempj;
		list[j] = tempi;
	    }
	},// shuffle

	getRnd: function (min,max) {
	    return min + Math.floor((max-min+1) * Math.random());
	}// getRnd function
    };// PLutils
    
    window.PLutils = window.PLutils || PLutils;
}());

