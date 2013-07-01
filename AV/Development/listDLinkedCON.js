"use strict";
// Helper function for creating a pointer
function setPointer(name, obj){
  return obj.jsav.pointer(name, obj,{visible: true, 
                anchor: "left top",
                myAnchor: "right bottom",
                left: 20,
                top: -15});
}

// Helper function for drawing arrow around the node
function arrowAround(node, type, options){
  var jsav = node.jsav;
  var arrow;
  var nodeWidth = node.element.outerWidth();
  var nodeHeight = node.element.outerHeight();
  var nodegap = 40;
  var nextnode = node.next();
  if(nextnode){
    nodegap = nextnode.element.offset().left - node.element.offset().left - nodeWidth;
  }
  var left = node.element.offset().left - jsav.container.find(".jsavcanvas:first").offset().left;
  var top = node.element.offset().top - jsav.container.find(".jsavcanvas:first").offset().top;
  var opts = $.extend({leftOffset: nodegap/2,
                       rightOffset: nodegap/2, topOffset: 15, nodeGap: nodegap, nodeWidth: nodeWidth, nodeHeight: nodeHeight}, options);
  if(type === "top"){
    arrow = jsav.g.polyline([[left - opts.nodeGap - 6, top + opts.nodeHeight/3], 
      [left - opts.leftOffset, top + opts.nodeHeight/3], 
	  [left - opts.leftOffset, top - opts.topOffset],
	  [left + opts.nodeWidth + opts.rightOffset, top - opts.topOffset],
	  [left + opts.nodeWidth + opts.rightOffset, top + opts.nodeHeight/3],
	  [left + opts.nodeWidth + opts.nodeGap + 1,top + opts.nodeHeight/3]],
	  {"arrow-end":"classic-wide-long","stroke-width":2,"stroke-dasharray":"-"});
  }else if(type === "down"){
    arrow = jsav.g.polyline([[left + opts.nodeWidth + opts.nodeGap + 6,top + opts.nodeHeight/3*2],
      [left + opts.nodeWidth + opts.rightOffset, top + opts.nodeHeight/3*2],
      [left + opts.nodeWidth + opts.rightOffset, top + nodeHeight +  opts.topOffset],
      [left - opts.leftOffset, top + nodeHeight +  opts.topOffset],
      [left - opts.leftOffset, top + opts.nodeHeight/3*2], 
      [left - opts.nodeGap -1, top + opts.nodeHeight/3*2]],
    {"arrow-end":"classic-wide-long","stroke-width":2,"stroke-dasharray":"-"});
  }
  return arrow;
}

// Add two edges between two nodes
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
    var nodegap = this.element.offset().left - this.prev().element.offset().left - nodeWidth;
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

// Dlist Insertion
(function ($) {
  var jsav = new JSAV("DLlistInsertCON");
  var pseudo = jsav.code({url: "../../../SourceCode/Processing/Lists/Dlist.pde",
                       lineNumbers: false,
                       startAfter: "/* *** ODSATag: DListInsert *** */",
                       endBefore: "/* *** ODSAendTag: DListInsert *** */"});
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
  pseudo.highlight(0);
  jsav.umsg("The linked list before insertion. 15 is the value to be inserted.");
  jsav.displayInit();

  // Step 2
  jsav.umsg("Create a new link node.");
  var node = l.newNode("");
  node.css({top: 50, left: 164});
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
  pseudo.unhighlight(0);
  pseudo.highlight(1);
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
  pseudo.unhighlight(1);
  pseudo.highlight(2);
  jsav.step();

  // Step 6
  jsav.umsg("<code>curr.next()</code>'s <code>prev</code> field is assigned to point to the new link node.");
  longEdge.bottomEdge.hide();
  l.get(3).edgeToPrev().show();
  l.get(1).unhighlight();
  l.get(3).highlight();
  pseudo.unhighlight(2);
  pseudo.highlight(3);
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
  pseudo.unhighlight(3);
  pseudo.highlight(4);
  jsav.step();
  jsav.recorded();
}(jQuery));

