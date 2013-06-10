"use strict";
// Various functions and variables that will be used by all of the
// following sections of the tutorial.

// The various arrays to start sweeps with or display
var tempArr = [10];
// List node width = min-width + padding-right
var nodeWidth = 42;
var nodeGap = 25;

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
  var leftMargin = 350;
  var topMargin = 10;
  
  var l = jsav.ds.list({"nodegap": 30, "top": topMargin + 40, left: leftMargin + 17});

  // Head
  var headLabel = jsav.label("head",
                    {before: l, left: leftMargin, top: topMargin});
  var headArrow = jsav.g.line(leftMargin + 10, topMargin + 20,
                              leftMargin + 30, topMargin + 40,
	  {"arrow-end": "classic-wide-long", "opacity": 100,"stroke-width": 2});

  // Curr
  var currLabel = jsav.label("curr",
	  {before: l, left: leftMargin + 70, top: topMargin, "font-size":"20px"});
  var currArrow = jsav.g.line(leftMargin + 80, topMargin + 20,
                              leftMargin + 100, topMargin + 40,
	  {"arrow-end": "classic-wide-long", "opacity": 100,"stroke-width": 2});

  // Tail
  var tailLabel = jsav.label("tail",
	  {before: l, left: leftMargin + 120, top: topMargin, "font-size":"20px"});
  var tailArrow = jsav.g.line(leftMargin + 130, topMargin + 20,
                              leftMargin + 110, topMargin + 40,
	  {"arrow-end": "classic-wide-long", "opacity": 100,"stroke-width": 2});

  // Diagonal slash
  var slash = jsav.g.line(leftMargin + 125, topMargin + 72,
                          leftMargin + 135, topMargin + 42,
	  {"opacity": 100,"stroke-width": 1});

  // Vertical bar  
  var bar = jsav.g.line(leftMargin + 73, topMargin + 35,
                          leftMargin + 73, topMargin + 75,
	                      {"stroke-width": 1, "stroke":"#000"});

  l.addFirst("null")
   .addFirst("null");
  l.layout();
  jsav.recorded();
}(jQuery));

// Bad representation version for linked list
(function ($) {
  var jsav = new JSAV("LlistBadCON");

  // Relative offsets
  var labelLeftMargin = 240;
  var labelTopMargin = 10;
  // Relative offsets for tail and slash in step 3
  var labelLeftMargin3 = labelLeftMargin -74;

  var l = jsav.ds.list({"nodegap": 30, "top": labelTopMargin + 40, left: labelLeftMargin + 17});

  var headLabel = jsav.label("head",
                    {before: l, left: labelLeftMargin, top: labelTopMargin});
  headLabel.hide();
  var headArrow = jsav.g.line(labelLeftMargin + 10, labelTopMargin + 20,
                              labelLeftMargin + 30, labelTopMargin + 40,
	  {"arrow-end": "classic-wide-long", "opacity": 100,"stroke-width": 2});
  headArrow.hide();

  var currLabel = jsav.label("curr",
	  {before: l, left: labelLeftMargin + 150, top: labelTopMargin, "font-size":"20px"});
  currLabel.hide();
  //Curr arrow
  var currArrow = jsav.g.line(labelLeftMargin + 160, labelTopMargin + 20,
                              labelLeftMargin + 180, labelTopMargin + 40,
	  {"arrow-end": "classic-wide-long", "opacity": 100,"stroke-width": 2});
  currArrow.hide();

  //Left margin of tail
  var tailLabel = jsav.label("tail",
	  {before: l, left: labelLeftMargin + 300, top: labelTopMargin, "font-size":"20px"});
  tailLabel.hide();
  //Tail arrow
  var tailArrow = jsav.g.line(labelLeftMargin + 310, labelTopMargin + 20,
                              labelLeftMargin + 330, labelTopMargin + 40,
	  {"arrow-end": "classic-wide-long", "opacity": 100,"stroke-width": 2});
  tailArrow.hide();

  //Vertical bar
  var bar = jsav.g.line(labelLeftMargin + 145, labelTopMargin + 35,
                          labelLeftMargin + 145, labelTopMargin + 75,
	                      {"stroke-width": 1, "stroke":"#000"});
  //Diagonal slash
  var slash = jsav.g.line(labelLeftMargin + 346, labelTopMargin + 72,
                          labelLeftMargin + 356, labelTopMargin + 42,
	  {"opacity": 100,"stroke-width": 1});

  //Diagonal slash in step 3
  var slash3 = jsav.g.line(labelLeftMargin3 + 345, labelTopMargin + 72,
                          labelLeftMargin3 + 355, labelTopMargin + 42,
	  {"opacity": 0,"stroke-width": 1});

  //Label tail in step 3
  var tailLabel3 = jsav.label("tail",
	  {before: l, left: labelLeftMargin3 + 300, top: labelTopMargin, "font-size":"20px"}).hide();
  //Arrow tail in step 3
  var tailArrow3 = jsav.g.line(labelLeftMargin3 + 310, labelTopMargin + 20,
                              labelLeftMargin3 + 330, labelTopMargin + 40,
	  {"arrow-end": "classic-wide-long", "opacity": 0,"stroke-width": 2});

  l.addFirst(15)
   .addFirst(12)
   .addFirst(10)
   .addFirst(23)
   .addFirst(20);
  l.layout();
  jsav.umsg("Here is a graphical depiction for a linked list storing five integers. The value stored in a pointer variable is indicated by an arrow \"pointing\" to something. A NULL pointer is indicated graphically by a diagonal slash through a pointer variable's box. The vertical line between the nodes labeled 23 and 10 indicates the current position (immediately to the right of this line).");
  jsav.displayInit();

  //step 2
  headLabel.show();
  headArrow.show();
  currLabel.show();
  currArrow.show();
  tailLabel.show();
  tailArrow.show();
  jsav.umsg("The list's first node is accessed from a pointer named head. To speed access to the end of the list, and to allow the append method to be performed in constant time, a pointer named tail is also kept to the last link of the list. The position of the current element is indicated by another pointer, named curr.");
  jsav.step();

  //step 3
  l.remove(2);
  l.layout();
  slash.hide();
  tailLabel.hide();
  tailArrow.hide();
  slash3.show();  
  tailLabel3.show();
  tailArrow3.show();
  jsav.umsg("Here is what we would like to have happen when we delete the current node (the one with value 10).");
  jsav.step();
  jsav.recorded();
}(jQuery));

