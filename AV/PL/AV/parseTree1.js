/* global document, console, $, JSAV */

$(document).ready(function () {
"use strict";

    //var av_name = "parseTree";
    //var interpret = ODSA.UTILS.loadConfig({"av_name": av_name}).interpreter;
    //var av = new JSAV(av_name);

    var av;
    var lt = "&lt;";
    var gt = "&gt;";
    var empty_prod = "&epsilon;";
    var arr;
    var tree;
    var label1;
    var label2;

    var the_tree = "";		// String representation of the tree

    // A  + B * C
    // A + B * C + (E * F +G)

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
	if (parent === null) {
	    tree.root(n);
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

    var display_parse = function (nodes) {
	
	if (nodes.length === 0) return;
	var node = nodes.shift();
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
	display_parse(nodes);
    };

//     var parenChar = function(x) { 
// 	return arr.value(x) === '(' || arr.value(x) === ')' ||
// 	    arr.value(x) === ' '; };
// 
//     var oneChar = function(x) {
// 	return ! parenChar(x) &&
// 	    arr.value(x).length === 1; };
//     var noChar = function(x) { return arr.value(x).length === 0; };
//     var lambdaChar = function(x) { return arr.value(x).length === 3; };


    JSAV.init();
    JSAV.ext.SPEED = 500;

    
    av = new JSAV($("#parseTree"));

    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%% slide 1 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    arr = av.ds.array(the_exp.split(" "));
//     arr.removeClass(true,"oneCharWidth");
//     arr.removeClass(true,"emptyWidth");
//     arr.removeClass(true,"lambdaWidth");
//     arr.removeClass(true,"narrow");
//     arr.addClass(true, "defaultCellStyle");
//     arr.addClass(noChar,"emptyWidth");
//     arr.addClass(oneChar, "oneCharWidth");
//     arr.addClass(parenChar,"narrow");
//     arr.addClass(lambdaChar,"lambdaWidth");

//    setArrayCellsWidth();
    label1 = av.label("The root node of the parse tree for any ");
    label2 = av.label("&lambda; expression  is always the non-terminal " + empty_prod +".");
//     label1.addClass("labelstyle");
//     label2.addClass("labelstyle");
    tree = av.ds.tree({nodegap: 10});

    top_level(the_exp);

//     var foo = the_tree.split("\n");
//     console.log("" + foo.length);

//    tree.root(lt + "E" +gt);
//    tree.root().addClass("wider");
//    tree.hide();
    tree.layout();
    tree.root().child(0).hide();
    tree.root().child(1).hide();
    av.displayInit();
//     var nodes_to_display = [];
//     nodes_to_display.push(tree.root().child(0));
//     nodes_to_display.push(tree.root().child(1));
//     nodes_to_display.shift().show({recursive: false});
//     av.step();
    display_parse([tree.root()]);

//     console.log(""+tree.root().child(0));
//     console.log(""+tree.root().child(1));
//     if (tree.root().child(2) !== undefined) console.log(""+tree.root().child(2));

//     //%%%%%%%%%%%%%%%%%%%%%%%%%%%%% slide 2 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//     arr.addClass([0],"lambdaexphighlight");
//     label1.text("Since the first character of the");
//     label2.text("&lambda; expression is a left parenthesis...");
//     av.step();
//     //%%%%%%%%%%%%%%%%%%%%%%%%%%%%% slide 3 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//     arr.addClass([arr.size()-1],"lambdaexphighlight");
//     label1.text("... it must, together with the last parenthesis, define a");
//     label2.text("function application at the top-level of the parse tree.");
//     av.step();
//     //%%%%%%%%%%%%%%%%%%%%%%%%%%%%% slide 4 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//     label1.text("Let's add the four nodes corresponding to this");
//     label2.text("top-level function application to the parse tree.");
//     tree.root().addChild("(").addChild(eNT).addChild(eNT).addChild(")");
//     //tree.root().child(0).translateX("-40px");
//     //tree.root().child(0).edgeToParent().layout();
//     tree.root().child(1).addClass("wider");
//     tree.root().child(2).addClass("wider");
//     tree.root().child(0).highlight();
//     tree.root().child(1).highlight();
//     tree.root().child(2).highlight();
//     tree.root().child(3).highlight();
//     tree.layout();
// 
// 
// 
//     av.step();
//     //%%%%%%%%%%%%%%%%%%%%%%%%%%%%% slide 5 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//     arr.removeClass([0,arr.size()-1],"lambdaexphighlight");
//     arr.addClass([1],"lambdaexphighlight");
//     tree.root().child(0).unhighlight();
//     tree.root().child(1).unhighlight();
//     tree.root().child(2).unhighlight();
//     tree.root().child(3).unhighlight();
//     label1.text("Now, we need to identify the two &lambda; expressions that make up");
//     label2.text("this application. The first one must start with this left parenthesis...");
//     tree.layout();
//     av.step();
//     //%%%%%%%%%%%%%%%%%%%%%%%%%%%%% slide 6 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//     arr.addClass([7],"lambdaexphighlight");
//     label1.text("... and must end with the matching");
//     label2.text("right parenthesis highlighted above.");
//     av.step();
//     //%%%%%%%%%%%%%%%%%%%%%%%%%%%%% slide 7 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//     label1.text("So we can add the corresponding");
//     label2.text("nodes to the parse tree.");
//     tree.root().child(1).addChild("(").addChild(eNT).addChild(eNT).addChild(")");
//     tree.root().child(1).child(1).addClass("wider");
//     tree.root().child(1).child(2).addClass("wider");
//     tree.root().child(1).child(0).highlight();
//     tree.root().child(1).child(1).highlight();
//     tree.root().child(1).child(2).highlight();
//     tree.root().child(1).child(3).highlight();
//     tree.layout();
//     av.step();
//     //%%%%%%%%%%%%%%%%%%%%%%%%%%%%% slide 8 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//     label1.text("Similarly, the second &lambda; expression in the top-level");
//     label2.text("application is contained in the highlighted parentheses.");
//     tree.root().child(1).child(0).unhighlight();
//     tree.root().child(1).child(1).unhighlight();
//     tree.root().child(1).child(2).unhighlight();
//     tree.root().child(1).child(3).unhighlight();
//     arr.removeClass([1,7],"lambdaexphighlight");
//     arr.addClass([arr.size()-6,arr.size()-2],"lambdaexphighlight");
//     tree.layout();
//     av.step();
//     //%%%%%%%%%%%%%%%%%%%%%%%%%%%%% slide 9 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//     label1.text("So we can add the corresponding nodes to the parse tree.");
//     label2.text("And since the highlighted function application is really short...");
//     tree.root().child(2).addChild("(").addChild(eNT).addChild(eNT).addChild(")");
//     tree.root().child(2).child(1).addClass("wider");
//     tree.root().child(2).child(2).addClass("wider");
//     tree.root().child(2).child(0).highlight();
//     tree.root().child(2).child(1).highlight();
//     tree.root().child(2).child(2).highlight();
//     tree.root().child(2).child(3).highlight();
//     tree.layout();
//     av.step();
//     //%%%%%%%%%%%%%%%%%%%%%%%%%%%%% slide 10 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//     label1.text("... let's add all of the nodes");
//     label2.text("that make up its two sub-trees.");
//     arr.removeClass([arr.size()-6,arr.size()-2],"lambdaexphighlight");
//     arr.addClass([arr.size()-5,arr.size()-3],"lambdaexphighlight");
//     tree.root().child(2).child(0).unhighlight();
//     tree.root().child(2).child(1).unhighlight();
//     tree.root().child(2).child(2).unhighlight();
//     tree.root().child(2).child(3).unhighlight();
//     tree.root().child(2).child(1).addChild(varNT);
//     tree.root().child(2).child(1).child(0).addClass("wide");
//     tree.root().child(2).child(2).addChild(varNT);
//     tree.root().child(2).child(2).child(0).addClass("wide");
//     tree.root().child(2).child(1).child(0).addChild("x");
//     tree.root().child(2).child(2).child(0).addChild("y");
//     tree.root().child(2).child(1).child(0).highlight();
//     tree.root().child(2).child(2).child(0).highlight();    
//     tree.root().child(2).child(1).child(0).child(0).highlight();    
//     tree.root().child(2).child(2).child(0).child(0).highlight();    
//     tree.layout();
//     av.step();
//     //%%%%%%%%%%%%%%%%%%%%%%%%%%%%% slide 11 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//     label1.text("Now we turn our attention back to the first");
//     label2.text("application in the top-level &lambda; expression.");
//     arr.removeClass([arr.size()-5,arr.size()-3],"lambdaexphighlight");
//     tree.root().child(2).child(1).child(0).unhighlight();
//     tree.root().child(2).child(2).child(0).unhighlight();    
//     tree.root().child(2).child(1).child(0).child(0).unhighlight();    
//     tree.root().child(2).child(2).child(0).child(0).unhighlight();    
//     arr.addClass([1,7],"lambdaexphighlight");
//     tree.root().child(1).child(0).highlight();
//     tree.root().child(1).child(1).highlight();
//     tree.root().child(1).child(2).highlight();
//     tree.root().child(1).child(3).highlight();
//     tree.layout();
//     av.step();
// 
//     //%%%%%%%%%%%%%%%%%%%%%%%%%%%%% slide 12 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//     label1.text("The first &lambda; expression in this application is a");
//     label2.text("variable. Let's add its sub-tree to the parse tree.");
//     arr.removeClass([1,7],"lambdaexphighlight");
//     arr.addClass([2],"lambdaexphighlight");
//     tree.root().child(1).child(0).unhighlight();
//     tree.root().child(1).child(1).unhighlight();
//     tree.root().child(1).child(2).unhighlight();
//     tree.root().child(1).child(3).unhighlight();
//     tree.root().child(1).child(1).addChild(varNT);
//     tree.root().child(1).child(1).child(0).addClass("wide");
//     tree.root().child(1).child(1).child(0).addChild("z");
//     tree.root().child(1).child(1).child(0).highlight();
//     tree.root().child(1).child(1).child(0).child(0).highlight();
//     tree.layout();
//     av.step();
//     //%%%%%%%%%%%%%%%%%%%%%%%%%%%%% slide 13 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//     label1.text("The second &lambda; expression is a &lambda; abstraction. Let's");
//     label2.text("add the four corresponding nodes to the parse tree.");
//     arr.removeClass([2],"lambdaexphighlight");
//     arr.addClass([4,5,6],"lambdaexphighlight");
//     tree.root().child(1).child(1).child(0).unhighlight();
//     tree.root().child(1).child(1).child(0).child(0).unhighlight();
//     tree.root().child(1).child(2).addChild("&lambda;");
//     tree.root().child(1).child(2).addChild(varNT);
//     tree.root().child(1).child(2).child(1).addClass("wide");
//     tree.root().child(1).child(2).addChild(".");
//     tree.root().child(1).child(2).addChild(eNT);
//     tree.root().child(1).child(2).child(3).addClass("wider");
//     tree.root().child(1).child(2).child(0).highlight();
//     tree.root().child(1).child(2).child(1).highlight();
//     tree.root().child(1).child(2).child(2).highlight();
//     tree.root().child(1).child(2).child(3).highlight();
//     tree.layout();
//     av.step();
//     //%%%%%%%%%%%%%%%%%%%%%%%%%%%%% slide 14 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//     label1.text("The formal parameter in this &lambda; expression is x.");
//     label2.text("Let's add one node for x to the parse tree.");
//     arr.removeClass([5,6],"lambdaexphighlight");
//     tree.root().child(1).child(2).child(0).unhighlight();
//     tree.root().child(1).child(2).child(1).unhighlight();
//     tree.root().child(1).child(2).child(2).unhighlight();
//     tree.root().child(1).child(2).child(3).unhighlight();
//     tree.root().child(1).child(2).child(1).addChild("x");
//     tree.root().child(1).child(2).child(1).child(0).highlight();
//     tree.layout();
//     av.step();
//     //%%%%%%%%%%%%%%%%%%%%%%%%%%%%% slide 15 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//     label1.text("Finally, we complete the parse tree by adding");
//     label2.text("nodes for this innermost &lambda; expression.");
//     arr.removeClass([4],"lambdaexphighlight");
//     tree.root().child(1).child(2).child(1).child(0).unhighlight();
//     arr.addClass([5,6],"lambdaexphighlight");
//     tree.root().child(1).child(2).child(3).addChild("&lambda;");
//     tree.root().child(1).child(2).child(3).addChild(varNT);
//     tree.root().child(1).child(2).child(3).child(1).addClass("wide");
//     tree.root().child(1).child(2).child(3).child(1).addChild("y");
//     tree.root().child(1).child(2).child(3).addChild(".");
//     tree.root().child(1).child(2).child(3).addChild(eNT);
//     tree.root().child(1).child(2).child(3).child(3).addClass("wider");
//     tree.root().child(1).child(2).child(3).child(3).addChild(varNT);
//     tree.root().child(1).child(2).child(3).child(3).child(0).addClass("wide");
//     tree.root().child(1).child(2).child(3).child(3).child(0).addChild("z");
//     tree.root().child(1).child(2).child(3).child(3).child(0).child(0).highlight();
//     tree.root().child(1).child(2).child(3).child(0).highlight();
//     tree.root().child(1).child(2).child(3).child(1).highlight();
//     tree.root().child(1).child(2).child(3).child(2).highlight();
//     tree.root().child(1).child(2).child(3).child(3).highlight();
//     tree.root().child(1).child(2).child(3).child(1).child(0).highlight()
//     tree.root().child(1).child(2).child(3).child(3).child(0).highlight();
//     tree.layout();
//     av.step(); 
//     //%%%%%%%%%%%%%%%%%%%%%%%%%%%%% slide 16 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//     label1.text("And this is the complete parse");
//     label2.text("tree for the &lambda; expression above.");
//     arr.removeClass([5,6],"lambdaexphighlight");
//     tree.root().child(1).child(2).child(3).child(0).unhighlight();
//     tree.root().child(1).child(2).child(3).child(1).unhighlight();
//     tree.root().child(1).child(2).child(3).child(2).unhighlight();
//     tree.root().child(1).child(2).child(3).child(3).unhighlight();
//     tree.root().child(1).child(2).child(3).child(3).child(0).unhighlight();
//     tree.root().child(1).child(2).child(3).child(1).child(0).unhighlight()
//     tree.root().child(1).child(2).child(3).child(3).child(0).child(0).unhighlight();
//     tree.layout();
//     av.step(); 


    av.recorded();

    // %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%




});
