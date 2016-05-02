/* global console,  SLang, PLutils */
(function() {
  "use strict";

    var RP35part2 = {    

	init: function() {
	    var SL = SLang;
	    var A = SL.absyn;
	    var E = SL.env;
	    var numClasses, cNames, mNames, vNames, mBodies;
	    var methods, ast;
	    var maxLength = 70;
	    // to limit the number of lines used up by the JSON format, pack
	    // as much on each line (but only up to MaxLength characters)
	    // Precondition: 
	    //     exp is either a string, or an array in which the first
	    //     element is always a string

	    // because of the assumption above, this method does not work
	    // for printing an AST in SLang 3 (e.g., the array of classes does
	    // start with a string)
	    function myStringify(indent,arr,maxLength) {
		var spaces = new Array(indent+1).join(' ');
		var line = JSON.stringify(arr);
		if (line.length <= maxLength) {
		    return [ spaces + line ];
		}
		var i, result = [], prefix, suffix; 
		for(i=0; i<arr.length; i++) {
		    prefix = spaces + (i=== 0 ? "[ " : "  ");
		    suffix = i === arr.length-1 ? "" : ",";
		    if (typeof arr[i] === "object") {
			line = JSON.stringify(arr[i]);
			if (line.length <= maxLength) {
			    result.push( prefix + line + suffix);
			} else {
			    result = result.concat(
				myStringify(indent+2,arr[i],maxLength)
			    );
			}
		    } else {
			// array element is a string or a number
			if (typeof(arr[i]) === "string") {
			    result.push(prefix + '"' + arr[i] + '"' + suffix);
			} else {
			    result.push(prefix  + arr[i] + suffix);
			}
		    }

		}
		result[result.length-1] = 
		    result[result.length-1] + "]";
		return result;
	    }// myStringify function

	    function initRandomParts() {
		var classNames = [ ["A","B","C"],
				   ["C1","C2","C3"],
				   ["C","D","E"],
				   ["X","Y","Z"] ];

		var methodNames = [ ["f","g","h"],
				    ["h","i","j"],
				    ["m1","m2","m3"],
				    ["f1","f2","f3"],
				    ["g1","g2","g3"] ];

		var varNames = [ ["a","b","c"],
				 ["b","c","d"],
				 ["c","d","e"],
				 ["p","q","r"],
				 ["x","y","z"],
				 ["u","v","w"],
				 ["s","t","u"] ];
		numClasses = PLutils.getRnd(1,3);
		cNames = classNames[ PLutils.getRnd(0,classNames.length-1)];
		PLutils.shuffle(cNames);		
		mNames = methodNames[ PLutils.getRnd(0,methodNames.length-1)];	
		PLutils.shuffle(mNames);
		vNames = varNames[ PLutils.getRnd(0,varNames.length-1)];
		mBodies = [];
		PLutils.shuffle(vNames);		
		mBodies.push(A.createIntExp(PLutils.getRnd(0,10)));
		mBodies.push(A.createVarExp(vNames[0]));
		mBodies.push(A.createVarExp(vNames[1]));
		mBodies.push(A.createPrim2AppExp("+",
						 A.createVarExp(vNames[0]),
						 A.createVarExp(vNames[1])));
		mBodies.push(A.createPrim2AppExp("-",
						 A.createVarExp(vNames[0]),
						 A.createVarExp(vNames[1])));
		mBodies.push(A.createPrim2AppExp("-",
						 A.createVarExp(vNames[1]),
						 A.createVarExp(vNames[2])));
		mBodies.push(A.createPrim2AppExp("*",
						 A.createVarExp(vNames[0]),
						 A.createVarExp(vNames[1])));
		PLutils.shuffle(mBodies);		
	    }// initRandomParts function

	    function makeRandomCall() {
		var obj, mName, args;
		var classIndex = PLutils.getRnd(0,numClasses-1);
		obj = A.createNewExp(cNames[classIndex],[]);
		mName = mNames[PLutils.getRnd(0,2)];
		args = [];
		return A.createMethodCall(obj,mName,args);
	    }// makeRandomCall function
	    function buildAST() {
		var classes = [];
		var i, j, classIndex, numIVars, iVars, methods, numMethods;
		var methodIndex = 0, params;
		for(i=0; i<numClasses; i++) {
		    iVars = [];
		    numIVars = i === 0 ? 3 : PLutils.getRnd(0,2);
		    PLutils.shuffle(vNames);
		    for(j=0; j<numIVars; j++) {
			iVars.push(vNames[j]);
		    }
		    methods = [];
		    numMethods = PLutils.getRnd(0,2);
		    PLutils.shuffle(mNames);
		    for(j=0; j<numMethods; j++) {
			params = []; 
			if (PLutils.getRnd(0,1) === 0) {
			    // no params 50% of the time
			    if (PLutils.getRnd(0,1) === 0) {
				// one param 25% of the time
				params = [ vNames[ 
				    PLutils.getRnd(0,vNames.length-1) ] ];
			    } else {
				// two paras 25% of the time
				PLutils.shuffle(vNames);
				params = [ vNames[0], vNames[1] ];
			    }
			}
			methods.push(A.createMethod(mNames[j],
						    params,
						    [mBodies[methodIndex++]]));
		    }
		    classes.push(A.createClass(
			cNames[i],
			i === 0 ? "Object" : cNames[i-1],
			iVars,
			methods
		    ));
		}
		return A.createProgram(classes,[makeRandomCall()]);
	    }

	    function getSourceForMethod(m) {
		return "  method " + A.getMethodName(m) + " (" +
		    A.getMethodParams(m) +
		    ") { " + SLang.printExp(A.getMethodBody(m)[0]) + " }";
	    }
	    function getSourceForClass(c) {
		var i, code = [];
		var numVars = A.getClassIvars(c).length;
		var numMethods = A.getClassMethods(c).length;
		var iVars = " ";
		code.push("class " + A.getClassName(c) + " extends " +
		    A.getClassSuperClass(c) + " {");
		for(i=0; i<numVars; i++) {
		    iVars += " protected " + A.getClassIvars(c)[i];
		}
		if (iVars.length > 1) {  // at least one instance variable
		    code.push(iVars);
		}
		for(i=0; i<numMethods; i++) {
		   code = code.concat(getSourceForMethod(
		       A.getClassMethods(c)[i]));
		}
		code.push("}");
		return code;
	    }
	    function getSourceCode(ast) {
		var code = [];
		var classes = A.getProgramDecls(ast);
		var mainMethodCall = A.getProgramMainBody(ast)[0];
		var i;
		for(i=0; i<classes.length; i++) {
		    code = code.concat(getSourceForClass(classes[i]));
		}
		code.push("public class Driver extends " +
			  (PLutils.getRnd(0,1)===0 ? "Object" :
			  cNames[PLutils.getRnd(0,numClasses-1)]) +
			  " {" );
		code.push();
		code.push("  method main() {");
		code.push("    " + SLang.printExp(mainMethodCall));
		code.push("  }");
		code.push("}");
		return code;
	    }// getSourceCode function

	    initRandomParts();
	    ast = buildAST();
	    this.program = getSourceCode(ast).join("<br />");
	    this.answer = JSON.stringify(ast);
	    //console.log(this.answer);
	}, // init function

	validateAnswer: function (guess) {
	    return this.answer.replace(/\s+/g,"") ===
		guess.replace(/\s+/g,"");
	}// validateAnswer function

    };

    window.RP35part2 = window.RP35part2 || RP35part2;

}());