// Bad Reason for the problem representation version of linked list
(function ($) {
  var jsav = new JSAV("LlistBadReasonCON");

  // Relative offsets
  var labelLeftMargin = 240;
  var labelTopMargin = 10;
  // Relative offsets for tail and slash in step 5
  var labelLeftMargin5 = labelLeftMargin -74;

  // Linked list
  var l = jsav.ds.list({"nodegap": 30, "top": labelTopMargin + 40, left: labelLeftMargin + 17});
  
  //Hiddent JSAV array for animation
  tempArr[0] = ""; 
  var arr = jsav.ds.array(tempArr, 
            {indexed: false, layout: "array", left:0}).hide();

  var headLabel = jsav.label("head",
                    {before: l, left: labelLeftMargin, top: labelTopMargin});
  var headArrow = jsav.g.line(labelLeftMargin + 10, labelTopMargin + 20,
                              labelLeftMargin + 30, labelTopMargin + 40,
	  {"arrow-end": "classic-wide-long", "opacity": 100,"stroke-width": 2});

  var currLabel = jsav.label("curr",
	  {before: l, left: labelLeftMargin + 150, top: labelTopMargin, "font-size":"20px"});
  //Curr arrow
  var currArrow = jsav.g.line(labelLeftMargin + 160, labelTopMargin + 20,
                              labelLeftMargin + 180, labelTopMargin + 40,
	  {"arrow-end": "classic-wide-long", "opacity": 100,"stroke-width": 2});

  //Left margin of tail
  var tailLabel = jsav.label("tail",
	  {before: l, left: labelLeftMargin + 300, top: labelTopMargin, "font-size":"20px"});
  //Tail arrow
  var tailArrow = jsav.g.line(labelLeftMargin + 310, labelTopMargin + 20,
                              labelLeftMargin + 330, labelTopMargin + 40,
	  {"arrow-end": "classic-wide-long", "opacity": 100,"stroke-width": 2});

  //Vertical bar
  var bar = jsav.g.line(labelLeftMargin + 145, labelTopMargin + 35,
                          labelLeftMargin + 145, labelTopMargin + 75,
	                      {"stroke-width": 1, "stroke":"#000"});
  // Another vertical bar
  var bar2 = jsav.g.line(labelLeftMargin + 220, labelTopMargin + 35,
                          labelLeftMargin + 220, labelTopMargin + 75,
	                      {"stroke-width": 1, "stroke":"#000"});
  bar2.hide();

  //Diagonal slash
  var slash = jsav.g.line(labelLeftMargin + 346, labelTopMargin + 72,
                          labelLeftMargin + 356, labelTopMargin + 42,
	  {"opacity": 100,"stroke-width": 1});
  //dash line in step 4
  var dashlineLeftMargin = 452
  var dashline = jsav.g.polyline([[dashlineLeftMargin, 66], 
	  [dashlineLeftMargin + 13, 66], [dashlineLeftMargin + 13, 30],[dashlineLeftMargin + 83,30],[dashlineLeftMargin + 83,66],[dashlineLeftMargin + 101,66]], {"arrow-end":"classic-wide-long", "opacity":0, "stroke-width":2,"stroke-dasharray":"-"});
  
  //Diagonal slash in step 5
  var slash5 = jsav.g.line(labelLeftMargin5 + 346, labelTopMargin + 72,
                          labelLeftMargin5 + 356, labelTopMargin + 42,
	  {"opacity": 0,"stroke-width": 1});

  //Label tail in step 5
  var tailLabel5 = jsav.label("tail",
	  {before: l, left: labelLeftMargin5 + 300, top: labelTopMargin, "font-size":"20px"}).hide();
  //Arrow tail in step 5
  var tailArrow5 = jsav.g.line(labelLeftMargin5 + 310, labelTopMargin + 20,
                              labelLeftMargin5 + 330, labelTopMargin + 40,
	  {"arrow-end": "classic-wide-long", "opacity": 0,"stroke-width": 2});
  //Label tail in step 6
  var tailLabel6 = jsav.label("tail",
	  {before: l, left: labelLeftMargin5 + 340, top: labelTopMargin, "font-size":"20px"}).hide();
  //Arrow tail in step 6
  var tailArrow6 = jsav.g.line(labelLeftMargin5 + 350, labelTopMargin + 20,
                              labelLeftMargin5 + 330, labelTopMargin + 40,
	  {"arrow-end": "classic-wide-long", "opacity":	0,"stroke-width": 2});

  l.addFirst(15)
   .addFirst(12)
   .addFirst(10)
   .addFirst(23)
   .addFirst(20);
  l.get(1).highlight();
  l.layout();
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
  tailLabel.hide();
  tailArrow.hide();
  tailLabel5.show();
  tailArrow5.show();
  slash.hide();
  slash5.show();
  l.layout();
  jsav.umsg("The node with a value of 10 is removed from the list.");
  jsav.step();

  currLabel.hide();
  currArrow.hide();
  tailLabel5.text("curr");
  tailLabel6.show();
  tailArrow6.show();
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
  var leftMargin = 163;
  var topMargin = 10;

  var l = jsav.ds.list({"nodegap": 30, "top": topMargin + 40, left: leftMargin + 17});

  var headLabel = jsav.label("head",
                    {before: l, left: leftMargin, top: topMargin});
  var headArrow = jsav.g.line(leftMargin + 10, topMargin + 20,
                              leftMargin + 30, topMargin + 40,
	  {"arrow-end": "classic-wide-long", "opacity": 100,"stroke-width": 2});

  // Curr
  var currLabel = jsav.label("curr",
	  {before: l, left: leftMargin + 222, top: topMargin, "font-size":"20px"});
  var currArrow = jsav.g.line(leftMargin + 232, topMargin + 20,
                              leftMargin + 252, topMargin + 40,
	  {"arrow-end": "classic-wide-long", "opacity": 100,"stroke-width": 2});

  // Left margin of tail
  var tailLabel = jsav.label("tail",
	  {before: l, left: leftMargin + 445, top: topMargin, "font-size":"20px"});
  // Tail arrow
  var tailArrow = jsav.g.line(leftMargin + 455, topMargin + 20,
                              leftMargin + 475, topMargin + 40,
	  {"arrow-end": "classic-wide-long", "opacity": 100,"stroke-width": 2});

  // Vertical line
  var bar = jsav.g.line(leftMargin + 145 + 77, topMargin + 35,
                          leftMargin + 145 + 77, topMargin + 75,
	                      {"stroke-width": 1, "stroke":"#000"});
  // Diagonal slash
  var slash = jsav.g.line(leftMargin + 494, topMargin + 72,
                          leftMargin + 504, topMargin + 42,
	  {"opacity": 100,"stroke-width": 1});

  l.addFirst("null")
   .addFirst(15)
   .addFirst(12)
   .addFirst(10)
   .addFirst(23)
   .addFirst(20)
   .addFirst("null");
  l.layout();
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

  // Left margin of label "head"
  // Top margin of label "head"
  // They will be the benchmark for calculating other objects' offset.
  var leftMargin = 200;
  var topMargin =  0;

  // Create an list object under control of JSAV library
  var l = jsav.ds.list({"nodegap": 30, "top": topMargin + 40, left: leftMargin + 17});
    
  //create two hidden arrays for ".copyValue" animation
  tempArr[0] = ""; 
  var arr = jsav.ds.array(tempArr, 
            {indexed: true, layout: "array"});
  arr.hide(); 

  //head
  var headLabel = jsav.label("head",
                    {before: l, left: leftMargin, top: topMargin});
  var headArrow = jsav.g.line(leftMargin + 10, topMargin + 20,
                              leftMargin + 30, topMargin + 40,
	  {"arrow-end": "classic-wide-long", "opacity": 100,"stroke-width": 2});
  
  //curr
  var currLabel = jsav.label("curr",
	  {before: l, left: leftMargin + 150, top: topMargin, "font-size":"20px"});
  var currArrow = jsav.g.line(leftMargin + 160, topMargin + 20,
                              leftMargin + 180, topMargin + 40,
	  {"arrow-end": "classic-wide-long", "opacity": 100,"stroke-width": 2});

  //Tail
  var tailLabel = jsav.label("tail",
	  {before: l, left: leftMargin + 300, top: topMargin, "font-size":"20px"});
  var tailArrow = jsav.g.line(leftMargin + 310, topMargin + 20,
                              leftMargin + 330, topMargin + 40,
	  {"arrow-end": "classic-wide-long", "opacity": 100,"stroke-width": 2});
 
  //New Tail after inserting one item 
  var temp = leftMargin + 260 + 115;
  var newTailLabel = jsav.label("tail",
	  {before: l, left: temp, top: topMargin, "font-size":"20px"}).hide();
  var newTailArrow = jsav.g.line(leftMargin + 385, topMargin + 20,
                              leftMargin + 405, topMargin + 40,
	  {"arrow-end": "classic-wide-long", "opacity": 0,"stroke-width": 2});

  //Diagonal slash in step 1
  var slash = jsav.g.line(leftMargin + 346, topMargin + 72,
                          leftMargin + 356, topMargin + 42,
	  {"opacity": 100,"stroke-width": 1});
    //Diagonal slash in step 1
  var newSlash = jsav.g.line(leftMargin + 346 + 74, topMargin + 72,
                          leftMargin + 356 + 74, topMargin + 42,
	  {"opacity": 0,"stroke-width": 1});

  //Vertical bar
  var bar = jsav.g.line(leftMargin + 52 + 95, 42, leftMargin + 52 + 95, 72,
		{"stroke-width": 1, "stroke":"#000"});

  //Horizontal arrow in step 4 pointing to item 12
  var longArrow= jsav.g.line(leftMargin + 114 + 95, topMargin + 56, leftMargin + 114 + 198, topMargin + 56,{"arrow-end": "classic-wide-long", "opacity": 0,"stroke-width": 2});
 
  // Box "it"
  var itLabel = jsav.label("it",
	  {before: l, left: 20, top: 0, "font-size":"20px"});
  tempArr[0] = "15"; 
  var itBox = jsav.ds.array(tempArr, 
            {indexed: false, layout: "array", top: -20, left: 40});

  //initialize the link list
  jsav.umsg("The linked list before insertion. 15 is the value to be inserted.");
  l.addFirst("null")
   .addFirst(12)
   .addFirst(23)
   .addFirst(35)
   .addFirst("null");
  l.layout();
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
  tailArrow.hide();
  tailLabel.hide();
  newTailArrow.show();
  newTailLabel.show();
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
  var leftMargin = 10;
  var topMargin = 40;

  // Box "it"
  var itLabel = jsav.label("it",
	  {left: 20, top: 0, "font-size":"20px"});
  tempArr[0] = "15"; 
  var itBox = jsav.ds.array(tempArr, 
            {indexed: false, layout: "array", top: -20, left: 40});
  
  //Inserting at the tail of the list.
  //DOM elements are created here.
  function InsertTail(jsavSpec){
	this.jsav = jsavSpec;
    // Relative offsets
    this.leftMargin = leftMargin;
    this.topMargin = topMargin;
	this.l = this.jsav.ds.list({"nodegap": 30, "top": this.topMargin + 40, left: this.leftMargin + 17});
    //Head
    this.headLabel = this.jsav.label("head",
                    {before: this.l, left: this.leftMargin, top: this.topMargin});
    this.headArrow = this.jsav.g.line(this.leftMargin + 10, this.topMargin + 20,
                              this.leftMargin + 30, this.topMargin + 40,
	  {"arrow-end": "classic-wide-long", "opacity": 100,"stroke-width": 2});
	//Curr
    this.currLabel = this.jsav.label("curr",
	  {before: this.l, left: this.leftMargin + 145, top: this.topMargin, "font-size":"20px"});
    this.currArrow = this.jsav.g.line(this.leftMargin + 155, this.topMargin + 20,
                              this.leftMargin + 175, this.topMargin + 40,
	  {"arrow-end": "classic-wide-long", "opacity": 100,"stroke-width": 2});
	//Tail
    this.tailLabel = this.jsav.label("tail",
	  {before: this.l, left: this.leftMargin + 195, top: this.topMargin, "font-size":"20px"});
    this.tailArrow = this.jsav.g.line(this.leftMargin + 205, this.topMargin + 20,
                              this.leftMargin + 185, this.topMargin + 40,
	  {"arrow-end": "classic-wide-long", "opacity": 100,"stroke-width": 2});

    //New Tail
    this.newTailLabel = this.jsav.label("tail",
	  {before: this.l, left: this.leftMargin + 155 + 70, top: this.topMargin, "font-size":"20px"});
    this.newTailArrow = this.jsav.g.line(this.leftMargin + 165 + 70, this.topMargin + 20,
                              this.leftMargin + 185 + 70, this.topMargin + 40,
	  {"arrow-end": "classic-wide-long", "opacity": 0,"stroke-width": 2});
    this.newTailLabel.hide();

    //Vertical bar
    this.bar1 = this.jsav.g.line(this.leftMargin + 145, this.topMargin + 40, this.leftMargin + 145, this.topMargin + 70,
		{"stroke-width": 1, "stroke":"#000"});

    //Diagonal slash
    this.slash = this.jsav.g.line(this.leftMargin + 198, this.topMargin + 72,
                          this.leftMargin + 208, this.topMargin + 42,
	  {"opacity": 100,"stroke-width": 1});

    //Diagonal slash for new node
    this.newNodeSlash = this.jsav.g.line(this.leftMargin + 198 + 73, this.topMargin + 72 +60,
                          this.leftMargin + 208 + 73, this.topMargin + 42 +60,
	  {"opacity": 0,"stroke-width": 1});

    //Diagonal slash for new tail
    this.newTailSlash = this.jsav.g.line(this.leftMargin + 272, this.topMargin + 72,
                          this.leftMargin + 282, this.topMargin + 42,
	  {"opacity": 0,"stroke-width": 1});
	this.l.addFirst("null")
          .addFirst(20)
          .addFirst("null");
    this.l.layout();	

  }
  //Clear DOM elements
  InsertTail.prototype.clear = function(){
	  this.l.hide();
	  this.headLabel.hide();
	  this.headArrow.hide();
	  this.currLabel.hide();
	  this.currArrow.hide();
	  this.tailLabel.hide();
	  this.tailArrow.hide();
	  this.newTailLabel.hide();
	  this.newTailArrow.hide();
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
    this.newNode = this.l.newNode("");	
    // Set the position for the new node
    this.newNode.css({top: 60, left: 149 + 73}); 
    this.newNode.highlight();  
    this.jsav.umsg("Create a new link node.");
    pseudo.unhighlight(1);
    pseudo.highlight(2);
    this.jsav.step();
	
	//step 3
    this.jsav.effects.copyValue(this.l.get(2), this.newNode);
    this.jsav.umsg("Copy current.element() to the new node (this value is <code>null</code>).");
    this.jsav.step();

	//step 4
    this.newNodeSlash.show();
    this.jsav.umsg("The <code>next</code> field for the new node is assigned to point to what <code>curr.next()</code> points to (which is <code>null</code>).");
    this.jsav.step();

	//step 5
    var node = this.l.get(2).next();    
    this.l.get(2).edgeToNext();
    this.l.get(2).next(this.newNode);
    this.newNode.next(node);
    this.newNode.unhighlight();
    this.l.get(2).highlight();
    this.l.layout({updateTop: false}); // control that top coordinate of nodes should not be recalculated
    this.slash.hide();
    this.jsav.umsg("<code>curr</code>'s <code>next</code> field is assigned to point to the new link node.");
    this.jsav.step();

    //step 6
    this.jsav.effects.copyValue(itBox, 0, this.l.get(2));
	itBox.unhighlight(0);
    this.jsav.umsg("The value of the current node is set to 15.");
    pseudo.unhighlight(2);
    pseudo.highlight(3);
    this.jsav.step();

    //step 7
    this.l.layout();
    this.newNodeSlash.hide();
    this.newTailSlash.show();
    this.tailLabel.hide();
    this.tailArrow.hide();
    this.newTailLabel.show();
    this.newTailArrow.show();
	this.l.get(2).unhighlight();
    this.l.get(3).highlight();
    this.jsav.umsg(" Update the new tail.");
    pseudo.unhighlight(3);
    pseudo.highlight(4);
    this.jsav.step();

    //step 8	
    this.l.get(3).unhighlight();
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
    this.leftMargin = leftMargin;
    this.topMargin = topMargin;
	//Head
    this.headLabel = this.jsav.label("head",
                    {before: this.l, left: this.leftMargin, top: this.topMargin});
    this.headArrow = this.jsav.g.line(this.leftMargin + 10, this.topMargin + 20,
                              this.leftMargin + 30, this.topMargin + 40,
	  {"arrow-end": "classic-wide-long", "opacity": 0,"stroke-width": 2});
	//Curr
    this.currLabel = this.jsav.label("curr",
	  {before: this.l, left: this.leftMargin + 75, top: this.topMargin, "font-size":"20px"});
    this.currArrow = this.jsav.g.line(this.leftMargin + 85, this.topMargin + 20,
                              this.leftMargin + 105, this.topMargin + 40,
	  {"arrow-end": "classic-wide-long", "opacity": 0,"stroke-width": 2});
	//Tail
    this.tailLabel = this.jsav.label("tail",
	  {before: this.l, left: this.leftMargin + 125, top: this.topMargin, "font-size":"20px"});
    this.tailArrow = this.jsav.g.line(this.leftMargin + 135, this.topMargin + 20,
                              this.leftMargin + 115, this.topMargin + 40,
	  {"arrow-end": "classic-wide-long", "opacity": 0,"stroke-width": 2});
	//Vertical bar
    this.bar = this.jsav.g.line(this.leftMargin + 75, this.topMargin + 40, this.leftMargin + 75, this.topMargin + 70,
		{"stroke-width": 1, "stroke":"#000"});
	//New Tail
    this.newTailLabel = this.jsav.label("tail",
	  {before: this.l, left: this.leftMargin + 155 , top: this.topMargin, "font-size":"20px"});
    this.newTailArrow = this.jsav.g.line(this.leftMargin + 165, this.topMargin + 20,
                              this.leftMargin + 185 , this.topMargin + 40,
	  {"arrow-end": "classic-wide-long", "opacity": 0,"stroke-width": 2});
    this.newTailLabel.hide();

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

	this.l = this.jsav.ds.list({"nodegap": 30, "top": this.topMargin + 40, left: this.leftMargin + 17});
	this.l.addFirst("null")
          .addFirst("null");
    this.l.layout();
  }
  //
  InsertEmpty.prototype.steps = function(){
	//step 9
    pseudo.highlight(1);
	pseudo.unhighlight(5);
    this.jsav.umsg("Inserting into the empty list is similar to inserting at the end of the list. Here 15 is again being inserted.");
    itBox.highlight(0);
	this.headArrow.show();
	this.currArrow.show();
	this.tailArrow.show();
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
    this.tailLabel.hide();
    this.tailArrow.hide();
    this.newTailLabel.show();
    this.newTailArrow.show();
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
  var topMargin = 0;
  // JSAV list
  var l = jsav.ds.list({"nodegap": 30, "center": false, "left": leftMargin, "top":topMargin + 40});
  // Create a the hidden array
  var arr = jsav.ds.array(tempArr, {indexed: false, layout: "array",left: leftMargin + 150, top: topMargin + 75}).hide();

  //Head
  var headLabel = jsav.label("head",
    {before: l, left: leftMargin - 15, top: topMargin});
  var headArrow = jsav.g.line(leftMargin - 5, topMargin + 20,
  leftMargin + 15, topMargin + 40,
	  {"arrow-end": "classic-wide-long", "opacity": 100,"stroke-width": 2});
  //Curr
  var currLabel = jsav.label("curr",
	  {before: l, left: leftMargin + 132, top: topMargin, "font-size":"20px"});
  var currArrow = jsav.g.line(leftMargin + 142, topMargin + 20,
                   leftMargin + 162, topMargin + 40,
	  {"arrow-end": "classic-wide-long", "opacity": 100,"stroke-width": 2});
  //Tail
  var tailLabel = jsav.label("tail",
	  {before: l, left: leftMargin + 355, top: topMargin, "font-size":"20px"});
  var tailArrow = jsav.g.line(leftMargin + 365, topMargin + 20,
                              leftMargin + 385, topMargin + 40,
	  {"arrow-end": "classic-wide-long", "opacity": 100,"stroke-width": 2});
  // NewTail
  var newTailLabel = jsav.label("tail",
	  {before: l, left: leftMargin + 355 - 72, top: topMargin, "font-size":"20px"}).hide();
  var newTailArrow = jsav.g.line(leftMargin + 365 - 72, topMargin + 20,
                              leftMargin + 385 - 72, topMargin + 40,
	  {"arrow-end": "classic-wide-long", "opacity": 0,"stroke-width": 2});
  // "It"
  var labelIt = jsav.label("it", 
	            {before: arr, left: leftMargin + 90, top: topMargin + 98, "font-size":"20px"});
  var arrowIt = jsav.g.line(leftMargin + 106, topMargin + 110,
	  leftMargin + 146, topMargin + 110,
	  {"arrow-end": "classic-wide-long", "opacity": 0,"stroke-width": 2});
  labelIt.hide();
  // Dashline
  var dashline = jsav.g.polyline([[leftMargin + 112 + 74, topMargin + 57],[leftMargin + 125 + 74, topMargin + 57],
	  [leftMargin + 125 + 74, topMargin + 28],[leftMargin + 202 + 74,topMargin + 28],
	  [leftMargin + 202 + 74,topMargin + 57],[leftMargin + 223 + 74,topMargin + 57]], 
	  {"arrow-end":"classic-wide-long", "opacity":0, "stroke-width":2,"stroke-dasharray":"-"});
  // Vertical bar
  var verticalBar = jsav.g.line(leftMargin + 129, topMargin + 41, leftMargin + 129, topMargin + 71,
	         {"stroke-width": 1, "stroke":"#000"});
  //Diagonal slash
  var slash = jsav.g.line(leftMargin + 404, topMargin + 72,
                          leftMargin + 414, topMargin + 42,
	  {"opacity": 100,"stroke-width": 1});
  // New slash after deletion
  var newSlash = jsav.g.line(leftMargin + 330, topMargin + 72,
                          leftMargin + 340, topMargin + 42,
	  {"opacity": 0,"stroke-width": 1});

  //initialize the linked list
  jsav.umsg("Now let's look at the <code>remove</code> method.");
  l.addFirst("null")
   .addFirst(10)
   .addFirst(35)
   .addFirst(8)
   .addFirst(23)
   .addFirst("null");
  l.layout();
	
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
  tailLabel.hide();
  tailArrow.hide();
  newTailLabel.show();
  newTailArrow.show();
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
  var topMargin = -15;

  // pseudocode
  var pseudo_next = jsav.code({url: "../../../SourceCode/Processing/Lists/LList.pde",
                       lineNumbers: false,
                       startAfter: "/* *** ODSATag: LListNext *** */",
                       endBefore: "/* *** ODSAendTag: LListNext *** */", top: 150, left: 80}); 
  var pseudo_prev = jsav.code({url: "../../../SourceCode/Processing/Lists/LList.pde",
                       lineNumbers: false,
                       startAfter: "/* *** ODSATag: LListPrev *** */",
                       endBefore: "/* *** ODSAendTag: LListPrev *** */"}).hide();
  var pseudo_pos = jsav.code({url: "../../../SourceCode/Processing/Lists/LList.pde",
                       lineNumbers: false,
                       startAfter: "/* *** ODSATag: LListPos *** */",
                       endBefore: "/* *** ODSAendTag: LListPos *** */"}).hide();
  // Head
  var headLabel = jsav.label("head",
    {before: l, left: leftMargin - 15, top: topMargin});
  var headArrow = jsav.g.line(leftMargin - 5, topMargin + 20,
  leftMargin + 15, topMargin + 40,
	  {"arrow-end": "classic-wide-long", "opacity": 100,"stroke-width": 2});
  // Curr
  var currLabel = jsav.label("curr",
	  {before: l, left: leftMargin + 206, top: topMargin, "font-size":"20px"});
  var currArrow = jsav.g.line(leftMargin + 216, topMargin + 20,
                   leftMargin + 236, topMargin + 40,
	  {"arrow-end": "classic-wide-long", "opacity": 100,"stroke-width": 2});
  // Curr Next
  var nextCurrLabel = jsav.label("curr",
	  {before: l, left: leftMargin + 206 + 74, top: topMargin, "font-size":"20px"}).hide();
  var nextCurrArrow = jsav.g.line(leftMargin + 216 + 74, topMargin + 20,
                   leftMargin + 236 + 74, topMargin + 40,
	  {"arrow-end": "classic-wide-long", "opacity": 0,"stroke-width": 2});
  // Tail
  var tailLabel = jsav.label("tail",
	  {before: l, left: leftMargin + 355, top: topMargin, "font-size":"20px"});
  var tailArrow = jsav.g.line(leftMargin + 365, topMargin + 20,
                              leftMargin + 385, topMargin + 40,
	  {"arrow-end": "classic-wide-long", "opacity": 100,"stroke-width": 2});
  // Diagonal slash
  var slash = jsav.g.line(leftMargin + 404, topMargin + 72,
                          leftMargin + 414, topMargin + 42,
	  {"opacity": 100,"stroke-width": 1});

  // JSAV list
  var l = jsav.ds.list({"nodegap": 30, "center": false, "left": leftMargin, "top":topMargin + 40});
  l.addFirst("null")
   .addFirst(10)
   .addFirst(35)
   .addFirst(8)
   .addFirst(23)
   .addFirst("null");
  l.layout();

  pseudo_next.highlight(1);
  jsav.umsg("Finally, we will look at how a few other methods work.");
  jsav.displayInit();

  jsav.umsg("Method next simply moves curr one position toward the tail of the list.");
  jsav.step();

  //step 2  
  l.get(4).highlight();
  currLabel.hide();
  currArrow.hide();
  nextCurrLabel.show();
  nextCurrArrow.show();
  jsav.umsg("This takes &Theta;(1) time.");
  jsav.step();

  //step 3
  l.get(4).unhighlight();
  pseudo_next.hide();
  pseudo_prev.show();
  pseudo_prev.highlight(1);
  jsav.umsg("Method prev moves curr one position toward the head of the list, but its implementation is more difficult.");
  jsav.step();
  
  //step 4
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

  //step 5
  l.get(0).unhighlight();
  l.get(1).unhighlight();  
  l.get(2).unhighlight(); 
  currLabel.show();
  currArrow.show();
  nextCurrLabel.hide();
  nextCurrArrow.hide();
  pseudo_next.hide();
  pseudo_prev.show();
  pseudo_prev.unhighlight(5);
  pseudo_prev.highlight(6);
  jsav.umsg("This takes &Theta;(n) time in the average and worst cases.");
  jsav.step();

  //step 6
  l.get(3).unhighlight();
  pseudo_prev.hide();
  pseudo_pos.show();
  pseudo_pos.highlight(1);
  jsav.umsg("Method moveToPos moves curr to \"pos\" position. 23 is at position 0.");
  jsav.step();
  //step 7  
  l.get(1).highlight();
  l.get(2).highlight();
  l.get(3).highlight();  
  l.get(4).highlight();
  currLabel.hide();
  currArrow.hide();
  nextCurrLabel.show();
  nextCurrArrow.show();
  pseudo_pos.unhighlight(1);
  pseudo_pos.highlight(7);
  jsav.umsg("Implementation of method moveToPos(3) is similar in that finding the 3th position requires marching down 3 + 1 positions from the head of the list.");
  jsav.step();

  //step 8
  l.get(1).unhighlight();
  l.get(2).unhighlight();
  l.get(3).unhighlight();  
  l.get(4).unhighlight();
  jsav.umsg("This takes &Theta;(i) time, where i is the position to move to.");
  jsav.step();

  jsav.recorded();
}(jQuery));
