// Paste this into node
// SLang = {};
// console.log ("SLang now defined");
// .load grammar.js
// console.log ("Grammar loaded");
// .load absyn.js
// console.log ("Absyn loaded");
// .load env.js
// console.log ("Environment loaded");
// .load interpreter.js
// console.log ("Interpreter loaded");
// 
//   <script src="./scripts/grammar.js"></script>
//   <script src="./scripts/absyn.js"></script>
//   <script src="./scripts/env.js"></script>
//   <script src="./scripts/interpreter.js"></script>

//////////////////////

var x = 5;
var y = 6;

var util = require('util');
function print(struct) {
	 util.puts(util.inspect(struct, false ,null,true));
}

var name1 = require.resolve('./grammar');
delete require.cache[name1];
// var name2 = require.resolve('./absyn');
// delete require.cache[name2];
// var name3 = require.resolve('./env');
// delete require.cache[name3];

SLang = {};
var parser = require("./grammar");

//var absyn = require("./absyn");
.load absyn.js
//var env = require("./env");
.load env.js
.load interpreter.js

// To see environment, put the following at the beginning of the evalExp funtion in the interpreter
// require('util').puts(require('util').inspect(envir, false ,10,true));


// Examples:
print(parser.parse("+ (2,3)"));

print(parser.parse("(fn (x) => *(x,x) +(x,y))"));

SLang.interpret("(fn (x) => *(x,x) +(x,y))");

