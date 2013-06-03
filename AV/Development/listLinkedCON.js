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
  var l = jsav.ds.list({"nodegap": 30, "top": 50, left: 367});

  // Relative offsets
  var labelLeftMargin = 350;
  var labelTopMargin = 10;

  var headLabel = jsav.label("head",
                    {before: l, left: labelLeftMargin, top: labelTopMargin});
  var headArrow = jsav.g.line(labelLeftMargin + 10, labelTopMargin + 20,
                              labelLeftMargin + 30, labelTopMargin + 40,
	  {"arrow-end": "classic-wide-long", "opacity": 100,"stroke-width": 2});

  var currLabel = jsav.label("curr",
	  {before: l, left: labelLeftMargin + 70, top: labelTopMargin, "font-size":"20px"});
  //Curr arrow
  var currArrow = jsav.g.line(labelLeftMargin + 80, labelTopMargin + 20,
                              labelLeftMargin + 100, labelTopMargin + 40,
	  {"arrow-end": "classic-wide-long", "opacity": 100,"stroke-width": 2});

  //Left margin of tail
  var tailLabel = jsav.label("tail",
	  {before: l, left: labelLeftMargin + 120, top: labelTopMargin, "font-size":"20px"});
  //Tail arrow
  var tailArrow = jsav.g.line(labelLeftMargin + 130, labelTopMargin + 20,
                              labelLeftMargin + 110, labelTopMargin + 40,
	  {"arrow-end": "classic-wide-long", "opacity": 100,"stroke-width": 2});

  //Diagonal slash
  var slash = jsav.g.line(labelLeftMargin + 125, labelTopMargin + 72,
                          labelLeftMargin + 135, labelTopMargin + 42,
	  {"opacity": 100,"stroke-width": 1});

  l.addFirst("")
   .addFirst("");
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
  l.layout();
  jsav.umsg("Another problem is that we have no link for the preceding node. Often we can get around this problem during deletion by copying the next value into the current node. Lets look again at the example where we delete value 10.");
  jsav.displayInit();
  
  //step 2
  l.get(2).value("");
  l.get(2).highlight();
  jsav.umsg("First we remove the value 10 from the current node.");
  jsav.step();
  
  //step 3
  jsav.effects.moveValue(l.get(3), l.get(2));
  jsav.umsg(" Now we move the next value (12) to the current node).");
  jsav.step();

  //step 4
  dashline.show();
  l.get(2).edgeToNext().hide();
  l.get(3).edgeToNext().hide();
  l.get(2).unhighlight();
  l.get(3).highlight();
  jsav.umsg("  Now we can route around the uneeded node.");
  jsav.step();

  //step 5
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
  jsav.umsg("  The node with a value of 10 is removed from the list. Unfortunately, this approach does not work when the current node is the last one on the list.");
  jsav.step();

  //step 6
  currLabel.hide();
  currArrow.hide();
  tailLabel5.text("curr");
  tailLabel6.show();
  tailArrow6.show();
  l.get(3).highlight();
  jsav.umsg(" As in this example. There is no way to update the \"next\" pointer of the node with value 15. There is no way around this problem with the list as shown here.");
  jsav.step();
  jsav.recorded();
}(jQuery));

// List with header and tailer nodes added
(function ($) {
  var jsav = new JSAV("listLinkedHeaderTailerCON", {"animationMode": "none"});

  // Relative offsets
  var labelLeftMargin = 163;
  var labelTopMargin = 10;

  var l = jsav.ds.list({"nodegap": 30, "top": labelTopMargin + 40, left: labelLeftMargin + 17});

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
	  {before: l, left: labelLeftMargin + 445, top: labelTopMargin, "font-size":"20px"});
  //Tail arrow
  var tailArrow = jsav.g.line(labelLeftMargin + 455, labelTopMargin + 20,
                              labelLeftMargin + 475, labelTopMargin + 40,
	  {"arrow-end": "classic-wide-long", "opacity": 100,"stroke-width": 2});

  //Vertical bar
  var bar = jsav.g.line(labelLeftMargin + 145, labelTopMargin + 35,
                          labelLeftMargin + 145, labelTopMargin + 75,
	                      {"stroke-width": 1, "stroke":"#000"});
  //Diagonal slash
  var slash = jsav.g.line(labelLeftMargin + 494, labelTopMargin + 72,
                          labelLeftMargin + 504, labelTopMargin + 42,
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
  jsav.umsg("The second of the private data members is <code>tail</code>, the last node of the list. This tailer node is a link node like any other, but its <code>next</code> field is set to <code>null</code>, pointing to nowhere.");
  jsav.step();
  pseudo.unhighlight(2);
  pseudo.highlight(3);
  jsav.umsg("The data member <code>curr</code> is the current node of the list. It could be any node on the list, except the <code>head</code> node.");
  jsav.step();
  pseudo.unhighlight(3);
  pseudo.highlight(4);
  jsav.umsg(" Since there is no simple way to compute the length of the list simply from these three pointers, the list length will be stored explicitly, and updated by every operation that modifies the list size. The value cnt stores the length of the list.");
  jsav.step();
  pseudo.unhighlight(4);
  jsav.umsg("Because <code>head</code>, <code>tail</code>, and <code>cnt</code> are all declared to be <code>private</code>, they may only be accessed by methods of Class <code>LList</code>. Since <code>curr</code> is a protected data member, it can only be accessed by Class or Subclass of LList.");
  jsav.recorded();
}(jQuery));