// Dlist Append method
(function ($) {
  var jsav = new JSAV("DLlistAppendCON");
  var pseudo = jsav.code({url: "../../../SourceCode/Processing/Lists/Dlist.pde",
                       lineNumbers: false,
                       startAfter: "/* *** ODSATag: DListAppend *** */",
                       endBefore: "/* *** ODSAendTag: DListAppend *** */"});
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
  var Vline = l.get(5).odsa_addVLine();
  var Vline1 = l.get(5).odsa_addVLine({left : l.get(2).element.outerWidth()/2 + 15});
  var Vline2 = l.get(5).odsa_addVLine({top : 25});
  Vline1.hide();
  Vline2.hide();
  setPointer("head", l.get(0));
  var curr = setPointer("curr", l.get(2));
  setPointer("tail", l.get(5));
  jsav.umsg("The slideshow for append method is almost the same as that of insertion. 15 is the value to be inserted.");
  pseudo.highlight(0);
  jsav.displayInit();

  // Step 2
  jsav.umsg("Create a new link node.");
  var node = l.newNode("");
  node.css({top: 50, left: 410});
  node.highlight();
  node.next(l.get(5));
  l.get(5).prev(node);
  l.get(4).next(node);
  node.prev(l.get(1));
  l.get(4).edgeToNext().hide();
  l.get(5).edgeToNext().hide();
  l.get(5).edgeToPrev().hide();
  l.get(6).edgeToPrev().hide();
  l.layout({updateTop: false});  
  var longEdge = addEdge(l.get(4), l.get(6));
  tailSlash.hide();
  Vline.hide();
  Vline1.show();
  var newTailSlash = l.get(6).odsa_addSlash();
  pseudo.unhighlight(0);
  pseudo.highlight(1);
  jsav.step();

  // Step 3
  jsav.umsg("Copy the value of \"it\", which is 15, to the new node.");
  jsav.effects.copyValue(itBox, 0, node);
  jsav.step();

  // Step 4
  jsav.umsg("The new node's <code>next</code> field is assigned to point to what <code>tail</code> pointed to. The new node's <code>prev</code> field is assigned to point to what <code>tail.prev()</code> pointed to. ");
  l.get(5).edgeToNext().show();
  l.get(5).edgeToPrev().show();
  curr.target(l.get(2));
  jsav.step();

  // Step 5
  jsav.umsg("<code>tail</code> node's <code>prev</code> field is assigned to point to the new link node.");
  longEdge.bottomEdge.hide();
  l.get(6).edgeToPrev().show();
  l.get(5).unhighlight();
  l.get(6).highlight();
  jsav.step();

  // Step 6
  jsav.umsg("The <code>tail.prev().prev()</code>'s <code>next</code> field is assigned to point to the new link node.");
  Vline1.hide();
  Vline2.show();
  l.get(4).highlight();
  l.get(6).unhighlight();
  l.get(4).edgeToNext().show();
  longEdge.topEdge.hide();
  pseudo.unhighlight(1);
  pseudo.highlight(2);
  jsav.step();

  // Step 7
  jsav.umsg("The new link node is in its correct position in the list.");
  l.layout();
  l.get(4).unhighlight();
  l.get(5).highlight();
  Vline.show();
  Vline2.hide();
  jsav.step();

  // Step 8
  jsav.umsg("Increase the list size by 1.");
  l.get(5).unhighlight();
  pseudo.unhighlight(2);
  pseudo.highlight(3);
  jsav.step();
  jsav.recorded();
}(jQuery));

