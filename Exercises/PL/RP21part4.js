/* global console,  SLang, PLutils */
(function() {
  "use strict";

    var RP21part4 = {    


	init: function() {
	    var SL = SLang;
	    var A = SL.absyn;
	    var E = SL.env;
	    var vs = "xyz";
	    var exp, expStr;
	    var value, rnd, done;
	    var globalEnv = E.update(E.createEmptyEnv(),
				     ["x","y","z"],
				     [E.createNum(1),
				      E.createNum(2),
				      E.createNum(3)]);

	    function pickParams(variables) {
		var n, i, result = [];
		variables = variables.split("");
		PLutils.shuffle(variables);
		n = SL.absyn.getRnd(1,3);
		for(i=0; i< n; i++) {
		    result.push(variables[0]);
		    variables.splice(0,1);
		}
		return result;
	    }

	    function getRndExpRP21part4() {
		// structure of exp: (fn(p1)=>(fn(p2)=>body args2) args)
		// p1 is 1 to 3 vars and args is the same # of vars/ints
		// p2 is 1 to 2 vars such that p1 union p2 = {x,y,z}
                // the length of args2 is equal to the length of p2
		// body has depth 2 and only uses variables as leaves
		var i, index1, index2, rnd, value;
		var variables = vs.split("");
		var p1 = [], p2 = [], p1Length, p2Length;
		var args = ["args"],  args2 = ["args"];
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
		// build args2
		for(i=0; i < p2.length; i++) {
		    rnd = SL.absyn.getRnd(0,2);
		    switch (rnd) {
			case 0:  // a single variable
			args2.push(SL.absyn.createVarExp(
			    variables[SL.absyn.getRnd(0,variables.length-1)]));
			break;
			case 1:  // add1(<var>)
			args2.push(
			    SL.absyn.createPrimAppExp(
				"add1",
				[ SL.absyn.createVarExp(
				    variables[SL.absyn.getRnd(
					0,variables.length-1)]) ] ));
			break;
			case 2:  // +(<var>,<var>) or *(same)
			args2.push(
			    SL.absyn.createPrimAppExp(
				SL.absyn.getRnd(0,1)===0 ? "+" : "*",
				[ SL.absyn.createVarExp(
				    variables[SL.absyn.getRnd(
					0,variables.length-1)]),
				  SL.absyn.createVarExp(
				      variables[SL.absyn.getRnd(
					  0,variables.length-1)]) ] ));

			break;
		    }// switch
		}// for loop

		// build args
		for(i=0; i < p1.length; i++) {
		    rnd = SL.absyn.getRnd(0,2);
		    switch (rnd) {
		    case 0: 
			args.push(SL.absyn.createVarExp(
			    variables[SL.absyn.getRnd(0,variables.length-1)]));
			break;
		    case 1:
			args.push(SL.absyn.createIntExp(
			    SL.absyn.getRnd(4,20)));
			break;
		    case 2:
			args.push(SL.absyn.createFnExp(
			    [ variables[SL.absyn.getRnd(0,
							variables.length-1)] ],
			    SL.absyn.createIntExp(SL.absyn.getRnd(0,10))
			));
			break;
		    }
		}
		exp = SL.absyn.createAppExp(
		    SL.absyn.createFnExp(
			p1,
			SL.absyn.createAppExp(
			    SL.absyn.createFnExp(p2,getRndExp(0,2)),
			    args2)),
		    args);
		return exp;
	    }// getRndExp function

	    function getRndExp(min,max) {
		return SL.absyn.getProgramExp(
		    SL.absyn.generateRandomSLang1Program(
			0,min,max,"xyz",""));
	    }// getRndExp function
	    
	    rnd = A.getRnd(0,3);
	    if (rnd === 0) {
		// we want the value to be "error"
		while (true) {
		    exp = getRndExpRP21part4();
		    expStr = SL.printExp(exp);
		    if (expStr.length > 50) { continue; }
		    try {
			// eval just to make sure that the whole exp has a value
			SL.evalExp(exp,globalEnv);
		    } catch (e) {
			value = "error";			
			break;
		    }
		}
	    } else {
		// we want the value to be an int or a closure
		while (true) {
		    exp = getRndExpRP21part4();
		    expStr = SL.printExp(exp);
		    done = true;
		    if (expStr.length > 50) { continue; }
		    try {
			// eval just to make sure that the whole exp has a value
			value = SL.evalExp(exp,globalEnv);
		    } catch (e) {
			done = false;
		    }
		    if (done) {
			value = E.isNum(value) ?
			    (E.getNumValue(value) + "") : 
			    "closure";
			break;
		    }
		}// while (true)
	    }// else
	    this.expression = SL.printExp(exp);
	    this.answer = value;
	    //console.log("answer = " ,this.answer);
	},// init function

	validateAnswer: function (studentAnswer) {
	    return this.answer.replace(/\s+/g,"") ===
		studentAnswer.replace(/\s+/g,"");
	}// validateAnswer function

    };

    window.RP21part4 = window.RP21part4 || RP21part4;

}());


