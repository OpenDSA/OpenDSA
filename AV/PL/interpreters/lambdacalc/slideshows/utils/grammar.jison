/* description: Grammar for Slang 1 */

/* lexical grammar */
%lex

DIGIT		      [0-9]
LETTER		      [a-zA-Z]

%%

\s+                                   { /* skip whitespace */ }
"^"				      { return 'LAMBDA'; }
"("                   		      { return 'LPAREN'; }
")"                   		      { return 'RPAREN'; }
"true"                                { return 'TRUE'; }
"false"                               { return 'FALSE'; }
"succ"                                { return 'SUCC'; }
{DIGIT}                               { return 'DIGIT'; }
{LETTER}({LETTER}|{DIGIT}|_)*  	      { return 'VAR'; }
"."                                   { return 'DOT'; }
"+"                                   { return 'PLUS'; }
"*"                                   { return 'TIMES'; }
"!"                                   { return 'NOT'; }
"&&"                                  { return 'AND'; }
"||"                                  { return 'OR'; }
"."                                   { return 'DOT'; }
<<EOF>>               		      { return 'EOF'; }
.                     		      { return 'INVALID'; }

/lex

%start program

%% /* language grammar */

program
    : exp EOF { return createProgram($1); }
    ;

exp
    : var_exp  { $$ = $1; }
    | lambda_abs   { $$ = $1; }
    | app_exp  { $$ = $1; }    
    | church   { $$ = $1; }
    ;

church
    : boolean
        { $$ = $1; }
    | 'NOT' boolean
        { $$ = createNegation( $2 ); }
    | boolean  "AND" boolean 
        { $$ = createConjunction($1,$3); }
    | boolean  "OR" boolean 
        { $$ = createDisjunction($1,$3); }
    | number
        { $$ = $1; }
    | number "PLUS" number
        { $$ = createAddition( $1,$3); }
    | number "TIMES" number
        { $$ = createMultiplication( $1,$3); }
    ;

number 
    : "DIGIT"
        { $$ = createNumber( Number($1) ); }
    | "LPAREN" "SUCC" number "RPAREN"
        { $$ = createAppExp(createSucc(), $3 ); }
    ;

boolean
    : "TRUE"   { $$ = createTrue(); }
    | "FALSE"  { $$ = createFalse(); }
    ;

var_exp
    : VAR  { $$ = createVarExp( $1 ); }
    ;

lambda_abs
    : 'LAMBDA' var_exp 'DOT' exp { $$ =createLambdaAbs($2,$4); }
    ;

app_exp
    : 'LPAREN' exp exp 'RPAREN'  { $$ = createAppExp($2,$3); }
    ;

%%


function createProgram(e) {
    return ["Program", e]; 
}
function isProgram(e) { 
    return e[0] === "Program"; 
}
function getProgramExp(e) { 
    if (isProgram(e)) {
	return e[1];
    } else {
	throw new Error("Interpreter error: "  +
			"The argument of getProgramExp is not a program.");
    }
}				       
function createVarExp(v) { 
    return ["VarExp", v]; 
}
function isVarExp(e) { 
    return e[0] === "VarExp"; 
}
function getVarExpId(e) { 
    if (isVarExp(e)) {
	return e[1];
    } else {
	throw new Error("Interpreter error: "  +
			"The argument of getVarExpId is not a VarExp.");
    }
}
function createLambdaAbs(param,body) {
    return ["LambdaAbs",param,body];
}
function isLambdaAbs(e) { 
    return e[0] === "LambdaAbs"; 
}
function getLambdaAbsParam(e) { 
    if (isLambdaAbs(e)) {
	return e[1];
    } else {
	throw new Error("Interpreter error: "  +
			"The argument of getLambdaAbsParam is not a LambdaAbs.");
    }
}
function getLambdaAbsBody(e) { 
    if (isLambdaAbs(e)) {
	return e[2];
    } else {
	throw new Error("Interpreter error: "  +
			"The argument of getLambdaAbsBody is not a LambdaAbs.");
    }
}
function createAppExp(fn,arg) {
    return ["AppExp",fn,arg];
}
function isAppExp(e) { 
    return e[0] === "AppExp"; 
}
function getAppExpFn(e) { 
    if (isAppExp(e)) {
	return e[1];
    } else {
	throw new Error("Interpreter error: "  +
			"The argument of getAppExpFn is not an AppExp.");
    }
}
function getAppExpArg(e) { 
    if (isAppExp(e)) {
	return e[2];
    } else {
	throw new Error("Interpreter error: "  +
			"The argument of getAppExpArg is not an AppExp.");
    }
}
    function createFalse() {
    return createLambdaAbs(createVarExp("x"),
			   createLambdaAbs(createVarExp("y"),
					   createVarExp("y")));
}
function createTrue() {
    return createLambdaAbs(createVarExp("x"),
			   createLambdaAbs(createVarExp("y"),
					   createVarExp("x")));
}
function createNumber( n ) {
    var helper = function (n) {
	if (n === 0) {
	    return createVarExp("x");
	} else {
	    return createAppExp(createVarExp("f"), helper(n-1));		
	}
    };
	
    return createLambdaAbs(createVarExp("f"),
			   createLambdaAbs(createVarExp("x"),
					   helper(n)));
}
function createSucc() {
    return createLambdaAbs(createVarExp("n"),
			   createLambdaAbs(createVarExp("f"),
					   createLambdaAbs(
					       createVarExp("x"),
					       createAppExp(
						   createVarExp("f"),
						   createAppExp(
						       createAppExp(
							   createVarExp("n"),
							   createVarExp("f")),
						       createVarExp("x"))))));
}
function createPlus() {
    return createLambdaAbs(
	createVarExp("m"),
	createLambdaAbs(
	    createVarExp("n"),
	    createLambdaAbs(
		createVarExp("f"),
		createLambdaAbs(
		    createVarExp("x"),
		    createAppExp(
			createAppExp(createVarExp("n"),createVarExp("f")),
			createAppExp(
			    createAppExp(createVarExp("m"),createVarExp("f")),
			    createVarExp("x"))
		    )))));
}
function createAddition(op1,op2) {
    return createAppExp(createAppExp(createPlus(),op1), op2);
}
function createTimes() {
    return createLambdaAbs(
	createVarExp("m"),
	createLambdaAbs(
	    createVarExp("n"),
	    createLambdaAbs(
		createVarExp("f"),
		createAppExp(
		    createVarExp("m"),
		    createAppExp(createVarExp("n"),createVarExp("f"))))));
}
function createMultiplication(op1,op2) {
    return createAppExp(createAppExp(createTimes(),op1), op2);
}
function createAnd() {
    return createLambdaAbs(createVarExp("p"),
			   createLambdaAbs(
			       createVarExp("q"),
			       createAppExp(
				   createAppExp(
				       createVarExp("p"),
				       createVarExp("q")),
				   createFalse())));
}
function createOr() {
    return createLambdaAbs(createVarExp("p"),
			   createLambdaAbs(
			       createVarExp("q"),
			       createAppExp(
				   createAppExp(
				       createVarExp("p"),
				       createTrue()),
				   createVarExp("q"))));
}
function createNot() {
    return createLambdaAbs(createVarExp("p"),
			   createAppExp(
			       createAppExp(
				   createVarExp("p"),
				   createFalse()),
			       createTrue()));
}
function createNegation(op) {
    return createAppExp( createNot(), op);
}
function createDisjunction(op1,op2) {
    return createAppExp( createAppExp( createOr(), op1 ), op2 );
}
function createConjunction(op1,op2) {
    return createAppExp( createAppExp( createAnd(), op1 ), op2 );
}
