/* global console, SLang, PLutils  */
(function() {
  "use strict";

    var RP25part1 = {    


	init: function() {
	    var SL = SLang;
	    var A = SL.absyn;
	    var E = SL.env;
	    var vs = "xyz";
	    var exp, expStr;
	    var value, valueDyn, rnd, done;
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


	    function getRandomAppExp(variables) {
		var n, i, fn, args, result;
		variables = vs.split("");
		PLutils.shuffle(variables);
		fn = A.createVarExp( variables[0] );
		args = [ "args", A.createVarExp( variables[1] ) ];
		if (A.getRnd(0,1)===0) {
		    args.push(A.createVarExp( variables[1] ));
		}
		return SL.absyn.createAppExp(fn,args);
	    }// getRandomFnApp


	    function getRndExpRP25part1() {
		// this function is identical to getRndExpRP22part2()
		// structure of exp: (fn(p1)=>(fn(p2)=>body args2) args)
		// p1 is 1 to 3 vars 
		// p2 is 1 to 2 vars such that p1 union p2 = {x,y,z}
		// body is a function application
		var i, index1, index2, rnd, value;
		var variables = vs.split("");
		var p1 = [], p2 = [], p1Length, p2Length;
		var args = ["args"],  args2 = ["args"];
		var exp, body =  getRandomAppExp();
		var funcVar = A.getVarExpId(A.getAppExpFn(body));
		var funcArity = A.getAppExpArgs(body).length;
		var funcIndex1, funcIndex2;
		var func3, p3 = [];

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

		// remember which parameter (either in p1 or p2) is bound to 
		// the function in the inner body
		funcIndex1 = p1.indexOf(funcVar);
		funcIndex2 = p2.indexOf(funcVar);

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
		    rnd = SL.absyn.getRnd(0,5);
		    switch (rnd) {
		    case 0: 
			args.push(SL.absyn.createVarExp(
			    variables[SL.absyn.getRnd(0,variables.length-1)]));
			break;
		    case 1:
			args.push(SL.absyn.createIntExp(
			    SL.absyn.getRnd(4,20)));
			break;
		    default:
			args.push(SL.absyn.createFnExp(
			    [ variables[SL.absyn.getRnd(0,
							variables.length-1)] ],
			    SL.absyn.createIntExp(SL.absyn.getRnd(0,10))
			));
			break;
		    }
		}

		// make sure that funcVar in body is bound to a function
		PLutils.shuffle(variables);
		for(i=0; i<funcArity ;i++) {
		    p3.push(variables[i]);
		}
		func3 = A.createFnExp(p3,
			      SL.absyn.createVarExp(
				  variables[SL.absyn.getRnd(
				      0,variables.length-1)]));
		

		if (funcIndex2 > -1) {
		    args2[1+funcIndex2] = func3;
		} else if (funcIndex1 > -1) {
		    args[1+funcIndex1] = func3;
		}

		exp = SL.absyn.createAppExp(
		    SL.absyn.createFnExp(
			p1,
			SL.absyn.createAppExp(
			    SL.absyn.createFnExp(p2,body),
			    args2)),
		    args);

		return exp;
	    }// getRndExpRP25part1 function

	    function getRndExp(min,max) {
		return SL.absyn.getProgramExp(
		    SL.absyn.generateRandomSLang1Program(
			0,min,max,"xyz",""));
	    }// getRndExp function

	    // convert two two applications to let expressions
	    function convertToLetExpressions(exp) {
		// exp always has the form:
		//     (fn(p1)=>(fn(p2)=>body args2) args1)
		var p1, p2, args1, args2, body;
		var letExp = [ "let" ];
		var i;
		var fn1 = A.getAppExpFn(exp);
		var fn1body = A.getFnExpBody(fn1);
		var fn2 = A.getAppExpFn(fn1body);
		p1 = A.getFnExpParams(fn1);
		p2 = A.getFnExpParams(fn2);		
		body = A.getFnExpBody(fn2);
		args1 = A.getAppExpArgs(exp);
		args2 = A.getAppExpArgs(fn1body);

		for(i=0; i<p1.length; i++) {
		    letExp.push("    " + p1[i] + " = " + SL.printExp(args1[i]));
		}
		letExp.push("in");
		letExp.push("    let");
		for(i=0; i<p2.length; i++) {
		    letExp.push("        " + p2[i] + " = " + 
				SL.printExp(args2[i]));
		}
		letExp.push("    in");
		letExp.push("        " + SL.printExp(body));
		letExp.push("    end");
		letExp.push("end");
		return letExp;
	    }// evalExpRP25part1

	    while (true) {
		exp = getRndExpRP25part1();
		expStr = SL.printExp(exp);
		if (expStr.length > 50) { continue; }
		value = null;
		try {
		    value = SL.evalExp(exp,globalEnv);
		    expStr = convertToLetExpressions(exp);
		} catch (e) {
		    //console.log("My exception: ",e);
		}
		if (value) {
		    break;
		}
	    }

	    this.expression = expStr.join("<br />");
	    this.answer = SL.printExp(exp);
	    
	    //console.log(value);
	},// init function

	validateAnswer: function (guess) {
	    return this.answer.replace(/\s+/g,"") ===
		guess.replace(/\s+/g,"");
	}// validateAnswer function
	
    };

    window.RP25part1 = window.RP25part1 || RP25part1;

}());


