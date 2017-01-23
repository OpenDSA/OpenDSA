/* 
    description: Parses simple arithmetic expressions
                 and produces a parse tree
    source:      this grammar is adapted from: 
                 http://zaach.github.io/jison/demos/calc/
*/

// lexical section of the grammar 
// ==============================

%lex
%%
\s+                   /* no return statement, so skip whitespace */
[A-Z]                 return "PRI"
"*"                   return "TIMES"
"/"                   return "DIV"
"-"                   return "MINUS"
"+"                   return "PLUS"
"("                   return "LPAREN"
")"                   return "RPAREN"
<<EOF>>               return "EOF"
.                     return "INVALID"

/lex

%start program

// phrase-structure section of the grammar
// =======================================

%%

program
    : exp "EOF"
      { return ['program',$1]; }
    ;
exp
    : trm
      { $$ = ['exp', $1]; }	
    | exp "PLUS" trm
      { $$ = ['exp',$1, '+', $3]; }
    | exp "MINUS" trm      
      { $$ = ['exp',$1, '-', $3]; }
    ;
trm
    : fac
      { $$ = ['trm', $1]; }	
    | trm "TIMES" fac
      { $$ = ['trm',$1, '*', $3]; }
    | trm "DIV" fac
      { $$ = ['trm',$1, '/', $3]; }
    ;
fac
    : "PRI"
      { $$ = ['fac',['pri', $1]]; }	
    | "LPAREN" exp "RPAREN"
      { $$ = ['fac', '(', $2, ')']; }	
    ;
