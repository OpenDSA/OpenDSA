/* global console, SLang, PLutils  */
(function() {
  "use strict";

    var RP28part2 = {    


	init: function() {
	    var SL = SLang;
	    var A = SL.absyn;
	    var E = SL.env;
	    var vs = "xyz";	    
	    var fs = "fgh";
	    var exp, expStr;
	    var value, value2, rnd, iterations;
	    var globalEnv = E.update(E.createEmptyEnv(),
				     ["x","y","z"],
				     [E.createNum(1),
				      E.createNum(2),
				      E.createNum(3)]);

	    function headsOrTails() {
		return A.getRnd(0,1)===0;
	    }

	    function getRandomPrimApp(variables) {
		// assumes that variables.length >= 2
		var v = variables.split("");
		PLutils.shuffle(v);
		var body;
		var incr = A.createPrimApp1Exp("add1",A.createVarExp(v[0]));
		var addition1 = A.createPrimApp2Exp(headsOrTails() ? "+" : "-",
						    A.createVarExp(v[0]),
						     A.createVarExp(v[1]));
		var addition2 = A.createPrimApp2Exp(headsOrTails() ? "+" : "-",
		    A.createIntExp(A.getRnd(3,10)), A.createVarExp(v[2]));
		var addition3 = A.createPrimApp2Exp(headsOrTails() ? "+" : "-",
		    A.createVarExp(v[1]), A.createIntExp(A.getRnd(3,10)));
		var mult1 = A.createPrimApp2Exp("*",
					         A.createVarExp(v[0]),
						 A.createVarExp(v[1]));
		var mult2 = A.createPrimApp2Exp("*",
  	            A.createIntExp(A.getRnd(3,10)), A.createVarExp(v[2]));
		var mult3 = A.createPrimApp2Exp("*",
		    A.createVarExp(v[1]), A.createIntExp(A.getRnd(3,10)));

		PLutils.shuffle(v);
		switch (A.getRnd(0,22)) {
		case 0: body = incr; break;
		case 1: body = addition1; break;
		case 2: body = addition2; break;
		case 3: body = addition3; break;
		case 4: body = mult1; break;
		case 5: body = mult2; break;
		case 6: body = mult3; break;
		case 7: body = A.createPrimApp2Exp(headsOrTails() ? "+" : "-",
				A.createVarExp(v[0]), mult1 );
		    break;
		case 8: body = A.createPrimApp2Exp(headsOrTails() ? "+" : "-",
				 A.createVarExp(v[0]), mult2 );
		    break;
		case 9: body = A.createPrimApp2Exp(headsOrTails() ? "+" : "-",
				 A.createVarExp(v[0]), mult3 );
		    break;
		case 10: body = A.createPrimApp2Exp(headsOrTails() ? "+" : "-",
				 mult1, A.createVarExp(v[0]) );
		    break;
		case 11: body = A.createPrimApp2Exp(headsOrTails() ? "+" : "-",
				 mult2, A.createVarExp(v[0]) );
		    break;
		case 12: body = A.createPrimApp2Exp(headsOrTails() ? "+" : "-",
				 mult3, A.createVarExp(v[0]) );
		    break;
		case 13: body = A.createPrimApp2Exp(headsOrTails() ? "+" : "-",
			 incr, A.createVarExp(v[0]) );		  
		    break;
		case 14: body = A.createPrimApp2Exp(headsOrTails() ? "+" : "-",
			 A.createVarExp(v[0]), incr );		  
		    break;
		case 15: body = A.createPrimApp2Exp("*", 
			 incr, A.createVarExp(v[0]) );		  
		    break;
		case 16: body = A.createPrimApp2Exp("*", 
			 A.createVarExp(v[0]), incr );		  
		    break;
		case 17: body = A.createPrimApp2Exp("*", 
			 A.createVarExp(v[0]), addition1 );		  
		    break;
		case 18: body = A.createPrimApp2Exp("*", 
			 A.createVarExp(v[0]), addition2 );		  
		    break;
		case 19: body = A.createPrimApp2Exp("*", 
			 A.createVarExp(v[0]), addition3 );		  
		    break;
		case 20: body = A.createPrimApp2Exp("*", 
			 addition1, A.createVarExp(v[0]) );		  
		    break;
		case 21: body = A.createPrimApp2Exp("*", 
			 addition2, A.createVarExp(v[0]) );		  
		    break;
		case 22: body = A.createPrimApp2Exp("*", 
			 addition3, A.createVarExp(v[0]) );		  
		    break;
		}
		return body;
	    }// getRandomPrimApp function

	    function getRandomAssignment() {
		// returns: 
		//      a_or_b = random_func_of_a_and_b
		//
		var LHS = headsOrTails() ? "a" : "b";
		var RHS;
		// in order to not have to change the original function
		// from which getRandomPrimApp was copied, which uses 3
		// vars, even though we have only tw vars (a and b)...
		RHS = headsOrTails() ? 
		    getRandomPrimApp("aba") :
		    getRandomPrimApp("abb");
		return A.createAssignExp(LHS,RHS);
	    }

	    function getRandomBody() {
		// returns: between 3 and 5 copies of the following
		//      a_or_b = random_func_of_a_and_b
		//
		var body = [ ];
		var i, rnd = A.getRnd(3,5);
		var aModified = false, bModified = false; 
		var assignment;
		for(i=0; i<rnd; i++) {
		    assignment = getRandomAssignment();
		    body.push( assignment );
		    if (A.getAssignExpVar(assignment) === "a") {
			aModified = true;
		    } else {
			bModified = true;
		    }
		}
		if (! aModified) {
		    while (true) {
			assignment = getRandomAssignment();
			if (A.getAssignExpVar(assignment) === "a") {
			    break;
			}
		    }
		    body[ A.getRnd(0,body.length) ] = assignment;
		}
		if (! bModified) {
		    while (true) {
			assignment = getRandomAssignment();
			if (A.getAssignExpVar(assignment) === "b") {
			    break;
			}
		    }
		    body[ A.getRnd(0,body.length) ] = assignment;
		}
		return body;
	    }

	    function assignmentToCppSyntax(assignment) {

		function isAtomic(exp) {
		    return A.isIntExp(exp) || A.isVarExp(exp);
		}
		function arithmeticToString(exp) {
		    var op, left, right;
		    if (A.isIntExp(exp)) {
			return A.getIntExpValue(exp) + "";
		    } else if (A.isVarExp(exp)) {
			return A.getVarExpId(exp);
		    } else if (A.isPrimApp2Exp(exp)) {
			op = A.getPrimApp2ExpPrim(exp);
			left = A.getPrimApp2ExpArg1(exp);
			right = A.getPrimApp2ExpArg2(exp);
			if (isAtomic(left)) {
			    if (isAtomic(right)) {
				return arithmeticToString(left) + op + 
				    arithmeticToString(right);
			    } else {
				return arithmeticToString(left) + op + 
				    "(" + arithmeticToString(right) +")";
			    }
			} else {
			    if (isAtomic(right)) {
				return "(" + arithmeticToString(left) + ")" + op + 
				    arithmeticToString(right);
			    } else {
				return "(" + arithmeticToString(left) + ")"+ op + 
				    "(" + arithmeticToString(right) +")";
			    }
			}
		    } else {
			// add1 case
			return arithmeticToString(A.getPrimApp1ExpArg(exp)) + "+1";
		    }		    
		}
		var LHS = A.getAssignExpVar(assignment);
		return   "  " + LHS + " = " + arithmeticToString(A.getAssignExpRHS(assignment));

	    }
	    function convertToCppSyntax(exp) {
		var xVal = A.getIntExpValue( A.getAppExpArgs(exp)[0] );
		var yVal = A.getIntExpValue( A.getAppExpArgs(exp)[1] );
		var body = A.getFnExpBody( A.getAppExpArgs(exp)[2] );
		var i;
		var code = [ 
		    "#include &lt;iostream&gt;", 
		    "using namespace std;",
		    "",
		    "void by_value(int a, int b)  {"];
		var shared = [];
		for(i = 0; i<body.length; i++) {
		    shared.push( assignmentToCppSyntax(body[i]) + ";" );
		}
		code = code.concat(shared);
		code.push( "}" );
		code.push( "void by_reference(int &a, int &b) {" );
		code = code.concat(shared);
		code.push( "}" );
		code.push( "" );
		code.push("int main() {");
		code.push("  int x,y;");
		code.push("  x = " + xVal + "; y = " + yVal + ";");


		code.push("  by_value(" + exp.v1 + "," + exp.v2 + ");");
		if (exp.v1 === exp.v2) {
		    code.push("  cout &lt;&lt; " + exp.v1 + " &lt;&lt; endl;");
		} else {
		    code.push("  cout &lt;&lt; x &lt;&lt; endl &lt;&lt; y &lt;&lt; endl;");
		}
		code.push(" ");
		code.push("  x = " + xVal + "; y = " + yVal + ";");
		code.push("  by_reference(" + exp.v1 + "," + exp.v2 + ");");
		if (exp.v1 === exp.v2) {
		    code.push("  cout &lt;&lt; " + exp.v1 + " &lt;&lt; endl;");
		} else {
		    code.push("  cout &lt;&lt; x &lt;&lt; endl &lt;&lt; y &lt;&lt; endl;");
		}
		code.push( "}" );
		
		return code;
	    }
	    function getRndExpRP28part2() {
		// structure of exp: 
		//  let x =<int> y = <int>
		//      f = fn (a,b) => let notUsed=-1 in  body1 end
                //  in
		//     (f x y);  // this is body below
		//     print x;		
		//     print y
		//  end
		// that is:
		// (fn (x,y,f) =>(fn(_)=>body -1)  <int> <int> fn(a,b)=>body1 )
		// where body = (f v1 v2); print v1; print v2
		// or    body = (f v v); print v
		// and body assigns a and b using between 2 and 4 assignments
		var xVal = A.getRnd(4,10);
		var yVal = A.getRnd(4,10);
		var innerApp, innerFunc, body = [], args;
		var fVarExp = A.createVarExp("f");
		var v1 = headsOrTails() ? "x" : "y";
		var v2 = headsOrTails() ? "x" : "y";
		var v1VarExp = A.createVarExp(v1);
		var v2VarExp = A.createVarExp(v2);
		var output;
		body.push(A.createAppExp(fVarExp,["args",v1VarExp,v2VarExp]));
		if (v1 !== v2) {
		    body.push(A.createPrintExp(A.createVarExp("x")));
		    body.push(A.createPrintExp(A.createVarExp("y")));
		} else {
		    body.push(A.createPrintExp(v1VarExp));
		}
		innerFunc = A.createFnExp(["notUsed"],body);
		innerApp = A.createAppExp(innerFunc,
					  ["args",A.createIntExp(-1)]);
		innerApp.comesFromLetBlock = true; // to avoid call by ref
		args = ["args", A.createIntExp(xVal),A.createIntExp(yVal)];
		args.push( A.createFnExp(["a","b"], getRandomBody() ) );
		output= SL.absyn.createAppExp( 
		    SL.absyn.createFnExp(["x","y","f"],[ innerApp ]),
		    args);
		output.comesFromLetBlock = true; // to avoid call by ref
		output.v1 = v1;		
		output.v2 = v2;
		return output;
	    }// getRndExpRP28part2 function

	    function callByValueRP28part2(exp,envir) {
		var f = evalExpRP28part2(A.getAppExpFn(exp),envir);
		var args = evalExpsRP28part2(A.getAppExpArgs(exp),envir);
		if (E.isClo(f)) {
		    if (E.getCloParams(f).length !== args.length) {		
			throw new Error("Runtime error: wrong number of arguments in " +
					"a function call (" + E.getCloParams(f).length +
					" expected but " + args.length + " given)");
		    } else {
			var values = evalExpsRP28part2(E.getCloBody(f),
					      E.update(E.getCloEnv(f),
						       E.getCloParams(f),args));
			return values[values.length-1];
		    }
		} else {
		    throw f + " is not a closure and thus cannot be applied.";
		}    
	    }

	    function callByReferenceRP28part2(exp,envir) {
		var f = evalExpRP28part2(A.getAppExpFn(exp),envir);
		var args = A.getAppExpArgs(exp).map( function (arg) {
		    if (A.isVarExp(arg)) {
			return E.lookupReference(envir,A.getVarExpId(arg));
		    } else {
			throw new Error("The arguments of a function called by-ref must all be variables.");
		    }
		} );
		if (E.isClo(f)) {
		    if (E.getCloParams(f).length !== args.length) {		
			throw new Error("Runtime error: wrong number of arguments in " +
					"a function call (" + E.getCloParams(f).length +
					" expected but " + args.length + " given)");
		    } else {
			var values = evalExpsRP28part2(E.getCloBody(f),
					      E.updateWithReferences(
						  E.getCloEnv(f),
						  E.getCloParams(f),args));
			return values[values.length-1];
		    }
		} else {
		    throw new Error(f + " is not a closure and thus cannot be applied.");
		}    
	    }

	    function evalExpsRP28part2(list,envir) {
		return list.map( function(e) { return evalExpRP28part2(e,envir); } );
	    }



	    function evalExpRP28part2(exp,envir) {
		if (A.isIntExp(exp)) {
		    return E.createNum(A.getIntExpValue(exp));
		}
		else if (A.isVarExp(exp)) {
		    return E.lookup(envir,A.getVarExpId(exp));
		} else if (A.isPrintExp(exp)) {
		    SL.output += JSON.stringify(
			evalExpRP28part2( A.getPrintExpExp(exp), envir ));
		} else if (A.isPrint2Exp(exp)) {
		    SL.output += A.getPrint2ExpString(exp) +
				 (A.getPrint2ExpExp(exp) !== null ?
				  " " + JSON.stringify( evalExpRP28part2( A.getPrint2ExpExp(exp), 
								 envir ) )
				  : "");
		} else if (A.isAssignExp(exp)) {
		    var v = evalExpRP28part2(A.getAssignExpRHS(exp),envir);
		    E.lookupReference(
                        envir,A.getAssignExpVar(exp))[0] = v;
		    return v;
		} else if (A.isFnExp(exp)) {
		    return E.createClo(A.getFnExpParams(exp),
				       A.getFnExpBody(exp),envir);
		}
		else if (A.isAppExp(exp)) {
		    if (exp.comesFromLetBlock) {
			return callByValueRP28part2(exp,envir);
		    } else {
			switch (SL.ppm) {
			case "byval" : return callByValueRP28part2(exp,envir);
			case "byref" : return callByReferenceRP28part2(exp,envir);
			}
		    }
		} else if (A.isPrimApp1Exp(exp)) {
		    return SL.applyPrimitive(A.getPrimApp1ExpPrim(exp),
					     [evalExpRP28part2(A.getPrimApp1ExpArg(exp),envir)]);
		} else if (A.isPrimApp2Exp(exp)) {
		    return SL.applyPrimitive(A.getPrimApp2ExpPrim(exp),
					     [evalExpRP28part2(A.getPrimApp2ExpArg1(exp),envir),
					      evalExpRP28part2(A.getPrimApp2ExpArg2(exp),envir)]);
		} else if (A.isIfExp(exp)) {
		    if (E.getBoolValue(evalExpRP28part2(A.getIfExpCond(exp),envir))) {
			return evalExpRP28part2(A.getIfExpThen(exp),envir);
		    } else {
			return evalExpRP28part2(A.getIfExpElse(exp),envir);
		    }
		} else {
		    throw "Error: Attempting to evaluate an invalid expression";
		}
	    }// evalExpRP28part2 function

	    iterations = 0;
	    while(true) {
		exp = undefined;
		iterations++;
		exp = getRndExpRP28part2();
		expStr =  convertToCppSyntax(exp);
		value = null;
		try {
		    expStr = undefined;
		    SL.output = "";
		    SL.ppm = "byval";
		    value = evalExpRP28part2(exp,globalEnv);
		    SL.ppm = "byref";
		    value2 = evalExpRP28part2(exp,globalEnv);
		    expStr = convertToCppSyntax(exp);
		} catch (e) {
		    //console.log("My exception: ",e);
		}
		if (value !== null && value2 !== null &&
		    SL.output.match(/-?\d+/g).filter(
			function (s) { return s.length > 6; } )
		    .length === 0) {

		    // no printed number is longer than 6 digits
		    this.answer = SL.output.match(/-?\d+/g).join(" ");
		    break;
		}
		if (iterations>500) {
		    // not needed locally but might be needed on Canvas
		    // when the files do not load appropriately???
		    expStr = ["Something went wrong...",
			      "Please, reload the page."];
		    break;
		}
	    }

	    this.expression = expStr.join("<br />");
	    
	    //console.log(this.answer);
	},// init function

	validateAnswer: function (guess) {
	    return this.answer.replace(/\s+/g,"") ===
		guess.replace(/\s+/g,"");
	}// validateAnswer function
	
    };

    window.RP28part2 = window.RP28part2 || RP28part2;

}());


