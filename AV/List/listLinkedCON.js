"use strict";
// Various functions and variables that will be used by all of the
// following sections of the tutorial.

// Helper function for seting pointer
function setPointer(name, node, opt){
  var pointerRight = {anchor: "right top",
    myAnchor: "left bottom",
    left: -10,
    top: -20};
  var pointerLeft = {anchor: "left top",
    myAnchor: "right bottom",
    left: 15,
    top: -20};
  if(opt === "right"){
    return node.jsav.pointer(name, node, pointerRight);
  }else{
    return node.jsav.pointer(name, node, pointerLeft);
  }
}

// JSAV extension
(function ($) {
  JSAV._types.ds.ListNode.prototype.odsa_addTail = function(options){	  
	var fx = $('#' + this.id()).position().left + this.container.position().left + 33;
    var fy = $('#' + this.id()).position().top + this.container.position().top + 32;
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

  JSAV._types.ds.ListNode.prototype.odsa_addVLine = function(options){	  
	var fx = $('#' + this.id()).position().left + this.container.position().left;
    var fy = $('#' + this.id()).position().top + this.container.position().top;
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
	return this.jsav.g.line(fx - 15, fy - 5 , fx - 15, fy + 35,
      {"opacity": options.visible, "stroke-width": 1});
  }
}(jQuery));

// Diagram showing node concept
(function ($) {
  var jsav = new JSAV("listLinkedNodeCON", {"animationMode": "none"});
  var l = jsav.ds.list({"nodegap": 30, "top": 50, left: 350});

  // Relative offsets
  var labelLeftMargin = 350;
  var labelTopMargin = 10;

  var nodeLabel = jsav.label("nodes",
                    {before: l, left: labelLeftMargin + 70, top: labelTopMargin});
  var node1Arrow = jsav.g.line(labelLeftMargin + 75, labelTopMargin + 20,
                              labelLeftMargin + 15, labelTopMargin + 35,
	  {"arrow-end": "classic-wide-long", "opacity": 100,"stroke-width": 1});

  var node2Arrow = jsav.g.line(labelLeftMargin + 90, labelTopMargin + 20,
                              labelLeftMargin + 90, labelTopMargin + 35,
	  {"arrow-end": "classic-wide-long", "opacity": 100,"stroke-width": 1});

  var node3Arrow = jsav.g.line(labelLeftMargin + 105, labelTopMargin + 20,
                              labelLeftMargin + 165, labelTopMargin + 35,
	  {"arrow-end": "classic-wide-long", "opacity": 100,"stroke-width": 1});

  l.addFirst("").addFirst("").addFirst("");
  l.layout();
}(jQuery));

// Initial state of a linked list when using a header node
(function ($) {
  var jsav = new JSAV("listLinkedInitCON", {"animationMode": "none"});
  
  // Relative offsets
  var leftMargin = 367;
  var topMargin = 50;
  
  var l = jsav.ds.list({"nodegap": 30, "top": topMargin, left: leftMargin});
  l.addFirst("null")
   .addFirst("null");
  l.layout();

  // Head
  var head = setPointer("head", l.get(0));

  // Curr
  var curr = setPointer("curr", l.get(1));
  // Tail
  var tail = setPointer("tail", l.get(1), "right");
  // Diagonal slash
  var slash = l.get(1).odsa_addTail( );
  // Vertical bar  
  var bar = l.get(1).odsa_addVLine( );
  jsav.recorded();
}(jQuery));

// Bad representation version for linked list
(function ($) {
  var jsav = new JSAV("LlistBadCON");

  // Relative offsets
  var leftMargin = 257;
  var topMargin = 50;

  var l = jsav.ds.list({"nodegap": 30, "top": topMargin, left: leftMargin});
    l.addFirst(15)
   .addFirst(12)
   .addFirst(10)
   .addFirst(23)
   .addFirst(20);
  l.layout();

  //head
  var head = setPointer("head", l.get(0));
  head.hide();
  // curr
  var curr = setPointer("curr", l.get(2));
  curr.hide();
  // tail
  var tail = setPointer("tail", l.get(4));
  tail.hide();
  // Vertical line  
  var bar = l.get(2).odsa_addVLine( );
  //Diagonal slash at tail
  var slash = l.get(4).odsa_addTail( );
  //Diagonal slash in step 3
  var slash3 = l.get(3).odsa_addTail({visible:0});

  jsav.umsg("Here is a graphical depiction for a linked list storing five integers. The value stored in a pointer variable is indicated by an arrow \"pointing\" to something. A NULL pointer is indicated graphically by a diagonal slash through a pointer variable's box. The vertical line between the nodes labeled 23 and 10 indicates the current position (immediately to the right of this line).");
  jsav.displayInit();

  //step 2
  head.show();
  curr.show();
  tail.show();
  jsav.umsg("The list's first node is accessed from a pointer named head. To speed access to the end of the list, and to allow the append method to be performed in constant time, a pointer named tail is also kept to the last link of the list. The position of the current element is indicated by another pointer, named curr.");
  jsav.step();

  //step 3
  slash.hide();
  slash3.show();
  l.remove(2);
  l.layout();
  jsav.umsg("Here is what we would like to have happen when we delete the current node (the one with value 10).");
  jsav.step();
  jsav.recorded();
}(jQuery));

// Bad Reason for the problem representation version of linked list
(function ($) {
  var jsav = new JSAV("LlistBadReasonCON");

  // Relative offsets
  var leftMargin = 257;
  var topMargin = 50;

  // Linked list
  var l = jsav.ds.list({"nodegap": 30, "top": topMargin, left: leftMargin});
  l.addFirst(15)
   .addFirst(12)
   .addFirst(10)
   .addFirst(23)
   .addFirst(20);
  l.get(1).highlight();
  l.layout();

  //Hiddent JSAV array for animation
  var arr = jsav.ds.array([""], 
            {indexed: false, layout: "array", left:0}).hide();
  // Head
  var head = setPointer("head", l.get(0));
  // Curr
  var curr = setPointer("curr", l.get(2));
  // Tail
  var tail = setPointer("tail", l.get(4));

  // Vertical line
  var bar = l.get(2).odsa_addVLine( );
  // Another vertical line
  var bar2 = l.get(3).odsa_addVLine({visible : 0});

  //Diagonal slash
  var slash = l.get(4).odsa_addTail( );
  //dash line in step 4
  var dashlineLeftMargin = 452
  var dashline = jsav.g.polyline([[dashlineLeftMargin, 66], 
      [dashlineLeftMargin + 13, 66], [dashlineLeftMargin + 13, 30],[dashlineLeftMargin + 83,30],[dashlineLeftMargin + 83,66],[dashlineLeftMargin + 101,66]], {"arrow-end":"classic-wide-long", "opacity":0, "stroke-width":2,"stroke-dasharray":"-"});
  
  //Diagonal slash in step 6
  var slash5 = l.get(3).odsa_addTail({visible : 0});

  jsav.umsg("Another problem is that we have no link to get us to the preceding node (shown in yellow). So we have no way to update its <code>next</code> pointer.");
  jsav.displayInit();

  l.get(1).unhighlight();
  l.get(3).highlight();
  jsav.umsg("Often we can get around this problem during deletion by copying the value following the current node (in this case the value 12) back into the current node. Let's look again at the example where we delete value 10.");
  jsav.step();
  
  l.get(3).unhighlight();
  l.get(2).value("");
  l.get(2).highlight();
  jsav.umsg("First we remove the value 10 from the current node.");
  jsav.step();
  
  jsav.effects.moveValue(l.get(3), l.get(2));
  jsav.umsg("Now we move the value 12 to the current node).");
  jsav.step();

  dashline.show();
  l.get(2).edgeToNext().hide();
  l.get(3).edgeToNext().hide();
  l.get(2).unhighlight();
  l.get(3).highlight();
  jsav.umsg(" Now we can route around the un-needed node.");
  jsav.step();

  dashline.hide();
  l.remove(3);
  l.get(2).edgeToNext().show();
  slash.hide();
  slash5.show();
  l.layout();
  jsav.umsg("The node with a value of 10 is removed from the list.");
  jsav.step();


  curr.hide();
  tail.hide();
  var newcurr = setPointer("curr", l.get(3));
  var newtail = setPointer("tail", l.get(3), "right");
  bar.hide();
  bar2.show();
  l.get(2).highlight();
  jsav.umsg("Unfortunately, this approach does not work when the current node is the last one on the list, as in this example. Here we want to delete the node with value 15. But there is no way to update the <code>next</code> pointer of the node with value 12. There is no direct way around this problem with the list as shown here.");
  jsav.step();
  jsav.recorded();
}(jQuery));

// List with header and tailer nodes added
(function ($) {
  var jsav = new JSAV("listLinkedHeaderTailerCON", {"animationMode": "none"});

  // Relative offsets
  var leftMargin = 180;
  var topMargin = 50;
  var l = jsav.ds.list({"nodegap": 30, "top": topMargin, left: leftMargin});
  l.addFirst("null")
   .addFirst(15)
   .addFirst(12)
   .addFirst(10)
   .addFirst(23)
   .addFirst(20)
   .addFirst("null");
  l.layout();

  // Head
  var head = setPointer("head", l.get(0));
  // Curr
  var curr = setPointer("curr", l.get(3));

  // Tail
  var tail = setPointer("tail", l.get(6));

  // Vertical line
  var bar = l.get(3).odsa_addVLine( );
  // Diagonal slash
  var slash = l.get(6).odsa_addTail( );

  jsav.recorded();
}(jQuery));

// Show off the data members
(function ($) {
  var jsav = new JSAV("LlistVarsCON");	
  var pseudo = jsav.code({url: "../../../SourceCode/Processing/Lists/LList.pde",
                        lineNumbers: false,
                        startAfter: "/* *** ODSATag: LListVars *** */",
                        endBefore: "/* *** ODSAendTag: LListVars *** */"});
  jsav.umsg("Let's take a look at the data members for class <code>LList</code>.");
  jsav.displayInit();

  jsav.umsg("First, notice that class <code>LList</code> implements the <code>List</code> interface. This means that <code>LList</code> is required to give implementations for all of the methods listed as part of the <code>List</code> interface.");
  pseudo.highlight(0);
  jsav.step();

  pseudo.unhighlight(0);
  pseudo.highlight(1);
  jsav.umsg("The first of the private data members is <code>head</code>, the first node of the list. This header node is a link node like any other, but its value is ignored and it is not considered to be an actual element of the list.");
  jsav.step(); 
  pseudo.unhighlight(1);
  pseudo.highlight(2);
  jsav.umsg("The second of the private data members is <code>tail</code>, the last node of the list. This trailer node is a link node like any other, but its <code>next</code> field is set to <code>null</code>, pointing to nowhere. Like the header node, the trailer node's value is ignored.");
  jsav.step();
  pseudo.unhighlight(2);
  pseudo.highlight(3);
  jsav.umsg("Data member <code>curr</code> is the current node of the list. It could be any node on the list, except the <code>head</code> node. If <code>curr</code> points to the same node as <code>tail</code>, then <code>curr</code> is at the end of the list and a newly inserted node would go to the end.");
  jsav.step();
  pseudo.unhighlight(3);
  pseudo.highlight(4);
  jsav.umsg(" Since there is no simple way to compute the length of the list simply from these three pointers, the list length will be stored explicitly, and updated by every operation that modifies the list size. The value cnt stores the length of the list.");
  jsav.step();
  pseudo.unhighlight(4);
  jsav.umsg("Because <code>head</code>, <code>tail</code>, <code>curr</code>, and <code>cnt</code> are all declared to be <code>private</code>, they may only be accessed by methods of Class <code>LList</code>.");
  jsav.recorded();
}(jQuery));

// Work through the constructors
(function ($) {
  var jsav = new JSAV("LListCons");	
  var pseudo = jsav.code({url: "../../../SourceCode/Processing/Lists/LList.pde",
                        lineNumbers: false,
                        startAfter: "/* *** ODSATag: LListCons *** */",
                        endBefore: "/* *** ODSAendTag: LListCons *** */"});

  jsav.umsg("Let's look at the constructors for class <code>LList</code>.");
  pseudo.highlight(0);
  jsav.displayInit();
  
  // Slide
  jsav.umsg("The constructor for LList maintains the optional parameter for minimum list size introduced for Class AList. This is done simply to keep the calls to the constructor consistent for both implementations. The linked list class does not declare a fixed-size array when the list is created, so this parameter is unnecessary for linked lists. It is ignored.");
  pseudo.unhighlight(0);
  pseudo.highlight(1);
  jsav.step();

  // Slide
  jsav.umsg("So the constructor that takes the value just calls the version that does not take a value.")
  pseudo.highlight(2);
  jsav.step();

  // Slide
  pseudo.unhighlight(1);
  pseudo.unhighlight(2);
  pseudo.highlight(5);
  pseudo.highlight(6);
  pseudo.highlight(7);
  pseudo.highlight(8);
  pseudo.highlight(9);
  jsav.umsg("Both constructors rely on the clear method to do the real work.");
  jsav.step(); 

  // Slide
  jsav.umsg("The <code>clear</code> method initializes the list to just the empty header and trailer nodes as was shown before.");
  jsav.recorded();
}(jQuery));

//Linked list insertion
(function ($) {
  var jsav = new JSAV("LlistInsertCON");
  //pseudocode
  var pseudo = jsav.code({url: "../../../SourceCode/Processing/Lists/LList.pde",
                       lineNumbers: false,
                       startAfter: "/* *** ODSATag: LListInsert *** */",
                       endBefore: "/* *** ODSAendTag: LListInsert *** */"});

  // Offsets
  var leftMargin = 217;
  var topMargin =  40;

  // Create an list object under control of JSAV library
  var l = jsav.ds.list({"nodegap": 30, "top": topMargin, left: leftMargin});
  l.addFirst("null")
   .addFirst(12)
   .addFirst(23)
   .addFirst(35)
   .addFirst("null");
  l.layout();

  // create two hidden arrays for ".copyValue" animation 
  var arr = jsav.ds.array([""], 
            {indexed: true, layout: "array"});
  arr.hide(); 

  // head
  var head = setPointer("head", l.get(0));  
  // curr
  var curr = setPointer("curr", l.get(2));  
  // Tail
  var tail = setPointer("tail", l.get(4));  

  //Diagonal slash
  var slash = l.get(4).odsa_addTail();
  var newSlash = l.get(4).odsa_addTail({left:72, top:0, visible : 0});

  //Vertical bar
  var bar = l.get(2).odsa_addVLine( );

  //Horizontal arrow in step 4 pointing to item 12
  var longArrow= jsav.g.line(leftMargin + 185, topMargin + 16, leftMargin + 293, topMargin + 16,{"arrow-end": "classic-wide-long", "opacity": 0,"stroke-width": 2});
 
  // Box "it"
  var itLabel = jsav.label("it",
	  {before: l, left: 20, top: 0, "font-size":"20px"});
  var itBox = jsav.ds.array(["15"], 
            {indexed: false, layout: "array", top: -20, left: 40});

  //initialize the link list
  jsav.umsg("The linked list before insertion. 15 is the value to be inserted.");

  itBox.highlight(0);
  pseudo.highlight(1);
  jsav.displayInit();
    
  //step 2
  var newNode = l.newNode("");	
  // Set the position for the new node
  newNode.css({top: 60, left: 187}); 
  var node = l.get(2).next();    
  l.get(2).next(newNode);
  newNode.next(node);
  l.get(2).edgeToNext().hide();
  l.get(3).edgeToNext().hide();    
  longArrow.show();
  slash.hide();
  newSlash.show();
  l.layout({updateTop: false});
  jsav.umsg("Create a new link node.");
  //Copy 23 to the new link node   
  jsav.effects.copyValue(arr, 0, newNode);
  newNode.highlight();
  pseudo.unhighlight(1);
  pseudo.highlight(2);
  jsav.step();
  
  //step 3
  jsav.umsg("Copy <code>current.element()</code> as the new node's value.");
  //Copy 10 to the new link node   
  jsav.effects.copyValue(l.get(2), newNode);
  jsav.step();

  //step 4
  l.get(3).edgeToNext().show();
  newNode.unhighlight();
  l.layout({updateTop: false}); // control that top coordinate of nodes should not be recalculated
  l.get(3).highlight();
  jsav.umsg("The next field of the new list node is assigned to point to what <code>curr.next()</code> points to.");
  jsav.step();

  //step 5
  l.get(2).highlight();
  l.get(3).unhighlight();
  l.get(2).edgeToNext().show();	
  longArrow.hide();
  jsav.umsg("<code>curr</code>'s <code>next</code> field is assigned to point to the new link node.");
  jsav.step();

  //step 6
  l.get(2).unhighlight();
  l.get(3).highlight();
  jsav.umsg("The new link node is in its correct position in the list.");
  l.layout();
  jsav.step();

  //step 7
  jsav.effects.copyValue(itBox, 0, l.get(2));
  itBox.unhighlight(0);
  l.get(3).unhighlight();
  l.get(2).highlight();
  jsav.umsg("The value of the current node is set to the value of \"it\", which is 15.");
  pseudo.unhighlight(2);
  pseudo.highlight(3);
  jsav.step();

  //step 8
  jsav.umsg("Increase the list size by 1.");
  l.get(2).unhighlight();
  pseudo.unhighlight(3);
  pseudo.highlight(5);
  jsav.step();
  jsav.recorded();
}(jQuery));

//Special cases for Linked list insertion 
(function ($) {
  var jsav =  new JSAV("LlistSpecInsertCON");
  var pseudo = jsav.code({url: "../../../SourceCode/Processing/Lists/LList.pde",
                       lineNumbers: false,
                       startAfter: "/* *** ODSATag: LListInsert *** */",
                       endBefore: "/* *** ODSAendTag: LListInsert *** */"});
  // Relative offsets
  var leftMargin = 27;
  var topMargin = 80;

  // Box "it"
  var itLabel = jsav.label("it",
	  {left: 20, top: 0, "font-size":"20px"});
  var itBox = jsav.ds.array(["15"], 
            {indexed: false, layout: "array", top: -20, left: 40});
  var l = jsav.ds.list({"nodegap": 30, "top": topMargin, left: leftMargin});
  l.addFirst("null")
        .addFirst(20)
        .addFirst("null");
  l.layout();
  
  //Inserting at the tail of the list.
  //DOM elements are created here.
  function InsertTail(jsavSpec){
	this.jsav = jsavSpec;
    // Relative offsets
    this.leftMargin = leftMargin;
    this.topMargin = topMargin;
	// Head
    this.head = setPointer("head", l.get(0));  
	// Curr
    this.curr = setPointer("curr", l.get(2));  
	// Tail
    this.tail = setPointer("tail", l.get(2), "right");

    //Vertical bar
    this.bar1 = l.get(2).odsa_addVLine( );

    //Diagonal slash
    this.slash = l.get(2).odsa_addTail( );

    //Diagonal slash for new node
    this.newNodeSlash = this.jsav.g.line(this.leftMargin + 254, this.topMargin + 92,
                          this.leftMargin + 264, this.topMargin + 62,
	  {"opacity": 0,"stroke-width": 1});

    //Diagonal slash for new tail
    this.newTailSlash = l.get(2).odsa_addTail({left : 74, visible : 0});

  }
  //Clear DOM elements
  InsertTail.prototype.clear = function(){
	  l.hide();
	  this.head.hide();
	  this.curr.hide();
	  this.tail.hide();
	  this.bar1.hide();
	  this.slash.hide();
	  this.newNodeSlash.hide();
	  this.newTailSlash.hide();
  }
  
  InsertTail.prototype.steps = function(){
	//step 1
    this.jsav.umsg("Here is an example showing insertion at the end of the list. 15 is the value to be inserted.");
    itBox.highlight(0);
	pseudo.highlight(1);
    this.jsav.displayInit();

    //step 2
    this.newNode = l.newNode("");	
    // Set the position for the new node
    this.newNode.css({top: 60, left: 222}); 
    this.newNode.highlight();  
    this.jsav.umsg("Create a new link node.");
    pseudo.unhighlight(1);
    pseudo.highlight(2);
    this.jsav.step();
	
	//step 3
    this.jsav.effects.copyValue(l.get(2), this.newNode);
    this.jsav.umsg("Copy current.element() to the new node (this value is <code>null</code>).");
    this.jsav.step();

	//step 4
    this.newNodeSlash.show();
    this.jsav.umsg("The <code>next</code> field for the new node is assigned to point to what <code>curr.next()</code> points to (which is <code>null</code>).");
    this.jsav.step();

	//step 5
    var node = l.get(2).next();    
    l.get(2).edgeToNext();
    l.get(2).next(this.newNode);
    this.newNode.next(node);
    this.newNode.unhighlight();
    l.get(2).highlight();
    l.layout({updateTop: false}); // control that top coordinate of nodes should not be recalculated
    this.slash.hide();
    this.jsav.umsg("<code>curr</code>'s <code>next</code> field is assigned to point to the new link node.");
    this.jsav.step();

    //step 6
    this.jsav.effects.copyValue(itBox, 0, l.get(2));
	itBox.unhighlight(0);
    this.jsav.umsg("The value of the current node is set to 15.");
    pseudo.unhighlight(2);
    pseudo.highlight(3);
    this.jsav.step();

    //step 7
    l.layout();
    this.newNodeSlash.hide();
    this.newTailSlash.show();
    this.tail.target(l.get(3),
      {anchor: "left top", myAnchor: "right bottom", left: 15, top: -20});
	l.get(2).unhighlight();
    l.get(3).highlight();
    this.jsav.umsg(" Update the new tail.");
    pseudo.unhighlight(3);
    pseudo.highlight(4);
    this.jsav.step();

    //step 8	
    l.get(3).unhighlight();
    this.jsav.umsg("Increase the list size by 1.");
    pseudo.unhighlight(4);
    pseudo.highlight(5);
    this.jsav.step();
  }
  
  //Inserting into empty list
  //DOM elements are created here.
  function InsertEmpty(jsavEmp) {
    this.jsav = jsavEmp;
	// Relative offsets
    this.leftMargin = leftMargin -17;
    this.topMargin = topMargin - 40;
	this.l = this.jsav.ds.list({"nodegap": 30, "top": this.topMargin + 40, left: this.leftMargin + 17});
	this.l.addFirst("null")
          .addFirst("null");
    this.l.layout();
	//Head
    this.head = setPointer("head", this.l.get(0)); 
	//Curr
	this.curr = setPointer("curr", this.l.get(1));
	//Tail
    this.tail = setPointer("tail", this.l.get(1), "right");
	//Vertical bar
    this.bar = this.jsav.g.line(this.leftMargin + 75, this.topMargin + 40, this.leftMargin + 75, this.topMargin + 70,
		{"stroke-width": 1, "stroke":"#000"});

    //Diagonal slash
    this.slash = this.jsav.g.line(this.leftMargin + 125, this.topMargin + 72,
                          this.leftMargin + 135, this.topMargin + 42,
	  {"opacity": 0,"stroke-width": 1});

    //Diagonal slash for new node
    this.newNodeSlash = this.jsav.g.line(this.leftMargin + 198, this.topMargin + 72 +60,
                          this.leftMargin + 208, this.topMargin + 42 +60,
	  {"opacity": 0,"stroke-width": 1});

    //Diagonal slash for new tail
    this.newTailSlash = this.jsav.g.line(this.leftMargin + 197, this.topMargin + 72,
                          this.leftMargin + 207, this.topMargin + 42,
	  {"opacity": 0,"stroke-width": 1});
  }
  //
  InsertEmpty.prototype.steps = function(){
	//step 9
    pseudo.highlight(1);
	pseudo.unhighlight(5);
    this.jsav.umsg("Inserting into the empty list is similar to inserting at the end of the list. Here 15 is again being inserted.");
    itBox.highlight(0);
	this.head.show();
	this.curr.show();
	this.tail.show();
	this.slash.show();
    this.jsav.step();	

	//step 10
    this.newNode = this.l.newNode("");	
    // Set the position for the new node
    this.newNode.css({top: 60, left: 149}); 
    this.newNode.highlight();  
    this.jsav.umsg("Create a new link node.");
    pseudo.unhighlight(1);
    pseudo.highlight(2);
    this.jsav.step();
	
	//step 11
    this.jsav.effects.copyValue(this.l.get(1), this.newNode);
    this.jsav.umsg("Copy current.element() to the new node, which is null.");
    this.jsav.step();

	//step 12
    this.newNodeSlash.show();
    this.jsav.umsg("The <code>next</code> field for the new node is assigned to point to what <code>curr.next()</code> points to (which is <code>null</code>).");
    this.jsav.step();

	//step 13
    var node = this.l.get(1).next();    
    this.l.get(1).edgeToNext();
    this.l.get(1).next(this.newNode);
    this.newNode.next(node);
    this.newNode.unhighlight();
    this.l.get(1).highlight();
    this.l.layout({updateTop: false}); // control that top coordinate of nodes should not be recalculated
    this.slash.hide();
    this.jsav.umsg("<code>curr.next()</code> is assigned to point to the new link node.");
    this.jsav.step();

    //step 14
    this.jsav.effects.copyValue(itBox, 0, this.l.get(1));
	itBox.unhighlight(0);
    this.jsav.umsg("The value of the current node is set to 15.");
    pseudo.unhighlight(2);
    pseudo.highlight(3);
    this.jsav.step();

    //step 15
    this.l.layout();
    this.newNodeSlash.hide();
    this.newTailSlash.show();
	this.tail.target(this.l.get(2),
      {anchor: "left top", myAnchor: "right bottom", left: 15, top: -20});
	this.l.get(1).unhighlight();
	this.l.get(2).highlight();
    this.jsav.umsg(" Update the new tail.");
    pseudo.unhighlight(3);
    pseudo.highlight(4);
    this.jsav.step();

    //step 16
    this.l.get(2).unhighlight();
    this.jsav.umsg("Increase the list size by 1.");
    pseudo.unhighlight(4);
    pseudo.highlight(5);
    this.jsav.step();
	
  }

  //Inserting at the tail of the list
  var insertTail = new InsertTail(jsav);
  insertTail.steps();
  insertTail.clear();
   
  //Insert into empty list.
  var insertEmpty = new InsertEmpty(jsav);
  insertEmpty.steps();
  jsav.recorded();
}(jQuery));

// Linked list deletion
(function ($) {
  var jsav = new JSAV("LlistRemoveCON");
  // pseudocode
  var pseudo = jsav.code({url: "../../../SourceCode/Processing/Lists/LList.pde",
                       lineNumbers: false,
                       startAfter: "/* *** ODSATag: LListRemove *** */",
                       endBefore: "/* *** ODSAendTag: LListRemove *** */"});
  // Relative offsets
  var leftMargin = 250;
  var topMargin = 40;
  // JSAV list
  var l = jsav.ds.list({"nodegap": 30, "center": false, "left": leftMargin, "top":topMargin});
  l.addFirst("null")
   .addFirst(10)
   .addFirst(35)
   .addFirst(8)
   .addFirst(23)
   .addFirst("null");
  l.layout();
  // Create a the hidden array
  var arr = jsav.ds.array(["10"], {indexed: false, layout: "array",left: leftMargin + 140, top: topMargin + 35}).hide();

  //Head
  var head = setPointer("head", l.get(0));
  //Curr
  var curr = setPointer("curr", l.get(2));
  //Tail
  var tail = setPointer("tail", l.get(5));
  // "It"
  var labelIt = jsav.label("it", 
	            {before: arr, left: leftMargin + 73, top: topMargin + 58, "font-size":"20px"});
  var arrowIt = jsav.g.line(leftMargin + 89, topMargin + 70,
	  leftMargin + 129, topMargin + 70,
	  {"arrow-end": "classic-wide-long", "opacity": 0,"stroke-width": 2});
  labelIt.hide();
  // Dashline
  var dashline = jsav.g.polyline([[leftMargin + 186, topMargin + 17],[leftMargin + 125 + 74, topMargin + 17],
	  [leftMargin + 199, topMargin - 12],[leftMargin + 276,topMargin - 12],
	  [leftMargin + 276,topMargin + 17],[leftMargin + 297,topMargin + 17]], 
	  {"arrow-end":"classic-wide-long", "opacity":0, "stroke-width":2,"stroke-dasharray":"-"});
  // Vertical bar
  var verticalBar = l.get(2).odsa_addVLine( );
  //Diagonal slash
  var slash = l.get(5).odsa_addTail( );
  // New slash after deletion
  var newSlash = l.get(4).odsa_addTail({visible : 0});

  //initialize the linked list
  jsav.umsg("Now let's look at the <code>remove</code> method.");	
  pseudo.highlight(1);
  jsav.displayInit(); 

  //step 2
  l.get(2).highlight();
  l.layout({updateLeft: false});
  jsav.umsg("Here is the linked list before we remove the node with value 8.");
  jsav.step(); 

  //step 3
  arr.show();
  jsav.effects.copyValue(l.get(2), arr, 0);
  labelIt.show();
  arrowIt.show();
  l.get(2).unhighlight();
  arr.highlight(0);
  jsav.umsg("Remember the value of the current node.");
  pseudo.unhighlight(1);
  pseudo.highlight(3);
  jsav.step();  
  
  //step 4
  jsav.effects.copyValue(l.get(3), l.get(2));
  l.get(2).highlight();
  arr.unhighlight(0);
  jsav.umsg("Pull forward the next node's value");
  pseudo.unhighlight(3);
  pseudo.highlight(4);
  jsav.step();

  //step 5
  l.get(2).edgeToNext().hide();
  l.get(3).edgeToNext().hide();
  dashline.show();
  l.get(4).highlight();
  jsav.umsg("<code>curr</code>'s next field is set to point to the node following the one being deleted. This removes the node from the linked list.");	
  pseudo.unhighlight(4);
  pseudo.highlight(6);
  jsav.step();	

  //step 6
  l.remove(3);
  dashline.hide(); 
  l.layout();
  l.get(2).edgeToNext().show();
  slash.hide();
  newSlash.show();
  l.get(2).unhighlight();  
  l.get(3).unhighlight();
  jsav.umsg("Decrease the list size by 1.");
  pseudo.unhighlight(6);
  pseudo.highlight(7);
  jsav.step();
  
  //step 7
  arr.highlight();
  jsav.umsg(" Return the value of the node that was deleted.");
  pseudo.unhighlight(7);
  pseudo.highlight(8);
  jsav.step();
  jsav.recorded();
}(jQuery));

// Move curr around the Linked list
(function ($) {
  var jsav = new JSAV("LlistPosCON");
  // Relative offsets
  var leftMargin = 210;
  var topMargin = 25;
  // JSAV list
  var l = jsav.ds.list({"nodegap": 30, "center": false, "left": leftMargin, "top":topMargin});
  l.addFirst("null")
   .addFirst(10)
   .addFirst(35)
   .addFirst(8)
   .addFirst(23)
   .addFirst("null");
  l.layout();

  // pseudocode
  var pseudo_next = jsav.code({url: "../../../SourceCode/Processing/Lists/LList.pde",
                       lineNumbers: false,
                       startAfter: "/* *** ODSATag: LListNext *** */",
                       endBefore: "/* *** ODSAendTag: LListNext *** */", top: 150, left: 80}).hide();
  var pseudo_prev = jsav.code({url: "../../../SourceCode/Processing/Lists/LList.pde",
                       lineNumbers: false,
                       startAfter: "/* *** ODSATag: LListPrev *** */",
                       endBefore: "/* *** ODSAendTag: LListPrev *** */"}).hide();
  var pseudo_pos = jsav.code({url: "../../../SourceCode/Processing/Lists/LList.pde",
                       lineNumbers: false,
                       startAfter: "/* *** ODSATag: LListPos *** */",
                       endBefore: "/* *** ODSAendTag: LListPos *** */"}).hide();
  // Head
  var head = setPointer("head", l.get(0));
  // Curr
  var curr = setPointer("curr", l.get(3));
  // Temp
  var temp = setPointer("temp", l.get(3));
  temp.hide();
  // Curr Next
  var nextCurr = setPointer("curr", l.get(4));
  nextCurr.hide();
  // Tail
  var tail = setPointer("tail", l.get(5));
  // Diagonal slash
  var slash = l.get(5).odsa_addTail( );

  jsav.umsg("Finally, we will look at how a few other methods work.");
  jsav.displayInit();

  pseudo_next.show();
  pseudo_next.highlight(1);
  jsav.umsg("Method next simply moves curr one position toward the tail of the list.");
  jsav.step();

  //step 3  
  l.get(4).highlight();
  curr.hide();
  nextCurr.show();
  jsav.umsg("This takes &Theta;(1) time.");
  jsav.step();

  //step 4
  l.get(4).unhighlight();
  pseudo_next.hide();
  pseudo_prev.show();
  pseudo_prev.highlight(1);
  jsav.umsg("Method prev moves curr one position toward the head of the list, but its implementation is more difficult.");
  jsav.step();
  
  //step 5
  pseudo_next.hide();
  pseudo_prev.show();
  pseudo_prev.unhighlight(1);
  pseudo_prev.highlight(5);
  l.get(0).highlight();
  l.get(1).highlight();  
  l.get(2).highlight();  
  l.get(3).highlight();
  jsav.umsg("In a singly linked list, there is no pointer to the previous node. Thus, the only alternative is to march down the list from the beginning until we reach the current node (being sure always to remember the node before it, because that is what we really want). ");
  jsav.step();

  // Step 6
  l.get(0).unhighlight();
  l.get(1).unhighlight();  
  l.get(2).unhighlight(); 
  temp.show();
  jsav.umsg("Once <code>temp.next()</code> is equal to <code>curr</code>, we are at the right place.");
  jsav.step();

  //step 7
  temp.hide();
  curr.show();
  nextCurr.hide();
  pseudo_next.hide();
  pseudo_prev.show();
  pseudo_prev.unhighlight(5);
  pseudo_prev.highlight(6);
  jsav.umsg("<code>curr</code> can now be set to point to where <code>temp</code> is pointing. This process takes &Theta;(<i>n</i>) time in the average and worst cases.");
  jsav.step();

  //step 8
  l.get(3).unhighlight();
  pseudo_prev.hide();
  pseudo_pos.show();
  pseudo_pos.highlight(1);
  jsav.umsg("Method <code>moveToPos</code> moves <code>curr</code> to position <code>pos</code>. Note that 23, as the first element on the list, is at position 0.");
  jsav.step();
  //step 9  
  l.get(1).highlight();
  l.get(2).highlight();
  l.get(3).highlight();  
  l.get(4).highlight();
  curr.hide();
  nextCurr.show();
  pseudo_pos.unhighlight(1);
  pseudo_pos.highlight(7);
  jsav.umsg("Implementation of <code>moveToPos(3)</code> is similar in that finding the 3th position requires marching down 3 + 1 positions from the head of the list.");
  jsav.step();

  //step 10
  l.get(1).unhighlight();
  l.get(2).unhighlight();
  l.get(3).unhighlight();  
  l.get(4).unhighlight();
  jsav.umsg("This takes &Theta;(<i>i</i>) time, where <i>i</i> is the position to move to.");
  jsav.step();

  jsav.recorded();
}(jQuery));