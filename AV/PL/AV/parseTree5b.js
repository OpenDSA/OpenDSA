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
//     var av_name = "parseTree5a";
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

    var the_exp = "A + B * C";	// The expression to parse

    var valid_operand = function(c) {
	if ('A' <= c && c <= 'Z') {
	    return true;
	} else {
	    return false;
	}
    };

    var valid_operator = function(c) {
	if ('+' === c || c === '*') {
	    return true;
	} else {
	    return false;
	}
    };

    var verify_exp = function(s, indent, parent) {

	//	the_tree = the_tree + "\n" + indent + "|EXP " + (s.length ===  0 ? "NULL" : s) + "|";
	var n = tree.newNode(lt+"Exp"+gt);
	n.addClass("wider");
	if (parent === null) {
	    tree.root(n);
	    //	    tree.root().addClass("wider");
	} else {
	    parent.addChild(n);
	}
	the_tree = the_tree + "\n" + indent + "|EXP |";
	s = verify_factor(s, indent + " ",n);
	if (!s.startsWith("ERROR ")) {
	    s = verify_addf(s, indent + " ",n);
	} else {
	    throw(s);
	}
	return s;
    };

    var verify_factor = function(s, indent, parent) {
	
	var n = tree.newNode(lt+"Fac"+gt);
	n.addClass("wider");
	parent.addChild(n);
	//	the_tree = the_tree + "\n" + indent + "|FACTOR " + (s.length ===  0 ? "NULL" : s) + "|";
	the_tree = the_tree + "\n" + indent + "|FACTOR |";
	s = verify_primary(s, indent + " ", n);
	if (!s.startsWith("ERROR ")) {
	    s = verify_multf(s, indent + " ", n);
	} else {
	    throw(s);
	}
	return s;
    };

    var verify_addf = function(s, indent, parent) {

	var n = tree.newNode(lt+"Add"+gt);
	n.addClass("wider");
	parent.addChild(n);
	//	the_tree = the_tree + "\n" + indent + "|ADD_FACTOR " + (s.length ===  0 ? "NULL" : s) + "|";
	the_tree = the_tree + "\n" + indent + "|ADD_FACTOR |";
	if (s.length !== 0) {
	    if (valid_operator(s.charAt(0))) {
		if (s.charAt(0) === '+') {
		    n.addChild(s.substring(0,1));
		    the_tree = the_tree + "\n" + indent + " " + s.substring(0,1);
		    if (s.substring(1).length !== 0) {
			s = verify_factor(s.substring(1), indent + " ", n);
			s = verify_addf(s, indent + " ", n);
			return s;
		    } else {
			throw("ERROR " + s);
		    }
		} else {
		    n.addChild(empty_prod);
		    the_tree = the_tree + "\n" + indent + " " + "NULL";
		    return s;	// Null prod
		}
	    }
	}
	n.addChild(empty_prod);
	the_tree = the_tree + "\n" + indent + " " + "NULL";
	return s;		// NULL PROD
    };

    var verify_multf = function(s,indent, parent) {

	var n = tree.newNode(lt+"Mul"+gt);
	n.addClass("wider");
	parent.addChild(n);
	//	the_tree = the_tree + "\n" + indent + "|MULT_FACTOR " + (s.length ===  0 ? "NULL" : s)  + "|";
	the_tree = the_tree + "\n" + indent + "|MULT_FACTOR |";
	if (s.length !== 0) {
	    if (valid_operator(s.charAt(0))) {
		if (s.charAt(0) === '*') {
		    n.addChild(s.substring(0,1));
		    the_tree = the_tree + "\n" + indent + " " + s.substring(0,1);
		    if (s.substring(1).length !== 0) {
			s = verify_primary(s.substring(1), indent + " ",n);
			s = verify_multf(s, indent + " ",n);
			return s;
		    } else {
			throw("ERROR " + s);
		    }
		} else {
		    n.addChild(empty_prod);
		    the_tree = the_tree + "\n" + indent + " " + "NULL";
		    return s; // NULL prod
		}
	    }
	}
	n.addChild(empty_prod);
	the_tree = the_tree + "\n" + indent + " " + "NULL";
	return s;
    };

    var verify_primary = function(s, indent, parent) {

	var n = tree.newNode(lt+"Pri"+gt);
	n.addClass("wider");
	parent.addChild(n);
	//	the_tree = the_tree + "\n" + indent + "|PRIMARY " + (s.length ===  0 ? "NULL" : s) + "|";
	the_tree = the_tree + "\n" + indent + "|PRIMARY |";
	if (valid_operand(s.charAt(0))) {
	    n.addChild(s.substring(0,1));
	    the_tree = the_tree + "\n" + indent + " " + s.substring(0,1);
	    return(s.substring(1));
	} else if (s.charAt(0) === '(') {
	    n.addChild("(");
	    the_tree = the_tree + "\n" + indent + " ( ";
	    s = verify_exp(s.substring(1), indent + " ",n);
	    if (s.charAt(0) === ')') {
		n.addChild(")");
		the_tree = the_tree + "\n" + indent + " ) ";
		return(s.substring(1));
	    } else {
		throw("ERROR " + s);
	    }
	} else {
	    throw("ERROR " + s);
	}
    };

    var top_level = function(s) {
	//    document.getElementById('parse-result').innerHTML = s;

	try {
	    the_tree = "";
	    s = s.replace(/\s/g, ''); // Squeeze out spaces
	    s = verify_exp(s, " ", null);
	    if (s.length === 0) {
		console.log("SUCCESS");
		console.log("" + the_tree);
	    } else {
		console.log("ERROR " + s);
		console.log("" + the_tree);
	    }
	    //	console.log("Initial string is " + s);
	}
	catch(error) {
	    console.log(error);
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



    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%% slide 1 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    arr = av.ds.array(the_exp.split(" "));
    arr.addClass(true, "oneCharWidth");
    label1 = av.label("Beginning the parse ");
    av.umsg(" ");
    tree = av.ds.tree({nodegap: 10});
    tree.root(lt+"exp"+gt);
    tree.root().addClass("wider");
    tree.layout();
    av.displayInit();

    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%% slide 2 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    label1.text("First we wiil use the &lt;exp&gt; * &lt;exp&gt; production.");
    tree.root().addChild(lt+"exp"+gt).addChild("*").addChild(lt+"exp"+gt);
    tree.root().child(1).highlight();
    arr.addClass(3, "jsavhighlight");
    tree.layout();
    av.step();

    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%% slide 3 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    label1.text("Complete parsing the &lt;exp&gt; on the right");
    tree.root().child(2).addChild(lt+"pri"+gt);
    tree.root().child(2).child(0).addChild("C");
    tree.root().child(2).child(0).child(0).highlight();
    arr.addClass(4, "jsavhighlight");
    tree.layout();
    av.step();

    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%% slide 4 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    label1.text("Now take care of the &lt;exp&gt; on the left by using the &lt;exp&gt; + &lt;exp&gt; production");
    tree.root().child(0).addChild(lt+"exp"+gt).addChild("+").addChild(lt+"exp"+gt);
    tree.root().child(0).child(1).highlight();
    arr.addClass(1, "jsavhighlight");
    tree.layout();
    av.step();

    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%% slide 5 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    label1.text("+ will add A ...");
    tree.root().child(0).child(0).addChild(lt+"pri"+gt);
    tree.root().child(0).child(0).child(0).addChild("A");
    tree.root().child(0).child(0).child(0).child(0).highlight();
    arr.addClass(0, "jsavhighlight");
    tree.layout();
    av.step();

    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%% slide 6 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    label1.text("... to B");
    tree.root().child(0).child(2).addChild(lt+"pri"+gt);
    tree.root().child(0).child(2).child(0).addChild("B");
    tree.root().child(0).child(2).child(0).child(0).highlight();
    arr.addClass(2, "jsavhighlight");
    tree.layout();
    av.step();

    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    


    av.recorded();





});