// Work through the constructors
(function ($) {
  var jsav = new JSAV("LListCons");	
  var pseudo = jsav.code({url: "../../../SourceCode/Processing/Lists/LList.pde",
                        lineNumbers: false,
                        startAfter: "/* *** ODSATag: LListCons *** */",
                        endBefore: "/* *** ODSAendTag: LListCons *** */"});

  jsav.umsg("Let's work through the constructor of class <code>LList</code>.");
  pseudo.highlight(0);
  jsav.displayInit();
  
  //step 2
  jsav.umsg("Note that the constructor for LList maintains the optional parameter for minimum list size introduced for Class AList. ");
  pseudo.unhighlight(0);
  pseudo.highlight(1);
  jsav.step();

  //step 3
  jsav.umsg("This is done simply to keep the calls to the constructor the same for both variants. Because the linked list class does not need to declare a fixed-size array when the list is created, this parameter is unnecessary for linked lists. It is ignored by the implementation.");
  pseudo.highlight(2);
  jsav.step();

  //step 4
  pseudo.unhighlight(1);
  pseudo.unhighlight(2);
  pseudo.highlight(5);
  pseudo.highlight(6);
  pseudo.highlight(7);
  pseudo.highlight(8);
  pseudo.highlight(9);
  jsav.umsg(" Both constructors rely on the clear method to do the real work.");
  jsav.step(); 
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
  var cpyArr = ["it"]; 
  var arr1 = jsav.ds.array(cpyArr, 
            {indexed: true, layout: "array"});
  arr1.hide();

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

  //Vertical bar
  var bar = jsav.g.line(leftMargin + 52 + 95, 42, leftMargin + 52 + 95, 72,
		{"stroke-width": 1, "stroke":"#000"});

  //Horizontal arrow in step 4 pointing to item 12
  var longArrow= jsav.g.line(leftMargin + 107 + 95, topMargin + 56, leftMargin + 107 + 198, topMargin + 56,{"arrow-end": "classic-wide-long", "opacity": 0,"stroke-width": 2});

  //initialize the link list
  jsav.umsg("The linked list before insertion");
  l.addFirst("null")
   .addFirst(12)
   .addFirst(23)
   .addFirst(35)
   .addFirst("null");
  l.layout();
  pseudo.highlight(1);
  jsav.displayInit();
    
  //step 2
  var newNode = l.newNode("");	
  // Set the position for the new node
  newNode.css({top: 60, left: 187}); 
  jsav.umsg("Create a new link node.");
  //Copy 23 to the new link node   
  jsav.effects.copyValue(arr, 0, newNode);
  newNode.highlight();
  pseudo.unhighlight(1);
  pseudo.highlight(2);
  jsav.step();
  
  //step 3
  jsav.umsg("Copy current.element() to the new node.");
  //Copy 10 to the new link node   
  jsav.effects.copyValue(l.get(2), newNode);
  jsav.step();

  //step 4
  var node = l.get(2).next();    
  l.get(2).edgeToNext().hide();
  l.get(2).next(newNode);	
  newNode.next(node);
  newNode.unhighlight();
  l.layout({updateTop: false}); // control that top coordinate of nodes should not be recalculated
  l.get(3).highlight();  
  longArrow.show();
  tailArrow.hide();
  tailLabel.hide();
  newTailArrow.show();
  newTailLabel.show();
  jsav.umsg(" The next field of the new list node is assigned to point to the next node of the current node.");
  jsav.step();

  //step 5
  l.get(2).highlight();
  l.get(3).unhighlight();
  l.get(2).next(newNode).edgeToNext().show();	
  longArrow.hide();
  jsav.umsg("The next field of the current node is assigned to point to the newly inserted node.");
  jsav.step();

  //step 6
  l.get(2).unhighlight();
  l.get(3).highlight();
  jsav.umsg("The new link node is in its correct position in the list.");
  l.layout();
  jsav.step();

  //step 7
  jsav.effects.copyValue(arr1, 0, l.get(2));
  l.get(3).unhighlight();
  l.get(2).highlight();
  jsav.umsg("The value of the current node is set to \"it\".");
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
  
  //Inserting at the tail of the list.
  //DOM elements are created here.
  function Tail(jsavSpec){
	this.jsav = jsavSpec;
    // Relative offsets
    this.leftMargin = 10;
    this.topMargin = 10;
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
    this.bar1 = this.jsav.g.line(this.leftMargin + 145, 50, this.leftMargin + 145, 80,
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
    this.cpyArr = ["it"]; 
    this.arr = this.jsav.ds.array(this.cpyArr, 
            {indexed: true, layout: "array"}).hide();
	this.l.addFirst("null")
          .addFirst(20)
          .addFirst("null");
    this.l.layout();	

  }
  //Clear DOM elements
  Tail.prototype.clear = function(){
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
  
  Tail.prototype.steps = function(){
	//step 1
    this.jsav.umsg("Here is an example showing insert at tail.");
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
    this.jsav.umsg("Copy current.element() to the new node, which is null.");
    this.jsav.step();

	//step 4
    this.newNodeSlash.show();
    this.jsav.umsg(" The next field of the new list node is assigned to point to the node after the curr, which is nowhere.");
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
    this.jsav.umsg(" The next field of the current node is assigned to point to the new link node.");
    this.jsav.step();

    //step 6
    this.jsav.effects.copyValue(this.arr, 0, this.l.get(2));
    this.jsav.umsg("The value of the current node is set to \"it\".");
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
    this.leftMargin = 10;
    this.topMargin = 10;
	//Head
    this.headLabel = this.jsav.label("head",
                    {before: this.l, left: this.leftMargin, top: this.topMargin});
    this.headArrow = this.jsav.g.line(this.leftMargin + 10, this.topMargin + 20,
                              this.leftMargin + 30, this.topMargin + 40,
	  {"arrow-end": "classic-wide-long", "opacity": 100,"stroke-width": 2});
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
    this.bar = this.jsav.g.line(this.leftMargin + 75, 50, this.leftMargin + 75, 80,
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
    this.cpyArr = ["it"]; 
    this.arr = this.jsav.ds.array(this.cpyArr, 
            {indexed: true, layout: "array"}).hide();

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
    this.jsav.umsg("Inserting into empty list is similar to inserting at the tail of the list.");
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
    this.jsav.umsg(" The next field of the new list node is assigned to point to the node after the curr, which is nowhere.");
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
    this.jsav.umsg(" The next field of the current node is assigned to point to the new link node.");
    this.jsav.step();

    //step 14
    this.jsav.effects.copyValue(this.arr, 0, this.l.get(1));
    this.jsav.umsg("The value of the current node is set to \"it\".");
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
  var insertTail = new Tail(jsav);
  insertTail.steps();
  insertTail.clear();
   
  //Insert into empty list.
  var insertEmpty = new InsertEmpty(jsav);
  insertEmpty.steps();
  jsav.recorded();
}(jQuery));

//Linked list deletion
(function ($) {
  var av = new JSAV("LlistRemoveCON");
  //pseudocode
  var pseudo = av.code({url: "../../../SourceCode/Processing/Lists/LList.pde",
                       lineNumbers: false,
                       startAfter: "/* *** ODSATag: LListRemove *** */",
                       endBefore: "/* *** ODSAendTag: LListRemove *** */"});
  // Left margin of the JSAV List
  var leftMargin = 5;
  var l = av.ds.list({"nodegap": 25, "center": false, "left": leftMargin});
  //create a the hidden array
  var arr = av.ds.array(tempArr, {indexed: true, layout: "array"});
  arr.hide();

  //Left margin of bar1 in step 1
  var bar1LeftMargin = leftMargin + nodeWidth * 2 + nodeGap * 1.5;
  //vertical bar in 1st step
  var bar1 = av.g.line(bar1LeftMargin, 50, bar1LeftMargin, 80,
	         {"stroke-width": 1, "stroke":"#000"});

  //Left margin of label in step 1
  var labelLeftMargin = leftMargin + nodeWidth + 10;
  //label "curr" and arrow in the 1st step
  var label = av.label("curr", 
	          {before: arr, left: labelLeftMargin, top: 0, "font-size":"20px"});
  //Left margin of arrow in step 1
  var arrowLeftMargin = labelLeftMargin + 12;
  //arrow pointing to "curr" in the 1st step
  var arrow = av.g.line(arrowLeftMargin, 25, arrowLeftMargin + 20, 45,
	          {"arrow-end": "classic-wide-long", "opacity": 100,"stroke-width": 2});

  //Left margin of labelIt in the 3rd step
  var labelItLeftMargin = leftMargin + nodeGap + nodeWidth * 2 - 40;
  //label "it" and arrow in the 3rd step
  var labelIt = av.label("it", 
	            {before: arr, left: labelItLeftMargin, top: 104, "font-size":"20px"});
  //Left margin of arrowIt the 3rd step
  var arrowItLeftMargin = labelItLeftMargin + 18;
  var arrowIt = av.g.line(arrowItLeftMargin, 105, arrowItLeftMargin + 50, 75,
	            {"arrow-end": "classic-wide-long", "opacity": 0,"stroke-width": 2});
  labelIt.hide();
  //Left margin of dashline in the 4th step
  var dashlineLeftMargin = leftMargin + nodeGap + nodeWidth * 2 - 3;
  //dashline in the 4th step
  var dashline = av.g.polyline([[dashlineLeftMargin, 66], 
	  [dashlineLeftMargin + 13, 66], [dashlineLeftMargin + 13, 30],[dashlineLeftMargin + 83,30],[dashlineLeftMargin + 83,66],[dashlineLeftMargin + 101,66]], {"arrow-end":"classic-wide-long", "opacity":0, "stroke-width":2,"stroke-dasharray":"-"});
  var bar4 = av.g.line(dashlineLeftMargin + 23, 15, dashlineLeftMargin + 23, 45,
	         {"stroke-width": 1, "stroke":"#000"});
  bar4.hide();
	
  //Left Margin of arrowIt1 in the 5th step
  var arrowIt1LeftMargin = labelItLeftMargin + 15 ;
  //arrow pointing to 10 in the 5th step
  var arrowIt1 = av.g.line(arrowIt1LeftMargin, 115, arrowIt1LeftMargin + 20, 115,
	             {"arrow-end": "classic-wide-long", "opacity": 0,"stroke-width": 2});

  //initialize the linked list
  av.umsg("The linked list before deletion");
  l.addFirst(12)
   .addFirst(10)
   .addFirst(23)
   .addFirst("20");
  l.layout();
  l.css({top: 50});
	
  //create new node 10
  var n3 = l.newNode("10");
  n3.highlight();
  n3.css({left: 105, top: 50}); 
  n3.hide();
  pseudo.highlight(1);
  av.displayInit(); 

  //step 2
  l.get(2).highlight();
  l.layout({updateLeft: false});
  av.umsg("10 is the current node to be deleted");
  av.step(); 

  //step 3
  labelIt.show();
  arrowIt.show();
  av.umsg("Remember the value by setting \"it\" to point to the element");
  pseudo.unhighlight(1);
  pseudo.highlight(3);
  av.step();

  //step 4
  l.get(1).edgeToNext().hide();
  l.get(2).edgeToNext().hide();
  bar1.hide();
  dashline.show();
  bar4.show();
  av.umsg(" The next field of the preceding list node is set to point to the node following the one being deleted");	
  pseudo.unhighlight(3);
  pseudo.highlight(6);
  av.step();	

  ////step 5
  l.remove(2);
  dashline.hide();
  bar4.hide();
  arrowIt.hide();
  bar1.show();  
  l.layout();
  l.get(1).edgeToNext().show();
  arrowIt1.show();
  n3.show();
  n3.hide();
  n3.show();
  av.umsg(" Finally, the node is removed from the linked list");
  pseudo.unhighlight(6);
  pseudo.highlight(7);
  av.step();
  av.recorded();
}(jQuery));
