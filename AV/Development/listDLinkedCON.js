"use strict";
// Helper function for creating a pointer
function setPointer(name, obj){
  var jsav = obj.jsav;
  var pointer = jsav.pointer(name, obj,{visible: true, 
                anchor: "left top",
                myAnchor: "right bottom",
                left: 20,
                top: -15});
  return pointer;
}
function setPointer1(name, obj){
  var jsav = obj.jsav;
  var pointer = jsav.pointer(name, obj,{visible: true, 
                          anchor: "left top",
                          myAnchor: "right bottom",
                          left: 20,
                          top: "70px" });
  return pointer;
}
function addEdge(node1, node2){
  var edges = {};
  var jsav = node1.jsav;
  var nodeWidth = node1.element.outerWidth();
  var nodeHeight = node1.element.outerHeight();
  var edge1_fx = node1.element.position().left + node1.container.position().left + nodeWidth - 6;
  var edge1_fy = node1.element.position().top + node1.container.position().top + nodeHeight / 3;
  var edge1_tx = node2.element.position().left + node2.container.position().left;
  var edge1_ty = node2.element.position().top + node2.container.position().top + nodeHeight / 3;

  var edge2_fx = node2.element.position().left + node2.container.position().left + 6;
  var edge2_fy = node2.element.position().top + node2.container.position().top + nodeHeight / 3 * 2;
  var edge2_tx = node1.element.position().left + node1.container.position().left + nodeWidth;
  var edge2_ty = node1.element.position().top + node1.container.position().top + nodeHeight / 3 * 2;


  edges.topEdge = jsav.g.line(edge1_fx, edge1_fy, edge1_tx, edge1_ty,
      {"arrow-end": "classic-wide-long", "stroke-width": 2, "stroke-dasharray":"-"});
  edges.bottomEdge = jsav.g.line(edge2_fx, edge2_fy, edge2_tx, edge2_ty,
      {"arrow-end": "classic-wide-long", "stroke-width": 2, "stroke-dasharray":"-"});
  edges.hide = function (){
    edges.topEdge.hide();
    edges.bottomEdge.hide();
  }
  edges.show = function (){
    edges.topEdge.hide();
    edges.bottomEdge.hide();
  }
  return edges;
}
// JSAV extension
(function ($) {
  JSAV._types.ds.DListNode.prototype.odsa_addSlash = function(type, options){
    var fx = this.element.position().left + this.container.position().left + 41;
    var fy = this.element.position().top + this.container.position().top + 32;
    if (type === "left")
    {
      fx = this.element.position().left + this.container.position().left + 1;
    }

    var options = options || {};
	if(options.left){
	  fx += options.left;
	}
	if(options.top){
	  fy += options.top;
	}
	if(options.visible === "undefined"){
      options.visible = 100;
	}
	return this.jsav.g.line(fx, fy, fx + 10, fy - 31,
      {"opacity": options.visible,"stroke-width": 1});
  }

  JSAV._types.ds.DListNode.prototype.odsa_addVLine = function(options){	  
	var fx = this.element.position().left + this.container.position().left;
    var fy = this.element.position().top + this.container.position().top;
    var nodeWidth = this.element.outerWidth();
    var nodeHeight = this.element.outerHeight();
    var nodegap = this.next().element.offset().left - this.element.offset().left - nodeWidth;
    var options = options || {};
	if(options.left){
	  fx += options.left;
	}
	if(options.top){
	  fy += options.top;
	}	
	if(options.visible === "undefined"){
      options.visible = 100;
	}
	return this.jsav.g.line(fx - nodegap/2, fy - 5 , fx - nodegap/2, fy + 35,
      {"opacity": options.visible, "stroke-width": 1});
  }
}(jQuery));

