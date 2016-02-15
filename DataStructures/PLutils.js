/* global console fp */
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
	}// generateRandomTree
    };// PLutils

    window.PLutils = window.PLutils || PLutils;
}());

