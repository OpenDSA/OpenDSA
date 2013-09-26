"use strict";
(function ($){
	var tree;
	var treeNodes;
	var parents;
	var labels;
	var arr;
	var i;
	
	var jsav = new JSAV("container_compression");
	
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
	jsav.step();
	jsav.umsg("The Root of (E) is (F), size(F) = 5<br>", {'preserve': true});
	f.addClass('highlight');
	jsav.step();
	jsav.umsg("<b><u>Change the parent of all the nodes on the path from (H) to (A) to point to (A)</b></u><br>");
	jsav.step();
	jsav.umsg("Make (A) the parent of (H)<br>", {preserve: true});
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