// Diagram showing the doubly linked list
(function ($) {
  var jsav = new JSAV("DLlistDiagramCON");
  // Relative offsets
  var leftMargin = 160;
  var topMargin = 45;
  // JSAV list
  var l = jsav.ds.dlist({"nodegap": 30, "center": false, "left": leftMargin, "top":topMargin});
  l.addFirst("null")
   .addFirst(15)
   .addFirst(12)
   .addFirst(23)
   .addFirst(20)
   .addFirst("null");
  l.layout();
  setPointer("head", l.get(0));
  setPointer("curr", l.get(2));
  setPointer("tail", l.get(5));
  l.get(0).odsa_addSlash("left");
  l.get(5).odsa_addSlash();
  l.get(2).odsa_addVLine();
}(jQuery));

// Doubly Linked Lists Insertion
(function ($) {
  var jsav = new JSAV("DLlistInsertCON");
  // Relative offsets
  var leftMargin = 150;
  var topMargin = 25;
  // Box "it"
  var itLabel = jsav.label("it",
	  {left: 20, top: 0, "font-size":"20px"});
  var itBox = jsav.ds.array(["15"], 
            {indexed: false, layout: "array", top: -20, left: 40});
  itBox.highlight();
  // JSAV list
  var l = jsav.ds.dlist({"nodegap": 30, "center": false, "left": leftMargin, "top":topMargin});
  l.addFirst("null")
   .addFirst(10)
   .addFirst(35)
   .addFirst(8)
   .addFirst(23)
   .addFirst("null");
  l.layout();
  l.get(0).odsa_addSlash("left");
  var tailSlash = l.get(5).odsa_addSlash();
  var Vline = l.get(2).odsa_addVLine();
  var Vline1 = l.get(2).odsa_addVLine({left : l.get(2).element.outerWidth()});
  var Vline2 = l.get(2).odsa_addVLine({top : 25});
  Vline1.hide();
  Vline2.hide();
  setPointer("head", l.get(0));
  var curr = setPointer("curr", l.get(2));

  setPointer("tail", l.get(5));
  jsav.umsg("The linked list before insertion. 15 is the value to be inserted.");
  jsav.displayInit();

  // Step 2
  jsav.umsg("Create a new link node.");
  var node = l.newNode("");
  node.css({top: 50, left: 184});
  node.highlight();
  node.next(l.get(2));
  l.get(2).prev(node);
  l.get(1).next(node);
  node.prev(l.get(1));
  l.get(1).edgeToNext().hide();
  l.get(2).edgeToNext().hide();
  l.get(2).edgeToPrev().hide();
  l.get(3).edgeToPrev().hide();
  l.layout({updateTop: false});  
  var longEdge = addEdge(l.get(1), l.get(3));
  tailSlash.hide();
  Vline.hide();
  Vline1.show();
  var newTailSlash = l.get(6).odsa_addSlash();
  jsav.step();
  // Step 3
  jsav.umsg("Copy the value of \"it\", which is 15, to the new node.");
  jsav.effects.copyValue(itBox, 0, node);
  jsav.step();

  // Step 4
  jsav.umsg("The new node's <code>next</code> field is assigned to point to what <code>curr</code> pointed to. The new node's <code>prev</code> field is assigned to point to what <code>curr.prev()</code> pointed to. <code>curr</code> points to the new link node.");
  l.get(2).edgeToNext().show();
  l.get(2).edgeToPrev().show();
  curr.target(l.get(2));
  jsav.step();

  // Step 5
  jsav.umsg("The <code>curr.prev()</code>'s <code>next</code> field is assigned to point to the new link node, which is now pointed by <code>curr</code>.");
  Vline1.hide();
  Vline2.show();
  l.get(1).highlight();
  l.get(2).unhighlight();
  l.get(1).edgeToNext().show();
  longEdge.topEdge.hide();
  jsav.step();

  // Step 6
  jsav.umsg("<code>curr.next()</code>'s <code>prev</code> field is assigned to point to the new link node.");
  longEdge.bottomEdge.hide();
  l.get(3).edgeToPrev().show();
  l.get(1).unhighlight();
  l.get(3).highlight();
  jsav.step();

  // Step 7
  jsav.umsg("The new link node is in its correct position in the list.");
  l.layout();
  l.get(3).unhighlight();
  l.get(2).highlight();
  Vline.show();
  Vline2.hide();
  jsav.step();

  // Step 8
  jsav.umsg("Increase the list size by 1.");
  jsav.step();
  jsav.recorded();
}(jQuery));

