"use strict";
(function ($){
	var tree;
	var treeNodes;
	var parents;
	var labels;
	var arr;
	var i;
	var code;
	
	//UnionFind with parent pointer
	var jsav = new JSAV("ufCON");
	
	arr = new Array(10);
    //Initializing the labels
    for (i = 0; i < arr.length; i++) {
      arr[i] = String.fromCharCode(i + 65);
    }
    labels = jsav.ds.array(arr, {left: 620, top: -80, indexed: true, layout: 'vertical'});
    //Rendering the tree on the container
    //initTree();
    //Initializing the parent pointer
    for (i = 0; i < arr.length; i++) {
      arr[i] = "/";
    }
    parents = jsav.ds.array(arr, {left: 675, top: -80, layout: 'vertical'});
	
	code = jsav.code({url: "../../../SourceCode/Processing/General/ParPtrTree.pde",
                       lineNumbers: false,
                       startAfter: "/* *** ODSATag: UnionFind *** */",
                       endBefore: "/* *** ODSAendTag: UnionFind *** */", top: 0, left: 50});    
	//Displaying Tree Nodes
	var newNode;
    tree = jsav.ds.tree({left: 30, top: 270, nodegap: 20});
    var root = tree.newNode("X");
    tree.root(root);
    root.id("root");
    for (i = 0; i < arr.length; i++) {
      newNode = tree.newNode(labels.value(i));
      newNode.size = 1;   //To maintain the size of each connected component
      root.addChild(newNode);
    }
	treeNodes = new Array(10);
	for (i = 0; i < arr.length; i++) {
	  treeNodes[i] = tree.root().child(i);
	}
    tree.layout();
	
	//Processing the Data Structure according to the example in the book
	var a = treeNodes[0];
	var b = treeNodes[1];
	var c = treeNodes[2];
	var d = treeNodes[3];
	var e = treeNodes[4];
	var f = treeNodes[5];
	var g = treeNodes[6];
	var h = treeNodes[7];
	var i = treeNodes[8];
	var j = treeNodes[9];
	
	jsav.displayInit();
	
	//Edge (A, B)
	jsav.umsg("<b><u>Processing Pair (A, B)</b></u><br>");
	jsav.step();
	jsav.umsg("The Root of (A) is (A), size(A) = 1<br>", {'preserve': true});
	a.addClass('highlight');
	labels.highlight(0);
	code.setCurrentLine(1);
	jsav.step();
	jsav.umsg("The Root of (B) is (B), size(B) = 1<br>", {'preserve': true});
	b.addClass('highlight');
	labels.highlight(1);
	code.setCurrentLine(2);
	jsav.step();
    jsav.umsg("Union Nodes (A) and (B) <br> Make root according to alphabetical order");
	a.addChild(b);
	parents.value(1, 0);
	tree.layout();
	a.removeClass('highlight');
	b.removeClass('highlight');
	labels.unhighlight(0);
	labels.unhighlight(1);
	code.setCurrentLine(8);
	jsav.step();
	jsav.umsg("<br>Make size(A) = 2", {'preserve': true});
	code.setCurrentLine(9);
	jsav.step();
	
	//Edge (C, H)
	jsav.umsg("<b><u>Processing Pair (C, H)</b></u><br>");
	jsav.step();
	jsav.umsg("The Root of (C) is (C), size(C) = 1<br>", {'preserve': true});
	c.addClass('highlight');
	labels.highlight(2);
	code.setCurrentLine(1);
	jsav.step();
	jsav.umsg("The Root of (H) is (H), size(H) = 1", {'preserve': true});
	h.addClass('highlight');
	labels.highlight(7);
	code.setCurrentLine(2);
	jsav.step();
	jsav.umsg("Union Nodes (C) and (H) <br> Make root according to alphabetical order");
	c.addChild(h);	
	parents.value(7, 2);
	tree.layout();
	c.removeClass('highlight');
	h.removeClass('highlight');
	labels.unhighlight(2);
	labels.unhighlight(7);
	code.setCurrentLine(8);
	jsav.step();
	jsav.umsg("<br>Make size(C) = 2", {'preserve': true});
	code.setCurrentLine(9);
	jsav.step();
	
	//Edge (G, F)
    jsav.umsg("<b><u>Processing Pair (G, F)</b></u><br>");
	jsav.step();
	jsav.umsg("The Root of (G) is (G), size(G) = 1<br>", {'preserve': true});
	g.addClass('highlight');
	labels.highlight(6);
	code.setCurrentLine(1);
	jsav.step();
	jsav.umsg("The Root of (F) is (F), size(F) = 1", {'preserve': true});
	f.addClass('highlight');
	labels.highlight(5);
	code.setCurrentLine(2);
	jsav.step();
	jsav.umsg("Union Nodes (G) and (F) <br> Make root according to alphabetical order");
	f.addChild(g);	
	parents.value(6, 5);
	tree.layout();
	f.removeClass('highlight');
	g.removeClass('highlight');
	labels.unhighlight(6);
	labels.unhighlight(5);
	code.setCurrentLine(8);
	jsav.step();
	jsav.umsg("<br>Make size(F) = 2", {'preserve': true});
	code.setCurrentLine(9);
	jsav.step();
	
	//Edge (F, I)
    jsav.umsg("<b><u>Processing Pair (F, I)</b></u><br>");
	jsav.step();
	jsav.umsg("The Root of (F) is (F), size(F) = 2<br>", {'preserve': true});
	f.addClass('highlight');
	labels.highlight(5);
	code.setCurrentLine(1);
	jsav.step();
	jsav.umsg("The Root of (I) is (I), size(I) = 1", {'preserve': true});
	i.addClass('highlight');
	labels.highlight(8);
	code.setCurrentLine(2);
	jsav.step();
	jsav.umsg("Union Nodes (F) and (I) <br> Make (F) as root as size(F) > size(I)");
	f.addChild(i);	
	parents.value(8, 5);
	tree.layout();
	f.removeClass('highlight');
	i.removeClass('highlight');
	labels.unhighlight(5);
	labels.unhighlight(8);
	code.setCurrentLine(8);
	jsav.step();
	jsav.umsg("<br>Make size(F) = 3", {'preserve': true});
	code.setCurrentLine(9);
	jsav.step();
	
	//Edge (D, E)
    jsav.umsg("<b><u>Processing Pair (D, E)</b></u><br>");
	jsav.step();
	jsav.umsg("The Root of (D) is (D), size(D) = 1<br>", {'preserve': true});
	d.addClass('highlight');
	labels.highlight(3);
	code.setCurrentLine(1);
	jsav.step();
	jsav.umsg("The Root of (E) is (E), size(E) = 1", {'preserve': true});
	e.addClass('highlight');
	labels.highlight(4);
	code.setCurrentLine(2);
	jsav.step();
	jsav.umsg("Union Nodes (D) and (E) <br> Make root according to alphabetical order");
	d.addChild(e);	
	parents.value(4, 3);
	tree.layout();
	d.removeClass('highlight');
	e.removeClass('highlight');
	labels.unhighlight(3);
	labels.unhighlight(4);
	code.setCurrentLine(8);
	jsav.step();
	jsav.umsg("<br>Make size(D) = 2", {'preserve': true});
	code.setCurrentLine(9);
	jsav.step();
	
	//Edge (H, A)
    jsav.umsg("<b><u>Processing Pair (A, H)<b><u><br>");
	jsav.step();
	jsav.umsg("The Root of (A) is (A), size(A) = 2<br>", {'preserve': true});
	a.addClass('highlight');
	labels.highlight(0);
	code.setCurrentLine(1);
	jsav.step();
	jsav.umsg("The Root of (H) is (C), size(C) = 2<br>", {'preserve': true});
	c.addClass('highlight');
	labels.highlight(2);
	code.setCurrentLine(2);
	jsav.step();
	jsav.umsg("Union Nodes (A) and (H) <br> Make root according to alphabetical order");
	a.addChild(c);	
	parents.value(2, 0);
	tree.layout();
	a.removeClass('highlight');
	c.removeClass('highlight');
	labels.unhighlight(0);
	labels.unhighlight(2);	
	code.setCurrentLine(8);
	jsav.step();
	jsav.umsg("<br>Make size(A) = 4", {'preserve': true});
	code.setCurrentLine(9);
	jsav.step();
	
	//Edge (E, G)
    jsav.umsg("<b><u>Processing Pair (E, G)</b></u><br>");
	jsav.step();
	jsav.umsg("The Root of (E) is (D), size(D) = 2<br>", {'preserve': true});
	d.addClass('highlight');
	labels.highlight(3);
	code.setCurrentLine(1);
	jsav.step();
	jsav.umsg("The Root of (G) is (F), size(F) = 3<br>", {'preserve': true});
	f.addClass('highlight');
	labels.highlight(5);
	code.setCurrentLine(2);
	jsav.step();
	jsav.umsg("Union Nodes (E) and (G) <br> Make (F) as root as size(F) > size(D)");
	f.addChild(d);	
	parents.value(3, 5);
	tree.layout();
	f.removeClass('highlight');
	d.removeClass('highlight');
	labels.unhighlight(3);
	labels.unhighlight(5);
	code.setCurrentLine(5);
	jsav.step();
	jsav.umsg("<br>Make size(F) = 5", {'preserve': true});
	code.setCurrentLine(6);
	jsav.step();
	
    //Edge (H, E)
    jsav.umsg("<b><u>Processing Pair (H, E)<b><u><br>");
	jsav.step();
	jsav.umsg("The Root of (H) is (A), size(A) = 4<br>", {'preserve': true});
	a.addClass('highlight');
	labels.highlight(0);
	code.setCurrentLine(1);
	jsav.step();
	jsav.umsg("The Root of (E) is (F), size(F) = 5<br>", {'preserve': true});
	f.addClass('highlight');
	labels.highlight(5);
	code.setCurrentLine(2);
	jsav.step();
	jsav.umsg("Union Nodes (H) and (E) <br> Make (F) as root as size(F) > size(A)");
	f.addChild(a);	
	parents.value(0, 5);
	tree.layout();
	a.removeClass('highlight');
	f.removeClass('highlight');
	labels.unhighlight(0);
	labels.unhighlight(5);
	code.setCurrentLine(5);
	jsav.step();
	jsav.umsg("<br>Make size(F) = 9", {'preserve': true});
	code.setCurrentLine(6);
	jsav.step();
	jsav.umsg("<br><b>Final UnionFind Data Structure</b>");
	jsav.recorded();
	
	//UnionFind with pathCompression
    jsav = new JSAV("pathcompCON");
	
	arr = new Array(10);
    //Initializing the labels
    for (i = 0; i < arr.length; i++) {
      arr[i] = String.fromCharCode(i + 65);
    }
    labels = jsav.ds.array(arr, {left: 280, top: 0, indexed: true});
    //Rendering the tree on the container
    //initTree();
    //Initializing the parent pointer
    for (i = 0; i < arr.length; i++) {
      arr[i] = "/";
    }
    parents = jsav.ds.array(arr, {left: 280, top: -47});
    
	//Displaying Tree Nodes
	var newNode;
    tree = jsav.ds.tree({left: 100, top: 70, nodegap: 20});
    var root = tree.newNode("X");
    tree.root(root);
    root.id("root");
    for (i = 0; i < arr.length; i++) {
      newNode = tree.newNode(labels.value(i));
      newNode.size = 1;   //To maintain the size of each connected component
      root.addChild(newNode);
    }
	treeNodes = new Array(10);
	for (i = 0; i < arr.length; i++) {
	  treeNodes[i] = tree.root().child(i);
	}
	
	//Processing the Data Structure according to the example in the book
	var a = treeNodes[0];
	var b = treeNodes[1];
	var c = treeNodes[2];
	var d = treeNodes[3];
	var e = treeNodes[4];
	var f = treeNodes[5];
	var g = treeNodes[6];
	var h = treeNodes[7];
	var i = treeNodes[8];
	var j = treeNodes[9];
	
	
	//Edge (A, B)
	a.addChild(b);
	parents.value(1, 0);
	
	//Edge (C, H)
	c.addChild(h);	
	parents.value(7, 2);
	
	//Edge (G, F)
	f.addChild(g);	
	parents.value(6, 5);

	
	//Edge (F, I)
	f.addChild(i);	
	parents.value(8, 5);

	
	//Edge (D, E)
	d.addChild(e);	
	parents.value(4, 3);
	
	//Edge (H, A)
	a.addChild(c);	
	parents.value(2, 0);
	
	//Edge (E, G)
	f.addChild(d);	
	parents.value(3, 5);
	
	tree.layout();
	
    //Edge (H, E) with path compression
	jsav.umsg("We will show how to union nodes (H) and (E) with path compression");
	jsav.displayInit();
    jsav.umsg("<b><u>Processing Edge (H, E)<b><u><br>");
	jsav.step();
	jsav.umsg("The Root of (H) is (A), size(A) = 4<br>", {'preserve': true});
	a.addClass('highlight');
	labels.highlight(0);
	jsav.step();
	jsav.umsg("The Root of (E) is (F), size(F) = 5<br>", {'preserve': true});
	f.addClass('highlight');
	labels.highlight(5);
	jsav.step();
	jsav.umsg("<b><u>Change the parent of all the nodes on the path from (H) to (A) to point to (A)</b></u><br>");
	jsav.step();
	jsav.umsg("Make (A) the parent of (H)<br>", {preserve: true});
	labels.unhighlight(0);
	labels.unhighlight(5);
	a.addChild(h);
	parents.value(7, 0);
	tree.layout();
	jsav.step();
	jsav.umsg("The parent of (C) is already (A) <br>", {preserve: true});
	jsav.step();
	
	jsav.umsg("<b><u>Change the parent of all the nodes on the path from (E) to (F) to point to (F)</b></u><br>");
	jsav.step();
	jsav.umsg("Make (F) the parent of (E)<br>", {preserve: true});
	f.addChild(e);
	parents.value(4, 5);
	tree.layout();
	jsav.step();
	jsav.umsg("The parent of (D) is already (F)<br>", {preserve: true});
	jsav.step();
	
	jsav.umsg("Union Nodes (H) and (E) <br> Make (F) as root as size(F) > size(A)");
	f.addChild(a);	
	a.removeClass('highlight');
	f.removeClass('highlight');
	tree.layout();
	jsav.step();
	jsav.umsg("<br><b>Final UnionFind Data Structure</b>");
	jsav.recorded();

}(jQuery))
