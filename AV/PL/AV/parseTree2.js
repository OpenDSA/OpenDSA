/* global document, console, $, JSAV */

$(document).ready(function () {
"use strict";

    JSAV.init();
    JSAV.ext.SPEED = 500;
    var av;

    // Use this instatiation for embedding in standalone parseTree1.html file
    av = new JSAV($("#parseTree"));
    //////////////////////////////////////////////////////

    // Use this instatiation for embedding as inlineav in RST file
//     var av_name = "parseTree1";
//     var interpret = ODSA.UTILS.loadConfig({"av_name": av_name}).interpreter;
//     av = new JSAV(av_name);
    //////////////////////////////////////////////////////

    var lt = "&lt;";
    var gt = "&gt;";
    var empty_prod = "&epsilon;";
    var arr;
    var tree;
    var label1;
    var label2;

    var the_tree = "";		// String representation of the tree

    // A  + B * C
    // A + B * C + ( E * F + G )

    //    var the_exp = "A + B * C";	// The expression to parse
    var the_exp = "A + B * C + ( E * F + G )";	// The expression to parse
    var the_parse_tree = [ 'program',			// The parse tree produced by the JISON parser.  At each level, index 0 is the type of node and remaining indices are its childrew
		     [ 'exp',
		       [ 'exp',
			 [ 'exp', [ 'trm', [ 'fac', [ 'pri', 'A' ] ] ] ],
			 '+',
			 [ 'trm',
			   [ 'trm', [ 'fac', [ 'pri', 'B' ] ] ],
			   '*',
			   [ 'fac', [ 'pri', 'C' ] ] ] ],
		       '+',
		       [ 'trm',
			 [ 'fac',
			   [ 'parens',
			     '(',
			     [ 'exp',
			       [ 'exp',
				 [ 'trm',
				   [ 'trm', [ 'fac', [ 'pri', 'E' ] ] ],
				   '*',
				   [ 'fac', [ 'pri', 'F' ] ] ] ],
			       '+',
			       [ 'trm', [ 'fac', [ 'pri', 'G' ] ] ] ],
			     ')' ] ] ] ] ];

	
//     var valid_operand = function(c) {
// 	if ('A' <= c && c <= 'Z') {
// 	    return true;
// 	} else {
// 	    return false;
// 	}
//     };
// 
//     var valid_operator = function(c) {
// 	if ('+' === c || c === '*') {
// 	    return true;
// 	} else {
// 	    return false;
// 	}
//     };
// 
//     var verify_exp = function(s, indent, parent) {
// 
// 	//	the_tree = the_tree + "\n" + indent + "|EXP " + (s.length ===  0 ? "NULL" : s) + "|";
// 	var n = tree.newNode(lt+"Exp"+gt);
// 	n.addClass("wider");
// 	if (parent === null) {
// 	    tree.root(n);
// 	    //	    tree.root().addClass("wider");
// 	} else {
// 	    parent.addChild(n);
// 	}
// 	the_tree = the_tree + "\n" + indent + "|EXP |";
// 	s = verify_factor(s, indent + " ",n);
// 	if (!s.startsWith("ERROR ")) {
// 	    s = verify_addf(s, indent + " ",n);
// 	} else {
// 	    throw(s);
// 	}
// 	return s;
//     };
// 
//     var verify_factor = function(s, indent, parent) {
// 	
// 	var n = tree.newNode(lt+"Fac"+gt);
// 	n.addClass("wider");
// 	parent.addChild(n);
// 	//	the_tree = the_tree + "\n" + indent + "|FACTOR " + (s.length ===  0 ? "NULL" : s) + "|";
// 	the_tree = the_tree + "\n" + indent + "|FACTOR |";
// 	s = verify_primary(s, indent + " ", n);
// 	if (!s.startsWith("ERROR ")) {
// 	    s = verify_multf(s, indent + " ", n);
// 	} else {
// 	    throw(s);
// 	}
// 	return s;
//     };
// 
//     var verify_addf = function(s, indent, parent) {
// 
// 	var n = tree.newNode(lt+"Add"+gt);
// 	n.addClass("wider");
// 	parent.addChild(n);
// 	//	the_tree = the_tree + "\n" + indent + "|ADD_FACTOR " + (s.length ===  0 ? "NULL" : s) + "|";
// 	the_tree = the_tree + "\n" + indent + "|ADD_FACTOR |";
// 	if (s.length !== 0) {
// 	    if (valid_operator(s.charAt(0))) {
// 		if (s.charAt(0) === '+') {
// 		    n.addChild(s.substring(0,1));
// 		    the_tree = the_tree + "\n" + indent + " " + s.substring(0,1);
// 		    if (s.substring(1).length !== 0) {
// 			s = verify_factor(s.substring(1), indent + " ", n);
// 			s = verify_addf(s, indent + " ", n);
// 			return s;
// 		    } else {
// 			throw("ERROR " + s);
// 		    }
// 		} else {
// 		    n.addChild(empty_prod);
// 		    the_tree = the_tree + "\n" + indent + " " + "NULL";
// 		    return s;	// Null prod
// 		}
// 	    }
// 	}
// 	n.addChild(empty_prod);
// 	the_tree = the_tree + "\n" + indent + " " + "NULL";
// 	return s;		// NULL PROD
//     };
// 
//     var verify_multf = function(s,indent, parent) {
// 
// 	var n = tree.newNode(lt+"Mul"+gt);
// 	n.addClass("wider");
// 	parent.addChild(n);
// 	//	the_tree = the_tree + "\n" + indent + "|MULT_FACTOR " + (s.length ===  0 ? "NULL" : s)  + "|";
// 	the_tree = the_tree + "\n" + indent + "|MULT_FACTOR |";
// 	if (s.length !== 0) {
// 	    if (valid_operator(s.charAt(0))) {
// 		if (s.charAt(0) === '*') {
// 		    n.addChild(s.substring(0,1));
// 		    the_tree = the_tree + "\n" + indent + " " + s.substring(0,1);
// 		    if (s.substring(1).length !== 0) {
// 			s = verify_primary(s.substring(1), indent + " ",n);
// 			s = verify_multf(s, indent + " ",n);
// 			return s;
// 		    } else {
// 			throw("ERROR " + s);
// 		    }
// 		} else {
// 		    n.addChild(empty_prod);
// 		    the_tree = the_tree + "\n" + indent + " " + "NULL";
// 		    return s; // NULL prod
// 		}
// 	    }
// 	}
// 	n.addChild(empty_prod);
// 	the_tree = the_tree + "\n" + indent + " " + "NULL";
// 	return s;
//     };
// 
//     var verify_primary = function(s, indent, parent) {
// 
// 	var n = tree.newNode(lt+"Pri"+gt);
// 	n.addClass("wider");
// 	parent.addChild(n);
// 	//	the_tree = the_tree + "\n" + indent + "|PRIMARY " + (s.length ===  0 ? "NULL" : s) + "|";
// 	the_tree = the_tree + "\n" + indent + "|PRIMARY |";
// 	if (valid_operand(s.charAt(0))) {
// 	    n.addChild(s.substring(0,1));
// 	    the_tree = the_tree + "\n" + indent + " " + s.substring(0,1);
// 	    return(s.substring(1));
// 	} else if (s.charAt(0) === '(') {
// 	    n.addChild("(");
// 	    the_tree = the_tree + "\n" + indent + " ( ";
// 	    s = verify_exp(s.substring(1), indent + " ",n);
// 	    if (s.charAt(0) === ')') {
// 		n.addChild(")");
// 		the_tree = the_tree + "\n" + indent + " ) ";
// 		return(s.substring(1));
// 	    } else {
// 		throw("ERROR " + s);
// 	    }
// 	} else {
// 	    throw("ERROR " + s);
// 	}
//     };

    var build_jsav_tree = function(node, parent) {
	//    document.getElementById('parse-result').innerHTML = s;

	var n;
	var i;
	if (parent === null) {
	    n = tree.newNode(lt+node[0]+gt); // node[0] should be "exp"
	    n.addClass("wider");
	    tree.root(n);
	    for (i = 1; i < node.length; i++) { // now recursively process the children
		build_jsav_tree(node[i], n);
	    }
	} else if (Array.isArray(node)) {
 	    n = tree.newNode(lt+node[0]+gt);
 	    n.addClass("wider");
 	    parent.addChild(n);
 	    for (i = 1; i < node.length; i++) { // now recursively process the children
 		build_jsav_tree(node[i], n);
	    }
	} else {
 	    n = tree.newNode(node);
	    //	    n.addClass("wider");
 	    parent.addChild(n);
	}
    };

    var display_parse = function (nodes, arr_index_to_highlight) {
	
	if (nodes.length === 0) return;
	var node = nodes.shift();
	if (node.child(0) === undefined && node.value() !== empty_prod) {
	    node.addClass("jsavhighlight");
	    arr.addClass(arr_index_to_highlight, "jsavhighlight");
	    arr_index_to_highlight++;
	    av.step();
	}
	console.log("node " + node.value());
	var i = 0;
	var temp = [];
	while (node.child(i) !== undefined) {
	    node.child(i).show( {recursive: false} );
	    temp.push(node.child(i));
	    i = i + 1;
	}
	if (temp.length !== 0) av.step();
	
	while (temp.length !== 0) {
	    nodes.unshift(temp.pop());
	}
	display_parse(nodes, arr_index_to_highlight);
    };



    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    arr = av.ds.array(the_exp.split(" "));
    arr.addClass(true, "oneCharWidth");
    label1 = av.label("\nThe root node of the parse tree ");
    av.umsg("exp is always a non-terminal ");
    tree = av.ds.tree({nodegap: 10});

    // Build the JSAV tree representation of the JISON parse tree
    build_jsav_tree(the_parse_tree[1], null); // Skip the program node from the JISON grammar, which occurs at index 0

    tree.layout();
//    av.step();
    tree.root().child(0).hide();
    tree.root().child(1).hide();
    tree.root().child(2).hide();
    av.displayInit();
    // Now display the parse tree in stages
    display_parse([tree.root()], 0);


    av.recorded();

    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

});
