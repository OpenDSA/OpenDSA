/* global console,  SLang */
(function() {
  "use strict";

    var RP22part1 = {    


	init: function() {
	    var SL = SLang;
	    var vs = "xyz";
	    var maxDepth = 5;
	    var minDepth = 4;
	    var exp, expStr;
	    var ast, value, done;
	    var E = SL.env;
	    var globalEnv = E.update(E.createEmptyEnv(),["x","y","z"],[1,2,3]);
	    var valueType = SL.absyn.getRnd(0,1) === 0 ? "integer" : "closure";
	    valueType = "closure";

	    function pickParams(variables) {
		var n, result = [];
		variables = variables.split("");
		PLutils.shuffle(variables);
		n = SL.absyn.getRnd(1,3);
		for(i=0; i< n; i++) {
		    result.push(variables[0]);
		    variables.splice(0,1);
		}
		return result;
	    }

	    function getRndExpTmp() {
		//  structure of exp: (fn(p1)=>(fn(p2)=>body args2) args)
		// p1 is 1 to 3 vars and args is the same # of vars/ints
		// p2 is 1 to 2 vars such that p1 union p2 = {x,y,z}
                // the length of args2 is equal to the length of p2
		// body has depth 2 and only uses variables as leaves
		var i, index1, index2, rnd;
		var variables = vs.split("");
		var p1 = [], p2 = [], p1Length, p2Length, args, args, args2;
		var exp, body = SL.absyn.getProgramExp(
		    SL.absyn.generateRandomSLang1Program(
			0,2,2,"xyz",""));
		p1 = pickParams(vs);
		p2 = pickParams(vs);
		// make sure all variables appear in p1 union p2
		for(i=0; i<variables.length; i++) {
		    index1 = p1.indexOf(variables[i]);
		    index2 = p2.indexOf(variables[i]);
		    if (index1 === -1 && index2 === -1) {
			rnd = SL.absyn.getRnd(0,10);
			if (rnd===1) {
			    if (index1===-1) {
				p1.push(variables[i]);
			    } else {
				p2.push(variables[i]);
			    }
			} else {
			    if (index2===-1) {
				p2.push(variables[i]);
			    } else {
				p1.push(variables[i]);
			    }
			}
		    }
		}

		exp = SL.absyn.createAppExp(
		    SL.absyn.createFnExp(
			p1,SL.absyn.createFnExp(p2,getRndExp()),

		); // createAppExp
		
//		expStr = SL.printExp(exp);
//		while (expStr.length < 10 ||  expStr.length>50) {

		return exp;
	    }// getRndExp function
*/
	    }
	    function correctType(value) {
		return (valueType === "integer" && E.isNum(value)) ||
		    (valueType === "closure" && E.isClo(value));
	    }

	    function containsVar(expStr) {
		expStr = expStr.replace(/fn\([xyz,]*\)=>/g,"");
		return expStr.indexOf("x")  > -1 ||
		     expStr.indexOf("y")  > -1 ||
		    expStr.indexOf("y")  > -1 ;
	    }

	    function getRndExp() {
		var exp = SL.absyn.getProgramExp(
		    SL.absyn.generateRandomSLang1Program(
			0,4,7,"xyz",""));
		expStr = SL.printExp(exp);
		while (expStr.length < 10 ||  expStr.length>50) {
		    exp = SL.absyn.getProgramExp(
			SL.absyn.generateRandomSLang1Program(
			    0,4,7,"xyz",""));
		    expStr = SL.printExp(exp);
		}
		return exp;
	    }// getRndExp function
	    
	    console.log( getRndExpTmp());

	    while (true) {
		exp = getRndExp();
		done = true;
		try {
		    //console.log(exp)
		    ast = parser.parse(SL.printExp(exp));
		    value = SL.evalExp(exp,globalEnv);
		    //console.log(JSON.stringify(value));
		} catch (e) {
		    //console.log("here: ", e);
		    done = false;
		}
		if (done) {
		    if (correctType(value) && containsVar(SL.printExp(exp))) {
			break;
		    }
		}
		//console.log("try again");
	    }

	    this.expression = SL.printExp(exp);
	    this.answer = "correct";
	}// init function
    };

    window.RP22part1 = window.RP22part1 || RP22part1;

}());