// Doubly Linked Lists Append method
(function ($) {
  var jsav = new JSAV("DLlistAppendCON");
  // Relative offsets
  var leftMargin = 150;
  var topMargin = 25;
  // Box "it"
  var itLabel = jsav.label("it",
	  {left: 20, top: 0, "font-size":"20px"});
  var itBox = jsav.ds.array(["15"], 
            {indexed: false, layout: "array", top: -20, left: 40});
  itBox.highlight();
  // JSAV list
  var l = jsav.ds.dlist({"nodegap": 40, "center": false, "left": leftMargin, "top":topMargin});
  l.addFirst("null")
   .addFirst(10)
   .addFirst(35)
   .addFirst(8)
   .addFirst(23)
   .addFirst("null");
  l.layout();
  l.get(0).odsa_addSlash("left");
  var tailSlash = l.get(5).odsa_addSlash();
  var Vline = l.get(2).odsa_addVLine();
  var Vline1 = l.get(2).odsa_addVLine({left : l.get(2).element.outerWidth()});
  var Vline2 = l.get(2).odsa_addVLine({top : 25});
  Vline1.hide();
  Vline2.hide();
  setPointer("head", l.get(0));
  var curr = setPointer("curr", l.get(2));
  setPointer("tail", l.get(5));
  jsav.umsg("The linked list before insertion. 15 is the value to be inserted.");
  jsav.displayInit();

  // Step 2
  jsav.umsg("Create a new link node.");
  var node = l.newNode("");
  node.css({top: 50, left: 184});
  node.highlight();
  node.next(l.get(2));
  l.get(2).prev(node);
  l.get(1).next(node);
  node.prev(l.get(1));
  l.get(1).edgeToNext().hide();
  l.get(2).edgeToNext().hide();
  l.get(2).edgeToPrev().hide();
  l.get(3).edgeToPrev().hide();
  l.layout({updateTop: false});  
  var longEdge = addEdge(l.get(1), l.get(3));
  tailSlash.hide();
  Vline.hide();
  Vline1.show();
  var newTailSlash = l.get(6).odsa_addSlash();
  jsav.step();
  // Step 3
  jsav.umsg("Copy the value of \"it\", which is 15, to the new node.");
  jsav.effects.copyValue(itBox, 0, node);
  jsav.step();

  // Step 4
  jsav.umsg("The new node's <code>next</code> field is assigned to point to what <code>curr</code> pointed to. The new node's <code>prev</code> field is assigned to point to what <code>curr.prev()</code> pointed to. <code>curr</code> points to the new link node.");
  l.get(2).edgeToNext().show();
  l.get(2).edgeToPrev().show();
  curr.target(l.get(2));
  jsav.step();

  // Step 5
  jsav.umsg("The <code>curr.prev()</code>'s <code>next</code> field is assigned to point to the new link node, which is now pointed by <code>curr</code>.");
  Vline1.hide();
  Vline2.show();
  l.get(1).highlight();
  l.get(2).unhighlight();
  l.get(1).edgeToNext().show();
  longEdge.topEdge.hide();
  jsav.step();

  // Step 6
  jsav.umsg("<code>curr.next()</code>'s <code>prev</code> field is assigned to point to the new link node.");
  longEdge.bottomEdge.hide();
  l.get(3).edgeToPrev().show();
  l.get(1).unhighlight();
  l.get(3).highlight();
  jsav.step();

  // Step 7
  jsav.umsg("The new link node is in its correct position in the list.");
  l.layout();
  l.get(3).unhighlight();
  l.get(2).highlight();
  Vline.show();
  Vline2.hide();
  jsav.step();

  // Step 8
  jsav.umsg("Increase the list size by 1.");
  jsav.step();
  jsav.recorded();
}(jQuery));