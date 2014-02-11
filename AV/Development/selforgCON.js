"use strict";
// Various functions and variables that will be used by all of the
// following sections of the tutorial.

// Helper function for seting pointer
/*
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


// Helper funciton for deleting a pointer
function delPointer(pointer){
  if(pointer){
    pointer.element.remove();
    pointer.arrow.remove();
  }
}
*/
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

//Linked list insertion
(function ($) {
  var jsav = new JSAV("SelforgCON1");

  // Offsets
  var leftMargin = 150;
  var topMargin =  40;

  // Create a list object under control of JSAV library
  var l = jsav.ds.list({"nodegap": 30, "top": topMargin, left: leftMargin});
  l.addFirst("H")
   .addFirst("G")
   .addFirst("F")
   .addFirst("E")
   .addFirst("D")
   .addFirst("C")
   .addFirst("B")
   .addFirst("A");
  l.layout();

  // Create freelist
  var freelist = jsav.ds.list({"nodegap": 30, "top": topMargin + 100, left: leftMargin});

  // Create 'null' label
 //var nullLabel = jsav.label("selfOrg", {top: topMargin + 100, left: leftMargin});
 //nullLabel.css({color : "red"});
  // head
 //var head = setPointer("head", l.get(0));  
  // curr
//var curr = setPointer("curr", l.get(1));  
  // Tail
 //var tail = setPointer("tail", l.get(1), "right");  
  // freelist poitner
 // var pfreelist = setPointer("freelist", nullLabel);
  jsav.umsg("We will  illustrate using a Self Organizing List, by showing how Searching for the letters F D F G E G F A D F G E in this order will affect the list");
  jsav.displayInit();

  // step 3
  jsav.umsg("Now we are searching for F");
jsav.step();
jsav.umsg("Since F has been searched more times then any other elements in the list it will move to the front of the list");
  l.remove(5);
  l.add(0, "F");
  l.layout();
/*
  l.layout();
  curr.target(l.get(1));
  tail.target(l.get(2), {anchor: "left top",
    myAnchor: "right bottom",
    left: 15,
    top: -20});
  jsav.umsg("Since the freelist is empty, we must use the <code>new</code> operator to create a new node for insertion.");
  jsav.step();

  jsav.umsg("Here is the list after inserting '20', '6' and '12' into the 'current' position. So far, we have not been able to take advantage of the freelist.");
  l.add(1, "12");
  l.add(2, "6");
  l.add(3, "20");
  l.layout();
  curr.target(l.get(1));
  jsav.step();

  jsav.umsg("Now remove the current node from the list. Set its value to be <code>null</code>. The deleted node is moved to the head of freelist for later reuse.");
  l.remove(1);
  l.layout();
  nullLabel.hide();
  freelist.addFirst("null");
  freelist.layout();
  pfreelist.target(freelist.get(0));
  jsav.step();

  jsav.umsg("The list after another delete operation on the 'current' node. Again put the deleted node at the head of the freelist."); 
  l.remove(1);
  l.layout();
  freelist.addFirst("null");
  freelist.layout();
  pfreelist.target(freelist.get(0));
  jsav.step();

  jsav.umsg("Now let's insert a node with value '6' into 'current' position again. This time the head node of the freelist is used.");
  l.add(1, "6");
  l.layout();
  freelist.remove(0);
  freelist.layout();
  pfreelist.target(freelist.get(0));
  jsav.step();
*/

  jsav.recorded();
}(jQuery));
