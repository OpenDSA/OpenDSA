/* global document, console, $, JSAV */

$(document).ready(function () {
"use strict";

    JSAV.init();
    JSAV.ext.SPEED = 500;
    var av;

    // Use this instatiation for embedding in standalone parseTree1.html file
//    av = new JSAV($("#parseTree"));
    //////////////////////////////////////////////////////

    // Use this instatiation for embedding as inlineav in RST file
     var av_name = "parseTree2";
     var interpret = ODSA.UTILS.loadConfig({"av_name": av_name}).interpreter;
     av = new JSAV(av_name);
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
    the_exp = the_exp.replace(/\s/g,'');	// Squeeze spaces from the string
    var the_parse_tree =
	[ 'program', // The parse tree produced by the JISON parser.  At each level, index 0 is the type of node and remaining indices are its childrew
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
		'(',
		[ 'exp',
		  [ 'exp',
		    [ 'trm',
		      [ 'trm', [ 'fac', [ 'pri', 'E' ] ] ],
		      '*',
		      [ 'fac', [ 'pri', 'F' ] ] ] ],
		  '+',
		  [ 'trm', [ 'fac', [ 'pri', 'G' ] ] ] ],
		')' ] ] ] ];
    

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
	    label1.text("\nParsing terminal " + node.value());
	    node.addClass("jsavhighlight");
	    arr.addClass(arr_index_to_highlight, "jsavhighlight");
	    arr_index_to_highlight++;
	    av.step();
	}
	console.log("node " + node.value());
	var i = 0;
	var temp = [];
	label1.text("\nParsing non-terminal " + node.value());
	while (node.child(i) !== undefined) {
	    node.child(i).show( {recursive: false} );
	    temp.push(node.child(i));
	    i = i + 1;
	}
	if (temp.length !== 0) {
	    av.step();
	}
	
	while (temp.length !== 0) {
	    nodes.unshift(temp.pop());
	}
	display_parse(nodes, arr_index_to_highlight);
    };



    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    //    arr = av.ds.array(the_exp.split(" "));
    arr = av.ds.array(the_exp.split("")); // Spaces have been squeezed from the_exp by the time this happens, splitting with an empty string yields an array of the non-space characters
    arr.addClass(true, "oneCharWidth");
    label1 = av.label("\nBeginning the parse ");
    av.umsg(" ");
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
