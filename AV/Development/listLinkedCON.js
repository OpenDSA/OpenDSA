"use strict";
// Various functions and variables that will be used by all of the
// following sections of the tutorial.

// The various arrays to start sweeps with or display
var tempArr = [10];

//Linked list insertion
(function ($) {
  
    var av = new JSAV("listLinkedCON1");
	// Create an list object under control of JSAV library
    var l = av.ds.list({"nodegap": 25});

	//create a the hidden array holding a value of 10
	var arr = av.ds.array(tempArr, {indexed: true, layout: "array"});
	arr.hide();

	//initialize the link list
    av.umsg("The linked list before insertion");
    l.addFirst("...")
	  .addFirst(23)
      .addFirst(12)
	  .addFirst("...");
    l.layout();
	l.css({top: 50});
	
	//Vertical bar in 1st step
	var bar1 = av.g.line(510, 50, 510, 80,{"stroke-width": 1, "stroke":"#000"});
	//Vertical bar in 4th step
	var bar2 = av.g.line(475, 90, 475, 120,{"stroke-width": 1, "stroke":"#000"});	
	//Vertical bar in 5th step
	var bar3 = av.g.line(473, 50, 473, 80,{"stroke-width": 1, "stroke":"#000"});
	bar2.hide();
	bar3.hide();
	
	//Label "curr" and arrow in 1st step
	var label = av.label("curr", {before: arr, left: 430, top: 3, "font-size":"20px"});
	//Arrow pointing to "curr" in 1st step
	var arrow = av.g.line(455, 25, 475, 45,{"arrow-end": "classic-wide-long", "opacity": 100,"stroke-width": 2});
	
	//Label "curr" in the 3th step
	var label1 = av.label("curr", {before: arr, left: 395, top: 3, "font-size":"20px"});
	//Arrow pointing to the "curr" in the 3rd step
	var arrow1= av.g.line(420, 25, 440, 45,{"arrow-end": "classic-wide-long", "opacity": 100,"stroke-width": 2});
	arrow1.hide();
	label1.hide();	
	
	//Horizontal arrow in the 3rd step
	var arrow2= av.g.line(457, 64, 549, 64,{"arrow-end": "classic-wide-long", "opacity": 0,"stroke-width": 2});
	av.displayInit();
    
	var n3 = l.newNode("");	
	// Set the position for the new node
    n3.css({left: 105, top: 60}); 
	av.umsg("create a new link node");
	//Copy 10 to the new link node   
	av.effects.copyValue(arr, 0, n3);
	//step 2
	av.step();	
	
    var node = l.get(1).next();    
	l.get(1).edgeToNext().hide();
	l.get(1).next(n3);	
    n3.next(node);
    l.layout({updateTop: false}); // control that top coordinate of nodes should not be recalculated
	
	//move the "curr arrow" left by "showing" and "hiding" objects 
	arrow.hide();
	label.hide();
	arrow1.show();
	label1.show();	
	l.get(3).highlight();
	arrow2.show();

	av.umsg(" the next field of the new list node is assigned to point to the current node (the one after the node that curr points to).");
    //step 3
	av.step();

    l.get(1).highlight();
	l.get(3).unhighlight();
	l.get(1).next(n3).edgeToNext().show();	
	arrow2.hide();
	bar1.hide();
	bar2.show();
    av.umsg("the next field of node pointed to by curr is assigned to point to the newly inserted node.");
	// step 4
	av.step();

	l.get(1).unhighlight();
	bar2.hide();
	bar3.show();	
	av.umsg("..and finally the node is in its correct position in the list");    
    n3.css({top: 0});
	l.get(2).highlight();
    l.layout();

    av.recorded();
}(jQuery));

//Linked list deletion
(function ($) {
  
    var av = new JSAV("listLinkedCON2");
	
    var l = av.ds.list({"nodegap": 25});

	//create a the hidden array
	var arr = av.ds.array(tempArr, {indexed: true, layout: "array"});
	arr.hide();



	//vertical bar in 1st step
	var bar1 = av.g.line(473, 50, 473, 80,{"stroke-width": 1, "stroke":"#000"});
	
	//label "curr" and arrow in the 1st step
	var label = av.label("curr", {before: arr, left: 440, top: 0, "font-size":"20px"});
	//arrow pointing to "curr" in the 1st step
	var arrow = av.g.line(456, 25, 456, 45,{"arrow-end": "classic-wide-long", "opacity": 100,"stroke-width": 2});
	
	//label "it" and arrow in the 3rd step
	var labelIt = av.label("it", {before: arr, left: 450, top: 106, "font-size":"20px"});
	var arrowIt = av.g.line(465, 103, 485, 75,{"arrow-end": "classic-wide-long", "opacity": 0,"stroke-width": 2});
	labelIt.hide();

	//dashline in the 4th step
	var dashline = av.g.polyline([[457, 66], [470, 66], [470, 30],[540,30],[540,66],[558,66]], {"arrow-end":"classic-wide-long", "opacity":0, "stroke-width":2,"stroke-dasharray":"-"});
	var bar4 = av.g.line(480, 15, 480, 45,{"stroke-width": 1, "stroke":"#000"});
	bar4.hide();

	//arrow pointing to 10 from "it" in the 5th step
	var arrowIt1 = av.g.line(465, 115, 485, 115,{"arrow-end": "classic-wide-long", "opacity": 0,"stroke-width": 2});
	//vertical bar in the 5th step
	var bar5 = av.g.line(508, 50, 508, 80,{"stroke-width": 1, "stroke":"#000"});
	bar5.hide();
	
	//label "curr" and it's arrow in the 5th step
	var label1 = av.label("curr", {before: arr, left: 474, top: 3, "font-size":"20px"});
	var arrow1= av.g.line(490, 25, 490, 45,{"arrow-end": "classic-wide-long", "opacity": 100,"stroke-width": 2});
	arrow1.hide();
	label1.hide();

	//initialize the linked list
    av.umsg("The linked list before deletion");
    l.addFirst("...")
	  .addFirst(12)
	  .addFirst(10)
      .addFirst(23)
	  .addFirst("...");
    l.layout();
	l.css({top: 50});
	
	//create new node 10
	var n3 = l.newNode("10");
	n3.highlight();
    n3.css({left: 105, top: 50}); 
	n3.hide();
	
    av.displayInit(); 

	l.get(2).highlight();
	l.layout({updateLeft: false});
	av.umsg("10 is the current node to be deleted");
	av.step(); //step 2

	labelIt.show();
	arrowIt.show();
	av.umsg("Remember the value by setting \"it\" to point to the element");	
	av.step();//step 3

	l.get(1).edgeToNext().hide();
	l.get(2).edgeToNext().hide();
	bar1.hide();
	dashline.show();
	bar4.show();
	av.umsg(" The next field of the preceding list node is set to point to the node following the one being deleted");	
	av.step();//step 4	
	
    l.remove(2);
	bar4.hide();
	dashline.hide();

	//move the "curr arrow" left
	arrow.hide();
	label.hide();
	arrow1.show();
	label1.show();
	arrowIt.hide();
	
	l.layout();
	l.get(1).edgeToNext().show();
	arrowIt1.show();
	n3.show();
	n3.hide();
	n3.show();
	bar5.show();

	av.umsg(" Finally, the node is removed from the linked list");
    av.step();//step 5   

    av.recorded();

}(jQuery));


