"use strict";

/* global LAMBDA : true */

(function () {

    // types of lambda expressions:
    // 1: variable
    // 2: lambda abstraction
    // 3: function application

    // returns a random number between min and max includeed
    function getRnd(min,max) {
	return Math.floor(Math.random() * (1+max-min)) + min;
    }
    
    function getRndVarIn(list) {
	var n = list.length;
	if (n === 0) {
	    throw new Error("Exhausted the supply of variables");
	} else {
	    return list.substr(getRnd(0,n-1),1);
	}
    }

    function remVarFrom(v,list) {
	var index = list.indexOf(v);
	if (index === -1) {
	    return list;
	} else {
	    return list.substring(0,index) + list.substring(index+1);
	}
    }

    function getRndExp(depth,minDepth,maxDepth,allowed,bound) {
	var type;
	var v;
	if (depth >= maxDepth) {
	    type = 1;  
	} else if (depth < minDepth) {
	    type = getRnd(2,3);
	} else {
	    type = getRnd(1,3);
	}
	switch (type) {
	    case 1: 
	    v = getRndVarIn(allowed);
	    return LAMBDA.absyn.createVarExp(v);
	
	    case 2:
	    v = getRndVarIn(allowed);
	    return LAMBDA.absyn.createLambdaAbs(LAMBDA.absyn.createVarExp(v),
						getRndExp(depth+1,
							  minDepth-1,
							  maxDepth-1,
							  allowed,
							  bound));
	    

	    case 3:
	    return LAMBDA.absyn.createAppExp(
		getRndExp(depth+1,minDepth-1,maxDepth-1,allowed,bound),
		getRndExp(depth+1,minDepth-1,maxDepth-1,allowed,bound)
		);
	    default:
	    throw new Error("Should have never gotten here.");
	}

    }

LAMBDA.getRndExp = getRndExp;
LAMBDA.getRnd = getRnd;
})();

/*
var print = LAMBDA.printExp;

for(var i=0; i<20; i++) 
    console.log( print(LAMBDA.getRndExp(1,10,20,"xyzuvw","") ));
*/
