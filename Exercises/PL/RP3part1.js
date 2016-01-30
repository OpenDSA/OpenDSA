/*global window */
(function() {
    "use strict";

    var instack_priority = [];
    var infix_priority = [];
    var opstack = [];
    var postfix = [];
    var end_token = "#";
    var infix_exp = "a+b-c*d/f";
    var postfix_str = null;
    var item = null;
    var infix_exp_arr = null;
    var grammar1 = "";
    var grammar2 = "";
    var grammar = "";
    var vals = [];
    var ops = [];
    var operands = ["p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    var i;
    var left1;
    var left2;
    var shuffle = function ( list ) {
	var i = list.length;
	while ( --i ) {
	    var j = Math.floor( Math.random() * ( i + 1 ) );
	    var tempi = list[i];
	    var tempj = list[j];
	    list[i] = tempj;
	    list[j] = tempi;
	}
    };

    function parse_exp() {
	
 	postfix = [];
 	opstack = [];
 	infix_exp_arr = infix_exp.split("");
 	infix_exp_arr.push(end_token);
 	opstack.push(end_token);
	
 	for (i = 0; i < infix_exp_arr.length; i++) {
 	    if (infix_exp_arr[i] >= "a" && infix_exp_arr[i] <= "z") {
 		//	    console.log("operand");
 		postfix.push(infix_exp_arr[i]);
 	    } else if (infix_exp_arr[i] === "(" ) {
 		//	    console.log("left paren");
 		opstack.push(infix_exp_arr[i]);
 	    } else if (infix_exp_arr[i] === ")" ) {
 		//	    console.log("right paren");
 		item = opstack.pop();
 		while (item !== "(") {
 		    postfix.push(item);
 		    item = opstack.pop();
 		}
 	    } else if (infix_exp_arr[i] === end_token) {
 		//	    console.log("end token");
 		item = opstack.pop();
 		while (item !== end_token) {
 		    postfix.push(item);
 		    item = opstack.pop();
 		}
 	    } else {
 		//	    console.log("operator");
 		item = opstack.pop();
 		while (instack_priority[item] >= infix_priority[infix_exp_arr[i]]) {
 		    postfix.push(item);
 		    item = opstack.pop();
 		}
 		opstack.push(item);
 		opstack.push(infix_exp_arr[i]);
 	    }
 	}
	
 	//    console.log("Postfix expression is");
	// 	    for (i = 0; i < postfix.length; i++) {
 	//	console.log(postfix[i]);
	// 	    }
	
 	postfix_str = postfix.join("");
 	//console.log(postfix_str);
	
	return postfix_str;
	// 	    document.getElementById("postfix").innerHTML = postfix_str;
	
    }
    

    
    //     instack_priority["+"] = 1;
    //     instack_priority["-"] = 1;
    //     instack_priority["*"] = 3;
    //     instack_priority["/"] = 3;
    //     instack_priority["("] = 0;
    //     instack_priority[")"] = undefined;
    //     instack_priority[end_token] = 0;
    // 
    //     infix_priority["+"] = 1;
    //     infix_priority["-"] = 1;
    //     infix_priority["*"] = 3;
    //     infix_priority["/"] = 3;
    //     infix_priority["("] = 100;
    //     infix_priority[")"] = 0;
    //     infix_priority[end_token] = 0;
    


    var expGrammar = {

	initialize: function() {
	    instack_priority = [];
	    infix_priority = [];
	    opstack = [];
	    postfix = [];
	    postfix_str = null;
	    item = null;
	    grammar1 = "";
	    grammar2 = "";
	    grammar = "";
	    ops = ["+","-","*","/"];
	    shuffle(ops);

	    left1 = (Math.random() < 0.5);
	    left2 = (Math.random() < 0.5);

	    instack_priority[ops[0]] = 1;
	    instack_priority[ops[1]] = 1;
	    instack_priority[ops[2]] = 3;
	    instack_priority[ops[3]] = 3;
	    instack_priority["("] = 0;
	    instack_priority[")"] = undefined;
	    instack_priority[end_token] = 0;
	    
	    infix_priority[ops[0]] = (left1 ? 1 : 2);
	    infix_priority[ops[1]] = (left1 ? 1 : 2);
	    infix_priority[ops[2]] = (left2 ? 3 : 4);
	    infix_priority[ops[3]] = (left2 ? 3 : 4);
	    infix_priority["("] = 100;
	    infix_priority[")"] = 0;
	    infix_priority[end_token] = 0;

	    if (left1) {
		grammar1 = "&lt;a&gt;&nbsp; ::= &lt;b&gt; | &lt;a&gt; " + ops[0] + " &lt;b&gt; | &lt;a&gt; " + ops[1] + " &lt;b&gt; <br />";
	    } else {
		grammar1 = "&lt;a&gt;&nbsp; ::= &lt;b&gt; | &lt;b&gt; " + ops[0] + " &lt;a&gt; | &lt;b&gt; " + ops[1] + " &lt;a&gt; <br />";
	    }
	    if (left2) {
		grammar2 = "&lt;b&gt;&nbsp; ::= &lt;c&gt; | &lt;b&gt; " + ops[2] + " &lt;c&gt; | &lt;b&gt; " + ops[3] + " &lt;c&gt; <br />";
	    } else {
		grammar2 = "&lt;b&gt;&nbsp; ::= &lt;c&gt; | &lt;c&gt; " + ops[2] + " &lt;b&gt; | &lt;c&gt; " + ops[3] + " &lt;b&gt; <br />";
	    }
	    grammar = grammar1 + grammar2 + "&lt;c&gt;&nbsp; ::= &lt;id&gt; | ( &lt;a&gt; ) <br />";

	    return grammar + "&lt;id&gt; ::= " + operands.join(" | "); 
	    //	    document.getElementById("grammar").innerHTML = grammar;
	},

	generate_exp: function() {
	    infix_exp = "";
	    ops = ["+","-","*","/"];
	    // operands = ["p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
	    shuffle(ops);
	    var five_ops = false;
	    if (Math.random() < 0.5) {
		five_ops = true;
		ops.push(ops[Math.floor(Math.random() * 4)]);
	    }
	    var parens = (Math.random() < 0.66);
	    var parens_start = (parens ? (Math.random() < 0.5 ? 1 : 2) : 100); // After first or second operator
	    var parens_end = (parens ? (Math.random() < 0.5 ? ops.length-1 : ops.length) : 100); // After second-last or last operand
	    shuffle(operands);
	    for (i = 0; i < ops.length; i++) {
		infix_exp = infix_exp + (i === parens_start ? "(" : "") + operands[i] + (i === parens_end ? ")" : "") + ops[i];
	    }
	    infix_exp = infix_exp + operands[ops.length] + (parens_end === ops.length ? ")" : "");
	    //console.log("expression is " + infix_exp);
	    //	    document.getElementById("expression").innerHTML = infix_exp;
	    parse_exp();
	    return infix_exp.split("").join(" ");
	},

	
 	assign_vals_to_operands: function () {
	    
 	    vals.p = 1 + Math.floor(6 * Math.random());
 	    vals.q = 1 + Math.floor(6 * Math.random());
 	    vals.r = 1 + Math.floor(6 * Math.random());
 	    vals.s = 1 + Math.floor(6 * Math.random());
 	    vals.t = 1 + Math.floor(6 * Math.random());
 	    vals.u = 1 + Math.floor(6 * Math.random());
 	    vals.v = 1 + Math.floor(6 * Math.random());
 	    vals.w = 1 + Math.floor(6 * Math.random());
 	    vals.x = 1 + Math.floor(6 * Math.random());
 	    vals.y = 1 + Math.floor(6 * Math.random());
 	    vals.z = 1 + Math.floor(6 * Math.random());
	    
 	    var display_vals = "";
 	    for (i = 0; i <= ops.length; i++) {
 		display_vals = display_vals + " " + operands[i] + ": " + vals[operands[i]] + "&nbsp;&nbsp;&nbsp;";
 	    }
	    
	    return display_vals;
	    
 	    //     for (var i in vals) {
 	    // 	display_vals = display_vals + " " + i + " " + vals[i] + " : ";
 	    //     }
 	    // 
	    // 	    document.getElementById("operand_values").innerHTML = display_vals;
	    
 	},
	
 	eval_exp:  function () {
	    
 	    var v1;
 	    var v2;
 	    var v;
 	    var val_stack = [];
	    
 	    for (i = 0; i < postfix.length; i++) {
 		if ("a" <= postfix[i] && postfix[i] <= "z") { // operand
 		    val_stack.push(vals[postfix[i]]);
		    // 		    console.log("pushing " + vals[postfix[i]]);
 		} else {		// operator
 		    v2 = val_stack.pop(); //console.log("v2 " + v2);
 		    v1 = val_stack.pop(); //console.log("v1 " + v1);
		    // 		    console.log("evaling " + v1 + postfix[i] + v2);
 		    switch (postfix[i]) {
 		    case "+":
 			val_stack.push(Math.floor(v1 + v2));
 			break;
 		    case "-":
 			val_stack.push(Math.floor(v1 - v2));
 			break;
 		    case "*":
 			val_stack.push(Math.floor(v1 * v2));
 			break;
 		    case "/":
 			val_stack.push(Math.floor(v1 / v2));
 			break;
 		    }
 		}
 	    }
	    v = val_stack.pop();
	    //console.log(v);
	    return v === -Infinity ? Infinity : v;
 	}
	
    };

    window.expGrammar = window.expGrammar || expGrammar;
}());
