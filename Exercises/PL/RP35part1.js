/* global console,  SLang, PLutils */
(function() {
  "use strict";

    var RP35part1 = {    

	init: function() {
	    var SL = SLang;
	    var A = SL.absyn;
	    var E = SL.env;
	    var numClasses, cNames, mNames, vNames, mBodies;
	    var methods, ast;
	    var maxLength = 50;

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
//		console.log(JSON.stringify(mBodies));
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
	    if (PLutils.getRnd(0,1) === 0) {
		this.program = getSourceCode(ast).join("<br />");
		this.answer = "True";
	    } else {
		this.answer = "False";
		switch (PLutils.getRnd(0,12)) {
		case 0:  // replace 'extends' with 'extend'
		    this.program = getSourceCode(ast).join("<br />")
			.replace(/extends/g,"extend");
		    break;
		case 1:  // replace 'method main' with 'void main'
		    this.program = getSourceCode(ast).join("<br />")
			.replace(/method main/g,"void main");
		    break;
		case 2:  // replace 'extends Object" with ""
		    this.program = getSourceCode(ast).join("<br />")
			.replace(/extends Object /g,"");
		    break;
		case 3:  // replace 'protected' with "int"
		    this.program = getSourceCode(ast).join("<br />")
			.replace(/protected/g,"int");
		    break;
		case 4:  // replace 'protected ' with ""
		    this.program = getSourceCode(ast).join("<br />")
			.replace(/protected /g,"");
		    break;
		case 5:  // insert instance var declaration before main
		    this.program = getSourceCode(ast);
		    this.program.splice(this.program.length-4, 0, 
					"  protected " + vNames[0]);
		    this.program = this.program.join("<br />");
		    break;
		case 6:  // insert instance var declaration inside main
		    this.program = getSourceCode(ast);
		    this.program.splice(this.program.length-3, 0, 
					"    protected " + vNames[0]);
		    this.program = this.program.join("<br />");
		    break;
		case 7:  // insert semi-colon in first/only statement in main
		    this.program = getSourceCode(ast);
		    this.program[this.program.length-3] += ";";
		    this.program = this.program.join("<br />");
		    break;
		case 8:  // rename Main to Driver
		    this.program = getSourceCode(ast).join("<br />")
		    .replace(/ Driver /g," Main ");
		    break;
		case 9:  // skip 'public' in main declaration
		    this.program = getSourceCode(ast).join("<br />")
		    .replace(/public /g,"");
		    break;
		case 10:  // insert 'public' in front of non-Driver classes
		    this.program = getSourceCode(ast).join("<br />")
			.replace(/class (..?) /g,"public class $1 ");
		    break;
		case 11:  // insert "return" in body of all methods
		    this.program = getSourceCode(ast).join("<br />");
		    // must have at least one method NOT in main
		    if (this.program.match(/method [^D]+ Driver/)) {
			    this.program = this.program
			    .replace(/(method [^\)]+\) { )/g,"$1return ");
		    } else {
			this.answer = "True";	
		    }
		    break;
		case 12:  // remove commas (if any) in method params
		    this.program = getSourceCode(ast).join("<br />");
		    // must have at least one method with 2 params
		    if (this.program.match(/,/)) {
			    this.program = this.program.replace(/,/g," ");
		    } else {
			this.answer = "True";	
		    }
		    break;
		}
	    }

	    //console.log(this.answer);
	}// init function
    };

    window.RP35part1 = window.RP35part1 || RP35part1;

}());


