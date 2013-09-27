"use strict";
(function ($){
	var tree;
	var treeNodes;
	var parents;
	var labels;
	var arr;
	var i;
	var code;
	
	var jsav = new JSAV("container");
	
	arr = new Array(10);
    //Initializing the labels
    for (i = 0; i < arr.length; i++) {
      arr[i] = String.fromCharCode(i + 65);
    }
    labels = jsav.ds.array(arr, {left: 700, top: -80, indexed: true, layout: 'vertical'});
    //Rendering the tree on the container
    //initTree();
    //Initializing the parent pointer
    for (i = 0; i < arr.length; i++) {
      arr[i] = "/";
    }
    parents = jsav.ds.array(arr, {left: 755, top: -80, layout: 'vertical'});
	
	var code = jsav.code({url: "../../../SourceCode/Processing/General/ParPtrTree.pde",
                       lineNumbers: false,
                       startAfter: "/* *** ODSATag: UnionFind *** */",
                       endBefore: "/* *** ODSAendTag: UnionFind *** */", top: 0, left: 80});    
	//Displaying Tree Nodes
	var newNode;
    tree = jsav.ds.tree({left: 50, top: 220, nodegap: 20});
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
	jsav.umsg("<b><u>Processing Edge (A, B)</b></u><br>");
	jsav.step();
	jsav.umsg("The Root of (A) is (A), size(A) = 1<br>", {'preserve': true});
	a.addClass('highlight');
	code.setCurrentLine(0);
	jsav.step();
	jsav.umsg("The Root of (B) is (B), size(B) = 1<br>", {'preserve': true});
	b.addClass('highlight');
	code.setCurrentLine(1);
	jsav.step();
    jsav.umsg("Union Nodes (A) and (B) <br> Make root according to alphabetical order");
	a.addChild(b);
	parents.value(1, 0);
	tree.layout();
	a.removeClass('highlight');
	b.removeClass('highlight');
	code.setCurrentLine(7);
	jsav.step();
	jsav.umsg("<br>Make size(A) = 2", {'preserve': true});
	code.setCurrentLine(8);
	jsav.step();
	
	//Edge (C, H)
	jsav.umsg("<b><u>Processing Edge (C, H)</b></u><br>");
	jsav.step();
	jsav.umsg("The Root of (C) is (C), size(C) = 1<br>", {'preserve': true});
	c.addClass('highlight');
	code.setCurrentLine(0);
	jsav.step();
	jsav.umsg("The Root of (H) is (H), size(H) = 1", {'preserve': true});
	h.addClass('highlight');
	code.setCurrentLine(1);
	jsav.step();
	jsav.umsg("Union Nodes (C) and (H) <br> Make root according to alphabetical order");
	c.addChild(h);	
	parents.value(7, 2);
	tree.layout();
	c.removeClass('highlight');
	h.removeClass('highlight');
	code.setCurrentLine(7);
	jsav.step();
	jsav.umsg("<br>Make size(C) = 2", {'preserve': true});
	code.setCurrentLine(8);
	jsav.step();
	
	//Edge (G, F)
    jsav.umsg("<b><u>Processing Edge (G, F)</b></u><br>");
	jsav.step();
	jsav.umsg("The Root of (G) is (G), size(G) = 1<br>", {'preserve': true});
	g.addClass('highlight');
	code.setCurrentLine(0);
	jsav.step();
	jsav.umsg("The Root of (F) is (F), size(F) = 1", {'preserve': true});
	f.addClass('highlight');
	code.setCurrentLine(1);
	jsav.step();
	jsav.umsg("Union Nodes (G) and (F) <br> Make root according to alphabetical order");
	f.addChild(g);	
	parents.value(6, 5);
	tree.layout();
	f.removeClass('highlight');
	g.removeClass('highlight');
	code.setCurrentLine(7);
	jsav.step();
	jsav.umsg("<br>Make size(F) = 2", {'preserve': true});
	code.setCurrentLine(8);
	jsav.step();
	
	//Edge (F, I)
    jsav.umsg("<b><u>Processing Edge (F, I)</b></u><br>");
	jsav.step();
	jsav.umsg("The Root of (F) is (F), size(F) = 2<br>", {'preserve': true});
	f.addClass('highlight');
	code.setCurrentLine(0);
	jsav.step();
	jsav.umsg("The Root of (I) is (I), size(I) = 1", {'preserve': true});
	i.addClass('highlight');
	code.setCurrentLine(1);
	jsav.step();
	jsav.umsg("Union Nodes (F) and (I) <br> Make (F) as root as size(F) > size(I)");
	f.addChild(i);	
	parents.value(8, 5);
	tree.layout();
	f.removeClass('highlight');
	i.removeClass('highlight');
	code.setCurrentLine(7);
	jsav.step();
	jsav.umsg("<br>Make size(F) = 3", {'preserve': true});
	code.setCurrentLine(8);
	jsav.step();
	
	//Edge (D, E)
    jsav.umsg("<b><u>Processing Edge (D, E)</b></u><br>");
	jsav.step();
	jsav.umsg("The Root of (D) is (D), size(D) = 1<br>", {'preserve': true});
	d.addClass('highlight');
	code.setCurrentLine(0);
	jsav.step();
	jsav.umsg("The Root of (E) is (E), size(E) = 1", {'preserve': true});
	e.addClass('highlight');
	code.setCurrentLine(1);
	jsav.step();
	jsav.umsg("Union Nodes (D) and (E) <br> Make root according to alphabetical order");
	d.addChild(e);	
	parents.value(4, 3);
	tree.layout();
	d.removeClass('highlight');
	e.removeClass('highlight');
	code.setCurrentLine(7);
	jsav.step();
	jsav.umsg("<br>Make size(D) = 2", {'preserve': true});
	code.setCurrentLine(8);
	jsav.step();
	
	//Edge (H, A)
    jsav.umsg("<b><u>Processing Edge (A, H)<b><u><br>");
	jsav.step();
	jsav.umsg("The Root of (A) is (A), size(A) = 2<br>", {'preserve': true});
	a.addClass('highlight');
	code.setCurrentLine(0);
	jsav.step();
	jsav.umsg("The Root of (H) is (C), size(C) = 2<br>", {'preserve': true});
	c.addClass('highlight');
	code.setCurrentLine(1);
	jsav.step();
	jsav.umsg("Union Nodes (A) and (H) <br> Make root according to alphabetical order");
	a.addChild(c);	
	parents.value(2, 0);
	tree.layout();
	a.removeClass('highlight');
	c.removeClass('highlight');
	code.setCurrentLine(7);
	jsav.step();
	jsav.umsg("<br>Make size(A) = 4", {'preserve': true});
	code.setCurrentLine(8);
	jsav.step();
	
	//Edge (E, G)
    jsav.umsg("<b><u>Processing Edge (E, G)</b></u><br>");
	jsav.step();
	jsav.umsg("The Root of (E) is (D), size(D) = 2<br>", {'preserve': true});
	d.addClass('highlight');
	code.setCurrentLine(0);
	jsav.step();
	jsav.umsg("The Root of (G) is (F), size(F) = 3<br>", {'preserve': true});
	f.addClass('highlight');
	code.setCurrentLine(1);
	jsav.step();
	jsav.umsg("Union Nodes (E) and (G) <br> Make (F) as root as size(F) > size(D)");
	f.addChild(d);	
	parents.value(3, 5);
	tree.layout();
	f.removeClass('highlight');
	d.removeClass('highlight');
	code.setCurrentLine(4);
	jsav.step();
	jsav.umsg("<br>Make size(F) = 5", {'preserve': true});
	code.setCurrentLine(5);
	jsav.step();
	
    //Edge (H, E)
    jsav.umsg("<b><u>Processing Edge (H, E)<b><u><br>");
	jsav.step();
	jsav.umsg("The Root of (H) is (A), size(A) = 4<br>", {'preserve': true});
	a.addClass('highlight');
	code.setCurrentLine(0);
	jsav.step();
	jsav.umsg("The Root of (E) is (F), size(F) = 5<br>", {'preserve': true});
	f.addClass('highlight');
	code.setCurrentLine(1);
	jsav.step();
	jsav.umsg("Union Nodes (H) and (E) <br> Make (F) as root as size(F) > size(A)");
	f.addChild(a);	
	parents.value(0, 5);
	tree.layout();
	a.removeClass('highlight');
	f.removeClass('highlight');
	code.setCurrentLine(4);
	jsav.step();
	jsav.umsg("<br>Make size(F) = 9", {'preserve': true});
	code.setCurrentLine(5);
	jsav.step();
	jsav.umsg("<br><b>Final UnionFind Data Structure</b>");
	jsav.recorded();

}(jQuery))