// Dlist Remove method
(function ($) {
  var jsav = new JSAV("DLlistRemoveCON");
  var pseudo = jsav.code({url: "../../../SourceCode/Processing/Lists/Dlist.pde",
                       lineNumbers: false,
                       startAfter: "/* *** ODSATag: DListRemove *** */",
                       endBefore: "/* *** ODSAendTag: DListRemove *** */"});
  // Relative offsets
  var leftMargin = 10;
  var topMargin = 45;
  // Create a the hidden array
  var itBox = jsav.ds.array([""], 
      {indexed: false, layout: "array",left: leftMargin + 170, top: topMargin + 35}).hide();
  itBox.highlight();

  // "It"
  var itLabel = jsav.label("it", 
      {left: leftMargin + 103, top: topMargin + 58, "font-size":"20px"}).hide();
  var arrowIt = jsav.g.line(leftMargin + 119, topMargin + 70, leftMargin + 159, topMargin + 70,
      {"arrow-end": "classic-wide-long", "opacity": 0,"stroke-width": 2});
  //itLabel.hide();

  // JSAV list
  var l = jsav.ds.dlist(
      {"nodegap": 30, "center": false, "left": leftMargin, "top":topMargin});
  l.addFirst("null")
   .addFirst(35)
   .addFirst(8)
   .addFirst(23)
   .addFirst("null");
  l.layout();
  l.get(0).odsa_addSlash("left");
  var tailSlash = l.get(4).odsa_addSlash();
  var Vline = l.get(2).odsa_addVLine();
  var Vline1 = l.get(2).odsa_addVLine({left : l.get(2).element.outerWidth()/2 + 15, top : -35});
  var Vline2 = l.get(2).odsa_addVLine({top : 25});
  Vline1.hide();
  Vline2.hide();
  setPointer("head", l.get(0));
  var curr = setPointer("curr", l.get(2));
  setPointer("tail", l.get(4));
  jsav.umsg("Here is the linked list before we remove the node with value 8.");
  pseudo.highlight(0);
  jsav.displayInit();

  // Step 2
  jsav.umsg("Since curr is not at the tail position, we can proceed");
  l.get(2).highlight();
  pseudo.unhighlight(0);
  pseudo.highlight(1);
  jsav.step();

  // Step 3
  jsav.umsg("Remember the value of the current node.");
  itBox.show();
  arrowIt.show();
  itLabel.show();
  jsav.effects.copyValue(l.get(2), itBox, 0);
  l.get(2).unhighlight();
  pseudo.unhighlight(1);
  pseudo.highlight(2);
  jsav.step();

  // Step 4
  jsav.umsg("<code>curr.prev()</code>'s next field is set to point to <code>curr.next()</code>.");
  var dashLineTop = arrowAround(l.get(2), "top");
  l.get(1).edgeToNext().hide();
  Vline.hide();
  itBox.unhighlight(0);
  pseudo.unhighlight(2);
  pseudo.highlight(3);
  jsav.step();

  // Step 5
  jsav.umsg("<code>curr.next()</code>'s prev field is set to point to <code>curr.prev()</code>.");
  var dashLineDown = arrowAround(l.get(2), "down");
  l.get(3).edgeToPrev().hide();
  pseudo.unhighlight(3);
  pseudo.highlight(4);
  jsav.step();

  // Step 6
  jsav.umsg("Set the pointer <code>curr</code> pointing to next node of the node what <code>curr</code> points to.");
  curr.target(l.get(3));
  Vline1.show();
  pseudo.unhighlight(4);
  pseudo.highlight(5);
  jsav.step();

  // Step 7
  jsav.umsg("The node with value 8 is not pointed by any node from the list, so it is safe to remove the node from the list.");
  jsav.step();

  // Step 8
  jsav.umsg("The node with value 8 is removed from the list. Decrement node count by 1.");
  l.remove(2);
  l.get(1).edgeToNext().show();
  l.layout();
  dashLineTop.hide();
  dashLineDown.hide();
  tailSlash.hide();
  var newTailSlash = l.get(3).odsa_addSlash();
  Vline1.hide();
  Vline.show();
  pseudo.unhighlight(5);
  pseudo.highlight(6);
  jsav.step();

  // Step 9
  jsav.umsg(" Return value removed.");
  itBox.highlight(0);
  pseudo.unhighlight(6);
  pseudo.highlight(7);
  jsav.step();
  jsav.recorded();
}(jQuery));

// Dlist prev method
(function ($) {
  var jsav = new JSAV("DLlistPrevCON");
  var pseudo = jsav.code({url: "../../../SourceCode/Processing/Lists/Dlist.pde",
                       lineNumbers: false,
                       startAfter: "/* *** ODSATag: DListPrev *** */",
                       endBefore: "/* *** ODSAendTag: DListPrev *** */"});
  // Relative offsets
  var leftMargin = 150;
  var topMargin = 25;

  // JSAV list
  var l = jsav.ds.dlist(
      {"nodegap": 30, "center": false, "left": leftMargin, "top":topMargin});
  l.addFirst("null")
   .addFirst(10)
   .addFirst(35)
   .addFirst(8)
   .addFirst(23)
   .addFirst("null");
  l.layout();
  l.get(0).odsa_addSlash("left");
  var tailSlash = l.get(5).odsa_addSlash();
  var Vline = l.get(3).odsa_addVLine();
  var Vline1 = l.get(2).odsa_addVLine();
  Vline1.hide();
  setPointer("head", l.get(0));
  var curr = setPointer("curr", l.get(3));
  setPointer("tail", l.get(5));
  jsav.umsg("The prev method is easy.");
  pseudo.highlight(0);
  jsav.displayInit();

  // Step 2
  jsav.umsg("The node with value 35 is the current node");
  l.get(3).highlight();
  jsav.step();

  // Step 3
  jsav.umsg("Since the node <code>curr.prev()</code> is not <code>head</code> node, we can proceed.");
  l.get(3).unhighlight();
  l.get(2).highlight();
  pseudo.unhighlight(0);
  pseudo.highlight(1);
  jsav.step();

  // Step 4
  jsav.umsg("The variable <code>curr</code> is set to point to  <code>curr.prev()</code>.");
  curr.target(l.get(2));
  Vline.hide();
  Vline1.show();
  pseudo.unhighlight(1);
  pseudo.highlight(2);
  jsav.step();

  // Step 5
  jsav.umsg("This takes &Theta;(1) time.");
  pseudo.unhighlight(2);
  jsav.step();
  jsav.recorded();
}(jQuery));