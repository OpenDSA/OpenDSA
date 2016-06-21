/* global console, SLang, PLutils  */
(function() {
  "use strict";

    var RP25part3 = {    


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
		n = A.getRnd(1,3);
		for(i=0; i< n; i++) {
		    result.push(variables[0]);
		    variables.splice(0,1);
		}
		return result;
	    }


	    function getRandomAppExp(variables,type) {
		var n, i, f, f2, args, result, rnd;
		variables = vs.split("");
		PLutils.shuffle(variables);
		f = A.createVarExp( variables[0] );
		args = [ "args", A.createVarExp( variables[1] ) ];

		if (type === 0) {
		   // (f v) or (f v1 v2)
		    if (A.getRnd(0,1)===0) {
			args.push(A.createVarExp( variables[2] ));
		    }
		    return A.createAppExp(f,args);
		} else {
		   // (f (f2 v)) or (f (f2 n))
		    return A.createAppExp(
			f,
			["args",
			 A.createAppExp( 
			     A.createVarExp( variables[2] ),
			     // 3 times more likely to be a small int than a var
			     A.getRnd(0,3) === 0 ? args :
				 ["args",A.createIntExp(A.getRnd(1,10))])]);
		}

	    }// getRandomFnApp

	    function getRandomArgs(variables,params) {
		var i, rnd, args = [ ];
		var num = params.length;
		variables = variables.split("");
		PLutils.shuffle(variables);
		// build args2
		for(i=0; i < num; i++) {
		    rnd = A.getRnd(0,5);
		    switch (rnd) {
		    case 0:
			args.push(A.createIntExp(A.getRnd(4,20)));
			break;
		    case 1:  // a single variable different from corresponding
			// param
			rnd = A.getRnd(0,variables.length-1);
			if (variables[rnd] === params[i]) {
			    rnd = (rnd + 1) % variables.length;
			}
			args.push(A.createVarExp(variables[rnd]));
			break;
		    case 2, 3:  // add1(<var>)
			args.push(
			    A.createPrimAppExp(
				"add1",
				[ A.createVarExp(
				    variables[A.getRnd(
					0,variables.length-1)]) ] ));
			break;
		    default:  // +(<var>,<var>) or *(<var>,<var>)
			args.push(
			    A.createPrimAppExp(
				A.getRnd(0,1)===0 ? "+" : "*",
				[ A.createVarExp(
				    variables[A.getRnd(
					0,variables.length-1)]),
				  A.createVarExp(
				      variables[A.getRnd(
					  0,variables.length-1)]) ] ));
			break;
		    }// switch
		}// for loop

		return args;

	    }// getRandomArgs function

	    function getRandomFunction(variables,numParams) {
		// assumes that variables.length >= 2
		var i, params = [];
		var v = variables.split("");
		PLutils.shuffle(v);
		var body;
		var incr = A.createPrimAppExp("add1",[A.createVarExp(v[0])]);
		var addition1 = A.createPrimAppExp("+",
						   [ A.createVarExp(v[0]),
						     A.createVarExp(v[1])]);
		var addition2 = A.createPrimAppExp("+",
		   [ A.createIntExp(A.getRnd(3,10)), A.createVarExp(v[2])]);
		var addition3 = A.createPrimAppExp("+",
		   [ A.createVarExp(v[1]), A.createIntExp(A.getRnd(3,10)), ]);
		var mult1 = A.createPrimAppExp("*",
					       [ A.createVarExp(v[0]),
						 A.createVarExp(v[1])]);
		var mult2 = A.createPrimAppExp("*",
  	           [ A.createIntExp(A.getRnd(3,10)), A.createVarExp(v[2])]);
		var mult3 = A.createPrimAppExp("*",
		   [ A.createVarExp(v[1]), A.createIntExp(A.getRnd(3,10)), ]);
		for(i=0; i<numParams; i++) {
		    params.push( v[i] );
		}
		PLutils.shuffle(v);
		switch (A.getRnd(0,22)) {
		case 0: body = incr; break;
		case 1: body = addition1; break;
		case 2: body = addition2; break;
		case 3: body = addition3; break;
		case 4: body = mult1; break;
		case 5: body = mult2; break;
		case 6: body = mult3; break;
		case 7: body = A.createPrimAppExp("+", 
				[ A.createVarExp(v[0]), mult1 ]);
		    break;
		case 8: body = A.createPrimAppExp("+", 
				[ A.createVarExp(v[0]), mult2 ]);
		    break;
		case 9: body = A.createPrimAppExp("+", 
				[ A.createVarExp(v[0]), mult3 ]);
		    break;
		case 10: body = A.createPrimAppExp("+", 
				[ mult1, A.createVarExp(v[0]) ]);
		    break;
		case 11: body = A.createPrimAppExp("+", 
				[ mult2, A.createVarExp(v[0]) ]);
		    break;
		case 12: body = A.createPrimAppExp("+", 
				[ mult3, A.createVarExp(v[0]) ]);
		    break;
		case 13: body = A.createPrimAppExp("+", 
			[ incr, A.createVarExp(v[0]) ]);		  
		    break;
		case 14: body = A.createPrimAppExp("+", 
			[ A.createVarExp(v[0]), incr ]);		  
		    break;
		case 15: body = A.createPrimAppExp("*", 
			[ incr, A.createVarExp(v[0]) ]);		  
		    break;
		case 16: body = A.createPrimAppExp("*", 
			[ A.createVarExp(v[0]), incr ]);		  
		    break;
		case 17: body = A.createPrimAppExp("*", 
			[ A.createVarExp(v[0]), addition1 ]);		  
		    break;
		case 18: body = A.createPrimAppExp("*", 
			[ A.createVarExp(v[0]), addition2 ]);		  
		    break;
		case 19: body = A.createPrimAppExp("*", 
			[ A.createVarExp(v[0]), addition3 ]);		  
		    break;
		case 20: body = A.createPrimAppExp("*", 
			[ addition1, A.createVarExp(v[0]) ]);		  
		    break;
		case 21: body = A.createPrimAppExp("*", 
			[ addition2, A.createVarExp(v[0]) ]);		  
		    break;
		case 22: body = A.createPrimAppExp("*", 
			[ addition3, A.createVarExp(v[0]) ]);		  
		    break;
		}

		return A.createFnExp(params,body);
	    }// getRandomFunction function

	    function getRndExpRP25part3() {
		// this function is identical to getRndExpRP22part2()
		// structure of exp: 
		//     (fn(p1)=>(fn(p2)=>(fn(p3)=>body args3) args2) args1)
		// p1 is 1 to 3 vars 
		// p2 is 1 to 2 vars such that p1 union p2 = {x,y,z}
		// body is a function application
		var i, index, rnd, value;
		var variables = vs.split("");
		var p1, p2, p3;
		var args1 = ["args"], args2 = ["args"], args3 = ["args"];
		var exp, body;
		var funcVar, funcVar2, funcArity, funcArity2, funcIndex;
		p1 = pickParams(vs);
		p2 = pickParams(vs);
		p3 = pickParams(vs);
		args1 = getRandomArgs(vs,p1);
		args2 = getRandomArgs(vs,p2);
		args3 = getRandomArgs(vs,p3);

		rnd = A.getRnd(0,1);
		if (rnd === 0) {
		    //********************************************************
		    // case 1: body is of the form (funcVar x) or (funcVar x y)

		    body =  getRandomAppExp(vs,0);
		    funcVar = A.getVarExpId(A.getAppExpFn(body));
		    funcArity = A.getAppExpArgs(body).length;		
		    
		    // make sure that funcVar is bound to a function
		    // with the approriate arity
		    funcIndex = p3.indexOf(funcVar);
		    if (funcIndex > -1) {
			funcVar = p3[funcIndex];
			args3[funcIndex] = getRandomFunction(vs,funcArity);
		    } else {
			funcIndex = p2.indexOf(funcVar);
			if (funcIndex > -1) {
			    funcVar = p2[funcIndex];
			    args2[funcIndex] = getRandomFunction(vs,funcArity);
			} else {
			    funcIndex = p1.indexOf(funcVar);
			    if (funcIndex > -1) {
				funcVar = p1[funcIndex];
				args1[funcIndex] = 
				    getRandomFunction(vs,funcArity);
			    } else {
				// add funcVar to p1
				index = A.getRnd(0,p1.length);
				p1[index] = funcVar;
				args1[index] = getRandomFunction(vs,funcArity);
			    }
			}
		    }
		    
		}// end of case 1
		else {
		    //********************************************************
		    // case 2: body is of the form (funcVar (funcVar2 v))

		    body =  getRandomAppExp(vs,1);
		    funcVar = A.getVarExpId(A.getAppExpFn(body));
		    funcVar2 = A.getVarExpId(
			A.getAppExpFn(A.getAppExpArgs(body)[0]));
		    funcArity = funcArity2 = 1;

		    // make sure that funcVar is bound to a function
		    // with the approriate arity
		    funcIndex = p3.indexOf(funcVar);
		    if (funcIndex > -1) {
			funcVar = p3[funcIndex];
			args3[funcIndex] = getRandomFunction(vs,funcArity);
		    } else {
			funcIndex = p2.indexOf(funcVar);
			if (funcIndex > -1) {
			    funcVar = p2[funcIndex];
			    args2[funcIndex] = getRandomFunction(vs,funcArity);
			} else {
			    funcIndex = p1.indexOf(funcVar);
			    if (funcIndex > -1) {
				funcVar = p1[funcIndex];
				args1[funcIndex] = 
				    getRandomFunction(vs,funcArity);
			    } else {
				// add funcVar to p1
				index = A.getRnd(0,p1.length);
				p1[index] = funcVar;
				args1[index] = getRandomFunction(vs,funcArity);
			    }
			}
		    }
		    
		    // make sure that funcVar2 is bound to a function
		    // with the approriate arity
		    funcIndex = p3.indexOf(funcVar2);
		    if (funcIndex > -1) {
			funcVar2 = p3[funcIndex];
			args3[funcIndex] = getRandomFunction(vs,funcArity2);
		    } else {
			funcIndex = p2.indexOf(funcVar2);
			if (funcIndex > -1) {
			    funcVar2 = p2[funcIndex];
			    args2[funcIndex] = getRandomFunction(vs,funcArity2);
			} else {
			    funcIndex = p1.indexOf(funcVar2);
			    if (funcIndex > -1) {
				funcVar2 = p1[funcIndex];
				args1[funcIndex] = 
				    getRandomFunction(vs,funcArity2);
			    } else {
				// add funcVar to p1
				index = A.getRnd(0,p1.length);
				p1[index] = funcVar2;
				args1[index] = getRandomFunction(vs,funcArity2);
			    }
			}
		    }
		    
		}// end of case 2

		args1.unshift("args");
		args2.unshift("args");
		args3.unshift("args");

		// build the expression with the following format
		//     (fn(p1)=>(fn(p2)=>(fn(p3)=>body args3) args2) args1)
		return A.createAppExp(
		    A.createFnExp( p1,
				   A.createAppExp(
				       A.createFnExp(p2,
						     A.createAppExp(
							 A.createFnExp(p3,
								       body),
							 args3)),
				       args2)),
		    args1);
	    }// getRndExpRP25part3 function
	    
	    function getRndExp(min,max) {
		return A.getProgramExp(
		    A.generateRandomSLang1Program(
			0,min,max,"xyz",""));
	    }// getRndExp function

	    // convert two two applictions to let expressions
	    function convertToLetExpressions(exp) {
		var letExp = [ "let" ];
		// exp always has the form:
		//     (fn(p1)=>(fn(p2)=>(fn(p3)=>body args3) args2) args1)
		var i;
		var fn1 = A.getAppExpFn(exp);
		var args1 = A.getAppExpArgs(exp);
		var p1 = A.getFnExpParams(fn1);
		var fn1body = A.getFnExpBody(fn1);
		var fn2 = A.getAppExpFn(fn1body);
		var args2 = A.getAppExpArgs(fn1body);
		var p2 = A.getFnExpParams(fn2);
		var fn2body = A.getFnExpBody(fn2);
		var fn3 = A.getAppExpFn(fn2body);
		var args3 = A.getAppExpArgs(fn2body);
		var p3 = A.getFnExpParams(fn3);
		var body = A.getFnExpBody(fn3);

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
		letExp.push("        let");
		for(i=0; i<p3.length; i++) {
		    letExp.push("            " + p3[i] + " = " + 
				SL.printExp(args3[i]));
		}
		letExp.push("        in");
		letExp.push("            " + SL.printExp(body));
		letExp.push("        end");
		letExp.push("    end");
		letExp.push("end");

		return letExp;
	    }// evalExpRP25part3

	    while (true) {
		exp = getRndExpRP25part3();
		expStr = SL.printExp(exp);
		if (expStr.length > 200) { continue; }
		value = null;
		try {
		    value = SL.evalExp(exp,globalEnv);
		    expStr = convertToLetExpressions(exp);
		} catch (e) {
		    //console.log("********************* My exception: ",e);
		}
		if (value && E.isNum(value) && 
		    E.getNumValue(value) < 150) {		    
		    break;
		}
	    }// while loop

	    this.expression = expStr.join("<br />");
	    this.answer = JSON.stringify(value);
	    
	    //console.log(this.answer);
	},// init function

	validateAnswer: function (guess) {
	    return this.answer.replace(/\s+/g,"") ===
		guess.replace(/\s+/g,"");
	}// validateAnswer function
	
    };

    window.RP25part3 = window.RP25part3 || RP25part3;

}());


