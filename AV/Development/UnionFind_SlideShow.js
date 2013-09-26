"use strict";
(function ($){
	var tree;
	var treeNodes;
	var parents;
	var labels;
	var arr;
	var i;
	
	var jsav = new JSAV("container");
	
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
	jsav.step();
	jsav.umsg("The Root of (B) is (B), size(B) = 1<br>", {'preserve': true});
	b.addClass('highlight');
	jsav.step();
    jsav.umsg("Union Nodes (A) and (B) <br> Make root according to alphabetical order");
	a.addChild(b);
	a.removeClass('highlight');
	b.removeClass('highlight');
	tree.layout();
	parents.value(1, 0);
	jsav.step();
	
	//Edge (C, H)
	jsav.umsg("<b><u>Processing Edge (C, H)</b></u><br>");
	jsav.step();
	jsav.umsg("The Root of (C) is (C), size(C) = 1<br>", {'preserve': true});
	c.addClass('highlight');
	jsav.step();
	jsav.umsg("The Root of (H) is (H), size(H) = 1", {'preserve': true});
	h.addClass('highlight');
	jsav.step();
	jsav.umsg("Union Nodes (C) and (H) <br> Make root according to alphabetical order");
	c.addChild(h);	
	c.removeClass('highlight');
	h.removeClass('highlight');
	tree.layout();
	parents.value(7, 2);
	jsav.step();
	
	//Edge (G, F)
    jsav.umsg("<b><u>Processing Edge (G, F)</b></u><br>");
	jsav.step();
	jsav.umsg("The Root of (G) is (G), size(G) = 1<br>", {'preserve': true});
	g.addClass('highlight');
	jsav.step();
	jsav.umsg("The Root of (F) is (F), size(F) = 1", {'preserve': true});
	f.addClass('highlight');
	jsav.step();
	jsav.umsg("Union Nodes (G) and (F) <br> Make root according to alphabetical order");
	f.addChild(g);	
	f.removeClass('highlight');
	g.removeClass('highlight');
	tree.layout();
	parents.value(6, 5);
	jsav.step();
	
	//Edge (F, I)
    jsav.umsg("<b><u>Processing Edge (F, I)</b></u><br>");
	jsav.step();
	jsav.umsg("The Root of (F) is (F), size(F) = 2<br>", {'preserve': true});
	f.addClass('highlight');
	jsav.step();
	jsav.umsg("The Root of (I) is (I), size(I) = 1", {'preserve': true});
	i.addClass('highlight');
	jsav.step();
	jsav.umsg("Union Nodes (F) and (I) <br> Make (F) as root as size(F) > size(I)");
	f.addChild(i);	
	f.removeClass('highlight');
	i.removeClass('highlight');
	tree.layout();
	parents.value(8, 5);
	jsav.step();
	
	//Edge (D, E)
    jsav.umsg("<b><u>Processing Edge (D, E)</b></u><br>");
	jsav.step();
	jsav.umsg("The Root of (D) is (D), size(D) = 1<br>", {'preserve': true});
	d.addClass('highlight');
	jsav.step();
	jsav.umsg("The Root of (E) is (E), size(E) = 1", {'preserve': true});
	e.addClass('highlight');
	jsav.step();
	jsav.umsg("Union Nodes (D) and (E) <br> Make root according to alphabetical order");
	d.addChild(e);	
	d.removeClass('highlight');
	e.removeClass('highlight');
	tree.layout();
	parents.value(4, 3);
	jsav.step();
	
	//Edge (H, A)
    jsav.umsg("<b><u>Processing Edge (H, A)<b><u><br>");
	jsav.step();
	jsav.umsg("The Root of (A) is (A), size(A) = 2<br>", {'preserve': true});
	a.addClass('highlight');
	jsav.step();
	jsav.umsg("The Root of (H) is (C), size(C) = 2<br>", {'preserve': true});
	c.addClass('highlight');
	jsav.step();
	jsav.umsg("Union Nodes (A) and (H) <br> Make root according to alphabetical order");
	a.addChild(c);	
	a.removeClass('highlight');
	c.removeClass('highlight');
	tree.layout();
	parents.value(2, 0);
	jsav.step();
	
	//Edge (E, G)
    jsav.umsg("<b><u>Processing Edge (E, G)</b></u><br>");
	jsav.step();
	jsav.umsg("The Root of (E) is (D), size(D) = 2<br>", {'preserve': true});
	d.addClass('highlight');
	jsav.step();
	jsav.umsg("The Root of (G) is (F), size(F) = 3<br>", {'preserve': true});
	f.addClass('highlight');
	jsav.step();
	jsav.umsg("Union Nodes (E) and (G) <br> Make (F) as root as size(F) > size(D)");
	f.addChild(d);	
	f.removeClass('highlight');
	d.removeClass('highlight');
	tree.layout();
	parents.value(3, 5);
	jsav.step();
	
    //Edge (H, E)
    jsav.umsg("<b><u>Processing Edge (H, E)<b><u><br>");
	jsav.step();
	jsav.umsg("The Root of (H) is (A), size(A) = 4<br>", {'preserve': true});
	a.addClass('highlight');
	jsav.step();
	jsav.umsg("The Root of (E) is (F), size(F) = 5<br>", {'preserve': true});
	f.addClass('highlight');
	jsav.step();
	jsav.umsg("Union Nodes (H) and (E) <br> Make (F) as root as size(F) > size(A)");
	f.addChild(a);	
	a.removeClass('highlight');
	f.removeClass('highlight');
	tree.layout();
	parents.value(0, 5);
	jsav.step();
	jsav.umsg("<br><b>Final UnionFind Data Structure</b>");
	jsav.recorded();

}(jQuery))
