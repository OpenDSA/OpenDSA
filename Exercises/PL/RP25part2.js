/* global console, SLang, PLutils  */
(function() {
  "use strict";

    var RP25part2 = {    

	init: function() {
	    var SL = SLang;
	    var A = SL.absyn;
	    var E = SL.env;
	    var vs = "xyz";
	    var exp, expStr;
	    var value, rnd;
	    var globalEnv = E.update(E.createEmptyEnv(),
				     ["x","y","z"],
				     [E.createNum(1),
				      E.createNum(2),
				      E.createNum(3)]);

	    function pickParams(variables,num) {
		var n, i, result = [];
		variables = variables.split("");
		PLutils.shuffle(variables);
		n = num || A.getRnd(1,3);
		for(i=0; i< n; i++) {
		    result.push(variables[0]);
		    variables.splice(0,1);
		}
		return result;
	    }// pickParams function

	    function getRandomArgs(vs,params,type) {
		var i, args = [ ];
		var num = params.length;

		for(i=0; i < num; i++) {
		    if (type === "integer") {
			args.push(A.createIntExp(A.getRnd(4,20)));
		    } else {
			args.push( getRandomPrimApp(vs));
		    }
		}// for loop
		return args;
	    }// getRandomArgs function

	    function getRandomPrimApp(variables) {
		// assumes that variables.length >= 2
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
		return body;
	    }// getRandomPrimApp function

	    function getRndExpRP25part2() {
		// this function is identical to getRndExpRP22part2()
		// structure of exp: 
		//     (fn(p1)=>(fn(p2)=>body args2) args1)
		// p1 is 1 to 3 vars 
		// p2 is 1 to 2 vars
		// args1 is a list of integers
		// args1 is a list of prim_app_exp
		// body is a prim_app_exp
		var p1, p2, args1 = ["args"], args2 = ["args"], body;
		p1 = pickParams(vs);
		p2 = pickParams(vs,2);
		args1 = getRandomArgs(vs,p1,"integer");
		args2 = getRandomArgs(vs,p2,"prim_app");
		args1.unshift("args");
		args2.unshift("args");		
		body =  getRandomPrimApp(vs);

		return A.createAppExp(A.createFnExp( p1,
						     A.createAppExp(
							 A.createFnExp(p2,
								       body),
							 args2)),
				      args1);
	    }// getRndExpRP25part2 function
	    
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
		exp = getRndExpRP25part2();
		expStr = SL.printExp(exp);
		if (expStr.length > 150) { continue; }
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

    window.RP25part2 = window.RP25part2 || RP25part2;

}());


